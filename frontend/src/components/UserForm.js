// src/components/UserForm.js
import React, { useState } from 'react';

function UserForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password_hash: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.text();
    if (response.ok) {
      setMessage('User created successfully!');
      setFormData({ username: '', email: '', password_hash: '' });
    } else {
      setMessage('Error creating user: ' + result);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        /><br /><br />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        /><br /><br />
        <input
          name="password_hash"
          value={formData.password_hash}
          onChange={handleChange}
          placeholder="Password"
          required
        /><br /><br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default UserForm;
