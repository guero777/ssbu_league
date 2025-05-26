import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import './MainCharacters.css';

const MainCharacters = () => {
    const navigate = useNavigate();
    const [characters, setCharacters] = useState([]);
    const [mainCharacters, setMainCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchCharacters();
        fetchMainCharacters();
    }, []);

    const fetchCharacters = () => {
        fetch(`${API_BASE_URL}/api/characters`, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => setCharacters(data))
            .catch(error => console.error('Error:', error));
    };

    const fetchMainCharacters = () => {
        fetch(`${API_BASE_URL}/api/user/main-characters`, {
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
                return response.json();
            })
            .then(data => setMainCharacters(data))
            .catch(error => console.error('Error:', error));
    };

    const handleCharacterSelect = (e) => {
        setSelectedCharacter(e.target.value);
    };

    const addMainCharacter = () => {
        if (!selectedCharacter) {
            setError('Please select a character');
            return;
        }

        if (mainCharacters.length >= 3) {
            setError('You can only have up to 3 main characters');
            return;
        }

        const character = characters.find(c => c.name === selectedCharacter);
        if (!character) {
            setError('Invalid character selected');
            return;
        }

        if (mainCharacters.some(c => c.name === character.name)) {
            setError('This character is already in your main characters');
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
        
        fetch(`${API_BASE_URL}/api/user/update-main-characters`, {
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
                setError('');
                setSuccess('Main characters updated successfully!');
                setTimeout(() => setSuccess(''), 3000);
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error.message || 'Error updating main characters');
            });
    };

    return (
        <div className="profile-box">
            <h2>Your Main Characters</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            
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
    );
};

export default MainCharacters;
