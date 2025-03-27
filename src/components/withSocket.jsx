import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:5000", { transports: ["websocket"] });

/* eslint-disable no-unused-vars */
const withSocket = (WrappedComponent) => {
  return function WithSocketComponent(props) {
    const [messages, setMessages] = useState([]);

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

    const sendMessage = (message) => {
      setMessages((prev) => [...prev, message]);
      socket.emit("sendMessage", message.text);
    };

    return <WrappedComponent {...props} messages={messages} sendMessage={sendMessage} />;
  };
};
/* eslint-enable no-unused-vars */

export default withSocket;
