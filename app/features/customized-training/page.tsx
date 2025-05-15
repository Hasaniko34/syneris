"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, Layout, Users, Compass, ArrowLeft, ChevronRight, BookMarked, PenTool } from "lucide-react";

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

export default function CustomizedTrainingPage() {
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
                Turkcell için Özelleştirilmiş Eğitimler
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
              <h2 className="text-3xl font-bold mb-6">Turkcell Telekomünikasyon Eğitimlerinde Uzmanlaşın</h2>
              <p className="text-lg mb-6 text-muted-foreground">
                Turkcell'in özel olarak hazırlanmış telekomünikasyon eğitim programları, çalışanların sektördeki 
                en son gelişmelere ayak uydurmasını sağlar. Departmanınıza ve pozisyonunuza özel kişiselleştirilmiş
                öğrenme deneyimi ile telekomünikasyon kariyerinizde ilerleyin.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#FFD100]/10 rounded-full">
                    <BookOpen className="h-6 w-6 text-[#FFD100]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Departmana Özel İçerik</h3>
                    <p className="text-muted-foreground">Bireysel, Kurumsal, Dijital Servisler, Şebeke Operasyonları ve diğer departmanlara özel eğitim içerikleri.</p>
        </div>
      </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#00A0D2]/10 rounded-full">
                    <Layout className="h-6 w-6 text-[#00A0D2]" />
              </div>
                  <div>
                    <h3 className="font-bold text-xl">Çoklu Format</h3>
                    <p className="text-muted-foreground">Video, metin, interaktif alıştırmalar ve canlı webinarlar içeren çeşitli eğitim formatları.</p>
        </div>
      </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#FFD100]/10 rounded-full">
                    <Compass className="h-6 w-6 text-[#FFD100]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Ölçülebilir İlerleme</h3>
                    <p className="text-muted-foreground">Gerçek zamanlı ilerleme takibi ve bireysel gelişim raporları.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#00A0D2]/10 rounded-full">
                    <Users className="h-6 w-6 text-[#00A0D2]" />
                </div>
                <div>
                    <h3 className="font-bold text-xl">Uzman Eğitimciler</h3>
                    <p className="text-muted-foreground">Telekomünikasyon sektöründe deneyimli profesyoneller tarafından hazırlanan eğitimler.</p>
              </div>
        </div>
      </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-[#FFD100] to-[#00A0D2] hover:from-[#FFD100]/90 hover:to-[#00A0D2]/90 text-black shadow-lg shadow-[#FFD100]/20">
                  <Link href="/dashboard/egitimlerim">
                    Eğitimlerinize Başlayın
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
                  <BookMarked className="h-20 w-20 text-[#FFD100] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">Turkcell Eğitim Merkezi</h3>
                  <p className="text-sm text-white font-medium mt-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Kariyer yolculuğunuzda yanınızdayız</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Eğitim Kategorileri */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Turkcell Telekomünikasyon Eğitim Kategorileri
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#FFD100]/30 transition-all duration-300 hover:shadow-lg group">
              <div className="p-3 bg-[#FFD100]/10 rounded-full w-fit mb-4 group-hover:bg-[#FFD100]/20 transition-colors">
                <span className="text-2xl font-bold text-[#FFD100]">01</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Bireysel ve Kurumsal Müşteri Hizmetleri</h3>
              <p className="text-muted-foreground">
                Bireysel ve kurumsal müşteri ilişkileri yönetimi, servis süreçleri, ürün bilgisi ve satış teknikleri eğitimleri.
              </p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#00A0D2]/30 transition-all duration-300 hover:shadow-lg group">
              <div className="p-3 bg-[#00A0D2]/10 rounded-full w-fit mb-4 group-hover:bg-[#00A0D2]/20 transition-colors">
                <span className="text-2xl font-bold text-[#00A0D2]">02</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Şebeke ve Teknik Operasyonlar</h3>
              <p className="text-muted-foreground">
                Şebeke yönetimi, BTS kurulumu, arıza giderme ve teknik altyapı yönetimi eğitimleri.
              </p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#FFD100]/30 transition-all duration-300 hover:shadow-lg group">
              <div className="p-3 bg-[#FFD100]/10 rounded-full w-fit mb-4 group-hover:bg-[#FFD100]/20 transition-colors">
                <span className="text-2xl font-bold text-[#FFD100]">03</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Dijital Servisler ve İnovasyon</h3>
              <p className="text-muted-foreground">
                Dijital kanal yönetimi, BiP ve diğer dijital ürünler, mobil uygulama geliştirme ve dijital dönüşüm eğitimleri.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Eğitim Yöntemleri */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Turkcell Telekomünikasyon Eğitim Yöntemleri
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center hover:border-[#FFD100]/20 transition-all duration-300 hover:shadow-lg">
              <PenTool className="h-10 w-10 text-[#FFD100] mx-auto mb-4" />
              <h3 className="font-bold mb-2">Dijital Öğrenme</h3>
              <p className="text-sm text-muted-foreground">Kendi hızınızda ilerleyebileceğiniz interaktif telekomünikasyon eğitimleri</p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center hover:border-[#00A0D2]/20 transition-all duration-300 hover:shadow-lg">
              <Users className="h-10 w-10 text-[#00A0D2] mx-auto mb-4" />
              <h3 className="font-bold mb-2">Sınıf Eğitimleri</h3>
              <p className="text-sm text-muted-foreground">Turkcell Akademi eğitmenlerinden yüz yüze telekomünikasyon eğitimleri</p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center hover:border-[#FFD100]/20 transition-all duration-300 hover:shadow-lg">
              <BookOpen className="h-10 w-10 text-[#FFD100] mx-auto mb-4" />
              <h3 className="font-bold mb-2">Şebeke Simülasyonları</h3>
              <p className="text-sm text-muted-foreground">Gerçek telekomünikasyon senaryoları üzerinden pratik yapma imkanı</p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center hover:border-[#00A0D2]/20 transition-all duration-300 hover:shadow-lg">
              <Layout className="h-10 w-10 text-[#00A0D2] mx-auto mb-4" />
              <h3 className="font-bold mb-2">Sertifika Programları</h3>
              <p className="text-sm text-muted-foreground">Telekomünikasyon alanında uzmanlaşmanızı sağlayan sertifikalı eğitim programları</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Başarı Hikayeleri */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Turkcell Çalışanlarının Başarı Hikayeleri
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <div className="mb-4 h-12 w-12 rounded-full bg-gradient-to-r from-[#FFD100] to-[#00A0D2] flex items-center justify-center text-white font-bold">
                MA
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "Turkcell'in özelleştirilmiş müşteri hizmetleri eğitimleri sayesinde dijital kanal yönetimi konusunda kendimi geliştirdim ve 6 ay içinde müşteri memnuniyeti skorlarım %30 arttı."
              </p>
              <div>
                <h4 className="font-bold">Mehmet Aydın</h4>
                <p className="text-sm text-muted-foreground">Dijital Kanallar Müşteri İlişkileri Yöneticisi, İstanbul</p>
              </div>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <div className="mb-4 h-12 w-12 rounded-full bg-gradient-to-r from-[#00A0D2] to-[#FFD100] flex items-center justify-center text-white font-bold">
                AY
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "Şebeke operasyonları eğitimini tamamladıktan sonra arıza tespit ve giderme konusunda çok daha güvenli ve hızlı kararlar vermeye başladım. Arıza çözüm süreçlerim %40 hızlandı."
              </p>
              <div>
                <h4 className="font-bold">Ayşe Yılmaz</h4>
                <p className="text-sm text-muted-foreground">Şebeke Operasyonları Uzmanı, Ankara</p>
              </div>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <div className="mb-4 h-12 w-12 rounded-full bg-gradient-to-r from-[#FFD100] to-[#00A0D2] flex items-center justify-center text-white font-bold">
                CK
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "Dijital servisler eğitim programı, BiP uygulaması özelliklerini daha iyi anlamamı sağladı. Bu sayede müşterilere daha kapsamlı destek sunabiliyorum ve çözüm sürem %35 kısaldı."
              </p>
              <div>
                <h4 className="font-bold">Can Kaya</h4>
                <p className="text-sm text-muted-foreground">Dijital Servisler Destek Uzmanı, İzmir</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Çağrı Aksiyonu */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-background/70 backdrop-blur-xl p-8 md:p-12 rounded-xl border border-white/10 text-center">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Turkcell Telekomünikasyon Kariyerinizde Bir Sonraki Adımı Atın
            </h2>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
              Turkcell'in özelleştirilmiş telekomünikasyon eğitim programları ile mesleki yetkinliklerinizi artırın, 
              kariyerinizde ilerleyin ve telekomünikasyon sektöründe fark yaratın.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-[#FFD100] to-[#00A0D2] hover:from-[#FFD100]/90 hover:to-[#00A0D2]/90 text-black shadow-lg shadow-[#FFD100]/20">
              <Link href="/dashboard/trainings/search">
                Turkcell Telekomünikasyon Eğitimlerine Göz Atın
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
} 