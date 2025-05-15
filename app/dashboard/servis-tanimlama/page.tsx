import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ArrowRight, CheckCircle, Clock, FileText, Play, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Servis Tanımlama Süreci | Syneris",
  description: "Turkcell servis tanımlama süreçleri ve eğitimleri",
};

export default function ServisTanimlamaPage() {
  const servisEgitimleri = [
    {
      id: 1,
      title: "BiP Servis Tanımlama",
      description: "BiP uygulaması üzerinden yeni servis tanımlama ve yönetimi",
      type: "Video",
      duration: "15 dk",
      icon: Video,
      level: "Başlangıç",
      author: "Burak Yılmaz",
      videoUrl: "/dashboard/egitimlerim/bip-servis-tanimlama"
    },
    {
      id: 2,
      title: "Lifebox Servis Yönetimi",
      description: "Lifebox servislerinin oluşturulması ve yapılandırılması",
      type: "Doküman",
      duration: "20 dk",
      icon: FileText,
      level: "Orta",
      author: "Elif Demir",
      videoUrl: "/dashboard/egitimlerim/lifebox-servis-yonetimi"
    },
    {
      id: 3,
      title: "Dijital Operatör Servisleri",
      description: "Dijital Operatör üzerinden servis açma ve yapılandırma",
      type: "Video",
      duration: "25 dk",
      icon: Video,
      level: "İleri",
      author: "Can Yıldız",
      videoUrl: "/dashboard/egitimlerim/dijital-operator-servisleri"
    },
    {
      id: 4,
      title: "Servis Entegrasyon Kılavuzu",
      description: "Turkcell iç sistemler ve dış API entegrasyonları",
      type: "Doküman",
      duration: "30 dk",
      icon: FileText,
      level: "İleri",
      author: "Ayşe Kaya",
      videoUrl: "/dashboard/egitimlerim/servis-entegrasyon-kilavuzu"
    },
    {
      id: 5,
      title: "CRM Sistemi Servis Tanımlama",
      description: "CRM sistemi üzerinden abone servisleri tanımlama",
      type: "Video",
      duration: "18 dk",
      icon: Video,
      level: "Orta",
      author: "Mehmet Demir",
      videoUrl: "/dashboard/egitimlerim/crm-servis-tanimlama"
    },
  ];

  const servisKontrolListesi = [
    {
      item: "Servis için gerekli teknik dökümanların hazırlanması",
      details: "Servis tanımı, API dokümanları, akış şemaları ve veri modelleri"
    },
    {
      item: "Servis erişim yetkilerinin belirlenmesi",
      details: "Rol tabanlı erişim yetkileri, kullanıcı grupları ve erişim politikaları"
    },
    {
      item: "Test ortamında servis kontrollerinin yapılması",
      details: "Fonksiyonel testler, performans testleri, güvenlik testleri"
    },
    {
      item: "Canlı ortama geçiş için onay süreçlerinin tamamlanması",
      details: "Operasyon onayı, güvenlik onayı, ürün müdürü onayı"
    },
    {
      item: "Servis izleme ve raporlama araçlarının kurulumu",
      details: "Loglar, metrikler, alarmlar ve otomatik bildirimler"
    },
    {
      item: "Müşteri hizmetleri bilgilendirmesi",
      details: "Yeni servis hakkında çağrı merkezi ve destek ekibinin eğitilmesi"
    },
    {
      item: "Sosyal medya ve iletişim planı",
      details: "Turkcell dijital kanallarda duyuru, eğitim ve farkındalık çalışmaları"
    },
  ];

  const sssItems = [
    {
      question: "Yeni bir servis tanımlama süreci ne kadar sürer?",
      answer: "Turkcell'de yeni bir servis tanımlama süreci, servisin karmaşıklığına bağlı olarak 2-6 hafta arasında değişebilir. Standart servisler için süreç genellikle 2 hafta içinde tamamlanırken, dış sistem entegrasyonları veya kompleks iş akışları içeren servisler için bu süre 6 haftaya kadar uzayabilir."
    },
    {
      question: "Servis tanımlamak için hangi yetkilere ihtiyacım var?",
      answer: "Servis tanımlama için Turkcell İş Yetkinlik Portalı'nda 'Servis Yönetim' yetkisine sahip olmanız gerekir. Bu yetki, bölüm yöneticinizin onayı ile Yetki Yönetim Sistemi üzerinden talep edilebilir."
    },
    {
      question: "Hangi durumlarda servis onay süreci uzayabilir?",
      answer: "Güvenlik incelemeleri, kapasite planlaması, performans testleri veya diğer servislerle entegrasyon gereksinimleri nedeniyle onay süreci uzayabilir. Ayrıca, kişisel veri içeren servisler için Veri Koruma ekibinin değerlendirmesi de süreyi etkileyebilir."
    },
    {
      question: "Servislerin test edilmesi için hangi ortamlar kullanılır?",
      answer: "Turkcell'de SIT (Sistem Entegrasyon Testi), UAT (Kullanıcı Kabul Testi) ve PREPROD (Ön Üretim) olmak üzere üç farklı test ortamı bulunmaktadır. Yeni servisler önce SIT ortamında teknik testlerden geçirilir, ardından UAT ortamında kullanıcı testleri yapılır ve son olarak PREPROD ortamında canlı ortam simülasyonu gerçekleştirilir."
    },
    {
      question: "Servis tanımlamada en sık yapılan hatalar nelerdir?",
      answer: "En sık yapılan hatalar: Yetersiz kapasite planlaması, eksik güvenlik kontrolü, test senaryolarının yetersizliği, diğer servislerle uyumluluk sorunları ve dokümantasyon eksikliğidir. Synbot, bu hataları önlemek için adım adım rehberlik sunar."
    }
  ];

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-1 bg-[#ffc72c]"></div>
          <h1 className="text-3xl font-bold">Servis Tanımlama Süreci</h1>
        </div>
        <p className="text-muted-foreground ml-10">
          Turkcell sistemlerinde bireysel ve kurumsal servis tanımlama, yönetim ve izleme süreçleri
        </p>
      </div>

      <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:border-blue-800">
        <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-800 dark:text-blue-300">Turkcell E-Servis Rehberi</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-400">
          Süreçleri daha hızlı öğrenmek için Synbot asistanı ile etkileşimli olarak ilerleyebilirsiniz. 
          <Button variant="link" className="text-blue-600 dark:text-blue-300 p-0 h-auto" asChild>
            <Link href="/dashboard/synbot">
              <span>Synbot'a Sor</span>
            </Link>
          </Button>
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="egitimler" className="space-y-6">
        <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex">
          <TabsTrigger value="egitimler">Eğitimler</TabsTrigger>
          <TabsTrigger value="kontrol-listesi">Kontrol Listesi</TabsTrigger>
          <TabsTrigger value="sss">Sık Sorulan Sorular</TabsTrigger>
        </TabsList>

        <TabsContent value="egitimler" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servisEgitimleri.map((egitim) => (
              <Card key={egitim.id} className="border-[#ffc72c]/20 hover:border-[#ffc72c]/40 transition-colors overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <egitim.icon className="h-8 w-8 text-[#ffc72c]" />
                    <div className="flex gap-2">
                      <Badge variant="outline">{egitim.type}</Badge>
                      <Badge variant="secondary">{egitim.level}</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg mt-2">{egitim.title}</CardTitle>
                  <CardDescription>{egitim.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{egitim.duration}</span>
                    <span className="mx-2">•</span>
                    <span>{egitim.author}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                    <Link href={egitim.videoUrl}>
                      <Play className="h-4 w-4 mr-2" />
                      Eğitime Başla
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="kontrol-listesi">
          <Card>
            <CardHeader>
              <CardTitle>Turkcell Servis Tanımlama Kontrol Listesi</CardTitle>
              <CardDescription>
                Yeni bir servis tanımlamadan önce tamamlanması gereken adımlar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-5">
                {servisKontrolListesi.map((item, index) => (
                  <li key={index} className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#ffc72c] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{item.item}</p>
                        <p className="text-sm text-muted-foreground mt-1">{item.details}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sss">
          <Card>
            <CardHeader>
              <CardTitle>Sık Sorulan Sorular</CardTitle>
              <CardDescription>
                Servis tanımlama süreciyle ilgili sık sorulan sorular ve cevapları
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {sssItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                    <h3 className="font-medium flex items-start gap-2 mb-2">
                      <ArrowRight className="h-5 w-5 text-[#ffc72c] mt-0.5 flex-shrink-0" />
                      {item.question}
                    </h3>
                    <p className="text-muted-foreground ml-7">{item.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
