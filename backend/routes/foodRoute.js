import express from "express"
import { addFood } from "../controllers/foodController.js"
import multer from "multer"
import crypto from "crypto"
import path from "path"

const foodRouter=express.Router()

//Img storage  engine

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
     crypto.randomBytes(12,(err,name)=>{
const fn=name.toString("hex")+path.extname(file.originalname)

cb(null,fn)
     })
    }
  })
  
  const upload = multer({ storage: storage })


foodRouter.post("/add",upload.single("image"),addFood)



export default foodRouter