const prisma = require('../prisma/client');
const bcrypt = require('bcryptjs');

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
