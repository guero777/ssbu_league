// src/components/AdminPanel.jsx
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';
import UserTable from "./UserTable.jsx";

const AdminPanel = () => {
    const navigate = useNavigate();


    return (
        <div className="admin-panel-container">
            <div className="admin-panel-header">
                <button className={"back-button"} onClick={() => navigate('/dashboard')}>
                    Back
                </button>
                <h1>Admin Panel</h1>
            </div>
            <UserTable />
            </div>
    );
};

export default AdminPanel;