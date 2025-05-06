// src/components/Dashboard.jsx
import React from 'react';
import Scoreboard from './Scoreboard.jsx';
import { useAuth } from './AuthContext.jsx';
import DashboardNavigationPanel from "./DashboardNavigationPanel.jsx";

const Dashboard = () => {
    const { userRole, isLoading } = useAuth();


    return (
        <>
            <div className="dashboard-container">
                <h1>Dashboard</h1>
                <DashboardNavigationPanel/>
            </div>
            <div>
                <Scoreboard />
            </div>
        </>
    );
};

export default Dashboard;