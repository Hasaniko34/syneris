"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  BookOpen,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  FileCheck,
  MoreHorizontal,
  PlusCircle,
  SortDesc,
  Star,
  Trash2,
  Trophy,
  User,
  Users,
  X,
  Search,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Bildirim tipleri
const bildirimTipleri = {
  egitim_eklendi: {
    icon: <PlusCircle className="h-5 w-5 text-blue-500" />,
    renk: "bg-blue-50 dark:bg-blue-950/30",
    baslik: "Yeni Eğitim",
  },
  egitim_tamamlandi: {
    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    renk: "bg-green-50 dark:bg-green-950/30",
    baslik: "Eğitim Tamamlandı",
  },
  rozet_kazanildi: {
    icon: <Trophy className="h-5 w-5 text-yellow-500" />,
    renk: "bg-yellow-50 dark:bg-yellow-950/30",
    baslik: "Rozet Kazanıldı",
  },
  sertifika_hazir: {
    icon: <FileCheck className="h-5 w-5 text-purple-500" />,
    renk: "bg-purple-50 dark:bg-purple-950/30",
    baslik: "Sertifika Hazır",
  },
  duyuru: {
    icon: <Bell className="h-5 w-5 text-red-500" />,
    renk: "bg-red-50 dark:bg-red-950/30",
    baslik: "Duyuru",
  },
  hatirlatma: {
    icon: <Calendar className="h-5 w-5 text-indigo-500" />,
    renk: "bg-indigo-50 dark:bg-indigo-950/30",
    baslik: "Hatırlatma",
  },
  kullanici_atandi: {
    icon: <User className="h-5 w-5 text-orange-500" />,
    renk: "bg-orange-50 dark:bg-orange-950/30",
    baslik: "Kullanıcı Atandı",
  },
} as const;

// Bildirim tiplerini bir tip olarak tanımla
type BildirimTipi = keyof typeof bildirimTipleri;

// Örnek bildirim verileri
interface Bildirim {
  id: string;
  tip: BildirimTipi;
  baslik: string;
  icerik: string;
  tarih: Date;
  okundu: boolean;
  link: string | null;
}

const ornekBildirimler: Bildirim[] = [
  {
    id: "1",
    tip: "egitim_eklendi",
    baslik: "Yeni eğitim eklendi",
    icerik: "'Python Temelleri' eğitimi kataloğa eklendi",
    tarih: new Date(Date.now() - 5 * 60 * 1000), // 5 dakika önce
    okundu: false,
    link: "/dashboard/egitim-katalogu",
  },
  {
    id: "2",
    tip: "egitim_tamamlandi",
    baslik: "Eğitim başarıyla tamamlandı",
    icerik: "'JavaScript Temelleri' eğitimini tamamladınız",
    tarih: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 saat önce
    okundu: true,
    link: "/dashboard/egitimlerim/1",
  },
  {
    id: "3",
    tip: "rozet_kazanildi",
    baslik: "Yeni rozet kazandınız",
    icerik: "'Kod Ustası' rozetini kazandınız. Tebrikler!",
    tarih: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 gün önce
    okundu: false,
    link: "/dashboard/profile",
  },
  {
    id: "4",
    tip: "sertifika_hazir",
    baslik: "Sertifikanız hazır",
    icerik: "'Veri Bilimi Temelleri' eğitimi sertifikanız hazır",
    tarih: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 gün önce
    okundu: true,
    link: "/dashboard/sertifikalarim",
  },
  {
    id: "5",
    tip: "duyuru",
    baslik: "Platform güncellemesi",
    icerik: "Syneris platformu yeni özelliklerle güncellendi. Yenilikler için tıklayın.",
    tarih: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 gün önce
    okundu: true,
    link: "/haberler/platform-guncellemesi",
  },
  {
    id: "6",
    tip: "hatirlatma",
    baslik: "Eğitim süreniz doluyor",
    icerik: "'React ile SPA Geliştirme' eğitimini tamamlamak için 2 gününüz kaldı",
    tarih: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 gün önce
    okundu: false,
    link: "/dashboard/egitimlerim/2",
  },
  {
    id: "7",
    tip: "kullanici_atandi",
    baslik: "Yeni eğitim atandı",
    icerik: "Yöneticiniz size 'Liderlik ve Takım Yönetimi' eğitimini atadı",
    tarih: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 gün önce
    okundu: true,
    link: "/dashboard/egitimlerim/3",
  },
  {
    id: "8",
    tip: "egitim_eklendi",
    baslik: "Yeni eğitim eklendi",
    icerik: "'SQL ve Veritabanı Tasarımı' eğitimi kataloğa eklendi",
    tarih: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 gün önce
    okundu: true,
    link: "/dashboard/egitim-katalogu",
  },
  {
    id: "9",
    tip: "duyuru",
    baslik: "Bakım çalışması",
    icerik: "Yarın gece 02:00-04:00 saatleri arasında bakım çalışması yapılacaktır",
    tarih: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 gün önce
    okundu: true,
    link: null,
  },
  {
    id: "10",
    tip: "egitim_tamamlandi",
    baslik: "Eğitim başarıyla tamamlandı",
    icerik: "'HTML ve CSS Temelleri' eğitimini tamamladınız",
    tarih: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 gün önce
    okundu: true,
    link: "/dashboard/egitimlerim/4",
  },
];

// Tarih formatını Türkçe olarak gösteren fonksiyon
function formatTarih(tarih: Date): string {
  const simdi = new Date();
  const fark = simdi.getTime() - tarih.getTime();
  
  const dakika = 60 * 1000;
  const saat = 60 * dakika;
  const gun = 24 * saat;
  const hafta = 7 * gun;
  
  if (fark < dakika) {
    return "Az önce";
  } else if (fark < saat) {
    const dakikaSayisi = Math.floor(fark / dakika);
    return `${dakikaSayisi} dakika önce`;
  } else if (fark < gun) {
    const saatSayisi = Math.floor(fark / saat);
    return `${saatSayisi} saat önce`;
  } else if (fark < hafta) {
    const gunSayisi = Math.floor(fark / gun);
    return `${gunSayisi} gün önce`;
  } else {
    return tarih.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
}

export default function BildirimlerPage() {
  const router = useRouter();
  const [bildirimler, setBildirimler] = useState<typeof ornekBildirimler>([]);
  const [filtrelenmisler, setFiltrelenmisler] = useState<typeof ornekBildirimler>([]);
  const [aktifTab, setAktifTab] = useState("tum-bildirimler");
  const [arama, setArama] = useState("");
  const [tipFiltre, setTipFiltre] = useState("tum-tipler");
  const [yukleniyor, setYukleniyor] = useState(true);

  // Bildirim verisini yükleme
  useEffect(() => {
    setTimeout(() => {
      setBildirimler(ornekBildirimler);
      setFiltrelenmisler(ornekBildirimler);
      setYukleniyor(false);
    }, 1000);
  }, []);

  // Bildirimleri filtreleme
  useEffect(() => {
    let sonuc = [...bildirimler];

    // Tab filtresi
    if (aktifTab === "okunmamis") {
      sonuc = sonuc.filter((bildirim) => !bildirim.okundu);
    } else if (aktifTab === "okunmus") {
      sonuc = sonuc.filter((bildirim) => bildirim.okundu);
    }

    // Tip filtresi
    if (tipFiltre !== "tum-tipler") {
      sonuc = sonuc.filter((bildirim) => bildirim.tip === tipFiltre);
    }

    // Arama filtresi
    if (arama) {
      const aramaMetin = arama.toLowerCase();
      sonuc = sonuc.filter(
        (bildirim) =>
          bildirim.baslik.toLowerCase().includes(aramaMetin) ||
          bildirim.icerik.toLowerCase().includes(aramaMetin)
      );
    }

    // Tarihe göre sıralama (en yeni en üstte)
    sonuc.sort((a, b) => b.tarih.getTime() - a.tarih.getTime());

    setFiltrelenmisler(sonuc);
  }, [bildirimler, aktifTab, tipFiltre, arama]);

  // Bildirimi okundu olarak işaretle
  const bildirimOkundu = (id: string) => {
    setBildirimler(
      bildirimler.map((bildirim) =>
        bildirim.id === id ? { ...bildirim, okundu: true } : bildirim
      )
    );
  };

  // Bildirimi sil
  const bildirimSil = (id: string) => {
    setBildirimler(bildirimler.filter((bildirim) => bildirim.id !== id));
  };

  // Tüm bildirimleri okundu olarak işaretle
  const hepsiniOkunduYap = () => {
    setBildirimler(
      bildirimler.map((bildirim) => ({ ...bildirim, okundu: true }))
    );
  };

  // Tüm bildirimleri temizle
  const hepsiniTemizle = () => {
    if (window.confirm("Tüm bildirimleri silmek istediğinizden emin misiniz?")) {
      setBildirimler([]);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Bildirimler</h1>
          <p className="text-muted-foreground mt-1">
            Tüm bildirimlerinizi görüntüleyin ve yönetin.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={hepsiniOkunduYap}
            disabled={!bildirimler.some(b => !b.okundu)}
          >
            <Check className="h-4 w-4 mr-2" /> Tümünü Okundu İşaretle
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={hepsiniTemizle}
            disabled={bildirimler.length === 0}
          >
            <Trash2 className="h-4 w-4 mr-2" /> Tümünü Temizle
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.push("/dashboard/bildirim-ayarlari")}
          >
            <Bell className="h-4 w-4 mr-2" /> Bildirim Ayarları
          </Button>
        </div>
      </div>

      {/* Filtreler */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Bildirimlerde ara..."
            className="pl-10"
            value={arama}
            onChange={(e) => setArama(e.target.value)}
          />
        </div>

        <Select value={tipFiltre} onValueChange={setTipFiltre}>
          <SelectTrigger>
            <Filter className="h-4 w-4 mr-2" />
            <span>Bildirim Tipi</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tum-tipler">Tüm Bildirim Tipleri</SelectItem>
            <SelectItem value="egitim_eklendi">Yeni Eğitim</SelectItem>
            <SelectItem value="egitim_tamamlandi">Eğitim Tamamlandı</SelectItem>
            <SelectItem value="rozet_kazanildi">Rozet Kazanıldı</SelectItem>
            <SelectItem value="sertifika_hazir">Sertifika Hazır</SelectItem>
            <SelectItem value="duyuru">Duyuru</SelectItem>
            <SelectItem value="hatirlatma">Hatırlatma</SelectItem>
            <SelectItem value="kullanici_atandi">Kullanıcı Atandı</SelectItem>
          </SelectContent>
        </Select>

        <Tabs defaultValue="tum-bildirimler" value={aktifTab} onValueChange={setAktifTab}>
          <TabsList className="w-full">
            <TabsTrigger value="tum-bildirimler">
              Tümü ({bildirimler.length})
            </TabsTrigger>
            <TabsTrigger value="okunmamis">
              Okunmamış ({bildirimler.filter(b => !b.okundu).length})
            </TabsTrigger>
            <TabsTrigger value="okunmus">
              Okunmuş ({bildirimler.filter(b => b.okundu).length})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Bildirim Listesi */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>
              {aktifTab === "tum-bildirimler" 
                ? "Tüm Bildirimler" 
                : aktifTab === "okunmamis" 
                  ? "Okunmamış Bildirimler" 
                  : "Okunmuş Bildirimler"}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <SortDesc className="h-4 w-4" />
              <span>En yeni en üstte</span>
            </div>
          </div>
          <Separator className="mt-3" />
        </CardHeader>
        <CardContent className="p-0">
          {yukleniyor ? (
            // Yükleniyor durumu
            <div className="p-6 space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtrelenmisler.length === 0 ? (
            // Bildirim yoksa
            <div className="flex flex-col items-center justify-center py-16">
              <Bell className="h-16 w-16 text-muted-foreground/30" />
              <p className="mt-4 text-lg font-medium">Bildirim Bulunamadı</p>
              <p className="text-muted-foreground text-sm mt-1">
                {arama || tipFiltre !== "tum-tipler" 
                  ? "Arama veya filtre kriterlerinize uygun bildirim bulunamadı." 
                  : "Henüz bildiriminiz bulunmamaktadır."}
              </p>
              {(arama || tipFiltre !== "tum-tipler" || aktifTab !== "tum-bildirimler") && (
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={() => {
                    setArama("");
                    setTipFiltre("tum-tipler");
                    setAktifTab("tum-bildirimler");
                  }}
                >
                  Filtreleri Temizle
                </Button>
              )}
            </div>
          ) : (
            // Bildirim listesi
            <div className="divide-y">
              {filtrelenmisler.map((bildirim) => (
                <div 
                  key={bildirim.id} 
                  className={cn(
                    "p-4 flex gap-3 transition-colors",
                    !bildirim.okundu && "bg-primary/5",
                    bildirim.link && "hover:bg-muted/50 cursor-pointer"
                  )}
                  onClick={() => {
                    if (bildirim.link) {
                      bildirimOkundu(bildirim.id);
                      router.push(bildirim.link);
                    }
                  }}
                >
                  <div className={cn(
                    "rounded-full p-2 h-12 w-12 flex items-center justify-center flex-shrink-0", 
                    bildirimTipleri[bildirim.tip].renk
                  )}>
                    {bildirimTipleri[bildirim.tip].icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{bildirim.baslik}</span>
                      {!bildirim.okundu && (
                        <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                          Yeni
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">
                      {bildirim.icerik}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{formatTarih(bildirim.tarih)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-1">
                    {!bildirim.okundu && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={(e) => {
                          e.stopPropagation();
                          bildirimOkundu(bildirim.id);
                        }}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 ml-auto">
                          <MoreHorizontal size={14} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-md shadow-lg border border-[#e0f0fa]/50">
                        {!bildirim.okundu ? (
                          <DropdownMenuItem onClick={() => bildirimOkundu(bildirim.id)}>
                            <Check className="h-4 w-4 mr-2" />
                            Okundu İşaretle
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => {
                            setBildirimler(
                              bildirimler.map((b) =>
                                b.id === bildirim.id ? { ...b, okundu: false } : b
                              )
                            );
                          }}>
                            <X className="h-4 w-4 mr-2" />
                            Okunmadı İşaretle
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => bildirimSil(bildirim.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 