import React, { useContext } from 'react'
import "./fooddisplay.css"
import { StoreContext } from '../../Context/storeContext'
import FoodItem from '../FoodItem/FoodItem'
const FoodDisplay = ({category}) => {

const {food_list}=useContext(StoreContext)


  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes Near You</h2>
      <div className="food-display-list">
        {food_list.map((item,index)=>{
return <FoodItem key={index} id={item._id} name={item.name} description={item.description} image={item.image} price={item.price}/>
        })} 
      </div>
    </div>
  )
}

export default FoodDisplay
