"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Download, 
  Calendar, 
  BarChart,
  PieChart, 
  TrendingUp,
  Briefcase,
  Users,
  BookOpen,
  Clock,
  Award,
  Building2,
  DownloadCloud,
  CreditCard,
  Landmark,
  UserPlus,
  Store
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

interface DepartmentPerformance {
  id: string;
  name: string;
  employeeCount: number;
  completionRate: number;
  averageScore: number;
  activeLearners: number;
  activeLearnerPercentage: number;
}

// Turkcell departman performans verileri
const departmentPerformance: DepartmentPerformance[] = [
  {
    id: "1",
    name: "Bireysel Bankacılık",
    employeeCount: 125,
    completionRate: 92,
    averageScore: 89,
    activeLearners: 118,
    activeLearnerPercentage: 94
  },
  {
    id: "2",
    name: "KOBİ Bankacılığı",
    employeeCount: 78,
    completionRate: 87,
    averageScore: 85,
    activeLearners: 65,
    activeLearnerPercentage: 83
  },
  {
    id: "3",
    name: "Operasyon ve Süreç Yönetimi",
    employeeCount: 63,
    completionRate: 94,
    averageScore: 92,
    activeLearners: 60,
    activeLearnerPercentage: 95
  },
  {
    id: "4",
    name: "Hazine ve Yatırım",
    employeeCount: 42,
    completionRate: 84,
    averageScore: 88,
    activeLearners: 35,
    activeLearnerPercentage: 83
  },
  {
    id: "5",
    name: "Dijital Bankacılık",
    employeeCount: 52,
    completionRate: 96,
    averageScore: 94,
    activeLearners: 48,
    activeLearnerPercentage: 92
  }
];

export default function CompanyPerformancePage() {
  const [timeRange, setTimeRange] = useState("quarter");
  
  // Toplam çalışan sayısını hesapla
  const totalEmployees = departmentPerformance.reduce(
    (total, dept) => total + dept.employeeCount, 0
  );
  
  // Toplam aktif öğrenen sayısını hesapla
  const totalActiveLearners = departmentPerformance.reduce(
    (total, dept) => total + dept.activeLearners, 0
  );
  
  // Genel tamamlama oranını hesapla
  const overallCompletionRate = Math.round(
    departmentPerformance.reduce(
      (sum, dept) => sum + (dept.completionRate * dept.employeeCount), 0
    ) / totalEmployees
  );
  
  // Genel ortalama puanı hesapla
  const overallAverageScore = Math.round(
    departmentPerformance.reduce(
      (sum, dept) => sum + (dept.averageScore * dept.employeeCount), 0
    ) / totalEmployees
  );
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/dashboard/analytics">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#ffc72c]">Turkcell Performans Analitiği</h1>
            <p className="text-muted-foreground">
              Turkcell çalışanlarının eğitim ve öğrenme performansını analiz edin.
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Zaman Aralığı" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Son 30 Gün</SelectItem>
              <SelectItem value="quarter">Son 3 Ay</SelectItem>
              <SelectItem value="halfyear">Son 6 Ay</SelectItem>
              <SelectItem value="year">Son 1 Yıl</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-[#005f9e] text-[#005f9e] hover:bg-[#e0f0fa]">
            <Download className="h-4 w-4 mr-2" />
            Raporu İndir
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-[#005f9e]/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Çalışan</CardTitle>
            <Users className="h-4 w-4 text-[#005f9e]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              Turkcell genelinde
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-[#005f9e]/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Öğrenenler</CardTitle>
            <BookOpen className="h-4 w-4 text-[#005f9e]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActiveLearners}</div>
            <p className="text-xs text-muted-foreground">
              %{Math.round((totalActiveLearners / totalEmployees) * 100)} katılım oranı
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-[#005f9e]/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamamlama Oranı</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#005f9e]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallCompletionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Genel eğitim tamamlama
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-[#005f9e]/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Puan</CardTitle>
            <Award className="h-4 w-4 text-[#005f9e]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallAverageScore}%</div>
            <p className="text-xs text-muted-foreground">
              Değerlendirme ortalaması
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="departments" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="departments" className="text-[#005f9e] data-[state=active]:bg-[#e0f0fa] data-[state=active]:text-[#005f9e]">Departman Analizi</TabsTrigger>
          <TabsTrigger value="training-categories" className="text-[#005f9e] data-[state=active]:bg-[#e0f0fa] data-[state=active]:text-[#005f9e]">Eğitim Kategorileri</TabsTrigger>
          <TabsTrigger value="completion-trends" className="text-[#005f9e] data-[state=active]:bg-[#e0f0fa] data-[state=active]:text-[#005f9e]">Şube Karşılaştırması</TabsTrigger>
        </TabsList>
        
        <TabsContent value="departments">
          <Card className="border-[#005f9e]/20">
            <CardHeader>
              <CardTitle className="text-[#005f9e]">Departman Performans Karşılaştırması</CardTitle>
              <CardDescription>
                Turkcell departmanları arası eğitim performansı ve katılım oranları karşılaştırması
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {departmentPerformance.map((dept) => (
                  <div key={dept.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {dept.name === "Bireysel Bankacılık" ? (
                          <UserPlus className="h-4 w-4 text-[#005f9e]" />
                        ) : dept.name === "KOBİ Bankacılığı" ? (
                          <Briefcase className="h-4 w-4 text-[#005f9e]" />
                        ) : dept.name === "Dijital Bankacılık" ? (
                          <CreditCard className="h-4 w-4 text-[#005f9e]" />
                        ) : dept.name === "Hazine ve Yatırım" ? (
                          <Landmark className="h-4 w-4 text-[#005f9e]" />
                        ) : (
                          <Building2 className="h-4 w-4 text-[#005f9e]" />
                        )}
                        <span className="font-medium">{dept.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {dept.employeeCount} çalışan | {dept.activeLearners} aktif öğrenen
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tamamlama Oranı</span>
                          <span className="font-medium">{dept.completionRate}%</span>
                        </div>
                        <Progress value={dept.completionRate} className="bg-[#e0f0fa]" indicatorClassName="bg-[#005f9e]" />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Aktif Katılım</span>
                          <span className="font-medium">{dept.activeLearnerPercentage}%</span>
                        </div>
                        <Progress value={dept.activeLearnerPercentage} className="bg-[#e0f0fa]" indicatorClassName="bg-[#005f9e]" />
                      </div>
                    </div>
                    
                    <div className="pt-2 flex justify-between items-center">
                      <span className="text-sm">
                        Ortalama Puan: 
                        <span className={
                          dept.averageScore >= 90 ? " text-emerald-600 font-medium" : 
                          dept.averageScore >= 80 ? " text-[#005f9e] font-medium" : 
                          " text-amber-600 font-medium"
                        }>
                          {" "}{dept.averageScore}%
                        </span>
                      </span>
                      <Button variant="ghost" size="sm" className="text-[#005f9e] hover:bg-[#e0f0fa] hover:text-[#005f9e]">
                        Ayrıntılı Rapor
                      </Button>
                    </div>
                    
                    {dept.id !== departmentPerformance[departmentPerformance.length - 1].id && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <div className="text-sm text-muted-foreground">
                Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
              </div>
              <Button variant="outline" size="sm" className="border-[#005f9e] text-[#005f9e] hover:bg-[#e0f0fa]">
                <DownloadCloud className="h-4 w-4 mr-2" />
                Departman Verilerini İndir
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="training-categories">
          <Card className="border-[#005f9e]/20">
            <CardHeader>
              <CardTitle className="text-[#005f9e]">Bankacılık Eğitim Kategorileri Analizi</CardTitle>
              <CardDescription>
                Turkcell dijital servis eğitim kategorilerine göre katılım ve başarı oranları
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-[#005f9e]/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Bireysel Bankacılık Eğitimleri</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Tamamlama Oranı</span>
                            <span className="font-medium">92%</span>
                          </div>
                          <Progress value={92} className="bg-[#e0f0fa]" indicatorClassName="bg-[#005f9e]" />
                        </div>
                        <div className="pt-2 text-xs text-muted-foreground">
                          245 aktif katılımcı, 125 modül
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-[#005f9e]/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">KOBİ Bankacılığı Eğitimleri</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Tamamlama Oranı</span>
                            <span className="font-medium">87%</span>
                          </div>
                          <Progress value={87} className="bg-[#e0f0fa]" indicatorClassName="bg-[#005f9e]" />
                        </div>
                        <div className="pt-2 text-xs text-muted-foreground">
                          178 aktif katılımcı, 95 modül
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-[#005f9e]/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Dijital Bankacılık Eğitimleri</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Tamamlama Oranı</span>
                            <span className="font-medium">96%</span>
                          </div>
                          <Progress value={96} className="bg-[#e0f0fa]" indicatorClassName="bg-[#005f9e]" />
                        </div>
                        <div className="pt-2 text-xs text-muted-foreground">
                          185 aktif katılımcı, 75 modül
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-[#005f9e]/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Operasyonel Süreçler Eğitimleri</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Tamamlama Oranı</span>
                            <span className="font-medium">94%</span>
                          </div>
                          <Progress value={94} className="bg-[#e0f0fa]" indicatorClassName="bg-[#005f9e]" />
                        </div>
                        <div className="pt-2 text-xs text-muted-foreground">
                          210 aktif katılımcı, 118 modül
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Button className="w-full bg-[#005f9e] hover:bg-[#004b7f]">
                  Tüm Eğitim Kategorilerini Görüntüle
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completion-trends">
          <Card className="border-[#005f9e]/20">
            <CardHeader>
              <CardTitle className="text-[#ffc72c]">Turkcell Bölge Performans Karşılaştırması</CardTitle>
              <CardDescription>
                Bölgelere göre şube eğitim tamamlama oranları ve performans değerlendirmesi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-[#005f9e]/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <Store className="h-8 w-8 text-[#005f9e]" />
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Ankara Bölgesi</p>
                          <p className="text-2xl font-bold">%91</p>
                          <p className="text-xs text-emerald-600">+3% geçen döneme göre</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-[#005f9e]/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <Store className="h-8 w-8 text-[#005f9e]" />
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">İstanbul Bölgesi</p>
                          <p className="text-2xl font-bold">%94</p>
                          <p className="text-xs text-emerald-600">+2% geçen döneme göre</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-[#005f9e]/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <Store className="h-8 w-8 text-[#005f9e]" />
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">İzmir Bölgesi</p>
                          <p className="text-2xl font-bold">%89</p>
                          <p className="text-xs text-emerald-600">+4% geçen döneme göre</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex items-center justify-center h-[300px] border rounded-md bg-white">
                <div className="text-center space-y-4">
                    <BarChart className="h-10 w-10 mx-auto text-[#005f9e]" />
                    <p className="text-muted-foreground">Şube bazlı performans karşılaştırma grafiği</p>
                    <Button className="bg-[#005f9e] hover:bg-[#004b7f]">
                      Detaylı Şube Analizini Görüntüle
                  </Button>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm border-t pt-4">
                  <span className="text-muted-foreground">
                    En yüksek performans: <span className="font-medium">Turkcell Maltepe Plaza (97%)</span>
                  </span>
                  <span className="text-muted-foreground">
                    Toplam şube sayısı: <span className="font-medium">465</span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 