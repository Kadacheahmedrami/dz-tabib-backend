const { Client } = require('pg'); // Import the pg library
require('dotenv').config(); // Load environment variables

// Load database connection details from environment variables
const dbHost = process.env.DB_HOST; // aws-0-eu-west-3.pooler.supabase.com
const dbPort = process.env.DB_PORT || 6543; // New port for connection pooling
const dbUser = process.env.DB_USER; // postgres.nkwbgojhclcfawnunojw
const dbPassword = process.env.DB_PASSWORD; // titanos360
const dbName = process.env.DB_NAME; // bdd

// Check if required environment variables are set
if (!dbHost || !dbUser || !dbPassword || !dbName) {
  console.error('Error: DB_HOST, DB_USER, DB_PASSWORD, or DB_NAME is not defined in the .env file.');
  process.exit(1); // Exit the application with an error
}

// Log the database connection details for debugging (optional, remove in production)
console.log('Database Host:', dbHost);
console.log('Database Port:', dbPort);
console.log('Database User:', dbUser);
console.log('Database Password:', dbPassword ? '*** Hidden ***' : 'Not Set');
console.log('Database Name:', dbName);

// Create a new PostgreSQL client
const client = new Client({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPassword,
  database: dbName,
});

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to the PostgreSQL database:', err);
    process.exit(1); // Exit the application with an error
  });

// Export the client for use in other parts of the application
module.exports = client;