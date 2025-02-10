from pathlib import Path

from flask import Flask, jsonify, request

# importing dependencies
from langchain.chains import ConversationalRetrievalChain
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.llms import LlamaCpp
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import faiss
from PyPDF2 import PdfReader

app = Flask(__name__)

MODEL_PATH = "./models/mistral-7b-v0.1.Q4_0.gguf"

# creating custom template to guide llm model
custom_template = """Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.
Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:"""

CUSTOM_QUESTION_PROMPT = PromptTemplate.from_template(custom_template)


@app.route("/query", methods=["POST"])
def query_model():
    question = request.json.get("question")

    if not question:
        return jsonify({"error": "No question provided"}), 400

    response = conversation_chain({"question": question})
    answer = response["answer"]

    return jsonify({"answer": answer}), 200


# Helper functions for processing text, chunks, and vectorstore


# extracting text from pdf
def get_pdf_text(docs):
    text = ""
    for pdf in docs:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text


# converting text to chunks
def get_chunks(raw_text):
    text_splitter = CharacterTextSplitter(
        separator="\n", chunk_size=800, chunk_overlap=200, length_function=len
    )
    chunks = text_splitter.split_text(raw_text)
    return chunks


# using all-MiniLm embeddings model and faiss to get vectorstore
def get_vectorstore(chunks):
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2",
        model_kwargs={"device": "cpu"},
    )
    vectorstore = faiss.FAISS.from_texts(texts=chunks, embedding=embeddings)
    return vectorstore


# generating conversation chain using LlamaCpp
def get_conversationchain(vectorstore):
    llm = LlamaCpp(
        model_path=MODEL_PATH,
        temperature=0.2,
        max_tokens=512,
        top_p=0.9,
        n_ctx=4096,  # Context window size (adjust based on your model)
        verbose=True,
    )

    memory = ConversationBufferMemory(
        memory_key="chat_history", return_messages=True, output_key="answer"
    )  # Using conversation buffer memory to hold past information

    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectorstore.as_retriever(search_kwargs={"k": 3}),
        condense_question_prompt=CUSTOM_QUESTION_PROMPT,
        memory=memory,
    )
    return conversation_chain


if __name__ == "__main__":
    directory_path = Path("./pdfs/")

    docs = list(directory_path.glob("*.pdf"))

    print(f"PDF Directory: {directory_path}, PDF Files: {docs}")

    if not docs:
        print("No files provided")
        exit(1)

    try:
        # get the pdf
        raw_text = get_pdf_text(docs)

        # get the text chunks
        text_chunks = get_chunks(raw_text)

        # create vectorstore
        vectorstore = get_vectorstore(text_chunks)

        # create conversation chain
        conversation_chain = get_conversationchain(vectorstore)
    except Exception as e:
        print(f"Error processing document: {str(e)}")
        exit(1)

    app.run(debug=True, host="0.0.0.0", port=5000)
