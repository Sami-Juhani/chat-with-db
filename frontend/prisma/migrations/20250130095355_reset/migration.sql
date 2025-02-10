-- CreateTable
CREATE TABLE "headgear" (
    "headgear_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "type" VARCHAR(50),
    "color" VARCHAR(50),
    "brand" VARCHAR(100),
    "img_url" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "headgear_pkey" PRIMARY KEY ("headgear_id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "order_item_id" SERIAL NOT NULL,
    "order_id" INTEGER,
    "product_name" VARCHAR(100) NOT NULL,
    "product_category" VARCHAR(50) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "img_url" TEXT,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("order_item_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "order_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "total_price" DECIMAL(10,2) NOT NULL,
    "status" VARCHAR(50),
    "estimated_delivery" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "pants" (
    "pant_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "size" VARCHAR(10),
    "color" VARCHAR(50),
    "material" VARCHAR(100),
    "brand" VARCHAR(100),
    "img_url" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pants_pkey" PRIMARY KEY ("pant_id")
);

-- CreateTable
CREATE TABLE "shirts" (
    "shirt_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "size" VARCHAR(10),
    "color" VARCHAR(50),
    "sleeve_length" VARCHAR(50),
    "brand" VARCHAR(100),
    "img_url" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shirts_pkey" PRIMARY KEY ("shirt_id")
);

-- CreateTable
CREATE TABLE "shoes" (
    "shoe_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "size" VARCHAR(10),
    "color" VARCHAR(50),
    "brand" VARCHAR(100),
    "img_url" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shoes_pkey" PRIMARY KEY ("shoe_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
