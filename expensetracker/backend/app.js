const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const authRoutes = require('./routes/routes.js');

app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET','POST','DELETE','PUT','PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(authRoutes);

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => 
    {
        app.listen(PORT, () => 
        {
            console.log(`Listening to PORT ${PORT}`);
        })
    })
    .catch(() => 
    {
        console.log("DB Connection Failed");
    })

