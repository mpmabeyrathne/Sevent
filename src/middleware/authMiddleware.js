const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool();
const User = require('../models/User');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res
      .status(403)
      .json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user data to the request object
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

exports.verifyAdmin = async (req, res, next) => {
  try {
    // Get email from the token
    const email = req.user.email;

    const result = await User.findByEmail(email);
    console.log(result);
    if (!result) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the user is an admin
    if (result.role === 'admin') {
      return next();
    }

    res.status(403).json({ message: 'Access denied. Admins only.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
