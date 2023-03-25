const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

// Allow data transfer between the client and the server domains
const http = require("http").Server(app);
const cors = require("cors");
const { Socket } = require("socket.io");

// Socket.io for real-time communication
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});
/* 
Establish a connection with React App, 
and create a unique ID for each socket and log ID to the console.
Fires disconnect event when the page is refreshed or closed.
*/
socketIO.on("connection", (socket) => {
  console.log(`🟢 ${socket.id} connected!`);
  socket.on("disconnect", () => {
    console.log(`🔴 A user disconnected!`);
  });
});

app.use(cors());

app.get("/api", (req, res) => {
  res.json({
    message: "Hello from the server!",
  });
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
