import React from 'react'
import "./add.css"
import { assets } from '../../assets/assets'
const Add = () => {
  return (
    <div className='add'>
      <form className='flex-col'>
<div className="add-img-upload flex-col">
    <p>Upload Img</p>
    <label htmlFor="img">
        <img src={assets.upload_icon} alt=""/>
    </label>
    <input type="file" id='image' hidden required/>
</div>

<div className="add-product-name flex-col">
<p>Food Name</p>
<input type="text" name="name" placeholder='Type Here' required/>
</div>
<div className="add-product-descrption flex-col">
    <p>Food Description</p>
    <textarea name='description' rows="6" placeholder='Write content here' required/>
</div>

<div className="add-catgory-price">
    <div className="add-category flex-col">
<p>Food Category</p>
<select name='category'>
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
        <input type="Number" name='price' placeholder='$20' />
    </div>
</div>
<button type='submit' className='add-btn'>Add</button>
      </form>
    </div>
  )
}

export default Add
