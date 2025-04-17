import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


//login user

const loginUser=async (req,res) => {
    
}


//register user
const registerUser=async (req,res) => {
    let {name,email,password}=req.body
    try {
        //checking if user already exists
      const exist=await userModel.findOne({email})  
      if(exist){
        return res.json({success:false,message:"User Already Exists"})
      }

      //validating email format & strong password
      if (!validator.isEmail(email)) {
        return res.json({success:false,message:"Please Enter valid email"})
      }

      if (password.length<8) {
        return res.json({success:false,message:"Please Enter A Strong Password "})
      }

      //hashing password of user
      const hashedPassword=await bcrypt.hash(password, 10);
      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
      });
     const user= await newUser.save();

     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });


      res.json({success:true,token})
    } catch (error) {
     console.log(error)   
     res.json({success:false,message:"This is error"})
    }
}

export {loginUser,registerUser}