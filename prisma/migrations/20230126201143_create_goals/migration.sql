-- CreateTable
CREATE TABLE "Goals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "total_value" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Goals_id_key" ON "Goals"("id");
