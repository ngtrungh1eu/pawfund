const express = require('express');
const router = express.Router();
const shelterController = require('../controllers/shelterController');
const { authMiddleware, roleCheck } = require('../middlewares/auth');

router.post('/', authMiddleware, roleCheck(['admin']), shelterController.createShelter);
router.get('/', shelterController.getAllShelters);
router.get('/:id', shelterController.getShelter);
router.put('/:id', authMiddleware, roleCheck(['shelter_staff', 'admin']), shelterController.updateShelter);
router.delete('/:id', authMiddleware, roleCheck(['admin']), shelterController.deleteShelter);

module.exports = router;