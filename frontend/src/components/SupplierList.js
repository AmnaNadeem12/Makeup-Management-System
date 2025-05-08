
import React, { useEffect, useState } from 'react';
import './SupplierList.css';

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/suppliers')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch suppliers');
        }
        return response.json();
      })
      .then((data) => {
        setSuppliers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading suppliers...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="supplier-container">
      <h2 className="supplier-title">📦 Supplier Directory</h2>
      {suppliers.length === 0 ? (
        <p className="empty-msg">No suppliers available.</p>
      ) : (
        <div className="table-wrapper">
          <table className="supplier-table">
            <thead>
              <tr>
                <th>Supplier ID</th>
                <th>Supplier Name</th>
                <th>Contact Info</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.supplier_id}>
                  <td>{supplier.supplier_id}</td>
                  <td>{supplier.supplier_name}</td>
                  <td>{supplier.contact_info}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SupplierList;
