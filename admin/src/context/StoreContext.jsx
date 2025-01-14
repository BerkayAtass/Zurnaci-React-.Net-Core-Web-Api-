import { createContext, useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [auth, setAuth] = useState(false);

    const navigate = useNavigate(); // React Router navigate hook

    useEffect(() => {
        // Check for JWT in cookies on page load
        const token = Cookies.get('jwt');
        console.log(token);

        if (token) {
            try {
                const decoded = jwtDecode(token);
                const isTokenValid = decoded.exp > Date.now() / 1000;
                if (isTokenValid) {
                    setAuth(true);
                }
            } catch (err) {
                console.error("Error decoding token:", err);
            }
        } else {
            setAuth(false);
        }


        if (!auth) {
            // If not authenticated, redirect to login page
            navigate('/login');
        } else {
            isAdminVerify();
        }

    }, [auth, navigate]);

    const isAdminVerify = async () => {
        try {
            const response = await axios.get('https://localhost:7007/api/auth/admin-only', {
                withCredentials: true,
            });

            if (response.status === 200) {
                setAuth(true);
            } else {
                setAuth(false);
            }

            setLoading(false);
        } catch (err) {
            setAuth(false);
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await axios.post('https://localhost:7007/api/auth/logout', {}, {
                withCredentials: true,
            });
            Cookies.remove('jwt');
            setAuth(false);
            resetCart();
        } catch (error) {
            console.error("Logout failed:", error);
        }
        isAdminVerify();
    };

    const contextValue = {
        auth,
        logout,
        setAuth,
        isAdminVerify,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
