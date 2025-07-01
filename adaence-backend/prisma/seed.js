// DATA TEST
const { PrismaClient } = require('../src/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Démarrage du seeding...');

  // Créer quelques activités
  const activities = await Promise.all([
    prisma.activity.create({
      data: {
        name: 'Café & discussion',
        description: 'Moment convivial autour d’un café',
        icon: '☕'
      }
    }),
    prisma.activity.create({
      data: {
        name: 'Balade en plein air',
        description: 'Promenade dans un parc du quartier',
        icon: '🌳'
      }
    })
  ]);

  // Créer un utilisateur senior avec profil
  const hashedPassword = await bcrypt.hash('password123', 10);
  const seniorUser = await prisma.user.create({
    data: {
      email: 'senior@example.com',
      password: hashedPassword,
      firstName: 'Jean',
      lastName: 'Dupont',
      phone: '0601020304',
      role: 'SENIOR',
      seniorProfile: {
        create: {
          age: 72,
          bio: 'Ancien enseignant passionné d’art.',
          location: 'Paris',
          photo: null,
          activities: [activities[0].id, activities[1].id],
          availableSlots: {
            create: [
              {
                date: new Date(),
                startTime: '10:00',
                endTime: '11:00',
                activity: activities[0].id
              },
              {
                date: new Date(),
                startTime: '14:00',
                endTime: '15:00',
                activity: activities[1].id
              }
            ]
          }
        }
      }
    },
    include: {
      seniorProfile: true
    }
  });

  // Créer un utilisateur visiteur (qui réservera plus tard)
  const visitorUser = await prisma.user.create({
    data: {
      email: 'visitor@example.com',
      password: hashedPassword,
      firstName: 'Alice',
      lastName: 'Martin',
      role: 'VISITOR'
    }
  });

  console.log('✅ Seeding terminé avec succès !');
  console.log(`👤 Senior : ${seniorUser.email}`);
  console.log(`👤 Visiteur : ${visitorUser.email}`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur pendant le seeding :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
