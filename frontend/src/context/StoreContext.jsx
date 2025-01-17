import { createContext, useEffect } from 'react';
// import { food_list } from '../assets/assets';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });
    const [foodList, setFoodList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [getUserData, setGetUserData] = useState([]);
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        // Check for JWT in cookies on page load
        const token = Cookies.get('jwt');
        console.log(token);

        if (token) {
            try {
                const decoded = jwtDecode(token);
                const isTokenValid = decoded.exp > Date.now() / 1000;
                // console.log(decoded);
                if (isTokenValid) {
                    setAuth(true);
                }
            } catch (err) {
                console.error("Error decoding token:", err);
            }
        } else {
            setAuth(false);
        }

        const getUserDataFunc = async () => {
            try {
                const response = await axios.get('https://localhost:7007/api/auth/user', {
                    withCredentials: true, // Cookie'leri iletmek için gerekli
                });
                console.log(response.data);
                setGetUserData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch food list');
                setLoading(false);
            }
        };


        // Fetch the food list
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

        getUserDataFunc();
        fetchFoodList();
    }, []);



    const ReloadUserData = async () => {
        try {
            const response = await axios.get('https://localhost:7007/api/auth/user', {
                withCredentials: true, // Cookie'leri iletmek için gerekli
            });
            console.log(response.data);
            setGetUserData(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch food list');
            setLoading(false);
        }
    };

    const addToCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId];
            }
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const resetCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    const paymentHandler = async () => {

        var newBalance = Math.floor(getUserData.balance - (getTotalCartAmount() + 2));
        const url = `https://localhost:7007/api/user/${getUserData.id}`;
        const data = {
            "id": getUserData.id,
            "name": getUserData.name,
            "email": getUserData.email,
            "password": getUserData.password,
            "isAdmin": getUserData.isAdmin,
            "balance": newBalance,
            "cartData": getUserData.cartData

        };

        axios.put(url, data)
            .then((res) => {
                toast.success('Data updated successfully');
                ReloadUserData();
            })
            .catch((err) => {
                console.error('Update error:', err.response?.data || err.message);
                toast.error('Failed to update data');
            });
    }

    // useEffect(() => {
    //     console.log(cartItems);
    // }, [cartItems])


    const logout = async () => {
        try {
            await axios.post('https://localhost:7007/api/auth/logout', {}, {
                withCredentials: true,
            });
            Cookies.remove('jwt');
            setAuth(false);
            resetCart();
            toast.success('Logged out successfully.');
        } catch (error) {
            console.error("Logout failed:", error);
        }
        ReloadUserData();

    };

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
        resetCart,
        getTotalCartAmount,
        auth,
        logout,
        setAuth,
        getUserData,
        resetCart,
        paymentHandler,

    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider