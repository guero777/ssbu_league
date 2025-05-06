// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home.jsx";
import Scoreboard from "./components/Scoreboard.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./components/Dashboard.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <>
                        <Home />
                    </>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/*
                MAYBE I WILL IMPLEMENT THEM???
                <Route path={"/settings"} element={<Settings />} />
                <Route path={"/admin"} element={<Admin />} />
                */}
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);