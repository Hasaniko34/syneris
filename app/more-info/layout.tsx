"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { motion } from "@/components/motion-wrapper";

export default function MoreInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center mb-6 text-sm">
        <Link href="/dashboard" className="text-muted-foreground hover:text-primary flex items-center gap-1">
          <ArrowLeft size={16} />
          <span>Ana Sayfa</span>
        </Link>
        <ChevronRight size={14} className="mx-2 text-muted-foreground" />
        <span className="font-medium">Daha Fazla Bilgi</span>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
} 