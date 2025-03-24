require('dotenv').config();

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('./Models/db');

// Import your auth routes
const authRoutes = require('./Routes/authRouter');

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("This is the Login Page");
});

// Use auth routes correctly
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
