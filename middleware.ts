import { NextResponse, type NextRequest } from 'next/server';
import intlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { betterFetch } from '@better-fetch/fetch';
import type { auth } from '@/auth';

type Session = typeof auth.$Infer.Session;

const UNPROTECTED_ROUTES = ['/login', '/register'];
const PROTECTED_ROUTES = ['/d'];

const i18nMiddleware = intlMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const { data: session } = await betterFetch<Session>('/api/auth/get-session', {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get('cookie') || '',
    },
  });

  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!session) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (session && UNPROTECTED_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL('/d', request.url));
  }

  return i18nMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(de|en)/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
