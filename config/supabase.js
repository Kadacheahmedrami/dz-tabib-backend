const { Pool } = require('pg');
require('dotenv').config();

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT || 6543;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

if (!dbHost || !dbUser || !dbPassword || !dbName) {
  console.error('Error: DB_HOST, DB_USER, DB_PASSWORD, or DB_NAME is not defined in the .env file.');
  process.exit(1);
}

const pool = new Pool({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Timeout for acquiring a connection
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Database pool error:', err);
});

module.exports = pool;