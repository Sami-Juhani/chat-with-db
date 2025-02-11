"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/ui/product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { A_Product, Products } from "@/lib/products";

export default function Home({ products }: { products: Products }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Welcome to StyleStore</h1>
      <p className="text-lg text-muted-foreground">
        Discover the latest trends in fashion
      </p>

      <Tabs defaultValue="shoes" className="w-full">
        <TabsList className="w-full justify-start mb-8">
          <TabsTrigger value="shoes">Shoes</TabsTrigger>
          <TabsTrigger value="pants">Pants</TabsTrigger>
          <TabsTrigger value="shirts">Shirts</TabsTrigger>
          <TabsTrigger value="headwear">Headwear</TabsTrigger>
        </TabsList>

        {Object.entries(products).map(([category, items]) => (
          <TabsContent key={category} value={category}>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {items.map((product: A_Product) => (
                <ProductCard key={product.name} {...product} />
              ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
