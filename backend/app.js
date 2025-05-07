const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to parse application/x-www-form-urlencoded


app.use('/api/auth', authRoutes);

module.exports = app;
