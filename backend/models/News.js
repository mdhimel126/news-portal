import mongoose from "mongoose";

const newsSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        content:{
            type:String,
            required:true
        },
        image:{
            type:String,
            default:""
        },
        category:{
            type:String,
            required:true,
            trim:true
        },
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }

    },
    {
        timestamps:true
    }
);

const News=mongoose.model("News",newsSchema);

export default News;