// src/components/NavigationPanel.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const NavigationPanel = () => {
    const navigate = useNavigate();
    const { userRole } = useAuth();

    return (
        <div className="navigation-panel">
            <button 
                onClick={() => navigate('/user-panel')}
                className="nav-button user-panel-btn"
            >
                User Panel
            </button>
            
            {userRole === 'ADMIN' && (
                <button 
                    onClick={() => navigate('/admin-panel')}
                    className="nav-button admin-panel-btn"
                >
                    Admin Panel
                </button>
            )}
        </div>
    );
};

export default NavigationPanel;