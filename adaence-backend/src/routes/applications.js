const express = require('express');
const router = express.Router();
const { createApplication, getAllApplications } = require('../controllers/applicationsController');
const volunteerApplicationValidation = require('../validations/volunteerApplicationValidation');
const { validationResult } = require('express-validator');

router.get('/', getAllApplications);

router.post('/', volunteerApplicationValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  return createApplication(req, res);
});

module.exports = router;

