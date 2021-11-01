import React from "react";

const ChatEntry = ({ input, setInput }) => {

    const entryHandler = (e) => {
        console.log("Entry handler works")
        setInput(e.target.value)
        // should check to see if it works
    }   
   
    return (
        <input type="text" placeholder="Enter your message here here" onChange={entryHandler} value={input} />
    )
}

export default ChatEntry;