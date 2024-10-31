const { z } = require('zod');
const Pet = require('../models/Pet');
const mongoose = require('mongoose');
const Shelter = require('../models/Shelter');

// Zod schemas
const PetSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  species: z.string().min(1, 'Species is required'),
  breed: z.string().optional(),
  age: z.number().min(0, 'Age cannot be negative').optional(),
  gender: z.enum(['male', 'female', 'unknown']),
  size: z.enum(['small', 'medium', 'large']),
  color: z.string().optional(),
  description: z.string().optional(),
  medicalHistory: z.string().optional(),
  behavior: z.string().optional(),
  adoptionStatus: z.enum(['available', 'pending', 'adopted']).default('available'),
  shelter: z.string().min(1, 'Shelter ID is required'),
  images: z.array(z.string()).optional(),
});

const UpdatePetSchema = PetSchema.partial();

const QuerySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  species: z.string().optional(),
  gender: z.enum(['male', 'female', 'unknown']).optional(),
  size: z.enum(['small', 'medium', 'large']).optional(),
  adoptionStatus: z.enum(['available', 'pending', 'adopted']).optional(),
  shelter: z.string().optional(),
  minAge: z.string().regex(/^\d+$/).transform(Number).optional(),
  maxAge: z.string().regex(/^\d+$/).transform(Number).optional(),
  search: z.string().optional(),
  sortBy: z.enum(['name', 'age', 'createdAt']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
});

// Create new pet
exports.createPet = async (req, res) => {
  try {
    const validatedData = PetSchema.parse(req.body);

    const pet = new Pet({
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await pet.save();
    const populatedPet = await Pet.findById(pet._id).populate('shelter');
    await Shelter.findByIdAndUpdate(validatedData.shelter, { $push: { pets: pet._id } });

    res.status(201).json({
      status: 'success',
      data: populatedPet,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        status: 'error',
        errors: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }

    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Get all pets with filtering, searching, and pagination
exports.getAllPets = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      minAge,
      maxAge,
      sortBy = 'createdAt',
      order = 'desc',
      ...filterParams
    } = QuerySchema.parse(req.query);

    const skip = (page - 1) * limit;

    // Build filter object
    const filter = Object.entries(filterParams).reduce((acc, [key, value]) => {
      if (value) acc[key] = value;
      return acc;
    }, {});

    // Add age range filter if provided
    if (minAge !== undefined || maxAge !== undefined) {
      filter.age = {};
      if (minAge !== undefined) filter.age.$gte = minAge;
      if (maxAge !== undefined) filter.age.$lte = maxAge;
    }

    // Add search functionality
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { breed: { $regex: search, $options: 'i' } },
      ];
    }

    const pets = await Pet.find(filter)
      .populate('shelter')
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(limit);

    const total = await Pet.countDocuments(filter);

    res.json({
      status: 'success',
      data: pets,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        status: 'error',
        errors: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }

    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Get pet by ID
exports.getPet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate('shelter');

    if (!pet) {
      return res.status(404).json({
        status: 'error',
        message: 'Pet not found',
      });
    }

    res.json({
      status: 'success',
      data: pet,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Update pet
exports.updatePet = async (req, res) => {
  try {
    const validatedData = UpdatePetSchema.parse(req.body);

    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      {
        ...validatedData,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    ).populate('shelter');

    if (!pet) {
      return res.status(404).json({
        status: 'error',
        message: 'Pet not found',
      });
    }

    res.json({
      status: 'success',
      data: pet,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        status: 'error',
        errors: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }

    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Delete pet
exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);

    if (!pet) {
      return res.status(404).json({
        status: 'error',
        message: 'Pet not found',
      });
    }
    await Shelter.findByIdAndUpdate(pet.shelter, { $pull: { pets: pet._id } });

    res.json({
      status: 'success',
      message: 'Pet deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Get pet statistics
exports.getPetStats = async (req, res) => {
  try {
    const stats = await Pet.aggregate([
      {
        $group: {
          _id: '$adoptionStatus',
          count: { $sum: 1 },
          averageAge: { $avg: '$age' },
        },
      },
    ]);

    const speciesStats = await Pet.aggregate([
      {
        $group: {
          _id: '$species',
          count: { $sum: 1 },
        },
      },
    ]);

    const sizeStats = await Pet.aggregate([
      {
        $group: {
          _id: '$size',
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      status: 'success',
      data: {
        adoptionStats: stats,
        speciesStats,
        sizeStats,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};
