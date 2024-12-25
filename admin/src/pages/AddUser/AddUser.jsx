import React from 'react'
import './AddUser.css'
// import { assets } from '../../assets/assets'
import { useState } from 'react'
// import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export const AddUser = () => {

    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        isAdmin: 'false',
        balance: '0',
        cartData: "string"
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        if (name === 'balance') {
            value = parseFloat(value);
        } else if (name === 'isAdmin') {
            value = value === 'true';
        }

        setData(data => ({ ...data, [name]: value }));
    };


    const onSubmitHandler = async (e) => {
        e.preventDefault();


        // const payload = {
        //     user: {
        //         name: data.name,
        //         email: data.email,
        //         password: data.password,
        //         isAdmin: data.isAdmin,
        //         balance: data.balance,
        //     }
        // };

        try {
            const response = await axios.post('https://localhost:7007/api/user', data, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('Success:', response.data);
            toast.success('User added successfully');
            setData({
                name: '',
                email: '',
                password: '',
                isAdmin: 'false',
                balance: '0'
            });
            setImage(false);
        } catch (error) {
            console.error('Error uploading user : ', error.response?.data || error.message);
            toast.error('Failed to add user');
        }
    };



    return (
        <div className='add'>
            <form onSubmit={onSubmitHandler} className="flex-col">
                <div className="add-product-name flex-col">
                    <p>User Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type Here' />
                </div>
                <div className="add-product-name flex-col">
                    <p>User Email</p>
                    <input onChange={onChangeHandler} value={data.email} type="text" name='email' placeholder='Type Here' />
                </div>
                <div className="add-product-name flex-col">
                    <p>User Password</p>
                    <input onChange={onChangeHandler} value={data.password} type="text" name='password' placeholder='Type Here' />
                </div>
                <div className="add-product-name flex-col">
                    <p>User Balance</p>
                    <input onChange={onChangeHandler} value={data.balance} type="text" name='balance' placeholder='Type Here' />
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>User Role</p>
                        <select onChange={onChangeHandler} name="isAdmin">
                            <option value="true">Admin</option>
                            <option value="false">Customer</option>
                        </select>
                    </div>
                </div>
                <button type='submit' className="add-btn">ADD</button>
            </form>
        </div>
    )
}
