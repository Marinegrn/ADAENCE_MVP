const prisma = require('../prisma/client');

exports.createActivity = async (req, res) => {
  try {
    const activity = await prisma.activity.create({
      data: req.body,
    });

    res.status(201).json(activity);
  } catch (err) {
    res.status(500).json({ error: 'Erreur création activité', details: err.message });
  }
};
