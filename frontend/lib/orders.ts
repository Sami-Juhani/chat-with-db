import { Prisma } from "@prisma/client"
import prisma from "./prisma"

export type Orders = Prisma.ordersGetPayload<{ include: { order_items: true } }>[]

export async function getOrders({ userId }: { userId: number }) {
  const orders = await prisma.orders.findMany({
    where: {
      user_id: userId,
    },
    include: {
      order_items: true,
    },
  })
  return orders
}
