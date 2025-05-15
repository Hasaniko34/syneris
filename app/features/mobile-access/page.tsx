"use client";

import React from "react";
import Link from "next/link";
import { motion } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";
import { Smartphone, Wifi, Shield, Fingerprint, ArrowLeft, ChevronRight, Laptop, Tablet } from "lucide-react";

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

export default function MobileAccessPage() {
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
                Her Yerden Mobil Erişim
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
              <h2 className="text-3xl font-bold mb-6">Turkcell Sistemlerine Her Yerden Erişin</h2>
              <p className="text-lg mb-6 text-muted-foreground">
                Syneris'in güvenli mobil erişim çözümü, Turkcell çalışanlarının şebeke sistemlerine
                ve verilere ofis dışındayken bile güvenli bir şekilde erişmelerini sağlar. İster evden, 
                ister saha çalışmasında, isterse yolda - işinizi istediğiniz yerden yürütün.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#FFD100]/10 rounded-full">
                    <Smartphone className="h-6 w-6 text-[#FFD100]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Tüm Cihazlardan Erişim</h3>
                    <p className="text-muted-foreground">Mobil telefon, tablet veya dizüstü bilgisayardan güvenli erişim.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#00A0D2]/10 rounded-full">
                    <Wifi className="h-6 w-6 text-[#00A0D2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Çevrimdışı Çalışma</h3>
                    <p className="text-muted-foreground">İnternet bağlantısı olmadığında bile çalışmalarınıza devam edin, sonra senkronize edin.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#FFD100]/10 rounded-full">
                    <Shield className="h-6 w-6 text-[#FFD100]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Kurumsal Güvenlik</h3>
                    <p className="text-muted-foreground">Telekomünikasyon standartlarına uygun uçtan uca şifreleme ve güvenli veri transferi.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#00A0D2]/10 rounded-full">
                    <Fingerprint className="h-6 w-6 text-[#00A0D2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Biyometrik Kimlik Doğrulama</h3>
                    <p className="text-muted-foreground">Parmak izi ve yüz tanıma ile hızlı ve güvenli giriş yapın.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-[#FFD100] to-[#00A0D2] hover:from-[#FFD100]/90 hover:to-[#00A0D2]/90 text-black shadow-lg shadow-[#FFD100]/20">
                  <Link href="/dashboard">
                    Mobil Erişimi Deneyimleyin
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
                  <Smartphone className="h-20 w-20 text-[#FFD100] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">Turkcell Mobil Erişim</h3>
                  <p className="text-sm text-white font-medium mt-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Şebeke sistemleriniz artık cebinizde</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Desteklenen Cihazlar */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Desteklenen Cihazlar
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#FFD100]/30 transition-all duration-300 hover:shadow-lg group">
              <div className="p-3 bg-[#FFD100]/10 rounded-full w-fit mb-4 group-hover:bg-[#FFD100]/20 transition-colors">
                <Smartphone className="h-6 w-6 text-[#FFD100]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Akıllı Telefonlar</h3>
              <p className="text-muted-foreground">
                iOS ve Android platformlarında çalışan tüm modern akıllı telefonlarla tam uyumlu.
              </p>
              <div className="mt-4 text-sm text-muted-foreground">
                <span className="inline-block px-2 py-1 bg-[#FFD100]/10 rounded-md mb-2 mr-2">iPhone</span>
                <span className="inline-block px-2 py-1 bg-[#FFD100]/10 rounded-md mb-2 mr-2">Samsung</span>
                <span className="inline-block px-2 py-1 bg-[#FFD100]/10 rounded-md mb-2 mr-2">Huawei</span>
                <span className="inline-block px-2 py-1 bg-[#FFD100]/10 rounded-md mb-2 mr-2">Xiaomi</span>
              </div>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#00A0D2]/30 transition-all duration-300 hover:shadow-lg group">
              <div className="p-3 bg-[#00A0D2]/10 rounded-full w-fit mb-4 group-hover:bg-[#00A0D2]/20 transition-colors">
                <Tablet className="h-6 w-6 text-[#00A0D2]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Tabletler</h3>
              <p className="text-muted-foreground">
                Daha büyük ekranlı cihazlar için optimize edilmiş arayüz ile tablet deneyimi.
              </p>
              <div className="mt-4 text-sm text-muted-foreground">
                <span className="inline-block px-2 py-1 bg-[#00A0D2]/10 rounded-md mb-2 mr-2">iPad</span>
                <span className="inline-block px-2 py-1 bg-[#00A0D2]/10 rounded-md mb-2 mr-2">iPad Pro</span>
                <span className="inline-block px-2 py-1 bg-[#00A0D2]/10 rounded-md mb-2 mr-2">Galaxy Tab</span>
                <span className="inline-block px-2 py-1 bg-[#00A0D2]/10 rounded-md mb-2 mr-2">Surface</span>
              </div>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#FFD100]/30 transition-all duration-300 hover:shadow-lg group">
              <div className="p-3 bg-[#FFD100]/10 rounded-full w-fit mb-4 group-hover:bg-[#FFD100]/20 transition-colors">
                <Laptop className="h-6 w-6 text-[#FFD100]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Dizüstü Bilgisayarlar</h3>
              <p className="text-muted-foreground">
                Tam işlevsel telekomünikasyon deneyimi için Windows ve macOS platformlarında optimum performans.
              </p>
              <div className="mt-4 text-sm text-muted-foreground">
                <span className="inline-block px-2 py-1 bg-[#FFD100]/10 rounded-md mb-2 mr-2">MacBook</span>
                <span className="inline-block px-2 py-1 bg-[#FFD100]/10 rounded-md mb-2 mr-2">ThinkPad</span>
                <span className="inline-block px-2 py-1 bg-[#FFD100]/10 rounded-md mb-2 mr-2">Dell XPS</span>
                <span className="inline-block px-2 py-1 bg-[#FFD100]/10 rounded-md mb-2 mr-2">Surface Laptop</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Güvenlik Özellikleri */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Kurumsal Seviyede Güvenlik
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <Shield className="h-12 w-12 text-[#FFD100] mb-4" />
              <h3 className="text-xl font-bold mb-3">Uçtan Uca Şifreleme</h3>
              <p className="text-muted-foreground mb-4">
                Tüm veriler, cihaz ile Turkcell sunucuları arasında uçtan uca şifrelenerek iletilir. 
                Bu, verilerin transferi sırasında herhangi bir noktada izinsiz erişime karşı korunmasını sağlar.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FFD100]"></span>
                  <span>256-bit AES şifreleme</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FFD100]"></span>
                  <span>TLS 1.3 protokolü</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FFD100]"></span>
                  <span>Güvenli anahtar değişimi</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <Fingerprint className="h-12 w-12 text-[#00A0D2] mb-4" />
              <h3 className="text-xl font-bold mb-3">Çok Faktörlü Kimlik Doğrulama</h3>
              <p className="text-muted-foreground mb-4">
                Sisteme giriş yapmak için birden fazla doğrulama adımı gereklidir, 
                bu da yetkisiz erişim riskini önemli ölçüde azaltır.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00A0D2]"></span>
                  <span>Parmak izi tarama</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00A0D2]"></span>
                  <span>Yüz tanıma</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00A0D2]"></span>
                  <span>SMS doğrulama kodları</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Kullanım Senaryoları */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Kullanım Senaryoları
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-[#FFD100]">Saha Teknisyenleri</h3>
              <p className="text-muted-foreground">
                Saha teknisyenleri, baz istasyonlarında çalışırken gerçek zamanlı olarak şebeke verilerine erişebilir, arıza kayıtlarını inceleyebilir ve çözüm adımlarını takip edebilirler. Çevrimdışı çalışma özelliği sayesinde sinyal olmayan alanlarda bile işlerini sürdürebilirler.
              </p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-[#00A0D2]">Şebeke Operasyon Ekipleri</h3>
              <p className="text-muted-foreground">
                Şebeke operasyon ekipleri, nerede olurlarsa olsunlar şebeke performans göstergelerini izleyebilir, potansiyel sorunları tespit edebilir ve gerekli müdahaleleri koordine edebilirler. Acil durumlarda hızlı yanıt verme imkanı sunar.
              </p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-[#FFD100]">Müşteri Hizmetleri</h3>
              <p className="text-muted-foreground">
                Müşteri hizmetleri temsilcileri, ofis dışında çalışırken bile müşteri verilerine, servis geçmişine ve çözüm önerilerine erişebilirler. Bu sayede müşteri sorunlarına hızlı ve etkili çözümler sunabilirler.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Çağrı Aksiyonu */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-background/70 backdrop-blur-xl p-8 md:p-12 rounded-xl border border-white/10 text-center">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Turkcell Sistemlerine Her Yerden Erişin
            </h2>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
              Syneris'in güvenli mobil erişim çözümü ile Turkcell şebeke sistemlerine ve verilerine
              istediğiniz yerden, istediğiniz zaman güvenle erişin ve iş verimliliğinizi artırın.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-[#FFD100] to-[#00A0D2] hover:from-[#FFD100]/90 hover:to-[#00A0D2]/90 text-black shadow-lg shadow-[#FFD100]/20">
              <Link href="/dashboard">
                Mobil Erişime Başlayın
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
} 