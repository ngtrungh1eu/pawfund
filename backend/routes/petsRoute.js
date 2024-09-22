const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const { authMiddleware, roleCheck } = require('../middlewares/auth');

router.get('/', petController.getAllPets);
router.post('/', authMiddleware, roleCheck(['shelter_staff', 'admin']), petController.createPet);
// Thêm các routes khác

module.exports = router;