import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Ana middleware fonksiyonu - Geçici olarak basitleştirilmiş
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Sadece erişim kayıtları
  console.log('Erişim Kaydı:', {
    timestamp: new Date().toISOString(),
    path: pathname,
    method: request.method
  });

  // İsteğe devam et
  return NextResponse.next();
}

// İstisnalar
// API ve static dosyalar hariç tüm yollar için middleware'i çalıştır
export const config = {
  matcher: [
    // Tüm sayfalar için middleware'i çalıştır
    '/((?!_next/static|_next/image|favicon.ico).*)',
    
    // API rotaları için middleware'i çalıştır
    '/api/:path*',
  ],
}; 