# API Güvenlik Rehberi

Bu rehber, Syneris projesinde uygulanan API güvenlik önlemlerini, en iyi uygulamaları ve geliştirici yönergelerini içerir.

## İçindekiler

1. [API Güvenlik Özeti](#api-güvenlik-özeti)
2. [Yetkilendirme ve Erişim Kontrolü](#yetkilendirme-ve-erişim-kontrolü)
3. [API Rotası Oluşturma Rehberi](#api-rotası-oluşturma-rehberi)
4. [Güvenlik Kontrol Listesi](#güvenlik-kontrol-listesi)
5. [Güvenlik Test Süreçleri](#güvenlik-test-süreçleri)
6. [Hata Ayıklama](#hata-ayıklama)

## API Güvenlik Özeti

Syneris API güvenlik mimarisi aşağıdaki temel prensiplere dayanır:

- **Çoklu Savunma Katmanları**: Middleware, API güvenlik sarmalayıcıları ve rol tabanlı erişim kontrolleri
- **Merkezi Güvenlik Uygulaması**: Tüm API rotaları için standartlaştırılmış güvenlik kontrolleri
- **Kapsamlı Loglama**: Tüm API istekleri, yanıtları ve güvenlik olayları için detaylı loglama
- **Proaktif Güvenlik Önlemleri**: CVE-2025-29927 gibi bilinen güvenlik açıklarına karşı koruma
- **Rol Tabanlı Erişim Kontrolü (RBAC)**: Kullanıcı rollerine göre API erişim kısıtlamaları

## Yetkilendirme ve Erişim Kontrolü

### API Güvenlik Sarmalayıcısı

Tüm API rotaları `secureApiRoute` fonksiyonu ile sarmalanmalıdır:

```javascript
export async function GET(req: NextRequest) {
  return secureApiRoute(req, async (req: NextRequest, authData) => {
    // API işleyici kodu...
    return standardApiResponse(data, { message: 'İşlem başarılı' });
  }, { 
    allowedRoles: ['admin', 'manager'],
    operationName: 'Operasyon Adı'
  });
}
```

### Rol Tabanlı Erişim

`secureApiRoute` fonksiyonu `allowedRoles` parametresi ile erişim kontrolü sağlar:

| Rol | Erişim Düzeyi | Açıklama |
|-----|---------------|----------|
| `admin` | Tam erişim | Sistemdeki tüm verilere erişim |
| `manager` | Şirket kısıtlı | Sadece kendi şirketine ait verilere erişim |
| `trainer` | İçerik kısıtlı | Sadece içerik yönetimi ile ilgili erişim |
| `user` | Kullanıcı kısıtlı | Sadece kendi verileri ve genel içeriğe erişim |

### İzin Kontrolleri

Rol bazlı kısıtlamalara ek olarak şirket bazlı kısıtlamalar gibi özel durumlar için ek kontroller eklenmelidir:

```javascript
// Manager rolü için şirket kısıtlaması örneği
if (authData.session.user.role === "manager" && 
    String(authData.session.user.company) !== String(company._id)) {
  
  apiLogger.logSecurity(req, 'Manager rolü başka şirkete erişim girişimi', {
    userId: authData.session.user.id,
    userRole: authData.session.user.role,
    userCompany: authData.session.user.company,
    requestedCompany: company._id
  });
  
  return standardApiResponse(null, {
    success: false,
    status: 403,
    message: "Bu şirkete erişim yetkiniz yok"
  });
}
```

## API Rotası Oluşturma Rehberi

Yeni bir API rotası eklerken aşağıdaki adımları izleyin:

1. Rotayı API yapısına uygun olarak oluşturun (örn. `app/api/resource/route.ts`)
2. Tüm HTTP işleyicilerini (GET, POST, PUT, DELETE) `secureApiRoute` ile sarmalayın
3. Her işleyici için uygun `allowedRoles` tanımlayın
4. `operationName` parametresi ile anlamlı bir operasyon adı belirleyin
5. Rol tabanlı ek kısıtlamalar metot içinde kontrol edin
6. Tüm yanıtlar için `standardApiResponse` fonksiyonunu kullanın
7. Güvenlik olaylarını `apiLogger.logSecurity` ile kaydedin
8. Yetkili işlemleri `apiLogger.logAuth` ile kaydedin

## Güvenlik Kontrol Listesi

Yeni bir API rotası eklemeden veya mevcut bir rotayı güncellemeden önce bu kontrol listesini kullanın:

- [ ] `secureApiRoute` fonksiyonu kullanıldı mı?
- [ ] `allowedRoles` doğru şekilde tanımlandı mı?
- [ ] Veritabanı sorguları için giriş doğrulaması yapıldı mı?
- [ ] Tüm yanıtlar `standardApiResponse` ile formatlandı mı?
- [ ] ID parametreleri MongoDB için doğrulandı mı? (`mongoose.Types.ObjectId.isValid`)
- [ ] Rol tabanlı ek kısıtlamalar uygulandı mı? (örn. manager sadece kendi şirketine erişebilir)
- [ ] Kritik alanlar korunuyor mu? (örn. domain değiştirilemez)
- [ ] Tüm işlemler uygun şekilde loglanıyor mu?

## Güvenlik Test Süreçleri

Güvenlik testlerini çalıştırmak için:

```bash
# Tüm güvenlik testlerini çalıştır
npm run test

# Sadece API güvenlik testlerini çalıştır
npm run test:api-security

# Sadece middleware testlerini çalıştır
npm run test:middleware
```

Test sonuçları `tests/api-security/` dizini altında JSON dosyaları olarak saklanır.

### Test Kapsamı

1. **Yetkilendirme Testleri**
   - Yetkisiz erişim kontrolü
   - Rol tabanlı erişim kontrolü
   - Şirket kısıtlaması kontrolü

2. **Middleware Testleri**
   - Middleware bypass koruması
   - Güvenlik header'ları kontrolü
   - CSRF koruması
   - Path traversal koruması
   - Rate limiting kontrolü

3. **Loglama Testleri**
   - API işlemlerinin loglanması
   - Güvenlik olaylarının loglanması

## Hata Ayıklama

Güvenlik hatalarını tespit etmek ve çözmek için:

1. API log dosyalarını kontrol edin (`logs/api-*.log`)
2. Güvenlik olayları için `SECURITY` tipinde logları arayın
3. API kullanım analizi endpointini kullanın (`/api/analytics/api-usage`)

### Yaygın Sorunlar ve Çözümleri

| Sorun | Olası Neden | Çözüm |
|-------|-------------|-------|
| 401 Yetkisiz Erişim | Oturum süresi dolmuş veya geçersiz | Kullanıcının tekrar giriş yapmasını sağlayın |
| 403 Yasak Erişim | Kullanıcının rolü yetersiz | İzin kontrollerini gözden geçirin |
| Middleware Bypass Tespiti | CVE-2025-29927 güvenlik açığı istismarı | Güvenlik olayını loglayın ve IP adresini engelleyin |
| Manager başka şirkete erişim | Yetkisiz erişim girişimi | Şirket bazlı erişim kontrollerini güçlendirin | 