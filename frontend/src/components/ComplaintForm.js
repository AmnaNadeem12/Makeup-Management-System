import React, { useState } from 'react';
import './ComplaintForm.css';

function ComplaintForm() {
  const [userId, setUserId] = useState('');
  const [orderId, setOrderId] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const complaint = {
      user_id: parseInt(userId),
      order_id: parseInt(orderId),
      description,
    };

    try {
      const res = await fetch('http://localhost:3000/api/complaints/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(complaint),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Complaint submitted!');
        setUserId('');
        setOrderId('');
        setDescription('');
      } else {
        setMessage(data.error || '❌ Failed to submit complaint');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Server error');
    }
  };

  return (
    <div className="complaint-form-container">
      <h2 className="complaint-title">📨 Submit Complaint</h2>
      <form className="complaint-form" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
}

export default ComplaintForm;
