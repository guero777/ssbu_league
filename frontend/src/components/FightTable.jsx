import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const FightTable = () => {
  const [fights, setFights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { username } = useAuth();

  useEffect(() => {
    fetchFights();
  }, []);

  const fetchFights = async () => {
    try {
      const response = await fetch('/api/fights/user', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setFights(data);
      } else {
        setError('Failed to load fights');
      }
    } catch (error) {
      console.error('Error fetching fights:', error);
      setError('Failed to load fights');
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
    <div className="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-red-900/50 mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Your Fights</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-xl font-semibold text-white/90">Date</th>
              <th className="px-6 py-4 text-left text-xl font-semibold text-white/90">Opponent</th>
              <th className="px-6 py-4 text-left text-xl font-semibold text-white/90">Mode</th>
              <th className="px-6 py-4 text-left text-xl font-semibold text-white/90">Score</th>
              <th className="px-6 py-4 text-left text-xl font-semibold text-white/90">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {fights.map((fight) => {
              const isPlayer1 = fight.player1.username === username;
              const opponent = isPlayer1 ? fight.player2.username : fight.player1.username;
              const userScore = isPlayer1 ? fight.gameCountPlayer1 : fight.gameCountPlayer2;
              const opponentScore = isPlayer1 ? fight.gameCountPlayer2 : fight.gameCountPlayer1;
              const result = userScore > opponentScore ? 'Win' : userScore < opponentScore ? 'Loss' : 'Draw';
              
              return (
                <tr 
                  key={fight.id}
                  className="transition-colors duration-150 hover:bg-white/5"
                >
                  <td className="px-6 py-4 text-lg text-white/80">
                    {new Date(fight.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-lg text-white/80">{opponent}</td>
                  <td className="px-6 py-4 text-lg text-white/60">{fight.mode}</td>
                  <td className="px-6 py-4 text-lg text-white/80">
                    {userScore} - {opponentScore}
                  </td>
                  <td className={`px-6 py-4 text-lg font-medium ${
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
