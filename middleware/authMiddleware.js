const { verifyToken } = require('../config/jwtConfig');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(403).json({ error: 'Unauthorized: Invalid token' });
  }

  req.user = decoded;
  next();
};

const requireDoctor = (req, res, next) => {
  authenticateToken(req, res, () => {
    if (req.user.role !== 'doctor') {
      return res.status(403).json({ error: 'Access denied: Doctor role required' });
    }
    next();
  });
};

const requirePatient = (req, res, next) => {
  authenticateToken(req, res, () => {
    if (req.user.role !== 'patient') {
      return res.status(403).json({ error: 'Access denied: Patient role required' });
    }
    next();
  });
};

module.exports = {
  authenticateToken,
  requireDoctor,
  requirePatient
};