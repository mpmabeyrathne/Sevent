const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const pool = require('./config/db');
dotenv.config();

const app = require('./app');

app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/uploads/events',
  express.static(path.join(__dirname, 'uploads', 'events')),
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
