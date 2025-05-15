"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  BookOpen,
  Award,
  Mail,
  Phone,
  Calendar,
  Building2,
  MessageSquare,
  ChevronDown,
  ArrowUpDown,
  MoreHorizontal,
  FileSpreadsheet,
  UserCog,
  Trash2,
  FileText,
  ArrowRightLeft,
  BarChart2,
  Check,
  X,
  Briefcase,
  UserCheck,
  MoreVertical,
  FilterIcon
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function EmployeesPage() {
  // State tanımlamaları
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentView, setCurrentView] = useState("all");

  // Çalışan örnek verileri
  const employees = [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet.yilmaz@turkcell.com.tr",
      phone: "+90 532 123 4567",
      position: "Bölge Satış Müdürü",
      department: "Bireysel Satış",
      status: "active",
      completedCourses: 12,
      assignedCourses: 15,
      completionRate: 80,
      hireDate: "15.05.2019",
      image: "/images/avatars/avatar-1.jpg",
      skills: ["Müşteri İlişkileri", "Satış Yönetimi", "Dijital Servisler"],
      lastActive: "2 saat önce"
    },
    {
      id: 2,
      name: "Ayşe Kaya",
      email: "ayse.kaya@turkcell.com.tr",
      phone: "+90 533 234 5678",
      position: "Kurumsal Satış Uzmanı",
      department: "Kurumsal Satış",
      status: "active",
      completedCourses: 8,
      assignedCourses: 10,
      completionRate: 80,
      hireDate: "03.10.2020",
      image: "/images/avatars/avatar-2.jpg",
      skills: ["Kurumsal Satış", "Telekom Çözümleri", "Müşteri İlişkileri"],
      lastActive: "30 dakika önce"
    },
    {
      id: 3,
      name: "Mehmet Demir",
      email: "mehmet.demir@turkcell.com.tr",
      phone: "+90 534 345 6789",
      position: "İK Müdürü",
      department: "İnsan Kaynakları",
      status: "active",
      completedCourses: 15,
      assignedCourses: 15,
      completionRate: 100,
      hireDate: "20.08.2018",
      image: "/images/avatars/avatar-3.jpg",
      skills: ["İşe Alım", "Performans Yönetimi", "Eğitim & Gelişim"],
      lastActive: "1 gün önce"
    },
    {
      id: "ZY",
      name: "Zeynep Yıldız",
      email: "zeynep.yildiz@turkcell.com.tr",
      phone: "+90 535 456 7890",
      position: "Müşteri Deneyimi Direktörü",
      department: "Müşteri Deneyimi",
      status: "active",
      completedCourses: 9,
      assignedCourses: 12,
      completionRate: 75,
      hireDate: "05.03.2021",
      image: "/images/avatars/avatar-4.jpg",
      skills: ["Müşteri Deneyimi", "Dijital Servisler", "Veri Analitiği"],
      lastActive: "3 saat önce"
    },
    {
      id: "CO",
      name: "Can Özkan",
      email: "can.ozkan@turkcell.com.tr",
      phone: "+90 536 567 8901",
      position: "Dijital Çözümler Direktörü",
      department: "Dijital Çözümler",
      status: "active",
      completedCourses: 7,
      assignedCourses: 12,
      completionRate: 58,
      hireDate: "10.01.2022",
      image: "/images/avatars/avatar-5.jpg",
      skills: ["Dijital Dönüşüm", "Fintech", "Mobil Bankacılık"],
      lastActive: "5 dakika önce"
    },
    {
      id: "ES",
      name: "Elif Şahin",
      email: "elif.sahin@turkcell.com.tr",
      phone: "+90 537 678 9012",
      position: "Network Operasyon Müdürü",
      department: "Network ve Altyapı",
      status: "active",
      completedCourses: 10,
      assignedCourses: 15,
      completionRate: 67,
      hireDate: "15.11.2020",
      image: "/images/avatars/avatar-6.jpg",
      skills: ["Süreç Optimizasyonu", "Tedarik Zinciri", "Kalite Kontrol"],
      lastActive: "1 saat önce"
    },
  ];

  // Departman verileri
  const departments = [
    { name: "Bireysel Satış", employeeCount: 3240, color: "#005f9e" },
    { name: "Kurumsal Satış", employeeCount: 1850, color: "#0090c8" },
    { name: "İnsan Kaynakları", employeeCount: 320, color: "#364f6b" },
    { name: "Müşteri Deneyimi", employeeCount: 780, color: "#00487a" },
    { name: "Dijital Çözümler", employeeCount: 450, color: "#8cd0ff" },
    { name: "Network ve Altyapı", employeeCount: 2810, color: "#e0f0fa" }
  ];

  // İstatistik verileri
  const stats = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter(e => e.status === "active").length,
    newEmployees: 3,
    avgCompletionRate: Math.round(employees.reduce((sum, emp) => sum + emp.completionRate, 0) / employees.length),
    departmentCount: departments.length
  };

  // Filtreleme ve sıralama
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      // Arama filtresi
      const matchesSearch = 
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Durum filtresi
      const matchesStatus = statusFilter === "all" || employee.status === statusFilter;
      
      // Departman filtresi
      const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter;
      
      // Görünüm filtresi
      const matchesView = currentView === "all" || 
        (currentView === "high-completion" && employee.completionRate >= 80) ||
        (currentView === "low-completion" && employee.completionRate < 50);
        
      return matchesSearch && matchesStatus && matchesDepartment && matchesView;
    });
  }, [employees, searchQuery, statusFilter, departmentFilter, currentView]);

  // Sıralama
  const sortedEmployees = useMemo(() => {
    return [...filteredEmployees].sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "department") {
        comparison = a.department.localeCompare(b.department);
      } else if (sortBy === "position") {
        comparison = a.position.localeCompare(b.position);
      } else if (sortBy === "completionRate") {
        comparison = a.completionRate - b.completionRate;
      } else if (sortBy === "hireDate") {
        const dateA = new Date(a.hireDate.split('.').reverse().join('-'));
        const dateB = new Date(b.hireDate.split('.').reverse().join('-'));
        comparison = dateA.getTime() - dateB.getTime();
      }
      
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [filteredEmployees, sortBy, sortOrder]);

  // Sıralama değiştirme
  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  // Departmanlara göre çalışan dağılımı
  const employeesByDepartment = departments.map(dept => {
    return {
      ...dept,
      employeeCount: employees.filter(emp => emp.department === dept.name).length
    };
  });

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Turkcell Ekip Yönetimi</h1>
          <p className="text-muted-foreground">Turkcell ekibinin eğitim, gelişim ve performansını takip edin</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="gap-1 border-[#005f9e]/30 text-[#005f9e] hover:bg-[#005f9e]/10">
            <FileSpreadsheet size={16} /> Dışa Aktar
          </Button>
          <Button size="sm" className="gap-1 bg-[#005f9e] hover:bg-[#00487a]">
            <UserPlus size={16} /> Yeni Personel
          </Button>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-[#005f9e]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Personel</CardTitle>
            <div className="p-2 bg-[#005f9e]/10 rounded-full">
              <Users size={18} className="text-[#005f9e]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-emerald-500">+{stats.newEmployees}</span> son 30 günde
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-[#0090c8]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Personel</CardTitle>
            <div className="p-2 bg-[#0090c8]/10 rounded-full">
              <UserCheck size={18} className="text-[#0090c8]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeEmployees}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-emerald-500">%{Math.round((stats.activeEmployees / stats.totalEmployees) * 100)}</span> aktif oranı
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-[#3fc1c9]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departman Sayısı</CardTitle>
            <div className="p-2 bg-[#3fc1c9]/10 rounded-full">
              <Building2 size={18} className="text-[#3fc1c9]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.departmentCount}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-[#3fc1c9]">{departments[0].name}</span> en büyük departman
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-[#00487a]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Tamamlama</CardTitle>
            <div className="p-2 bg-[#00487a]/10 rounded-full">
              <BarChart2 size={18} className="text-[#00487a]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">%{stats.avgCompletionRate}</div>
            <Progress value={stats.avgCompletionRate} className="h-2 mt-2 bg-[#e0f0fa]" indicatorClassName="bg-[#005f9e]" />
          </CardContent>
        </Card>
      </div>

      {/* Filtreler ve Arama */}
      <Card className="border-[#005f9e]/20">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="İsim veya e-posta ile ara..."
                className="pl-8 border-[#005f9e]/30 focus-visible:ring-[#005f9e]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1 border-[#005f9e]/30 text-[#005f9e] hover:bg-[#005f9e]/10">
                    <Building2 size={16} /> Departman <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-md shadow-lg border border-[#e0f0fa]/50">
                  <DropdownMenuItem onClick={() => setDepartmentFilter("all")}>
                    Tüm Departmanlar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {departments.map((dept, index) => (
                    <DropdownMenuItem key={index} onClick={() => setDepartmentFilter(dept.name)}>
                      <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: dept.color }}></div>
                      {dept.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1 border-[#005f9e]/30 text-[#005f9e] hover:bg-[#005f9e]/10">
                    <ArrowUpDown size={16} /> Sırala <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-md shadow-lg border border-[#e0f0fa]/50">
                  <DropdownMenuItem onClick={() => { setSortBy("name"); setSortOrder("asc"); }}>
                    İsim (A-Z)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setSortBy("name"); setSortOrder("desc"); }}>
                    İsim (Z-A)
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { setSortBy("department"); setSortOrder("asc"); }}>
                    Departman (A-Z)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setSortBy("completionRate"); setSortOrder("desc"); }}>
                    Yüksek Tamamlama Oranı
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setSortBy("completionRate"); setSortOrder("asc"); }}>
                    Düşük Tamamlama Oranı
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { setSortBy("hireDate"); setSortOrder("desc"); }}>
                    Yeni Personel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setSortBy("hireDate"); setSortOrder("asc"); }}>
                    Eski Personel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personel Listesi */}
      <div className="bg-white rounded-lg border border-[#005f9e]/20 overflow-hidden">
        <div className="overflow-x-auto">
              <Table>
            <TableHeader className="bg-[#e0f0fa]">
                  <TableRow>
                <TableHead className="text-[#005f9e]">Personel</TableHead>
                <TableHead className="text-[#005f9e]">Departman</TableHead>
                <TableHead className="text-[#005f9e]">Pozisyon</TableHead>
                <TableHead className="text-[#005f9e]">Eğitim Durumu</TableHead>
                <TableHead className="text-[#005f9e]">Son Aktivite</TableHead>
                <TableHead className="text-right text-[#005f9e]">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
              {employees.map((employee) => (
                    <TableRow key={employee.id}>
                  <TableCell className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={employee.image} alt={employee.name} />
                      <AvatarFallback>
                        {employee.name.split(' ').map(name => name[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-muted-foreground">{employee.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                    <Badge variant="outline" className="border-[#005f9e]/30 text-[#005f9e]">
                      {employee.department}
                    </Badge>
                      </TableCell>
                  <TableCell>{employee.position}</TableCell>
                      <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Tamamlanan</span>
                        <span className="text-[#005f9e]">{employee.completedCourses}/{employee.assignedCourses}</span>
                        </div>
                      <Progress value={employee.completionRate} className="h-1.5 bg-[#e0f0fa]" indicatorClassName="bg-[#005f9e]" />
                        </div>
                      </TableCell>
                      <TableCell>
                    <div className="text-sm text-muted-foreground">{employee.lastActive}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-md shadow-lg border border-[#e0f0fa]/50">
                            <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Users size={14} className="mr-2" /> Profili Görüntüle
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserCog size={14} className="mr-2" /> Düzenle
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BookOpen size={14} className="mr-2" /> Eğitimleri Yönet
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare size={14} className="mr-2" /> Mesaj Gönder
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">
                          <Trash2 size={14} className="mr-2" /> Personeli Sil
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
                    </div>
                  </div>

      {/* Departman Dağılımı */}
      <Card className="border-[#005f9e]/20">
        <CardHeader>
          <CardTitle className="text-[#005f9e]">Departman Dağılımı</CardTitle>
          <CardDescription>
            Turkcell departmanlarına göre personel dağılımı
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departments.map((dept) => (
              <div key={dept.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }}></div>
                    <span className="font-medium">{dept.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{dept.employeeCount} personel</span>
                </div>
                <div className="h-2 rounded-full bg-[#e0f0fa]">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${(dept.employeeCount / Math.max(...departments.map(d => d.employeeCount))) * 100}%`,
                      backgroundColor: dept.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 