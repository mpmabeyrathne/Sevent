const express = require('express');
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();

// Protected route to create an event (only authorized users can create events)
router.post(
  '/create',
  authMiddleware.verifyToken,
  upload.single('image'),
  eventController.createEvent,
);

// Route to get all events (public route)
router.get('/', eventController.getAllEvents);
router.put(
  '/approve-reject/:requestId',
  authMiddleware.verifyToken,
  authMiddleware.verifyAdmin,
  eventController.approveRejectEventRequest,
);
router.get(
  '/approved',
  authMiddleware.verifyToken,
  eventController.getApprovedEvents,
);

module.exports = router;
