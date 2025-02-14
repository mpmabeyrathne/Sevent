const Ticket = require('../models/Ticket');
const Event = require('../models/Event');

exports.bookTicket = async (req, res) => {
  try {
    const { eventId, ticketsBooked } = req.body;
    const { userId } = req.user; // Extract user ID from the JWT token

    // Check if the event exists
    const event = await Event.getAllEvents();
    const selectedEvent = event.find((e) => e.id === parseInt(eventId));

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

    res.status(201).json({
      message: 'Ticket booked successfully',
      booking: newBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
