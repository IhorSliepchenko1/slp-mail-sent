-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SendersFile" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "importName" TEXT NOT NULL,
    "mails" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "importedNumber" INTEGER NOT NULL,
    "uniqueNumber" INTEGER NOT NULL,

    CONSTRAINT "SendersFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipientsFile" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "importName" TEXT NOT NULL,
    "mails" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "importedNumber" INTEGER NOT NULL,
    "uniqueNumber" INTEGER NOT NULL,

    CONSTRAINT "RecipientsFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "delay" INTEGER NOT NULL,
    "countRecipients" INTEGER NOT NULL,
    "countSenders" INTEGER NOT NULL,
    "nameCampaign" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "sendersName" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "imagesPath" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SendersFileToCampaign" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RecipientsFileToCampaign" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "_SendersFileToCampaign_AB_unique" ON "_SendersFileToCampaign"("A", "B");

-- CreateIndex
CREATE INDEX "_SendersFileToCampaign_B_index" ON "_SendersFileToCampaign"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RecipientsFileToCampaign_AB_unique" ON "_RecipientsFileToCampaign"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipientsFileToCampaign_B_index" ON "_RecipientsFileToCampaign"("B");

-- AddForeignKey
ALTER TABLE "SendersFile" ADD CONSTRAINT "SendersFile_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipientsFile" ADD CONSTRAINT "RecipientsFile_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SendersFileToCampaign" ADD CONSTRAINT "_SendersFileToCampaign_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SendersFileToCampaign" ADD CONSTRAINT "_SendersFileToCampaign_B_fkey" FOREIGN KEY ("B") REFERENCES "SendersFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipientsFileToCampaign" ADD CONSTRAINT "_RecipientsFileToCampaign_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipientsFileToCampaign" ADD CONSTRAINT "_RecipientsFileToCampaign_B_fkey" FOREIGN KEY ("B") REFERENCES "RecipientsFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
