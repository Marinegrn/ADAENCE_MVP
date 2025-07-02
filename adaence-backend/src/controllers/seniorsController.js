const prisma = require('../prisma/client');

exports.createSeniorProfile = async (req, res) => {
  try {
    const senior = await prisma.seniorProfile.create({
      data: req.body,
    });

    res.status(201).json(senior);
  } catch (err) {
    res.status(500).json({ error: 'Erreur création profil senior', details: err.message });
  }
};
