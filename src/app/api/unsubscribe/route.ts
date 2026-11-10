import { NextRequest, NextResponse } from 'next/server'
import { addressFromLink, markUnsubscribed } from '@/lib/unsubscribe'

// Unsubscribe without signing in. The signed `e` and `t` query parameters are
// the credential (see lib/unsubscribe-token.ts).
//
// POST is the only call that changes anything. It serves two callers:
//   - mail apps using the RFC 8058 one-click header (body
//     "List-Unsubscribe=One-Click"): answered with a plain 200.
//   - the button on /unsubscribe (form field from=page): sent back to the page
//     with done=1.
// GET only forwards to /unsubscribe, because link scanners open every link in
// an email and must not unsubscribe anyone by doing so.

export const dynamic = 'force-dynamic'

function pageUrl(req: NextRequest, extra: Record<string, string>): URL {
  const url = new URL('/unsubscribe', req.nextUrl.origin)
  for (const [k, v] of Object.entries(extra)) url.searchParams.set(k, v)
  return url
}

export async function GET(req: NextRequest) {
  const e = req.nextUrl.searchParams.get('e') ?? ''
  const t = req.nextUrl.searchParams.get('t') ?? ''
  return NextResponse.redirect(pageUrl(req, { e, t }), 303)
}

export async function POST(req: NextRequest) {
  let form: URLSearchParams
  try {
    const raw = await req.text()
    form = new URLSearchParams(raw.slice(0, 2048))
  } catch {
    form = new URLSearchParams()
  }
  const fromPage = form.get('from') === 'page'
  const e = req.nextUrl.searchParams.get('e') ?? form.get('e')
  const t = req.nextUrl.searchParams.get('t') ?? form.get('t')

  const email = await addressFromLink(e, t)
  if (!email) {
    return fromPage
      ? NextResponse.redirect(pageUrl(req, { error: 'link' }), 303)
      : new NextResponse('This unsubscribe link is not valid.', { status: 400 })
  }

  const ok = await markUnsubscribed(email, fromPage ? 'link' : 'one-click')
  if (!ok) {
    return fromPage
      ? NextResponse.redirect(pageUrl(req, { e: e ?? '', t: t ?? '', error: 'save' }), 303)
      : new NextResponse('Something went wrong. Try again later.', { status: 500 })
  }

  return fromPage
    ? NextResponse.redirect(pageUrl(req, { done: '1' }), 303)
    : new NextResponse('You are unsubscribed.', { status: 200 })
}
