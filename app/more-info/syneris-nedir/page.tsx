"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SynerisNedirPage() {
  return (
    <div>
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <span>Daha Fazla Bilgi</span>
        <ChevronRight className="mx-1 h-4 w-4" />
        <span className="font-medium text-foreground">Servis Tanımlama Süreci</span>
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
          Servis Tanımlama Süreci Eğitimleri
        </h1>
        
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10">
          <Image 
            src="/images/syneris-platform.webp" 
            alt="Turkcell Servis Tanımlama Platformu"
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Müşteri Deneyimini Geliştiren Servis Süreçleri</h2>
          
          <p>
            Turkcell'in bireysel ve kurumsal hat aktivasyon süreçleri, fatura işlemleri, tarife değişiklikleri ve ek paket tanımlamaları için adım adım ekran görüntülü anlatımlar sunuyoruz. Müşteri temsilcilerimizin ve bayi çalışanlarımızın Turkcell sistemlerinde işlem yapma hızını artıran ve hata oranını düşüren detaylı eğitim içeriklerimiz her zaman günceldir.
          </p>
          
          <p>
            Yeni başlayan çalışanlar için oryantasyon sürecini hızlandıran ve deneyimli çalışanlar için referans kaynağı olan bu eğitimler, Turkcell müşteri deneyimini iyileştirmeye yönelik tasarlanmıştır. Eğitimlerimiz, gerçek vaka senaryoları üzerinden hazırlanmış olup, günlük iş akışında karşılaşılan tüm durumları kapsamaktadır.
          </p>
          
          <h2>Eğitim İçeriklerimiz</h2>
          
          <p>
            Servis Tanımlama Platformumuz, Turkcell'in müşteri odaklı yaklaşımını destekleyen, hızlı ve hatasız işlem yapılmasını sağlayan kapsamlı eğitim modülleri sunar. Bu eğitimler, Turkcell'in sürekli gelişen hizmet ve ürün yelpazesine uygun olarak düzenli olarak güncellenmektedir.
          </p>
          
          <h3>Platformumuzun Temel Özellikleri</h3>
          
          <ul>
            <li><strong>Adım Adım Ekran Görüntülü Anlatımlar:</strong> Tüm sistem işlemleri için detaylı ve görsel rehberler.</li>
            <li><strong>Etkileşimli Senaryolar:</strong> Gerçek müşteri durumlarını simüle eden pratik yapma imkanı.</li>
            <li><strong>Hızlı Referans Kılavuzları:</strong> Sık yapılan işlemler için kolay erişilebilir bilgiler.</li>
            <li><strong>Hata Önleme Rehberleri:</strong> Yaygın hataları önlemek için kontrol noktaları ve ipuçları.</li>
            <li><strong>Güncel Tarife ve Kampanya Bilgileri:</strong> En son Turkcell ürün ve hizmetleri hakkında detaylı bilgiler.</li>
            <li><strong>Sistem Güncellemeleri Bildirimleri:</strong> Turkcell sistemlerindeki değişiklikler hakkında anlık bilgilendirmeler.</li>
            <li><strong>Performans Takibi:</strong> Eğitim tamamlama ve başarı oranlarının izlenmesi.</li>
          </ul>
          
          <h2>Eğitim Kategorilerimiz</h2>
          
          <div className="grid md:grid-cols-2 gap-8 my-8">
            <div className="bg-card border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Bireysel Müşteri İşlemleri</h3>
              <p>
                Bireysel hat aktivasyonu, tarife değişikliği, ek paket tanımlama, fatura işlemleri, numara taşıma, hat devri ve diğer bireysel müşteri hizmetleri için kapsamlı eğitim içerikleri. Bu modüller, Turkcell Dijital Operatör ve bayilerde yapılan tüm bireysel işlemleri kapsar.
              </p>
            </div>
            <div className="bg-card border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Kurumsal Müşteri İşlemleri</h3>
              <p>
                Kurumsal hat yönetimi, toplu hat aktivasyonu, özel tarife tanımlamaları, filo yönetimi, kurumsal faturalama ve raporlama işlemleri için detaylı eğitimler. Turkcell Kurumsal Çözümler kapsamındaki tüm servis süreçlerini içerir.
              </p>
            </div>
          </div>
          
          <h3>Başarı Hikayeleri</h3>
          
          <blockquote>
            "Servis Tanımlama Süreci eğitimleri sayesinde, yeni başlayan müşteri temsilcilerimizin adaptasyon süresini %40 oranında kısalttık. Ekran görüntülü anlatımlar, özellikle karmaşık işlemlerde hata oranımızı önemli ölçüde azalttı."
            <footer>
              <cite>— Ahmet Yılmaz, Turkcell Müşteri Hizmetleri Eğitim Sorumlusu</cite>
            </footer>
          </blockquote>
          
          <blockquote>
            "Turkcell'in servis süreçleri eğitimleri, özellikle yoğun dönemlerde işlem hızımızı artırdı. Güncel kampanya ve tarife bilgilerine anında erişim sağlamamız, müşterilerimize daha hızlı ve doğru hizmet vermemizi sağlıyor."
            <footer>
              <cite>— Zeynep Kaya, Turkcell Premium Bayi Yöneticisi</cite>
            </footer>
          </blockquote>
          
          <h2>Sürekli Gelişim ve Güncelleme</h2>
          
          <p>
            Turkcell'in sürekli gelişen ürün ve hizmet portföyüne paralel olarak, Servis Tanımlama Süreci eğitimlerimiz düzenli olarak güncellenmektedir. Yeni kampanyalar, tarifeler ve sistem güncellemeleri hakkındaki bilgiler, eğitim içeriklerimize anında yansıtılmaktadır.
          </p>
          
          <p>
            Amacımız, Turkcell çalışanlarının ve iş ortaklarımızın müşterilerimize en iyi hizmeti sunabilmeleri için gerekli bilgi ve becerileri kazandırmaktır. Servis süreçlerinin hızlı ve hatasız yürütülmesi, müşteri memnuniyetini artırarak Turkcell'in sektördeki lider konumunu güçlendirmektedir.
          </p>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between p-6 bg-card rounded-xl border">
          <div>
            <h3 className="text-xl font-semibold mb-2">Servis süreçlerinizi hızlandırmaya hazır mısınız?</h3>
            <p className="text-muted-foreground">Turkcell servis tanımlama eğitimlerine hemen başlayın.</p>
          </div>
          <Button size="lg" className="mt-4 md:mt-0 rounded-full bg-[#FFD100] hover:bg-[#e6bc00] text-black">
            Eğitime Başla
          </Button>
        </div>
      </motion.div>
    </div>
  );
} 