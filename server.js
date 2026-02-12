import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import cloudinary from "./config/cloudinary.js";
import http from "http";
import { Server } from "socket.io";
import { setupSocket } from "./sockets/socket.js";
// import { testing } from "./cron/testing.js";

const PORT = process.env.PORT || 5002;

connectDB();
// testing();

const server = http.createServer(app);
const io=new Server(server, {
  cors:{
    origin:"*",
    credentials:true
    // methods:["GET", "POST"]
  }
});

setupSocket(io);



server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
