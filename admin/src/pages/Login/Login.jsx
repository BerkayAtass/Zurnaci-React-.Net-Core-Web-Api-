import React, { useState } from 'react';
import './Login.css';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { setAuth } = useContext(StoreContext);

    const handleSubmit = async (e) => {
        e.preventDefault();


        const loginData = {
            email,
            password,
        };

        try {
            const response = await fetch('https://localhost:7007/api/auth/admin-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (data.token) {
                setAuth(true);
                window.location.href = '/';
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred, please try again later.');
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>

            {message && <div className="error-message">{message}</div>}
        </div>
    );
};

export default Login;
