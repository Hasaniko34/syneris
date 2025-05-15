'use client';

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Clock, Users, BarChart, ExternalLink, ChevronRight, Shield, Zap, Gift, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// Animasyon varyantları
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

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

// Yeni 3D animasyon
const float = {
  initial: { y: 0 },
  animate: {
    y: [0, -15, 0],
    transition: { 
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" 
    }
  }
};

// Sistem başlatma bileşeni
const SystemInitializer = () => {
  useEffect(() => {
    // Uygulama başlatıldığında sistem kontrolünü yap
    const initSystem = async () => {
      try {
        const response = await fetch('/api/init');
        if (response.ok) {
          console.log('Sistem başlatma kontrolü tamamlandı');
        }
      } catch (error) {
        console.error('Sistem başlatma kontrolü başarısız:', error);
      }
    };

    initSystem();
  }, []);

  return null; // Görsel bir bileşen değil
};

export default function Home() {
  return (
    <>
      <SystemInitializer />
      <main className="flex min-h-screen flex-col bg-background overflow-hidden">
        {/* Üst Navigasyon */}
        <div className="w-full py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-blue-500/10">
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                <Sparkles className="h-6 w-6" />
                <span>Turkcell Syneris</span>
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button asChild variant="ghost" className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 font-medium">
              <Link href="/auth/signin">
                Turkcell Personeli Girişi
              </Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-yellow-400 to-blue-500 hover:from-yellow-500 hover:to-blue-600 text-white shadow-lg shadow-blue-500/20">
              <Link href="/contact">
                Destek Talebi
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden pt-40">
          {/* Arka plan dekoratif elemanları */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 right-0 h-[600px] bg-[radial-gradient(ellipse_at_center,#00A0D2/35%,transparent_70%)]"></div>
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
              <div className="absolute inset-0 grid grid-cols-12 opacity-30">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="border-r border-blue-500/40 h-full"></div>
                ))}
              </div>
              <div className="absolute inset-0 grid grid-rows-12 opacity-30">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="border-b border-blue-500/40 w-full"></div>
                ))}
              </div>
            </div>
            <motion.div 
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-yellow-400/30 to-blue-500/30 rounded-full blur-3xl"
            ></motion.div>
            <motion.div 
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-l from-blue-500/30 to-yellow-400/30 rounded-full blur-3xl"
            ></motion.div>
          </div>

          <div className="container mx-auto px-4 relative">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <motion.div 
                className="mb-6 relative inline-block"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  className="absolute -top-8 -right-8 text-primary"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-6 w-6" />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-6 -left-6 text-cyan-500"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-5 w-5" />
                </motion.div>
                <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-blue-500 font-heading drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                    Turkcell <br className="hidden sm:inline" /> Çalışanları için Syneris
                  </span>
                </h1>
              </motion.div>
              
              <motion.p 
                className="mx-auto mb-10 max-w-3xl text-lg text-gray-800 md:text-xl font-medium"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6 } }
                }}
              >
                Turkcell'e özel tasarlanmış sistemler eğitim ve adaptasyon platformu.
                <motion.span 
                  className="text-blue-600 font-bold px-1"
                  animate={{ 
                    color: ["#00A0D2", "#FFD100", "#00A0D2"],
                    textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 15px rgba(255, 209, 0, 0.8)", "0 0 0px rgba(0,0,0,0)"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Hibrit çalışma ortamında
                </motion.span> 
                eğitim ihtiyaçlarınıza tam destek.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap justify-center gap-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={scaleIn}>
                  <Button asChild size="lg" className="bg-gradient-to-r from-yellow-400 to-blue-500 hover:from-yellow-500 hover:to-blue-600 font-medium text-white hover-glow hover-lift shadow-lg shadow-blue-500/20 rounded-full px-8">
                    <Link href="/auth/signup" className="group">
                      Turkcell Personeli Girişi
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div variants={scaleIn}>
                  <Button asChild size="lg" variant="outline" className="border-blue-400/40 text-gray-800 hover:bg-blue-500/10 hover-lift backdrop-blur-sm bg-background/70 rounded-full px-8">
                    <Link href="/contact" className="group">
                      Demo İzleyin
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="mt-20 relative mx-auto max-w-5xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                variants={float}
              >
                <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.3)] backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-yellow-400/20 z-10 pointer-events-none rounded-xl"></div>
                  <div className="absolute -left-8 -top-8 w-16 h-16 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-full blur-2xl opacity-70"></div>
                  <div className="absolute -right-8 -bottom-8 w-16 h-16 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full blur-2xl opacity-70"></div>
                  <div 
                    className="w-full h-[400px] bg-background/80 rounded-xl flex items-center justify-center text-gray-800 backdrop-blur-sm"
                  >
                    <div className="text-center">
                      <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-blue-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">Turkcell Syneris Dashboard</span>
                      <p className="text-sm text-gray-100 font-medium mt-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Telekomünikasyon Süreçlerine Özel Eğitim Platformu</p>
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-blue-500/10 to-transparent opacity-30 mix-blend-overlay"></div>
                </div>
                
                {/* 3D efekti için gölgeler */}
                <div className="absolute -bottom-10 left-10 right-10 h-20 bg-primary/5 blur-3xl rounded-full"></div>
                <div className="absolute -bottom-5 -right-5 -z-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
                
                {/* Dekroatif elementler */}
                <div className="absolute -right-12 top-1/3 transform rotate-12">
                  <motion.div 
                    className="h-20 w-4 rounded-full bg-gradient-to-b from-yellow-400 to-transparent"
                    animate={{ height: ["80px", "120px", "80px"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  ></motion.div>
                </div>
                <div className="absolute -left-12 top-1/2 transform -rotate-12">
                  <motion.div 
                    className="h-16 w-3 rounded-full bg-gradient-to-b from-blue-500 to-transparent"
                    animate={{ height: ["60px", "100px", "60px"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  ></motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Markaları gösterir bölüm */}
        <section className="py-20 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/10"></div>
          </div>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="h-px w-40 mx-auto bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mb-8"></div>
              <p className="text-center text-sm font-bold tracking-wider">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-blue-500 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">TURKCELL DEPARTMANLARI SYNERIS'E GÜVENİYOR</span>
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {['Çağrı Merkezi', 'Saha Operasyon', 'Dijital Servisler', 'İnsan Kaynakları', 'Teknoloji Geliştirme'].map((logo, index) => (
                <motion.div 
                  key={logo}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.1 * index, duration: 0.5 }
                    }
                  }}
                  whileHover={{ opacity: 1, scale: 1.05, y: -5 }}
                  className="transition-all duration-300"
                >
                  <div 
                    className="h-14 w-52 bg-blue-500/60 backdrop-blur-md rounded-lg border border-white/30 shadow-xl flex items-center justify-center text-sm font-medium"
                  >
                    <span className="text-white font-bold text-base drop-shadow-[0_3px_3px_rgba(0,0,0,0.9)]">{logo}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 dark:opacity-30">
              <div className="dot-pattern absolute inset-0"></div>
            </div>
            <motion.div 
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/3 left-0 w-full h-96 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 blur-3xl"
            ></motion.div>
          </div>

          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-px w-10 bg-gradient-to-r from-transparent to-blue-500"></div>
                <span className="text-blue-500 font-bold text-sm tracking-wider drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">TURKCELL'E ÖZEL ÇÖZÜMLER</span>
                <div className="h-px w-10 bg-gradient-to-l from-transparent to-blue-500"></div>
              </div>
              <h2 className="tech-title text-4xl md:text-5xl mb-6 font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-blue-500 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
                  Turkcell'e Özel Modüller
                </span>
              </h2>
              <p className="text-gray-800 text-lg mx-auto max-w-2xl font-medium">
                Hibrit çalışma ortamınızda çoklu servis portföyünüzü yönetirken tüm süreçleri takip edebileceğiniz
                Turkcell'e özel olarak hazırlanmış eğitim modülleri.
              </p>
            </motion.div>

            <motion.div 
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeIn}
                whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.3 } }}
                className="rounded-xl p-8 card-glass backdrop-blur-sm hover:border-primary/20 border border-white/20 bg-gradient-to-br from-background/80 to-background/60 shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.2)] transition-all duration-300"
              >
                <div className="rounded-xl bg-gradient-to-br from-yellow-400/30 to-blue-500/30 p-4 w-fit mb-5 border border-white/20 shadow-md">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-blue-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">Servis Tanımlama Süreci Eğitimleri</h3>
                <p className="text-gray-800 mb-4">
                  Bireysel ve kurumsal servis işlemleri adımlarının ekran görüntülü anlatımı ile servis süreçlerinizi hızlandırın.
                </p>
                <Link href="/features/customized-training" className="inline-flex items-center text-blue-500 hover:text-yellow-500 font-medium transition-colors">
                  Daha Fazla Bilgi <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </motion.div>

              <motion.div
                variants={fadeIn}
                whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.3 } }}
                className="rounded-xl p-8 card-glass backdrop-blur-sm hover:border-primary/20 border border-white/20 bg-gradient-to-br from-background/80 to-background/60 shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.2)] transition-all duration-300"
              >
                <div className="rounded-xl bg-gradient-to-br from-blue-400/30 to-blue-600/30 p-4 w-fit mb-5 border border-white/20 shadow-md">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">Dijital Servisler Araç Seti</h3>
                <p className="text-gray-800 mb-4">
                  Turkcell Dijital Kanal Yönetimi ve BiP Destek'te en sık yapılan hatalar ve "nasıl yapılır" rehberleri ile dijital servis süreçlerinizi optimize edin.
                </p>
                <Link href="/features/time-saving" className="inline-flex items-center text-blue-500 hover:text-blue-700 font-medium transition-colors">
                  Daha Fazla Bilgi <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </motion.div>

              <motion.div
                variants={fadeIn}
                whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.3 } }}
                className="rounded-xl p-8 card-glass backdrop-blur-sm hover:border-primary/20 border border-white/20 bg-gradient-to-br from-background/80 to-background/60 shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.2)] transition-all duration-300"
              >
                <div className="rounded-xl bg-gradient-to-br from-yellow-400/30 to-yellow-600/30 p-4 w-fit mb-5 border border-white/20 shadow-md">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">Şebeke ve BTS Simülasyonları</h3>
                <p className="text-gray-800 mb-4">
                  BTS kurulumu, arıza tespiti ve şebeke yönetimi gibi kritik süreçler için interaktif simülasyon ortamı.
                </p>
                <Link href="/features/mobile-access" className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-medium transition-colors">
                  Daha Fazla Bilgi <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </motion.div>

              <motion.div
                variants={fadeIn}
                whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.3 } }}
                className="rounded-xl p-8 card-glass backdrop-blur-sm hover:border-primary/20 border border-white/20 bg-gradient-to-br from-background/80 to-background/60 shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.2)] transition-all duration-300"
              >
                <div className="rounded-xl bg-gradient-to-br from-blue-500/30 to-yellow-500/30 p-4 w-fit mb-5 border border-white/20 shadow-md">
                  <BarChart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-yellow-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">Arama Motoru ile Hızlı Destek</h3>
                <p className="text-gray-800 mb-4">
                  "Numara taşıma", "fatura itirazı" veya "BiP hata kodu 105" gibi Turkcell süreç aramalarını anında yapabilme imkanı.
                </p>
                <Link href="/features/search-engine" className="inline-flex items-center text-blue-500 hover:text-yellow-500 font-medium transition-colors">
                  Daha Fazla Bilgi <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </motion.div>

              <motion.div
                variants={fadeIn}
                whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.3 } }}
                className="rounded-xl p-8 card-glass backdrop-blur-sm hover:border-primary/20 border border-white/20 bg-gradient-to-br from-background/80 to-background/60 shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.2)] transition-all duration-300"
              >
                <div className="rounded-xl bg-gradient-to-br from-yellow-400/30 to-blue-500/30 p-4 w-fit mb-5 border border-white/20 shadow-md">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-blue-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">Synbot – Turkcell İç Kaynaklı Asistan</h3>
                <p className="text-gray-800 mb-4">
                  Turkcell'in iç bilgi işlemlerinin sunduğu yapay zeka destekli sohbet imkanı ile anlık destek.
                </p>
                <Link href="/features/synbot" className="inline-flex items-center text-yellow-500 hover:text-blue-500 font-medium transition-colors">
                  Daha Fazla Bilgi <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </motion.div>

              <motion.div
                variants={fadeIn}
                whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.3 } }}
                className="rounded-xl p-8 card-glass backdrop-blur-sm hover:border-primary/20 border border-white/20 bg-gradient-to-br from-background/80 to-background/60 shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.2)] transition-all duration-300"
              >
                <div className="rounded-xl bg-gradient-to-br from-blue-500/30 to-yellow-500/30 p-4 w-fit mb-5 border border-white/20 shadow-md">
                  <Gift className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-yellow-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">Modül Tamamlama ve Sertifikasyon</h3>
                <p className="text-gray-800 mb-4">
                  Her modülün sonunda bilgi ölçen quiz'ler; başarıyla tamamlanan modüller Turkcell iç "Yetkinlik Portalı"na otomatik kayıt.
                </p>
                <Link href="/features/certification" className="inline-flex items-center text-blue-500 hover:text-yellow-500 font-medium transition-colors">
                  Daha Fazla Bilgi <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-32 bg-gradient-to-b from-blue-500/5 to-transparent relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]">
              <div className="grid-pattern absolute inset-0 opacity-40"></div>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,hsl(#00A0D2/15%),transparent_70%)]"></div>
          </div>
          
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-px w-10 bg-gradient-to-r from-transparent to-blue-500"></div>
                <span className="text-blue-500 font-bold text-sm tracking-wider drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">UYGULAMA ÖRNEKLERİ</span>
                <div className="h-px w-10 bg-gradient-to-l from-transparent to-blue-500"></div>
              </div>
              <h2 className="text-4xl md:text-5xl mb-6 font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-blue-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
                  Turkcell Süreçleri ve Faydaları
                </span>
              </h2>
              <p className="text-gray-800 text-lg mx-auto max-w-2xl font-medium">
                Syneris kullanan Turkcell'in süreçleri nasıl iyileştiği? İşte somut sonuçlar.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div 
                variants={scaleIn}
                whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.2 } }}
                className="relative card-glass backdrop-blur-sm rounded-xl p-10 text-center border border-white/20 bg-gradient-to-br from-background/80 to-background/60 shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.2)] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/30 rounded-xl"></div>
                <div className="relative z-10">
                  <motion.h3 
                    className="text-6xl font-bold text-blue-500 mb-2"
                    animate={{ 
                      textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 20px rgba(0, 160, 210, 0.7)", "0 0 0px rgba(0,0,0,0)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                  >%60</motion.h3>
                  <div className="h-1 w-16 mx-auto mb-3 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
                  <p className="text-gray-800 font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Yeni Numara Tahsis Hata Oranlarında Azalma</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={scaleIn}
                whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.2 } }}
                className="relative card-glass backdrop-blur-sm rounded-xl p-10 text-center border border-white/20 bg-gradient-to-br from-background/80 to-background/60 shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.2)] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/30 rounded-xl"></div>
                <div className="relative z-10">
                  <motion.h3 
                    className="text-6xl font-bold text-yellow-500 mb-2"
                    animate={{ 
                      textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 20px rgba(255, 209, 0, 0.7)", "0 0 0px rgba(0,0,0,0)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, delay: 0.5 }}
                  >%50</motion.h3>
                  <div className="h-1 w-16 mx-auto mb-3 bg-gradient-to-r from-yellow-500 to-transparent rounded-full"></div>
                  <p className="text-gray-800 font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Müşteri Talepleri Çözüm Süresi Gecikme Azalması</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={scaleIn}
                whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.2 } }}
                className="relative card-glass backdrop-blur-sm rounded-xl p-10 text-center border border-white/20 bg-gradient-to-br from-background/80 to-background/60 shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.2)] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/30 rounded-xl"></div>
                <div className="relative z-10">
                  <motion.h3 
                    className="text-6xl font-bold text-blue-400 mb-2"
                    animate={{ 
                      textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 20px rgba(0, 160, 210, 0.7)", "0 0 0px rgba(0,0,0,0)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, delay: 1 }}
                  >%70</motion.h3>
                  <div className="h-1 w-16 mx-auto mb-3 bg-gradient-to-r from-blue-400 to-transparent rounded-full"></div>
                  <p className="text-gray-800 font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">BTS Kurulum ve Arıza Tespiti Hata Oranında Azalma</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={scaleIn}
                whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.2 } }}
                className="relative card-glass backdrop-blur-sm rounded-xl p-10 text-center border border-white/20 bg-gradient-to-br from-background/80 to-background/60 shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.2)] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/30 rounded-xl"></div>
                <div className="relative z-10">
                  <motion.h3 
                    className="text-6xl font-bold text-yellow-400 mb-2"
                    animate={{ 
                      textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 20px rgba(255, 209, 0, 0.7)", "0 0 0px rgba(0,0,0,0)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, delay: 1.5 }}
                  >%50</motion.h3>
                  <div className="h-1 w-16 mx-auto mb-3 bg-gradient-to-r from-yellow-400 to-transparent rounded-full"></div>
                  <p className="text-gray-800 font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Turkcell Dijital Kanal Adaptasyon Süresi Kısalması</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-primary/5 via-transparent to-primary/5"></div>
            {/* Animated gradient */}
            <motion.div 
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  "radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 50%)",
                  "radial-gradient(circle at 75% 75%, hsl(var(--primary)) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 50%, hsl(var(--primary)) 0%, transparent 50%)",
                  "radial-gradient(circle at 25% 75%, hsl(var(--primary)) 0%, transparent 50%)",
                  "radial-gradient(circle at 75% 25%, hsl(var(--primary)) 0%, transparent 50%)",
                  "radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 50%)",
                ]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
          
          <div className="container mx-auto px-4">
            <motion.div 
              className="rounded-3xl backdrop-blur-xl border border-white/20 p-8 md:p-12 lg:p-16 bg-gradient-to-r from-blue-500/10 via-yellow-500/10 to-blue-500/10 shadow-[0_20px_80px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Dekoratif arka plan elemanları */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
              <motion.div
                animate={{
                  x: [0, 100, 0],
                  y: [0, 50, 0],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-40 -right-20 w-80 h-80 bg-gradient-to-br from-blue-500/30 to-yellow-400/30 rounded-full blur-3xl"
              ></motion.div>
              <motion.div
                animate={{
                  x: [0, -100, 0],
                  y: [0, -50, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute -bottom-40 -left-20 w-80 h-80 bg-gradient-to-tr from-yellow-400/30 to-blue-500/30 rounded-full blur-3xl"
              ></motion.div>
              
              <div className="relative z-10 mx-auto max-w-3xl">
                <div className="flex flex-col items-center text-center">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 p-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-xl inline-block"
                  >
                    <Sparkles className="h-6 w-6 text-primary" />
                  </motion.div>
                  <motion.h2 
                    className="mb-6 text-3xl md:text-4xl lg:text-5xl font-bold font-heading"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-blue-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
                      Turkcell Telekomünikasyon Süreçlerinizi Hızlandırın
                    </span>
                  </motion.h2>
                  <motion.p 
                    className="mb-8 text-lg text-gray-100 max-w-2xl font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Syneris ile Turkcell çalışanlarının adaptasyon sürecini hızlandırın, hata oranlarını azaltın ve verimliliği artırın.
                    <span className="text-blue-500 font-medium"> Giriş yaparak Turkcell'e özel eğitim içeriklerine erişin.</span>
                  </motion.p>
                  <motion.div 
                    className="flex flex-wrap gap-4 justify-center"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.div variants={scaleIn}>
                      <Button asChild size="lg" className="bg-gradient-to-r from-yellow-400 to-blue-500 hover:from-yellow-500 hover:to-blue-600 font-medium text-white hover-glow hover-lift shadow-lg shadow-blue-500/20 rounded-full px-8">
                        <Link href="/auth/signup">
                          Turkcell Personeli Girişi
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.div variants={scaleIn}>
                      <Button asChild size="lg" variant="outline" className="border-blue-400/40 text-gray-100 hover:bg-blue-500/10 hover-lift backdrop-blur-sm bg-white/5 rounded-full px-8">
                        <Link href="/contact">
                          Destek Talebi
                        </Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t border-white/10 bg-gradient-to-t from-blue-500/5 to-transparent py-20 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(#00A0D2/10%),transparent_70%)]"></div>
            <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          </div>
          
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-4">
              <div className="col-span-2 md:col-span-1">
                <motion.div 
                  className="flex items-center gap-2 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-yellow-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                    S
                  </div>
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-blue-500">Turkcell Syneris</span>
                </motion.div>
                <motion.p 
                  className="text-gray-700 max-w-xs font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Turkcell çalışanları için sistemler eğitim ve adaptasyon platformu. Hibrit çalışma ortamında telekomünikasyon süreçlerinizi hızlandırın.
                </motion.p>
                <motion.div 
                  className="flex gap-4 mt-6"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    {
                      icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2z"></path></svg>,
                      color: "from-blue-400 to-blue-600"
                    },
                    {
                      icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.072 4.072 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.095 4.095 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.616 11.616 0 0 0 6.29 1.84"></path></svg>,
                      color: "from-sky-400 to-sky-600"
                    },
                    {
                      icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 0 1 1.772 1.153 4.902 4.902 0 0 1 1.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 0 1-1.153 1.772 4.902 4.902 0 0 1-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 0 1-1.772-1.153 4.902 4.902 0 0 1-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 0 1 1.153-1.772A4.902 4.902 0 0 1 5.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.353.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 1.802a3.333 3.333 0 1 0 0 6.666 3.333 3.333 0 0 0 0-6.666zm5.338-3.205a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" clipRule="evenodd"></path></svg>,
                      color: "from-pink-400 to-purple-600"
                    },
                    {
                      icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>,
                      color: "from-gray-400 to-gray-600"
                    }
                  ].map((social, i) => (
                    <motion.a 
                      key={i}
                      href="#" 
                      variants={fadeIn}
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br border border-white/10 shadow-md text-white hover:scale-110 transition-transform"
                      style={{
                        backgroundImage: `linear-gradient(to bottom right, ${social.color.split(' ')[0].replace('from-', 'var(--')} / 50%), ${social.color.split(' ')[1].replace('to-', 'var(--')} / 50%))`
                      }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-blue-500">Turkcell Modülleri</h3>
                <ul className="space-y-3">
                  {[
                    { name: "Çağrı Merkezi", path: "/features/callcenter" },
                    { name: "Saha Operasyon", path: "/features/field" },
                    { name: "Dijital Servisler", path: "/features/digital" },
                    { name: "Şebeke Yönetimi", path: "/features/network" }
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ x: -10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i, duration: 0.3 }}
                    >
                      <Link 
                        href={item.path} 
                        className="text-gray-700 hover:text-primary transition-colors inline-flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mr-2 group-hover:bg-blue-500 transition-colors"></span>
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Yardım</h3>
                <ul className="space-y-3">
                  {[
                    { name: "Eğitim Kılavuzu", path: "/help/training" },
                    { name: "Modül Materyalleri", path: "/help/modules" },
                    { name: "Soru & Cevap", path: "/help/faq" },
                    { name: "İletişim", path: "/help/contact" }
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ x: -10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i, duration: 0.3 }}
                    >
                      <Link 
                        href={item.path} 
                        className="text-gray-700 hover:text-blue-500 transition-colors inline-flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mr-2 group-hover:bg-blue-500 transition-colors"></span>
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-blue-500">İletişim</h3>
                <ul className="space-y-4">
                  <motion.li 
                    className="flex items-start gap-3"
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <div className="p-2 rounded-full bg-yellow-500/10 text-yellow-500">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Turkcell İç Destek Hattı</p>
                      <p className="text-gray-700">+90 212 555 5555</p>
                    </div>
                  </motion.li>
                  
                  <motion.li 
                    className="flex items-start gap-3"
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">E-posta</p>
                      <p className="text-gray-700">syneris@turkcell.com.tr</p>
                    </div>
                  </motion.li>
                  
                  <motion.li 
                    className="flex items-start gap-3"
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <div className="p-2 rounded-full bg-blue-400/10 text-blue-400">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Turkcell Genel Müdürlük</p>
                      <p className="text-gray-700">Maltepe, İstanbul, Türkiye</p>
                    </div>
                  </motion.li>
                </ul>
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-16 pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-700">
                <p>&copy; {new Date().getFullYear()} Turkcell Syneris. Tüm hakları saklıdır.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                  {[
                    { name: "Gizlilik Politikası", path: "/privacy" },
                    { name: "Kullanım Şartları", path: "/terms" },
                    { name: "Turkcell Politikaları", path: "/turkcell-policy" }
                  ].map((item, i) => (
                    <Link 
                      key={i}
                      href={item.path} 
                      className="hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </footer>
      </main>
    </>
  );
}
