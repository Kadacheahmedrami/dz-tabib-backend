const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const { validateRegistration, validateLogin } = require('../middleware/validationMiddleware');

// Doctor Registration
router.post('/doctor/register', validateRegistration, async (req, res) => {
  try {
    const newDoctor = await authService.registerUser(req.body, 'doctor');
    res.status(201).json({ message: 'Doctor registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Patient Registration
router.post('/patient/register', validateRegistration, async (req, res) => {
  try {
    const newPatient = await authService.registerUser(req.body, 'patient');
    res.status(201).json({ message: 'Patient registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    const { token } = await authService.loginUser(email, password, userType);

    // Extract the domain from the request origin
    const origin = req.get('origin');
    const domain = origin ? new URL(origin).hostname : undefined;
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      sameSite: 'none', // Required for cross-site cookies
      domain: domain, // Dynamically set the domain
      path: '/', // Ensure the cookie is accessible across all routes
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;