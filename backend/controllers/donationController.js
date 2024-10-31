const { z } = require('zod');
const { Types } = require('mongoose');
const Donation = require('../models/Donation');
const mongoose = require('mongoose');

const objectIdSchema = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), { message: 'ID không hợp lệ' });

// Enum constants
const PAYMENT_METHODS = ['credit_card', 'paypal', 'bank_transfer', 'momo', 'vnpay'];
const DONATION_STATUS = ['pending', 'completed', 'failed'];
const TARGET_TYPES = ['shelter', 'pet', 'event'];

const donationSchema = z.object({
  donor: objectIdSchema.describe('ID của người quyên góp'),

  amount: z
    .number({
      required_error: 'Số tiền quyên góp là bắt buộc',
    })
    .positive('Số tiền quyên góp phải lớn hơn 0')
    .max(1000000, 'Số tiền quyên góp không được vượt quá 1,000,000'),

  currency: z.enum(['USD', 'VND', 'EUR']).default('USD').describe('Loại tiền tệ'),

  paymentMethod: z.enum(PAYMENT_METHODS, {
    required_error: 'Phương thức thanh toán là bắt buộc',
    invalid_type_error: 'Phương thức thanh toán không hợp lệ',
  }),

  status: z.enum(DONATION_STATUS).default('pending').describe('Trạng thái thanh toán'),

  target: z.object({
    type: z.enum(TARGET_TYPES, {
      required_error: 'Loại đối tượng nhận quyên góp là bắt buộc',
    }),
    id: objectIdSchema.describe('ID của đối tượng nhận quyên góp'),
  }),

  message: z.string().max(250, 'Lời nhắn không được vượt quá 250 ký tự').optional(),

  isAnonymous: z.boolean().default(false).describe('Quyên góp ẩn danh'),

  transactionId: z.string().optional().describe('ID giao dịch'),
});

exports.createDonation = async (req, res) => {
  try {
    // Validate request body
    const validatedData = await donationSchema.safeParseAsync(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        message: 'Validation error',
        errors: validatedData.error.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        })),
      });
    }

    // Verify target exists based on type
    const targetModel = mongoose.model(
      validatedData.data.target.type.charAt(0).toUpperCase() +
        validatedData.data.target.type.slice(1)
    );
    const targetExists = await targetModel.findById(validatedData.data.target.id);

    if (!targetExists) {
      return res.status(400).json({
        message: `Không tìm thấy ${validatedData.data.target.type} với ID đã cho`,
      });
    }

    const donation = new Donation(validatedData.data);
    await donation.save();

    const populatedDonation = await Donation.findById(donation._id)
      .populate('donor', 'name email')
      .populate('target.id');

    res.status(201).json(populatedDonation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllDonations = async (req, res) => {
  try {
    const querySchema = z.object({
      page: z.string().regex(/^\d+$/).transform(Number).default('1'),
      limit: z.string().regex(/^\d+$/).transform(Number).default('10'),
      status: z.enum(DONATION_STATUS).optional(),
      targetType: z.enum(TARGET_TYPES).optional(),
      minAmount: z.string().regex(/^\d+$/).transform(Number).optional(),
      maxAmount: z.string().regex(/^\d+$/).transform(Number).optional(),
      sortBy: z.enum(['createdAt', 'amount']).default('createdAt'),
      sortOrder: z.enum(['asc', 'desc']).default('desc'),
    });

    const { page, limit, status, targetType, minAmount, maxAmount, sortBy, sortOrder } =
      querySchema.parse(req.query);

    const query = {};
    if (status) query.status = status;
    if (targetType) query['target.type'] = targetType;
    if (minAmount) query.amount = { $gte: minAmount };
    if (maxAmount) query.amount = { ...query.amount, $lte: maxAmount };

    const skip = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const [donations, total] = await Promise.all([
      Donation.find(query)
        .populate('donor', 'name email')
        .populate('target.id')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select('-__v'),
      Donation.countDocuments(query),
    ]);

    res.json({
      donations,
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

exports.getDonation = async (req, res) => {
  try {
    const { id } = z
      .object({
        id: objectIdSchema,
      })
      .parse({ id: req.params.id });

    const donation = await Donation.findById(id)
      .populate('donor', 'name email')
      .populate('target.id');

    if (!donation) {
      return res.status(404).json({ message: 'Không tìm thấy quyên góp' });
    }

    res.json(donation);
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

exports.updateDonation = async (req, res) => {
  try {
    // Validate ID
    const { id } = z
      .object({
        id: objectIdSchema,
      })
      .parse({ id: req.params.id });

    // Find existing donation
    const existingDonation = await Donation.findById(id);
    if (!existingDonation) {
      return res.status(404).json({ message: 'Không tìm thấy quyên góp' });
    }

    // Only allow updating certain fields based on current status
    const allowedUpdates = {
      pending: ['status', 'message', 'isAnonymous', 'transactionId'],
      completed: ['message', 'isAnonymous'],
      failed: ['status', 'message'],
    }[existingDonation.status];

    // Filter out non-allowed fields from request body
    const filteredBody = Object.keys(req.body).reduce((acc, key) => {
      if (allowedUpdates.includes(key)) {
        acc[key] = req.body[key];
      }
      return acc;
    }, {});

    // Validate filtered body
    const validatedData = await donationSchema
      .partial()
      .pick(allowedUpdates)
      .safeParseAsync(filteredBody);

    if (!validatedData.success) {
      return res.status(400).json({
        message: 'Validation error',
        errors: validatedData.error.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        })),
      });
    }

    const donation = await Donation.findByIdAndUpdate(
      id,
      { ...validatedData.data, updatedAt: Date.now() },
      { new: true, runValidators: true }
    )
      .populate('donor', 'name email')
      .populate('target.id');

    res.json(donation);
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
