import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Loading() {
  return (
    <>
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Title and subtitle skeletons */}
        <Skeleton className="h-12 w-80 mb-4" />
        <Skeleton className="h-6 w-64 mb-2" />

        {/* Tabs skeleton */}
        <Tabs defaultValue="shoes" className="w-full">
          <TabsList className="w-full justify-start mb-8">
            <TabsTrigger value="shoes" disabled>
              Shoes
            </TabsTrigger>
            <TabsTrigger value="pants" disabled>
              Pants
            </TabsTrigger>
            <TabsTrigger value="shirts" disabled>
              Shirts
            </TabsTrigger>
            <TabsTrigger value="headwear" disabled>
              Headwear
            </TabsTrigger>
          </TabsList>

          {/* Product grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="space-y-4 border p-4 rounded-lg">
                {/* Product image skeleton */}
                <Skeleton className="h-[400px] w-full rounded-lg" />

                {/* Product title skeleton */}
                <Skeleton className="h-6 w-3/4" />

                {/* Product description skeleton */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>

                {/* Product Price and Button skeleton */}
                <div className="flex items-center justify-between gap-4">
                  <Skeleton className="h-6 w-12" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            ))}
          </div>
        </Tabs>
      </div>
    </>
  );
}
