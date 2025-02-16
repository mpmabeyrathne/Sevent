const Event = require('../models/Event');
const EventRequest = require('../models/EventRequest');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

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
    const userId = req.user.id; // Extract user ID from the JWT token

    // Check if request contains a file (image)
    let imageName = null;
    if (req.file) {
      // Define image storage path
      const uploadDir = path.join(__dirname, '../uploads/events');

      // Ensure the uploads folder exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Save image filename
      imageName = req.file.filename;
    }

    // Create a new event with image
    const newEvent = await Event.createEvent(
      title,
      description,
      date,
      location,
      totalTickets,
      availableTickets,
      categoryId,
      userId,
      imageName, // Pass the uploaded image filename
    );

    console.log(newEvent.id);
    const newEventRequest = await EventRequest.createEventRequest(
      userId,
      title,
      description,
      'pending',
      newEvent.id, // Set status to 'pending' initially
    );

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
    // Fetch events from the database
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

    // Check if the action is valid
    if (action !== 'approve' && action !== 'reject') {
      return res
        .status(400)
        .json({ message: 'Invalid action. Must be "approve" or "reject".' });
    }

    // Fetch the event request from the database
    const eventRequest = await EventRequest.findById(requestId);

    if (!eventRequest) {
      return res.status(404).json({ message: 'Event request not found' });
    }

    // Update the status of the event request based on the action
    const newStatus = action === 'approve' ? 'approved' : 'rejected';

    // Update the event request status
    const updatedEventRequest = await EventRequest.updateStatus(
      requestId,
      newStatus,
    );

    // If approved, create the event
    if (newStatus === 'approved') {
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

    console.log(approvedEventRequests);
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
