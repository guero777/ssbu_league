// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./components/App.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Profile from "./components/Profile/Profile.jsx";
import AdminPanel from "./components/Admin/AdminPanel.jsx";
import { AuthProvider } from './components/AuthContext.jsx';
import PrivateRoute from './components/PrivateRoute';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/user/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
                    <Route path="/admin/panel" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
                    <Route path="/user/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);