import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get("https://localhost:7007/api/order");
            // console.log(response.data); 
            setOrders(response.data);
        } catch (error) {
            toast.error("Error fetching orders");
            console.error(error);
        }
    };


    const statusHandler = async (event, orderId) => {

        const newStatus = event.target.value;

        try {
            const response = await axios.post(
                `https://localhost:7007/api/order/update-status/${orderId}`,
                { status: newStatus }
            );

            if (response.status === 204) {
                fetchAllOrders();
                toast.success("Order status updated");
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.id === orderId ? { ...order, status: newStatus } : order
                    )
                );
            } else {
                toast.error("Failed to update order status");
            }
        } catch (error) {
            toast.error("Failed to update order status");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className='order'>
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.length > 0 ? orders.map((order) => (
                    <div key={order.id} className='order-item'>
                        <img src={assets.parcel_icon} alt="Parcel" />
                        <div className="order-item-details">
                            <p className='order-item-food'>
                                {order.items.map((item, index) => (
                                    <span key={index}>
                                        {item.name} x {item.quantity}
                                        {index < order.items.length - 1 ? ", " : ""}
                                    </span>
                                ))}
                            </p>
                            <p className='order-item-name'>{order.address.firstName} {order.address.lastName}</p>
                            <div className="order-item-address">
                                <p>{order.address.street}</p>
                                <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                            </div>
                            <p className="order-item-phone">{order.address.phone}</p>
                        </div>
                        <p>Items: {order.items.length}</p>
                        <p>${order.amount}</p>
                        <select onChange={(event) => statusHandler(event, order.id)} value={order.status}>
                            <option value="Food Processing">Food Processing</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                )) : <p>No orders available.</p>}
            </div>
        </div>
    );
};

export default Orders;
