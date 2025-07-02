const prisma = require('../prisma/client');

exports.createBooking = async (req, res) => {
  try {
    const booking = await prisma.booking.create({
      data: req.body,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Erreur création réservation', details: err.message });
  }
};
