import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const registerUser= async(req,res)=>{
    try{
        const{name,email,password}=req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message:"Name, email, and password are required"
            });
        }

            const existingUser= await User.findOne({email});

            if (existingUser){
                return res.status(400).json({
                    message:"Email already exists"
                });

            }
            const hashedPassword=await bcrypt.hash(password,10);

            const user= await User.create({name,email,password:hashedPassword});

            res.status(201).json({
                message:"User Registered Successfull",
                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email
                }
            });
        
    }catch(error){
        res.status(500).json({
            message:"Registration failed",
            error:error.message
        });
    }
};

const loginUser= async (req,res)=>{
    try{
        const {email,password}=req.body;

        if (!email || !password){
            return res.status(400).json({
                message:"Email and password are required"
            });
        }

        const user=await User.findOne({email});

        if (!user){
            return res.status(401).json({
                message:"Given Invalid Email or Password"
            });
        }

        const isPasswordMatch= await bcrypt.compare(password,user.password);

        if (!isPasswordMatch){
            return res.status(401).json({
                message:"Given invalid Email or Password"
            });
        }

        const token= jwt.sign(
            {
            userId:user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    );

    res.status(200).json({
        message:"Login successfull",
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    });


    }catch(error){
        res.status(500).json({
            message:"Login Failed",
            error:error.message
        });
    }
};

export {registerUser,loginUser};