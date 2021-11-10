import './App.css';
import io from "socket.io-client";
import CreateButton from './components/createButton';
import JoinButton from './components/joinButton';
import RoomEntry from './components/roomEntry';
import ChatDisplay from './components/chatDisplay';
import ChatEntry from './components/chatEntry';
import SendButton from './components/sendButton';
import UsernameEntry from './components/usernameEntry';
import Error from './components/error';
import React, { useState, useEffect } from "react";
// make a form component
// create room component
// join join room component

const socket = io.connect("http://localhost:4000")
const chatMessages = [];

// i think this solves it
let username = "";
let clientId = 0;
let room = "";

// check react tutorial video on how to deal w/ this

socket.on("newMessage", (newMessage) => {
  console.log(newMessage)
  const data = JSON.parse(newMessage)
  // console.log("A NEW MESSAGE HAS BEEN RECIEVED. THE NEW MESSAGE: " + message.text)
  // console.log("THIS MESSAGE CAME FROM: " + message.id)
  chatMessages.push(data)
  // console.log(chatMessages)

})


socket.on("roomCode", (code) => {
  // console.log("ROOM CODE RECIEVED. THE CURRENT ROOM CODE IS: " + roomCode);
  room = code;
  console.log("Code Recieved: " + code)
  // this doesn't re-assign the global variable???
  // console.log(room)
})

socket.on("initialize", (id, user) => {
  document.getElementById("initial-screen").style.display = "none";
  document.getElementById("chat-screen").style.display = "block";
  clientId = id;
  username = user;
  console.log("ID Recieved: " + clientId)
  // socket.emit("message", {username: "Server", text: "Your room code is: " + room})
})

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [roomInput, setRoomInput] = useState("");
  const [startedChatting, setStartedChatting] = useState(0);
  const [messageSent, setMessageSent] = useState(0);
  const [messageRecieved, setMessageRecieved] = useState(0);
  const [errorNumber, setErrorNumber] = useState(0)

  // fix this tomorrow\
  // i kinda figured it out now
  // figure this mf out
  // only variables that are usestate variables will be allowed in useffect
  // this should, in theory, work
  socket.on("newMessage", () => {
    setMessageRecieved(!messageRecieved)
  })

  socket.on("unknownRoom", () => {
    // figure this out
    // finish working on error handler
    console.log("Unknown room:(")
    setErrorNumber(3)
  })

  socket.on("exitRoom", () => {
    socket.emit("clientExit", username)
  })

  socket.on("clientDisconnected", (username) => {
    // setmessage recieved here
    // appropriate handlers here as well
    let message = {
      username: "Server",
      text: username + " has left the server"
    }
    chatMessages.push(message)
    setMessageRecieved(!messageRecieved);
  })


  // this one works really well
  useEffect(() => {
    setMessages(chatMessages)
    console.log(messages)
  }, [messageSent, messageRecieved])
  
  function displayShit(){
    alert('Id ' + clientId + ' Room Code ' + room)
  }

  return (
    <div className="App">
      <div id="initial-screen">
        <CreateButton socket={socket} username={username} startedChatting={startedChatting} setStartedChatting={setStartedChatting} setErrorNumber={setErrorNumber} />
        <JoinButton socket={socket} roomCode={roomInput} username={username} startedChatting={startedChatting} setStartedChatting={setStartedChatting} setErrorNumber={setErrorNumber} />
        <UsernameEntry username={username} setUsername={setUsername} />
        <RoomEntry roomInput={roomInput} setRoomInput={setRoomInput} />        
      </div>
      <div id="chat-screen" style={{display: "none"}}>
        <ChatDisplay socket={socket} messages={messages} id={clientId}/>
        <ChatEntry input={input} setInput={setInput} />
        <SendButton socket={socket} input={input} username={username} setInput={setInput} messageSent={messageSent} setMessageSent={setMessageSent} />
      </div>
      <Error errorNumber={errorNumber} />
      <button type="button" onClick={displayShit}>Toot</button>
    </div>
  );
}

export default App;
