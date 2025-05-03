-- CreateTable
CREATE TABLE "HayfeverEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "sneezing" INTEGER NOT NULL,
    "itchyEyes" INTEGER NOT NULL,
    "congestion" INTEGER NOT NULL,
    "headache" INTEGER NOT NULL,
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
