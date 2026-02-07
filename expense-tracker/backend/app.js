import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser';
// import authRoutes from './src/routes/authRoutes.js';
// import transactionRoutes from './src/routes/transactionRoutes.js';
import mongoose from 'mongoose';


const PORT = process.env.PORT || 5001;
const app = express();
app.use(express.json());
app.use(cookieParser());

// app.use(authRoutes);
// app.use(transactionRoutes);

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => 
    {
        app.listen(PORT, () =>
        {
            console.log(`Server listening to PORT ${PORT}`);
        })
    })
    .catch((err) => 
    {
        console.log("Db connection failed", err);
    })

app.get('/', (req, res) => res.send("Hello"));