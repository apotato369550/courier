import React from "react";

const CreateButton = ({ socket, startedChatting, setStartedChatting }) => {
    const createRoomHandler = (event) => {
        socket.emit("createRoom");
        setStartedChatting(!startedChatting)
        setStartedChatting(!startedChatting)
    }
   
    return (
        <button onClick={createRoomHandler}>Create Room</button>
    )
}

export default CreateButton;