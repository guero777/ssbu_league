// src/components/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Scoreboard from './Scoreboard.jsx';
import { useAuth } from './AuthContext.jsx';
import './Dashboard.css';

const Dashboard = () => {
    const { userRole, username, isLoading } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <h3 className='welcome-message'>Welcome, {username} ({userRole})</h3>
            <div className="dashboard-navigation">
                <button
                    onClick={() => navigate('/user/profile')}
                    className="user-panel-button"
                >
                    Profile Settings
                </button>
                {userRole === 'ADMIN' && (
                    <button
                        onClick={() => navigate('/admin/panel')}
                        className="admin-panel-button"
                    >
                        Admin
                    </button>
                )}
            </div>

            <main className="dashboard-content">
                <Scoreboard />
            </main>
        </div>
    );
};

export default Dashboard;