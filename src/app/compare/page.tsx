import type { Metadata } from 'next'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import { Beat, Page } from '@/components/ui/page'

export const metadata: Metadata = {
  title: 'Compare MambaHR — vs Rippling, Gusto, BambooHR, Workday',
  description: 'See how MambaHR compares to Rippling, Gusto, BambooHR, and Workday. MambaHR is the AI HR department that does the work — not just stores the data.',
}

const cards = [
  { slug: 'rippling', name: 'Rippling', sub: 'Rippling is the stack. MambaHR is the department that runs on it.', tag: 'Most requested' },
  { slug: 'gusto', name: 'Gusto', sub: 'Gusto handles payday. MambaHR handles every other day.', tag: null },
  { slug: 'deel', name: 'Deel', sub: 'Deel pays global contractors. MambaHR runs your domestic HR.', tag: null },
  { slug: 'bamboohr', name: 'BambooHR', sub: 'BambooHR stores your data. MambaHR acts on it.', tag: null },
  { slug: 'namely', name: 'Namely', sub: 'Namely made the HRIS prettier. MambaHR makes it unnecessary.', tag: null },
  { slug: 'hibob', name: 'HiBob', sub: 'HiBob made HR look modern. MambaHR makes it run itself.', tag: null },
  { slug: 'adp', name: 'ADP', sub: 'ADP is the back office. MambaHR is the front line.', tag: null },
  { slug: 'workday', name: 'Workday', sub: 'Workday is a project. MambaHR is a product.', tag: null },
]

const differentiators = [
  { num: '01', title: 'It does the work.', desc: 'Leave approved. Offer drafted. Candidate screened. MambaHR handles the request end-to-end — not just surfaces the information for someone else to act on.' },
  { num: '02', title: 'It lives in Slack.', desc: 'No new software to learn. Employees mention @mamba in any channel and get answers in seconds. Managers approve in a thread.' },
  { num: '03', title: 'Human in the loop.', desc: 'Every high-stakes decision — offers above band, terminations, PIPs — routes to you for approval before anything happens. The agent handles the routine, you handle the judgment.' },
  { num: '04', title: 'Built for the long tail.', desc: 'The compliance engine, the audit trail, the 14 specialist agents — all of it built for the HR lead doing the work of ten.' },
]

export default function ComparePage() {
  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64 }}>

        {/* ── HERO ── */}
        <Beat bg="warm" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
          <Page>
            <div style={{ maxWidth: 880 }}>
              <p className="eyebrow" style={{ marginBottom: 24 }}>COMPARE</p>
              <h1
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(40px, 5.5vw, 64px)',
                  fontWeight: 400,
                  letterSpacing: '-0.035em',
                  color: 'var(--text)',
                  marginBottom: 28,
                  lineHeight: 1.0,
                }}
              >
                How we compare<br />
                <span style={{ color: 'var(--gold-dark)' }}>to what you use today.</span>
              </h1>
              <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 580 }}>
                Most HR tools store data and run payroll. MambaHR is the agent department that handles the work — so your HR lead stops processing tickets and starts setting policy.
              </p>
            </div>
          </Page>
        </Beat>

        {/* ── COMPARISON CARDS ── */}
        <Beat bg="white">
          <Page>
            <div style={{ marginBottom: 48, maxWidth: 720 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>EIGHT COMPARISONS</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(28px, 3.2vw, 40px)',
                  fontWeight: 400,
                  letterSpacing: '-0.025em',
                  color: 'var(--text)',
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                Which one are you on today?
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
              {cards.map((card) => (
                <Link
                  key={card.slug}
                  href={`/compare/${card.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="compare-card"
                    style={{
                      padding: '32px 28px',
                      background: card.tag ? 'var(--gold-tint)' : 'var(--bg-warm)',
                      border: '1px solid var(--border)',
                      borderRadius: 16,
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s, transform 0.2s',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {card.tag && (
                      <span style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        fontSize: 10,
                        fontWeight: 700,
                        color: 'var(--gold-dark)',
                        background: 'var(--bg)',
                        border: '1px solid var(--gold)',
                        padding: '3px 10px',
                        borderRadius: 999,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-mono), monospace',
                      }}>
                        {card.tag}
                      </span>
                    )}
                    <p style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: 11,
                      fontWeight: 700,
                      color: 'var(--text-faint)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      margin: '0 0 12px',
                    }}>
                      MambaHR vs
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-serif), Georgia, serif',
                      fontSize: 28,
                      fontWeight: 400,
                      color: 'var(--text)',
                      letterSpacing: '-0.025em',
                      margin: '0 0 16px',
                      lineHeight: 1.0,
                    }}>
                      {card.name}
                    </p>
                    <p style={{
                      fontSize: 14,
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      margin: '0 0 28px',
                      flex: 1,
                    }}>
                      {card.sub}
                    </p>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: 'var(--gold-dark)',
                      fontFamily: 'var(--font-mono), monospace',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}>
                      See comparison →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Page>
        </Beat>

        {/* ── WHY MAMBAHR IS DIFFERENT ── */}
        <Beat bg="cream">
          <Page>
            <div style={{ marginBottom: 64, maxWidth: 720 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>WHAT MAKES US DIFFERENT</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(36px, 4.4vw, 56px)',
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  color: 'var(--text)',
                  margin: 0,
                  lineHeight: 1.0,
                }}
              >
                Not a tool.<br />
                <span style={{ color: 'var(--gold-dark)' }}>A department.</span>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {differentiators.map((d, i) => (
                <div
                  key={d.num}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr 1.6fr',
                    gap: 32,
                    padding: '32px 0',
                    borderTop: '1px solid var(--border)',
                    borderBottom: i === differentiators.length - 1 ? '1px solid var(--border)' : 'none',
                    alignItems: 'baseline',
                  }}
                  className="mobile-stack-rows"
                >
                  <span style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'var(--gold-dark)',
                    letterSpacing: '0.08em',
                  }}>
                    {d.num}
                  </span>
                  <p style={{
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    fontSize: 'clamp(20px, 2.2vw, 26px)',
                    fontWeight: 400,
                    color: 'var(--text)',
                    margin: 0,
                    letterSpacing: '-0.015em',
                    lineHeight: 1.25,
                  }}>
                    {d.title}
                  </p>
                  <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
                    {d.desc}
                  </p>
                </div>
              ))}
            </div>
          </Page>
        </Beat>

        <RequestAccessSection />
      </main>
      <Footer />
    </>
  )
}
