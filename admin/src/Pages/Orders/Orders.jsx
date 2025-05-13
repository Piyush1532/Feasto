import React, { useEffect, useState } from 'react';
import './order.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = () => {
  const url = import.meta.env.VITE_API_URL;
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
    
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Server error while fetching orders");
      console.error(error);
    }
  };

const statusHandler=async (event,orderId) => {
const response=await axios.post(url+"/api/order/status",{
  orderId,
  status:event.target.value
})

if (response.data.success) {
 await  fetchAllOrders()
}
}

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div className="order-item" key={index}>
            <img src={assets.parcel_icon} alt="Parcel Icon" />

            <div className="order-details">
              <p className='order-item-food'>
                {order.items.map(item => `${item.name} x ${item.quantity}`).join(', ')}
              </p>

              <p className='order-item-name'>
                {order.address.firstName} {order.address.lastName}
              </p>

              <div className='order-item-address'>
                <p>{order.address.street},</p>
                <p>{order.address.city} {order.address.space} {order.address.country}, {order.address.zipcode}</p>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>

              <p>Items: {order.items.length}</p>
              <p>Total: ${order.amount}</p>

              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} >
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
