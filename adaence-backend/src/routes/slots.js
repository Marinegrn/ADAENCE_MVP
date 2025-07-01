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
  const data = req.body;
  const newSlot = await prisma.availableSlot.create({ data });
  res.status(201).json(newSlot);
});

module.exports = router;
