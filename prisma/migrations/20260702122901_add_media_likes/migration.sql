-- CreateTable
CREATE TABLE "Like" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mediaId" INTEGER NOT NULL,
    "userKey" TEXT NOT NULL,
    CONSTRAINT "Like_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_mediaId_userKey_key" ON "Like"("mediaId", "userKey");
