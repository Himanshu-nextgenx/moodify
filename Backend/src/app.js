import express from 'express'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import { dbconnect } from './config/database.js';

import authRouter from './routes/auth.routes.js';
dotenv.config();

const PORT = process.env.PORT

 dbconnect();

  const app = express();
  app.use(express.json())

app.use(cookieParser());


app.use('/auth/v1',authRouter)

export   {
    PORT ,
    app
} 

