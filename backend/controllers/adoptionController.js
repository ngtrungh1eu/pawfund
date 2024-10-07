const Adoption = require('../models/Adoption');

exports.createAdoption = async (req, res) => {
  try {
    const adoption = new Adoption(req.body);
    await adoption.save();
    res.status(201).json(adoption);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find().populate('pet').populate('adopter').populate('shelter');
    res.json(adoptions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAdoption = async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id).populate('pet').populate('adopter').populate('shelter');
    if (!adoption) {
      return res.status(404).json({ message: 'Adoption not found' });
    }
    res.json(adoption);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateAdoption = async (req, res) => {
  try {
    const adoption = await Adoption.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!adoption) {
      return res.status(404).json({ message: 'Adoption not found' });
    }
    res.json(adoption);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};