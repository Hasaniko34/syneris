"use client";

import React, { useState } from "react";
import { motion } from "@/components/motion-wrapper";
import Link from "next/link";

const ModuleMaterialsPage = () => {
  const [activeTab, setActiveTab] = useState("retail");
  
  const modules = {
    retail: {
      title: "Bireysel Bankacılık",
      description: "Bireysel bankacılık modülü, müşteri yönetimi, ürün satışı ve müşteri hizmetleri süreçlerini kapsar.",
      materials: [
        {
          title: "Müşteri Segmentasyonu",
          type: "PDF",
          size: "2.4 MB",
          date: "15 Mayıs 2023"
        },
        {
          title: "Kredi Ürünleri Rehberi",
          type: "PDF",
          size: "3.1 MB",
          date: "22 Haziran 2023"
        },
        {
          title: "Dijital Bankacılık Eğitimi",
          type: "Video",
          size: "280 MB",
          date: "10 Temmuz 2023"
        },
        {
          title: "Mevduat Ürünleri Sunumu",
          type: "Sunum",
          size: "8.5 MB",
          date: "5 Ağustos 2023"
        },
        {
          title: "Sigorta ve Emeklilik Ürünleri",
          type: "PDF",
          size: "4.2 MB",
          date: "18 Eylül 2023"
        }
      ]
    },
    corporate: {
      title: "Kurumsal Bankacılık",
      description: "Kurumsal bankacılık modülü, şirketlere özel finansal çözümler, nakit yönetimi ve ticari krediler hakkında bilgiler içerir.",
      materials: [
        {
          title: "Nakit Yönetimi Rehberi",
          type: "PDF",
          size: "3.8 MB",
          date: "8 Nisan 2023"
        },
        {
          title: "Ticaret Finansmanı Eğitimi",
          type: "Video",
          size: "320 MB",
          date: "12 Mayıs 2023"
        },
        {
          title: "Kurumsal Kredi Süreçleri",
          type: "PDF",
          size: "5.2 MB",
          date: "25 Haziran 2023"
        },
        {
          title: "E-Ticaret Çözümleri",
          type: "Sunum",
          size: "7.1 MB",
          date: "14 Temmuz 2023"
        }
      ]
    },
    investment: {
      title: "Yatırım Bankacılığı",
      description: "Yatırım bankacılığı modülü, sermaye piyasaları, portföy yönetimi ve yatırım stratejileri konularında kaynaklar içerir.",
      materials: [
        {
          title: "Portföy Yönetimi Temelleri",
          type: "PDF",
          size: "4.5 MB",
          date: "20 Mart 2023"
        },
        {
          title: "Teknik Analiz Yöntemleri",
          type: "Video",
          size: "420 MB",
          date: "15 Nisan 2023"
        },
        {
          title: "Yatırım Ürünleri Kataloğu",
          type: "PDF",
          size: "6.3 MB",
          date: "2 Mayıs 2023"
        },
        {
          title: "Algoritmik İşlem Stratejileri",
          type: "Sunum",
          size: "9.8 MB",
          date: "28 Haziran 2023"
        }
      ]
    },
    risk: {
      title: "Risk Yönetimi",
      description: "Risk yönetimi modülü, kredi riski, piyasa riski ve operasyonel risk değerlendirmesi ve yönetimi konularında kaynaklar sunar.",
      materials: [
        {
          title: "Kredi Riski Değerlendirme",
          type: "PDF",
          size: "3.9 MB",
          date: "12 Şubat 2023"
        },
        {
          title: "Stres Testi Metodolojisi",
          type: "PDF",
          size: "5.7 MB",
          date: "8 Mart 2023"
        },
        {
          title: "Operasyonel Risk Yönetimi",
          type: "Video",
          size: "385 MB",
          date: "22 Nisan 2023"
        },
        {
          title: "Basel III Uyum Rehberi",
          type: "PDF",
          size: "7.2 MB",
          date: "10 Mayıs 2023"
        }
      ]
    },
    synbot: {
      title: "Synbot Asistanı",
      description: "Synbot asistanı modülü, yapay zeka destekli bankacılık asistanının kullanımı ve müşteri etkileşimleri için kaynak içerir.",
      materials: [
        {
          title: "Synbot Kullanım Kılavuzu",
          type: "PDF",
          size: "2.8 MB",
          date: "5 Ocak 2023"
        },
        {
          title: "Synbot ile Müşteri Etkileşimi",
          type: "Video",
          size: "260 MB",
          date: "18 Şubat 2023"
        },
        {
          title: "Synbot Komut Rehberi",
          type: "PDF",
          size: "1.9 MB",
          date: "3 Mart 2023"
        },
        {
          title: "Veri Analizi ve Öngörüler",
          type: "Sunum",
          size: "6.4 MB",
          date: "15 Nisan 2023"
        }
      ]
    }
  };

  const currentModule = modules[activeTab as keyof typeof modules];

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
            Modül Materyalleri
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl mb-8"
          >
            Syneris platform modülleri için kapsamlı eğitim materyalleri, kılavuzlar ve belgeler.
          </motion.p>
        </div>
      </motion.div>

      {/* İçerik Bölümü */}
      <div className="py-12 px-6 md:px-10 lg:px-20 max-w-7xl mx-auto">
        {/* Modül Seçimi */}
        <div className="bg-white rounded-xl shadow-md p-1 mb-8">
          <div className="flex flex-wrap border-b">
            {Object.keys(modules).map((moduleKey) => (
              <button
                key={moduleKey}
                onClick={() => setActiveTab(moduleKey)}
                className={`px-6 py-4 text-sm md:text-base font-medium rounded-t-lg transition-colors duration-300 ${
                  activeTab === moduleKey
                    ? "text-teb-blue border-b-2 border-teb-blue"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {modules[moduleKey as keyof typeof modules].title}
              </button>
            ))}
          </div>
        </div>

        {/* Modül İçeriği */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentModule.title}</h2>
            <p className="text-gray-600">{currentModule.description}</p>
          </div>

          {/* Materyal Listesi */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Materyal Adı</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tür</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Boyut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlem</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentModule.materials.map((material, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{material.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        material.type === "PDF" ? "bg-blue-100 text-blue-800" :
                        material.type === "Video" ? "bg-green-100 text-green-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {material.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-teb-blue hover:text-teb-blue-dark mr-4">İndir</a>
                      <a href="#" className="text-teb-blue hover:text-teb-blue-dark">Görüntüle</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Arama ve Filtreleme */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Materyal Arama</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">Anahtar Kelime</label>
              <input
                type="text"
                id="search"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-teb-blue focus:ring-teb-blue"
                placeholder="Materyal adı veya içerik ara..."
              />
            </div>
            
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">Tür</label>
              <select
                id="type"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-teb-blue focus:ring-teb-blue"
              >
                <option value="">Tümü</option>
                <option value="pdf">PDF</option>
                <option value="video">Video</option>
                <option value="presentation">Sunum</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Tarih</label>
              <select
                id="date"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-teb-blue focus:ring-teb-blue"
              >
                <option value="">Tümü</option>
                <option value="last_week">Son 1 Hafta</option>
                <option value="last_month">Son 1 Ay</option>
                <option value="last_3months">Son 3 Ay</option>
                <option value="last_year">Son 1 Yıl</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teb-blue hover:bg-teb-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teb-blue"
            >
              Ara
            </button>
          </div>
        </div>
      </div>

      {/* Yardım Bilgisi */}
      <section className="py-16 px-6 md:px-10 lg:px-20 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Materyal Erişimi</h2>
          <p className="text-lg text-gray-600 mb-8">Bazı materyaller yetki seviyenize bağlı olarak erişilebilir olabilir. Erişim sorunları yaşıyorsanız, yöneticinizle veya destek ekibimizle iletişime geçebilirsiniz.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/help/training">
              <span className="inline-block bg-white border border-gray-300 text-gray-800 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300 cursor-pointer">
                Eğitim Kılavuzu
              </span>
            </Link>
            <Link href="/help/contact">
              <span className="inline-block bg-teb-blue text-white px-8 py-3 rounded-lg font-medium hover:bg-teb-blue-dark transition-colors duration-300 cursor-pointer">
                Destek Alın
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModuleMaterialsPage; 