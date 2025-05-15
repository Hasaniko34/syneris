"use client";

import React from "react";
import Link from "next/link";
import { motion } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";
import { Clock, Zap, LineChart, Flame, ArrowLeft, ChevronRight, LightbulbIcon, BarChart } from "lucide-react";

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

export default function TimeSavingPage() {
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
                Zaman Tasarrufu Sağlayan Özellikler
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
              <h2 className="text-3xl font-bold mb-6">Turkcell Çalışanları için Verimlilik Araçları</h2>
              <p className="text-lg mb-6 text-muted-foreground">
                Syneris'in zaman tasarrufu sağlayan özellikleri, Turkcell çalışanlarının günlük işlerini
                daha hızlı ve verimli bir şekilde gerçekleştirmesine olanak tanır. Rutin görevleri 
                otomatikleştirerek değerli zamanınızı müşteri ilişkilerine ayırın.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#FFD100]/10 rounded-full">
                    <Clock className="h-6 w-6 text-[#FFD100]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Zaman Tasarrufu</h3>
                    <p className="text-muted-foreground">Günlük rutin görevleri %60'a varan oranda hızlandırın.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#00A0D2]/10 rounded-full">
                    <Zap className="h-6 w-6 text-[#00A0D2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Hızlı İşlem Akışları</h3>
                    <p className="text-muted-foreground">Telekomünikasyon işlemlerini daha az tıklama ile tamamlayın.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#FFD100]/10 rounded-full">
                    <LineChart className="h-6 w-6 text-[#FFD100]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Verimlilik Analizleri</h3>
                    <p className="text-muted-foreground">Kişisel performansınızı takip edin ve iyileştirme alanlarını belirleyin.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#00A0D2]/10 rounded-full">
                    <Flame className="h-6 w-6 text-[#00A0D2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Akıllı Önceliklendirme</h3>
                    <p className="text-muted-foreground">Yapay zeka destekli görev sıralama ile önceliklerinize odaklanın.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-[#FFD100] to-[#00A0D2] hover:from-[#FFD100]/90 hover:to-[#00A0D2]/90 text-black shadow-lg shadow-[#FFD100]/20">
                  <Link href="/dashboard">
                    Zaman Tasarrufu Özelliklerini Keşfedin
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
                  <Clock className="h-20 w-20 text-[#FFD100] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">Turkcell Verimlilik Araçları</h3>
                  <p className="text-sm text-white font-medium mt-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Zamandan tasarruf edin, daha çok iş yapın</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Verimlilik Kazanımları */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Verimlilik Kazanımları
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#FFD100]/30 transition-all duration-300 hover:shadow-lg group">
              <div className="p-3 bg-[#FFD100]/10 rounded-full w-fit mb-4 group-hover:bg-[#FFD100]/20 transition-colors">
                <Clock className="h-6 w-6 text-[#FFD100]" />
              </div>
              <h3 className="text-xl font-bold mb-3">%40 Daha Az İşlem Süresi</h3>
              <p className="text-muted-foreground">
                Form doldurma ve onay süreçlerini otomatikleştirerek müşteri işlemlerini %40 daha hızlı tamamlayın.
              </p>
            </div>

            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#00A0D2]/30 transition-all duration-300 hover:shadow-lg group">
              <div className="p-3 bg-[#00A0D2]/10 rounded-full w-fit mb-4 group-hover:bg-[#00A0D2]/20 transition-colors">
                <Zap className="h-6 w-6 text-[#00A0D2]" />
              </div>
              <h3 className="text-xl font-bold mb-3">%30 Daha Fazla Müşteri</h3>
              <p className="text-muted-foreground">
                İşlemleri daha hızlı tamamlayarak günde %30 daha fazla müşteriye hizmet verebilirsiniz.
              </p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#FFD100]/30 transition-all duration-300 hover:shadow-lg group">
              <div className="p-3 bg-[#FFD100]/10 rounded-full w-fit mb-4 group-hover:bg-[#FFD100]/20 transition-colors">
                <LineChart className="h-6 w-6 text-[#FFD100]" />
              </div>
              <h3 className="text-xl font-bold mb-3">%25 Daha İyi Müşteri Memnuniyeti</h3>
              <p className="text-muted-foreground">
                Hızlı ve hatasız işlem akışları sayesinde müşteri memnuniyeti skorlarında ölçülebilir artış.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Öne Çıkan Verimlilik Özellikleri */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Öne Çıkan Verimlilik Özellikleri
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 flex gap-6">
              <div className="p-3 bg-[#FFD100]/10 rounded-full h-fit">
                <LightbulbIcon className="h-6 w-6 text-[#FFD100]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Akıllı Form Doldurma</h3>
                <p className="text-muted-foreground mb-4">
                  Yapay zeka destekli sistem, müşteri bilgilerini otomatik olarak doldurur ve Turkcell'in farklı sistemleri arasında bilgi transferini sağlar.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FFD100]"></span>
                    <span>IMEI, hat numarası, TC kimlik numarası gibi bilgilerin otomatik tanınması</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FFD100]"></span>
                    <span>Müşteri geçmiş işlem verilerinin hızlı erişimi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FFD100]"></span>
                    <span>Doğrulama hatalarının %95 oranında azalması</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 flex gap-6">
              <div className="p-3 bg-[#00A0D2]/10 rounded-full h-fit">
                <BarChart className="h-6 w-6 text-[#00A0D2]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Tek Tıkla Raporlama</h3>
                <p className="text-muted-foreground mb-4">
                  Günlük, haftalık ve aylık performans raporlarını tek bir tıklamayla oluşturun, düzenleyin ve paylaşın.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00A0D2]"></span>
                    <span>20+ hazır rapor şablonu</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00A0D2]"></span>
                    <span>Kişiselleştirilebilir gösterge panelleri</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00A0D2]"></span>
                    <span>Rapor hazırlama süresinde %80 azalma</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 flex gap-6">
              <div className="p-3 bg-[#FFD100]/10 rounded-full h-fit">
                <Zap className="h-6 w-6 text-[#FFD100]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Servis Süreçleri Otomasyonu</h3>
                <p className="text-muted-foreground mb-4">
                  Hat aktivasyonu, tarife değişikliği ve fatura işlemleri gibi rutin görevleri otomatikleştirerek zaman kazanın.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FFD100]"></span>
                    <span>Tek tıkla hat aktivasyonu</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FFD100]"></span>
                    <span>Toplu işlem yapabilme</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FFD100]"></span>
                    <span>Süreç takibi ve hatırlatmalar</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 flex gap-6">
              <div className="p-3 bg-[#00A0D2]/10 rounded-full h-fit">
                <LineChart className="h-6 w-6 text-[#00A0D2]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Şebeke Performans İzleme</h3>
                <p className="text-muted-foreground mb-4">
                  Baz istasyonları ve şebeke performansını gerçek zamanlı olarak izleyin ve sorunlara hızlı müdahale edin.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00A0D2]"></span>
                    <span>Gerçek zamanlı performans göstergeleri</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00A0D2]"></span>
                    <span>Anomali tespiti ve otomatik uyarılar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00A0D2]"></span>
                    <span>Coğrafi görselleştirme ve haritalama</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Kullanıcı Hikayeleri */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD100] to-[#00A0D2] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Kullanıcı Hikayeleri
          </h2>
          
          <div className="space-y-6">
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#FFD100] to-[#00A0D2] flex items-center justify-center text-white font-bold">
                    MK
                  </div>
                </div>
                <div>
                  <p className="italic text-muted-foreground mb-4">
                    "Turkcell Dijital Kanal Yönetimi ekibinde çalışıyorum ve Syneris'in verimlilik araçları sayesinde günlük işlemlerimi %40 daha hızlı tamamlıyorum. Özellikle BiP destek süreçlerinde müşteri sorunlarını çözme sürem önemli ölçüde kısaldı."
                  </p>
                  <div>
                    <h4 className="font-semibold">Murat Kaya</h4>
                    <p className="text-sm text-muted-foreground">Dijital Kanal Yönetim Uzmanı, Turkcell</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#00A0D2] to-[#FFD100] flex items-center justify-center text-white font-bold">
                    AY
                  </div>
                </div>
                <div>
                  <p className="italic text-muted-foreground mb-4">
                    "Şebeke operasyonları ekibinde, BTS arıza giderme süreçlerinde Syneris'in sunduğu verimlilik araçları kritik önem taşıyor. Otomatik raporlama ve performans izleme özellikleri sayesinde ekip olarak müdahale süremiz %35 kısaldı."
                  </p>
                  <div>
                    <h4 className="font-semibold">Ayşe Yılmaz</h4>
                    <p className="text-sm text-muted-foreground">Şebeke Operasyonları Yöneticisi, Turkcell</p>
                  </div>
                </div>
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
              Turkcell Verimlilik Araçlarını Keşfedin
            </h2>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
              Syneris'in sunduğu verimlilik özellikleri ile günlük işlerinizi hızlandırın, 
              daha az çabayla daha fazla iş çıkarın ve müşteri memnuniyetini artırın.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-[#FFD100] to-[#00A0D2] hover:from-[#FFD100]/90 hover:to-[#00A0D2]/90 text-black shadow-lg shadow-[#FFD100]/20">
              <Link href="/dashboard">
                Verimlilik Araçlarını Kullanmaya Başlayın
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
} 