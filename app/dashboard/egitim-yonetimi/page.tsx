"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Calendar,
  CalendarIcon,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  Edit,
  FileText,
  Filter,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Send,
  Trash2,
  Users,
  ArrowUpDown,
  LayoutTemplate,
  Library,
  Folder,
} from "lucide-react";

// Kategoriler
const kategoriler = [
  "Tümü",
  "Bireysel Satış",
  "Kurumsal Satış",
  "Dijital Çözümler",
  "Network ve Altyapı",
  "Güvenlik ve Uyum",
  "Müşteri Deneyimi",
  "Teknoloji ve İnovasyon",
  "Satış ve Pazarlama",
  "Liderlik ve Yönetim"
];

// Turkcell Kurumsal Renkleri
const turkcellColors = {
  primary: "rgb(255, 199, 44)", // #ffc72c - Turkcell Yellow
  secondary: "rgb(51, 51, 51)", // #333333 - Dark Gray
  accent: "rgb(0, 169, 224)", // #00a9e0 - Blue
  highlight: "rgb(255, 222, 122)", // #ffde7a - Light Yellow
  dark: "rgb(25, 25, 25)" // #191919 - Almost Black
};

// Örnek eğitim verisi
const egitimler = [
  {
    id: "1",
    baslik: "Turkcell Bireysel Satış Teknikleri",
    aciklama: "Bireysel satış süreçleri, müşteri ilişkileri ve ürün tanıtım teknikleri.",
    kategori: "Bireysel Satış",
    olusturulmaTarihi: "2024-03-20",
    sure: "4 saat",
    tamamlanmaOrani: 45,
    modulSayisi: 8,
    durum: "Aktif",
    zorunlu: true,
    atanmaSayisi: 156,
    etiketler: ["Satış", "Müşteri", "Bireysel"],
    synbotDestekli: true,
    simulasyonIcerir: true
  },
  {
    id: "2",
    baslik: "Turkcell Mobil Uygulama ve Dijital Servisler",
    aciklama: "Turkcell mobil uygulaması özellikleri, dijital servisler ve müşteri desteği.",
    kategori: "Dijital Çözümler",
    olusturulmaTarihi: "2024-03-15",
    sure: "6 saat",
    tamamlanmaOrani: 68,
    modulSayisi: 10,
    durum: "Aktif",
    zorunlu: true,
    atanmaSayisi: 245,
    etiketler: ["Mobil", "Dijital", "Uygulama"],
    synbotDestekli: true,
    simulasyonIcerir: true
  },
  {
    id: "3",
    baslik: "Veri Güvenliği ve Uyum Eğitimi",
    aciklama: "BTK ve KVKK düzenlemeleri, veri güvenliği ve uyum süreçleri eğitimi.",
    kategori: "Güvenlik ve Uyum",
    olusturulmaTarihi: "2024-03-10",
    sure: "8 saat",
    tamamlanmaOrani: 92,
    modulSayisi: 12,
    durum: "Aktif",
    zorunlu: true,
    atanmaSayisi: 412,
    etiketler: ["Güvenlik", "Uyum", "KVKK"],
    synbotDestekli: true,
    simulasyonIcerir: false
  },
  {
    id: "4",
    baslik: "Kurumsal Çözümler ve Proje Yönetimi",
    aciklama: "Kurumsal müşteriler için özel çözümler, proje yönetimi ve iş geliştirme.",
    kategori: "Kurumsal Satış",
    olusturulmaTarihi: "2023-10-15",
    sure: "10 saat",
    tamamlanmaOrani: 68,
    modulSayisi: 12,
    durum: "Aktif",
    zorunlu: true,
    atanmaSayisi: 24,
    etiketler: ["Kurumsal", "Proje", "Çözüm"]
  },
  {
    id: "5",
    baslik: "Network ve Altyapı Yönetimi",
    aciklama: "Telekomünikasyon altyapısı, network yönetimi ve performans optimizasyonu.",
    kategori: "Network ve Altyapı",
    olusturulmaTarihi: "2023-09-05",
    sure: "6 saat",
    tamamlanmaOrani: 92,
    modulSayisi: 8,
    durum: "Aktif",
    zorunlu: true,
    atanmaSayisi: 156,
    etiketler: ["Network", "Altyapı", "Optimizasyon"]
  },
  {
    id: "6",
    baslik: "Müşteri Deneyimi ve Hizmet Kalitesi",
    aciklama: "Müşteri memnuniyeti, deneyim yönetimi ve hizmet kalitesi standartları.",
    kategori: "Müşteri Deneyimi",
    olusturulmaTarihi: "2023-08-12",
    sure: "12 saat",
    tamamlanmaOrani: 32,
    modulSayisi: 15,
    durum: "Aktif",
    zorunlu: false,
    atanmaSayisi: 18,
    etiketler: ["Deneyim", "Kalite", "Memnuniyet"]
  },
  {
    id: "7",
    baslik: "Dijital Çözümler ve Yeni Teknolojiler",
    aciklama: "Yeni nesil teknolojiler, IoT çözümleri ve dijital dönüşüm projeleri.",
    kategori: "Dijital Çözümler",
    olusturulmaTarihi: "2023-07-30",
    sure: "4 saat",
    tamamlanmaOrani: 75,
    modulSayisi: 8,
    durum: "Aktif",
    zorunlu: false,
    atanmaSayisi: 45,
    etiketler: ["IoT", "Teknoloji", "Dijital"]
  },
  {
    id: "8",
    baslik: "Risk Yönetimi ve Mevzuat Uyum Eğitimi",
    aciklama: "BDDK, MASAK ve SPK mevzuatları, risk yönetimi ve uyum süreçleri.",
    kategori: "Risk Yönetimi",
    olusturulmaTarihi: "2023-06-18",
    sure: "5 saat",
    tamamlanmaOrani: 88,
    modulSayisi: 7,
    durum: "Aktif",
    zorunlu: true,
    atanmaSayisi: 112,
    etiketler: ["Mevzuat", "Risk", "Uyum"]
  },
  {
    id: "9",
    baslik: "TEB Liderlik ve Yöneticilik Becerileri",
    aciklama: "Bankacılıkta liderlik, ekip yönetimi ve performans değerlendirme.",
    kategori: "Liderlik ve Yönetim",
    olusturulmaTarihi: "2023-05-10",
    sure: "10 saat",
    tamamlanmaOrani: 60,
    modulSayisi: 12,
    durum: "Taslak",
    zorunlu: false,
    atanmaSayisi: 0,
    etiketler: ["Liderlik", "Yönetim", "Performans"]
  },
  {
    id: "10",
    baslik: "Müşteri Memnuniyeti ve Şikayet Yönetimi",
    aciklama: "Müşteri şikayetlerinin yönetimi, memnuniyet artırıcı uygulamalar ve çözüm süreçleri.",
    kategori: "Müşteri Deneyimi",
    olusturulmaTarihi: "2023-04-25",
    sure: "7 saat",
    tamamlanmaOrani: 25,
    modulSayisi: 9,
    durum: "Pasif",
    zorunlu: false,
    atanmaSayisi: 28,
    etiketler: ["Müşteri", "Memnuniyet", "Şikayet"]
  },
];

// Durum için renk atamaları
const durumRenkleri = {
  "Aktif": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Pasif": "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400",
  "Taslak": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
};

export default function EgitimYonetimiPage() {
  const router = useRouter();
  const [educations, setEducations] = useState(egitimler);
  const [filteredEducations, setFilteredEducations] = useState(egitimler);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [statusFilter, setStatusFilter] = useState("Tümü");
  const [silmeDialogAcik, setSilmeDialogAcik] = useState(false);
  const [silinecekEgitim, setSilinecekEgitim] = useState<string | null>(null);
  const [siralama, setSiralama] = useState("en-yeni");
  const [gorunumTipi, setGorunumTipi] = useState("tablo");

  // Filtreleme ve sıralama
  useEffect(() => {
    let result = [...educations];

    // Arama terimini uygula
    if (searchTerm) {
      result = result.filter((edu) =>
        edu.baslik.toLowerCase().includes(searchTerm.toLowerCase()) ||
        edu.aciklama.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Kategoriyi uygula
    if (selectedCategory !== "Tümü") {
      result = result.filter((edu) => edu.kategori === selectedCategory);
    }

    // Aktif durumu uygula
    if (statusFilter !== "Tümü") {
      const isActive = statusFilter === "Aktif";
      result = result.filter((edu) => edu.durum === (isActive ? "Aktif" : "Pasif"));
    }

    // Sıralama
    result.sort((a, b) => {
      switch (siralama) {
        case "en-yeni":
          return new Date(b.olusturulmaTarihi).getTime() - new Date(a.olusturulmaTarihi).getTime();
        case "en-eski":
          return new Date(a.olusturulmaTarihi).getTime() - new Date(b.olusturulmaTarihi).getTime();
        case "ad-a-z":
          return a.baslik.localeCompare(b.baslik);
        case "ad-z-a":
          return b.baslik.localeCompare(a.baslik);
        case "tamamlanma-yuksek":
          return b.tamamlanmaOrani - a.tamamlanmaOrani;
        case "tamamlanma-dusuk":
          return a.tamamlanmaOrani - b.tamamlanmaOrani;
        default:
          return 0;
      }
    });

    setFilteredEducations(result);
  }, [educations, searchTerm, selectedCategory, statusFilter, siralama]);

  // Silme işlemi için dialog açma
  const handleDeleteClick = (id: string) => {
    setSilinecekEgitim(id);
    setSilmeDialogAcik(true);
  };

  // Silme işlemi onaylama
  const handleDeleteConfirm = () => {
    // Gerçek uygulama için API isteği gönderilebilir
    console.log(`Eğitim silindi: ${silinecekEgitim}`);
    setSilmeDialogAcik(false);
    setSilinecekEgitim(null);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        {/* Üst Bar */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Eğitim Yönetimi
          </h1>
          <div className="flex gap-2">
            <Button
              onClick={() => router.push("/dashboard/egitim-yonetimi/olustur")}
              className="gap-1 bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" /> Yeni Eğitim
            </Button>
          </div>
        </div>

        {/* Filtre butonları ve aksiyon düğmeleri */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 border-primary/20 hover:border-primary/40">
                  <Folder className="mr-2 h-4 w-4 text-primary" />
                  Kategori: {selectedCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card/95 backdrop-blur-md shadow-lg border border-[#e0f0fa]/50">
                {kategoriler.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="hover:bg-primary/5"
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 border-primary/20 hover:border-primary/40">
                  <Filter className="mr-2 h-4 w-4 text-primary" />
                  Durum: {statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card/95 backdrop-blur-md shadow-lg border border-[#e0f0fa]/50">
                <DropdownMenuItem onClick={() => setStatusFilter("Tümü")} className="hover:bg-primary/5">
                  Tümü
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Aktif")} className="hover:bg-primary/5">
                  Aktif
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Pasif")} className="hover:bg-primary/5">
                  Pasif
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Taslak")} className="hover:bg-primary/5">
                  Taslak
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 border-primary/20 hover:border-primary/40">
                  <ArrowUpDown className="mr-2 h-4 w-4 text-primary" />
                  Sırala
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card/95 backdrop-blur-md shadow-lg border border-[#e0f0fa]/50">
                <DropdownMenuItem onClick={() => setSiralama("en-yeni")} className="hover:bg-primary/5">
                  En Yeni
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSiralama("en-eski")} className="hover:bg-primary/5">
                  En Eski
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSiralama("isim-a-z")} className="hover:bg-primary/5">
                  İsim (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSiralama("isim-z-a")} className="hover:bg-primary/5">
                  İsim (Z-A)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" className="flex-1 border-primary/20 hover:border-primary/40 hover:bg-primary/5">
              <Link href="/dashboard/egitim-yonetimi/sablonlar">
                <LayoutTemplate className="h-4 w-4 mr-2 text-primary" />
                <span>Şablonlar</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 border-primary/20 hover:border-primary/40 hover:bg-primary/5">
              <Link href="/dashboard/icerik-kutuphanesi">
                <Library className="h-4 w-4 mr-2 text-primary" />
                <span>İçerik Kütüphanesi</span>
              </Link>
            </Button>
            <Button size="sm" className="h-9 bg-primary hover:bg-primary/90" asChild>
              <Link href="/dashboard/egitim-yonetimi/olustur">
                <Plus className="mr-2 h-4 w-4" />
                Yeni Eğitim
              </Link>
            </Button>
          </div>
        </div>

        {/* Eğitim Listesi - Tablo Görünümü */}
        {gorunumTipi === "tablo" && (
          <Card className="border-primary/10">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-primary/5">
                    <TableHead>Eğitim Adı</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Özellikler</TableHead>
                    <TableHead>Süre</TableHead>
                    <TableHead>Tamamlanma</TableHead>
                    <TableHead>Atamalar</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEducations.map((egitim) => (
                    <TableRow key={egitim.id} className="hover:bg-primary/5">
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <Link 
                            href={`/dashboard/egitim-yonetimi/${egitim.id}`}
                            className="hover:text-primary"
                          >
                            {egitim.baslik}
                          </Link>
                          <span className="text-xs text-muted-foreground">
                            {new Date(egitim.olusturulmaTarihi).toLocaleDateString("tr-TR")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{egitim.kategori}</TableCell>
                      <TableCell>
                        <Badge className={durumRenkleri[egitim.durum as keyof typeof durumRenkleri]}>
                          {egitim.durum}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {egitim.synbotDestekli && (
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                              Synbot
                            </Badge>
                          )}
                          {egitim.simulasyonIcerir && (
                            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                              Simülasyon
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>{egitim.sure}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={egitim.tamamlanmaOrani} className="h-2 w-20 bg-primary/10" indicatorClassName="bg-primary" />
                          <span className="text-xs font-medium">{egitim.tamamlanmaOrani}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span>{egitim.atanmaSayisi}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                            asChild
                          >
                            <Link href={`/dashboard/egitim-yonetimi/${egitim.id}`}>
                              <Play className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                            asChild
                          >
                            <Link href={`/dashboard/egitim-yonetimi/${egitim.id}/duzenle`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-md shadow-lg border border-[#e0f0fa]/50">
                              <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild className="hover:bg-primary/5">
                                <Link href={`/dashboard/egitim-yonetimi/${egitim.id}`}>Görüntüle</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild className="hover:bg-primary/5">
                                <Link href={`/dashboard/egitim-yonetimi/${egitim.id}/duzenle`}>Düzenle</Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive hover:bg-destructive/5"
                                onClick={() => handleDeleteClick(egitim.id)}
                              >
                                Sil
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Eğitim Listesi - Kart Görünümü */}
        {gorunumTipi === "kart" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEducations.map((egitim) => (
              <Card key={egitim.id} className="overflow-hidden flex flex-col border-primary/10 hover:border-primary/20 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2">
                      <Badge className={durumRenkleri[egitim.durum as keyof typeof durumRenkleri]}>
                        {egitim.durum}
                      </Badge>
                      {egitim.synbotDestekli && (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          Synbot
                        </Badge>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-md shadow-lg border border-[#e0f0fa]/50">
                        <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className="hover:bg-primary/5">
                          <Link href={`/dashboard/egitim-yonetimi/${egitim.id}`}>Görüntüle</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="hover:bg-primary/5">
                          <Link href={`/dashboard/egitim-yonetimi/${egitim.id}/duzenle`}>Düzenle</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive hover:bg-destructive/5"
                          onClick={() => handleDeleteClick(egitim.id)}
                        >
                          Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className="text-lg mt-2">
                    <Link 
                      href={`/dashboard/egitim-yonetimi/${egitim.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {egitim.baslik}
                    </Link>
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
                    <Badge variant="outline" className="capitalize border-primary/20 text-primary bg-primary/5">
                      {egitim.kategori}
                    </Badge>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Tamamlanma</span>
                      <span className="font-medium">{egitim.tamamlanmaOrani}%</span>
                    </div>
                    <Progress value={egitim.tamamlanmaOrani} className="h-2 bg-primary/10" indicatorClassName="bg-primary" />
                  </div>

                  {egitim.zorunlu && (
                    <Badge variant="outline" className="mt-3 border-destructive/20 text-destructive bg-destructive/5">
                      Zorunlu Eğitim
                    </Badge>
                  )}

                  {egitim.simulasyonIcerir && (
                    <Badge variant="outline" className="mt-3 ml-2 bg-accent/10 text-accent border-accent/20">
                      Simülasyon İçerir
                    </Badge>
                  )}
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {egitim.etiketler.slice(0, 3).map((etiket, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-muted/50">
                        {etiket}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 flex justify-between pt-3 pb-3 mt-auto">
                  <div className="flex items-center gap-1 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{egitim.atanmaSayisi} Katılımcı</span>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" asChild className="border-primary/20 hover:border-primary/40 hover:bg-primary/5">
                      <Link href={`/dashboard/egitim-yonetimi/${egitim.id}/duzenle`}>
                        <Edit className="h-3 w-3 mr-1" /> Düzenle
                      </Link>
                    </Button>
                    <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
                      <Link href={`/dashboard/egitim-yonetimi/${egitim.id}`}>
                        <Play className="h-3 w-3 mr-1" /> Başla
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Sonuç yoksa */}
        {filteredEducations.length === 0 && (
          <Card className="text-center py-12 border-primary/10">
            <CardContent>
              <BookOpen className="h-12 w-12 mx-auto text-primary/40 mb-4" />
              <h3 className="text-lg font-medium mb-2">Eğitim Bulunamadı</h3>
              <p className="text-muted-foreground mb-6">
                Arama kriterlerinize uygun eğitim bulunmamaktadır. Filtreleri değiştirmeyi veya yeni bir eğitim oluşturmayı deneyebilirsiniz.
              </p>
              <Button onClick={() => router.push("/dashboard/egitim-yonetimi/olustur")} className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" /> Yeni Eğitim Oluştur
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Silme Onay Dialog */}
      <Dialog open={silmeDialogAcik} onOpenChange={setSilmeDialogAcik}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Eğitimi Sil</DialogTitle>
            <DialogDescription>
              Bu eğitimi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve tüm eğitim verileri kalıcı olarak silinecektir.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSilmeDialogAcik(false)} className="border-primary/20 hover:border-primary/40 hover:bg-primary/5">
              İptal
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Sil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 