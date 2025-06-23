import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import FormInput from './common/FormInput';
import SubmitButton from './common/SubmitButton';

const AddFight = () => {
  const [opponents, setOpponents] = useState([]);
  const [selectedOpponent, setSelectedOpponent] = useState('');
  const [gameMode, setGameMode] = useState('BEST_OF_3');
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { username } = useAuth();

  useEffect(() => {
    fetchOpponents();
  }, []);

  const fetchOpponents = async () => {
    try {
      const response = await fetch('/api/fights/users', {
        credentials: 'include'
      });
      if (response.ok) {
        const users = await response.json();
        // Filter out the current user
        setOpponents(users.filter(user => user !== username));
      }
    } catch (error) {
      console.error('Error fetching opponents:', error);
      setError('Failed to load opponents');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!selectedOpponent) {
      setError('Please select an opponent');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/fights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          player2Username: selectedOpponent,
          mode: gameMode,
          gameCountPlayer1: parseInt(player1Score),
          gameCountPlayer2: parseInt(player2Score)
        })
      });

      if (response.ok) {
        // Reset form
        setSelectedOpponent('');
        setGameMode('COMPETITIVE');
        setPlayer1Score(0);
        setPlayer2Score(0);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to submit fight');
      }
    } catch (error) {
      console.error('Error submitting fight:', error);
      setError('Failed to submit fight');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-red-900/50">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">Submit Fight Result</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Player 1 (current user) */}
          <div>
            <label className="block text-2xl font-medium text-white/80 mb-2">
              Player 1
            </label>
            <div className="text-2xl text-center text-white/60 px-6 py-4 bg-white/5 rounded">
              {username}
            </div>
          </div>

          {/* Player 2 (opponent) selector */}
          <div>
            <label className="block text-2xl font-medium text-white/80 mb-2">
              Player 2
            </label>
            <select
              value={selectedOpponent}
              onChange={(e) => setSelectedOpponent(e.target.value)}
              className="w-full px-6 py-4 text-2xl text-center bg-white/5 border border-red-900/30 rounded text-white/60 focus:border-red-500/50 focus:outline-none"
            >
              <option value="">Select Opponent</option>
              {opponents.map(opponent => (
                <option key={opponent} value={opponent}>
                  {opponent}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Game Mode */}
        <div>
          <label className="block text-2xl text-center font-medium text-white/80 mb-2">
            Game Mode
          </label>
          <select
            value={gameMode}
            onChange={(e) => setGameMode(e.target.value)}
            className="w-full px-6 py-4 text-2xl text-center bg-white/5 border border-red-900/30 rounded text-white/60 focus:border-red-500/50 focus:outline-none"
          >
            <option value="BEST_OF_3">Best of 3</option>
            <option value="BEST_OF_5">Best of 5</option>
          </select>
        </div>

        {/* Score inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-2xl font-medium text-white/80 mb-2">
              Player 1 wins
            </label>
            <select
              value={player1Score}
              onChange={(e) => {
                const newScore = parseInt(e.target.value);
                setPlayer1Score(newScore);
                // Reset player 2 score if total would exceed max
                const maxScore = gameMode === 'BEST_OF_3' ? 2 : 3;
                if (newScore + parseInt(player2Score) > maxScore) {
                  setPlayer2Score(0);
                }
              }}
              className="w-full px-6 py-4 text-2xl bg-white/5 border border-red-900/30 rounded text-white/60 focus:border-red-500/50 focus:outline-none"
            >
              {Array.from({length: (gameMode === 'BEST_OF_3' ? 2 : 3) + 1}, (_, i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-2xl font-medium text-white/80 mb-2">
              Player 2 wins
            </label>
            <select
              value={player2Score}
              onChange={(e) => setPlayer2Score(e.target.value)}
              className="w-full px-6 py-4 text-2xl bg-white/5 border border-red-900/30 rounded text-white/60 focus:border-red-500/50 focus:outline-none"
            >
              {Array.from({length: (gameMode === 'BEST_OF_3' ? 2 : 3) - parseInt(player1Score) + 1}, (_, i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-lg text-center">
            {error}
          </div>
        )}

        <div className="flex justify-center">
          <SubmitButton color="red" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Fight'}
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default AddFight;
