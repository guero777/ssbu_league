import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Scoreboard.css';

const Scoreboard = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRankings = async () => {
    try {
      const response = await axios.get('/api/userRankings', {
        withCredentials: true
      });
      // Sort the rankings by score in descending order
      const sortedRankings = response.data.sort((a, b) => b.score - a.score);
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

  if (loading) return <div className="loading">Loading Scoreboard...</div>;
  if (error) return <div className="error">{error}</div>;



  return (
    <div className="scoreboard">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Gamer Tag</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((player, index) => (
            player.gamerTag   && (
              <tr key={player.gamerTag}>
                <td>{index + 1}</td>
                <td>{player.gamerTag}</td>
                <td>{player.score}</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
      {rankings.length === 0 && (
        <div className="no-data">No rankings available</div>
      )}
    </div>
  );
};

export default Scoreboard;