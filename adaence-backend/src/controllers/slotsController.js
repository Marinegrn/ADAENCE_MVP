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

exports.updateSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSlot = await prisma.availableSlot.update({
      where: { id },
      data: req.body,
    });
    res.json(updatedSlot);
  } catch (err) {
    res.status(500).json({ error: 'Erreur modification créneau', details: err.message });
  }
};

exports.deleteSlot = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.availableSlot.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erreur suppression créneau', details: err.message });
  }
};


