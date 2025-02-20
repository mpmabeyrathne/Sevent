// socketService.js
const { Server } = require('socket.io');
const db = require('../config/db'); // Import the database connection
let io;

// Track user sockets by role and id
const userSockets = new Map(); // userId -> socket
const adminSockets = new Map(); // socketId -> socket
const studentSockets = new Map(); // socketId -> socket

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*', // Restrict in production
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle user authentication
    socket.on('userAuthenticated', (userData) => {
      console.log(`User authenticated: ${userData.id}, Role: ${userData.role}`);

      // Store user data in socket
      socket.data.user = userData;

      // Track user socket by ID for direct messaging
      userSockets.set(userData.id, socket);

      // Track socket by role for role-based messaging
      if (userData.role === 'admin') {
        adminSockets.set(socket.id, socket);
        console.log(`Admin user connected: ${userData.id}`);
      } else if (userData.role === 'student') {
        studentSockets.set(socket.id, socket);
        console.log(`Student user connected: ${userData.id}`);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);

      if (socket.data && socket.data.user) {
        userSockets.delete(socket.data.user.id);
      }

      // Remove from role-based collections
      adminSockets.delete(socket.id);
      studentSockets.delete(socket.id);
    });
  });

  return io;
};

// Function to retrieve admin count from the database
const getAdminCountFromDb = async () => {
  try {
    const res = await db.query('SELECT COUNT(*) FROM users WHERE role = $1', [
      'admin',
    ]);
    return parseInt(res.rows[0].count, 10); // Assuming 'users' table has a 'role' column
  } catch (err) {
    console.error('Error retrieving admin count:', err);
    return 0; // If there's an error, return 0
  }
};

// Function to send notifications only to admin users
const notifyAdmins = async (notification) => {
  const adminCount = await getAdminCountFromDb(); // Get the count from the database

  console.log(`Sending notification to ${adminCount} admin(s)`);

  adminSockets.forEach((socket) => {
    socket.emit('newNotification', notification);
  });
};

module.exports = {
  initializeSocket,
  getIo: () => {
    if (!io) {
      throw new Error(
        'Socket.io not initialized. Call initializeSocket first.',
      );
    }
    return io;
  },
  notifyAdmins,
};
