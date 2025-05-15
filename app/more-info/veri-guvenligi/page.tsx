"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Clock, Shield, Lock, Database, FileCheck, Server } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VeriGuvenligiPage() {
  return (
    <div>
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <span>Daha Fazla Bilgi</span>
        <ChevronRight className="mx-1 h-4 w-4" />
        <span className="font-medium text-foreground">Veri Güvenliği</span>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Clock size={14} />
          <span>Son güncelleme: 20 Nisan 2023</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Veri Güvenliği ve Koruma Yöntemlerimiz
        </h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="bg-primary/5 p-6 rounded-xl border mb-8">
            <p className="text-primary font-medium mb-0">
              Syneris, müşteri verilerinin güvenliğini en yüksek öncelik olarak görmektedir. En gelişmiş güvenlik teknolojileri ve endüstri standartlarıyla verilerinizi koruma altına alıyoruz.
            </p>
          </div>
          
          <div className="relative w-full aspect-video rounded-xl overflow-hidden my-10">
            <Image 
              src="/images/data-security.webp" 
              alt="Syneris Veri Güvenliği"
              fill
              className="object-cover"
            />
          </div>
          
          <h2>Güvenlik Altyapımız</h2>
          
          <p>
            Syneris, kurumsal ve kişisel verilerinizi korumak için çok katmanlı bir güvenlik altyapısı kullanmaktadır. Modern tehditlere karşı koruma sağlamak için sürekli olarak yeni teknolojilere yatırım yapıyor ve güvenlik protokollerimizi güncelliyoruz.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 my-12">
            {[
              {
                title: "Veri Şifreleme",
                description: "Tüm veriler hem iletim sırasında (SSL/TLS) hem de durağan haldeyken (AES-256) endüstri standardı şifreleme protokolleri kullanılarak korunur.",
                icon: <Lock className="h-12 w-12 text-primary p-2 bg-primary/10 rounded-xl" />
              },
              {
                title: "Güvenli Veri Merkezi",
                description: "Verileriniz, fiziksel ve çevresel tehditlere karşı 7/24 güvenlik personeli, biyometrik erişim kontrolü ve çok faktörlü kimlik doğrulama ile korunan Tier IV veri merkezlerinde saklanır.",
                icon: <Server className="h-12 w-12 text-primary p-2 bg-primary/10 rounded-xl" />
              },
              {
                title: "Veri Yedekleme",
                description: "Otomatik ve düzenli yedekleme politikalarımız, veri kaybını önlemek için birden fazla coğrafi konumda şifreli yedekler oluşturur.",
                icon: <Database className="h-12 w-12 text-primary p-2 bg-primary/10 rounded-xl" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl border shadow-sm"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
          
          <h2>Sertifikasyonlar ve Uyumluluk</h2>
          
          <p>
            Syneris, veri güvenliği ve gizlilik konusundaki en yüksek standartlara bağlıdır. Aşağıdaki sertifikalara ve uyumluluk standartlarına sahibiz:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
            {[
              {
                title: "ISO 27001",
                description: "Bilgi Güvenliği Yönetim Sistemi",
                logo: "/images/certifications/iso27001.svg"
              },
              {
                title: "KVKK",
                description: "Kişisel Verilerin Korunması Kanunu",
                logo: "/images/certifications/kvkk.svg"
              },
              {
                title: "GDPR",
                description: "Avrupa Birliği Genel Veri Koruma Tüzüğü",
                logo: "/images/certifications/gdpr.svg"
              },
              {
                title: "SOC 2 Type II",
                description: "Hizmet Organizasyonu Kontrolleri",
                logo: "/images/certifications/soc2.svg"
              },
              {
                title: "PCI DSS",
                description: "Ödeme Kartı Endüstrisi Veri Güvenlik Standardı",
                logo: "/images/certifications/pcidss.svg"
              },
              {
                title: "HIPAA",
                description: "Sağlık Sigortası Taşınabilirlik ve Sorumluluk Yasası",
                logo: "/images/certifications/hipaa.svg"
              }
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-card p-4 border rounded-lg flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 mb-3 relative">
                  <Image 
                    src={cert.logo} 
                    alt={cert.title}
                    width={64}
                    height={64}
                  />
                </div>
                <h4 className="font-semibold">{cert.title}</h4>
                <p className="text-sm text-muted-foreground">{cert.description}</p>
              </motion.div>
            ))}
          </div>
          
          <h2>Güvenlik Önlemlerimiz</h2>
          
          <div className="space-y-6 my-8">
            {[
              {
                title: "Düzenli Güvenlik Denetimleri",
                description: "Sistemlerimiz, bağımsız siber güvenlik uzmanları tarafından düzenli olarak penetrasyon testlerine ve güvenlik denetimlerine tabi tutulur.",
                icon: <FileCheck className="h-6 w-6 text-primary" />
              },
              {
                title: "Çok Faktörlü Kimlik Doğrulama (MFA)",
                description: "Tüm kullanıcı hesapları için MFA desteği sunarak, yetkisiz erişimleri önlüyoruz.",
                icon: <Shield className="h-6 w-6 text-primary" />
              },
              {
                title: "Güvenlik İzleme ve Olay Müdahalesi",
                description: "7/24 güvenlik izleme sistemlerimiz, potansiyel tehditleri anında tespit eder ve müdahale ekibimiz hızla harekete geçer.",
                icon: <Shield className="h-6 w-6 text-primary" />
              },
              {
                title: "Güvenli Yazılım Geliştirme",
                description: "Yazılım geliştirme sürecimiz, güvenli kodlama uygulamalarını, düzenli kod incelemelerini ve otomatik güvenlik testlerini içerir.",
                icon: <Shield className="h-6 w-6 text-primary" />
              },
              {
                title: "Veri Erişim Kontrolü",
                description: "En az ayrıcalık prensibi uygulanarak, çalışanlarımızın görevlerini yerine getirmek için ihtiyaç duydukları minimum düzeyde veri erişimi sağlanır.",
                icon: <Shield className="h-6 w-6 text-primary" />
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
          
          <h2>Verilerin Silinmesi ve İmhası</h2>
          
          <p>
            Syneris, veri yaşam döngüsünün sonunda verilerin güvenli bir şekilde silinmesini ve imha edilmesini sağlar:
          </p>
          
          <ul>
            <li>Saklama süreleri sona eren veriler, otomatik olarak silinir veya anonimleştirilir.</li>
            <li>Fiziksel depolama ortamları, verilerin kurtarılamayacak şekilde imha edilmesini sağlayan endüstri standardı yöntemlerle temizlenir.</li>
            <li>Bulut depolama alanlarından silinen veriler, birden fazla üzerine yazma işlemiyle kalıcı olarak kaldırılır.</li>
          </ul>
          
          <h2>Veri İhlali Müdahale Planı</h2>
          
          <p>
            Olası bir veri ihlali durumunda, kapsamlı bir müdahale planımız bulunmaktadır:
          </p>
          
          <ol>
            <li><strong>Tespit ve Analiz:</strong> İhlal tespit edilir, kapsamı ve etkilenen veriler belirlenir.</li>
            <li><strong>Sınırlama ve Etkisizleştirme:</strong> İhlal kaynağı izole edilir ve daha fazla veri kaybı önlenir.</li>
            <li><strong>Bildirim:</strong> Etkilenen kullanıcılar ve ilgili düzenleyici kurumlar, yasal zaman çerçevesinde bilgilendirilir.</li>
            <li><strong>Kurtarma:</strong> Sistemler güvenli bir duruma getirilir ve normal operasyonlara dönülür.</li>
            <li><strong>İyileştirme:</strong> İhlalden alınan dersler değerlendirilir ve güvenlik önlemleri güçlendirilir.</li>
          </ol>
          
          <div className="bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-xl border border-indigo-100 dark:border-indigo-900 my-8">
            <h3 className="text-xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300">Müşterilerimizin Sorumlulukları</h3>
            <p className="text-indigo-700/80 dark:text-indigo-300/80 mb-0">
              Veri güvenliği, ortak bir sorumluluktur. Hesap güvenliğinizi sağlamak için güçlü şifreler kullanmanızı, çok faktörlü kimlik doğrulamayı etkinleştirmenizi ve hesaplarınızı düzenli olarak kontrol etmenizi öneririz. Şüpheli herhangi bir etkinlik fark ederseniz, lütfen derhal güvenlik ekibimizle iletişime geçin.
            </p>
          </div>
          
          <h2>İletişim</h2>
          
          <p>
            Veri güvenliği uygulamalarımız hakkında daha fazla bilgi için veya güvenlikle ilgili endişelerinizi bildirmek için lütfen bizimle iletişime geçin:
          </p>
          
          <div className="p-4 border rounded-lg bg-card my-6">
            <p className="m-0">
              <strong>Syneris Güvenlik Ekibi</strong><br />
              E-posta: security@syneris.com<br />
              Telefon: +90 212 123 4567 (7/24 Güvenlik Hattı)
            </p>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl border">
          <div>
            <h3 className="text-xl font-semibold mb-2">Veri güvenliği hakkında daha fazla bilgi alın</h3>
            <p className="text-muted-foreground">Güvenlik uygulamalarımız hakkında detaylı teknik dökümanlarımızı inceleyin.</p>
          </div>
          <Button size="lg" className="mt-4 md:mt-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
            Teknik Dokümanları İndirin
          </Button>
        </div>
      </motion.div>
    </div>
  );
} 