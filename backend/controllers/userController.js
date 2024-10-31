const User = require('../models/User');

// Lấy thông tin tất cả người dùng
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password -refreshToken');
        res.status(200).json({
            message: 'Users retrieved successfully',
            users,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Lấy thông tin một người dùng
exports.getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select(
            '-password -refreshToken'
        );
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User retrieved successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};
