const express = require('express');
const prisma = require('../prisma/client');

const router = express.Router();

router.get('/', async (req, res) => {
  const activities = await prisma.activity.findMany();
  res.json(activities);
});

router.post('/', async (req, res) => {
  try {
    const { name, description, icon } = req.body;

    if (!name || !description || !icon) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    const newActivity = await prisma.activity.create({
      data: { name, description, icon },
    });

    res.status(201).json(newActivity);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
