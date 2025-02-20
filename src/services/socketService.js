// socketService.js
const { Server } = require('socket.io');
const db = require('../config/db'); 
let io;

// Track user sockets by role and id
const userSockets = new Map(); 
const adminSockets = new Map(); 
const studentSockets = new Map(); 

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*', 
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('userAuthenticated', (userData) => {
      console.log(`User authenticated: ${userData.id}, Role: ${userData.role}`);

      socket.data.user = userData;

      userSockets.set(userData.id, socket);

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

      adminSockets.delete(socket.id);
      studentSockets.delete(socket.id);
    });
  });

  return io;
};

const getAdminCountFromDb = async () => {
  try {
    const res = await db.query('SELECT COUNT(*) FROM users WHERE role = $1', [
      'admin',
    ]);
    return parseInt(res.rows[0].count, 10);
  } catch (err) {
    console.error('Error retrieving admin count:', err);
    return 0; 
  }
};

const notifyAdmins = async (notification) => {
  const adminCount = await getAdminCountFromDb(); 

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
