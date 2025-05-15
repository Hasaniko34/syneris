"use client";

import React, { useState, useEffect } from "react";
import { useRouter, PageProps } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  BookOpen, 
  Check, 
  Clock, 
  Users, 
  Star, 
  CalendarDays, 
  User, 
  Trophy, 
  ListChecks, 
  Globe, 
  PlusCircle, 
  LucideIcon, 
  BookMarked, 
  BadgeCheck,
  ArrowLeft,
  Info,
  Heart,
  PlayCircle,
  Tag,
  UserCheck,
  CheckCircle2,
  FileText,
  Video,
  Target,
  Smartphone,
  Bot,
  ChevronLeft,
  ChevronRight,
  AlertCircle
} from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";
import { egitimKataloguVerileri } from "@/app/dashboard/egitim-katalogu/data";

// Sahte ön tanımlı eğitim içeriği (gerçek projede API'den gelecek)
const modules = [
  {
    id: "1",
    title: "Giriş ve Temel Kavramlar",
    duration: "45 dk",
    lectures: [
      { id: "l1", title: "Kurs Tanıtımı ve Genel Bakış", duration: "10 dk", type: "video" },
      { id: "l2", title: "Gerekli Kurulumlar ve Hazırlıklar", duration: "15 dk", type: "video" },
      { id: "l3", title: "Temel Kavramlar", duration: "20 dk", type: "video" },
    ]
  },
  {
    id: "2",
    title: "Temel Uygulamalar",
    duration: "1 saat 30 dk",
    lectures: [
      { id: "l4", title: "Temel Proje Yapısı", duration: "20 dk", type: "video" },
      { id: "l5", title: "İlk Uygulama", duration: "25 dk", type: "video" },
      { id: "l6", title: "Pratik Alıştırma", duration: "20 dk", type: "quiz" },
      { id: "l7", title: "Örnek Proje Geliştirme", duration: "25 dk", type: "video" },
    ]
  },
  {
    id: "3",
    title: "İleri Seviye Konular",
    duration: "2 saat",
    lectures: [
      { id: "l8", title: "İleri Seviye Özellikler", duration: "30 dk", type: "video" },
      { id: "l9", title: "Performans Optimizasyonu", duration: "25 dk", type: "video" },
      { id: "l10", title: "Üretim Ortamına Hazırlık", duration: "20 dk", type: "video" },
      { id: "l11", title: "Güvenlik Konuları", duration: "25 dk", type: "video" },
      { id: "l12", title: "İleri Seviye Quiz", duration: "20 dk", type: "quiz" },
    ]
  },
  {
    id: "4", 
    title: "Proje ve Sertifika",
    duration: "3 saat",
    lectures: [
      { id: "l13", title: "Final Projesi", duration: "2 saat", type: "project" },
      { id: "l14", title: "Sertifika Sınavı", duration: "1 saat", type: "exam" },
    ]
  }
];

// Sahte yorumlar 
const yorumlar = [
  {
    id: "y1",
    user: {
      name: "Mehmet K.",
      avatar: null,
      role: "Yazılım Geliştirici"
    },
    rating: 5,
    date: "2023-11-15",
    comment: "Çok kapsamlı ve detaylı bir eğitim. Özellikle pratik örnekler çok faydalı oldu. Eğitmenin anlatımı da çok akıcı, kesinlikle tavsiye ederim."
  },
  {
    id: "y2",
    user: {
      name: "Ayşe Y.",
      avatar: null,
      role: "UX Designer"
    },
    rating: 4,
    date: "2023-10-22",
    comment: "Konuları çok iyi anlatıyor, başlangıç seviyesi için ideal. Daha fazla alıştırma olabilirdi, ama genel olarak çok memnun kaldım."
  },
  {
    id: "y3",
    user: {
      name: "Ali R.",
      avatar: null,
      role: "Proje Yöneticisi"
    },
    rating: 5,
    date: "2023-09-30",
    comment: "İş hayatımda hemen kullanmaya başladığım bir eğitim oldu. Pratik uygulamalar ve gerçek dünya örnekleri çok değerli."
  }
];

interface EgitimOzellik {
  icon: LucideIcon;
  baslik: string;
  deger: string;
}

export default function EgitimKayitPage({ params }: PageProps<{ egitimId: string }>) {
  // params'ı React.use() ile açıyoruz
  const unwrappedParams = React.use(params);
  const egitimId = unwrappedParams.egitimId;
  
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [egitim, setEgitim] = useState<any>(null);
  const [relatedCourses, setRelatedCourses] = useState<any[]>([]);
  const [kayitDurumu, setKayitDurumu] = useState<"beklemede" | "basarili" | "hata">("beklemede");

  useEffect(() => {
    const getEgitimVerisi = () => {
      // Eğitim verilerini ID'ye göre bulma (gerçek projede API'den gelecek)
      // Ana katalog verisinden eğitimi buluyoruz
      const bulunanEgitim = egitimKataloguVerileri.find(e => e.id === egitimId);
      
      if (!bulunanEgitim) {
        // Eğitim bulunamadıysa ana katalog sayfasına yönlendir
        toast({
          title: "Eğitim bulunamadı",
          description: "İstediğiniz eğitim katalogda mevcut değil.",
          variant: "destructive"
        });
        router.push("/dashboard/egitim-katalogu");
        return;
      }
      
      setEgitim(bulunanEgitim);
      
      // İlgili eğitimleri bul (aynı kategoriden veya etiketlere göre)
      const related = egitimKataloguVerileri
        .filter(e => e.id !== egitimId && 
                    (e.kategori === bulunanEgitim.kategori || 
                     e.etiketler.some(tag => bulunanEgitim.etiketler.includes(tag))))
        .slice(0, 3);
      
      setRelatedCourses(related);
      setLoading(false);
    };
    
    getEgitimVerisi();
  }, [egitimId, router, toast]);

  // Eğitime kaydolma fonksiyonu
  const handleEnroll = async () => {
    setEnrolling(true);
    
    // Burada gerçek bir API çağrısı olacak
    // Simülasyon için timeout kullanıyoruz
    setTimeout(() => {
      toast({
        title: "Kaydınız Başarıyla Tamamlandı!",
        description: "Eğitime başlamak için 'Eğitimlerim' sayfasına yönlendiriliyorsunuz.",
      });
      
      // Kaydolduktan sonra eğitimlerim sayfasına yönlendir
      setTimeout(() => {
        router.push("/dashboard/egitimlerim");
      }, 1500);
      
      setEnrolling(false);
    }, 1500);
  };

  // Eğitim özellikleri
  const getOzellikler = (egitim: any): EgitimOzellik[] => [
    { icon: Clock, baslik: "Süre", deger: egitim.sure },
    { icon: Users, baslik: "Katılımcı", deger: egitim.katilimciSayisi + " kişi" },
    { icon: Trophy, baslik: "Seviye", deger: egitim.seviye },
    { icon: ListChecks, baslik: "Toplam İçerik", deger: "12 ders, 6 test" },
    { icon: CalendarDays, baslik: "Son Güncelleme", deger: "Kasım 2023" },
    { icon: Globe, baslik: "Erişim", deger: egitim.online ? "Online Eğitim" : "Yüz Yüze Eğitim" },
  ];

  if (loading) {
    return (
      <div className="container max-w-6xl mx-auto py-10 flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Eğitim bilgileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!egitim) return null;

  const ozellikler = getOzellikler(egitim);
  
  const handleKayit = () => {
    // Simüle edilmiş kayıt işlemi
    setKayitDurumu("basarili");
    setTimeout(() => {
      router.push(`/dashboard/egitimlerim/${egitimId}`);
    }, 2000);
  };

  return (
    <div className="container max-w-6xl mx-auto py-8">
      {/* Geri butonu */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.back()}
          className="gap-1 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Geri Dön
        </Button>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Sol kolon - Eğitim içeriği */}
        <div className="md:col-span-2 space-y-6">
          {/* Eğitim başlığı ve özeti */}
          <div className="space-y-4">
            <div>
              <Badge className="mb-2">{egitim.kategori}</Badge>
              <h1 className="text-3xl font-bold leading-tight">{egitim.baslik}</h1>
            </div>
            
            <p className="text-muted-foreground">{egitim.aciklama}</p>
            
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                <span className="font-medium">{egitim.puan}</span>
                <span className="text-muted-foreground">({Math.floor(egitim.katilimciSayisi / 3)} değerlendirme)</span>
              </div>
              
              <Separator orientation="vertical" className="h-5" />
              
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{egitim.katilimciSayisi} katılımcı</span>
              </div>
              
              <Separator orientation="vertical" className="h-5" />
              
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(egitim.egitmen)}&background=random`} />
                  <AvatarFallback>{egitim.egitmen ? egitim.egitmen.charAt(0) : 'E'}</AvatarFallback>
                </Avatar>
                <span>{egitim.egitmen}</span>
              </div>
            </div>
          </div>
          
          {/* Eğitim içerik sekmesi */}
          <Tabs defaultValue="content" className="mt-8">
            <TabsList className="mb-4">
              <TabsTrigger value="content">Eğitim İçeriği</TabsTrigger>
              <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
              <TabsTrigger value="reviews">Yorumlar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ListChecks className="h-5 w-5 text-primary" />
                    Eğitim Müfredatı
                  </CardTitle>
                  <CardDescription>
                    Toplam içerik: {modules.length} modül, {modules.reduce((total, module) => total + module.lectures.length, 0)} ders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {modules.map((module) => (
                      <AccordionItem key={module.id} value={module.id}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex flex-col items-start text-left">
                            <div className="font-medium">{module.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {module.lectures.length} ders • {module.duration}
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            {module.lectures.map((lecture) => (
                              <div 
                                key={lecture.id} 
                                className="flex items-center justify-between py-2 px-4 rounded-md hover:bg-muted/50"
                              >
                                <div className="flex items-center gap-3">
                                  {lecture.type === 'video' && (
                                    <BookOpen className="h-4 w-4 text-blue-500" />
                                  )}
                                  {lecture.type === 'quiz' && (
                                    <ListChecks className="h-4 w-4 text-green-500" />
                                  )}
                                  {lecture.type === 'project' && (
                                    <BookMarked className="h-4 w-4 text-purple-500" />
                                  )}
                                  {lecture.type === 'exam' && (
                                    <BadgeCheck className="h-4 w-4 text-amber-500" />
                                  )}
                                  <span className="text-sm">{lecture.title}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">{lecture.duration}</span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Eğitim Hakkında</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Eğitim Özeti</h3>
                    <p className="text-muted-foreground">
                      {egitim.aciklama} Bu eğitimde, temel kavramlardan başlayarak ileri seviye konulara kadar adım adım ilerleyecek ve pratik uygulamalarla öğrendiklerinizi pekiştireceksiniz.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Neler Öğreneceksiniz?</h3>
                    <ul className="space-y-2">
                      {egitim.etiketler.map((etiket: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>{etiket} ile ilgili temel ve ileri seviye konseptler</span>
                        </li>
                      ))}
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Gerçek dünya projelerinde pratik uygulama becerileri</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Endüstri standartlarına uygun en iyi pratikler</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Ön Koşullar</h3>
                    <p className="text-muted-foreground">
                      Bu eğitim için temel seviyede bilgisayar becerileri yeterlidir. {egitim.seviye === 'Başlangıç' ? 'Herhangi bir ön bilgi gerekmemektedir.' : `${egitim.seviye === 'Orta' ? 'Temel' : 'Orta'} seviye bilgi birikimi faydalı olacaktır.`}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Eğitmen Hakkında</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(egitim.egitmen)}&background=random&size=80`} />
                      <AvatarFallback className="text-2xl">{egitim.egitmen ? egitim.egitmen.charAt(0) : 'E'}</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">{egitim.egitmen}</h3>
                    <p className="text-muted-foreground">
                      {egitim.egitmen}, {egitim.kategori} alanında {Math.floor(Math.random() * 10) + 5} yıllık deneyime sahip uzman bir eğitmendir. 
                      Sektörde çeşitli projelerde görev almış ve birçok başarılı öğrenci yetiştirmiştir. 
                      Eğitim yaklaşımında pratik uygulamalara ve gerçek dünya örneklerine önem vermektedir.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Eğitim Değerlendirmeleri</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                      <span className="font-medium">{egitim.puan}</span>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Toplam {Math.floor(egitim.katilimciSayisi / 3)} değerlendirme
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {yorumlar.map((yorum) => (
                    <div key={yorum.id} className="pb-4 border-b last:border-b-0 last:pb-0">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={yorum.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(yorum.user.name)}&background=random`} />
                          <AvatarFallback>{yorum.user.name ? yorum.user.name.charAt(0) : 'K'}</AvatarFallback>
                        </Avatar>
                        
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <div>
                              <h4 className="font-medium">{yorum.user.name}</h4>
                              <p className="text-sm text-muted-foreground">{yorum.user.role}</p>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                  <Star 
                                    key={idx}
                                    className={`h-4 w-4 ${idx < yorum.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">{yorum.date}</span>
                            </div>
                          </div>
                          
                          <p className="text-sm">{yorum.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Benzer eğitimler */}
          {relatedCourses.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Benzer Eğitimler</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        <Link 
                          href={`/dashboard/egitimlerim/kayit/${course.id}`}
                          className="hover:text-primary transition-colors line-clamp-2"
                        >
                          {course.baslik}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.sure}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                          <span>{course.puan}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="w-full"
                        asChild
                      >
                        <Link href={`/dashboard/egitimlerim/kayit/${course.id}`}>
                          Detayları Gör
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Sağ kolon - Kayıt kartı */}
        <div className="space-y-4">
          {/* Kayıt kartı */}
          <Card className="sticky top-20">
            <CardHeader className="pb-2">
              <CardTitle>Eğitime Kaydolun</CardTitle>
              <CardDescription>
                Hemen kaydolun ve öğrenmeye başlayın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Fiyat bilgisi */}
              <div className="flex items-center gap-2">
                {egitim.fiyat === 0 ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                    Ücretsiz
                  </Badge>
                ) : (
                  <div className="text-xl font-bold">{egitim.fiyat} ₺</div>
                )}
              </div>
              
              {/* Özet bilgiler */}
              <div className="space-y-3 my-6">
                {ozellikler.map((ozellik, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <ozellik.icon className="h-4 w-4 text-muted-foreground" />
                    <div className="flex justify-between w-full">
                      <span className="text-muted-foreground">{ozellik.baslik}:</span>
                      <span className="font-medium">{ozellik.deger}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Sertifika bilgisi */}
              <Alert className="bg-primary/5 border-primary/20">
                <BadgeCheck className="h-4 w-4 text-primary" />
                <AlertTitle>Sertifika İçerir</AlertTitle>
                <AlertDescription className="text-xs">
                  Bu eğitimi tamamladığınızda sertifika almaya hak kazanacaksınız.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              {kayitDurumu === "beklemede" && (
                <Button 
                  className="w-full" 
                  onClick={handleKayit}
                  disabled={enrolling}
                >
                  {enrolling ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2"></div>
                      Kaydolunuyor...
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Eğitime Kaydol
                    </>
                  )}
                </Button>
              )}

              {kayitDurumu === "basarili" && (
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-medium mb-1">Kayıt Başarılı!</h3>
                  <p className="text-sm text-muted-foreground">
                    Eğitim sayfasına yönlendiriliyorsunuz...
                  </p>
                </div>
              )}

              {kayitDurumu === "hata" && (
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="font-medium mb-1">Kayıt Başarısız</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Bir hata oluştu. Lütfen tekrar deneyin.
                  </p>
                  <Button className="w-full teb-button" onClick={handleKayit}>
                    Tekrar Dene
                  </Button>
                </div>
              )}
              
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/egitim-katalogu">
                  Kataloğa Dön
                </Link>
              </Button>
              
              <div className="text-xs text-center text-muted-foreground mt-4">
                <span className="flex items-center justify-center gap-1">
                  <Heart className="h-3 w-3" />
                  {Math.floor(egitim.katilimciSayisi / 5)} kişi bu eğitimi favorilerine ekledi
                </span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </motion.div>
    </div>
  );
} 