const prisma = require('../prisma/client');

exports.getAllSeniors = async (req, res) => {
  const seniors = await prisma.seniorProfile.findMany({
    include: { 
      user: true, 
      activities: true, // fondamental pour afficher les activités en front
    },
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

exports.updateSenior = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSenior = await prisma.seniorProfile.update({
      where: { id },
      data: req.body,
    });
    res.json(updatedSenior);
  } catch (err) {
    res.status(500).json({ error: 'Erreur modification senior', details: err.message });
  }
};

exports.deleteSenior = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.seniorProfile.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erreur suppression senior', details: err.message });
  }
};


