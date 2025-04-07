import React from 'react';
import './table.css';

const Table = () => {
    return (
        <div className="table-container">
            <table>
                <thead>
                <tr>
                    <th>Player</th>
                    <th>Rank</th>
                    <th>Points</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Alice</td>
                    <td>1</td>
                    <td>1500</td>
                </tr>
                <tr>
                    <td>Bob</td>
                    <td>2</td>
                    <td>1450</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Table;
