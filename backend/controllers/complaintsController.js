const complaintsModel = require('../models/complaintsModel');

const addComplaint = async (req, res) => {
  const { user_id, order_id, description } = req.body;

  try {
    await complaintsModel.addComplaint(user_id, order_id, description);
    res.status(201).json({ message: 'Complaint submitted successfully' });
  } catch (error) {
    console.error('Error submitting complaint:', error);
    res.status(500).json({ error: 'Failed to submit complaint' });
  }
};

const getUserComplaints = async (req, res) => {
  const { user_id } = req.params;

  try {
    const complaints = await complaintsModel.getUserComplaints(user_id);
    res.status(200).json({ complaints });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
};

const autoUpdateComplaintStatus = async (req, res) => {
  try {
    await complaintsModel.autoUpdateStatus();
    res.status(200).json({ message: 'Complaint statuses updated' });
  } catch (error) {
    console.error('Error auto-updating complaints:', error);
    res.status(500).json({ error: 'Failed to update complaint statuses' });
  }
};

module.exports = { addComplaint, getUserComplaints, autoUpdateComplaintStatus };
