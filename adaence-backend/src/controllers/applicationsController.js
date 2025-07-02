const prisma = require('../prisma/client');

exports.createApplication = async (req, res) => {
  try {
    const application = await prisma.volunteerApplication.create({
      data: req.body,
    });

    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ error: 'Erreur création candidature', details: err.message });
  }
};
