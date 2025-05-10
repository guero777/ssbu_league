// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./components/App.jsx";
import Scoreboard from "./components/Scoreboard.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./components/Dashboard.jsx";
import UserPanel from "./components/UserPanel.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import { AuthProvider } from './components/AuthContext.jsx'; // Updated path

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/user-panel" element={<UserPanel/>} />
                    <Route path="/admin-panel" element={<AdminPanel />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);