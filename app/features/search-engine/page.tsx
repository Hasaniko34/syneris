"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Zap, Database, Sparkles, ArrowLeft, ChevronRight, FileSearch, BookOpen } from "lucide-react";

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

export default function SearchEnginePage() {
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
                Arama Motoru ile Hızlı Destek
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
              <h2 className="text-3xl font-bold mb-6">Turkcell Bilgi Tabanında Anında Arama</h2>
              <p className="text-lg mb-6 text-muted-foreground">
                Syneris'in gelişmiş arama motoru, Turkcell'in geniş bilgi tabanında saniyeler içinde
                arama yapmanızı sağlar. Telekomünikasyon süreçleri, teknik bilgiler, şebeke çözümleri ve 
                müşteri hizmetleri konularında ihtiyacınız olan bilgilere anında ulaşın.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#FFD100]/10 rounded-full">
                    <Zap className="h-6 w-6 text-[#FFD100]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Hızlı Sonuçlar</h3>
                    <p className="text-muted-foreground">Milisaniyeler içinde binlerce doküman arasından en ilgili içeriği bulun.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#00A0D2]/10 rounded-full">
                    <Database className="h-6 w-6 text-[#00A0D2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Kapsamlı İçerik</h3>
                    <p className="text-muted-foreground">Turkcell'in tüm şebeke, teknik ve servis dokümantasyonuna tek noktadan erişin.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#FFD100]/10 rounded-full">
                    <Search className="h-6 w-6 text-[#FFD100]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Akıllı Filtreleme</h3>
                    <p className="text-muted-foreground">Sonuçları departman, konu, tarih ve belge türüne göre filtreleyerek daraltın.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#00A0D2]/10 rounded-full">
                    <Sparkles className="h-6 w-6 text-[#00A0D2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Yapay Zeka Destekli</h3>
                    <p className="text-muted-foreground">Yapay zeka algoritmaları ile kullanıcı davranışlarına göre kişiselleştirilmiş sonuçlar.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-[#FFD100] to-[#00A0D2] hover:from-[#FFD100]/90 hover:to-[#00A0D2]/90 text-black shadow-lg shadow-[#FFD100]/20">
                  <Link href="/dashboard/search">
                    Arama Motorunu Deneyin
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
                  <Search className="h-20 w-20 text-[#FFD100] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">Turkcell Arama Motoru</h3>
                  <p className="text-sm text-white font-medium mt-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Bilgiye anında erişim</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Arama Özellikleri */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Gelişmiş Arama Özellikleri
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#FFD100]/30 transition-all duration-300 hover:shadow-lg group">
              <div className="p-3 bg-[#FFD100]/10 rounded-full w-fit mb-4 group-hover:bg-[#FFD100]/20 transition-colors">
                <FileSearch className="h-6 w-6 text-[#FFD100]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Doğal Dil Araması</h3>
              <p className="text-muted-foreground">
                Günlük konuşma dilinde sorular sorarak arama yapabilirsiniz. Örneğin, "4.5G baz istasyonu kurulum adımları nelerdir?" gibi tam cümlelerle sorgulama yapabilirsiniz.
              </p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#00A0D2]/30 transition-all duration-300 hover:shadow-lg group">
              <div className="p-3 bg-[#00A0D2]/10 rounded-full w-fit mb-4 group-hover:bg-[#00A0D2]/20 transition-colors">
                <BookOpen className="h-6 w-6 text-[#00A0D2]" />
              </div>
              <h3 className="text-xl font-bold mb-3">İçerik Önizleme</h3>
              <p className="text-muted-foreground">
                Arama sonuçlarında belgelerin içeriğini önizleyebilir, tam metne girmeden ilgili bölümleri görebilirsiniz. Bu özellik, doğru dokümana hızlıca ulaşmanızı sağlar.
              </p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#FFD100]/30 transition-all duration-300 hover:shadow-lg group">
              <div className="p-3 bg-[#FFD100]/10 rounded-full w-fit mb-4 group-hover:bg-[#FFD100]/20 transition-colors">
                <Sparkles className="h-6 w-6 text-[#FFD100]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Öğrenen Algoritmalar</h3>
              <p className="text-muted-foreground">
                Arama motoru, kullanım alışkanlıklarınızı öğrenerek zamanla daha kişiselleştirilmiş ve doğru sonuçlar sunar. Departmanınıza ve görevinize özel içerikler önceliklendirilir.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Arama Kategorileri */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Turkcell Bilgi Kategorileri
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-[#FFD100]">Teknik Dokümantasyon</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#FFD100]"></span>
                  <span>Şebeke altyapısı ve BTS kurulum kılavuzları</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#FFD100]"></span>
                  <span>4.5G ve 5G teknoloji dokümantasyonu</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#FFD100]"></span>
                  <span>Arıza giderme ve bakım prosedürleri</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#FFD100]"></span>
                  <span>Teknik ekipman katalogları</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#FFD100]"></span>
                  <span>Şebeke güvenlik protokolleri</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-[#00A0D2]">Müşteri Hizmetleri</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#00A0D2]"></span>
                  <span>Tarife ve paket bilgileri</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#00A0D2]"></span>
                  <span>Dijital servis kullanım kılavuzları</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#00A0D2]"></span>
                  <span>Yaygın müşteri sorunları ve çözümleri</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#00A0D2]"></span>
                  <span>Fatura ve ödeme işlemleri</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#00A0D2]"></span>
                  <span>Cihaz ve aksesuar bilgileri</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-[#FFD100]">Kurumsal Süreçler</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#FFD100]"></span>
                  <span>İş akış şemaları ve prosedürler</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#FFD100]"></span>
                  <span>Kurumsal politikalar ve yönetmelikler</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#FFD100]"></span>
                  <span>İnsan kaynakları prosedürleri</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#FFD100]"></span>
                  <span>Eğitim materyalleri ve kılavuzlar</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#FFD100]"></span>
                  <span>Proje yönetimi belgeleri</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-[#00A0D2]">Dijital Servisler</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#00A0D2]"></span>
                  <span>BiP, fizy, TV+, lifebox teknik dokümantasyonu</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#00A0D2]"></span>
                  <span>Dijital servis entegrasyonları</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#00A0D2]"></span>
                  <span>API dokümantasyonu</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#00A0D2]"></span>
                  <span>Servis geliştirme kılavuzları</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#00A0D2]"></span>
                  <span>Dijital servis sorun giderme rehberleri</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* İstatistikler */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Arama Motoru Etki Analizi
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center">
              <h3 className="text-4xl font-bold text-[#FFD100] mb-2">%70</h3>
              <p className="text-muted-foreground">Bilgiye Erişim Süresinde Azalma</p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center">
              <h3 className="text-4xl font-bold text-[#00A0D2] mb-2">+50.000</h3>
              <p className="text-muted-foreground">İndekslenmiş Teknik Doküman</p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center">
              <h3 className="text-4xl font-bold text-[#FFD100] mb-2">%92</h3>
              <p className="text-muted-foreground">Doğru Sonuç Bulma Oranı</p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center">
              <h3 className="text-4xl font-bold text-[#00A0D2] mb-2">+5.000</h3>
              <p className="text-muted-foreground">Günlük Aktif Kullanıcı</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Kullanıcı Deneyimleri */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Kullanıcı Deneyimleri
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#FFD100] to-[#00A0D2] flex items-center justify-center text-white font-bold">
                  MS
                </div>
                <div>
                  <p className="italic text-muted-foreground mb-4">
                    "Saha çalışmalarında BTS arızalarına müdahale ederken, arama motoru sayesinde gerekli teknik dokümanlara anında erişebiliyorum. Eskiden bir arıza için merkeze danışmam gerekirken, şimdi çözüm adımlarını saniyeler içinde bulabiliyorum."
                  </p>
                  <div>
                    <h4 className="font-semibold">Mert Soylu</h4>
                    <p className="text-sm text-muted-foreground">Saha Teknik Uzmanı, Turkcell</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#00A0D2] to-[#FFD100] flex items-center justify-center text-white font-bold">
                  AK
                </div>
                <div>
                  <p className="italic text-muted-foreground mb-4">
                    "Müşteri hizmetlerinde çalışırken, karmaşık tarife ve kampanya detaylarını hızlıca bulmam gerekiyor. Arama motoru sayesinde müşteri bekletme süremiz %60 azaldı ve ilk aramada çözüm oranımız %40 arttı."
                  </p>
                  <div>
                    <h4 className="font-semibold">Ayşe Kaya</h4>
                    <p className="text-sm text-muted-foreground">Müşteri Hizmetleri Uzmanı, Turkcell</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Çağrı Aksiyonu */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-background/70 backdrop-blur-xl p-8 md:p-12 rounded-xl border border-white/10 text-center">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Bilgiye Anında Erişin
            </h2>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
              Turkcell'in kapsamlı bilgi tabanında arama yaparak, telekomünikasyon süreçlerinizi hızlandırın, 
              sorunları daha çabuk çözün ve müşteri memnuniyetini artırın.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-[#FFD100] to-[#00A0D2] hover:from-[#FFD100]/90 hover:to-[#00A0D2]/90 text-black shadow-lg shadow-[#FFD100]/20">
              <Link href="/dashboard/search">
                Arama Motorunu Kullanmaya Başlayın
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
} 