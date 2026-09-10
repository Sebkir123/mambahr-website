import 'server-only'
import type { NextRequest } from 'next/server'
import type { SupabaseClient } from '@supabase/supabase-js'

// Shared request guards for the lead-capture routes (/api/demo, /api/waitlist,
// /api/field-guide, /api/resources/lead). One copy, so a fix lands everywhere.

export function getClientIp(req: NextRequest): string {
  // Vercel forwards via x-forwarded-for; the first value is the real client.
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

export type MemoryLimitResult = { ok: boolean; retryAfterSec?: number }

// In-memory sliding window per IP. On serverless this map is per instance and
// resets on every cold start, so it is a spam dampener, not a guarantee. The
// durable limiter below and Turnstile are the real defences.
export function createMemoryLimiter(max: number, windowMs: number) {
  const buckets = new Map<string, number[]>()
  return function rateLimit(ip: string): MemoryLimitResult {
    const now = Date.now()
    const cutoff = now - windowMs
    const ts = (buckets.get(ip) ?? []).filter((t) => t > cutoff)
    if (ts.length >= max) {
      return { ok: false, retryAfterSec: Math.ceil((ts[0] + windowMs - now) / 1000) }
    }
    ts.push(now)
    buckets.set(ip, ts)
    return { ok: true }
  }
}

// Durable per-IP limiter backed by the check_signup_rate_limit RPC (service
// role only). Fail-open decision: an RPC error (network, migration drift, a
// paused project) returns true so a Supabase blip does not brick every form on
// the site, but it is never silent any more: the failure is logged with the
// route so it shows up in Vercel logs. The misconfiguration case (no
// SUPABASE_SERVICE_ROLE_KEY at all) is handled by the caller: the demo and
// resource routes already refuse with 503 when the service client is missing,
// which is the fail-closed answer for the forms that write with the service
// role anyway; the waitlist and field-guide routes keep their documented
// fallback to the in-memory limiter alone.
export async function durableRateLimit(
  client: SupabaseClient,
  opts: { route: string; ip: string; max: number; windowSecs?: number },
): Promise<boolean> {
  const { data, error } = await client.rpc('check_signup_rate_limit', {
    p_ip: opts.ip,
    p_max: opts.max,
    p_window_secs: opts.windowSecs ?? 3600,
  })
  if (error) {
    console.warn(
      JSON.stringify({
        event: 'rate_limit_rpc_failed',
        route: opts.route,
        error: error.message,
        code: error.code ?? null,
        outcome: 'fail_open',
      }),
    )
    return true
  }
  return data === true
}
