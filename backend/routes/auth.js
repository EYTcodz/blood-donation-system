const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register - Only donors can register publicly
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, bloodType, role } = req.body;

    // Only allow donor registration publicly
    if (role && role !== 'donor') {
      return res.status(400).json({
        success: false,
        message: 'Public registration only available for donors'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user (default to donor role)
    const newUser = await User.create({
      name,
      email,
      password,
      phone,
      bloodType,
      role: role || 'donor'
    });

    // Create token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        bloodType: newUser.bloodType
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error in registration',
      error: error.message
    });
  }
});

// Login - All users can login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bloodType: user.bloodType,
        hospitalName: user.hospitalName,
        bloodBankName: user.bloodBankName
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error in login',
      error: error.message
    });
  }
});

// Keep the test route for now
router.get('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Auth routes are working perfectly!' 
  });
});

module.exports = router;