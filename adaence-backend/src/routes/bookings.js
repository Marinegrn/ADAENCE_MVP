const express = require('express');
const prisma = require('../prisma/client');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { visitor: true, senior: true, slot: true },
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Erreur récupération des réservations' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { visitorId, seniorId, slotId, message, status } = req.body;

    if (!visitorId || !seniorId || !slotId) {
      return res.status(400).json({ error: 'Champs requis manquants' });
    }

    const newBooking = await prisma.booking.create({
      data: {
        visitorId,
        seniorId,
        slotId,
        message,
        status: status || 'PENDING',
      },
    });

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: 'Erreur création réservation' });
  }
});

module.exports = router;

