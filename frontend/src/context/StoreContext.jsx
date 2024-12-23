import { createContext, useEffect } from 'react';
// import { food_list } from '../assets/assets';
import { useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState([]);
    const [foodList, setFoodList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFoodList = async () => {
            try {
                const response = await axios.get('https://localhost:7007/api/food');
                setFoodList(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch food list');
                setLoading(false);
            }
        };

        fetchFoodList();
    }, []);

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    }

    const removeFromCart = (itemId) => {
        // Decrease the count, and remove it if the count reaches 0
        setCartItems((prev) => {
            const newCartItems = { ...prev };
            if (newCartItems[itemId] > 1) {
                newCartItems[itemId] -= 1;
            } else {
                delete newCartItems[itemId];
            }
            return newCartItems;
        });
    };

    // useEffect(() => {
    //     console.log(cartItems);
    // }, [cartItems])

    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const itemId in cartItems) {
            const itemQuantity = cartItems[itemId];


            let itemInfo = foodList.find(food => food.id === parseInt(itemId));
            // console.log(`Looking for item: ${itemId}, Found item:`, itemInfo);


            if (itemInfo) {
                totalAmount += itemInfo.price * itemQuantity;
            }
        }

        return totalAmount;
    };

    // const getTotalCartAmount = () => {
    //     let totalAmount = 0;

    //     // Axios istek ile gelen foodList ile işlemi yapıyoruz
    //     cartItems.forEach((count, itemId) => {
    //         const itemInfo = foodList.find(food => food._id === itemId); // `_id` ile karşılaştırıyoruz
    //         if (itemInfo) {
    //             totalAmount += itemInfo.price * count;
    //         }
    //     });

    //     return totalAmount;
    // };


    const contextValue = {
        food_list: foodList,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider