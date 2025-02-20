const Event = require('../models/Event');
const EventRequest = require('../models/EventRequest');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const { getIo } = require('../services/socketService');

exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      location,
      totalTickets,
      availableTickets,
      categoryId,
    } = req.body;
    const userId = req.user.id;

    let imageName = null;
    if (req.file) {
      const uploadDir = path.join(__dirname, '../uploads/events');

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      imageName = req.file.filename;
    }

    const newEvent = await Event.createEvent(
      title,
      description,
      date,
      location,
      totalTickets,
      availableTickets,
      categoryId,
      userId,
      imageName,
    );

    const newEventRequest = await EventRequest.createEventRequest(
      userId,
      title,
      description,
      'pending',
      newEvent.id,
    );

    const io = getIo();
    io.emit('newEventNotification', {
      message: 'A new event has been announced!',
      eventTitle: title,
      event: newEvent,
    });

    res.status(201).json({
      message: 'Event created and event request submitted successfully',
      event: newEvent,
      eventRequest: newEventRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.getAllEvents();

    res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching events' });
  }
};

exports.approveRejectEventRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { action } = req.body;

    if (action !== 'approve' && action !== 'reject') {
      return res
        .status(400)
        .json({ message: 'Invalid action. Must be "approve" or "reject".' });
    }

    const eventRequest = await EventRequest.findById(requestId);

    if (!eventRequest) {
      return res.status(404).json({ message: 'Event request not found' });
    }

    const newStatus = action === 'approve' ? 'approved' : 'rejected';

    const updatedEventRequest = await EventRequest.updateStatus(
      requestId,
      newStatus,
    );

    const eventDteatail = await Event.getEventById(eventRequest.event_id);

    console.log(eventRequest);
    if (newStatus === 'approved') {
      const io = getIo();
      io.emit('newApprovedEventNotification', {
        message: 'A new event has been created!',
        eventTitle: eventDteatail.title,
        event: eventDteatail,
      });

      res.status(200).json({
        message: 'Event request processed successfully',
        eventRequest: updatedEventRequest,
      });
    } else {
      res.status(200).json({
        message: 'Event request rejected successfully',
        eventRequest: updatedEventRequest,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getApprovedEvents = async (req, res) => {
  try {
    // Fetch approved event requests
    const approvedEventRequests = await EventRequest.getApprovedEvents();

    if (approvedEventRequests.length === 0) {
      return res
        .status(404)
        .json({ message: 'No approved event requests found' });
    }

    // For each approved event request, get the associated event details
    const events = [];
    for (let request of approvedEventRequests) {
      const event = await EventRequest.getEventDetailsByRequest(
        request.event_id,
      );
      if (event) {
        events.push(event);
      }
    }

    if (events.length === 0) {
      return res
        .status(404)
        .json({ message: 'No events found for approved requests' });
    }

    res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching approved events' });
  }
};

exports.getEventsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params; // Get categoryId from URL parameters

    if (!categoryId) {
      return res.status(400).json({ message: 'Category ID is required' });
    }

    // Fetch approved events filtered by category
    const events = await Event.getApprovedEventsByCategory(categoryId);

    if (!events || events.length === 0) {
      return res
        .status(404)
        .json({ message: 'No approved events found for this category' });
    }

    res.status(200).json({ events });
  } catch (error) {
    console.error('Error fetching approved events by category:', error);
    res.status(500).json({ message: 'Error fetching approved events' });
  }
};
