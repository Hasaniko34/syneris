import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Database, MessagesSquare, Settings, Shield, User, CheckCircle, BookOpen, Server, Laptop, Smartphone, Sparkles, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export const metadata: Metadata = {
  title: "Dijital Servisler Araç Seti | Syneris",
  description: "Turkcell dijital servis geliştirme ve yönetim araçları",
};

export default function DijitalServisAraclariPage() {
  const servisAraclari = [
    {
      id: 1,
      title: "BiP API Gateway",
      description: "BiP servisleri için API yönetimi ve güvenlik yapılandırması",
      category: "Geliştirme",
      icon: Code,
      progress: 85,
      lastUpdated: "Son Güncelleme: 15.04.2024",
      features: [
        "REST API desteği",
        "OAuth 2.0 entegrasyonu",
        "Rate limiting",
        "API versiyonlama",
      ],
      cta: "API Dökümanlarına Erişim",
      link: "/dashboard/api-gateway-docs"
    },
    {
      id: 2,
      title: "Servis İzleme Paneli",
      description: "Canlı ortam servis performans ve kullanım metrikleri",
      category: "İzleme",
      icon: Database,
      progress: 100,
      lastUpdated: "Son Güncelleme: 08.03.2024",
      features: [
        "Gerçek zamanlı metrikler",
        "Kullanım istatistikleri",
        "Hata takibi",
        "Kapasite planlaması",
      ],
      cta: "Panele Git",
      link: "/dashboard/izleme-paneli"
    },
    {
      id: 3,
      title: "Güvenlik Kontrol Merkezi",
      description: "Servis güvenlik politikaları ve tehdit önleme",
      category: "Güvenlik",
      icon: Shield,
      progress: 92,
      lastUpdated: "Son Güncelleme: 03.05.2024",
      features: [
        "DDoS koruması",
        "Güvenlik duvarı yönetimi",
        "Erişim kontrolü",
        "Güvenlik logları",
      ],
      cta: "Güvenlik Ayarları",
      link: "/dashboard/guvenlik-kontrol"
    },
    {
      id: 4,
      title: "Chatbot Yönetimi",
      description: "Dijital asistan ve chatbot servisleri yönetimi",
      category: "Servis",
      icon: MessagesSquare,
      progress: 70,
      lastUpdated: "Son Güncelleme: 20.04.2024",
      features: [
        "Bot eğitimi",
        "Diyalog akışı tasarımı",
        "Entegrasyon yönetimi",
        "Performans analizi",
      ],
      cta: "Chat Modellerini Yönet",
      link: "/dashboard/chat-modelleri"
    },
    {
      id: 5,
      title: "Servis Konfigürasyon",
      description: "Servis parametreleri ve yapılandırma yönetimi",
      category: "Yönetim",
      icon: Settings,
      progress: 95,
      lastUpdated: "Son Güncelleme: 10.05.2024",
      features: [
        "Parametre yönetimi",
        "Ortam yapılandırması",
        "Servis bağımlılıkları",
        "Dağıtım ayarları",
      ],
      cta: "Konfigürasyona Git",
      link: "/dashboard/servis-konfigurasyon"
    },
    {
      id: 6,
      title: "Kullanıcı Deneyimi Test Aracı",
      description: "BiP, Yaani, Lifebox ve Dijital Operatör için kullanıcı deneyimi testleri",
      category: "Test",
      icon: User,
      progress: 65,
      lastUpdated: "Son Güncelleme: 22.04.2024",
      features: [
        "A/B testleri",
        "Kullanılabilirlik analizi",
        "Isı haritaları",
        "Davranış izleme",
      ],
      cta: "Test Ortamına Git",
      link: "/dashboard/ux-test"
    },
  ];

  const entegrasyonAdimlar = [
    {
      title: "Servis Kaydı ve Onay",
      description: "Turkcell API Gateway üzerinde servis kaydı oluşturun ve gerekli onayları alın",
      icon: CheckCircle
    },
    {
      title: "API Dokümantasyonu",
      description: "Swagger veya OpenAPI formatında API dökümanlarınızı oluşturun",
      icon: BookOpen
    },
    {
      title: "Geliştirme Ortamı Testi",
      description: "Dev ortamında API entegrasyonunuzu test edin ve sorunları giderin",
      icon: Server
    },
    {
      title: "Sandbox Entegrasyonu",
      description: "Sandbox ortamında diğer servislerle entegrasyonu tamamlayın",
      icon: Laptop
    },
    {
      title: "Canlı Ortam Geçişi",
      description: "Üretim ortamında servisi etkinleştirin ve izlemeye başlayın",
      icon: Smartphone
    },
  ];

  const platformOzellikleri = [
    {
      title: "Çoklu Kanal Desteği",
      description: "Turkcell dijital kanalları (BiP, Lifebox, Dijital Operatör, Fizy, TV+, vb.) için tek merkezden yönetim",
      icon: Sparkles
    },
    {
      title: "Hızlı Hata Tespiti",
      description: "Yapay zeka destekli anomali tespiti ve otomatik bildirimler",
      icon: AlertTriangle
    },
    {
      title: "Mikroservis Entegrasyonu",
      description: "Turkcell'in mikroservis mimarisiyle tam uyumlu geliştirme araçları",
      icon: Server
    },
    {
      title: "Kullanıcı Davranış Analitiği",
      description: "Dijital kanallardaki kullanıcı davranışlarını izleme ve analiz etme",
      icon: User
    },
  ];

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-1 bg-[#00a0d2]"></div>
          <h1 className="text-3xl font-bold">Dijital Servisler Araç Seti</h1>
        </div>
        <p className="text-muted-foreground ml-10">
          Turkcell dijital kanalları (BiP, Lifebox, Dijital Operatör) için geliştirme ve yönetim araçları
        </p>
      </div>

      <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:border-blue-800">
        <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-800 dark:text-blue-300">Yeni Özellik: BiP API Gateway v2.0</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-400">
          BiP API Gateway'in yeni sürümü kullanıma sunuldu. GraphQL desteği, genişletilmiş güvenlik özellikleri ve daha hızlı performans için güncelleme yapmanız önerilir.
          <Button variant="link" className="text-blue-600 dark:text-blue-300 p-0 h-auto" asChild>
            <Link href="/dashboard/api-gateway-docs/upgrade">
              <span>Güncelleme Kılavuzu</span>
            </Link>
          </Button>
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="araclar" className="space-y-6">
        <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex">
          <TabsTrigger value="araclar">Servis Araçları</TabsTrigger>
          <TabsTrigger value="entegrasyon">Entegrasyon Adımları</TabsTrigger>
          <TabsTrigger value="ozellikler">Platform Özellikleri</TabsTrigger>
        </TabsList>

        <TabsContent value="araclar" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servisAraclari.map((arac) => (
              <Card key={arac.id} className="border-[#00a0d2]/20 hover:border-[#00a0d2]/40 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <arac.icon className="h-8 w-8 text-[#00a0d2]" />
                    <Badge variant="outline">{arac.category}</Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{arac.title}</CardTitle>
                  <CardDescription>{arac.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <ul className="space-y-2">
                    {arac.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <ArrowRight className="h-4 w-4 mr-2 text-[#00a0d2]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Hazırlık Düzeyi</span>
                      <span className="font-medium">{arac.progress}%</span>
                    </div>
                    <Progress value={arac.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">{arac.lastUpdated}</p>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button asChild className="w-full bg-[#00a0d2] hover:bg-[#008db8]">
                    <Link href={arac.link}>
                      {arac.cta}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="entegrasyon">
          <Card>
            <CardHeader>
              <CardTitle>Turkcell Dijital Servis Entegrasyon Adımları</CardTitle>
              <CardDescription>
                Yeni bir dijital servis entegrasyonu için izlenmesi gereken adımlar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800"></div>
                <ul className="space-y-8 relative">
                  {entegrasyonAdimlar.map((adim, index) => (
                    <li key={index} className="pl-10 relative">
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-[#00a0d2] flex items-center justify-center">
                        <adim.icon className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="font-semibold mb-1">{adim.title}</h3>
                      <p className="text-sm text-muted-foreground">{adim.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ozellikler">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {platformOzellikleri.map((ozellik, index) => (
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
