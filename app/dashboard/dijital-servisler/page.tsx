"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "@/components/motion-wrapper";
import {
  CreditCard,
  Smartphone,
  BadgeDollarSign,
  PiggyBank,
  Shield,
  Wallet,
  Clock,
  FileText,
  Lock,
  Fingerprint,
  Users,
  Star,
  CircleCheck,
  AlertCircle,
  Play,
  ChevronRight,
  InfoIcon,
  Globe,
  Zap,
  Wifi,
  Landmark,
  QrCode,
  Bookmark,
  Bot
} from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function DijitalServislerPage() {
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

  // Dijital hizmetler ve ürünler
  const dijitalUrunler = [
    {
      id: 1,
      title: "Turkcell Mobil Uygulama",
      description: "Tüm Turkcell hizmetlerinizi tek bir uygulamadan yönetebileceğiniz kapsamlı mobil uygulama",
      icon: <Smartphone className="h-10 w-10 text-[#ffc72c]" />,
      progress: 95,
      videoUrl: "/dashboard/egitimlerim/turkcell-mobil-uygulama",
      documentUrl: "/dashboard/icerik-kutuphanesi/turkcell-mobil-uygulama"
    },
    {
      id: 2,
      title: "Turkcell Online İşlemler",
      description: "Web tarayıcısı üzerinden fatura ödeme, TL yükleme ve paket yönetimi yapabileceğiniz platform",
      icon: <Globe className="h-10 w-10 text-[#ffc72c]" />,
      progress: 90,
      videoUrl: "/dashboard/egitimlerim/online-islemler",
      documentUrl: "/dashboard/icerik-kutuphanesi/online-islemler"
    },
    {
      id: 3,
      title: "Fast Pay",
      description: "QR kod ile hızlı ve güvenli ödeme yapma, para transferi ve fatura ödeme hizmetleri",
      icon: <QrCode className="h-10 w-10 text-[#ffc72c]" />,
      progress: 88,
      videoUrl: "/dashboard/egitimlerim/fastpay",
      documentUrl: "/dashboard/icerik-kutuphanesi/fastpay"
    },
    {
      id: 4,
      title: "Paycell",
      description: "Dijital cüzdanınız ile ödeme, transfer ve alışveriş yapabileceğiniz finansal platform",
      icon: <Wallet className="h-10 w-10 text-[#ffc72c]" />,
      progress: 85,
      videoUrl: "/dashboard/egitimlerim/paycell",
      documentUrl: "/dashboard/icerik-kutuphanesi/paycell"
    },
    {
      id: 5,
      title: "Dijital Servisler",
      description: "TV+, Fizy, BiP, Dergilik gibi dijital içerik ve iletişim platformları",
      icon: <Zap className="h-10 w-10 text-[#ffc72c]" />,
      progress: 92,
      videoUrl: "/dashboard/egitimlerim/dijital-servisler",
      documentUrl: "/dashboard/icerik-kutuphanesi/dijital-servisler"
    },
    {
      id: 6,
      title: "Güvenlik Hizmetleri",
      description: "Lifebox yedekleme, antivirüs ve dijital güvenlik çözümleri",
      icon: <Shield className="h-10 w-10 text-[#ffc72c]" />,
      progress: 80,
      videoUrl: "/dashboard/egitimlerim/guvenlik-hizmetleri",
      documentUrl: "/dashboard/icerik-kutuphanesi/guvenlik-hizmetleri"
    }
  ];

  // Sık karşılaşılan sorunlar
  const sikSorunlar = [
    {
      id: 1,
      title: "Mobil Uygulama Aktivasyon Sorunları",
      description: "Turkcell mobil uygulama kurulumunda ve aktivasyonunda yaşanan sorunlar ve çözümleri",
      level: "Kolay",
      steps: 4,
      time: "10 dk"
    },
    {
      id: 2,
      title: "Dijital Servis Giriş Sorunları",
      description: "TV+, Fizy, BiP gibi dijital servislere giriş ve erişim sorunlarının çözümü",
      level: "Kolay",
      steps: 3,
      time: "5 dk"
    },
    {
      id: 3,
      title: "Paycell Ödeme Sorunları",
      description: "Paycell ile ödeme yaparken yaşanan sorunlar ve çözüm adımları",
      level: "Orta",
      steps: 5,
      time: "8 dk"
    },
    {
      id: 4,
      title: "Dijital Kimlik Doğrulama",
      description: "Online işlemlerde kimlik doğrulama ve güvenlik adımları",
      level: "Zor",
      steps: 7,
      time: "15 dk"
    }
  ];

  // Sık sorulan sorular
  const sorular = [
    {
      id: 1,
      question: "Turkcell mobil uygulamasını hangi cihazlara yükleyebilirim?",
      answer: "Turkcell mobil uygulaması iOS ve Android işletim sistemine sahip tüm akıllı telefonlara ve tabletlere yüklenebilir. App Store ve Google Play Store'dan ücretsiz olarak indirilebilir."
    },
    {
      id: 2,
      question: "Mobil uygulama ve web sitesi arasındaki işlem farkları nelerdir?",
      answer: "Mobil uygulama daha kapsamlı özellikler sunarken, web sitesi temel işlemler için tasarlanmıştır. Mobil uygulamada biometrik doğrulama, anlık bildirimler ve offline özellikler kullanılabilir."
    },
    {
      id: 3,
      question: "Hangi dijital servislere mobil uygulamadan erişebilirim?",
      answer: "Mobil uygulama üzerinden TV+, Fizy, BiP, Dergilik, Lifebox gibi dijital servislere, Paycell finansal hizmetlerine ve Platinum ayrıcalıklarına erişebilirsiniz. Ayrıca fatura ödeme, TL yükleme ve paket yönetimi gibi işlemleri de gerçekleştirebilirsiniz."
    },
    {
      id: 4,
      question: "Fast Pay ve Paycell arasındaki fark nedir?",
      answer: "Fast Pay hızlı QR ödeme ve para transferi için tasarlanmış bir çözümken, Paycell daha kapsamlı bir dijital cüzdan ve finansal platform olarak hizmet vermektedir. Paycell ile alışveriş, fatura ödeme, para transferi gibi tüm finansal işlemleri gerçekleştirebilirsiniz."
    },
    {
      id: 5,
      question: "Güvenlik için hangi önlemler alınmıştır?",
      answer: "Tüm dijital işlemleriniz için gelişmiş şifreleme, biometrik doğrulama, SMS doğrulama ve güçlü parola politikaları uygulanmaktadır. Ayrıca Lifebox ile verileriniz güvenle yedeklenir ve antivirüs hizmetleriyle cihazınız koruma altına alınır."
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Başlık Bölümü */}
      <motion.div 
        variants={itemVariants} 
        className="flex flex-col md:flex-row justify-between items-start gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#005f9e]">Dijital Servisler</h1>
          <p className="text-muted-foreground mt-1">
            Turkcell dijital hizmetleri ve uygulamaları
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/icerik-kutuphanesi">
            <Button variant="outline" className="border-[#005f9e] text-[#005f9e]">
              <FileText className="mr-2 h-4 w-4" />
              Tüm Dokümanlar
            </Button>
          </Link>
          <Link href="/dashboard/egitimlerim">
            <Button className="bg-[#005f9e]">
              <Play className="mr-2 h-4 w-4" />
              Eğitim Videoları
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Ana Sekme Bölümü */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="urunler" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="urunler">Ürün ve Hizmetler</TabsTrigger>
            <TabsTrigger value="sorunlar">Sık Karşılaşılan Sorunlar</TabsTrigger>
            <TabsTrigger value="sss">Sık Sorulan Sorular</TabsTrigger>
          </TabsList>

          {/* Ürünler Sekmesi */}
          <TabsContent value="urunler" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dijitalUrunler.map((urun) => (
                <Card key={urun.id} className="border-[#005f9e]/20 hover:border-[#005f9e]/40 hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="p-3 rounded-lg bg-[#e0f0fa]">
                        {urun.icon}
                      </div>
                      <Badge variant="outline" className="text-[#005f9e] border-[#005f9e]/40">
                        {urun.progress}% Tamamlandı
                      </Badge>
                    </div>
                    <CardTitle className="mt-4">{urun.title}</CardTitle>
                    <CardDescription>{urun.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={urun.progress} className="h-1 bg-[#e0f0fa]" indicatorClassName="bg-[#005f9e]" />
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Link href={urun.videoUrl} className="flex-1">
                      <Button variant="outline" className="w-full text-[#005f9e] border-[#005f9e]/40 hover:bg-[#e0f0fa]">
                        <Play className="mr-2 h-4 w-4" />
                        Video Eğitimi
                      </Button>
                    </Link>
                    <Link href={urun.documentUrl} className="flex-1">
                      <Button variant="outline" className="w-full text-[#005f9e] border-[#005f9e]/40 hover:bg-[#e0f0fa]">
                        <FileText className="mr-2 h-4 w-4" />
                        Doküman
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sık Karşılaşılan Sorunlar Sekmesi */}
          <TabsContent value="sorunlar" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sikSorunlar.map((sorun) => (
                <Card key={sorun.id} className="border-[#005f9e]/20 hover:border-[#005f9e]/40 hover:shadow-md transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-medium">{sorun.title}</CardTitle>
                      <Badge 
                        className={
                          sorun.level === "Kolay" 
                            ? "bg-emerald-100 text-emerald-800" 
                            : sorun.level === "Orta" 
                            ? "bg-amber-100 text-amber-800" 
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {sorun.level}
                      </Badge>
                    </div>
                    <CardDescription>{sorun.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center">
                        <CircleCheck className="h-5 w-5 text-[#005f9e] mr-2" />
                        <span className="text-sm">{sorun.steps} adım</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-[#005f9e] mr-2" />
                        <span className="text-sm">{sorun.time}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-[#005f9e]">
                      Çözüm Rehberini Görüntüle
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* SSS Sekmesi */}
          <TabsContent value="sss" className="space-y-4">
            <Card className="border-[#005f9e]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <InfoIcon className="h-5 w-5 text-[#005f9e]" />
                  Sık Sorulan Sorular
                </CardTitle>
                <CardDescription>
                  Dijital servisler ve uygulamalarla ilgili en çok sorulan sorular ve yanıtları
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sorular.map((soru) => (
                  <div key={soru.id} className="border border-[#005f9e]/20 rounded-lg p-4 hover:bg-[#e0f0fa]/30 transition-colors">
                    <h3 className="text-lg font-medium text-[#005f9e] flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" /> {soru.question}
                    </h3>
                    <p className="mt-2 text-muted-foreground">{soru.answer}</p>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full text-[#005f9e] border-[#005f9e]/40 hover:bg-[#e0f0fa]">
                  Tüm Soruları Görüntüle <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Son Güncellenen İçerikler */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-[#005f9e]">Son Güncellenen İçerikler</h2>
          <Button variant="ghost" className="text-[#005f9e]">
            Tümünü Görüntüle <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {[
            {
              title: "Turkcell Mobil Uygulamasında Yeni Özellikler",
              date: "1 saat önce"
            },
            {
              title: "Dijital Onboarding Süreçleri Güncellendi",
              date: "Dün"
            },
            {
              title: "Fast Sistemi Entegrasyonu Tamamlandı",
              date: "3 gün önce"
            }
          ].map((item, index) => (
            <Card key={index} className="border-[#005f9e]/20 hover:border-[#005f9e]/40 hover:shadow-sm transition-all">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-[#e0f0fa]">
                    <FileText className="h-5 w-5 text-[#005f9e]" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">Güncelleme: {item.date}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-[#005f9e]">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Dijital Dönüşüm */}
      <motion.div variants={itemVariants}>
        <Card className="border-[#005f9e]/20 bg-gradient-to-r from-[#e0f0fa] to-white">
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-2/3">
              <h3 className="text-xl font-bold text-[#ffc72c] mb-2">Dijital Servisler Dönüşüm Programı</h3>
              <p className="text-muted-foreground mb-4">
                Müşteri deneyimini merkeze alan dijital dönüşüm stratejimiz, iletişim ve dijital servis işlemlerini daha hızlı, güvenli ve 
                kolay hale getiriyor. Yapay zeka destekli asistanlar, kişiselleştirilmiş servis önerileri ve güçlü güvenlik 
                altyapısıyla dijital servislerin geleceğini şekillendiriyoruz.
              </p>
              <Button className="bg-[#ffc72c] text-black hover:bg-[#ffc72c]/90">
                Dijital Dönüşüm Yol Haritasını İncele
              </Button>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 rounded-full bg-[#005f9e]/10 animate-ping"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-4 rounded-full bg-[#005f9e] text-white">
                    <Smartphone className="h-10 w-10" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
} 