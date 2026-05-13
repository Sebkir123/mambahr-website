import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import { Waitlist } from '@/components/waitlist'

export default function DemoPage() {
  return (
    <>
      <MegaNav />
      <main>

        {/* ── Hero ── */}
        <section style={{
          background: 'var(--bg-warm)',
          paddingTop: 140,
          paddingBottom: 120,
        }}>
          <div style={{
            maxWidth: 680,
            margin: '0 auto',
            padding: '0 24px',
            textAlign: 'center',
          }}>
            <p className="eyebrow" style={{ marginBottom: 24 }}>REQUEST ACCESS</p>

            <h1 style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 'clamp(44px, 6vw, 72px)',
              fontWeight: 400,
              letterSpacing: '-0.035em',
              color: 'var(--text)',
              lineHeight: 1.0,
              marginBottom: 24,
            }}>
              The HR team<br />
              <span style={{ color: 'var(--gold-dark)' }}>that runs itself.</span>
            </h1>

            <p style={{
              fontSize: 18,
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              maxWidth: 480,
              margin: '0 auto 56px',
            }}>
              MambaHR is in private beta. Leave your details and we&apos;ll reach out to schedule time.
            </p>

            {/* Form card */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: 20,
              padding: '40px 40px 36px',
              boxShadow: '0 4px 32px rgba(0,0,0,0.06)',
              maxWidth: 420,
              margin: '0 auto',
            }}>
              <Waitlist />
            </div>

            {/* Trust bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 32,
              marginTop: 36,
              flexWrap: 'wrap',
            }}>
              {[
                '10 design partners',
                '3,200+ employees managed',
                'Live in 1–2 days',
              ].map((s) => (
                <span key={s} style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 12,
                  color: 'var(--text-faint)',
                  letterSpacing: '0.03em',
                }}>{s}</span>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
