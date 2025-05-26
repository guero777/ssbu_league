import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import './EditGamerTag.css';

const EditGamerTag = () => {
    const navigate = useNavigate();
    const [gamerTag, setGamerTag] = useState('');
    const [newGamerTag, setNewGamerTag] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchGamerTag();
    }, []);

    const fetchGamerTag = () => {
        fetch(`${API_BASE_URL}/api/user/current-gamertag`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 401) {
                    navigate('/login');
                    throw new Error('Not authenticated');
                }
                if (!response.ok) {
                    throw new Error('Server error');
                }
                return response.text();
            })
            .then(data => setGamerTag(data))
            .catch(error => {
                console.error('Error:', error);
                if (error.message !== 'Not authenticated') {
                    setError('Error loading gamertag');
                }
            });
    };

    const handleGamerTagChange = (e) => {
        setNewGamerTag(e.target.value);
    };

    const startEditing = () => {
        setNewGamerTag(gamerTag);
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setError('');
    };

    const saveGamerTag = () => {
        fetch(`${API_BASE_URL}/api/user/update-gamertag`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ gamerTag: newGamerTag })
        })
            .then(response => {
                if (response.status === 401) {
                    navigate('/login');
                    throw new Error('Not authenticated');
                }
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text); });
                }
                return response.text();
            })
            .then(() => {
                setGamerTag(newGamerTag);
                setIsEditing(false);
                setSuccess('Gamertag updated successfully!');
                setTimeout(() => setSuccess(''), 3000);
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error.message || 'Error updating gamertag');
            });
    };

    return (
        <div className="profile-box">
            <h2>Your Gamertag</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            
            {isEditing ? (
                <div className="edit-gamertag">
                    <input 
                        type="text" 
                        value={newGamerTag || ''} 
                        onChange={handleGamerTagChange}
                        placeholder="Enter your gamertag"
                    />
                    <div className="button-group">
                        <button onClick={saveGamerTag} className="save-button">Save</button>
                        <button onClick={cancelEditing} className="cancel-button">Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="display-gamertag">
                    <p>{gamerTag || 'No tag'}</p>
                    <button onClick={startEditing} className="edit-button">Edit</button>
                </div>
            )}
        </div>
    );
};

export default EditGamerTag;
