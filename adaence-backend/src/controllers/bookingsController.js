const prisma = require('../prisma/client');

// 🔍 Récupérer toutes les réservations
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        visitor: true,
        senior: true,
        slot: true,
      },
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({
      error: 'Erreur récupération réservations',
      details: err.message,
    });
  }
};

// ➕ Créer une réservation
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

    console.log('📡 Données reçues du front:', req.body);

    // ⚠️ Validation des champs requis
    if (!visitorEmail || !slotId || !profileId) {
      return res.status(400).json({ error: 'Champs requis manquants' });
    }

    // 🔍 Vérifier si le créneau est déjà réservé
    const existingBooking = await prisma.booking.findUnique({
      where: { slotId },
    });

    if (existingBooking) {
      return res.status(400).json({ error: 'Ce créneau est déjà réservé.' });
    }

    // 👤 Vérifier ou créer l'utilisateur visiteur
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
          password: '', // à adapter si auth sociale
        },
      });
    }

    // 📅 Créer la réservation
    const booking = await prisma.booking.create({
      data: {
        visitorId: visitor.id,
        seniorId: profileId,
        slotId,
        message,
        status: 'PENDING',
      },
    });

    // ✅ Mettre à jour le créneau comme réservé
    await prisma.availableSlot.update({
      where: { id: slotId },
      data: { isBooked: true },
    });

    res.status(201).json(booking);
  } catch (err) {
    // 🎯 Erreur Prisma : doublon sur le slotId
    if (err.code === 'P2002' && err.meta?.target?.includes('slotId')) {
      return res.status(400).json({ error: 'Ce créneau est déjà réservé.' });
    }

    console.error('❌ Erreur création réservation:', err);
    res.status(500).json({
      error: 'Erreur création réservation',
      details: err.message,
    });
  }
};

// ✏️ Modifier une réservation
exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: req.body,
    });
    res.json(updatedBooking);
  } catch (err) {
    res.status(500).json({
      error: 'Erreur modification réservation',
      details: err.message,
    });
  }
};

// ❌ Supprimer une réservation
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // On récupère la réservation pour libérer le créneau
    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return res.status(404).json({ error: 'Réservation non trouvée' });
    }

    // Libérer le créneau
    await prisma.availableSlot.update({
      where: { id: booking.slotId },
      data: { isBooked: false },
    });

    // Supprimer la réservation
    await prisma.booking.delete({ where: { id } });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({
      error: 'Erreur suppression réservation',
      details: err.message,
    });
  }
};

