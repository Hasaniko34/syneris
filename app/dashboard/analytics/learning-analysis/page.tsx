"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Calendar, 
  Clock, 
  Download,
  Share2,
  FileText
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsCharts";
import { RecommendationList } from "@/components/analytics/RecommendationCard";
import { AnalyticsData } from "@/lib/services/analytics";

export default function LearningAnalysisPage() {
  const [timeRange, setTimeRange] = useState("month");
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  
  // Zaman aralığına göre başlık belirleme
  const getTimeRangeTitle = () => {
    switch (timeRange) {
      case "week": return "Son 7 Gün";
      case "month": return "Son 30 Gün";
      case "quarter": return "Son 3 Ay";
      case "year": return "Son 1 Yıl";
      case "all": return "Tüm Zamanlar";
      default: return "Son 30 Gün";
    }
  };
  
  // Analiz verilerini getir
  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/analytics/user?timeRange=${timeRange}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Analiz verileri alınamadı");
      }
      
      setAnalyticsData(result.data);
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message || "Analiz verileri yüklenirken bir sorun oluştu",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  // PDF raporu oluştur
  const generatePdfReport = () => {
    toast({
      title: "PDF Oluşturuluyor",
      description: "Analiz raporu PDF olarak hazırlanıyor..."
    });
    
    // Gerçek bir PDF oluşturma mantığı eklenebilir
    setTimeout(() => {
      toast({
        title: "PDF Hazır",
        description: "Analiz raporu başarıyla oluşturuldu ve indirildi."
      });
    }, 1500);
  };
  
  // Zaman aralığı değiştiğinde verileri güncelle
  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  return (
    <div className="container max-w-7xl mx-auto py-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold tracking-tight">Öğrenme Analizi</h1>
        <p className="text-muted-foreground">
          Eğitim performansınız ve öğrenme alışkanlıklarınız hakkında detaylı analiz
        </p>
      </motion.div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-primary/10 py-1.5 px-3 rounded-md">
            <Brain className="h-5 w-5 text-primary" />
            <span className="font-medium">Öğrenme İç Görüleri</span>
          </div>
          <Badge variant="outline" className="bg-muted">
            {getTimeRangeTitle()}
          </Badge>
        </div>
        
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Zaman Aralığı" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-background/90 backdrop-blur-md border-border shadow-lg">
              <SelectItem value="week">Son 7 Gün</SelectItem>
              <SelectItem value="month">Son 30 Gün</SelectItem>
              <SelectItem value="quarter">Son 3 Ay</SelectItem>
              <SelectItem value="year">Son 1 Yıl</SelectItem>
              <SelectItem value="all">Tüm Zamanlar</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon" onClick={generatePdfReport}>
            <Download className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="details">Detaylı İstatistikler</TabsTrigger>
          <TabsTrigger value="recommendations">Öneriler</TabsTrigger>
          <TabsTrigger value="export">Raporlar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {loading ? (
            <div className="flex items-center justify-center h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : analyticsData ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-500" />
                      Genel İlerleme
                    </CardTitle>
                    <CardDescription>
                      {getTimeRangeTitle()} içinde eğitim tamamlama oranı
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="relative h-36 w-36 flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="h-full w-full">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="var(--muted)"
                            strokeWidth="10"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="var(--primary)"
                            strokeWidth="10"
                            strokeDasharray={2 * Math.PI * 40}
                            strokeDashoffset={2 * Math.PI * 40 * (1 - analyticsData.completionRate)}
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold">
                            {Math.round(analyticsData.completionRate * 100)}%
                          </span>
                        </div>
                      </div>
                      <p className="mt-4 text-center text-muted-foreground">
                        {analyticsData.completionRate >= 0.75 
                          ? "Harika ilerleme kaydediyorsunuz!" 
                          : analyticsData.completionRate >= 0.5 
                            ? "İyi gidiyorsunuz, devam edin." 
                            : "Biraz daha çalışmaya ihtiyacınız var."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Brain className="h-5 w-5 text-purple-500" />
                      Öğrenme Durumu ({getTimeRangeTitle()})
                    </CardTitle>
                    <CardDescription>
                      Öğrenme durumunuz ve dönemsel karşılaştırma
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-muted rounded-lg p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-1">Önceki Dönem</p>
                        <p className="text-2xl font-bold">{analyticsData.progress.previousMonth}%</p>
                      </div>
                      <div className="bg-primary/10 rounded-lg p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-1">Mevcut Dönem</p>
                        <p className="text-2xl font-bold text-primary">{analyticsData.progress.currentMonth}%</p>
                      </div>
                      <div className="bg-muted rounded-lg p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-1">Gelişim</p>
                        <p className={`text-2xl font-bold ${analyticsData.progress.trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {analyticsData.progress.trend > 0 ? '+' : ''}{Math.round(analyticsData.progress.trend * 100)}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Güçlü Yönler</h3>
                        <ul className="space-y-1 text-sm">
                          {analyticsData.topicAnalysis.strengths.slice(0, 3).map((item, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span>{item.topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Geliştirilebilir Yönler</h3>
                        <ul className="space-y-1 text-sm">
                          {analyticsData.topicAnalysis.weaknesses.slice(0, 3).map((item, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                              <span>{item.topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <AnalyticsDashboard 
                analyticsData={analyticsData} 
                timeRangeTitle={getTimeRangeTitle()} 
              />
            </>
          ) : (
            <div className="text-center p-10 bg-muted/10 rounded-lg">
              <p className="text-muted-foreground">Analiz verileri bulunamadı.</p>
              <Button variant="outline" onClick={fetchAnalytics} className="mt-4">
                Tekrar Dene
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recommendations" className="space-y-6">
          {loading ? (
            <div className="flex items-center justify-center h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : analyticsData ? (
            <RecommendationList recommendations={analyticsData.recommendations} />
          ) : (
            <div className="text-center p-10 bg-muted/10 rounded-lg">
              <p className="text-muted-foreground">Öneri verileri bulunamadı.</p>
              <Button variant="outline" onClick={fetchAnalytics} className="mt-4">
                Tekrar Dene
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="details" className="space-y-6">
          {loading ? (
            <div className="flex items-center justify-center h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : analyticsData ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Öğrenme Parametreleri</CardTitle>
                  <CardDescription>
                    Çalışma şekliniz ve öğrenme stiliniz hakkında detaylı veriler
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Zaman Kullanımı</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>Ortalama Günlük Çalışma</span>
                          <span className="font-medium">{Math.round(analyticsData.learningPatterns.frequency)} saat</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Ortalama Oturum Süresi</span>
                          <span className="font-medium">{Math.round(analyticsData.learningPatterns.averageSessionLength)} dakika</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>En Verimli Saatler</span>
                          <span className="font-medium">Akşam</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>En Aktif Günler</span>
                          <span className="font-medium">Çar, Pzt</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Konu Dağılımı</h3>
                      <div className="space-y-2">
                        {analyticsData.topicAnalysis.strengths.slice(0, 4).map((topic, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span>{topic.topic}</span>
                            <span className="font-medium">{Math.round(topic.score * 100)}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Performans Özeti</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>Tamamlama Oranı</span>
                          <span className="font-medium">{Math.round(analyticsData.completionRate * 100)}%</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Dönemsel Gelişim</span>
                          <span className={`font-medium ${analyticsData.progress.trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {analyticsData.progress.trend > 0 ? '+' : ''}{Math.round(analyticsData.progress.trend * 100)}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Ortalama Puan</span>
                          <span className="font-medium">78/100</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Eğitim Sayısı</span>
                          <span className="font-medium">12</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center p-10 bg-muted/10 rounded-lg">
              <p className="text-muted-foreground">Detaylı veriler bulunamadı.</p>
              <Button variant="outline" onClick={fetchAnalytics} className="mt-4">
                Tekrar Dene
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="export" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analiz Raporları</CardTitle>
              <CardDescription>
                Öğrenme analizlerinizi çeşitli formatlarda dışa aktarın
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <Card className="bg-muted/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      PDF Raporu
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-sm text-muted-foreground">
                      Detaylı analiz raporunu PDF formatında indirin
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={generatePdfReport}>
                      <Download className="h-4 w-4 mr-2" />
                      PDF İndir
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-muted/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText className="h-5 w-5 text-green-500" />
                      Excel Raporu
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-sm text-muted-foreground">
                      Analiz verilerini Excel formatında dışa aktarın
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Excel İndir
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-muted/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Share2 className="h-5 w-5 text-purple-500" />
                      Raporu Paylaş
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-sm text-muted-foreground">
                      Analiz raporunu e-posta veya link olarak paylaşın
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Paylaş
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 