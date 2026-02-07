const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/routes.js');

const app = express();
const PORT = process.env.PORT || 5001; 

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET','POST','DELETE','PUT','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(authRoutes);

mongoose.connect(process.env.DB_CONNECTION)
.then(() => 
{
    app.listen(PORT, () => 
    {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((err) => 
{
    console.log('DB Connection Failed:');
});
