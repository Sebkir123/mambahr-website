import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { isAdminEmail } from '@/lib/admin-domain'

// Next.js 16 renamed `middleware` → `proxy`. This single edge entrypoint handles
// two unrelated gates, dispatched by path:
//   1. /admin/*            — Supabase auth session refresh + sign-in redirect
//   2. internal deck URLs  — HTTP Basic password protection
// Each gate only runs on its own matched prefixes (see `config.matcher`).

const DECK_PREFIXES = ['/d/', '/investors', '/og-preview']

// --- Internal deck password gate -------------------------------------------
function deckGate(req: NextRequest): NextResponse {
  const password = process.env.DECK_PASSWORD
  if (!password) return NextResponse.next() // no password set → skip (dev mode)

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

// --- Admin auth gate --------------------------------------------------------
// Refreshes the Supabase session on every /admin request and bounces anyone who
// isn't a signed-in @mambahr.com admin to the login screen. The domain check
// (not just "is there a user") is the real gate: an authenticated non-admin
// session must not pass. is_admin() RLS + per-page requireAdmin() enforce it
// again in depth — this is the coarse edge gate so no admin page renders for a
// stranger, even one a future page forgets to guard.
async function adminGate(req: NextRequest): Promise<NextResponse> {
  let response = NextResponse.next({ request: req })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
          response = NextResponse.next({ request: req })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // getUser() validates the JWT with the auth server — a forged/expired cookie
  // can't pass — and the domain check makes "authenticated" insufficient on its
  // own; only @mambahr.com is an admin.
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const isAdmin = isAdminEmail(user?.email)

  const path = req.nextUrl.pathname
  const isLogin = path === '/admin/login' || path.startsWith('/admin/auth')

  if (!isAdmin && !isLogin) {
    const url = req.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('next', path)
    return NextResponse.redirect(url)
  }

  // Already a signed-in admin hitting the login page → send to dashboard. (Only
  // for admins; a non-admin session on /admin/login stays put, no bounce loop.)
  if (isAdmin && path === '/admin/login') {
    const url = req.nextUrl.clone()
    url.pathname = '/admin'
    url.search = ''
    return NextResponse.redirect(url)
  }

  response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return response
}

export async function proxy(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/admin')) {
    return adminGate(req)
  }
  if (DECK_PREFIXES.some((p) => pathname.startsWith(p))) {
    return deckGate(req)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/d/:path*', '/investors/:path*', '/og-preview/:path*'],
}
