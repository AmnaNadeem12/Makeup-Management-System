import React, { useState } from 'react';
import './WishlistForm.css';

function WishlistForm() {
  const [user_id, setUserId] = useState('');
  const [product_id, setProductId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/wishlist/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: parseInt(user_id),
          product_id: parseInt(product_id)
        }),
      });

      const data = await res.json();
      setMessage(data.message || 'Something went wrong');
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      setMessage('❌ Failed to add product to wishlist');
    }
  };

  return (
    <div className="wishlist-form-container">
      <h2 className="wishlist-form-title">👄 Add to Wishlist</h2>
      {message && <p className="wishlist-message">{message}</p>}

      <form className="wishlist-form" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="User ID"
          value={user_id}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Product ID"
          value={product_id}
          onChange={(e) => setProductId(e.target.value)}
          required
        />
        <button type="submit">Add to Wishlist</button>
      </form>
    </div>
  );
}

export default WishlistForm;
