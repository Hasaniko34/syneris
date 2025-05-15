"use client";

import React, { useState, useEffect } from "react";
import { useRouter, PageProps } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  BookOpen,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  FileText,
  HelpCircle,
  ListChecks,
  Play,
  Send,
  ThumbsUp,
  Video,
  Award,
  Printer,
  Share,
  RefreshCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { toast, useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { EGITIMLER, Egitim } from "../egitim-data";

interface Modul {
  id: number;
  baslik: string;
  aciklama: string;
  sureDakika: number;
  tamamlandi: boolean;
}

interface Test {
  id: number;
  baslik: string;
  soruSayisi: number;
  gecmeNotu: number;
  tamamlandi: boolean;
  sonucPuan?: number;
}

interface Egitim {
  id: string;
  baslik: string;
  aciklama: string;
  moduller: Modul[];
  testler: Test[];
  toplam_ilerleme: number;
  etiketler: string[];
  zorunlu: boolean;
  sonTarih?: string;
  egitmen: string;
}

export default function EgitimIzlemePage({ params }: PageProps<{ egitimId: string }>) {
  const router = useRouter();
  const { toast: showToast, dismiss } = useToast();
  const [egitim, setEgitim] = useState<Egitim | null>(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [aktifModul, setAktifModul] = useState<number | null>(null);
  const [aktifIcerikTipi, setAktifIcerikTipi] = useState("icerik");
  const [testDialogAcik, setTestDialogAcik] = useState(false);
  const [testBitti, setTestBitti] = useState(false);
  const [testSonuc, setTestSonuc] = useState<number | null>(null);
  const [sertifikaDialogAcik, setSertifikaDialogAcik] = useState(false);
  
  // Test için gerekli yeni state'ler
  const [aktifSoruIndex, setAktifSoruIndex] = useState(1);
  const [testSure, setTestSure] = useState(1200); // 20 dakika (saniye cinsinden)
  const [testSureInterval, setTestSureInterval] = useState<NodeJS.Timeout | null>(null);
  
  // params nesnesini React.use() ile sarmala
  const resolvedParams = React.use(params);

  // Gerçek veri - merkezi mock veri üzerinden
  useEffect(() => {
    setYukleniyor(true);
    const egitim = EGITIMLER.find(e => e.id === resolvedParams.egitimId);
    if (egitim) {
      setEgitim(egitim);
      setAktifModul(egitim.moduller[0]?.id || null);
    } else {
      setEgitim(null);
    }
    setYukleniyor(false);
  }, [resolvedParams.egitimId]);

  // Modül tamamlama işlevi
  const modulTamamla = (modulId: number) => {
    if (!egitim) return;
    
    const guncellenmisSurum = {
      ...egitim,
      moduller: egitim.moduller.map(modul => 
        modul.id === modulId 
          ? { ...modul, tamamlandi: true } 
          : modul
      ),
      toplam_ilerleme: Math.min(
        100,
        egitim.toplam_ilerleme + (100 / (egitim.moduller.length + egitim.testler.length))
      )
    };
    
    setEgitim(guncellenmisSurum);
    
    // Gerçek uygulamada burada API çağrısı yapılır
    console.log(`Modül ${modulId} tamamlandı`);
    
    showToast({
      title: "Modül Tamamlandı!",
      description: `"${egitim.moduller.find(m => m.id === modulId)?.baslik}" modülünü başarıyla tamamladınız.`,
      variant: "default",
    });
    
    // Bir sonraki modüle otomatik geçiş yap
    const tamamlananIndex = egitim.moduller.findIndex(m => m.id === modulId);
    
    // Son modül değilse bir sonrakine geç
    if (tamamlananIndex < egitim.moduller.length - 1) {
      setTimeout(() => {
        setAktifModul(egitim.moduller[tamamlananIndex + 1].id);
      }, 500);
    } else {
      // Tüm modüller tamamlandıysa ve test varsa teste yönlendir
      const tamamlanmamisTest = egitim.testler.find(t => !t.tamamlandi);
      if (tamamlanmamisTest) {
        setTimeout(() => {
          showToast({
            title: "Test Zamanı!",
            description: "Tüm modülleri tamamladınız. Şimdi bilgilerinizi test edin.",
            action: (
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => {
                  testiBaslat(tamamlanmamisTest.id);
                  dismiss();
                }}
              >
                Teste Başla
              </Button>
            ),
          });
        }, 1000);
      } else if (egitim.toplam_ilerleme >= 100) {
        // Tüm modüller ve testler tamamlandıysa sertifika göster
        setTimeout(() => {
          setSertifikaDialogAcik(true);
        }, 1000);
      }
    }
  };

  // Test tamamlama işlevi
  const testiBitir = (testId: number, puan: number) => {
    if (!egitim) return;

    const guncellenmisSurum = {
      ...egitim,
      testler: egitim.testler.map(test => 
        test.id === testId 
          ? { ...test, tamamlandi: true, sonucPuan: puan } 
          : test
      ),
      toplam_ilerleme: Math.min(
        100,
        egitim.toplam_ilerleme + (100 / (egitim.moduller.length + egitim.testler.length))
      )
    };

    setEgitim(guncellenmisSurum);
    setTestSonuc(puan);
    setTestBitti(true);

    // Gerçek uygulamada burada API çağrısı yapılır
    console.log(`Test ${testId} tamamlandı, sonuç: ${puan}`);
    
    // Başarılı/başarısız durumuna göre bildirim göster
    setTimeout(() => {
      if (puan >= 70) {
        showToast({
          title: "Tebrikler!",
          description: `Testi %${puan} başarı oranıyla tamamladınız.`,
          variant: "default",
        });
        
        // Eğer tüm testler ve modüller tamamlandıysa sertifika göster
        const tumModullerTamamlandi = guncellenmisSurum.moduller.every(m => m.tamamlandi);
        const tumTestlerTamamlandi = guncellenmisSurum.testler.every(t => t.tamamlandi);
        
        if (tumModullerTamamlandi && tumTestlerTamamlandi) {
          setTimeout(() => {
            setSertifikaDialogAcik(true);
          }, 1500);
        }
      } else {
        showToast({
          title: "Üzgünüz!",
          description: `Testi geçmek için gereken puanı alamadınız. Tekrar deneyebilirsiniz.`,
          variant: "destructive",
        });
      }
    }, 500);
  };

  // Test simülasyonu
  const testiBaslat = (testId: number) => {
    setTestDialogAcik(true);
    setTestBitti(false);
    setTestSonuc(null);
    setAktifSoruIndex(1);
    
    // Test süresini başlat (20 dakika)
    setTestSure(1200);
    
    // Timer'ı başlat
    const interval = setInterval(() => {
      setTestSure((prev) => {
        if (prev <= 1) {
          // Süre bittiğinde testi otomatik bitir
          clearInterval(interval);
          const randomScore = Math.floor(Math.random() * 31) + 70;
          setTestSonuc(randomScore);
          setTestBitti(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setTestSureInterval(interval);
  };

  // Önceki veya sonraki soruya geçiş için fonksiyonlar
  const oncekiSoruyaGec = () => {
    if (aktifSoruIndex > 1) {
      setAktifSoruIndex(aktifSoruIndex - 1);
    }
  };

  const sonrakiSoruyaGec = () => {
    if (aktifSoruIndex < 10) { // Toplam 10 soru olduğunu varsayalım
      setAktifSoruIndex(aktifSoruIndex + 1);
    }
  };

  // Test dialog kapatıldığında timer'ı temizle
  useEffect(() => {
    if (!testDialogAcik && testSureInterval) {
      clearInterval(testSureInterval);
      setTestSureInterval(null);
    }
    
    return () => {
      if (testSureInterval) {
        clearInterval(testSureInterval);
      }
    };
  }, [testDialogAcik, testSureInterval]);

  // Süre formatını dakika:saniye olarak biçimlendir
  const formatSure = (saniye: number): string => {
    const dakika = Math.floor(saniye / 60);
    const kalanSaniye = saniye % 60;
    return `${dakika.toString().padStart(2, '0')}:${kalanSaniye.toString().padStart(2, '0')}`;
  };

  // Sonraki modüle geç
  const sonrakiModuleGec = () => {
    if (!egitim || !aktifModul) return;
    
    const simdikiIndex = egitim.moduller.findIndex(m => m.id === aktifModul);
    
    if (simdikiIndex < egitim.moduller.length - 1) {
      setAktifModul(egitim.moduller[simdikiIndex + 1].id);
    }
  };

  // Önceki modüle geç
  const oncekiModuleGec = () => {
    if (!egitim || !aktifModul) return;
    
    const simdikiIndex = egitim.moduller.findIndex(m => m.id === aktifModul);
    
    if (simdikiIndex > 0) {
      setAktifModul(egitim.moduller[simdikiIndex - 1].id);
    }
  };

  // Eğer yükleniyor ise...
  if (yukleniyor) {
    return (
      <div className="container mx-auto py-6 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Eğitim içeriği yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Eğer eğitim bulunamadıysa...
  if (!egitim) {
    return (
      <div className="container mx-auto py-6">
        <Card className="mx-auto max-w-xl">
          <CardHeader>
            <CardTitle>Eğitim Bulunamadı</CardTitle>
            <CardDescription>
              Aradığınız eğitim bulunamadı veya erişim izniniz yok.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/dashboard/egitimlerim">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Eğitimlerime Dön
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Aktif modül bilgisini al
  const aktifModulBilgisi = egitim.moduller.find(m => m.id === aktifModul);

  return (
    <TooltipProvider>
      <div className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 lg:w-1/4">
            <Card className="sticky top-20">
              <CardHeader className="pb-2">
                <CardTitle>{egitim.baslik}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Toplam {egitim.moduller.reduce((acc, modul) => acc + modul.sureDakika, 0)} dakika</span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-2">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>İlerleme</span>
                    <span className="font-medium">{egitim.toplam_ilerleme}%</span>
                  </div>
                  <Progress value={egitim.toplam_ilerleme} className="h-2" />
                </div>
                
                <div className="space-y-1 mt-6">
                  <h4 className="text-sm font-medium mb-3">İçerik</h4>
                  
                  {/* Modüller Listesi */}
                  <div className="space-y-2 mb-4">
                    {egitim.moduller.map((modul, index) => (
                      <div 
                        key={modul.id}
                        className={cn(
                          "flex items-center p-2 rounded-md text-sm cursor-pointer",
                          modul.id === aktifModul ? "bg-primary/10 text-primary" : "hover:bg-accent",
                          modul.tamamlandi && "text-muted-foreground"
                        )}
                        onClick={() => setAktifModul(modul.id)}
                      >
                        <div 
                          className={cn(
                            "h-6 w-6 rounded-full flex items-center justify-center mr-3 text-xs flex-shrink-0",
                            modul.tamamlandi 
                              ? "bg-primary/20 text-primary" 
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {modul.tamamlandi ? <Check className="h-3.5 w-3.5" /> : index + 1}
                        </div>
                        <span className={modul.tamamlandi ? "line-through opacity-70" : ""}>
                          {modul.baslik}
                        </span>
                        <span className="text-xs text-muted-foreground ml-auto flex-shrink-0">
                          {modul.sureDakika} dk
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Testler Listesi */}
                  {egitim.testler.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-sm font-medium mb-3">Testler</h4>
                      <div className="space-y-2">
                        {egitim.testler.map((test, index) => {
                          // Önceki modüller tamamlanmadan test yapılamaz
                          const testiYapabilir = egitim.moduller.every(m => m.tamamlandi);
                          
                          return (
                            <div 
                              key={test.id}
                              className={cn(
                                "flex items-center p-2 rounded-md text-sm",
                                testiYapabilir ? "cursor-pointer hover:bg-accent" : "opacity-50 cursor-not-allowed"
                              )}
                              onClick={() => {
                                if (testiYapabilir && !test.tamamlandi) {
                                  testiBaslat(test.id);
                                } else if (test.tamamlandi) {
                                  // Test sonuçlarını göster
                                  setTestSonuc(test.sonucPuan || 0);
                                  setTestBitti(true);
                                  setTestDialogAcik(true);
                                } else {
                                  // Uyarı bildirim göster
                                  showToast({
                                    title: "Önce modülleri tamamlayın",
                                    description: "Test'e başlamadan önce tüm modülleri tamamlamanız gerekmektedir.",
                                    variant: "destructive",
                                  });
                                }
                              }}
                            >
                              <div 
                                className={cn(
                                  "h-6 w-6 rounded-full flex items-center justify-center mr-3 text-xs flex-shrink-0",
                                  test.tamamlandi 
                                    ? "bg-primary/20 text-primary" 
                                    : testiYapabilir 
                                      ? "bg-amber-100 text-amber-700" 
                                      : "bg-muted text-muted-foreground"
                                )}
                              >
                                {test.tamamlandi ? <Check className="h-3.5 w-3.5" /> : <ListChecks className="h-3.5 w-3.5" />}
                              </div>
                              <div className="flex-grow">
                                <div className="flex justify-between">
                                  <span>{test.baslik}</span>
                                  {test.tamamlandi && test.sonucPuan && (
                                    <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5 ml-2">
                                      %{test.sonucPuan}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {/* Sertifika Alma Butonu */}
                  {egitim.toplam_ilerleme === 100 && (
                    <div className="mt-6 pt-4 border-t">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setSertifikaDialogAcik(true)}
                      >
                        <Award className="h-4 w-4 mr-2" />
                        Sertifikanı Görüntüle
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="pt-0 flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/egitimlerim">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Eğitimlerime Dön
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Modül İçerik Kısmı */}
          <div className="md:w-2/3 lg:w-3/4">
            <Card>
              {aktifModulBilgisi && (
                <>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{aktifModulBilgisi.baslik}</CardTitle>
                        <CardDescription className="mt-1">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{aktifModulBilgisi.sureDakika} dakika</span>
                          </span>
                        </CardDescription>
                      </div>
                      
                      <Button 
                        variant={aktifModulBilgisi.tamamlandi ? "secondary" : "default"}
                        size="sm"
                        className="gap-1"
                        onClick={() => modulTamamla(aktifModulBilgisi.id)}
                        disabled={aktifModulBilgisi.tamamlandi}
                      >
                        {aktifModulBilgisi.tamamlandi ? (
                          <>
                            <Check className="h-4 w-4" />
                            Tamamlandı
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            Modülü Tamamla
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <Tabs value={aktifIcerikTipi} onValueChange={setAktifIcerikTipi}>
                      <TabsList className="mb-4">
                        <TabsTrigger value="icerik">İçerik</TabsTrigger>
                        <TabsTrigger value="video">Video</TabsTrigger>
                        <TabsTrigger value="kaynaklar">Kaynaklar</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="icerik" className="min-h-[400px]">
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                          <h2>Modül İçeriği</h2>
                          <p>{aktifModulBilgisi.aciklama}</p>
                          
                          <h3>Öğrenme Hedefleri</h3>
                          <ul>
                            <li>Turkcell ve telekomünikasyon sektörüne uygun işlemler yapmak</li>
                            <li>5G ve şebeke teknolojilerini anlamak</li>
                            <li>Müşteri deneyimi ve siber güvenlik ilkelerini kavramak</li>
                            <li>Veri koruma ve API kullanımını öğrenmek</li>
                          </ul>

                          <h3>Turkcell Dijital Servisleri</h3>
                          <p>
                            Turkcell, Türkiye'de hizmet veren ve büyüyen bir telekomünikasyon şirketidir. 
                            Dijital servisleri, 5G teknolojileri, şebeke ve müşteri deneyimi için önemli bir rol oynamaktadır.
                          </p>

                          <h3>5G</h3>
                          <p>
                            5G, 5. nesil mobil ağıdır ve düşük gecikme, yüksek hız ve büyük hacimli veri iletimi için tasarlanmıştır.
                          </p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="video" className="min-h-[400px]">
                        <VideoPlayer src={aktifModulBilgisi.baslik} poster={aktifModulBilgisi.baslik} title={aktifModulBilgisi.baslik} />
                      </TabsContent>
                      
                      <TabsContent value="kaynaklar" className="min-h-[400px]">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Ek Kaynaklar</h3>
                          <p className="text-muted-foreground">
                            Bu modül için faydalı olabilecek ek kaynak ve dokümanlar.
                          </p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 border rounded-md">
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-blue-500" />
                                <span>Turkcell Dijital Servisleri PDF</span>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4 mr-2" /> İndir
                              </Button>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 border rounded-md">
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-blue-500" />
                                <span>5G ve Şebeke Teknolojileri</span>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4 mr-2" /> İndir
                              </Button>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 border rounded-md">
                              <div className="flex items-center gap-3">
                                <BookOpen className="h-5 w-5 text-green-500" />
                                <span>Turkcell Dijital Servisleri</span>
                              </div>
                              <Button variant="ghost" size="sm" asChild>
                                <a href="https://www.turkcell.com.tr" target="_blank" rel="noopener noreferrer">
                                  Ziyaret Et
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>

                  <CardFooter className="flex justify-between border-t p-4">
                    <Button 
                      variant="outline" 
                      onClick={oncekiModuleGec}
                      disabled={egitim.moduller.indexOf(aktifModulBilgisi) === 0}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" /> Önceki
                    </Button>
                    
                    <Button 
                      variant={aktifModulBilgisi.tamamlandi ? "outline" : "default"}
                      onClick={() => {
                        if (!aktifModulBilgisi.tamamlandi) {
                          modulTamamla(aktifModulBilgisi.id);
                        } else {
                          // Zaten tamamlanmışsa sıradaki modüle geç
                          sonrakiModuleGec();
                        }
                      }}
                      className="mx-2"
                    >
                      {aktifModulBilgisi.tamamlandi ? (
                        "Sonraki Modül"
                      ) : (
                        <>Tamamla ve İlerle</>
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={sonrakiModuleGec}
                      disabled={egitim.moduller.indexOf(aktifModulBilgisi) === egitim.moduller.length - 1}
                    >
                      Sonraki <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </>
              )}
            </Card>
          </div>
        </div>

        {/* Test Dialog */}
        <Dialog open={testDialogAcik} onOpenChange={(open) => {
          // Dialog kapatıldığında timer'ı durdur
          if (!open && testSureInterval) {
            clearInterval(testSureInterval);
            setTestSureInterval(null);
          }
          setTestDialogAcik(open);
        }}>
          <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-md border-none shadow-lg">
            <DialogHeader>
              <DialogTitle>
                {testBitti 
                  ? "Test Sonuçları" 
                  : egitim.testler.find(t => !t.tamamlandi)?.baslik || "Test"}
              </DialogTitle>
              <DialogDescription>
                {testBitti 
                  ? "Test sonuçlarınız aşağıda gösterilmektedir." 
                  : `Bu test ${egitim.testler.find(t => !t.tamamlandi)?.soruSayisi || 0} sorudan oluşmaktadır. Başarılı olmak için en az ${egitim.testler.find(t => !t.tamamlandi)?.gecmeNotu || 70}% doğru cevap vermeniz gerekmektedir.`}
              </DialogDescription>
            </DialogHeader>

            {testBitti ? (
              <div className="py-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-6 mb-4">
                    {(testSonuc || 0) >= 70 ? (
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    ) : (
                      <HelpCircle className="h-10 w-10 text-amber-600" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {(testSonuc || 0) >= 70 ? "Tebrikler!" : "Üzgünüz!"}
                  </h3>
                  <p className="text-muted-foreground">
                    {(testSonuc || 0) >= 70 
                      ? "Testi başarıyla tamamladınız." 
                      : "Testi geçmek için gereken puanı alamadınız. Tekrar deneyebilirsiniz."}
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-md mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Sonuç:</span>
                    <span className="font-bold text-lg">{testSonuc}%</span>
                  </div>
                  <Progress value={testSonuc || 0} className="h-2 mb-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Geçme Notu: 70%</span>
                    <span>Toplam Soru: {egitim.testler.find(t => !t.tamamlandi)?.soruSayisi || 0}</span>
                  </div>
                </div>
                
                {/* Detaylı Test Sonuç Analizi */}
                <div className="space-y-4 mt-6">
                  <h4 className="font-medium text-lg">Detaylı Analiz</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                      <h5 className="text-sm font-medium text-green-700 dark:text-green-400 mb-2">Doğru Cevaplar</h5>
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                          <span className="font-bold text-green-700 dark:text-green-400">
                            {Math.round((testSonuc || 0) / 100 * 10)}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>Toplam 10 sorudan</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                      <h5 className="text-sm font-medium text-red-700 dark:text-red-400 mb-2">Yanlış Cevaplar</h5>
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-800 flex items-center justify-center">
                          <span className="font-bold text-red-700 dark:text-red-400">
                            {10 - Math.round((testSonuc || 0) / 100 * 10)}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>Toplam 10 sorudan</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/80 p-4 rounded-md mt-4">
                    <h5 className="font-medium mb-2">Performans Özeti</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Turkcell Dijital Servisleri</span>
                        <Badge variant={testSonuc && testSonuc >= 80 ? "default" : "outline"}>
                          {testSonuc && testSonuc >= 80 ? "Mükemmel" : "Geliştirilmeli"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">5G ve Şebeke Teknolojileri</span>
                        <Badge variant={testSonuc && testSonuc >= 70 ? "default" : "outline"}>
                          {testSonuc && testSonuc >= 70 ? "İyi" : "Geliştirilmeli"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Müşteri Deneyimi</span>
                        <Badge variant={testSonuc && testSonuc >= 75 ? "default" : "outline"}>
                          {testSonuc && testSonuc >= 75 ? "İyi" : "Geliştirilmeli"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      {(testSonuc || 0) >= 70 
                        ? "Sertifikanızı almak için tüm eğitim modüllerini tamamlamaya devam edin." 
                        : "Eğitim modüllerini tekrar gözden geçirip testi yeniden deneyebilirsiniz."}
                    </p>
                    {(testSonuc || 0) < 70 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setTestBitti(false);
                          setTestSonuc(null);
                        }}
                      >
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        Testi Tekrar Dene
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-6">
                {/* Test Zaman ve İlerleme Göstergesi */}
                <div className="flex justify-between items-center mb-4 pb-2 border-b text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="countdown-timer">{formatSure(testSure)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>İlerleme:</span>
                    <span className="font-medium">{aktifSoruIndex}/10</span>
                    <Progress value={aktifSoruIndex * 10} className="w-20 h-2" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Soru Numaraları Göstergesi */}
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <button
                        key={num}
                        onClick={() => setAktifSoruIndex(num)}
                        className={`w-7 h-7 rounded-full text-xs flex items-center justify-center 
                          ${num < aktifSoruIndex
                            ? 'bg-green-100 text-green-700 border border-green-300 dark:bg-green-900 dark:text-green-300' 
                            : num === aktifSoruIndex
                              ? 'bg-primary/10 text-primary border border-primary/30' 
                              : 'bg-muted/50 text-muted-foreground hover:bg-muted'}
                        `}
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  <div className="p-6 border rounded-md bg-card shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-lg">Soru {aktifSoruIndex}:</h4>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-amber-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                      >
                        <BookOpen className="h-4 w-4 mr-1" />
                        İşaretle
                      </Button>
                    </div>
                    <p className="mb-4 text-base">
                      {aktifSoruIndex === 1 ? "Turkcell hangi şirket tarafından geliştirilmiştir?" :
                       aktifSoruIndex === 2 ? "5G nedir?" : 
                       `Soru ${aktifSoruIndex} içeriği`}
                    </p>
                    <div className="space-y-3 mt-4">
                      {aktifSoruIndex === 1 ? (
                        <>
                          <div className="flex items-center p-3 rounded-md hover:bg-accent/30 border border-transparent hover:border-border cursor-pointer transition-colors">
                            <input type="radio" id="q1a" name="q1" className="mr-3 h-4 w-4" />
                            <label htmlFor="q1a" className="w-full cursor-pointer">Google</label>
                          </div>
                          <div className="flex items-center p-3 rounded-md hover:bg-accent/30 border border-transparent hover:border-border cursor-pointer transition-colors">
                            <input type="radio" id="q1b" name="q1" className="mr-3 h-4 w-4" />
                            <label htmlFor="q1b" className="w-full cursor-pointer">Microsoft</label>
                          </div>
                          <div className="flex items-center p-3 rounded-md hover:bg-accent/30 border border-transparent hover:border-border cursor-pointer transition-colors">
                            <input type="radio" id="q1c" name="q1" className="mr-3 h-4 w-4" />
                            <label htmlFor="q1c" className="w-full cursor-pointer">Facebook</label>
                          </div>
                          <div className="flex items-center p-3 rounded-md hover:bg-accent/30 border border-transparent hover:border-border cursor-pointer transition-colors">
                            <input type="radio" id="q1d" name="q1" className="mr-3 h-4 w-4" />
                            <label htmlFor="q1d" className="w-full cursor-pointer">Amazon</label>
                          </div>
                        </>
                      ) : aktifSoruIndex === 2 ? (
                        <>
                          <div className="flex items-center p-3 rounded-md hover:bg-accent/30 border border-transparent hover:border-border cursor-pointer transition-colors">
                            <input type="radio" id="q2a" name="q2" className="mr-3 h-4 w-4" />
                            <label htmlFor="q2a" className="w-full cursor-pointer">Java Syntax Extension</label>
                          </div>
                          <div className="flex items-center p-3 rounded-md hover:bg-accent/30 border border-transparent hover:border-border cursor-pointer transition-colors">
                            <input type="radio" id="q2b" name="q2" className="mr-3 h-4 w-4" />
                            <label htmlFor="q2b" className="w-full cursor-pointer">JavaScript XML</label>
                          </div>
                          <div className="flex items-center p-3 rounded-md hover:bg-accent/30 border border-transparent hover:border-border cursor-pointer transition-colors">
                            <input type="radio" id="q2c" name="q2" className="mr-3 h-4 w-4" />
                            <label htmlFor="q2c" className="w-full cursor-pointer">Java Schema XML</label>
                          </div>
                          <div className="flex items-center p-3 rounded-md hover:bg-accent/30 border border-transparent hover:border-border cursor-pointer transition-colors">
                            <input type="radio" id="q2d" name="q2" className="mr-3 h-4 w-4" />
                            <label htmlFor="q2d" className="w-full cursor-pointer">JavaScript Extension</label>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center p-3 rounded-md hover:bg-accent/30 border border-transparent hover:border-border cursor-pointer transition-colors">
                            <input type="radio" id={`q${aktifSoruIndex}a`} name={`q${aktifSoruIndex}`} className="mr-3 h-4 w-4" />
                            <label htmlFor={`q${aktifSoruIndex}a`} className="w-full cursor-pointer">Seçenek A</label>
                          </div>
                          <div className="flex items-center p-3 rounded-md hover:bg-accent/30 border border-transparent hover:border-border cursor-pointer transition-colors">
                            <input type="radio" id={`q${aktifSoruIndex}b`} name={`q${aktifSoruIndex}`} className="mr-3 h-4 w-4" />
                            <label htmlFor={`q${aktifSoruIndex}b`} className="w-full cursor-pointer">Seçenek B</label>
                          </div>
                          <div className="flex items-center p-3 rounded-md hover:bg-accent/30 border border-transparent hover:border-border cursor-pointer transition-colors">
                            <input type="radio" id={`q${aktifSoruIndex}c`} name={`q${aktifSoruIndex}`} className="mr-3 h-4 w-4" />
                            <label htmlFor={`q${aktifSoruIndex}c`} className="w-full cursor-pointer">Seçenek C</label>
                          </div>
                          <div className="flex items-center p-3 rounded-md hover:bg-accent/30 border border-transparent hover:border-border cursor-pointer transition-colors">
                            <input type="radio" id={`q${aktifSoruIndex}d`} name={`q${aktifSoruIndex}`} className="mr-3 h-4 w-4" />
                            <label htmlFor={`q${aktifSoruIndex}d`} className="w-full cursor-pointer">Seçenek D</label>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Soru Navigasyon Butonları */}
                  <div className="flex justify-between mt-6">
                    <Button 
                      variant="outline"
                      onClick={oncekiSoruyaGec}
                      disabled={aktifSoruIndex === 1}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Önceki Soru
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={sonrakiSoruyaGec}
                      disabled={aktifSoruIndex === 10}
                    >
                      Sonraki Soru
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              {testBitti ? (
                <Button 
                  onClick={() => {
                    const test = egitim.testler.find(t => !t.tamamlandi);
                    if (test) {
                      testiBitir(test.id, testSonuc || 75);
                    }
                    setTestDialogAcik(false);
                  }}
                >
                  Kapat
                </Button>
              ) : (
                <div className="flex gap-2 w-full justify-between mt-4">
                  <div className="flex items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Clock className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Test süresi: 20 dakika</TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8"
                        >
                          <ListChecks className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Test raporu</TooltipContent>
                    </Tooltip>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setTestDialogAcik(false)}
                    >
                      İptal
                    </Button>
                    <Button
                      onClick={() => {
                        const randomScore = Math.floor(Math.random() * 31) + 70; // 70-100 arası rastgele puan
                        setTestSonuc(randomScore);
                        setTestBitti(true);
                      }}
                    >
                      Testi Bitir
                    </Button>
                  </div>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Sertifika Dialog */}
        <Dialog open={sertifikaDialogAcik} onOpenChange={setSertifikaDialogAcik}>
          <DialogContent className="sm:max-w-lg bg-background/95 backdrop-blur-md border-none shadow-lg">
            <DialogHeader>
              <DialogTitle>Sertifikanız Hazır!</DialogTitle>
              <DialogDescription>
                Tebrikler! "{egitim.baslik}" eğitimini başarıyla tamamladınız.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6">
              <div id="sertifikaIcerik" className="border rounded-md p-8 text-center relative overflow-hidden bg-white">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <div className="absolute top-2 right-2 opacity-10">
                  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M60 0C26.9 0 0 26.9 0 60C0 93.1 26.9 120 60 120C93.1 120 120 93.1 120 60C120 26.9 93.1 0 60 0ZM60 108C33.5 108 12 86.5 12 60C12 33.5 33.5 12 60 12C86.5 12 108 33.5 108 60C108 86.5 86.5 108 60 108Z" fill="currentColor"/>
                    <path d="M60 30C43.5 30 30 43.5 30 60C30 76.5 43.5 90 60 90C76.5 90 90 76.5 90 60C90 43.5 76.5 30 60 30ZM60 78C50.1 78 42 69.9 42 60C42 50.1 50.1 42 60 42C69.9 42 78 50.1 78 60C78 69.9 69.9 78 60 78Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="mb-4">
                  <BookOpen className="h-12 w-12 mx-auto text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-3">Başarı Sertifikası</h2>
                <p className="text-muted-foreground mb-4">Bu belge</p>
                <p className="text-xl font-medium mb-4">Ahmet Yılmaz</p>
                <p className="text-muted-foreground mb-6">
                  adlı kişinin <span className="font-medium text-foreground">{egitim.baslik}</span> eğitimini
                  başarıyla tamamladığını belgelemektedir.
                </p>
                <div className="flex items-center justify-center my-6">
                  <div className="h-px bg-gray-200 w-16"></div>
                  <Award className="h-6 w-6 text-amber-500 mx-4" />
                  <div className="h-px bg-gray-200 w-16"></div>
                </div>
                <div className="text-muted-foreground text-sm mt-6 flex justify-between">
                  <span>Tarih: {new Date().toLocaleDateString("tr-TR")}</span>
                  <span>Sertifika No: CERT-{Math.floor(Math.random() * 100000).toString().padStart(6, '0')}</span>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <div className="flex w-full justify-between sm:justify-start gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setSertifikaDialogAcik(false)}
                  className="flex-1 sm:flex-initial"
                >
                  Kapat
                </Button>
                <Button 
                  variant="outline"
                  className="gap-1 flex-1 sm:flex-initial"
                  onClick={() => {
                    // Simüle edilmiş PDF indirme işlemi
                    const link = document.createElement('a');
                    link.href = "#";
                    link.setAttribute('download', `${egitim.baslik.replace(/\s+/g, '_')}_Sertifika.pdf`);
                    document.body.appendChild(link);
                    setTimeout(() => {
                      link.click();
                      document.body.removeChild(link);
                      showToast({
                        title: "Sertifika İndiriliyor",
                        description: "Sertifikanız PDF formatında indirilmeye başlıyor.",
                      });
                    }, 100);
                  }}
                >
                  <Download className="h-4 w-4 mr-1" /> PDF İndir
                </Button>
              </div>
              <div className="flex w-full justify-between sm:justify-end gap-2">
                <Button
                  variant="outline" 
                  className="gap-1 flex-1 sm:flex-initial"
                  onClick={() => {
                    // Simüle edilmiş yazdırma işlemi
                    showToast({
                      title: "Yazdırılıyor",
                      description: "Sertifika yazdırma penceresi açılıyor.",
                    });
                    // Gerçek uygulamada yazdırma penceresi açılır
                  }}
                >
                  <Printer className="h-4 w-4 mr-1" /> Yazdır
                </Button>
                <Button
                  className="gap-1 flex-1 sm:flex-initial"
                  onClick={() => {
                    // Simüle edilmiş paylaşım işlemi
                    showToast({
                      title: "Paylaşım Bağlantısı Kopyalandı",
                      description: "Sertifika paylaşım bağlantısı panoya kopyalandı.",
                    });
                  }}
                >
                  <Share className="h-4 w-4 mr-1" /> Paylaş
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Başarı Toast Mesajı */}
        <Toaster 
          position="top-right" 
          toastOptions={{
            className: "backdrop-blur-md bg-background/80 border border-border shadow-lg"
          }}
        />
      </div>
    </TooltipProvider>
  );
}

// Video oynatıcı component'i
function VideoPlayer({ src, poster, title }: { src: string; poster?: string; title?: string }) {
  const [playing, setPlaying] = useState(false);
  
  return (
    <div className="relative aspect-video bg-black rounded-md overflow-hidden">
      {!playing ? (
        <div className="absolute inset-0 flex items-center justify-center">
          {poster ? (
            <img src={poster} alt="Video Poster" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>
          )}
          <Button 
            variant="outline" 
            size="lg" 
            className="relative z-10 rounded-full h-16 w-16 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/40"
            onClick={() => setPlaying(true)}
          >
            <Play className="h-8 w-8 text-white" fill="white" />
          </Button>
          <div className="absolute bottom-4 left-4 text-white font-medium text-lg">
            {title || "Video Dersi"}
          </div>
        </div>
      ) : (
        <video 
          className="w-full h-full" 
          controls 
          autoPlay 
          src={src || "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      )}
    </div>
  );
} 