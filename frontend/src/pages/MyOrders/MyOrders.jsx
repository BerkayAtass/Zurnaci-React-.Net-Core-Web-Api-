import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const { getUserData } = useContext(StoreContext);

    useEffect(() => {
        if (getUserData && getUserData.id) {
            const fetchMyOrders = async () => {
                try {
                    const response = await axios.get(`https://localhost:7007/api/order/myorders/${getUserData.id}`);
                    setOrders(response.data);

                } catch (error) {
                    console.error("Error fetching user's orders:", error);
                }
            };

            fetchMyOrders();
        }
    }, [getUserData]);

    return (

        <div className='order'>
            <h3>My Orders</h3>
            <div className="order-list">
                {orders.length > 0 ? orders.map((order) => (
                    <div id='orderItem' key={order.id} className='order-item'>
                        <img src={assets.parcel_icon} alt="Parcel" />
                        <div className="order-item-details">
                            <h4>Order ID: {order.id}</h4>
                            <p>Amount: ${order.amount}</p>
                            <p>Status: {order.status}</p>
                            <p>Date: {new Date(order.date).toLocaleString()}</p>
                        </div>
                    </div>
                )) : <p>No orders found</p>}
            </div>
        </div>
    )
};

export default MyOrders;
