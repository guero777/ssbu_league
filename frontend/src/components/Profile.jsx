import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Profile.css"

const Profile = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [gamerTag, setGamerTag] = useState('');
    const [newGamerTag, setNewGamerTag] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [characters, setCharacters] = useState([]);
    const [mainCharacters, setMainCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState('');
    const [characterError, setCharacterError] = useState('');
    const [characterSuccess, setCharacterSuccess] = useState('');

    useEffect(() => {
        // Fetch the current user's username when component mounts
        fetch('http://localhost:8080/api/user/current-user', {
            credentials: 'include',  // This is important for sending cookies
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
            .then(data => setUsername(data))
            .catch(error => {
                console.error('Error:', error);
                if (error.message !== 'Not authenticated') {
                    // Only show alert for non-authentication errors
                    alert('Error loading profile');
                }
            });
            
        // Fetch the current user's gamertag
        fetch('http://localhost:8080/api/user/current-gamertag', {
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
                    alert('Error loading gamertag');
                }
            });

        // Fetch available characters
        fetch('http://localhost:8080/api/characters', {
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
                return response.json();
            })
            .then(data => setCharacters(data))
            .catch(error => {
                console.error('Error:', error);
                if (error.message !== 'Not authenticated') {
                    alert('Error loading characters');
                }
            });

        // Fetch user's main characters
        fetch('http://localhost:8080/api/user/main-characters', {
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
                return response.json();
            })
            .then(data => setMainCharacters(data))
            .catch(error => {
                console.error('Error:', error);
                if (error.message !== 'Not authenticated') {
                    alert('Error loading main characters');
                }
            });
    }, [navigate]);

    const handleGamerTagChange = (e) => {
        setNewGamerTag(e.target.value);
    };
    
    const startEditing = () => {
        setIsEditing(true);
        setError('');
        setSuccess('');
    };
    
    const cancelEditing = () => {
        setIsEditing(false);
        setNewGamerTag(gamerTag);
        setError('');
    };
    
    const saveGamerTag = () => {
        if (!newGamerTag || newGamerTag.trim() === '') {
            setError('Gamertag cannot be empty');
            return;
        }
        
        fetch('http://localhost:8080/api/user/change-gamertag', {
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
                setTimeout(() => setSuccess(''), 3000); // Clear success message after 3 seconds
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error.message || 'Error updating gamertag');
            });
    };

    const handleCharacterSelect = (e) => {
        setSelectedCharacter(e.target.value);
    };

    const addMainCharacter = () => {
        if (!selectedCharacter) {
            setCharacterError('Please select a character');
            return;
        }

        if (mainCharacters.length >= 3) {
            setCharacterError('You can only have up to 3 main characters');
            return;
        }

        const character = characters.find(c => c.name === selectedCharacter);
        if (!character) {
            setCharacterError('Invalid character selected');
            return;
        }

        if (mainCharacters.some(c => c.name === character.name)) {
            setCharacterError('This character is already in your main characters');
            return;
        }

        const updatedMainCharacters = [...mainCharacters, character];
        updateMainCharacters(updatedMainCharacters);
    };

    const removeMainCharacter = (character) => {
        const updatedMainCharacters = mainCharacters.filter(c => c.name !== character.name);
        updateMainCharacters(updatedMainCharacters);
    };

    const updateMainCharacters = (charactersList) => {
        const characterNames = charactersList.map(char => char.name);
        
        fetch('http://localhost:8080/api/user/update-main-characters', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(characterNames)
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
            .then(() => {
                setMainCharacters(charactersList);
                setSelectedCharacter('');
                setCharacterError('');
                setCharacterSuccess('Main characters updated successfully!');
                setTimeout(() => setCharacterSuccess(''), 3000); // Clear success message after 3 seconds
            })
            .catch(error => {
                console.error('Error:', error);
                setCharacterError(error.message || 'Error updating main characters');
            });
    };

    return (
        <div className="profile-container">
            <button className="back-button" onClick={() => navigate('/user/dashboard')}>
                Back
            </button>
            <div className="profile-header">
                <p className="profile-header-text">Welcome, {username}!</p>
            </div>
            
            <div className="gamertag-section">
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
            
            <div className="main-characters-section">
                <h2>Your Main Characters</h2>
                {characterError && <p className="error-message">{characterError}</p>}
                {characterSuccess && <p className="success-message">{characterSuccess}</p>}
                
                <div className="character-selection">
                    <select 
                        value={selectedCharacter} 
                        onChange={handleCharacterSelect}
                        className="character-dropdown"
                    >
                        <option value="">Select a character</option>
                        {characters.map(character => (
                            <option key={character.name} value={character.name}>
                                {character.fullName}
                            </option>
                        ))}
                    </select>
                    <button 
                        onClick={addMainCharacter} 
                        className="add-character-button"
                        disabled={mainCharacters.length >= 3}
                    >
                        Add Character
                    </button>
                </div>
                
                <div className="main-characters-list">
                    {mainCharacters.length > 0 ? (
                        <ul>
                            {mainCharacters.map(character => (
                                <li key={character.name}>
                                    {character.fullName}
                                    <button 
                                        onClick={() => removeMainCharacter(character)}
                                        className="remove-character-button"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No main characters selected</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
