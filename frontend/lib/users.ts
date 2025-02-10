"use server"

import prisma from "./prisma"

export type User = Awaited<ReturnType<typeof getUser>>

export async function getUser({ email, password }: { email: string; password: string }) {
  if (!email || !password) {
    throw new Error("Email and password are required")
  }

  const user = await prisma.users.findFirst({
    where: {
      email: email,
      password: password,
    },
    include: {
      orders: {
        include: {
          order_items: true,
        },
      },
    },
  })
  
  if (!user) {
    throw new Error("Wrong email or password")
  }

  return user
}
