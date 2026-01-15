/*
  Warnings:

  - Changed the type of `insee_code` on the `Theater` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ae` on the `Theater` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `multiplex` on the `Theater` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Theater" DROP COLUMN "insee_code",
ADD COLUMN     "insee_code" INTEGER NOT NULL,
ALTER COLUMN "entries_evolution" SET DATA TYPE DOUBLE PRECISION,
DROP COLUMN "ae",
ADD COLUMN     "ae" BOOLEAN NOT NULL,
DROP COLUMN "multiplex",
ADD COLUMN     "multiplex" BOOLEAN NOT NULL,
ALTER COLUMN "pd_m_en_entries_french_films" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "pd_m_entries_american_films" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "pd_m_entries_european_films" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "pd_m_entries_other_films" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "ae_part_of_seances" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "ae_pd_m_entries" SET DATA TYPE DOUBLE PRECISION;
