const express = require('express');
const prisma = require('../prisma/client');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.post('/', async (req, res) => {
  const data = req.body;
  const newUser = await prisma.user.create({ data });
  res.status(201).json(newUser);
});

module.exports = router;
