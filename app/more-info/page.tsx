"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, ChevronRight, FileText, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

const articles = [
  {
    title: "Syneris Nedir?",
    description: "Syneris'in sunduğu dijital öğrenme çözümleri ve platformu hakkında detaylı bilgi.",
    slug: "syneris-nedir",
    icon: <Lightbulb className="h-8 w-8 text-primary" />
  },
  {
    title: "Eğitim Metodolojimiz",
    description: "Bilimsel temellere dayalı eğitim metodolojimiz ve başarısının arkasındaki nedenler.",
    slug: "metodolojimiz",
    icon: <BookOpen className="h-8 w-8 text-primary" />
  },
  {
    title: "Sık Sorulan Sorular",
    description: "Platformumuz ve hizmetlerimizle ilgili en çok sorulan soruların cevapları.",
    slug: "sss",
    icon: <FileText className="h-8 w-8 text-primary" />
  }
];

export default function MoreInfoPage() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Daha Fazla Bilgi
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Syneris hakkında daha detaylı bilgi edinmek için makalelerimizi inceleyebilirsiniz.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <motion.div
            key={article.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/more-info/${article.slug}`}>
              <div className="bg-card border rounded-xl p-6 h-full hover:shadow-md transition-shadow group">
                <div className="mb-4">{article.icon}</div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h2>
                <p className="text-muted-foreground mb-4">{article.description}</p>
                <div className="flex items-center text-primary font-medium">
                  <span className="mr-2">Devamını Oku</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Diğer Konular</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: "Gizlilik Politikası", slug: "gizlilik-politikasi" },
            { title: "Kullanım Koşulları", slug: "kullanim-kosullari" },
            { title: "Veri Güvenliği", slug: "veri-guvenligi" },
            { title: "Hizmet Seviye Anlaşması", slug: "hizmet-seviye-anlasmasi" }
          ].map((item) => (
            <Link 
              key={item.slug} 
              href={`/more-info/${item.slug}`}
              className="flex items-center justify-between p-4 border rounded-lg bg-card hover:shadow-sm transition-shadow"
            >
              <span>{item.title}</span>
              <ChevronRight size={16} className="text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-muted-foreground mb-4">Başka sorunuz mu var?</p>
        <Button className="rounded-full" size="lg">
          İletişime Geçin
        </Button>
      </div>
    </div>
  );
} 