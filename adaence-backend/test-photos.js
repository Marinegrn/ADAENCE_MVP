//TEST - upload photos 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testPhotos() {
  const seniors = await prisma.seniorProfile.findMany({
    include: {
      user: true
    }
  });
  
  console.log('Données des seniors:');
  seniors.forEach(senior => {
    console.log(`${senior.user.firstName} ${senior.user.lastName}: photo = "${senior.photo}"`);
  });
  
  await prisma.$disconnect();
}

testPhotos();