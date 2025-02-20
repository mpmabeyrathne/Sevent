// controllers/ticketController.js
const Event = require('../models/Event');
const Ticket = require('../models/Ticket');
const User = require('../models/User'); // Assuming you have a user model
const emailService = require('../services/emailService');

exports.bookTicket = async (req, res) => {
  try {
    const { eventId, ticketsBooked } = req.body;
    const userId = req.user.id; // Extract user ID from the JWT token

    console.log(userId);

    // Check if the event exists
    const events = await Event.getAllEvents();
    const selectedEvent = events.find((e) => e.id === parseInt(eventId));

    if (!selectedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if there are enough available tickets
    if (selectedEvent.available_tickets < ticketsBooked) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    // Book the ticket
    const newBooking = await Ticket.bookTicket(eventId, userId, ticketsBooked);

    // Update the available tickets for the event
    await Ticket.updateAvailableTickets(eventId, ticketsBooked);

    // Get user information for the email
    const user = await User.findById(userId);

    console.log(user);
    // Send confirmation email with QR code
    const emailSent = await emailService.sendTicketEmail({
      userEmail: user.email,
      userName: user.name || user.username,
      eventName: selectedEvent.title,
      ticketCount: ticketsBooked,
      bookingId: newBooking.id,
      userId: userId,
      eventDate: selectedEvent.time,
      eventLocation: selectedEvent.location,
    });

    res.status(201).json({
      message: 'Ticket booked successfully',
      booking: newBooking,
      emailSent: emailSent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
