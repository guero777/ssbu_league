import { useState } from 'react';
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-black/90 rounded-lg shadow-xl p-6 w-full max-w-md border border-red-900/50">
                <h2 className="text-2xl font-bold mb-6 text-white">Edit User</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-200">Username:</label>
                        <input
                            type="text"
                            value={editedUser.newUsername}
                            onChange={(e) => setEditedUser({...editedUser, newUsername: e.target.value})}
                            className="w-full px-3 py-2 bg-black/50 border border-red-900/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-200">Gamer Tag:</label>
                        <input
                            type="text"
                            value={editedUser.newGamerTag}
                            onChange={(e) => setEditedUser({...editedUser, newGamerTag: e.target.value})}
                            className="w-full px-3 py-2 bg-black/50 border border-red-900/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-200">New Password:</label>
                        <input
                            type="password"
                            value={editedUser.newPassword}
                            onChange={(e) => setEditedUser({...editedUser, newPassword: e.target.value})}
                            className="w-full px-3 py-2 bg-black/50 border border-red-900/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-200">Role:</label>
                        <select
                            value={editedUser.newRole}
                            onChange={(e) => setEditedUser({...editedUser, newRole: e.target.value})}
                            className="w-full px-3 py-2 bg-black/50 border border-red-900/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="px-4 py-2 bg-black/70 text-white rounded-md hover:bg-black/90 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="px-4 py-2 bg-red-900/50 text-white/90 rounded-md border border-red-900/50 hover:border-red-900/70 transition-all duration-200 hover:-translate-y-1"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;