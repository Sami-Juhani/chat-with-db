"use client";

import Image from "next/image";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { toast } from "sonner";

import { motion } from "framer-motion";
import SoldOutImage from "@/public/images/soldout.png";
import { A_Product } from "@/lib/products";

export function ProductCard({
  name,
  description,
  price,
  img_url,
  brand,
  quantity,
}: A_Product) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="relative aspect-square overflow-hidden rounded-lg">
            {img_url !== null && (
              <Image
                src={img_url}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
            {quantity === 0 && <Image src={SoldOutImage} alt="Sold Out" fill />}
          </div>
          <CardTitle className="mt-4">{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="text-sm text-muted-foreground mt-2">Brand: {brand}</p>
        </CardContent>
        <CardFooter className="mt-auto flex justify-between items-center">
          <p className="text-lg font-bold">${price}</p>
          <Button
            disabled={quantity === 0}
            onClick={() => {
              toast.error("We are not taking new orders currently");
            }}
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
