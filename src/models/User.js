const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  async createUser(name, email, password, p_image) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (name, email, password, p_image) 
      VALUES ($1, $2, $3, $4) RETURNING id, name, email, p_image;
    `;
    const values = [name, email, hashedPassword, p_image];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findByEmail(email) {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },

  async findById(id) {
    const query = `SELECT * FROM users WHERE id = $1`;
    const result = await pool.query(query, [id]);
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

  async updateUser(id, name, email, password, p_image) {
    let hashedPassword = null;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const query = `
    UPDATE users 
    SET 
      name = COALESCE($2, name), 
      email = COALESCE($3, email), 
      password = COALESCE($4, password), 
      p_image = COALESCE($5, p_image) 
    WHERE id = $1 
    RETURNING id, name, email, p_image;
  `;

    const values = [id, name, email, hashedPassword, p_image];
    const result = await pool.query(query, values);

    return result.rows[0];
  },

  async updateUserRole(userId, role) {
    try {
      const result = await pool.query(
        'UPDATE users SET role = $1 WHERE id = $2',
        [role, userId],
      );

      if (result.rowCount === 0) {
        return null;
      }

      const rows = await pool.query('SELECT * FROM users WHERE id = $1', [
        userId,
      ]);
      return rows.rows[0];
    } catch (error) {
      console.error('Error in updateUserRole:', error);
      throw error;
    }
  },
};

module.exports = User;
