const Donation = require('../models/Donation');

exports.createDonation = async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).json(donation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate('donor');
    res.json(donations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate('donor');
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.json(donation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.json(donation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};