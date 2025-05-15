import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirect root path to dashboard
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Similar for /ana-sayfa or any other landing page path if needed
  if (request.nextUrl.pathname === '/ana-sayfa') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Only run middleware on home route
export const config = {
  matcher: ['/', '/ana-sayfa'],
}; 