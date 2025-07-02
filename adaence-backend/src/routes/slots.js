const express = require('express');
const router = express.Router();
const { createSlot, getAllSlots } = require('../controllers/slotsController');

router.get('/', getAllSlots);
router.post('/', createSlot);

module.exports = router;
