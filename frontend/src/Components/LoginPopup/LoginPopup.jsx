import React, { useCallback, useContext, useState } from 'react'
import "./loginpopup.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from "axios"
const LoginPopup = ({ setShowLogin }) => {

  const {url,setToken}=useContext(StoreContext)

  const [currentState, setCurrentState] = useState("Login")
  const [data,setData]=useState({
    name:"",
    email:"",
    password:""
  })

  const onchangeHandler=(event)=>{
const name=event.target.name
const value=event.target.value
setData(data=>({...data,[name]:value}))
  }

  const onLogin=async (event) => {
    event.preventDefault()

    let newUrl=url

    if (currentState==="Login") {
      newUrl+="/api/user/login"
    }else{
       newUrl+="/api/user/register"
    }

    const response=await axios.post(newUrl,data)

    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      setShowLogin(false)
      
    }
    else{
      alert(response.data.message)
    }
  }

  return (
    <div className='login-popup'>
      <form className='login-popup-container' onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img src={assets.cross_icon} alt="" onClick={() => setShowLogin(false)} />
        </div>
        <div className="login-popup-input">
          {currentState === "Login" ? <></> : <input type="text" placeholder='Your Name' required name="name" value={data.name} onChange={onchangeHandler} />}



          <input type="email" placeholder='Your Email' required name='email' value={data.email} onChange={onchangeHandler}/>
          <input type="password" placeholder='Password' required name='password' value={data.password} onChange={onchangeHandler} />
        </div>
        <button type='submit'>{currentState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing ,I agree to the terms of use & privacy policy</p>
        </div>

        {
          currentState === "Login" ? <p>Create a new account ? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p> : <p>Already have an account ? <span onClick={() => setCurrentState("Login")}>Login Here</span> </p>
        }


      </form>
    </div>
  )
}

export default LoginPopup
