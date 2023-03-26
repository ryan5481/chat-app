const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 9090;
require("dotenv").config();

// Allow data transfer between the client and the server domains
// const http = require("http").Server(app);
const cors = require("cors");
const { Server } = require("socket.io");
// Socket.io for real-time communication
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000" || "*",
  },
});

/* 
Establish a connection with React App, 
and create a unique ID for each socket and log ID to the console.
Fires disconnect event when the page is refreshed or closed.
*/
io.on("connection", (socket) => {
  console.log(`🟢 ${socket.id} connected!`);

  //send message to all the connected users
  socket.on("message", (data) => {
    console.log(data);
    io.emit("messageResponse", data);
  });

  let users = [];
  socket.on("newUser", (data) => {
    users.push(data);
    io.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log(`🔴 ${socket.id} disconnected!`);
  });
});

app.use(cors());

app.get("/api", (req, res) => {
  res.json({
    message: "Hello from the server!",
  });
});

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
