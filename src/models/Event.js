const pool = require('../config/db');

const Event = {
  async createEvent(
    title,
    description,
    date,
    location,
    totalTickets,
    availableTickets,
    categoryId,
    createdBy,
    imageName,
  ) {
    const query = `
      INSERT INTO events (title, description, date, location, total_tickets, available_tickets, category_id, created_by, image) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING id, title, description, date, location, total_tickets, available_tickets, category_id, created_by, image;
    `;
    const values = [
      title,
      description,
      date,
      location,
      totalTickets,
      availableTickets,
      categoryId,
      createdBy,
      imageName,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async getAllEvents() {
    const query = `
    SELECT 
      e.id, 
      e.title, 
      e.description, 
      e.date, 
      e.location, 
      e.total_tickets, 
      e.available_tickets, 
      e.category_id, 
      e.created_by, 
      e.created_at,
      e.image,
      er.status AS request_status  -- Fetch status from event_requests
    FROM events e
    LEFT JOIN event_requests er ON e.id = er.event_id
    ORDER BY e.created_at DESC
  `;

    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  async getApprovedEvents() {
    const query = `SELECT * FROM event_requests WHERE status = 'approved' ORDER BY created_at DESC`;
    const result = await pool.query(query);
    return result.rows;
  },

  async getEventById(eventId) {
    const query = 'SELECT * FROM events WHERE id = $1';
    const result = await pool.query(query, [eventId]);
    return result.rows[0];
  },

  async getApprovedEventsByCategory(categoryId) {
    const query = `
        SELECT 
            e.id, 
            e.title, 
            e.description, 
            e.date, 
            e.location, 
            e.total_tickets, 
            e.available_tickets, 
            e.category_id, 
            e.created_by, 
            e.created_at,
            e.image,
            u.name AS creator_name, 
            u.p_image AS creator_image 
        FROM events e
        INNER JOIN event_requests er ON e.id = er.event_id
        INNER JOIN users u ON e.created_by = u.id 
        WHERE er.status = 'approved' AND e.category_id = $1
        ORDER BY e.created_at DESC
    `;

    try {
        const result = await pool.query(query, [categoryId]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching events by category:', error);
        throw error;
    }
},
};

module.exports = Event;
