import type { Metadata } from 'next'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import { competitors } from './[slug]/data'

export const metadata: Metadata = {
  title: 'Compare MambaHR — vs Rippling, Gusto, BambooHR, Workday',
  description: 'See how MambaHR compares to Rippling, Gusto, BambooHR, and Workday. MambaHR is the AI HR department that does the work — not just stores the data.',
}

const cards = [
  { slug: 'rippling', headline: 'vs Rippling', sub: 'Rippling runs payroll. MambaHR runs HR.', tag: 'Most requested' },
  { slug: 'gusto', headline: 'vs Gusto', sub: 'Gusto pays your people. MambaHR manages them.', tag: null },
  { slug: 'deel', headline: 'vs Deel', sub: 'Deel handles global contractors. MambaHR runs your whole department.', tag: null },
  { slug: 'bamboohr', headline: 'vs BambooHR', sub: 'BambooHR stores your data. MambaHR acts on it.', tag: null },
  { slug: 'namely', headline: 'vs Namely', sub: 'Namely makes HR software better. MambaHR makes it disappear.', tag: null },
  { slug: 'hibob', headline: 'vs HiBob', sub: 'HiBob makes HR human. MambaHR makes it automatic.', tag: null },
  { slug: 'adp', headline: 'vs ADP', sub: 'ADP has been running payroll since 1949. This is 2025.', tag: null },
  { slug: 'workday', headline: 'vs Workday', sub: 'Built for 10,000 employees. You have 50.', tag: null },
]

const differentiators = [
  { num: '01', title: 'It does the work', desc: 'Leave approved. Offer drafted. Candidate screened. MambaHR handles the request end-to-end — not just surfaces the information for someone else to act on.' },
  { num: '02', title: 'It lives in Slack', desc: 'No new software for your team to learn. Employees mention @mamba in any channel and get answers in seconds. Managers approve in a thread.' },
  { num: '03', title: 'Human in the loop', desc: 'Every high-stakes decision — offers above band, terminations, PIPs — routes to you for approval before anything happens. The agent handles the routine, you handle the judgment.' },
  { num: '04', title: 'Built for small teams', desc: 'The compliance engine, the audit trail, the 14 specialist agents — all of it built for the team with one HR person doing the work of ten.' },
]

export default function ComparePage() {
  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64 }}>

        {/* ── HERO ── */}
        <section style={{ background: 'var(--bg-warm)', padding: '100px 24px 72px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
            <p className="eyebrow" style={{ marginBottom: 20 }}>COMPARE</p>
            <h1
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(36px, 5vw, 60px)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                marginBottom: 24,
                lineHeight: 1.05,
              }}
            >
              How does MambaHR<br />
              <span style={{ color: 'var(--gold-dark)' }}>compare to what you use today?</span>
            </h1>
            <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
              Most HR tools store data and run payroll. MambaHR is the AI department that handles the actual work — so your team stops processing and starts deciding.
            </p>
          </div>
        </section>

        {/* ── COMPARISON CARDS ── */}
        <section style={{ background: '#FFFFFF', padding: '88px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {cards.map((card) => (
                <Link
                  key={card.slug}
                  href={`/compare/${card.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="compare-card"
                    style={{
                      padding: '28px 24px',
                      background: 'var(--bg-warm)',
                      border: '1px solid var(--border-faint)',
                      borderRadius: 16,
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                      position: 'relative',
                    }}
                  >
                    {card.tag && (
                      <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--gold-dark)', background: 'var(--gold-tint)', padding: '3px 8px', borderRadius: 20, letterSpacing: '0.04em', position: 'absolute', top: 20, right: 20 }}>
                        {card.tag}
                      </span>
                    )}
                    <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{card.headline}</p>
                    <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 20 }}>{card.sub}</p>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-dark)' }}>See comparison →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY MAMBAHR IS DIFFERENT ── */}
        <section style={{ background: 'var(--bg-cream)', padding: '88px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ marginBottom: 48 }}>
              <p className="eyebrow" style={{ marginBottom: 14 }}>WHAT MAKES US DIFFERENT</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(24px, 2.8vw, 36px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                Not a tool. A department.
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {differentiators.map((d, i) => (
                <div
                  key={d.num}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '48px 1fr 1.8fr',
                    gap: 24,
                    padding: '28px 0',
                    borderTop: '1px solid var(--border-faint)',
                    borderBottom: i === differentiators.length - 1 ? '1px solid var(--border-faint)' : 'none',
                    alignItems: 'baseline',
                  }}
                >
                  <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold-dark)', letterSpacing: '0.06em' }}>{d.num}</span>
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', margin: 0 }}>{d.title}</p>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <RequestAccessSection />
      </main>
      <Footer />
    </>
  )
}
