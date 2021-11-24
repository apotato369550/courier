import React from "react";

const ChatEntry = ({ input, setInput, socket, messageSent, setMessageSent, username }) => {

    // insert messagehandler here

    const keyDownHandler = (e) => {
        console.log("Enter handler has been pressed")
        if(e.key == "Enter"){
            console.log("enter has been pressed")
            
        }
    } 

    const sendHandler = (e) => {
        if(input == "") return;
        if(e.key != "Enter") return;
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
   
    const entryHandler = (e) => {
        console.log("Entry handler works")
        setInput(e.target.value)
        // should check to see if it works
    }  

    return (
        <input type="text" placeholder="Enter your message here here" onChange={entryHandler} onKeyDown={sendHandler} value={input} />
    )
}

export default ChatEntry;