const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/', bookingController.create); 
router.get('/', bookingController.getAll);
router.get('/active-bookings', bookingController.getActiveBookings);

module.exports = router;