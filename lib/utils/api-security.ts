import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from './auth';
import { validateMiddlewareSubrequest } from './middleware-helpers';
import { apiLogger, measurePerformance } from './api-logger';

/**
 * API güvenlik sarmalayıcısı - API rotaları için güvenli bir şekilde işlevleri sarmalayıcı
 * 
 * @param handler - API işleyici fonksiyonu
 * @param options - Güvenlik seçenekleri
 * @returns - NextResponse
 */
export async function secureApiRoute(
  req: NextRequest,
  handler: (req: NextRequest, authData?: any) => Promise<NextResponse>,
  options?: {
    allowedRoles?: string[];
    skipRoleCheck?: boolean;
    validateCSRF?: boolean;
    rateLimit?: boolean;
    logRequest?: boolean;
    logResponse?: boolean;
    operationName?: string;
  }
) {
  // Default options
  const opts = {
    skipRoleCheck: false,
    logRequest: true,
    logResponse: true,
    ...options
  };
  
  // API isteğini benzersiz bir ID ile logla
  let requestId = "";
  let startTime = performance.now();
  let userId = undefined;
  let userRole = undefined;
  let statusCode = 200;
  
  try {
    // İsteği logla (isteniyorsa)
    if (opts.logRequest) {
      requestId = apiLogger.logRequest(req);
    }
    
    // CVE-2025-29927 güvenlik açığına karşı kontrol
    const headers = new Headers(req.headers);
    if (!validateMiddlewareSubrequest(req)) {
      apiLogger.logSecurity(req, 'Middleware bypass girişimi tespit edildi', { url: req.url });
      
      statusCode = 403;
      return NextResponse.json(
        { success: false, message: 'Güvenlik ihlali tespit edildi' },
        { status: statusCode }
      );
    }

    // GEÇICI TEST KODU: Rol kontrolünü atla ve test kimliği kullan
    if (process.env.NODE_ENV !== 'production' && opts.skipRoleCheck) {
      // Test kullanıcı kimliğini oluştur
      const testAuthData = {
        success: true,
        message: 'Yetkilendirme başarılı (Test modu)',
        status: 200,
        session: {
          user: {
            id: 'test-user-id',
            name: 'Test User',
            email: 'test@example.com',
            role: 'user'
          }
        }
      };
      
      // İşleyiciyi çalıştır ve performansı ölç
      const operation = opts.operationName || `${req.method} ${req.nextUrl.pathname}`;
      const response = await measurePerformance(req, operation, async () => {
        return await handler(req, testAuthData);
      });
      
      // Yanıt durum kodunu al
      statusCode = response.status;
      
      // Yanıtı logla (isteniyorsa)
      if (opts.logResponse) {
        const responseTime = Math.round(performance.now() - startTime);
        apiLogger.logResponse(req, statusCode, responseTime, requestId, 'test-user-id', 'user');
      }
      
      return response;
    }

    // Yetkilendirme kontrolü yap
    const allowedRoles = opts.allowedRoles || [];
    const authCheck = await checkAuth(req, allowedRoles);

    // Kullanıcı bilgilerini loglamak için kaydet
    if (authCheck.success && authCheck.session?.user) {
      userId = authCheck.session.user.id;
      userRole = authCheck.session.user.role;
    }
    
    // Yetkilendirmeyi logla
    apiLogger.logAuth(req, authCheck.success, userId, userRole, {
      requiredRoles: allowedRoles,
      hasRole: authCheck.success
    });

    // Yetkilendirme başarısız olduysa hata döndür
    if (!authCheck.success) {
      statusCode = authCheck.status;
      return NextResponse.json(
        { success: false, message: authCheck.message },
        { status: statusCode }
      );
    }

    // İşleyiciyi çalıştır ve performansı ölç
    const operation = opts.operationName || `${req.method} ${req.nextUrl.pathname}`;
    const response = await measurePerformance(req, operation, async () => {
      return await handler(req, authCheck);
    });
    
    // Yanıt durum kodunu al
    statusCode = response.status;
    
    // Yanıtı logla (isteniyorsa)
    if (opts.logResponse) {
      const responseTime = Math.round(performance.now() - startTime);
      apiLogger.logResponse(req, statusCode, responseTime, requestId, userId, userRole);
    }
    
    return response;
  } catch (error) {
    // Hata durumunu logla
    apiLogger.logError(req, error, userId, userRole);
    
    statusCode = 500;
    const errorResponse = NextResponse.json(
      { 
        success: false, 
        message: 'İşlem sırasında bir hata oluştu',
        error: process.env.NODE_ENV === 'production' ? null : (error instanceof Error ? error.message : String(error))
      },
      { status: statusCode }
    );
    
    // Hata yanıtını logla (isteniyorsa)
    if (opts.logResponse) {
      const responseTime = Math.round(performance.now() - startTime);
      apiLogger.logResponse(req, statusCode, responseTime, requestId, userId, userRole);
    }
    
    return errorResponse;
  }
}

/**
 * API cevaplarını standart formatta döndürmek için yardımcı fonksiyon
 */
export function standardApiResponse(
  data: any, 
  options?: { 
    status?: number, 
    success?: boolean, 
    message?: string 
  }
) {
  const status = options?.status || 200;
  const success = options?.success !== undefined ? options.success : status < 400;
  
  return NextResponse.json({
    success,
    message: options?.message || (success ? 'İşlem başarılı' : 'İşlem başarısız'),
    data
  }, { status });
}

/**
 * API hata cevaplarını standart formatta döndürmek için yardımcı fonksiyon
 */
export function apiErrorResponse(
  error: any,
  options?: {
    status?: number,
    message?: string
  }
) {
  const status = options?.status || 500;
  const isProd = process.env.NODE_ENV === 'production';
  
  // Hata nesnesinden mesaj çıkarma
  let errorMessage = 'Bilinmeyen hata';
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }
  
  return NextResponse.json({
    success: false,
    message: options?.message || 'İşlem sırasında bir hata oluştu',
    error: isProd ? null : errorMessage
  }, { status });
} 