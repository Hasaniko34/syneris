// Eğitim veri yapısı
export interface Modul {
  id: number;
  baslik: string;
  aciklama: string;
  sureDakika: number;
  tamamlandi?: boolean;
}

export interface Test {
  id: number;
  baslik: string;
  soruSayisi: number;
  gecmeNotu: number;
  tamamlandi?: boolean;
  sonucPuan?: number;
}

export interface Egitim {
  id: string;
  baslik: string;
  aciklama: string;
  kategori: string;
  moduller: Modul[];
  testler: Test[];
  toplam_ilerleme: number;
  etiketler: string[];
  zorunlu: boolean;
  sonTarih?: string;
  egitmen: string;
  durum: string;
}

export const EGITIMLER: Egitim[] = [
  // Kurumsal Çözümler için eğitimler
  {
    id: "kurumsal-ses-paketleri",
    baslik: "Turkcell Kurumsal Ses Paketleri",
    aciklama: "İşletmenizin iletişim ihtiyaçları için avantajlı dakika ve internet içeren kurumsal hat paketleri hakkında eğitim.",
    kategori: "Kurumsal Çözümler",
    moduller: [
      { id: 1, baslik: "Kurumsal Ses Paketleri Tanıtımı", aciklama: "Kurumsal ses paketlerinin özellikleri ve avantajları.", sureDakika: 20 },
      { id: 2, baslik: "Kurumsal Hat Yönetimi", aciklama: "Çoklu kurumsal hatların yönetimi ve raporlaması.", sureDakika: 25 },
      { id: 3, baslik: "Filo Hatları Yönetimi", aciklama: "Saha ekiplerine özel hatların yönetim stratejileri.", sureDakika: 15 }
    ],
    testler: [
      { id: 1, baslik: "Kurumsal Ses Paketleri Değerlendirme", soruSayisi: 5, gecmeNotu: 70 }
    ],
    toplam_ilerleme: 60,
    etiketler: ["Kurumsal", "Ses Paketleri", "Hat Yönetimi"],
    zorunlu: false,
    sonTarih: "2024-12-25",
    egitmen: "Mehmet Şahin",
    durum: "devam_ediyor"
  },
  {
    id: "kurumsal-internet",
    baslik: "Kurumsal İnternet Çözümleri",
    aciklama: "İşletmenizin boyutuna ve ihtiyaçlarına göre özelleştirilebilen yüksek hızlı internet çözümleri hakkında eğitim.",
    kategori: "Kurumsal Çözümler",
    moduller: [
      { id: 1, baslik: "Kurumsal Fiber Altyapı", aciklama: "Kurumsal fiber altyapı çözümleri ve avantajları.", sureDakika: 22 },
      { id: 2, baslik: "Metro Ethernet", aciklama: "Metro Ethernet ağ yapısı ve performans özellikleri.", sureDakika: 25 },
      { id: 3, baslik: "SD-WAN Teknolojisi", aciklama: "Yazılım tanımlı ağ yapısı ve işletme avantajları.", sureDakika: 30 }
    ],
    testler: [
      { id: 1, baslik: "Kurumsal İnternet Değerlendirme", soruSayisi: 8, gecmeNotu: 70 }
    ],
    toplam_ilerleme: 70,
    etiketler: ["Kurumsal", "Fiber", "Metro Ethernet", "SD-WAN"],
    zorunlu: false,
    sonTarih: "2024-11-30",
    egitmen: "Ali Yılmaz",
    durum: "devam_ediyor"
  },
  {
    id: "dijital-is-surecleri",
    baslik: "Dijital İş Süreçleri",
    aciklama: "İşletmenizin dijital dönüşümünü hızlandıracak bulut tabanlı çözümler ve uygulamalar hakkında eğitim.",
    kategori: "Kurumsal Çözümler",
    moduller: [
      { id: 1, baslik: "Dijital Dönüşüm Platformu", aciklama: "Kurumsal dijital dönüşüm süreçleri ve stratejileri.", sureDakika: 25 },
      { id: 2, baslik: "Bulut Çözümleri", aciklama: "Kurumsal bulut çözümleri ve entegrasyonlar.", sureDakika: 30 },
      { id: 3, baslik: "İş Süreç Otomasyonu", aciklama: "İş süreçlerini dijitalleştirme ve otomasyon teknikleri.", sureDakika: 28 }
    ],
    testler: [
      { id: 1, baslik: "Dijital İş Süreçleri Değerlendirme", soruSayisi: 10, gecmeNotu: 70 }
    ],
    toplam_ilerleme: 85,
    etiketler: ["Dijital Dönüşüm", "Bulut", "Otomasyon"],
    zorunlu: false,
    sonTarih: "2024-12-15",
    egitmen: "Zeynep Korkmaz",
    durum: "devam_ediyor"
  },
  {
    id: "filo-yonetimi",
    baslik: "Kurumsal Filo Yönetimi",
    aciklama: "Araç filonuzu gerçek zamanlı takip edebileceğiniz ve yönetebileceğiniz IoT tabanlı çözümler hakkında eğitim.",
    kategori: "Kurumsal Çözümler",
    moduller: [
      { id: 1, baslik: "Filo Takip Sistemi", aciklama: "Araç takip teknolojileri ve raporlama özellikleri.", sureDakika: 20 },
      { id: 2, baslik: "Sürüş Davranışı Analizi", aciklama: "Sürüş davranışları analizi ve optimizasyon.", sureDakika: 25 },
      { id: 3, baslik: "Yakıt Tüketim Yönetimi", aciklama: "Yakıt tüketim takibi ve optimizasyon stratejileri.", sureDakika: 15 }
    ],
    testler: [
      { id: 1, baslik: "Filo Yönetimi Değerlendirme", soruSayisi: 5, gecmeNotu: 70 }
    ],
    toplam_ilerleme: 50,
    etiketler: ["Filo Yönetimi", "IoT", "Araç Takip"],
    zorunlu: false,
    sonTarih: "2025-01-15",
    egitmen: "Deniz Akgün",
    durum: "devam_ediyor"
  },
  {
    id: "is-ortagi-cozumleri",
    baslik: "Turkcell İş Ortağı Çözümleri",
    aciklama: "Kurumsal müşteriler için özel geliştirilen entegre iletişim ve iş yönetimi platformu hakkında eğitim.",
    kategori: "Kurumsal Çözümler",
    moduller: [
      { id: 1, baslik: "İş Ortaklığı Programı", aciklama: "Turkcell iş ortaklığı programının avantajları ve kapsamı.", sureDakika: 18 },
      { id: 2, baslik: "Entegre İletişim Çözümleri", aciklama: "İş ortaklarına sunulan entegre iletişim platformları.", sureDakika: 22 },
      { id: 3, baslik: "Bayi Yönetim Sistemi", aciklama: "Bayi ve iş ortağı yönetim platformu özellikleri.", sureDakika: 20 }
    ],
    testler: [
      { id: 1, baslik: "İş Ortağı Çözümleri Değerlendirme", soruSayisi: 5, gecmeNotu: 70 }
    ],
    toplam_ilerleme: 75,
    etiketler: ["İş Ortağı", "Bayi", "Entegrasyon"],
    zorunlu: false,
    sonTarih: "2024-12-20",
    egitmen: "Sevgi Yıldırım",
    durum: "devam_ediyor"
  },
  {
    id: "siber-guvenlik",
    baslik: "Siber Güvenlik Hizmetleri",
    aciklama: "İşletmenizi siber tehditlere karşı koruyacak gelişmiş güvenlik çözümleri ve danışmanlık hizmetleri hakkında eğitim.",
    kategori: "Kurumsal Çözümler",
    moduller: [
      { id: 1, baslik: "Kurumsal Siber Güvenlik", aciklama: "Kurumsal siber güvenlik stratejileri ve önlemler.", sureDakika: 25 },
      { id: 2, baslik: "DDoS Koruma", aciklama: "DDoS saldırılarına karşı koruma teknikleri ve çözümler.", sureDakika: 20 },
      { id: 3, baslik: "Veri Sızıntısı Önleme", aciklama: "Veri sızıntılarını tespit etme ve önleme stratejileri.", sureDakika: 22 }
    ],
    testler: [
      { id: 1, baslik: "Siber Güvenlik Değerlendirme", soruSayisi: 8, gecmeNotu: 70 }
    ],
    toplam_ilerleme: 65,
    etiketler: ["Siber Güvenlik", "DDoS", "Veri Güvenliği"],
    zorunlu: true,
    sonTarih: "2024-11-30",
    egitmen: "Burak Demir",
    durum: "devam_ediyor"
  },
  
  // Dijital Servisler için eğitimler
  {
    id: "turkcell-mobil-uygulama",
    baslik: "Turkcell Mobil Uygulama",
    aciklama: "Tüm Turkcell hizmetlerinizi tek bir uygulamadan yönetebileceğiniz kapsamlı mobil uygulama hakkında eğitim.",
    kategori: "Dijital Servisler",
    moduller: [
      { id: 1, baslik: "Mobil Uygulama Tanıtımı", aciklama: "Turkcell mobil uygulamasının genel özellikleri.", sureDakika: 15 },
      { id: 2, baslik: "Fatura ve Paket Yönetimi", aciklama: "Fatura ödeme ve paket yönetimi işlemleri.", sureDakika: 18 },
      { id: 3, baslik: "Dijital Servis Entegrasyonları", aciklama: "Dijital servislere uygulamadan erişim ve kullanım.", sureDakika: 20 }
    ],
    testler: [
      { id: 1, baslik: "Mobil Uygulama Değerlendirme", soruSayisi: 5, gecmeNotu: 70 }
    ],
    toplam_ilerleme: 80,
    etiketler: ["Mobil Uygulama", "Self Servis", "Dijital"],
    zorunlu: false,
    sonTarih: "2024-11-15",
    egitmen: "Ayşe Tekin",
    durum: "devam_ediyor"
  },
  {
    id: "online-islemler",
    baslik: "Turkcell Online İşlemler",
    aciklama: "Web tarayıcısı üzerinden fatura ödeme, TL yükleme ve paket yönetimi yapabileceğiniz platform hakkında eğitim.",
    kategori: "Dijital Servisler",
    moduller: [
      { id: 1, baslik: "Online İşlemler Platformu", aciklama: "Online işlemler platformunun genel tanıtımı.", sureDakika: 15 },
      { id: 2, baslik: "Fatura ve Ödeme İşlemleri", aciklama: "Fatura görüntüleme ve ödeme süreci.", sureDakika: 18 },
      { id: 3, baslik: "Paket ve Tarife Yönetimi", aciklama: "Paket ve tarife değişikliği, ek paket işlemleri.", sureDakika: 15 }
    ],
    testler: [
      { id: 1, baslik: "Online İşlemler Değerlendirme", soruSayisi: 5, gecmeNotu: 70 }
    ],
    toplam_ilerleme: 75,
    etiketler: ["Online İşlemler", "Self Servis", "Web"],
    zorunlu: false,
    sonTarih: "2024-12-10",
    egitmen: "Hasan Kaya",
    durum: "devam_ediyor"
  },
  {
    id: "fastpay",
    baslik: "Fast Pay",
    aciklama: "QR kod ile hızlı ve güvenli ödeme yapma, para transferi ve fatura ödeme hizmetleri hakkında eğitim.",
    kategori: "Dijital Servisler",
    moduller: [
      { id: 1, baslik: "Fast Pay Tanıtımı", aciklama: "Fast Pay ödeme sisteminin genel tanıtımı.", sureDakika: 15 },
      { id: 2, baslik: "QR Kod ile Ödeme", aciklama: "QR kod ödeme işlemlerinin detayları.", sureDakika: 18 },
      { id: 3, baslik: "Para Transferi İşlemleri", aciklama: "Fast Pay üzerinden para transferi işlemleri.", sureDakika: 15 }
    ],
    testler: [
      { id: 1, baslik: "Fast Pay Değerlendirme", soruSayisi: 6, gecmeNotu: 70 }
    ],
    toplam_ilerleme: 65,
    etiketler: ["Fast Pay", "Ödeme", "QR Kod"],
    zorunlu: false,
    sonTarih: "2024-12-05",
    egitmen: "Zeynep Yılmaz",
    durum: "devam_ediyor"
  },
  {
    id: "guvenlik-hizmetleri",
    baslik: "Güvenlik Hizmetleri",
    aciklama: "Lifebox yedekleme, antivirüs ve dijital güvenlik çözümleri hakkında eğitim.",
    kategori: "Dijital Servisler",
    moduller: [
      { id: 1, baslik: "Lifebox Yedekleme", aciklama: "Lifebox ile veri yedekleme ve yönetimi.", sureDakika: 20 },
      { id: 2, baslik: "Antivirüs Çözümleri", aciklama: "Mobil cihazlar için antivirüs hizmetleri.", sureDakika: 15 },
      { id: 3, baslik: "Dijital Güvenlik Önlemleri", aciklama: "Kişisel verilerinizi korumak için alınması gereken önlemler.", sureDakika: 18 }
    ],
    testler: [
      { id: 1, baslik: "Güvenlik Hizmetleri Değerlendirme", soruSayisi: 5, gecmeNotu: 70 }
    ],
    toplam_ilerleme: 60,
    etiketler: ["Güvenlik", "Lifebox", "Antivirüs"],
    zorunlu: false,
    sonTarih: "2024-11-20",
    egitmen: "Mehmet Demir",
    durum: "devam_ediyor"
  },
  
  // Mevcut eğitimler
  {
    id: "platinum-paketler",
    baslik: "Turkcell Platinum Paketler",
    aciklama: "Ayrıcalıklı hizmetler ve özel avantajlarla dolu Platinum paketleri hakkında bilgilendirme.",
    kategori: "Bireysel Ürünler",
    moduller: [
      { id: 1, baslik: "Platinum Avantajları", aciklama: "Platinum paketlerdeki özel avantajların anlatımı.", sureDakika: 15 },
      { id: 2, baslik: "Platinum Paket Çeşitleri", aciklama: "Farklı platinum paket içerikleri ve fiyatlandırma.", sureDakika: 20 },
      { id: 3, baslik: "Platinum Müşterilere Özel Hizmetler", aciklama: "Platinum müşteriler için sunulan ayrıcalıklı hizmetler.", sureDakika: 25 }
    ],
    testler: [
      { id: 1, baslik: "Platinum Paketler Değerlendirme", soruSayisi: 5, gecmeNotu: 70 }
    ],
    toplam_ilerleme: 75,
    etiketler: ["Platinum", "Bireysel", "Premium"],
    zorunlu: false,
    sonTarih: "2024-12-20",
    egitmen: "Ayşe Kılıç",
    durum: "devam_ediyor"
  },
  {
    id: "fiber-internet",
    baslik: "Fiber İnternet",
    aciklama: "Yüksek hızda kesintisiz internet deneyimi sunan fiber altyapı çözümleri hakkında eğitim.",
    kategori: "Bireysel Ürünler",
    moduller: [
      { id: 1, baslik: "Fiber İnternet Teknolojisi", aciklama: "Fiber internetin çalışma prensipleri ve avantajları.", sureDakika: 18 },
      { id: 2, baslik: "Fiber İnternet Paketleri", aciklama: "Sunulan paketler ve özellikler.", sureDakika: 22 },
      { id: 3, baslik: "Kurulum ve Teknik Destek", aciklama: "Kurulum süreçleri ve teknik destek hizmetleri.", sureDakika: 20 }
    ],
    testler: [
      { id: 1, baslik: "Fiber İnternet Değerlendirme", soruSayisi: 5, gecmeNotu: 70 }
    ],
    toplam_ilerleme: 60,
    etiketler: ["Fiber", "İnternet", "Yüksek Hız"],
    zorunlu: false,
    sonTarih: "2024-12-15",
    egitmen: "Mehmet Öztürk",
    durum: "devam_ediyor"
  },
  {
    id: "dijital-servisler",
    baslik: "Dijital Servisler",
    aciklama: "TV+, Fizy, Dergilik, BiP gibi dijital platformlar hakkında kapsamlı eğitim.",
    kategori: "Bireysel Ürünler",
    moduller: [
      { id: 1, baslik: "TV+ ve İçerik Platformları", aciklama: "TV+ özellikler ve kullanımı.", sureDakika: 25 },
      { id: 2, baslik: "Fizy ve Dijital Müzik", aciklama: "Fizy müzik platformu.", sureDakika: 15 },
      { id: 3, baslik: "BiP ve İletişim Servisleri", aciklama: "BiP uygulaması ve özellikleri.", sureDakika: 20 },
      { id: 4, baslik: "Dergilik ve Dijital Yayınlar", aciklama: "Dergilik platformu ve dijital içerikler.", sureDakika: 15 }
    ],
    testler: [
      { id: 1, baslik: "Dijital Servisler Değerlendirme", soruSayisi: 10, gecmeNotu: 70 }
    ],
    toplam_ilerleme: 80,
    etiketler: ["Dijital", "TV+", "BiP", "Fizy"],
    zorunlu: false,
    sonTarih: "2024-11-30",
    egitmen: "Selin Yıldırım",
    durum: "devam_ediyor"
  },
  {
    id: "paycell",
    baslik: "Paycell Kart",
    aciklama: "Nakit taşıma derdi olmadan güvenli alışveriş ve ödeme imkanı sunan Paycell Kart hakkında eğitim.",
    kategori: "Finansal Ürünler",
    moduller: [
      { id: 1, baslik: "Paycell Kart Nedir?", aciklama: "Paycell Kart'ın tanıtımı ve özellikleri.", sureDakika: 15 },
      { id: 2, baslik: "Paycell Kart Kullanım Alanları", aciklama: "Kart ile yapılabilecek işlemler ve hizmetler.", sureDakika: 20 },
      { id: 3, baslik: "Güvenlik ve Avantajlar", aciklama: "Güvenlik özellikleri ve sunulan avantajlar.", sureDakika: 18 }
    ],
    testler: [
      { id: 1, baslik: "Paycell Kart Değerlendirme", soruSayisi: 5, gecmeNotu: 70 }
    ],
    toplam_ilerleme: 65,
    etiketler: ["Paycell", "Finansal", "Ödeme"],
    zorunlu: false,
    sonTarih: "2024-12-10",
    egitmen: "Emre Yılmaz",
    durum: "devam_ediyor"
  },
  {
    id: "cihaz-sigortalari",
    baslik: "Cihaz Sigortaları",
    aciklama: "Akıllı cihazlarınız için kapsamlı koruma ve güvence hizmetleri hakkında bilgilendirme.",
    kategori: "Sigorta Ürünleri",
    moduller: [
      { id: 1, baslik: "Cihaz Sigortası Kapsamı", aciklama: "Sigorta kapsamı ve teminatlar.", sureDakika: 20 },
      { id: 2, baslik: "Hasar Süreçleri", aciklama: "Hasar bildirim ve değerlendirme süreçleri.", sureDakika: 25 },
      { id: 3, baslik: "Sigorta Paketleri", aciklama: "Farklı cihaz sigortası paketleri ve özellikleri.", sureDakika: 15 }
    ],
    testler: [
      { id: 1, baslik: "Cihaz Sigortaları Değerlendirme", soruSayisi: 5, gecmeNotu: 70 }
    ],
    toplam_ilerleme: 50,
    etiketler: ["Sigorta", "Cihaz", "Teminat"],
    zorunlu: false,
    sonTarih: "2024-11-25",
    egitmen: "Zeynep Aydın",
    durum: "devam_ediyor"
  },
  {
    id: "kampanyalar",
    baslik: "Turkcell Güncel Kampanyalar",
    aciklama: "Yeni hat, tarifeler ve cihazlar için avantajlı fırsatlar sunan kampanyalar hakkında bilgilendirme.",
    kategori: "Satış ve Pazarlama",
    moduller: [
      { id: 1, baslik: "Bireysel Kampanyalar", aciklama: "Bireysel müşterilere özel kampanyalar.", sureDakika: 20 },
      { id: 2, baslik: "Tarifeler ve Paketler", aciklama: "Güncel tarife ve paket kampanyaları.", sureDakika: 18 },
      { id: 3, baslik: "Cihaz Kampanyaları", aciklama: "Akıllı telefon ve cihaz kampanyaları.", sureDakika: 15 },
      { id: 4, baslik: "Faturasız Hat Kampanyaları", aciklama: "Faturasız hatlar için özel kampanyalar.", sureDakika: 12 }
    ],
    testler: [
      { id: 1, baslik: "Güncel Kampanyalar Değerlendirme", soruSayisi: 8, gecmeNotu: 70 }
    ],
    toplam_ilerleme: 70,
    etiketler: ["Kampanya", "Tarife", "Fırsat"],
    zorunlu: false,
    sonTarih: "2024-10-30",
    egitmen: "Ali Can",
    durum: "devam_ediyor"
  },
  {
    id: "1",
    baslik: "Dijital Servisler ve BiP Yönetimi",
    aciklama: "BiP, TV+, lifebox gibi dijital servislerin yönetimi, entegrasyonu ve müşteri desteği süreçleri.",
    kategori: "Dijital Servisler",
    moduller: [
      { id: 1, baslik: "Dijital Servislere Giriş", aciklama: "Turkcell dijital servislerinin genel tanıtımı.", sureDakika: 30 },
      { id: 2, baslik: "BiP Yönetimi", aciklama: "BiP uygulamasının yönetimi ve müşteri desteği.", sureDakika: 40 },
      { id: 3, baslik: "TV+ ve lifebox", aciklama: "Diğer dijital servislerin özellikleri ve entegrasyonları.", sureDakika: 50 },
      { id: 4, baslik: "Servis Entegrasyonları", aciklama: "API ve entegrasyon süreçleri.", sureDakika: 35 }
    ],
    testler: [
      { id: 1, baslik: "Dijital Servisler Testi", soruSayisi: 10, gecmeNotu: 70 }
    ],
    toplam_ilerleme: 40,
    etiketler: ["BiP", "Dijital Servisler", "Entegrasyon"],
    zorunlu: false,
    sonTarih: "2024-12-31",
    egitmen: "Ayşe Yıldız",
    durum: "devam_ediyor"
  },
  {
    id: "2",
    baslik: "5G ve Şebeke Operasyonları",
    aciklama: "5G altyapısı, baz istasyonu kurulumu, şebeke yönetimi ve arıza tespiti.",
    kategori: "Şebeke Operasyonları",
    moduller: [
      { id: 1, baslik: "5G Teknolojisine Giriş", aciklama: "5G altyapısının temelleri.", sureDakika: 30 },
      { id: 2, baslik: "Baz İstasyonu Kurulumu", aciklama: "Baz istasyonu kurulum adımları.", sureDakika: 40 },
      { id: 3, baslik: "Şebeke Yönetimi", aciklama: "Şebeke performans izleme ve yönetimi.", sureDakika: 50 }
    ],
    testler: [
      { id: 1, baslik: "5G Testi", soruSayisi: 10, gecmeNotu: 70 }
    ],
    toplam_ilerleme: 100,
    etiketler: ["5G", "Şebeke", "Baz İstasyonu"],
    zorunlu: true,
    sonTarih: "2024-10-15",
    egitmen: "Mehmet Demir",
    durum: "tamamlandi"
  },
  {
    id: "3",
    baslik: "Müşteri Deneyimi ve Dijital Kanal Yönetimi",
    aciklama: "Dijital kanallarda müşteri memnuniyeti, iletişim ve çözüm süreçleri.",
    kategori: "Müşteri Deneyimi",
    moduller: [
      { id: 1, baslik: "Müşteri Odaklılık", aciklama: "Telekomda müşteri odaklı yaklaşım.", sureDakika: 30 },
      { id: 2, baslik: "Dijital Kanal Yönetimi", aciklama: "Dijital kanalların yönetimi ve optimizasyonu.", sureDakika: 40 },
      { id: 3, baslik: "İletişim Becerileri", aciklama: "Etkili iletişim teknikleri.", sureDakika: 35 },
      { id: 4, baslik: "Memnuniyet Ölçümü", aciklama: "Müşteri memnuniyetinin ölçülmesi.", sureDakika: 45 }
    ],
    testler: [],
    toplam_ilerleme: 75,
    etiketler: ["Müşteri Deneyimi", "Dijital Kanal", "İletişim"],
    zorunlu: false,
    sonTarih: "2024-12-15",
    egitmen: "Zeynep Kaya",
    durum: "devam_ediyor"
  },
  {
    id: "4",
    baslik: "Siber Güvenlik ve Veri Koruma",
    aciklama: "Telekom sektöründe veri güvenliği, KVKK ve siber saldırılara karşı önlemler.",
    kategori: "Siber Güvenlik",
    moduller: [
      { id: 1, baslik: "Siber Güvenliğe Giriş", aciklama: "Siber güvenliğin önemi ve temelleri.", sureDakika: 30 },
      { id: 2, baslik: "KVKK ve Yasal Mevzuat", aciklama: "Kişisel verilerin korunması ve yasal yükümlülükler.", sureDakika: 40 },
      { id: 3, baslik: "Uygulama Güvenliği", aciklama: "Telekom uygulamalarında veri güvenliği.", sureDakika: 50 }
    ],
    testler: [
      { id: 1, baslik: "Siber Güvenlik Testi", soruSayisi: 10, gecmeNotu: 70 }
    ],
    toplam_ilerleme: 0,
    etiketler: ["Siber Güvenlik", "KVKK", "Veri Koruma"],
    zorunlu: true,
    sonTarih: "2025-01-15",
    egitmen: "Ali Vural",
    durum: "baslanmadi"
  },
  {
    id: "5",
    baslik: "Mobil Uygulama Geliştirme ve API Entegrasyonları",
    aciklama: "Turkcell uygulamaları için mobil geliştirme ve API kullanımı.",
    kategori: "Yazılım ve Geliştirme",
    moduller: [
      { id: 1, baslik: "Mobil Geliştirmeye Giriş", aciklama: "Mobil uygulama geliştirme temelleri.", sureDakika: 30 },
      { id: 2, baslik: "API Entegrasyonları", aciklama: "API kullanımı ve entegrasyon örnekleri.", sureDakika: 40 },
      { id: 3, baslik: "Test ve Yayınlama", aciklama: "Uygulama test süreçleri ve mağaza yayını.", sureDakika: 50 }
    ],
    testler: [
      { id: 1, baslik: "Mobil Geliştirme Testi", soruSayisi: 10, gecmeNotu: 70 }
    ],
    toplam_ilerleme: 60,
    etiketler: ["Mobil", "API", "Geliştirme"],
    zorunlu: false,
    sonTarih: "2025-02-15",
    egitmen: "Burak Şahin",
    durum: "devam_ediyor"
  },
  {
    id: "6",
    baslik: "İnovasyon ve Dijital Dönüşüm",
    aciklama: "Telekomda inovasyon kültürü, yeni nesil servisler ve dijitalleşme.",
    kategori: "İnovasyon",
    moduller: [
      { id: 1, baslik: "İnovasyona Giriş", aciklama: "İnovasyonun telekomdaki rolü.", sureDakika: 30 },
      { id: 2, baslik: "Dijital Dönüşüm", aciklama: "Dijitalleşme süreçleri ve örnekler.", sureDakika: 40 },
      { id: 3, baslik: "Yeni Nesil Servisler", aciklama: "Yeni nesil telekom servisleri.", sureDakika: 50 }
    ],
    testler: [
      { id: 1, baslik: "İnovasyon Testi", soruSayisi: 10, gecmeNotu: 70 }
    ],
    toplam_ilerleme: 0,
    etiketler: ["İnovasyon", "Dijital Dönüşüm", "Yeni Servisler"],
    zorunlu: false,
    sonTarih: "2025-03-01",
    egitmen: "Cansu Aksoy",
    durum: "baslanmadi"
  },
  {
    id: "7",
    baslik: "Şebeke Performans ve Analitik",
    aciklama: "Şebeke performans izleme, veri analitiği ve optimizasyon teknikleri.",
    kategori: "Şebeke Analitiği",
    moduller: [
      { id: 1, baslik: "Performans İzleme", aciklama: "Şebeke performans göstergeleri.", sureDakika: 30 },
      { id: 2, baslik: "Veri Analitiği", aciklama: "Telekomda veri analitiği uygulamaları.", sureDakika: 40 },
      { id: 3, baslik: "Optimizasyon", aciklama: "Şebeke optimizasyon teknikleri.", sureDakika: 35 }
    ],
    testler: [
      { id: 1, baslik: "Analitik Testi", soruSayisi: 10, gecmeNotu: 70 }
    ],
    toplam_ilerleme: 100,
    etiketler: ["Şebeke", "Analitik", "Optimizasyon"],
    zorunlu: true,
    sonTarih: "2024-11-01",
    egitmen: "Deniz Korkmaz",
    durum: "tamamlandi"
  }
]; 