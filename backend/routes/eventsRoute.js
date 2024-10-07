const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authMiddleware, roleCheck } = require('../middlewares/auth');

router.post('/', authMiddleware, roleCheck(['shelter_staff', 'admin']), eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEvent);
router.put('/:id', authMiddleware, roleCheck(['shelter_staff', 'admin']), eventController.updateEvent);
router.delete('/:id', authMiddleware, roleCheck(['shelter_staff', 'admin']), eventController.deleteEvent);

module.exports = router;