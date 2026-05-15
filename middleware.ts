import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Allow auth pages and API routes
  if (pathname.startsWith('/(auth)') || pathname === '/login' || pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // Allow Negan Face state APIs (auth via x-negan-key header)
  if (pathname === '/api/session-status' || pathname === '/api/subagents') {
    return NextResponse.next()
  }

  // Check for auth cookie on protected routes
  const authToken = request.cookies.get('auth_token')

  if (!authToken) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/projects/:path*',
    '/api/session-status',
    '/api/subagents',
  ],
}
