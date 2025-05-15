"use client";

import React from "react";
import Link from "next/link";
import { motion } from "@/components/motion-wrapper";
import { 
  ArrowRight, 
  BarChart3, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  GraduationCap, 
  Users,
  Search,
  MessageSquareText,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Son 30 Gün
          </Button>
        </div>
      </div>

      {/* Welcome Banner */}
      <motion.div 
        className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#FFD100] to-[#00A0D2] p-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-20"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Hoş Geldiniz, Hasan!</h2>
          <p className="text-white/90 mb-4 max-w-2xl">
            Turkcell eğitim platformunda bugün neler öğrenmek istersiniz? 
            Kaldığınız yerden devam edebilir veya yeni eğitimlere göz atabilirsiniz.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/egitim-katalogu">
              <Button className="bg-white text-black hover:bg-white/90">
                Eğitimlere Göz At
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard/onerilen-egitimler">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/20">
                Önerilen Eğitimler
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Progress Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tamamlanan Eğitimler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12/36</div>
            <Progress value={33} className="mt-2 h-1" />
            <p className="text-xs text-muted-foreground mt-2">
              Toplam eğitimlerin %33'ünü tamamladınız
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Öğrenme Saati</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5 saat</div>
            <Progress value={65} className="mt-2 h-1" />
            <p className="text-xs text-muted-foreground mt-2">
              Hedefin %65'i tamamlandı
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sertifikalar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <Progress value={50} className="mt-2 h-1" />
            <p className="text-xs text-muted-foreground mt-2">
              Kariyer hedefinin %50'si tamamlandı
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Başarı Puanı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85/100</div>
            <Progress value={85} className="mt-2 h-1" />
            <p className="text-xs text-muted-foreground mt-2">
              Geçen aya göre %12 artış
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-6">
        {/* Left Column - 4/6 width */}
        <div className="md:col-span-4 space-y-6">
          {/* Continue Learning */}
          <Card>
            <CardHeader>
              <CardTitle>Kaldığınız Yerden Devam Edin</CardTitle>
              <CardDescription>
                En son çalıştığınız eğitimler
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Servis Tanımlama Süreci",
                  description: "Bireysel ve kurumsal servis işlemleri",
                  progress: 65,
                  icon: BookOpen,
                  time: "2 saat kaldı",
                  href: "/dashboard/egitimlerim/servis-tanimlama"
                },
                {
                  title: "Dijital Servisler Araç Seti",
                  description: "Turkcell Dijital Kanal Yönetimi",
                  progress: 42,
                  icon: BarChart3,
                  time: "3.5 saat kaldı",
                  href: "/dashboard/egitimlerim/dijital-servisler"
                },
                {
                  title: "Şebeke ve BTS Simülasyonları",
                  description: "BTS kurulumu ve arıza tespiti",
                  progress: 18,
                  icon: Users,
                  time: "5 saat kaldı",
                  href: "/dashboard/egitimlerim/bts-simulasyon"
                }
              ].map((course, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="bg-[#FFD100]/10 p-3 rounded-lg">
                    <course.icon className="h-5 w-5 text-[#FFD100]" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{course.title}</p>
                      <span className="text-sm text-muted-foreground">{course.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{course.description}</p>
                    <Progress value={course.progress} className="h-1" />
                  </div>
                  <Link href={course.href}>
                    <Button variant="ghost" size="icon">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/egitimlerim" className="w-full">
                <Button variant="outline" className="w-full">Tüm Eğitimlerimi Görüntüle</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Featured Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Öne Çıkan Eğitimler</CardTitle>
              <CardDescription>
                Kariyeriniz için önerilen eğitimler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">Tümü</TabsTrigger>
                  <TabsTrigger value="technical">Teknik</TabsTrigger>
                  <TabsTrigger value="soft">Kişisel Gelişim</TabsTrigger>
                  <TabsTrigger value="leadership">Liderlik</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  {[
                    {
                      title: "Arama Motoru ile Hızlı Destek",
                      description: "Turkcell süreç aramalarını anında yapabilme",
                      duration: "2 saat",
                      level: "Başlangıç",
                      icon: Search,
                      href: "/dashboard/egitimlerim/1"
                    },
                    {
                      title: "Synbot – Turkcell İç Kaynaklı Asistan",
                      description: "Yapay zeka destekli sohbet imkanı ile anlık destek",
                      duration: "1.5 saat",
                      level: "Orta",
                      icon: MessageSquareText,
                      href: "/dashboard/egitimlerim/3"
                    },
                    {
                      title: "Modül Tamamlama ve Sertifikasyon",
                      description: "Turkcell iç Yetkinlik Portalı'na otomatik kayıt",
                      duration: "3 saat",
                      level: "Tüm Seviyeler",
                      icon: Award,
                      href: "/dashboard/egitimlerim/6"
                    }
                  ].map((course, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg border">
                      <div className="bg-[#00A0D2]/10 p-3 rounded-lg">
                        <course.icon className="h-5 w-5 text-[#00A0D2]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {course.duration}
                          </div>
                          <div className="flex items-center">
                            <GraduationCap className="mr-1 h-3 w-3" />
                            {course.level}
                          </div>
                        </div>
                      </div>
                      <Link href={course.href}>
                        <Button size="sm">Başla</Button>
                      </Link>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="technical">
                  <div className="p-4 text-center text-muted-foreground">
                    Teknik eğitimler yakında eklenecek
                  </div>
                </TabsContent>
                <TabsContent value="soft">
                  <div className="p-4 text-center text-muted-foreground">
                    Kişisel gelişim eğitimleri yakında eklenecek
                  </div>
                </TabsContent>
                <TabsContent value="leadership">
                  <div className="p-4 text-center text-muted-foreground">
                    Liderlik eğitimleri yakında eklenecek
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - 2/6 width */}
        <div className="md:col-span-2 space-y-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Yaklaşan Etkinlikler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-3">
                <div className="bg-[#FFD100]/10 w-fit p-2 rounded mb-2">
                  <Users className="h-4 w-4 text-[#FFD100]" />
                </div>
                <h4 className="font-medium">Turkcell Teknoloji Zirvesi</h4>
                <p className="text-sm text-muted-foreground">15 Haziran 2023, 10:00</p>
              </div>
              <div className="border rounded-lg p-3">
                <div className="bg-[#00A0D2]/10 w-fit p-2 rounded mb-2">
                  <GraduationCap className="h-4 w-4 text-[#00A0D2]" />
                </div>
                <h4 className="font-medium">5G Teknolojileri Webinarı</h4>
                <p className="text-sm text-muted-foreground">22 Haziran 2023, 14:00</p>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/calendar" className="w-full">
                <Button variant="outline" className="w-full">Tüm Etkinlikler</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Başarılarınız</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#FFD100]/10 p-2 rounded">
                  <CheckCircle className="h-4 w-4 text-[#FFD100]" />
                </div>
                <div>
                  <p className="font-medium">Dijital Dönüşüm Sertifikası</p>
                  <p className="text-xs text-muted-foreground">10 Mayıs 2023</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#00A0D2]/10 p-2 rounded">
                  <CheckCircle className="h-4 w-4 text-[#00A0D2]" />
                </div>
                <div>
                  <p className="font-medium">Müşteri Deneyimi Rozeti</p>
                  <p className="text-xs text-muted-foreground">28 Nisan 2023</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#FFD100]/10 p-2 rounded">
                  <CheckCircle className="h-4 w-4 text-[#FFD100]" />
                </div>
                <div>
                  <p className="font-medium">Veri Analizi Temel Seviye</p>
                  <p className="text-xs text-muted-foreground">15 Nisan 2023</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/profile" className="w-full">
                <Button variant="outline" className="w-full">Tüm Başarılar</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Featured Links */}
          <Card>
            <CardHeader>
              <CardTitle>Daha Fazla Bilgi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/more-info/servis-tanimlama-sureci" className="block p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <h4 className="font-medium">Servis Tanımlama Süreci Eğitimleri</h4>
                <p className="text-sm text-muted-foreground">Bireysel ve kurumsal servis işlemleri adımlarının ekran görüntülü anlatımı ile servis süreçlerinizi hızlandırın.</p>
                <Button variant="link" className="p-0 h-auto mt-2 text-[#00A0D2]">
                  Daha Fazla Bilgi
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
              
              <Link href="/more-info/dijital-servis-araclari" className="block p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <h4 className="font-medium">Dijital Servisler Araç Seti</h4>
                <p className="text-sm text-muted-foreground">Turkcell Dijital Kanal Yönetimi ve BiP Destek'te en sık yapılan hatalar ve "nasıl yapılır" rehberleri ile dijital servis süreçlerinizi optimize edin.</p>
                <Button variant="link" className="p-0 h-auto mt-2 text-[#00A0D2]">
                  Daha Fazla Bilgi
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
              
              <Link href="/more-info/bts-simulasyon" className="block p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <h4 className="font-medium">Şebeke ve BTS Simülasyonları</h4>
                <p className="text-sm text-muted-foreground">BTS kurulumu, arıza tespiti ve şebeke yönetimi gibi kritik süreçler için interaktif simülasyon ortamı.</p>
                <Button variant="link" className="p-0 h-auto mt-2 text-[#00A0D2]">
                  Daha Fazla Bilgi
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
              
              <Link href="/more-info/arama-motoru" className="block p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <h4 className="font-medium">Arama Motoru ile Hızlı Destek</h4>
                <p className="text-sm text-muted-foreground">"Numara taşıma", "fatura itirazı" veya "BiP hata kodu 105" gibi Turkcell süreç aramalarını anında yapabilme imkanı.</p>
                <Button variant="link" className="p-0 h-auto mt-2 text-[#00A0D2]">
                  Daha Fazla Bilgi
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
              
              <Link href="/more-info/synbot" className="block p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <h4 className="font-medium">Synbot – Turkcell İç Kaynaklı Asistan</h4>
                <p className="text-sm text-muted-foreground">Turkcell'in iç bilgi işlemlerinin sunduğu yapay zeka destekli sohbet imkanı ile anlık destek.</p>
                <Button variant="link" className="p-0 h-auto mt-2 text-[#00A0D2]">
                  Daha Fazla Bilgi
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
              
              <Link href="/more-info/sertifikasyon" className="block p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <h4 className="font-medium">Modül Tamamlama ve Sertifikasyon</h4>
                <p className="text-sm text-muted-foreground">Her modülün sonunda bilgi ölçen quiz'ler; başarıyla tamamlanan modüller Turkcell iç "Yetkinlik Portalı"na otomatik kayıt.</p>
                <Button variant="link" className="p-0 h-auto mt-2 text-[#00A0D2]">
                  Daha Fazla Bilgi
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}