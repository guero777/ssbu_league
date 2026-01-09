import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import SubmitButton from './common/SubmitButton';
import { API_BASE_URL } from '../config';

const AddFight = () => {
  const [opponents, setOpponents] = useState([]);
  const [selectedOpponent, setSelectedOpponent] = useState('');
  const [gameMode, setGameMode] = useState('BEST_OF_3');
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentGamerTag, setCurrentGamerTag] = useState('');
  const { username } = useAuth();

  useEffect(() => {
    fetchCurrentGamerTag();
    fetchOpponents();
  }, []);

  const fetchCurrentGamerTag = () => {
    fetch(`${API_BASE_URL}/api/user/current-gamertag`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Server error');
        }
        return response.text();
      })
      .then(data => setCurrentGamerTag(data))
      .catch(error => {
        console.error('Error:', error);
        setError('Failed to load gamertag');
      });
  };

  const fetchOpponents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/all-gamertags`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const gamertags = await response.json();
        setOpponents(gamertags);
      } else {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        setError('Failed to load opponents: ' + errorText);
      }
    } catch (error) {
      console.error('Error fetching opponents:', error);
      setError('Failed to load opponents: ' + (error.message || 'Unknown error'));
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
      const response = await fetch(`${API_BASE_URL}/api/fights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          player1GamerTag: currentGamerTag,
          player2GamerTag: selectedOpponent,
          mode: gameMode,
          gameCountPlayer1: parseInt(player1Score),
          gameCountPlayer2: parseInt(player2Score)
        })
      });

      if (response.ok) {
        // Only reset scores, keep opponent and game mode
        setPlayer1Score(0);
        setPlayer2Score(0);
        // Trigger fights table refresh by emitting an event
        window.dispatchEvent(new Event('fightSubmitted'));
      } else {
        let errorMessage;
        try {
          const data = await response.text();
          errorMessage = data.startsWith('{') ? JSON.parse(data).message : data;
        } catch (e) {
          errorMessage = 'Failed to parse server response';
        }
        setError(errorMessage || 'Failed to submit fight');
      }
    } catch (error) {
      console.error('Error submitting fight:', error);
      setError('Failed to submit fight: ' + (error.message || 'Unknown error'));
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
              {currentGamerTag || 'Loading...'}
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
              }}
              className="w-full px-6 py-4 text-2xl bg-white/5 border border-red-900/30 rounded text-white/60 focus:border-red-500/50 focus:outline-none"
            >
              {(() => {
                const maxWinsPerPlayer = gameMode === 'BEST_OF_3' ? 2 : 3;
                const maxTotalGames = gameMode === 'BEST_OF_3' ? 3 : 5;
                const remainingGames = maxTotalGames - player2Score;
                const maxAllowedWins = Math.min(maxWinsPerPlayer, remainingGames);
                const options = [];
                for (let i = 0; i <= maxAllowedWins && i + player2Score <= maxTotalGames; i++) {
                  options.push(
                    <option key={i} value={i}>{i}</option>
                  );
                }
                return options;
              })()}
            </select>
          </div>
          <div>
            <label className="block text-2xl font-medium text-white/80 mb-2">
              Player 2 wins
            </label>
            <select
              value={player2Score}
              onChange={(e) => {
                const newScore = parseInt(e.target.value);
                setPlayer2Score(newScore);
              }}
              className="w-full px-6 py-4 text-2xl bg-white/5 border border-red-900/30 rounded text-white/60 focus:border-red-500/50 focus:outline-none"
            >
              {(() => {
                const maxWinsPerPlayer = gameMode === 'BEST_OF_3' ? 2 : 3;
                const maxTotalGames = gameMode === 'BEST_OF_3' ? 3 : 5;
                const remainingGames = maxTotalGames - player1Score;
                const maxAllowedWins = Math.min(maxWinsPerPlayer, remainingGames);
                const options = [];
                for (let i = 0; i <= maxAllowedWins && i + player1Score <= maxTotalGames; i++) {
                  options.push(
                    <option key={i} value={i}>{i}</option>
                  );
                }
                return options;
              })()}
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
