"use client";

import React from "react";
import { motion } from "@/components/motion-wrapper";
import Link from "next/link";

const TrainingGuidePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-16 px-6 md:px-10 lg:px-20 bg-teb-blue text-white"
      >
        <div className="max-w-5xl mx-auto">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Eğitim Kılavuzu
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl mb-8"
          >
            Syneris platformunu en verimli şekilde kullanmanız için hazırladığımız kapsamlı eğitim materyalleri ve adım adım rehberler.
          </motion.p>
        </div>
      </motion.div>

      {/* İçerik Bölümü */}
      <div className="py-12 px-6 md:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sol Menü */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
              <h3 className="font-semibold text-lg text-gray-800 mb-4 pb-2 border-b border-gray-200">İçindekiler</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#baslangic" className="text-teb-blue hover:text-teb-blue-dark block py-1 border-l-2 border-transparent hover:border-teb-blue pl-3 transition-all">
                    Başlangıç Rehberi
                  </a>
                </li>
                <li>
                  <a href="#arayuz" className="text-teb-blue hover:text-teb-blue-dark block py-1 border-l-2 border-transparent hover:border-teb-blue pl-3 transition-all">
                    Arayüz Tanıtımı
                  </a>
                </li>
                <li>
                  <a href="#moduller" className="text-teb-blue hover:text-teb-blue-dark block py-1 border-l-2 border-transparent hover:border-teb-blue pl-3 transition-all">
                    Modüller
                  </a>
                </li>
                <li>
                  <a href="#temel-islemler" className="text-teb-blue hover:text-teb-blue-dark block py-1 border-l-2 border-transparent hover:border-teb-blue pl-3 transition-all">
                    Temel İşlemler
                  </a>
                </li>
                <li>
                  <a href="#ileri-duzey" className="text-teb-blue hover:text-teb-blue-dark block py-1 border-l-2 border-transparent hover:border-teb-blue pl-3 transition-all">
                    İleri Düzey Özellikler
                  </a>
                </li>
                <li>
                  <a href="#videolar" className="text-teb-blue hover:text-teb-blue-dark block py-1 border-l-2 border-transparent hover:border-teb-blue pl-3 transition-all">
                    Eğitim Videoları
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Ana İçerik */}
          <div className="lg:col-span-3">
            {/* Başlangıç Rehberi */}
            <section 
              id="baslangic"
              className="bg-white rounded-xl shadow-md p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Başlangıç Rehberi</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">1. Sisteme Giriş</h3>
                  <p className="text-gray-600">
                    Syneris'e giriş yapmak için size verilen kullanıcı adı ve şifre ile ana sayfadaki "Giriş Yap" butonunu kullanabilirsiniz. İlk girişinizde şifrenizi değiştirmeniz istenecektir.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">2. Profil Ayarları</h3>
                  <p className="text-gray-600">
                    Profil ayarlarınızı güncellemek için sağ üst köşedeki profil ikonuna tıklayıp "Profil Ayarları" seçeneğini seçebilirsiniz. Buradan kişisel bilgilerinizi, iletişim tercihlerinizi ve diğer ayarları güncelleyebilirsiniz.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">3. Ana Sayfa Görünümü</h3>
                  <p className="text-gray-600">
                    Ana sayfa, size atanan eğitimleri, yaklaşan görevlerinizi ve kişiselleştirilmiş bildirimlerinizi görüntüler. Grafikler ve göstergeler ile ilerleme durumunuzu takip edebilirsiniz.
                  </p>
                </div>
              </div>
            </section>

            {/* Arayüz Tanıtımı */}
            <section 
              id="arayuz"
              className="bg-white rounded-xl shadow-md p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Arayüz Tanıtımı</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Ana Menü</h3>
                  <p className="text-gray-600 mb-4">
                    Sol taraftaki ana menü, platformun temel modüllerine hızlı erişim sağlar:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li><strong>Dashboard:</strong> Genel bakış ve özet bilgiler</li>
                    <li><strong>Eğitimlerim:</strong> Size atanan ve tercih ettiğiniz eğitimler</li>
                    <li><strong>Öğrenme Yolları:</strong> Kariyer gelişiminiz için özel eğitim programları</li>
                    <li><strong>Bildirimler:</strong> Sistem bildirimleri ve duyurular</li>
                    <li><strong>Takvim:</strong> Eğitim programınız ve etkinlikler</li>
                    <li><strong>Synbot:</strong> Yapay zeka destekli yardım asistanı</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Üst Menü</h3>
                  <p className="text-gray-600">
                    Üst menüde arama çubuğu, bildirim ikonu ve profil ayarlarına erişim bulunmaktadır. Arama çubuğunu kullanarak platform içinde herhangi bir içeriği hızlıca bulabilirsiniz.
                  </p>
                </div>
              </div>
            </section>

            {/* Modüller */}
            <section 
              id="moduller"
              className="bg-white rounded-xl shadow-md p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Modüller</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Eğitim Modülü</h3>
                  <p className="text-gray-600">
                    Eğitim modülü, interaktif dersler, videolar, belge ve testleri içerir. Kurumunuz için özelleştirilmiş içerikler ve sektöre özgü eğitimler bu bölümde yer alır.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Analitik Modülü</h3>
                  <p className="text-gray-600">
                    Analitik modülü, eğitim performansınızı, ilerlemenizi ve sertifika durumunuzu görsel grafiklerle sunar. Yöneticiler için takım performans raporları da bu bölümde yer alır.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">İletişim Modülü</h3>
                  <p className="text-gray-600">
                    İletişim modülü, diğer kullanıcılarla mesajlaşma, grup tartışmaları ve eğitmenlerle iletişim kurma imkanı sağlar.
                  </p>
                </div>
              </div>
            </section>

            {/* Temel İşlemler */}
            <section 
              id="temel-islemler"
              className="bg-white rounded-xl shadow-md p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Temel İşlemler</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Eğitim Kayıtları</h3>
                  <p className="text-gray-600 mb-2">
                    Yeni bir eğitime kaydolmak için:
                  </p>
                  <ol className="list-decimal pl-6 text-gray-600 space-y-2">
                    <li>"Eğitim Kataloğu" bölümüne gidin</li>
                    <li>İlgilendiğiniz eğitimi seçin</li>
                    <li>Eğitim detaylarını inceleyin</li>
                    <li>"Kaydol" butonuna tıklayın</li>
                    <li>Eğitim tercihleri ve zaman planlamasını yapın</li>
                    <li>Onaylayın</li>
                  </ol>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">İçeriklere Erişim</h3>
                  <p className="text-gray-600">
                    Kayıtlı olduğunuz eğitimlere "Eğitimlerim" bölümünden erişebilirsiniz. Eğitim içeriği, modüller halinde düzenlenmiştir ve her modül tamamlandığında bir sonraki modüle geçiş yapılır.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Değerlendirme ve Sertifikalar</h3>
                  <p className="text-gray-600">
                    Eğitim sonunda yapılan değerlendirme testini başarıyla tamamladığınızda sertifika almaya hak kazanırsınız. Sertifikalarınıza "Profil" bölümünden ulaşabilir ve indirebilirsiniz.
                  </p>
                </div>
              </div>
            </section>

            {/* İleri Düzey Özellikler */}
            <section 
              id="ileri-duzey"
              className="bg-white rounded-xl shadow-md p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">İleri Düzey Özellikler</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Kişiselleştirilmiş Öğrenme Yolları</h3>
                  <p className="text-gray-600">
                    Kariyer hedeflerinize göre özelleştirilmiş eğitim programları oluşturabilirsiniz. "Öğrenme Yolları" bölümünden yeni bir öğrenme yolu oluşturabilir veya önerilen yollardan birini seçebilirsiniz.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Synbot Asistan</h3>
                  <p className="text-gray-600">
                    Synbot, yapay zeka destekli yardım asistanıdır. Eğitim içerikleri hakkında sorular sorabilir, teknik destek alabilir ve öğrenme sürecinde rehberlik talep edebilirsiniz. Synbot'a erişmek için sağ alt köşedeki chat simgesine tıklayın.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Öneri Sistemi</h3>
                  <p className="text-gray-600">
                    Syneris'in gelişmiş öneri sistemi, öğrenme davranışlarınızı ve kariyer hedeflerinizi analiz ederek size en uygun eğitimleri önerir. Önerilen kurslar ana sayfada ve "Önerilen" sekmesinde görüntülenir.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Performans Analitiği</h3>
                  <p className="text-gray-600">
                    Detaylı istatistikler ve grafiklerle öğrenme performansınızı takip edebilirsiniz. Hangi alanlarda güçlü olduğunuzu ve hangi konularda daha fazla çalışmanız gerektiğini görsel olarak analiz edebilirsiniz.
                  </p>
                </div>
              </div>
            </section>

            {/* Eğitim Videoları */}
            <section 
              id="videolar"
              className="bg-white rounded-xl shadow-md p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Eğitim Videoları</h2>
              
              <p className="text-gray-600 mb-8">
                Platformun kullanımı hakkında adım adım görsel rehberler için aşağıdaki eğitim videolarını izleyebilirsiniz.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Giriş ve Profil Ayarları",
                    duration: "4:23",
                    description: "Sisteme giriş yapma ve profil bilgilerini güncelleme"
                  },
                  {
                    title: "Eğitim Kataloğu Kullanımı",
                    duration: "5:46",
                    description: "Eğitim kataloğunu tarama ve kurslara kayıt olma"
                  },
                  {
                    title: "Öğrenme Yolları",
                    duration: "6:12",
                    description: "Kariyer hedeflerinize uygun öğrenme yollarını yapılandırma"
                  },
                  {
                    title: "Synbot ile Etkileşim",
                    duration: "3:58",
                    description: "Yapay zeka destekli asistanı etkin kullanma ipuçları"
                  }
                ].map((video, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-5 flex flex-col border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>
                      <span className="bg-teb-blue text-white text-xs px-2 py-1 rounded-full">{video.duration}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{video.description}</p>
                    <a href="#" className="mt-auto text-teb-blue hover:text-teb-blue-dark font-medium flex items-center">
                      <span>İzle</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-10 lg:px-20 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Daha Fazla Yardıma mı İhtiyacınız Var?</h2>
          <p className="text-lg text-gray-600 mb-8">Sorularınız için destek ekibimizle iletişime geçebilir veya SSS bölümünü inceleyebilirsiniz.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/help/faq">
              <span className="inline-block bg-white border border-gray-300 text-gray-800 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300 cursor-pointer">
                Sık Sorulan Sorular
              </span>
            </Link>
            <Link href="/help/contact">
              <span className="inline-block bg-teb-blue text-white px-8 py-3 rounded-lg font-medium hover:bg-teb-blue-dark transition-colors duration-300 cursor-pointer">
                Destek Ekibine Ulaşın
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainingGuidePage; 