"use client";

import React, { useState } from "react";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Bell,
  Calendar,
  CheckSquare,
  FileCheck,
  Globe,
  Mail,
  MessageSquare,
  PlusCircle,
  Save,
  Smartphone,
  Trophy,
  User,
  Clock,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Bildirim ayarları grupları
const bildirimGruplari = [
  {
    id: "egitim",
    baslik: "Eğitim Bildirimleri",
    icon: <CheckSquare className="h-5 w-5" />,
    aciklama: "Eğitimlerle ilgili bildirim tercihleri",
    ayarlar: [
      {
        id: "yeni-egitim",
        baslik: "Yeni Eğitim Bildirimleri",
        aciklama: "Yeni eğitimler eklendiğinde bildirim al",
        varsayilan: true,
      },
      {
        id: "egitim-hatirlatici",
        baslik: "Eğitim Hatırlatıcıları",
        aciklama: "Eğitim son tarihleri yaklaştığında hatırlatıcılar al",
        varsayilan: true,
      },
      {
        id: "egitim-tamamlama",
        baslik: "Eğitim Tamamlama Bildirimleri",
        aciklama: "Bir eğitimi tamamladığınızda bildirim al",
        varsayilan: true,
      },
      {
        id: "egitim-atama",
        baslik: "Eğitim Atama Bildirimleri",
        aciklama: "Size bir eğitim atandığında bildirim al",
        varsayilan: true,
      },
    ],
  },
  {
    id: "basarilar",
    baslik: "Başarı Bildirimleri",
    icon: <Trophy className="h-5 w-5" />,
    aciklama: "Rozetler ve sertifikalarla ilgili bildirim tercihleri",
    ayarlar: [
      {
        id: "rozet-kazanma",
        baslik: "Rozet Bildirimleri",
        aciklama: "Yeni bir rozet kazandığınızda bildirim al",
        varsayilan: true,
      },
      {
        id: "sertifika-hazir",
        baslik: "Sertifika Bildirimleri",
        aciklama: "Sertifikanız hazır olduğunda bildirim al",
        varsayilan: true,
      },
      {
        id: "seviye-atlama",
        baslik: "Seviye Bildirimleri",
        aciklama: "Seviye atladığınızda bildirim al",
        varsayilan: true,
      },
    ],
  },
  {
    id: "platform",
    baslik: "Platform Bildirimleri",
    icon: <Globe className="h-5 w-5" />,
    aciklama: "Platform güncellemeleri ve duyurularla ilgili bildirim tercihleri",
    ayarlar: [
      {
        id: "platform-guncelleme",
        baslik: "Platform Güncellemeleri",
        aciklama: "Platform güncellemeleri hakkında bildirim al",
        varsayilan: true,
      },
      {
        id: "bakim-duyurusu",
        baslik: "Bakım Duyuruları",
        aciklama: "Planlı bakım çalışmaları hakkında bildirim al",
        varsayilan: true,
      },
      {
        id: "yeni-ozellikler",
        baslik: "Yeni Özellik Duyuruları",
        aciklama: "Yeni özellikler eklendiğinde bildirim al",
        varsayilan: true,
      },
    ],
  },
  {
    id: "sosyal",
    baslik: "Sosyal Bildirimler",
    icon: <MessageSquare className="h-5 w-5" />,
    aciklama: "Yorumlar ve etkileşimlerle ilgili bildirim tercihleri",
    ayarlar: [
      {
        id: "yorum-yaniti",
        baslik: "Yorum Yanıtları",
        aciklama: "Yorumlarınıza yanıt geldiğinde bildirim al",
        varsayilan: true,
      },
      {
        id: "begeni",
        baslik: "Beğeni Bildirimleri",
        aciklama: "Birisi paylaşımınızı beğendiğinde bildirim al",
        varsayilan: false,
      },
      {
        id: "etiketlenme",
        baslik: "Etiketlenme Bildirimleri",
        aciklama: "Biri sizi etiketlediğinde bildirim al",
        varsayilan: true,
      },
    ],
  },
];

export default function BildirimAyarlariPage() {
  const router = useRouter();
  // Her bir bildirim ayarları grubu için durum yönetimi
  const [bildirimDurumlari, setBildirimDurumlari] = useState(() => {
    // Tüm bildirim ayarlarını içeren bir nesne oluştur
    const durumlar = {};
    bildirimGruplari.forEach((grup) => {
      grup.ayarlar.forEach((ayar) => {
        durumlar[ayar.id] = ayar.varsayilan;
      });
    });
    return durumlar;
  });
  
  // Genel bildirim tercihleri
  const [bildirimKanali, setBildirimKanali] = useState("tum-kanallar");
  const [bildirimSikligi, setBildirimSikligi] = useState("aninda");
  const [mobilBildirimler, setMobilBildirimler] = useState(true);
  const [emailBildirimler, setEmailBildirimler] = useState(true);
  const [uygulamaBildirimleri, setUygulamaBildirimleri] = useState(true);
  
  // Değişiklikleri kaydet
  const degisiklikleriKaydet = () => {
    // Gerçek bir API entegrasyonu ile bu ayarlar kaydedilecek
    // Şu an için örnek bir başarı mesajı gösteriyoruz
    alert("Bildirim ayarlarınız başarıyla kaydedildi.");
  };
  
  // Bildirim anahtarını değiştir
  const durumDegistir = (anahtarId: string) => {
    setBildirimDurumlari({
      ...bildirimDurumlari,
      [anahtarId]: !bildirimDurumlari[anahtarId],
    });
  };
  
  // Bir gruptaki tüm bildirimleri açıp kapama
  const grupDurumDegistir = (grupId: string, durum: boolean) => {
    const yeniDurumlar = { ...bildirimDurumlari };
    const grup = bildirimGruplari.find((g) => g.id === grupId);
    
    if (grup) {
      grup.ayarlar.forEach((ayar) => {
        yeniDurumlar[ayar.id] = durum;
      });
      setBildirimDurumlari(yeniDurumlar);
    }
  };
  
  // Tüm bildirimleri açıp kapama
  const tumDurumDegistir = (durum: boolean) => {
    const yeniDurumlar = { ...bildirimDurumlari };
    bildirimGruplari.forEach((grup) => {
      grup.ayarlar.forEach((ayar) => {
        yeniDurumlar[ayar.id] = durum;
      });
    });
    setBildirimDurumlari(yeniDurumlar);
  };
  
  // Varsayılan ayarlara dön
  const varsayilanlaraGeriDon = () => {
    if (window.confirm("Tüm bildirim ayarlarınız varsayılan değerlere sıfırlanacak. Emin misiniz?")) {
      const varsayilanDurumlar = {};
      bildirimGruplari.forEach((grup) => {
        grup.ayarlar.forEach((ayar) => {
          varsayilanDurumlar[ayar.id] = ayar.varsayilan;
        });
      });
      setBildirimDurumlari(varsayilanDurumlar);
      setBildirimKanali("tum-kanallar");
      setBildirimSikligi("aninda");
      setMobilBildirimler(true);
      setEmailBildirimler(true);
      setUygulamaBildirimleri(true);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard/bildirimler")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Bildirim Ayarları</h1>
            <p className="text-muted-foreground mt-1">
              Hangi bildirimleri almak istediğinizi ve nasıl alacağınızı özelleştirin.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={varsayilanlaraGeriDon}
          >
            Varsayılanlara Dön
          </Button>
          <Button 
            onClick={degisiklikleriKaydet}
          >
            <Save className="h-4 w-4 mr-2" /> Ayarları Kaydet
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sol kolon: Bildirim Kanalları */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Bildirim Kanalları</CardTitle>
            <CardDescription>
              Bildirimleri hangi kanallardan almak istediğinizi seçin.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="uygulama-bildirimleri">Uygulama Bildirimleri</Label>
                    <p className="text-sm text-muted-foreground">
                      Bildirimleri uygulama içinde alın
                    </p>
                  </div>
                </div>
                <Switch 
                  id="uygulama-bildirimleri" 
                  checked={uygulamaBildirimleri}
                  onCheckedChange={setUygulamaBildirimleri}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="email-bildirimleri">E-posta Bildirimleri</Label>
                    <p className="text-sm text-muted-foreground">
                      Bildirimleri e-posta olarak alın
                    </p>
                  </div>
                </div>
                <Switch 
                  id="email-bildirimleri" 
                  checked={emailBildirimler}
                  onCheckedChange={setEmailBildirimler}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="mobil-bildirimleri">Mobil Bildirimler</Label>
                    <p className="text-sm text-muted-foreground">
                      Bildirimleri mobil cihazınızda alın
                    </p>
                  </div>
                </div>
                <Switch 
                  id="mobil-bildirimleri" 
                  checked={mobilBildirimler}
                  onCheckedChange={setMobilBildirimler}
                />
              </div>
            </div>
            
            <Separator />
            
            <div>
              <Label>Bildirim Kanalı Tercihi</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Bildirimleri hangi kanallardan almak istediğinizi seçin
              </p>
              <RadioGroup value={bildirimKanali} onValueChange={setBildirimKanali}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tum-kanallar" id="tum-kanallar" />
                  <Label htmlFor="tum-kanallar">
                    Tüm Kanallar
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sadece-uygulama" id="sadece-uygulama" />
                  <Label htmlFor="sadece-uygulama">
                    Sadece Uygulama İçi
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sadece-email" id="sadece-email" />
                  <Label htmlFor="sadece-email">
                    Sadece E-posta
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sadece-mobil" id="sadece-mobil" />
                  <Label htmlFor="sadece-mobil">
                    Sadece Mobil Uygulama
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div>
              <Label>Bildirim Sıklığı</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Bildirimlerin ne sıklıkta gönderileceğini seçin
              </p>
              <Select value={bildirimSikligi} onValueChange={setBildirimSikligi}>
                <SelectTrigger>
                  <Clock className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Bildirim Sıklığı" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aninda">
                    Anında Bildirim
                  </SelectItem>
                  <SelectItem value="saatlik">
                    Saatlik Özet
                  </SelectItem>
                  <SelectItem value="gunluk">
                    Günlük Özet
                  </SelectItem>
                  <SelectItem value="haftalik">
                    Haftalık Özet
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        {/* Sağ kolon: Bildirim Türleri */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Bildirim Türleri</CardTitle>
                <CardDescription>
                  Almak istediğiniz bildirim türlerini seçin
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => tumDurumDegistir(true)}
                >
                  Tümünü Aç
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => tumDurumDegistir(false)}
                >
                  Tümünü Kapat
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue={bildirimGruplari[0].id}>
              <TabsList className="grid grid-cols-4">
                {bildirimGruplari.map((grup) => (
                  <TabsTrigger key={grup.id} value={grup.id} className="flex items-center">
                    {grup.icon}
                    <span className="ml-2 hidden md:inline">{grup.baslik}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {bildirimGruplari.map((grup) => (
                <TabsContent key={grup.id} value={grup.id} className="pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-medium">{grup.baslik}</h3>
                      <p className="text-sm text-muted-foreground">
                        {grup.aciklama}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => grupDurumDegistir(grup.id, true)}
                      >
                        Hepsini Aç
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => grupDurumDegistir(grup.id, false)}
                      >
                        Hepsini Kapat
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {grup.ayarlar.map((ayar) => (
                      <div key={ayar.id} className="flex items-center justify-between">
                        <div>
                          <Label htmlFor={ayar.id}>{ayar.baslik}</Label>
                          <p className="text-sm text-muted-foreground">
                            {ayar.aciklama}
                          </p>
                        </div>
                        <Switch 
                          id={ayar.id} 
                          checked={bildirimDurumlari[ayar.id]} 
                          onCheckedChange={() => durumDegistir(ayar.id)}
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end">
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Bildirim ayarlarınız, oturum açtığınız tüm cihazlarda geçerli olacaktır.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 