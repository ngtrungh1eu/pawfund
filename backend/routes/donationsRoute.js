const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const { authMiddleware, roleCheck } = require('../middlewares/auth');

router.post('/', authMiddleware, donationController.createDonation);
router.get('/', authMiddleware, roleCheck(['admin']), donationController.getAllDonations);
router.get('/:id', authMiddleware, donationController.getDonation);
router.put('/:id', authMiddleware, roleCheck(['admin']), donationController.updateDonation);

module.exports = router;