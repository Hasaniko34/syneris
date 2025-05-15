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
  Clock,
  Filter,
  Search,
  SortAsc,
  Star,
  PlusCircle,
  Calendar,
  Users,
  UserCheck,
  BookMarked,
  Award,
  Trophy,
  PlayCircle,
  Tag,
  Smartphone,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { egitimKataloguVerileri, kategoriler, seviyeler } from "./data";

export default function EgitimKataloguPage() {
  const router = useRouter();
  const [aramaMetni, setAramaMetni] = useState("");
  const [seciliKategori, setSeciliKategori] = useState("Tümü");
  const [seciliSeviye, setSeciliSeviye] = useState("Tümü");
  const [seciliFiyat, setSeciliFiyat] = useState("tumu");
  const [siralama, setSiralama] = useState("populer");
  const [filtrelenmisEgitimler, setFiltrelenmisEgitimler] = useState(egitimKataloguVerileri);
  const [aktifTab, setAktifTab] = useState("tum-egitimler");
  const [yukleniyor, setYukleniyor] = useState(true);

  // Yükleme simülasyonu
  useEffect(() => {
    setTimeout(() => {
      setYukleniyor(false);
    }, 1000);
  }, []);

  // Filtreleme ve sıralama
  useEffect(() => {
    let sonuc = [...egitimKataloguVerileri];

    // Tab filtresi
    if (aktifTab === "en-yeni") {
      sonuc = sonuc.filter((egitim) => egitim.enYeni);
    } else if (aktifTab === "populer") {
      sonuc = sonuc.filter((egitim) => egitim.populer);
    } else if (aktifTab === "online") {
      sonuc = sonuc.filter((egitim) => egitim.online);
    }

    // Kategori filtresi
    if (seciliKategori !== "Tümü") {
      sonuc = sonuc.filter((egitim) => egitim.kategori === seciliKategori);
    }

    // Seviye filtresi
    if (seciliSeviye !== "Tümü") {
      sonuc = sonuc.filter((egitim) => egitim.seviye === seciliSeviye);
    }

    // Fiyat filtresi
    if (seciliFiyat === "ucretsiz") {
      sonuc = sonuc.filter((egitim) => egitim.fiyat === 0);
    } else if (seciliFiyat === "ucretli") {
      sonuc = sonuc.filter((egitim) => egitim.fiyat > 0);
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
        case "populer":
          return b.katilimciSayisi - a.katilimciSayisi;
        case "yeni-eklenen":
          return new Date(b.tarih).getTime() - new Date(a.tarih).getTime();
        case "yuksek-puan":
          return b.puan - a.puan;
        case "dusuk-fiyat":
          return a.fiyat - b.fiyat;
        case "yuksek-fiyat":
          return b.fiyat - a.fiyat;
        default:
          return 0;
      }
    });

    setFiltrelenmisEgitimler(sonuc);
  }, [aramaMetni, seciliKategori, seciliSeviye, seciliFiyat, siralama, aktifTab]);

  // Yükleme durumu
  if (yukleniyor) {
    return (
      <div className="container mx-auto py-6 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A0D2] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Eğitim kataloğu yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#00A0D2]">Turkcell Eğitim Kataloğu</h1>
        <p className="text-muted-foreground mt-1">
          Telekomünikasyon ve dijital servisler alanında becerilerinizi geliştirmek için özel hazırlanan Turkcell eğitim programları
        </p>
      </div>

      {/* Öne çıkan eğitimler */}
      <Card className="bg-gradient-to-r from-[#00A0D2]/5 to-[#00A0D2]/10 mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="flex-1 space-y-4">
              <Badge variant="outline" className="bg-[#FFD100]/20 text-[#00A0D2] border-[#00A0D2]/20">
                <Award className="h-4 w-4 mr-1" /> Öne Çıkan Eğitim
              </Badge>
              <h2 className="text-2xl font-bold text-[#00A0D2]">Turkcell Dijital Servisler Platformu</h2>
              <p className="text-muted-foreground max-w-lg">
                Turkcell'in dijital servisleri ve mobil uygulamalarını detaylı öğrenin. Mobil uygulama özellikleri, 
                dijital müşteri edinimi, güvenlik sistemleri ve uygulama içi işlevleri kapsayan kapsamlı eğitim.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">4.7</span>
                  <span className="text-muted-foreground">(312 değerlendirme)</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <UserCheck className="h-4 w-4" />
                  <span>1,560 katılımcı</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>10 saat</span>
                </div>
              </div>
              <div className="pt-2">
                <Button className="bg-[#00A0D2] hover:bg-[#0080A8]" asChild>
                  <Link href="/dashboard/egitim-katalogu/turkcell-dijital-servisler-platformu">
                    <PlayCircle className="h-4 w-4 mr-2" /> Hemen Başla
                  </Link>
                </Button>
                <Button variant="outline" className="ml-2 border-[#00A0D2]/20 text-[#00A0D2] hover:bg-[#FFD100]/10" asChild>
                  <Link href="/more-info/dijital-servisler">
                    <BookMarked className="h-4 w-4 mr-2" /> Detayları Gör
                  </Link>
                </Button>
              </div>
            </div>
            <div className="w-full lg:w-auto flex-shrink-0">
              <div className="relative w-full h-48 lg:w-80 lg:h-60 rounded-lg bg-gradient-to-r from-[#00A0D2] to-[#007DA3] flex items-center justify-center text-white shadow-lg overflow-hidden">
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[length:16px_16px]"></div>
                <div className="relative text-center p-6">
                  <Smartphone className="h-12 w-12 mx-auto mb-4" />
                  <div className="text-xl font-bold mb-2">Dijital Servisler</div>
                  <div className="text-sm opacity-75">10+ Saat Eğitim İçeriği</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtreler ve Arama */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Eğitim ara..."
                className="pl-10 border-[#00A0D2]/20 focus-visible:ring-[#00A0D2]/30"
                value={aramaMetni}
                onChange={(e) => setAramaMetni(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={seciliKategori} onValueChange={setSeciliKategori}>
              <SelectTrigger className="w-[180px] border-[#00A0D2]/20">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tümü">Tüm Kategoriler</SelectItem>
                {kategoriler.map((kategori) => (
                  <SelectItem key={kategori} value={kategori}>
                    {kategori}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={seciliSeviye} onValueChange={setSeciliSeviye}>
              <SelectTrigger className="w-[150px] border-[#00A0D2]/20">
                <SelectValue placeholder="Seviye" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tümü">Tüm Seviyeler</SelectItem>
                {seviyeler.map((seviye) => (
                  <SelectItem key={seviye} value={seviye}>
                    {seviye}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={seciliFiyat} onValueChange={setSeciliFiyat}>
            <SelectTrigger className="w-[150px] border-[#00A0D2]/20">
              <SelectValue placeholder="Fiyat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tumu">Tüm Fiyatlar</SelectItem>
              <SelectItem value="ucretsiz">Ücretsiz</SelectItem>
              <SelectItem value="ucretli">Ücretli</SelectItem>
            </SelectContent>
          </Select>
          <Select value={siralama} onValueChange={setSiralama}>
            <SelectTrigger className="w-[180px] border-[#00A0D2]/20">
              <SelectValue placeholder="Sıralama" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="populer">En Popüler</SelectItem>
              <SelectItem value="yeni-eklenen">Yeni Eklenen</SelectItem>
              <SelectItem value="yuksek-puan">Yüksek Puan</SelectItem>
              <SelectItem value="dusuk-fiyat">Düşük Fiyat</SelectItem>
              <SelectItem value="yuksek-fiyat">Yüksek Fiyat</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Eğitim Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtrelenmisEgitimler.map((egitim) => (
          <Card key={egitim.id} className="border-[#00A0D2]/10 hover:border-[#00A0D2]/30 transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="bg-[#FFD100]/20 text-[#00A0D2] border-[#00A0D2]/20">
                  {egitim.kategori}
                </Badge>
                <Badge variant="outline" className={
                  egitim.seviye === "Başlangıç" ? "bg-green-100 text-green-700 border-green-200" :
                  egitim.seviye === "Orta" ? "bg-[#FFD100]/20 text-amber-700 border-amber-200" :
                  "bg-red-100 text-red-700 border-red-200"
                }>
                  {egitim.seviye}
                </Badge>
              </div>
              <CardTitle className="text-[#00A0D2]">{egitim.baslik}</CardTitle>
              <CardDescription className="line-clamp-2">{egitim.aciklama}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{egitim.puan}</span>
                  <span className="text-muted-foreground">({egitim.degerlendirmeSayisi})</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <UserCheck className="h-4 w-4" />
                  <span>{egitim.katilimciSayisi} katılımcı</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{egitim.sure}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {egitim.etiketler.slice(0, 3).map((etiket, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-[#FFD100]/10 text-gray-700">
                    {etiket}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button className="w-full bg-[#00A0D2] hover:bg-[#0080A8]" asChild>
                <Link href={`/dashboard/egitim-katalogu/${egitim.id}`}>
                  {egitim.fiyat === 0 ? (
                    <>
                      <PlayCircle className="h-4 w-4 mr-2" /> Hemen Başla
                    </>
                  ) : (
                    <>
                      <Tag className="h-4 w-4 mr-2" /> {egitim.fiyat} TL
                    </>
                  )}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Boş Durum */}
      {filtrelenmisEgitimler.length === 0 && (
        <Card className="text-center py-12 border-[#00A0D2]/10">
          <CardContent>
            <BookOpen className="h-12 w-12 mx-auto text-[#00A0D2]/40 mb-4" />
            <h3 className="text-lg font-medium mb-2">Eğitim Bulunamadı</h3>
            <p className="text-muted-foreground mb-6">
              Arama kriterlerinize uygun eğitim bulunmamaktadır.
            </p>
            <Button onClick={() => {
              setAramaMetni("");
              setSeciliKategori("Tümü");
              setSeciliSeviye("Tümü");
              setSeciliFiyat("tumu");
              setSiralama("populer");
            }} className="bg-[#00A0D2] hover:bg-[#0080A8]">
              Filtreleri Temizle
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 