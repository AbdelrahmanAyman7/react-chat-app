import { useState } from "react";
import Message from "./Message.jsx";

const ChatWindow = ({ messages, sendMessage }) => {
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
      {messages.map((msg, index) => (
        <Message key={index} text={msg.text} sender={msg.sender} />
      ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
