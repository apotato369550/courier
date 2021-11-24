import React from "react";

const SendButton = ({ socket, input, username, setInput, messageSent, setMessageSent }) => {
    // add event listener to emit after hitting button
    const sendHandler = (e) => {
        console.log("SEND HANDLER has been pressed")
        if(input == "") return;
        // send message here
        // let message = username + ": " + input;
        let message = {
            username: username,
            text: input
        }
        socket.emit("message", message);
        setMessageSent(!messageSent)
        setInput("")
    }


    return (
        <button onClick={sendHandler}>Send Message</button>
    )
}

export default SendButton;