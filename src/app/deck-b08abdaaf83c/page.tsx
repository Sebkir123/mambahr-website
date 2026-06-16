import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Deck from './deck-client'
import { DECK_SLUG, resolveDeckLink } from '@/lib/deck-links'
import { getAdminUser } from '@/lib/auth'

// Investor deck — unguessable slug, never indexed, and gated by a per-recipient
// token (?k=). A valid token both grants access AND identifies the viewer for
// analytics. No token + not an admin → 404 (real gate, not just obscurity).
export const metadata: Metadata = {
  title: 'MambaHR — Seed 2026',
  description:
    'The AI HR department. We don’t sell software seats. We sell digital headcount. Seed round — $3M.',
  robots: { index: false, follow: false },
  alternates: { canonical: `https://mambahr.com/${DECK_SLUG}` },
}

export default async function DeckPage({
  searchParams,
}: {
  searchParams: Promise<{ k?: string }>
}) {
  const { k } = await searchParams
  const link = await resolveDeckLink(k)
  if (!link) {
    // No valid recipient token — allow a signed-in admin to preview, else 404.
    const admin = await getAdminUser()
    if (!admin) notFound()
  }
  return <Deck token={k ?? null} slug={DECK_SLUG} />
}
