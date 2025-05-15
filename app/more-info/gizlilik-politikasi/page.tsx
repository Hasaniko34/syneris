"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Clock, Shield, LockKeyhole, Eye, File, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GizlilikPolitikasiPage() {
  return (
    <div>
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <span>Daha Fazla Bilgi</span>
        <ChevronRight className="mx-1 h-4 w-4" />
        <span className="font-medium text-foreground">Gizlilik Politikası</span>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Clock size={14} />
          <span>Son güncelleme: 15 Haziran 2023</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Gizlilik Politikası
        </h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="bg-primary/5 p-6 rounded-xl border mb-8">
            <p className="text-primary font-medium mb-0">
              Syneris olarak, gizliliğinize saygı duyuyor ve verilerinizin korunmasına büyük önem veriyoruz. Bu gizlilik politikası, platformumuz aracılığıyla topladığımız kişisel verilerin nasıl işlendiğini açıklamaktadır.
            </p>
          </div>
          
          <h2>1. Topladığımız Bilgiler</h2>
          
          <p>
            Syneris, hizmetlerimizi sağlamak, iyileştirmek ve özelleştirmek için aşağıdaki türde bilgileri toplayabilir:
          </p>
          
          <div className="space-y-4 my-6">
            {[
              {
                title: "Hesap Bilgileri",
                description: "Ad, soyad, e-posta adresi, şirket adı, pozisyon ve diğer iletişim bilgileri.",
                icon: <File className="h-5 w-5 text-primary" />
              },
              {
                title: "Kullanım Verileri",
                description: "Platform üzerindeki etkinlikleriniz, tamamlanan eğitimler, test sonuçları ve performans ölçümleri.",
                icon: <Eye className="h-5 w-5 text-primary" />
              },
              {
                title: "Teknik Veriler",
                description: "IP adresi, tarayıcı tipi, cihaz bilgileri, ziyaret edilen sayfalar ve oturum süreleri.",
                icon: <Fingerprint className="h-5 w-5 text-primary" />
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-1">{item.icon}</div>
                <div>
                  <h4 className="font-semibold text-base">{item.title}</h4>
                  <p className="text-muted-foreground mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <h2>2. Verilerin Kullanımı</h2>
          
          <p>
            Topladığımız bilgileri aşağıdaki amaçlar için kullanırız:
          </p>
          
          <ul>
            <li>Hesabınızı oluşturmak ve yönetmek</li>
            <li>Hizmetlerimizi sağlamak, sürdürmek ve iyileştirmek</li>
            <li>Kişiselleştirilmiş öğrenme deneyimleri sunmak</li>
            <li>Kullanıcı davranışlarını analiz etmek ve hizmet kalitemizi artırmak</li>
            <li>Teknik sorunları teşhis etmek ve çözmek</li>
            <li>Güvenlik ve dolandırıcılık tespiti</li>
            <li>Yasal yükümlülüklerimizi yerine getirmek</li>
          </ul>
          
          <h2>3. Veri Paylaşımı</h2>
          
          <p>
            Verilerinizi aşağıdaki durumlar dışında üçüncü taraflarla paylaşmıyoruz:
          </p>
          
          <ul>
            <li>Sizin açık izniniz olduğunda</li>
            <li>Kurumsal müşterilerimiz için, şirketinizin yetkili temsilcileriyle</li>
            <li>Hizmet sağlayıcılarımızla (veri depolama, analitik gibi)</li>
            <li>Yasal zorunluluk durumlarında</li>
            <li>Şirket birleşmesi veya satın alınması durumunda</li>
          </ul>
          
          <h2>4. Veri Güvenliği</h2>
          
          <p>
            Syneris, verilerinizin güvenliğini sağlamak için endüstri standardı önlemler uygulamaktadır:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            {[
              {
                title: "Şifreleme",
                description: "Hassas veriler, iletim sırasında ve depolanırken SSL/TLS protokolleri kullanılarak şifrelenir.",
                icon: <LockKeyhole className="h-8 w-8 text-primary p-1 bg-primary/10 rounded-lg" />
              },
              {
                title: "Erişim Kontrolü",
                description: "Verilere erişim, yalnızca işleri için gerekli olan yetkili personel ile sınırlıdır.",
                icon: <Shield className="h-8 w-8 text-primary p-1 bg-primary/10 rounded-lg" />
              }
            ].map((item, index) => (
              <div key={index} className="p-4 border rounded-xl bg-card">
                <div className="flex items-center gap-3 mb-3">
                  {item.icon}
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
          
          <h2>5. Kullanıcı Hakları</h2>
          
          <p>
            KVKK ve GDPR gibi gizlilik düzenlemeleri uyarınca, kullanıcılarımız aşağıdaki haklara sahiptir:
          </p>
          
          <ul>
            <li>Kişisel verilerinize erişim talep etme</li>
            <li>Yanlış veya eksik bilgilerin düzeltilmesini isteme</li>
            <li>Verilerinizin silinmesini talep etme ("unutulma hakkı")</li>
            <li>Veri işleme kısıtlaması talep etme</li>
            <li>Veri taşınabilirliği hakkı</li>
            <li>İşlemeye itiraz etme hakkı</li>
          </ul>
          
          <p>
            Bu haklarınızı kullanmak için <a href="mailto:privacy@syneris.com">privacy@syneris.com</a> adresine e-posta gönderebilirsiniz.
          </p>
          
          <h2>6. Çerezler ve Takip Teknolojileri</h2>
          
          <p>
            Syneris, kullanıcı deneyimini geliştirmek ve platform kullanımını analiz etmek için çerezler ve benzer teknolojiler kullanmaktadır. Bu teknolojiler, oturum bilgilerini, tercihlerinizi ve platform üzerindeki hareketlerinizi kaydedebilir.
          </p>
          
          <p>
            Çerez kullanımını tarayıcı ayarlarınızdan kontrol edebilirsiniz. Ancak, çerezleri devre dışı bırakmanın bazı hizmetlerimizin işlevselliğini etkileyebileceğini unutmayın.
          </p>
          
          <h2>7. Veri Saklama</h2>
          
          <p>
            Kişisel verilerinizi, hizmetlerimizi sağlamak için gerekli olduğu sürece veya yasal yükümlülüklerimizi yerine getirmek için gereken süre boyunca saklarız.
          </p>
          
          <p>
            Hesabınızı silmeniz durumunda, verileriniz aktif sistemlerimizden kaldırılır, ancak yasal yükümlülüklerimizi yerine getirmek için bazı bilgiler daha uzun süre saklanabilir.
          </p>
          
          <h2>8. Çocukların Gizliliği</h2>
          
          <p>
            Syneris hizmetleri 18 yaş ve üzeri kişiler için tasarlanmıştır. Bilerek 18 yaşın altındaki kişilerden kişisel veri toplamıyoruz. 18 yaşın altındaki bir kişinin verilerini topladığımızı fark edersek, bu bilgileri sistemlerimizden derhal sileriz.
          </p>
          
          <h2>9. Politika Değişiklikleri</h2>
          
          <p>
            Bu Gizlilik Politikası'nı zaman zaman güncelleyebiliriz. Herhangi bir değişiklik yapılması durumunda, güncellenmiş politikayı web sitemizde yayınlayacak ve önemli değişiklikler için size bildirim göndereceğiz.
          </p>
          
          <h2>10. İletişim Bilgileri</h2>
          
          <p>
            Bu Gizlilik Politikası veya veri uygulamalarımız hakkında herhangi bir sorunuz veya endişeniz varsa, lütfen bizimle şu adresten iletişime geçin:
          </p>
          
          <div className="p-4 border rounded-lg bg-card my-6">
            <p className="m-0">
              <strong>Syneris Veri Koruma Görevlisi</strong><br />
              E-posta: privacy@syneris.com<br />
              Adres: Levent Mh. Büyükdere Cd. No:123, 34394 İstanbul, Türkiye<br />
              Telefon: +90 212 123 4567
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Bu gizlilik politikası hakkında sorularınız mı var?</p>
          <Button className="rounded-full" size="lg" variant="outline">
            Bize Ulaşın
          </Button>
        </div>
      </motion.div>
    </div>
  );
} 