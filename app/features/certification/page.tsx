'use client';

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Award, Gift, GraduationCap, TrendingUp, ArrowLeft, ChevronRight, CheckCircle2, Stars } from "lucide-react";

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

export default function CertificationPage() {
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
                Modül Tamamlama ve Sertifikasyon
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
              <h2 className="text-3xl font-bold mb-6">Turkcell'in Eğitim Sertifikasyon Sistemi</h2>
              <p className="text-lg mb-6 text-muted-foreground">
                Turkcell çalışanları için tasarlanmış kapsamlı sertifikasyon sistemi ile eğitim modüllerini 
                tamamlayın, becerilerinizi belgelendirin ve kariyerinizde ilerleyin. Her tamamlanan eğitim, 
                Turkcell'in iç "Yetkinlik Portalı"na otomatik olarak kaydedilir.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#FFD100]/10 rounded-full">
                    <Gift className="h-6 w-6 text-[#FFD100]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Ödül Sistemi</h3>
                    <p className="text-muted-foreground">Tamamladığınız eğitimler için rozetler, puanlar ve özel ödüller kazanın.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#00A0D2]/10 rounded-full">
                    <GraduationCap className="h-6 w-6 text-[#00A0D2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Öğrenme Değerlendirmesi</h3>
                    <p className="text-muted-foreground">Her modül sonunda interaktif quiz'ler ile öğrenme düzeyinizi ölçün.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#FFD100]/10 rounded-full">
                    <Award className="h-6 w-6 text-[#FFD100]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Resmi Sertifikalar</h3>
                    <p className="text-muted-foreground">Kariyer gelişiminizde kullanabileceğiniz resmi Turkcell sertifikalarına sahip olun.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#00A0D2]/10 rounded-full">
                    <TrendingUp className="h-6 w-6 text-[#00A0D2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Kariyer İlerlemesi</h3>
                    <p className="text-muted-foreground">Kazandığınız sertifikalar performans değerlendirmelerinize ve kariyer gelişiminize katkı sağlar.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-[#FFD100] to-[#00A0D2] hover:from-[#FFD100]/90 hover:to-[#00A0D2]/90 text-black shadow-lg shadow-[#FFD100]/20">
                  <Link href="/dashboard/egitimlerim">
                    Eğitimlerinizi Görüntüleyin
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
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFD100]/20 to-[#00A0D2]/20 animate-pulse"></div>
                    <div className="absolute inset-2 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Award className="h-16 w-16 text-[#FFD100]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">Turkcell Sertifika Programı</h3>
                  <p className="text-sm text-white font-medium mt-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Profesyonel gelişiminizi belgelendirin</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Sertifikasyon Süreci */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Sertifikasyon Süreci
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#FFD100]/30 transition-all duration-300 hover:shadow-lg group relative">
              <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-[#FFD100]/20 flex items-center justify-center">
                <span className="text-xs font-bold text-[#FFD100]">1</span>
              </div>
              <div className="p-3 bg-[#FFD100]/10 rounded-full w-fit mb-4 group-hover:bg-[#FFD100]/20 transition-colors">
                <GraduationCap className="h-6 w-6 text-[#FFD100]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Eğitimi Tamamlayın</h3>
              <p className="text-muted-foreground">
                İlgili eğitim modülünün tüm içeriklerini izleyin ve tamamlayın.
              </p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#00A0D2]/30 transition-all duration-300 hover:shadow-lg group relative">
              <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-[#00A0D2]/20 flex items-center justify-center">
                <span className="text-xs font-bold text-[#00A0D2]">2</span>
              </div>
              <div className="p-3 bg-[#00A0D2]/10 rounded-full w-fit mb-4 group-hover:bg-[#00A0D2]/20 transition-colors">
                <CheckCircle2 className="h-6 w-6 text-[#00A0D2]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quiz'i Geçin</h3>
              <p className="text-muted-foreground">
                Modül sonundaki değerlendirme quiz'inde minimum %70 başarı elde edin.
              </p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#FFD100]/30 transition-all duration-300 hover:shadow-lg group relative">
              <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-[#FFD100]/20 flex items-center justify-center">
                <span className="text-xs font-bold text-[#FFD100]">3</span>
              </div>
              <div className="p-3 bg-[#FFD100]/10 rounded-full w-fit mb-4 group-hover:bg-[#FFD100]/20 transition-colors">
                <Award className="h-6 w-6 text-[#FFD100]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sertifika Alın</h3>
              <p className="text-muted-foreground">
                Başarılı tamamlama sonrası dijital sertifikanız otomatik olarak oluşturulur.
              </p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#00A0D2]/30 transition-all duration-300 hover:shadow-lg group relative">
              <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-[#00A0D2]/20 flex items-center justify-center">
                <span className="text-xs font-bold text-[#00A0D2]">4</span>
              </div>
              <div className="p-3 bg-[#00A0D2]/10 rounded-full w-fit mb-4 group-hover:bg-[#00A0D2]/20 transition-colors">
                <Stars className="h-6 w-6 text-[#00A0D2]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Yetkinlik Portalı</h3>
              <p className="text-muted-foreground">
                Kazanımlarınız Turkcell iç yetkinlik portalına otomatik olarak kaydedilir.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sertifika Tipleri */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Turkcell Sertifika Tipleri
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#FFD100]/20 transition-all duration-300 hover:shadow-lg cursor-pointer">
              <div className="h-14 w-14 bg-gradient-to-br from-[#FFD100]/20 to-[#00A0D2]/20 rounded-full flex items-center justify-center mb-6">
                <Award className="h-7 w-7 text-[#FFD100]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#FFD100]">Temel Modül Sertifikası</h3>
              <p className="text-muted-foreground mb-4">Telekomünikasyon temel eğitimlerini tamamlayanlar için verilen sertifika.</p>
              <div className="text-xs text-muted-foreground flex items-center">
                <span className="inline-block h-2 w-2 rounded-full bg-[#FFD100] mr-2"></span>
                4 Modül içerir
              </div>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#00A0D2]/20 transition-all duration-300 hover:shadow-lg cursor-pointer">
              <div className="h-14 w-14 bg-gradient-to-br from-[#00A0D2]/20 to-[#FFD100]/20 rounded-full flex items-center justify-center mb-6">
                <Award className="h-7 w-7 text-[#00A0D2]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#00A0D2]">Uzmanlık Sertifikası</h3>
              <p className="text-muted-foreground mb-4">Belirli bir telekomünikasyon alanında ileri düzey eğitimleri tamamlayanlar için.</p>
              <div className="text-xs text-muted-foreground flex items-center">
                <span className="inline-block h-2 w-2 rounded-full bg-[#00A0D2] mr-2"></span>
                6 Modül içerir
              </div>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#FFD100]/20 transition-all duration-300 hover:shadow-lg cursor-pointer">
              <div className="h-14 w-14 bg-gradient-to-br from-[#FFD100]/20 to-[#00A0D2]/20 rounded-full flex items-center justify-center mb-6">
                <Award className="h-7 w-7 text-[#FFD100]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#FFD100]">Yönetim Sertifikası</h3>
              <p className="text-muted-foreground mb-4">Yöneticilik ve liderlik eğitimlerini başarıyla tamamlayanlar için.</p>
              <div className="text-xs text-muted-foreground flex items-center">
                <span className="inline-block h-2 w-2 rounded-full bg-[#FFD100] mr-2"></span>
                8 Modül içerir
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Öne Çıkan Eğitimler */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Öne Çıkan Eğitim Modülleri
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-background/70 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden group">
              <div className="h-40 bg-[#FFD100]/10 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#FFD100]/20 flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-[#FFD100]" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">5G Teknolojisi Temelleri</h3>
                <p className="text-sm text-muted-foreground mb-4">5G teknolojisinin temel prensipleri, altyapı gereksinimleri ve uygulama alanları hakkında kapsamlı eğitim.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-[#FFD100]/10 text-[#FFD100] py-1 px-2 rounded-full">8 Saat</span>
                  <Button variant="ghost" size="sm" className="text-[#FFD100] hover:text-[#FFD100]/80 p-0">
                    <Link href="/dashboard/egitimlerim">
                      Detaylar
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden group">
              <div className="h-40 bg-[#00A0D2]/10 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#00A0D2]/20 flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-[#00A0D2]" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">Dijital Servis Yönetimi</h3>
                <p className="text-sm text-muted-foreground mb-4">BiP, fizy, TV+ gibi dijital servislerin teknik altyapısı ve müşteri deneyimi optimizasyonu.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-[#00A0D2]/10 text-[#00A0D2] py-1 px-2 rounded-full">12 Saat</span>
                  <Button variant="ghost" size="sm" className="text-[#00A0D2] hover:text-[#00A0D2]/80 p-0">
                    <Link href="/dashboard/egitimlerim">
                      Detaylar
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden group">
              <div className="h-40 bg-[#FFD100]/10 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#FFD100]/20 flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-[#FFD100]" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">BTS Kurulum ve Bakımı</h3>
                <p className="text-sm text-muted-foreground mb-4">Baz istasyonlarının kurulumu, bakımı ve sorun giderme teknikleri hakkında teknik eğitim.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-[#FFD100]/10 text-[#FFD100] py-1 px-2 rounded-full">16 Saat</span>
                  <Button variant="ghost" size="sm" className="text-[#FFD100] hover:text-[#FFD100]/80 p-0">
                    <Link href="/dashboard/egitimlerim">
                      Detaylar
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-gradient-to-r from-[#FFD100] to-[#00A0D2] hover:from-[#FFD100]/90 hover:to-[#00A0D2]/90 text-black shadow-lg shadow-[#FFD100]/20">
              <Link href="/dashboard/egitimlerim">
                Tüm Eğitimleri Görüntüleyin
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Çağrı Aksiyonu */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-background/70 backdrop-blur-xl p-8 md:p-12 rounded-xl border border-white/10 text-center">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Telekomünikasyon Kariyerinizi İleriye Taşıyın
            </h2>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
              Turkcell'in sertifikalı eğitim programları ile hem mesleki yetkinliklerinizi geliştirin
              hem de kariyerinizde yeni fırsatlar yakalayın. Sertifikalarınız, Turkcell içinde ve 
              telekomünikasyon sektöründe değer taşır.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-[#FFD100] to-[#00A0D2] hover:from-[#FFD100]/90 hover:to-[#00A0D2]/90 text-black shadow-lg shadow-[#FFD100]/20">
              <Link href="/dashboard/egitimlerim">
                Sertifika Yolculuğunuza Başlayın
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
} 