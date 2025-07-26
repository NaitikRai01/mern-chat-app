/*
import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

// ✅ Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// ✅ CORS middleware - only ONCE and with all frontend origins
app.use(cors({
  origin: [
    "http://localhost:3000",                // React local dev
    "http://localhost:5173",                // Vite local dev
    "https://mern-chat-app-vusu.vercel.app" // ✅ Your deployed frontend
  ],
  credentials: true,
}));

// ✅ Parse incoming JSON with size limit
app.use(express.json({ limit: "4mb" }));

// ✅ Setup Socket.IO
export const io = new Server(server, {
  cors: {
    origin: "*", // Socket.IO works fine with wildcard CORS unless you want to lock it down
  },
});

// ✅ Online Users Map
export const userSocketMap = {}; // { userId: socketId }

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User Connected:", userId);

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User Disconnected:", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// ✅ Health check route
app.get("/api/status", (req, res) => {
  res.send("Server is live 🚀");
});

// ✅ Routes
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// ✅ Connect to MongoDB
await connectDB();

// ✅ Start server in development (Vercel will not run this in prod)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log("Server running on PORT:", PORT));
}

// ✅ Export for Vercel to use
export default server;
*/

import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// ✅ CORS middleware - only once and with correct frontend URL
app.use(cors({
  origin: [
    "http://localhost:3000", // Local React
    "http://localhost:5173", // Local Vite
    "https://mern-chat-app-pi-dusky.vercel.app", // ✅ Your deployed frontend
  ],
  credentials: true,
}));

// ✅ Parse incoming JSON
app.use(express.json({ limit: "4mb" }));

// ✅ Socket.IO setup
export const io = new Server(server, {
  cors: {
    origin: "*", // OK for Socket.IO
  },
});

export const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User Connected:", userId);

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User Disconnected:", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// ✅ Health check
app.get("/api/status", (req, res) => {
  res.send("Server is live 🚀");
});

// ✅ Routes
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// ✅ MongoDB Connection
await connectDB();

// ✅ Dev environment server start
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log("Server running on PORT:", PORT));
}

// ✅ Export for Vercel
export default server;
