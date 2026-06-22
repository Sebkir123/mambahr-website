import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'

export const dynamic = 'force-dynamic'

// Public blog view counter. Calls the SECURITY DEFINER increment_post_view RPC
// server-side so the marketing blog never ships supabase-js to the browser
// (~240 KB). Fire-and-forget; failures are silent (a missed +1 is harmless).
export async function POST(req: Request) {
  let slug = ''
  try {
    const body = (await req.json()) as { slug?: string }
    slug = typeof body.slug === 'string' ? body.slug.slice(0, 200) : ''
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
  if (!slug) return NextResponse.json({ ok: false }, { status: 400 })

  try {
    const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
    await supabase.rpc('increment_post_view', { p_slug: slug })
  } catch {
    /* ignore, a dropped view increment isn't worth surfacing */
  }
  return NextResponse.json({ ok: true })
}
