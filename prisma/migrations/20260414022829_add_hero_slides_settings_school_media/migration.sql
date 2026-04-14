-- CreateTable
CREATE TABLE "HeroSlide" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL DEFAULT 'image',
    "imageUrl" TEXT,
    "youtubeUrl" TEXT,
    "title" TEXT,
    "subtitle" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_School" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "regionId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "programs" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "mainImage" TEXT,
    "facilityImages" TEXT NOT NULL DEFAULT '[]',
    "facilityVideo" TEXT,
    "dormImages" TEXT NOT NULL DEFAULT '[]',
    "dormVideo" TEXT,
    "contact" TEXT,
    "address" TEXT,
    "website" TEXT,
    "tags" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "School_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_School" ("address", "contact", "createdAt", "description", "features", "id", "images", "isActive", "name", "order", "programs", "regionId", "slug", "tags", "updatedAt", "website") SELECT "address", "contact", "createdAt", "description", "features", "id", "images", "isActive", "name", "order", "programs", "regionId", "slug", "tags", "updatedAt", "website" FROM "School";
DROP TABLE "School";
ALTER TABLE "new_School" RENAME TO "School";
CREATE UNIQUE INDEX "School_slug_key" ON "School"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
