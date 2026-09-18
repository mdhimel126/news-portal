import News from "../models/News.js";

const createNews=async(req,res)=>{
    try{
        const{title,content,image,category}=req.body;

        if(!title || !content  || !category){
            return res.status(400).json({
                message:"Title, content,category are required"
            });
        }

        const news= await News.create({title,content,image,category,author:req.userId});

        res.status(201).json({
            message:"News created successfully",
            news
        });
    }catch(error){
        res.status(500).json({
            message:"Failed to create news",
            error:error.message
        });
    }
}

const getAllNews= async(req,res)=>{
    try{
        const news= await News.find()
        .populate("author","name email")
        .sort({createdAt:-1});

        res.status(200).json({
            news
        });
    }catch(error){
        res.status(500).json({
            message:"Failed to get news",
            error:error.message
        });
    }
};


const getSingleNews= async(req,res)=>{
    try{
        const news=await News.findById(req.params.id)
              .populate("author","name email");

              if(!news){
                return res.status(404).json({
                    message:"News not found"
                });
              }

              res.status(200).json({
                news
              });
    }catch(error){
        res.status(500).json({
            message:"Failed to get news",
            error:error.message
        });
    }
};

const updateNews= async (req,res)=>{
    try{
        const {title,content,image,category}= req.body;

        const news= await News.findById(req.params.id);

        if(!news){
            return res.status(404).json({
                message:"News not found"
            });
        }
        if(news.author.toString()!== req.userId.toString()){
            return res.status(403).json({
                message:"You can only update your own news"
            });
        }

        news.title= title || news.title;
        news.content=content || news.content;
        news.image= image || news.image;
        news.category= category || news.category;

        await news.save();

        res.status(200).json({
            message:"News update successfully",
            news
        });
    }catch(error){
        res.status(500).json({
            message:"Failed to update news",
            error:error.message
        });
    }
};


const deleteNews= async (req,res)=>{
    try{
        const news= await News.findById(req.params.id);

        if(!news){
            return res.status(404).json({
                message:"News not found"
            });
        }

        if(news.author.toString()!== req.userId.toString()){
            return res.status(403).json({
                message:"You can only delete your own news"
            });
        }

        await News.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message:"Successfull deleted news",
        });
    }catch(error){
        res.status(500).json({
        message:"Failed to delete news",
        error:error.message

    });
 }
};

export {
    createNews,
    getAllNews,
    getSingleNews,
    updateNews,
    deleteNews
};