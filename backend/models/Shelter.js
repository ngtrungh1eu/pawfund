const mongoose = require('mongoose');

const shelterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  description: String,
  website: String,
  staff: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shelter', shelterSchema);