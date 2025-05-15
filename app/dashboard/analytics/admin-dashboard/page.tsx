"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Download, 
  RefreshCw, 
  Calendar, 
  BarChart2,
  UserCircle,
  BookOpen,
  TrendingUp,
  Clock,
  Award,
  Settings,
  LineChart,
  Target,
  Briefcase,
  Building2,
  ListChecks,
  AlertTriangle,
  CheckCircle,
  ShieldAlert,
  Users
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState("month");
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  const refreshData = () => {
    // Gerçek uygulamada burada verileri yenilemek için bir API çağrısı yapılır
    setLastUpdated(new Date());
  };
  
  // Örnek KPI verileri
  const kpiData = {
    activeUsers: 1287,
    activeUsersChange: 12,
    completedTrainings: 3842,
    completedTrainingsChange: 28,
    averageProgress: 68,
    averageProgressChange: 5,
    certifications: 921,
    certificationsChange: 42,
    totalTimeSpent: "2,831",
    totalTimeSpentChange: 15
  };
  
  // Örnek hedef verileri
  const goalData = [
    { id: 1, name: "Aylık Aktif Kullanıcı", target: 1500, current: 1287, unit: "kullanıcı" },
    { id: 2, name: "Tamamlanan Eğitim", target: 4000, current: 3842, unit: "eğitim" },
    { id: 3, name: "Kullanıcı Etkileşim Oranı", target: 75, current: 68, unit: "%" },
    { id: 4, name: "Ortalama Başarı Puanı", target: 85, current: 87, unit: "%" }
  ];
  
  // Örnek uyarı verileri
  const alertsData = [
    { id: 1, type: "warning", message: "12 kullanıcı 30 günden fazla süredir giriş yapmadı", time: "2 saat önce" },
    { id: 2, type: "error", message: "JavaScript Temelleri eğitiminde düşük tamamlanma oranı", time: "1 gün önce" },
    { id: 3, type: "success", message: "Geçen aya göre %22 daha fazla sertifika tamamlandı", time: "3 gün önce" },
    { id: 4, type: "info", message: "15 yeni eğitim içeriği sisteme eklendi", time: "1 hafta önce" }
  ];
  
  // Örnek şirket verileri
  const companyData = [
    { id: 1, name: "Acme Corp", employeeCount: 156, completionRate: 78, activeUsers: 142 },
    { id: 2, name: "Tech Solutions", employeeCount: 87, completionRate: 92, activeUsers: 81 },
    { id: 3, name: "Global Finance", employeeCount: 124, completionRate: 65, activeUsers: 98 },
    { id: 4, name: "Creative Studio", employeeCount: 42, completionRate: 85, activeUsers: 38 }
  ];
  
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
            <h1 className="text-3xl font-bold tracking-tight">Yönetici Kontrol Paneli</h1>
            <p className="text-muted-foreground">
              Platform geneli performans ve analitik verilerini görüntüleyin.
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-sm text-muted-foreground mr-2">
            Son güncelleme: {lastUpdated.toLocaleTimeString('tr-TR')}
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Zaman Aralığı" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Son 7 Gün</SelectItem>
              <SelectItem value="month">Son 30 Gün</SelectItem>
              <SelectItem value="quarter">Son 3 Ay</SelectItem>
              <SelectItem value="year">Son 1 Yıl</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={refreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Yenile
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Raporu İndir
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Kullanıcılar</CardTitle>
            <UserCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.activeUsers}</div>
            <div className="flex items-center pt-1">
              <span className={`text-xs ${kpiData.activeUsersChange > 0 ? "text-green-500" : "text-red-500"}`}>
                {kpiData.activeUsersChange > 0 ? "+" : ""}{kpiData.activeUsersChange}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                önceki döneme göre
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamamlanan Eğitimler</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.completedTrainings}</div>
            <div className="flex items-center pt-1">
              <span className={`text-xs ${kpiData.completedTrainingsChange > 0 ? "text-green-500" : "text-red-500"}`}>
                {kpiData.completedTrainingsChange > 0 ? "+" : ""}{kpiData.completedTrainingsChange}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                önceki döneme göre
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama İlerleme</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.averageProgress}%</div>
            <div className="flex items-center pt-1">
              <span className={`text-xs ${kpiData.averageProgressChange > 0 ? "text-green-500" : "text-red-500"}`}>
                {kpiData.averageProgressChange > 0 ? "+" : ""}{kpiData.averageProgressChange}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                önceki döneme göre
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sertifikalar</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.certifications}</div>
            <div className="flex items-center pt-1">
              <span className={`text-xs ${kpiData.certificationsChange > 0 ? "text-green-500" : "text-red-500"}`}>
                {kpiData.certificationsChange > 0 ? "+" : ""}{kpiData.certificationsChange}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                önceki döneme göre
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Süre</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.totalTimeSpent} saat</div>
            <div className="flex items-center pt-1">
              <span className={`text-xs ${kpiData.totalTimeSpentChange > 0 ? "text-green-500" : "text-red-500"}`}>
                {kpiData.totalTimeSpentChange > 0 ? "+" : ""}{kpiData.totalTimeSpentChange}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                önceki döneme göre
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Güncel Hedefler</CardTitle>
            <CardDescription>
              Belirlenen hedeflere yönelik ilerleme durumu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {goalData.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">{goal.name}</span>
                    </div>
                    <Badge variant="outline">
                      {Math.round((goal.current / goal.target) * 100)}% tamamlandı
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{goal.current} {goal.unit}</span>
                    <span>{goal.target} {goal.unit}</span>
                  </div>
                  <Progress value={(goal.current / goal.target) * 100} />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" className="ml-auto">
              <Settings className="h-4 w-4 mr-2" />
              Hedefleri Düzenle
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sistem Uyarıları</CardTitle>
            <CardDescription>
              Öncelikli dikkat gerektiren konular
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alertsData.map((alert) => (
                <div key={alert.id} className="flex items-start p-3 rounded-md bg-muted/50">
                  {alert.type === "warning" && (
                    <AlertTriangle className="h-5 w-5 mr-3 text-amber-500 flex-shrink-0" />
                  )}
                  {alert.type === "error" && (
                    <ShieldAlert className="h-5 w-5 mr-3 text-red-500 flex-shrink-0" />
                  )}
                  {alert.type === "success" && (
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                  )}
                  {alert.type === "info" && (
                    <Briefcase className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0" />
                  )}
                  <div className="space-y-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" className="w-full">
              Tüm Uyarıları Görüntüle
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Aktivite Grafiği</CardTitle>
            <CardDescription>
              Son 30 günlük kullanıcı aktivitesi
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <div className="h-full w-full flex items-center justify-center text-muted-foreground border rounded-md">
              <LineChart className="h-8 w-8 mr-2" />
              <span>Aktivite Grafiği Gösterimi</span>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline">
              <BarChart2 className="h-4 w-4 mr-2" />
              Ayrıntılı Analiz
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Şirket Performansı</CardTitle>
              <CardDescription>
                Şirketlerin eğitim ve katılım performansı
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Ayarlar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Tamamlanma Oranına Göre Sırala</DropdownMenuItem>
                <DropdownMenuItem>Aktif Kullanıcılara Göre Sırala</DropdownMenuItem>
                <DropdownMenuItem>Şirket Adına Göre Sırala</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {companyData.map((company) => (
                <div key={company.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">{company.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {company.activeUsers}/{company.employeeCount} aktif
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Tamamlama Oranı</span>
                    <span className={
                      company.completionRate >= 90 ? "text-green-500 font-medium" : 
                      company.completionRate >= 70 ? "text-blue-500 font-medium" : 
                      "text-amber-500 font-medium"
                    }>
                      {company.completionRate}%
                    </span>
                  </div>
                  <Progress value={company.completionRate} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" className="w-full">
              <Users className="h-4 w-4 mr-2" />
              Tüm Şirketleri Görüntüle
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 