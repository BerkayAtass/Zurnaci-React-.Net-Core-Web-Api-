import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';


const Profile = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { getUserData } = useContext(StoreContext);


    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match!');
            return;
        }

        try {
            const response = await axios.post(
                'https://localhost:7007/api/auth/reset-password',
                {
                    password: oldPassword,
                    newPassword: newPassword,
                },
                { withCredentials: true }
            );
            alert('Password updated successfully!');
        } catch (error) {
            alert('Failed to update password. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="profile">
            <h1>Welcome, {getUserData.name}</h1>
            <div className="password-change-form">
                <h2>Change Password</h2>
                <div>
                    <label>Old Password:</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Confirm New Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button onClick={handlePasswordChange}>Update Password</button>
            </div>
        </div>
    );
};

export default Profile;
