const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllVolunteers(req, res) {
  try {
    const volunteers = await prisma.volunteer.findMany({
      include: { user: true }, // inclure données user liées
    });
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// CRUD
async function createVolunteer(req, res) {
  const { userId, age, bio, location, availability, competences } = req.body;
  try {
    const newVolunteer = await prisma.volunteer.create({
      data: {
        userId,
        age,
        bio,
        location,
        availability,
        competences,
      },
    });
    res.status(201).json(newVolunteer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getVolunteerById(req, res) {
    const { id } = req.params;
    try {
        const volunteer = await prisma.volunteer.findUnique({
            where: { id: Number(id) },
            include: { user: true },
        });
        if (!volunteer) {
            return res.status(404).json({ error: 'Volunteer not found' });
        }
        res.json(volunteer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateVolunteer(req, res) {
    const { id } = req.params;
    const { age, bio, location, availability, competences } = req.body;
    try {
        const updatedVolunteer = await prisma.volunteer.update({
            where: { id: Number(id) },
            data: { age, bio, location, availability, competences },
        });
        res.json(updatedVolunteer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteVolunteer(req, res) {
    const { id } = req.params;
    try {
        await prisma.volunteer.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
  getAllVolunteers,
  createVolunteer,
  updateVolunteer,
  deleteVolunteer,
  getVolunteerById,
};
