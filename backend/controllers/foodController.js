import foodModel from "../models/FoodModel.js";
import fs from "fs"

//add food item

const addFood=async (req,res) => {
let {name,description,category,price}=req.body
 let image_filename=req.file.filename  

 if (!req.file) {
    return res.status(400).json({ success: false, message: "Image file is required" });
  }

const food=new foodModel({
name,
description,
image:image_filename,
category,
price
})
try {
    await food.save()
    res.status(200).json({success:true,message:"Food Added"})
} catch (error) {
    console.log(error)
    res.status(500).json({success:false,message:"Error"})
}

}

export {addFood}