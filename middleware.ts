import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === '/login' || path === '/register' || path === '/';

  // Get the token from the cookies
  const token = request.cookies.get('next-auth.session-token')?.value || '';

  // Redirect authenticated users away from login/register pages
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/citizen/dashboard', request.url));
  }

  // Redirect unauthenticated users to login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/citizen/:path*',
    '/employee/:path*',
    '/control/:path*',
  ],
};