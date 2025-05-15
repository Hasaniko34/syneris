"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building,
  Users,
  Clock,
  Calendar,
  BarChart2,
  LineChart,
  PieChart,
  FileText,
  ChevronRight,
  Search,
  CreditCard,
  Wallet,
  ArrowUpRight,
  UserPlus,
  ArrowDownRight,
  FilterIcon,
  SortDesc,
  Check,
  X,
  ExternalLink
} from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function SubeYonetimiPage() {
  const [activeTab, setActiveTab] = useState("performans");

  // Örnek şube performans verileri
  const subeler = [
    { 
      id: 1, 
      ad: "TEB Merkez Şube", 
      musteri: 4580, 
      yeniMusteri: 35, 
      aktifCalisanlar: 28, 
      hedefGerceklesme: 97, 
      gelir: 3245000,
      krediKullandirimi: 2450000,
      mevduatArtisi: 1650000
    },
    { 
      id: 2, 
      ad: "TEB Kadıköy Şube", 
      musteri: 3250, 
      yeniMusteri: 22, 
      aktifCalisanlar: 18, 
      hedefGerceklesme: 93, 
      gelir: 2180000,
      krediKullandirimi: 1850000,
      mevduatArtisi: 1250000
    },
    { 
      id: 3, 
      ad: "TEB Bakırköy Şube", 
      musteri: 2850, 
      yeniMusteri: 18, 
      aktifCalisanlar: 14, 
      hedefGerceklesme: 91, 
      gelir: 1950000,
      krediKullandirimi: 1450000,
      mevduatArtisi: 980000
    },
    { 
      id: 4, 
      ad: "TEB Beşiktaş Şube", 
      musteri: 3150, 
      yeniMusteri: 29, 
      aktifCalisanlar: 16, 
      hedefGerceklesme: 95, 
      gelir: 2350000,
      krediKullandirimi: 1650000,
      mevduatArtisi: 1420000
    }
  ];

  // Sayfadaki animasyon için varyantlar
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Başlık Bölümü */}
      <motion.div 
        variants={itemVariants} 
        className="flex flex-col md:flex-row justify-between items-start gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#005f9e]">Şube Yönetimi</h1>
          <p className="text-muted-foreground mt-1">
            TEB şube operasyonları, performans takibi ve yönetimi
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-[#005f9e] text-[#005f9e]">
            <FileText className="mr-2 h-4 w-4" />
            Raporlar
          </Button>
          <Button className="bg-[#005f9e]">
            <Building className="mr-2 h-4 w-4" />
            Şube Ekle
          </Button>
        </div>
      </motion.div>

      {/* Özet Kartlar */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card className="border-[#005f9e]/20">
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Toplam Şube</p>
                <p className="text-2xl font-bold">486</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">+4</span> önceki çeyreğe göre
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#e0f0fa]">
                <Building className="h-8 w-8 text-[#005f9e]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#005f9e]/20">
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Toplam Çalışan</p>
                <p className="text-2xl font-bold">7,245</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">+152</span> önceki çeyreğe göre
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#e0f0fa]">
                <Users className="h-8 w-8 text-[#005f9e]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#005f9e]/20">
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Toplam Müşteri</p>
                <p className="text-2xl font-bold">1.8M</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">+3.2%</span> önceki aya göre
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#e0f0fa]">
                <UserPlus className="h-8 w-8 text-[#005f9e]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#005f9e]/20">
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Hedef Gerçekleşme</p>
                <p className="text-2xl font-bold">92%</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <ArrowDownRight className="h-3 w-3 text-amber-500 mr-1" />
                  <span className="text-amber-500 font-medium">-1.5%</span> hedefe kalan
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#e0f0fa]">
                <BarChart2 className="h-8 w-8 text-[#005f9e]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Ana İçerik - Sekmeler */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="performans" className="data-[state=active]:bg-[#e0f0fa] data-[state=active]:text-[#005f9e]">
              <BarChart2 className="mr-2 h-4 w-4" /> Şube Performansı
            </TabsTrigger>
            <TabsTrigger value="calisanlar" className="data-[state=active]:bg-[#e0f0fa] data-[state=active]:text-[#005f9e]">
              <Users className="mr-2 h-4 w-4" /> Çalışan Yönetimi
            </TabsTrigger>
            <TabsTrigger value="operasyonlar" className="data-[state=active]:bg-[#e0f0fa] data-[state=active]:text-[#005f9e]">
              <Calendar className="mr-2 h-4 w-4" /> Operasyonel Süreçler
            </TabsTrigger>
          </TabsList>

          {/* Şube Performansı İçeriği */}
          <TabsContent value="performans" className="space-y-4">
            {/* Şube Arama ve Filtreleme */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
              <div className="flex-1 sm:max-w-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Şube ara..."
                    className="pl-10 border-[#005f9e]/20 focus-visible:ring-[#005f9e]"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select defaultValue="tum-subeler">
                  <SelectTrigger className="w-[180px] border-[#005f9e]/20 focus:ring-[#005f9e]">
                    <FilterIcon className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filtrele" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tum-subeler">Tüm Şubeler</SelectItem>
                    <SelectItem value="istanbul">İstanbul Şubeleri</SelectItem>
                    <SelectItem value="ankara">Ankara Şubeleri</SelectItem>
                    <SelectItem value="izmir">İzmir Şubeleri</SelectItem>
                    <SelectItem value="yuksek-performans">Yüksek Performanslı</SelectItem>
                    <SelectItem value="dusuk-performans">Düşük Performanslı</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="hedef-gerceklesme">
                  <SelectTrigger className="w-[180px] border-[#005f9e]/20 focus:ring-[#005f9e]">
                    <SortDesc className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sırala" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hedef-gerceklesme">Hedef Gerçekleşme</SelectItem>
                    <SelectItem value="musteri-sayisi">Müşteri Sayısı</SelectItem>
                    <SelectItem value="yeni-musteri">Yeni Müşteri</SelectItem>
                    <SelectItem value="kredi-hacmi">Kredi Hacmi</SelectItem>
                    <SelectItem value="mevduat-hacmi">Mevduat Hacmi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Şube Performans Tablosu */}
            <Card className="border-[#005f9e]/20">
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-[#e0f0fa]/30">
                    <TableRow>
                      <TableHead>Şube Adı</TableHead>
                      <TableHead className="text-right">Müşteri</TableHead>
                      <TableHead className="text-right">Yeni Müşteri</TableHead>
                      <TableHead className="text-right">Çalışan</TableHead>
                      <TableHead className="text-right">Hedef Gerç. (%)</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subeler.map((sube) => (
                      <TableRow key={sube.id}>
                        <TableCell className="font-medium">{sube.ad}</TableCell>
                        <TableCell className="text-right">{sube.musteri.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-0">
                            +{sube.yeniMusteri}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{sube.aktifCalisanlar}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16">
                              <Progress 
                                value={sube.hedefGerceklesme} 
                                className="h-2"
                                indicatorClassName={
                                  sube.hedefGerceklesme >= 95 ? "bg-emerald-500" :
                                  sube.hedefGerceklesme >= 90 ? "bg-[#005f9e]" :
                                  "bg-amber-500"
                                } 
                              />
                            </div>
                            <span className="font-medium">{sube.hedefGerceklesme}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/dashboard/sube-yonetimi/${sube.id}`}>
                              <span className="text-[#005f9e]">Detay</span>
                              <ChevronRight className="ml-1 h-4 w-4 text-[#005f9e]" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="border-t p-4 bg-[#e0f0fa]/20">
                <div className="text-xs text-muted-foreground">Toplam 486 şubenin 4'ü gösteriliyor</div>
                <div className="ml-auto flex gap-2">
                  <Button variant="outline" size="sm" className="border-[#005f9e]/20 text-[#005f9e]">
                    Önceki
                  </Button>
                  <Button variant="outline" size="sm" className="border-[#005f9e]/20 text-[#005f9e]">
                    Sonraki
                  </Button>
                </div>
              </CardFooter>
            </Card>

            {/* Performans Grafikleri */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Card className="border-[#005f9e]/20">
                <CardHeader>
                  <CardTitle className="text-lg text-[#005f9e]">Kredi Kullandırım Performansı</CardTitle>
                  <CardDescription>Son 6 aylık şube kredi kullandırım hacimleri</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center bg-[#e0f0fa]/20 rounded-md">
                    <div className="text-center">
                      <LineChart className="h-10 w-10 mx-auto mb-4 text-[#005f9e]" />
                      <p className="text-sm text-muted-foreground">Kredi kullandırım grafiği</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#005f9e]/20">
                <CardHeader>
                  <CardTitle className="text-lg text-[#005f9e]">Mevduat Artış Performansı</CardTitle>
                  <CardDescription>Son 6 aylık şube mevduat hacmi değişimleri</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center bg-[#e0f0fa]/20 rounded-md">
                    <div className="text-center">
                      <BarChart2 className="h-10 w-10 mx-auto mb-4 text-[#005f9e]" />
                      <p className="text-sm text-muted-foreground">Mevduat artış grafiği</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Çalışan Yönetimi İçeriği */}
          <TabsContent value="calisanlar" className="space-y-4">
            <Card className="border-[#005f9e]/20">
              <CardHeader>
                <CardTitle className="text-[#005f9e]">Çalışan Yönetimi</CardTitle>
                <CardDescription>Şube çalışan dağılımı ve performans takibi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <Users className="h-16 w-16 mx-auto mb-4 text-[#005f9e]/50" />
                    <p className="text-muted-foreground">Bu sekme içeriği geliştirme aşamasındadır.</p>
                    <Button className="mt-4 bg-[#005f9e]">Çalışan Yönetimi Modülünü Aç</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Operasyonel Süreçler İçeriği */}
          <TabsContent value="operasyonlar" className="space-y-4">
            <Card className="border-[#005f9e]/20">
              <CardHeader>
                <CardTitle className="text-[#005f9e]">Operasyonel Süreçler</CardTitle>
                <CardDescription>Şube operasyonları ve süreç kontrolleri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-[#005f9e]/50" />
                    <p className="text-muted-foreground">Bu sekme içeriği geliştirme aşamasındadır.</p>
                    <Button className="mt-4 bg-[#005f9e]">Operasyon Takip Sistemi'ni Aç</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Son Güncellemeler */}
      <motion.div variants={itemVariants} className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-[#005f9e] flex items-center">
          <FileText className="mr-2 h-5 w-5" /> Son Duyurular
        </h2>
        <div className="space-y-3">
          {[
            {
              title: "TEB Üsküdar Şubesi Açılış Tarihi Güncellendi",
              date: "Bugün",
              status: "Bilgilendirme"
            },
            {
              title: "2023 Q4 Şube Performans Değerlendirmeleri Tamamlandı",
              date: "2 gün önce",
              status: "Rapor"
            },
            {
              title: "Şube Dijital Dönüşüm Süreci Başladı",
              date: "1 hafta önce",
              status: "Proje"
            }
          ].map((duyuru, i) => (
            <Card key={i} className="border-[#005f9e]/20 hover:border-[#005f9e]/40 hover:shadow-sm transition-all">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e0f0fa] flex items-center justify-center">
                    <FileText className="h-4 w-4 text-[#005f9e]" />
                  </div>
                  <div>
                    <h3 className="font-medium">{duyuru.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground">{duyuru.date}</span>
                      <Badge variant="outline" className="bg-[#e0f0fa] text-[#005f9e] border-0">
                        {duyuru.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-[#005f9e]">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
} 