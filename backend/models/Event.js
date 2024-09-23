const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  eventType: { type: String, enum: ['adoption', 'fundraising', 'volunteer'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: {
    name: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'Shelter', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
  targetFundAmount: Number,
  currentFundAmount: { type: Number, default: 0 },
  images: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);