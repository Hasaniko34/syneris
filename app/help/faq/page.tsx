"use client";

import React, { useState } from "react";
import { motion } from "@/components/motion-wrapper";
import Link from "next/link";

const FAQPage = () => {
  const [openCategory, setOpenCategory] = useState("general");
  const [openQuestions, setOpenQuestions] = useState<{ [key: string]: boolean }>({});

  const toggleQuestion = (id: string) => {
    setOpenQuestions({
      ...openQuestions,
      [id]: !openQuestions[id]
    });
  };

  const faqCategories = [
    {
      id: "general",
      title: "Genel Sorular",
      questions: [
        {
          id: "what-is-syneris",
          question: "Syneris nedir?",
          answer: "Syneris, TEB için geliştirilmiş kapsamlı bir bankacılık eğitim ve gelişim platformudur. Bireysel, kurumsal, yatırım bankacılığı ve risk yönetimi gibi alanlarda eğitim modülleri sunar. Ayrıca yapay zeka destekli Synbot asistanı ile anlık yardım ve destek sağlar."
        },
        {
          id: "who-can-use",
          question: "Syneris'i kimler kullanabilir?",
          answer: "Syneris, TEB çalışanları için tasarlanmıştır. Farklı departmanlardaki çalışanlar için özelleştirilmiş eğitim içerikleri ve modüller bulunmaktadır. Ayrıca, TEB'in iş ortakları ve yetkili bayileri de kendi özel erişim bilgileriyle platforma erişebilirler."
        },
        {
          id: "technical-requirements",
          question: "Syneris'i kullanmak için teknik gereksinimler nelerdir?",
          answer: "Syneris, web tabanlı bir platform olduğu için güncel bir internet tarayıcısı (Chrome, Firefox, Safari, Edge) ve internet bağlantısı yeterlidir. Bazı eğitim materyalleri için Flash Player, PDF okuyucu veya video oynatıcı gerekebilir. Mobil uygulamamız iOS ve Android cihazlarda kullanılabilir."
        },
        {
          id: "languages",
          question: "Syneris hangi dillerde kullanılabilir?",
          answer: "Syneris şu anda Türkçe ve İngilizce dillerinde hizmet vermektedir. Kullanıcılar, profil ayarlarından tercih ettikleri dili seçebilirler. Bazı özel eğitim içerikleri sadece tek dilde sunulabilir."
        }
      ]
    },
    {
      id: "access",
      title: "Erişim ve Kullanım",
      questions: [
        {
          id: "how-to-login",
          question: "Syneris'e nasıl giriş yapabilirim?",
          answer: "Syneris'e giriş yapmak için size verilen kurumsal e-posta adresinizi ve şifrenizi kullanabilirsiniz. İlk girişinizde şifre değiştirmeniz istenecektir. Şifrenizi unuttuysanız, giriş sayfasındaki 'Şifremi Unuttum' bağlantısını kullanabilirsiniz."
        },
        {
          id: "forgot-password",
          question: "Şifremi unuttum, ne yapmalıyım?",
          answer: "Şifrenizi unuttuysanız, giriş sayfasındaki 'Şifremi Unuttum' bağlantısına tıklayarak e-posta adresinizi girin. Şifre sıfırlama bağlantısı e-posta adresinize gönderilecektir. Yine de sorun yaşıyorsanız, IT Destek ekibinizle iletişime geçebilirsiniz."
        },
        {
          id: "mobile-access",
          question: "Syneris'e mobil cihazlardan erişebilir miyim?",
          answer: "Evet, Syneris'e mobil cihazlardan erişebilirsiniz. iOS ve Android için mobil uygulamamız mevcuttur ve uygulama mağazalarından indirilebilir. Ayrıca, mobil web tarayıcınız üzerinden de platforma erişebilirsiniz, çünkü Syneris tamamen mobil uyumlu bir tasarıma sahiptir."
        },
        {
          id: "offline-access",
          question: "İçeriklere çevrimdışı erişebilir miyim?",
          answer: "Evet, mobil uygulamayı kullanarak bazı eğitim içeriklerini indirebilir ve çevrimdışı olarak erişebilirsiniz. İçeriği çevrimdışı erişim için indirmek için, içerik sayfasındaki indirme simgesine tıklayın. Video ve interaktif içerikler için çevrimdışı erişim sınırlı olabilir."
        }
      ]
    },
    {
      id: "courses",
      title: "Eğitim ve İçerikler",
      questions: [
        {
          id: "course-enrollment",
          question: "Bir eğitime nasıl kaydolurum?",
          answer: "Eğitime kaydolmak için 'Eğitim Kataloğu' bölümüne gidin, ilgilendiğiniz eğitimi seçin ve 'Kaydol' düğmesine tıklayın. Bazı eğitimler otomatik olarak size atanmış olabilir veya yöneticinizin onayını gerektirebilir. Atanan eğitimlerinizi 'Eğitimlerim' bölümünde görebilirsiniz."
        },
        {
          id: "course-duration",
          question: "Bir eğitimi tamamlamak ne kadar sürer?",
          answer: "Eğitim süresi, eğitimin içeriğine ve karmaşıklığına bağlı olarak değişir. Her eğitimin sayfasında tahmini bir tamamlama süresi belirtilmiştir. Kendi hızınızda ilerleyebilir ve istediğiniz zaman ara verebilirsiniz. Sistem, kaldığınız yerden devam etmenizi sağlar."
        },
        {
          id: "certificates",
          question: "Sertifika alabilir miyim?",
          answer: "Evet, çoğu eğitim modülünü başarıyla tamamladığınızda dijital bir sertifika alabilirsiniz. Sertifikalarınıza 'Profil > Sertifikalarım' bölümünden erişebilir, indirebilir veya paylaşabilirsiniz. Bazı sertifikalar, minimum başarı puanı veya tamamlama kriterlerini karşılamanızı gerektirebilir."
        },
        {
          id: "recommended-courses",
          question: "Bana hangi eğitimler öneriliyor?",
          answer: "Syneris, rolünüze, departmanınıza ve önceki eğitim performansınıza göre size özel eğitimler önerir. Önerilen eğitimleri ana sayfanızda veya 'Önerilen Eğitimler' bölümünde görebilirsiniz. Ayrıca yöneticiniz tarafından önerilen veya atanan eğitimler de olabilir."
        }
      ]
    },
    {
      id: "technical",
      title: "Teknik Sorunlar",
      questions: [
        {
          id: "video-not-playing",
          question: "Eğitim videoları oynatılmıyor, ne yapmalıyım?",
          answer: "Video oynatma sorunları yaşıyorsanız: 1) İnternet bağlantınızı kontrol edin, 2) Tarayıcınızı güncelleyin veya farklı bir tarayıcı deneyin, 3) Tarayıcı önbelleğini temizleyin, 4) Tarayıcı eklentilerini devre dışı bırakın. Sorun devam ederse, lütfen destek ekibiyle iletişime geçin ve hata mesajını veya ekran görüntüsünü paylaşın."
        },
        {
          id: "progress-not-saved",
          question: "İlerleme durumum kaydedilmiyor, neden?",
          answer: "İlerleme durumunuzun kaydedilmemesinin birkaç nedeni olabilir: 1) İnternet bağlantınızda kesinti olabilir, 2) Tarayıcı çerezleri devre dışı bırakılmış olabilir, 3) Oturumunuz zaman aşımına uğramış olabilir. Tarayıcı çerezlerinin etkin olduğundan emin olun ve eğitim modülünü tamamladıktan sonra 'Bitir' veya 'Kaydet' düğmesine tıklayın."
        },
        {
          id: "browser-compatibility",
          question: "Hangi tarayıcıları kullanabilirim?",
          answer: "Syneris, Google Chrome (v70+), Mozilla Firefox (v65+), Safari (v12+) ve Microsoft Edge (v80+) tarayıcılarının güncel sürümleriyle tam uyumludur. En iyi deneyim için bu tarayıcılardan birini kullanmanızı ve tarayıcınızı güncel tutmanızı öneririz. Internet Explorer desteklenmemektedir."
        },
        {
          id: "app-not-working",
          question: "Mobil uygulama çalışmıyor, nasıl düzeltebilirim?",
          answer: "Mobil uygulama sorunlarını çözmek için: 1) Uygulamayı güncellediğinizden emin olun, 2) Cihazınızı yeniden başlatın, 3) Uygulamayı kaldırıp yeniden yükleyin. Sorun devam ederse, uygulama mağazasındaki yorumlarda veya destek ekibiyle iletişime geçerek sorunu bildirin. Alternatif olarak, mobil web tarayıcınızı kullanabilirsiniz."
        }
      ]
    },
    {
      id: "synbot",
      title: "Synbot Asistanı",
      questions: [
        {
          id: "what-is-synbot",
          question: "Synbot nedir ve nasıl kullanılır?",
          answer: "Synbot, Syneris platformundaki yapay zeka destekli sanal asistanınızdır. Platform kullanımı, eğitim içerikleri, bankacılık süreçleri ve daha birçok konuda anlık yardım sağlar. Synbot'a platformun sağ alt köşesindeki ikon üzerinden erişebilir ve doğal dil ile sorularınızı sorabilirsiniz."
        },
        {
          id: "synbot-capabilities",
          question: "Synbot hangi konularda yardımcı olabilir?",
          answer: "Synbot, eğitim içeriklerini bulma, bankacılık terimleri ve süreçleri hakkında bilgi verme, sistem kullanım rehberliği, hesaplama yardımı, müşteri senaryoları oluşturma ve pratik öneriler sunma gibi konularda yardımcı olabilir. Ayrıca, sık sorulan soruları yanıtlar ve ilgili eğitimlere yönlendirme yapar."
        },
        {
          id: "synbot-learning",
          question: "Synbot öğrenebilir mi?",
          answer: "Evet, Synbot sürekli öğrenen bir yapay zeka sistemine sahiptir. Kullanıcı etkileşimlerinden ve geri bildirimlerinden öğrenir. Her görüşmenin sonunda 'Yardımcı oldu mu?' sorusuna verdiğiniz yanıtlar, Synbot'un gelişmesine katkıda bulunur. Spesifik geri bildirimlerinizi de iletebilirsiniz."
        },
        {
          id: "synbot-privacy",
          question: "Synbot konuşmalarım gizli midir?",
          answer: "Synbot ile yaptığınız konuşmalar gizlidir ve sadece hizmet kalitesini artırmak ve asistanı geliştirmek için kullanılır. Kişisel verileriniz, TEB'in gizlilik politikası ve KVKK kurallarına uygun olarak işlenir. Konuşma geçmişinizi 'Ayarlar > Synbot Ayarları' bölümünden silebilirsiniz."
        }
      ]
    }
  ];

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
            Sık Sorulan Sorular
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl mb-8"
          >
            Syneris kullanımı hakkında en çok sorulan sorular ve cevapları burada bulabilirsiniz.
          </motion.p>
        </div>
      </motion.div>

      {/* Arama Kutusu */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Sorularınızı arayın..."
              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-teb-blue focus:border-teb-blue"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teb-blue">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* FAQ İçeriği */}
      <div className="py-12 px-6 md:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Kategori Seçimi */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
              <h3 className="font-semibold text-lg text-gray-800 mb-4 pb-2 border-b border-gray-200">Kategoriler</h3>
              <ul className="space-y-2">
                {faqCategories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => setOpenCategory(category.id)}
                      className={`w-full text-left py-2 px-3 rounded-lg transition-colors duration-200 ${
                        openCategory === category.id
                          ? "bg-teb-blue bg-opacity-10 text-teb-blue"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {category.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Soru ve Cevaplar */}
          <div className="lg:col-span-3">
            {faqCategories.map((category) => (
              <div
                key={category.id}
                className={`mb-8 ${openCategory === category.id ? "block" : "hidden"}`}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">{category.title}</h2>
                
                <div className="space-y-4">
                  {category.questions.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(item.id)}
                        className="w-full px-6 py-4 flex justify-between items-center focus:outline-none"
                      >
                        <span className="font-medium text-lg text-gray-800">{item.question}</span>
                        <svg
                          className={`w-5 h-5 text-gray-500 transform transition-transform ${openQuestions[item.id] ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {openQuestions[item.id] && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                          <p className="text-gray-600">{item.answer}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Başka Sorunuz Var mı? */}
      <section className="py-16 px-6 md:px-10 lg:px-20 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Yanıtını Bulamadığınız Bir Sorunuz mu Var?</h2>
          <p className="text-lg text-gray-600 mb-8">Destek ekibimiz size yardımcı olmaktan memnuniyet duyacaktır. Synbot asistanına sorabilir veya doğrudan bizimle iletişime geçebilirsiniz.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/synbot">
              <span className="inline-block bg-white border border-gray-300 text-gray-800 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300 cursor-pointer">
                Synbot'a Sorun
              </span>
            </Link>
            <Link href="/help/contact">
              <span className="inline-block bg-teb-blue text-white px-8 py-3 rounded-lg font-medium hover:bg-teb-blue-dark transition-colors duration-300 cursor-pointer">
                İletişime Geçin
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage; 