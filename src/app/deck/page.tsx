import type { Metadata } from 'next'
import Deck from './deck-client'

// Investor deck — reachable by link, kept out of search indexes.
export const metadata: Metadata = {
  title: 'MambaHR — Seed 2026',
  description: 'The AI HR department. We don’t sell software seats. We sell digital headcount. Seed round — $3M.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://mambahr.com/deck' },
}

export default function DeckPage() {
  return <Deck />
}
