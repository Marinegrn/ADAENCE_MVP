const express = require('express');
const prisma = require('../prisma/client');

const router = express.Router();

router.get('/', async (req, res) => {
  const bookings = await prisma.booking.findMany({
    include: {
      visitor: true,
      senior: true,
      slot: true,
    },
  });
  res.json(bookings);
});

router.post('/', async (req, res) => {
  const data = req.body;
  const newBooking = await prisma.booking.create({ data });
  res.status(201).json(newBooking);
});

module.exports = router;
