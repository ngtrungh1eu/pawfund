const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/:userId', userController.getUserById);
router.get('/', userController.getAllUsers);

module.exports = router;
