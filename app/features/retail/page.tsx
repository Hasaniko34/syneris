'use client';

import React from "react";
import Link from "next/link";
import { motion } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, CreditCard, Wallet, PiggyBank, User, ArrowUpRight, BarChart4, RefreshCcw, BadgePercent, Clock } from "lucide-react";

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

export default function RetailBankingPage() {
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                Bireysel Bankacılık Modülü
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
              <h2 className="text-3xl font-bold mb-6">TEB Müşterilerine En İyi Hizmeti Sunun</h2>
              <p className="text-lg mb-6 text-muted-foreground">
                Bireysel Bankacılık Modülü, TEB çalışanlarının bireysel müşterilere sunulan tüm ürün ve 
                hizmetleri hakkında kapsamlı bilgi sahibi olmalarını sağlar. Güncel ürün bilgileri, 
                kampanyalar ve işlem adımlarına anında erişim ile müşteri deneyimini iyileştirin.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Müşteri Odaklı Yaklaşım</h3>
                    <p className="text-muted-foreground">Müşteri profillerini anlayarak kişiselleştirilmiş çözümler sunun.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-500/10 rounded-full">
                    <CreditCard className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Kapsamlı Ürün Bilgisi</h3>
                    <p className="text-muted-foreground">Kredi kartları, krediler ve mevduat ürünleri hakkında detaylı bilgilere erişin.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-violet-500/10 rounded-full">
                    <PiggyBank className="h-6 w-6 text-violet-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Tasarruf Çözümleri</h3>
                    <p className="text-muted-foreground">Bireysel müşterilere özel tasarruf ve yatırım ürünleri ile ilgili bilgiler.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-fuchsia-500/10 rounded-full">
                    <BarChart4 className="h-6 w-6 text-fuchsia-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Performans Takibi</h3>
                    <p className="text-muted-foreground">Satış hedeflerinizi ve müşteri memnuniyeti skorlarınızı izleyin.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-600 text-white shadow-lg shadow-primary/20">
                  <Link href="/dashboard/bireysel">
                    Modülü Keşfedin
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary/40 text-foreground hover:bg-primary/5">
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
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-purple-500/20 z-10 pointer-events-none rounded-xl"></div>
              <div className="absolute -left-8 -top-8 w-16 h-16 bg-gradient-to-r from-primary to-purple-500 rounded-full blur-2xl opacity-70"></div>
              <div className="absolute -right-8 -bottom-8 w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full blur-2xl opacity-70"></div>
              <div 
                className="w-full h-full bg-background/80 rounded-xl flex items-center justify-center text-foreground backdrop-blur-sm"
              >
                <div className="text-center p-8">
                  <User className="h-20 w-20 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">TEB Bireysel Bankacılık</h3>
                  <p className="text-sm text-white font-medium mt-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Müşteri ihtiyaçlarına uygun çözümler</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Öne Çıkan Özellikler */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Bireysel Bankacılık Ürünleri
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Kredi Kartları</h3>
              <p className="text-muted-foreground mb-4">
                TEB'in farklı ihtiyaçlara yönelik sunduğu kredi kartı ürünleri, kampanyalar ve avantajlar.
              </p>
              <Link href="#" className="text-primary flex items-center text-sm font-medium hover:underline">
                Detaylı Bilgi
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg group">
              <div className="p-3 bg-purple-500/10 rounded-full w-fit mb-4 group-hover:bg-purple-500/20 transition-colors">
                <Wallet className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Bireysel Krediler</h3>
              <p className="text-muted-foreground mb-4">
                İhtiyaç, konut ve taşıt kredileri başta olmak üzere tüm bireysel kredi ürünleri ve başvuru süreçleri.
              </p>
              <Link href="#" className="text-purple-500 flex items-center text-sm font-medium hover:underline">
                Detaylı Bilgi
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg group">
              <div className="p-3 bg-violet-500/10 rounded-full w-fit mb-4 group-hover:bg-violet-500/20 transition-colors">
                <PiggyBank className="h-6 w-6 text-violet-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Mevduat ve Yatırım</h3>
              <p className="text-muted-foreground mb-4">
                Vadeli ve vadesiz mevduat hesapları, döviz, altın, fon ve bono gibi yatırım ürünleri.
              </p>
              <Link href="#" className="text-violet-500 flex items-center text-sm font-medium hover:underline">
                Detaylı Bilgi
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Satış Taktikleri */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Satış ve Pazarlama Taktikleri
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <div className="mb-4 h-12 w-12 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 flex items-center justify-center">
                <RefreshCcw className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Çapraz Satış Teknikleri</h3>
              <p className="text-muted-foreground mb-4">
                Mevcut müşterilere ek ürün satışı yaparak müşteri bağlılığını ve karlılığı artırma yöntemleri.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  <span>Hesap sahiplerine kredi kartı sunma stratejileri</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  <span>Kredi müşterilerine sigorta ürünleri satışı</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  <span>Mevduat müşterilerine yatırım ürünleri tanıtımı</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <div className="mb-4 h-12 w-12 rounded-full bg-gradient-to-r from-purple-500/20 to-violet-500/20 flex items-center justify-center">
                <BadgePercent className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Kampanya Dönemleri</h3>
              <p className="text-muted-foreground mb-4">
                Yıl içerisindeki özel dönemlerde geçerli olacak kampanya ve avantajların planlanması.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                  <span>Yeni yıl ve bayram dönemlerinde ihtiyaç kredisi fırsatları</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                  <span>Yaz aylarında tatil kredisi kampanyaları</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                  <span>Eğitim dönemi başlangıcında eğitim kredisi fırsatları</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <div className="mb-4 h-12 w-12 rounded-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                <User className="h-6 w-6 text-violet-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Müşteri Segmentasyonu</h3>
              <p className="text-muted-foreground mb-4">
                Farklı müşteri gruplarına yönelik özel yaklaşımlar ve iletişim stratejileri.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500"></span>
                  <span>Gelir düzeyine göre ürün önerisi</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500"></span>
                  <span>Yaş gruplarına özel ürün paketi sunumları</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500"></span>
                  <span>Meslek gruplarına özel kampanya ve avantajlar</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <div className="mb-4 h-12 w-12 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-primary/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-fuchsia-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Takip ve Hatırlatma</h3>
              <p className="text-muted-foreground mb-4">
                Müşteri ilişkilerini sürdürülebilir kılmak için düzenli iletişim ve takip stratejileri.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500"></span>
                  <span>Doğum günü ve özel gün kutlamaları</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500"></span>
                  <span>Vade bitiş tarihlerinde yeni teklifler</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500"></span>
                  <span>Müşteri memnuniyeti anketi ve geri bildirim takibi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Başarı Metrikleri */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Bireysel Bankacılık Başarı Metrikleri
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center">
              <h3 className="text-4xl font-bold text-primary mb-2">+25%</h3>
              <p className="text-muted-foreground">Müşteri Memnuniyeti</p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center">
              <h3 className="text-4xl font-bold text-purple-500 mb-2">+18%</h3>
              <p className="text-muted-foreground">Kredi Kartı Aktivasyonu</p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center">
              <h3 className="text-4xl font-bold text-violet-500 mb-2">+30%</h3>
              <p className="text-muted-foreground">Çapraz Satış Oranı</p>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center">
              <h3 className="text-4xl font-bold text-fuchsia-500 mb-2">-15%</h3>
              <p className="text-muted-foreground">Müşteri Kaybı</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Çağrı Aksiyonu */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-background/70 backdrop-blur-xl p-8 md:p-12 rounded-xl border border-white/10 text-center">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Bireysel Bankacılık Eğitimlerine Başlayın
            </h2>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
              Bireysel bankacılık ürünleri, satış teknikleri ve müşteri ilişkileri konularında 
              kendinizi geliştirin ve kariyerinizde fark yaratın.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-600 text-white shadow-lg shadow-primary/20">
              <Link href="/dashboard/egitimlerim">
                Eğitimlere Başlayın
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
} 