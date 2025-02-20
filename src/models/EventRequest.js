const pool = require('../config/db');

const EventRequest = {
  // Method to create an event request
  async createEventRequest(userId, title, description, status, event_id) {
    const query = `
      INSERT INTO event_requests (user_id, title, description, status, event_id) 
      VALUES ($1, $2, $3, $4, $5) RETURNING id, user_id, title, description, status, event_id;
    `;
    const values = [userId, title, description, status, event_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findById(requestId) {
    const query = 'SELECT * FROM event_requests WHERE event_id = $1';
    const result = await pool.query(query, [requestId]);
    return result.rows[0];
  },

  // Method to update the status of an event request
  async updateStatus(requestId, newStatus) {
    const query = `
      UPDATE event_requests
      SET status = $1
      WHERE event_id = $2
      RETURNING id, status;
    `;
    const result = await pool.query(query, [newStatus, requestId]);
    return result.rows[0];
  },

  async getApprovedEvents() {
    const query = `
      SELECT * FROM event_requests 
      WHERE status = 'approved' ORDER BY id DESC;
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  // Method to get event details based on event request
  async getEventDetailsByRequest(requestId) {
    const query = `
      SELECT 
  events.*, 
  users.name AS creator_name, 
  users.p_image AS creator_image 
FROM events
JOIN event_requests ON events.id = event_requests.event_id
JOIN users ON events.created_by = users.id
WHERE event_requests.event_id = $1;
    `;
    const result = await pool.query(query, [requestId]);
    return result.rows[0];
  },
};

module.exports = EventRequest;
