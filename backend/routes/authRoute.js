const express = require('express');
const router = express.Router();
const userController = require('../controllers/authController');
const { authMiddleware, roleCheck } = require('../middlewares/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);

module.exports = router;