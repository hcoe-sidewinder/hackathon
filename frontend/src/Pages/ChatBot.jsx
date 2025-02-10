import { useState, useRef } from "react";
import axios from "axios";
import chatBotIcon from "../assets/chatbot.png";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/query", {
        question: userMessage.text,
      });

      const botResponse = { text: response.data.answer, sender: "bot" };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, something went wrong!", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed bottom-5 right-5 flex flex-col items-end"
      style={{ zIndex: 9999 }}
    >
      {/* Floating Chat Button */}
      <button
        onClick={toggleChatbot}
        className="text-black text-5xl w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-lg transition-transform transform hover:scale-110"
      >
        <img src={chatBotIcon} />
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div
          ref={chatBoxRef}
          className="bg-white w-[500px] h-[600px] mt-3 rounded-lg shadow-lg flex flex-col resize overflow-hidden"
        >
          {/* Chat Header */}
          <div className="bg-cyan-600 text-white p-3 text-center rounded-t-lg flex justify-between items-center">
            <span>Chatbot</span>
            <button onClick={toggleChatbot} className="text-white text-xl">
              ✖
            </button>
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
              className="bg-cyan-600 text-white px-4 rounded-r-lg"
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
