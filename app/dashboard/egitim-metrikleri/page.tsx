'use client';

import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Download, 
  BarChart, 
  Filter, 
  ChevronDown 
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';

// Turkcell Kurumsal Renkleri
const turkcellColors = {
  primary: "rgb(255, 199, 44)", // #ffc72c - Turkcell sarı
  secondary: "rgb(51, 51, 51)", // #333333 - Koyu gri
  accent: "rgb(0, 160, 210)", // #00A0D2 - Mavi
  highlight: "rgb(231, 76, 60)", // #e74c3c - Kırmızı
  dark: "rgb(41, 128, 185)" // #2980b9 - Koyu mavi
};

export default function EgitimMetrikleriPage() {
  const [kategoriFiltresi, setKategoriFiltresi] = useState('Tüm Kategoriler');
  
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Turkcell Eğitim Etkinliği Metrikleri</h1>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Raporu İndir
        </Button>
      </div>
      
      <p className="text-muted-foreground mb-8">
        Turkcell eğitimlerinin etkinliğini, tamamlanma oranlarını ve çalışan memnuniyetini analiz edin.
      </p>
      
      {/* Filtre Seçenekleri */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <Select value={kategoriFiltresi} onValueChange={setKategoriFiltresi}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Kategori Seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Tüm Kategoriler">Tüm Kategoriler</SelectItem>
            <SelectItem value="CRM ve Abone Yönetimi">CRM ve Abone Yönetimi</SelectItem>
            <SelectItem value="Faturalama ve Kampanya">Faturalama ve Kampanya</SelectItem>
            <SelectItem value="Saha Operasyonları">Saha Operasyonları</SelectItem>
            <SelectItem value="BiP Destek Süreçleri">BiP Destek Süreçleri</SelectItem>
            <SelectItem value="Dijital Kanal Yönetimi">Dijital Kanal Yönetimi</SelectItem>
          </SelectContent>
        </Select>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Daha Fazla Filtre
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Çağrı Merkezi Ekibi</DropdownMenuItem>
            <DropdownMenuItem>Saha Operasyon Ekibi</DropdownMenuItem>
            <DropdownMenuItem>Back-Office Ekibi</DropdownMenuItem>
            <DropdownMenuItem>Yeni Başlayanlar</DropdownMenuItem>
            <DropdownMenuItem>Deneyimli Çalışanlar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Özet Metrikler */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold text-[#ffc72c]">4.4/5</div>
              <div className="text-sm text-muted-foreground mt-2">Ortalama kullanıcı memnuniyeti</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold text-[#ffc72c]">79%</div>
              <div className="text-sm text-muted-foreground mt-2">Ortalama eğitim tamamlama</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold text-[#ffc72c]">86%</div>
              <div className="text-sm text-muted-foreground mt-2">Başarı değerlendirmesi</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold text-[#ffc72c]">670</div>
              <div className="text-sm text-muted-foreground mt-2">Tüm eğitimlerde toplam</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Sekme Butonları */}
      <div className="grid grid-cols-3 gap-2 mb-8">
        <Button variant="outline" className="bg-[#ffc72c]/10 border-[#ffc72c]/30 text-[#333333] hover:bg-[#ffc72c]/20">
          Eğitim Listesi
        </Button>
        <Button variant="outline" className="bg-white border-[#ffc72c]/30 text-[#333333] hover:bg-[#ffc72c]/10">
          Tamamlanma Analizi
        </Button>
        <Button variant="outline" className="bg-white border-[#ffc72c]/30 text-[#333333] hover:bg-[#ffc72c]/10">
          Geri Bildirim Analizi
        </Button>
      </div>
      
      {/* Eğitim Etkinlik Tablosu */}
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Turkcell Eğitimlerinin Etkinlik Analizi</CardTitle>
          <p className="text-sm text-muted-foreground">
            Turkcell eğitimlerinin departman bazında etkinlik ve verimlilik metrikleri
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Eğitim Adı</th>
                  <th className="text-left py-3 px-4 font-medium">Kategori</th>
                  <th className="text-center py-3 px-4 font-medium">
                    <div className="flex items-center justify-center">
                      Tamamlanma
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 font-medium">
                    <div className="flex items-center justify-center">
                      Ortalama
                      <br />Puan
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 font-medium">Memnuniyet</th>
                  <th className="text-center py-3 px-4 font-medium">Süre</th>
                  <th className="text-center py-3 px-4 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">Yeni Numara Tahsis İşlemi</td>
                  <td className="py-3 px-4">CRM ve Abone Yönetimi</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center">
                      <span className="font-medium mr-2">92%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">91%</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center">
                      <span>4.8</span>
                      <span className="text-yellow-500 ml-1">★</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">3s 40d</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center">
                      <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">+5.2%</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">Kurumsal Müşteri VPN Oluşturma</td>
                  <td className="py-3 px-4">Kurumsal Hizmetler</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center">
                      <span className="font-medium mr-2">89%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">92%</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center">
                      <span>4.7</span>
                      <span className="text-yellow-500 ml-1">★</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">4s 30d</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center">
                      <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">+3.1%</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">BiP Destek Süreci Yönetimi</td>
                  <td className="py-3 px-4">BiP Destek Süreçleri</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center">
                      <span className="font-medium mr-2">88%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">90%</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center">
                      <span>4.6</span>
                      <span className="text-yellow-500 ml-1">★</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">4s 15d</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center">
                      <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">+1.5%</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">Saha Operasyonları BTS Kurulumu</td>
                  <td className="py-3 px-4">Saha Operasyonları</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center">
                      <span className="font-medium mr-2">82%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">88%</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center">
                      <span>4.5</span>
                      <span className="text-yellow-500 ml-1">★</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">6s 20d</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center">
                      <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">+2.3%</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">Faturalama Editörü Kampanya Tanımlama</td>
                  <td className="py-3 px-4">Faturalama ve Kampanya</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center">
                      <span className="font-medium mr-2">76%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">83%</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center">
                      <span>4.1</span>
                      <span className="text-yellow-500 ml-1">★</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">5s 30d</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center">
                      <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-800">-0.5%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Departman Bazlı Analiz */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Departman Bazlı Tamamlanma Oranları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Çağrı Merkezi</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Saha Operasyon</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Back-Office</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Teknik Destek</span>
                  <span className="text-sm font-medium">81%</span>
                </div>
                <Progress value={81} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Müşteri İlişkileri</span>
                  <span className="text-sm font-medium">89%</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Eğitim Kategorisi Bazlı Memnuniyet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">CRM ve Abone Yönetimi</span>
                  <span className="text-sm font-medium">4.7/5</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Faturalama ve Kampanya</span>
                  <span className="text-sm font-medium">4.2/5</span>
                </div>
                <Progress value={84} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Saha Operasyonları</span>
                  <span className="text-sm font-medium">4.5/5</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">BiP Destek Süreçleri</span>
                  <span className="text-sm font-medium">4.6/5</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Dijital Kanal Yönetimi</span>
                  <span className="text-sm font-medium">4.3/5</span>
                </div>
                <Progress value={86} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Öğrenme Süresi ve Verimlilik */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Öğrenme Süresi ve Verimlilik Analizi</CardTitle>
          <p className="text-sm text-muted-foreground">
            Ortalama eğitim tamamlama süreleri ve verimlilik karşılaştırması
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-sm font-medium">Ortalama Eğitim Süresi</div>
              <div className="text-3xl font-bold">4.2 Saat</div>
              <div className="text-sm text-muted-foreground">Tüm eğitimler için ortalama tamamlama süresi</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">Verimlilik Skoru</div>
              <div className="text-3xl font-bold">86%</div>
              <div className="text-sm text-muted-foreground">Eğitim sonrası performans artışı</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">Hata Oranı Azalması</div>
              <div className="text-3xl font-bold">-32%</div>
              <div className="text-sm text-muted-foreground">Eğitim sonrası işlem hatalarındaki azalma</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
