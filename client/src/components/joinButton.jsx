import React from "react";

const JoinButton = ({ socket, roomCode, username, startedChatting, setStartedChatting, setErrorNumber }) => {

    const joinRoomHandler = (event) => {
        // event handlers for when roomcode/username is empty
        // throw error messages when room doesn't exist
        if(username == "") {
            setErrorNumber(1)
            return;
        }
        if(roomCode == "") {
            setErrorNumber(2)
            return;
        }
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