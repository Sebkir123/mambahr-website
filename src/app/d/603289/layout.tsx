import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MambaHR — Seed 2026',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: undefined,
  twitter: undefined,
}

export default function DeckLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="deck-dark">
      <style>{`
        .deck-dark {
          --bg: #09090B;
          --bg-surface: #111113;
          --bg-warm: #0D0D0F;
          --bg-cream: #141416;
          --bg-elevated: #1A1A1D;
          --text: #FAFAF9;
          --text-muted: #A1A1AA;
          --text-faint: #52525B;
          --gold: #C9A96E;
          --gold-dark: #D4B87A;
          --gold-light: #E0C992;
          --gold-tint: rgba(201,169,110,0.08);
          --border: rgba(255,255,255,0.06);
          --border-mid: rgba(255,255,255,0.1);
          --border-faint: rgba(255,255,255,0.04);
          color-scheme: dark;
        }
        .deck-dark * { color-scheme: dark; }
      `}</style>
      {children}
    </div>
  )
}
