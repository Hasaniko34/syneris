"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Clock, Brain, BarChart, Users, Lightbulb, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MetodolojimizPage() {
  return (
    <div>
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <span>Daha Fazla Bilgi</span>
        <ChevronRight className="mx-1 h-4 w-4" />
        <span className="font-medium text-foreground">Dijital Servisler Araç Seti</span>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Clock size={14} />
          <span>7 dakika okuma</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#FFD100] via-[#00A0D2] to-[#FFD100] text-transparent bg-clip-text">
          Dijital Servisler Araç Seti
        </h1>
        
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10">
          <Image 
            src="/images/methodology.webp" 
            alt="Turkcell Dijital Servisler Araç Seti" 
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Turkcell Dijital Kanal Yönetimi Optimizasyonu</h2>
          
          <p>
            Turkcell Dijital Kanal Yönetimi ve BiP Destek süreçlerinde en sık karşılaşılan hataları önlemek ve işlemleri hızlandırmak için kapsamlı bir araç seti sunuyoruz. Bu araç seti, müşteri temsilcilerinin ve dijital kanal yöneticilerinin günlük işlerinde karşılaştıkları zorlukları aşmalarına yardımcı olan pratik rehberler ve çözüm önerileri içermektedir.
          </p>
          
          <p>
            Dijital Servisler Araç Setimiz, Turkcell'in müşteri deneyimini iyileştirme ve dijital kanallarını optimize etme hedefine yönelik olarak tasarlanmıştır. Müşteri temsilcilerimizin ve dijital kanal yöneticilerimizin işlerini daha verimli yapabilmeleri için gerekli tüm kaynakları tek bir platformda sunuyoruz.
          </p>
          
          <h2>Araç Setimizin İçeriği</h2>
          
          <div className="grid md:grid-cols-2 gap-8 my-8">
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#FFD100] p-2 rounded-full">
                  <Brain className="h-5 w-5 text-black" />
                </div>
                <h3 className="text-xl font-semibold">Hata Önleme Rehberleri</h3>
              </div>
              <p>
                Turkcell Dijital Kanal Yönetimi'nde en sık karşılaşılan hataların detaylı analizi ve bunları önleme yöntemleri. BiP Destek süreçlerinde yaşanan teknik sorunların çözüm adımları ve hızlı müdahale teknikleri.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#00A0D2] p-2 rounded-full">
                  <BarChart className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Performans Optimizasyon Araçları</h3>
              </div>
              <p>
                Dijital kanal performansını artırmak için kullanılabilecek analitik araçlar, raporlama şablonları ve optimizasyon teknikleri. Turkcell Dijital Operatör uygulaması ve web sitesi için kullanıcı deneyimi iyileştirme önerileri.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#FFD100] p-2 rounded-full">
                  <Users className="h-5 w-5 text-black" />
                </div>
                <h3 className="text-xl font-semibold">Müşteri Etkileşim Şablonları</h3>
              </div>
              <p>
                BiP Destek üzerinden müşterilerle etkileşimde kullanılabilecek hazır yanıt şablonları, sık sorulan sorular ve çözüm önerileri. Turkcell müşteri iletişim standartlarına uygun mesaj formatları ve iletişim stratejileri.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#00A0D2] p-2 rounded-full">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Sorun Giderme Kılavuzları</h3>
              </div>
              <p>
                BiP uygulaması hata kodları ve çözümleri, Turkcell Dijital Operatör sorun giderme adımları ve teknik destek süreçleri için kapsamlı rehberler. Müşterilerin sık karşılaştığı sorunlar için hızlı çözüm yöntemleri.
              </p>
            </div>
          </div>
          
          <h2>Nasıl Çalışır?</h2>
          
          <div className="space-y-8 my-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FFD100] flex items-center justify-center text-black font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Sorun Tanımlama</h3>
                <p>
                  Turkcell Dijital Kanal Yönetimi veya BiP Destek süreçlerinde karşılaştığınız sorunu araç setimizin arama özelliği ile tanımlayın. Örneğin "BiP hata kodu 105" veya "Dijital Operatör fatura görüntüleme sorunu" gibi anahtar kelimelerle arama yapabilirsiniz.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00A0D2] flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Çözüm Önerilerini İnceleme</h3>
                <p>
                  Sistem, sorunla ilgili en güncel çözüm önerilerini, adım adım rehberleri ve gerekli araçları sunar. Turkcell'in en iyi uygulamaları ve standart operasyon prosedürleri doğrultusunda hazırlanmış çözümleri inceleyin.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FFD100] flex items-center justify-center text-black font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Uygulama ve Geri Bildirim</h3>
                <p>
                  Önerilen çözümleri uygulayın ve sonuçları sistem üzerinden paylaşın. Geri bildirimleriniz, araç setimizin sürekli geliştirilmesi ve Turkcell dijital servis süreçlerinin iyileştirilmesi için kullanılacaktır.
                </p>
              </div>
            </div>
          </div>
          
          <h2>Başarı Metrikleri</h2>
          
          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-[#FFD100] mb-2">%40</div>
              <p className="text-muted-foreground">Çözüm süresinde azalma</p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-[#00A0D2] mb-2">%35</div>
              <p className="text-muted-foreground">Müşteri memnuniyetinde artış</p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-[#FFD100] mb-2">%25</div>
              <p className="text-muted-foreground">Tekrarlayan sorunlarda azalma</p>
            </div>
          </div>
          
          <h2>Kullanıcı Deneyimleri</h2>
          
          <blockquote>
            "Dijital Servisler Araç Seti sayesinde, BiP Destek'te karşılaştığımız karmaşık sorunları çok daha hızlı çözebiliyoruz. Özellikle hata kodları rehberi, teknik sorunları anında tanımlamamıza ve müşterilerimize hızlı çözüm sunmamıza yardımcı oluyor."
            <footer>
              <cite>— Mehmet Demir, Turkcell Dijital Kanallar Ekip Lideri</cite>
            </footer>
          </blockquote>
          
          <blockquote>
            "Turkcell Dijital Operatör uygulamasında müşterilerin en çok zorlandığı noktaları tespit etmemize ve bu alanlarda iyileştirmeler yapmamıza olanak sağlayan araç seti, dijital kanallarımızın kullanım oranını artırmada büyük rol oynadı."
            <footer>
              <cite>— Ayşe Yıldız, Turkcell Dijital Dönüşüm Uzmanı</cite>
            </footer>
          </blockquote>
          
          <h2>Sürekli Güncellenen İçerik</h2>
          
          <p>
            Dijital Servisler Araç Setimiz, Turkcell'in dijital kanallarındaki güncellemeler, yeni özellikler ve değişen müşteri ihtiyaçları doğrultusunda sürekli güncellenmektedir. Araç setimiz, Turkcell'in dijital dönüşüm stratejisine uygun olarak geliştirilmekte ve dijital kanallardaki müşteri deneyimini sürekli iyileştirmeyi hedeflemektedir.
          </p>
          
          <p>
            Turkcell çalışanları ve iş ortaklarımız, bu araç seti sayesinde dijital kanallarda daha verimli çalışabilmekte, müşteri sorunlarına daha hızlı çözüm üretebilmekte ve Turkcell'in dijital servis kalitesini yükseltmeye katkıda bulunmaktadır.
          </p>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between p-6 bg-card rounded-xl border">
          <div>
            <h3 className="text-xl font-semibold mb-2">Dijital servis süreçlerinizi optimize etmeye hazır mısınız?</h3>
            <p className="text-muted-foreground">Turkcell Dijital Servisler Araç Seti'ne hemen erişin.</p>
          </div>
          <Button size="lg" className="mt-4 md:mt-0 rounded-full bg-[#FFD100] hover:bg-[#e6bc00] text-black">
            Araç Setine Eriş
          </Button>
        </div>
      </motion.div>
    </div>
  );
} 