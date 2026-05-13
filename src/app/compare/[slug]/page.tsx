import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import { competitors } from './data'

type Props = { params: Promise<{ slug: string }> }

function CellValue({ value, accent }: { value: string | boolean; accent: 'mamba' | 'them' }) {
  if (typeof value === 'boolean') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {value ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-label="Yes">
            <path d="M3 9.5l4 4 8-9" stroke="var(--color-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <span style={{ color: 'var(--text-faint)', fontSize: 18, lineHeight: 1, fontWeight: 400 }} aria-label="No">—</span>
        )}
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <span style={{
        fontSize: 12,
        fontWeight: 600,
        color: accent === 'mamba' ? 'var(--gold-dark)' : 'var(--text-muted)',
        background: accent === 'mamba' ? 'var(--gold-tint)' : 'var(--bg-surface)',
        border: accent === 'mamba' ? '1px solid var(--gold)' : '1px solid var(--border)',
        padding: '4px 12px',
        borderRadius: 999,
        textAlign: 'center',
        lineHeight: 1.3,
      }}>
        {value}
      </span>
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(competitors).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = competitors[slug]
  if (!c) return {}
  const ogUrl = `/api/og?line1=MambaHR+vs.&line2=${encodeURIComponent(c.name)}&highlight=&subtitle=${encodeURIComponent('See the side-by-side. Setup, scope, sign-off model, support, pricing.')}&bottomRight=${encodeURIComponent('Compare')}`
  return {
    title: `MambaHR vs ${c.name} — ${c.tagline}`,
    description: c.heroSub,
    openGraph: {
      title: `MambaHR vs ${c.name}`,
      description: c.heroSub,
      url: `https://mambahr.com/compare/${slug}`,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `MambaHR vs ${c.name}`,
      description: c.heroSub,
      images: [ogUrl],
    },
    alternates: { canonical: `https://mambahr.com/compare/${slug}` },
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
        <section style={{ background: 'var(--bg-warm)', padding: '120px 24px 88px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p className="eyebrow" style={{ marginBottom: 24 }}>MAMBAHR VS {c.name.toUpperCase()}</p>
            <h1
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 400,
                letterSpacing: '-0.035em',
                color: 'var(--text)',
                marginBottom: 32,
                lineHeight: 1.0,
                whiteSpace: 'pre-line',
              }}
            >
              {c.heroHeadline.split('\n').map((line, i) => (
                <span key={i} style={{ color: i === 1 ? 'var(--gold-dark)' : 'var(--text)' }}>
                  {line}{i === 0 ? <br /> : ''}
                </span>
              ))}
            </h1>
            <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 620, marginBottom: 36 }}>
              {c.heroSub}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="/demo" className="btn-gold">Request access →</a>
              <a href="#compare-table" className="btn-secondary">See the comparison ↓</a>
            </div>
          </div>
        </section>

        {/* ── THREE REASONS ── */}
        <section style={{ background: 'var(--bg)', padding: '120px 24px' }}>
          <div style={{ maxWidth: 1040, margin: '0 auto' }}>
            <div style={{ marginBottom: 64, maxWidth: 720 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>WHERE WE DIFFER</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  color: 'var(--text)',
                  margin: 0,
                  lineHeight: 1.05,
                }}
              >
                Why teams pick MambaHR over {c.name}.
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
              {c.switchReasons.map((r, i) => (
                <div
                  key={i}
                  style={{
                    padding: '32px 28px',
                    background: 'var(--bg-warm)',
                    borderRadius: 16,
                    border: '1px solid var(--border)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <p style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'var(--gold-dark)',
                    letterSpacing: '0.08em',
                    margin: '0 0 16px',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    fontSize: 'clamp(18px, 1.8vw, 22px)',
                    fontWeight: 400,
                    color: 'var(--text)',
                    margin: '0 0 14px',
                    letterSpacing: '-0.015em',
                    lineHeight: 1.3,
                  }}>
                    {r.title}
                  </p>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
                    {r.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section id="compare-table" style={{ background: 'var(--bg-cream)', padding: '120px 24px' }}>
          <div style={{ maxWidth: 980, margin: '0 auto' }}>
            <div style={{ marginBottom: 56, maxWidth: 720 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>FEATURE COMPARISON</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  color: 'var(--text)',
                  margin: 0,
                  lineHeight: 1.05,
                }}
              >
                Head to head.
              </h2>
            </div>

            <div style={{ background: 'var(--bg)', borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden' }}>
              {/* Table header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 160px', gap: 0, background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', padding: '16px 24px' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace' }}>Feature</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <Image src="/MambaHR_logo.png" alt="MambaHR" width={14} height={14} style={{ objectFit: 'contain', borderRadius: 3 }} />
                  MambaHR
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textAlign: 'center' }}>{c.name}</span>
              </div>

              {/* Rows */}
              {c.tableRows.map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 160px 160px',
                    gap: 0,
                    padding: '18px 24px',
                    borderBottom: i < c.tableRows.length - 1 ? '1px solid var(--border-faint)' : 'none',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{row.feature}</span>
                    {row.note && <p style={{ fontSize: 11, color: 'var(--text-faint)', margin: '4px 0 0', fontStyle: 'italic' }}>{row.note}</p>}
                  </div>

                  <CellValue value={row.mamba} accent="mamba" />
                  <CellValue value={row.them} accent="them" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM LINE ── */}
        <section style={{ background: 'var(--bg)', padding: '120px 24px' }}>
          <div style={{ maxWidth: 820, margin: '0 auto' }}>
            <p className="eyebrow" style={{ marginBottom: 20 }}>THE BOTTOM LINE</p>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(28px, 3.4vw, 40px)',
                fontWeight: 400,
                letterSpacing: '-0.025em',
                color: 'var(--text)',
                margin: '0 0 36px',
                lineHeight: 1.2,
              }}
            >
              {c.bottomLine}
            </h2>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="/demo" className="btn-gold">Request access →</a>
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
        <section style={{ background: 'var(--bg-warm)', padding: '72px 24px', borderTop: '1px solid var(--border-faint)' }}>
          <div style={{ maxWidth: 980, margin: '0 auto' }}>
            <p className="eyebrow" style={{ marginBottom: 24 }}>ALSO COMPARING</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {otherSlugs.map((s) => (
                <Link
                  key={s}
                  href={`/compare/${s}`}
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 999,
                    padding: '8px 16px',
                    textDecoration: 'none',
                    transition: 'border-color 0.15s, color 0.15s',
                  }}
                >
                  vs {competitors[s].name}
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
