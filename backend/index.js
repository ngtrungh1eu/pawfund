const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoute');
const petRoutes = require('./routes/petsRoute');
const shelterRoutes = require('./routes/shelterRoutes');
const adoptionRoutes = require('./routes/adoptionsRoute');
const donationRoutes = require('./routes/donationsRoute');
const eventRoutes = require('./routes/eventsRoute');
const userRoutes = require('./routes/userRoute');
const { connect } = require('./config/database');
const app = express();

// Config
dotenv.config();
app.use(express.static(path.join(__dirname, 'public')));

// const corsOptions = {
//     origin: ['http://localhost:3000', 'http://yourdomain.com'],
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204,
// };
app.use(cors());
app.use(methodOverride('_method'));
app.use(cookieParser());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Http logger
app.use(morgan('combined'));

// Connect database
connect();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/shelters', shelterRoutes);
app.use('/api/adoptions', adoptionRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
