// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';
import Table from "./components/Table.jsx";
import Header from "./components/Header.jsx"; // optional

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Header />
        <Table />
    </React.StrictMode>,
);
