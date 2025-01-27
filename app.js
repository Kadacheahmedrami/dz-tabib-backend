const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;


const corsOptions = {
    origin: true,
    credentials: true,
    
};


// const corsOptions = {
//   origin: true, // Allow all origins
//   credentials: true,
 
// };
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(express.json());


app.use('/', authRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});