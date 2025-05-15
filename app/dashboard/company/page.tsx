"use client";

import React, { useState } from "react";
import { Building2, Users, BookOpen, BarChart2, Settings, Mail, Globe, Phone, Briefcase, PieChart, Award, TrendingUp, ArrowUpRight, FileText, Download, CreditCard, Landmark, UserPlus, Store } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function CompanyPage() {
  const [selectedTab, setSelectedTab] = useState("all");
  
  // Şirket bilgileri - gerçekte bir API'den alınacak
  const company = {
    name: "Turkcell",
    description: "Türkiye'nin lider iletişim ve teknoloji şirketi olarak, müşterilerimize yenilikçi dijital çözümler ve kesintisiz iletişim hizmetleri sunuyoruz.",
    address: "İstanbul, Türkiye",
    employees: 9560,
    completionRate: 84,
    activeUsers: 8942,
    logo: "/images/logos/turkcell-logo.png", // Logo yolu
    website: "https://www.turkcell.com.tr",
    email: "info@turkcell.com.tr",
    phone: "+90 212 373 00 00",
    departments: [
      { name: "Bireysel Satış", employeeCount: 3240, completionRate: 92, color: "#005f9e" },
      { name: "Kurumsal Satış", employeeCount: 1850, completionRate: 87, color: "#0090c8" },
      { name: "Teknoloji ve Dijital Servisler", employeeCount: 1560, completionRate: 89, color: "#3fc1c9" },
      { name: "Müşteri Deneyimi", employeeCount: 920, completionRate: 95, color: "#364f6b" },
      { name: "Network ve Altyapı", employeeCount: 780, completionRate: 90, color: "#00487a" },
      { name: "Dijital Çözümler", employeeCount: 680, completionRate: 93, color: "#8cd0ff" },
    ],
    stats: {
      activeCourses: 42,
      completedCourses: 3860,
      avgCompletionRate: 84,
      totalLearningHours: 28450,
    },
    recentActivities: [
      { title: "Yeni eğitim eklendi", description: "Turkcell Mobil Uygulama Geliştirme kursu eklendi", time: "2 saat önce", type: "course" },
      { title: "Departman güncellendi", description: "Dijital Bankacılık departmanı güncellendi", time: "1 gün önce", type: "department" },
      { title: "Yeni çalışan", description: "35 yeni çalışan eklendi", time: "3 gün önce", type: "employee" },
    ],
    upcomingTrainings: [
      { title: "Dijital Bankacılık Çözümleri", department: "Dijital Bankacılık", date: "15 Mayıs 2025", participants: 120 },
      { title: "KOBİ Finansman Ürünleri", department: "KOBİ Bankacılığı", date: "20 Mayıs 2025", participants: 85 },
      { title: "Bankacılıkta Yapay Zeka", department: "Dijital Bankacılık", date: "25 Mayıs 2025", participants: 65 },
    ]
  };

  return (
    <div className="space-y-6">
      {/* Üst bilgi kartı */}
      <Card className="border-0 bg-gradient-to-r from-[#005f9e]/10 via-[#0090c8]/10 to-[#3fc1c9]/10">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                <AvatarImage src={company.logo} alt={company.name} />
                <AvatarFallback className="text-3xl font-bold bg-[#005f9e] text-white">
                  Turkcell
                </AvatarFallback>
              </Avatar>
              <Badge className="absolute -bottom-2 -right-2 py-1 px-3 font-medium bg-[#005f9e] hover:bg-[#004b7f]">
                Aktif
              </Badge>
            </div>
            
            <div className="space-y-2 flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h1 className="text-2xl font-bold text-[#005f9e]">
                    {company.name}
                  </h1>
                  <p className="text-muted-foreground mt-1">{company.address}</p>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <Button variant="outline" size="sm" asChild className="gap-1 border-[#005f9e]/30 text-[#005f9e] hover:bg-[#005f9e]/10">
                    <Link href="/dashboard/company/documents">
                      <FileText size={16} /> Dokümanlar
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="gap-1 border-[#005f9e]/30 text-[#005f9e] hover:bg-[#005f9e]/10">
                    <Link href="/dashboard/company/reports">
                      <Download size={16} /> Raporlar
                    </Link>
                  </Button>
                  <Button size="sm" asChild className="gap-1 bg-[#005f9e] hover:bg-[#004b7f]">
                    <Link href="/dashboard/company/settings">
                      <Settings size={16} /> Şirket Ayarları
                    </Link>
                  </Button>
                </div>
              </div>
              
              <p className="text-muted-foreground">{company.description}</p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-[#005f9e]" />
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline text-[#005f9e]">
                    {company.website}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-[#005f9e]" />
                  <a href={`mailto:${company.email}`} className="text-sm hover:underline text-[#005f9e]">
                    {company.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-[#005f9e]" />
                  <span className="text-sm">{company.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Şirket İstatistikleri */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="overflow-hidden border-l-4 border-l-[#005f9e] shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Çalışan</CardTitle>
            <div className="p-2 bg-[#005f9e]/10 rounded-full">
              <Users size={18} className="text-[#005f9e]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{company.employees}</div>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="text-xs gap-1 font-normal">
                <TrendingUp size={12} /> %3 artış
              </Badge>
              <p className="text-xs text-muted-foreground ml-2">Son 30 gün</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-l-4 border-l-[#0090c8] shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Kullanıcılar</CardTitle>
            <div className="p-2 bg-[#0090c8]/10 rounded-full">
              <Users size={18} className="text-[#0090c8]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{company.activeUsers}</div>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="text-xs gap-1 font-normal">
                <TrendingUp size={12} /> %5 artış
              </Badge>
              <p className="text-xs text-muted-foreground ml-2">Son 30 gün</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-l-4 border-l-[#00487a] shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Kurslar</CardTitle>
            <div className="p-2 bg-[#00487a]/10 rounded-full">
              <BookOpen size={18} className="text-[#00487a]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{company.stats.activeCourses}</div>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="text-xs gap-1 font-normal">
                <ArrowUpRight size={12} /> 4 yeni kurs
              </Badge>
              <p className="text-xs text-muted-foreground ml-2">Bu hafta</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-l-4 border-l-[#3fc1c9] shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamamlanma Oranı</CardTitle>
            <div className="p-2 bg-[#3fc1c9]/10 rounded-full">
              <BarChart2 size={18} className="text-[#3fc1c9]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">%{company.completionRate}</div>
            <Progress value={company.completionRate} className="h-2 mt-2 bg-[#e0f0fa]" indicatorClassName="bg-[#005f9e]" />
            <p className="text-xs text-muted-foreground mt-2">Tüm eğitimler</p>
          </CardContent>
        </Card>
      </div>

      {/* İçerik Bölümü - Karşılıklı 2 Kart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Departman Dağılımı */}
        <Card className="lg:col-span-2 shadow-sm hover:shadow-md transition-shadow border-[#005f9e]/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between text-[#005f9e]">
              <span>Departman Dağılımı</span>
              <Badge className="ml-2" variant="outline">
                {company.departments.length} departman
              </Badge>
            </CardTitle>
            <CardDescription>
              Turkcell departmanlarının çalışan dağılımı ve eğitim tamamlama oranları
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {company.departments.map((dept) => (
                <div key={dept.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }}></div>
                      <span className="font-medium">{dept.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{dept.employeeCount} çalışan</span>
                      <Badge variant="secondary" className="text-xs">%{dept.completionRate}</Badge>
                    </div>
                  </div>
                  <Progress value={dept.completionRate} className="h-2" style={{ backgroundColor: `${dept.color}30` }}>
                    <div className="h-full" style={{ backgroundColor: dept.color }}></div>
                  </Progress>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline" asChild className="border-[#005f9e]/30 text-[#005f9e] hover:bg-[#005f9e]/10">
                <Link href="/dashboard/company/departments">
                  Tüm Departman Detayları
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Son Aktiviteler ve Yaklaşan Eğitimler */}
        <Card className="shadow-sm hover:shadow-md transition-shadow border-[#005f9e]/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-[#005f9e]">Son Aktiviteler</CardTitle>
            <CardDescription>
              Turkcell içi son değişiklikler ve duyurular
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {company.recentActivities.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'course' 
                      ? 'bg-[#005f9e]/10' 
                      : activity.type === 'department' 
                      ? 'bg-[#0090c8]/10' 
                      : 'bg-[#3fc1c9]/10'
                  }`}>
                    {activity.type === 'course' ? (
                      <BookOpen size={16} className="text-[#005f9e]" />
                    ) : activity.type === 'department' ? (
                      <Briefcase size={16} className="text-[#0090c8]" />
                    ) : (
                      <Users size={16} className="text-[#3fc1c9]" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-3 text-[#005f9e]">Yaklaşan Eğitimler</h3>
            <div className="space-y-3">
              {company.upcomingTrainings.map((training, i) => (
                  <div key={i} className="bg-[#e0f0fa] p-3 rounded-lg">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-sm">{training.title}</h4>
                      <span className="text-xs font-medium text-[#005f9e]">{training.date}</span>
                  </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{training.department}</span>
                      <span className="text-xs text-[#00487a]">{training.participants} katılımcı</span>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Turkcell Servis Segmentleri İstatistikleri */}
      <Card className="border-[#005f9e]/20">
        <CardHeader>
          <CardTitle className="text-[#ffc72c]">Turkcell Servis Segmentleri</CardTitle>
          <CardDescription>
            Bankacılık segmentleri bazında performans ve tamamlama oranları
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg border border-[#005f9e]/20 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-[#005f9e]/10">
                  <UserPlus className="h-5 w-5 text-[#005f9e]" />
                </div>
                <h3 className="font-medium">Bireysel Satış</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Eğitim Tamamlama</span>
                  <span>%92</span>
                </div>
                <Progress value={92} className="h-1.5 bg-[#e0f0fa]" indicatorClassName="bg-[#005f9e]" />
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-xs text-muted-foreground">3240 çalışan</span>
                  <span className="text-xs text-[#005f9e]">180 aktif kurs</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-[#005f9e]/20 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-[#0090c8]/10">
                  <Briefcase className="h-5 w-5 text-[#0090c8]" />
                </div>
                <h3 className="font-medium">KOBİ Bankacılığı</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Eğitim Tamamlama</span>
                  <span>%87</span>
                </div>
                <Progress value={87} className="h-1.5 bg-[#e0f0fa]" indicatorClassName="bg-[#0090c8]" />
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-xs text-muted-foreground">1850 çalışan</span>
                  <span className="text-xs text-[#0090c8]">120 aktif kurs</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-[#005f9e]/20 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-[#00487a]/10">
                  <CreditCard className="h-5 w-5 text-[#00487a]" />
                </div>
                <h3 className="font-medium">Dijital Bankacılık</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Eğitim Tamamlama</span>
                  <span>%96</span>
                </div>
                <Progress value={96} className="h-1.5 bg-[#e0f0fa]" indicatorClassName="bg-[#00487a]" />
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-xs text-muted-foreground">780 çalışan</span>
                  <span className="text-xs text-[#00487a]">95 aktif kurs</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-[#ffc72c]">Turkcell Bölge Performansı</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg border border-[#005f9e]/20 bg-white">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-full bg-[#e0f0fa]">
                    <Store className="h-4 w-4 text-[#005f9e]" />
                  </div>
                  <span className="text-sm font-medium">İstanbul Bölgesi</span>
                </div>
                <div className="mt-2 text-right">
                  <span className="text-lg font-bold text-[#005f9e]">%94</span>
                </div>
              </div>
            
              <div className="p-3 rounded-lg border border-[#005f9e]/20 bg-white">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-full bg-[#e0f0fa]">
                    <Store className="h-4 w-4 text-[#005f9e]" />
                  </div>
                  <span className="text-sm font-medium">Ankara Bölgesi</span>
                </div>
                <div className="mt-2 text-right">
                  <span className="text-lg font-bold text-[#005f9e]">%91</span>
                </div>
              </div>
            
              <div className="p-3 rounded-lg border border-[#005f9e]/20 bg-white">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-full bg-[#e0f0fa]">
                    <Store className="h-4 w-4 text-[#005f9e]" />
                  </div>
                  <span className="text-sm font-medium">İzmir Bölgesi</span>
                </div>
                <div className="mt-2 text-right">
                  <span className="text-lg font-bold text-[#005f9e]">%89</span>
                </div>
              </div>
            
              <div className="p-3 rounded-lg border border-[#005f9e]/20 bg-white">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-full bg-[#e0f0fa]">
                    <Store className="h-4 w-4 text-[#005f9e]" />
                  </div>
                  <span className="text-sm font-medium">Diğer Bölgeler</span>
                </div>
                <div className="mt-2 text-right">
                  <span className="text-lg font-bold text-[#005f9e]">%87</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 pt-4 flex justify-between">
          <span className="text-sm text-muted-foreground">Son güncelleme: {new Date().toLocaleDateString()}</span>
          <Button className="bg-[#005f9e] hover:bg-[#004b7f]">Tüm Detayları Görüntüle</Button>
        </CardFooter>
      </Card>
    </div>
  );
} 