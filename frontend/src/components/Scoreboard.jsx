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
      setRankings(response.data);
      setLoading(false);
    } catch (err) {
      setError(`Error loading rankings: ${err.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  if (loading) {
    return <div className="loading">Loading rankings...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="scoreboard">
      <h2>Player Rankings</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Gamer Tag</th>
            <th>Mains</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((player, index) => (
            <tr key={player.id || index}>
              <td>{index + 1}</td>
              <td>{player.gamerTag || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rankings.length === 0 && !loading && !error && (
        <div className="no-data">No rankings available</div>
      )}
    </div>
  );
};

export default Scoreboard;