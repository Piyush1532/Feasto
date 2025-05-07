import React, { useContext, useEffect, useState } from 'react'
import "./placeorder.css"
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Placeorder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)
const navigate =useNavigate()
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault()
    let orderItems = []
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
   let orderData={
    address:data,
    items:orderItems,
    amount:getTotalCartAmount()+2
   }
   let response=await axios.post(url+"/api/order/placeorder",orderData,{headers:{token}})
   console.log(response)
   if (response.data.success) {
    const {session_url}=response.data
    window.location.replace(session_url)

   }else{
   }
  }

  useEffect(()=>{
if (!token) {
  navigate("/cart")
}else if(getTotalCartAmount() === 0){
navigate("/cart")
}
  },[token])



  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name='firstname' onChange={onChangeHandler} value={data.firstname} type="text" placeholder='First Name' required />
          <input name='lastname' onChange={onChangeHandler} value={data.lastname} type="text" placeholder='Last Name' required />
        </div>
        <input type="email" placeholder='Email Address' name='email' onChange={onChangeHandler} value={data.email} required />
        <input type="text" placeholder='Street' name='street' onChange={onChangeHandler} value={data.street}  required/>
        <div className="multi-fields">
          <input type="text" placeholder='City' name='city' onChange={onChangeHandler} value={data.city} required />
          <input type="text" placeholder='State' name='state' onChange={onChangeHandler} value={data.state} required />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip Code' name='zipcode' onChange={onChangeHandler} value={data.zipcode} required />
          <input type="text" placeholder='Country' name='country' onChange={onChangeHandler} value={data.country} required />
        </div>
        <input type="text" placeholder='Phone No' name='phone' onChange={onChangeHandler} value={data.phone}  required/>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivary Fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit' >Proceed To Payment</button>
        </div>
      </div>
    </form>
  )
}

export default Placeorder
