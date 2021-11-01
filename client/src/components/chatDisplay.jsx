import React from "react";
import Message from "../components/message.jsx";

const ChatDisplay = ({ socket, messages, setMessages, id }) => {
   // map messages and stuff

   return (
        <div className="overflow-auto">
            <p>Chat Display: </p>
            {messages.map(message => {
                return <Message message={message} />
            })}
        </div>
    )
}

export default ChatDisplay;