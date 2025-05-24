import React from 'react';
import {useNavigate} from 'react-router-dom';
import './App.css';
import Scoreboard from "./Scoreboard.jsx";

const App = () => {
  const navigate = useNavigate();

  // TODO put Header html in component, only return header.jsx and scoreboard.jsx
  return (
    <div className="home-container">
      <nav className="nav-bar">
        <div className="nav-logo">SSBU League</div>
        <div className="nav-buttons">
          <button
            className="login-button"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="register-button"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </nav>
      <main className="main-content">
        <div className="table-container">
          <Scoreboard />
        </div>
      </main>
    </div>
  );
};

export default App;