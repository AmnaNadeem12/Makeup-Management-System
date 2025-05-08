import React, { useEffect, useState } from 'react';
import './Rating.css'; 

function RatingList() {
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/avgratings/average');
        const data = await res.json();

        if (res.ok) {
          setRatings(data);
        } else {
          setError(data.error || 'Failed to fetch average ratings.');
        }
      } catch (err) {
        console.error('Error fetching ratings:', err);
        setError('Server error while fetching average ratings.');
      }
    };

    fetchRatings();
  }, []);

  return (
    <div className="ratings-container">
      <h2>Product Average Ratings</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <table className="ratings-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Average Rating</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((item, index) => (
              <tr key={index}>
                <td>{item.product_name}</td>
                <td>{item.average_rating?.toFixed(2) || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RatingList;
