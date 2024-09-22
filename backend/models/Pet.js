const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: String,
  age: Number,
  description: String,
  shelter: { type: mongoose.Schema.Types.ObjectId, ref: 'Shelter', required: true },
  adoptionStatus: { type: String, enum: ['available', 'pending', 'adopted'], default: 'available' },
  images: [String]
});

module.exports = mongoose.model('Pet', petSchema);