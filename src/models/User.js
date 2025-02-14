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
};

module.exports = User;
