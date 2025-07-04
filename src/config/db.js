import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const connectDB =async function(req,res){
      try{
            await mongoose.connect(process.env.MONGOOSE_CONNECT)
            console.log("database connect successfully");
      }
      catch(error){
            console.log("Database connect issue")
      }
}

export default connectDB;