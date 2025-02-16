const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  async createUser(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (name, email, password) 
      VALUES ($1, $2, $3) RETURNING id, name, email;
    `;
    const values = [name, email, hashedPassword];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findByEmail(email) {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },

  async approveOrRejectUser(userId, status) {
    const query = `UPDATE users SET status = $1 WHERE id = $2 RETURNING *`;
    const values = [status, userId];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  },

  async getAllUsers() {
    const query = `SELECT * FROM users`;

    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  },
};

module.exports = User;
