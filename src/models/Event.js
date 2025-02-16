const pool = require('../config/db');

const Event = {
  // Create a new event with an optional image
  async createEvent(
    title,
    description,
    date,
    location,
    totalTickets,
    availableTickets,
    categoryId,
    createdBy,
    imageName, // New parameter for storing image filename
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
      imageName, // Saving image filename in DB
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Get all events, sorted by newest first
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
  // Get all approved events
  async getApprovedEvents() {
    const query = `SELECT * FROM event_requests WHERE status = 'approved' ORDER BY created_at DESC`;
    const result = await pool.query(query);
    return result.rows;
  },

  // Get a single event by ID
  async getEventById(eventId) {
    const query = 'SELECT * FROM events WHERE id = $1';
    const result = await pool.query(query, [eventId]);
    return result.rows[0];
  },
};

module.exports = Event;
