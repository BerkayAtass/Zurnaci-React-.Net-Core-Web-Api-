import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const Cart = ({ setShowLogin }) => {

    const { cartItems, food_list, removeFromCart, getTotalCartAmount, auth } = useContext(StoreContext);

    const navigate = useNavigate();

    const OrderHandler = () => {
        // console.log(auth);
        if (!auth) {
            setShowLogin(true);
            toast.error('Please login to proceed');
        } else {
            navigate('/order');
        }
    }


    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Prive</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item) => {

                    if (cartItems[item.id] && cartItems[item.id] > 0) {
                        return (
                            <div key={item._id}>
                                <div className="cart-items-title cart-items-item">
                                    <img src={`https://localhost:7007/api/food/uploads/foods/${item.image}`} alt="" />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <p>{cartItems[item.id]}</p>
                                    <p>${item.price * cartItems[item.id]}</p>
                                    <p onClick={() => removeFromCart(item.id)} className="cross">x</p>
                                </div>
                                <hr />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button id='proceedButton' onClick={OrderHandler} >Proceed to Checkout</button >
                </div>
            </div>
        </div >
    )
}

export default Cart