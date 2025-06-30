-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nom" TEXT,
    "prenom" TEXT,
    "age" INTEGER,
    "ville" TEXT,
    "quartier" TEXT,
    "telephone" TEXT,
    "typeUser" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aine" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bio" TEXT NOT NULL,
    "centresInteret" TEXT[],
    "mobilite" TEXT NOT NULL,
    "besoinAide" TEXT NOT NULL,

    CONSTRAINT "Aine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Benevole" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bio" TEXT NOT NULL,
    "experiences" TEXT NOT NULL,
    "disponibilites" TEXT[],
    "competences" TEXT[],

    CONSTRAINT "Benevole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activite" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duree" INTEGER NOT NULL,
    "lieuType" TEXT NOT NULL,

    CONSTRAINT "Activite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Aine_userId_key" ON "Aine"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Benevole_userId_key" ON "Benevole"("userId");

-- AddForeignKey
ALTER TABLE "Aine" ADD CONSTRAINT "Aine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Benevole" ADD CONSTRAINT "Benevole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
