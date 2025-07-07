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
  await prisma.user.deleteMany();

  // USERS
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
      email: 'marielle.aine@martinique.fr',
      password: 'password123',
      firstName: 'Marielle',
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
    {
      id: uuidv4(),
      email: 'colette.aine@toulouse.fr',
      password: 'password123',
      firstName: 'Colette',
      lastName: 'Ainé',
      phone: '+33561616161',
      role: 'SENIOR',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      email: 'lucien.aine@ajaccio.fr',
      password: 'password123',
      firstName: 'Lucien',
      lastName: 'Ainé',
      phone: '+33495556677',
      role: 'SENIOR',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      email: 'emma.benevole@montpellier.fr',
      password: 'password123',
      firstName: 'Emma',
      lastName: 'Bénévole',
      phone: '+33467889900',
      role: 'VISITOR',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      email: 'yanis.benevole@nancy.fr',
      password: 'password123',
      firstName: 'Yanis',
      lastName: 'Bénévole',
      phone: '+33383445566',
      role: 'VISITOR',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      email: 'claire.benevole@saintmartin.fr',
      password: 'password123',
      firstName: 'Claire',
      lastName: 'Bénévole',
      phone: '+590590123456',
      role: 'VISITOR',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      email: 'jacques.aine@brest.fr',
      password: 'password123',
      firstName: 'Jacques',
      lastName: 'Ainé',
      phone: '+33298765432',
      role: 'SENIOR',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      email: 'aline.aine@guyane.fr',
      password: 'password123',
      firstName: 'Aline',
      lastName: 'Ainé',
      phone: '+33412345678',
      role: 'SENIOR',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      email: 'gerard.benevole@bordeaux.fr',
      password: 'password123',
      firstName: 'Gérard',
      lastName: 'Bénévole',
      phone: '+33512345678',
      role: 'VISITOR',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      email: 'malcolm.aine@saintmartin.fr',
      password: 'password123',
      firstName: 'Malcolm',
      lastName: 'Ainé',
      phone: '+33462599750',
      role: 'SENIOR',
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

  // Récupérer tous les users pour avoir les IDs
  const users = await prisma.user.findMany();

  // Helper pour retrouver un user par email
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
      userId: getUserIdByEmail('marielle.aine@martinique.fr'),
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
    {
      id: uuidv4(),
      userId: getUserIdByEmail('colette.aine@toulouse.fr'),
      age: 84,
      bio: "J'ai toujours aimé chanter et écouter la radio le matin.",
      location: "Toulouse, Occitanie",
      photo: null,
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
      photo: null,
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
      photo: null,
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
      photo: null,
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
      photo: null,
      activities: ['Marche', 'Randonnée', 'Nature'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // ACTIVITIES
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
      description: 'Balade en plein air pour se dégourdir les jambes.',
      icon: '🚶‍♂️',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Jeux de société',
      description: 'Parties de jeux pour stimuler l’esprit et s’amuser.',
      icon: '🎲',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Cuisine',
      description: 'Atelier cuisine pour partager des recettes et saveurs.',
      icon: '🍳',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Création des activities avec IDs stockés
  const activitiesMap = {};
  for (const activity of activitiesData) {
    const created = await prisma.activity.create({ data: activity });
    activitiesMap[created.name] = created.id;
  }

  // [BUG IMPORTANT] Correction pour les noms d'activités dans les seniorProfilesData :
  // Les noms doivent correspondre EXACTEMENT aux noms dans activitiesMap, sinon erreur de connexion.
  // Or dans seniorProfilesData, tu as par exemple 'Histoire', 'Musique classique', 'Échecs', 'Chant', 'Radio', 'Thé', 'Café', 'Promenade', 'Jeux de cartes', 'Chants marins', 'Cuisine locale'
  // Or dans activitiesData, il n'y a que 'Café et discussion', 'Lecture', 'Marche', 'Jeux de société', 'Cuisine'.
  // Il faut que ces noms correspondent, sinon ça va planter.

  // Garder tes données et de corriger la connexion comme suit : 
  // Si le nom d'activité du profil senior n'existe pas dans activitiesMap, on l'ignore pour éviter crash.

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

  // VOLUNTEER APPLICATIONS
const volunteerApplicationsData = [
  {
    id: uuidv4(),
    firstName: 'Marie',
    lastName: 'Bénévole',
    email: 'marie.benevole@guadeloupe.fr',
    phone: '+590690123456',
    age: 32,
    location: 'Pointe-à-Pitre, Guadeloupe',
    motivation: 'J’aime aider les personnes âgées et passer du temps avec elles.',
    availability: 'Lundis et mercredis après-midi',
    experience: 'Aide à domicile pendant 2 ans',
    status: 'PENDING',
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    firstName: 'Sophie',
    lastName: 'Bénévole',
    email: 'sophie.benevole@mayotte.fr',
    phone: '+26263987654',
    age: 28,
    location: 'Mamoudzou, Mayotte',
    motivation: 'Le bénévolat me tient à cœur, je souhaite apporter mon soutien.',
    availability: 'Samedis toute la journée',
    experience: 'Animation d’ateliers en maison de retraite',
    status: 'APPROVED',
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    firstName: 'Emma',
    lastName: 'Bénévole',
    email: 'emma.benevole@montpellier.fr',
    phone: '+33467889900',
    age: 25,
    location: 'Montpellier, Occitanie',
    motivation: 'J’aimerais contribuer à la communauté et rencontrer de nouvelles personnes.',
    availability: 'Soirs en semaine',
    experience: null,
    status: 'REJECTED',
    createdAt: new Date(),
  },
];

for (const app of volunteerApplicationsData) {
  await prisma.volunteerApplication.create({ data: app });
}


  for (const app of volunteerApplicationsData) {
    await prisma.volunteerApplication.create({ data: app });
  }

  // AVAILABLE SLOTS
  const availableSlotsData = [
    {
      id: uuidv4(),
      seniorId: getUserIdByEmail('robert.aine@paris.fr'),
      date: new Date('2025-07-07T09:00:00Z'),
      duration: 60,
      isBooked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      seniorId: getUserIdByEmail('marielle.aine@martinique.fr'),
      date: new Date('2025-07-08T10:00:00Z'),
      duration: 45,
      isBooked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      seniorId: getUserIdByEmail('jean.aine@reunion.fr'),
      date: new Date('2025-07-09T14:00:00Z'),
      duration: 30,
      isBooked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  for (const slot of availableSlotsData) {
    await prisma.availableSlot.create({ data: slot });
  }

  // BOOKINGS
  // Exemple: Emma (benevole) réserve un créneau de Robert (senior)
  // Pour cela, on récupère les ids correspondants

  // [BUG IMPORTANT!] Attention ici: availableSlotsData contient les IDs qu'on vient de générer, mais ils ne correspondent pas aux IDs en base car on a fait des create.
  // Pour que le booking référence bien un créneau en base, il faut récupérer le créneau en base et utiliser son ID.

  // Solution simple: après insertion, récupérer tous les créneaux et faire la correspondance.

  const createdSlots = await prisma.availableSlot.findMany();

  // Trouver le créneau de Robert à '2025-07-07T09:00:00Z'
  const robertSlot = createdSlots.find(
    slot =>
      slot.seniorId === getUserIdByEmail('robert.aine@paris.fr') &&
      slot.date.toISOString() === '2025-07-07T09:00:00.000Z'
  );

  if (!robertSlot) {
    throw new Error("Créneau de Robert introuvable");
  }

  const bookingData = [
    {
      id: uuidv4(),
      visitorId: getUserIdByEmail('emma.benevole@montpellier.fr'),
      availableSlotId: robertSlot.id,
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



