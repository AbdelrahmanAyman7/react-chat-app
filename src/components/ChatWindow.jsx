import { useState } from "react";
import Message from "./Message.jsx";
import { IoSend } from "react-icons/io5";

const ChatWindow = ({ messages = [], sendMessage }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      sendMessage({ text: input, sender: "user" });
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages?.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>
      <div className="input-container">
        <div className="input-wrapper">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me a question..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()} 
          />
          <button onClick={handleSend} className="send-button">
            <IoSend size={20} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
