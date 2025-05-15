"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookText,
  FileText,
  Film,
  Filter,
  Headphones,
  Image as ImageIcon,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

// İçerik türleri
const icerikTurleri = [
  {
    id: "video",
    icon: Film,
    label: "Video",
  },
  {
    id: "pdf",
    icon: FileText,
    label: "PDF",
  },
  {
    id: "audio",
    icon: Headphones,
    label: "Ses",
  },
  {
    id: "image",
    icon: ImageIcon,
    label: "Görsel",
  },
  {
    id: "article",
    icon: BookText,
    label: "Makale",
  },
];

// Sahte içerik verileri
const icerikVerileri = [
  {
    id: "1",
    baslik: "Python Temel Kavramlar",
    tur: "video",
    aciklama: "Python programlama dilinin temel kavramlarını anlatan eğitim videosu.",
    boyut: "64MB",
    sure: "12:45",
    yuklemeTarihi: "2023-11-05",
    yukleyen: "Mehmet Yılmaz",
    etiketler: ["Python", "Programlama", "Temel"]
  },
  {
    id: "2",
    baslik: "İnsan Kaynakları El Kitabı",
    tur: "pdf",
    aciklama: "Şirket İK politikalarını ve prosedürlerini içeren kapsamlı doküman.",
    boyut: "2.4MB",
    sure: "",
    yuklemeTarihi: "2023-10-18",
    yukleyen: "Ayşe Demir",
    etiketler: ["İK", "Prosedürler", "El Kitabı"]
  },
  {
    id: "3",
    baslik: "Liderlik İlkeleri",
    tur: "audio",
    aciklama: "Etkili liderlik ilkelerini anlatan podcast kaydı.",
    boyut: "28MB",
    sure: "32:17",
    yuklemeTarihi: "2023-09-22",
    yukleyen: "Ali Yıldız",
    etiketler: ["Liderlik", "Yönetim", "Kişisel Gelişim"]
  },
  {
    id: "4",
    baslik: "Kullanıcı Arayüzü Tasarım İlkeleri",
    tur: "image",
    aciklama: "UI tasarım prensiplerine dair infografik.",
    boyut: "1.2MB",
    sure: "",
    yuklemeTarihi: "2023-11-10",
    yukleyen: "Zeynep Kaya",
    etiketler: ["Tasarım", "UI", "UX"]
  },
  {
    id: "5",
    baslik: "Agile Metodoloji Rehberi",
    tur: "article",
    aciklama: "Agile proje yönetimi metodolojisini detaylı olarak açıklayan kapsamlı makale.",
    boyut: "0.8MB",
    sure: "",
    yuklemeTarihi: "2023-10-30",
    yukleyen: "Can Özkan",
    etiketler: ["Agile", "Proje Yönetimi", "Scrum"]
  },
  {
    id: "6",
    baslik: "Excel İleri Düzey Fonksiyonlar",
    tur: "video",
    aciklama: "Excel'de VLOOKUP, SUMIF ve PivotTable gibi ileri düzey fonksiyonların kullanımı.",
    boyut: "102MB",
    sure: "28:15",
    yuklemeTarihi: "2023-09-15",
    yukleyen: "Deniz Aydın",
    etiketler: ["Excel", "Veri Analizi", "Ofis"]
  },
  {
    id: "7",
    baslik: "Müşteri İlişkileri Yönetimi Sunumu",
    tur: "pdf",
    aciklama: "Etkili müşteri ilişkileri yönetimi stratejilerini içeren sunum.",
    boyut: "5.6MB",
    sure: "",
    yuklemeTarihi: "2023-11-18",
    yukleyen: "Selin Yıldırım",
    etiketler: ["CRM", "Müşteri İlişkileri", "Satış"]
  },
  {
    id: "8",
    baslik: "Siber Güvenlik Temel Prensipler",
    tur: "article",
    aciklama: "Şirket çalışanları için temel siber güvenlik prensiplerini ve önlemlerini anlatan makale.",
    boyut: "0.5MB",
    sure: "",
    yuklemeTarihi: "2023-10-05",
    yukleyen: "Burak Şahin",
    etiketler: ["Siber Güvenlik", "Güvenlik", "IT"]
  },
];

// Kategoriler
const kategoriler = [
  "Tümü",
  "Programlama",
  "İnsan Kaynakları",
  "Yönetim",
  "Tasarım",
  "İş Sağlığı ve Güvenliği",
  "Proje Yönetimi",
  "Ofis Uygulamaları",
  "Kişisel Gelişim",
];

export default function IcerikKutuphanesiPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [aramaMetni, setAramaMetni] = useState("");
  const [seciliTur, setSeciliTur] = useState("Tümü");
  const [seciliKategori, setSeciliKategori] = useState("Tümü");
  const [silinecekIcerik, setSilinecekIcerik] = useState<string | null>(null);
  const [silmeDialogAcik, setSilmeDialogAcik] = useState(false);
  const [yuklemeDialogAcik, setYuklemeDialogAcik] = useState(false);

  // Arama ve filtreleme işlevi
  const filtrelenmisIcerikler = icerikVerileri.filter((icerik) => {
    const aramaUyumu = icerik.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      icerik.aciklama.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      icerik.etiketler.some(etiket => etiket.toLowerCase().includes(aramaMetni.toLowerCase()));
    
    const turUyumu = seciliTur === "Tümü" || icerik.tur === seciliTur;
    
    return aramaUyumu && turUyumu;
  });

  // İçeriği silme işlevi
  const handleDeleteContent = (id: string) => {
    setSilinecekIcerik(id);
    setSilmeDialogAcik(true);
  };

  // İçeriği silmeyi onaylama işlevi
  const confirmDeleteContent = () => {
    // Gerçek bir API çağrısı olacak
    // Şimdilik toast gösteriyoruz
    toast({
      title: "İçerik silindi",
      description: `İçerik başarıyla silindi.`,
    });
    
    setSilmeDialogAcik(false);
    setSilinecekIcerik(null);
  };

  // İçerik yükleme işlevi
  const handleUploadContent = () => {
    // Gerçek bir API çağrısı olacak
    // Şimdilik toast gösteriyoruz
    toast({
      title: "İçerik yüklendi",
      description: "İçerik başarıyla kütüphaneye eklendi.",
    });
    setYuklemeDialogAcik(false);
  };

  // İçerik türüne göre ikon oluşturma
  const renderIcerikIkonu = (tur: string) => {
    const icerikTuru = icerikTurleri.find(item => item.id === tur);
    if (icerikTuru) {
      const IkonBileseni = icerikTuru.icon;
      return <IkonBileseni className="h-8 w-8" />;
    }
    return <FileText className="h-8 w-8" />;
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => router.back()} className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Geri
          </Button>
          <h1 className="text-2xl font-bold">İçerik Kütüphanesi</h1>
        </div>
        
        <Button onClick={() => setYuklemeDialogAcik(true)}>
          <Upload className="h-4 w-4 mr-2" />
          Yeni İçerik Yükle
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="İçerik ara..."
                className="pl-9"
                value={aramaMetni}
                onChange={(e) => setAramaMetni(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <MoreHorizontal className="mr-2 h-4 w-4" />
                  <span>Filtrele</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-md shadow-lg border border-[#e0f0fa]/50">
                {kategoriler.map((kategori) => (
                  <DropdownMenuItem
                    key={kategori}
                    onClick={() => setSeciliKategori(kategori)}
                    className={seciliKategori === kategori ? "bg-accent text-accent-foreground" : ""}
                  >
                    {kategori}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="tumu" className="mb-6">
        <TabsList>
          <TabsTrigger value="tumu" onClick={() => setSeciliTur("Tümü")}>Tümü</TabsTrigger>
          {icerikTurleri.map((tur) => (
            <TabsTrigger 
              key={tur.id} 
              value={tur.id}
              onClick={() => setSeciliTur(tur.id)}
              className="flex items-center gap-2"
            >
              <tur.icon className="h-4 w-4" />
              {tur.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      {filtrelenmisIcerikler.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrelenmisIcerikler.map((icerik) => (
            <Card key={icerik.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge variant="outline" className="mb-2">
                    {icerikTurleri.find(t => t.id === icerik.tur)?.label || icerik.tur}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Daha fazla işlem</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-md shadow-lg border border-[#e0f0fa]/50">
                      <DropdownMenuItem>
                        <FileText className="h-4 w-4 mr-2" />
                        Önizle
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Upload className="h-4 w-4 mr-2" />
                        İndir
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleDeleteContent(icerik.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Sil
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <CardTitle className="text-lg flex items-center gap-2">
                  {icerik.baslik}
                </CardTitle>
                <CardDescription className="line-clamp-2">{icerik.aciklama}</CardDescription>
              </CardHeader>
              
              <CardContent className="pb-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-muted rounded-lg">
                    {renderIcerikIkonu(icerik.tur)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div>Boyut: {icerik.boyut}</div>
                    {icerik.sure && <div>Süre: {icerik.sure}</div>}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-4">
                  {icerik.etiketler.map((etiket, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {etiket}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="border-t bg-muted/50 pt-3 pb-3">
                <div className="w-full flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    <p>Yükleyen: {icerik.yukleyen}</p>
                    <p>Tarih: {icerik.yuklemeTarihi}</p>
                  </div>
                  <Button size="sm">
                    <FileText className="h-3.5 w-3.5 mr-1" />
                    Kullan
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <div className="mx-auto rounded-full bg-muted w-16 h-16 flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">İçerik Bulunamadı</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Arama kriterlerinize uygun içerik bulunamadı. Lütfen farklı bir arama terimi 
              veya filtre deneyin ya da yeni içerik yükleyin.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setAramaMetni("");
                  setSeciliTur("Tümü");
                  setSeciliKategori("Tümü");
                }}
              >
                Filtreleri Temizle
              </Button>
              <Button onClick={() => setYuklemeDialogAcik(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Yeni İçerik Yükle
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Silme Onay Dialog */}
      <Dialog open={silmeDialogAcik} onOpenChange={setSilmeDialogAcik}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>İçeriği Sil</DialogTitle>
            <DialogDescription>
              Bu içeriği silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSilmeDialogAcik(false)}>
              İptal
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDeleteContent}
            >
              Sil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* İçerik Yükleme Dialog */}
      <Dialog open={yuklemeDialogAcik} onOpenChange={setYuklemeDialogAcik}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Yeni İçerik Yükle</DialogTitle>
            <DialogDescription>
              Kütüphaneye eklemek istediğiniz içerik bilgilerini ve dosyasını girin.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="baslik" className="text-sm font-medium">
                Başlık
              </label>
              <Input id="baslik" placeholder="İçerik başlığı girin" />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="tur" className="text-sm font-medium">
                İçerik Türü
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="İçerik türü seçin" />
                </SelectTrigger>
                <SelectContent>
                  {icerikTurleri.map((tur) => (
                    <SelectItem key={tur.id} value={tur.id}>
                      <div className="flex items-center gap-2">
                        <tur.icon className="h-4 w-4" />
                        {tur.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="aciklama" className="text-sm font-medium">
                Açıklama
              </label>
              <Input id="aciklama" placeholder="İçerik açıklaması girin" />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="kategori" className="text-sm font-medium">
                Kategori
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  {kategoriler.filter(k => k !== "Tümü").map((kategori) => (
                    <SelectItem key={kategori} value={kategori}>
                      {kategori}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="dosya" className="text-sm font-medium">
                Dosya
              </label>
              <div className="border border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-1">
                  Dosya yüklemek için tıklayın veya sürükleyip bırakın
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, Word, Excel, PowerPoint, görsel, ses ve video dosyaları desteklenir
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setYuklemeDialogAcik(false)}>
              İptal
            </Button>
            <Button 
              onClick={handleUploadContent}
            >
              Yükle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 