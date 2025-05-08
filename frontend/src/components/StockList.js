import React, { useEffect, useState } from 'react';
import './StockList.css'; // Make sure to create this CSS file

function StockList() {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/stock')
      .then((response) => response.json())
      .then((data) => {
        console.log('Stock data:', data);
        setStock(data);
      })
      .catch((error) => console.error('Error fetching stock data:', error));
  }, []);

  return (
    <div className="stock-container">
      <h2 className="stock-title">📦 Stock Inventory</h2>
      {stock.length === 0 ? (
        <p className="stock-empty">No stock available.</p>
      ) : (
        <div className="stock-table-wrapper">
          <table className="stock-table">
            <thead>
              <tr>
                <th>Stock ID</th>
                <th>Product</th>
                <th>Supplier</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((item) => (
                <tr key={item.stock_id}>
                  <td>{item.stock_id}</td>
                  <td>{item.Product}</td>
                  <td>{item.Supplier}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StockList;
