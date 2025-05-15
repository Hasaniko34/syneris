import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  AlertCircle, 
  AreaChart, 
  Signal, 
  Wrench, 
  Radio, 
  MapPin, 
  Cpu, 
  WifiIcon, 
  Laptop, 
  ArrowRight, 
  Play,
  Layers,
  Timer,
  Star
} from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Şebeke ve BTS Simülasyonları | Syneris",
  description: "Turkcell şebeke altyapısı ve BTS kurulum/arıza giderme simülasyonları",
};

export default function BTSSimulasyonPage() {
  const simulasyonlar = [
    {
      id: 1,
      title: "BTS Kurulum Simülasyonu",
      description: "Yeni bir Baz İstasyonu kurulum sürecinin adım adım simülasyonu",
      level: "Başlangıç",
      duration: "45 dakika",
      icon: Radio,
      rating: 4.9,
      completions: 1248,
      image: "/images/simulations/bts-setup.jpg"
    },
    {
      id: 2,
      title: "Anten Açı Ayarları",
      description: "Anten tilt ve azimut açılarının optimum şekilde ayarlanması",
      level: "Orta",
      duration: "30 dakika",
      icon: Signal,
      rating: 4.7,
      completions: 856,
      image: "/images/simulations/antenna-alignment.jpg"
    },
    {
      id: 3,
      title: "RF Optimizasyon",
      description: "Radyo Frekansı parametrelerinin optimizasyonu ve sinyal kalitesi iyileştirme",
      level: "İleri",
      duration: "60 dakika",
      icon: WifiIcon,
      rating: 4.8,
      completions: 723,
      image: "/images/simulations/rf-optimization.jpg"
    },
    {
      id: 4,
      title: "Şebeke Arıza Tespiti",
      description: "Şebeke arızalarının tespit edilmesi ve giderilmesi senaryoları",
      level: "Orta",
      duration: "40 dakika",
      icon: Wrench,
      rating: 4.9,
      completions: 1105,
      image: "/images/simulations/network-troubleshooting.jpg"
    },
    {
      id: 5,
      title: "5G Şebeke Planlama",
      description: "5G baz istasyonu konumlandırma ve kapsama alanı planlama",
      level: "İleri",
      duration: "55 dakika",
      icon: MapPin,
      rating: 4.8,
      completions: 689,
      image: "/images/simulations/5g-planning.jpg"
    },
    {
      id: 6,
      title: "BTS Donanım Bakımı",
      description: "Baz istasyonu donanım bileşenlerinin bakımı ve değişimi",
      level: "Başlangıç",
      duration: "35 dakika",
      icon: Cpu,
      rating: 4.6,
      completions: 932,
      image: "/images/simulations/hardware-maintenance.jpg"
    },
  ];

  const senaryolar = [
    {
      id: "S001",
      title: "Düşük Sinyal Kalitesi Arızası",
      description: "Bir bölgede düşük sinyal kalitesi şikayetlerinin artması durumunda izlenmesi gereken adımlar.",
      steps: 8,
      complexity: "Orta",
      duration: "25 dakika",
      lastUpdated: "15.04.2024"
    },
    {
      id: "S002",
      title: "BTS Donanım Arızası",
      description: "BTS donanım bileşenlerinden birinde arıza oluşması durumunda arıza tespiti ve giderme.",
      steps: 12,
      complexity: "İleri",
      duration: "40 dakika",
      lastUpdated: "02.05.2024"
    },
    {
      id: "S003",
      title: "5G Yeni İstasyon Kurulumu",
      description: "Yeni bir 5G istasyonunun kurulum adımları ve devreye alma süreci.",
      steps: 15,
      complexity: "İleri",
      duration: "60 dakika",
      lastUpdated: "10.05.2024"
    },
    {
      id: "S004",
      title: "Fiber Bağlantı Sorunları",
      description: "BTS'e gelen fiber bağlantıda oluşan sorunların tespiti ve giderilmesi.",
      steps: 10,
      complexity: "Orta",
      duration: "30 dakika",
      lastUpdated: "25.04.2024"
    },
  ];

  const egitimAmaclari = [
    "BTS kurum ve bakım süreçlerinde pratik yapma",
    "Saha teknisyenleri için arıza tespit ve giderme yeteneklerini geliştirme",
    "5G altyapı bileşenlerinin tanınması ve yönetimi",
    "RF optimizasyon ve anten ayarları konusunda deneyim kazanma",
    "Turkcell şebeke ekosisteminin bileşenlerini tanıma",
    "Gerçek saha koşullarına hazırlık"
  ];

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-1 bg-[#ffc72c]"></div>
          <h1 className="text-3xl font-bold">Şebeke ve BTS Simülasyonları</h1>
        </div>
        <p className="text-muted-foreground ml-10">
          BTS kurulumu, arıza tespiti ve şebeke yönetimi için interaktif simülasyon ortamı
        </p>
      </div>

      <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:border-amber-800">
        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        <AlertTitle className="text-amber-800 dark:text-amber-300">Hızlı Başlangıç</AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-400">
          Simülasyon ortamını kullanmadan önce bilgisayarınıza BTS Simulator uygulamasını yüklemeniz önerilir. 
          <Button variant="link" className="text-amber-600 dark:text-amber-300 p-0 h-auto ml-1" asChild>
            <Link href="/downloads/bts-simulator">
              <span>Uygulamayı indir</span>
            </Link>
          </Button>
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="simulasyonlar" className="space-y-6">
        <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex">
          <TabsTrigger value="simulasyonlar">Simülasyonlar</TabsTrigger>
          <TabsTrigger value="senaryolar">Arıza Senaryoları</TabsTrigger>
          <TabsTrigger value="amaclar">Eğitim Amaçları</TabsTrigger>
        </TabsList>

        <TabsContent value="simulasyonlar" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {simulasyonlar.map((sim) => (
              <Card key={sim.id} className="border-[#ffc72c]/20 hover:border-[#ffc72c]/40 transition-colors overflow-hidden">
                <div className="aspect-video relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/5 z-10"></div>
                  <div className="absolute bottom-3 left-3 z-20">
                    <Badge className="bg-[#ffc72c] hover:bg-[#e0b025] text-black">
                      {sim.level}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3 z-20 flex items-center bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                    <Timer className="w-3 h-3 mr-1" />
                    {sim.duration}
                  </div>
                  <div className="w-full h-full">
                    {/* placeholder for when images are available */}
                    <div className="w-full h-full bg-gradient-to-br from-[#ffc72c]/30 to-[#00a0d2]/30 flex items-center justify-center">
                      <sim.icon className="w-12 h-12 text-white/80" />
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{sim.title}</CardTitle>
                  <CardDescription>{sim.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-[#ffc72c]" />
                      <span>{sim.rating}</span>
                    </div>
                    <div>
                      {sim.completions} tamamlama
                    </div>
                  </div>
                  <Button asChild className="w-full bg-[#ffc72c] hover:bg-[#e0b025] text-black">
                    <Link href={`/dashboard/bts-simulasyon/${sim.id}`}>
                      <Play className="h-4 w-4 mr-2" />
                      Simülasyonu Başlat
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="senaryolar">
          <Card>
            <CardHeader>
              <CardTitle>Arıza Tespit ve Giderme Senaryoları</CardTitle>
              <CardDescription>
                Saha teknisyenleri için gerçek durum simülasyonları ve arıza senaryoları
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {senaryolar.map((senaryo) => (
                  <div key={senaryo.id} className="border border-[#ffc72c]/20 rounded-lg p-4 hover:border-[#ffc72c]/40 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-lg">{senaryo.title}</h3>
                      <Badge variant="outline">{senaryo.complexity}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{senaryo.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Layers className="h-3.5 w-3.5 mr-1" />
                        <span>{senaryo.steps} adım</span>
                      </div>
                      <div className="flex items-center">
                        <Timer className="h-3.5 w-3.5 mr-1" />
                        <span>{senaryo.duration}</span>
                      </div>
                      <div>Son güncelleme: {senaryo.lastUpdated}</div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1 text-xs">
                      <ArrowRight className="h-3 w-3" /> 
                      Senaryoya Git
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="amaclar">
          <Card>
            <CardHeader>
              <CardTitle>BTS Simülasyon Eğitim Amaçları</CardTitle>
              <CardDescription>
                Turkcell saha teknisyenleri için BTS simülasyon platformunun geliştirdiği yetkinlikler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border border-[#ffc72c]/20 rounded-lg p-6 relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#ffc72c]/10 rounded-bl-3xl"></div>
                  <h3 className="text-lg font-medium mb-3">Pratik Beceriler</h3>
                  <p className="text-muted-foreground mb-4 relative z-10">
                    BTS simülasyonları, saha teknisyenlerimizin gerçek ortamlarda karşılaşabilecekleri durumları 
                    güvenli bir ortamda pratik yaparak öğrenmelerini sağlar.
                  </p>
                  <div className="space-y-2 relative z-10">
                    <div className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-[#ffc72c] mt-1" />
                      <span>Donanım arızalarının doğru teşhisi</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-[#ffc72c] mt-1" />
                      <span>Bileşen değişim ve kurulum süreçleri</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-[#ffc72c] mt-1" />
                      <span>Anten ayarlama ve optimizasyon</span>
                    </div>
                  </div>
                </div>

                <div className="border border-[#ffc72c]/20 rounded-lg p-6 relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#ffc72c]/10 rounded-bl-3xl"></div>
                  <h3 className="text-lg font-medium mb-3">Arıza Tespiti</h3>
                  <p className="text-muted-foreground mb-4 relative z-10">
                    Simülasyon ortamında çeşitli arıza senaryoları ve sorun giderme adımlarını 
                    öğrenerek gerçek ortamda daha hızlı müdahale etme becerisi kazandırır.
                  </p>
                  <div className="space-y-2 relative z-10">
                    <div className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-[#ffc72c] mt-1" />
                      <span>Analitik düşünme ve sistematik sorun çözme</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-[#ffc72c] mt-1" />
                      <span>Temel sorun kaynaklarını hızla tespit etme</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-[#ffc72c] mt-1" />
                      <span>Verimliliği artıran kontrol listeleri</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-[#ffc72c]/20 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-3">Öğrenim Hedefleri</h3>
                <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                  {egitimAmaclari.map((amac, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-[#ffc72c] mt-1 flex-shrink-0" />
                      <span>{amac}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
