import React, { useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount, auth, logout } = useContext(StoreContext);

    const handleAuthAction = () => {
        if (auth) {
            logout();
        } else {
            setShowLogin(true);
        }
    };

    return (
        <div className="navbar">
            <Link to='/'><img src={assets.logo} alt="logo" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
                <a onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
                <a onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={!getTotalCartAmount() ? "" : "dot"}></div>
                </div>
                <button onClick={handleAuthAction} >{auth ? "Logout" : "Sign in / Sign up"}</button>
            </div>
        </div>
    )
}

export default navbar