// src/components/AdminPanel.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
    const navigate = useNavigate();

    return (
        <div className="admin-panel-container">
            <div className="admin-panel-header">
                <button onClick={() => navigate('/dashboard')}>
                    Back
                </button>
                <h1>Admin Panel</h1>
                <p>Welcome to the admin panel!</p>
                <p>Here you can manage users and system settings.</p>

            </div>
            TODO add user table that lets me edit any user from the table
        </div>
    );
};

export default AdminPanel;