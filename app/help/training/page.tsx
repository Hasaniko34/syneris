"use client";

import React from "react";
import { motion } from "framer-motion";
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
            <motion.section 
              id="baslangic"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
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
            </motion.section>

            {/* Arayüz Tanıtımı */}
            <motion.section 
              id="arayuz"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
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
            </motion.section>

            {/* Modüller */}
            <motion.section 
              id="moduller"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
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
            </motion.section>

            {/* Temel İşlemler */}
            <motion.section 
              id="temel-islemler"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
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
            </motion.section>

            {/* İleri Düzey Özellikler */}
            <motion.section 
              id="ileri-duzey"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
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
                    Yapay zeka destekli Synbot, platformla ilgili sorularınızı yanıtlar, eğitim içerikleri hakkında bilgi verir ve öğrenme sürecinizde size yardımcı olur. Synbot'a sağ alt köşedeki ikon üzerinden erişebilirsiniz.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Uygulama Entegrasyonları</h3>
                  <p className="text-gray-600">
                    Syneris, takvim uygulamaları, dosya paylaşım servisleri ve diğer kurumsal araçlarla entegre çalışabilir. Entegrasyonları "Ayarlar > Entegrasyonlar" bölümünden yönetebilirsiniz.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Eğitim Videoları */}
            <motion.section 
              id="videolar"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Eğitim Videoları</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Syneris'e Giriş",
                    duration: "5:32",
                    thumbnail: "introduction.jpg"
                  },
                  {
                    title: "Eğitim Modüllerinin Kullanımı",
                    duration: "8:47",
                    thumbnail: "modules.jpg"
                  },
                  {
                    title: "Analitik Raporları",
                    duration: "6:15",
                    thumbnail: "analytics.jpg"
                  },
                  {
                    title: "Synbot'u Etkin Kullanma",
                    duration: "4:23",
                    thumbnail: "synbot.jpg"
                  }
                ].map((video, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="aspect-video bg-gray-200 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-teb-blue bg-opacity-80 rounded-full flex items-center justify-center cursor-pointer">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-800">{video.title}</h3>
                      <p className="text-gray-500 text-sm">{video.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
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