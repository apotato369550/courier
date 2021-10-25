
const express = require("express")
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server)

const clientRooms = {};

function makeID(length){
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for(let i = 0; i < length; i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

io.on("connection", client => {
    console.log(client)
    client.on("message", messageHandler)
    client.on("createRoom", createRoomHandler)
    client.on("joinRoom", joinRoomHandler)

    function joinRoomHandler(roomCode){
        return
    }

    function createRoomHandler(){
        console.log("CURRENTLY CREATING ROOM")

        let roomCode = makeID(5);
        // client.id?
        console.log(client.id);
        clientRooms[client.id] = roomCode;
        client.emit("roomCode", roomCode);

        client.join(roomCode);
        // try to remember what these things did below in the original programVVV
        client.number = 1; // this is for the client's id to be accessed
        client.emit("initialize");
    }

    function messageHandler(message){
        console.log("This is the message that was sent: " + message)
    }
})

// run at port 3001
io.listen(4000)



