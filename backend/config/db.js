import mongoose from "mongoose";
const connectDB= async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongodB connected successfully");
    }catch(error){
        console.log("Something went wrong");
        process.exit(1);
    }
};

export default connectDB;