import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatBody = ({ messages }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    console.log(messages);
    // console.log(localStorage.getItem("userName"));
  }, [messages]);

  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      {/*This shows messages sent from you*/}
      <div className="message__container">
        {messages.map((item) =>
          item.name == localStorage.getItem("userName") ? (
            <div className="message__chats" key={item.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{item.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={item.id}>
              <p>{item.name}</p>
              <div className="message__recepient">
                <p>{item.text}</p>
              </div>
            </div>
          )
        )}

        {/*This is triggered when a user is typing*/}
        <div className="message__status">
          <p>Someone is typing...</p>
        </div>
      </div>
    </>
  );
};

export default ChatBody;
