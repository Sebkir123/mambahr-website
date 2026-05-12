import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import { competitors } from './data'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return Object.keys(competitors).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = competitors[slug]
  if (!c) return {}
  return {
    title: `MambaHR vs ${c.name} — ${c.tagline}`,
    description: c.heroSub,
    openGraph: {
      images: [{ url: `/api/og?line1=MambaHR+vs+${c.name}&line2=A+team+that+runs+the&highlight=work.`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [`/api/og?line1=MambaHR+vs+${c.name}&line2=A+team+that+runs+the&highlight=work.`],
    },
  }
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params
  const c = competitors[slug]
  if (!c) notFound()

  const otherSlugs = Object.keys(competitors).filter((s) => s !== slug)

  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64 }}>

        {/* ── HERO ── */}
        <section style={{ background: 'var(--bg-warm)', padding: '100px 24px 72px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p className="eyebrow" style={{ marginBottom: 20 }}>MAMBAHR VS {c.name.toUpperCase()}</p>
            <h1
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(34px, 4.5vw, 58px)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                marginBottom: 28,
                lineHeight: 1.05,
                whiteSpace: 'pre-line',
              }}
            >
              {c.heroHeadline.split('\n').map((line, i) => (
                <span key={i} style={{ color: i === 1 ? 'var(--gold-dark)' : 'var(--text)' }}>
                  {line}{i === 0 ? <br /> : ''}
                </span>
              ))}
            </h1>
            <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 620, marginBottom: 36 }}>
              {c.heroSub}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="/demo" className="btn-gold">Get a demo →</a>
              <a href="#compare-table" className="btn-secondary">See the comparison ↓</a>
            </div>
          </div>
        </section>

        {/* ── THREE REASONS ── */}
        <section style={{ background: '#FFFFFF', padding: '88px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>WHERE WE DIFFER</p>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(24px, 2.8vw, 36px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 48,
                lineHeight: 1.1,
              }}
            >
              Why teams choose MambaHR over {c.name}.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {c.switchReasons.map((r, i) => (
                <div key={i} style={{ padding: '28px 24px', background: 'var(--bg-warm)', borderRadius: 14, border: '1px solid var(--border-faint)' }}>
                  <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, fontWeight: 700, color: 'var(--gold-dark)', letterSpacing: '0.06em', marginBottom: 14 }}>
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{r.title}</p>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section id="compare-table" style={{ background: 'var(--bg-cream)', padding: '88px 24px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>FEATURE COMPARISON</p>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(24px, 2.8vw, 36px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 40,
                lineHeight: 1.1,
              }}
            >
              MambaHR vs {c.name}, head to head.
            </h2>

            <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              {/* Table header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 140px', gap: 0, background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', padding: '14px 24px' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-faint)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Feature</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <img src="/MambaHR_logo.png" alt="MambaHR" width={14} height={14} style={{ objectFit: 'contain', borderRadius: 3 }} />
                  MambaHR
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textAlign: 'center' }}>{c.name}</span>
              </div>

              {/* Rows */}
              {c.tableRows.map((row, i) => {
                const mambaVal = typeof row.mamba === 'boolean' ? row.mamba : row.mamba
                const themVal = typeof row.them === 'boolean' ? row.them : row.them

                return (
                  <div
                    key={i}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 140px 140px',
                      gap: 0,
                      padding: '16px 24px',
                      borderBottom: i < c.tableRows.length - 1 ? '1px solid var(--border-faint)' : 'none',
                      background: i % 2 === 0 ? '#FFFFFF' : 'rgba(248,246,243,0.5)',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{row.feature}</span>
                      {row.note && <p style={{ fontSize: 11, color: 'var(--text-faint)', margin: '3px 0 0', fontStyle: 'italic' }}>{row.note}</p>}
                    </div>

                    {/* MambaHR value */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {typeof mambaVal === 'boolean' ? (
                        mambaVal ? (
                          <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#F0FDF4', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </span>
                        ) : (
                          <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 2l6 6M8 2L2 8" stroke="var(--text-faint)" strokeWidth="1.5" strokeLinecap="round" /></svg>
                          </span>
                        )
                      ) : (
                        <span style={{ fontSize: 12, color: 'var(--gold-dark)', fontWeight: 600, textAlign: 'center', background: 'var(--gold-tint)', padding: '3px 10px', borderRadius: 20 }}>{mambaVal}</span>
                      )}
                    </div>

                    {/* Competitor value */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {typeof themVal === 'boolean' ? (
                        themVal ? (
                          <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#F0FDF4', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </span>
                        ) : (
                          <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 2l6 6M8 2L2 8" stroke="var(--text-faint)" strokeWidth="1.5" strokeLinecap="round" /></svg>
                          </span>
                        )
                      ) : (
                        <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, textAlign: 'center', background: 'var(--bg-surface)', padding: '3px 10px', borderRadius: 20 }}>{themVal}</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── BOTTOM LINE ── */}
        <section style={{ background: '#FFFFFF', padding: '80px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>THE BOTTOM LINE</p>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(22px, 2.5vw, 32px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 20,
                lineHeight: 1.2,
              }}
            >
              {c.bottomLine}
            </h2>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32 }}>
              <a href="/demo" className="btn-gold">Get a demo →</a>
              <Link href="/mamba" className="btn-secondary">See how Mamba works</Link>
            </div>
          </div>
        </section>

        {/* ── LEGAL DISCLAIMER ── */}
        <section style={{ background: 'var(--bg-surface)', padding: '32px 24px', borderTop: '1px solid var(--border-faint)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: 12, color: 'var(--text-faint)', lineHeight: 1.65, margin: 0 }}>
              <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> This comparison is based on publicly available information about {c.name} as of April 2026 and reflects our understanding of each product&apos;s general capabilities. Features, pricing, and availability may have changed. &ldquo;Not included&rdquo; refers to features not present in the standard product based on public documentation — not a statement about the vendor&apos;s roadmap or custom arrangements. We encourage you to verify current capabilities directly with {c.name} before making purchasing decisions. All product names and trademarks belong to their respective owners.
            </p>
          </div>
        </section>

        {/* ── OTHER COMPARISONS ── */}
        <section style={{ background: 'var(--bg-warm)', padding: '56px 24px', borderTop: '1px solid var(--border-faint)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 20 }}>Also comparing</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {otherSlugs.map((s) => (
                <Link
                  key={s}
                  href={`/compare/${s}`}
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'var(--text-muted)',
                    background: '#FFFFFF',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    padding: '8px 16px',
                    textDecoration: 'none',
                    transition: 'border-color 0.15s',
                  }}
                >
                  MambaHR vs {competitors[s].name} →
                </Link>
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
