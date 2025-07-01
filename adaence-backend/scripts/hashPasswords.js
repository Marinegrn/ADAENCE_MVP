const { PrismaClient } = require('../src/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    // On vérifie si le mot de passe est déjà hashé (commence par $2a$, $2b$ ou $2y$)
    if (/^\$2[aby]\$/.test(user.password)) {
      console.log(`Mot de passe déjà hashé pour ${user.email}, on passe.`);
      continue;
    }

    const hashed = await bcrypt.hash(user.password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed },
    });

    console.log(`Mot de passe hashé pour ${user.email}`);
  }

  console.log('✅ Tous les mots de passe ont été hashés !');
}

main()
  .catch(e => {
    console.error('Erreur dans le script:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
