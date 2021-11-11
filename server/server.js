
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

    client.on("message", messageHandler)
    client.on("createRoom", createRoomHandler)
    client.on("joinRoom", joinRoomHandler)
    client.on("clientExit", clientExitHandler)

    function joinRoomHandler(roomCode, username){
        // work on join room handler
        // this doesn't allow the thing to connect
        console.log("Room Code " + roomCode)
        console.log("Username: " + username)
        console.log("Client ID: " + client.id)

        if(io.sockets.adapter.rooms.has(roomCode)){
            console.log("Joining Room...")
            client.join(roomCode)
        } else {
            console.log("Room doesn't exist...")
            client.emit("unknownRoom");
            return;
        }

        // LET'S FUCKING GOOOOOOOOOO
    

        clientRooms[client.id] = roomCode;
        clientCount[client.id]++;
        client.number = clientCount[client.id];

        client.emit("initialize", client.number, username)
        let joinMessage = { username: "Server", text: username + " has joined the room"}
        io.sockets.in(clientRooms[client.id]).emit("newMessage", JSON.stringify(joinMessage))
        
        
    }

    function createRoomHandler(username){
        // instead of roomcode, make it client code??
        let roomCode = makeID(5);
        // client.id?
        clientRooms[client.id] = roomCode;
        clientCount[client.id] = 1;
        // create a handler for the roomcode VVV
        client.emit("roomCode", roomCode);

        client.join(roomCode);
        // try to remember what these things did below in the original programVVV
        client.number = clientCount[client.id]; // this is for the client's id to be accessed
        client.emit("initialize", client.number, username);
        
        let createMessage = { username: "Server", text: username + " has created this room."}
        io.sockets.in(clientRooms[client.id]).emit("newMessage", JSON.stringify(createMessage))

        let data = {username: "Server", text: "Your room code is: " + roomCode};
        io.sockets.in(clientRooms[client.id]).emit("newMessage", JSON.stringify(data))
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
        // add separate handlers for initializing
    }

    function clientExitHandler(username){
        const roomName = clientRooms[client.id];
        if(!roomName){
            return;
        }
        io.sockets.in(roomName).emit("clientDisconnected", username)
    }

    client.on("disconnect", () => {
        // work on how to & how to deal w/ disconnect
        // hmmm
        // get rid of connection here in rooms?
        // get rid of username and id and stuff
        console.log("This client has disconnected: " + client);
        client.emit("exitRoom")
        // figure this shit out
        // recieve parameters here
    })
})

// where the fuck are the messages coming from
io.listen(4000)



