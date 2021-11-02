import React from "react";

const JoinButton = ({ socket, roomCode, username }) => {

    const joinRoomHandler = (event) => {
        socket.emit("joinRoom", roomCode, username);
    }
   
    return (
        <button onClick={joinRoomHandler}>Join Room</button>
    )
}

export default JoinButton;