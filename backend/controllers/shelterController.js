const Shelter = require('../models/Shelter');

exports.createShelter = async (req, res) => {
  try {
    const shelter = new Shelter(req.body);
    await shelter.save();
    res.status(201).json(shelter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllShelters = async (req, res) => {
  try {
    const shelters = await Shelter.find();
    res.json(shelters);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getShelter = async (req, res) => {
  try {
    const shelter = await Shelter.findById(req.params.id).populate('staff').populate('pets');
    if (!shelter) {
      return res.status(404).json({ message: 'Shelter not found' });
    }
    res.json(shelter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateShelter = async (req, res) => {
  try {
    const shelter = await Shelter.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!shelter) {
      return res.status(404).json({ message: 'Shelter not found' });
    }
    res.json(shelter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteShelter = async (req, res) => {
  try {
    const shelter = await Shelter.findByIdAndDelete(req.params.id);
    if (!shelter) {
      return res.status(404).json({ message: 'Shelter not found' });
    }
    res.json({ message: 'Shelter deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};