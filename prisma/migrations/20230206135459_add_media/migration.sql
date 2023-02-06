/*
  Warnings:

  - Added the required column `media` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "media" TEXT NOT NULL;
