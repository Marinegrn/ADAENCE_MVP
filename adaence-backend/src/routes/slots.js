const express = require('express');
const router = express.Router();
const {
  getAllSlots,
  createSlot,
  updateSlot,
  deleteSlot,
} = require('../controllers/slotsController');

router.get('/', getAllSlots);
router.post('/', createSlot);
router.put('/:id', updateSlot);
router.patch('/:id', updateSlot);
router.delete('/:id', deleteSlot);

module.exports = router;

