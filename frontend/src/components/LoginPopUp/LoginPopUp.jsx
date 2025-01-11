import React, { useState } from 'react';
import './LoginPopUp.css';
import { assets } from '../../assets/assets';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';

const LoginPopUp = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState('Login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { setAuth } = useContext(StoreContext);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const userData = { email, password };
        if (currState === "Sign Up") {
            userData.name = username;
            userData.isAdmin = false;
            userData.balance = 0;
            userData.cartData = "string";
        }

        const url = currState === "Login" ? 'https://localhost:7007/api/auth/login' : 'https://localhost:7007/api/auth/register';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            if (url === 'https://localhost:7007/api/auth/register') {
                toast.success('Account created successfully');
            }

            Cookies.set('jwt', data.token);
            setAuth(true);

            console.log(data);
            setShowLogin(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-popup">
            <form className="login-popup-container" onSubmit={handleSubmit}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <input
                            type="text"
                            placeholder="Your name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {currState === "Sign Up" ? "Create account" : "Login"}
                </button>
                {error && <p className="error-message">{error}</p>}
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to terms of use & privacy policy.</p>
                </div>
                {currState === "Login" ? (
                    <p>
                        Create a new account?{" "}
                        <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
                    </p>
                ) : (
                    <p>
                        Already have an account?{" "}
                        <span onClick={() => setCurrState("Login")}>Login Here</span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPopUp;
