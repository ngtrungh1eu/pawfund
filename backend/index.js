const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/authRoute');
const petRoutes = require('./routes/petsRoute');
const shelterRoutes = require('./routes/shelterRoutes');
const adoptionRoutes = require('./routes/adoptionsRoute');
const donationRoutes = require('./routes/donationsRoute');
const eventRoutes = require('./routes/eventsRoute');

const app = express();

app.use(cors());
app.use(express.json());

// Kết nối database
mongoose.connect('mongodb://localhost:27017/pawfund')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));
// Routes
app.use('/api/users', userRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/shelters', shelterRoutes);
app.use('/api/adoptions', adoptionRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/events', eventRoutes);

module.exports = app;