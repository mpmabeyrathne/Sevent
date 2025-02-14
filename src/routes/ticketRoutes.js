const express = require('express');
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route to book tickets
router.post('/book', authMiddleware.verifyToken, ticketController.bookTicket);

module.exports = router;
