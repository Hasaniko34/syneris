"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Code, Share2, Puzzle, Database, RefreshCw, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function IntegrationEasePage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center mb-6 text-sm">
        <Link href="/" className="text-muted-foreground hover:text-primary flex items-center gap-1">
          <ArrowLeft size={16} />
          <span>Ana Sayfa</span>
        </Link>
        <ChevronRight size={14} className="mx-2 text-muted-foreground" />
        <span className="font-medium">Entegrasyon Kolaylığı</span>
      </nav>

      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Entegrasyon Kolaylığı
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Mevcut iş akışlarınıza sorunsuz entegre olun. Syneris, ihtiyaç duyduğunuz tüm sistemlerle bağlantılı, kesintisiz bir öğrenme ekosistemi sunar.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full">
              Ücretsiz Demo Planla
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              Entegrasyon Rehberini İndir
            </Button>
          </div>
        </div>
        <div className="relative rounded-xl overflow-hidden aspect-video shadow-2xl">
          <Image 
            src="/images/features/integration.webp" 
            alt="Entegrasyon Kolaylığı"
            width={640}
            height={360}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
} 