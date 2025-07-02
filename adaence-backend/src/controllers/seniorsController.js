const prisma = require('../prisma/client');

exports.getAllSeniors = async (req, res) => {
  const seniors = await prisma.seniorProfile.findMany({
    include: { user: true },
  });
  res.json(seniors);
};

exports.createSenior = async (req, res) => {
  try {
    const { userId, age, bio, location, activities, photo } = req.body;

        if (!userId || !age || !bio || !location) {
      return res.status(400).json({ error: 'Certains champs obligatoires sont manquants' });
    }

    const newSenior = await prisma.seniorProfile.create({ 
      data: {
        userId,
        age: Number(age),
        bio,
        location,
        activities,
        photo,
      } 
    });
    
    res.status(201).json(newSenior);
  } catch (err) {
    res.status(500).json({ error: 'Erreur création senior', details: err.message });
  }
};

