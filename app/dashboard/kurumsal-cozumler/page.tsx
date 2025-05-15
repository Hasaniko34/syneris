"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "@/components/motion-wrapper";
import {
  CreditCard,
  FileSpreadsheet,
  BadgeDollarSign,
  PiggyBank,
  Shield,
  Building2,
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
  Banknote,
  TrendingUp,
  Landmark,
  SendToBack,
  Briefcase,
  Bot,
  Smartphone,
  Wifi,
  Cloud,
  Car
} from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function KurumsalCozumlerPage() {
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

  // Kurumsal ürünler ve hizmetler
  const kurumsalUrunler = [
    {
      id: 1,
      title: "Turkcell Kurumsal Ses Paketleri",
      description: "İşletmenizin iletişim ihtiyaçları için avantajlı dakika ve internet içeren kurumsal hat paketleri",
      icon: <Smartphone className="h-10 w-10 text-[#ffc72c]" />,
      progress: 85,
      videoUrl: "/dashboard/egitimlerim/kurumsal-ses-paketleri",
      documentUrl: "/dashboard/icerik-kutuphanesi/kurumsal-ses-paketleri"
    },
    {
      id: 2,
      title: "Kurumsal İnternet Çözümleri",
      description: "İşletmenizin boyutuna ve ihtiyaçlarına göre özelleştirilebilen yüksek hızlı internet çözümleri",
      icon: <Wifi className="h-10 w-10 text-[#ffc72c]" />,
      progress: 90,
      videoUrl: "/dashboard/egitimlerim/kurumsal-internet", 
      documentUrl: "/dashboard/icerik-kutuphanesi/kurumsal-internet"
    },
    {
      id: 3,
      title: "Dijital İş Süreçleri",
      description: "İşletmenizin dijital dönüşümünü hızlandıracak bulut tabanlı çözümler ve uygulamalar",
      icon: <Cloud className="h-10 w-10 text-[#ffc72c]" />,
      progress: 92,
      videoUrl: "/dashboard/egitimlerim/dijital-is-surecleri",
      documentUrl: "/dashboard/icerik-kutuphanesi/dijital-is-surecleri"
    },
    {
      id: 4,
      title: "Kurumsal Filo Yönetimi",
      description: "Araç filonuzu gerçek zamanlı takip edebileceğiniz ve yönetebileceğiniz IoT tabanlı çözümler",
      icon: <Car className="h-10 w-10 text-[#ffc72c]" />,
      progress: 78,
      videoUrl: "/dashboard/egitimlerim/filo-yonetimi",
      documentUrl: "/dashboard/icerik-kutuphanesi/filo-yonetimi"
    },
    {
      id: 5,
      title: "Turkcell İş Ortağı Çözümleri",
      description: "Kurumsal müşteriler için özel geliştirilen entegre iletişim ve iş yönetimi platformu",
      icon: <Users className="h-10 w-10 text-[#ffc72c]" />,
      progress: 80,
      videoUrl: "/dashboard/egitimlerim/is-ortagi-cozumleri",
      documentUrl: "/dashboard/icerik-kutuphanesi/is-ortagi-cozumleri"
    },
    {
      id: 6,
      title: "Siber Güvenlik Hizmetleri",
      description: "İşletmenizi siber tehditlere karşı koruyacak gelişmiş güvenlik çözümleri ve danışmanlık hizmetleri",
      icon: <Shield className="h-10 w-10 text-[#ffc72c]" />,
      progress: 75,
      videoUrl: "/dashboard/egitimlerim/siber-guvenlik",
      documentUrl: "/dashboard/icerik-kutuphanesi/siber-guvenlik"
    }
  ];

  // Sık Karşılaşılan Sorunlar
  const sikSorunlar = [
    {
      id: 1,
      title: "Kurumsal Hat Yönetimi",
      description: "Birden fazla kurumsal hattın tek bir panel üzerinden yönetilmesi ve yetkilendirme süreçleri",
      level: "Orta",
      steps: 5,
      time: "15 dk"
    },
    {
      id: 2,
      title: "Kurumsal Fatura Yönetimi",
      description: "Farklı departmanlara ait hatların faturalarının ayrı ayrı raporlanması ve maliyet analizi",
      level: "Kolay",
      steps: 3,
      time: "10 dk"
    },
    {
      id: 3,
      title: "Kurumsal Performans Analizi",
      description: "İşletmenizin dijital dönüşüm ve iletişim performansının detaylı analizi",
      level: "Zor",
      steps: 8,
      time: "30 dk"
    },
    {
      id: 4,
      title: "Sektörel Destek Paketleri",
      description: "Sektöre özel hazırlanmış destek paketi başvuru ve onay süreçleri",
      level: "Kolay",
      steps: 5,
      time: "12 dk"
    }
  ];

  // SSS (Sık Sorulan Sorular) verileri
  const sikSorulanSorular = [
    {
      id: 1,
      question: "Kurumsal hat paketleri için gerekli belgeler nelerdir?",
      answer: "Kurumsal hat başvurusu için şirket vergi levhası, imza sirküleri, ticaret sicil gazetesi ve yetkili kişinin kimlik fotokopisi gereklidir. 5 ve üzeri hat talebinde ek evraklar istenebilir."
    },
    {
      id: 2,
      question: "Kurumsal internet altyapısı için hangi hız seçenekleri mevcuttur?",
      answer: "Fiber altyapısı olan bölgelerde 1000 Mbps'e kadar, VDSL ile 100 Mbps'e kadar, ve 5G ile 2000 Mbps'e kadar hız seçenekleri sunulmaktadır. Ayrıca özel hat ve Metro Ethernet çözümleri de mevcuttur."
    },
    {
      id: 3,
      question: "Turkcell Dijital İş Paketleri kapsamında hangi hizmetler sunuluyor?",
      answer: "Dijital İş Paketleri kapsamında e-Fatura, e-Arşiv, e-Defter, Dijital Depo, İş Telefonu, Dijital Şirket ve Dijital Ofis gibi çözümler tek paket altında sunulmaktadır. Paketler firma ihtiyaçlarına göre özelleştirilebilir."
    },
    {
      id: 4,
      question: "Filo Yönetim Sistemi nasıl kurulur ve kullanılır?",
      answer: "Filo Yönetim Sistemi kurulumu için araçlara IoT cihazları takılır ve sistem aktive edilir. Web portalı veya mobil uygulama üzerinden araçların konum, yakıt tüketimi, sürüş davranışları gibi veriler izlenebilir."
    },
    {
      id: 5,
      question: "Siber Güvenlik hizmetleri neleri kapsar?",
      answer: "Siber Güvenlik hizmetleri DDoS koruması, güvenlik duvarı, uygulama güvenliği, e-posta güvenliği, veri sızıntısı önleme ve 7/24 siber olay müdahale merkezi hizmetlerini kapsar. Ayrıca güvenlik danışmanlığı ve eğitim hizmetleri de sunulmaktadır."
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
          <h1 className="text-3xl font-bold tracking-tight text-[#ffc72c]">Kurumsal Çözümler</h1>
          <p className="text-muted-foreground">
            Turkcell kurumsal ürünleri, hizmetleri ve çözümleri
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/icerik-kutuphanesi">
            <Button variant="outline" className="border-[#ffc72c] text-[#005f9e]">
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
              {kurumsalUrunler.map((urun) => (
                <Card key={urun.id} className="border-[#ffc72c]/20 hover:border-[#ffc72c]/40 hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="p-3 rounded-lg bg-[#ffc72c]/10">
                        {urun.icon}
                      </div>
                      <Badge variant="outline" className="text-[#005f9e] border-[#ffc72c]/40">
                        {urun.progress}% Tamamlandı
                      </Badge>
                    </div>
                    <CardTitle className="mt-4">{urun.title}</CardTitle>
                    <CardDescription>{urun.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={urun.progress} className="h-1 bg-[#ffc72c]/10" indicatorClassName="bg-[#005f9e]" />
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Link href={urun.videoUrl} className="flex-1">
                      <Button variant="outline" className="w-full text-[#005f9e] border-[#ffc72c]/40 hover:bg-[#ffc72c]/10">
                        <Play className="mr-2 h-4 w-4" />
                        Video Eğitimi
                      </Button>
                    </Link>
                    <Link href={urun.documentUrl} className="flex-1">
                      <Button variant="outline" className="w-full text-[#005f9e] border-[#ffc72c]/40 hover:bg-[#ffc72c]/10">
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
                <Card key={sorun.id} className="border-[#ffc72c]/20 hover:border-[#ffc72c]/40 hover:shadow-md transition-all">
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
            <Card className="border-[#ffc72c]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <InfoIcon className="h-5 w-5 text-[#ffc72c]" />
                  Sık Sorulan Sorular
                </CardTitle>
                <CardDescription>
                  Turkcell kurumsal çözümler ve hizmetlerle ilgili en çok sorulan sorular ve yanıtları
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sikSorulanSorular.map((soru) => (
                  <div key={soru.id} className="border border-[#ffc72c]/20 rounded-lg p-4 hover:bg-[#ffc72c]/10 transition-colors">
                    <h3 className="text-lg font-medium text-[#ffc72c] flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" /> {soru.question}
                    </h3>
                    <p className="mt-2 text-muted-foreground">{soru.answer}</p>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full text-[#005f9e] border-[#ffc72c]/40 hover:bg-[#ffc72c]/10">
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
          <h2 className="text-2xl font-bold tracking-tight text-[#ffc72c]">Son Güncellenen İçerikler</h2>
          <Button variant="ghost" className="text-[#ffc72c]">
            Tümünü Görüntüle <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {[
            {
              title: "Yeni Kurumsal Fiber Altyapı Hizmetleri",
              date: "2 saat önce"
            },
            {
              title: "Kurumsal Müşteri Memnuniyet Anketi Sonuçları",
              date: "Dün"
            },
            {
              title: "Dijital İş Yönetimi Platformu Güncellemesi",
              date: "2 gün önce"
            }
          ].map((item, index) => (
            <Card key={index} className="border-[#ffc72c]/20 hover:border-[#ffc72c]/40 hover:shadow-sm transition-all">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-[#ffc72c]/10">
                    <FileText className="h-5 w-5 text-[#ffc72c]" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">Güncelleme: {item.date}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-[#ffc72c]">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* KOBİ Danışman */}
      <motion.div variants={itemVariants}>
        <Card className="border-[#ffc72c]/20 bg-gradient-to-r from-[#ffc72c]/10 to-white">
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-2/3">
              <h3 className="text-xl font-bold text-[#ffc72c] mb-2">Turkcell Kurumsal Danışmanlık</h3>
              <p className="text-muted-foreground mb-4">
                İşletmenizin dijital dönüşümünü hızlandıran, verimlilik ve müşteri deneyimini geliştiren teknoloji danışmanlığı.
                Kişisel ihtiyaç analizi, sektörel çözümler ve uzman desteğiyle işinizi geleceğe taşıyın.
              </p>
              <Button className="bg-[#ffc72c] text-[#333333] hover:bg-[#ffc72c]/80">
                Danışmanlık Hizmetlerini İncele
              </Button>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 rounded-full bg-[#ffc72c]/10 animate-ping"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-4 rounded-full bg-[#ffc72c] text-[#333333]">
                    <Briefcase className="h-10 w-10" />
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