import React from "react";

const CreateButton = ({ socket, username, startedChatting, setStartedChatting, setErrorNumber }) => {
    const createRoomHandler = (event) => {
        if(username == ""){
            setErrorNumber(1);
            return;
        }
        socket.emit("createRoom", username);
        setStartedChatting(!startedChatting)
        setStartedChatting(!startedChatting)
    }
   
    return (
        <button onClick={createRoomHandler}>Create Room</button>
    )
}

export default CreateButton;