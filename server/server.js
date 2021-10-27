
const express = require("express")
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server)

const clientRooms = {};
const clientCount = {};

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
        const room = io.sockets.adapter.rooms[roomCode];

        let users;
        if(room){
            users = room.sockets;
        } else {
            console.log("Having trouble finding room...")
        }

        let clients;
        if(users){
            clients = Object.keys(users).length;
        } else {
            console.log("Having trouble finding sockets...")
        }

        if(clients == 0){
            client.emit("unknownRoom")
        }

        clientRooms[client.id] = roomCode;
        clientCount[client.id]++;
        client.number = clientCount[client.id];

        client.emit("initialize", client.number)
    }

    function createRoomHandler(){
        console.log("CURRENTLY CREATING ROOM")

        let roomCode = makeID(5);
        // client.id?
        console.log(client.id);
        clientRooms[client.id] = roomCode;
        clientCount[client.id] = 1;
        // create a handler for the roomcode VVV
        client.emit("roomCode", roomCode);

        client.join(roomCode);
        // try to remember what these things did below in the original programVVV
        client.number = clientCount[client.id]; // this is for the client's id to be accessed
        client.emit("initialize", client.number);
    }

    function messageHandler(newMessage){
        console.log("This is the message that was sent: " + newMessage)

        const roomName = clientRooms[client.id];
        if(!roomName){
            return;
        }

        // i better fucking make sure that this works

        let message = {
            text: newMessage,
            id: client.id
        }

        io.sockets.in(roomName).emit("newMessage", JSON.stringify(message))
    }
})

// run at port 3001
io.listen(4000)



