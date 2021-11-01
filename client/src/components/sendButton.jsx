import React from "react";

const SendButton = ({ socket, input, setInput, messageSent, setMessageSent }) => {
    // add event listener to emit after hitting button
    const sendHandler = (e) => {
        console.log("SEND HANDLER has been pressed")
        if(input == "") return;
        socket.emit("message", input);
        setMessageSent(!messageSent)
        setInput("")
    }

    return (
        <button onClick={sendHandler}>Send Message</button>
    )
}

export default SendButton;