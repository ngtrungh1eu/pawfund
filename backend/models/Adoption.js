const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    shelter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shelter',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'completed'],
        default: 'pending',
    },
    applicationDate: { type: Date, default: Date.now },
    approvalDate: Date,
    rejectionReason: String,
    adoptionFee: Number,
    notes: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Adoption', adoptionSchema);
