import { NextRequest, NextResponse } from "next/server";

// Sistem mesajı
const SYSTEM_MESSAGE = `Sen Turkcell için e-mail şablonları oluşturan bir asistansın.
Senden kurumsal dünya için profesyonel, net ve etkili e-mail şablonları oluşturmanı istiyorum.
Yanıtlarını Markdown formatında ver. Aşağıdaki kurallara uy:

1. Dil: Türkçe
2. Format: Profesyonel e-mail formatı (selamlama, ana metin, kapanış, imza)
3. Üslup: Verilen parametreye göre (profesyonel, resmi, samimi, acil, bilgilendirici)
4. Alıcı: Verilen parametreye göre (müşteri, iş ortağı, çalışan, tedarikçi, yönetici)
5. Konu: Belirtilmişse onu kullan, belirtilmemişse içeriğe uygun bir konu öner

Belirlenen üslup ve alıcı tipine uygun, Turkcell'in kurumsal kimliğini yansıtan içerikler hazırla.
İçerik açıklamasındaki talebi karşılayan, doğrudan kullanılabilir bir e-mail şablonu oluştur.

Örnek telekom/teknoloji ifadeleri kullan. Yanlış bilgi verme, uydurma şeyler yazma. 
Her e-mail'in sonunda Turkcell'in kurumsal imzasını şu şekilde ekle:

İsim Soyisim
Pozisyon Bilgisi
Turkcell

Tel: 0212 XXX XX XX
E-posta: isim.soyisim@turkcell.com.tr
Adres: Turkcell Küçükyalı Plaza, İstanbul

İmza kısmını örnek olarak göster, gerçek bir kişi bilgisi kullanma.`;

export async function POST(request: NextRequest) {
  console.log("E-mail şablonu talebi alındı");
  
  try {
    // İstek gövdesini al
    const requestData = await request.json();
    const { message, sessionId } = requestData;
    
    // Mesaj kontrolü
    if (!message || message.trim() === "") {
      console.error("Boş mesaj hatası");
      return NextResponse.json({
        success: false,
        error: "Mesaj içeriği boş olamaz",
      }, { status: 400 });
    }
    
    console.log(`Talep: ${message.substring(0, 100)}...`);
    console.log(`Session ID: ${sessionId || "belirtilmemiş"}`);
    
    // API anahtarını al
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("API anahtarı bulunamadı");
      
      // Demo yanıt
      return getDemoResponse(message);
    }
    
    // Gemini API için istek gövdesi
    const body = {
      contents: [
        {
          parts: [
            { text: SYSTEM_MESSAGE },
            { text: message }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };
    
    console.log("Gemini API'ye istek gönderiliyor...");
    const startTime = Date.now();
    
    // Gemini API'ye istek gönder
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      }
    );
    
    const endTime = Date.now();
    console.log(`API yanıt süresi: ${endTime - startTime}ms`);
    
    if (!response.ok) {
      console.error(`API hatası: ${response.status} ${response.statusText}`);
      return getDemoResponse(message);
    }
    
    const responseData = await response.json();
    console.log("API yanıtı alındı");
    
    // Yanıt formatı kontrolü
    if (
      !responseData.candidates ||
      !responseData.candidates[0] ||
      !responseData.candidates[0].content ||
      !responseData.candidates[0].content.parts ||
      !responseData.candidates[0].content.parts[0] ||
      !responseData.candidates[0].content.parts[0].text
    ) {
      console.error("Geçersiz API yanıt formatı:", JSON.stringify(responseData).substring(0, 200));
      return getDemoResponse(message);
    }
    
    const text = responseData.candidates[0].content.parts[0].text;
    
    return NextResponse.json({
      success: true,
      response: text,
      isStatic: false
    });
    
  } catch (error) {
    console.error("E-mail şablonu oluşturma hatası:", error);
    return NextResponse.json({
      success: false,
      error: "Beklenmeyen bir hata oluştu",
      isStatic: true
    }, { status: 500 });
  }
}

// Demo yanıt oluşturma fonksiyonu
function getDemoResponse(message: string): NextResponse {
  console.log("Demo yanıt oluşturuluyor...");
  
  // Mesajdan anahtar kelimeleri çıkar
  const lowerMessage = message.toLowerCase();
  let templateType = "";
  
  if (lowerMessage.includes("toplantı") || lowerMessage.includes("davet")) {
    templateType = "meeting";
  } else if (lowerMessage.includes("teşekkür")) {
    templateType = "thanks";
  } else if (lowerMessage.includes("teklif") || lowerMessage.includes("fiyat")) {
    templateType = "offer";
  } else if (lowerMessage.includes("rapor") || lowerMessage.includes("sonuç")) {
    templateType = "report";
  } else if (lowerMessage.includes("sorun") || lowerMessage.includes("şikayet")) {
    templateType = "issue";
  } else {
    templateType = "general";
  }
  
  // Şablon türüne göre yanıt oluştur
  const templates = {
    meeting: `# Toplantı Daveti

Konu: Turkcell Hizmet Değerlendirme Toplantısı

Sayın İlgili,

Turkcell olarak sunduğumuz hizmetleri ve işbirliğimizi değerlendirmek üzere 15 Kasım 2023 Çarşamba günü saat 14:00'te online bir toplantı düzenliyoruz.

Bu toplantıda:
- Mevcut servislerimizin değerlendirmesi
- Yeni hizmet önerilerimiz
- Gelecek dönem işbirliği fırsatları

konularını ele alacağız. Katılımınız, hizmet kalitemizi artırmak ve işbirliğimizi güçlendirmek adına büyük önem taşımaktadır.

Toplantı bağlantısı tarafınıza toplantıdan 1 saat önce e-posta ile iletilecektir.

Katılım durumunuzu en geç 13 Kasım 2023 tarihine kadar bildirmenizi rica ederiz.

Saygılarımla,

Ahmet Yılmaz
Kurumsal Müşteri İlişkileri Müdürü
Turkcell

Tel: 0212 XXX XX XX
E-posta: ahmet.yilmaz@turkcell.com.tr
Adres: Turkcell Küçükyalı Plaza, İstanbul`,
    thanks: `# Teşekkür Mesajı

Konu: İşbirliğiniz için Teşekkürler

Değerli İş Ortağımız,

Turkcell 5G Teknoloji Günleri etkinliğimize katılımınız ve değerli katkılarınız için teşekkür ederiz. Sizin gibi değerli paydaşlarımızın desteği, etkinliğimizin başarıyla gerçekleşmesinde büyük rol oynadı.

Etkinlik süresince paylaştığınız görüş ve öneriler, gelecek projelerimiz için bize ilham kaynağı oldu. Sunumunuz katılımcılar tarafından büyük ilgi gördü ve olumlu geri bildirimler aldı.

Önümüzdeki dönemde gerçekleştireceğimiz diğer etkinliklerimizde de işbirliğimizin devam etmesini dileriz.

Saygılarımla,

Ayşe Kaya
İş Geliştirme Direktörü
Turkcell

Tel: 0212 XXX XX XX
E-posta: ayse.kaya@turkcell.com.tr
Adres: Turkcell Küçükyalı Plaza, İstanbul`,
    offer: `# Hizmet Teklifi

Konu: Turkcell Kurumsal Bulut Çözümleri Teklifimiz

Sayın Yetkili,

Firmanızın dijital dönüşüm ihtiyaçlarına yönelik Turkcell Kurumsal Bulut Çözümleri teklifimizi bilgilerinize sunarız.

**Teklif Kapsamı:**

1. **Veri Depolama ve Yedekleme Hizmetleri**
   - 10TB Depolama Alanı
   - Otomatik Yedekleme Sistemi
   - Felaket Kurtarma Merkezi

2. **Dijital İş Uygulamaları**
   - İş Sürekliliği Çözümleri
   - Uzaktan Çalışma Platformu
   - Güvenli Veri Paylaşımı

3. **Teknik Destek ve Bakım**
   - 7/24 Teknik Destek
   - Periyodik Bakım ve Güncelleme
   - Özel Müşteri Temsilcisi

Söz konusu hizmetlerin yıllık toplam bedeli: 120.000 TL + KDV

Bu teklif tarafınıza özel hazırlanmış olup, 30 gün süreyle geçerlidir. Daha detaylı bilgi almak veya özel ihtiyaçlarınız doğrultusunda teklifi güncellemek için bizimle iletişime geçebilirsiniz.

Saygılarımla,

Mehmet Demir
Kurumsal Satış Yöneticisi
Turkcell

Tel: 0212 XXX XX XX
E-posta: mehmet.demir@turkcell.com.tr
Adres: Turkcell Küçükyalı Plaza, İstanbul`,
    report: `# Proje Durum Raporu

Konu: Q3 2023 Dijital Dönüşüm Projesi İlerleme Raporu

Sayın Yönetim Kurulu Üyeleri,

Şirketimiz bünyesinde yürütülmekte olan Dijital Dönüşüm Projesi'nin Q3 2023 dönemine ait ilerleme raporunu bilgilerinize sunarız.

**Tamamlanan Aşamalar:**
- Altyapı modernizasyon çalışmaları (%100)
- Personel eğitimleri (%85)
- Veri merkezi migrasyonu (%90)

**Devam Eden Çalışmalar:**
- Yeni CRM sistemine geçiş (%60)
- Mobil uygulama entegrasyonları (%45)
- Analitik raporlama modülü (%30)

**Planlanan Sonraki Adımlar:**
- Test süreçlerinin tamamlanması (Kasım 2023)
- Canlıya alma hazırlıkları (Aralık 2023)
- Tam geçiş (Ocak 2024)

Proje, zaman planına uygun olarak ilerlemekte olup, bütçe hedeflerine uygun şekilde yönetilmektedir. Detaylı finansal veriler ekte sunulmuştur.

Bilgilerinize sunarız.

Saygılarımla,

Zeynep Yıldız
Proje Yönetim Ofisi Direktörü
Turkcell

Tel: 0212 XXX XX XX
E-posta: zeynep.yildiz@turkcell.com.tr
Adres: Turkcell Küçükyalı Plaza, İstanbul`,
    issue: `# Sorun Bildirimi Yanıtı

Konu: Bağlantı Sorunları Hakkında Bilgilendirme

Değerli Müşterimiz,

11.10.2023 tarihinde iletmiş olduğunuz bağlantı sorunlarına ilişkin bildiriminiz tarafımıza ulaşmıştır. Öncelikle yaşadığınız olumsuz deneyim için özür dileriz.

Teknik ekibimiz, bildirdiğiniz sorun ile ilgili inceleme başlatmış olup, bölgenizdeki baz istasyonlarında planlı bir bakım çalışması olduğunu tespit etmiştir. Söz konusu bakım çalışması 13.10.2023 tarihinde tamamlanacak olup, hizmet kalitenizin bu tarih itibariyle normal seviyesine döneceğini öngörmekteyiz.

Bakım çalışması süresince yaşanabilecek geçici kesintiler için alternatif çözüm önerileri:
- Turkcell Wi-Fi Noktalarını kullanabilirsiniz
- 4.5G yerine 3G şebekesine manuel geçiş yapabilirsiniz
- Yoğun olmayan saatlerde (22:00-06:00) kullanımı tercih edebilirsiniz

Bu süreçte yaşadığınız mağduriyeti telafi etmek amacıyla, hattınıza 5GB internet paketi tanımlanmıştır.

Saygılarımla,

Ali Yılmaz
Müşteri Deneyimi Uzmanı
Turkcell

Tel: 0212 XXX XX XX
E-posta: ali.yilmaz@turkcell.com.tr
Adres: Turkcell Küçükyalı Plaza, İstanbul`,
    general: `# Genel Bilgilendirme

Konu: Turkcell Dijital Servisler Güncellemesi

Değerli Müşterimiz,

Turkcell olarak, size sunduğumuz dijital servislerde yaptığımız yenilikler ve iyileştirmeler hakkında bilgilendirmek isteriz.

1 Kasım 2023 itibariyle dijital servislerimizde aşağıdaki güncellemeler yapılacaktır:

- **TV+ Platformu:** Yeni kullanıcı arayüzü ve içerik önerileri
- **Fizy:** Yapay zeka destekli müzik önerileri ve genişletilmiş kütüphane
- **Dijital Operatör:** Tek tıkla fatura ödeme ve paket yönetimi özellikleri
- **Bulut Depolama:** Depolama alanı iki katına çıkarılmıştır

Bu güncellemelerden faydalanmak için uygulamalarınızı güncellemeniz yeterlidir. Yenilikler hakkında daha detaylı bilgi için web sitemizi ziyaret edebilir veya Müşteri Hizmetlerimiz ile iletişime geçebilirsiniz.

Turkcell'i tercih ettiğiniz için teşekkür ederiz.

Saygılarımla,

Deniz Kaya
Dijital Servisler Müdürü
Turkcell

Tel: 0212 XXX XX XX
E-posta: deniz.kaya@turkcell.com.tr
Adres: Turkcell Küçükyalı Plaza, İstanbul`,
  };
  
  return NextResponse.json({
    success: true,
    response: templates[templateType as keyof typeof templates],
    isStatic: true
  });
} 