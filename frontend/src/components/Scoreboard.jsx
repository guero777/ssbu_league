import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const Scoreboard = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRankings = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/userRankings`, {
        withCredentials: true
      });
      // Ensure response.data is an array and sort by score in descending order
      const data = Array.isArray(response.data) ? response.data : [];
      const sortedRankings = data.sort((a, b) => b.score - a.score);
      setRankings(sortedRankings);
      setLoading(false);
    } catch (err) {
      setError(`Error loading scoreboard: ${err.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  if (loading) return <div className="text-white/80 text-center py-8 animate-pulse">Loading Scoreboard...</div>;
  if (error) return <div className="text-red-400 text-center py-8">{error}</div>;



  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-4 py-8 md:py-4 text-center text-3xl md:text-xl font-bold text-white/90">Rank</th>
            <th className="px-4 py-8 md:py-4 text-center text-3xl md:text-xl font-bold text-white/90">Gamer Tag</th>
            <th className="px-4 py-8 md:py-4 text-center text-3xl md:text-xl font-bold text-white/90">Main</th>
            <th className="px-4 py-8 md:py-4 text-center text-3xl md:text-xl font-bold text-white/90">Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rankings.map((player, index) => (
            player.gamerTag && (
              <tr 
                key={player.gamerTag}
                className="transition-colors duration-150 hover:bg-white/5"
              >
                <td className={`px-6 py-6 md:py-4 text-4xl md:text-xl text-center ${index === 0 ? 'text-amber-200 bg-amber-500/10' : index === 1 ? 'text-slate-300 bg-slate-400/10' : index === 2 ? 'text-amber-600 bg-amber-800/10' : 'text-white/70'}`}>{index + 1}</td>
                <td className="px-6 py-6 md:py-4 text-4xl md:text-xl text-center text-white/60">{player.gamerTag}</td>
                <td className="px-6 py-6 md:py-4 text-4xl md:text-xl text-center text-white/60">
                  {player.mainCharacters && player.mainCharacters.length > 0 ? player.mainCharacters[0].shortName : '-'}
                </td>
                <td className="px-6 py-6 md:py-4 text-4xl md:text-xl text-center font-bold text-white/90">{player.score}</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
      {rankings.length === 0 && (
        <div className="text-white/60 text-center py-8">No rankings available</div>
      )}
    </div>
  );
};

export default Scoreboard;