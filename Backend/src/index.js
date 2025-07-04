import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth.router.js'
import connectDB from './config/db.js';
import { Task } from './models/task.model.js';
dotenv.config();
const port =process.env.PORT;

const app =express();

app.use(express.json());
app.use("/api/auth",authRouter);

app.post('/api/insert-task',async(req,res)=>{
      const {title,content,userId}=req.body;
      if(!title || !content){
         res.status(400).json({success : false,msg : 'title and content cannot be empty'});
      }
      if(!userId){
         res.status(400).json({success : false,msg : 'user id cannot be empty'});
      }

      try{
           const task=await Task.create({title,content,user : userId});
           res.json({success : true ,msg : "task added successfully",task});
           console.log("Task inserted successfully"); 
      }catch(err){
            res.json({success : false ,msg : "error while adding task",err});
      }
});

connectDB();
app.listen(port,()=>{
      console.log(`server is serving on port ${port}`);
})