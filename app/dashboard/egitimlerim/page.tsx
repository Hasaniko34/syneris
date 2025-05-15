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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Calendar,
  CalendarIcon,
  CheckCircle2,
  ChevronRight,
  Clock,
  Filter,
  MoreHorizontal,
  Play,
  Search,
  Star,
  X,
  SortAsc,
  Timer,
  Users2,
  ListChecks,
  Check,
  CalendarDays,
  RepeatIcon,
  PlayIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { EGITIMLER } from "./egitim-data";

// Tarih formatlama fonksiyonu
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  
  const date = new Date(dateString);
  
  // Geçerli bir tarih değilse boş döndür
  if (isNaN(date.getTime())) return "";
  
  // Türkçe ay isimleri
  const aylar = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  
  const gun = date.getDate();
  const ay = aylar[date.getMonth()];
  const yil = date.getFullYear();
  
  return `${gun} ${ay} ${yil}`;
};

// Örnek eğitim verileri
const egitimVerileri = EGITIMLER;

// Durum adları ve badge stilleri
const durumlar = {
  tamamlandi: {
    ad: "Tamamlandı",
    stil: "teb-badge-success",
    icon: <CheckCircle2 className="h-4 w-4 mr-1" />,
  },
  devam_ediyor: {
    ad: "Devam Ediyor",
    stil: "teb-badge",
    icon: <Play className="h-4 w-4 mr-1" />,
  },
  baslanmadi: {
    ad: "Başlanmadı",
    stil: "teb-badge-muted",
    icon: <Timer className="h-4 w-4 mr-1" />,
  },
};

// Kategoriler listesi
const kategoriler = [
  "Tümü",
  "Bireysel Bankacılık",
  "KOBİ Bankacılığı",
  "Dijital Bankacılık",
  "Operasyonel Süreçler",
  "Müşteri İlişkileri",
  "Mevzuat ve Uyum",
  "Liderlik ve Yönetim",
];

// Eğitim kartı bileşeni
const EgitimKarti = ({ egitim }: { egitim: any }) => {
  const durumBilgisi = durumlar[egitim.durum as keyof typeof durumlar];
  const router = useRouter();

  return (
    <Card 
      className="turkcell-card h-full flex flex-col transition-all duration-200 hover:shadow-md hover:border-[#00A0D2]/30 cursor-pointer"
      onClick={() => router.push(`/dashboard/egitimlerim/${egitim.id}`)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge className={durumBilgisi.stil.replace('teb-badge', 'turkcell-badge').replace('teb-badge-success', 'turkcell-badge-success').replace('teb-badge-muted', 'turkcell-badge-muted')}>
            {durumBilgisi.icon}
            {durumBilgisi.ad}
          </Badge>
          {egitim.zorunlu && (
            <Badge variant="outline" className="turkcell-badge-accent">
              Zorunlu Eğitim
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg turkcell-title">
          {egitim.baslik}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {egitim.aciklama}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="flex justify-between items-center mt-1 mb-3">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{egitim.sure}</span>
          </div>
          <Badge variant="outline" className="turkcell-badge capitalize">
            {egitim.kategori}
          </Badge>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between mb-1 text-sm">
            <span>İlerleme</span>
            <span className="font-medium">{egitim.ilerleme}%</span>
          </div>
          <Progress value={egitim.ilerleme} className="turkcell-progress" indicatorClassName="turkcell-progress-indicator" />
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {egitim.etiketler.slice(0, 3).map((etiket: string, idx: number) => (
            <Badge key={idx} variant="secondary" className="bg-muted/50">
              {etiket}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 flex justify-between pt-3 pb-3 mt-auto">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>Son Tarih: {formatDate(egitim.sonTarih)}</span>
        </div>
        <Button size="sm" className="bg-gradient-to-r from-[#FFD100] to-[#00A0D2] text-black shadow hover:from-[#FFD100]/90 hover:to-[#00A0D2]/90">
          {egitim.durum === "tamamlandi" ? (
            <>
              <RepeatIcon className="h-3 w-3 mr-1" /> Tekrar Et
            </>
          ) : (
            <>
              <PlayIcon className="h-3 w-3 mr-1" /> Devam Et
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function EgitimlerimPage() {
  const router = useRouter();
  const [aramaMetni, setAramaMetni] = useState("");
  const [seciliKategori, setSeciliKategori] = useState("Tümü");
  const [seciliDurum, setSeciliDurum] = useState("Tümü");
  const [siralama, setSiralama] = useState("son-eklenen");
  const [filtrelenmisEgitimler, setFiltrelenmisEgitimler] = useState(egitimVerileri);
  const [aktifTab, setAktifTab] = useState("tum-egitimler");
  const [yukleniyor, setYukleniyor] = useState(true);

  // Eğitim istatistiklerini hesapla
  const tamamlananEgitimSayisi = egitimVerileri.filter(e => e.durum === "tamamlandi").length;
  const devamEdenEgitimSayisi = egitimVerileri.filter(e => e.durum === "devam_ediyor").length;
  const baslanmamisEgitimSayisi = egitimVerileri.filter(e => e.durum === "baslanmadi").length;
  const toplamEgitimSayisi = egitimVerileri.length;

  // Yükleme simülasyonu
  useEffect(() => {
    setTimeout(() => {
      setYukleniyor(false);
    }, 1000);
  }, []);

  // Filtreleme ve sıralama
  useEffect(() => {
    let sonuc = [...egitimVerileri];

    // Tab filtresi
    if (aktifTab === "tamamlananlar") {
      sonuc = sonuc.filter((egitim) => egitim.durum === "tamamlandi");
    } else if (aktifTab === "devam-edenler") {
      sonuc = sonuc.filter((egitim) => egitim.durum === "devam_ediyor");
    } else if (aktifTab === "baslanmayanlar") {
      sonuc = sonuc.filter((egitim) => egitim.durum === "baslanmadi");
    } else if (aktifTab === "zorunlu-egitimler") {
      sonuc = sonuc.filter((egitim) => egitim.zorunlu);
    }

    // Kategori filtresi
    if (seciliKategori !== "Tümü") {
      sonuc = sonuc.filter((egitim) => egitim.kategori === seciliKategori);
    }

    // Durum filtresi
    if (seciliDurum !== "Tümü") {
      sonuc = sonuc.filter((egitim) => egitim.durum === seciliDurum);
    }

    // Arama filtresi
    if (aramaMetni) {
      const aramaTerim = aramaMetni.toLowerCase();
      sonuc = sonuc.filter(
        (egitim) =>
          egitim.baslik.toLowerCase().includes(aramaTerim) ||
          egitim.aciklama.toLowerCase().includes(aramaTerim) ||
          egitim.etiketler.some((etiket) => etiket.toLowerCase().includes(aramaTerim))
      );
    }

    // Sıralama
    sonuc.sort((a, b) => {
      switch (siralama) {
        case "son-eklenen":
          return new Date(b.atanmaTarihi).getTime() - new Date(a.atanmaTarihi).getTime();
        case "eski-eklenen":
          return new Date(a.atanmaTarihi).getTime() - new Date(b.atanmaTarihi).getTime();
        case "ilerleme-yuksek":
          return b.ilerleme - a.ilerleme;
        case "ilerleme-dusuk":
          return a.ilerleme - b.ilerleme;
        case "ad-a-z":
          return a.baslik.localeCompare(b.baslik);
        case "ad-z-a":
          return b.baslik.localeCompare(a.baslik);
        default:
          return 0;
      }
    });

    setFiltrelenmisEgitimler(sonuc);
  }, [aramaMetni, seciliKategori, seciliDurum, siralama, aktifTab]);

  // Boş durum bileşeni
  const BosIcerik = ({ mesaj, butonMetni, butonUrl, ikon, onClick }: { 
    mesaj: string, 
    butonMetni?: string, 
    butonUrl?: string, 
    ikon: React.ReactNode,
    onClick?: () => void
  }) => (
    <div className="text-center py-16 w-full">
      <div className="mx-auto rounded-full bg-muted w-16 h-16 flex items-center justify-center mb-4">
        {ikon}
      </div>
      <h3 className="text-lg font-medium mb-2">Sonuç Bulunamadı</h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">{mesaj}</p>
      {butonMetni && (
        butonUrl ? (
          <Button asChild>
            <Link href={butonUrl}>{butonMetni}</Link>
          </Button>
        ) : onClick ? (
          <Button onClick={onClick}>{butonMetni}</Button>
        ) : null
      )}
    </div>
  );

  if (yukleniyor) {
    return (
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-2">
            <div className="h-8 w-40 bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-64 bg-muted rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-40 bg-muted rounded animate-pulse"></div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="h-[320px]">
              <CardHeader className="p-4 pb-2">
                <div className="h-5 w-24 bg-muted rounded animate-pulse mb-3"></div>
                <div className="h-6 w-full bg-muted rounded animate-pulse mb-2"></div>
                <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-muted rounded animate-pulse mt-1"></div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex justify-between mt-4 mb-3">
                  <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                </div>
                <div className="h-2 w-full bg-muted rounded animate-pulse my-3"></div>
                <div className="flex gap-1 mt-4">
                  <div className="h-5 w-16 bg-muted rounded animate-pulse"></div>
                  <div className="h-5 w-16 bg-muted rounded animate-pulse"></div>
                </div>
              </CardContent>
              <CardFooter className="p-3 pt-0 mt-auto">
                <div className="h-10 w-full bg-muted rounded animate-pulse"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold teb-title">Eğitimlerim</h1>
        <p className="text-muted-foreground mt-1">
          Atanan eğitimlerinizi görüntüleyin ve tamamlayın
        </p>
      </div>

      {/* İstatistik kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="teb-card">
          <CardContent className="flex flex-row items-center gap-4 p-6">
            <div className="p-2 bg-[#e0f0fa] rounded-full">
              <ListChecks className="h-6 w-6 text-[#005f9e]" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tamamlanan</p>
              <p className="text-2xl font-bold">{tamamlananEgitimSayisi}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="teb-card">
          <CardContent className="flex flex-row items-center gap-4 p-6">
            <div className="p-2 bg-[#e0f0fa] rounded-full">
              <Play className="h-6 w-6 text-[#005f9e]" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Devam Eden</p>
              <p className="text-2xl font-bold">{devamEdenEgitimSayisi}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="teb-card">
          <CardContent className="flex flex-row items-center gap-4 p-6">
            <div className="p-2 bg-[#e0f0fa] rounded-full">
              <Timer className="h-6 w-6 text-[#005f9e]" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Başlanmamış</p>
              <p className="text-2xl font-bold">{baslanmamisEgitimSayisi}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="teb-card">
          <CardContent className="flex flex-row items-center gap-4 p-6">
            <div className="p-2 bg-[#e0f0fa] rounded-full">
              <Users2 className="h-6 w-6 text-[#005f9e]" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Toplam Eğitim</p>
              <p className="text-2xl font-bold">{toplamEgitimSayisi}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtreler ve arama */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Eğitim ara..."
              className="pl-10 teb-input"
              value={aramaMetni}
              onChange={(e) => setAramaMetni(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={seciliKategori} onValueChange={setSeciliKategori}>
            <SelectTrigger className="w-[180px] teb-input">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              {kategoriler.map((kategori) => (
                <SelectItem key={kategori} value={kategori} className="teb-dropdown-item">
                  {kategori}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={siralama} onValueChange={setSiralama}>
            <SelectTrigger className="w-[180px] teb-input">
              <SelectValue placeholder="Sıralama" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="son-tarih" className="teb-dropdown-item">Son Tarihe Göre</SelectItem>
              <SelectItem value="ilerleme" className="teb-dropdown-item">İlerlemeye Göre</SelectItem>
              <SelectItem value="atanma-tarihi" className="teb-dropdown-item">Atanma Tarihine Göre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Eğitim listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtrelenmisEgitimler.map((egitim) => (
          <EgitimKarti key={egitim.id} egitim={egitim} />
        ))}
      </div>

      {/* Boş durum */}
      {filtrelenmisEgitimler.length === 0 && (
        <Card className="text-center py-12 teb-card">
          <CardContent>
            <BookOpen className="h-12 w-12 mx-auto text-[#005f9e]/40 mb-4" />
            <h3 className="text-lg font-medium mb-2">Eğitim Bulunamadı</h3>
            <p className="text-muted-foreground mb-6">
              Arama kriterlerinize uygun eğitim bulunmamaktadır.
            </p>
            <Button onClick={() => router.push("/dashboard/egitim-katalogu")} className="teb-button">
              Eğitim Kataloğuna Git
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 