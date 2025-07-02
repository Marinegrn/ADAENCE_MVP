const prisma = require('../prisma/client');

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        visitor: true,
        senior: true,
        slot: true
      }
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Erreur récupération réservations', details: err.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { visitorId, seniorId, slotId, message, status } = req.body;

    const booking = await prisma.booking.create({
      data: {
        visitorId,
        seniorId,
        slotId,
        message,
        status
      }
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Erreur création réservation', details: err.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: req.body,
    });
    res.json(updatedBooking);
  } catch (err) {
    res.status(500).json({ error: 'Erreur modification réservation', details: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.booking.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erreur suppression réservation', details: err.message });
  }
};

