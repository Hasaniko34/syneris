"use client";

import React from "react";
import { motion } from "@/components/motion-wrapper";
import { ChevronRight, Clock, Scale, FileCheck, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function KullanimKosullariPage() {
  return (
    <div>
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <span>Daha Fazla Bilgi</span>
        <ChevronRight className="mx-1 h-4 w-4" />
        <span className="font-medium text-foreground">Kullanım Koşulları</span>
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
          Kullanım Koşulları
        </h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="bg-primary/5 p-6 rounded-xl border mb-8">
            <p className="text-primary font-medium mb-0">
              Bu Kullanım Koşulları ("Koşullar"), Syneris platformunu kullanımınızı düzenleyen yasal anlaşmadır. Platform'a erişerek veya kullanarak bu Koşulları kabul etmiş sayılırsınız. Lütfen dikkatlice okuyunuz.
            </p>
          </div>
          
          <h2>1. Tanımlar</h2>
          <ul>
            <li><strong>"Syneris"</strong>, "biz", "bizim" veya "bize" ifadeleri, platformun sahibi ve işletmecisi olan Syneris Teknoloji A.Ş.'yi ifade eder.</li>
            <li><strong>"Platform"</strong>, Syneris web sitesini, mobil uygulamasını ve sunduğu tüm hizmetleri kapsar.</li>
            <li><strong>"Kullanıcı"</strong>, "siz" veya "sizin" ifadeleri, Platformu herhangi bir şekilde kullanan kişi veya kurumu ifade eder.</li>
            <li><strong>"İçerik"</strong>, Platform üzerinde bulunan veya Platform aracılığıyla erişilebilen tüm metin, grafikler, fotoğraflar, videolar, yazılımlar, ses ve diğer materyalleri kapsar.</li>
          </ul>
          
          <h2>2. Hesap Kaydı ve Güvenlik</h2>
          <p>
            Syneris'in bazı özelliklerini kullanabilmek için bir hesap oluşturmanız gerekebilir. Hesap oluşturduğunuzda, aşağıdaki koşulları kabul etmiş olursunuz:
          </p>
          <ul>
            <li>Doğru, güncel ve eksiksiz bilgi sağlayacağınızı</li>
            <li>Hesabınızın güvenliğini koruyacağınızı ve şifrenizi gizli tutacağınızı</li>
            <li>Hesabınızdan gerçekleştirilen tüm etkinliklerden sorumlu olduğunuzu</li>
            <li>Hesap güvenliğinizde bir ihlal olduğunu fark etmeniz durumunda, derhal bizi bilgilendireceğinizi</li>
          </ul>
          
          <div className="bg-card border rounded-xl p-6 my-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
              <h3 className="m-0 text-lg font-semibold">Önemli Uyarı</h3>
            </div>
            <p className="m-0 text-muted-foreground">
              Hesabınızı başkalarıyla paylaşmanız veya başkalarının hesabınıza erişmesine izin vermeniz durumunda, bu Koşulların ihlali söz konusu olabilir ve hesabınızın askıya alınmasına veya sonlandırılmasına neden olabilir.
            </p>
          </div>
          
          <h2>3. Lisans ve Kullanım Kısıtlamaları</h2>
          <p>
            Syneris, bu Koşullara uygun olarak Platformu ve İçeriği kullanmanız için size sınırlı, münhasır olmayan, devredilemez, alt lisanslanamaz bir lisans vermektedir. Bu lisans aşağıdaki kısıtlamalara tabidir:
          </p>
          <ul>
            <li>Platform'u yasa dışı amaçlar için kullanamazsınız</li>
            <li>Platform'un kaynak kodunu tersine mühendislik, decompile veya disassemble işlemlerine tabi tutamazsınız</li>
            <li>İçeriği Syneris'in yazılı izni olmadan kopyalayamaz, çoğaltamaz, dağıtamaz veya türev çalışmalar oluşturamazsınız</li>
            <li>Platform'un normal işleyişini engelleyecek veya aşırı yük bindirecek faaliyetlerde bulunamazsınız</li>
            <li>Platform güvenliğini tehlikeye atacak eylemlerde bulunamazsınız</li>
          </ul>
          
          <h2>4. Fikri Mülkiyet Hakları</h2>
          <p>
            Platform ve İçerik (kullanıcı tarafından oluşturulan içerik hariç), Syneris'in veya lisans verenlerinin mülkiyetindedir ve telif hakkı, ticari marka ve diğer fikri mülkiyet yasaları tarafından korunmaktadır. Bu Koşullar'da açıkça belirtilmedikçe, Platform veya İçerik üzerinde herhangi bir hak, unvan veya menfaat size devredilmemektedir.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            {[
              {
                title: "Syneris'in Fikri Mülkiyeti",
                description: "Syneris logosu, ticari markası, hizmet markası, grafikleri, arayüzü, ses dosyaları ve yazılım kodu dahil ancak bunlarla sınırlı olmamak üzere tüm öğeler Syneris'in mülkiyetindedir.",
                icon: <FileCheck className="h-8 w-8 text-primary p-1 bg-primary/10 rounded-lg" />
              },
              {
                title: "Kullanıcı İçeriği",
                description: "Platform'a yüklediğiniz tüm içerikler üzerindeki mülkiyet hakkı size aittir. Ancak, bu içeriği Platform üzerinde paylaşarak, Syneris'e bu içeriği kullanma, kopyalama ve dağıtma hakkı vermiş olursunuz.",
                icon: <RefreshCw className="h-8 w-8 text-primary p-1 bg-primary/10 rounded-lg" />
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
          
          <h2>5. Kullanıcı İçeriği ve Davranış Kuralları</h2>
          <p>
            Platform'a içerik yüklerken veya paylaşırken, aşağıdaki kurallara uymayı kabul edersiniz:
          </p>
          <ul>
            <li>Yasa dışı, taciz edici, tehdit edici, zararlı, iftira niteliğinde veya başka şekilde uygunsuz içerik paylaşmayacağınızı</li>
            <li>Başkalarının fikri mülkiyet haklarını ihlal eden içerik paylaşmayacağınızı</li>
            <li>Spam veya istenmeyen ticari mesajlar göndermeyeceğinizi</li>
            <li>Kötü amaçlı yazılım veya virüs içeren dosyalar yüklemeyeceğinizi</li>
            <li>Başka kullanıcıların kimliğine bürünmeyeceğinizi</li>
          </ul>
          
          <h2>6. Abonelik ve Ödeme</h2>
          <p>
            Syneris, ücretli abonelik hizmetleri sunmaktadır. Bir abonelik satın alarak, aşağıdaki koşulları kabul etmiş olursunuz:
          </p>
          <ul>
            <li>Ödeme bilgilerinizin doğru ve güncel olduğunu</li>
            <li>Abonelik ücretlerinizin, seçtiğiniz ödeme yöntemi kullanılarak otomatik olarak yenileneceğini (farklı bir düzenleme yapılmadığı sürece)</li>
            <li>Aboneliğinizi istediğiniz zaman iptal edebileceğinizi, ancak ödenen ücretlerin iade edilmeyeceğini</li>
            <li>Syneris'in önceden bildirimde bulunarak ücretleri değiştirebileceğini</li>
          </ul>
          
          <h2>7. Sorumluluk Sınırlaması</h2>
          <p>
            Syneris, Platform'un kesintisiz veya hatasız çalışacağını garanti etmez. Platform "olduğu gibi" ve "mevcut olduğu şekliyle" sağlanmaktadır. Kanunların izin verdiği azami ölçüde, Syneris ve bağlı kuruluşları, yöneticileri, çalışanları ve acenteleri, aşağıdakilerle ilgili olarak size veya herhangi bir üçüncü tarafa karşı sorumlu olmayacaktır:
          </p>
          <ul>
            <li>Platform kullanımınızdan kaynaklanan doğrudan, dolaylı, arızi, özel, cezai veya sonuç niteliğindeki zararlar</li>
            <li>Platform'da yaşanan kesintiler veya arızalar</li>
            <li>Verilerinizin kaybı veya sızması</li>
            <li>Platform aracılığıyla erişilen üçüncü taraf web siteleri veya hizmetleri</li>
          </ul>
          
          <h2>8. Tazminat</h2>
          <p>
            Bu Koşulları ihlal etmenizden, Platform'u kullanmanızdan veya Kullanıcı İçeriğinizden kaynaklanan tüm iddia, dava, talep, zarar, yükümlülük, kayıp, masraf ve giderlerden (makul avukatlık ücretleri dahil) Syneris'i, yöneticilerini, çalışanlarını ve acentelerini muaf tutmayı ve zarar görmemelerini sağlamayı kabul edersiniz.
          </p>
          
          <h2>9. Sözleşmenin Feshi</h2>
          <p>
            Syneris, kendi takdirine bağlı olarak, herhangi bir zamanda ve herhangi bir sebeple, önceden bildirimde bulunarak veya bulunmaksızın, Platform'a erişiminizi veya Hesabınızı askıya alabilir veya sonlandırabilir.
          </p>
          <p>
            Siz de, Hesabınızı silmek ve Platform'u kullanmayı bırakmak suretiyle bu Koşullar'ı istediğiniz zaman feshedebilirsiniz.
          </p>
          
          <h2>10. Değişiklikler</h2>
          <p>
            Syneris, bu Koşullar'ı zaman zaman değiştirebilir. Değişiklikler, Platform üzerinden yayınlandıktan sonra geçerli olacaktır. Değişikliklerden sonra Platform'u kullanmaya devam etmeniz, güncellenmiş Koşullar'ı kabul ettiğiniz anlamına gelir.
          </p>
          
          <h2>11. Genel Hükümler</h2>
          <ul>
            <li><strong>Geçerli Hukuk:</strong> Bu Koşullar, Türkiye Cumhuriyeti kanunlarına tabidir.</li>
            <li><strong>Anlaşmazlık Çözümü:</strong> Bu Koşullar'dan kaynaklanan tüm anlaşmazlıklar, İstanbul Mahkemeleri ve İcra Daireleri'nin münhasır yargı yetkisine tabi olacaktır.</li>
            <li><strong>Bölünebilirlik:</strong> Bu Koşullar'ın herhangi bir hükmünün geçersiz veya uygulanamaz olduğu belirlenirse, geri kalan hükümler tam olarak yürürlükte kalmaya devam edecektir.</li>
            <li><strong>Feragat:</strong> Syneris'in bu Koşullar'ın herhangi bir hükmünü uygulamadaki gecikmesi veya başarısızlığı, bu hükümden veya herhangi bir başka hükümden feragat anlamına gelmez.</li>
            <li><strong>Tam Anlaşma:</strong> Bu Koşullar, Platform'un kullanımına ilişkin sizinle Syneris arasındaki tam anlaşmayı temsil eder ve konu ile ilgili önceki tüm anlayışları ve anlaşmaları geçersiz kılar.</li>
          </ul>
          
          <h2>12. İletişim</h2>
          <p>
            Bu Koşullar hakkında sorularınız veya yorumlarınız varsa, lütfen aşağıdaki iletişim bilgilerini kullanarak bize ulaşın:
          </p>
          
          <div className="p-4 border rounded-lg bg-card my-6">
            <p className="m-0">
              <strong>Syneris Hukuk Departmanı</strong><br />
              E-posta: legal@syneris.com<br />
              Adres: Levent Mh. Büyükdere Cd. No:123, 34394 İstanbul, Türkiye<br />
              Telefon: +90 212 123 4567
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Bu kullanım koşulları hakkında sorularınız mı var?</p>
          <Button className="rounded-full" size="lg" variant="outline">
            Bize Ulaşın
          </Button>
        </div>
      </motion.div>
    </div>
  );
} 