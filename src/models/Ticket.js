const pool = require('../config/db');

const Ticket = {
  // Book a ticket for an event
  async bookTicket(eventId, userId, ticketsBooked) {
    const query = `
      INSERT INTO bookings (event_id, user_id, tickets_booked)
      VALUES ($1, $2, $3) 
      RETURNING id, event_id, user_id, tickets_booked;
    `;
    const values = [eventId, userId, ticketsBooked];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Update available tickets in the event
  async updateAvailableTickets(eventId, ticketsBooked) {
    const query = `
      UPDATE events 
      SET available_tickets = available_tickets - $1 
      WHERE id = $2 
      RETURNING available_tickets;
    `;
    const values = [ticketsBooked, eventId];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Get all bookings for a user
  async getUserBookings(userId) {
    const query = 'SELECT * FROM bookings WHERE user_id = $1';
    const result = await pool.query(query, [userId]);
    return result.rows;
  },
};

module.exports = Ticket;
