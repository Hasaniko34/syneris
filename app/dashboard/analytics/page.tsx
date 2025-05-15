"use client";

import React from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Users, 
  BarChart2, 
  TrendingUp, 
  BookOpen, 
  Award, 
  FileBarChart, 
  LineChart,
  PieChart
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Raporlama ve Analitik</h1>
          <p className="text-muted-foreground">
            Eğitim ve öğrenme verilerinizi analiz edin, raporlar oluşturun ve içgörüler elde edin.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Rapor İndir</Button>
          <Button>Yeni Rapor Oluştur</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="user-progress">Kullanıcı İlerleme</TabsTrigger>
          <TabsTrigger value="company-performance">Şirket Performansı</TabsTrigger>
          <TabsTrigger value="training-effectiveness">Eğitim Etkinliği</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,259</div>
                <p className="text-xs text-muted-foreground">
                  Geçen haftaya göre +12%
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tamamlanan Eğitimler</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,782</div>
                <p className="text-xs text-muted-foreground">
                  Geçen aya göre +28%
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ortalama İlerleme</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">
                  Geçen çeyreğe göre +5%
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Kazanılan Sertifikalar</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">892</div>
                <p className="text-xs text-muted-foreground">
                  Geçen yıla göre +42%
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Aylık Kullanıcı Aktivitesi</CardTitle>
                <CardDescription>
                  Son 6 aydaki kullanıcı oturum ve eğitim verileri
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <div className="h-full w-full flex items-center justify-center text-muted-foreground border rounded-md">
                  <LineChart className="h-8 w-8 mr-2" />
                  <span>Çizgi Grafiği Gösterimi</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Eğitim Kategorileri</CardTitle>
                <CardDescription>
                  Kategoriye göre tamamlanan eğitimler
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <div className="h-full w-full flex items-center justify-center text-muted-foreground border rounded-md">
                  <PieChart className="h-8 w-8 mr-2" />
                  <span>Pasta Grafiği Gösterimi</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="user-progress" className="mt-6">
          <div className="grid gap-4 grid-cols-1">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Kullanıcı İlerleme Raporları</h2>
              <div className="flex gap-2">
                <Link href="/dashboard/analytics/user-progress">
                  <Button variant="outline">
                    Ayrıntılı Rapor <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>İlerleme Özeti</CardTitle>
                <CardDescription>
                  Kullanıcıların eğitim ve öğrenme ilerlemeleri
                </CardDescription>
              </CardHeader>
              <CardContent className="min-h-[400px]">
                <p className="text-center py-10 text-muted-foreground">
                  Bu bölümde kullanıcıların eğitim ilerleme raporları, tamamlama oranları, harcanan süre ve performans metrikleri gösterilir.
                </p>
                <div className="flex justify-center">
                  <Button>
                    İlerleme Raporlarını Görüntüle
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="company-performance" className="mt-6">
          <div className="grid gap-4 grid-cols-1">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Şirket Bazlı Performans Analizi</h2>
              <div className="flex gap-2">
                <Link href="/dashboard/analytics/company-performance">
                  <Button variant="outline">
                    Ayrıntılı Rapor <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Performans Özeti</CardTitle>
                <CardDescription>
                  Şirket içi eğitim ve öğrenme performansı
                </CardDescription>
              </CardHeader>
              <CardContent className="min-h-[400px]">
                <p className="text-center py-10 text-muted-foreground">
                  Bu bölümde şirket bazlı performans analizi, departman karşılaştırmaları, eğitim tamamlama oranları ve yatırım geri dönüşü metrikleri gösterilir.
                </p>
                <div className="flex justify-center">
                  <Button>
                    Şirket Performans Raporunu Görüntüle
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="training-effectiveness" className="mt-6">
          <div className="grid gap-4 grid-cols-1">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Eğitim Etkinliği Metrikleri</h2>
              <div className="flex gap-2">
                <Link href="/dashboard/analytics/training-effectiveness">
                  <Button variant="outline">
                    Ayrıntılı Rapor <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Eğitim Etkinlik Özeti</CardTitle>
                <CardDescription>
                  Eğitimlerin etkinlik ve verimlilik analizleri
                </CardDescription>
              </CardHeader>
              <CardContent className="min-h-[400px]">
                <p className="text-center py-10 text-muted-foreground">
                  Bu bölümde eğitimlerin etkinliği, kullanıcı geri bildirimleri, tamamlama süreleri ve sınav sonuçları gibi ölçümler gösterilir.
                </p>
                <div className="flex justify-center">
                  <Button>
                    Eğitim Etkinlik Raporunu Görüntüle
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 