import React from "react";
import "../styles/ChatStyles.css"; 
const Message = ({ text, sender }) => {
  return (
    <div className={`message ${sender === "user" ? "user-message" : "bot-message"}`}>
      <p>{text}</p>
    </div>
  );
};

export default Message;
