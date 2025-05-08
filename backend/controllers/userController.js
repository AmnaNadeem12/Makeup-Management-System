const { sql, poolPromise } = require('../config/db');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetAllUsers'); // Stored procedure to fetch all users

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Insert a user
const insertUser = async (req, res) => {
  const { username, email, password_hash } = req.body;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('username', sql.VarChar, username)
      .input('email', sql.VarChar, email)
      .input('password_hash', sql.VarChar, password_hash)
      .execute('InsertUser'); // Stored procedure to insert a user

    res.status(201).send('User created successfully');
  } catch (err) {
    console.error('Error inserting user:', err);
    res.status(500).json({ error: 'Failed to insert user' });
  }
};

// Update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password_hash } = req.body;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('user_id', sql.Int, id)
      .input('username', sql.VarChar, username)
      .input('email', sql.VarChar, email)
      .input('password_hash', sql.VarChar, password_hash)
      .execute('UpdateUser'); // Stored procedure to update a user

    res.status(200).send('User updated successfully');
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('user_id', sql.Int, id)
      .execute('DeleteUser'); // Stored procedure to delete a user

    res.status(200).send('User deleted successfully');
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
// Check if user exists by username
const checkUserExists = async (req, res) => {
  const { username } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query('SELECT * FROM Users WHERE username = @username');

    if (result.recordset.length > 0) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.error('Error checking user:', err);
    res.status(500).json({ error: 'Failed to check user' });
  }
};

module.exports = {
  getAllUsers,
  insertUser,
  updateUser,
  deleteUser,
  checkUserExists, 
};
