import React, { useState } from 'react';
import './WishlistList.css';

function WishlistList() {
  const [user_id, setUserId] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState('');

  const handleFetchWishlist = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/wishlist/${user_id}`);
      const data = await res.json();
      setWishlist(data);
      setMessage('');
      console.log('Fetched wishlist:', data);
    } catch (err) {
      console.error('Error fetching wishlist:', err);
      setMessage('❌ Failed to load wishlist');
      setWishlist([]);
    }
  };

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">👜 View Wishlist</h2>

      <div className="wishlist-form">
        <input
          type="number"
          placeholder="Enter User ID"
          value={user_id}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleFetchWishlist}>Load Wishlist</button>
      </div>

      {message && <p className="wishlist-message">{message}</p>}

      {wishlist.length > 0 ? (
        <div className="wishlist-table-wrapper">
          <table className="wishlist-table">
            <thead>
              <tr>
                <th>Wishlist ID</th>
                <th>Username</th>
                <th>Product</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item, index) => (
                <tr key={index}>
                  <td>{item.wishlist_id}</td>
                  <td>{item.username}</td>
                  <td>{item.Product}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !message && <p className="wishlist-empty">No wishlist items found.</p>
      )}
    </div>
  );
}

export default WishlistList;
