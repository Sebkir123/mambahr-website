import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import { Waitlist } from '@/components/waitlist'

export default function DemoPage() {
  return (
    <>
      <MegaNav />
      <main>
        <section style={{ background: 'var(--bg-warm)', paddingTop: 140, paddingBottom: 80 }}>
          <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
            <p className="eyebrow" style={{ marginBottom: 20 }}>BOOK A DEMO</p>
            <h1
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(40px, 5.5vw, 68px)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                marginBottom: 24,
                lineHeight: 1.05,
              }}
            >
              See it work in 30 minutes.
            </h1>
            <p style={{ fontSize: 19, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 640, margin: '0 auto 12px' }}>
              No slides. No sales gauntlet. The founders walk you through the product live, answer your questions, and show you what setup would look like for your team.
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-faint)' }}>
              Brian Bell · Sebastian Kirsch · We respond within 24 hours.
            </p>
          </div>
        </section>

        <section style={{ background: '#FFFFFF', padding: '80px 24px 120px' }}>
          <div
            style={{
              maxWidth: 720,
              margin: '0 auto',
              background: 'var(--bg-warm)',
              borderRadius: 16,
              border: '1px solid var(--border)',
              padding: '40px 32px',
            }}
          >
            <div
              style={{
                background: '#FFFFFF',
                border: '1px dashed var(--border)',
                borderRadius: 12,
                padding: '48px 24px',
                textAlign: 'center',
                marginBottom: 32,
              }}
            >
              <p style={{ fontSize: 14, color: 'var(--text-faint)', marginBottom: 8, letterSpacing: '0.04em', fontWeight: 600 }}>CALENDAR</p>
              <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.55 }}>
                Calendar embed coming soon. For now, leave your email below and we&apos;ll send time slots within a day.
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 28 }}>
              <p style={{ fontSize: 13, color: 'var(--text-faint)', textAlign: 'center', marginBottom: 16, letterSpacing: '0.04em', fontWeight: 600 }}>OR EMAIL US</p>
              <Waitlist compact />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
