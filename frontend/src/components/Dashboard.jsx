// src/components/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Scoreboard from './Scoreboard.jsx';
import { useAuth } from './AuthContext.jsx';
import './Dashboard.css';

const Dashboard = () => {
    const { userRole, isLoading } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <div className="dashboard-navigation">
                <button
                    onClick={() => navigate('/user-panel')}
                    className="user-panel-button"
                >
                    User Panel
                </button>

                {userRole === 'ADMIN' && (
                    <button
                        onClick={() => navigate('/admin-panel')}
                        className="admin-panel-button"
                    >
                        Admin Panel
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