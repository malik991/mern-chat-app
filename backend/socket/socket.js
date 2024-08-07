import { Server } from "socket.io";
import http from "http"; // built in from node
import express from "express";

const app = express();
// now create the http server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
}); // in this way we have express server and on top of it we have socket io server

// now we get the socketId of receiver from receiver Id(userId)

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// get online user status
const userSocketMap = {}; // {userId: socketId}

// now we will listen the connections
io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId != "undefined") {
    userSocketMap[userId] = socket.id; // map the socket id in user socket index of userid
  }

  // io.emit is used to send the event to all connected users
  io.emit("getOnlineUsers", Object.keys(userSocketMap)); // getOnlineUsers is an event name

  // socket.on is used to listen to the events, which can be used to both sides on client and server
  // to check disconnection
  socket.on("disconnect", () => {
    console.log("user disconnect: ", socket.id);
    delete userSocketMap[userId]; // delte the user when it is disconnect
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
