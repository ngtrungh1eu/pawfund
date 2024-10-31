// validators/shelterValidator.js
const { z } = require('zod');
const { Types } = require('mongoose');
const User = require('../models/User');

// Custom validator cho MongoDB ObjectId
const objectIdSchema = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), { message: 'ID không hợp lệ' });

const addressSchema = z.object({
  street: z.string({
    required_error: 'Địa chỉ đường phố là bắt buộc',
  }),
  city: z.string({
    required_error: 'Thành phố là bắt buộc',
  }),
  state: z.string({
    required_error: 'Tỉnh/Thành phố là bắt buộc',
  }),
  zipCode: z.string().regex(/^[0-9]{5,6}$/, 'Mã bưu điện phải có 5-6 chữ số'),
  country: z.string({
    required_error: 'Quốc gia là bắt buộc',
  }),
});

const shelterSchema = z.object({
  name: z
    .string({
      required_error: 'Tên shelter là bắt buộc',
    })
    .min(2, 'Tên shelter phải có ít nhất 2 ký tự')
    .max(100, 'Tên shelter không được vượt quá 100 ký tự'),

  email: z
    .string({
      required_error: 'Email là bắt buộc',
    })
    .email('Email không hợp lệ'),

  phoneNumber: z
    .string()
    .regex(/^[0-9]{10,11}$/, 'Số điện thoại phải có 10-11 chữ số')
    .optional(),

  address: addressSchema,

  description: z.string().max(1000, 'Mô tả không được vượt quá 1000 ký tự').optional(),

  staff: z.array(objectIdSchema).optional(),

  pets: z.array(objectIdSchema).optional(),
});

// controllers/shelterController.js
const Shelter = require('../models/Shelter');
const mongoose = require('mongoose');

exports.createShelter = async (req, res) => {
  try {
    // Validate request body using Zod
    const validatedData = await shelterSchema.safeParseAsync(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        message: 'Validation error',
        errors: validatedData.error.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        })),
      });
    }

    // Check if email already exists
    const existingShelter = await Shelter.findOne({ email: validatedData.data.email });
    if (existingShelter) {
      return res.status(400).json({ message: 'Email đã được sử dụng' });
    }

    if (validatedData.data.staff) {
      await User.updateMany(
        { _id: { $in: validatedData.data.staff } },
        { shelter: validatedData.data._id }
      );
    }

    const shelter = new Shelter(validatedData.data);
    await shelter.save();
    res.status(201).json(shelter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllShelters = async (req, res) => {
  try {
    const pageSchema = z.object({
      page: z.string().regex(/^\d+$/).transform(Number).default('1'),
      limit: z.string().regex(/^\d+$/).transform(Number).default('10'),
    });

    const { page, limit } = pageSchema.parse({
      page: req.query.page,
      limit: req.query.limit,
    });

    const skip = (page - 1) * limit;

    const [shelters, total] = await Promise.all([
      Shelter.find().skip(skip).limit(limit).select('-__v'),
      Shelter.countDocuments(),
    ]);

    res.json({
      shelters,
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
        message: 'Validation error',
        errors: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.getShelter = async (req, res) => {
  try {
    const { id } = z
      .object({
        id: objectIdSchema,
      })
      .parse({ id: req.params.id });

    const shelter = await Shelter.findById(id)
      .populate('staff', 'name email')
      .populate('pets', 'name species breed');

    if (!shelter) {
      return res.status(404).json({ message: 'Không tìm thấy shelter' });
    }
    res.json(shelter);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.updateShelter = async (req, res) => {
  try {
    // Validate ID
    const { id } = z
      .object({
        id: objectIdSchema,
      })
      .parse({ id: req.params.id });

    // Validate request body
    const validatedData = await shelterSchema.partial().safeParseAsync(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        message: 'Validation error',
        errors: validatedData.error.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        })),
      });
    }

    // Check if email already exists (excluding current shelter)
    if (validatedData.data.email) {
      const existingShelter = await Shelter.findOne({
        email: validatedData.data.email,
        _id: { $ne: id },
      });
      if (existingShelter) {
        return res.status(400).json({ message: 'Email đã được sử dụng' });
      }
    }

    const shelter = await Shelter.findByIdAndUpdate(
      id,
      { ...validatedData.data, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    // Cập nhật shelter cho tất cả các user liên quan
    if (validatedData.data.staff) {
      await User.updateMany({ _id: { $in: validatedData.data.staff } }, { shelter: shelter._id });
    }

    if (!shelter) {
      return res.status(404).json({ message: 'Không tìm thấy shelter' });
    }
    res.json(shelter);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.deleteShelter = async (req, res) => {
  try {
    const { id } = z
      .object({
        id: objectIdSchema,
      })
      .parse({ id: req.params.id });

    const shelter = await Shelter.findById(id);
    if (!shelter) {
      return res.status(404).json({ message: 'Không tìm thấy shelter' });
    }

    if (shelter.pets && shelter.pets.length > 0) {
      return res.status(400).json({
        message: 'Không thể xóa shelter này vì vẫn còn thú cưng đang được quản lý',
      });
    }

    await Pet.updateMany({ shelter: id }, { $unset: { shelter: '' } });

    await shelter.deleteOne();
    res.json({ message: 'Đã xóa shelter thành công' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }
    res.status(500).json({ message: error.message });
  }
};
