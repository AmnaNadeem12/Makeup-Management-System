import React, { useState } from 'react';

const RecommendationForm = () => {
  const [userId, setUserId] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId.trim()) {
      setError('Please enter a user ID');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/recommendations/${userId}`);
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid content-type. Expected application/json');
      }

      const data = await res.json();
      if (res.ok) {
        setRecommendations(data);
        setError('');
      } else {
        setRecommendations([]);
        setError(data.error || 'Failed to fetch recommendations');
      }
    } catch (err) {
      setRecommendations([]);
      setError(err.message || 'Server error while fetching recommendations');
    }
  };

  const styles = {
    container: {
      backgroundColor: '#fff0f4',
      borderRadius: '24px',
      padding: '40px',
      maxWidth: '500px',
      margin: '50px auto',
      textAlign: 'center',
      fontFamily: 'Segoe UI, sans-serif',
      boxShadow: '0 0 30px rgba(255, 192, 203, 0.3)',
    },
    header: {
      fontSize: '24px',
      color: '#2d2d2d',
      marginBottom: '20px',
      fontWeight: 'bold',
    },
    icon: {
      fontSize: '28px',
      marginRight: '8px',
      verticalAlign: 'middle',
    },
    input: {
      display: 'block',
      width: '100%',
      padding: '12px',
      margin: '10px 0',
      borderRadius: '12px',
      border: '1px solid #ffc0cb',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#f4a9b8',
      color: 'white',
      border: 'none',
      borderRadius: '16px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '10px',
    },
    error: {
      color: '#d00000',
      marginTop: '10px',
    },
    list: {
      marginTop: '30px',
      padding: '0',
      listStyleType: 'none',
    },
    listItem: {
      background: '#ffe3ec',
      marginBottom: '10px',
      padding: '12px',
      borderRadius: '12px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.icon}>💄</span>
        Recommendations
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Get Recommendations</button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {recommendations.length > 0 && (
        <ul style={styles.list}>
          {recommendations.map((rec) => (
            <li key={rec.product_id || rec.id} style={styles.listItem}>
              <strong>{rec.Recommended_Product || rec.name}</strong>{' '}
              {rec.Average_Rating && <>| ⭐ {rec.Average_Rating.toFixed(1)}</>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecommendationForm;
