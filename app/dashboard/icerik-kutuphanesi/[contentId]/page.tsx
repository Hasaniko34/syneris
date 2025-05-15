"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  FileText,
  Printer,
  Share,
  BookText,
  Film,
  Headphones,
  ImageIcon,
  Clock,
  Calendar,
  User,
  Tag,
  Eye,
  ThumbsUp,
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

// Mockup content data - in a real app, fetch from API
const icerikVerileri = {
  // Bireysel Ürünler dokümanları
  "platinum-paketler": {
    id: "platinum-paketler",
    baslik: "Turkcell Platinum Paketler",
    tur: "pdf",
    aciklama: "Turkcell Platinum paketleri hakkında kapsamlı bilgilendirme dokümanı ve avantajlar rehberi.",
    boyut: "3.2MB",
    sure: "",
    yuklemeTarihi: "2023-12-05",
    yukleyen: "Turkcell Ürün Ekibi",
    etiketler: ["Platinum", "Paketler", "Bireysel"],
    goruntuleme: 245,
    icerik: "Bu dokümanda Turkcell Platinum paketlerinin tüm detayları, sunulan ayrıcalıklar ve avantajlar yer almaktadır."
  },
  "fiber-internet": {
    id: "fiber-internet",
    baslik: "Fiber İnternet",
    tur: "pdf",
    aciklama: "Turkcell Fiber İnternet paketleri, kurulum süreçleri ve teknik özellikler hakkında doküman.",
    boyut: "2.8MB",
    sure: "",
    yuklemeTarihi: "2023-11-18",
    yukleyen: "Turkcell Ürün Ekibi",
    etiketler: ["Fiber", "İnternet", "Bireysel"],
    goruntuleme: 312,
    icerik: "Bu dokümanda Turkcell Fiber İnternet paketlerinin teknik özellikleri, kurulum süreçleri ve kullanım detayları bulunmaktadır."
  },
  "dijital-servisler": {
    id: "dijital-servisler",
    baslik: "Dijital Servisler",
    tur: "pdf",
    aciklama: "TV+, Fizy, Dergilik, BiP gibi dijital platformlar hakkında kapsamlı bilgilendirme dokümanı.",
    boyut: "4.5MB",
    sure: "",
    yuklemeTarihi: "2023-10-22",
    yukleyen: "Turkcell Dijital Servisler Ekibi",
    etiketler: ["Dijital", "Servisler", "TV+", "Fizy"],
    goruntuleme: 287,
    icerik: "Bu dokümanda Turkcell'in sunduğu dijital servislerin özellikleri, kullanım alanları ve avantajları detaylı olarak açıklanmaktadır."
  },
  "paycell": {
    id: "paycell",
    baslik: "Paycell Kart",
    tur: "pdf",
    aciklama: "Paycell Kart'ın özellikleri, kullanım alanları ve avantajları hakkında bilgilendirme dokümanı.",
    boyut: "2.4MB",
    sure: "",
    yuklemeTarihi: "2023-09-30",
    yukleyen: "Paycell Ürün Ekibi",
    etiketler: ["Paycell", "Finansal", "Kart"],
    goruntuleme: 198,
    icerik: "Bu dokümanda Paycell Kart'ın kullanım alanları, güvenlik özellikleri ve sunduğu avantajlar detaylı olarak açıklanmaktadır."
  },
  "cihaz-sigortalari": {
    id: "cihaz-sigortalari",
    baslik: "Cihaz Sigortaları",
    tur: "pdf",
    aciklama: "Turkcell cihaz sigortaları, kapsam bilgileri ve hasar süreçleri hakkında doküman.",
    boyut: "1.8MB",
    sure: "",
    yuklemeTarihi: "2023-11-05",
    yukleyen: "Turkcell Sigorta Hizmetleri",
    etiketler: ["Sigorta", "Cihaz", "Güvence"],
    goruntuleme: 156,
    icerik: "Bu dokümanda cihaz sigortası kapsamı, teminatlar, hasar bildirim süreçleri ve kullanım koşulları detaylı olarak açıklanmaktadır."
  },
  "kampanyalar": {
    id: "kampanyalar",
    baslik: "Turkcell Güncel Kampanyalar",
    tur: "pdf",
    aciklama: "Güncel Turkcell kampanyaları, paketler ve tarifeler hakkında bilgilendirme dokümanı.",
    boyut: "3.6MB",
    sure: "",
    yuklemeTarihi: "2023-12-01",
    yukleyen: "Turkcell Pazarlama Ekibi",
    etiketler: ["Kampanya", "Tarife", "Fırsat"],
    goruntuleme: 345,
    icerik: "Bu dokümanda Turkcell'in güncel kampanyaları, indirimli tarifeler ve özel fırsatlar detaylı olarak açıklanmaktadır."
  },
  
  // Kurumsal Çözümler dokümanları
  "kurumsal-ses-paketleri": {
    id: "kurumsal-ses-paketleri",
    baslik: "Turkcell Kurumsal Ses Paketleri",
    tur: "pdf",
    aciklama: "İşletmenizin iletişim ihtiyaçları için avantajlı dakika ve internet içeren kurumsal hat paketleri hakkında doküman.",
    boyut: "3.8MB",
    sure: "",
    yuklemeTarihi: "2023-11-12",
    yukleyen: "Turkcell Kurumsal Çözümler Ekibi",
    etiketler: ["Kurumsal", "Ses Paketleri", "Hat Yönetimi"],
    goruntuleme: 187,
    icerik: "Bu dokümanda Turkcell Kurumsal Ses Paketleri hakkında detaylı bilgiler, paket içerikleri, kurumsal müşteriye özel avantajlar ve hat yönetim seçenekleri anlatılmaktadır."
  },
  "kurumsal-internet": {
    id: "kurumsal-internet",
    baslik: "Kurumsal İnternet Çözümleri",
    tur: "pdf",
    aciklama: "İşletmenizin boyutuna ve ihtiyaçlarına göre özelleştirilebilen yüksek hızlı internet çözümleri hakkında doküman.",
    boyut: "4.2MB",
    sure: "",
    yuklemeTarihi: "2023-10-25",
    yukleyen: "Turkcell Kurumsal Çözümler Ekibi",
    etiketler: ["Kurumsal", "Fiber", "Metro Ethernet", "SD-WAN"],
    goruntuleme: 253,
    icerik: "Bu dokümanda Turkcell Kurumsal İnternet Çözümleri hakkında detaylı bilgiler, fiber altyapı hizmetleri, Metro Ethernet ve SD-WAN teknolojileri ve kurulum süreçleri anlatılmaktadır."
  },
  "dijital-is-surecleri": {
    id: "dijital-is-surecleri",
    baslik: "Dijital İş Süreçleri",
    tur: "pdf",
    aciklama: "İşletmenizin dijital dönüşümünü hızlandıracak bulut tabanlı çözümler ve uygulamalar hakkında doküman.",
    boyut: "3.7MB",
    sure: "",
    yuklemeTarihi: "2023-12-10",
    yukleyen: "Turkcell Digital Business",
    etiketler: ["Dijital Dönüşüm", "Bulut", "Otomasyon"],
    goruntuleme: 213,
    icerik: "Bu dokümanda Dijital İş Süreçleri yönetimi, bulut çözümleri, iş süreçlerinin otomasyonu ve dijital dönüşüm stratejileri detaylı olarak anlatılmaktadır."
  },
  "filo-yonetimi": {
    id: "filo-yonetimi",
    baslik: "Kurumsal Filo Yönetimi",
    tur: "pdf",
    aciklama: "Araç filonuzu gerçek zamanlı takip edebileceğiniz ve yönetebileceğiniz IoT tabanlı çözümler hakkında doküman.",
    boyut: "2.9MB",
    sure: "",
    yuklemeTarihi: "2023-11-30",
    yukleyen: "Turkcell IoT Çözümler",
    etiketler: ["Filo Yönetimi", "IoT", "Araç Takip"],
    goruntuleme: 176,
    icerik: "Bu dokümanda Turkcell Filo Yönetim Sistemi, araç takip teknolojileri, yakıt optimizasyonu ve sürüş davranışı analizi detaylı olarak anlatılmaktadır."
  },
  "is-ortagi-cozumleri": {
    id: "is-ortagi-cozumleri",
    baslik: "Turkcell İş Ortağı Çözümleri",
    tur: "pdf",
    aciklama: "Kurumsal müşteriler için özel geliştirilen entegre iletişim ve iş yönetimi platformu hakkında doküman.",
    boyut: "3.4MB",
    sure: "",
    yuklemeTarihi: "2023-09-20",
    yukleyen: "Turkcell İş Ortaklıkları Ekibi",
    etiketler: ["İş Ortağı", "Bayi", "Entegrasyon"],
    goruntuleme: 145,
    icerik: "Bu dokümanda Turkcell İş Ortağı programı detayları, entegre iletişim çözümleri, bayi yönetim sistemi ve iş ortaklarına sunulan avantajlar anlatılmaktadır."
  },
  "siber-guvenlik": {
    id: "siber-guvenlik",
    baslik: "Siber Güvenlik Hizmetleri",
    tur: "pdf",
    aciklama: "İşletmenizi siber tehditlere karşı koruyacak gelişmiş güvenlik çözümleri ve danışmanlık hizmetleri hakkında doküman.",
    boyut: "4.8MB",
    sure: "",
    yuklemeTarihi: "2023-12-15",
    yukleyen: "Turkcell Siber Güvenlik Ekibi",
    etiketler: ["Siber Güvenlik", "DDoS", "Veri Güvenliği"],
    goruntuleme: 278,
    icerik: "Bu dokümanda Turkcell Siber Güvenlik Hizmetleri, DDoS koruma, veri sızıntısı önleme teknikleri ve kurumlara özel güvenlik çözümleri detaylı olarak anlatılmaktadır."
  },
  
  // Dijital Servisler dokümanları
  "turkcell-mobil-uygulama": {
    id: "turkcell-mobil-uygulama",
    baslik: "Turkcell Mobil Uygulama",
    tur: "pdf",
    aciklama: "Tüm Turkcell hizmetlerinizi tek bir uygulamadan yönetebileceğiniz kapsamlı mobil uygulama hakkında doküman.",
    boyut: "2.6MB",
    sure: "",
    yuklemeTarihi: "2023-12-08",
    yukleyen: "Turkcell Dijital Kanallar Ekibi",
    etiketler: ["Mobil Uygulama", "Self Servis", "Dijital"],
    goruntuleme: 310,
    icerik: "Bu dokümanda Turkcell Mobil Uygulaması'nın özellikleri, fatura ve paket yönetimi işlemleri ve dijital servislere erişim fonksiyonları detaylı olarak anlatılmaktadır."
  },
  "online-islemler": {
    id: "online-islemler",
    baslik: "Turkcell Online İşlemler",
    tur: "pdf",
    aciklama: "Web tarayıcısı üzerinden fatura ödeme, TL yükleme ve paket yönetimi yapabileceğiniz platform hakkında doküman.",
    boyut: "2.3MB",
    sure: "",
    yuklemeTarihi: "2023-11-20",
    yukleyen: "Turkcell Dijital Kanallar Ekibi",
    etiketler: ["Online İşlemler", "Self Servis", "Web"],
    goruntuleme: 198,
    icerik: "Bu dokümanda Turkcell Online İşlemler platformu, web üzerinden yapılabilecek fatura ve ödeme işlemleri, paket ve tarife yönetimi detaylı olarak anlatılmaktadır."
  },
  "fastpay": {
    id: "fastpay",
    baslik: "Fast Pay",
    tur: "pdf",
    aciklama: "QR kod ile hızlı ve güvenli ödeme yapma, para transferi ve fatura ödeme hizmetleri hakkında doküman.",
    boyut: "3.1MB",
    sure: "",
    yuklemeTarihi: "2023-10-15",
    yukleyen: "Fast Pay Ekibi",
    etiketler: ["Fast Pay", "Ödeme", "QR Kod"],
    goruntuleme: 234,
    icerik: "Bu dokümanda Fast Pay ödeme sistemi özellikleri, QR kod ile ödeme işlemleri, para transferi ve fatura ödeme süreçleri detaylı olarak anlatılmaktadır."
  },
  "guvenlik-hizmetleri": {
    id: "guvenlik-hizmetleri",
    baslik: "Güvenlik Hizmetleri",
    tur: "pdf",
    aciklama: "Lifebox yedekleme, antivirüs ve dijital güvenlik çözümleri hakkında doküman.",
    boyut: "2.7MB",
    sure: "",
    yuklemeTarihi: "2023-12-03",
    yukleyen: "Turkcell Dijital Güvenlik Ekibi",
    etiketler: ["Güvenlik", "Lifebox", "Antivirüs"],
    goruntuleme: 176,
    icerik: "Bu dokümanda Turkcell Güvenlik Hizmetleri, Lifebox yedekleme çözümü, antivirüs hizmetleri ve kişisel verilerin korunması için alınması gereken önlemler detaylı olarak anlatılmaktadır."
  }
};

interface PageProps {
  params: {
    contentId: string;
  };
}

export default function IcerikDetayPage({ params }: PageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [icerik, setIcerik] = useState<any>(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  
  // Unwrap params Promise with proper typing
  const resolvedParams = React.use(params as any) as { contentId: string };

  // In a real app, fetch content from API based on contentId
  useEffect(() => {
    setYukleniyor(true);
    
    // Simulating API call with timeout
    setTimeout(() => {
      const bulunanIcerik = icerikVerileri[resolvedParams.contentId as keyof typeof icerikVerileri];
      setIcerik(bulunanIcerik || null);
      setYukleniyor(false);
    }, 500);
  }, [resolvedParams.contentId]);

  // Handle content not found
  if (!yukleniyor && !icerik) {
    return (
      <div className="container mx-auto py-10">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri Dön
          </Button>
          <h1 className="text-2xl font-bold text-center my-8">İçerik Bulunamadı</h1>
          <p className="text-center text-muted-foreground">
            Aradığınız içerik bulunamadı veya kaldırılmış olabilir.
          </p>
          <div className="flex justify-center mt-6">
            <Link href="/dashboard/icerik-kutuphanesi">
              <Button>İçerik Kütüphanesine Dön</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render content icon based on type
  const renderIcerikIkonu = (tur: string) => {
    switch (tur) {
      case "pdf":
        return <FileText className="h-12 w-12 text-[#ffc72c]" />;
      case "video":
        return <Film className="h-12 w-12 text-[#ffc72c]" />;
      case "audio":
        return <Headphones className="h-12 w-12 text-[#ffc72c]" />;
      case "image":
        return <ImageIcon className="h-12 w-12 text-[#ffc72c]" />;
      case "article":
        return <BookText className="h-12 w-12 text-[#ffc72c]" />;
      default:
        return <FileText className="h-12 w-12 text-[#ffc72c]" />;
    }
  };

  const handleIndir = () => {
    toast({
      title: "İndirme Başlatıldı",
      description: `${icerik?.baslik} dosyası indiriliyor.`,
    });
  };

  const handleYazdir = () => {
    toast({
      title: "Yazdırma İşlemi",
      description: "Doküman yazdırma işlemi başlatıldı.",
    });
  };

  const handlePaylas = () => {
    toast({
      title: "Paylaşım Linki Kopyalandı",
      description: "İçerik paylaşım linki panoya kopyalandı.",
    });
  };

  return (
    <div className="container mx-auto py-6">
      <Button 
        variant="ghost" 
        onClick={() => router.back()}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Geri Dön
      </Button>

      {yukleniyor ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="loader">Yükleniyor...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol Panel - Doküman Önizleme */}
          <div className="col-span-2">
            <Card className="border-2 border-[#ffc72c]/20">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-4 rounded-lg bg-[#e0f0fa]">
                      {renderIcerikIkonu(icerik?.tur)}
                    </div>
                    <div>
                      <CardTitle className="text-xl turkcell-title">{icerik?.baslik}</CardTitle>
                      <CardDescription>{icerik?.aciklama}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6 pb-8">
                <div className="min-h-[400px] bg-slate-50 rounded-lg p-6 border flex flex-col items-center justify-center">
                  <FileText className="h-16 w-16 text-[#005f9e] mb-4" />
                  <h3 className="text-lg font-medium mb-2">{icerik?.baslik}</h3>
                  <p className="text-center text-muted-foreground mb-6">{icerik?.icerik}</p>
                  <Button className="turkcell-button" onClick={handleIndir}>
                    <Download className="h-4 w-4 mr-2" />
                    Dokümanı İndir
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sağ Panel - Doküman Bilgileri ve Eylemler */}
          <div>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">Doküman Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Yükleme Tarihi</span>
                  </div>
                  <span>{icerik?.yuklemeTarihi}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Yükleyen</span>
                  </div>
                  <span>{icerik?.yukleyen}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>Dosya Boyutu</span>
                  </div>
                  <span>{icerik?.boyut}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span>Görüntülenme</span>
                  </div>
                  <span>{icerik?.goruntuleme}</span>
                </div>
                <div className="pt-2">
                  <div className="text-muted-foreground flex items-center gap-2 mb-2">
                    <Tag className="h-4 w-4" />
                    <span>Etiketler</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {icerik?.etiketler.map((etiket: string) => (
                      <Badge key={etiket} variant="outline" className="turkcell-badge-outline">
                        {etiket}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">İşlemler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full turkcell-button-outline" onClick={handleIndir}>
                  <Download className="h-4 w-4 mr-2" />
                  İndir
                </Button>
                <Button variant="outline" className="w-full turkcell-button-outline" onClick={handleYazdir}>
                  <Printer className="h-4 w-4 mr-2" />
                  Yazdır
                </Button>
                <Button variant="outline" className="w-full turkcell-button-outline" onClick={handlePaylas}>
                  <Share className="h-4 w-4 mr-2" />
                  Paylaş
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
} 