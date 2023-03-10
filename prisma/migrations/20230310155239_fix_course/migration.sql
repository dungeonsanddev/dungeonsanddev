/*
  Warnings:

  - The values [OPS,AFK] on the enum `CATEGORY` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `link_mastadoon` on the `Author` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CATEGORY_new" AS ENUM ('FRONTEND', 'BACKEND', 'INFRA', 'TOOLS');
ALTER TABLE "Course" ALTER COLUMN "category" TYPE "CATEGORY_new" USING ("category"::text::"CATEGORY_new");
ALTER TYPE "CATEGORY" RENAME TO "CATEGORY_old";
ALTER TYPE "CATEGORY_new" RENAME TO "CATEGORY";
DROP TYPE "CATEGORY_old";
COMMIT;

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "link_mastadoon",
ADD COLUMN     "link_mastodon" TEXT;
