import React, { useEffect, useState } from 'react';
import './Rating.css'; // Reusing your existing CSS

const LowStockList = () => {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/lowstock');
        if (!response.ok) throw new Error('Failed to fetch low stock products');
        const data = await response.json();
        setLowStockItems(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLowStock();
  }, []);

  return (
    <div className="rating-form-container">
      <h2>Low Stock Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-msg">{error}</p>
      ) : lowStockItems.length === 0 ? (
        <p>No low stock products found.</p>
      ) : (
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ccc' }}>Product Name</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ccc' }}>Category</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ccc' }}>Stock Quantity</th>
            </tr>
          </thead>
          <tbody>
            {lowStockItems.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: '10px' }}>{item.name}</td>
                <td style={{ padding: '10px' }}>{item.category}</td>
                <td style={{ padding: '10px' }}>{item.stock_quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LowStockList;
