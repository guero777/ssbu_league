import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../index.css';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile/Profile';
import AdminPanel from './components/Admin/AdminPanel';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/user/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
                    <Route path="/admin/panel" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
                    <Route path="/user/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);