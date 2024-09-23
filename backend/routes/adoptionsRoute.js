const express = require('express');
const router = express.Router();
const adoptionController = require('../controllers/adoptionController');
const { authMiddleware, roleCheck } = require('../middlewares/auth');

router.post('/', authMiddleware, roleCheck(['adopter']), adoptionController.createAdoption);
router.get('/', authMiddleware, roleCheck(['shelter_staff', 'admin']), adoptionController.getAllAdoptions);
router.get('/:id', authMiddleware, adoptionController.getAdoption);
router.put('/:id', authMiddleware, roleCheck(['shelter_staff', 'admin']), adoptionController.updateAdoption);

module.exports = router;
