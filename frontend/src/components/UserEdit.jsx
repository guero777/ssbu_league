// src/components/EditUserModal.jsx
import React, { useState } from 'react';
import './UserEdit.css';
import axios from 'axios';

const EditUserModal = ({ user, onClose, onUserUpdated }) => {
    const [editedUser, setEditedUser] = useState({
        ...user,
        password: '' // Empty password field by default
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/users/${user.id}`, editedUser, {
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
                            value={editedUser.username}
                            onChange={(e) => setEditedUser({...editedUser, username: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Gamer Tag:</label>
                        <input
                            type="text"
                            value={editedUser.gamerTag || ''}
                            onChange={(e) => setEditedUser({...editedUser, gamerTag: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>New Password:</label>
                        <input
                            type="password"
                            value={editedUser.password}
                            onChange={(e) => setEditedUser({...editedUser, password: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Role:</label>
                        <select
                            value={editedUser.role}
                            onChange={(e) => setEditedUser({...editedUser, role: e.target.value})}
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

export default EditUserModal;