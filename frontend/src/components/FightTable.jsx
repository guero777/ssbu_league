import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { API_BASE_URL } from '../config';

const FightTable = () => {
  const [fights, setFights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentGamerTag, setCurrentGamerTag] = useState('');
  const { username } = useAuth();

  useEffect(() => {
    const init = async () => {
      await fetchCurrentGamerTag();
      await fetchFights();
    };
    init();

    // Add listener for fight submission
    const handleFightSubmitted = () => {
      fetchFights();
    };
    window.addEventListener('fightSubmitted', handleFightSubmitted);

    return () => {
      window.removeEventListener('fightSubmitted', handleFightSubmitted);
    };
  }, []);

  const fetchCurrentGamerTag = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/current-gamertag`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const gamerTag = await response.text();
        setCurrentGamerTag(gamerTag);
      } else {
        setError('Failed to load your gamertag');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load your gamertag');
    }
  };

  const fetchFights = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/fights/user`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setFights(data);
      } else {
        let errorMessage;
        try {
          const data = await response.text();
          errorMessage = data.startsWith('{') ? JSON.parse(data).message : data;
        } catch (e) {
          errorMessage = 'Failed to parse server response';
        }
        setError(errorMessage || 'Failed to load fights');
      }
    } catch (error) {
      console.error('Error fetching fights:', error);
      setError('Failed to load fights: ' + (error.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-white/80 text-center py-8 animate-pulse">Loading Fights...</div>;
  }

  if (error) {
    return <div className="text-red-400 text-center py-8">{error}</div>;
  }

  return (
    <div className="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl p-4 md:p-6 border border-red-900/50 mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Your Fights</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-3 md:px-6 py-4 text-left text-xl md:text-2xl font-semibold text-white/90">Date</th>
              <th className="px-3 md:px-6 py-4 text-left text-xl md:text-2xl font-semibold text-white/90">Opponent</th>
              <th className="px-3 md:px-6 py-4 text-left text-xl md:text-2xl font-semibold text-white/90">Mode</th>
              <th className="px-3 md:px-6 py-4 text-left text-xl md:text-2xl font-semibold text-white/90">Score</th>
              <th className="px-3 md:px-6 py-4 text-left text-xl md:text-2xl font-semibold text-white/90">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {fights.map((fight) => {
              const isPlayer1 = fight.player1GamerTag === currentGamerTag;
              const opponent = isPlayer1 ? fight.player2GamerTag : fight.player1GamerTag;
              const userScore = isPlayer1 ? fight.gameCountPlayer1 : fight.gameCountPlayer2;
              const opponentScore = isPlayer1 ? fight.gameCountPlayer2 : fight.gameCountPlayer1;
              const result = userScore > opponentScore ? 'Win' : userScore < opponentScore ? 'Loss' : 'Draw';
              
              return (
                <tr 
                  key={fight.id}
                  className="transition-colors duration-150 hover:bg-white/5"
                >
                  <td className="px-3 md:px-6 py-4 text-lg md:text-xl text-white/80">
                    {new Date(fight.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-3 md:px-6 py-4 text-lg md:text-xl text-white/80">{opponent}</td>
                  <td className="px-3 md:px-6 py-4 text-lg md:text-xl text-white/60">
                    {fight.mode === 'BEST_OF_3' ? 'Best of 3' : 'Best of 5'}
                  </td>
                  <td className="px-3 md:px-6 py-4 text-lg md:text-xl text-white/80">
                    {userScore} - {opponentScore}
                  </td>
                  <td className={`px-3 md:px-6 py-4 text-lg md:text-xl font-medium ${
                    result === 'Win' ? 'text-green-400' :
                    result === 'Loss' ? 'text-red-400' :
                    'text-yellow-400'
                  }`}>
                    {result}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {fights.length === 0 && (
          <div className="text-white/60 text-center py-8">No fights recorded yet</div>
        )}
      </div>
    </div>
  );
};

export default FightTable;
