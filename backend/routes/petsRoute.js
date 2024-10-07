const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const { authMiddleware, roleCheck } = require('../middlewares/auth');

router.post('/', authMiddleware, roleCheck(['shelter_staff', 'admin']), petController.createPet);
router.get('/', petController.getAllPets);
router.get('/:id', petController.getPet);
router.put('/:id', authMiddleware, roleCheck(['shelter_staff', 'admin']), petController.updatePet);
router.delete('/:id', authMiddleware, roleCheck(['shelter_staff', 'admin']), petController.deletePet);

module.exports = router;