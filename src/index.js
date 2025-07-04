import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth.router.js'
import connectDB from './config/db.js';
dotenv.config();
const port =process.env.PORT;

const app =express();

app.use(express.json());
app.use("/api/auth",authRouter);


connectDB();
app.listen(port,()=>{
      console.log(`server is serving on port ${port}`);
})