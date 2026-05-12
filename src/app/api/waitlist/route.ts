import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendWaitlistWelcome } from '@/lib/email'

async function notifySlack(text: string) {
  const url = process.env.SLACK_WEBHOOK_WAITLIST
  if (!url) return
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
  } catch {
    // best-effort
  }
}

// In-memory rate limiter (per IP, sliding window).
// Vercel restarts the function frequently so this is more of a "spam dampener"
// than a hard guarantee. Good enough for a waitlist form.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX = 5                     // 5 requests / hour / IP
const ipBuckets = new Map<string, number[]>()

function rateLimit(ip: string): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now()
  const cutoff = now - RATE_LIMIT_WINDOW_MS
  const timestamps = (ipBuckets.get(ip) ?? []).filter((t) => t > cutoff)
  if (timestamps.length >= RATE_LIMIT_MAX) {
    const oldest = timestamps[0]
    return { ok: false, retryAfterSec: Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000) }
  }
  timestamps.push(now)
  ipBuckets.set(ip, timestamps)
  return { ok: true }
}

function getClientIp(req: NextRequest): string {
  // Vercel forwards via x-forwarded-for; first value is the real client
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const limit = rateLimit(ip)
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(limit.retryAfterSec ?? 3600) },
      }
    )
  }

  let email: string, company: string
  try {
    const body = await req.json()
    email = String(body.email ?? '').trim()
    company = String(body.company ?? '').trim()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid work email required.' }, { status: 400 })
  }

  const { error } = await supabase
    .from('waitlist')
    .insert({ email, company })

  if (error && error.code !== '23505') {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }

  if (!error) {
    await Promise.all([
      notifySlack(`New waitlist signup:\n• *Email:* ${email}\n• *Company:* ${company || '(not provided)'}`),
      sendWaitlistWelcome({ email, company }),
    ])
  }

  return NextResponse.json({ success: true })
}
