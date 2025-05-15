'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";
import { Bot, MessageSquare, Users, Sparkles, ArrowLeft, ChevronRight } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

export default function SynbotPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden pt-40">
        {/* Arka plan dekoratif elemanları */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 right-0 h-[600px] bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/25%),transparent_70%)]"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="flex items-center mb-8">
            <Button variant="outline" size="icon" asChild className="mr-4">
              <Link href="/">
                <ArrowLeft size={16} />
              </Link>
            </Button>
            <h1 className="text-4xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                Synbot – Turkcell İç Kaynaklı Asistan
              </span>
            </h1>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold mb-6">Turkcell'in Yapay Zeka Destekli İç Asistanı</h2>
              <p className="text-lg mb-6 text-muted-foreground">
                Synbot, Turkcell'in iç bilgi sistemlerini kullanan, telekomünikasyon süreçlerinde anlık destek sunan 
                yapay zeka destekli bir asistan çözümüdür. Turkcell çalışanlarının verimliliklerini artırmak
                ve müşteri deneyimini iyileştirmek için geliştirilmiştir.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#FFD100]/10 rounded-full">
                    <Bot className="h-6 w-6 text-[#FFD100]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">7/24 Anlık Destek</h3>
                    <p className="text-muted-foreground">Mesai saatleri dışında bile, telekomünikasyon süreçleri hakkında anında bilgi alın.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#00A0D2]/10 rounded-full">
                    <MessageSquare className="h-6 w-6 text-[#00A0D2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Doğal Dil İşleme</h3>
                    <p className="text-muted-foreground">Günlük konuşma diliyle sorularınızı sorun, Synbot anlamlandırıp cevaplasın.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#FFD100]/10 rounded-full">
                    <Sparkles className="h-6 w-6 text-[#FFD100]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Sürekli Öğrenme</h3>
                    <p className="text-muted-foreground">Her etkileşim ile kendini geliştiren yapay zeka modeliyle daha doğru yanıtlar.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#00A0D2]/10 rounded-full">
                    <Users className="h-6 w-6 text-[#00A0D2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Uzman Bilgi Entegrasyonu</h3>
                    <p className="text-muted-foreground">Turkcell'in deneyimli çalışanlarının bilgi ve deneyimlerini içeren bir bilgi tabanı.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-[#FFD100] to-[#00A0D2] hover:from-[#FFD100]/90 hover:to-[#00A0D2]/90 text-black shadow-lg shadow-[#FFD100]/20">
                  <Link href="/dashboard/synbot">
                    Synbot'a Erişin
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-[#FFD100]/40 text-foreground hover:bg-[#FFD100]/5">
                  <Link href="/dashboard">
                    Dashboard'a Dön
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              className="relative rounded-xl overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.2)] backdrop-blur-sm h-[400px]"
              variants={fadeIn}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD100]/20 via-transparent to-[#00A0D2]/20 z-10 pointer-events-none rounded-xl"></div>
              <div className="absolute -left-8 -top-8 w-16 h-16 bg-gradient-to-r from-[#FFD100] to-[#00A0D2] rounded-full blur-2xl opacity-70"></div>
              <div className="absolute -right-8 -bottom-8 w-16 h-16 bg-gradient-to-r from-[#00A0D2] to-[#FFD100] rounded-full blur-2xl opacity-70"></div>
              <div 
                className="w-full h-full bg-background/80 rounded-xl flex items-center justify-center text-foreground backdrop-blur-sm"
              >
                <div className="text-center p-8">
                  <Bot className="h-20 w-20 text-[#FFD100] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">Turkcell Synbot</h3>
                  <p className="text-sm text-white font-medium mt-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">7/24 Telekomünikasyon Süreç Asistanınız</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Nasıl Çalışır Bölümü */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Synbot Nasıl Çalışır?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#FFD100]/30 transition-all duration-300 hover:shadow-lg group">
              <div className="p-3 bg-[#FFD100]/10 rounded-full w-fit mb-4 group-hover:bg-[#FFD100]/20 transition-colors">
                <span className="text-2xl font-bold text-[#FFD100]">01</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Soru Sorun</h3>
              <p className="text-muted-foreground">
                Telekomünikasyon süreçleri, ürün detayları veya işlem adımları hakkında doğal dilde sorularınızı yazın.
              </p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#00A0D2]/30 transition-all duration-300 hover:shadow-lg group">
              <div className="p-3 bg-[#00A0D2]/10 rounded-full w-fit mb-4 group-hover:bg-[#00A0D2]/20 transition-colors">
                <span className="text-2xl font-bold text-[#00A0D2]">02</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Synbot Analiz Eder</h3>
              <p className="text-muted-foreground">
                Yapay zeka, Turkcell'in iç bilgi sistemlerini ve güncel telekomünikasyon verilerini tarayarak en doğru yanıtı bulur.
              </p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#FFD100]/30 transition-all duration-300 hover:shadow-lg group">
              <div className="p-3 bg-[#FFD100]/10 rounded-full w-fit mb-4 group-hover:bg-[#FFD100]/20 transition-colors">
                <span className="text-2xl font-bold text-[#FFD100]">03</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Yanıt Alın</h3>
              <p className="text-muted-foreground">
                Sistem doğrulanmış bilgilerle anlaşılır ve kesin bir yanıt sunar, gerekirse işlem adımlarını ve görsellerini paylaşır.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* İstatistikler */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Synbot Etki Analizi
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center">
              <h3 className="text-4xl font-bold text-[#FFD100] mb-2">%40</h3>
              <p className="text-muted-foreground">Çözüm Sürelerinde Azalma</p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center">
              <h3 className="text-4xl font-bold text-[#00A0D2] mb-2">%95</h3>
              <p className="text-muted-foreground">Doğru Yanıt Oranı</p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center">
              <h3 className="text-4xl font-bold text-[#FFD100] mb-2">7/24</h3>
              <p className="text-muted-foreground">Kesintisiz Erişim</p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center">
              <h3 className="text-4xl font-bold text-[#00A0D2] mb-2">+1500</h3>
              <p className="text-muted-foreground">Günlük Kullanıcı</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Çağrı Aksiyonu */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-background/70 backdrop-blur-xl p-8 md:p-12 rounded-xl border border-white/10 text-center">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Synbot ile Telekomünikasyon Süreçlerinizi Hızlandırın
            </h2>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
              Turkcell çalışanlarına özel geliştirilen Synbot, karmaşık telekomünikasyon süreçlerinde size rehberlik eder, 
              sorularınızı anında yanıtlar ve verimliliğinizi artırır.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-[#FFD100] to-[#00A0D2] hover:from-[#FFD100]/90 hover:to-[#00A0D2]/90 text-black shadow-lg shadow-[#FFD100]/20">
              <Link href="/dashboard/synbot">
                Hemen Synbot'u Kullanmaya Başlayın
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
} 