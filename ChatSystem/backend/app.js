import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
dotenv.config()
import cookieParser from 'cookie-parser';
import authRoutes from './src/routes/authRoutes.js';
import mongoose from 'mongoose';

import http from 'http';
import {Server} from 'socket.io';
import Conv from './src/models/conversationModel.js';

const PORT = process.env.PORT || 5001;
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET','POST','DELETE','PUT','PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(authRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: 
    {
        origin: 'http://localhost:5173',
        methods: ['GET','POST'],
        credentials: true
    }
});

let onlineUsers = new map ();


io.on("connection", (socket) => 
{
    socket.on("addUser", (userId) => 
    {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("sendMessage", async ({convId, senderId, receiverId, text}) => 
    {
        try 
        {
            const msg = await Msg.create({conversation: convId, sender: senderId, text});
            await Conv.findByIdAndUpdate(convId, { lastMessage: msg._id });
            const receiverSocket = onlineUsers.get(receiverId);
            if (receiverSocket) io.to(receiverSocket).emit("receiveMessage", msg); 
        }
        catch (err)
        {
            console.log(err.message);
        }
    });

    socket.on("disconnect", () => 
    {
        for (let [userId, id] of onlineUsers.entries()) 
        {
            if (id === socket.id) 
            {
                onlineUsers.delete(userId); 
            }
        }
        console.log("A user disconnected:", socket.id);
    });
});

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => 
    {
        server.listen(PORT, () =>
        {
            console.log(`Server listening to PORT ${PORT}`);
        })
    })
    .catch((err) => 
    {
        console.log("Db connection failed", err);
    })