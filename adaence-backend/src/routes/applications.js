const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const volunteerApplicationValidation = require('../validations/volunteerApplicationValidation');
const { validationResult } = require('express-validator')

// GET
router.get('/', async (req, res) => {
  const applications = await prisma.volunteerApplication.findMany();
  res.json(applications);
});

// POST
router.post(
  '/',
  volunteerApplicationValidation,
  async (req, res) => {
    // Vérifie les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        age,
        location,
        motivation,
        availability,
        experience,
      } = req.body;

      const newApplication = await prisma.volunteerApplication.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          age: age ? Number(age) : null,
          location,
          motivation,
          availability,
          experience,
        },
      });

      return res.status(201).json(newApplication);
    } catch (error) {
      console.error('Error creating volunteer application:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

module.exports = router;
