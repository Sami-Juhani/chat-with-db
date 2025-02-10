import { Prisma } from "@prisma/client";

import prisma from "./prisma";

export type Products = Awaited<ReturnType<typeof getAllProducts>>;

export type Pants = Prisma.pantsGetPayload<{}>;
export type Shirts = Prisma.shirtsGetPayload<{}>;
export type Shoes = Prisma.shoesGetPayload<{}>;
export type Headwear = Prisma.headgearGetPayload<{}>;

export type A_Product = Pants | Shirts | Shoes | Headwear;

export async function getPants() {
  const pants = await prisma.pants.findMany({
    orderBy: { pant_id: "desc" },
  });
  return pants;
}

export async function getShirts() {
  const shirts = await prisma.shirts.findMany({
    orderBy: { shirt_id: "desc" },
  });
  return shirts;
}

export async function getShoes() {
  const shoes = await prisma.shoes.findMany({
    orderBy: { shoe_id: "desc" },
  });
  return shoes;
}

export async function getHeadwear() {
  const headwear = await prisma.headgear.findMany({
    orderBy: { headgear_id: "desc" },
  });
  return headwear;
}

export async function getAllProducts() {
  const products = await Promise.all([
    getPants(),
    getShirts(),
    getShoes(),
    getHeadwear(),
  ]);
  return {
    pants: products[0],
    shirts: products[1],
    shoes: products[2],
    headwear: products[3],
  };
}
