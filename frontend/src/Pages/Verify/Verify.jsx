import React, { useContext, useEffect } from 'react'
import "./verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
const Verify = () => {

    const [seachParams,setSearchParams]=useSearchParams()

const success=seachParams.get("success")
const orderId=seachParams.get("orderId")

const {url}=useContext(StoreContext)
const navigate=useNavigate()

const verifyPayment=async () => {
    const response=await axios.post(url+"/api/order/verify",{success,orderId})
    if (response.data.success) {
        navigate("/myorders")
    }else{
        navigate("/")
    }
}

useEffect(()=>{
verifyPayment()
},[])

  return (
    <div>
     <div className="verify">
     <div className="spinner "></div>
     </div>
    </div>
  )
}

export default Verify
