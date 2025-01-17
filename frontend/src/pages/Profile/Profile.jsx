import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';


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
            toast.success('Password updated successfully!');
        } catch (error) {
            toast.error('Failed to update password. Please try again.');
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
                        id='oldPassword'
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        id='newPassword1'
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Confirm New Password:</label>
                    <input
                        id='newPassword2'
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button id='submitPass' onClick={handlePasswordChange}>Update Password</button>
            </div>
        </div>
    );
};

export default Profile;
