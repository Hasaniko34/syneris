"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "@/components/motion-wrapper";
import {
  CreditCard,
  Wallet,
  BadgeDollarSign,
  PiggyBank,
  Shield,
  CreditCardIcon,
  Clock,
  FileText,
  Building,
  Users,
  Star,
  CircleCheck,
  AlertCircle,
  Play,
  ChevronRight,
  InfoIcon,
  Bot,
  ListChecks,
  Wifi,
  Smartphone
} from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function BireyselBankacilikPage() {
  // Animasyon varyantları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  // Bireysel ürünler ve hizmetler
  const bireyselUrunler = [
    {
      id: 1,
      title: "Turkcell Platinum Paketler",
      description: "Ayrıcalıklı hizmetler ve özel avantajlarla dolu Platinum paketleri",
      icon: <Star className="h-10 w-10 text-[#ffc72c]" />,
      progress: 90,
      videoUrl: "/dashboard/egitimlerim/platinum-paketler",
      documentUrl: "/dashboard/icerik-kutuphanesi/platinum-paketler"
    },
    {
      id: 2,
      title: "Fiber İnternet",
      description: "Yüksek hızda kesintisiz internet deneyimi sunan fiber altyapı çözümleri",
      icon: <Wifi className="h-10 w-10 text-[#ffc72c]" />,
      progress: 85,
      videoUrl: "/dashboard/egitimlerim/fiber-internet", 
      documentUrl: "/dashboard/icerik-kutuphanesi/fiber-internet"
    },
    {
      id: 3,
      title: "Dijital Servisler",
      description: "TV+, Fizy, Dergilik, BiP gibi dijital platformlarla zengin içerik deneyimi",
      icon: <Smartphone className="h-10 w-10 text-[#ffc72c]" />,
      progress: 92,
      videoUrl: "/dashboard/egitimlerim/dijital-servisler",
      documentUrl: "/dashboard/icerik-kutuphanesi/dijital-servisler"
    },
    {
      id: 4,
      title: "Paycell Kart",
      description: "Nakit taşıma derdi olmadan güvenli alışveriş ve ödeme imkanı sunan kart",
      icon: <CreditCardIcon className="h-10 w-10 text-[#ffc72c]" />,
      progress: 88,
      videoUrl: "/dashboard/egitimlerim/paycell",
      documentUrl: "/dashboard/icerik-kutuphanesi/paycell"
    },
    {
      id: 5,
      title: "Cihaz Sigortaları",
      description: "Akıllı cihazlarınız için kapsamlı koruma ve güvence hizmetleri",
      icon: <Shield className="h-10 w-10 text-[#ffc72c]" />,
      progress: 78,
      videoUrl: "/dashboard/egitimlerim/cihaz-sigortalari",
      documentUrl: "/dashboard/icerik-kutuphanesi/cihaz-sigortalari"
    },
    {
      id: 6,
      title: "Turkcell Güncel Kampanyalar",
      description: "Yeni hat, tarifeler ve cihazlar için avantajlı fırsatlar sunan kampanyalar",
      icon: <BadgeDollarSign className="h-10 w-10 text-[#ffc72c]" />,
      progress: 82,
      videoUrl: "/dashboard/egitimlerim/kampanyalar",
      documentUrl: "/dashboard/icerik-kutuphanesi/kampanyalar"
    }
  ];

  // Sık Karşılaşılan Sorunlar
  const sikSorunlar = [
    {
      id: 1,
      title: "Mobil Hat Taşıma İşlemleri",
      description: "Diğer operatörlerden Turkcell'e numara taşıma sürecinde yaşanan sorunların çözümü ve süreç yönetimi",
      level: "Orta",
      steps: 5,
      time: "15 dk"
    },
    {
      id: 2,
      title: "Dijital Servislere Erişim Sorunları",
      description: "TV+, Fizy, Dergilik, BiP gibi dijital servislere erişimde yaşanan teknik sorunların giderilmesi",
      level: "Kolay",
      steps: 3,
      time: "8 dk"
    },
    {
      id: 3,
      title: "Fatura İtiraz ve İade İşlemleri",
      description: "Yanlış kesilen faturaların itiraz süreçleri, iade işlemleri ve fatura detaylarının açıklanması",
      level: "Zor",
      steps: 7,
      time: "20 dk"
    },
    {
      id: 4,
      title: "İnternet Hızı ve Bağlantı Problemleri",
      description: "Fiber ve mobil internet hız sorunlarının tespiti, çözüm yöntemleri ve teknik destek süreçleri",
      level: "Orta",
      steps: 6,
      time: "18 dk"
    },
    {
      id: 5,
      title: "Paycell Kart Kullanımı ve Sorunları",
      description: "Paycell Kart ile ilgili yaşanan sorunlar, kart kullanımı ve güvenlik önlemleri",
      level: "Orta",
      steps: 4,
      time: "12 dk"
    },
    {
      id: 6,
      title: "Cihaz Sigortası Başvuru ve Hasar Süreçleri",
      description: "Cihaz sigortası kapsamı, başvuru süreçleri ve hasar bildirimlerinin yönetimi",
      level: "Zor",
      steps: 8,
      time: "25 dk"
    }
  ];

  // SSS (Sık Sorulan Sorular) verileri
  const sorular = [
    {
      id: 1,
      question: "Turkcell Platinum avantajlarından nasıl yararlanabilirim?",
      answer: "Turkcell Platinum avantajlarından yararlanmak için öncelikle Platinum üyesi olmanız gerekmektedir. Müşteri hizmetlerini arayarak veya web sitemiz üzerinden başvuru yapabilirsiniz. Üyelik kriterlerini karşılamanız durumunda avantajlardan faydalanmaya başlayabilirsiniz."
    },
    {
      id: 2,
      question: "Fiber internet başvurusu için gerekli belgeler nelerdir?",
      answer: "Fiber internet başvurusu için kimlik belgeniz ve ikametgah belgeniz yeterlidir. Sözleşme imzalama aşamasında bu belgeleri yanınızda bulundurmanız gerekmektedir. Kurulum sırasında teknik ekip tarafından gerekli kontroller yapılacaktır."
    },
    {
      id: 3,
      question: "Dijital servislerime (TV+, Fizy, Dergilik) nasıl erişebilirim?",
      answer: "Dijital servislerinize Turkcell uygulaması üzerinden veya ilgili uygulamaları indirerek giriş yapabilirsiniz. Giriş için Turkcell numaranız ve şifreniz yeterlidir. Uygulamaları App Store veya Google Play'den ücretsiz olarak indirebilirsiniz."
    },
    {
      id: 4,
      question: "Paycell Kart ile hangi işlemleri yapabilirim?",
      answer: "Paycell Kart ile alışverişlerinizde nakit taşıma derdinden kurtulabilir, online alışverişlerinizde güvenle ödeme yapabilir, taksitli alışveriş imkanından yararlanabilirsiniz. Ayrıca Paycell uygulaması üzerinden fatura ödemesi, para transferi gibi işlemlerinizi kolayca gerçekleştirebilirsiniz."
    },
    {
      id: 5,
      question: "Cihaz sigortası kapsamına neler dahildir?",
      answer: "Cihaz sigortası kapsamında; kırılma, çalınma, kayıp ve yanma gibi durumlar teminat altına alınmıştır. Sigorta kapsamında yılda belirli sayıda hasar bildirimi yapılabilmektedir. Detaylı bilgi için müşteri hizmetlerimizi arayabilir veya web sitemizi ziyaret edebilirsiniz."
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto py-6 space-y-6"
    >
      {/* Başlık Bölümü */}
      <motion.div 
        variants={itemVariants} 
        className="flex flex-col md:flex-row justify-between items-start gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold turkcell-title">Bireysel Ürünler ve Hizmetler</h1>
          <p className="text-muted-foreground">
            Turkcell bireysel ürünleri, hizmetleri ve çözümleri
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="turkcell-button-outline">
            <FileText className="mr-2 h-4 w-4" />
            Tüm Dokümanlar
          </Button>
          <Button className="turkcell-button">
            <Play className="mr-2 h-4 w-4" />
            Eğitim Videoları
          </Button>
        </div>
      </motion.div>

      {/* Ana Sekme Bölümü */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="urunler" className="w-full">
          <TabsList className="mb-4 bg-[#e0f0fa]/30">
            <TabsTrigger 
              value="urunler"
              className="data-[state=active]:bg-[#005f9e] data-[state=active]:text-white"
            >
              Ürün ve Hizmetler
            </TabsTrigger>
            <TabsTrigger 
              value="sorunlar"
              className="data-[state=active]:bg-[#005f9e] data-[state=active]:text-white"
            >
              Sık Karşılaşılan Sorunlar
            </TabsTrigger>
            <TabsTrigger 
              value="sss"
              className="data-[state=active]:bg-[#005f9e] data-[state=active]:text-white"
            >
              Sık Sorulan Sorular
            </TabsTrigger>
          </TabsList>

          {/* Ürünler Sekmesi */}
          <TabsContent value="urunler" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bireyselUrunler.map((urun) => (
                <Card key={urun.id} className="turkcell-card">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="p-3 rounded-lg bg-[#e0f0fa]">
                        {urun.icon}
                      </div>
                      <Badge className="turkcell-badge">
                        {urun.progress}% Tamamlandı
                      </Badge>
                    </div>
                    <CardTitle className="mt-4 turkcell-title">{urun.title}</CardTitle>
                    <CardDescription>{urun.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={urun.progress} className="teb-progress" indicatorClassName="teb-progress-indicator" />
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Link href={urun.videoUrl} className="flex-1">
                      <Button variant="outline" className="w-full turkcell-button-outline">
                        <Play className="mr-2 h-4 w-4" />
                        Video Eğitimi
                      </Button>
                    </Link>
                    <Link href={urun.documentUrl} className="flex-1">
                      <Button variant="outline" className="w-full turkcell-button-outline">
                        <FileText className="mr-2 h-4 w-4" />
                        Doküman
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sorunlar Sekmesi */}
          <TabsContent value="sorunlar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sikSorunlar.map((sorun) => (
                <Card key={sorun.id} className="turkcell-card">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={
                        sorun.level === "Kolay" ? "turkcell-badge-success" :
                        sorun.level === "Orta" ? "turkcell-badge-warning" :
                        "turkcell-badge-error"
                      }>
                        {sorun.level}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="turkcell-badge-muted">
                          <Clock className="h-3 w-3 mr-1" />
                          {sorun.time}
                        </Badge>
                        <Badge variant="outline" className="turkcell-badge-muted">
                          <ListChecks className="h-3 w-3 mr-1" />
                          {sorun.steps} Adım
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="turkcell-title">{sorun.title}</CardTitle>
                    <CardDescription>{sorun.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2">
                    <Button className="w-full turkcell-button">
                      Çözüm Adımlarını Gör
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* SSS Sekmesi */}
          <TabsContent value="sss">
            <div className="grid gap-4">
              {sorular.map((soru) => (
                <Card key={soru.id} className="turkcell-card">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <InfoIcon className="h-5 w-5 text-[#005f9e]" />
                      </div>
                      <div>
                        <CardTitle className="text-lg turkcell-title">{soru.question}</CardTitle>
                        <CardDescription className="mt-2">{soru.answer}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Synbot Yardımcı */}
      <motion.div variants={itemVariants}>
        <Card className="turkcell-card bg-gradient-to-r from-[#ffc72c]/5 to-[#ffc72c]/70/5">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 rounded-full bg-[#ffc72c]/10">
              <Bot className="h-6 w-6 text-[#ffc72c]" />
            </div>
            <div className="flex-grow">
              <h3 className="font-medium mb-1">Synbot Yardımcınız</h3>
              <p className="text-sm text-muted-foreground">
                Turkcell bireysel ürünleri, hizmetleri ve kampanyaları hakkında sorularınızı yanıtlamaya hazırım.
              </p>
            </div>
            <Button className="turkcell-button">
              Soru Sor
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
} 