// SEED DATA TEST 
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding de la base de données...');

    // Créer des activités
    const activites = await Promise.all([
    prisma.activite.create({
      data: {
        nom: 'Café et discussion',
        description: 'Un moment convivial autour d\'un café pour échanger et apprendre à se connaître',
        duree: 60,
        lieuType: 'FLEXIBLE'
      }
    }),
    prisma.activite.create({
      data: {
        nom: 'Promenade au parc',
        description: 'Une balade relaxante dans un parc du quartier',
        duree: 90,
        lieuType: 'EXTERIEUR'
      }
    }),
    prisma.activite.create({
      data: {
        nom: 'Visite de musée',
        description: 'Découverte culturelle d\'un musée local',
        duree: 120,
        lieuType: 'EXTERIEUR'
      }
    }),
    prisma.activite.create({
      data: {
        nom: 'Jeux de société',
        description: 'Partie de jeux de société pour s\'amuser ensemble',
        duree: 90,
        lieuType: 'DOMICILE'
      }
    })
  ]);

  // Créer des utilisateurs de test
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Créer un bénévole
  const benevoleUser = await prisma.user.create({
    data: {
      email: 'marie.benevole@test.com',
      password: hashedPassword,
      nom: 'Martin',
      prenom: 'Marie',
      telephone: '0123456789',
      typeUser: 'BENEVOLE',
      age: 25,
      ville: 'Paris',
      quartier: '11ème'
    }
  });

  await prisma.benevole.create({
    data: {
      userId: benevoleUser.id,
      bio: 'Étudiante en psychologie, j\'aime passer du temps avec les personnes âgées',
      experiences: 'Bénévole en maison de retraite',
      disponibilites: ['lundi-matin', 'mercredi-apres-midi', 'samedi-matin'],
      competences: ['Écoute', 'Accompagnement', 'Jeux']
    }
  });

  // Créer un aîné
  const aineUser = await prisma.user.create({
    data: {
      email: 'robert.aine@test.com',
      password: hashedPassword,
      nom: 'Dupont',
      prenom: 'Robert',
      telephone: '0987654321',
      typeUser: 'AINE',
      age: 75,
      ville: 'Paris',
      quartier: '11ème'
    }
  });

  await prisma.aine.create({
    data: {
      userId: aineUser.id,
      bio: 'Ancien professeur d\'histoire, j\'aime partager mes connaissances',
      centresInteret: ['Histoire', 'Lecture', 'Musique classique', 'Échecs'],
      mobilite: 'MOYENNE',
      besoinAide: 'Accompagnement pour sorties culturelles'
    }
  });

  console.log('✅ Seeding terminé avec succès!');
  console.log('👤 Bénévole test: marie.benevole@test.com / password123');
  console.log('👤 Aîné test: robert.aine@test.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });