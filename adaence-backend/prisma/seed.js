// DATA TEST
const { PrismaClient } = require('../src/generated/prisma');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Démarrage du seed...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  // USERS (rôles VISITOR remplacés par bénévoles => ici on ne crée que SENIOR et VISITOR/ADMIN)
  const usersData = [
    // SENIORS
    {
      id: uuidv4(),
      email: 'robert.aine@paris.fr',
      password: hashedPassword,
      firstName: 'Robert',
      lastName: 'Dupont',
      phone: '+33123456789',
      role: 'SENIOR',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      email: 'marie.aine@martinique.fr',
      password: hashedPassword,
      firstName: 'Marie',
      lastName: 'Petit',
      phone: '+596696969696',
      role: 'SENIOR',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      email: 'jean.aine@reunion.fr',
      password: hashedPassword,
      firstName: 'Jean',
      lastName: 'Morel',
      phone: '+262696969696',
      role: 'SENIOR',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // ADMIN
    {
      id: uuidv4(),
      email: 'admin@adaence.fr',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'Adaence',
      phone: '+33100000000',
      role: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // BÉNÉVOLES (en tant qu'utilisateurs VISITOR dans la table users)
    {
      id: uuidv4(),
      email: 'marie.benevole@guadeloupe.fr',
      password: hashedPassword,
      firstName: 'Marie',
      lastName: 'Lemoine',
      phone: '+590690123456',
      role: 'VISITOR',  // on garde VISITOR, car bénévole est géré dans volunteer_applications
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      email: 'sophie.benevole@mayotte.fr',
      password: hashedPassword,
      firstName: 'Sophie',
      lastName: 'Ali',
      phone: '+262639123456',
      role: 'VISITOR',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      email: 'lucas.martin@paris.fr',
      password: hashedPassword,
      firstName: 'Lucas',
      lastName: 'Martin',
      phone: '+33101567890',
      role: 'VISITOR',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Insertion des utilisateurs
  for (const user of usersData) {
    await prisma.users.create({ data: user });
  }

  // PROFILS SENIORS
  const seniorProfilesData = [
    {
      id: uuidv4(),
      userId: usersData.find(u => u.email === 'robert.aine@paris.fr').id,
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
      userId: usersData.find(u => u.email === 'marie.aine@martinique.fr').id,
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
      userId: usersData.find(u => u.email === 'jean.aine@reunion.fr').id,
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
    await prisma.senior_profiles.create({ data: profile });
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
    await prisma.activities.create({ data: activity });
  }

  // AVAILABLE SLOTS (créneaux seniors disponibles pour activités)
  const availableSlotsData = [
    {
      id: uuidv4(),
      seniorId: seniorProfilesData[0].id,
      date: new Date('2025-07-10'),
      startTime: '09:00',
      endTime: '11:00',
      activity: 'Café et discussion',
      isBooked: false,
      createdAt: new Date(),
    },
    {
      id: uuidv4(),
      seniorId: seniorProfilesData[1].id,
      date: new Date('2025-07-11'),
      startTime: '14:00',
      endTime: '16:00',
      activity: 'Promenade au parc',
      isBooked: false,
      createdAt: new Date(),
    },
    {
      id: uuidv4(),
      seniorId: seniorProfilesData[2].id,
      date: new Date('2025-07-12'),
      startTime: '10:00',
      endTime: '12:00',
      activity: 'Atelier cuisine',
      isBooked: false,
      createdAt: new Date(),
    },
  ];

  for (const slot of availableSlotsData) {
    await prisma.available_slots.create({ data: slot });
  }

  // BOOKINGS (réservations par bénévoles — visitorId = bénévole, seniorId, slotId)
  const bookingsData = [
    {
      id: uuidv4(),
      visitorId: usersData.find(u => u.email === 'marie.benevole@guadeloupe.fr').id,
      seniorId: seniorProfilesData[0].id,
      slotId: availableSlotsData[0].id,
      message: 'Hâte de partager un moment convivial !',
      status: 'CONFIRMED',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      visitorId: usersData.find(u => u.email === 'sophie.benevole@mayotte.fr').id,
      seniorId: seniorProfilesData[1].id,
      slotId: availableSlotsData[1].id,
      message: 'Promenade au parc, ça va être top !',
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  for (const booking of bookingsData) {
    await prisma.bookings.create({ data: booking });
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
    await prisma.volunteer_applications.create({ data: app });
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

