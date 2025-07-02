const express = require('express');
const router = express.Router();
const { createSenior, getAllSeniors } = require('../controllers/seniorsController');

router.get('/', getAllSeniors);
router.post('/', createSenior);

module.exports = router;

