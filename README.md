# Syneris - Kurumsal Eğitim ve Adaptasyon Platformu

Syneris, şirketlerin çalışanları için dijital eğitim süreçlerini kolaylaştıran, adaptasyon süresini kısaltan ve verimliliği artıran yenilikçi bir platformdur. Kullanıcı dostu arayüzü, özelleştirilebilir içerikleri ve mobil entegrasyonu ile eğitim süreçlerini daha erişilebilir hale getirir.

## Özellikler

- **SynBot**: Yapay zeka destekli asistan ile kullanıcılara adım adım rehberlik
- **Eğitim İçerikleri**: Şirket özelinde hazırlanmış, özelleştirilebilir eğitim modülleri
- **Arama Motoru**: İşlemlerin adım adım görsellerle desteklenmesi
- **Performans Takibi**: Çalışanların eğitim süreçlerinin detaylı analizi
- **Mobil Entegrasyon**: Her yerden erişilebilir eğitim içerikleri

## Oturum Yönetimi ve Token Yenileme

Syneris, güvenli oturum yönetimi için NextAuth.js ve JWT (JSON Web Token) tabanlı bir yapı kullanmaktadır. Bu yapı, aşağıdaki güvenlik özelliklerini içerir:

### Token Yapılandırması

- **Access Token Süresi**: 4 saat
- **JWT Maksimum Süresi**: 7 gün
- **Token Yenileme**: Süre bitmeden 10 dakika önce otomatik yenileme

### Oturum Güvenliği

- Kullanıcı aktiflik kontrolü
- Rol tabanlı erişim kontrolü
- Oturum zaman aşımı yönetimi
- Güvenli token yenileme mekanizması

### Token Yenileme Akışı

1. Client tarafında `useTokenRefresh` hook'u çalışır
2. Token süresi dolmak üzereyse API'ye yenileme isteği gönderilir
3. Server token'ı yeniler ve kullanıcı bilgilerini doğrular
4. Yeni token client'a iletilir ve oturum güncellenir

## Teknik Altyapı

- **Frontend**: React.js, Next.js, TailwindCSS
- **Backend**: Node.js, Next.js API Routes
- **Veritabanı**: MongoDB
- **Kimlik Doğrulama**: NextAuth.js, JWT
- **Dosya Depolama**: AWS S3 (opsiyonel)
- **Ortam**: Vercel, AWS, Docker destekli

## API Güvenlik Mimarisi

Tüm API rotaları, merkezi güvenlik kontrolleri ile korunmaktadır:

- Middleware güvenlik kontrolleri
- Rol bazlı yetkilendirme
- Rate limiting
- CVE-2025-29927 güvenlik açığına karşı koruma
- Ayrıntılı API loglama

## Teknik Kullanım

### Token Yenileme Hook'u

```tsx
// Client tarafında token yenileme kullanımı
import { useTokenRefresh } from '@/lib/hooks/useTokenRefresh';

function MyComponent() {
  const { refreshToken } = useTokenRefresh({
    refreshInterval: 15 * 60 * 1000, // 15 dakikada bir kontrol
    refreshThreshold: 10 * 60, // 10 dakika kala yenileme başlat
    onError: (error) => console.error('Yenileme hatası:', error)
  });
  
  // Manuel token yenileme için
  const handleManualRefresh = async () => {
    await refreshToken();
  };
  
  return (
    <button onClick={handleManualRefresh}>
      Token Yenile
    </button>
  );
}
```

### API Rotalarını Güvenli Hale Getirme

```tsx
// API rotasını güvenlik kontrolü ile sarma
import { secureApiRoute } from '@/lib/utils/api-security';

export async function GET(req: NextRequest) {
  return secureApiRoute(req, 
    async (req, authData) => {
      // Route işlemleri burada
      return NextResponse.json({ data: "..." });
    },
    {
      allowedRoles: ['admin', 'manager'], // İzin verilen roller
      logRequest: true,
      logResponse: true
    }
  );
}
```

## Kurulum

### Gereksinimler

- Node.js 18 veya üzeri
- MongoDB hesabı

### Geliştirme Ortamı

1. Repoyu klonlayın
```bash
git clone https://github.com/username/syneris.git
cd syneris
```

2. Bağımlılıkları yükleyin
```bash
npm install
```

3. `.env.local` dosyasını oluşturun
```
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/syneris?retryWrites=true&w=majority

# Next Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google Provider (isteğe bağlı)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

4. Geliştirme sunucusunu başlatın
```bash
npm run dev
```

5. Tarayıcınızda http://localhost:3000 adresini açın

## Proje Yapısı

```
syneris/
├── app/                 # Next.js App Router klasörü
│   ├── api/             # API Routes
│   ├── auth/            # Kimlik doğrulama sayfaları
│   ├── dashboard/       # Dashboard sayfaları
│   └── ...
├── components/          # React bileşenleri
│   ├── ui/              # UI bileşenleri (shadcn/ui)
│   └── ...
├── lib/                 # Yardımcı fonksiyonlar ve hooks
│   ├── models/          # MongoDB/Mongoose modelleri
│   └── ...
├── public/              # Statik dosyalar
├── tests/               # Test dosyaları
│   ├── api-security/    # API güvenlik testleri
│   └── ...
└── ...
```

## API Güvenlik

Syneris projesi, kapsamlı bir API güvenlik mimarisi kullanmaktadır. Güvenlik katmanları şunları içerir:

1. **Middleware Güvenlik Kontrolleri**: İstek yapılmadan önce ilk güvenlik kontrolleri
2. **API Güvenlik Sarmalayıcıları**: API rotaları için standart güvenlik işlemleri
3. **Rol Tabanlı Erişim Kontrolü**: Kullanıcı rollerine göre API erişimi
4. **Veri Erişim Kısıtlamaları**: Kullanıcıların sadece kendi verilerine erişimi

### Güvenlik Testleri

API güvenlik testlerini çalıştırmak için:

```bash
# Tüm güvenlik testlerini çalıştır
npm run test

# Sadece API güvenlik testlerini çalıştır
npm run test:api-security

# Sadece middleware testlerini çalıştır
npm run test:middleware
```

### Güvenlik Belgeleri

Proje kök dizininde aşağıdaki güvenlik belgeleri bulunmaktadır:

- **API-GUVENLIK-REHBERI.md**: API güvenlik yönergeleri ve en iyi uygulamalar
- **MIDDLEWARE-API-GUVENLIK-RAPORU.md**: Uygulanmış güvenlik önlemlerinin kapsamlı raporu
- **MIDDLEWARE-OZETI.md**: Middleware güvenlik kontrollerinin özeti

Daha fazla bilgi için bu belgelere başvurabilirsiniz.

## Katkıda Bulunma

Projeye katkıda bulunmak için lütfen bir issue açın veya bir pull request oluşturun.

## Lisans

Bu proje [MIT](LICENSE) lisansı altında lisanslanmıştır.

## İletişim

Herhangi bir sorunuz veya öneriniz varsa, [info@syneris.com](mailto:info@syneris.com) adresinden bizimle iletişime geçebilirsiniz.

## Önemli Güvenlik Bilgisi

### Kullanıcı Veritabanı Temizleme İşlemi

**ÖNEMLİ NOT: Kullanıcı silme özelliği devre dışı bırakılmıştır!**

Uygulama daha önce veritabanındaki tüm kullanıcıları silme özelliğine sahipti, ancak bu özellik güvenlik nedeniyle devre dışı bırakılmıştır. Kullanıcı hesaplarının güvende olması için bu işlem artık gerçekleştirilememektedir.

Devre dışı bırakılan bu işlem şu güvenlik önlemleriyle korunmaktaydı:
1. Sadece admin yetkisi olan kullanıcılar erişebilirdi
2. `.env.local` dosyasında tanımlı özel bir güvenlik anahtarı gerekliydi
3. Eski `cleanup-users.js` betiği kaldırılmıştı

```
GET /api/admin/clean-users?confirmKey={ADMIN_CLEANUP_KEY}
```

Bu endpoint artık kullanıcı silme işlemi yapmamaktadır ve sadece bir bilgi mesajı döndürmektedir.

### Varsayılan Admin Kullanıcısı Oluşturma

Sisteme ilk giriş yapabilmek için bir admin kullanıcısı oluşturabilirsiniz:

```
GET /api/create-default-user?secretKey={ADMIN_CLEANUP_KEY}
```

Bu API çağrısı, aşağıdaki bilgilerle bir admin kullanıcısı oluşturacaktır:
- E-posta: admin@example.com
- Şifre: adminpassword
- Rol: admin

Güvenlik nedenleriyle, bu API sadece geliştirme aşamasında kullanılmalı ve proje canlıya alınmadan önce kaldırılmalıdır.
