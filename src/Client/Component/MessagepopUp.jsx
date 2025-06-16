import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { useAuth } from "./AuthContext";

const socket = io("http://localhost:5000/api/v1"); // Consider using process.env.REACT_APP_SOCKET_URL

export default ({ chat, setChat, title }) => {
  const { userDeatils } = useAuth();
  const navigate = useNavigate()
  const popupRef = useRef();

  const [receiver, setReceiver] = useState(userDeatils?.referredBy);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!userDeatils?.userId) return;

    socket.emit("join", userDeatils.userId);

    const messageListener = ({ sender, content }) => {
      setMessages((prev) => [...prev, { sender, content }]);
    };

    socket.on("receive-message", messageListener);

    return () => {
      socket.off("receive-message", messageListener);
    };
  }, [userDeatils?.userId]);

  const sendMessage = () => {
    if (!msg || !receiver) return;
    const messageData = {
      sender: userDeatils.userId,
      receiver,
      content: msg,
    };
    console.log(messageData);
    socket.emit("send-message", messageData);
    setMessages((prev) => [...prev, { sender: "You", content: msg }]);
    setMsg("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setChat(false);
      }
    };

    if (chat) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [chat, setChat]);

  if (!chat) return null;

  return (
    <div className="cdk-overlay-container">
      <div className="cdk-overlay-backdrop dialog-backdrop cdk-overlay-backdrop-showing" />
      <div className="cdk-global-overlay-wrapper">
        <div className="cdk-overlay-pane dialog-pane">
          <div className="popup" ref={popupRef}>
            <div className="popup__header">
              <div
                className="popup__close"
                onClick={() => setChat(false)}
              />
            </div>

            <div className="popup-content">
              <div
                className="pop-bg"
                onClick={() => setChat(false)}
              />
              <div
                className="pop-bg"
                style={{ display: chat ? "block" : "none" }}
                onClick={() => setChat(false)}
              />
              <div className="pop-wrap ani show">
                {title && <h2 className="popup-title">{title}</h2>}
                <Link
                  className="btn-close"
                  onClick={() => setChat(false)}
                >
                  <span
                    className="item-icon"
                    style={{
                      backgroundImage:
                        "url(https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type01.svg)",
                    }}
                  />
                </Link>
                <div className="pop-title">
                  <h3>Live Chat</h3>
                </div>
                <div className="pop-inner content-style">
                  <input
                    placeholder="Receiver ID"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                  />
                  <div className="chat-messages">
                    {messages.map((m, i) => (
                      <div key={i}>
                        <b>{m.sender}</b>: {m.content}
                      </div>
                    ))}
                  </div>
                  <input
                    placeholder="Type a message..."
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                  />
                  <button onClick={sendMessage}>Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


