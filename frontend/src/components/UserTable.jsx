// src/components/UserTable.jsx
import React, { useState, useEffect } from 'react';
import './UserTable.css';
import axios from 'axios';
import UserEdit from './UserEdit.jsx';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

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


    const handleEditClick = (user) => {
        setSelectedUser(user);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    const handleUserUpdated = () => {
        fetchUsers(); // Refresh the table after update
        handleCloseModal();
    };

    return (
        <div className="user-table-container">
            <table className="user-table">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Gamer Tag</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.username}>
                        <td>{user.username}</td>
                        <td>****</td>
                        <td>{user.gamerTag || '-'}</td>
                        <td>{user.role}</td>
                        <td>
                            <button
                                className="edit-button"
                                onClick={() => handleEditClick(user)}
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedUser && (
                <UserEdit
                    user={selectedUser}
                    onClose={handleCloseModal}
                    onUserUpdated={handleUserUpdated}
                />
            )}
        </div>
    );
};

export default UserTable;