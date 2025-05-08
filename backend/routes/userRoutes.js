const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');  // Ensure the path is correct

// Route to get all users
router.get('/', usersController.getAllUsers);

// Route to insert a user
router.post('/', usersController.insertUser);

// Route to update a user
router.put('/:id', usersController.updateUser);

// Route to delete a user
router.delete('/:id', usersController.deleteUser);
// Route to check if user exists
router.post('/check-user', usersController.checkUserExists);

module.exports = router;
