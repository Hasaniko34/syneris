"use client";

import React from "react";
import Image from "next/image";
import { motion } from "@/components/motion-wrapper";
import { ChevronRight, Clock, Award, CheckCircle, BarChart, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SertifikasyonPage() {
  return (
    <div>
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <span>Daha Fazla Bilgi</span>
        <ChevronRight className="mx-1 h-4 w-4" />
        <span className="font-medium text-foreground">Modül Tamamlama ve Sertifikasyon</span>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Clock size={14} />
          <span>5 dakika okuma</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#FFD100] via-[#00A0D2] to-[#FFD100] text-transparent bg-clip-text">
          Modül Tamamlama ve Sertifikasyon
        </h1>
        
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10">
          <Image 
            src="/images/certification.webp" 
            alt="Turkcell Sertifikasyon" 
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Turkcell Yetkinlik Portalı ile Entegre Sertifikasyon Sistemi</h2>
          
          <p>
            Eğitim platformumuzda tamamladığınız her modül, kariyerinize değer katan resmi bir sertifikasyon ile belgelendirilir. Her modülün sonunda yer alan bilgi ölçen quiz'ler, öğrendiğiniz bilgileri pekiştirmenizi sağlarken, başarıyla tamamladığınız modüller Turkcell'in iç "Yetkinlik Portalı"na otomatik olarak kaydedilir.
          </p>
          
          <p>
            Turkcell'in kurumsal eğitim ve gelişim stratejisinin önemli bir parçası olan sertifikasyon sistemimiz, çalışanlarımızın ve iş ortaklarımızın sürekli gelişimini destekler ve takip eder. Bu sistem, hem bireysel kariyer gelişiminiz için bir yol haritası oluşturur, hem de kurumsal yetkinlik yönetimi için değerli veriler sağlar.
          </p>
          
          <h2>Sertifikasyon Süreci</h2>
          
          <div className="space-y-8 my-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FFD100] flex items-center justify-center text-black font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Eğitim Modülü Tamamlama</h3>
                <p>
                  Eğitim içeriklerini eksiksiz olarak tamamlayın. Videolar, interaktif içerikler, okuma materyalleri ve pratik uygulamaların tümünü bitirmeniz gerekmektedir. Sistem, ilerlemenizi otomatik olarak takip eder ve tamamlanmayan bölümleri bildirir.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00A0D2] flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Değerlendirme Quiz'i</h3>
                <p>
                  Her modülün sonunda yer alan değerlendirme quiz'ini tamamlayın. Quiz'lerde genellikle %80 ve üzeri başarı puanı gerekmektedir. Başarısız olmanız durumunda, 24 saat sonra quiz'i tekrar alabilirsiniz. Quiz soruları, modül içeriğinden rastgele seçilir ve her denemede farklılık gösterebilir.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FFD100] flex items-center justify-center text-black font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Sertifika Kazanımı</h3>
                <p>
                  Quiz'i başarıyla tamamladığınızda, dijital sertifikanız otomatik olarak oluşturulur. Sertifikanıza "Profil" sayfanızdan erişebilir, dijital olarak indirebilir veya yazdırabilirsiniz. Ayrıca, başarınız Turkcell Yetkinlik Portalı'na otomatik olarak kaydedilir.
                </p>
              </div>
            </div>
          </div>
          
          <h2>Sertifika Türleri</h2>
          
          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#FFD100] p-2 rounded-full">
                  <Award className="h-5 w-5 text-black" />
                </div>
                <h3 className="text-xl font-semibold">Modül Sertifikaları</h3>
              </div>
              <p>
                Her eğitim modülünü tamamladığınızda kazandığınız temel sertifikalar. Modülün adını, tamamlama tarihini ve kazanılan yetkinlikleri içerir. Bu sertifikalar, belirli bir konuda temel bilgi ve becerilere sahip olduğunuzu gösterir.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#00A0D2] p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Uzmanlık Sertifikaları</h3>
              </div>
              <p>
                Belirli bir alandaki ilgili modüllerin tümünü tamamladığınızda kazanılan ileri düzey sertifikalar. Örneğin, "Turkcell Dijital Kanal Yönetimi Uzmanı" veya "Turkcell Şebeke Operasyonları Uzmanı" gibi. Bu sertifikalar, kariyer gelişiminizde önemli rol oynar.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#FFD100] p-2 rounded-full">
                  <Users className="h-5 w-5 text-black" />
                </div>
                <h3 className="text-xl font-semibold">Takım Sertifikaları</h3>
              </div>
              <p>
                Departman veya ekip bazlı eğitim programlarını tamamlayan gruplara verilen özel sertifikalar. Bu sertifikalar, ekip çalışması ve ortak hedeflere ulaşma başarısını belgeler. Turkcell'in kurumsal hedefleriyle uyumlu özel eğitim programlarını kapsar.
              </p>
            </div>
          </div>
          
          <h2>Sertifikaların Geçerlilik Süresi</h2>
          
          <div className="bg-card border rounded-xl p-6 my-8">
            <p>
              Turkcell eğitim sertifikalarının geçerlilik süresi, eğitimin içeriğine ve konusuna göre değişiklik gösterir:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Teknik Eğitimler</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Şebeke ve BTS eğitimleri: <strong>1 yıl</strong></li>
                  <li>Sistem kullanım eğitimleri: <strong>1 yıl</strong></li>
                  <li>Yazılım ve uygulama eğitimleri: <strong>2 yıl</strong></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Yetkinlik Eğitimleri</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Müşteri hizmetleri eğitimleri: <strong>2 yıl</strong></li>
                  <li>Satış ve pazarlama eğitimleri: <strong>2 yıl</strong></li>
                  <li>Temel yetkinlik eğitimleri: <strong>3 yıl</strong></li>
                </ul>
              </div>
            </div>
            <p className="mt-4">
              Sertifikanızın geçerlilik süresi dolmadan önce, yenileme eğitimlerine katılmanız gerektiğine dair otomatik bildirimler alacaksınız. Yenileme eğitimleri genellikle daha kısa sürer ve güncel bilgilere odaklanır.
            </p>
          </div>
          
          <h2>Turkcell Yetkinlik Portalı Entegrasyonu</h2>
          
          <div className="flex items-center gap-4 my-8">
            <div className="flex-shrink-0">
              <FileText className="h-12 w-12 text-[#00A0D2]" />
            </div>
            <div>
              <p>
                Tamamladığınız tüm eğitimler ve kazandığınız sertifikalar, Turkcell Yetkinlik Portalı'na otomatik olarak aktarılır. Bu entegrasyon sayesinde:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Kariyer gelişim planınız otomatik olarak güncellenir</li>
                <li>Yöneticileriniz gelişiminizi takip edebilir</li>
                <li>Performans değerlendirmelerinde eğitim başarılarınız dikkate alınır</li>
                <li>İç pozisyon başvurularında yetkinlikleriniz otomatik olarak görüntülenir</li>
                <li>Gelecek eğitim fırsatları için kişiselleştirilmiş öneriler alırsınız</li>
              </ul>
            </div>
          </div>
          
          <h2>Sertifikasyon Başarı Metrikleri</h2>
          
          <div className="grid md:grid-cols-4 gap-6 my-8">
            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-[#FFD100] mb-2">%92</div>
              <p className="text-muted-foreground">İlk denemede başarı oranı</p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-[#00A0D2] mb-2">+%25</div>
              <p className="text-muted-foreground">Performans artışı</p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-[#FFD100] mb-2">%85</div>
              <p className="text-muted-foreground">Bilgi kalıcılığı</p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-[#00A0D2] mb-2">%78</div>
              <p className="text-muted-foreground">Kariyer gelişimi</p>
            </div>
          </div>
          
          <h2>Başarı Hikayeleri</h2>
          
          <blockquote>
            "Turkcell'deki kariyerim boyunca tamamladığım sertifika programları, hem teknik bilgilerimi güncel tutmamı hem de kariyer basamaklarını hızla tırmanmamı sağladı. Özellikle Şebeke Optimizasyonu Uzmanlık Sertifikası, bölüm yöneticiliğine yükselmemde büyük rol oynadı."
            <footer>
              <cite>— Ahmet Yılmaz, Turkcell Şebeke Operasyonları Yöneticisi</cite>
            </footer>
          </blockquote>
          
          <blockquote>
            "Müşteri Deneyimi Uzmanlık Sertifikası programını tamamladıktan sonra, müşterilerimize sunduğumuz hizmetin kalitesinde gözle görülür bir artış yaşandı. Ekibimizin memnuniyet skorları %30 yükseldi ve bu başarı, yıl sonu değerlendirmesinde özel bir takdirle ödüllendirildi."
            <footer>
              <cite>— Zeynep Kaya, Turkcell Müşteri Hizmetleri Takım Lideri</cite>
            </footer>
          </blockquote>
          
          <h2>Sertifika Programlarının İş Sonuçlarına Etkisi</h2>
          
          <div className="flex items-center gap-4 my-8">
            <div className="flex-shrink-0">
              <BarChart className="h-12 w-12 text-[#FFD100]" />
            </div>
            <div>
              <p>
                Turkcell'in sertifikasyon programları, sadece bireysel gelişimi değil, kurumsal performansı da olumlu yönde etkilemektedir. İç analizlerimize göre, sertifika programlarını tamamlayan ekiplerde:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Müşteri memnuniyetinde %28 artış</li>
                <li>İşlem süreçlerinde %35 hızlanma</li>
                <li>Hata oranlarında %42 azalma</li>
                <li>Çalışan bağlılığında %30 artış</li>
                <li>İnovasyon ve süreç iyileştirme önerilerinde %45 artış</li>
              </ul>
            </div>
          </div>
          
          <p>
            Turkcell'in sertifikasyon sistemi, sürekli öğrenme ve gelişim kültürünün önemli bir parçasıdır. Teknoloji ve telekomünikasyon sektöründeki hızlı değişimlere uyum sağlamak için, eğitim içeriklerimiz ve sertifika programlarımız düzenli olarak güncellenmektedir. Bu sayede, çalışanlarımız ve iş ortaklarımız her zaman en güncel bilgi ve becerilerle donatılmakta, Turkcell'in sektördeki lider konumunu güçlendirmektedir.
          </p>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between p-6 bg-card rounded-xl border">
          <div>
            <h3 className="text-xl font-semibold mb-2">Kariyerinizi Turkcell sertifikaları ile güçlendirin</h3>
            <p className="text-muted-foreground">Eğitim modüllerinizi tamamlayın ve sertifikalarınızı kazanmaya başlayın.</p>
          </div>
          <Button size="lg" className="mt-4 md:mt-0 rounded-full bg-[#FFD100] hover:bg-[#e6bc00] text-black">
            Eğitimlere Göz At
          </Button>
        </div>
      </motion.div>
    </div>
  );
} 