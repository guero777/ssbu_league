import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import './Profile.css';

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
        <div className="profile-box">
            <h3>Edit Username</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                <button type="submit" className="submit-button">
                    Update
                </button>
            </form>
        </div>
    );
};

export default EditUsername;
