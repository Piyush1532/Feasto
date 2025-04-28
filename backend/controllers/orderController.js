import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

//placing user order from frontend

const placeOrder = async (req, res) => {
 
const frontend_url="http://localhost:5173"

  try {

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log(process.env.STRIPE_SECRET_KEY);
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const lineItems = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
        quantity: item.quantity,
      },
    }));
    lineItems.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery  charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity:1
    });

const session=await stripe.checkout.sessions.create({
    line_items:lineItems,
    mode:"payment",
    success_url:`${frontend_url}/verfify?success=true&orderId=${newOrder._id}`,
    cancel_url:`${frontend_url}/verfify?success=false&orderId=${newOrder._id}`,
})

res.json({success:true,session_url:session.url})
  } 
  catch (error) {
console.log(error)
res.json({success:false,message:error})
  }
};

export { placeOrder };
