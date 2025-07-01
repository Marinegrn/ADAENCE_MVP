// DATA TEST
const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

async function main() {
  console.log('🚀 Démarrage du seed...');

  const usersData = [
    {
      id: uuidv4(),
      email: 'robert.aine@paris.fr',
      password: 'password123',
      firstName: 'Robert',
      lastName: 'Ainé',
      phone: '+33123456789',
      role: 'SENIOR',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      email: 'marie.aine@martinique.fr',
      password: 'password123',
      firstName: 'Marie',
      lastName: 'Ainé',
      phone: '+59698765432',
      role: 'SENIOR',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      email: 'jean.aine@reunion.fr',
      password: 'password123',
      firstName: 'Jean',
      lastName: 'Ainé',
      phone: '+26212345678',
      role: 'SENIOR',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      email: 'marie.benevole@guadeloupe.fr',
      password: 'password123',
      firstName: 'Marie',
      lastName: 'Bénévole',
      phone: '+590690123456',
      role: 'VISITOR',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      email: 'sophie.benevole@mayotte.fr',
      password: 'password123',
      firstName: 'Sophie',
      lastName: 'Bénévole',
      phone: '+26263987654',
      role: 'VISITOR',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Hash des mots de passe et insertion des users
  for (const user of usersData) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  // Récupère à nouveau tous les users pour récupérer leurs IDs (au cas où)
  const users = await prisma.user.findMany();

  // Construire un helper pour retrouver un user par email
  function getUserIdByEmail(email) {
    const user = users.find(u => u.email === email);
    if (!user) throw new Error(`Utilisateur introuvable avec l'email: ${email}`);
    return user.id;
  }

  // PROFILS SENIORS
  const seniorProfilesData = [
    {
      id: uuidv4(),
      userId: getUserIdByEmail('robert.aine@paris.fr'),
      age: 78,
      bio: "Ancien professeur d'histoire passionné par la culture et la lecture.",
      location: "Paris, Île-de-France",
      photo: null,
      activities: ['Histoire', 'Lecture', 'Musique classique', 'Échecs'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      userId: getUserIdByEmail('marie.aine@martinique.fr'),
      age: 82,
      bio: "Aime la musique créole et les promenades en bord de mer.",
      location: "Fort-de-France, Martinique",
      photo: null,
      activities: ['Musique', 'Cuisine', 'Nature'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      userId: getUserIdByEmail('jean.aine@reunion.fr'),
      age: 75,
      bio: "Ancien ingénieur, passionné de jardinage et randonnée.",
      location: "Saint-Denis, La Réunion",
      photo: null,
      activities: ['Jardinage', 'Randonnée', 'Photographie'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  for (const profile of seniorProfilesData) {
    await prisma.seniorProfile.create({ data: profile });
  }

  // ACTIVITIES
  const activitiesData = [
    {
      id: uuidv4(),
      name: 'Café et discussion',
      description: 'Moment convivial autour d’un café pour échanger.',
      icon: '☕️',
      createdAt: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Promenade au parc',
      description: 'Balade relaxante dans un parc du quartier.',
      icon: '🌳',
      createdAt: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Atelier cuisine',
      description: 'Découverte de recettes traditionnelles françaises et ultramarines.',
      icon: '🍳',
      createdAt: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Jeux de société',
      description: 'Partie de jeux pour s’amuser ensemble.',
      icon: '🎲',
      createdAt: new Date(),
    },
  ];

  for (const activity of activitiesData) {
    await prisma.activity.create({ data: activity });
  }

  // Récupérer les profils seniors et activités insérés
  const seniors = await prisma.seniorProfile.findMany();
  const activities = await prisma.activity.findMany();

  // AVAILABLE SLOTS (créneaux seniors disponibles pour activités)
  const availableSlotsData = [
    {
      id: uuidv4(),
      seniorId: seniors.find(s => s.userId === getUserIdByEmail('robert.aine@paris.fr')).id,
      date: new Date('2025-07-10'),
      startTime: '09:00',
      endTime: '11:00',
      activity: 'Café et discussion',
      isBooked: false,
      createdAt: new Date(),
    },
    {
      id: uuidv4(),
      seniorId: seniors.find(s => s.userId === getUserIdByEmail('marie.aine@martinique.fr')).id,
      date: new Date('2025-07-11'),
      startTime: '14:00',
      endTime: '16:00',
      activity: 'Promenade au parc',
      isBooked: false,
      createdAt: new Date(),
    },
    {
      id: uuidv4(),
      seniorId: seniors.find(s => s.userId === getUserIdByEmail('jean.aine@reunion.fr')).id,
      date: new Date('2025-07-12'),
      startTime: '10:00',
      endTime: '12:00',
      activity: 'Atelier cuisine',
      isBooked: false,
      createdAt: new Date(),
    },
  ];

  for (const slot of availableSlotsData) {
    await prisma.availableSlot.create({ data: slot });
  }

  // Récupérer les créneaux disponibles
  const slots = await prisma.availableSlot.findMany();

  // BOOKINGS (réservations par bénévoles — visitorId = bénévole, seniorId, slotId)
  const bookingsData = [
    {
      id: uuidv4(),
      visitorId: getUserIdByEmail('marie.benevole@guadeloupe.fr'),
      seniorId: seniors.find(s => s.userId === getUserIdByEmail('robert.aine@paris.fr')).id,
      slotId: slots[0].id,
      message: 'Hâte de partager un moment convivial !',
      status: 'CONFIRMED',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      visitorId: getUserIdByEmail('sophie.benevole@mayotte.fr'),
      seniorId: seniors.find(s => s.userId === getUserIdByEmail('marie.aine@martinique.fr')).id,
      slotId: slots[1].id,
      message: 'Promenade au parc, ça va être top !',
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  for (const booking of bookingsData) {
    await prisma.booking.create({ data: booking });
  }

  // VOLUNTEER APPLICATIONS (candidatures bénévoles - séparées des users)
  const volunteerApplicationsData = [
    {
      id: uuidv4(),
      firstName: 'Marie',
      lastName: 'Lemoine',
      email: 'marie.benevole@guadeloupe.fr',
      phone: '+590690123456',
      age: 28,
      location: 'Pointe-à-Pitre, Guadeloupe',
      motivation: "J'aime aider les personnes âgées et partager des moments conviviaux.",
      availability: 'Week-ends et soirées',
      experience: '2 ans en maison de retraite',
      status: 'APPROVED',
      createdAt: new Date(),
    },
    {
      id: uuidv4(),
      firstName: 'Lucas',
      lastName: 'Martin',
      email: 'lucas.martin@paris.fr',
      phone: '+33101567890',
      age: 26,
      location: 'Paris, Île-de-France',
      motivation: "Je souhaite m'engager dans des activités de solidarité locale.",
      availability: 'Mercredis après-midi',
      experience: 'Bénévole dans une association locale',
      status: 'PENDING',
      createdAt: new Date(),
    },
  ];

  for (const app of volunteerApplicationsData) {
    await prisma.volunteerApplication.create({ data: app });
  }

  console.log('✅ Seed terminé avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur durant le seed :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

