import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
      title : {
          type : String,
          required : true
      },
      content : {
          type : String,
      },
      user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
      }
},{timestamps : true});

export const Task=mongoose.model('Task',taskSchema);