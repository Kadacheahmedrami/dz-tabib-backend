const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const client = require('./config/supabase'); // Import the pg client
const cors = require('cors');
const rateLimit = require('express-rate-limit');


const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `windowMs`
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
  

const corsOptions = {
    origin: "http://localhost:3000", // adjust as necessary
    credentials: true,
  };









// Middleware for JSON parsing (optional, useful for APIs)



app.use(cors(corsOptions));
app.use(limiter);
app.use(express.json());
app.use(cookieParser());


// Routes


app.use('/api/auth', authRoutes);

// Apply rate limiting to all requests




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