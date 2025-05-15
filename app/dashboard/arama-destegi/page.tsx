import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { 
  ArrowRight, 
  Search, 
  List, 
  Clock, 
  Info, 
  Sparkles, 
  History, 
  BookmarkPlus, 
  Filter, 
  Keyboard,
  BarChart,
  MessageSquare
} from "lucide-react";

export const metadata: Metadata = {
  title: "Arama Motoru ile Hızlı Destek | Syneris",
  description: "Turkcell sistemlerinde hızlı arama ve destek özellikleri",
};

export default function AramaDestegiPage() {
  const ornekAramalar = [
    { 
      id: 1, 
      arama: "Numara taşıma", 
      aciklama: "Diğer operatörlerden Turkcell'e numara taşıma süreçleri",
      kategori: "Abonelik"
    },
    { 
      id: 2, 
      arama: "BiP hata kodu 105", 
      aciklama: "BiP uygulamasında 105 hata kodunun çözümü",
      kategori: "Dijital Servis"
    },
    { 
      id: 3, 
      arama: "Fatura itiraz süreci", 
      aciklama: "Abone fatura itiraz işlem adımları",
      kategori: "Faturalama"
    },
    { 
      id: 4, 
      arama: "Kurumsal VPN ayarları", 
      aciklama: "Kurumsal müşteri VPN yapılandırması",
      kategori: "Kurumsal"
    },
    { 
      id: 5, 
      arama: "SIM kart bloke kaldırma", 
      aciklama: "PIN/PUK ile bloke kaldırma işlemleri",
      kategori: "Abone İşlemleri"
    },
    { 
      id: 6, 
      arama: "Hat sahiplik değişikliği", 
      aciklama: "Hat sahibi değiştirme form ve süreçleri", 
      kategori: "Abonelik"
    },
  ];

  const aramaKisayollari = [
    { kisayol: "@hata", aciklama: "Hata kodları araması", ornek: "@hata 2040" },
    { kisayol: "@servis", aciklama: "Servis araması", ornek: "@servis BiP" },
    { kisayol: "@form", aciklama: "Form ve dökümanlarda arama", ornek: "@form abonelik" },
    { kisayol: "@islem", aciklama: "İşlem türü araması", ornek: "@islem iptal" },
    { kisayol: "@fatura", aciklama: "Fatura işlemlerinde arama", ornek: "@fatura gecikme" },
    { kisayol: "@kampanya", aciklama: "Kampanya araması", ornek: "@kampanya yeni hat" },
  ];

  const ozellikler = [
    {
      title: "Akıllı Otomatik Tamamlama",
      description: "Sık aranan sorguları ve popüler işlemleri önceden tahmin ederek sorgularınızı hızla tamamlar",
      icon: Sparkles
    },
    {
      title: "Arama Geçmişi ve Favoriler",
      description: "Önceki aramalarınıza kolayca erişin ve sık kullandığınız aramaları favorilere ekleyin",
      icon: History
    },
    {
      title: "Gelişmiş Filtreler",
      description: "Sonuçları bölge, servis türü, işlem tipi veya tarih aralığına göre filtreleme",
      icon: Filter
    },
    {
      title: "Kısayol Komutları",
      description: "Hızlı arama için özel komutlar ve kısayollar ile anında sonuçlara ulaşın",
      icon: Keyboard
    },
    {
      title: "Arama Analitiği",
      description: "Ekibinizin en sık karşılaştığı sorunları ve arama istatistiklerini görüntüleyin",
      icon: BarChart
    },
    {
      title: "Synbot Entegrasyonu",
      description: "Arama sonuçlarından doğrudan Synbot ile ileri düzey yardım ve destek alın",
      icon: MessageSquare
    },
  ];

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-1 bg-[#00a0d2]"></div>
          <h1 className="text-3xl font-bold">Arama Motoru ile Hızlı Destek</h1>
        </div>
        <p className="text-muted-foreground ml-10">
          Turkcell işlemlerinizde hızlı çözüm ve destek almak için gelişmiş arama özellikleri
        </p>
      </div>

      <div className="relative">
        <div className="border rounded-lg p-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-6">Hızlı Yardımcı</h2>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="İşlem adı, hata kodu veya anahtar kelimeler girin..."
                className="pl-10 h-12"
              />
              <Button className="absolute right-1 top-1 bg-[#00a0d2] hover:bg-[#008db8]">Ara</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30">Numara taşıma</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30">Fatura</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30">Hat açma</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30">Paket yükleme</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30">BiP hata kodları</Badge>
            </div>
          </div>
        </div>
      </div>

      <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:border-amber-800">
        <Info className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        <AlertTitle className="text-amber-800 dark:text-amber-300">Pro İpucu</AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-400">
          Belirli bir hata kodunu doğrudan aramak için başına "@hata" yazabilirsiniz. Örneğin: <span className="font-mono bg-amber-100 dark:bg-amber-900/50 px-1 rounded">@hata 2040</span>
          <Button variant="link" className="text-amber-600 dark:text-amber-300 p-0 h-auto ml-1" asChild>
            <Link href="/dashboard/arama-kisayollari">
              <span>Tüm kısayolları görüntüle</span>
            </Link>
          </Button>
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="arama-ornekleri" className="space-y-6">
        <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex">
          <TabsTrigger value="arama-ornekleri">Arama Örnekleri</TabsTrigger>
          <TabsTrigger value="kisayollar">Kısayollar</TabsTrigger>
          <TabsTrigger value="ozellikler">Özellikler</TabsTrigger>
        </TabsList>

        <TabsContent value="arama-ornekleri" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ornekAramalar.map((ornek) => (
              <Card key={ornek.id} className="border-[#00a0d2]/20 hover:border-[#00a0d2]/40 transition-colors overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Search className="h-5 w-5 text-[#00a0d2]" />
                    <Badge variant="outline">{ornek.kategori}</Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{ornek.arama}</CardTitle>
                  <CardDescription>{ornek.aciklama}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Info className="h-3.5 w-3.5 mr-1" />
                    <span>Ortalama çözüm süresi: 2 dakika</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="outline" className="w-full" size="sm">
                    <ArrowRight className="h-3.5 w-3.5 mr-1" /> 
                    Aramayı Yap
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="kisayollar">
          <Card>
            <CardHeader>
              <CardTitle>Arama Kısayolları</CardTitle>
              <CardDescription>
                Daha hızlı sonuçlar için kısayol komutlarını kullanın
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Kısayol</th>
                      <th className="text-left py-3 px-4 font-medium">Açıklama</th>
                      <th className="text-left py-3 px-4 font-medium">Örnek Kullanım</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aramaKisayollari.map((kisayol, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4 font-mono">{kisayol.kisayol}</td>
                        <td className="py-3 px-4">{kisayol.aciklama}</td>
                        <td className="py-3 px-4 font-mono text-sm">{kisayol.ornek}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ozellikler">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ozellikler.map((ozellik, index) => (
              <Card key={index} className="border-[#00a0d2]/20 hover:border-[#00a0d2]/40 transition-colors">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="bg-[#00a0d2]/10 p-2 rounded-lg">
                      <ozellik.icon className="h-6 w-6 text-[#00a0d2]" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{ozellik.title}</CardTitle>
                      <CardDescription className="mt-1">{ozellik.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
