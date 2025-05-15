"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Download, 
  Filter, 
  Search, 
  Calendar, 
  BarChart,
  UserCircle,
  TrendingUp,
  CheckCircle, 
  Clock
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
import Link from "next/link";

interface UserProgressData {
  id: string;
  name: string;
  email: string;
  department: string;
  completedTrainings: number;
  inProgressTrainings: number;
  averageScore: number;
  timeSpent: string;
  lastActive: string;
}

// Örnek veri
const dummyUserProgress: UserProgressData[] = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@sirket.com",
    department: "Yazılım Geliştirme",
    completedTrainings: 8,
    inProgressTrainings: 2,
    averageScore: 92,
    timeSpent: "24s 36d",
    lastActive: "Bugün"
  },
  {
    id: "2",
    name: "Ayşe Demir",
    email: "ayse.demir@sirket.com",
    department: "İnsan Kaynakları",
    completedTrainings: 5,
    inProgressTrainings: 1,
    averageScore: 88,
    timeSpent: "15s 20d",
    lastActive: "Dün"
  },
  {
    id: "3",
    name: "Mehmet Kaya",
    email: "mehmet.kaya@sirket.com",
    department: "Pazarlama",
    completedTrainings: 12,
    inProgressTrainings: 0,
    averageScore: 95,
    timeSpent: "32s 45d",
    lastActive: "3 gün önce"
  },
  {
    id: "4",
    name: "Zeynep Çelik",
    email: "zeynep.celik@sirket.com",
    department: "Finans",
    completedTrainings: 6,
    inProgressTrainings: 3,
    averageScore: 82,
    timeSpent: "18s 30d",
    lastActive: "1 hafta önce"
  },
  {
    id: "5",
    name: "Can Öztürk",
    email: "can.ozturk@sirket.com",
    department: "Yazılım Geliştirme",
    completedTrainings: 15,
    inProgressTrainings: 1,
    averageScore: 90,
    timeSpent: "38s 15d",
    lastActive: "Bugün"
  }
];

export default function UserProgressPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("all");
  
  const filteredUsers = dummyUserProgress.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = department === "all" || user.department === department;
    
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(dummyUserProgress.map(user => user.department))];
  
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
            <h1 className="text-3xl font-bold tracking-tight">Kullanıcı İlerleme Raporları</h1>
            <p className="text-muted-foreground">
              Kullanıcıların eğitim ve öğrenme ilerlemelerini analiz edin.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Raporu İndir
          </Button>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Dönem Seç
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
            <UserCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dummyUserProgress.length}</div>
            <p className="text-xs text-muted-foreground">
              Aktif kullanıcılar
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamamlanan Eğitimler</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dummyUserProgress.reduce((sum, user) => sum + user.completedTrainings, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Toplam tamamlanan eğitimler
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Puan</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(dummyUserProgress.reduce((sum, user) => sum + user.averageScore, 0) / dummyUserProgress.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Tüm kullanıcıların ortalaması
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Süre</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127 saat</div>
            <p className="text-xs text-muted-foreground">
              Eğitimlerde geçirilen süre
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>İlerleme Özeti Tablosu</CardTitle>
          <CardDescription>
            Kullanıcıların eğitim ilerlemeleri ve performans metrikleri
          </CardDescription>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Kullanıcı ara..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tüm Departmanlar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Departmanlar</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
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
            <TableHeader>
              <TableRow>
                <TableHead>Kullanıcı</TableHead>
                <TableHead>Departman</TableHead>
                <TableHead className="text-center">Tamamlanan Eğitimler</TableHead>
                <TableHead className="text-center">Devam Eden Eğitimler</TableHead>
                <TableHead className="text-center">Ortalama Puan</TableHead>
                <TableHead className="text-center">Geçirilen Süre</TableHead>
                <TableHead className="text-center">Son Aktivite</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell className="text-center">{user.completedTrainings}</TableCell>
                  <TableCell className="text-center">{user.inProgressTrainings}</TableCell>
                  <TableCell className="text-center">
                    <span className={user.averageScore >= 90 ? "text-green-500 font-medium" : 
                                    user.averageScore >= 80 ? "text-blue-500 font-medium" : 
                                    "text-amber-500 font-medium"}>
                      {user.averageScore}%
                    </span>
                  </TableCell>
                  <TableCell className="text-center">{user.timeSpent}</TableCell>
                  <TableCell className="text-center">{user.lastActive}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="justify-between border-t px-6 py-4">
          <div className="text-sm text-muted-foreground">
            Toplam <strong>{filteredUsers.length}</strong> kullanıcı gösteriliyor
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm" disabled>
              Önceki
            </Button>
            <Button variant="outline" size="sm">
              Sonraki
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 