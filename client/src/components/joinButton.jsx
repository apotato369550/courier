import React from "react";

const JoinButton = ({ socket }) => {

    const joinRoomHandler = (event) => {
        socket.emit("joinRoom");
    }
   
    return (
        <button onClick={joinRoomHandler}>Join Room</button>
    )
}

export default JoinButton;