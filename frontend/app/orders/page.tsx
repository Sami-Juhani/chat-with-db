"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth-context";
import Image from "next/image";

export default function OrdersPage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {isAuthenticated ? (
          <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
        ) : (
          <h1 className="text-3xl font-bold mb-8">
            Please login to view your orders
          </h1>
        )}

        <div className="space-y-6">
          {user?.orders &&
            user.orders.map((order) => (
              <motion.div
                key={order.order_id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Order #{order.order_id}</CardTitle>
                      <CardDescription>
                        Placed on{" "}
                        {new Date(order.created_at!).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        order.status === "Delivered" ? "default" : "secondary"
                      }
                    >
                      {order.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    {order.order_items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center gap-4 mt-4"
                      >
                        <Image
                          src={item.img_url || ""}
                          alt={item.product_name}
                          width={80}
                          height={80}
                          className="object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.product_name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm font-medium">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <Separator className="my-4" />
                    <div className="mt-6 flex justify-end">
                      <p className="text-lg font-bold">
                        Total: ${order.total_price.toFixed(2)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </div>
  );
}
