const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');


const app = express();
app.set("trust proxy" ,1)
const PORT = process.env.PORT || 3000;



const corsOptions = {
  origin: 'https://d-ztabib.vercel.app', // Explicit origin (no trailing slash)
  credentials: true, // Allow credentials
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Remove Access-Control-Allow-Origin
  exposedHeaders: ['Set-Cookie'], // Array format
  optionsSuccessStatus: 200
};

// const corsOptions = {
//   origin: true, // Allow all origins
//   credentials: true,
 
// };

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());


app.use('/', authRoutes);

app.get('/cookie' , (req,res) =>{

  console.log(req.cookies)
  return res.json("hello")
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});