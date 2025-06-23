// src/components/UserTable.jsx
import React, { useState, useEffect } from 'react';
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
        <div className="w-full overflow-x-auto rounded-lg shadow-md border border-red-900/30">
            <table className="w-full text-sm text-left text-gray-200">
                <thead className="text-xs uppercase bg-black/60 text-gray-200 border-b border-red-900/30">
                <tr>
                    <th className="px-6 py-3">Username</th>
                    <th className="px-6 py-3">Password</th>
                    <th className="px-6 py-3">Gamer Tag</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Actions</th>
                </tr>
                </thead>
                <tbody className="bg-black/40 divide-y divide-red-900/30">
                {users.map((user) => (
                    <tr key={user.username} className="hover:bg-red-950/20">
                        <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                        <td className="px-6 py-4">****</td>
                        <td className="px-6 py-4">{user.gamerTag || '-'}</td>
                        <td className="px-6 py-4">{user.role}</td>
                        <td className="px-6 py-4 space-x-2">
                            <button
                                className="bg-red-900/50 text-white/90 px-3 py-1 rounded-md text-sm border border-red-900/50 hover:border-red-900/70 transition-all duration-200 hover:-translate-y-1"
                                onClick={() => handleEditClick(user)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-black/60 hover:bg-black/80 text-white px-3 py-1 rounded-md text-sm transition-colors duration-200 border border-red-900/50"
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