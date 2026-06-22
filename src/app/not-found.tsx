import type { Metadata } from 'next'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Page not found | MambaHR',
  description: "That page doesn't exist. Try the homepage or the product overview.",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64 }}>
        <section style={{ background: 'var(--bg-warm)', minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', padding: '120px 24px' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--gold-dark)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 28,
              }}
            >
              404 · Not found
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(48px, 7vw, 96px)',
                fontWeight: 400,
                letterSpacing: '-0.035em',
                color: 'var(--text)',
                marginBottom: 24,
                lineHeight: 0.95,
              }}
            >
              That page<br />doesn&rsquo;t exist.
            </h1>
            <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 40, maxWidth: 540 }}>
              The link might be stale, or the page was moved. Try the homepage, or pick up where most people start.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/" className="btn-gold">Back to homepage →</Link>
              <Link href="/mamba" className="btn-secondary">See how Mamba works</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
