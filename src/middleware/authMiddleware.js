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
    req.user = decoded; 
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

exports.verifyAdmin = async (req, res, next) => {
  try {
    const email = req.user.email;

    const result = await User.findByEmail(email);
    if (!result) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (result.role === 'admin') {
      return next();
    }

    res.status(403).json({ message: 'Access denied. Admins only.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
