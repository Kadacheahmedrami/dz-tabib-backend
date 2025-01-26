const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 10000;



// const corsOptions = {
//   origin: true, // Allow all origins
//   credentials: true,
 
// };

app.use(cors({
  origin: '*', // This allows requests from any origin; change this as necessary for security.
  credentials: true, // This allows cookies to be sent and received
}));


app.use(cookieParser());

// Route to set a cookie
// app.get('/set-cookie', (req, res) => {
//   // Set a cookie with SameSite=None and Secure (for cross-site testing)
//   res.cookie('user_session', 'sameSiteTest', {
//     httpOnly: true,  // Cookie is only accessible by HTTP requests
//     secure: true,    // Cookie is only sent over HTTPS (useful for production)
//     sameSite: 'None', // Allows the cookie to be sent in cross-origin requests
//     path: '/',
//     maxAge: 3600000, // Cookie expires after 1 hour (in milliseconds)
//   });

//   res.send('Cookie has been set with SameSite=None and Secure flag!');
// });



app.use(express.json());


app.use('/', authRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});