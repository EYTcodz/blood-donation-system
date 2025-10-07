const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug all requests
app.use((req, res, next) => {
  console.log(`📨 ${new Date().toLocaleTimeString()} - ${req.method} ${req.url}`);
  next();
});

// Import routes
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api/auth', authRoutes);

// Test route - should work
app.get('/api/test', (req, res) => {
  console.log('✅ Test route hit');
  res.json({ message: 'Test route is working!' });
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Blood Donation API is running!' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blood-donation')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📋 Available routes:`);
  console.log(`   GET  /`);
  console.log(`   GET  /api/test`);
  console.log(`   GET  /api/auth/test`);
  console.log(`   POST /api/auth/register`);
  console.log(`   POST /api/auth/login`);
});