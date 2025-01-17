import React from 'react'
import './PlaceOrder.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { use } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'



const PlaceOrder = () => {

    const { getTotalCartAmount, auth, food_list, cartItems, getUserData, resetCart, paymentHandler } = useContext(StoreContext)
    // useEffect(() => { console.log(auth.id) }, [])
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (event) => {
        event.preventDefault();



        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item.id] > 0) {
                let itemInfo = {
                    id: 0,
                    orderId: 0,
                    foodId: item.id,
                    category: item.category,
                    description: item.description,
                    image: item.image,
                    name: item.name,
                    price: item.price,
                    quantity: cartItems[item.id],
                };
                orderItems.push(itemInfo);
            }
        });


        console.log(orderItems);
        let orderData = {
            id: 0,
            userId: getUserData.id,
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
            status: "Food Processing",
            payment: true,
            date: new Date().toISOString(),
        };

        try {
            let response = await axios.post('https://localhost:7007/api/order', orderData, {
                headers: { 'Content-Type': 'application/json' },
            });

            toast.success("Order placed successfully!");
            paymentHandler();
            resetCart();
            navigate('/');
        } catch (error) {
            console.error("Error placing order:", error);
            toast.info("Your order is being processed. Please check back later.");
            paymentHandler();
            resetCart();
            navigate('/');
        }
    };

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (globalUserData) {
    //         console.log(globalUserData)
    //     } else {
    //         console.log('globalUserData missing')
    //     }
    // }, [])

    useEffect(() => {
        console.log(getUserData)
        if (!auth) {
            navigate('/cart')
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [auth])

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input required name='firstName' id='firstName' onChange={onChangeHandler} type="text" placeholder='First Name' />
                    <input required name='lastName' id='lastName' onChange={onChangeHandler} type="text" placeholder='Last Name' />
                </div>
                <input className='emaill' id='email' onChange={onChangeHandler} required name='email' type="email" placeholder='Email address' />
                <input className='streett' id='street' onChange={onChangeHandler} required name='street' type="text" placeholder='Street' />
                <div className="multi-fields">
                    <input required name='city' id='city' onChange={onChangeHandler} type="text" placeholder='City' />
                    <input required name='state' id='state' onChange={onChangeHandler} type="text" placeholder='State' />
                </div>
                <div className="multi-fields">
                    <input required name='zipcode' id='zipCode' onChange={onChangeHandler} type="text" placeholder='Zip code' />
                    <input required name='country' id='country' onChange={onChangeHandler} type="text" placeholder='Country' />
                </div>
                <input className='phonee' id='phone' onChange={onChangeHandler} required name='phone' type="text" placeholder='Phone' />
            </div>
            <div className="place-order-right">
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
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button id='proceedButton' type='submit'>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder