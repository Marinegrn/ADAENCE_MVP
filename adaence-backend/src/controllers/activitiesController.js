const prisma = require('../prisma/client');

exports.getAllActivities = async (req, res) => {
  const activities = await prisma.activity.findMany();
  res.json(activities);
};

exports.createActivity = async (req, res) => {
  try {
    const data = req.body;
    const newActivity = await prisma.activity.create({ data });
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(500).json({ error: 'Erreur création activité', details: err.message });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedActivity = await prisma.activity.update({
      where: { id },
      data: req.body,
    });
    res.json(updatedActivity);
  } catch (err) {
    res.status(500).json({ error: 'Erreur modification activité', details: err.message });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.activity.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erreur suppression activité', details: err.message });
  }
};


