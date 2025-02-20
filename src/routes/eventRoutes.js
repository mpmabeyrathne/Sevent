const express = require('express');
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');
const { upload, setUploadType } = require('../middleware/upload');

const router = express.Router();

router.post(
  '/create',
  authMiddleware.verifyToken,
  setUploadType('events'),
  upload.single('image'),
  eventController.createEvent,
);

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

router.get(
  '/category/:categoryId',
  authMiddleware.verifyToken,
  eventController.getEventsByCategory,
);

module.exports = router;
