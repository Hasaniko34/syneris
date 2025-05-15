"use client";

import React from "react";
import { motion } from "@/components/motion-wrapper";
import Image from "next/image";
import Link from "next/link";

const CorporateBankingPage = () => {
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
            Kurumsal Bankacılık Çözümleri
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl"
          >
            İşletmenizi güçlendirmek için tasarlanmış kapsamlı kurumsal bankacılık modülü ile tanışın. Nakit yönetimi, ticaret finansmanı ve daha fazlası için eksiksiz çözümler.
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link href="/dashboard">
              <span className="inline-block bg-white text-teb-blue px-8 py-3 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                Demo İste
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

      {/* Kurumsal Çözümler Bölümü */}
      <section className="py-16 px-6 md:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Kurumsal Bankacılık Çözümleri</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Syneris kurumsal bankacılık modülü, işletmenizin finansal ihtiyaçlarını karşılamak için tasarlanmış kapsamlı çözümler sunar.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Nakit Yönetimi",
              description: "Nakit akışını optimize etmek, likiditeyi yönetmek ve finansal verimliliği artırmak için gelişmiş nakit yönetimi araçları.",
              icon: "💼"
            },
            {
              title: "Ticaret Finansmanı",
              description: "Uluslararası ticaret işlemlerini güvenli ve verimli bir şekilde yönetmek için entegre çözümler.",
              icon: "🌐"
            },
            {
              title: "Hazine ve Sermaye Piyasaları",
              description: "Piyasa risklerini yönetmek ve yatırım stratejileri geliştirmek için kapsamlı araçlar.",
              icon: "📊"
            },
            {
              title: "Kurumsal Krediler",
              description: "İşletmenizin büyümesini ve projelerini finanse etmek için esnek kredi çözümleri.",
              icon: "💰"
            },
            {
              title: "E-Ticaret Çözümleri",
              description: "Çevrimiçi ödeme işlemlerini kolaylaştırmak ve e-ticaret operasyonlarını geliştirmek için özel çözümler.",
              icon: "🛒"
            },
            {
              title: "Finansal Analiz ve Raporlama",
              description: "İşletmenizin finansal durumunu analiz etmek ve raporlamak için gelişmiş analitik araçlar.",
              icon: "📈"
            }
          ].map((solution, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{solution.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{solution.title}</h3>
              <p className="text-gray-600">{solution.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vaka Çalışmaları */}
      <section className="py-16 px-6 md:px-10 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Başarı Hikayeleri</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Kurumsal bankacılık modülümüzün işletmelerin finansal süreçlerini nasıl dönüştürdüğünü keşfedin.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {[
              {
                title: "XYZ Holding",
                industry: "İnşaat",
                description: "XYZ Holding, nakit yönetimi modülümüz sayesinde operasyonel maliyetlerini %15 azalttı ve uluslararası ödeme işlemlerini optimize etti.",
                result: "Operasyonel maliyetlerde %15 azalma"
              },
              {
                title: "ABC Lojistik",
                industry: "Lojistik",
                description: "ABC Lojistik, ticaret finansmanı çözümlerimiz ile tedarik zinciri finansmanını güçlendirdi ve uluslararası büyümesini hızlandırdı.",
                result: "Tedarik zinciri verimliliğinde %20 artış"
              }
            ].map((case_study, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-teb-blue"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-teb-blue text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">
                    {case_study.title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{case_study.title}</h3>
                    <p className="text-gray-500">{case_study.industry}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{case_study.description}</p>
                <div className="bg-teb-blue bg-opacity-10 p-3 rounded-lg">
                  <p className="text-teb-blue font-medium">Sonuç: {case_study.result}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-10 lg:px-20 bg-teb-blue text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">İşletmenizi Dönüştürmeye Hazır mısınız?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">Kurumsal bankacılık çözümlerimiz ile finansal süreçlerinizi optimize edin, maliyetlerinizi azaltın ve verimliliğinizi artırın.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <span className="inline-block bg-white text-teb-blue px-8 py-3 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                Bizimle İletişime Geçin
              </span>
            </Link>
            <Link href="/demo">
              <span className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-white hover:text-teb-blue transition-all duration-300 cursor-pointer">
                Demo İzleyin
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CorporateBankingPage; 