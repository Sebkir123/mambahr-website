import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware runs on the Edge. Two jobs for /admin routes:
//   1. Add X-Robots-Tag: noindex so crawlers that ignore <meta> tags also stay out.
//   2. Redirect bare /admin to /admin/login so the URL never returns a blank page.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
