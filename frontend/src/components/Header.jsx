// src/components/Header.jsx
import React from 'react';
import './header.css'; // Import the CSS for styling

const Header = () => {
    return (
        <div className="head-container">
            <h1 className="header">SSBU League </h1>
            <div className="button-container">
                <button className="btn">Register</button>
                <button className="btn">Login</button>
            </div>
        </div>
    );
};

export default Header;
