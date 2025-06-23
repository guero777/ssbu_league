import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const EditUsername = () => {
    const [newUsername, setNewUsername] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await axios.put(`${API_BASE_URL}/api/user/edit-username`, null, {
                params: { newUsername },
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setSuccess('Username updated successfully!');
            setNewUsername('');
        } catch (error) {
            setError(error.response?.data || 'Failed to update username');
        }
    };

    return (
        <div className="bg-black/60 rounded-lg p-6 shadow-lg border border-red-900/50">
            <h3 className="text-3xl text-center font-bold text-white mb-4">Edit Username</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder="Username"
                        required
                        className="w-full px-3 py-4 bg-black/50 text-2xl text-center border border-red-900/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>
                {error && <div className="text-red-500">{error}</div>}
                {success && <div className="text-green-500">{success}</div>}
                <button 
                    type="submit" 
                    className="w-full px-4 py-4 text-2xl bg-red-900/50 text-white/90 rounded-md border border-red-900/50 hover:border-red-900/70 transition-all duration-200 hover:-translate-y-1"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default EditUsername;
