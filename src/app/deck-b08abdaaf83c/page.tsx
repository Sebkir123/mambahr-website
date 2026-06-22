import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import Deck from './deck-client'
import { DECK_SLUG, resolveDeckLink } from '@/lib/deck-links'
import { getAdminUser } from '@/lib/auth'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { clientIp, geoFromHeaders, hashIp, parseUA } from '@/lib/deck-tracking'

// Investor deck, unguessable slug, never indexed, and gated by a per-recipient
// token (?k=). A valid token both grants access AND identifies the viewer for
// analytics. No token + not an admin → 404 (real gate, not just obscurity).
export const metadata: Metadata = {
  title: 'MambaHR, Seed 2026',
  description:
    'The AI HR department. We don’t sell software seats. We sell digital headcount. Seed round, $3M.',
  robots: { index: false, follow: false },
  alternates: { canonical: `https://mambahr.com/${DECK_SLUG}` },
}

// Server-side, JS-independent open log. Fires on every render of the deck for a
// real recipient token, BEFORE any client JS, so the open is captured even
// when the viewer blocks the /track beacon (ad blocker, JS off, corp proxy).
// Awaited so the row is committed before render; best-effort, never throws.
// Admin previews (no valid token) are not logged.
async function logOpen(token: string, h: Awaited<ReturnType<typeof headers>>) {
  try {
    const ua = h.get('user-agent') || ''
    const { device, browser, browserVersion, os, osVersion } = parseUA(ua)
    const geo = geoFromHeaders(h)
    const ip = clientIp(h)
    const supabase = await createSupabaseServerClient()
    await supabase.rpc('log_deck_pageview', {
      p_token: token,
      p_ip: ip || null,
      p_payload: {
        slug: DECK_SLUG,
        ...geo,
        ipHash: ip ? hashIp(ip) : null,
        ua: ua.slice(0, 400),
        device,
        browser,
        browserVersion,
        os,
        osVersion,
        referrer: h.get('referer')?.slice(0, 500) ?? null,
      },
    })
  } catch {
    /* analytics must never break the deck */
  }
}

export default async function DeckPage({
  searchParams,
}: {
  searchParams: Promise<{ k?: string }>
}) {
  const { k } = await searchParams
  const link = await resolveDeckLink(k)
  const admin = await getAdminUser()

  // No valid recipient token AND not a signed-in admin → 404 (real gate).
  if (!link && !admin) notFound()

  // A signed-in admin is always previewing, even when opening a recipient's
  // exact link to test it. Previews never touch analytics: no server-side open
  // log here, and the client telemetry is suppressed via the `preview` prop.
  // Only a genuine recipient open (valid token, not an admin) is recorded.
  if (link && !admin) {
    await logOpen(k as string, await headers())
  }

  return <Deck token={k ?? null} slug={DECK_SLUG} preview={!!admin} />
}
