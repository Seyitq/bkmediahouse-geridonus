/*
  Warnings:

  - You are about to drop the column `effectType` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `modelType` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `modelUrl` on the `Service` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "longDescription" TEXT,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#3b82f6',
    "features" TEXT,
    "photos" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Service" ("color", "createdAt", "description", "features", "icon", "id", "isActive", "longDescription", "name", "order", "photos", "slug", "updatedAt") SELECT "color", "createdAt", "description", "features", "icon", "id", "isActive", "longDescription", "name", "order", "photos", "slug", "updatedAt" FROM "Service";
DROP TABLE "Service";
ALTER TABLE "new_Service" RENAME TO "Service";
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
