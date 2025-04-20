import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext=createContext(null)


const StoreContextProvider=(props)=>{
 
const [cartItems,setCartItems]=useState({})
const url=import.meta.env.VITE_BACKEND_URL
const [token,setToken]=useState("")
const [food_list,setFoodList]=useState([])

const addtoCart=(itemId)=>{
if (!cartItems[itemId]) {
    setCartItems((prev)=>({...prev,[itemId]:1}))
}else{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
}
}

const removeFromCart=(itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
}

const getTotalCartAmount= () => {
    let totalAmount=0
    for(const item in cartItems){
let itemInfo=food_list.find((product)=>product._id===item)
totalAmount+=itemInfo.price*cartItems[item]
    }

    return totalAmount
}

const fetchFoodList=async (req,res) => {
   const {data}=await axios.get(url+"/api/food/list")
   setFoodList(data.data)
   
}


useEffect(()=>{

async function loadData(params) {
    await fetchFoodList()

    if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))   
       }
}
loadData()
},[])
    const contextValue={
food_list,
cartItems,
setCartItems,
addtoCart,
removeFromCart,
getTotalCartAmount,
url,
token,setToken
    }
    return(
        <StoreContext.Provider value={contextValue}>
{props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider