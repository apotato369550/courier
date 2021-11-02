import React from "react";

const CreateButton = ({ socket, username, startedChatting, setStartedChatting }) => {
    const createRoomHandler = (event) => {
        socket.emit("createRoom", username);
        setStartedChatting(!startedChatting)
        setStartedChatting(!startedChatting)
    }
   
    return (
        <button onClick={createRoomHandler}>Create Room</button>
    )
}

export default CreateButton;