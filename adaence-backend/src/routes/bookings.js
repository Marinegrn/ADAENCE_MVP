const express = require('express');
const router = express.Router();

const { getAllBookings, createBooking } = require('../controllers/bookingsController');

router.get('/', getAllBookings);
router.post('/', createBooking);

module.exports = router;


