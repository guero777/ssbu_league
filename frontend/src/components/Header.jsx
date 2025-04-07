// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
    return (
        <div className="head-container">
            <h1 className="header">SSBU League</h1>
            <div className="button-container">
                <Link to="/register" className="button">Register</Link>
                <Link to="/login" className="button">Login</Link>
            </div>
        </div>
    );
};

export default Header;
