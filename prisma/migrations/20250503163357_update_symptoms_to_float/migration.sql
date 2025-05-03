/*
  Warnings:

  - You are about to alter the column `congestion` on the `HayfeverEntry` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `headache` on the `HayfeverEntry` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `itchyEyes` on the `HayfeverEntry` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `sneezing` on the `HayfeverEntry` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HayfeverEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "sneezing" REAL NOT NULL,
    "itchyEyes" REAL NOT NULL,
    "congestion" REAL NOT NULL,
    "headache" REAL NOT NULL,
    "medications" TEXT NOT NULL,
    "medicationEffectiveness" TEXT NOT NULL,
    "outdoorTime" REAL,
    "activities" TEXT NOT NULL,
    "notes" TEXT,
    "locationLat" REAL,
    "locationLng" REAL,
    "locationAddress" TEXT,
    "pollenCount" REAL,
    "pollenTypes" TEXT,
    "temperature" REAL,
    "humidity" REAL,
    "windSpeed" REAL
);
INSERT INTO "new_HayfeverEntry" ("activities", "congestion", "createdAt", "date", "headache", "humidity", "id", "itchyEyes", "locationAddress", "locationLat", "locationLng", "medicationEffectiveness", "medications", "notes", "outdoorTime", "pollenCount", "pollenTypes", "sneezing", "temperature", "updatedAt", "windSpeed") SELECT "activities", "congestion", "createdAt", "date", "headache", "humidity", "id", "itchyEyes", "locationAddress", "locationLat", "locationLng", "medicationEffectiveness", "medications", "notes", "outdoorTime", "pollenCount", "pollenTypes", "sneezing", "temperature", "updatedAt", "windSpeed" FROM "HayfeverEntry";
DROP TABLE "HayfeverEntry";
ALTER TABLE "new_HayfeverEntry" RENAME TO "HayfeverEntry";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
