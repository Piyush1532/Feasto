import React from 'react'
import "./footer.css"
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo voluptatem officiis illum delectus iure quasi provident odio laboriosam excepturi commodi.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Company</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
            </div> 
        <div className="footer-content-right">
            <h2>Get In Touch</h2>
            <ul>
                <li>+12737333</li>
                <li>festo@gmail.com</li>
            </ul>
            </div>   
         </div>
         <hr />
         <p className='footer-copyright'>Copyright 2025 Festo.com All rights reserved </p>
    </div>
  )
}

export default Footer
