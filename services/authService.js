const bcrypt = require('bcryptjs');
const pool = require('../config/supabase'); // Import the pool
const { generateToken } = require('../config/jwtConfig');


const registerUser = async (userData, userType) => {
  const { password, ...userDetails } = userData;

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Determine table name
  const tableName = userType === 'doctor' ? 'doctors' : 'patients';

  // Prepare SQL query
  const columns = Object.keys(userDetails).join(', ');
  const values = Object.values(userDetails);
  const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

  const query = `
    INSERT INTO ${tableName} (${columns}, password)
    VALUES (${placeholders}, $${values.length + 1})
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [...values, hashedPassword]);

    if (result.rows.length === 0) {
      throw new Error('Registration failed: No data returned');
    }

    console.log('Registration successful:', result.rows[0]);
    return result.rows[0]; // Return the newly created user
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error(`Registration failed: ${error.message}`);
  }
};

const loginUser = async (email, password, userType) => {
  // Determine table name
  const tableName = userType === 'doctor' ? 'doctors' : 'patients';

  try {
    // Query the database
    const query = `
      SELECT * FROM ${tableName}
      WHERE email = $1;
    `;

    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    const user = result.rows[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = generateToken(user, userType);

    return { user, token };
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Login failed');
  }
};

module.exports = {
  registerUser,
  loginUser
};