-- CreateTable
CREATE TABLE "User" (
    "uid" INTEGER NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Product" (
    "redeemableCode" TEXT NOT NULL,
    "stripeProductId" TEXT NOT NULL,
    "ownerUid" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_redeemableCode_key" ON "Product"("redeemableCode");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_ownerUid_fkey" FOREIGN KEY ("ownerUid") REFERENCES "User"("uid") ON DELETE SET NULL ON UPDATE CASCADE;
