import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'



const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext)

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you!!!</h2>
            <div className="food-display-list">
                {food_list.map((food, index) => {
                    console.log(category, food.category)
                    if (category === "All" || category === food.category) {
                        return <FoodItem key={index} id={food._id} name={food.name} image={food.image} price={food.price} description={food.description} />
                    }

                })}
            </div>

        </div>
    )
}

export default FoodDisplay