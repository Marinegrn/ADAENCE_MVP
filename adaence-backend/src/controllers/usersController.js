const prisma = require('../prisma/client');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

exports.createUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        role,
      },
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erreur création utilisateur', details: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, ...rest } = req.body;

    let updateData = { ...rest };
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updateData.password = hashed;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Erreur modification utilisateur', details: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erreur suppression utilisateur', details: err.message });
  }
};

