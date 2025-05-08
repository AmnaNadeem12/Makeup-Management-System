import React, { useState } from 'react';
import './ComplaintList.css';

function ComplaintList() {
  const [userId, setUserId] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');

  const fetchComplaints = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/complaints/user/${userId}`);
      const data = await res.json();

      if (res.ok) {
        setComplaints(data.complaints);
        setError('');
      } else {
        setError(data.error || 'Failed to fetch complaints');
        setComplaints([]);
      }
    } catch (err) {
      console.error(err);
      setError('Server error');
      setComplaints([]);
    }
  };

  return (
    <div className="complaints-container">
      <h2 className="complaints-title">📩 View Your Complaints</h2>

      <div className="complaints-form">
        <input
          type="number"
          placeholder="Enter Your User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={fetchComplaints}>Fetch</button>
      </div>

      {error && <p className="complaints-error">{error}</p>}

      {complaints.length > 0 && (
        <div className="complaints-list">
          {complaints.map((c) => (
            <div key={c.id} className="complaint-card">
              <h4>🧾 Order #{c.order_id}</h4>
              <p className="complaint-desc">{c.description}</p>
              <p className={`complaint-status ${c.status.toLowerCase()}`}>
                Status: {c.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ComplaintList;
