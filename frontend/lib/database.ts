import prisma from "./prisma";
import { Prisma } from "@prisma/client";

type User = Prisma.usersGetPayload<{}>;
import { Orders } from "./orders";

import { Pants, Shirts, Shoes, Headwear } from "./products";

export interface DatabaseData {
  users: User[];
  orders: Orders;
  products: {
    pants: Pants[];
    shirts: Shirts[];
    shoes: Shoes[];
    headwear: Headwear[];
  };
}

export async function getAllDatabase(): Promise<DatabaseData> {
  const usersResponse = prisma.users.findMany();
  const ordersResponse = prisma.orders.findMany({
    include: {
      order_items: true,
    },
  });
  const pantsResponse = prisma.pants.findMany();
  const shirtsResponse = prisma.shirts.findMany();
  const shoesResponse = prisma.shoes.findMany();
  const headwearResponse = prisma.headgear.findMany();

  const [users, orders, pants, shirts, shoes, headwear] = await Promise.all([
    usersResponse,
    ordersResponse,
    pantsResponse,
    shirtsResponse,
    shoesResponse,
    headwearResponse,
  ]);

  return { users, orders, products: { pants, shirts, shoes, headwear } };
}
