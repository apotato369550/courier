import './App.css';
import io from "socket.io-client";
import CreateButton from './components/createButton';
import JoinButton from './components/joinButton';
import RoomEntry from './components/roomEntry';
import ChatDisplay from './components/chatDisplay';
import ChatEntry from './components/chatEntry';
import SendButton from './components/sendButton';
import React, { useState } from "react";
// make a form component
// create room component
// join join room component

const socket = io.connect("http://localhost:4000")


// create an interface that allows us to emit messages

// test it here

function App() {
  const [ID, setID] = useState(0);
  const [roomCode, setRoomCode] = useState("")
  const [messages, setMessages] = useState([]);

  socket.emit("message", "Hello World!")

  socket.on("newMessage", (newMessage) => {
    const message = JSON.parse(newMessage)
    console.log("A NEW MESSAGE HAS BEEN RECIEVED. THE NEW MESSAGE: " + message.text)
    console.log("THIS MESSAGE CAME FROM: " + message.id)
  })
   
  socket.on("roomCode", (roomCode) => {
    console.log("ROOM CODE RECIEVED. THE CURRENT ROOM CODE IS: " + roomCode);
    setRoomCode(roomCode)
  })
  
  socket.on("initialize", (id) => {
    console.log("CURRENTLY INITIALIZING APPLICATION. CLIENT ROOM ID IS: " + id)
    setID(id)
  })


  return (
    <div className="App">
      <div id="initial-screen">
        <CreateButton socket={socket} />
        <JoinButton />
        <RoomEntry />
      </div>
      <div id="chat-screen">
        <ChatDisplay />
        <ChatEntry />
        <SendButton />
      </div>
    </div>
  );
}

export default App;
