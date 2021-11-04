import React from "react";

const JoinButton = ({ socket, roomCode, username, startedChatting, setStartedChatting }) => {

    const joinRoomHandler = (event) => {
        // event handlers for when roomcode/username is empty
        // throw error messages when room doesn't exist
        if(username == "" || roomCode == "") return;
        console.log("Joining room: " + roomCode + " Username: " + username)
        socket.emit("joinRoom", roomCode, username);
        // recieve if room is empty???
        setStartedChatting(!startedChatting)
        setStartedChatting(!startedChatting)
    }
   
    return (
        <button onClick={joinRoomHandler}>Join Room</button>
    )
}

export default JoinButton;