"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Clock, Trophy, Star, BarChart, Target, Medal, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OyunlastirmaPage() {
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
          Şebeke ve BTS Simülasyonları
        </h1>
        
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10">
          <Image 
            src="/images/gamification.webp" 
            alt="Turkcell Şebeke ve BTS Simülasyonları" 
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Gerçek Dünya Senaryoları ile Şebeke Yönetimi Eğitimi</h2>
          
          <p>
            Turkcell'in şebeke altyapısı ve BTS (Baz İstasyonu) kurulumu, bakımı ve arıza tespiti süreçlerini gerçeğe en yakın şekilde deneyimlemek için tasarlanmış interaktif simülasyon ortamımıza hoş geldiniz. Bu platform, Turkcell saha ekipleri, teknik personel ve mühendisler için kritik şebeke operasyonlarını risk almadan pratik yapma imkanı sunar.
          </p>
          
          <p>
            Simülasyonlarımız, Turkcell'in gerçek şebeke altyapısı verilerine dayanarak hazırlanmış olup, şebeke yönetimi ve BTS operasyonlarında karşılaşılan gerçek senaryoları içermektedir. Bu sayede çalışanlarımız, sahada karşılaşabilecekleri her türlü duruma hazırlıklı olabilmektedir.
          </p>
          
          <h2>Simülasyon Kategorilerimiz</h2>
          
          <div className="grid md:grid-cols-2 gap-8 my-8">
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#FFD100] p-2 rounded-full">
                  <Trophy className="h-5 w-5 text-black" />
                </div>
                <h3 className="text-xl font-semibold">BTS Kurulum Simülasyonu</h3>
              </div>
              <p>
                Yeni bir baz istasyonunun kurulum sürecini adım adım öğrenin. Saha keşfinden, ekipman montajına, kablolama işlemlerinden, sistem entegrasyonuna kadar tüm kurulum aşamalarını gerçekçi bir 3D ortamda deneyimleyin. Farklı arazi koşulları ve bina tipleri için özelleştirilmiş senaryolar içerir.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#00A0D2] p-2 rounded-full">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Arıza Tespit ve Giderme</h3>
                    </div>
              <p>
                Turkcell şebekesinde oluşabilecek çeşitli arızaları tespit etme ve giderme becerilerinizi geliştirin. Güç kesintileri, sinyal zayıflığı, ekipman arızaları ve yazılım sorunları gibi farklı senaryolarda doğru teşhis ve müdahale yöntemlerini öğrenin. Gerçek zamanlı performans göstergeleri ile arıza giderme sürecinizi analiz edin.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#FFD100] p-2 rounded-full">
                  <BarChart className="h-5 w-5 text-black" />
          </div>
                <h3 className="text-xl font-semibold">Şebeke Optimizasyonu</h3>
                    </div>
              <p>
                Turkcell şebekesinin performansını optimize etmek için gerekli ayarlamaları ve konfigürasyonları öğrenin. Kapasite planlaması, frekans tahsisi, hücre boyutlandırma ve yönlendirme gibi kritik parametrelerin şebeke performansına etkisini interaktif simülasyonlarla keşfedin. Farklı yoğunluk ve trafik senaryolarında optimum şebeke yapılandırmasını oluşturun.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#00A0D2] p-2 rounded-full">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Acil Durum Yönetimi</h3>
              </div>
              <p>
                Doğal afetler, büyük etkinlikler veya beklenmedik yoğunluk artışları gibi olağanüstü durumlarda Turkcell şebekesinin sürekliliğini sağlamak için gerekli müdahaleleri öğrenin. Mobil baz istasyonlarının konuşlandırılması, kapasite artırımı ve trafik yönetimi gibi acil durum senaryolarında hızlı ve etkili çözümler geliştirin.
              </p>
            </div>
          </div>
          
          <h2>Simülasyon Özellikleri</h2>
          
          <div className="space-y-6 my-8">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFD100] flex items-center justify-center">
                <Star className="h-5 w-5 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Gerçekçi 3D Ortam</h3>
                <p>
                  Turkcell'in gerçek şebeke ekipmanlarının detaylı 3D modellerini içeren, farklı coğrafi koşulları ve şehir ortamlarını yansıtan gerçekçi simülasyon ortamı. Yüksek çözünürlüklü görseller ve gerçek zamanlı fizik motoru ile gerçeğe en yakın deneyim.
                </p>
              </div>
          </div>
          
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00A0D2] flex items-center justify-center">
                <Medal className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Sertifikalı Eğitim Modülleri</h3>
                <p>
                  Her simülasyon modülü, Turkcell Akademi tarafından onaylanan ve sektör standartlarına uygun eğitim içerikleriyle desteklenmektedir. Başarıyla tamamlanan modüller için Turkcell tarafından verilen resmi sertifikalar, kariyer gelişiminize katkı sağlar.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFD100] flex items-center justify-center">
                <Award className="h-5 w-5 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Performans Değerlendirme ve Geri Bildirim</h3>
                <p>
                  Her simülasyon senaryosu sonunda detaylı performans analizi ve kişiselleştirilmiş geri bildirimler alın. Güçlü yönlerinizi ve gelişim alanlarınızı belirleyin, zaman içindeki ilerlemenizi takip edin. Turkcell'in uzman teknik ekibinden alacağınız öneriler ile becerilerinizi sürekli geliştirin.
                </p>
              </div>
            </div>
          </div>
          
          <h2>Simülasyon Seviyeleri</h2>
          
          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-card border rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-[#FFD100] flex items-center justify-center text-black font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Başlangıç Seviyesi</h3>
              <p className="text-muted-foreground">
                Temel BTS bileşenleri, şebeke mimarisi ve standart operasyon prosedürleri hakkında bilgi edinme. Ekipman tanıma ve temel kurulum adımlarını öğrenme.
              </p>
          </div>
          
            <div className="bg-card border rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-[#00A0D2] flex items-center justify-center text-white font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Orta Seviye</h3>
              <p className="text-muted-foreground">
                Karmaşık kurulum senaryoları, yaygın arıza tespiti ve giderme teknikleri, temel optimizasyon parametreleri üzerine pratik yapma.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-[#FFD100] flex items-center justify-center text-black font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">İleri Seviye</h3>
              <p className="text-muted-foreground">
                Karmaşık arıza senaryoları, ileri düzey şebeke optimizasyonu, acil durum yönetimi ve büyük ölçekli şebeke planlaması konularında uzmanlaşma.
              </p>
            </div>
          </div>
          
          <h2>Başarı Hikayeleri</h2>
          
          <blockquote>
            "Şebeke ve BTS simülasyonları, saha ekiplerimizin eğitim süresini %30 kısaltırken, iş başında karşılaşılan hata oranını %45 azalttı. Özellikle yeni teknolojilere geçiş sürecinde, ekiplerimizin adaptasyonunu hızlandırmada büyük rol oynadı."
            <footer>
              <cite>— Ahmet Yılmaz, Turkcell Şebeke Operasyonları Direktörü</cite>
            </footer>
          </blockquote>
          
          <blockquote>
            "Simülasyon ortamında karşılaştığımız senaryolar, gerçek sahada karşılaştığımız durumları o kadar iyi yansıtıyor ki, artık yeni bir BTS kurulumuna gittiğimizde kendimizi çok daha hazır hissediyoruz. Özellikle arıza tespit modülü, karmaşık sorunları çözmede bize büyük avantaj sağlıyor."
            <footer>
              <cite>— Zeynep Kaya, Turkcell Saha Teknisyeni</cite>
            </footer>
          </blockquote>
          
          <h2>Teknoloji ve İnovasyon</h2>
          
          <p>
            Şebeke ve BTS simülasyonlarımız, en son teknolojilerle sürekli güncellenmektedir. Artırılmış gerçeklik (AR) ve sanal gerçeklik (VR) entegrasyonları ile daha gerçekçi ve sürükleyici bir eğitim deneyimi sunmaya başladık. Mobil cihazlar üzerinden erişilebilen AR uygulamalarımız, saha çalışanlarının gerçek ekipmanlar üzerinde sanal kılavuzlar eşliğinde çalışmalarına olanak tanır.
          </p>
          
          <p>
            5G ve ötesi teknolojilere geçiş sürecinde, simülasyon platformumuz Turkcell çalışanlarının yeni nesil şebeke ekipmanları ve mimarileri konusunda hazırlıklı olmalarını sağlamaktadır. Sürekli güncellenen içeriklerimiz, telekomünikasyon sektöründeki en son gelişmeleri ve Turkcell'in teknoloji yol haritasını yansıtmaktadır.
          </p>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between p-6 bg-card rounded-xl border">
          <div>
            <h3 className="text-xl font-semibold mb-2">Şebeke operasyonlarında ustalaşmaya hazır mısınız?</h3>
            <p className="text-muted-foreground">Turkcell şebeke ve BTS simülasyonlarına hemen erişin.</p>
          </div>
          <Button size="lg" className="mt-4 md:mt-0 rounded-full bg-[#FFD100] hover:bg-[#e6bc00] text-black">
            Simülasyona Başla
          </Button>
        </div>
      </motion.div>
    </div>
  );
} 