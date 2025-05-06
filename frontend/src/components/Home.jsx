import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import Scoreboard from "./Scoreboard.jsx";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <nav className="nav-bar">
        <div className="nav-logo">SSBU League</div>
        <div className="nav-buttons">
          <button
            className="auth-button login-button"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="auth-button register-button"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </nav>
      <main className="main-content">
        <div className="table-container">
          <h2>Rankings</h2>
          <Scoreboard/>
        </div>
      </main>
    </div>
  );
};

export default Home;