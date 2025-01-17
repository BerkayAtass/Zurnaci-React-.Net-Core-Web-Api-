import React, { useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useEffect } from 'react';


const navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount, auth, logout, getUserData } = useContext(StoreContext);



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
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
                {auth ? <Link to='/profile' onClick={() => setMenu("mobile-app")} id='profile' className={menu === "mobile-app" ? "active" : ""}>profile</Link> : null}
                {auth ? <Link to='/myorders' onClick={() => setMenu("contact-us")} id='myOrders' className={menu === "contact-us" ? "active" : ""}>my orders</Link> : null}
            </ul>
            <div className="navbar-right">
                {auth ? <h3>${getUserData.balance}</h3> : null}
                <div className="navbar-search-icon">
                    <Link to='/cart'><img id='basketIcon' src={assets.basket_icon} alt="" /></Link>
                    <div className={!getTotalCartAmount() ? "" : "dot"}></div>
                </div>
                <button onClick={handleAuthAction} id="authButton">{auth ? "Logout" : "Sign in / Sign up"}</button>
            </div>
        </div>
    )
}

export default navbar