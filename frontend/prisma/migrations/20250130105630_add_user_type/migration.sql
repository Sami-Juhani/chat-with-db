-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'USER';
