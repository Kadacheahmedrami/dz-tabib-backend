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
// hope this make it
// Login Route
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    const { token } = await authService.loginUser(email, password, userType);

    res.cookie('ramix', token, {
      httpOnly: true,
      secure: true,
      sameSite : 'None',
      maxAge: 36000000000,
      domain:'d-ztabib.vercel.app'
   
    });

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  res.clearCookie('ramix');
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;