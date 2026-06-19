import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { verifyTurnstile, turnstileConfigured } from '@/lib/turnstile'
import { isAdminEmail } from '@/lib/admin-domain'

// Server-mediated magic-link request for the admin panel. The browser used to
// call supabase.auth.signInWithOtp directly; routing it through here lets us
// verify Turnstile + rate-limit BEFORE Supabase sends a single email — so nobody
// can bomb a founder's inbox with sign-in links. The link itself is still
// single-use and short-lived.
//
// IMPORTANT: we use the cookie-backed server client (createSupabaseServerClient),
// NOT a detached one. signInWithOtp uses PKCE and stashes the code_verifier in a
// cookie; the callback's exchangeCodeForSession reads it back. A detached client
// would drop the verifier and break the exchange.

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const RATE_LIMIT_MAX = 8 // sign-in links per IP per hour
const ipBuckets = new Map<string, number[]>()
function rateLimit(ip: string): boolean {
  const now = Date.now()
  const cutoff = now - RATE_LIMIT_WINDOW_MS
  const ts = (ipBuckets.get(ip) ?? []).filter((t) => t > cutoff)
  if (ts.length >= RATE_LIMIT_MAX) return false
  ts.push(now)
  ipBuckets.set(ip, ts)
  return true
}

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

export async function POST(req: NextRequest) {
  if (!(req.headers.get('content-type') ?? '').includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported content type.' }, { status: 415 })
  }

  const ip = getClientIp(req)
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Try again later.' },
      { status: 429, headers: { 'Retry-After': '3600' } },
    )
  }

  let email: string, turnstileToken: string, next: string
  try {
    const raw = await req.text()
    if (raw.length > 2048) return NextResponse.json({ error: 'Payload too large.' }, { status: 413 })
    const body = JSON.parse(raw)
    email = String(body.email ?? '').trim().toLowerCase()
    turnstileToken = String(body.turnstileToken ?? '').trim()
    next = String(body.next ?? '/admin')
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
  }

  // Verify the human FIRST — but only when Turnstile is actually configured.
  // We deliberately DON'T fail closed when it isn't set up: that would brick
  // admin login entirely. The per-IP rate limit above is the baseline anti-abuse
  // floor; adding the Turnstile keys upgrades it to real bot protection.
  if (turnstileConfigured() && !(await verifyTurnstile(turnstileToken, ip))) {
    return NextResponse.json({ error: 'Verification failed. Refresh and try again.' }, { status: 403 })
  }

  // Only send for admin-domain addresses. For anything else, return a generic
  // success WITHOUT sending — both to avoid being an open relay to arbitrary
  // inboxes and to not leak which domains are privileged. (The DB trigger blocks
  // account creation regardless; this is the friendly, safe front door.)
  if (!isAdminEmail(email)) {
    return NextResponse.json({ success: true })
  }

  const safeNext = next.startsWith('/admin') ? next : '/admin'
  const origin = req.nextUrl.origin
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${origin}/admin/auth/callback?next=${encodeURIComponent(safeNext)}` },
  })
  if (error) {
    return NextResponse.json({ error: 'Could not send the link. Try again.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
