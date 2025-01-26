const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const client = require('./config/supabase');
const cors = require('cors');
// const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//     message: 'Too many requests from this IP, please try again later.',
//     standardHeaders: true,
//     legacyHeaders: false,
//     maxWait: 0,
// });


const corsOptions = {
    origin: true,
    credentials: true,
};


// const corsOptions = {
//   origin: true, // Allow all origins
//   credentials: true,
 
// };

app.use(cors(corsOptions));
app.use(limiter);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.get('/test-connection', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM doctors;');
        res.status(200).json({
            success: true,
            message: 'Database connection successful!',
            data: result.rows,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to connect to the database',
            error: err.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});