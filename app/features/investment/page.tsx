"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const InvestmentBankingPage = () => {
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
            Yatırım Bankacılığı Çözümleri
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl"
          >
            Sermaye piyasalarında rekabet avantajı sağlayan gelişmiş yatırım bankacılığı araçlarımızla tanışın. Portföy yönetimi, risk analizi ve yatırım stratejileri için kapsamlı çözümler.
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link href="/dashboard">
              <span className="inline-block bg-white text-teb-blue px-8 py-3 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                Hemen Başlayın
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

      {/* Yatırım Araçları Bölümü */}
      <section className="py-16 px-6 md:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Yatırım Bankacılığı Araçları</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Syneris yatırım bankacılığı modülü, finansal piyasalarda etkin stratejiler geliştirmeniz için kapsamlı araçlar sunar.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Portföy Yönetimi",
              description: "Varlık dağılımınızı optimize edin ve çeşitlendirilmiş portföyler oluşturun. Risk-getiri profilinize uygun yatırım stratejileri geliştirin.",
              icon: "📈"
            },
            {
              title: "Risk Analizi",
              description: "Gelişmiş risk modelleme araçlarıyla piyasa, kredi ve operasyonel riskleri değerlendirin ve yönetin.",
              icon: "⚖️"
            },
            {
              title: "Algoritmik İşlemler",
              description: "Otomatik alım-satım stratejileri geliştirin ve uygulayın. Piyasa verilerini analiz ederek fırsatları yakalayın.",
              icon: "🤖"
            },
            {
              title: "Sermaye Piyasaları",
              description: "Hisse senedi, tahvil ve türev ürünlerin alım-satımını etkin bir şekilde yönetin.",
              icon: "🏛️"
            },
            {
              title: "Yatırım Danışmanlığı",
              description: "Veri odaklı analizlerle müşterilerinize kişiselleştirilmiş yatırım tavsiyeleri sunun.",
              icon: "💡"
            },
            {
              title: "Piyasa Analizi",
              description: "Gelişmiş teknik ve temel analiz araçlarıyla piyasa trendlerini ve fiyat hareketlerini değerlendirin.",
              icon: "🔍"
            }
          ].map((tool, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{tool.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{tool.title}</h3>
              <p className="text-gray-600">{tool.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Grafikler ve Analiz Bölümü */}
      <section className="py-16 px-6 md:px-10 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Gelişmiş Analiz Araçları</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Yatırım kararlarınızı desteklemek için gelişmiş analiz ve görselleştirme araçları.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Teknik Analiz Grafikleri</h3>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <div className="text-gray-500">Graf Görseli</div>
              </div>
              <p className="text-gray-600">Hareketli ortalamalar, momentum göstergeleri, trend çizgileri ve diğer teknik analiz araçlarıyla piyasa hareketlerini analiz edin.</p>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Finansal Performans Analizi</h3>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <div className="text-gray-500">Performans Görseli</div>
              </div>
              <p className="text-gray-600">Şirketlerin finansal tablolarını analiz edin, temel oranları değerlendirin ve gelecekteki performansı tahmin edin.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Başarı Metrikleri */}
      <section className="py-16 px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Performans ve Sonuçlar</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Yatırım bankacılığı çözümlerimizin sağladığı somut faydalar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                value: "%25",
                label: "Portföy getirilerinde ortalama artış",
                icon: "📈"
              },
              {
                value: "%40",
                label: "Risk yönetiminde verimlilik artışı",
                icon: "🛡️"
              },
              {
                value: "x3",
                label: "Yatırım fırsatlarını yakalama oranı",
                icon: "🎯"
              },
              {
                value: "%60",
                label: "Analiz süreçlerinde zaman tasarrufu",
                icon: "⏱️"
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Yatırım Stratejilerinizi Geliştirmeye Başlayın</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">Gelişmiş yatırım bankacılığı araçlarımızla portföyünüzü optimize edin ve piyasalardaki fırsatları değerlendirin.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <span className="inline-block bg-white text-teb-blue px-8 py-3 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                Platforma Erişin
              </span>
            </Link>
            <Link href="/help/training">
              <span className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-white hover:text-teb-blue transition-all duration-300 cursor-pointer">
                Eğitimlerimizi İnceleyin
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvestmentBankingPage; 