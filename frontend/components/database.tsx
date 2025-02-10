"use client";

import { DatabaseData } from "@/lib/database";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Database as DatabaseIcon, X } from "lucide-react";
import { A_Product, Headwear, Pants, Shirts, Shoes } from "@/lib/products";
import { Button } from "./ui/button";
import { useState } from "react";

interface DataBaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  isOpen: boolean;
  toggleChat: () => void;
}

const DataBaseButton: React.FC<DataBaseButtonProps> = ({
  icon,
  isOpen,
  toggleChat,
  ...props
}) => (
  <Button
    variant="default"
    onClick={toggleChat}
    className="w-14 h-14 rounded-full shadow-md flex items-center justify-center hover:shadow-lg hover:shadow-black/30 transition-all duration-300"
    {...props}
  >
    {isOpen ? (
      <X className="h-6 w-6" />
    ) : (
      icon || <DatabaseIcon className="h-6 w-6" />
    )}
  </Button>
);

export default function Database({ data }: { data: DatabaseData }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-5 left-5 z-50">
      <DataBaseButton isOpen={isOpen} toggleChat={toggleChat} />

      {isOpen && (
        <div className=" p-4 flex flex-col bg-background border sm:rounded-lg shadow-md overflow-hidden transition-all duration-250 ease-out sm:absolute sm:w-[90vw] sm:h-[80vh] fixed inset-0 w-full h-full sm:inset-auto sm:right-auto sm:bottom-[calc(100%+10px)] sm:max-w-[50rem] sm:max-h-[600px] pointer-events-auto opacity-100 visible scale-100 translate-y-0">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 sm:hidden "
            onClick={toggleChat}
          >
            <X className="h-4 w-4" />
          </Button>
          <h2 className="text-4xl font-bold mb-4">Database</h2>
          <Tabs defaultValue="users" className="space-y-4 mt-8 overflow-auto">
            <TabsList>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Created At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.users.map((user) => (
                      <TableRow key={user.user_id}>
                        <TableCell>{user.user_id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.type}</TableCell>
                        <TableCell>
                          {new Date(user.created_at || "").toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>User ID</TableHead>
                      <TableHead>Total Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.orders.map((order) => (
                      <TableRow key={order.order_id}>
                        <TableCell>{order.order_id}</TableCell>
                        <TableCell>{order.user_id}</TableCell>
                        <TableCell>
                          ${(order.total_price / 100).toFixed(2)}
                        </TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>
                          {new Date(
                            order.created_at || ""
                          ).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="products">
              <Tabs defaultValue="pants" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="pants">Pants</TabsTrigger>
                  <TabsTrigger value="shirts">Shirts</TabsTrigger>
                  <TabsTrigger value="shoes">Shoes</TabsTrigger>
                  <TabsTrigger value="headwear">Headwear</TabsTrigger>
                </TabsList>

                <TabsContent value="pants">
                  <div className="rounded-md border">
                    <Table>
                      <ProductHeader />
                      <ProductData products={data.products.pants} />
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="shirts">
                  <div className="rounded-md border">
                    <Table>
                      <ProductHeader />
                      <ProductData products={data.products.shirts} />
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="shoes">
                  <div className="rounded-md border">
                    <Table>
                      <ProductHeader />
                      <ProductData products={data.products.shoes} />
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="headwear">
                  <div className="rounded-md border">
                    <Table>
                      <ProductHeader />
                      <ProductData products={data.products.headwear} />
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}

function ProductHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Product ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Description</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Quantity</TableHead>
        <TableHead>Color</TableHead>
        <TableHead>Brand</TableHead>
        <TableHead>Created At</TableHead>
      </TableRow>
    </TableHeader>
  );
}

function ProductData({ products }: { products: A_Product[] }) {
  return (
    <TableBody>
      {products.map((product: A_Product) => (
        <TableRow
          key={
            (product as Headwear).headgear_id ||
            (product as Shoes).shoe_id ||
            (product as Pants).pant_id ||
            (product as Shirts).shirt_id
          }
        >
          <TableCell>
            {(product as Headwear).headgear_id ||
              (product as Shoes).shoe_id ||
              (product as Pants).pant_id ||
              (product as Shirts).shirt_id}
          </TableCell>
          <TableCell>{product.name}</TableCell>
          <TableCell>{product.description}</TableCell>
          <TableCell>${(product.price / 100).toFixed(2)}</TableCell>
          <TableCell>{product.quantity}</TableCell>
          <TableCell>{product.color}</TableCell>
          <TableCell>{product.brand}</TableCell>
          <TableCell>
            {new Date(product.created_at || "").toLocaleDateString()}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
