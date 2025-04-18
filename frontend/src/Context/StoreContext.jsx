import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
export const StoreContext=createContext(null)


const StoreContextProvider=(props)=>{
 
const [cartItems,setCartItems]=useState({})
const url=import.meta.env.VITE_BACKEND_URL
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

    const contextValue={
food_list,
cartItems,
setCartItems,
addtoCart,
removeFromCart,
getTotalCartAmount,
url
    }
    return(
        <StoreContext.Provider value={contextValue}>
{props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider