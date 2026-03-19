import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
dotenv.config();
import routes from './src/routes/authRoutes.js';
import http from 'http';
import {Server} from 'socket.io';

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: 
    {
        origin: "http://localhost:3000", 
        credentials: true
    }
});

io.on("connection", (socket) => 
{
    //console.log("User connected: " + socket.id);

    socket.on("joinDoc", (docId) => 
    {
        socket.join(docId);
        //console.log(`Socket ${socket.id} joined document ${docId}`);
    });

    socket.on("docChange", ({ docId, title, content }) => 
    {
        socket.to(docId).emit("receiveDocChange", { title, content });
    });

    socket.on("disconnect", () => 
    {
        console.log("User disconnected: " + socket.id);
    })
})

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET','POST','DELETE','PUT','PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(routes);

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => 
    {
        server.listen(PORT, () => 
        {
            console.log(`Listening to PORT ${PORT}`);
        })
    })
    .catch(() => 
    {
        console.log("DB Connection failed");
    })