import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Food Delivery</p>
                    <div className="classname">

                    </div>
                </div>
                <div className="footer-content-center">

                </div>
                <div className="footer-content-right">

                </div>
            </div>
        </div>
    )
}

export default Footer