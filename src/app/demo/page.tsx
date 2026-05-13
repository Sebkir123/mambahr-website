import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import { Waitlist } from '@/components/waitlist'

export default function DemoPage() {
  return (
    <>
      <style>{`
        /* Fix browser autofill background */
        #demo-form input:-webkit-autofill,
        #demo-form input:-webkit-autofill:hover,
        #demo-form input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
          -webkit-text-fill-color: var(--text) !important;
        }
        /* Stat dividers */
        .demo-stat + .demo-stat::before {
          content: '·';
          margin-right: 20px;
          opacity: 0.4;
        }
      `}</style>

      <MegaNav />
      <main>
        <section style={{
          background: 'linear-gradient(180deg, var(--bg-warm) 0%, #FFFFFF 100%)',
          paddingTop: 120,
          paddingBottom: 100,
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
        }}>
          <div style={{
            maxWidth: 520,
            margin: '0 auto',
            padding: '0 24px',
            textAlign: 'center',
            width: '100%',
          }}>

            <p className="eyebrow" style={{ marginBottom: 20 }}>REQUEST ACCESS</p>

            <h1 style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 'clamp(40px, 5.5vw, 64px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              lineHeight: 1.05,
              marginBottom: 16,
            }}>
              Your HR team,<br />
              <span style={{ color: 'var(--gold-dark)' }}>automated.</span>
            </h1>

            <p style={{
              fontSize: 17,
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              maxWidth: 400,
              margin: '0 auto 40px',
            }}>
              Private beta. Leave your details and we&apos;ll reach out.
            </p>

            {/* Form card */}
            <div id="demo-form" style={{
              background: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: 18,
              padding: '32px 32px 28px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.02)',
              maxWidth: 400,
              margin: '0 auto 32px',
            }}>
              <Waitlist />
            </div>

            {/* Trust line */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 20,
              flexWrap: 'wrap',
            }}>
              {['10 design partners', '3,200+ employees managed', '1–2 day setup'].map((s) => (
                <span key={s} className="demo-stat" style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 11,
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
