/**
 * API Güvenlik Testleri
 * 
 * Bu script, API güvenlik önlemlerini test etmek için kullanılır.
 * Testler: Yetkilendirme, CSRF koruması, rate limiting, rol tabanlı erişim kontrolleri
 */

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Test ortamı değişkenleri
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';
const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL || 'test@example.com';
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD || 'Test123!';
const TEST_ADMIN_EMAIL = process.env.TEST_ADMIN_EMAIL || 'admin@syneris.com';
const TEST_ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD || 'Admin123!';

// Test sonuçlarını kaydetmek için
const results = {
  passed: 0,
  failed: 0,
  tests: []
};

// Test yardımcı fonksiyonları
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

// API istekleri için yardımcı fonksiyon
async function apiRequest(endpoint, options = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    
    const data = await response.json();
    return { status: response.status, data, headers: response.headers };
  } catch (error) {
    return { error: error.message };
  }
}

// Oturum açma helper fonksiyonu
async function login(email, password) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

// Test 1: Yetkisiz Erişim Testi
async function testUnauthorizedAccess() {
  try {
    // Yetkisiz şirketler listesi erişimi
    const companiesResponse = await apiRequest('/companies');
    
    if (companiesResponse.status === 401) {
      logResult('Yetkisiz Erişim Testi', true, 'Yetkisiz istek başarıyla reddedildi');
    } else {
      logResult('Yetkisiz Erişim Testi', false, 'Yetkisiz istek reddedilmedi', companiesResponse);
    }
  } catch (error) {
    logResult('Yetkisiz Erişim Testi', false, 'Test sırasında hata oluştu', { error: error.message });
  }
}

// Test 2: Rol Tabanlı Erişim Kontrolü
async function testRoleBasedAccess() {
  try {
    // Normal kullanıcı ile giriş yap
    const loginResponse = await login(TEST_USER_EMAIL, TEST_USER_PASSWORD);
    
    if (loginResponse.error || !loginResponse.data.token) {
      logResult('Rol Tabanlı Erişim Testi', false, 'Kullanıcı girişi başarısız', loginResponse);
      return;
    }
    
    const token = loginResponse.data.token;
    
    // Normal kullanıcı ile admin rotasına erişmeyi dene
    const adminResponse = await apiRequest('/admin/clean-users', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (adminResponse.status === 403) {
      logResult('Rol Tabanlı Erişim Testi', true, 'Yetkisiz rol erişimi başarıyla reddedildi');
    } else {
      logResult('Rol Tabanlı Erişim Testi', false, 'Yetkisiz rol erişimi engellenmedi', adminResponse);
    }
  } catch (error) {
    logResult('Rol Tabanlı Erişim Testi', false, 'Test sırasında hata oluştu', { error: error.message });
  }
}

// Test 3: Manager Şirket Kısıtlaması
async function testManagerCompanyRestriction() {
  try {
    // Manager rolüne sahip kullanıcı ile giriş yap
    const loginResponse = await login('manager@example.com', 'Manager123!');
    
    if (loginResponse.error || !loginResponse.data.token) {
      logResult('Manager Şirket Kısıtlaması Testi', false, 'Manager girişi başarısız', loginResponse);
      return;
    }
    
    const token = loginResponse.data.token;
    const managerId = loginResponse.data.user.id;
    const managerCompany = loginResponse.data.user.company;
    
    // Farklı bir şirket ID'si ile erişim dene
    const differentCompanyId = managerCompany === '1' ? '2' : '1';
    const companyResponse = await apiRequest(`/companies/${differentCompanyId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (companyResponse.status === 403) {
      logResult('Manager Şirket Kısıtlaması Testi', true, 'Başka şirkete erişim başarıyla reddedildi');
    } else {
      logResult('Manager Şirket Kısıtlaması Testi', false, 'Başka şirkete erişim engellenmedi', companyResponse);
    }
  } catch (error) {
    logResult('Manager Şirket Kısıtlaması Testi', false, 'Test sırasında hata oluştu', { error: error.message });
  }
}

// Test 4: Middleware Bypass Koruması
async function testMiddlewareBypass() {
  try {
    // Admin olarak giriş yap
    const loginResponse = await login(TEST_ADMIN_EMAIL, TEST_ADMIN_PASSWORD);
    
    if (loginResponse.error || !loginResponse.data.token) {
      logResult('Middleware Bypass Testi', false, 'Admin girişi başarısız', loginResponse);
      return;
    }
    
    const token = loginResponse.data.token;
    
    // Middleware bypass girişimi
    const bypassResponse = await apiRequest('/companies', {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'x-middleware-bypass': 'true' // Geçersiz header dene
      }
    });
    
    if (bypassResponse.status === 403) {
      logResult('Middleware Bypass Testi', true, 'Middleware bypass girişimi başarıyla tespit edildi');
    } else {
      logResult('Middleware Bypass Testi', false, 'Middleware bypass koruması etkin değil', bypassResponse);
    }
  } catch (error) {
    logResult('Middleware Bypass Testi', false, 'Test sırasında hata oluştu', { error: error.message });
  }
}

// Test 5: API Loglama Kontrolü
async function testApiLogging() {
  // API log dosyalarını kontrol et
  const today = new Date().toISOString().split('T')[0];
  const logFileName = `api-${today}.log`;
  const logDir = process.env.API_LOG_DIR || 'logs';
  const logFilePath = path.join(process.cwd(), logDir, logFileName);
  
  try {
    if (fs.existsSync(logFilePath)) {
      const logContent = fs.readFileSync(logFilePath, 'utf8');
      const logEntries = logContent.split('\n').filter(line => line.trim());
      
      if (logEntries.length > 0) {
        // En az bir log kaydı var mı kontrol et
        logResult('API Loglama Testi', true, `API log dosyası mevcut ve ${logEntries.length} kayıt içeriyor`);
        
        // SECURITY tipi log kayıtları var mı?
        const securityLogs = logEntries.filter(line => line.includes('"type":"SECURITY"'));
        if (securityLogs.length > 0) {
          logResult('Güvenlik Loglama Testi', true, `${securityLogs.length} güvenlik log kaydı bulundu`);
        } else {
          logResult('Güvenlik Loglama Testi', false, 'Güvenlik log kaydı bulunamadı');
        }
      } else {
        logResult('API Loglama Testi', false, 'API log dosyası boş');
      }
    } else {
      logResult('API Loglama Testi', false, `Log dosyası bulunamadı: ${logFilePath}`);
    }
  } catch (error) {
    logResult('API Loglama Testi', false, 'Log dosyası kontrolü sırasında hata oluştu', { error: error.message });
  }
}

// Tüm testleri çalıştır
async function runAllTests() {
  console.log('API Güvenlik Testleri başlatılıyor...');
  
  await testUnauthorizedAccess();
  await testRoleBasedAccess();
  await testManagerCompanyRestriction();
  await testMiddlewareBypass();
  await testApiLogging();
  
  // Test sonuçlarını kaydet
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const resultsFile = path.join(process.cwd(), 'tests/api-security', `results-${timestamp}.json`);
  
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