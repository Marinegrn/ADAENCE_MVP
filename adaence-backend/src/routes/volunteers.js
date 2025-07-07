const express = require('express');
const router = express.Router();
const {
  getAllVolunteers,
  createVolunteer,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer
} = require('../controllers/volunteersController');

router.get('/', getAllVolunteers);
router.post('/', createVolunteer);
router.get('/:id', getVolunteerById);
router.put('/:id', updateVolunteer);
router.delete('/:id', deleteVolunteer);

module.exports = router;
