/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FisicPerson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_address_id_fkey";

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_user_id_fkey";

-- DropForeignKey
ALTER TABLE "FisicPerson" DROP CONSTRAINT "FisicPerson_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_address_id_fkey";

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "FisicPerson";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "activated_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
    "id" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "address_id" TEXT,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fisic_person" (
    "document" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "fisic_person_pkey" PRIMARY KEY ("document","user_id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "company_document_key" ON "company"("document");

-- CreateIndex
CREATE UNIQUE INDEX "fisic_person_document_key" ON "fisic_person"("document");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fisic_person" ADD CONSTRAINT "fisic_person_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
