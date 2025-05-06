// src/components/Dashboard.jsx
import React from 'react';
import Scoreboard from './Scoreboard.jsx';

const Dashboard = () => {
    return (
        <>
            <div className="dashboard-container">
                <h1 className="dashboard-title">Dashboard</h1>
            </div>
            <div>
                <Scoreboard />
            </div>
        </>
    );
};

export default Dashboard;
