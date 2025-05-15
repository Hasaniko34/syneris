'use client';

import React from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Icons } from "@/components/icons";
import { motion } from "framer-motion";
import { Zap, Cpu } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-background antialiased">
      {/* Sol taraf - Form alanı */}
      <div className="flex flex-col min-h-screen w-full md:w-1/2 relative">
        {/* Arkaplan desenleri ve efektleri */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_50%_at_50%_40%,hsl(var(--primary)/0.12),transparent)]"></div>
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/10 to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/10 to-transparent"></div>
          <div className="absolute inset-0 grid grid-cols-6 -z-10 opacity-[0.15]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-r border-primary/5 h-full"></div>
            ))}
          </div>
          <div className="absolute inset-0 grid grid-rows-6 -z-10 opacity-[0.15]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-b border-primary/5 w-full"></div>
            ))}
          </div>
        </div>
        
        {/* Animasyonlu arka plan */}
        <motion.div 
          className="absolute top-1/4 -left-20 -z-10 w-64 h-64 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-full blur-3xl opacity-40"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/4 -right-20 -z-10 w-64 h-64 bg-gradient-to-l from-primary/30 to-cyan-500/30 rounded-full blur-3xl opacity-40"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        ></motion.div>

        {/* Üst navigasyon ve tema değiştirici */}
        <header className="px-4 py-6 sm:px-6 md:px-8 flex justify-between items-center relative z-10">
          <div className="flex items-center gap-2">
            <div className="relative p-1.5 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm shadow-lg">
              <Icons.logo className="h-7 w-7 text-primary" />
            </div>
            <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">Syneris</span>
          </div>
          <ThemeSwitcher />
        </header>

        {/* Form içeriği */}
        <motion.main 
          className="flex-1 flex flex-col justify-center items-center px-4 py-8 sm:px-6 md:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full max-w-[420px] mx-auto">
            <motion.div variants={itemVariants} className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2 font-heading">
                Syneris Platformu
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Kuruluşunuzun eğitim ve geliştirme süreçlerini dijital ortamda yönetin.
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="bg-card rounded-xl shadow-lg border border-border/50 backdrop-blur-sm overflow-hidden"
            >
              {children}
            </motion.div>
          </div>
        </motion.main>

        {/* Footer */}
        <footer className="py-5 px-4 sm:px-6 md:px-8 text-center text-xs text-foreground/60 relative z-10">
          <p>&copy; {currentYear} Syneris. Tüm hakları saklıdır.</p>
        </footer>
      </div>

      {/* Sağ taraf - Görsel ve açıklama alanı */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-primary/5 via-background to-purple-500/5 relative overflow-hidden">
        {/* Ana arka plan */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10"></div>
        
        {/* Futuristik grid ve dekoratif elemanlar */}
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
          <div className="absolute inset-0 grid grid-cols-12 opacity-25">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-primary/30 h-full"></div>
            ))}
          </div>
          <div className="absolute inset-0 grid grid-rows-12 opacity-25">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-b border-primary/30 w-full"></div>
            ))}
          </div>
        </div>

        {/* Hareketli görsel elemanlar */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        ></motion.div>
        
        {/* Tanıtım içeriği */}
        <div className="relative h-full flex flex-col justify-center items-center px-8 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="backdrop-blur-xl bg-background/30 rounded-xl border border-white/10 p-8 max-w-xl w-full shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 pointer-events-none"></div>
            
            <motion.div 
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="h-10 w-1.5 bg-gradient-to-b from-primary to-purple-500 rounded-full"></div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
                Güvenlik ve Yenilik Bir Arada
              </h2>
            </motion.div>
            
            <motion.p 
              className="text-foreground/90 mb-8 leading-relaxed font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Syneris, kurumunuzun eğitim süreçlerini dijital dünyada güvenle yönetmenizi sağlar. 
              Modern arayüz ve gelişmiş güvenlik özellikleriyle, çalışanlarınızın gelişimini 
              daha etkili hale getirin.
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              transition={{ delayChildren: 1.1 }}
            >
              <motion.div 
                variants={itemVariants}
                className="space-y-2 p-4 bg-gradient-to-br from-primary/10 to-transparent rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-2">
                  <Icons.shield className="h-5 w-5 text-primary" />
                  <h3 className="text-foreground font-semibold">Güvenli Erişim</h3>
                </div>
                <p className="text-sm text-foreground/70">
                  Çok faktörlü kimlik doğrulama ve gelişmiş veri şifreleme
                </p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="space-y-2 p-4 bg-gradient-to-br from-purple-500/10 to-transparent rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-2">
                  <Icons.sparkles className="h-5 w-5 text-purple-500" />
                  <h3 className="text-foreground font-semibold">Özelleştirilebilir</h3>
                </div>
                <p className="text-sm text-foreground/70">
                  Kurumunuzun ihtiyaçlarına göre özelleştirilebilir modüller
                </p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="space-y-2 p-4 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-cyan-500" />
                  <h3 className="text-foreground font-semibold">Hızlı Entegrasyon</h3>
                </div>
                <p className="text-sm text-foreground/70">
                  Mevcut HR sistemlerinizle hızlı ve kolay entegrasyon
                </p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="space-y-2 p-4 bg-gradient-to-br from-amber-500/10 to-transparent rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-amber-500" />
                  <h3 className="text-foreground font-semibold">Yapay Zeka</h3>
                </div>
                <p className="text-sm text-foreground/70">
                  Yapay zeka destekli öğrenme yolları ve kişiselleştirilmiş içerik
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 