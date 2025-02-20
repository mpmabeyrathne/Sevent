const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findByEmail(email);
    if (existingUser)
      return res.status(400).json({ message: 'Email already in use' });

    let imageName = null;
    if (req.file) {
      const uploadDir = path.join(__dirname, '../uploads/p_image');

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      imageName = req.file.filename;
    }
    const newUser = await User.createUser(name, email, password, imageName);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    res
      .status(201)
      .json({ message: 'User registered successfully', user: newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        p_image: user.p_image,
        role: user.role,
        status: user.status,
      },
      token,
      status: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const { userId, status } = req.body;

    const validStatuses = ['approved', 'rejected', 'pending'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedUser = await User.approveOrRejectUser(userId, status);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User status updated successfully',
      user: { id: updatedUser.id, status: updatedUser.status },
      status: true,
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();

    res.json({
      message: 'Users retrieved successfully',
      users,
      status: true,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    let p_image = null;

    if (req.file) {
      const uploadDir = path.join(__dirname, '../uploads/p_image');

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      imageName = req.file.filename;
    }

    const updatedUser = await User.updateUser(
      id,
      name,
      email,
      password,
      imageName,
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User updated successfully',
      user: updatedUser,
      status: true,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
