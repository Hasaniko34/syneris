"use client";

import React from "react";
import Image from "next/image";
import { motion } from "@/components/motion-wrapper";
import { ChevronRight, Clock, Shield, Code, Database, Settings, Users, ExternalLink, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DijitalServisAraclariPage() {
  return (
    <div>
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <span>Daha Fazla Bilgi</span>
        <ChevronRight className="mx-1 h-4 w-4" />
        <span className="font-medium text-foreground">Dijital Servis Araçları</span>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Clock size={14} />
          <span>6 dakika okuma</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#FFD100] via-[#00A0D2] to-[#FFD100] text-transparent bg-clip-text">
          Turkcell Dijital Servis Araçları
        </h1>
        
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10">
          <Image 
            src="/images/digital-services.webp" 
            alt="Turkcell Dijital Servis Araçları"
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Dijital Servis Yönetimi ve Geliştirme Araçları</h2>
          
          <p>
            Turkcell'in dijital hizmet ekosistemine güç veren ve BiP, Lifebox, Dijital Operatör, fizy, TV+ gibi servislerin geliştirilmesi, yönetilmesi ve izlenmesi için kullanılan kapsamlı araç setidir. Bu araçlar, Turkcell'in müşterilerine sunduğu dijital servislerin kesintisiz, güvenli ve yüksek performanslı çalışmasını sağlar.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-lg p-4 my-6">
            <h3 className="text-lg font-medium flex items-center gap-2 text-blue-800 dark:text-blue-300 mb-2">
              <AlertTriangle size={18} className="text-blue-600 dark:text-blue-400" />
              Güncelleme Bildirimi
            </h3>
            <p className="text-blue-700 dark:text-blue-400 text-sm mb-0">
              BiP API Gateway'in 2.0 sürümü 10 Mayıs 2024 tarihinde kullanıma sunulmuştur. GraphQL desteği, 
              iyileştirilmiş güvenlik özellikleri ve yüksek performans için tüm servis entegrasyonlarınızı 
              en geç 30 Haziran 2024 tarihine kadar güncellemeniz gerekmektedir.
            </p>
          </div>
          
          <h2>Temel Servis Araçları</h2>
          
          <div className="grid md:grid-cols-2 gap-8 my-8">
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-[#00A0D2]/10 p-2 rounded-full">
                  <Code size={20} className="text-[#00A0D2]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">BiP API Gateway</h3>
                  <Badge variant="outline" className="mb-2">Geliştirme</Badge>
                </div>
              </div>
              <p className="text-muted-foreground">
                BiP servisleri için API yönetim platformu, API anahtarları, rate limiting, OAuth 2.0 entegrasyonu, 
                GraphQL desteği ve detaylı API analitikleri sunar. RESTful ve mikroservis mimarilerinin tamamını destekler.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500" />
                  Güvenlik odaklı API yönetimi
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500" />
                  Tam GraphQL ve REST desteği
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500" />
                  Kapsamlı API dokümantasyonu
                </li>
              </ul>
            </div>
            
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-[#00A0D2]/10 p-2 rounded-full">
                  <Database size={20} className="text-[#00A0D2]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Servis İzleme Paneli</h3>
                  <Badge variant="outline" className="mb-2">İzleme</Badge>
                </div>
              </div>
              <p className="text-muted-foreground">
                Turkcell'in tüm dijital servislerinin canlı performans metriklerini, kullanım istatistiklerini ve 
                hata oranlarını gerçek zamanlı izleyen platform. Anormal durumlarda otomatik bildirim ve eskalasyon süreçlerini yönetir.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500" />
                  Gerçek zamanlı metrik takibi
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500" />
                  Yapay zeka destekli anomali tespiti
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500" />
                  Servis SLA performans raporlaması
                </li>
              </ul>
            </div>
            
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-[#00A0D2]/10 p-2 rounded-full">
                  <Shield size={20} className="text-[#00A0D2]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Güvenlik Kontrol Merkezi</h3>
                  <Badge variant="outline" className="mb-2">Güvenlik</Badge>
                </div>
              </div>
              <p className="text-muted-foreground">
                Turkcell dijital servisleri için KVKK ve GDPR uyumlu güvenlik politikalarının yönetildiği, 
                güvenlik taramalarının ve tehdit modellemelerinin yapıldığı merkezi platform. Servis bazlı erişim yönetimi de bu merkez üzerinden sağlanır.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500" />
                  DDoS koruma ve önleme
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500" />
                  Veri sızıntısı önleme (DLP)
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500" />
                  Zafiyet tarama ve raporlama
                </li>
              </ul>
            </div>
            
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-[#00A0D2]/10 p-2 rounded-full">
                  <Settings size={20} className="text-[#00A0D2]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Servis Konfigürasyon</h3>
                  <Badge variant="outline" className="mb-2">Yönetim</Badge>
                </div>
              </div>
              <p className="text-muted-foreground">
                Turkcell dijital servislerinin her ortam (geliştirme, test, canlı) için parametre yönetimini, 
                servis bağımlılıklarını ve dağıtım ayarlarını kontrol eden platform. Değişiklik yönetimi ve roll-back süreçlerini de destekler.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500" />
                  Ortam bazlı konfigürasyon yönetimi
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500" />
                  Dağıtım (deployment) otomasyonu
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500" />
                  Servis bağımlılık kontrolü
                </li>
              </ul>
            </div>
          </div>
          
          <h2>Servis Entegrasyon Adımları</h2>
          
          <p>
            Turkcell dijital servisleri ile yeni bir entegrasyon gerçekleştirmek için aşağıdaki adımları takip etmeniz gerekmektedir:
          </p>
          
          <ol>
            <li>
              <strong>Servis Kaydı ve Onay</strong> - Turkcell API Gateway üzerinde servis kaydı oluşturun ve gerekli onayları alın.
              Yeni bir servis entegrasyonu için BiP API Portal üzerinden servis kaydı oluşturulması ve Dijital Servisler ekibinden onay alınması gerekmektedir.
            </li>
            
            <li>
              <strong>API Dokümantasyonu</strong> - Swagger veya OpenAPI formatında API dökümanlarınızı oluşturun.
              Servisinizin API dokümantasyonu, Turkcell standartlarına uygun şekilde ve gerekli tüm bilgileri içerecek şekilde hazırlanmalıdır.
            </li>
            
            <li>
              <strong>Geliştirme Ortamı Testi</strong> - Dev ortamında API entegrasyonunuzu test edin ve sorunları giderin.
              Geliştirme ortamında servisinizin fonksiyonel testleri, performans testleri ve güvenlik testleri yapılmalıdır.
            </li>
            
            <li>
              <strong>Sandbox Entegrasyonu</strong> - Sandbox ortamında diğer servislerle entegrasyonu tamamlayın.
              Servisinizin diğer Turkcell servisleriyle ve bağımlı olduğu sistemlerle doğru çalıştığından emin olun.
            </li>
            
            <li>
              <strong>Canlı Ortam Geçişi</strong> - Üretim ortamında servisi etkinleştirin ve izlemeye başlayın.
              Canlı ortama geçiş için gerekli onayları aldıktan sonra kontrollü bir şekilde geçiş yapılır ve servis izlemeye alınır.
            </li>
          </ol>
          
          <h2>Platform Özellikleri</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 bg-[#FFD100]/10 p-2 rounded-md">
                <Users size={18} className="text-[#FFD100]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Çoklu Kanal Desteği</h3>
                <p className="text-muted-foreground text-sm">
                  BiP, Lifebox, Dijital Operatör, fizy, TV+ gibi tüm Turkcell dijital kanallarında tek 
                  merkezden yönetim ve entegrasyon imkanı sunar.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 bg-[#FFD100]/10 p-2 rounded-md">
                <AlertTriangle size={18} className="text-[#FFD100]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Hızlı Hata Tespiti</h3>
                <p className="text-muted-foreground text-sm">
                  Yapay zeka destekli anomali tespiti ve otomatik bildirimlerle sorunlara proaktif müdahale 
                  imkanı sağlar, kesinti sürelerini minimize eder.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 bg-[#FFD100]/10 p-2 rounded-md">
                <Code size={18} className="text-[#FFD100]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Mikroservis Entegrasyonu</h3>
                <p className="text-muted-foreground text-sm">
                  Turkcell'in mikroservis mimarisiyle tam uyumlu geliştirme araçları ve DevOps süreçleri 
                  ile hızlı entegrasyon ve deployment süreçleri sunar.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 bg-[#FFD100]/10 p-2 rounded-md">
                <Database size={18} className="text-[#FFD100]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Kullanıcı Davranış Analitiği</h3>
                <p className="text-muted-foreground text-sm">
                  Dijital kanallardaki kullanıcı davranışlarını izleme, analiz etme ve müşteri deneyimini 
                  iyileştirmeye yönelik içgörüler sunar.
                </p>
              </div>
            </div>
          </div>
          
          <h2>Teknik Dokümanlar ve Kaynaklar</h2>
          
          <p>
            Turkcell Dijital Servis Araçları hakkında daha detaylı teknik bilgi ve kaynaklar için aşağıdaki dokümanlara başvurabilirsiniz:
          </p>
          
          <ul>
            <li><strong>BiP API Gateway Dokümanları</strong> - API entegrasyonu, güvenlik yapılandırması ve örnek kodlar</li>
            <li><strong>Servis İzleme Kılavuzu</strong> - Metriklerin anlamları, alarm yapılandırması ve raporlama</li>
            <li><strong>Güvenlik Politikaları Rehberi</strong> - KVKK ve GDPR uyumlu servis geliştirme kılavuzu</li>
            <li><strong>Dijital Servis Mimarisi</strong> - Turkcell dijital servis mimarisi ve tasarım prensipleri</li>
            <li><strong>Performans Optimizasyon Kılavuzu</strong> - Servis performansını iyileştirme ve ölçeklendirme önerileri</li>
          </ul>
          
          <p>
            Bu dokümanların tamamına Turkcell İç Portal'daki "Dijital Servisler Teknik Kütüphanesi" bölümünden erişebilirsiniz.
          </p>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between p-6 bg-card rounded-xl border">
          <div>
            <h3 className="text-xl font-semibold mb-2">Dijital servis geliştirme araçlarına erişin</h3>
            <p className="text-muted-foreground">Turkcell dijital servis ekosistemini hemen keşfedin.</p>
          </div>
          <Button size="lg" className="mt-4 md:mt-0 rounded-full bg-[#00A0D2] hover:bg-[#0090bd] text-white">
            <ExternalLink size={16} className="mr-2" />
            Araçlara Erişin
          </Button>
        </div>
      </motion.div>
    </div>
  );
} 