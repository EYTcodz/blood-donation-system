const express = require('express');
const router = express.Router();

// Test route to check if auth routes are working
router.get('/test', (req, res) => {
  console.log('✅ Auth test route is working!');
  res.json({ 
    success: true, 
    message: 'Auth routes are working perfectly!' 
  });
});

// Register route - simplified for testing
router.post('/register', (req, res) => {
  console.log('Register route hit', req.body);
  res.json({ 
    success: true, 
    message: 'Register route is working!',
    data: req.body 
  });
});

// Login route - simplified for testing
router.post('/login', (req, res) => {
  console.log('Login route hit', req.body);
  res.json({ 
    success: true, 
    message: 'Login route is working!',
    data: req.body 
  });
});

module.exports = router;