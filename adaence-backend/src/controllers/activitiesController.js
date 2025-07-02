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

