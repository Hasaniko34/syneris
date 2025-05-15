import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// Bu nesne Edge Runtime içinde değil, sadece API rotalarında kullanılmalı
interface AuthCheckResult {
  success: boolean;
  message: string;
  session?: any;
  status: number;
}

/**
 * API rotaları için kimlik doğrulama kontrolü
 * Sadece API rotalarında kullanmalısınız, middleware'de KULLANMAYIN!
 * @param request NextRequest nesnesi
 * @param allowedRoles İzin verilen roller
 */
export async function checkAuth(
  request: Request, 
  allowedRoles: string[] = []
): Promise<AuthCheckResult> {
  try {
    // API rotaları için getServerSession kullanın (middleware'de kullanmayın!)
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return {
        success: false,
        message: 'Yetkisiz erişim',
        status: 401
      };
    }

    // Rol kontrolü
    if (allowedRoles.length > 0 && 
        !allowedRoles.includes(session.user.role as string)) {
      return {
        success: false,
        message: 'Bu işlem için yetkiniz bulunmamaktadır',
        status: 403
      };
    }

    return {
      success: true,
      message: 'Erişim sağlandı',
      session,
      status: 200
    };
    
  } catch (error) {
    console.error('Kimlik doğrulama hatası:', error);
    return {
      success: false,
      message: 'Kimlik doğrulama işlemi sırasında bir hata oluştu',
      status: 500
    };
  }
}

/**
 * İsteğin geldiği IP adresini alır
 */
export function getClientIP(request: NextRequest | Request): string {
  let ip: string | null = null;
  
  if (request instanceof NextRequest) {
    // Next.js middleware için
    ip = request.ip || 
         request.headers.get('x-forwarded-for') || 
         request.headers.get('x-real-ip');
  } else {
    // API rotaları için
    const headers = new Headers(request.headers);
    ip = headers.get('x-forwarded-for') || 
         headers.get('x-real-ip');
  }
  
  return ip || 'unknown';
}

/**
 * Kullanıcının tarayıcı bilgilerini alır
 */
export function getUserAgent(request: NextRequest | Request): string {
  if (request instanceof NextRequest) {
    return request.headers.get('user-agent') || 'unknown';
  } else {
    const headers = new Headers(request.headers);
    return headers.get('user-agent') || 'unknown';
  }
}

/**
 * Middleware bypass koruması için header doğrulama
 * CVE-2025-29927 güvenlik açığına karşı koruma
 */
export function validateMiddlewareHeaders(headers: Headers): boolean {
  const middlewareSubrequest = headers.get('x-middleware-subrequest');
  
  // Bu header yoksa sorun yok
  if (!middlewareSubrequest) {
    return true;
  }
  
  // Header'ın güvenli olup olmadığını kontrol et
  // Tekrarlanan veya manipüle edilmiş değerler varsa reddet
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

/**
 * Şirket API'leri için yetkilendirme kontrolü yapar
 * @param request NextRequest nesnesi
 * @param companyId Şirket ID'si
 * @param allowedRoles İzin verilen roller
 */
export async function checkCompanyAuth(
  request: Request, 
  companyId: string,
  allowedRoles: string[] = ['admin', 'company_admin']
): Promise<AuthCheckResult> {
  try {
    // Önce normal kimlik doğrulama yap
    const authResult = await checkAuth(request, allowedRoles);
    
    if (!authResult.success) {
      return authResult;
    }
    
    const session = authResult.session;
    
    // Süper yönetici her şeye erişebilir
    if (session.user.role === 'admin') {
      return authResult;
    }
    
    // Şirket yöneticisi, kendi şirketine erişebilir
    if (session.user.role === 'company_admin' && session.user.companyId === companyId) {
      return authResult;
    }
    
    // Yetkisiz erişim
    return {
      success: false,
      message: 'Bu şirket için yetkiniz bulunmamaktadır',
      status: 403
    };
    
  } catch (error) {
    console.error('Şirket yetkilendirme hatası:', error);
    return {
      success: false,
      message: 'Şirket yetkilendirme işlemi sırasında bir hata oluştu',
      status: 500
    };
  }
} 