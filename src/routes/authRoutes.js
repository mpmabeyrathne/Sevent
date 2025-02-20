const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateUser = require('../middleware/validateUser');
const { upload, setUploadType } = require('../middleware/upload');
const authMiddleware = require('../middleware/authMiddleware');

router.post(
  '/register',
  setUploadType('p_image'),
  upload.single('image'),
  validateUser,
  authController.register,
);
router.post('/login', authController.login);
router.post('/user/approved', authController.updateUserStatus);
router.get('/users', authController.getAllUsers);
router.put(
  '/user/:id',
  authMiddleware.verifyToken,
  setUploadType('p_image'),
  upload.single('image'),
  authController.updateUser,
);
router.post('/user/role/:id', authController.updateUserRole);

module.exports = router;
