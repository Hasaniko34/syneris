"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Building2, 
  Users, 
  BookOpen, 
  BarChart2, 
  Plus, 
  Search, 
  ArrowLeft, 
  Pencil, 
  Trash2, 
  ArrowUpDown,
  Check,
  X,
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DepartmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Departman bilgileri
  const departments = [
    { id: 1, name: "Yönetim", employeeCount: 12, completionRate: 92, color: "#8b5cf6", manager: "Ahmet Yılmaz", status: "active" },
    { id: 2, name: "Satış & Pazarlama", employeeCount: 38, completionRate: 76, color: "#3b82f6", manager: "Ayşe Kaya", status: "active" },
    { id: 3, name: "İnsan Kaynakları", employeeCount: 15, completionRate: 88, color: "#ec4899", manager: "Mehmet Demir", status: "active" },
    { id: 4, name: "Finans", employeeCount: 22, completionRate: 82, color: "#14b8a6", manager: "Zeynep Yıldız", status: "active" },
    { id: 5, name: "Bilgi Teknolojileri", employeeCount: 35, completionRate: 73, color: "#f97316", manager: "Can Özkan", status: "active" },
    { id: 6, name: "Operasyon", employeeCount: 34, completionRate: 68, color: "#84cc16", manager: "Elif Şahin", status: "active" },
    { id: 7, name: "Ar-Ge", employeeCount: 18, completionRate: 79, color: "#6366f1", manager: "Burak Aydın", status: "inactive" },
  ];

  // Arama filtreleme
  const filteredDepartments = departments.filter(
    (dept) => dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              dept.manager.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sıralama state
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Sıralama fonksiyonu
  const sortedDepartments = [...filteredDepartments].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === "employeeCount") {
      comparison = a.employeeCount - b.employeeCount;
    } else if (sortBy === "completionRate") {
      comparison = a.completionRate - b.completionRate;
    } else if (sortBy === "manager") {
      comparison = a.manager.localeCompare(b.manager);
    }
    
    return sortOrder === "asc" ? comparison : -comparison;
  });

  // Sıralama değiştirme
  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/company">
              <ArrowLeft size={16} />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Departmanlar</h1>
        </div>
        <Button className="gap-2">
          <Plus size={16} /> Yeni Departman
        </Button>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Departman</CardTitle>
            <Building2 size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
            <p className="text-xs text-muted-foreground">Aktif ve pasif dahil</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Çalışan</CardTitle>
            <Users size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {departments.reduce((sum, dept) => sum + dept.employeeCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Tüm departmanlarda</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Tamamlama</CardTitle>
            <BarChart2 size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              %{Math.round(departments.reduce((sum, dept) => sum + dept.completionRate, 0) / departments.length)}
            </div>
            <p className="text-xs text-muted-foreground">Eğitim tamamlama</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Departmanlar</CardTitle>
            <Building2 size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {departments.filter(dept => dept.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Aktif çalışan departmanlar</p>
          </CardContent>
        </Card>
      </div>

      {/* Arama ve filtreleme */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Departman veya yönetici ara..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    Filtrele <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Tüm Departmanlar</DropdownMenuItem>
                  <DropdownMenuItem>Aktif Departmanlar</DropdownMenuItem>
                  <DropdownMenuItem>Pasif Departmanlar</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Eğitim Oranı %80+</DropdownMenuItem>
                  <DropdownMenuItem>Eğitim Oranı %50-79</DropdownMenuItem>
                  <DropdownMenuItem>Eğitim Oranı %50-</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    Sırala <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => { setSortBy("name"); setSortOrder("asc"); }}>
                    İsme Göre (A-Z)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setSortBy("name"); setSortOrder("desc"); }}>
                    İsme Göre (Z-A)
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { setSortBy("employeeCount"); setSortOrder("desc"); }}>
                    Çalışan Sayısı (Çok-Az)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setSortBy("employeeCount"); setSortOrder("asc"); }}>
                    Çalışan Sayısı (Az-Çok)
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { setSortBy("completionRate"); setSortOrder("desc"); }}>
                    Tamamlama Oranı (Yüksek-Düşük)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setSortBy("completionRate"); setSortOrder("asc"); }}>
                    Tamamlama Oranı (Düşük-Yüksek)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Departman Tablosu */}
      <Card className="shadow-sm">
        <CardHeader className="py-4">
          <CardTitle>Departman Listesi</CardTitle>
          <CardDescription>
            Şirketinizdeki tüm departmanlar ve detayları
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px] cursor-pointer" onClick={() => toggleSort("name")}>
                  <div className="flex items-center gap-1">
                    Departman Adı
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => toggleSort("employeeCount")}>
                  <div className="flex items-center gap-1">
                    Çalışan Sayısı
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => toggleSort("completionRate")}>
                  <div className="flex items-center gap-1">
                    Tamamlama Oranı
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => toggleSort("manager")}>
                  <div className="flex items-center gap-1">
                    Departman Yöneticisi
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedDepartments.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }}></div>
                      <span className="font-medium">{dept.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users size={14} className="text-muted-foreground" />
                      {dept.employeeCount}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span>%{dept.completionRate}</span>
                        <Badge 
                          variant={dept.completionRate >= 80 ? "default" : 
                                 dept.completionRate >= 50 ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {dept.completionRate >= 80 ? "Yüksek" : 
                           dept.completionRate >= 50 ? "Orta" : "Düşük"}
                        </Badge>
                      </div>
                      <Progress 
                        value={dept.completionRate} 
                        className="h-2"
                        style={{ backgroundColor: `${dept.color}30` }}
                      >
                        <div className="h-full" style={{ backgroundColor: dept.color }}></div>
                      </Progress>
                    </div>
                  </TableCell>
                  <TableCell>
                    {dept.manager}
                  </TableCell>
                  <TableCell>
                    {dept.status === "active" ? (
                      <Badge className="bg-green-500">
                        <Check size={14} className="mr-1" /> Aktif
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">
                        <X size={14} className="mr-1" /> Pasif
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/dashboard/company/departments/${dept.id}`}>
                          <Users size={14} />
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Pencil size={14} />
                      </Button>
                      <Button variant="outline" size="icon" className="text-red-500">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 