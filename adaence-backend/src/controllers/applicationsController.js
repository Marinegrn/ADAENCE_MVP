const prisma = require('../prisma/client');

exports.getAllApplications = async (req, res) => {
  const applications = await prisma.volunteerApplication.findMany();
  res.json(applications);
};

exports.createApplication = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      age,
      location,
      motivation,
      availability,
      experience,
    } = req.body;

    const newApplication = await prisma.volunteerApplication.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        age: age ? Number(age) : null,
        location,
        motivation,
        availability,
        experience,
      },
    });

    res.status(201).json(newApplication);
  } catch (err) {
    res.status(500).json({ error: 'Erreur création candidature', details: err.message });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedApp = await prisma.volunteerApplication.update({
      where: { id },
      data: req.body,
    });
    res.json(updatedApp);
  } catch (err) {
    res.status(500).json({ error: 'Erreur modification candidature', details: err.message });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.volunteerApplication.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erreur suppression candidature', details: err.message });
  }
};


