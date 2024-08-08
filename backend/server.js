import path from "path"; // built in from node
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

// for deployment
// actual path to the root folder "/"
const __dirname = path.resolve();
/// deploymnet code end //////

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

// configure routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// for deployment
//express provide static middleware which used to serve static file i.e html,css,js,imgs,sound etc
// when we run npm run build it create the bild file in dist on the server
// in dist folder all static files will be vailable using static middleware
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// now other than above routes, server will server the following page
// now we can run out front end from our server as well
app.use("*", () => {
  path.join(__dirname, "/frontend", "dist", "index.html");
});

/// deploymnet code end //////

// instead of app.listed we use server from socket
server.listen(PORT, () => {
  connectToMongoDb();
  console.log(`server is running at ${PORT}`);
});
