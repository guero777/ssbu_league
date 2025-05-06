import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Scoreboard.css';

const Scoreboard = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRankings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/userRankings', {
        withCredentials: true
      });
      // Sort the rankings by score in descending order
      const sortedRankings = response.data.sort((a, b) => b.score - a.score);
      setRankings(sortedRankings);
      setLoading(false);
    } catch (err) {
      setError(`Error loading rankings: ${err.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  if (loading) return <div className="loading">Loading rankings...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="scoreboard">
      <h2>Player Rankings</h2>
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
            <tr key={player.gamerTag || index}>
              <td>{index + 1}</td>
              <td>{player.gamerTag || 'N/A'}</td>
              <td>{player.score}</td>
            </tr>
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