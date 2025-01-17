const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['customer', 'shelter_staff', 'volunteer', 'admin'],
    required: true,
    default: 'customer',
  },
  firstName: String,
  lastName: String,
  phoneNumber: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
  },
  refreshToken: { type: String },
  shelter: { type: mongoose.Schema.Types.ObjectId, ref: 'Shelter' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
