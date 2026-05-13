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
            <p className="eyebrow" style={{ marginBottom: 20 }}>REQUEST ACCESS</p>
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
              Get early access.
            </h1>
            <p style={{ fontSize: 19, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 580, margin: '0 auto' }}>
              MambaHR is in private beta. Leave your email and we&apos;ll reach out to schedule time.
            </p>
          </div>
        </section>

        <section style={{ background: '#FFFFFF', padding: '80px 24px 120px' }}>
          <div
            style={{
              maxWidth: 480,
              margin: '0 auto',
              background: 'var(--bg-warm)',
              borderRadius: 16,
              border: '1px solid var(--border)',
              padding: '40px 32px',
            }}
          >
            <Waitlist />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
