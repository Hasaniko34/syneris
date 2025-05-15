"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    question: "Arama Motoru nasıl kullanılır?",
    answer: "Turkcell Arama Motoru, üst menüde bulunan arama çubuğuna aradığınız konu, işlem veya hata kodunu yazarak kullanabilirsiniz. Örneğin 'numara taşıma', 'fatura itirazı' veya 'BiP hata kodu 105' gibi anahtar kelimeler kullanabilirsiniz. Arama sonuçları, ilgili prosedürler, rehberler ve çözüm önerileri şeklinde karşınıza çıkacaktır.",
    category: "Arama Motoru"
  },
  {
    question: "Arama Motoru hangi içerikleri kapsar?",
    answer: "Turkcell Arama Motoru, Turkcell'in tüm iç sistemlerindeki bilgi tabanlarını, prosedür dokümanlarını, eğitim içeriklerini, teknik rehberleri, hata kodu çözümlerini ve sık sorulan soruları kapsamaktadır. Hem bireysel hem kurumsal müşteri işlemleri, hem de teknik destek konularında kapsamlı içerik sunar.",
    category: "Arama Motoru"
  },
  {
    question: "Arama sonuçları ne kadar güncel?",
    answer: "Turkcell Arama Motoru, Turkcell'in merkezi bilgi sistemlerine entegre çalıştığı için her zaman en güncel bilgileri sunar. Sistem, yeni tarife ve kampanyalar, güncel prosedürler ve teknik güncellemeler gibi bilgileri otomatik olarak indeksler ve arama sonuçlarına yansıtır.",
    category: "Arama Motoru"
  },
  {
    question: "Arama Motoru'nda bulamadığım bilgiler için ne yapmalıyım?",
    answer: "Aradığınız bilgiyi bulamadıysanız, Turkcell İç Destek hattını arayabilir veya Synbot asistanımızla görüşebilirsiniz. Ayrıca, arama sayfasının altında bulunan 'Geri Bildirim' formunu doldurarak, aradığınız içeriğin eklenmesini talep edebilirsiniz.",
    category: "Arama Motoru"
  },
  {
    question: "Synbot nedir ve nasıl kullanılır?",
    answer: "Synbot, Turkcell'in iç kaynaklı yapay zeka destekli asistanıdır. Sağ alt köşedeki sohbet ikonuna tıklayarak Synbot ile iletişime geçebilirsiniz. Synbot'a doğal dil ile sorular sorabilir, işlem adımlarını öğrenebilir ve teknik destek alabilirsiniz. Örneğin 'Numara taşıma işlemi nasıl yapılır?' veya 'BiP hata kodu 105 ne anlama geliyor?' gibi sorular sorabilirsiniz.",
    category: "Synbot"
  },
  {
    question: "Synbot hangi konularda yardımcı olabilir?",
    answer: "Synbot, Turkcell'in tüm ürün ve hizmetleri, müşteri işlemleri, teknik destek konuları, sistem kullanımları, prosedürler ve sık karşılaşılan sorunlar hakkında bilgi sağlayabilir. Ayrıca, karmaşık işlemlerde adım adım rehberlik edebilir ve gerektiğinde ilgili dokümantasyona yönlendirebilir.",
    category: "Synbot"
  },
  {
    question: "Synbot çalışma saatleri nelerdir?",
    answer: "Synbot 7/24 hizmet vermektedir. İş saatleri dışında veya hafta sonları da Synbot'tan destek alabilirsiniz. Karmaşık veya özel durumlarda, Synbot sizi mesai saatleri içinde ulaşabileceğiniz ilgili destek ekibine yönlendirecektir.",
    category: "Synbot"
  },
  {
    question: "Modül tamamlama sertifikaları nasıl alınır?",
    answer: "Her eğitim modülünün sonunda bulunan değerlendirme testini başarıyla tamamladığınızda (genellikle %80 ve üzeri başarı puanı), sistem otomatik olarak sertifikanızı oluşturur. Sertifikalarınıza 'Profil' sayfanızdan ulaşabilir, dijital olarak indirebilir veya yazdırabilirsiniz. Ayrıca, tamamlanan eğitimler otomatik olarak Turkcell Yetkinlik Portalı'na kaydedilir.",
    category: "Sertifikasyon"
  },
  {
    question: "Sertifikalarımın geçerlilik süresi ne kadardır?",
    answer: "Turkcell eğitim sertifikalarının geçerlilik süresi, eğitimin içeriğine ve konusuna göre değişiklik gösterebilir. Teknik eğitimler ve sistem kullanım eğitimleri genellikle 1 yıl geçerlidir ve yıllık yenileme gerektirir. Temel yetkinlik eğitimleri ise daha uzun süreli geçerli olabilir. Her sertifikanın geçerlilik süresi, sertifika detaylarında belirtilmektedir.",
    category: "Sertifikasyon"
  },
  {
    question: "Sertifikalarım kariyer gelişimimde nasıl fayda sağlar?",
    answer: "Turkcell içi sertifikalar, performans değerlendirmelerinde, terfi süreçlerinde ve departman değişikliği başvurularında dikkate alınır. Özellikle teknik pozisyonlar için belirli sertifikalar zorunlu olabilir. Ayrıca, tamamladığınız eğitimler ve aldığınız sertifikalar, Turkcell Yetkinlik Portalı'nda kayıt altına alınarak kariyer gelişim planınıza dahil edilir.",
    category: "Sertifikasyon"
  },
  {
    question: "BTS simülasyonlarına nasıl erişebilirim?",
    answer: "BTS (Baz İstasyonu) simülasyonlarına, eğitim platformunun 'Teknik Eğitimler' bölümünden erişebilirsiniz. Bu simülasyonları kullanabilmek için öncelikle 'BTS Temel Eğitimi' modülünü tamamlamanız gerekmektedir. Simülasyonlar hem web tarayıcı üzerinden hem de Turkcell Teknik Eğitim mobil uygulaması üzerinden kullanılabilir.",
    category: "Simülasyonlar"
  },
  {
    question: "Şebeke simülasyonları için özel donanım gerekli mi?",
    answer: "Temel şebeke simülasyonları standart bir bilgisayar veya tablet ile kullanılabilir. Ancak, artırılmış gerçeklik (AR) ve sanal gerçeklik (VR) destekli gelişmiş simülasyonlar için uyumlu AR/VR gözlükleri gerekebilir. Teknik eğitim merkezlerimizde bu donanımlar mevcuttur ve randevu alarak kullanabilirsiniz. Ayrıca, mobil AR simülasyonları için güncel bir akıllı telefon yeterlidir.",
    category: "Simülasyonlar"
  },
  {
    question: "Servis tanımlama eğitimleri kimler için zorunludur?",
    answer: "Servis tanımlama eğitimleri, Turkcell Müşteri Hizmetleri, Satış, Bayi Operasyonları ve Teknik Destek departmanlarında çalışan tüm personel için zorunludur. Ayrıca, Turkcell bayilerinde müşteri işlemleri yapan çalışanların da bu eğitimleri tamamlaması gerekmektedir. Eğitimler, pozisyona göre farklı modüller içerir ve yeni başlayan çalışanlar için oryantasyon programının bir parçasıdır.",
    category: "Servis Tanımlama"
  },
  {
    question: "Dijital Servisler Araç Seti'ne kimler erişebilir?",
    answer: "Dijital Servisler Araç Seti, Turkcell Dijital Kanallar, BiP Destek, Müşteri Hizmetleri ve Teknik Destek ekiplerinin kullanımına açıktır. Erişim yetkileri, çalışanın pozisyonu ve sorumluluk alanına göre otomatik olarak tanımlanır. Ek erişim talepleri için yöneticinizin onayıyla İç Sistemler departmanına başvurabilirsiniz.",
    category: "Dijital Servisler"
  },
  {
    question: "Platformdaki içerikler ne sıklıkla güncelleniyor?",
    answer: "Turkcell eğitim ve destek platformundaki içerikler sürekli olarak güncellenmektedir. Tarife ve kampanya bilgileri, ürün özellikleri ve teknik prosedürler, Turkcell'in merkezi sistemlerindeki değişikliklerle eşzamanlı olarak güncellenir. Sistem güncellemeleri ve yeni özellikler hakkında eğitimler, genellikle güncelleme tarihinden 1 hafta önce platforma eklenir. Ayrıca, tüm içerikler en az 3 ayda bir gözden geçirilir ve gerekli güncellemeler yapılır.",
    category: "Genel"
  },
  {
    question: "Eğitim içerikleri hakkında geri bildirim nasıl verebilirim?",
    answer: "Her eğitim modülünün sonunda bulunan 'Geri Bildirim' formunu doldurarak içerikle ilgili değerlendirmelerinizi paylaşabilirsiniz. Ayrıca, platformun sağ üst köşesindeki 'Destek' menüsünden 'İçerik Geri Bildirimi' seçeneğini kullanarak da detaylı önerilerinizi iletebilirsiniz. Geri bildirimleriniz, içerik geliştirme ekibimiz tarafından düzenli olarak incelenmekte ve platform iyileştirmelerinde dikkate alınmaktadır.",
    category: "Genel"
  }
];

const categories = Array.from(new Set(faqs.map(faq => faq.category)));

export default function SSSPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openFAQs, setOpenFAQs] = useState<number[]>([]);

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchTerm === "" || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === null || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (index: number) => {
    if (openFAQs.includes(index)) {
      setOpenFAQs(openFAQs.filter(i => i !== index));
    } else {
      setOpenFAQs([...openFAQs, index]);
    }
  };

  return (
    <div>
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <span>Daha Fazla Bilgi</span>
        <ChevronRight className="mx-1 h-4 w-4" />
        <span className="font-medium text-foreground">Arama Motoru ile Hızlı Destek</span>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#FFD100] via-[#00A0D2] to-[#FFD100] text-transparent bg-clip-text">
          Arama Motoru ile Hızlı Destek
        </h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
          <p>
            Turkcell'in kapsamlı arama motoru sayesinde, tüm süreç ve işlemlerle ilgili bilgilere anında erişebilirsiniz. "Numara taşıma", "fatura itirazı" veya "BiP hata kodu 105" gibi Turkcell süreç aramalarını yaparak, ihtiyacınız olan bilgiye hızlıca ulaşabilirsiniz.
          </p>
          
          <p>
            Aşağıda, platformumuzun arama motoru ve diğer özellikleri hakkında sık sorulan soruların yanıtlarını bulabilirsiniz. Aradığınız bilgiyi bulamıyorsanız, arama çubuğunu kullanarak tüm içeriklerimizde arama yapabilirsiniz.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Soru ara..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          </div>
          
        <div className="flex flex-wrap gap-2 mb-8">
          <Button 
            variant={activeCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(null)}
            className={activeCategory === null ? "bg-[#FFD100] text-black hover:bg-[#e6bc00]" : ""}
          >
            Tümü
          </Button>
          {categories.map((category, index) => (
            <Button 
              key={index}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={activeCategory === category ? "bg-[#FFD100] text-black hover:bg-[#e6bc00]" : ""}
            >
              {category}
              </Button>
            ))}
        </div>
        
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div 
                key={index}
                className="border rounded-lg overflow-hidden"
              >
                <button
                  className="flex items-center justify-between w-full p-4 text-left bg-card hover:bg-muted/50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 text-[#00A0D2] transition-transform ${openFAQs.includes(index) ? 'transform rotate-180' : ''}`} 
                  />
                </button>
                {openFAQs.includes(index) && (
                  <div className="p-4 bg-card border-t">
                    <p className="text-muted-foreground">{faq.answer}</p>
                    <div className="mt-2 flex items-center">
                      <span className="text-xs px-2 py-1 bg-[#FFD100]/10 text-[#FFD100] rounded-full">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-3xl mb-2">🔍</div>
              <h3 className="text-xl font-medium mb-2">Sonuç bulunamadı</h3>
              <p className="text-muted-foreground">Farklı anahtar kelimeler ile aramayı deneyebilir veya tüm kategorileri görüntüleyebilirsiniz.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory(null);
                }}
              >
                Tüm soruları göster
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-12 p-6 bg-card rounded-xl border">
          <h2 className="text-xl font-semibold mb-4">Aradığınız cevabı bulamadınız mı?</h2>
          <p className="text-muted-foreground mb-6">
            Turkcell İç Kaynaklı Asistanımız Synbot ile anlık destek alabilirsiniz. Synbot, Turkcell sistemleri ve süreçleri hakkında detaylı bilgiye sahiptir ve sorularınızı yanıtlamaya hazırdır.
          </p>
          <Button size="lg" className="rounded-full bg-[#FFD100] hover:bg-[#e6bc00] text-black">
            Synbot ile Görüşmeyi Başlat
            </Button>
        </div>
      </motion.div>
    </div>
  );
} 