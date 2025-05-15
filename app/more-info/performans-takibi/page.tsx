"use client";

import React from "react";
import Image from "next/image";
import { motion } from "@/components/motion-wrapper";
import { ChevronRight, Clock, BarChart2, TrendingUp, LineChart, Target, Award, Users, CreditCard, Briefcase, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PerformansTakibiPage() {
  return (
    <div>
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <span>Daha Fazla Bilgi</span>
        <ChevronRight className="mx-1 h-4 w-4" />
        <span className="font-medium text-foreground">Performans Takibi</span>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Clock size={14} />
          <span>Son güncelleme: 8 Mayıs 2025</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-[#005f9e]">
          TEB Bankacılık Performans Takibi ve Analitik
        </h1>
        
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10">
          <Image 
            src="/images/performance-tracking.webp" 
            alt="TEB Performans Takibi"
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="bg-[#e0f0fa] p-6 rounded-xl border mb-8">
            <p className="text-[#005f9e] font-medium mb-0">
              TEB'in gelişmiş performans takip sistemi, banka çalışanlarının eğitim ve bankacılık hizmetleri performansını detaylı olarak izlemenizi, analiz etmenizi ve optimize etmenizi sağlar. Veri odaklı kararlar alarak müşteri memnuniyetini ve bankacılık hizmet kalitenizi sürekli yükseltin.
            </p>
          </div>
          
          <h2 className="text-[#005f9e]">360° Bankacılık Performans Görünümü</h2>
          
          <p>
            Şube ve departman çalışanlarının bankacılık hizmet yolculuğunun her adımını izleyin ve analiz edin. TEB'in kapsamlı performans takibi, bireysel ve kurumsal bankacılık süreçlerindeki ilerlemeyi ölçümlemenizi sağlar.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 my-12">
            {[
              {
                title: "Şube Personeli Metrikleri",
                description: "Her banka çalışanının müşteri hizmetleri performansı, işlem başarı oranları ve tamamlanan eğitimler gibi kritik metrikleri gerçek zamanlı olarak görüntüleyin.",
                icon: <Users className="h-12 w-12 text-[#005f9e] p-2 bg-[#e0f0fa] rounded-xl" />
              },
              {
                title: "Departman ve Şube Analitiği",
                description: "Bankacılık departmanları ve şubeler arasında karşılaştırmalı analizler yaparak kurumsal performans haritanızı çıkarın.",
                icon: <Building2 className="h-12 w-12 text-[#005f9e] p-2 bg-[#e0f0fa] rounded-xl" />
              },
              {
                title: "Bankacılık Hedefleri Takibi",
                description: "Kredi, mevduat ve dijital bankacılık hedefleri doğrultusunda ilerleyişi izleyin, hedeften sapmaları anında tespit edin.",
                icon: <Target className="h-12 w-12 text-[#005f9e] p-2 bg-[#e0f0fa] rounded-xl" />
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl border shadow-sm border-[#005f9e]/20"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-[#005f9e]">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
          
          <h2 className="text-[#005f9e]">TEB Bankacılık Analitik Kontrol Paneli</h2>
          
          <p>
            Özelleştirilebilir kontrol panelleri sayesinde, şube yöneticileri ve bölge müdürlerine önemli iç görüler sunan kapsamlı bir bankacılık analiz deneyimi sunuyoruz.
          </p>
          
          <div className="relative w-full aspect-video rounded-xl overflow-hidden my-10 border border-[#005f9e]/20">
            <Image 
              src="/images/analytics-dashboard.webp" 
              alt="TEB Analitik Paneli"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12">
            {[
              {
                metric: "42%",
                label: "Daha Hızlı Müşteri Hizmeti",
                icon: <TrendingUp className="h-6 w-6 text-[#005f9e]" />
              },
              {
                metric: "92%",
                label: "Müşteri Memnuniyeti",
                icon: <BarChart2 className="h-6 w-6 text-[#005f9e]" />
              },
              {
                metric: "28",
                label: "Bankacılık Ürün Çeşidi",
                icon: <CreditCard className="h-6 w-6 text-[#005f9e]" />
              },
              {
                metric: "3.8x",
                label: "Dijital Dönüşüm Oranı",
                icon: <LineChart className="h-6 w-6 text-[#005f9e]" />
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-card p-4 rounded-xl border text-center border-[#005f9e]/20"
              >
                <div className="flex justify-center mb-2">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-[#005f9e]">{stat.metric}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          
          <h2 className="text-[#005f9e]">TEB Bankacılık Performans Takibi Özellikleri</h2>
          
          <div className="space-y-6 my-8">
            {[
              {
                title: "Şube ve ATM Performans İzleme",
                description: "Tüm şube ve ATM'lerin işlem hacimleri ve müşteri memnuniyeti otomatik olarak izlenir, manuel veri girişi gerektirmez.",
                icon: <Building2 className="h-6 w-6 text-[#005f9e]" />
              },
              {
                title: "Bankacılık Ürün Performansı",
                description: "Mevduat, kredi, kredi kartı ve yatırım ürünlerinin performansını ölçün, en çok tercih edilen ürünleri analiz edin.",
                icon: <CreditCard className="h-6 w-6 text-[#005f9e]" />
              },
              {
                title: "Segment Bazlı Müşteri Analizi",
                description: "Bireysel, KOBİ ve kurumsal müşteri segmentlerinde bankacılık hizmet performansınızı ölçümleyin.",
                icon: <Briefcase className="h-6 w-6 text-[#005f9e]" />
              },
              {
                title: "Dijital Bankacılık Analizi",
                description: "CEPTETEB ve diğer dijital bankacılık kanallarının kullanım performansını ve müşteri dönüşüm oranlarını takip edin.",
                icon: <LineChart className="h-6 w-6 text-[#005f9e]" />
              },
              {
                title: "Bankacılık Uyumluluk İzleme",
                description: "BDDK ve diğer düzenleyici kurumların standartlarına uygunluk performansınızı anlık olarak takip edin.",
                icon: <Award className="h-6 w-6 text-[#005f9e]" />
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="mt-1">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-[#005f9e]">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <h2 className="text-[#005f9e]">TEB Müşteri Deneyimiyle İlişkilendirilmiş Performans</h2>
          
          <p>
            Sadece bankacılık işlem performansını değil, bu işlemlerin müşteri memnuniyeti üzerindeki etkisini de ölçümleyin. TEB, bankacılık performansını gerçek müşteri sonuçlarıyla ilişkilendiren analitik çözümler sunar.
          </p>
          
          <div className="bg-[#e0f0fa] p-6 rounded-xl my-8 border border-[#005f9e]/20">
            <h3 className="text-xl font-semibold mb-4 text-[#005f9e]">Başarı Örneği: TEB Dijital Bankacılık</h3>
            <p className="text-muted-foreground">
              TEB'in performans takip sistemi kullanılarak dijital bankacılık kanallarında yapılan kullanıcı deneyimi iyileştirmeleri ve personel eğitimleri sonucunda mobil bankacılık kullanım oranlarında %35 artış, müşteri memnuniyetinde %27 iyileşme sağlanmıştır.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div className="p-3 bg-white rounded-lg border border-[#005f9e]/20">
                <div className="text-xl font-bold text-[#005f9e]">%35</div>
                <div className="text-xs text-muted-foreground">Mobil Kullanım Artışı</div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-[#005f9e]/20">
                <div className="text-xl font-bold text-[#005f9e]">%27</div>
                <div className="text-xs text-muted-foreground">Müşteri Memnuniyeti</div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-[#005f9e]/20">
                <div className="text-xl font-bold text-[#005f9e]">%42</div>
                <div className="text-xs text-muted-foreground">İşlem Hacmi Artışı</div>
              </div>
            </div>
          </div>
          
          <h2 className="text-[#005f9e]">Veriye Dayalı Bankacılık Optimizasyonu</h2>
          
          <p>
            Performans analitikleri, bankacılık hizmetlerinizi sürekli olarak optimize etmenizi sağlar. Hangi şube ve kanalların daha etkili çalıştığını, hangilerinin iyileştirmeye ihtiyaç duyduğunu somut verilerle tespit edin.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            {[
              {
                title: "Şube Etkinlik Analizi",
                description: "Hangi şubelerin en yüksek müşteri dönüşüm ve memnuniyet oranlarına sahip olduğunu belirleyin, başarılı uygulamaları yaygınlaştırın.",
                icon: <Building2 className="h-8 w-8 text-[#005f9e] p-1 bg-[#e0f0fa] rounded-lg" />
              },
              {
                title: "Bankacılık Yolculuğu Optimizasyonu",
                description: "En etkili müşteri yolculuklarını belirleyin, müşteri davranışlarına göre otomatik olarak kişiselleştirilmiş bankacılık deneyimleri sunun.",
                icon: <LineChart className="h-8 w-8 text-[#005f9e] p-1 bg-[#e0f0fa] rounded-lg" />
              }
            ].map((item, index) => (
              <div key={index} className="p-4 border rounded-xl bg-card border-[#005f9e]/20">
                <div className="flex items-center gap-3 mb-3">
                  {item.icon}
                  <h3 className="text-lg font-semibold text-[#005f9e]">{item.title}</h3>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
          
          <h2 className="text-[#005f9e]">TEB Entegre Raporlama Özellikleri</h2>
          
          <p>
            Kapsamlı bankacılık raporlama araçlarımız ile performans verilerini kolayca paylaşın, dışa aktarın ve yönetim sunumları için hazırlayın.
          </p>
          
          <ul>
            <li>Bankacılık performans raporları (PDF, Excel, CSV formatlarında)</li>
            <li>TEB üst yönetimi için özelleştirilmiş dashboard'lar</li>
            <li>Şube ve bölge müdürleri için takım performans raporları</li>
            <li>Satış ekipleri için kişiselleştirilmiş hedef gerçekleşme raporları</li>
            <li>BDDK ve diğer düzenleyici kurumların gereksinimleri için uyumluluk raporları</li>
          </ul>
          
          <div className="mt-12 flex justify-center">
            <Button className="bg-[#005f9e] hover:bg-[#00487a] text-white px-8 py-6 text-lg rounded-full">
              TEB Performans Sistemini Keşfedin
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 