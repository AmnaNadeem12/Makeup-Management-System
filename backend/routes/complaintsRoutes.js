
const express = require('express');
const router = express.Router();
const {
  addComplaint,
  getUserComplaints,
  autoUpdateComplaintStatus
} = require('../controllers/complaintsController');

router.post('/add', addComplaint);
router.get('/user/:user_id', getUserComplaints);
router.post('/auto-update', autoUpdateComplaintStatus);

module.exports = router;
