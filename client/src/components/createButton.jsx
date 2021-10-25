import React from "react";

const CreateButton = ({ socket }) => {
    let createRoomHandler = (event) => {
        socket.emit("createRoom");
    }
   
    return (
        <button onClick={createRoomHandler}>Create Room</button>
    )
}

export default CreateButton;