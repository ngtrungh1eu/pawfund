const Pet = require('../models/Pet');

exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find().populate('shelter');
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPet = async (req, res) => {
  const pet = new Pet(req.body);
  try {
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};