"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const RiskManagementPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 px-6 md:px-10 lg:px-20 bg-teb-blue text-white overflow-hidden"
      >
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Risk Yönetimi Çözümleri
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl"
          >
            Finansal riskleri etkili bir şekilde yönetmenize yardımcı olan kapsamlı risk analizi ve yönetimi araçlarımızla tanışın. Kredi, piyasa ve operasyonel riskleri tespit edin, ölçün ve yönetin.
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link href="/dashboard">
              <span className="inline-block bg-white text-teb-blue px-8 py-3 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                Çözümleri Keşfedin
              </span>
            </Link>
          </motion.div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-20">
          <svg width="500" height="500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M39.7,-67.8C51.9,-60.5,62.4,-50.1,70.2,-37.5C78.1,-24.9,83.2,-10.1,82.9,4.7C82.6,19.5,76.9,34.2,67.6,46.1C58.3,58,45.3,67.1,31.2,72.6C17.1,78.1,1.9,80.1,-12.9,77.7C-27.7,75.3,-42.1,68.6,-53.1,58.3C-64.1,48,-71.8,34.2,-76.4,19.4C-81,4.6,-82.6,-11.2,-78.6,-25.8C-74.5,-40.4,-64.9,-53.9,-52.1,-61.2C-39.3,-68.6,-23.3,-69.9,-8.6,-68.3C6.1,-66.8,27.5,-75.1,39.7,-67.8Z" transform="translate(100 100)" />
          </svg>
        </div>
      </motion.div>

      {/* Risk Kategorileri */}
      <section className="py-16 px-6 md:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Kapsamlı Risk Yönetimi</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Syneris risk yönetimi modülü, finansal kurumların karşılaştığı tüm risk türlerini yönetmek için entegre çözümler sunar.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Kredi Riski",
              description: "Müşteri kredi değerliliğini otomatik olarak değerlendirin, kredi portföy risklerini analiz edin ve erken uyarı sistemleriyle sorunlu kredileri tespit edin.",
              icon: "💳"
            },
            {
              title: "Piyasa Riski",
              description: "Faiz oranı, döviz kuru ve likidite risklerini ölçün ve yönetin. Stres testleri ve senaryo analizleri ile piyasa dalgalanmalarına karşı hazırlıklı olun.",
              icon: "📊"
            },
            {
              title: "Operasyonel Risk",
              description: "İş süreçlerinde, sistemlerde ve insan faktöründen kaynaklanan riskleri tespit edin ve azaltın. Olay yönetimi ve kontrol sistemleri ile kayıpları önleyin.",
              icon: "⚙️"
            },
            {
              title: "Uyum Riski",
              description: "Yasal düzenlemelere uyumu kolaylaştırın, düzenleyici raporlamaları otomatikleştirin ve cezaları önleyin.",
              icon: "📜"
            },
            {
              title: "Siber Güvenlik Riski",
              description: "Dijital tehditler ve veri ihlallerine karşı koruma sağlayın. Güvenlik açıklarını tespit edin ve siber saldırıları önleyin.",
              icon: "🔒"
            },
            {
              title: "İtibar Riski",
              description: "Marka itibarını korumak için riskleri yönetin, sosyal medya ve müşteri geri bildirimlerini analiz edin ve kriz yönetimi planları geliştirin.",
              icon: "👥"
            }
          ].map((risk, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{risk.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{risk.title}</h3>
              <p className="text-gray-600">{risk.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Risk Analitik Platformu */}
      <section className="py-16 px-6 md:px-10 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Risk Analitik Platformu</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Veri odaklı risk analizi ve yönetimi için gelişmiş analitik araçlar.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-teb-blue"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Gerçek Zamanlı Risk İzleme</h3>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <div className="text-gray-500">Risk Gösterge Paneli</div>
              </div>
              <p className="text-gray-600">Risk gösterge panellerimiz, portföy risklerini, limit aşımlarını ve risk trendlerini gerçek zamanlı olarak izlemenizi sağlar. Görsel grafikler ve raporlarla riskleri anında değerlendirin.</p>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-teb-blue"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Gelişmiş Risk Modelleme</h3>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <div className="text-gray-500">Risk Modelleme</div>
              </div>
              <p className="text-gray-600">Makine öğrenimi ve istatistiksel modeller kullanarak karmaşık riskleri analiz edin. VaR (Riske Maruz Değer) hesaplamaları, stres testleri ve senaryo analizleri ile geleceğe yönelik risk tahminleri yapın.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Düzenleyici Uyum */}
      <section className="py-16 px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Düzenleyici Uyum Çözümleri</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">BDDK, SPK ve uluslararası düzenlemelere uyum için entegre çözümler.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Basel Uyumu",
                description: "Basel III ve IV uyum gereksinimleri için sermaye yeterliliği hesaplamaları ve raporlama araçları.",
                icon: "🏛️"
              },
              {
                title: "TCMB Raporlaması",
                description: "Türkiye Cumhuriyet Merkez Bankası'na yapılacak düzenli raporlamalar için otomatik veri toplama ve raporlama araçları.",
                icon: "📋"
              },
              {
                title: "Stres Testi Senaryoları",
                description: "Düzenleyici kurumlar tarafından istenen stres testlerini hızlı ve doğru bir şekilde gerçekleştirmenizi sağlayan senaryolar ve analiz araçları.",
                icon: "🔍"
              }
            ].map((compliance, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{compliance.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{compliance.title}</h3>
                <p className="text-gray-600">{compliance.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Başarı Metrikleri */}
      <section className="py-16 px-6 md:px-10 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Risk Yönetimi Sonuçları</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Risk yönetimi çözümlerimizin sağladığı somut faydalar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                value: "%30",
                label: "Kredi kayıplarında azalma",
                icon: "📉"
              },
              {
                value: "%45",
                label: "Risk değerlendirme süresinde kısalma",
                icon: "⏱️"
              },
              {
                value: "%99",
                label: "Düzenleyici raporlama doğruluğu",
                icon: "✅"
              },
              {
                value: "%70",
                label: "Manuel risk süreçlerinde azalma",
                icon: "🤖"
              }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8 text-center"
              >
                <div className="text-3xl mb-4">{metric.icon}</div>
                <h3 className="text-3xl md:text-4xl font-bold text-teb-blue mb-2">{metric.value}</h3>
                <p className="text-gray-600">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-10 lg:px-20 bg-teb-blue text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Riskleri Etkin Bir Şekilde Yönetmeye Başlayın</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">Risk yönetimi çözümlerimizle finansal riskleri azaltın, düzenleyici uyumu kolaylaştırın ve iş süreçlerinizi güvence altına alın.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <span className="inline-block bg-white text-teb-blue px-8 py-3 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                Bizimle İletişime Geçin
              </span>
            </Link>
            <Link href="/help/training">
              <span className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-white hover:text-teb-blue transition-all duration-300 cursor-pointer">
                Demo Talep Edin
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RiskManagementPage; 