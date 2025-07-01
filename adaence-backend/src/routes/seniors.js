const express = require('express');
const prisma = require('../prisma/client');

const router = express.Router();

router.get('/', async (req, res) => {
  const seniors = await prisma.seniorProfile.findMany({
    include: { user: true },
  });
  res.json(seniors);
});

router.post('/', async (req, res) => {
  const data = req.body;
  const newSenior = await prisma.seniorProfile.create({ data });
  res.status(201).json(newSenior);
});

module.exports = router;
