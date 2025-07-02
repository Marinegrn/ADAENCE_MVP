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

