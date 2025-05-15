import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

/**
 * İsteğin geldiği IP adresini alır
 */
export function getClientIP(request: NextRequest): string {
  return request.ip || 
         request.headers.get('x-forwarded-for') || 
         request.headers.get('x-real-ip') || 
         'unknown';
}

/**
 * Kullanıcının tarayıcı bilgilerini alır
 */
export function getUserAgent(request: NextRequest): string {
  return request.headers.get('user-agent') || 'unknown';
}

/**
 * Middleware bypass koruması için header doğrulama
 * CVE-2025-29927 güvenlik açığına karşı koruma
 */
export function validateMiddlewareSubrequest(request: NextRequest): boolean {
  const middlewareSubrequest = request.headers.get('x-middleware-subrequest');
  
  if (!middlewareSubrequest) {
    return true;
  }
  
  const parts = middlewareSubrequest.split(':');
  const uniqueParts = new Set(parts);
  
  if (parts.length > uniqueParts.size) {
    return false;
  }
  
  if (middlewareSubrequest.includes('middleware:middleware')) {
    return false;
  }
  
  return true;
}

/**
 * JWT token'ından kullanıcıyı alır
 */
export async function getUserFromToken(request: NextRequest) {
  try {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    return token;
  } catch (error) {
    console.error('Token alınırken hata:', error);
    return null;
  }
}

/**
 * İsteğin belirli bir role sahip kullanıcılarla sınırlı olup olmadığını kontrol eder
 */
export async function checkRoleAccess(request: NextRequest, allowedRoles: string[]): Promise<boolean> {
  const token = await getUserFromToken(request);
  
  if (!token) {
    return false;
  }
  
  const userRole = token.role as string;
  
  return allowedRoles.includes(userRole);
}

/**
 * Güvenlik hatası kaydetme
 */
export function logSecurityIssue(request: NextRequest, issue: string, details?: any) {
  const logData = {
    timestamp: new Date().toISOString(),
    issue,
    ip: getClientIP(request),
    userAgent: getUserAgent(request),
    url: request.url,
    method: request.method,
    ...details
  };
  
  console.error('Güvenlik Uyarısı:', logData);
  
  // Burada daha gelişmiş bir loglama servisi kullanılabilir
  // Örneğin Sentry, LogRocket, ELK Stack, vb.
}

/**
 * Güvenlik için standart HTTP başlıkları ekler
 */
export function addSecurityHeaders(response: NextResponse): NextResponse {
  // Temel güvenlik başlıkları
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // HTTP Strict Transport Security
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  
  // Content Security Policy (CSP) - geçici olarak kaldırıldı
  /* response.headers.set(
    'Content-Security-Policy',
    "default-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.googletagmanager.com; " +
    "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; " +
    "img-src 'self' data: https: blob:; " +
    "font-src 'self' data: https://cdn.jsdelivr.net; " +
    "connect-src 'self' https://www.google-analytics.com *; " +
    "frame-ancestors 'self'; " +
    "form-action 'self';"
  ); */
  
  // Permissions-Policy
  response.headers.set(
    'Permissions-Policy', 
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  return response;
}

// Basit global hız sınırlayıcı için in-memory store
// Not: Üretim ortamında bunu Redis veya başka bir dağıtık önbellek ile değiştirin
const ipRequestCounts = new Map<string, {count: number, resetTime: number}>();
const MAX_REQUESTS_PER_MINUTE = 100; // Bir IP'den dakikada maksimum istek sayısı

/**
 * Basit bir hız sınırlayıcı (rate limiter)
 * Not: Üretim ortamı için daha gelişmiş ve dağıtık bir çözüm tercih edilmelidir
 */
export function checkRateLimit(request: NextRequest): {limited: boolean, remainingRequests: number} {
  const ip = getClientIP(request);
  const now = Date.now();
  const resetTime = now + 60 * 1000; // 1 dakika
  
  // Mevcut istek sayacını al veya yeni oluştur
  const currentState = ipRequestCounts.get(ip) || { count: 0, resetTime };
  
  // Sıfırlama zamanı geçtiyse, sayacı sıfırla
  if (now > currentState.resetTime) {
    currentState.count = 0;
    currentState.resetTime = resetTime;
  }
  
  // İstek sayacını artır
  currentState.count += 1;
  
  // Store'a kaydet
  ipRequestCounts.set(ip, currentState);
  
  // Limit aşıldı mı kontrol et
  const remainingRequests = Math.max(0, MAX_REQUESTS_PER_MINUTE - currentState.count);
  const limited = currentState.count > MAX_REQUESTS_PER_MINUTE;
  
  return { limited, remainingRequests };
}

/**
 * Route-bazlı yetkilendirme için rota kontrolü
 */
export function getRequiredRolesForRoute(path: string): string[] {
  // API yollarına göre gerekli rolleri tanımla
  const routeRoles: Record<string, string[]> = {
    // Admin paneli rotaları
    '/dashboard/admin': ['admin'],
    '/dashboard/management': ['admin', 'manager'],
    
    // API rotaları - Admin işlemleri
    '/api/admin': ['admin'],
    '/api/admin/users': ['admin'],
    '/api/admin/settings': ['admin'],
    '/api/admin/reports': ['admin'],
    
    // API rotaları - Kullanıcı yönetimi
    '/api/users': ['admin', 'manager'],
    '/api/users/create': ['admin', 'manager'],
    '/api/users/update': ['admin', 'manager'],
    '/api/users/delete': ['admin'],
    
    // API rotaları - Şirket yönetimi
    '/api/companies': ['admin', 'manager'],
    '/api/companies/create': ['admin'],
    '/api/companies/update': ['admin'],
    '/api/companies/delete': ['admin'],
    
    // API rotaları - Kurs yönetimi
    '/api/courses/create': ['admin', 'manager', 'trainer'],
    '/api/courses/update': ['admin', 'manager', 'trainer'],
    '/api/courses/delete': ['admin', 'manager'],
    '/api/courses/publish': ['admin', 'manager'],
    
    // API rotaları - Raporlama
    '/api/analytics': ['admin', 'manager', 'trainer'],
    '/api/reports': ['admin', 'manager'],
    '/api/statistics': ['admin', 'manager'],
    
    // API rotaları - Bildirimler
    '/api/notifications/admin': ['admin'],
    '/api/notifications/send': ['admin', 'manager'],
    
    // Korumalı API rotaları
    '/api/protected': ['admin', 'manager', 'trainer', 'user'],
    
    // Kullanıcı profili ve ilerleme
    '/api/progress': ['admin', 'manager', 'trainer', 'user'],
    '/api/profile': ['admin', 'manager', 'trainer', 'user'],
    
    // Eğitim yolları yönetimi
    '/api/learning-paths/create': ['admin', 'manager', 'trainer'],
    '/api/learning-paths/update': ['admin', 'manager', 'trainer'],
    '/api/learning-paths/delete': ['admin', 'manager'],
    
    // Dashboard erişimi
    '/dashboard': ['admin', 'manager', 'trainer', 'user']
  };
  
  // Alt yollar için üst yolları kontrol et
  // Örn: /api/admin/users/create için /api/admin/users kurallarını uygula
  for (const route in routeRoles) {
    if (path.startsWith(route)) {
      return routeRoles[route];
    }
  }
  
  // Özel durumlar - ID parametreleri içeren yollar
  // Örn: /api/users/123 için /api/users kurallarını uygula
  const idPatterns = [
    { pattern: /^\/api\/users\/[\w-]+$/, roles: ['admin', 'manager'] },
    { pattern: /^\/api\/courses\/[\w-]+$/, roles: ['admin', 'manager', 'trainer'] },
    { pattern: /^\/api\/companies\/[\w-]+$/, roles: ['admin'] }
  ];
  
  for (const { pattern, roles } of idPatterns) {
    if (pattern.test(path)) {
      return roles;
    }
  }
  
  // Varsayılan olarak herhangi bir rol gerekmez
  return [];
} 