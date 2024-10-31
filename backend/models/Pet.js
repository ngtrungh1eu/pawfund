const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: String,
  age: Number,
  gender: { type: String, enum: ['male', 'female', 'unknown'] },
  size: { type: String, enum: ['small', 'medium', 'large'] },
  color: String,
  description: String,
  medicalHistory: String,
  behavior: String,
  adoptionStatus: { type: String, enum: ['available', 'pending', 'adopted'], default: 'available' },
  shelter: { type: mongoose.Schema.Types.ObjectId, ref: 'Shelter', required: true },
  images: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pet', petSchema);