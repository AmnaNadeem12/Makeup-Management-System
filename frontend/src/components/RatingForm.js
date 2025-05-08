import React, { useState } from 'react';
import './Rating.css'; // Importing the CSS file for the styles

function RatingForm() {
  const [userId, setUserId] = useState('');
  const [productId, setProductId] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    // Basic input validation
    if (!userId || !productId || !rating || !review) {
      setMessage('All fields are required.');
      return;
    }
    if (rating < 0 || rating > 5) {
      setMessage('Rating must be between 0 and 5.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: parseInt(userId),
          product_id: parseInt(productId),
          rating: parseFloat(rating),
          review: review
        })
      });
      const data = await res.json();
      setMessage(res.ok ? data.message : data.error);
    } catch (err) {
      console.error(err);
      setMessage('Server error while adding rating.');
    }
  };

  return (
    <div className="rating-form-container">
      <h2>Submit a Product Rating</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userId">User ID</label>
        <input
          id="userId"
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        /><br />
        
        <label htmlFor="productId">Product ID</label>
        <input
          id="productId"
          type="number"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        /><br />
        
        <label htmlFor="rating">Rating (0 to 5)</label>
        <input
          id="rating"
          type="number"
          placeholder="Rating (0 to 5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="0"
          max="5"
          step="0.1"
          required
        /><br />
        
        <label htmlFor="review">Write a review...</label>
        <textarea
          id="review"
          placeholder="Write a review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        /><br />
        
        <button type="submit">Submit Rating</button>
      </form>
      
      {message && (
        <p className={message.includes('error') ? 'error-msg' : 'success-msg'}>
          {message}
        </p>
      )}
    </div>
  );
}

export default RatingForm;
