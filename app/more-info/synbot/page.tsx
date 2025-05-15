"use client";

import React from "react";
import Image from "next/image";
import { motion } from "@/components/motion-wrapper";
import { 
  ChevronRight, 
  Clock, 
  Bot, 
  MessageSquare, 
  Sparkles, 
  Code, 
  FileText, 
  Users,
  Database,
  BarChart,
  Zap,
  BookOpen,
  Brain,
  Star,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SynbotPage() {
  return (
    <div>
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <span>Daha Fazla Bilgi</span>
        <ChevronRight className="mx-1 h-4 w-4" />
        <span className="font-medium text-foreground">Synbot - Turkcell İç Kaynaklı Asistan</span>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Clock size={14} />
          <span>7 dakika okuma</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#FFD100] via-[#00A0D2] to-[#FFD100] text-transparent bg-clip-text">
          Synbot - Turkcell İç Kaynaklı Asistan
        </h1>
        
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10">
          <Image 
            src="/images/synbot-banner.webp" 
            alt="Turkcell Synbot Asistan"
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Turkcell'in Yapay Zeka Destekli İç Asistanı</h2>
          
          <p>
            Synbot, Turkcell'in tüm iç sistemlerine, süreçlerine, dokümantasyonuna ve teknik bilgi tabanına 
            bağlanan, büyük dil modelleri ile güçlendirilmiş bir yapay zeka asistanıdır. Özellikle Turkcell 
            çalışanlarının günlük iş akışlarını hızlandırmak, teknik ve operasyonel sorunlara çözüm bulmak, 
            ve karmaşık sistemlerde rehberlik etmek için tasarlanmıştır.
          </p>
          
          <div className="my-8 grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#ffc72c]/10 to-[#00a0d2]/10 p-6 rounded-xl border border-[#ffc72c]/20">
              <div className="flex items-center gap-3 mb-4">
                <Bot className="h-8 w-8 text-[#ffc72c]" />
                <h3 className="text-xl font-bold m-0">Synbot Nasıl Çalışır?</h3>
              </div>
              <p className="text-muted-foreground">
                Synbot, Turkcell'in tüm bilgi sistemlerinden ve dokümantasyonundan eğitilmiş, özelleştirilmiş 
                büyük dil modelleri kullanır. Sisteme sorulan her soru önce anlamsal olarak analiz edilir, ilgili 
                bilgi kaynakları belirlenir ve bu kaynaklardan elde edilen veriler kullanılarak doğru, güncel ve 
                kapsamlı yanıtlar oluşturulur.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-[#00a0d2]/10 to-[#ffc72c]/10 p-6 rounded-xl border border-[#00a0d2]/20">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-8 w-8 text-[#00a0d2]" />
                <h3 className="text-xl font-bold m-0">Neden Synbot?</h3>
              </div>
              <p className="text-muted-foreground">
                Synbot, Turkcell'in karmaşık sistem ve süreçlerini hızla öğrenmenizi sağlar. İşlemlerinizi %40 
                daha hızlı tamamlamanıza, hata oranını %65 azaltmanıza ve süreçlere daha hızlı adapte olmanıza 
                yardımcı olur. En güncel bilgilerle çalışır, kurumsal hafızadan yararlanır ve 7/24 erişilebilirdir.
              </p>
            </div>
          </div>
          
          <h2>Synbot'un Temel Özellikleri</h2>
          
          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="border rounded-xl p-5">
              <div className="bg-[#ffc72c]/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-[#ffc72c]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Turkcell Özelinde Yanıtlar</h3>
              <p className="text-sm text-muted-foreground">
                Turkcell'in tüm ürün, hizmet, sistem ve süreçleri hakkında detaylı ve güncel bilgiler sunar. 
                BiP, Lifebox, Dijital Operatör, fizy, TV+ gibi servislerin kullanımı ve sorunları hakkında 
                kapsamlı destek sağlar.
              </p>
            </div>
            
            <div className="border rounded-xl p-5">
              <div className="bg-[#ffc72c]/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-[#ffc72c]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Akıllı Dokümantasyon</h3>
              <p className="text-sm text-muted-foreground">
                Tüm prosedür kılavuzları, süreç akışları ve teknik dokümanları anlayan ve ilgili bilgiyi 
                kullanıcı dostu şekilde sunan bilgi işleme kapasitesi. Binlerce sayfa doküman arasından saniyeler 
                içinde ilgili bilgiyi bulur.
              </p>
            </div>
            
            <div className="border rounded-xl p-5">
              <div className="bg-[#ffc72c]/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-[#ffc72c]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Teknik Dokümantasyon</h3>
              <p className="text-sm text-muted-foreground">
                Turkcell API'leri, servis entegrasyonları ve teknik altyapı ile ilgili örnek kodlar, 
                şemalar ve implementasyon örnekleri sunar. Kod yazma, hata ayıklama ve sistem entegrasyonu 
                konularında yardımcı olur.
              </p>
            </div>
            
            <div className="border rounded-xl p-5">
              <div className="bg-[#00a0d2]/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-[#00a0d2]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Asistanlı İşlemler</h3>
              <p className="text-sm text-muted-foreground">
                Karmaşık Turkcell sistem işlemlerinde adım adım rehberlik eder, ekran görüntüleriyle destekler 
                ve olası hataları önceden belirleyerek önlemenize yardımcı olur. CRM, Fatura Sistemleri, BiP Portal 
                gibi sistemlerde işlemleri kolaylaştırır.
              </p>
            </div>
            
            <div className="border rounded-xl p-5">
              <div className="bg-[#00a0d2]/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-[#00a0d2]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Kurumsal Hafıza</h3>
              <p className="text-sm text-muted-foreground">
                Turkcell'in kurumsal bilgi birikimini ve deneyimini barındırır. Geçmiş vakalar, 
                çözülmüş sorunlar ve en iyi uygulamalar hakkında bilgi sağlayarak kurumsal hafızanın 
                sürdürülebilirliğini sağlar.
              </p>
            </div>
            
            <div className="border rounded-xl p-5">
              <div className="bg-[#00a0d2]/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-[#00a0d2]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Performans Analitiği</h3>
              <p className="text-sm text-muted-foreground">
                İşlem ve süreçlerinizin verimliliğini artıracak öneriler sunar, iş akışınızı optimize 
                etmenize yardımcı olur ve performans metriklerinizi analiz eder. Kişiselleştirilmiş 
                iyileştirme önerileri sağlar.
              </p>
            </div>
          </div>
          
          <h2>Synbot'un Kullanım Alanları</h2>
          
          <div className="space-y-4 my-8">
            <div className="flex items-start gap-4 border rounded-lg p-4">
              <div className="bg-[#ffc72c]/10 p-2 rounded-lg">
                <Users className="h-5 w-5 text-[#ffc72c]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Müşteri Hizmetleri Desteği</h3>
                <p className="text-muted-foreground text-sm">
                  Müşteri temsilcileri ve bayi çalışanları için müşteri işlemleri, tarife değişiklikleri, 
                  fatura işlemleri ve kampanya bilgileri konusunda anında destek. Synbot, müşteri karşısında 
                  işlem yapan personelin hızlı ve doğru bilgiye erişmesini sağlar.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-[#ffc72c]/10">Tarife Değişiklikleri</Badge>
                  <Badge variant="outline" className="bg-[#ffc72c]/10">Kampanya Aktivasyonları</Badge>
                  <Badge variant="outline" className="bg-[#ffc72c]/10">Fatura İşlemleri</Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4 border rounded-lg p-4">
              <div className="bg-[#00a0d2]/10 p-2 rounded-lg">
                <Zap className="h-5 w-5 text-[#00a0d2]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Teknik Destek</h3>
                <p className="text-muted-foreground text-sm">
                  Saha teknisyenleri, ağ mühendisleri ve IT personeli için teknik sorunların çözümü, 
                  hata kodları analizi ve arıza giderme süreçleri konusunda destek. Synbot, teknik 
                  dokümantasyonu anında erişilebilir hale getirerek arıza çözüm sürelerini kısaltır.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-[#00a0d2]/10">BTS Arıza Giderme</Badge>
                  <Badge variant="outline" className="bg-[#00a0d2]/10">Şebeke Optimizasyonu</Badge>
                  <Badge variant="outline" className="bg-[#00a0d2]/10">Sistem Entegrasyonları</Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4 border rounded-lg p-4">
              <div className="bg-[#ffc72c]/10 p-2 rounded-lg">
                <BookOpen className="h-5 w-5 text-[#ffc72c]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Eğitim ve Onboarding</h3>
                <p className="text-muted-foreground text-sm">
                  Yeni çalışanlar için oryantasyon sürecini hızlandırma, eğitim içeriklerini kişiselleştirme 
                  ve sürekli öğrenme desteği. Synbot, Turkcell'in karmaşık sistemlerini ve süreçlerini 
                  öğrenme süresini %50'ye kadar kısaltır.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-[#ffc72c]/10">Sistem Eğitimleri</Badge>
                  <Badge variant="outline" className="bg-[#ffc72c]/10">Süreç Rehberliği</Badge>
                  <Badge variant="outline" className="bg-[#ffc72c]/10">İnteraktif Öğrenme</Badge>
                </div>
              </div>
            </div>
          </div>
          
          <h2>Synbot Etkileşim Örnekleri</h2>
          
          <div className="bg-muted rounded-xl p-5 my-8">
            <h3 className="text-xl font-semibold mb-4">Gerçek Etkileşim Örnekleri</h3>
            <div className="space-y-6">
              <div className="bg-card rounded-lg p-4 border">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-[#ffc72c] text-black">Müşteri İşlemleri</Badge>
                  <span className="text-sm text-muted-foreground">Abone numara taşıma işlemi</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Users size={14} className="text-primary-foreground" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm">TRK-2040 hata kodu alıyorum, numara taşıma işlemi yapamıyorum. Bu ne anlama geliyor?</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#ffc72c] flex items-center justify-center flex-shrink-0">
                      <Bot size={14} className="text-black" />
                    </div>
                    <div className="bg-card border p-3 rounded-lg">
                      <p className="text-sm mb-2">
                        TRK-2040 hata kodu, numara taşıma işlemi sırasında MNP (Mobile Number Portability) 
                        sisteminde geçersiz kimlik bilgileri nedeniyle oluşan bir hatadır. Bu hatanın olası nedenleri:
                      </p>
                      <ol className="text-sm space-y-1 mb-2">
                        <li>1. Müşteri kimlik bilgileri MERNİS sisteminde doğrulanamadı</li>
                        <li>2. Verici operatörde kayıtlı kimlik bilgileri ile uyuşmazlık var</li>
                        <li>3. Son 30 gün içinde başka bir taşıma işlemi yapılmış</li>
                      </ol>
                      <p className="text-sm mb-2">
                        Çözüm için şu adımları izleyebilirsiniz:
                      </p>
                      <ol className="text-sm space-y-1">
                        <li>1. CRM'de 'Kimlik Doğrulama' ekranından müşteri bilgilerini tekrar kontrol edin</li>
                        <li>2. 'MNP Sorgulama' ekranından numara durumunu sorgulayın</li>
                        <li>3. Gerekirse müşteriden yeni kimlik belgesi isteyin</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-4 border">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-[#00a0d2] text-white">Teknik Destek</Badge>
                  <span className="text-sm text-muted-foreground">BTS Fault Management</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Users size={14} className="text-primary-foreground" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm">Ericsson RBS 6201 üzerinde VSWR alarmı geliyor. Sahada kontrol etmem gereken noktalar neler?</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#00a0d2] flex items-center justify-center flex-shrink-0">
                      <Bot size={14} className="text-white" />
                    </div>
                    <div className="bg-card border p-3 rounded-lg">
                      <p className="text-sm mb-2">
                        Ericsson RBS 6201'de VSWR (Voltage Standing Wave Ratio) alarmı, RF yolunda bir empedans uyumsuzluğunu 
                        gösterir. Sahada kontrol etmeniz gereken noktalar:
                      </p>
                      <ul className="text-sm space-y-1 mb-2">
                        <li>• Jumper kabloları: Hasarlı veya gevşek bağlantı olup olmadığını kontrol edin</li>
                        <li>• RF konnektörler: Nem, korozyon veya fiziksel hasar kontrolü yapın</li>
                        <li>• TMA (Tower Mounted Amplifier): Çalışma durumunu kontrol edin</li>
                        <li>• Anten: Fiziksel hasar veya su girişi olup olmadığını kontrol edin</li>
                        <li>• Yıldırım koruyucular: Hasar kontrolü yapın</li>
                      </ul>
                      <p className="text-sm mb-2">
                        Ölçüm yapmak için:
                      </p>
                      <ol className="text-sm space-y-1">
                        <li>1. Site Master cihazı ile kablo ve anteni ayrı ayrı test edin (ideal VSWR &lt; 1.5)</li>
                        <li>2. OSS'de ilgili hücrenin RF parametrelerini kontrol edin</li>
                        <li>3. RET (Remote Electrical Tilt) kontrolü yapın</li>
                      </ol>
                      <p className="text-sm mt-2">
                        Detaylı prosedür için <span className="text-blue-500">Ericsson RBS 6000 Arıza Giderme Kılavuzu</span> 
                        (sayfa 43-51) ve <span className="text-blue-500">Turkcell Saha Bakım Prosedürleri DOC-RF-023</span> 
                        dokümanlarına başvurabilirsiniz.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <h2>Sürekli Geliştirilen Yapay Zeka</h2>
          
          <p>
            Synbot, Turkcell'in sürekli gelişen ürün, hizmet ve sistemlerine paralel olarak düzenli güncellenen bir 
            yapay zeka asistanıdır. Her yeni eğitim, güncel bilgi ve kullanıcı geri bildirimleri ile sürekli olarak 
            geliştirilmektedir.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="flex items-start gap-3 border rounded-lg p-4">
              <div className="bg-[#ffc72c]/10 p-2 rounded-lg flex-shrink-0">
                <Brain className="h-5 w-5 text-[#ffc72c]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Gelişmiş Öğrenme Kapasitesi</h3>
                <p className="text-muted-foreground text-sm">
                  Synbot, kullanıcı etkileşimlerinden ve geri bildirimlerden öğrenerek yanıtlarını sürekli 
                  iyileştirir. Sık sorulan sorular ve zorlanılan konular üzerinde kapasitesini geliştirir.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 border rounded-lg p-4">
              <div className="bg-[#00a0d2]/10 p-2 rounded-lg flex-shrink-0">
                <Star className="h-5 w-5 text-[#00a0d2]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Kişiselleştirilmiş Deneyim</h3>
                <p className="text-muted-foreground text-sm">
                  Synbot, kullanıcıların rol, departman ve görevlerine göre yanıtlarını ve önerilerini 
                  kişiselleştirir. Tekrarlanan sorularınızı hatırlar ve işlerinizi tahmin ederek hızlandırır.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 border rounded-lg p-4">
              <div className="bg-[#ffc72c]/10 p-2 rounded-lg flex-shrink-0">
                <Database className="h-5 w-5 text-[#ffc72c]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Güncel Bilgi Tabanı</h3>
                <p className="text-muted-foreground text-sm">
                  Turkcell'in tüm güncel sistemlerine, dokümantasyonuna ve bilgi tabanına sürekli erişim 
                  sayesinde en güncel bilgileri sunar. Yeni tarife, kampanya ve servisler otomatik olarak öğrenilir.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 border rounded-lg p-4">
              <div className="bg-[#00a0d2]/10 p-2 rounded-lg flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-[#00a0d2]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Güvenilir Yanıtlar</h3>
                <p className="text-muted-foreground text-sm">
                  Synbot, yanıtlarının doğruluğunu kontrol ederek güvenilir bilgiler sunar. Her yanıt için 
                  kaynak belirtir ve kesinlik seviyesini gösterir. Belirsiz konularda uzman desteğine yönlendirir.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between p-6 bg-card rounded-xl border">
          <div>
            <h3 className="text-xl font-semibold mb-2">Synbot ile işlerinizi hızlandırın</h3>
            <p className="text-muted-foreground">Turkcell içi süreçlerde yapay zeka destekli asistandan hemen yararlanın.</p>
          </div>
          <Button size="lg" className="mt-4 md:mt-0 rounded-full bg-gradient-to-r from-[#ffc72c] to-[#00a0d2] hover:from-[#e6b025] hover:to-[#0090bd] text-white">
            <Bot size={16} className="mr-2" />
            Synbot ile Görüşmeyi Başlat
          </Button>
        </div>
      </motion.div>
    </div>
  );
} 