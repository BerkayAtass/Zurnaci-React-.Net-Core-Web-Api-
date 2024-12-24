import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
// import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'


const Add = () => {

    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name: '',
        description: '',
        category: '',
        price: ''
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('price', Number(data.price));
        formData.append('Image', image.name);
        formData.append('imageFile', image);

        try {
            const response = await axios.post('https://localhost:7007/api/food', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Success:', response.data);
            toast.success('Product added successfully');
            setData({
                name: '',
                description: '',
                category: '',
                price: ''
            });
            setImage(false);
        } catch (error) {
            console.error('Error uploading product and image:', error.response?.data || error.message);
            toast.error('Failed to add product');
        }
    };



    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    return (
        <div className='add'>
            <form onSubmit={onSubmitHandler} className="flex-col">
                <div className="add-image-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type Here' />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here'></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="Zurna">Salad</option>
                            <option value="Salad">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
                    </div>
                </div>
                <button type='submit' className="add-btn">ADD</button>
            </form>
        </div>
    )
}

export default Add