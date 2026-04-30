import { notFound } from 'next/navigation'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import { comingSoonContent } from '@/content/nav'
import { Waitlist } from '@/components/waitlist'

type Params = { slug: string }

export function generateMetadata({ params }: { params: Params }) {
  const content = comingSoonContent[params.slug]
  if (!content) return {}
  return {
    title: `${content.title} — MambaHR`,
    robots: { index: false, follow: false },
  }
}

export default function ComingSoonPage({ params }: { params: Params }) {
  const content = comingSoonContent[params.slug]
  if (!content) notFound()

  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <section
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-warm)',
            padding: '120px 24px',
          }}
        >
          <div style={{ maxWidth: 600, textAlign: 'center' }}>
            <p className="eyebrow" style={{ marginBottom: 20 }}>COMING SOON</p>
            <h1
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(36px, 5vw, 52px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 24,
                lineHeight: 1.1,
              }}
            >
              {content.title}
            </h1>
            <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 48 }}>
              {content.body}
            </p>

            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: 32,
                textAlign: 'left',
                marginBottom: 40,
              }}
            >
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>
                Want early access?
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
                We&apos;ll notify you when {content.title} ships.
              </p>
              <Waitlist compact />
            </div>

            <Link
              href="/"
              style={{ fontSize: 14, color: 'var(--gold-dark)', textDecoration: 'underline', textUnderlineOffset: 3 }}
            >
              ← Back to MambaHR
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
