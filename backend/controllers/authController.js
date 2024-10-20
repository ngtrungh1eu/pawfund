const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Hàm tạo refreshToken
const generateRefreshToken = () => {
    return crypto.randomBytes(40).toString('hex');
};

// Hàm tạo accessToken
const generateAccessToken = (userId, role) => {
    return jwt.sign({ userId, role }, process.env.JWT_ACCESS_TOKEN, {
        expiresIn: '1h',
    });
};

// Register
exports.register = async (req, res) => {
    try {
        const {
            email,
            username,
            password,
            firstName,
            lastName,
            phoneNumber,
            address,
            role = 'customer',
        } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: 'Email or username already exists' });
        }

        // Tạo user mới
        const newUser = new User({
            email,
            username,
            password,
            firstName,
            lastName,
            phoneNumber,
            address,
            role,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            message: 'Error registering user',
            error: error.message,
        });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const accessToken = generateAccessToken(user._id, user.role);
        const refreshToken = generateRefreshToken();

        // Lưu refreshToken vào database
        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({
            success: true,
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({
            message: 'Error logging in',
            error: error.message,
        });
    }
};

// Logout and delete refreshToken
exports.logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        await User.findOneAndUpdate(
            { refreshToken },
            { $unset: { refreshToken: 1 } }
        );

        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            message: 'Error logging out',
            error: error.message,
        });
    }
};

// Refresh token
exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    try {
        const user = await User.findOne({ refreshToken });

        if (!user) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        // Tạo accessToken mới
        const accessToken = generateAccessToken(user._id, user.role);

        res.json({ accessToken });
    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(500).json({
            message: 'Error refreshing token',
            error: error.message,
        });
    }
};

// Get profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update profile
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.userId, req.body, {
            new: true,
            runValidators: true,
        }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
