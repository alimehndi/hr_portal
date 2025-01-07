import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { userRoutes } from './routes/userRoutes';
dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 8000 ;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/v1/user',userRoutes)
app.listen(port , () => {
    console.log(`Server is running successfully on the port Number ${port}`);
})
