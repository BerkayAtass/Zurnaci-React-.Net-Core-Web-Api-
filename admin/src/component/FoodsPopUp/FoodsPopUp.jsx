import React, { useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'

const LoginPopUp = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState('Login')
    return (
        <div div className='login-popup' >
            <form className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                </div>
                <div className="login-popup-inputs">
                    <input type="text" placeholder="Enter Product Name" className='form-control' value={editName} onChange={(e) => setEditName(e.target.value)} />
                    <input type="text" placeholder="Enter Description" className='form-control' value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                    <input type="text" placeholder="Enter Category" className='form-control' value={editCategory} onChange={(e) => setEditCategory(e.target.value)} />
                    <input type="text" placeholder="Enter Price" className='form-control' value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
                </div>
                <button>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                {
                    currState === "Login"
                        ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
                        : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
                }


            </form>
        </div>
    )
}

export default LoginPopUp