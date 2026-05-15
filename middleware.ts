import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const host = request.headers.get('host') || ''
  const isLocalhost = host.startsWith('localhost') || host.startsWith('127.0.0.1')
  
  // Allow auth pages and API routes
  if (pathname.startsWith('/(auth)') || pathname === '/login' || pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // Allow Negan Face state APIs from localhost (for main session updates)
  if (isLocalhost && (pathname === '/api/session-status' || pathname === '/api/subagents')) {
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
