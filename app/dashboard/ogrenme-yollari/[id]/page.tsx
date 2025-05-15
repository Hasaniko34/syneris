"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Book,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Flag,
  GraduationCap,
  Layers,
  MoreHorizontal,
  Play,
  PlayCircle,
  Star,
  User,
  Users,
} from "lucide-react";
import { motion } from "@/components/motion-wrapper";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Sahte veri - Gerçek uygulamada API'den gelecek
const ogrenmeYoluVerisi = {
  id: "1",
  baslik: "Dijital Teknolojiler Kariyer Yolu",
  aciklama: "Bu öğrenme yolu, Turkcell'in dijital dönüşüm stratejisi doğrultusunda 5G teknolojileri, mobil uygulama geliştirme ve dijital servisler konusunda uzmanlaşmanızı sağlayacak kapsamlı bir programdır.",
  seviye: "Orta",
  sure: "40 saat",
  tamamlayanSayisi: 248,
  ilerleme: 25,
  adimSayisi: 5,
  egitimSayisi: 8,
  yol_tipi: "Teknik",
  yildizlar: 4.8,
  etiketler: ["Dijital Servisler", "5G", "Mobil Uygulama", "Siber Güvenlik"],
  olusturan: {
    isim: "Ahmet Yılmaz",
    unvan: "Dijital Teknolojiler Uzmanı",
    avatar: "https://ui-avatars.com/api/?name=Ahmet+Yılmaz&background=random"
  },
  yol_egitimler: [
    {
      id: "1",
      baslik: "Telekomünikasyon Temelleri",
      aciklama: "Telekomünikasyon sektörünün temel prensipleri ve Turkcell'in dijital altyapısı hakkında bilgiler.",
      sure: "6 saat",
      tamamlandi: true,
      puan: 4.7,
      etiketler: ["Telekomünikasyon", "Dijital Altyapı", "Şebeke"],
      egitmen: "Zeynep Kaya"
    },
    {
      id: "2",
      baslik: "Temel 5G Teknolojileri ve Uygulamaları",
      aciklama: "5G teknolojisinin temelleri, uygulamaları ve gelecek vizyonu.",
      sure: "8 saat",
      tamamlandi: true,
      puan: 4.9,
      etiketler: ["5G", "IoT", "Akıllı Şebekeler"],
      egitmen: "Mehmet Demir"
    },
    {
      id: "3",
      baslik: "Dijital Servis Teknolojileri",
      aciklama: "Turkcell'in dijital servis platformları ve teknolojik altyapısı.",
      sure: "6 saat",
      tamamlandi: false,
      puan: 4.8,
      etiketler: ["Dijital Servisler", "API", "Mikroservisler"],
      egitmen: "Can Yıldız"
    },
    {
      id: "4",
      baslik: "Mobil Uygulama Geliştirme ve Turkcell Entegrasyonları",
      aciklama: "Turkcell API'leri ile entegre mobil uygulamalar geliştirme.",
      sure: "10 saat",
      tamamlandi: false,
      puan: 4.9,
      etiketler: ["Mobil Uygulama", "API Entegrasyonu", "Kullanıcı Deneyimi"],
      egitmen: "Elif Yılmaz"
    },
    {
      id: "5",
      baslik: "Veri Yönetimi ve Analitik",
      aciklama: "Telekomünikasyon verilerinin analizi, işlenmesi ve değerlendirilmesi.",
      sure: "5 saat",
      tamamlandi: false,
      puan: 4.6,
      etiketler: ["Veri Analizi", "Büyük Veri", "Telekom Analitiği"],
      egitmen: "Burak Demir"
    },
    {
      id: "6",
      baslik: "Turkcell API Ekosistemi ve Entegrasyonlar",
      aciklama: "Turkcell'in sunduğu API'ler ve dijital servislerin entegrasyonu.",
      sure: "4 saat",
      tamamlandi: false,
      puan: 4.5,
      etiketler: ["API", "Entegrasyon", "Dijital Servisler"],
      egitmen: "Deniz Kaya"
    },
    {
      id: "7",
      baslik: "Siber Güvenlik ve Telekom Sistemleri",
      aciklama: "Telekomünikasyon ve dijital servislerde siber güvenlik yaklaşımları.",
      sure: "4 saat",
      tamamlandi: false,
      puan: 4.7,
      etiketler: ["Siber Güvenlik", "Şebeke Güvenliği", "Veri Koruma"],
      egitmen: "Serkan Öz"
    },
    {
      id: "8",
      baslik: "IoT ve Akıllı Teknolojiler Projesi",
      aciklama: "5G tabanlı IoT çözümleri ve akıllı teknolojiler projesi geliştirme.",
      sure: "12 saat",
      tamamlandi: false,
      puan: 4.9,
      etiketler: ["IoT", "5G", "Akıllı Teknolojiler"],
      egitmen: "Elif Yılmaz"
    }
  ],
  beceriler: [
    "5G Teknolojileri",
    "Mobil Uygulama Geliştirme",
    "API Entegrasyonu",
    "Dijital Servis Yönetimi",
    "Telekom Veri Analizi",
    "Siber Güvenlik",
    "IoT Çözümleri",
    "Şebeke Teknolojileri"
  ],
  kazanimlar: [
    "Telekomünikasyon ve dijital dönüşüm alanında temel ve ileri düzey bilgi edinme",
    "Turkcell'in dijital servis ekosistemini anlama ve yönetebilme",
    "5G teknolojileri ile IoT ve akıllı çözümler geliştirebilme",
    "Telekom verilerini analiz edebilme ve değerlendirebilme",
    "Mobil uygulama ve dijital servis entegrasyonları oluşturabilme"
  ]
};

export default function OgrenmeYoluDetay({ params }) {
  // Params'ı React.use ile unwrap ediyoruz
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;
  
  const router = useRouter();
  const { toast } = useToast();
  const [yol, setYol] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [activeTab, setActiveTab] = useState("egitimler");

  useEffect(() => {
    // Gerçek uygulamada API'den veri çekilecek
    const fetchData = async () => {
      try {
        // Simüle edilmiş API çağrısı gecikmesi
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Burası API entegrasyonu ile değişecek
        // const response = await fetch(`/api/ogrenme-yollari/${id}`);
        // const data = await response.json();
        // setYol(data);
        
        // Mock verisi kullanıyoruz
        setYol(ogrenmeYoluVerisi);
      } catch (error) {
        console.error("Veri yüklenirken hata oluştu:", error);
        toast({
          title: "Hata",
          description: "Öğrenme yolu bilgileri yüklenemedi. Lütfen tekrar deneyin.",
          variant: "destructive",
        });
      } finally {
        setYukleniyor(false);
      }
    };
    
    fetchData();
  }, [id]); // params.id yerine id kullanıyoruz

  const handleEgitimiBaslat = (egitimId: string) => {
    toast({
      title: "Eğitim Başlatılıyor",
      description: "Seçtiğiniz eğitim hazırlanıyor. Lütfen bekleyin...",
    });
    
    // Normalde burada eğitimi başlatma API isteği yapılır
    setTimeout(() => {
      router.push(`/dashboard/egitimlerim/${egitimId}`);
    }, 1000);
  };

  const handleTumYoluBaslat = () => {
    toast({
      title: "Öğrenme Yolu Başlatılıyor",
      description: "Öğrenme yolu kaydınız yapılıyor. İlk eğitime yönlendiriliyorsunuz.",
    });
    
    // Normalde burada öğrenme yolunu başlatma API isteği yapılır
    setTimeout(() => {
      const ilkTamamlanmamisEgitim = yol.yol_egitimler.find((e: any) => !e.tamamlandi);
      if (ilkTamamlanmamisEgitim) {
        router.push(`/dashboard/egitimlerim/${ilkTamamlanmamisEgitim.id}`);
      } else {
        router.push(`/dashboard/egitimlerim/${yol.yol_egitimler[0].id}`);
      }
    }, 1000);
  };

  if (yukleniyor) {
    return (
      <div className="container py-8 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A0D2]"></div>
        <p className="text-muted-foreground mt-4">Öğrenme yolu bilgileri yükleniyor...</p>
      </div>
    );
  }

  if (!yol) {
    return (
      <div className="container py-8">
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Geri Dön
        </Button>
        
        <Card className="text-center py-12">
          <CardContent>
            <div className="mx-auto rounded-full bg-muted w-16 h-16 flex items-center justify-center mb-4">
              <Flag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Öğrenme Yolu Bulunamadı</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              İstediğiniz öğrenme yolu bilgilerine ulaşılamadı. Öğrenme yolu silinmiş veya erişim izniniz olmayabilir.
            </p>
            <Button asChild>
              <Link href="/dashboard/ogrenme-yollari">
                Tüm Öğrenme Yollarına Dön
              </Link>
              </Button>
                    </CardContent>
                  </Card>
      </div>
    );
  }

  const tamamlanmisEgitimSayisi = yol.yol_egitimler.filter((e: any) => e.tamamlandi).length;
  const tamamlanmaYuzdesi = Math.round((tamamlanmisEgitimSayisi / yol.yol_egitimler.length) * 100);

  return (
    <div className="container py-8">
      <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" /> Geri Dön
      </Button>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Sol kolon - Ana içerik */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline" className="bg-[#FFD100]/20 text-[#00A0D2] border-[#00A0D2]/20">
                  {yol.yol_tipi}
                </Badge>
                <Badge variant="outline">
                  {yol.seviye} Seviye
                </Badge>
                {yol.ilerleme > 0 && (
                  <Badge variant="outline" className="bg-[#FFD100]/20 text-[#00A0D2] border-[#00A0D2]/20">
                    Devam Ediyor
                  </Badge>
                )}
              </div>

              <CardTitle className="text-2xl">{yol.baslik}</CardTitle>
              <CardDescription className="mt-2">{yol.aciklama}</CardDescription>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm">
                <div className="flex items-center">
                  <GraduationCap className="h-4 w-4 text-muted-foreground mr-2" />
                  <span>{yol.egitimSayisi} Eğitim</span>
                </div>
                
                <div className="flex items-center">
                  <Layers className="h-4 w-4 text-muted-foreground mr-2" />
                  <span>{yol.adimSayisi} Aşama</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                  <span>{yol.sure}</span>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-muted-foreground mr-2" />
                  <span>{yol.tamamlayanSayisi} kişi tamamladı</span>
                </div>
                
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-medium">{yol.yildizlar}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {yol.ilerleme > 0 && (
                <div className="mb-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>İlerleme</span>
                    <span className="font-medium">{tamamlanmaYuzdesi}%</span>
                  </div>
                  <Progress value={tamamlanmaYuzdesi} className="h-2" />
                </div>
              )}
              
              <div className="flex mt-4 space-x-3">
                <Button className="flex-1 bg-[#00A0D2] hover:bg-[#0080A8]" onClick={handleTumYoluBaslat}>
                  <PlayCircle className="h-4 w-4 mr-2" />
                  {yol.ilerleme > 0 ? "Devam Et" : "Başla"}
                </Button>
                
                <Button variant="outline" asChild className="border-[#00A0D2]/20 text-[#00A0D2] hover:bg-[#FFD100]/10">
                  <Link href={`/dashboard/ogrenme-yollari/${yol.id}/roadmap`}>
                    <Book className="h-4 w-4 mr-2" />
                    Yol Haritasını Görüntüle
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="egitimler">Eğitimler</TabsTrigger>
              <TabsTrigger value="beceriler">Kazanımlar ve Beceriler</TabsTrigger>
              <TabsTrigger value="egiticiler">Eğiticiler</TabsTrigger>
            </TabsList>
            
            <TabsContent value="egitimler" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Yol Eğitimleri</CardTitle>
                  <CardDescription>
                    Bu öğrenme yolundaki tüm eğitimler sıralı olarak listelenmiştir. Önerilen sırayla tamamlanması tavsiye edilir.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {yol.yol_egitimler.map((egitim: any, index: number) => (
                      <AccordionItem key={egitim.id} value={egitim.id}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex justify-between items-center w-full pr-4">
                            <div className="flex items-center">
                              <div className="bg-muted rounded-full w-6 h-6 flex items-center justify-center mr-3 text-xs font-medium">
                                {index + 1}
                              </div>
                              <div className="flex flex-col items-start text-left">
                                <div className="font-medium flex items-center">
                                  {egitim.baslik}
                                  {egitim.tamamlandi && (
                                    <CheckCircle2 className="h-4 w-4 text-green-500 ml-2" />
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {egitim.sure}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                <span className="text-xs font-medium ml-1">{egitim.puan}</span>
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        
                        <AccordionContent>
                          <div className="pl-9 space-y-3">
                            <p className="text-sm text-muted-foreground">
                              {egitim.aciklama}
                            </p>
                            
                            <div className="flex flex-wrap gap-1 my-2">
                              {egitim.etiketler.map((etiket: string, idx: number) => (
                                <Badge key={idx} variant="secondary" className="text-xs font-normal">
                                  {etiket}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center mt-2 text-sm">
                              <Avatar className="h-5 w-5 mr-2">
                                <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(egitim.egitmen)}`} />
                                <AvatarFallback>{egitim.egitmen.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-muted-foreground">Eğitmen: {egitim.egitmen}</span>
                            </div>
                            
                            <div className="pt-2">
                              <Button 
                                size="sm"
                                onClick={() => handleEgitimiBaslat(egitim.id)}
                              >
                                {egitim.tamamlandi ? (
                                  <>
                                    <Play className="h-3.5 w-3.5 mr-1.5" /> Tekrar Başlat
                                  </>
                                ) : (
                                  <>
                                    <Play className="h-3.5 w-3.5 mr-1.5" /> Eğitime Başla
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="beceriler" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Kazanımlar</CardTitle>
                  <CardDescription>
                    Bu öğrenme yolunu tamamladığınızda kazanacağınız yetenekler ve bilgiler
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {yol.kazanimlar.map((kazanim: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{kazanim}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Beceriler</CardTitle>
                  <CardDescription>
                    Bu öğrenme yolunda edinceğiniz teknik ve pratik beceriler
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {yol.beceriler.map((beceri: string, idx: number) => (
                      <Badge key={idx} variant="secondary" className="py-1.5 px-2.5">
                        {beceri}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="egiticiler" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Oluşturan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={yol.olusturan.avatar} />
                      <AvatarFallback>{yol.olusturan.isim.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h3 className="font-medium text-lg">{yol.olusturan.isim}</h3>
                      <p className="text-muted-foreground">{yol.olusturan.unvan}</p>
                      <p className="text-sm mt-2">
                        Öğrenme yollarını tasarlayan ve içerikleri seçen uzman ekibimizden.
                        Öğrencilerin en verimli şekilde öğrenmelerine rehberlik ediyor.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Eğitmenler</CardTitle>
                  <CardDescription>
                    Bu öğrenme yolundaki eğitimleri veren eğitmenler
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from(new Set(yol.yol_egitimler.map((e: any) => e.egitmen))).map((egitmen: string, idx: number) => (
                      <Card key={idx} className="bg-muted/40 border-muted">
                        <CardContent className="p-4 flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(egitmen)}&background=random`} />
                            <AvatarFallback>{egitmen.toString().charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{egitmen}</h4>
                            <p className="text-xs text-muted-foreground">
                              {yol.yol_egitimler.filter((e: any) => e.egitmen === egitmen).length} eğitim veriyor
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sağ kolon - Yan panel */}
        <div className="space-y-6">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Hızlı Bilgiler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Tamamlama Süresi</div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-[#00A0D2]" />
                  <span>{yol.sure}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Seviye</div>
                <div className="flex items-center">
                  <Layers className="h-4 w-4 mr-2 text-[#00A0D2]" />
                  <span>{yol.seviye}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">İçerik</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-[#00A0D2]" />
                    <span>{yol.egitimSayisi} Eğitim</span>
                  </div>
                  <div className="flex items-center">
                    <Flag className="h-4 w-4 mr-2 text-[#00A0D2]" />
                    <span>{yol.adimSayisi} Aşama</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Önerilen Sıra</div>
                <div className="text-sm">
                  Bu öğrenme yolundaki eğitimleri belirtilen sırada tamamlamanız önerilir. Her eğitim, bir sonraki eğitim için temel oluşturur.
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Etiketler</div>
                <div className="flex flex-wrap gap-1">
                  {yol.etiketler.map((etiket: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {etiket}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Button className="w-full bg-[#00A0D2] hover:bg-[#0080A8]" onClick={handleTumYoluBaslat}>
                <PlayCircle className="h-4 w-4 mr-2" />
                {yol.ilerleme > 0 ? "Devam Et" : "Yola Başla"}
              </Button>
              
              <Button variant="outline" className="w-full border-[#00A0D2]/20 text-[#00A0D2] hover:bg-[#FFD100]/10" asChild>
                <Link href="/dashboard/ogrenme-yollari">
                  Tüm Öğrenme Yollarına Dön
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </motion.div>
    </div>
  );
} 