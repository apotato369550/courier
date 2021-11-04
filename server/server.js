
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
    // learn how to recieve emits w/ parameters

    console.log(client)
    client.on("message", messageHandler)
    client.on("createRoom", createRoomHandler)
    client.on("joinRoom", joinRoomHandler)

    function joinRoomHandler(roomCode, username){
        // work on join room handler
        // this doesn't allow the thing to connect
        console.log("Room Code " + roomCode)
        console.log("Username: " + username)

        /*
        const room = io.sockets.adapter.rooms[roomCode];
        // does this work??? ^^^ print code and shit
        console.log("Room: " + room)

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

        console.log("Clients: " + clients)

        if(!clients){
            client.emit("unknownRoom");
            return;
        }
        */
        
        // make handler for when room doesn't exist
        try {
            client.join(roomCode);
            console.log("Client Successfully joined room!")
        } catch (e) {
            console.log("Unable to join room:(")
            return;
        }

        clientRooms[client.id] = roomCode;
        clientCount[client.id]++;
        client.number = clientCount[client.id];

        client.emit("initialize", client.number, username)
    }

    function createRoomHandler(username){
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
        client.emit("initialize", client.number, username);
    }

    function messageHandler(newMessage){
        const roomName = clientRooms[client.id];
        if(!roomName){
            return;
        }

        // i better fucking make sure that this works

        let data = {
            username: newMessage.username,
            text: newMessage.text,
            id: client.id
        }

        // might emit to every socket, but yours
        // i think this might be the problemVVVV 
        io.sockets.in(roomName).emit("newMessage", JSON.stringify(data))
        
        console.log(data)
    }
})

// where the fuck are the messages coming from
io.listen(4000)



