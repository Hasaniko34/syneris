"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  Play,
  Search,
  SortAsc,
  Trophy,
  Award,
  BookMarked,
  Compass,
  Flame,
  Star,
  Users,
  UserCheck,
  PlayCircle,
  Briefcase,
  Building,
  CreditCard,
  PieChart,
  BarChart,
  ShieldCheck,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Turkcell kariyer yolları verileri
const ogrenmeYollariVerileri = [
  {
    id: "1",
    baslik: "Dijital Teknolojiler Kariyer Yolu",
    aciklama: "Dijital servisler, mobil uygulama geliştirme, 5G teknolojileri ve siber güvenlik konusunda uzmanlaşarak Turkcell'de dijital teknolojiler kariyeri edinme yolu.",
    kategori: "Dijital Teknolojiler",
    ilerleme: 45,
    egitimSayisi: 8,
    yaklasiksure: "40 saat",
    zorlukSeviyesi: "Orta",
    tamamlayanlar: 358,
    yildizlar: 4.8,
    rozet: "En Popüler",
    etiketler: ["5G", "Siber Güvenlik", "Mobil Uygulama", "Dijital Servisler"],
  },
  {
    id: "2",
    baslik: "Şube Müdürlüğü Gelişim Programı",
    aciklama: "Şube operasyonları, ekip yönetimi, satış stratejileri ve performans değerlendirme konularında Turkcell şube müdürlerinin becerilerini geliştiren program.",
    kategori: "Liderlik",
    ilerleme: 20,
    egitimSayisi: 6,
    yaklasiksure: "35 saat",
    zorlukSeviyesi: "İleri",
    tamamlayanlar: 124,
    yildizlar: 4.6,
    rozet: "Yönetsel",
    etiketler: ["Şube Yönetimi", "Liderlik", "Performans", "Operasyon"],
  },
  {
    id: "3",
    baslik: "Telekom Verilerinde Analiz Uzmanlığı",
    aciklama: "Telekom verilerinin analizi, müşteri segmentasyonu, network optimizasyonu ve karar destek sistemleri konularında uzmanlaşma yolu.",
    kategori: "Veri Bilimi",
    ilerleme: 0,
    egitimSayisi: 7,
    yaklasiksure: "50 saat",
    zorlukSeviyesi: "İleri",
    tamamlayanlar: 85,
    yildizlar: 4.9,
    rozet: "Yenilikçi",
    etiketler: ["Veri Analizi", "Raporlama", "Segmentasyon", "İstatistik"],
  },
  {
    id: "4",
    baslik: "Kurumsal Müşteri Yönetimi Uzmanı",
    aciklama: "Kurumsal segment müşterileri için satış, çözüm geliştirme, müşteri ilişkileri yönetimi ve kurumsal hizmetler konusunda uzmanlaşma programı.",
    kategori: "Kurumsal Hizmetler",
    ilerleme: 75,
    egitimSayisi: 5,
    yaklasiksure: "30 saat",
    zorlukSeviyesi: "Orta",
    tamamlayanlar: 142,
    yildizlar: 4.5,
    rozet: null,
    etiketler: ["Kurumsal", "Çözüm Geliştirme", "Müşteri İlişkileri", "İş Analizi"],
  },
  {
    id: "5",
    baslik: "Dijital Ürün ve Servis Yönetimi",
    aciklama: "Mobil uygulama yönetimi, dijital ürün portföyü, kullanıcı deneyimi ve dijital pazarlama konularında uzmanlaşarak danışmanlık hizmeti sunma yolu.",
    kategori: "Dijital Ürünler",
    ilerleme: 10,
    egitimSayisi: 6,
    yaklasiksure: "45 saat",
    zorlukSeviyesi: "İleri",
    tamamlayanlar: 89,
    yildizlar: 4.7,
    rozet: null,
    etiketler: ["Dijital Ürünler", "UX/UI", "Ürün Yönetimi", "Dijital Pazarlama"],
  },
  {
    id: "6",
    baslik: "Dijital Dönüşüm ve Telekomünikasyon Teknolojileri",
    aciklama: "Fibertürk, 5G, açık kaynak API entegrasyonları ve telekomünikasyon teknolojileri konusunda uzmanlaşma programı.",
    kategori: "Dijital Dönüşüm",
    ilerleme: 0,
    egitimSayisi: 6,
    yaklasiksure: "35 saat",
    zorlukSeviyesi: "Orta",
    tamamlayanlar: 127,
    yildizlar: 4.6,
    rozet: "Dijital",
    etiketler: ["Fibertürk", "5G", "API", "IoT"],
  },
];

// Turkcell için kategoriler listesi
const kategoriler = [
  "Tümü",
  "Dijital Teknolojiler",
  "Kurumsal Hizmetler",
  "Dijital Dönüşüm",
  "Liderlik",
  "Veri Bilimi",
  "Dijital Ürünler",
];

// Zorluk seviyeleri
const zorlukSeviyeleri = ["Tümü", "Başlangıç", "Orta", "İleri"];

export default function OgrenmeYollariPage() {
  const router = useRouter();
  const [aramaMetni, setAramaMetni] = useState("");
  const [seciliKategori, setSeciliKategori] = useState("Tümü");
  const [seciliZorluk, setSeciliZorluk] = useState("Tümü");
  const [siralama, setSiralama] = useState("populer");
  const [filtrelenmisYollar, setFiltrelenmisYollar] = useState(ogrenmeYollariVerileri);
  const [aktifTab, setAktifTab] = useState("tum-yollar");
  const [yukleniyor, setYukleniyor] = useState(true);

  // Yükleme simülasyonu
  useEffect(() => {
    setTimeout(() => {
      setYukleniyor(false);
    }, 1000);
  }, []);

  // Filtreleme ve sıralama
  useEffect(() => {
    let sonuc = [...ogrenmeYollariVerileri];

    // Tab filtresi
    if (aktifTab === "devam-edenler") {
      sonuc = sonuc.filter((yol) => yol.ilerleme > 0 && yol.ilerleme < 100);
    } else if (aktifTab === "tamamlananlar") {
      sonuc = sonuc.filter((yol) => yol.ilerleme === 100);
    } else if (aktifTab === "baslanmayanlar") {
      sonuc = sonuc.filter((yol) => yol.ilerleme === 0);
    }

    // Kategori filtresi
    if (seciliKategori !== "Tümü") {
      sonuc = sonuc.filter((yol) => yol.kategori === seciliKategori);
    }

    // Zorluk filtresi
    if (seciliZorluk !== "Tümü") {
      sonuc = sonuc.filter((yol) => yol.zorlukSeviyesi === seciliZorluk);
    }

    // Arama filtresi
    if (aramaMetni) {
      const aramaTerim = aramaMetni.toLowerCase();
      sonuc = sonuc.filter(
        (yol) =>
          yol.baslik.toLowerCase().includes(aramaTerim) ||
          yol.aciklama.toLowerCase().includes(aramaTerim) ||
          yol.etiketler.some((etiket) => etiket.toLowerCase().includes(aramaTerim))
      );
    }

    // Sıralama
    sonuc.sort((a, b) => {
      switch (siralama) {
        case "populer":
          return b.tamamlayanlar - a.tamamlayanlar;
        case "yeni-eklenen":
          return b.id.localeCompare(a.id); // Bu örnek için basitleştirilmiş
        case "yuksek-puan":
          return b.yildizlar - a.yildizlar;
        case "kisa-sure":
          return parseInt(a.yaklasiksure) - parseInt(b.yaklasiksure);
        case "uzun-sure":
          return parseInt(b.yaklasiksure) - parseInt(a.yaklasiksure);
        default:
          return 0;
      }
    });

    setFiltrelenmisYollar(sonuc);
  }, [aramaMetni, seciliKategori, seciliZorluk, siralama, aktifTab]);

  // "Devam Et" butonuna tıklandığında oluşturduğumuz detay sayfasına yönlendir
  const handleContinueCourse = (courseId) => {
    router.push(`/dashboard/ogrenme-yollari/${courseId}`);
  };

  // "Keşfet" butonuna tıklandığında oluşturduğumuz detay sayfasına yönlendir
  const handleExploreCourse = (courseId) => {
    router.push(`/dashboard/ogrenme-yollari/${courseId}`);
  };

  // Yükleme durumu
  if (yukleniyor) {
    return (
      <div className="container mx-auto py-6 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A0D2] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Kariyer yolları yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#00A0D2]">Turkcell Kariyer Yolları</h1>
        <p className="text-muted-foreground mt-1">
          Telekomünikasyon kariyerinizde ilerlemek için özelleştirilmiş eğitim programları
        </p>
      </div>

      {/* Tablar */}
      <Tabs value={aktifTab} onValueChange={setAktifTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tum-yollar" className="text-[#00A0D2]">
            <Compass className="w-4 h-4 mr-2" />
            Tüm Yollar
          </TabsTrigger>
          <TabsTrigger value="devam-edenler" className="text-[#00A0D2]">
            <Play className="w-4 h-4 mr-2" />
            Devam Eden
          </TabsTrigger>
          <TabsTrigger value="tamamlananlar" className="text-[#00A0D2]">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Tamamlanan
          </TabsTrigger>
          <TabsTrigger value="baslanmayanlar" className="text-[#00A0D2]">
            <PlayCircle className="w-4 h-4 mr-2" />
            Yeni
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Arama ve filtreler */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 flex items-center relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Kariyer yolu ara..."
            className="pl-9"
            value={aramaMetni}
            onChange={(e) => setAramaMetni(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap md:flex-nowrap">
          <div className="w-full md:w-auto flex">
            <div className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground shadow-sm h-10">
              <Filter className="h-3.5 w-3.5 mr-1" />
              <span className="hidden sm:inline">Kategori</span>
            </div>
          <Select value={seciliKategori} onValueChange={setSeciliKategori}>
              <SelectTrigger className="rounded-l-none h-10 min-w-[120px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {kategoriler.map((kategori) => (
                <SelectItem key={kategori} value={kategori}>
                  {kategori}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          </div>
          <div className="w-full md:w-auto flex">
            <div className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground shadow-sm h-10">
              <Trophy className="h-3.5 w-3.5 mr-1" />
              <span className="hidden sm:inline">Seviye</span>
            </div>
          <Select value={seciliZorluk} onValueChange={setSeciliZorluk}>
              <SelectTrigger className="rounded-l-none h-10 min-w-[120px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {zorlukSeviyeleri.map((seviye) => (
                  <SelectItem key={seviye} value={seviye}>
                    {seviye}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          </div>
          <div className="w-full md:w-auto flex">
            <div className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground shadow-sm h-10">
              <SortAsc className="h-3.5 w-3.5 mr-1" />
              <span className="hidden sm:inline">Sırala</span>
            </div>
          <Select value={siralama} onValueChange={setSiralama}>
              <SelectTrigger className="rounded-l-none h-10 min-w-[150px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="populer">En Popüler</SelectItem>
                <SelectItem value="yeni-eklenen">Yeni Eklenenler</SelectItem>
                <SelectItem value="yuksek-puan">Yüksek Puanlı</SelectItem>
                <SelectItem value="kisa-sure">Kısa Süreli</SelectItem>
                <SelectItem value="uzun-sure">Uzun Süreli</SelectItem>
            </SelectContent>
          </Select>
          </div>
        </div>
      </div>

      {/* Kariyer Yolları Listesi */}
      {filtrelenmisYollar.length === 0 ? (
        <div className="text-center py-20">
            <Compass className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Kariyer yolu bulunamadı</h3>
          <p className="text-muted-foreground mb-4">
            Arama kriterlerinize uygun bir kariyer yolu bulunamadı. Filtreleri temizlemeyi deneyin.
            </p>
          <Button
            variant="outline"
            onClick={() => {
              setAramaMetni("");
              setSeciliKategori("Tümü");
              setSeciliZorluk("Tümü");
              setAktifTab("tum-yollar");
            }}
          >
            Filtreleri Temizle
            </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrelenmisYollar.map((yol) => {
            // Kategoriye göre icon seçimi
            let CategoryIcon;
            switch (yol.kategori) {
              case "Dijital Teknolojiler":
                CategoryIcon = CreditCard;
                break;
              case "Kurumsal Hizmetler":
                CategoryIcon = Building;
                break;
              case "Dijital Dönüşüm":
                CategoryIcon = BookOpen;
                break;
              case "Liderlik":
                CategoryIcon = UserCheck;
                break;
              case "Veri Bilimi":
                CategoryIcon = BarChart;
                break;
              case "Dijital Ürünler":
                CategoryIcon = PieChart;
                break;
              default:
                CategoryIcon = Briefcase;
            }

            return (
              <Card key={yol.id} className="border-[#00A0D2]/20 overflow-hidden flex flex-col">
                <CardHeader className="relative pb-2">
                  <div className="flex justify-between items-start">
                    <div className="h-10 w-10 rounded-md bg-[#FFD100]/20 flex items-center justify-center">
                      <CategoryIcon className="h-5 w-5 text-[#00A0D2]" />
                    </div>
                {yol.rozet && (
                  <Badge 
                        variant="secondary"
                        className="bg-[#FFD100]/20 text-[#00A0D2] hover:bg-[#FFD100]/30"
                  >
                        {yol.rozet === "En Popüler" ? (
                          <>
                            <Flame className="h-3.5 w-3.5 mr-1" /> {yol.rozet}
                          </>
                        ) : yol.rozet === "Yönetsel" ? (
                          <>
                            <UserCheck className="h-3.5 w-3.5 mr-1" /> {yol.rozet}
                          </>
                        ) : yol.rozet === "Yenilikçi" ? (
                          <>
                            <Award className="h-3.5 w-3.5 mr-1" /> {yol.rozet}
                          </>
                        ) : yol.rozet === "Dijital" ? (
                          <>
                            <Compass className="h-3.5 w-3.5 mr-1" /> {yol.rozet}
                          </>
                        ) : (
                          yol.rozet
                        )}
                  </Badge>
                )}
                  </div>
                  <CardTitle className="text-xl font-semibold mt-3 text-[#00A0D2]">{yol.baslik}</CardTitle>
                  <CardDescription className="mt-1 line-clamp-2">{yol.aciklama}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2 flex-grow">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {yol.etiketler.map((etiket, index) => (
                        <Badge variant="outline" key={index} className="text-xs">
                          {etiket}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BookMarked className="h-3.5 w-3.5" />
                        <span>{yol.egitimSayisi} Eğitim</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                    <span>{yol.yaklasiksure}</span>
                  </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Trophy className="h-3.5 w-3.5" />
                    <span>{yol.zorlukSeviyesi}</span>
                  </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{yol.yildizlar.toFixed(1)}</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-3.5 w-3.5" />
                        <span>{yol.tamamlayanlar} kişi</span>
                  </div>
                </div>
                    <div>
                      <div className="flex justify-between items-center mb-1.5 text-sm">
                        <span className="font-medium">İlerleme</span>
                        <span>{yol.ilerleme}%</span>
                      </div>
                      <Progress value={yol.ilerleme} className="h-2 bg-[#FFD100]/20" indicatorClassName="bg-[#00A0D2]" />
                    </div>
                </div>
              </CardContent>
                <CardFooter className="pt-2">
                  {yol.ilerleme > 0 ? (
                    <Button
                      className="w-full bg-[#00A0D2] hover:bg-[#0080A8]"
                      onClick={() => handleContinueCourse(yol.id)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Devam Et
                    </Button>
                  ) : (
                  <Button 
                      className="w-full bg-[#00A0D2] hover:bg-[#0080A8]"
                      onClick={() => handleExploreCourse(yol.id)}
                    >
                      <Compass className="h-4 w-4 mr-2" />
                      Keşfet
                  </Button>
                  )}
              </CardFooter>
            </Card>
            );
          })}
        </div>
      )}
    </div>
  );
} 