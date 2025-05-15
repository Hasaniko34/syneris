import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { apiLogger } from '@/lib/utils/api-logger';
import { standardApiResponse, apiErrorResponse } from '@/lib/utils/api-security';

// Session türü için genişletilmiş interface
interface ExtendedUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

/**
 * Token yenileme endpoint'i
 * Mevcut oturumu kontrol eder ve günceller
 */
export async function GET(req: NextRequest) {
  const startTime = performance.now();
  const requestId = apiLogger.logRequest(req);
  
  try {
    // Mevcut oturumu al
    const session = await getServerSession(authOptions);
    
    // Oturum yoksa 401 döndür
    if (!session || !session.user) {
      apiLogger.logAuth(req, false, undefined, undefined, {
        action: 'token-refresh',
        status: 'failed',
        reason: 'no-session'
      });
      
      return apiErrorResponse(
        new Error('Geçerli bir oturum bulunamadı'), 
        { status: 401, message: 'Oturum bulunamadı' }
      );
    }
    
    // Kullanıcıyı genişletilmiş tipe dönüştür
    const user = session.user as ExtendedUser;
    
    // Session update trigger'lamak için özel bir header ekleyin
    // Bu, NextAuth'un jwt callback'inde "trigger === 'update'" durumunu tetikler
    // ve token yenileme işlemi başlar
    const response = standardApiResponse(
      {
        refreshed: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        expires: session.expires
      },
      { 
        status: 200,
        message: 'Token başarıyla yenilendi' 
      }
    );
    
    // Yanıtı logla
    const responseTime = Math.round(performance.now() - startTime);
    if (user.id && user.role) {
      apiLogger.logResponse(req, 200, responseTime, requestId, user.id, user.role);
    } else {
      apiLogger.logResponse(req, 200, responseTime, requestId);
    }
    
    return response;
  } catch (error) {
    // Hatayı logla
    apiLogger.logError(req, error);
    
    // Hata yanıtı
    return apiErrorResponse(
      error,
      { status: 500, message: 'Token yenileme sırasında bir hata oluştu' }
    );
  }
} 