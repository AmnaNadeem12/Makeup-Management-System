
import React, { useState } from 'react';
import './SupplierForm.css'; // Make sure to create this CSS file

function SupplierForm() {
  const [supplier, setSupplier] = useState({
    name: '',
    contact_info: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({
      ...supplier,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/suppliers/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplier),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('✅ Supplier added successfully.');
        setSupplier({ name: '', contact_info: '' });
      } else {
        setMessage(data.error || '❌ Failed to add supplier.');
      }
    } catch (error) {
      console.error('Error adding supplier:', error);
      setMessage('❌ Server error.');
    }
  };

  return (
    <div className="supplier-form-container">
      <h2 className="supplier-form-title">➕ Add New Supplier</h2>
      <form className="supplier-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Supplier Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={supplier.name}
          onChange={handleChange}
          required
          placeholder="e.g. MissRose"
        />

        <label htmlFor="contact_info">Email Address:</label>
        <input
          type="email"
          id="contact_info"
          name="contact_info"
          value={supplier.contact_info}
          onChange={handleChange}
          required
          placeholder="e.g. supplier@email.com"
        />

        <button type="submit">Add Supplier</button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
}

export default SupplierForm;
