// src/components/Dashboard.jsx
import React from 'react';
import Table from './Table';

const Dashboard = () => {
    return (
        <>
            <div className="dashboard-container">
                <h2 className="dashboard-title">Leaderboard</h2>
                <Table />
            </div>
        </>
    );
};

export default Dashboard;
