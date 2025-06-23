import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

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
        <div className="bg-black/60 rounded-lg p-6 shadow-lg border border-red-900/50">
            <h2 className="text-3xl text-center font-bold text-white mb-4">Choose your Main Characters</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <select 
                        value={selectedCharacter} 
                        onChange={handleCharacterSelect}
                        className="flex-1 px-3 py-6 text-2xl text-center bg-black/50 border border-red-900/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
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
                        className={`px-4 rounded-md text-2xl text-center text-white/90 transition-all duration-200 ${mainCharacters.length >= 3 ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-900/50 border border-red-900/50 hover:border-red-900/70 hover:-translate-y-1'}`}
                        disabled={mainCharacters.length >= 3}
                    >
                        Add Character
                    </button>
                </div>
                
                <div className="mt-6">
                    {mainCharacters.length > 0 ? (
                        <ul className="space-y-3">
                            {mainCharacters.map(character => (
                                <li key={character.name} className="flex items-center justify-between p-3 text-2xl text-center bg-black/40 rounded-lg border border-red-900/30">
                                    <span className="text-white">{character.fullName}</span>
                                    <button 
                                        onClick={() => removeMainCharacter(character)}
                                        className="px-3 py-1 bg-red-900/50 text-white/90 rounded-md border border-red-900/50 hover:border-red-900/70 transition-all duration-200 hover:-translate-y-1"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400 text-center">No main characters selected</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainCharacters;
