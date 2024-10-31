const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'paypal', 'bank_transfer', 'momo', 'vnpay'],
    required: true,
  },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  target: {
    type: { type: String, enum: ['shelter', 'pet', 'event'], required: true },
    id: { type: mongoose.Schema.Types.ObjectId, refPath: 'target.type', required: true },
  },
  message: String,
  isAnonymous: { type: Boolean, default: false },
  transactionId: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donation', donationSchema);
