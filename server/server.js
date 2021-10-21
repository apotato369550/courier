
const express = require("express")
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server)

io.on("connection", client => {
    console.log(client)
})

// run at port 3001
io.listen(4000)



