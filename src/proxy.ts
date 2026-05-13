import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_PREFIXES = ['/d/', '/investors', '/og-preview']

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))
  if (!isProtected) return NextResponse.next()

  const password = process.env.DECK_PASSWORD
  if (!password) return NextResponse.next()  // no password set → skip (dev mode)

  const authHeader = req.headers.get('authorization')
  const expected = 'Basic ' + btoa(unescape(encodeURIComponent(`mambahr:${password}`)))

  if (authHeader === expected) return NextResponse.next()

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="MambaHR Internal", charset="UTF-8"',
      'Cache-Control': 'no-store',
    },
  })
}

export const config = {
  matcher: ['/d/:path*', '/investors/:path*', '/og-preview/:path*'],
}
