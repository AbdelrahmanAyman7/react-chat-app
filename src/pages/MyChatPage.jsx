import React, { useState } from "react";
import ChatWindow from "../components/ChatWindow.jsx";
import withSocket from "../components/withSocket.jsx";
import "../styles/ChatStyles.css";

const ChatWithSocket = withSocket(ChatWindow); // Wrap ChatWindow with Socket

const MyChatPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      {!isChatOpen && (
        <div className="chat-toggle" onClick={() => setIsChatOpen(true)}>
          Ask AI
        </div>
      )}

      {/* Chat Overlay */}
      {isChatOpen && (
        <div className="chat-overlay">
          <div className="chat-modal">
            {/* Chat Header */}
            <div className="chat-header">
              AI Chat
              <span className="close-btn" onClick={() => setIsChatOpen(false)}>✖</span>
            </div>

            {/* Chat Window (with Socket) */}
            <ChatWithSocket />
          </div>
        </div>
      )}
    </>
  );
};

export default MyChatPage;
