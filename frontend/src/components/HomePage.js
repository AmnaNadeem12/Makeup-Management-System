import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [newUser, setNewUser] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleCheckUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      if (data.exists) {
        navigate('/client');
      } else {
        setNewUser(true);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    }
  };

  const handleRegister = async () => {
    try {
      await fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password_hash: password,
        }),
      });
      navigate('/client');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">💄 Makeup Management System</h1>
        <p className="home-subtitle">Please select your role to continue</p>

        <div className="login-box">
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleCheckUser}>Login as Client</button>
        </div>

        {newUser && (
          <div className="register-box">
            <p className="register-info">User not found. Please register:</p>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
          </div>
        )}

        <div className="admin-box">
          <button onClick={() => navigate('/admin')}>Login as Admin</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
