const jwt = require('jsonwebtoken');

const generateToken = (user, userType) => {
  return jwt.sign(
    { 
      id: user[`${userType}_id`],
      email: user.email,
      name: user.name,
      full_name: user.full_name,
      role: userType
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: '7d' }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };