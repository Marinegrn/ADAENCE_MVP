const express = require('express');
const router = express.Router();
const {
  getAllActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} = require('../controllers/activitiesController');

router.get('/', getAllActivities);
router.post('/', createActivity);
router.put('/:id', updateActivity); // mise à jour complète
router.patch('/:id', updateActivity); // mise à jour partielle (optionnel)
router.delete('/:id', deleteActivity);

module.exports = router;

