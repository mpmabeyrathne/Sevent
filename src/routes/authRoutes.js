const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateUser = require('../middleware/validateUser');

router.post('/register', validateUser, authController.register);
router.post('/login', authController.login);
router.post('/user/approved', authController.updateUserStatus);
router.get('/users', authController.getAllUsers);

module.exports = router;
