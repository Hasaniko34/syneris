"use client";

import React, { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Copy, 
  Download, 
  FileIcon, 
  FileText, 
  Filter, 
  Folder, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  MoreVertical, 
  Plus, 
  Search, 
  Share2, 
  Upload, 
  Video,
  Play
} from "lucide-react";

// İçerik türleri
const icerikTurleri = [
  { id: "tumu", ad: "Tümü", icon: <Folder className="h-4 w-4" /> },
  { id: "gorsel", ad: "Görseller", icon: <ImageIcon className="h-4 w-4" /> },
  { id: "video", ad: "Videolar", icon: <Video className="h-4 w-4" /> },
  { id: "dokuman", ad: "Dokümanlar", icon: <FileText className="h-4 w-4" /> },
  { id: "sunum", ad: "Sunumlar", icon: <FileIcon className="h-4 w-4" /> },
  { id: "baglanti", ad: "Bağlantılar", icon: <LinkIcon className="h-4 w-4" /> },
];

// Örnek içerik verileri
const icerikler = [
  {
    id: "1",
    ad: "Şirket Tanıtım Videosu",
    dosyaAdi: "sirket-tanitim.mp4",
    tur: "video",
    boyut: "24.5 MB",
    yuklenmeTarihi: "2023-08-15",
    yukleyen: "Mehmet Yılmaz",
    onizleme: "/media/sirket-tanitim-thumb.jpg",
    etiketler: ["şirket", "tanıtım", "kurumsal"],
    url: "https://example.com/videos/sirket-tanitim.mp4"
  },
  {
    id: "2",
    ad: "Çalışan El Kitabı",
    dosyaAdi: "calisan-el-kitabi.pdf",
    tur: "dokuman",
    boyut: "3.2 MB",
    yuklenmeTarihi: "2023-07-10",
    yukleyen: "İK Departmanı",
    onizleme: "/media/pdf-icon.png",
    etiketler: ["el kitabı", "çalışan", "prosedürler"],
    url: "https://example.com/docs/calisan-el-kitabi.pdf"
  },
  {
    id: "3",
    ad: "Yeni Ofis Görselleri",
    dosyaAdi: "ofis-gorselleri.zip",
    tur: "gorsel",
    boyut: "12.8 MB",
    yuklenmeTarihi: "2023-09-22",
    yukleyen: "Ayşe Demir",
    onizleme: "/media/ofis-onizleme.jpg",
    etiketler: ["ofis", "görsel", "mimari"],
    url: "https://example.com/images/ofis-gorselleri.zip"
  },
  {
    id: "4",
    ad: "Yıllık Hedefler Sunumu",
    dosyaAdi: "yillik-hedefler.pptx",
    tur: "sunum",
    boyut: "5.6 MB",
    yuklenmeTarihi: "2023-10-05",
    yukleyen: "Genel Müdürlük",
    onizleme: "/media/presentation-icon.png",
    etiketler: ["sunum", "hedefler", "strateji"],
    url: "https://example.com/presentations/yillik-hedefler.pptx"
  },
  {
    id: "5",
    ad: "Eğitim Platformu Bağlantısı",
    dosyaAdi: "egitim-platformu.url",
    tur: "baglanti",
    boyut: "1 KB",
    yuklenmeTarihi: "2023-09-18",
    yukleyen: "Eğitim Departmanı",
    onizleme: "/media/link-icon.png",
    etiketler: ["bağlantı", "eğitim", "platform"],
    url: "https://training.example.com"
  },
  {
    id: "6",
    ad: "Ürün Tanıtım Görselleri",
    dosyaAdi: "urun-tanitim.zip",
    tur: "gorsel",
    boyut: "8.4 MB",
    yuklenmeTarihi: "2023-11-12",
    yukleyen: "Ürün Departmanı",
    onizleme: "/media/product-preview.jpg",
    etiketler: ["ürün", "görsel", "pazarlama"],
    url: "https://example.com/images/urun-tanitim.zip"
  },
  {
    id: "7",
    ad: "Müşteri Deneyimi Eğitimi",
    dosyaAdi: "musteri-deneyimi.mp4",
    tur: "video",
    boyut: "45.2 MB",
    yuklenmeTarihi: "2023-10-28",
    yukleyen: "Satış Departmanı",
    onizleme: "/media/customer-experience-thumb.jpg",
    etiketler: ["eğitim", "müşteri", "deneyim"],
    url: "https://example.com/videos/musteri-deneyimi.mp4"
  },
  {
    id: "8",
    ad: "Teknik Dökümantasyon",
    dosyaAdi: "teknik-dokumanlar.pdf",
    tur: "dokuman",
    boyut: "7.9 MB",
    yuklenmeTarihi: "2023-08-30",
    yukleyen: "Teknik Departman",
    onizleme: "/media/pdf-icon.png",
    etiketler: ["teknik", "dokümantasyon", "kılavuz"],
    url: "https://example.com/docs/teknik-dokumanlar.pdf"
  },
];

export default function IcerikKutuphanesiPage() {
  const router = useRouter();
  const [seciliIcerikTuru, setSeciliIcerikTuru] = useState("tumu");
  const [aramaMetni, setAramaMetni] = useState("");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [yuklenenDosya, setYuklenenDosya] = useState<File | null>(null);

  // İçerik tipine göre ikon belirle
  const getIconByType = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-6 w-6 text-blue-500" />;
      case "dokuman":
        return <FileText className="h-6 w-6 text-red-500" />;
      case "gorsel":
        return <ImageIcon className="h-6 w-6 text-green-500" />;
      case "sunum":
        return <FileIcon className="h-6 w-6 text-amber-500" />;
      case "baglanti":
        return <LinkIcon className="h-6 w-6 text-purple-500" />;
      default:
        return <FileIcon className="h-6 w-6 text-gray-500" />;
    }
  };

  // Arama ve filtreleme
  const filtrelenmisIcerikler = icerikler.filter((icerik) => {
    // Tür filtresi
    if (seciliIcerikTuru !== "tumu" && icerik.tur !== seciliIcerikTuru) {
      return false;
    }

    // Arama filtresi
    if (
      aramaMetni &&
      !icerik.ad.toLowerCase().includes(aramaMetni.toLowerCase()) &&
      !icerik.etiketler.some(etiket => 
        etiket.toLowerCase().includes(aramaMetni.toLowerCase())
      )
    ) {
      return false;
    }

    return true;
  });

  // Dosya yükleme işleyicisi
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setYuklenenDosya(e.target.files[0]);
    }
  };

  // Dosya yükleme onay işleyicisi
  const handleUpload = () => {
    if (yuklenenDosya) {
      // Gerçek uygulamada burada dosya yükleme API çağrısı yapılır
      console.log(`Dosya yükleniyor: ${yuklenenDosya.name}`);
      
      // Yükleme tamamlandı bildirimi ve dialog kapatma
      setTimeout(() => {
        alert(`${yuklenenDosya.name} başarıyla yüklendi.`);
        setYuklenenDosya(null);
        setUploadDialogOpen(false);
      }, 1500);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-4" asChild>
          <Link href="/dashboard/egitim-yonetimi">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri Dön
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">İçerik Kütüphanesi</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sol kenar filtreler */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">İçerik Türleri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {icerikTurleri.map((tur) => (
                <Button
                  key={tur.id}
                  variant={seciliIcerikTuru === tur.id ? "default" : "ghost"}
                  className="justify-start w-full"
                  onClick={() => setSeciliIcerikTuru(tur.id)}
                >
                  {tur.icon}
                  <span className="ml-2">{tur.ad}</span>
                  {tur.id !== "tumu" && (
                    <Badge variant="secondary" className="ml-auto">
                      {icerikler.filter((icerik) => icerik.tur === tur.id).length}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Upload className="mr-2 h-4 w-4" /> Yeni İçerik Yükle
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>İçerik Yükle</DialogTitle>
                  <DialogDescription>
                    Eğitimlerinizde kullanmak üzere yeni bir içerik yükleyin.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="file-upload" className="block text-sm font-medium">
                      Dosya Seç
                    </label>
                    <Input
                      id="file-upload"
                      type="file"
                      onChange={handleFileChange}
                    />
                    {yuklenenDosya && (
                      <p className="text-sm text-muted-foreground">
                        Seçilen dosya: {yuklenenDosya.name} ({(yuklenenDosya.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="content-name" className="block text-sm font-medium">
                      İçerik Adı
                    </label>
                    <Input
                      id="content-name"
                      placeholder="İçerik adı girin"
                      defaultValue={yuklenenDosya?.name || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="content-tags" className="block text-sm font-medium">
                      Etiketler
                    </label>
                    <Input
                      id="content-tags"
                      placeholder="Etiketleri virgülle ayırarak girin"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="content-type" className="block text-sm font-medium">
                      İçerik Türü
                    </label>
                    <select
                      id="content-type"
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">İçerik türü seçin</option>
                      <option value="gorsel">Görsel</option>
                      <option value="video">Video</option>
                      <option value="dokuman">Doküman</option>
                      <option value="sunum">Sunum</option>
                      <option value="baglanti">Bağlantı</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                    İptal
                  </Button>
                  <Button onClick={handleUpload} disabled={!yuklenenDosya}>
                    Yükle
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        {/* Ana içerik */}
        <div className="lg:col-span-3 space-y-6">
          {/* Arama kutusu */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="İçerik ara..."
                    className="pl-8"
                    value={aramaMetni}
                    onChange={(e) => setAramaMetni(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrele
                </Button>
                <Button variant="outline" size="sm" className="h-9">
                  <Share2 className="mr-2 h-4 w-4" />
                  Paylaş
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* İçerik listesi */}
          {filtrelenmisIcerikler.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">İçerik Bulunamadı</h3>
                <p className="text-muted-foreground mb-4">
                  Arama kriterlerinize uygun içerik bulunamadı.
                </p>
                <Button variant="outline" onClick={() => {
                  setAramaMetni("");
                  setSeciliIcerikTuru("tumu");
                }}>
                  Tüm İçerikleri Göster
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtrelenmisIcerikler.map((icerik) => (
                <Card key={icerik.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        {getIconByType(icerik.tur)}
                        <CardTitle className="text-base ml-2">{icerik.ad}</CardTitle>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" /> İndir
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" /> Eğitime Ekle
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" /> Paylaş
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Sil
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center overflow-hidden mb-2">
                      {icerik.tur === "gorsel" ? (
                        <img
                          src={icerik.onizleme}
                          alt={icerik.ad}
                          className="w-full h-full object-cover"
                        />
                      ) : icerik.tur === "video" ? (
                        <div className="relative w-full h-full bg-black">
                          <img
                            src={icerik.onizleme}
                            alt={icerik.ad}
                            className="w-full h-full object-cover opacity-70"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="rounded-full bg-white/20 p-3">
                              <Play className="h-6 w-6 text-white" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          {getIconByType(icerik.tur)}
                          <span className="text-xs text-muted-foreground mt-2">
                            {icerik.dosyaAdi}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {icerik.etiketler.map((etiket, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {etiket}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between text-xs text-muted-foreground">
                    <span>{icerik.boyut}</span>
                    <span>{new Date(icerik.yuklenmeTarihi).toLocaleDateString("tr-TR")}</span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 