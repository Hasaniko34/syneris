"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  HelpCircle,
  Layers,
  LayoutGrid,
  LucideIcon,
  PlayCircle,
  Server,
  Smartphone,
  Star,
  Target,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Feature component
interface FeatureProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const Feature = ({ title, description, icon: Icon }: FeatureProps) => {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-[#00A0D2]/5 hover:bg-[#00A0D2]/10 transition-colors">
      <div className="mt-1">
        <div className="p-2 rounded-lg bg-[#00A0D2]/10">
          <Icon className="h-5 w-5 text-[#00A0D2]" />
        </div>
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
};

export default function DijitalServislerPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-8">
      {/* Üst Bar */}
      <div className="flex items-center gap-2 mb-8">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-muted-foreground hover:text-foreground"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Geri</span>
        </Button>
        
        <div className="text-sm breadcrumbs">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
            Ana Sayfa
          </Link>
          <span className="text-muted-foreground mx-2">/</span>
          <Link href="/dashboard/egitim-katalogu" className="text-muted-foreground hover:text-foreground">
            Eğitim Kataloğu
          </Link>
          <span className="text-muted-foreground mx-2">/</span>
          <span className="font-medium">Turkcell Dijital Servisler Platformu</span>
        </div>
      </div>

      {/* Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#00A0D2] to-[#007DA3] mb-8">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]"></div>
        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4 text-white">
            <Badge className="bg-white/20 text-white border-none hover:bg-white/30">
              Turkcell Eğitimi
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold">Turkcell Dijital Servisler Platformu</h1>
            <p className="text-white/80 max-w-xl">
              Turkcell'in kapsamlı dijital servisleri ve mobil uygulama çözümlerine dair detaylı eğitim programı. 
              Müşteri deneyimi, dijital çözümler ve modern teknoloji uygulamaları hakkında bilgi edinin.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-3">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-[#FFD100]" />
                <span className="font-medium">4.7</span>
                <span className="text-white/70">(312 değerlendirme)</span>
              </div>
              <div className="flex items-center gap-1 text-white/70">
                <UserCheck className="h-5 w-5" />
                <span>1,560 katılımcı</span>
              </div>
              <div className="flex items-center gap-1 text-white/70">
                <Clock className="h-5 w-5" />
                <span>10 saat</span>
              </div>
            </div>
            
            <div className="pt-4 flex flex-wrap gap-3">
              <Button className="bg-white text-[#00A0D2] hover:bg-white/90" asChild>
                <Link href="/dashboard/egitimlerim">
                  <PlayCircle className="h-4 w-4 mr-2" /> Eğitime Başla
                </Link>
              </Button>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/20">
                <FileText className="h-4 w-4 mr-2" /> Broşürü İndir
              </Button>
            </div>
          </div>
          
          <div className="w-48 h-48 md:w-60 md:h-60 rounded-full bg-white/10 relative flex-shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FFD100]/20 to-transparent"></div>
            <Smartphone className="h-24 w-24 text-white" />
          </div>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Sol Kolon */}
        <div className="space-y-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-8">
              <TabsTrigger value="overview" className="data-[state=active]:bg-[#e0f0fa] data-[state=active]:text-[#00A0D2]">
                Genel Bakış
              </TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-[#e0f0fa] data-[state=active]:text-[#00A0D2]">
                Eğitim İçeriği
              </TabsTrigger>
              <TabsTrigger value="instructors" className="data-[state=active]:bg-[#e0f0fa] data-[state=active]:text-[#00A0D2]">
                Eğitmenler
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#00A0D2]">Eğitim Hakkında</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Turkcell'in dijital servisleri ve mobil uygulamalarını detaylı öğrenin. Mobil uygulama özellikleri, 
                    dijital müşteri edinimi, güvenlik sistemleri ve uygulama içi işlevleri kapsayan kapsamlı eğitim.
                  </p>
                  <p>
                    Bu eğitim, Turkcell'in dijital ekosistemini anlamak ve müşterilerinize bu hizmetlerle ilgili 
                    doğru bilgileri aktarmak isteyen tüm çalışanlar için özel olarak hazırlanmıştır. Eğitim sonunda, 
                    Turkcell'in sunduğu dijital servislerin tüm özelliklerini ve kullanım alanlarını kapsamlı 
                    şekilde öğrenmiş olacaksınız.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[#00A0D2]">Kazanımlar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Turkcell dijital servislerinin kapsamlı özelliklerini kullanabilme",
                      "Müşteri ihtiyaçlarına uygun dijital çözümleri tanımlayabilme",
                      "Mobil uygulama fonksiyonlarını detaylı açıklayabilme",
                      "Dijital hizmetlerle ilgili müşteri sorularını yanıtlayabilme",
                      "Dijital servislerdeki güncellemeleri takip edebilme",
                      "Dijital platform güvenliği hakkında müşterileri bilgilendirebilme",
                      "Müşteri deneyimini iyileştirmek için dijital servislerden yararlanabilme",
                      "Dijital servis abonelik süreçlerini yönetebilme"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#00A0D2] mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[#00A0D2]">Temel Özellikler</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Feature
                      title="Turkcell+ Entegrasyonu"
                      description="Fatura, paket kullanımı ve kampanya yönetimi eğitimi"
                      icon={Layers}
                    />
                    <Feature
                      title="Dijital Müşteri Süreçleri"
                      description="Dijital kanallar üzerinden müşteri edinimi"
                      icon={Users}
                    />
                    <Feature
                      title="Uygulama İçi Servisler"
                      description="Turkcell uygulaması içindeki servislerin kullanımı"
                      icon={LayoutGrid}
                    />
                    <Feature
                      title="Dijital Güvenlik"
                      description="Dijital platformlarda güvenlik ve veri koruma"
                      icon={Server}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#00A0D2]">Modüller</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Modül 1: Turkcell Dijital Servislere Giriş",
                        description: "Turkcell'in dijital servis stratejisi ve genel bakış",
                        duration: "1.5 saat",
                        lessons: ["Dijital dönüşüm stratejisi", "Dijital kanallar", "Kullanıcı deneyimi temelleri"]
                      },
                      {
                        title: "Modül 2: Mobil Uygulama ve Özellikleri",
                        description: "Turkcell mobil uygulamasının detaylı kullanımı",
                        duration: "2 saat",
                        lessons: ["Uygulama arayüzü ve navigasyon", "Hesap yönetimi", "Paket ve kampanya işlemleri"]
                      },
                      {
                        title: "Modül 3: Dijital Müşteri Yönetimi",
                        description: "Dijital kanallarda müşteri edinimi ve koruma",
                        duration: "2.5 saat",
                        lessons: ["Dijital kanallar üzerinden aktivasyon", "Self servis işlemler", "Dijital ödeme yöntemleri"]
                      },
                      {
                        title: "Modül 4: Güvenlik ve Veri Koruma",
                        description: "Dijital servislerde güvenlik önlemleri",
                        duration: "2 saat",
                        lessons: ["Kimlik doğrulama yöntemleri", "Veri gizliliği", "Güvenli işlem yapma"]
                      },
                      {
                        title: "Modül 5: Dijital Servis Çözümleri",
                        description: "Müşteri ihtiyaçlarına yönelik dijital çözümler",
                        duration: "2 saat",
                        lessons: ["Dijital servis sorun giderme", "Sık karşılaşılan sorunlar", "Müşteri eğitimi"]
                      }
                    ].map((module, idx) => (
                      <div key={idx} className="border rounded-lg p-4 hover:border-[#00A0D2]/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{module.title}</h3>
                          <Badge variant="outline" className="bg-[#FFD100]/10 text-gray-700 border-[#FFD100]/30">
                            {module.duration}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                        <div className="space-y-1.5">
                          {module.lessons.map((lesson, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-[#00A0D2] mt-0.5" />
                              <span>{lesson}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="instructors" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#00A0D2]">Eğitmenler</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {[
                      {
                        name: "Zeynep Yılmaz",
                        title: "Dijital Servisler Uzmanı",
                        bio: "Turkcell'de 8 yıllık deneyime sahip, dijital servisler biriminde uzman olarak görev yapıyor. Müşteri deneyimi ve dijital dönüşüm projeleri konusunda uzmanlaşmıştır.",
                        courses: 12
                      },
                      {
                        name: "Mert Kaya",
                        title: "Mobil Uygulama Yöneticisi",
                        bio: "Turkcell mobil uygulama geliştirme ekibinde 5 yıl deneyimli. Kullanıcı deneyimi ve arayüz tasarımı konularında uzmanlığa sahip.",
                        courses: 8
                      },
                      {
                        name: "Ayşe Demir",
                        title: "Dijital Müşteri Deneyimi Direktörü",
                        bio: "10 yıllık sektör deneyimiyle dijital müşteri deneyimi konusunda uzmanlaşmış. Müşteri memnuniyeti stratejileri geliştirmekte başarılı bir yönetici.",
                        courses: 15
                      },
                      {
                        name: "Can Özkan",
                        title: "Dijital Güvenlik Uzmanı",
                        bio: "Turkcell'in dijital güvenlik ekibinde 7 yıldır görev yapıyor. Veri koruma ve güvenlik süreçleri konusunda geniş bilgi ve deneyime sahip.",
                        courses: 6
                      }
                    ].map((instructor, idx) => (
                      <div key={idx} className="flex gap-4 p-4 rounded-lg border hover:border-[#00A0D2]/30 transition-colors">
                        <div className="w-14 h-14 rounded-full bg-[#00A0D2]/10 flex-shrink-0 flex items-center justify-center">
                          <Users className="h-6 w-6 text-[#00A0D2]" />
                        </div>
                        <div>
                          <h3 className="font-medium">{instructor.name}</h3>
                          <p className="text-sm text-[#00A0D2]">{instructor.title}</p>
                          <p className="text-sm text-muted-foreground mt-2">{instructor.bio}</p>
                          <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                            <BookOpen className="h-4 w-4" />
                            <span>{instructor.courses} eğitim hazırladı</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sağ Kolon */}
        <div className="space-y-6">
          <Card className="border-[#00A0D2]/10 hover:border-[#00A0D2]/30 transition-all sticky top-6">
            <CardHeader>
              <CardTitle className="text-[#00A0D2]">Eğitime Katıl</CardTitle>
              <CardDescription>
                Turkcell dijital servisler eğitimiyle kariyerinizi ilerletin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-lg">
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">Ücretsiz</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Sertifika Dahil
                </div>
              </div>
              
              <Button className="w-full bg-[#00A0D2] hover:bg-[#0080A8]" asChild>
                <Link href="/dashboard/egitimlerim">
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Hemen Başla
                </Link>
              </Button>
              
              <div className="bg-[#00A0D2]/5 p-4 rounded-lg space-y-4">
                <h3 className="font-medium">Eğitim İçeriği:</h3>
                <div className="space-y-2 text-sm">
                  {[
                    { icon: Layers, text: "5 modül" },
                    { icon: FileText, text: "25+ ders" },
                    { icon: Clock, text: "10 saat içerik" },
                    { icon: Calendar, text: "Sınırsız erişim" },
                    { icon: Award, text: "Tamamlama sertifikası" }
                  ].map((item, idx) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={idx} className="flex items-center gap-3">
                        <ItemIcon className="h-4 w-4 text-[#00A0D2]" />
                        <span>{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col text-sm text-muted-foreground border-t pt-4 gap-2">
              <div className="flex items-center gap-2 w-full">
                <HelpCircle className="h-4 w-4" />
                <span>Bu eğitimle ilgili sorularınız için <Link href="/help" className="text-[#00A0D2]">destek sayfasını</Link> ziyaret edin.</span>
              </div>
              <div className="flex items-center gap-2 w-full">
                <Target className="h-4 w-4" />
                <span>Bu eğitim, Turkcell çalışanlarının dijital servisler hakkında bilgilendirilmesi için tasarlanmıştır.</span>
              </div>
            </CardFooter>
          </Card>
          
          <Card className="border-[#00A0D2]/10 bg-gradient-to-r from-[#FFD100]/10 to-[#FFD100]/5">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 rounded-full bg-[#FFD100]/20">
                <Zap className="h-6 w-6 text-amber-600" />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium mb-1">Sınırlı Zaman Teklifi</h3>
                <p className="text-sm text-muted-foreground">
                  Bu eğitimi tamamladığınızda, "Dijital Dönüşüm Uzmanı" sertifikasını kazanma fırsatını yakalayın.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 