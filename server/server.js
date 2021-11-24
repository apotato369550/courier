
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
        client.username = username;

        client.emit("initialize", client.number, username)
        let message = { 
            username: "Server", 
            text: client.username + " has joined the room"
        }
        io.sockets.in(clientRooms[client.id]).emit("message", JSON.stringify(message))
        
        
    }

    function createRoomHandler(username){
        // instead of roomcode, make it client code??
        let roomCode = makeID(5);
        // client.id?
        clientRooms[client.id] = roomCode;
        client.username = username;
        // create a handler for the roomcode VVV
        client.emit("roomCode", roomCode);
        client.join(roomCode);
        // try to remember what these things did below in the original programVVV
        client.emit("initialize", client.number, client.username);
        
        let message = { 
            username: "Server", 
            text: username + " has created this room."
        }
        io.sockets.in(clientRooms[client.id]).emit("message", JSON.stringify(message))

        message = {
            username: "Server", 
            text: "Your room code is: " + roomCode
        };
        io.sockets.in(clientRooms[client.id]).emit("message", JSON.stringify(message))
    }

    function messageHandler(data){
        const roomName = clientRooms[client.id];
        if(!roomName){
            return;
        }

        // i better fucking make sure that this works

        // try make client.id the username of the client. maybe that'll work

        let message = {
            username: data.username,
            text: data.text
        }

        // might emit to every socket, but yours
        // i think this might be the problemVVVV 
        io.sockets.in(roomName).emit("message", JSON.stringify(message))
        // add separate handlers for initializing
    }

    function clientExitHandler(username){
        console.log(username + " has exited the chatroom")
        const roomName = clientRooms[client.id];
        if(!roomName){
            return;
        }
        
        let message = {
            username: "Server",
            text: username + " has left the server"
        }
        io.sockets.in(roomName).emit("message", message)
    }

    client.on("disconnect", () => {
        // work on how to & how to deal w/ disconnect
        // hmmm
        // get rid of connection here in rooms?
        // get rid of username and id and stuff
        console.log("A client has disconnected: " + client.username);
        let message = {
            text: client.username + " has left the chatroom",
            username: "Server"
        }
        const roomName = clientRooms[client.id];
        io.sockets.in(roomName).emit("message", message)
    })
})

// where the fuck are the messages coming from
io.listen(4000)



