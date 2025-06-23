import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

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
        fetch(`${API_BASE_URL}/api/user/edit-gamertag`, {
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
        <div className="bg-black/60 rounded-lg p-6 shadow-lg border border-red-900/50">
            <h2 className="text-3xl text-center font-bold text-white mb-4">Your Gamertag</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            
            {isEditing ? (
                <div className="space-y-4">
                    <input 
                        type="text" 
                        value={newGamerTag || ''}
                        className="w-full px-3 py-2 text-2xl text-center bg-black/50 border border-red-900/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        onChange={handleGamerTagChange}
                    />
                    <div className="flex space-x-3">
                        <button 
                            onClick={saveGamerTag}
                            className="px-4 py-2 bg-red-900/50 text-white rounded-md hover:bg-red-800 transition-colors duration-200"
                        >
                            Save
                        </button>
                        <button 
                            onClick={cancelEditing}
                            className="px-4 py-2 bg-black/70 text-white rounded-md hover:bg-black/90 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between">
                    <p className="text-center text-2xl text-gray-200">{gamerTag || 'No gamertag set'}</p>
                    <button 
                        onClick={startEditing}
                        className="px-8 py-2 bg-red-900/50 text-2xl text-white rounded-md hover:bg-red-900/70 transition-colors duration-200"
                    >
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditGamerTag;
