const prisma = require('../prisma/client');

exports.getAllSlots = async (req, res) => {
  const slots = await prisma.availableSlot.findMany({
    include: { senior: true },
  });
  res.json(slots);
};

exports.createSlot = async (req, res) => {
  try {
    const data = req.body;
    const newSlot = await prisma.availableSlot.create({ data });
    res.status(201).json(newSlot);
  } catch (err) {
    res.status(500).json({ error: 'Erreur création créneau', details: err.message });
  }
};

