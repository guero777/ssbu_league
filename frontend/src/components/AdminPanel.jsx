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
                <button className={"back-button"} onClick={() => navigate('/user/dashboard')}>
                    Back
                </button>
            </div>
            <div className="admin-panel-content">
                <UserTable />
            </div>
        </div>
    );
};

export default AdminPanel;