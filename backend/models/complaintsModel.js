const { sql, poolPromise } = require('../config/db');

const complaintsModel = {
  addComplaint: async (user_id, order_id, description) => {
    const pool = await poolPromise;
    await pool.request()
      .input('user_id', sql.Int, user_id)
      .input('order_id', sql.Int, order_id)
      .input('description', sql.VarChar(500), description)
      .execute('AddUserComplaint');
  },

  getUserComplaints: async (user_id) => {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('user_id', sql.Int, user_id)
      .execute('GetUserComplaints');
    return result.recordset;
  },

  autoUpdateStatus: async () => {
    const pool = await poolPromise;
    await pool.request().execute('AutoUpdateComplaintStatus');
  }
};

module.exports = complaintsModel;
