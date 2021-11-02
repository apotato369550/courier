import React from "react";

const Message = ({ message, username }) => {
   // use for loop to render messages
   // completely forgot to add a username feature
    return (
        <p><span>{username}: </span>{message}</p>
    )
}

export default Message;