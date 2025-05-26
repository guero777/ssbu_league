import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import EditUsername from './EditUsername';
import EditGamerTag from './EditGamerTag';
import MainCharacters from './MainCharacters';
import "./Profile.css"

const Profile = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Fetch the current user's username when component mounts
        fetch(`${API_BASE_URL}/api/user/current-user`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 401) {
                    navigate('/login');
                    throw new Error('Not authenticated');
                }
                if (!response.ok) {
                    throw new Error('Server error');
                }
                return response.text();
            })
            .then(data => setUsername(data))
            .catch(error => {
                console.error('Error:', error);
                if (error.message !== 'Not authenticated') {
                    alert('Error loading profile');
                }
            });
    }, [navigate]);



    return (
        <div className="profile-container">
            <button className="back-button" onClick={() => navigate('/user/dashboard')}>
                Back
            </button>
            <div className="profile-header">
                <p className="profile-header-text">Welcome, {username}!</p>
            </div>
            <div className="profile-content">
                <EditUsername />
                <EditGamerTag />
                <MainCharacters />
            </div>
        </div>
    );
};

export default Profile;
