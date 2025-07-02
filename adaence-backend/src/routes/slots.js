const express = require('express');
const prisma = require('../prisma/client');

const router = express.Router();

router.get('/', async (req, res) => {
  const slots = await prisma.availableSlot.findMany({
    include: { senior: true },
  });
  res.json(slots);
});

router.post('/', async (req, res) => {
  try {
    const { seniorId, date, startTime, endTime, activity } = req.body;

    if (!seniorId || !date || !startTime || !endTime || !activity) {
      return res.status(400).json({ error: 'Champs requis manquants' });
    }

    const newSlot = await prisma.availableSlot.create({
      data: {
        seniorId,
        date: new Date(date),
        startTime,
        endTime,
        activity,
      },
    });

    res.status(201).json(newSlot);
  } catch (error) {
    res.status(500).json({ error: 'Erreur création créneau' });
  }
});


module.exports = router;
