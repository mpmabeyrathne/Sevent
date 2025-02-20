// controllers/ticketController.js
const Event = require('../models/Event');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const emailService = require('../services/emailService');

exports.bookTicket = async (req, res) => {
  try {
    const { eventId, ticketsBooked } = req.body;
    const userId = req.user.id;

    const events = await Event.getAllEvents();
    const selectedEvent = events.find((e) => e.id === parseInt(eventId));

    if (!selectedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (selectedEvent.available_tickets < ticketsBooked) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    const newBooking = await Ticket.bookTicket(eventId, userId, ticketsBooked);

    await Ticket.updateAvailableTickets(eventId, ticketsBooked);

    const user = await User.findById(userId);;

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
