import { useState } from "react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    const response = await axios.post("http://localhost:5000/query", {
      question: userMessage.text,
    });

    const botResponse = { text: response.data.answer, sender: "bot" };
    setMessages((prev) => [...prev, botResponse]);
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-start">
      {/* Chatbot Toggle Button */}
      <button
        onClick={toggleChatbot}
        className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-md"
      >
        {isOpen ? "Close Chat" : "Chat"}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="bg-white w-96 h-[28rem] mt-2 rounded-lg shadow-lg flex flex-col border border-gray-300">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-3 text-center rounded-t-lg">
            Chatbot
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex items-center justify-start space-x-2">
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-500 text-sm">Thinking...</span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="border-t p-2 flex">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l-lg focus:outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 rounded-r-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
