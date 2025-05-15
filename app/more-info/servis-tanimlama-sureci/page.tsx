"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  Clock, 
  FileText, 
  Layers, 
  Monitor, 
  Users, 
  PhoneCall,
  Smartphone,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  PlayCircle,
  Download,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ServisTanimlamaSureciPage() {
  return (
    <div>
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <span>Daha Fazla Bilgi</span>
        <ChevronRight className="mx-1 h-4 w-4" />
        <span className="font-medium text-foreground">Servis Tanımlama Süreci Eğitimleri</span>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Clock size={14} />
          <span>5 dakika okuma</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#FFD100] via-[#00A0D2] to-[#FFD100] text-transparent bg-clip-text">
          Turkcell Servis Tanımlama Süreci Eğitimleri
        </h1>
        
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10">
          <Image 
            src="/images/service-definition.webp" 
            alt="Turkcell Servis Tanımlama Süreci"
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Turkcell Servis İşlemleri Adım Adım Rehberi</h2>
          
          <p>
            Turkcell'in bireysel ve kurumsal hizmetlerinin tanımlanması, aktivasyonu ve yönetimi için gerekli tüm süreçleri 
            adım adım, ekran görüntüleriyle anlatan kapsamlı eğitim içeriği. Bu eğitimler, Turkcell'in CRM sistemleri, 
            abone yönetim platformları ve servis aktivasyon araçlarını etkin kullanmanız için tasarlanmıştır.
          </p>
          
          <div className="bg-[#00A0D2]/10 border border-[#00A0D2]/20 rounded-lg p-5 my-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-[#00A0D2] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-[#00A0D2] mb-2">Önemli Güncelleme</h3>
                <p className="text-sm text-muted-foreground mb-0">
                  10 Mayıs 2024 tarihi itibariyle ATLAS müşteri yönetim sistemine gelen güncellemeler ile servis tanımlama 
                  süreçlerinde değişiklikler yapılmıştır. Lütfen en güncel eğitim modüllerini takip ettiğinizden emin olun.
                  Yeni süreç, özellikle "Tarife Değişikliği" ve "Paket Tanımlama" ekranlarını etkilemektedir.
                </p>
              </div>
            </div>
          </div>
          
          <h2>Bireysel Müşteri Servis İşlemleri</h2>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card className="border-[#00A0D2]/30">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-full bg-[#00A0D2]/10">
                    <Smartphone className="h-6 w-6 text-[#00A0D2]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Bireysel Hat Aktivasyonu</h3>
                    <p className="text-muted-foreground text-sm">
                      Yeni hat aktivasyonu, numara taşıma ve eSIM tanımlama süreçlerinin detaylı anlatımı.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline" className="bg-[#00A0D2]/10">ATLAS CRM</Badge>
                      <Badge variant="outline" className="bg-[#00A0D2]/10">Biyometrik Doğrulama</Badge>
                      <Badge variant="outline" className="bg-[#00A0D2]/10">MNP İşlemleri</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Ekran Görüntülü İçerikler</h4>
                    <span className="text-xs text-muted-foreground">12 adım</span>
                  </div>
                  
                  <div className="space-y-3 mt-3">
                    <div className="flex gap-3 items-center">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <PlayCircle className="h-4 w-4 text-[#00A0D2]" />
                      </Button>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium">MERNİS Doğrulama ve Kimlik Tarama</h5>
                        <p className="text-xs text-muted-foreground">03:24 • Video Eğitim</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 items-center">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <PlayCircle className="h-4 w-4 text-[#00A0D2]" />
                      </Button>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium">Tarife ve Paket Seçimi</h5>
                        <p className="text-xs text-muted-foreground">04:12 • Video Eğitim</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 items-center">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <FileText className="h-4 w-4 text-[#00A0D2]" />
                      </Button>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium">Aktivasyon Kontrol Listesi</h5>
                        <p className="text-xs text-muted-foreground">PDF Doküman • 2 sayfa</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#FFD100]/30">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-full bg-[#FFD100]/10">
                    <Layers className="h-6 w-6 text-[#FFD100]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Paket ve Tarife Değişimi</h3>
                    <p className="text-muted-foreground text-sm">
                      Mevcut aboneler için tarife değişikliği, ek paket tanımlama ve otomatik yenileme ayarları.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline" className="bg-[#FFD100]/10">Tarife Yükseltme</Badge>
                      <Badge variant="outline" className="bg-[#FFD100]/10">Ek Paketler</Badge>
                      <Badge variant="outline" className="bg-[#FFD100]/10">Kampanya Tanımlama</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Ekran Görüntülü İçerikler</h4>
                    <span className="text-xs text-muted-foreground">9 adım</span>
                  </div>
                  
                  <div className="space-y-3 mt-3">
                    <div className="flex gap-3 items-center">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <PlayCircle className="h-4 w-4 text-[#FFD100]" />
                      </Button>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium">Kampanya Uygunluk Kontrolü</h5>
                        <p className="text-xs text-muted-foreground">02:38 • Video Eğitim</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 items-center">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <FileText className="h-4 w-4 text-[#FFD100]" />
                      </Button>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium">Tarife Karşılaştırma Araçları</h5>
                        <p className="text-xs text-muted-foreground">Interaktif Demo • 8 ekran</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 items-center">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <PlayCircle className="h-4 w-4 text-[#FFD100]" />
                      </Button>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium">Fatura Döngüsü ve Ücretlendirme</h5>
                        <p className="text-xs text-muted-foreground">03:51 • Video Eğitim</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <h2>Kurumsal Müşteri Servis İşlemleri</h2>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card className="border-[#FFD100]/30">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-full bg-[#FFD100]/10">
                    <Users className="h-6 w-6 text-[#FFD100]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Kurumsal Hat Yönetimi</h3>
                    <p className="text-muted-foreground text-sm">
                      Toplu hat aktivasyonu, kurumsal filo yönetimi ve yetkilendirme süreçleri.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline" className="bg-[#FFD100]/10">Kurumsal CRM</Badge>
                      <Badge variant="outline" className="bg-[#FFD100]/10">Yetki Yönetimi</Badge>
                      <Badge variant="outline" className="bg-[#FFD100]/10">Filo Yönetimi</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="space-y-3 mt-3">
                    <div className="flex gap-3 items-center">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <Monitor className="h-4 w-4 text-[#FFD100]" />
                      </Button>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium">Kurumsal Panel Kullanımı</h5>
                        <p className="text-xs text-muted-foreground">Interaktif Demo • 14 ekran</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 items-center">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <FileText className="h-4 w-4 text-[#FFD100]" />
                      </Button>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium">Yetkilendirme Süreci</h5>
                        <p className="text-xs text-muted-foreground">PDF Kılavuz • 5 sayfa</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 items-center">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <Download className="h-4 w-4 text-[#FFD100]" />
                      </Button>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium">Toplu Hat Excel Şablonu</h5>
                        <p className="text-xs text-muted-foreground">Excel Şablon • 120KB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#00A0D2]/30">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-full bg-[#00A0D2]/10">
                    <PhoneCall className="h-6 w-6 text-[#00A0D2]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Kurumsal Özel Servisler</h3>
                    <p className="text-muted-foreground text-sm">
                      Bulut Santral, İş Telefonu, Kurumsal VPN ve diğer özel servis tanımlamaları.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline" className="bg-[#00A0D2]/10">Bulut Santral</Badge>
                      <Badge variant="outline" className="bg-[#00A0D2]/10">VPN Tanımlama</Badge>
                      <Badge variant="outline" className="bg-[#00A0D2]/10">İş Ortağı Ağı</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="space-y-3 mt-3">
                    <div className="flex gap-3 items-center">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <PlayCircle className="h-4 w-4 text-[#00A0D2]" />
                      </Button>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium">Bulut Santral Kurulumu</h5>
                        <p className="text-xs text-muted-foreground">05:42 • Video Eğitim</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 items-center">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <PlayCircle className="h-4 w-4 text-[#00A0D2]" />
                      </Button>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium">İş Telefonu Yapılandırması</h5>
                        <p className="text-xs text-muted-foreground">04:18 • Video Eğitim</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 items-center">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <PlayCircle className="h-4 w-4 text-[#00A0D2]" />
                      </Button>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium">Kurumsal VPN Tanımlama</h5>
                        <p className="text-xs text-muted-foreground">06:23 • Video Eğitim</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <h2>Özel Durumlar ve Hata Yönetimi</h2>
          
          <div className="bg-muted p-5 rounded-xl my-6">
            <h3 className="text-xl font-semibold mb-4">Sık Karşılaşılan Sorunlar ve Çözümleri</h3>
            
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-[#FFD100] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-base font-medium mb-1">MNP-3042 Hata Kodu</h4>
                    <p className="text-sm text-muted-foreground mb-1">
                      Numara taşıma sürecinde karşılaşılan "Verici operatörde taşıma onayı başarısız" hatası.
                    </p>
                    <div className="flex items-center text-sm text-[#00A0D2] font-medium">
                      <ArrowRight className="h-4 w-4 mr-1" />
                      <span>Çözüm için ekran görüntülü kılavuzu görüntüle</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card p-4 rounded-lg border">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-[#FFD100] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-base font-medium mb-1">CRM-1024 Servis Tanımlama Hatası</h4>
                    <p className="text-sm text-muted-foreground mb-1">
                      Paket aktivasyonu sırasında "Ürün kataloğu ile uyumsuzluk" hatası.
                    </p>
                    <div className="flex items-center text-sm text-[#00A0D2] font-medium">
                      <ArrowRight className="h-4 w-4 mr-1" />
                      <span>Çözüm için ekran görüntülü kılavuzu görüntüle</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card p-4 rounded-lg border">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-[#FFD100] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-base font-medium mb-1">BILLING-4055 Fatura Hatası</h4>
                    <p className="text-sm text-muted-foreground mb-1">
                      Tarife değişimi sonrası "Fatura döngüsü hesaplama hatası" sorunu.
                    </p>
                    <div className="flex items-center text-sm text-[#00A0D2] font-medium">
                      <ArrowRight className="h-4 w-4 mr-1" />
                      <span>Çözüm için ekran görüntülü kılavuzu görüntüle</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <h2>En İyi Uygulama Örnekleri</h2>
          
          <div className="space-y-4 my-8">
            <div className="flex items-start gap-3 border rounded-lg p-4">
              <div className="bg-[#00A0D2]/10 p-2 rounded-lg flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-[#00A0D2]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Hızlı Süreç Tamamlama</h3>
                <p className="text-muted-foreground text-sm">
                  Bireysel hat aktivasyonu sürecini 4 dakikanın altında tamamlamak için klavye kısayolları, 
                  hızlı formlar ve ön hazırlık adımlarını içeren ekran görüntülü kılavuz.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 border rounded-lg p-4">
              <div className="bg-[#FFD100]/10 p-2 rounded-lg flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-[#FFD100]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Müşteri Memnuniyeti Odaklı Süreçler</h3>
                <p className="text-muted-foreground text-sm">
                  Servis tanımlama sürecinde müşteri memnuniyetini artırmak için önerilen yaklaşımlar, 
                  iletişim tarzı ve işlem sonrası takip adımları.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 border rounded-lg p-4">
              <div className="bg-[#00A0D2]/10 p-2 rounded-lg flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-[#00A0D2]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Multi-SIM ve eSIM Aktivasyonu</h3>
                <p className="text-muted-foreground text-sm">
                  Aynı numara için birden fazla cihaz kullanımı sağlayan Multi-SIM ve eSIM aktivasyon 
                  süreçlerinin detaylı anlatımı ve yaşanabilecek sorunların çözümleri.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between p-6 bg-card rounded-xl border">
          <div>
            <h3 className="text-xl font-semibold mb-2">Servis tanımlama eğitimlerine başlayın</h3>
            <p className="text-muted-foreground">Turkcell'in kapsamlı ekran görüntülü kılavuzlarıyla servis süreçlerinizi hızlandırın.</p>
          </div>
          <Button size="lg" className="mt-4 md:mt-0 rounded-full bg-gradient-to-r from-[#ffc72c] to-[#00a0d2] hover:from-[#e6b025] hover:to-[#0090bd] text-white">
            <ExternalLink size={16} className="mr-2" />
            Eğitimlere Erişin
          </Button>
        </div>
      </motion.div>
    </div>
  );
} 