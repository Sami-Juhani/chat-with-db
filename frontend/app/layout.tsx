import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";
import ChatBot from "@/components/chat";
import Database from "@/components/database";
import Providers from "@/components/providers";

import { getAllDatabase } from "@/lib/database";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StyleStore - Fashion & Apparel",
  description: "Discover the latest trends in fashion at StyleStore",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const db = await getAllDatabase();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <Database data={db} />
          <ChatBot />
          <Toaster richColors position="top-center" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
