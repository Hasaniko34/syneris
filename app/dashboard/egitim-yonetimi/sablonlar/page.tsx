"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Copy,
  FileText,
  Filter,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Trash2,
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

// Sahte şablon verileri
const egitimSablonlari = [
  {
    id: "1",
    baslik: "Yeni Başlayan Oryantasyonu",
    aciklama: "Şirkete yeni katılan çalışanlar için temel bilgileri içeren oryantasyon eğitimi.",
    kategori: "Oryantasyon",
    sure: "2 saat",
    modulSayisi: 5,
    olusturulmaTarihi: "2023-09-15",
    kullanilmaSayisi: 28,
    etiketler: ["Oryantasyon", "Yeni Başlayan", "Temel"]
  },
  {
    id: "2",
    baslik: "İş Sağlığı ve Güvenliği",
    aciklama: "Yasal gereklilikleri karşılayan temel iş sağlığı ve güvenliği eğitimi.",
    kategori: "İSG",
    sure: "4 saat",
    modulSayisi: 8,
    olusturulmaTarihi: "2023-08-20",
    kullanilmaSayisi: 42,
    etiketler: ["İSG", "Güvenlik", "Zorunlu"]
  },
  {
    id: "3",
    baslik: "Müşteri İlişkileri Yönetimi",
    aciklama: "Müşteri memnuniyeti ve etkili iletişim teknikleri üzerine kapsamlı eğitim.",
    kategori: "Satış",
    sure: "6 saat",
    modulSayisi: 10,
    olusturulmaTarihi: "2023-10-05",
    kullanilmaSayisi: 15,
    etiketler: ["Müşteri İlişkileri", "İletişim", "Satış"]
  },
  {
    id: "4",
    baslik: "Proje Yönetimi Temelleri",
    aciklama: "Proje yaşam döngüsü, kaynakların yönetimi ve planlama teknikleri hakkında temel eğitim.",
    kategori: "Yönetim",
    sure: "8 saat",
    modulSayisi: 12,
    olusturulmaTarihi: "2023-07-10",
    kullanilmaSayisi: 20,
    etiketler: ["Proje Yönetimi", "Planlama", "Yönetim"]
  },
  {
    id: "5",
    baslik: "Veri Analizi ve Excel",
    aciklama: "Excel ile veri analizi, pivot tablolar ve temel formüller hakkında eğitim.",
    kategori: "Veri Analizi",
    sure: "5 saat",
    modulSayisi: 8,
    olusturulmaTarihi: "2023-11-02",
    kullanilmaSayisi: 12,
    etiketler: ["Excel", "Veri Analizi", "Raporlama"]
  },
];

const kategoriler = [
  "Tümü",
  "Oryantasyon",
  "İSG",
  "Satış",
  "Yönetim",
  "Veri Analizi",
  "Teknik",
  "Kişisel Gelişim"
];

export default function EgitimSablonlariPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [aramaMetni, setAramaMetni] = useState("");
  const [seciliKategori, setSeciliKategori] = useState("Tümü");
  const [silinecekSablon, setSilinecekSablon] = useState<string | null>(null);
  const [silmeDialogAcik, setSilmeDialogAcik] = useState(false);

  // Arama ve filtreleme işlevi
  const filtrelenmisEgitimler = egitimSablonlari.filter((egitim) => {
    const aramaUyumu = egitim.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      egitim.aciklama.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      egitim.etiketler.some(etiket => etiket.toLowerCase().includes(aramaMetni.toLowerCase()));
    
    const kategoriUyumu = seciliKategori === "Tümü" || egitim.kategori === seciliKategori;
    
    return aramaUyumu && kategoriUyumu;
  });

  // Şablonu silme işlevi
  const handleDeleteTemplate = (id: string) => {
    setSilinecekSablon(id);
    setSilmeDialogAcik(true);
  };

  // Şablonu silmeyi onaylama işlevi
  const confirmDeleteTemplate = () => {
    // Gerçek bir API çağrısı olacak
    // Şimdilik taosti gösteriyoruz
    toast({
      title: "Şablon silindi",
      description: `Şablon başarıyla silindi.`,
    });
    
    setSilmeDialogAcik(false);
    setSilinecekSablon(null);
  };

  // Şablonu kopyalama işlevi
  const handleDuplicateTemplate = (id: string) => {
    // Gerçek bir API çağrısı olacak
    // Şimdilik toast gösteriyoruz
    toast({
      title: "Şablon kopyalandı",
      description: `Şablonun bir kopyası oluşturuldu.`,
    });
  };

  // Şablonu kullanarak yeni eğitim oluşturma işlevi
  const handleUseTemplate = (id: string) => {
    router.push(`/dashboard/egitim-yonetimi/olustur?template=${id}`);
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => router.back()} className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Geri
          </Button>
          <h1 className="text-2xl font-bold">Eğitim Şablonları</h1>
        </div>
        
        <Button asChild>
          <Link href="/dashboard/egitim-yonetimi/sablonlar/olustur">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Şablon Oluştur
          </Link>
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Şablonları ara..."
                className="pl-9"
                value={aramaMetni}
                onChange={(e) => setAramaMetni(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {seciliKategori === "Tümü" ? "Tüm Kategoriler" : seciliKategori}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
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
      
      {filtrelenmisEgitimler.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrelenmisEgitimler.map((egitim) => (
            <Card key={egitim.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge className="mb-2">{egitim.kategori}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleUseTemplate(egitim.id)}>
                        <FileText className="h-4 w-4 mr-2" />
                        Şablonu Kullan
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicateTemplate(egitim.id)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Kopyala
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleDeleteTemplate(egitim.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Sil
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <CardTitle className="text-lg">{egitim.baslik}</CardTitle>
                <CardDescription className="line-clamp-2">{egitim.aciklama}</CardDescription>
              </CardHeader>
              
              <CardContent className="pb-3">
                <div className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>{egitim.modulSayisi} Modül</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="h-3.5 w-3.5" />
                    <span>{egitim.kullanilmaSayisi} Kez Kullanıldı</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-4">
                  {egitim.etiketler.map((etiket, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {etiket}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="border-t bg-muted/50 pt-3 pb-3">
                <Button 
                  className="w-full"
                  onClick={() => handleUseTemplate(egitim.id)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Şablonu Kullan
                </Button>
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
            <h3 className="text-lg font-medium mb-2">Şablon Bulunamadı</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Arama kriterlerinize uygun eğitim şablonu bulunamadı. Lütfen farklı bir arama terimi 
              veya filtre deneyin ya da yeni bir şablon oluşturun.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setAramaMetni("");
                  setSeciliKategori("Tümü");
                }}
              >
                Filtreleri Temizle
              </Button>
              <Button asChild>
                <Link href="/dashboard/egitim-yonetimi/sablonlar/olustur">
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Şablon Oluştur
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Silme Onay Dialog */}
      <Dialog open={silmeDialogAcik} onOpenChange={setSilmeDialogAcik}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Şablonu Sil</DialogTitle>
            <DialogDescription>
              Bu şablonu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSilmeDialogAcik(false)}>
              İptal
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDeleteTemplate}
            >
              Sil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 