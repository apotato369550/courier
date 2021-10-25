import './App.css';
import io from "socket.io-client";
import CreateButton from './components/createButton';
import JoinButton from './components/joinButton';
import RoomEntry from './components/roomEntry';
import ChatDisplay from './components/chatDisplay';
import ChatEntry from './components/chatEntry';
import SendButton from './components/sendButton';
// make a form component
// create room component
// join join room component

const socket = io.connect("http://localhost:4000")

socket.emit("message", "Hello World!")

// test it here

function App() {
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
