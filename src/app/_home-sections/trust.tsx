// Plain-English reassurance row — the shapes.co "Built for HR leaders" closer.
// Objection-handling in human words: no tech jargon (our buyers are HR/finance/legal).
const POINTS: { title: string; copy: string }[] = [
  {
    title: 'Simple, honest pricing',
    copy: 'One clear price per employee. No per-module surprises, no inflated setup fees.',
  },
  {
    title: 'Live in days, not months',
    copy: 'It’s software, not a year-long rollout. Most teams are up and running in a day.',
  },
  {
    title: 'Built by real HR people',
    copy: 'Made by operators who’ve lived the messy parts of people work. Founders onboard you directly.',
  },
  {
    title: 'Your team will actually use it',
    copy: 'It works in Slack and Teams. No new tool to learn, no training week, no adoption fight.',
  },
  {
    title: 'Compliance built in',
    copy: 'Federal and 50-state employment law, kept current. Every decision comes with the rule behind it.',
  },
  {
    title: 'Your people data stays safe',
    copy: 'Tight access controls and a full record of every change — so nothing happens without a trail.',
  },
]

export default function TrustSection() {
  return (
    <section style={{ background: 'var(--bg)', padding: '120px 24px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div data-animate style={{ textAlign: 'center', marginBottom: 64, maxWidth: 640, margin: '0 auto 64px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              margin: '0 0 14px',
              lineHeight: 1.05,
            }}
          >
            Made for lean teams.
          </h2>
          <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Everything a growing company needs to run HR well — and nothing it has to fight to adopt.
          </p>
        </div>

        <div
          className="trust-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px 56px' }}
        >
          {POINTS.map((p) => (
            <div key={p.title} style={{ borderTop: '1px solid var(--border)', paddingTop: 22 }}>
              <div
                aria-hidden
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: 'var(--gold-tint)',
                  border: '1px solid var(--gold-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 18,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
                  <path d="M4 9.5l3 3 7-8" stroke="var(--gold-dark)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
                {p.title}
              </h3>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                {p.copy}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .trust-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 36px 40px !important; }
        }
        @media (max-width: 520px) {
          .trust-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
