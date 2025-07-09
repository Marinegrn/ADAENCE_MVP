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
    const {
      visitorEmail,
      volunteerName,
      volunteerPhone,
      message,
      slotId,
      profileId, // seniorId
    } = req.body;

    // Validation minimale
    if (!visitorEmail || !slotId || !profileId) {
      return res.status(400).json({ error: 'Champs requis manquants' }); // 🔧
    }

    // Trouver ou créer un User (VISITOR)
    let visitor = await prisma.user.findUnique({
      where: { email: visitorEmail },
    });

    if (!visitor) {
      visitor = await prisma.user.create({
        data: {
          email: visitorEmail,
          firstName: volunteerName,
          lastName: '',
          phone: volunteerPhone || null,
          role: 'VISITOR',
          password: '', // A adapter si auth sociale
        },
      });
    }

    const booking = await prisma.booking.create({
      data: {
        visitorId: visitor.id,
        seniorId: profileId,
        slotId,
        message,
        status: 'PENDING', // 🔧 BookingStatus enum
      },
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error('Erreur création réservation:', err);
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

