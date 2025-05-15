/**
 * Middleware Güvenlik Testleri
 * 
 * Bu script, middleware güvenlik önlemlerini test etmek için kullanılır.
 * Testler: Middleware bypass kontrolü, header manipülasyonları, yetkilendirme testi
 */

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Test ortamı değişkenleri
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL || 'test@example.com';
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD || 'Test123!';

// Test sonuçları
const results = {
  passed: 0,
  failed: 0,
  tests: []
};

// Test helper
const logResult = (testName, success, message, details = {}) => {
  console.log(`[${success ? 'PASSED' : 'FAILED'}] ${testName}: ${message}`);
  if (!success) {
    console.error(details);
  }
  
  results.tests.push({
    name: testName,
    success,
    message,
    details,
    timestamp: new Date().toISOString()
  });
  
  success ? results.passed++ : results.failed++;
};

// Ana istek fonksiyonu
async function request(url, options = {}) {
  try {
    const fullUrl = `${BASE_URL}${url}`;
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    
    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = { error: 'JSON parse error' };
    }
    
    return { status: response.status, data, headers: response.headers };
  } catch (error) {
    return { error: error.message };
  }
}

// Test 1: Güvenlik Header Kontrolü
async function testSecurityHeaders() {
  try {
    // Herhangi bir sayfa isteği
    const response = await request('/');
    const headers = response.headers;
    
    const securityHeaders = [
      'content-security-policy',
      'x-content-type-options',
      'x-frame-options',
      'strict-transport-security'
    ];
    
    const missingHeaders = securityHeaders.filter(
      header => !headers.get(header)
    );
    
    if (missingHeaders.length === 0) {
      logResult('Güvenlik Header Kontrolü', true, 'Tüm gerekli güvenlik header\'ları mevcut');
    } else {
      logResult('Güvenlik Header Kontrolü', false, 'Eksik güvenlik header\'ları', { missingHeaders });
    }
  } catch (error) {
    logResult('Güvenlik Header Kontrolü', false, 'Test sırasında hata oluştu', { error: error.message });
  }
}

// Test 2: CSRF Koruması
async function testCSRFProtection() {
  try {
    // Login sayfasını al, CSRF token'ı kontrol et
    const loginPageResponse = await request('/auth/login');
    
    // CSRF token için HTML içeriğini kontrol et
    if (loginPageResponse.data && loginPageResponse.data.includes('csrf')) {
      logResult('CSRF Koruması', true, 'CSRF koruması tespit edildi');
    } else {
      // POST isteği ile CSRF token olmadan bir form gönderme dene
      const loginResponse = await request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: TEST_USER_EMAIL,
          password: TEST_USER_PASSWORD
        })
      });
      
      // Eğer 403 veya CSRF hatası dönerse, koruma aktif
      if (loginResponse.status === 403 || 
          (loginResponse.data && loginResponse.data.error && 
           loginResponse.data.error.includes('CSRF'))) {
        logResult('CSRF Koruması', true, 'CSRF koruma mekanizması aktif');
      } else {
        logResult('CSRF Koruması', false, 'CSRF koruması eksik veya bypass edilebilir', loginResponse);
      }
    }
  } catch (error) {
    logResult('CSRF Koruması', false, 'Test sırasında hata oluştu', { error: error.message });
  }
}

// Test 3: X-Middleware-Bypass Koruması
async function testMiddlewareBypassProtection() {
  try {
    // x-middleware-bypass header ile istek dene
    const bypassResponse = await request('/api/companies', {
      headers: {
        'x-middleware-bypass': 'true'
      }
    });
    
    // Eğer 403 dönerse, koruma aktif
    if (bypassResponse.status === 403) {
      logResult('Middleware Bypass Koruması', true, 'Middleware bypass koruması aktif');
    } else {
      logResult('Middleware Bypass Koruması', false, 'Middleware bypass koruması bypass edilebilir', bypassResponse);
    }
  } catch (error) {
    logResult('Middleware Bypass Koruması', false, 'Test sırasında hata oluştu', { error: error.message });
  }
}

// Test 4: Path Traversal Koruması
async function testPathTraversalProtection() {
  try {
    const pathTraversalUrls = [
      '/api/../../.env',
      '/api/%2e%2e/%2e%2e/package.json',
      '/api/..\\../config',
      '/api/notifications/..%2fauth',
      '/api/companies/../../secrets'
    ];
    
    let allPassed = true;
    const failedAttempts = [];
    
    for (const url of pathTraversalUrls) {
      const response = await request(url);
      
      // 400/404/403 yanıtları güvenlik için iyidir
      if (![400, 404, 403].includes(response.status)) {
        allPassed = false;
        failedAttempts.push({ url, status: response.status });
      }
    }
    
    if (allPassed) {
      logResult('Path Traversal Koruması', true, 'Tüm path traversal denemeleri engellendi');
    } else {
      logResult('Path Traversal Koruması', false, 'Bazı path traversal denemeleri engellenmedi', { failedAttempts });
    }
  } catch (error) {
    logResult('Path Traversal Koruması', false, 'Test sırasında hata oluştu', { error: error.message });
  }
}

// Test 5: Middleware Rate Limiting
async function testRateLimiting() {
  try {
    const MAX_REQUESTS = 20;
    const responses = [];
    
    // Aynı endpoint'e hızlı ardışık istekler gönder
    for (let i = 0; i < MAX_REQUESTS; i++) {
      const response = await request('/api/synbot');
      responses.push(response);
      
      // Eğer 429 (Too Many Requests) dönerse, rate limit aktif
      if (response.status === 429) {
        logResult('Rate Limiting', true, `Rate limit ${i+1} istekten sonra aktifleşti`);
        return;
      }
    }
    
    // Tüm istekler başarılı olduysa, rate limit ya çok yüksek ya da yok
    logResult('Rate Limiting', false, `${MAX_REQUESTS} istek sonrasında bile rate limit aktifleşmedi`);
  } catch (error) {
    logResult('Rate Limiting', false, 'Test sırasında hata oluştu', { error: error.message });
  }
}

// Tüm testleri çalıştır
async function runAllTests() {
  console.log('Middleware Güvenlik Testleri başlatılıyor...');
  
  await testSecurityHeaders();
  await testCSRFProtection();
  await testMiddlewareBypassProtection();
  await testPathTraversalProtection();
  await testRateLimiting();
  
  // Test sonuçlarını kaydet
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const resultsFile = path.join(process.cwd(), 'tests/api-security', `middleware-results-${timestamp}.json`);
  
  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
  
  console.log('\nTest Sonuçları:');
  console.log(`Toplam: ${results.passed + results.failed}`);
  console.log(`Başarılı: ${results.passed}`);
  console.log(`Başarısız: ${results.failed}`);
  console.log(`Sonuçlar kaydedildi: ${resultsFile}`);
}

// Ana fonksiyon
(async () => {
  try {
    await runAllTests();
  } catch (error) {
    console.error('Test çalıştırma hatası:', error);
  }
})(); 