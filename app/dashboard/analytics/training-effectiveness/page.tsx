"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Download, 
  Search, 
  Calendar, 
  BarChart,
  Star,
  ThumbsUp,
  Hourglass,
  PieChart,
  BookOpen,
  LineChart,
  AlertCircle,
  Filter,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

interface TrainingData {
  id: string;
  title: string;
  category: string;
  duration: string;
  completionRate: number;
  averageScore: number;
  satisfactionRate: number;
  studentsCount: number;
  completionsCount: number;
  trend: "up" | "down" | "stable";
  trendValue: number;
}

// Örnek eğitim verileri
const trainingsData: TrainingData[] = [
  {
    id: "1",
    title: "Yeni Numara Tahsis İşlemi",
    category: "CRM ve Abone Yönetimi",
    duration: "3s 40d",
    completionRate: 92,
    averageScore: 91,
    satisfactionRate: 4.8,
    studentsCount: 156,
    completionsCount: 143,
    trend: "up",
    trendValue: 5.2
  },
  {
    id: "2",
    title: "Kurumsal Müşteri VPN Oluşturma",
    category: "Kurumsal Hizmetler",
    duration: "4s 30d",
    completionRate: 89,
    averageScore: 92,
    satisfactionRate: 4.7,
    studentsCount: 78,
    completionsCount: 69,
    trend: "up",
    trendValue: 3.1
  },
  {
    id: "3",
    title: "BiP Destek Süreci Yönetimi",
    category: "BiP Destek Süreçleri",
    duration: "4s 15d",
    completionRate: 88,
    averageScore: 90,
    satisfactionRate: 4.6,
    studentsCount: 124,
    completionsCount: 109,
    trend: "up",
    trendValue: 1.5
  },
  {
    id: "4",
    title: "Saha Operasyonları BTS Kurulumu",
    category: "Saha Operasyonları",
    duration: "6s 20d",
    completionRate: 82,
    averageScore: 88,
    satisfactionRate: 4.5,
    studentsCount: 98,
    completionsCount: 80,
    trend: "up",
    trendValue: 2.3
  },
  {
    id: "5",
    title: "Faturalama Editörü Kampanya Tanımlama",
    category: "Faturalama ve Kampanya",
    duration: "5s 30d",
    completionRate: 76,
    averageScore: 83,
    satisfactionRate: 4.1,
    studentsCount: 65,
    completionsCount: 49,
    trend: "down",
    trendValue: 0.5
  },
  {
    id: "6",
    title: "Dijital Kanal Yönetimi",
    category: "Dijital Kanal Yönetimi",
    duration: "5s 0d",
    completionRate: 81,
    averageScore: 87,
    satisfactionRate: 4.3,
    studentsCount: 45,
    completionsCount: 36,
    trend: "up",
    trendValue: 2.8
  },
  {
    id: "7",
    title: "Turkcell Liderlik ve Yöneticilik Becerileri",
    category: "Liderlik ve Yönetim",
    duration: "8s 0d",
    completionRate: 65,
    averageScore: 79,
    satisfactionRate: 4.3,
    studentsCount: 32,
    completionsCount: 21,
    trend: "up",
    trendValue: 7
  },
  {
    id: "8",
    title: "Arıza Tespit ve Çözüm Süreçleri",
    category: "Teknik Destek",
    duration: "4s 45d",
    completionRate: 85,
    averageScore: 89,
    satisfactionRate: 4.4,
    studentsCount: 72,
    completionsCount: 61,
    trend: "stable",
    trendValue: 1
  }
];

export default function TrainingEffectivenessPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("completionRate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  // Kategorileri al
  const categories = [...new Set(trainingsData.map(training => training.category))];
  
  // Eğitimleri filtrele
  const filteredTrainings = trainingsData.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "all" || training.category === category;
    return matchesSearch && matchesCategory;
  });
  
  // Eğitimleri sırala
  const sortedTrainings = [...filteredTrainings].sort((a, b) => {
    const factor = sortDirection === "asc" ? 1 : -1;
    
    if (sortBy === "title") {
      return factor * a.title.localeCompare(b.title);
    } else if (sortBy === "category") {
      return factor * a.category.localeCompare(b.category);
    } else {
      return factor * ((a as any)[sortBy] - (b as any)[sortBy]);
    }
  });
  
  // Ortalama memnuniyet puanı
  const averageSatisfaction = (
    trainingsData.reduce((sum, training) => sum + training.satisfactionRate, 0) / 
    trainingsData.length
  ).toFixed(1);
  
  // Ortalama tamamlama oranı
  const averageCompletionRate = Math.round(
    trainingsData.reduce((sum, training) => sum + training.completionRate, 0) / 
    trainingsData.length
  );
  
  // Ortalama skor
  const averageScore = Math.round(
    trainingsData.reduce((sum, training) => sum + training.averageScore, 0) / 
    trainingsData.length
  );
  
  // Toplam öğrenci
  const totalStudents = trainingsData.reduce(
    (sum, training) => sum + training.studentsCount, 0
  );
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/dashboard/analytics">
            <Button variant="ghost" size="icon" className="mr-2 text-[#005f9e]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#ffc72c]">Turkcell Eğitim Etkinliği Metrikleri</h1>
            <p className="text-muted-foreground">
              Turkcell sistem eğitimlerinin etkinliğini, tamamlanma oranlarını ve çalışan memnuniyetini analiz edin.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-[#ffc72c]/30 text-[#005f9e] hover:bg-[#ffc72c]/10">
            <Download className="h-4 w-4 mr-2" />
            Raporu İndir
          </Button>
          <Button className="bg-[#ffc72c] hover:bg-[#ffc72c]/80 text-[#333333]">
            <Calendar className="h-4 w-4 mr-2" />
            2023 Q4
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-[#005f9e]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memnuniyet Puanı</CardTitle>
            <Star className="h-4 w-4 text-[#005f9e]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageSatisfaction}/5</div>
            <p className="text-xs text-muted-foreground">
              Ortalama kullanıcı memnuniyeti
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-[#0090c8]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamamlama Oranı</CardTitle>
            <ThumbsUp className="h-4 w-4 text-[#0090c8]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageCompletionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Ortalama eğitim tamamlama
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-[#3fc1c9]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Skor</CardTitle>
            <BookOpen className="h-4 w-4 text-[#3fc1c9]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              Başarı değerlendirmesi
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-[#00487a]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Öğrenci</CardTitle>
            <Hourglass className="h-4 w-4 text-[#00487a]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Tüm eğitimlerde toplam
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[#e0f0fa] text-[#005f9e]">
          <TabsTrigger value="list" className="data-[state=active]:bg-[#ffc72c] data-[state=active]:text-white">Eğitim Listesi</TabsTrigger>
          <TabsTrigger value="completion" className="data-[state=active]:bg-[#ffc72c] data-[state=active]:text-white">Tamamlama Analizi</TabsTrigger>
          <TabsTrigger value="feedback" className="data-[state=active]:bg-[#ffc72c] data-[state=active]:text-white">Geri Bildirim Analizi</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <Card className="border-[#ffc72c]/20">
            <CardHeader>
              <CardTitle className="text-[#005f9e]">Turkcell Eğitimlerinin Etkinlik Analizi</CardTitle>
              <CardDescription>
                Turkcell sistem eğitimlerinin departman bazında etkinlik ve verimlilik metrikleri
              </CardDescription>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Eğitim ara..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Tüm Kategoriler" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tüm Kategoriler</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <BarChart className="h-4 w-4 mr-2" />
                  Grafik Görünümü
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="bg-[#e0f0fa]">
                  <TableRow>
                    <TableHead onClick={() => {
                      if (sortBy === "title") {
                        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                      } else {
                        setSortBy("title");
                        setSortDirection("asc");
                      }
                    }} className="cursor-pointer text-[#005f9e]">
                      <div className="flex items-center">
                        Eğitim Adı {sortBy === "title" && (
                          sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead onClick={() => {
                      if (sortBy === "category") {
                        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                      } else {
                        setSortBy("category");
                        setSortDirection("asc");
                      }
                    }} className="cursor-pointer text-[#005f9e]">
                      <div className="flex items-center">
                        Kategori {sortBy === "category" && (
                          sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead onClick={() => {
                      if (sortBy === "completionRate") {
                        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                      } else {
                        setSortBy("completionRate");
                        setSortDirection("desc");
                      }
                    }} className="text-center cursor-pointer text-[#005f9e]">
                      <div className="flex items-center justify-center">
                        Tamamlama Oranı {sortBy === "completionRate" && (
                          sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead onClick={() => {
                      if (sortBy === "averageScore") {
                        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                      } else {
                        setSortBy("averageScore");
                        setSortDirection("desc");
                      }
                    }} className="text-center cursor-pointer text-[#005f9e]">
                      <div className="flex items-center justify-center">
                        Ortalama Puan {sortBy === "averageScore" && (
                          sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead onClick={() => {
                      if (sortBy === "satisfactionRate") {
                        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                      } else {
                        setSortBy("satisfactionRate");
                        setSortDirection("desc");
                      }
                    }} className="text-center cursor-pointer text-[#005f9e]">
                      <div className="flex items-center justify-center">
                        Memnuniyet {sortBy === "satisfactionRate" && (
                          sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="text-center text-[#005f9e]">Süre</TableHead>
                    <TableHead className="text-center text-[#005f9e]">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedTrainings.map((training) => (
                    <TableRow key={training.id}>
                      <TableCell className="font-medium">{training.title}</TableCell>
                      <TableCell>{training.category}</TableCell>
                      <TableCell className="text-center">
                        <span className={
                          training.completionRate >= 85 ? "text-[#005f9e] font-medium" : 
                          training.completionRate >= 70 ? "text-[#0090c8] font-medium" : 
                          "text-amber-500 font-medium"
                        }>
                          {training.completionRate}%
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={
                          training.averageScore >= 85 ? "text-[#005f9e] font-medium" : 
                          training.averageScore >= 70 ? "text-[#0090c8] font-medium" : 
                          "text-amber-500 font-medium"
                        }>
                          {training.averageScore}%
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <span className={
                            training.satisfactionRate >= 4.5 ? "text-[#005f9e] font-medium" : 
                            training.satisfactionRate >= 4.0 ? "text-[#0090c8] font-medium" : 
                            "text-amber-500 font-medium"
                          }>
                            {training.satisfactionRate.toFixed(1)}
                          </span>
                          <Star className="h-4 w-4 ml-1 text-amber-400" />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{training.duration}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          {training.trend === "up" && (
                            <Badge className="bg-[#ffc72c]">
                              <ArrowUp className="h-3 w-3 mr-1" /> +{training.trendValue}%
                            </Badge>
                          )}
                          {training.trend === "down" && (
                            <Badge className="bg-red-500">
                              <ArrowDown className="h-3 w-3 mr-1" /> -{training.trendValue}%
                            </Badge>
                          )}
                          {training.trend === "stable" && (
                            <Badge className="bg-[#0090c8]">
                              <ArrowUpDown className="h-3 w-3 mr-1" /> ±{training.trendValue}%
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {sortedTrainings.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">
                          Arama kriterlerinize uygun eğitim bulunamadı.
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="justify-between border-t px-6 py-4">
              <div className="text-sm text-muted-foreground">
                Toplam <strong>{sortedTrainings.length}</strong> eğitim gösteriliyor
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm" disabled className="border-[#ffc72c]/30 text-[#005f9e]">
                  Önceki
                </Button>
                <Button variant="outline" size="sm" className="border-[#ffc72c]/30 text-[#005f9e] hover:bg-[#ffc72c]/10">
                  Sonraki
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="completion">
          <Card className="border-[#ffc72c]/20">
            <CardHeader>
              <CardTitle className="text-[#ffc72c]">Tamamlama Analizi</CardTitle>
              <CardDescription>
                Turkcell eğitimlerinin tamamlanma oranları ve zaman içindeki değişim
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[500px]">
              <div className="h-80 flex items-center justify-center border rounded-md">
                <div className="text-center space-y-4">
                  <LineChart className="h-10 w-10 mx-auto text-[#005f9e]" />
                  <p className="text-muted-foreground">Burada Turkcell departmanlarına göre eğitim tamamlanma oranları ve aylık değişim grafikleri gösterilecek</p>
                  <Button className="bg-[#ffc72c] hover:bg-[#ffc72c]/80 text-[#333333]">
                    Departman Bazlı Analizi Görüntüle
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card className="border-[#ffc72c]/20">
            <CardHeader>
              <CardTitle className="text-[#ffc72c]">Geri Bildirim Analizi</CardTitle>
              <CardDescription>
                Turkcell çalışanlarının eğitim memnuniyet anketleri ve iyileştirme önerileri
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[500px]">
              <div className="h-80 flex items-center justify-center border rounded-md">
                <div className="text-center space-y-4">
                  <Star className="h-10 w-10 mx-auto text-[#005f9e]" />
                  <p className="text-muted-foreground">Burada Turkcell çalışanlarının eğitim memnuniyet anketleri ve iyileştirme önerileri gösterilecek</p>
                  <Button className="bg-[#ffc72c] hover:bg-[#ffc72c]/80 text-[#333333]">
                    Detaylı Geri Bildirimleri Görüntüle
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 