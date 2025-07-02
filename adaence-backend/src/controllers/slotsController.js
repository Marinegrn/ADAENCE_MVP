const prisma = require('../prisma/client');

exports.createSlot = async (req, res) => {
  try {
    const slot = await prisma.availableSlot.create({
      data: req.body,
    });

    res.status(201).json(slot);
  } catch (err) {
    res.status(500).json({ error: 'Erreur création créneau', details: err.message });
  }
};
