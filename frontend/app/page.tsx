import Home from "@/components/home";

import { getAllProducts } from "@/lib/products";
import { Suspense } from "react";
import Loading from "@/components/loading";

export default async function Main() {
  const products = await getAllProducts();

  return (
    <main className="container mx-auto px-4 py-8">
      <Suspense fallback={<Loading />}>
        <Home products={products} />
      </Suspense>
    </main>
  );
}
