import { NextRequest, NextResponse } from "next/server";
import { initAdmin } from "@/lib/init-admin";
import { secureApiRoute, standardApiResponse } from '@/lib/utils/api-security';

export async function GET(req: NextRequest) {
  return secureApiRoute(req, async (req: NextRequest) => {
    // Bu API'ye sadece belirli ortamlarda izin ver
    const allowedEnvs = ['development', 'test', 'staging'];
    const currentEnv = process.env.NODE_ENV || 'development';
    
    if (!allowedEnvs.includes(currentEnv)) {
      return standardApiResponse(null, {
        success: false,
        status: 403,
        message: "Bu API rotası sadece geliştirme ortamında kullanılabilir"
      });
    }
    
    // Sadece yerel bağlantılara izin ver
    const clientIp = req.headers.get('x-forwarded-for') || 'unknown';
    const isLocalConnection = ['127.0.0.1', 'localhost', '::1'].some(ip => clientIp.includes(ip));
    
    if (!isLocalConnection) {
      return standardApiResponse(null, {
        success: false,
        status: 403,
        message: "Bu API rotasına sadece yerel bağlantılar erişebilir"
      });
    }
    
    // Özel bir INIT_KEY gerektirebilirsiniz
    const initKey = req.headers.get('x-init-key');
    const validInitKey = process.env.INIT_KEY || 'development-init-key';
    
    if (initKey !== validInitKey) {
      return standardApiResponse(null, {
        success: false,
        status: 401,
        message: "Geçersiz başlatma anahtarı"
      });
    }
    
    // Admin kullanıcısını kontrol et ve gerekirse oluştur
    await initAdmin();
    
    return standardApiResponse({
      initialized: true,
      timestamp: new Date().toISOString()
    }, {
      message: "Sistem kontrolü tamamlandı"
    });
  }, { skipRoleCheck: true }); // Kimlik doğrulama yerine diğer güvenlik kontrolleri ekledik
} 