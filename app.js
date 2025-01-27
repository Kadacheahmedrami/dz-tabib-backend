const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');


const app = express();
app.set("trust proxy" ,1)
const PORT = process.env.PORT || 3000;



const corsOptions = {
  origin: true,
  credentials: true, 
  optionSuccessStatus: 200,
  Headers: true,
  exposedHeaders: 'Set-Cookie',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Content-Type',
    'Authorization'
  ]
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
  return res.json(req.cookies)
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});