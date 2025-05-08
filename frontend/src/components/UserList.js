import React, { useEffect, useState } from 'react';
import './UserList.css';

function UserList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch('http://localhost:3000/api/user')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error fetching users:', err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">👥 Registered Users</h2>

      {users.length === 0 ? (
        <p className="empty-message">No users found.</p>
      ) : (
        <div className="user-table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ user_id, username, email }) => (
                <tr key={user_id}>
                  <td>{user_id}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserList;
