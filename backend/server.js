import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDb from "./db/connectToMongoDb.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
//const app = express(); // deteled from here and add to socket.js
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

// configure routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// instead of app.listed we use server from socket
server.listen(PORT, () => {
  connectToMongoDb();
  console.log(`server is running at ${PORT}`);
});
