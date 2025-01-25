const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const client = require('./config/supabase'); // Import the pg client

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for JSON parsing (optional, useful for APIs)
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

const corsOptions = {
    origin: "http://localhost:3000", // adjust as necessary
    credentials: true,
  };

app.use(cors(corsOptions));

// Define a simple root route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Test connection endpoint
app.get('/test-connection', async (req, res) => {
  try {
    // Query the database
    const result = await client.query('SELECT * FROM doctors;');

    // Send successful response with retrieved data
    res.status(200).json({
      success: true,
      message: 'Database connection successful!',
      data: result.rows,
    });
  } catch (err) {
    // Handle connection or query errors
    res.status(500).json({
      success: false,
      message: 'Failed to connect to the database',
      error: err.message,
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});