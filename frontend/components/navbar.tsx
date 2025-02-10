"use client";

import Link from "next/link";

import { Button } from "./ui/button";
import { LoginModal } from "./auth/login-modal";

import { motion } from "framer-motion";
import { Package } from "lucide-react";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="border-b"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-x-8">
          <Link href="/" className="text-xl font-bold">
            StyleStore
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/faq" className="text-sm hover:text-primary">
              FAQ
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/orders">
            <Button variant="ghost" size="icon" title="Your Orders">
              <Package className="h-5 w-5" />
            </Button>
          </Link>
          <LoginModal />
        </div>
      </div>
    </motion.header>
  );
}
