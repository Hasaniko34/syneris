# Middleware Güvenlik Kontrolleri Özeti

Bu belge, Syneris projesi için geliştirilmiş olan middleware güvenlik kontrollerini özetlemektedir. Middleware katmanı, uygulamanın ilk savunma hattını oluşturarak API rotalarının güvenliğini sağlar.

## Güvenlik Kontrolleri

| Güvenlik Kontrolü | Açıklama | Uygulama |
|-------------------|----------|----------|
| **Yetkilendirme Kontrolleri** | API rotalarına erişim için kullanıcı oturumu ve rol kontrolü | `checkAuth` fonksiyonu |
| **Middleware Bypass Koruması** | CVE-2025-29927 güvenlik açığına karşı koruma | `validateMiddlewareHeaders` fonksiyonu |
| **Rol Tabanlı Erişim** | API rotalarına sadece yetkili kullanıcıların erişimini sağlama | `getRequiredRolesForRoute` fonksiyonu |
| **Yol Doğrulama** | Path traversal saldırılarına karşı koruma | `sanitizePath` fonksiyonu |
| **Güvenlik Başlıkları** | Güvenlik başlıklarının tüm yanıtlara eklenmesi | `middleware.ts` |
| **Hata Yönetimi** | Güvenlik hatalarının standart formatta yönetilmesi | `secureApiRoute` fonksiyonu |
| **Loglama** | Tüm API istekleri ve güvenlik olaylarının loglanması | `apiLogger` sınıfı |

## Middleware İşleyişi

Bir API isteği geldiğinde middleware şu sırayla çalışır:

1. İstek yolunu kontrol eder ve API rotası olup olmadığını belirler
2. API rotası ise, middleware bypass kontrolü yapar
3. Kullanıcı oturumunu kontrol eder ve yetkilendirme yapar
4. İstenilen rota için gerekli rolleri kontrol eder
5. Kullanıcının rolü uygunsa isteğin devam etmesine izin verir
6. Yanıta güvenlik başlıklarını ekler
7. Tüm işlemleri loglar

## API Güvenlik Sarmalayıcısı

Tüm API rotaları `secureApiRoute` fonksiyonu ile sarmalanarak ikinci bir güvenlik katmanı oluşturulmuştur:

```javascript
export async function GET(req: NextRequest) {
  return secureApiRoute(req, async (req: NextRequest, authData) => {
    // API işleyici kodu...
    return standardApiResponse(data);
  }, { 
    allowedRoles: ['admin', 'manager'],
    operationName: 'Operasyon Adı'
  });
}
```

Bu sarmalayıcı şu güvenlik kontrollerini sağlar:

1. Tekrar middleware bypass kontrolü (çift kontrol)
2. Rol bazlı yetkilendirme kontrolü
3. Try/catch ile hata yönetimi
4. API isteği ve yanıtı loglama
5. Standart yanıt formatı

## Rol Tabanlı Erişim Yapısı

API rotaları için rol haritası `middleware-helpers.ts` dosyasında tanımlanmıştır:

```javascript
const routeRoles: Record<string, string[]> = {
  '/api/companies': ['admin'],
  '/api/users': ['admin', 'manager'],
  '/api/courses': ['admin', 'manager', 'trainer'],
  // ...diğer rotalar
};
```

Bu harita, hangi API rotasına hangi rollerin erişebileceğini belirler. Middleware, bu haritayı kullanarak istekleri filtreler.

## Genişletilmiş Kontroller

API rotaları içinde, daha spesifik kontroller de uygulanmaktadır:

1. **Şirket Kısıtlaması**: Manager rolündeki kullanıcılar sadece kendi şirketlerine ait verilere erişebilir
2. **Veri Sahipliği**: Kullanıcılar sadece kendilerine ait verileri değiştirebilir
3. **Kritik Alan Koruması**: Hassas alanların değiştirilmesi kısıtlanmıştır (örneğin domain değişikliği)

## Güvenlik Olayları Loglama

Tüm güvenlik olayları `apiLogger.logSecurity` fonksiyonu ile loglanır:

```javascript
apiLogger.logSecurity(req, 'Manager rolü başka şirkete erişim girişimi', {
  userId: authData.session.user.id,
  userRole: authData.session.user.role,
  userCompany: authData.session.user.company,
  requestedCompany: company._id
});
```

Bu loglar, güvenlik olaylarının analiz edilmesine ve potansiyel saldırıların tespit edilmesine olanak sağlar.

## Test ve Doğrulama

Middleware ve API güvenlik kontrolleri, kapsamlı test senaryoları ile doğrulanmıştır:

1. Yetkisiz erişim testleri
2. Rol bazlı erişim testleri
3. Middleware bypass testleri
4. Path traversal testleri
5. Rate limiting testleri

Test sonuçları, tüm güvenlik kontrollerinin beklendiği gibi çalıştığını doğrulamıştır.

## Sonuç

Syneris projesi, çoklu savunma katmanları kullanarak güçlü bir API güvenlik yapısı oluşturmuştur. Middleware kontrolleri ve API sarmalayıcıları birlikte çalışarak tutarlı ve kapsamlı bir güvenlik stratejisi sağlamaktadır. 