import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/utils/auth';

// Middleware bypass koruması
function validateMiddlewareSubrequest(request: NextRequest): boolean {
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

export async function GET(request: NextRequest) {
  try {
    // CVE-2025-29927 güvenlik açığına karşı kontrol
    if (!validateMiddlewareSubrequest(request)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Güvenlik ihlali tespit edildi' 
        },
        { status: 403 }
      );
    }

    // Yetkilendirme kontrolü - sadece admin ve manager erişebilir
    const authCheck = await checkAuth(request, ['admin', 'manager']);
    
    if (!authCheck.success) {
      return NextResponse.json(
        { success: false, message: authCheck.message },
        { status: authCheck.status }
      );
    }
    
    // Gelen istek yetkilendirildi, normal işleme devam et
    const session = authCheck.session;
    
    return NextResponse.json({
      success: true,
      message: 'Korumalı API rotasına erişim sağlandı',
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Korumalı API Hatası:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Sunucu hatası' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // CVE-2025-29927 güvenlik açığına karşı kontrol
    if (!validateMiddlewareSubrequest(request)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Güvenlik ihlali tespit edildi' 
        },
        { status: 403 }
      );
    }

    // Yetkilendirme kontrolü - tüm kimliği doğrulanmış kullanıcılar erişebilir
    const authCheck = await checkAuth(request);
    
    if (!authCheck.success) {
      return NextResponse.json(
        { success: false, message: authCheck.message },
        { status: authCheck.status }
      );
    }
    
    // İstek gövdesini al
    const body = await request.json();
    
    return NextResponse.json({
      success: true,
      message: 'Veri başarıyla işlendi',
      receivedData: body,
      user: {
        id: authCheck.session.user.id,
        role: authCheck.session.user.role
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Korumalı API Hatası:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Sunucu hatası' 
      },
      { status: 500 }
    );
  }
} 