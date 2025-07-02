const express = require('express');
const router = express.Router();
const {
  getAllSeniors,
  createSenior,
  updateSenior,
  deleteSenior,
} = require('../controllers/seniorsController');

router.get('/', getAllSeniors);
router.post('/', createSenior);
router.put('/:id', updateSenior);
router.patch('/:id', updateSenior);
router.delete('/:id', deleteSenior);

module.exports = router;

