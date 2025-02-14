const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateUser = require('../middleware/validateUser');

router.post('/register', validateUser, authController.register);
router.post('/login', authController.login);

module.exports = router;
