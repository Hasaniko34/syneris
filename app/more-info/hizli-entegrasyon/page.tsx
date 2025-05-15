"use client";

import React from "react";
import Image from "next/image";
import { motion } from "@/components/motion-wrapper";
import { ChevronRight, Clock, Share2, Zap, Link, Settings, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HizliEntegrasyonPage() {
  return (
    <div>
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <span>Daha Fazla Bilgi</span>
        <ChevronRight className="mx-1 h-4 w-4" />
        <span className="font-medium text-foreground">Hızlı Entegrasyon</span>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Clock size={14} />
          <span>Son güncelleme: 10 Mayıs 2023</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Sorunsuz ve Hızlı Entegrasyon
        </h1>
        
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10">
          <Image 
            src="/images/integration.webp" 
            alt="Syneris Entegrasyon"
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="bg-primary/5 p-6 rounded-xl border mb-8">
            <p className="text-primary font-medium mb-0">
              Syneris, mevcut sistemlerinize hızlı ve kolay entegrasyon sağlayarak, kurumunuzun dijital ekosistemini bozmadan öğrenme deneyimini zenginleştirir. Modern API'lar, hazır konektörler ve esnek mimarisi sayesinde, hızlı kurulum ve sorunsuz veri akışı ile dijital dönüşüm yolculuğunuzu hızlandırın.
            </p>
          </div>
          
          <h2>Entegrasyon Kolaylığı</h2>
          
          <p>
            Syneris'i kurumsal sistemlerinizle entegre etmek, uzun ve karmaşık bir süreç değildir. Platformumuz, sektör standartlarını destekleyen modern API'lar ve hazır konektörlerle, mevcut iş akışlarınıza minimum kesinti ile dahil olur.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 my-12">
            {[
              {
                title: "Açık API Mimarisi",
                description: "RESTful API'lar ve GraphQL desteği ile tüm sistem özelliklerine programatik erişim sağlayın, özel entegrasyonlar geliştirin.",
                icon: <Code className="h-12 w-12 text-primary p-2 bg-primary/10 rounded-xl" />
              },
              {
                title: "Hazır Konektörler",
                description: "80+ popüler kurumsal uygulama için önceden yapılandırılmış entegrasyonlar ile zaman kazanın ve hemen kullanmaya başlayın.",
                icon: <Link className="h-12 w-12 text-primary p-2 bg-primary/10 rounded-xl" />
              },
              {
                title: "Hızlı Kurulum",
                description: "Ortalama 2-4 hafta içerisinde tam entegrasyon ile sistemlerinizin sorunsuz iletişim kurmasını sağlayın.",
                icon: <Zap className="h-12 w-12 text-primary p-2 bg-primary/10 rounded-xl" />
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl border shadow-sm"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
          
          <h2>Desteklenen Entegrasyon Noktaları</h2>
          
          <p>
            Syneris, kurumsal ekosisteminizin tüm temel bileşenleriyle entegre olur, böylece verileriniz ve iş süreçleriniz kesintisiz bir şekilde akar.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12">
            {[
              {
                title: "İnsan Kaynakları",
                systems: "SAP SuccessFactors, Workday, Oracle HCM, BambooHR",
                icon: "/images/integrations/hr.svg"
              },
              {
                title: "İş Zekası",
                systems: "Tableau, Power BI, Looker, QlikView",
                icon: "/images/integrations/bi.svg"
              },
              {
                title: "CRM Sistemleri",
                systems: "Salesforce, HubSpot, Zoho, Microsoft Dynamics",
                icon: "/images/integrations/crm.svg"
              },
              {
                title: "ERP Çözümleri",
                systems: "SAP, Oracle, Microsoft Dynamics, NetSuite",
                icon: "/images/integrations/erp.svg"
              },
              {
                title: "İletişim Araçları",
                systems: "Slack, Microsoft Teams, Zoom, Google Meet",
                icon: "/images/integrations/comm.svg"
              },
              {
                title: "Proje Yönetimi",
                systems: "Jira, Asana, Monday, Trello, ClickUp",
                icon: "/images/integrations/project.svg"
              },
              {
                title: "Belge Yönetimi",
                systems: "SharePoint, Google Drive, Dropbox, OneDrive",
                icon: "/images/integrations/docs.svg"
              },
              {
                title: "Kimlik Yönetimi",
                systems: "Okta, Azure AD, OneLogin, Ping Identity",
                icon: "/images/integrations/identity.svg"
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-card p-4 rounded-xl border text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 mb-3 relative">
                  <Image 
                    src={category.icon} 
                    alt={category.title}
                    width={48}
                    height={48}
                  />
                </div>
                <h4 className="font-semibold text-base">{category.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{category.systems}</p>
              </motion.div>
            ))}
          </div>
          
          <h2>Entegrasyon Süreci</h2>
          
          <p>
            Entegrasyon sürecimiz, ihtiyaçlarınızı anlamakla başlar ve eksiksiz bir şekilde çalışan bir bağlantı ile sonuçlanır. Her adımda uzman ekibimiz yanınızda olur.
          </p>
          
          <ol className="space-y-8 mt-8 counter-reset-none list-none pl-0">
            {[
              {
                title: "Keşif ve Planlama",
                description: "Mevcut sistemlerinizi, veri yapılarınızı ve iş akışlarınızı analiz eder, entegrasyon gereksinimlerinizi belirleriz."
              },
              {
                title: "Mimari Tasarım",
                description: "İhtiyaçlarınıza özel entegrasyon mimarisini tasarlar, hangi API'ların ve konektörlerin kullanılacağını kararlaştırırız."
              },
              {
                title: "Geliştirme ve Konfigürasyon",
                description: "Entegrasyon noktalarını yapılandırır, gerekli özelleştirmeleri yapar ve veri eşleştirmelerini gerçekleştiririz."
              },
              {
                title: "Test ve Doğrulama",
                description: "Entegrasyonları kapsamlı testlerden geçirir, veri bütünlüğünü ve sistemler arası iletişimi doğrularız."
              },
              {
                title: "Canlıya Alma ve İzleme",
                description: "Entegrasyonu sorunsuz bir şekilde canlı ortama alır, başlangıç döneminde yakından izleyerek herhangi bir sorunu hızla çözeriz."
              }
            ].map((step, index) => (
              <li key={index} className="relative pl-16">
                <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-xl">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
          
          <h2>Entegrasyon Özellikleri</h2>
          
          <div className="space-y-6 my-8">
            {[
              {
                title: "Tek Oturum Açma (SSO)",
                description: "SAML, OAuth ve OpenID Connect protokollerini destekleyen güvenli kimlik doğrulama entegrasyonu ile kullanıcılarınıza sorunsuz erişim sağlayın.",
                icon: <Settings className="h-6 w-6 text-primary" />
              },
              {
                title: "Otomatik Kullanıcı Yönetimi",
                description: "HR sistemlerinden otomatik kullanıcı provizyon ve deprovizyon işlemleri ile yönetim yükünüzü azaltın.",
                icon: <Share2 className="h-6 w-6 text-primary" />
              },
              {
                title: "Gerçek Zamanlı Veri Senkronizasyonu",
                description: "Sistemler arasında gerçek zamanlı veri akışı ile güncel bilgilere her zaman erişin.",
                icon: <Zap className="h-6 w-6 text-primary" />
              },
              {
                title: "Webhook Desteği",
                description: "Önemli olaylarda otomatik bildirimler ve tetikleyiciler oluşturun, iş akışlarınızı otomatikleştirin.",
                icon: <Code className="h-6 w-6 text-primary" />
              },
              {
                title: "Güvenli Veri Transferi",
                description: "TLS/SSL şifreleme ve güvenli token tabanlı yetkilendirme ile verilerinizi koruyun.",
                icon: <Link className="h-6 w-6 text-primary" />
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="mt-1">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <h2>Entegrasyon Başarı Örnekleri</h2>
          
          <div className="bg-muted p-6 rounded-xl my-8 border">
            <h3 className="text-xl font-semibold mb-4">Vaka Çalışması: Finans Sektörü Lider Şirketi</h3>
            <p className="text-muted-foreground">
              5.000+ çalışanı olan bir finans kuruluşu, Syneris'i Workday HR sistemi, Salesforce CRM ve Microsoft Teams ile entegre ederek, merkezi bir öğrenme ekosistemi kurdu. Entegrasyon süreci sadece 3 hafta sürdü ve canlıya alındıktan sonra manuel veri girişi gerektiren süreçlerde %95 azalma sağlandı.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div className="p-3 bg-card rounded-lg border">
                <div className="text-xl font-bold text-primary">3 Hafta</div>
                <div className="text-xs text-muted-foreground">Entegrasyon Süresi</div>
              </div>
              <div className="p-3 bg-card rounded-lg border">
                <div className="text-xl font-bold text-primary">%95</div>
                <div className="text-xs text-muted-foreground">Manuel İş Azalması</div>
              </div>
              <div className="p-3 bg-card rounded-lg border">
                <div className="text-xl font-bold text-primary">%100</div>
                <div className="text-xs text-muted-foreground">Veri Doğruluğu</div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 my-12">
            {[
              {
                company: "Teknoloji Firması",
                employees: "3,000+ çalışan",
                integration: "HRIS, LMS, İçerik Yönetim Sistemi",
                result: "Eğitim içeriklerinin tek noktadan yönetimi ve %40 daha hızlı içerik dağıtımı.",
                time: "4 hafta"
              },
              {
                company: "Perakende Zinciri",
                employees: "12,000+ çalışan",
                integration: "SAP, Microsoft Teams, Power BI",
                result: "Mağaza eğitim performansı ve satış sonuçları arasında korelasyon analizi.",
                time: "6 hafta"
              }
            ].map((case_study, index) => (
              <div key={index} className="bg-card p-5 rounded-lg border">
                <h4 className="font-semibold mb-3">{case_study.company}</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Çalışan Sayısı:</strong> {case_study.employees}</div>
                  <div><strong>Entegrasyon:</strong> {case_study.integration}</div>
                  <div><strong>Sonuç:</strong> {case_study.result}</div>
                  <div><strong>Süre:</strong> {case_study.time}</div>
                </div>
              </div>
            ))}
          </div>
          
          <h2>Teknik Dokümanlar ve Kaynaklar</h2>
          
          <p>
            Entegrasyon sürecini kolaylaştırmak için kapsamlı teknik dokümanlar, API referansları ve örnek kodlar sunuyoruz.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            {[
              {
                title: "API Referansı",
                description: "Tüm API endpoint'leri için detaylı dokümantasyon ve örnek istekler",
                link: "#"
              },
              {
                title: "Entegrasyon Kılavuzu",
                description: "Adım adım entegrasyon süreci ve best practice önerileri",
                link: "#"
              },
              {
                title: "Webhook Kullanımı",
                description: "Olay tabanlı mimarileri kurmak için webhook yapılandırması",
                link: "#"
              }
            ].map((resource, index) => (
              <div key={index} className="bg-card p-4 rounded-lg border hover:border-primary transition-colors">
                <h4 className="font-semibold">{resource.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                <a href={resource.link} className="text-primary text-sm font-medium">Daha fazla bilgi →</a>
              </div>
            ))}
          </div>
          
          <blockquote>
            "Syneris'in entegrasyon yetenekleri, kurumsal sistemlerimizle sorunsuz bir şekilde çalışarak, eğitim platformumuzu diğer iş uygulamalarımızla birleştirmemizi sağladı. Bu sayede çalışanlarımızın performans verileri ile eğitim sonuçları arasında ilişki kurabiliyoruz."
            <footer>
              <cite>— Mehmet Kaya, IT Direktörü, Atlas Holding</cite>
            </footer>
          </blockquote>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl border">
          <div>
            <h3 className="text-xl font-semibold mb-2">Mevcut sistemlerinize nasıl entegre edeceğinizi keşfedin</h3>
            <p className="text-muted-foreground">Teknik ekibimiz, kurumunuza özel entegrasyon çözümleri sunmak için hazır.</p>
          </div>
          <Button size="lg" className="mt-4 md:mt-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
            Teknik Demo Talep Et
          </Button>
        </div>
      </motion.div>
    </div>
  );
} 