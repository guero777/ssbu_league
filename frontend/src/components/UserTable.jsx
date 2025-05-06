// src/components/UserTable.jsx
import React, { useState, useEffect } from 'react';
import './UserTable.css';
import axios from 'axios';

const UserTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/get-user-table', {
                    withCredentials: true
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="user-table-container">
            <table className="user-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Gamer Tag</th>
                    <th>Created At</th>
                    <th>Role</th>
                    <th>Edit???</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>****</td>
                        <td>{user.gamerTag || '-'}</td>
                        <td>{formatDate(user.createdAt)}</td>
                        <td>{user.role}</td>
                        <td>
                            <button
                                className="edit-button"
                                onClick={() => console.log('Edit clicked for:', user.username)}
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;