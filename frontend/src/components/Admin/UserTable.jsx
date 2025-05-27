// src/components/UserTable.jsx
import React, { useState, useEffect } from 'react';
import './UserTable.css';
import axios from 'axios';
import { API_BASE_URL } from '../../config.js';
import UserEdit from './UserEdit.jsx';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/admin/get-user-table`, {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (response.data) {
                setUsers(response.data);
            }
            console.log('Fetched users:', response.data); // Debug log
        } catch (error) {
            console.error("Error fetching users:", error);
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

const handleDelete = async (username) => {
  try {
    // note: use axios.delete and put the username into the URL
    await axios.delete(
      `${API_BASE_URL}/api/admin/delete-user/${encodeURIComponent(username)}`,
      { withCredentials: true }
    );
    fetchUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
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
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(user.username)}
                            >
                                Delete
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