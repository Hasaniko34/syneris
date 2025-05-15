"use client";

import React, { useState, useEffect } from "react";

// Eğitim tipi tanımı
type Egitim = {
  id: string;
  baslik: string;
  aciklama: string;
  kategori: string;
  sure: string;
  etiketler: string[];
  zorluSeviye: string;
  puan: number;
  degerlendirmeSayisi: number;
  oneriNedeni: string;
  popülerlik: number;
  tamamlayanKisi: number;
  banner: string;
  online: boolean;
  egitmen: string;
  tarih: string;
  yildiz: number;
  katilimci: number;
};
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  ChevronRight,
  Clock,
  Search,
  Star,
  Sparkles,
  TrendingUp,
  Users,
  BookOpenCheck,
  Lightbulb,
  X,
  Filter,
  Tag,
  CheckCircle,
  Play,
  UserCircle,
  Calendar,
  PlayCircle,
  Bot,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";

// İlgi alanları
const ilgiAlanlari = [
  { id: "tekservis", isim: "Teknoloji Servisleri", secili: true },
  { id: "network", isim: "Şebeke ve Altyapı", secili: true },
  { id: "callcenter", isim: "Çağrı Merkezi Operasyonları", secili: false },
  { id: "sahateknisyen", isim: "Saha Teknik Operasyonlar", secili: false },
  { id: "digitalkanal", isim: "Dijital Kanal Yönetimi", secili: false },
  { id: "crm", isim: "CRM ve Abone Yönetimi", secili: false },
  { id: "faturalama", isim: "Faturalama ve OSS/BSS", secili: false },
  { id: "cybersecurity", isim: "Siber Güvenlik", secili: false },
  { id: "management", isim: "Proje ve Süreç Yönetimi", secili: false },
  { id: "career", isim: "Kariyer Gelişimi", secili: true },
];

// Örnek eğitim verileri
const onerilenEgitimler = [
  {
    id: "101",
    baslik: "BiP Destek Süreci ve Entegrasyonları",
    aciklama: "BiP platformu üzerinde müşteri taleplerini kaydetme ve destek süreçlerini yönetme.",
    kategori: "Dijital Servisler",
    sure: "8 saat",
    etiketler: ["BiP", "Müşteri Destek", "Dijital Kanal", "Entegrasyon"],
    zorluSeviye: "Orta",
    puan: 4.8,
    degerlendirmeSayisi: 128,
    oneriNedeni: "Çağrı merkezi modülünü tamamladınız, BiP kanal entegrasyonları ile devam edebilirsiniz.",
    popülerlik: 92,
    tamamlayanKisi: 876,
    banner: "/images/courses/bip-api.jpg",
    online: true,
    egitmen: "Ahmet Yılmaz",
    tarih: "2024-05-01",
    yildiz: 4.8,
    katilimci: 876,
  },
  {
    id: "102",
    baslik: "5G Şebeke Optimizasyonu ve BTS Kurulumu",
    aciklama: "5G şebeke altyapısının optimizasyonu, BTS kurulum ve arıza tespiti adımları.",
    kategori: "Şebeke Teknolojileri",
    sure: "12 saat",
    etiketler: ["5G", "BTS", "Şebeke", "Saha Operasyonu"],
    zorluSeviye: "İleri",
    puan: 4.9,
    degerlendirmeSayisi: 210,
    oneriNedeni: "4G eğitimini tamamladınız, 5G teknolojileri ile saha bilgilerinizi güncelleyin.",
    popülerlik: 96,
    tamamlayanKisi: 1240,
    banner: "/images/courses/5g-network.jpg",
    online: true,
    egitmen: "Mehmet Demir",
    tarih: "2024-04-15",
    yildiz: 4.9,
    katilimci: 1240,
  },
  {
    id: "103",
    baslik: "Lifebox Servis Yönetimi ve Destek Süreçleri",
    aciklama: "Lifebox bulut depolama servislerinin özelliklerini ve müşteri destek süreçlerini öğrenin.",
    kategori: "Dijital Servisler",
    sure: "6 saat",
    etiketler: ["Lifebox", "Bulut Depolama", "Müşteri Destek", "Arıza Yönetimi"],
    zorluSeviye: "Orta",
    puan: 4.7,
    degerlendirmeSayisi: 98,
    oneriNedeni: "Bulut teknolojileri bilginizi Lifebox müşteri destek süreçleri ile pekiştirin.",
    popülerlik: 88,
    tamamlayanKisi: 654,
    banner: "/images/courses/lifebox.jpg",
    online: true,
    egitmen: "Ayşe Kaya",
    tarih: "2024-03-20",
    yildiz: 4.7,
    katilimci: 654,
  },
  {
    id: "104",
    baslik: "Dijital Operatör CRM ve Faturalama Modülü",
    aciklama: "Turkcell Dijital Operatör platformunun abone yönetimi, CRM ve faturalama süreçlerini öğrenin.",
    kategori: "Dijital Servisler",
    sure: "10 saat",
    etiketler: ["Dijital Operatör", "CRM", "Faturalama", "Abone Yönetimi"],
    zorluSeviye: "Başlangıç-Orta",
    puan: 4.9,
    degerlendirmeSayisi: 315,
    oneriNedeni: "Müşteri hizmetleri deneyiminizi dijital operatör back-office süreçleri ile güçlendirin.",
    popülerlik: 95,
    tamamlayanKisi: 2130,
    banner: "/images/courses/digital-operator.jpg",
    online: true,
    egitmen: "Can Yıldız",
    tarih: "2024-02-10",
    yildiz: 4.9,
    katilimci: 2130,
  },
  {
    id: "105",
    baslik: "Kampanya Tanımlama ve Faturalama Editörü",
    aciklama: "Turkcell kampanya tanımlama süreçleri ve faturalama editörünün etkin kullanımını öğrenin.",
    kategori: "Back-office",
    sure: "7 saat",
    etiketler: ["Kampanya Yönetimi", "Faturalama", "Abone İşlemleri", "Back-office"],
    zorluSeviye: "Orta",
    puan: 4.8,
    degerlendirmeSayisi: 176,
    oneriNedeni: "Back-office rolünüz için kampanya tanımlama ve faturalama süreçlerini öğrenmeniz önerilir.",
    popülerlik: 91,
    tamamlayanKisi: 842,
    banner: "/images/courses/campaign-management.jpg",
    online: false,
    egitmen: "Hande Şahin",
    tarih: "2024-01-05",
    yildiz: 4.8,
    katilimci: 842,
  },
  {
    id: "106",
    baslik: "VPN ve Yeni Numara Tahsis Süreçleri",
    aciklama: "Kurumsal müşterilere özel VPN oluşturma ve yeni numara tahsis işlemlerini adım adım öğrenin.",
    kategori: "Kurumsal Hizmetler",
    sure: "9 saat",
    etiketler: ["VPN", "Numara Tahsis", "Kurumsal", "Self Servis"],
    zorluSeviye: "Orta",
    puan: 4.9,
    degerlendirmeSayisi: 142,
    oneriNedeni: "Kurumsal müşteri hizmetlerinizi geliştirmek için özel kurumsal süreçleri öğrenin.",
    popülerlik: 94,
    tamamlayanKisi: 763,
    banner: "/images/courses/vpn-allocation.jpg",
    online: true,
    egitmen: "Serkan Yılmaz",
    tarih: "2023-12-15",
    yildiz: 4.9,
    katilimci: 763,
  },
];

// Eğitim kartı bileşeni
function EgitimKarti({ tur, egitim }: { tur: 'populer' | 'yeni' | 'onerilen', egitim: Egitim }) {
  const router = useRouter();
  
  const gotoEgitimDetay = () => {
    router.push(`/dashboard/egitimlerim/kayit/${egitim.id}`);
  };
  
  return (
    <Card 
      className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow cursor-pointer" 
      onClick={gotoEgitimDetay}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className={
            tur === "populer" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-0" :
            tur === "yeni" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-0" :
            "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-0"
          }>
            {tur === "populer" ? "Popüler" : tur === "yeni" ? "Yeni" : "Önerilen"}
          </Badge>
          {egitim.online && (
            <Badge variant="outline" className="bg-background border-green-500 text-green-500">Çevrimiçi</Badge>
          )}
        </div>
        
        <CardTitle className="text-lg mt-2">{egitim.baslik}</CardTitle>
        <CardDescription className="line-clamp-2">{egitim.aciklama}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <div className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <UserCircle className="h-3.5 w-3.5" />
            <span>{egitim.egitmen}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{egitim.tarih}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{egitim.sure}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>{egitim.katilimci} Katılımcı</span>
          </div>
        </div>
        
        <div className="flex items-center mt-4">
          <Badge variant="secondary" className="mr-1">
            {egitim.kategori}
          </Badge>
          <Badge variant="secondary" className="bg-primary/10 hover:bg-primary/20 text-primary">
            {egitim.zorluSeviye}
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-4 flex items-center justify-between border-t">
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="font-medium">{egitim.puan}</span>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={(e) => {
            e.stopPropagation(); // Kartın kendi tıklama olayını engelle
            router.push(`/dashboard/egitimlerim/${egitim.id}`);
          }}
        >
          <PlayCircle className="h-4 w-4 mr-2" />
          Hemen Başla
        </Button>
      </CardFooter>
    </Card>
  );
}

// İlgi alanı etiketi
const IlgiAlaniEtiketi = ({ ilgiAlani, onChange }: { ilgiAlani: any, onChange: (id: string, secili: boolean) => void }) => {
  return (
    <Badge 
      variant={ilgiAlani.secili ? "default" : "outline"} 
      className={cn(
        "cursor-pointer transition-all",
        ilgiAlani.secili ? "bg-primary/90" : "hover:bg-primary/10"
      )}
      onClick={() => onChange(ilgiAlani.id, !ilgiAlani.secili)}
    >
      {ilgiAlani.secili && <CheckCircle className="h-3 w-3 mr-1" />}
      {ilgiAlani.isim}
    </Badge>
  );
};

export default function OnerilenEgitimlerPage() {
  const router = useRouter();
  const [aramaMetni, setAramaMetni] = useState("");
  const [seciliIlgiAlanlari, setSeciliIlgiAlanlari] = useState(ilgiAlanlari);
  const [aktifTab, setAktifTab] = useState("oneriler");
  
  const [filtreMobilAcik, setFiltreMobilAcik] = useState(false);
  
  // Seçili ilgi alanlarına ve arama metninize göre filtreleme
  const filtrelenmisEgitimler = onerilenEgitimler.filter((egitim) => {
    // İlgi alanlarına göre filtreleme (basit bir örnek için keyword eşleştirme)
    const ilgiFiltresi = seciliIlgiAlanlari.some(alan => alan.secili);
    const ilgiAlaniUyuyor = !ilgiFiltresi || seciliIlgiAlanlari.some(alan => {
      if (!alan.secili) return false;
      
      // Bu basit örnekte eğitim etiketlerinde ilgi alanını içeren kelimeler varsa eşleştir
      return egitim.etiketler.some(etiket => 
        etiket.toLowerCase().includes(alan.isim.toLowerCase()) || 
        alan.isim.toLowerCase().includes(etiket.toLowerCase())
      );
    });
    
    // Arama metnini eğitim başlığı ve açıklamasında ara
    const aramaUyuyor = aramaMetni === "" || 
      egitim.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      egitim.aciklama.toLowerCase().includes(aramaMetni.toLowerCase());
    
    return ilgiAlaniUyuyor && aramaUyuyor;
  });

  // Bir ilgi alanının seçili durumunu değiştirme
  const ilgiAlaniDegistir = (id: string, secili: boolean) => {
    setSeciliIlgiAlanlari(prev => 
      prev.map(alan => alan.id === id ? { ...alan, secili } : alan)
    );
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Önerilen Eğitimler</h1>
        <p className="text-muted-foreground">
          İlgi alanlarınıza ve öğrenme geçmişinize göre özel olarak seçilmiş Turkcell sistemleri eğitimleri
        </p>
      </div>
      
      <div className="mb-8 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="mt-1 bg-blue-100 dark:bg-blue-800 rounded-full p-2">
            <Bot className="h-5 w-5 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
              Synbot Akıllı Destek Asistanı
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-400 mb-2">
              Turkcell sistemlerinde yönlendirme ve destek için Synbot her adımda yanınızda. Sık yapılan 
              hatalara karşı uyarılar alın, kısa yolları öğrenin ve adım adım rehberlikten yararlanın.
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-xs h-7 border-blue-300 hover:bg-blue-100 dark:border-blue-700 dark:hover:bg-blue-900/50">
                <Info className="h-3 w-3 mr-1" />
                Daha Fazla Bilgi
              </Button>
              <Button size="sm" className="text-xs h-7 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                <PlayCircle className="h-3 w-3 mr-1" />
                Synbot Tanıtımı
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Önerilen Eğitimler</h1>
          <p className="text-muted-foreground">
            İlgi alanlarınıza ve öğrenme geçmişinize göre özel olarak seçilmiş eğitimler
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1" asChild>
            <Link href="/dashboard/egitim-katalogu">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Eğitim Kataloğu</span>
              <span className="sm:hidden">Katalog</span>
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1" asChild>
            <Link href="/dashboard/egitimlerim">
              <BookOpenCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Eğitimlerim</span>
              <span className="sm:hidden">Eğitimlerim</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Önerilen eğitimlerde ara..."
            className="pl-8"
            value={aramaMetni}
            onChange={(e) => setAramaMetni(e.target.value)}
          />
          {aramaMetni && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-9 w-9"
              onClick={() => setAramaMetni("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">İlgi Alanlarınız</h3>
          </div>
          <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => {
            setSeciliIlgiAlanlari(ilgiAlanlari.map(alan => ({ ...alan, secili: false })));
            toast({
              title: "İlgi alanları sıfırlandı",
              description: "Tüm ilgi alanları temizlendi.",
            });
          }}>
            Temizle
          </Button>
        </div>
        
        <ScrollArea className="whitespace-nowrap pb-2">
          <div className="flex gap-2 flex-wrap">
            {seciliIlgiAlanlari.map((ilgiAlani) => (
              <IlgiAlaniEtiketi 
                key={ilgiAlani.id} 
                ilgiAlani={ilgiAlani} 
                onChange={ilgiAlaniDegistir} 
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      <Tabs value={aktifTab} onValueChange={setAktifTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="oneriler" className="gap-1">
            <Sparkles className="h-4 w-4" />
            Size Özel Öneriler
          </TabsTrigger>
          <TabsTrigger value="populer" className="gap-1">
            <TrendingUp className="h-4 w-4" />
            Popüler Eğitimler
          </TabsTrigger>
          <TabsTrigger value="yeni" className="gap-1">
            <Star className="h-4 w-4" />
            Yeni Eklenenler
          </TabsTrigger>
        </TabsList>

        <TabsContent value="oneriler" className="m-0">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Size Özel Öneriler</h2>
            <p className="text-muted-foreground">
              Turkcell sistemlerine adaptasyonunuzu hızlandırmak için pozisyonunuza ve öğrenme geçmişinize özel seçilmiş eğitimler
            </p>
          </div>
          
          {filtrelenmisEgitimler.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtrelenmisEgitimler.slice(0, 6).map((egitim) => (
                <EgitimKarti key={egitim.id} tur="onerilen" egitim={egitim} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto rounded-full bg-muted w-16 h-16 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Sonuç Bulunamadı</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Arama kriterlerinize veya ilgi alanlarınıza uygun eğitim önerisi bulunamadı.
                Farklı bir arama terimi deneyin veya ilgi alanlarınızı değiştirin.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setAramaMetni("");
                  setSeciliIlgiAlanlari(ilgiAlanlari);
                }}
              >
                Filtreleri Sıfırla
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="populer" className="m-0">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Popüler Eğitimler</h2>
            <p className="text-muted-foreground">
              Turkcell çalışanları arasında en çok tamamlanan ve en yüksek değerlendirme puanına sahip popüler eğitimler
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {onerilenEgitimler
              .sort((a, b) => b.tamamlayanKisi - a.tamamlayanKisi)
              .slice(0, 6)
              .map((egitim) => (
                <EgitimKarti key={egitim.id} tur="populer" egitim={egitim} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="yeni" className="m-0">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Yeni Eklenen Eğitimler</h2>
            <p className="text-muted-foreground">
              Yeni servis ve altyapı modülleriyle birlikte Turkcell Akademi'yle entegre şekilde sunulan yeni eğitimler
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {onerilenEgitimler
              .sort(() => 0.5 - Math.random()) // Rasgele sıralamak için
              .slice(0, 6)
              .map((egitim) => (
                <EgitimKarti key={egitim.id} tur="yeni" egitim={egitim} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <Separator className="my-8" />
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Kariyer Gelişim Önerileri</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-[#ffc72c] to-[#00a0d2] relative">
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-1">Çağrı Merkezi Uzmanı</h3>
                <p className="text-sm opacity-90">Müşteri taleplerini kaydetme ve BiP Destek süreçleri</p>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-4">
                Turkcell Çağrı Merkezi operasyonlarında uzmanlaşarak müşteri deneyimini 
                artıran dijital kanal entegrasyonlarını öğrenin.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>İlerleme</span>
                  <span className="font-medium">25%</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
              <Button asChild className="bg-[#00a0d2] hover:bg-[#008db8]">
                <Link href="/dashboard/ogrenme-yollari/cagri-merkezi">
                  Yola Devam Et
                  <Play className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-[#00a0d2] to-[#ffc72c] relative">
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-1">Saha Operasyon Uzmanı</h3>
                <p className="text-sm opacity-90">BTS kurulumu ve arıza tespiti adımları</p>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-4">
                Saha servis ekipleri için BTS kurulumu, 5G şebeke altyapısı ve 
                arıza tespit süreçlerinde adım adım rehberlik.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>İlerleme</span>
                  <span className="font-medium">0%</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              <Button asChild className="bg-[#00a0d2] hover:bg-[#008db8]">
                <Link href="/dashboard/ogrenme-yollari/saha-operasyon">
                  Yola Başla
                  <Play className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Toaster />
    </div>
  );
} 