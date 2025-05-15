import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Brain, LineChart, TrendingUp, Clock, BarChart3, Lightbulb, PieChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useRouter } from 'next/navigation';

type InsightData = {
  completionRate: number;
  topicStrengths: {
    topic: string;
    strength: number;
  }[];
  topicWeaknesses: {
    topic: string;
    strength: number;
  }[];
  learningPatterns: {
    timeOfDay: {
      morning: number;
      afternoon: number;
      evening: number;
      night: number;
    };
    daysOfWeek: {
      [key: string]: number;
    };
    averageSessionLength: number;
  };
  recommendations: {
    text: string;
    confidence: number;
    type: "content" | "timing" | "method";
  }[];
};

// Demo veri oluşturan yardımcı fonksiyon
const getDemoData = (): InsightData => {
  return {
    completionRate: 0.72,
    topicStrengths: [
      { topic: "Veri Modeli", strength: 0.85 },
      { topic: "UI Bileşenleri", strength: 0.78 },
      { topic: "State Yönetimi", strength: 0.76 }
    ],
    topicWeaknesses: [
      { topic: "API Tasarımı", strength: 0.45 },
      { topic: "Güvenlik", strength: 0.52 },
      { topic: "Performans Optimizasyonu", strength: 0.58 }
    ],
    learningPatterns: {
      timeOfDay: {
        morning: 15,
        afternoon: 35,
        evening: 40,
        night: 10
      },
      daysOfWeek: {
        "Pazartesi": 20,
        "Salı": 15,
        "Çarşamba": 25,
        "Perşembe": 10,
        "Cuma": 15,
        "Cumartesi": 10,
        "Pazar": 5
      },
      averageSessionLength: 28
    },
    recommendations: [
      {
        text: "API tasarımı konusundaki eğitimlere odaklanarak bilgi seviyenizi artırabilirsiniz.",
        confidence: 0.88,
        type: "content"
      },
      {
        text: "Öğleden sonra ve akşam saatlerinde daha verimli çalıştığınız görülüyor. Bu zaman dilimlerinde daha zorlu konuları çalışmayı deneyebilirsiniz.",
        confidence: 0.76,
        type: "timing"
      },
      {
        text: "Pratik uygulamalarla güvenlik konusunu pekiştirebilirsiniz. Örnek projeler üzerinde çalışmak faydalı olabilir.",
        confidence: 0.82,
        type: "method"
      }
    ]
  };
};

export function SynbotInsightsCard() {
  const [insights, setInsights] = useState<InsightData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();
  
  useEffect(() => {
    fetchInsights();
  }, []);
  
  const fetchInsights = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/synbot/insights');
      const data = await response.json();
      
      if (response.ok) {
        if (data.insights) {
          setInsights(data.insights);
        } else {
          console.error("API yanıtında insights verisi bulunamadı:", data);
          toast({
            title: "Veri bulunamadı",
            description: "Etkileşim verileri bulunamadı. Lütfen daha sonra tekrar deneyin.",
            variant: "destructive",
          });
          setInsights(getDemoData());
        }
      } else {
        console.error("API yanıt hatası:", data);
        toast({
          title: "Veri yüklenemedi",
          description: data.error || "Etkileşim verileri yüklenirken bir sorun oluştu.",
          variant: "destructive",
        });
        setInsights(getDemoData());
      }
    } catch (error) {
      console.error("Insights API hatası:", error);
      toast({
        title: "Bağlantı hatası",
        description: "Sunucu ile iletişim kurulurken bir sorun oluştu.",
        variant: "destructive",
      });
      setInsights(getDemoData());
    } finally {
      setIsLoading(false);
    }
  };
  
  // Detaylı analiz görüntüleme fonksiyonu
  const handleViewDetailedAnalysis = () => {
    toast({
      title: "Detaylı Analiz Hazırlanıyor",
      description: "Eğitim verileri işleniyor ve analiz raporu hazırlanıyor..."
    });
    
    // API'ye analiz isteği gönderme simülasyonu
    setTimeout(() => {
      toast({
        title: "Analiz Raporu Hazır",
        description: "Detaylı öğrenme analiz raporunuz hazırlandı.",
      });
      
      // Kullanıcıyı analiz sayfasına yönlendir
      router.push("/dashboard/analytics/learning-analysis");
    }, 1500);
  };
  
  // Simülasyon verileri (gerçek API entegre edilene kadar)
  useEffect(() => {
    if (isLoading && !insights) {
      setTimeout(() => {
        setInsights(getDemoData());
        setIsLoading(false);
      }, 1500);
    }
  }, [isLoading, insights]);

  const getStrengthColor = (strength: number) => {
    if (strength >= 0.7) return "bg-green-500";
    if (strength >= 0.5) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  const getDayLabel = (day: string) => {
    const shortDay = day.substring(0, 2);
    return shortDay;
  };
  
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-500" />
          Öğrenme Analizi
        </CardTitle>
        <CardDescription>
          Eğitim etkileşimleriniz ve öğrenme alışkanlıklarınız hakkında içgörüler
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mx-4 mb-2">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="strengths">Güçlü Yönler</TabsTrigger>
          <TabsTrigger value="patterns">Öğrenme Modeli</TabsTrigger>
          <TabsTrigger value="recommendations">Öneriler</TabsTrigger>
        </TabsList>
        
        <CardContent className="pb-2">
          <TabsContent value="overview" className="mt-0">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : insights ? (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">Tamamlama Oranı</h3>
                    <span className="text-sm font-medium">{Math.round(insights.completionRate * 100)}%</span>
                  </div>
                  <Progress value={insights.completionRate * 100} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Güçlü Konular</h3>
                    <ul className="space-y-1">
                      {insights.topicStrengths.slice(0, 2).map((topic, i) => (
                        <li key={i} className="flex items-center justify-between text-sm">
                          <span>{topic.topic}</span>
                          <Badge className={getStrengthColor(topic.strength)}>
                            {Math.round(topic.strength * 100)}%
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Geliştirilebilir Konular</h3>
                    <ul className="space-y-1">
                      {insights.topicWeaknesses.slice(0, 2).map((topic, i) => (
                        <li key={i} className="flex items-center justify-between text-sm">
                          <span>{topic.topic}</span>
                          <Badge className={getStrengthColor(topic.strength)}>
                            {Math.round(topic.strength * 100)}%
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Öne Çıkan Öneri</h3>
                  <div className="bg-muted p-3 rounded-md text-sm">
                    <div className="flex items-start">
                      <Lightbulb className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                      <p>{insights.recommendations[0].text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                Veri bulunamadı. Daha fazla eğitim etkileşimi gerekiyor olabilir.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="strengths" className="mt-0">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
              </div>
            ) : insights ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                    Güçlü Yönler
                  </h3>
                  <ul className="space-y-2">
                    {insights.topicStrengths.map((topic, i) => (
                      <li key={i}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">{topic.topic}</span>
                          <span className="text-sm font-medium">{Math.round(topic.strength * 100)}%</span>
                        </div>
                        <Progress value={topic.strength * 100} className="h-2 bg-muted" />
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <LineChart className="h-4 w-4 mr-1 text-yellow-500" />
                    Geliştirilebilir Alanlar
                  </h3>
                  <ul className="space-y-2">
                    {insights.topicWeaknesses.map((topic, i) => (
                      <li key={i}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">{topic.topic}</span>
                          <span className="text-sm font-medium">{Math.round(topic.strength * 100)}%</span>
                        </div>
                        <Progress value={topic.strength * 100} className="h-2 bg-muted" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                Veri bulunamadı. Daha fazla eğitim etkileşimi gerekiyor olabilir.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="patterns" className="mt-0">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : insights ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-blue-500" />
                    Günün Saatleri
                  </h3>
                  <div className="grid grid-cols-4 gap-1 h-16">
                    {Object.entries(insights.learningPatterns.timeOfDay).map(([time, value], i) => {
                      const height = `${(value / Math.max(...Object.values(insights.learningPatterns.timeOfDay))) * 100}%`;
                      return (
                        <HoverCard key={i}>
                          <HoverCardTrigger asChild>
                            <div className="flex flex-col items-center h-full">
                              <div className="flex-grow w-full flex items-end">
                                <div 
                                  style={{ height }} 
                                  className="bg-primary/80 w-full rounded-t-sm"
                                ></div>
                              </div>
                              <span className="text-xs mt-1">
                                {{
                                  morning: "Sabah",
                                  afternoon: "Öğlen",
                                  evening: "Akşam",
                                  night: "Gece"
                                }[time as keyof typeof insights.learningPatterns.timeOfDay]}
                              </span>
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-32 p-2">
                            <div className="text-sm">
                              {value}% Aktivite
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <BarChart3 className="h-4 w-4 mr-1 text-purple-500" />
                    Haftalık Aktivite
                  </h3>
                  <div className="grid grid-cols-7 gap-1 h-16">
                    {Object.entries(insights.learningPatterns.daysOfWeek).map(([day, value], i) => {
                      const height = `${(value / Math.max(...Object.values(insights.learningPatterns.daysOfWeek))) * 100}%`;
                      return (
                        <HoverCard key={i}>
                          <HoverCardTrigger asChild>
                            <div className="flex flex-col items-center h-full">
                              <div className="flex-grow w-full flex items-end">
                                <div 
                                  style={{ height }} 
                                  className="bg-primary/80 w-full rounded-t-sm"
                                ></div>
                              </div>
                              <span className="text-xs mt-1">{getDayLabel(day)}</span>
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-32 p-2">
                            <div className="text-sm">
                              {day}: {value}% Aktivite
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      );
                    })}
                  </div>
                </div>
                
                <div className="bg-muted p-3 rounded-md">
                  <p className="text-sm">
                    <span className="font-medium">Ortalama eğitim süresi:</span>{" "}
                    {insights.learningPatterns.averageSessionLength} dakika
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                Veri bulunamadı. Daha fazla eğitim etkileşimi gerekiyor olabilir.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="recommendations" className="mt-0">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : insights ? (
              <div className="space-y-3">
                {insights.recommendations.map((rec, i) => (
                  <div key={i} className="bg-muted p-3 rounded-md">
                    <div className="flex items-start">
                      <div 
                        className={`mr-3 p-1 rounded-full flex-shrink-0 ${
                          rec.type === 'content' ? 'bg-blue-100' : 
                          rec.type === 'timing' ? 'bg-purple-100' : 'bg-green-100'
                        }`}
                      >
                        {rec.type === 'content' ? (
                          <Brain className="h-4 w-4 text-blue-500" />
                        ) : rec.type === 'timing' ? (
                          <Clock className="h-4 w-4 text-purple-500" />
                        ) : (
                          <Lightbulb className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm">{rec.text}</div>
                        <div className="mt-1 flex items-center">
                          <Badge 
                            variant="outline" 
                            className="text-xs font-normal"
                          >
                            Güven: {Math.round(rec.confidence * 100)}%
                          </Badge>
                          <Badge 
                            variant="outline"
                            className="text-xs font-normal ml-2"
                          >
                            {rec.type === 'content' ? 'İçerik Önerisi' : 
                             rec.type === 'timing' ? 'Zamanlama Önerisi' : 'Yöntem Önerisi'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                Veri bulunamadı. Daha fazla eğitim etkileşimi gerekiyor olabilir.
              </div>
            )}
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="flex justify-center pt-2 pb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2"
          onClick={handleViewDetailedAnalysis}
        >
          <PieChart className="h-4 w-4 mr-2" />
          Detaylı Analiz Görüntüle
        </Button>
      </CardFooter>
    </Card>
  );
} 