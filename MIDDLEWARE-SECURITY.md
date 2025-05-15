# Next.js Middleware Güvenliği

Bu dökümantasyon, Syneris projesi için implementlenmiş olan Next.js middleware güvenlik stratejilerini ve özellikle CVE-2025-29927 güvenlik açığına karşı alınan önlemleri detaylandırmaktadır.

## CVE-2025-29927 Hakkında

CVE-2025-29927, Next.js'in middleware bileşeninde keşfedilmiş kritik bir güvenlik açığıdır. Bu açık, kötü niyetli bir saldırganın `x-middleware-subrequest` başlığını manipüle ederek middleware'in yetkilendirme kontrollerini tamamen atlamasına olanak sağlar.

### Açığın Detayları

Next.js, middleware'in kendi kendisini çağırmasını önlemek ve sonsuz döngüleri engellemek için `x-middleware-subrequest` başlığını kullanır. Ancak, bu başlık aşağıdaki gibi manipüle edilirse:

```
x-middleware-subrequest: src/middleware:src/middleware:src/middleware:src/middleware
```

Next.js sistemini middleware'in zaten çalıştığını düşünmeye ikna eder ve yetkilendirme kontrollerini atlar. Bu durum, korumalı sayfalara ve API rotalarına izinsiz erişim gibi ciddi bir güvenlik ihlaline yol açabilir.

## Alınan Güvenlik Önlemleri

Projemizde bu güvenlik açığına karşı aşağıdaki önlemleri uyguladık:

### 1. `validateMiddlewareHeaders` Fonksiyonu

`lib/utils/auth.ts` dosyasında oluşturduğumuz bu fonksiyon, gelen isteklerdeki `x-middleware-subrequest` başlığını kontrol eder ve manipüle edilmiş değerleri tespit eder:

```typescript
export function validateMiddlewareHeaders(headers: Headers): boolean {
  const middlewareSubrequest = headers.get('x-middleware-subrequest');
  
  // Bu header yoksa sorun yok
  if (!middlewareSubrequest) {
    return true;
  }
  
  // Header'ın güvenli olup olmadığını kontrol et
  const parts = middlewareSubrequest.split(':');
  const uniqueParts = new Set(parts);
  
  // Eğer tekrarlanan değerler varsa, bu bir bypass girişimi olabilir
  if (parts.length > uniqueParts.size) {
    console.warn('Potansiyel middleware bypass girişimi tespit edildi:', middlewareSubrequest);
    return false;
  }
  
  // Tekrarlanan middleware kelimesi varsa, bu bir bypass girişimi olabilir
  if (middlewareSubrequest.includes('middleware:middleware')) {
    console.warn('Potansiyel middleware bypass girişimi tespit edildi:', middlewareSubrequest);
    return false;
  }
  
  return true;
}
```

### 2. Middleware'de Güvenlik Kontrolü

Ana `middleware.ts` dosyasında, her isteğin işlenmeden önce bu kontrolden geçmesini sağladık:

```typescript
export async function middleware(request: NextRequest) {
  // CVE-2025-29927 güvenlik açığına karşı kontrol
  if (!validateMiddlewareHeaders(request.headers)) {
    console.error('Middleware bypass girişimi tespit edildi!', {
      ip: getClientIP(request),
      userAgent: getUserAgent(request),
      url: request.url,
      headers: Object.fromEntries(request.headers)
    });
    
    // 403 Forbidden yanıtı döndür
    return new NextResponse(
      JSON.stringify({ 
        error: 'Yetkisiz erişim', 
        message: 'Güvenlik ihlali tespit edildi'
      }),
      { 
        status: 403,
        headers: { 
          'Content-Type': 'application/json',
          'X-Content-Type-Options': 'nosniff'
        }
      }
    );
  }
  
  // Diğer middleware işlemleri...
}
```

### 3. API Rotalarında Çift Kontrol

Middleware bypass girişimleri olabileceğini düşünerek, API rotalarında da aynı kontrolü uyguladık:

```typescript
export async function GET(request: NextRequest) {
  try {
    // CVE-2025-29927 güvenlik açığına karşı kontrol
    if (!validateMiddlewareHeaders(request.headers)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Güvenlik ihlali tespit edildi' 
        },
        { status: 403 }
      );
    }
    
    // Diğer API işlemleri...
  } catch (error) {
    // Hata yönetimi...
  }
}
```

## Genel Güvenlik Stratejileri

CVE-2025-29927'ye özel önlemlerin yanı sıra, aşağıdaki genel güvenlik stratejilerini de uyguladık:

### 1. Derinlemesine Savunma

Middleware'in tek başına güvenlik bariyeri olmaması için, API rotalarında da `checkAuth` fonksiyonu ile ikinci bir kimlik doğrulama katmanı uyguladık.

### 2. Güvenlik Başlıkları

Middleware'de tüm yanıtlara güvenlik başlıkları ekledik:

```typescript
// Temel güvenlik başlıkları
response.headers.set('X-Content-Type-Options', 'nosniff');
response.headers.set('X-XSS-Protection', '1; mode=block');
response.headers.set('X-Frame-Options', 'DENY');
response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

// Content Security Policy
response.headers.set(
  'Content-Security-Policy',
  "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; img-src 'self' data: https:; font-src 'self' data: https://cdn.jsdelivr.net; connect-src 'self' https://www.google-analytics.com;"
);
```

### 3. Erişim Günlükleri

Güvenlik olaylarını tespit etmek için, tüm erişimleri ve potansiyel ihlal girişimlerini kaydediyoruz.

### 4. Rol Tabanlı Erişim Kontrolü (RBAC)

Middleware ve API rotaları, kullanıcı rollerine dayalı erişim kontrolü uygular:

```typescript
// Şirket yöneticisi kontrolü
if (pathname.startsWith('/dashboard/company-admin') && token?.role !== 'admin' && token?.role !== 'manager') {
  console.warn('Yetkisiz erişim girişimi:', {
    ...logInfo,
    requestedPath: pathname,
    requiredRole: 'admin or manager',
    actualRole: token?.role
  });
  return NextResponse.redirect(new URL('/dashboard', request.url));
}
```

## En İyi Uygulamalar ve Öneriler

1. **Next.js'i Güncel Tutun**: Next.js sürümünüzü her zaman en son güvenlik yamalarını içerecek şekilde güncel tutun.
2. **Middleware'e Aşırı Güvenmeyin**: Kimlik doğrulama ve yetkilendirme için yalnızca middleware'e güvenmeyin. API rotalarında ve sayfa bileşenlerinde her zaman ikinci bir kontrol uygulayın.
3. **İstek Başlıklarını Filtreyin**: Mümkünse, uygulamanızın önünde bir proxy veya edge fonksiyonu kullanarak potansiyel olarak tehlikeli başlıkları filtreleyebilirsiniz.
4. **Güvenlik Güncellemelerini Takip Edin**: Next.js ve ilgili bağımlılıklar için güvenlik duyurularını düzenli olarak takip edin.
5. **Penetrasyon Testleri Yapın**: Uygulamanızın güvenliğini düzenli olarak profesyonel bir penetrasyon testi ile değerlendirin.

## İlgili Kaynaklar

- [Next.js Middleware Güvenlik Açığı (CVE-2025-29927)](https://vercel.com/blog/postmortem-on-next-js-middleware-bypass)
- [Next.js Güvenlik Dökümantasyonu](https://nextjs.org/docs/advanced-features/security-headers)
- [Next.js Middleware Dökümantasyonu](https://nextjs.org/docs/app/building-your-application/routing/middleware)

---

Bu dökümantasyon, Syneris ekibi tarafından hazırlanmıştır. Güvenlik ile ilgili sorularınız veya önerileriniz için lütfen ekiple iletişime geçin. 

# API Güvenlik Açıkları ve Middleware İyileştirmeleri

## Tespit Edilen Güvenlik Açıkları

Mevcut API rotalarını ve middleware yapısını inceledikten sonra aşağıdaki güvenlik açıkları tespit edilmiştir:

1. **Middleware Bypass Zafiyeti (CVE-2025-29927)**: 
   - Middleware'in atlatılmasına yönelik saldırılara karşı koruma var ancak bu kontroller tüm API rotalarında tutarlı şekilde uygulanmıyor.
   - Her API rotasında ayrı ayrı kontrol edilmesi yerine, merkezi olarak middleware'de yönetilmeli.

2. **Tutarsız Yetkilendirme Kontrolleri**:
   - Her API rotasında farklı yetkilendirme kontrolleri uygulanıyor.
   - Bazı API rotalarında rol kontrolleri eksik olabilir.
   - Kritik operasyonlara karşı daha sıkı koruma gerektiriyor.

3. **HTTP Güvenlik Başlıkları**:
   - CSP (Content Security Policy) politikaları fazla geniş, daha sıkı tanımlanmalı.
   - HSTS başlığı eksik.
   - Bazı önemli güvenlik başlıkları her yanıtta eklenmiyor.

4. **Oturum Güvenliği**:
   - CSRF koruması eksik veya yetersiz.
   - Cookie güvenlik ayarları (SameSite, Secure, HttpOnly) optimize edilmemiş.

5. **Hız Sınırlama Koruması Eksik**:
   - API rotalarında rate limiting (hız sınırlama) uygulanmamış.
   - Brute force saldırılarına karşı koruma yetersiz.

6. **Standart Hata Yanıtları**:
   - API'lerde standart hata formatı yok, bu güvenlik açıklarını ifşa edebilir.
   - Bazı hatalarda fazla teknik detay açığa çıkabiliyor.

7. **Rol Tabanlı Erişim Kontrolü (RBAC)**:
   - Mevcut rol sistemi (admin, user, trainer, manager) var ama middleware seviyesinde etkin kullanılmıyor.
   - İzin kontrollerinin erken aşamada (middleware) yerine geç aşamada (API rotası) yapılması.

8. **API Yolları İçin Güvenli Rotalar**:
   - `/api/admin` gibi yollar için middleware seviyesinde koruma eksik.
   - Daha spesifik rol ve yetki kontrolleri gerekiyor.

## İyileştirme Önerileri

Yukarıdaki güvenlik açıklarına karşı aşağıdaki iyileştirmeler yapılmalıdır:

1. **Merkezi Middleware Yapısı**:
   - Tüm güvenlik kontrolleri middleware'de merkezi olarak yapılmalı.
   - API rotalarında tekrar eden güvenlik kodları kaldırılmalı.

2. **Rol Tabanlı Middleware Koruma**:
   - Middleware'de rol tabanlı erişim kontrolü (RBAC) uygulanmalı.
   - Özel yetkilendirme fonksiyonları geliştirilmeli.

3. **Gelişmiş Güvenlik Başlıkları**:
   - HSTS, CSP, ve diğer güvenlik başlıkları optimize edilmeli.
   - Cookie güvenlik ayarları (SameSite, Secure, HttpOnly) güçlendirilmeli.

4. **Rate Limiting Uygulaması**:
   - Middleware seviyesinde hız sınırlama koruması eklenmeli.
   - IP bazlı veya kullanıcı bazlı sınırlama ile brute force saldırılarına karşı koruma sağlanmalı.

5. **Güvenli Oturum Yönetimi**:
   - CSRF token koruması uygulanmalı.
   - JWT güvenlik ayarları gözden geçirilmeli.

6. **Standart Hata Yönetimi**:
   - Tüm API yanıtları için standart format oluşturulmalı.
   - Hassas bilgilerin açığa çıkmasını önlemek için hata mesajları genelleştirilmeli.

7. **API Yol Koruması**:
   - Belirli API yolları için otomatik rol/yetki kontrolü mekanizması geliştirilmeli.
   - Admin, yönetici gibi yüksek yetkili rotaların korunması. 