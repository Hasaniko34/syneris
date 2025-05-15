"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  Clock, 
  Radio, 
  Signal, 
  Wifi, 
  Compass, 
  Thermometer, 
  BarChart4, 
  Settings,
  AlertTriangle,
  FileText,
  Zap,
  CheckCircle,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function BTSSimulasyonPage() {
  return (
    <div>
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <span>Daha Fazla Bilgi</span>
        <ChevronRight className="mx-1 h-4 w-4" />
        <span className="font-medium text-foreground">Şebeke ve BTS Simülasyonları</span>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Clock size={14} />
          <span>8 dakika okuma</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#FFD100] via-[#00A0D2] to-[#FFD100] text-transparent bg-clip-text">
          Turkcell Şebeke ve BTS Simülasyonları
        </h1>
        
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10">
          <Image 
            src="/images/bts-simulation.webp" 
            alt="Turkcell BTS Simülasyonları"
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Saha Ekipleri İçin Gerçekçi BTS Simülasyon Ortamı</h2>
          
          <p>
            Turkcell'in saha ekipleri ve şebeke mühendisleri için geliştirilen BTS simülasyonları, gerçek saha koşullarını
            ve senaryolarını sanal ortamda deneyimleme fırsatı sunar. Bu platform, özellikle Ericsson, Huawei ve Nokia BTS 
            ekipmanlarının kurulumu, konfigürasyonu, arıza tespiti ve optimizasyonu konularında pratik beceriler kazandırmak 
            üzere tasarlanmıştır.
          </p>
          
          <Alert className="my-6 border-[#FFD100] bg-[#FFD100]/10">
            <AlertTriangle className="h-5 w-5 text-[#FFD100]" />
            <AlertTitle className="text-[#FFD100] dark:text-[#FFD100]">Dikkat: Platform Güncellemesi</AlertTitle>
            <AlertDescription>
              Simülasyon platformu, tüm Turkcell 5G BTS ekipmanları için güncellenmiştir. Yeni Huawei AAU5900 ve Ericsson AIR6419 
              5G ekipmanları için simülasyonlar eklenmiştir. Lütfen güncel sürümü kullandığınızdan emin olun.
            </AlertDescription>
          </Alert>
          
          <h2>BTS Simülasyon Modülleri</h2>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card className="border-[#00A0D2]/30">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-full bg-[#00A0D2]/10">
                    <Radio className="h-6 w-6 text-[#00A0D2]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">BTS Kurulum ve Devreye Alma</h3>
                    <p className="text-muted-foreground text-sm">
                      Sahada BTS kurulumu, kablolama, anten hizalama ve devreye alma süreçlerini 
                      tam detaylarıyla simüle eden interaktif eğitim modülü.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Badge variant="outline" className="bg-[#00A0D2]/10">Ericsson</Badge>
                      <Badge variant="outline" className="bg-[#00A0D2]/10">Huawei</Badge>
                      <Badge variant="outline" className="bg-[#00A0D2]/10">Nokia</Badge>
                    </div>
                  </div>
                </div>
                <div className="pl-[52px]">
                  <div className="bg-muted p-3 rounded-md mt-2 text-sm">
                    <p className="font-medium text-[#00A0D2]">Bu modülde öğrenecekleriniz:</p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#00A0D2] mt-0.5" />
                        <span>2G, 3G, 4G ve 5G BTS/NodeB/eNodeB/gNodeB kurulum adımları</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#00A0D2] mt-0.5" />
                        <span>Elektronik ve Mekanik tilt (RET) ayarları</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#00A0D2] mt-0.5" />
                        <span>Azimuth açısı hesaplama ve anten hizalama</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#00A0D2] mt-0.5" />
                        <span>RF jumper ve feeder kabloları kurulumu</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#00A0D2]/30">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-full bg-[#00A0D2]/10">
                    <Signal className="h-6 w-6 text-[#00A0D2]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">RF Optimizasyon</h3>
                    <p className="text-muted-foreground text-sm">
                      RF performansını optimize etmek için gerekli parametrelerin ayarlanması, 
                      RF ölçümleri ve analizi konularında interaktif simülasyonlar.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Badge variant="outline" className="bg-[#00A0D2]/10">Drive Test</Badge>
                      <Badge variant="outline" className="bg-[#00A0D2]/10">KPI Analizi</Badge>
                      <Badge variant="outline" className="bg-[#00A0D2]/10">Saha Ölçümleri</Badge>
                    </div>
                  </div>
                </div>
                <div className="pl-[52px]">
                  <div className="bg-muted p-3 rounded-md mt-2 text-sm">
                    <p className="font-medium text-[#00A0D2]">Bu modülde öğrenecekleriniz:</p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#00A0D2] mt-0.5" />
                        <span>RSRP, SINR, RSRQ değerlerinin ölçümü ve analizi</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#00A0D2] mt-0.5" />
                        <span>Turkcell drive test prosedürleri ve araçları</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#00A0D2] mt-0.5" />
                        <span>İnterferans analizi ve çözümleri</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#00A0D2] mt-0.5" />
                        <span>PCI planlama ve çakışma çözümleri</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#FFD100]/30">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-full bg-[#FFD100]/10">
                    <AlertTriangle className="h-6 w-6 text-[#FFD100]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Arıza Tespiti ve Giderme</h3>
                    <p className="text-muted-foreground text-sm">
                      Sık karşılaşılan arıza senaryoları, hata kodları ve sorun giderme 
                      adımlarını içeren pratik simülasyonlar.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Badge variant="outline" className="bg-[#FFD100]/10">Alarm Analizi</Badge>
                      <Badge variant="outline" className="bg-[#FFD100]/10">Log İnceleme</Badge>
                      <Badge variant="outline" className="bg-[#FFD100]/10">Müdahale Planları</Badge>
                    </div>
                  </div>
                </div>
                <div className="pl-[52px]">
                  <div className="bg-muted p-3 rounded-md mt-2 text-sm">
                    <p className="font-medium text-[#FFD100]">Bu modülde öğrenecekleriniz:</p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#FFD100] mt-0.5" />
                        <span>VSWR hata tespiti ve çözümü</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#FFD100] mt-0.5" />
                        <span>RF ünitesi arızaları ve değişim prosedürleri</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#FFD100] mt-0.5" />
                        <span>Turkcell şebeke yönetim sisteminde alarm analizi</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#FFD100] mt-0.5" />
                        <span>Güç ve besleme sorunları tespiti</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#FFD100]/30">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-full bg-[#FFD100]/10">
                    <Settings className="h-6 w-6 text-[#FFD100]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Parametre Konfigürasyonları</h3>
                    <p className="text-muted-foreground text-sm">
                      Turkcell şebeke standartlarına uygun parametre ayarları ve 
                      konfigürasyon yönetimi simülasyonları.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Badge variant="outline" className="bg-[#FFD100]/10">OSS Yönetimi</Badge>
                      <Badge variant="outline" className="bg-[#FFD100]/10">CME İşlemleri</Badge>
                      <Badge variant="outline" className="bg-[#FFD100]/10">Uzaktan Yapılandırma</Badge>
                    </div>
                  </div>
                </div>
                <div className="pl-[52px]">
                  <div className="bg-muted p-3 rounded-md mt-2 text-sm">
                    <p className="font-medium text-[#FFD100]">Bu modülde öğrenecekleriniz:</p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#FFD100] mt-0.5" />
                        <span>Turkcell standart parametre setleri</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#FFD100] mt-0.5" />
                        <span>LTE-NR (5G) komşuluk ilişkileri konfigürasyonu</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#FFD100] mt-0.5" />
                        <span>Yük dengeleme ve trafik yönetimi parametreleri</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#FFD100] mt-0.5" />
                        <span>DSS (Dynamic Spectrum Sharing) ayarları</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <h2>Teknik Detaylar ve Spesifikasyonlar</h2>
          
          <div className="bg-muted p-5 rounded-xl my-6">
            <h3 className="text-xl font-semibold mb-4">Turkcell Şebekesinde Kullanılan BTS Ekipmanları</h3>
            
            <div className="space-y-5">
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="text-lg font-medium flex items-center gap-2 mb-3">
                  <Badge className="bg-[#00A0D2] text-white">Ericsson</Badge>
                  <span>BTS/RBS Ekipmanları</span>
                </h4>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-medium mb-1">2G/3G Ekipmanları:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>RBS 6201 (Multi-standard)</li>
                      <li>RBS 6102 (Macro)</li>
                      <li>RBS 6601 (Baseband)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">4G/5G Ekipmanları:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>AIR 6419 (Massive MIMO, 5G NR)</li>
                      <li>AIR 3246 (4T4R)</li>
                      <li>Baseband 6630 (Multi-standard)</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t text-sm">
                  <p className="font-medium mb-1">Turkcell Özel Konfigürasyonları:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Şehir merkezlerinde 5G için n78 bandında AIR 6419 kullanımı</li>
                    <li>Kapsama alanı genişletme için LTE 800MHz (n20) + 5G DSS yapılandırması</li>
                    <li>Yüksek trafik alanlarında Ericsson Carrier Aggregation (4CC) desteği</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="text-lg font-medium flex items-center gap-2 mb-3">
                  <Badge className="bg-[#FFD100] text-black">Huawei</Badge>
                  <span>BTS/NodeB/eNodeB Ekipmanları</span>
                </h4>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-medium mb-1">2G/3G Ekipmanları:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>DBS3900 (Multi-mode BTS)</li>
                      <li>BBU3900 (Baseband Unit)</li>
                      <li>RRU3908 (Remote Radio Unit)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">4G/5G Ekipmanları:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>AAU5900 (Active Antenna Unit, 5G)</li>
                      <li>BBU5900 (5G Baseband Unit)</li>
                      <li>RRU5301 (4T4R)</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t text-sm">
                  <p className="font-medium mb-1">Turkcell Özel Konfigürasyonları:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Yoğun şehir merkezlerinde 64T64R Massive MIMO AAU5900 kullanımı</li>
                    <li>SuperCell yapılandırması ile kapasite artırımı (1800MHz + 2600MHz)</li>
                    <li>NB-IoT için özel kanal yapılandırmaları (in-band mode)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <h2>Şebeke Performans Ölçümleri ve KPI Analizleri</h2>
          
          <p>
            Simülasyon ortamında Turkcell şebekesinin gerçek KPI (Key Performance Indicator) metrikleri kullanılarak
            performans analizi yapma ve optimizasyon çalışmaları gerçekleştirme imkanı sunulmaktadır. Gerçek sahada 
            karşılaşılan değerler ve Turkcell şebeke standartları simülasyonlara entegre edilmiştir.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 my-6">
            <div className="flex flex-col items-center bg-card border rounded-xl p-4">
              <div className="bg-[#00A0D2]/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <BarChart4 className="h-8 w-8 text-[#00A0D2]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">Hücre Erişilebilirlik</h3>
              <div className="text-3xl font-bold text-[#00A0D2]">99.94%</div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Turkcell 4G şebekesi ortalama erişilebilirlik hedefi
              </p>
            </div>
            
            <div className="flex flex-col items-center bg-card border rounded-xl p-4">
              <div className="bg-[#FFD100]/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-[#FFD100]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">Veri İndirme Hızı</h3>
              <div className="text-3xl font-bold text-[#FFD100]">185 Mbps</div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                4G LTE şebekesi ortalama indirme hızı hedefi
              </p>
            </div>
            
            <div className="flex flex-col items-center bg-card border rounded-xl p-4">
              <div className="bg-[#00A0D2]/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Wifi className="h-8 w-8 text-[#00A0D2]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">Call Setup Success</h3>
              <div className="text-3xl font-bold text-[#00A0D2]">99.76%</div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                VoLTE çağrı kurulum başarı oranı hedefi
              </p>
            </div>
          </div>
          
          <h2>Sahada Kullanılan Teknik Ekipmanlar</h2>
          
          <p>
            Simülasyon ortamında, Turkcell saha ekiplerinin kullandığı gerçek test cihazları ve 
            ekipmanların dijital ikizleri ile çalışma imkanı bulunmaktadır:
          </p>
          
          <div className="space-y-3 my-6">
            <div className="flex items-start gap-3 border rounded-lg p-4">
              <div className="bg-[#00A0D2]/10 p-2 rounded-lg flex-shrink-0">
                <Compass className="h-5 w-5 text-[#00A0D2]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Anritsu Site Master S331L</h3>
                <p className="text-muted-foreground text-sm">
                  Kablo ve anten analizi, VSWR ölçümü, DTF (Distance to Fault) ve RF kaybı ölçümleri 
                  için kullanılan cihazın tam simülasyonu. Gerçek ölçüm değerleri ve Turkcell sahada 
                  kabul kriterleri entegre edilmiştir.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 border rounded-lg p-4">
              <div className="bg-[#FFD100]/10 p-2 rounded-lg flex-shrink-0">
                <Thermometer className="h-5 w-5 text-[#FFD100]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Rohde & Schwarz TSMW</h3>
                <p className="text-muted-foreground text-sm">
                  Drive test ölçümleri için kullanılan TSMW cihazının simülasyonu. RSRP, SINR, RSRQ, 
                  PCI ve diğer RF parametrelerinin ölçümü ve Turkcell şebeke standartlarına göre 
                  karşılaştırması yapılabilmektedir.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 border rounded-lg p-4">
              <div className="bg-[#00A0D2]/10 p-2 rounded-lg flex-shrink-0">
                <FileText className="h-5 w-5 text-[#00A0D2]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Turkcell Saha Çalışma Formları</h3>
                <p className="text-muted-foreground text-sm">
                  Saha ekiplerinin kullandığı Turkcell standart formların dijital versiyonları. 
                  BTS devreye alma raporu, RF ölçüm raporu, arıza bildirim formu ve periyodik 
                  bakım formları sisteme entegre edilmiştir.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between p-6 bg-card rounded-xl border">
          <div>
            <h3 className="text-xl font-semibold mb-2">BTS simülasyonlarına hemen başlayın</h3>
            <p className="text-muted-foreground">Turkcell saha ekibi için gerçekçi simülasyonlarla pratik yapın.</p>
          </div>
          <Button size="lg" className="mt-4 md:mt-0 rounded-full bg-gradient-to-r from-[#ffc72c] to-[#00a0d2] hover:from-[#e6b025] hover:to-[#0090bd] text-white">
            <Radio size={16} className="mr-2" />
            Simülasyonlara Erişin
          </Button>
        </div>
      </motion.div>
    </div>
  );
} 