const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const petRoutes = require('./routes/petsRoute');

const app = express();

app.use(cors());
app.use(express.json());

// Kết nối database
mongoose.connect('mongodb://localhost:27017/yourdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));
// Routes
app.use('/pets', petRoutes);

module.exports = app;