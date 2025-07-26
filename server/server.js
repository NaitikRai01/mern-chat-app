/*

import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";









  //create express app and http server

const app=express();

const server=http.createServer(app)




app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // if you're using cookies or auth headers
  }));

//initialise socket.io server
export const io=new Server(server,{
    cors:{origin:"*"}
})

// store online user
export const userSocketMap={}; //{userId:socketId}

//Socket.io connection handler
io.on("connection", (socket)=>{
    const userId=socket.handshake.query.userId;
    console.log("User-Connected",userId);

    if(userId) userSocketMap[userId]=socket.id;

    //emit online user to all connected clients

    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    socket.on("disconnect",()=>{
        console.log("User Disconnected",userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers" ,Object.keys(userSocketMap))
    })
})



//middleware setup
app.use(express.json({limit:'4mb'}));
app.use(cors());


//route setup
app.use("/api/status",(req,res)=>res.send("Server is live"));
app.use("/api/auth",userRouter)
app.use("/api/messages",messageRouter)




//connect to mongodb
await connectDB();

if(process.env.NODE_ENV !=="production"){



const PORT=process.env.PORT || 5000;
server.listen(PORT,()=>console.log("Server is running on PORT:"+PORT));

}
//export servel for versel
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

// Create express app and HTTP server
const app = express();
const server = http.createServer(app);

// ✅ Use proper CORS config (only once)
app.use(cors({
  origin: [
    "http://localhost:3000",             // Local development
    "http://localhost:5173",             // Vite (optional)
    "https://your-frontend.vercel.app"   // ✅ Replace with your Vercel URL
  ],
  credentials: true,
}));

// ✅ Parse incoming JSON
app.use(express.json({ limit: "4mb" }));

// ✅ Initialize Socket.IO
export const io = new Server(server, {
  cors: {
    origin: "*", // Socket.IO works independently of auth, so wildcard is okay
  },
});

// ✅ Map to track online users
export const userSocketMap = {}; // { userId: socketId }

// ✅ Handle Socket.IO connections
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
app.use("/api/status", (req, res) => res.send("Server is live 🚀"));

// ✅ API routes
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// ✅ Connect to MongoDB
await connectDB();

// ✅ Start local server
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log("Server running on PORT:", PORT));
}

// ✅ Export for Vercel deployment
export default server;




/*

import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

// Create express app and http server
const app = express();
const server = http.createServer(app);

// ✅ Apply correct CORS config (only once)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Initialize socket.io server
export const io = new Server(server, {
  cors: { origin: "*" }
});

// Store online users
export const userSocketMap = {}; // { userId: socketId }

// Socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User Connected:", userId);

  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User Disconnected:", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Middleware setup
app.use(express.json({ limit: '4mb' }));
// ❌ Removed the second `app.use(cors())`

// Routes
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Connect to MongoDB
await connectDB();

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log("Server is running on PORT:", PORT));
}

// Export for Vercel
export default server;

*/