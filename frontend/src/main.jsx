// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header.jsx";
import Table from "./components/Table.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <>
                        <Header />
                        <Table />
                    </>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);