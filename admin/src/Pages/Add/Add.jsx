import React, { useState } from 'react'
import "./add.css"
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
const Add = () => {
const url= import.meta.env.VITE_API_URL


const [image,setImage]=useState(false)
const [data,setData]=useState({
    name:"",
    description:"",
    price:'',
    category:"Salad"
})

const onchangeHandler=(evt)=>{
const name=evt.target.name
const value =evt.target.value
setData(data=>({...data,[name]:value}))
}

const onSubmitHandler=async (event) => {
   event.preventDefault() 
   const formData=new FormData()
   formData.append("name",data.name)
   formData.append("description",data.description)
   formData.append("category",data.category)
   formData.append("price",+data.price)
   formData.append("image",image)
   const response=await axios.post(`${url}/api/food/add`,formData)
   if (response.data.success) {
    setData({
        name:"",
        description:"",
        price:'',
        category:"Salad" 
    })
    setImage(false)
    toast.success(response.data.message)
   }
   else{
toast.error(response.data.message)
   }
}

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Img</p>
                    <label htmlFor="image">
                        <img src={image?URL.createObjectURL(image):assets.upload_icon} alt="" />
                    </label>
                    <input type="file" id='image' hidden required onChange={(e)=>setImage(e.target.files[0])}/>
                </div>

                <div className="add-product-name flex-col">
                    <p>Food Name</p>
                    <input type="text" name="name" placeholder='Type Here' required  onChange={onchangeHandler} value={data.name} />
                </div>
                <div className="add-product-descrption flex-col">
                    <p>Food Description</p>
                    <textarea name='description' rows="6" placeholder='Write content here' required onChange={onchangeHandler} value={data.description} />
                </div>

                <div className="add-catgory-price">
                    <div className="add-category flex-col">
                        <p>Food Category</p>
                        <select name='category' onChange={onchangeHandler} value={data.category}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure veg">Pure veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input type="Number" name='price' placeholder='$20' onChange={onchangeHandler} value={data.price}/>
                    </div>
                </div>
                <button type='submit' className='add-btn'>Add</button>
            </form>
        </div>
    )
}

export default Add
