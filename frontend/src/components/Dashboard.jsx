// src/components/Dashboard.jsx
import React from 'react';
import Scoreboard from './Scoreboard.jsx';

const Dashboard = () => {
    return (
        <>
            <div className="dashboard-container">
                <h2 className="dashboard-title">Dashboard</h2>
                <Scoreboard />
            </div>
        </>
    );
};

export default Dashboard;
