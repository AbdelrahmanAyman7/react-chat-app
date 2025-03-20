import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Message from "../components/Message.jsx";
import "../styles/ChatStyles.css";

const socket = io("http://localhost:5000");

const MyChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("receiveMessage", (botMessage) => {
      console.log("Received AI response:", botMessage);
      if (botMessage && typeof botMessage === "object" && botMessage.text) {
        setMessages((prev) => [...prev, { sender: "bot", text: botMessage.text }]);
      } else {
        console.error("Invalid AI response format:", botMessage);
      }
    });

    return () => socket.off("receiveMessage");
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    socket.emit("sendMessage", input);
    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">AI Chat</div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default MyChatPage;
