// src/components/EditUser.jsx
import React, { useState } from 'react';
import './UserEdit.css';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const EditUser = ({ user, onClose, onUserUpdated }) => {
    const [editedUser, setEditedUser] = useState({
        originalUsername: user.username,
        newUsername: user.username,
        newPassword: '',
        newRole: user.role,
        newGamerTag: user.gamerTag || ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_BASE_URL}/api/admin/edit-user`, editedUser, {
                withCredentials: true
            });
            onUserUpdated(); // Refresh the table data
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={editedUser.newUsername}
                            onChange={(e) => setEditedUser({...editedUser, newUsername: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Gamer Tag:</label>
                        <input
                            type="text"
                            value={editedUser.newGamerTag}
                            onChange={(e) => setEditedUser({...editedUser, newGamerTag: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>New Password:</label>
                        <input
                            type="password"
                            value={editedUser.newPassword}
                            onChange={(e) => setEditedUser({...editedUser, newPassword: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Role:</label>
                        <select
                            value={editedUser.newRole}
                            onChange={(e) => setEditedUser({...editedUser, newRole: e.target.value})}
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                    <div className="modal-buttons">
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;