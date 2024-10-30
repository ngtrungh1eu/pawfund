const { z } = require('zod');
const Adoption = require('../models/Adoption');
const Pet = require('../models/Pet');
const User = require('../models/User');
const Shelter = require('../models/Shelter');
const mongoose = require('mongoose');

// Zod schemas
const AdoptionSchema = z.object({
  pet: z.string().min(1, 'Pet ID is required'),
  customer: z.string().min(1, 'Customer ID is required'),
  shelter: z.string().min(1, 'Shelter ID is required'),
  status: z.enum(['pending', 'approved', 'rejected', 'completed']).optional(),
  adoptionFee: z.number().min(0, 'Adoption fee cannot be negative').optional(),
  notes: z.string().optional(),
});

const UpdateAdoptionSchema = AdoptionSchema.partial().extend({
  rejectionReason: z.string().optional(),
});

const QuerySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'completed']).optional(),
  shelter: z.string().optional(),
  customer: z.string().optional(),
});

// Create new adoption
exports.createAdoption = async (req, res) => {
  try {
    // Validate request body using Zod
    const validatedData = AdoptionSchema.parse(req.body);

    const adoption = new Adoption({
      ...validatedData,
      applicationDate: new Date(),
      status: 'pending',
    });

    const shelter = await Shelter.findById(validatedData.shelter);
    if (!shelter) {
      return res.status(400).json({
        status: 'error',
        message: 'Shelter does not exist.',
      });
    }

    const pet = await Pet.findById(validatedData.pet);
    if (!pet) {
      return res.status(400).json({
        status: 'error',
        message: 'Pet does not exist.',
      });
    }

    if (!shelter.pets.includes(pet._id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Pet is not in the specified shelter.',
      });
    }

    await Pet.findByIdAndUpdate(validatedData.pet, { adoptionStatus: validatedData.status });

    await adoption.save();

    const populatedAdoption = await Adoption.findById(adoption._id)
      .populate('pet')
      .populate('customer')
      .populate('shelter');

    res.status(201).json({
      status: 'success',
      data: populatedAdoption,
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

// Get all adoptions with filtering and pagination
exports.getAllAdoptions = async (req, res) => {
  try {
    // Validate query parameters
    const { page = 1, limit = 10, ...queryParams } = QuerySchema.parse(req.query);
    const skip = (page - 1) * limit;

    // Build filter object from validated query params
    const filter = Object.entries(queryParams).reduce((acc, [key, value]) => {
      if (value) acc[key] = value;
      return acc;
    }, {});

    const adoptions = await Adoption.find(filter)
      .populate('pet')
      .populate('customer')
      .populate('shelter')
      .sort({ applicationDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Adoption.countDocuments(filter);

    res.json({
      status: 'success',
      data: adoptions,
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

// Get single adoption by ID
exports.getAdoption = async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id)
      .populate('pet')
      .populate('customer')
      .populate('shelter');

    if (!adoption) {
      return res.status(404).json({
        status: 'error',
        message: 'Adoption not found',
      });
    }

    res.json({
      status: 'success',
      data: adoption,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Update adoption
exports.updateAdoption = async (req, res) => {
  try {
    // Validate request body
    const validatedData = UpdateAdoptionSchema.parse(req.body);

    // Additional validation for rejection
    if (validatedData.status === 'rejected') {
      if (!validatedData.rejectionReason) {
        throw new Error('Rejection reason is required when rejecting an adoption');
      }
    }

    // Add approval date if status is changed to approved
    if (validatedData.status === 'approved') {
      validatedData.approvalDate = new Date();
    }

    const adoption = await Adoption.findByIdAndUpdate(
      req.params.id,
      {
        ...validatedData,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    )
      .populate('pet')
      .populate('customer')
      .populate('shelter');

    if (!adoption) {
      return res.status(404).json({
        status: 'error',
        message: 'Adoption not found',
      });
    }

    res.json({
      status: 'success',
      data: adoption,
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

// Delete adoption
exports.deleteAdoption = async (req, res) => {
  try {
    const adoption = await Adoption.findByIdAndDelete(req.params.id);

    if (!adoption) {
      return res.status(404).json({
        status: 'error',
        message: 'Adoption not found',
      });
    }

    await Pet.findByIdAndUpdate(adoption.pet, { adoptionStatus: 'available' });

    res.json({
      status: 'success',
      message: 'Adoption deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Get adoptions statistics
exports.getAdoptionStats = async (req, res) => {
  try {
    const stats = await Adoption.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          avgAdoptionFee: { $avg: '$adoptionFee' },
        },
      },
    ]);

    const totalAdoptions = await Adoption.countDocuments();
    const pendingAdoptions = await Adoption.countDocuments({ status: 'pending' });

    res.json({
      status: 'success',
      data: {
        statusBreakdown: stats,
        total: totalAdoptions,
        pending: pendingAdoptions,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};
