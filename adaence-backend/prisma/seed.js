const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

async function main() {
  console.log('🚀 Démarrage du seed...');

  // Nettoyage complet des données TEST
  await prisma.booking.deleteMany();
  await prisma.availableSlot.deleteMany();
  await prisma.seniorProfile.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.volunteerApplication.deleteMany();
  await prisma.volunteer.deleteMany();
  await prisma.user.deleteMany();

  // USERS
  const usersData = [
    { id: uuidv4(), email: 'robert.aine@paris.fr', password: 'password123', firstName: 'Robert', lastName: 'Moreau-Berthier', phone: '+33123456789', role: 'SENIOR', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), email: 'marielle.aine@martinique.fr', password: 'password123', firstName: 'Marielle', lastName: 'Kaloani', phone: '+59698765432', role: 'SENIOR', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), email: 'jean.aine@reunion.fr', password: 'password123', firstName: 'Jean', lastName: 'Bachirou', phone: '+26212345678', role: 'SENIOR', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), email: 'marie.benevole@guadeloupe.fr', password: 'password123', firstName: 'Marie', lastName: 'Bénévole', phone: '+590690123456', role: 'VISITOR', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), email: 'sophie.benevole@mayotte.fr', password: 'password123', firstName: 'Sophie', lastName: 'Bénévole', phone: '+26263987654', role: 'VISITOR', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), email: 'colette.aine@toulouse.fr', password: 'password123', firstName: 'Colette', lastName: 'Chambret', phone: '+33561616161', role: 'SENIOR', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), email: 'lucien.aine@ajaccio.fr', password: 'password123', firstName: 'Lucien', lastName: 'Santarelli', phone: '+33495556677', role: 'SENIOR', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), email: 'emma.benevole@montpellier.fr', password: 'password123', firstName: 'Emma', lastName: 'Bénévole', phone: '+33467889900', role: 'VISITOR', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), email: 'yanis.benevole@nancy.fr', password: 'password123', firstName: 'Yanis', lastName: 'Bénévole', phone: '+33383445566', role: 'VISITOR', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), email: 'claire.benevole@saintmartin.fr', password: 'password123', firstName: 'Claire', lastName: 'Bénévole', phone: '+590590123456', role: 'VISITOR', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), email: 'jacques.aine@brest.fr', password: 'password123', firstName: 'Jacques', lastName: 'Verneuil', phone: '+33298765432', role: 'SENIOR', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), email: 'aline.aine@guyane.fr', password: 'password123', firstName: 'Aline', lastName: 'Saminadin', phone: '+33412345678', role: 'SENIOR', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), email: 'gerard.benevole@bordeaux.fr', password: 'password123', firstName: 'Gérard', lastName: 'Bénévole', phone: '+33512345678', role: 'VISITOR', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), email: 'malcolm.aine@saintmartin.fr', password: 'password123', firstName: 'Malcolm', lastName: 'Georges dit Belmont', phone: '+33462599750', role: 'SENIOR', createdAt: new Date(), updatedAt: new Date() },
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

  // Récupérer tous les users pour avoir les IDs
  const users = await prisma.user.findMany();

  // Helper pour retrouver un user par email
  function getUserIdByEmail(email) {
    const user = users.find(u => u.email === email);
    if (!user) throw new Error(`Utilisateur introuvable avec l'email: ${email}`);
    return user.id;
  }

  // VOLUNTEERS
  const volunteersData = [
    {
      id: uuidv4(),
      userId: getUserIdByEmail('marie.benevole@guadeloupe.fr'),
      age: 34,
      bio: "Enthousiaste, j’aime aider et apprendre de nouvelles choses.",
      location: "Pointe-à-Pitre, Guadeloupe",
      availability: "Soirs et week-ends",
      competences: ['Cuisine', 'Lecture', 'Écoute'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      userId: getUserIdByEmail('sophie.benevole@mayotte.fr'),
      age: 29,
      bio: "Disponible les weekends, passionnée de culture antillaise.",
      location: "Mamoudzou, Mayotte",
      availability: "Week-ends uniquement",
      competences: ['Accompagnement', 'Discussions', 'Musique'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      userId: getUserIdByEmail('emma.benevole@montpellier.fr'),
      age: 22,
      bio: "Étudiante en médecine, j’aime discuter avec les aînés.",
      location: "Montpellier, Occitanie",
      availability: "Tous les après-midis",
      competences: ['Soins', 'Écoute', 'Organisation'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  for (const volunteer of volunteersData) {
    await prisma.volunteer.create({ data: volunteer });
  }

  // SENIOR PROFILES
  const seniorProfilesData = [
    {
      id: uuidv4(),
      userId: getUserIdByEmail('robert.aine@paris.fr'),
      age: 78,
      bio: "Ancien professeur d'histoire passionné par la culture et la lecture.",
      location: "Paris, Île-de-France",
      photo: "robert.jpg",
      activities: ['Histoire', 'Lecture', 'Musique classique', 'Échecs'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      userId: getUserIdByEmail('marielle.aine@martinique.fr'),
      age: 82,
      bio: "Aime la musique créole et les promenades en bord de mer.",
      location: "Fort-de-France, Martinique",
      photo: "marielle.jpg",
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
      photo: "jean.jpg",
      activities: ['Jardinage', 'Randonnée', 'Photographie'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      userId: getUserIdByEmail('colette.aine@toulouse.fr'),
      age: 84,
      bio: "J'ai toujours aimé chanter et écouter la radio le matin.",
      location: "Toulouse, Occitanie",
      photo: "colette.jpg",
      activities: ['Chant', 'Radio', 'Thé'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      userId: getUserIdByEmail('lucien.aine@ajaccio.fr'),
      age: 79,
      bio: "Marin retraité qui adore les discussions en terrasse.",
      location: "Ajaccio, Corse",
      photo: "lucien.jpg",
      activities: ['Café', 'Promenade', 'Jeux de cartes'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      userId: getUserIdByEmail('jacques.aine@brest.fr'),
      age: 83,
      bio: "Ex-marin pêcheur aimant raconter des histoires de mer.",
      location: "Brest, Bretagne",
      photo: "jacques.jpg",
      activities: ['Jeux de cartes', 'Chants marins', 'Marche'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      userId: getUserIdByEmail('aline.aine@guyane.fr'),
      age: 80,
      bio: "Amatrice de contes traditionnels et jardin créole.",
      location: "Cayenne, Guyane",
      photo: "aline.jpg",
      activities: ['Lecture', 'Cuisine locale', 'Nature'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      userId: getUserIdByEmail('malcolm.aine@saintmartin.fr'),
      age: 66,
      bio: "Passionné d'histoire du patrimoine culturel des Antilles, de botanique et biodiversité.",
      location: "Marigot, Saint-Martin",
      photo: "malcolm.jpg",
      activities: ['Marche', 'Randonnée', 'Nature'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // ACTIVITIES DATA - correspond aux activités possibles dans la table activities
  const activitiesData = [
    {
      id: uuidv4(),
      name: 'Café et discussion',
      description: 'Moment convivial autour d’un café pour échanger.',
      icon: '☕️',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Lecture',
      description: 'Partage d’une lecture ou discussion sur des livres.',
      icon: '📚',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Marche',
      description: 'Balade à pied pour profiter de la nature et discuter.',
      icon: '🚶‍♂️',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Jeux de société',
      description: 'Activité ludique avec des jeux de société variés.',
      icon: '🎲',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Cuisine',
      description: 'Préparation et partage de recettes culinaires.',
      icon: '🍳',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // On crée d'abord toutes les activités dans la base pour éviter problème de relation
  const activitiesMap = {};
  for (const act of activitiesData) {
    const activity = await prisma.activity.create({ data: act });
    activitiesMap[activity.name] = activity.id;
  }

  // Pour les autres activités non listées dans activitiesData mais présentes dans profils, on les ajoute aussi
  const extraActivities = new Set();
  for (const profile of seniorProfilesData) {
    for (const act of profile.activities) {
      if (!activitiesMap[act]) {
        extraActivities.add(act);
      }
    }
  }
  for (const actName of extraActivities) {
    const activity = await prisma.activity.create({
      data: {
        id: uuidv4(),
        name: actName,
        description: `${actName} description par défaut.`,
        icon: '🎯',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    activitiesMap[activity.name] = activity.id;
  }

  // Création des profils seniors avec connexion vers activités existantes
  for (const profile of seniorProfilesData) {
    const activitiesConnect = profile.activities
      .map(name => activitiesMap[name])
      .filter(id => id !== undefined)
      .map(id => ({ id }));

    await prisma.seniorProfile.create({
      data: {
        id: profile.id,
        userId: profile.userId,
        age: profile.age,
        bio: profile.bio,
        location: profile.location,
        photo: profile.photo,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
        activities: {
          connect: activitiesConnect,
        },
      },
    });
  }

  // Helper pour récupérer le profil senior par userId
  async function getSeniorProfileIdByUserId(userId) {
    const profile = await prisma.seniorProfile.findUnique({ where: { userId } });
    if (!profile) throw new Error('SeniorProfile introuvable pour userId ' + userId);
    return profile.id;
  }

  // VOLUNTEER APPLICATIONS
const volunteerApplicationsData = [
  {
    id: uuidv4(),
    // volunteerId: volunteersData[0].id, // Marie Bénévole
    firstName: 'Marie',
    lastName: 'Bénévole',
    email: 'marie.benevole@guadeloupe.fr',  // à ajuster si tu as usersData
    phone: '0690-123-456', // exemple de téléphone, modifie si tu veux
    age: volunteersData[0].age,
    location: volunteersData[0].location,
    motivation: "J'aime aider les autres et je suis très motivée à m'impliquer.", // tu peux adapter
    availability: volunteersData[0].availability,
    experience: "Bénévolat dans des associations locales", // exemple, à adapter
    status: 'PENDING',
    createdAt: new Date(),
    // updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    // volunteerId: volunteersData[1].id, // Sophie Bénévole
    firstName: 'Sophie',
    lastName: 'Bénévole',
    email: 'sophie.benevole@mayotte.fr',
    phone: '0691-987-654',
    age: volunteersData[1].age,
    location: volunteersData[1].location,
    motivation: "Passionnée par la culture antillaise et prête à m'investir.", 
    availability: volunteersData[1].availability,
    experience: "Organisation d'événements culturels",
    status: 'APPROVED',
    createdAt: new Date(),
    // updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    // volunteerId: volunteersData[2].id, // Emma Bénévole
    firstName: 'Emma',
    lastName: 'Bénévole',
    email: 'emma.benevole@montpellier.fr',
    phone: '0692-456-789',
    age: volunteersData[2].age,
    location: volunteersData[2].location,
    motivation: "Étudiante en médecine, j’aime discuter avec les aînés.",
    availability: volunteersData[2].availability,
    experience: "Stage en centre hospitalier",
    status: 'REJECTED',
    createdAt: new Date(),
    // updatedAt: new Date(),
  },
];


  for (const app of volunteerApplicationsData) {
    await prisma.volunteerApplication.create({ data: app });
  }

  // AVAILABLE SLOTS
  const availableSlotsData = [
    {
      id: uuidv4(),
      seniorId: await getSeniorProfileIdByUserId(getUserIdByEmail('robert.aine@paris.fr')),
      date: new Date('2025-07-07T09:00:00Z'),
      // duration: 60,
      startTime: '09:00',
      endTime: '10:00',
      activity: 'Café et discussion',
      isBooked: false,
      createdAt: new Date(),
      // updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      seniorId: await getSeniorProfileIdByUserId(getUserIdByEmail('jean.aine@reunion.fr')),
      date: new Date('2025-07-09T14:00:00Z'),
      // duration: 60,
      startTime: '14:00',
      endTime: '15:00',
      activity: 'Marche',
      isBooked: false,
      createdAt: new Date(),
      // updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      seniorId: await getSeniorProfileIdByUserId(getUserIdByEmail('marielle.aine@martinique.fr')),
      date: new Date('2025-07-10T10:00:00Z'),
      // duration: 45,
      startTime: '10:00',
      endTime: '10:45',
      activity: 'Lecture',
      isBooked: false,
      createdAt: new Date(),
      // updatedAt: new Date(),
    },
  ];

  for (const slot of availableSlotsData) {
    await prisma.availableSlot.create({ data: slot });
  }

  // Récupérer tous les créneaux pour réservation
  const createdSlots = await prisma.availableSlot.findMany();

  // Trouver le créneau de Robert à '2025-07-07T09:00:00Z' en comparant bien seniorId avec seniorProfileId
  const robertSeniorId = await getSeniorProfileIdByUserId(getUserIdByEmail('robert.aine@paris.fr'));

  const robertSlot = createdSlots.find(
    slot =>
      slot.seniorId === robertSeniorId &&
      slot.date.toISOString() === '2025-07-07T09:00:00.000Z'
  );

  if (!robertSlot) {
    throw new Error("Créneau de Robert introuvable");
  }

  // BOOKINGS
  const bookingData = [
    {
      id: uuidv4(),
      visitorId: getUserIdByEmail('emma.benevole@montpellier.fr'),
      slotId: robertSlot.id,
      seniorId: robertSlot.seniorId,
      status: 'CONFIRMED',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  for (const booking of bookingData) {
    await prisma.booking.create({ data: booking });
  }

  console.log('✅ Seed terminé avec succès !');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });



