const express = require('express');
const router = express.Router();
const {
  getAllApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} = require('../controllers/applicationsController');

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

router.put('/:id', updateApplication);
router.patch('/:id', updateApplication);
router.delete('/:id', deleteApplication);

module.exports = router;

