import { useState } from 'react';
import { GraduationCap, Book, Video, CheckCircle, Calendar, Clock, ArrowRight, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';

export function SynbotTrainingCard() {
  const [activeTab, setActiveTab] = useState("recommended");
  const [expandedDay, setExpandedDay] = useState<string | null>("Pazartesi");
  const router = useRouter();

  // Yönlendirme ve aksiyon fonksiyonları
  const navigateToTraining = (trainingId: string, action: 'continue' | 'start') => {
    router.push(`/dashboard/egitimlerim/${trainingId}`);
    toast({
      title: action === 'continue' ? "Eğitime Devam Ediliyor" : "Eğitim Başlatılıyor",
      description: action === 'continue' 
        ? "Kaldığınız yerden devam edebilirsiniz." 
        : "Yeni eğitim başlatılıyor. İyi öğrenmeler!",
    });
  };

  // Daha fazla öneri göster
  const showMoreRecommendations = () => {
    toast({
      title: "Daha Fazla Öneri Yükleniyor",
      description: "Seviyenize ve ilgi alanlarınıza uygun eğitimler getiriliyor...",
    });
    
    // Normalde burada API çağrısı yapılabilir
    setTimeout(() => {
      setActiveTab("recommended");
      toast({
        title: "Yeni Öneriler Hazır",
        description: "Önerilen eğitimler listesi güncellendi.",
      });
    }, 1500);
  };

  // Eğitim planını başlat
  const startPlannedTraining = (title: string) => {
    toast({
      title: "Eğitim Başlatılıyor",
      description: `"${title}" eğitimi başlatılıyor.`,
    });
    
    // Eğitim planını güncellemek için API çağrısı yapılabilir
    setTimeout(() => {
      toast({
        title: "Eğitim Hazır",
        description: "Eğitim içeriği hazırlandı, öğrenmeye başlayabilirsiniz.",
      });
    }, 1000);
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-blue-500" />
          Yapay Zeka Eğitim Rehberi
        </CardTitle>
        <CardDescription>
          Seviyenize ve ilgi alanlarınıza göre kişiselleştirilmiş eğitim içerikleri ve plan
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="recommended" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mx-4 mb-2">
          <TabsTrigger value="recommended" className="flex-1">Önerilen İçerikler</TabsTrigger>
          <TabsTrigger value="plan" className="flex-1">Eğitim Planım</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommended" className="space-y-4 p-4">
          <div className="space-y-4">
            <div className="bg-muted/40 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10 bg-blue-100 dark:bg-blue-900">
                    <AvatarImage src="/icons/javascript.svg" alt="JavaScript" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">JavaScript Asenkron Programlama</h3>
                    <p className="text-sm text-muted-foreground">Promise, async/await ve callback kavramları</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900">
                  <Clock className="h-3 w-3 mr-1" /> 45 dk
                </Badge>
              </div>
              
              <Progress value={62} className="h-2 mb-2" />
              <div className="text-xs text-muted-foreground text-right mb-3">%62 tamamlandı</div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary" className="text-xs">JavaScript</Badge>
                <Badge variant="secondary" className="text-xs">Asenkron</Badge>
                <Badge variant="secondary" className="text-xs">ES6+</Badge>
              </div>
              
              <Button 
                size="sm" 
                className="w-full"
                onClick={() => navigateToTraining('js-async-101', 'continue')}
              >
                Eğitime Devam Et
              </Button>
            </div>
            
            <div className="bg-muted/40 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10 bg-cyan-100 dark:bg-cyan-900">
                    <AvatarImage src="/icons/react.svg" alt="React" />
                    <AvatarFallback>R</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">React Hooks Derinlemesine</h3>
                    <p className="text-sm text-muted-foreground">useEffect, useContext ve custom hook yapımı</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-cyan-100 dark:bg-cyan-900">
                  <Clock className="h-3 w-3 mr-1" /> 60 dk
                </Badge>
              </div>
              
              <Progress value={0} className="h-2 mb-2" />
              <div className="text-xs text-muted-foreground text-right mb-3">Henüz başlanmadı</div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary" className="text-xs">React</Badge>
                <Badge variant="secondary" className="text-xs">Hooks</Badge>
                <Badge variant="secondary" className="text-xs">State</Badge>
              </div>
              
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full"
                onClick={() => navigateToTraining('react-hooks-advanced', 'start')}
              >
                Eğitime Başla
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full"
              onClick={showMoreRecommendations}
            >
              Daha Fazla Öneri Gör
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="plan" className="p-4">
          <div className="text-sm text-muted-foreground mb-3 flex items-center">
            <Target className="h-4 w-4 mr-2" />
            Haftalık Eğitim Planınız
          </div>
          
          <Accordion 
            type="single" 
            collapsible 
            defaultValue="Pazartesi"
            value={expandedDay || undefined}
            onValueChange={setExpandedDay}
            className="w-full"
          >
            <AccordionItem value="Pazartesi">
              <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg hover:bg-muted/50 data-[state=open]:bg-muted/50">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Pazartesi</span>
                </div>
                <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">2 İçerik</Badge>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3 pt-1">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border bg-background">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-2">
                        <Book className="h-4 w-4 text-orange-500 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium">JavaScript Temelleri</h4>
                          <p className="text-xs text-muted-foreground">Değişkenler, fonksiyonlar ve veri tipleri</p>
                        </div>
                      </div>
                      <Badge variant="outline" size="sm">30 dk</Badge>
                    </div>
                    <div className="mt-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 w-full justify-between"
                        onClick={() => startPlannedTraining("JavaScript Temelleri")}
                      >
                        <span className="text-xs">Başla</span>
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg border bg-background">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-2">
                        <Video className="h-4 w-4 text-purple-500 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium">React Bileşen Yaşam Döngüsü</h4>
                          <p className="text-xs text-muted-foreground">Bileşenlerin oluşturulması ve yeniden render</p>
                        </div>
                      </div>
                      <Badge variant="outline" size="sm">45 dk</Badge>
                    </div>
                    <div className="mt-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 w-full justify-between"
                        onClick={() => startPlannedTraining("React Bileşen Yaşam Döngüsü")}
                      >
                        <span className="text-xs">Başla</span>
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="Çarşamba">
              <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg hover:bg-muted/50 data-[state=open]:bg-muted/50">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-indigo-500" />
                  <span className="font-medium">Çarşamba</span>
                </div>
                <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">1 İçerik</Badge>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3 pt-1">
                <div className="p-3 rounded-lg border bg-background">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-2">
                      <Book className="h-4 w-4 text-teal-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium">Next.js API Route'ları</h4>
                        <p className="text-xs text-muted-foreground">Sunucu taraflı API'lar oluşturma</p>
                      </div>
                    </div>
                    <Badge variant="outline" size="sm">60 dk</Badge>
                  </div>
                  <div className="mt-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-7 w-full justify-between"
                      onClick={() => startPlannedTraining("Next.js API Route'ları")}
                    >
                      <span className="text-xs">Başla</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="Cuma">
              <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg hover:bg-muted/50 data-[state=open]:bg-muted/50">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-violet-500" />
                  <span className="font-medium">Cuma</span>
                </div>
                <Badge className="ml-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">2 İçerik</Badge>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3 pt-1">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border bg-background">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-2">
                        <Book className="h-4 w-4 text-pink-500 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium">MongoDB ile Veri Modelleme</h4>
                          <p className="text-xs text-muted-foreground">Şema tasarımı ve ilişkiler</p>
                        </div>
                      </div>
                      <Badge variant="outline" size="sm">40 dk</Badge>
                    </div>
                    <div className="mt-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 w-full justify-between"
                        onClick={() => startPlannedTraining("MongoDB ile Veri Modelleme")}
                      >
                        <span className="text-xs">Başla</span>
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg border bg-background">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-2">
                        <Video className="h-4 w-4 text-emerald-500 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium">TypeScript Tip Güvenliği</h4>
                          <p className="text-xs text-muted-foreground">Generic tipler ve tip çıkarımı</p>
                        </div>
                      </div>
                      <Badge variant="outline" size="sm">45 dk</Badge>
                    </div>
                    <div className="mt-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 w-full justify-between"
                        onClick={() => startPlannedTraining("TypeScript Tip Güvenliği")}
                      >
                        <span className="text-xs">Başla</span>
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </Card>
  );
} 