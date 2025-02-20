const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const http = require('http');
const { initializeSocket } = require('./services/socketService');
dotenv.config();

const app = require('./app');

const server = http.createServer(app);
initializeSocket(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/uploads/events',
  express.static(path.join(__dirname, 'uploads', 'events')),
);
app.use(
  '/uploads/p_image',
  express.static(path.join(__dirname, 'uploads', 'p_image')),
);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Sevent.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
