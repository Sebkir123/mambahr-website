import type { Metadata } from 'next'
import { Fragment } from 'react'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'

export const metadata: Metadata = {
  title: 'Pricing — MambaHR | Your first AI HR department',
  description:
    'Simple per-employee pricing for recruiting, onboarding, performance, compliance, and payroll-ready exports. Founding pricing for the first 20 companies.',
}

const BOOK = '/demo'

type Plan = {
  name: string
  pepm: string
  minimum: string
  who: string
  includes: string[]
  cta: string
  popular?: boolean
}

const PLANS: Plan[] = [
  {
    name: 'HR Starter',
    pepm: '$14',
    minimum: '$10,000 annual minimum',
    who: 'For startups that need HR structure before hiring their first HR generalist.',
    includes: [
      'Employee records',
      'Org chart & team visibility',
      'AI HR helpdesk',
      'People dashboards',
      'Workforce risk signals',
      'HR document storage',
      'Basic workflows & approvals',
      'Basic compliance guidance',
      'Payroll-ready exports',
      'Slack & Teams access',
    ],
    cta: 'Start with HR Starter',
  },
  {
    name: 'HR Ops Manager',
    pepm: '$22',
    minimum: '$24,000 annual minimum',
    who: 'For growing teams that need the work of an HR ops function to keep people work moving.',
    includes: [
      'Everything in HR Starter',
      'Onboarding workflows',
      'Offboarding workflows',
      'Offer & HR document generation',
      'Approval routing',
      'Manager & team insights',
      'Performance workflow support',
      'Leave & policy workflows',
      'Payroll & benefits change reports',
      'Standard audit trails',
      'Implementation support',
    ],
    cta: 'Add your HR Ops layer',
    popular: true,
  },
  {
    name: 'AI HR Department',
    pepm: '$30',
    minimum: '$45,000 annual minimum',
    who: 'For companies that need HR ops plus HRBP-level support across compliance, performance, and change.',
    includes: [
      'Everything in HR Ops Manager',
      'Advanced workflow automation',
      'RIF & change planning',
      'Advanced compliance workflows',
      'Advanced audit trails',
      'Custom workflows',
      'Advanced integrations',
      'SSO & security review',
      'Dedicated implementation',
      'Priority support',
    ],
    cta: 'Build your AI HR department',
  },
  {
    name: 'Enterprise',
    pepm: 'Custom',
    minimum: 'Starts at $100,000/year',
    who: 'For complex workflows, multi-entity structures, security, and procurement requirements.',
    includes: [
      'Everything in AI HR Department',
      'Custom implementation',
      'Advanced security & procurement',
      'High-volume workflow support',
      'Custom approval logic',
      'Custom export & reporting',
      'Dedicated success support',
      'Enterprise integrations',
    ],
    cta: 'Talk to founders',
  },
]

// vs. building a team in-house — cost math framed as work done, not headcount replaced.
const COST_ROWS: { role: string; cost: string; mamba: string }[] = [
  { role: 'HR Coordinator', cost: '$70,000 – $95,000', mamba: 'HR Starter or HR Ops Manager' },
  { role: 'HR Generalist', cost: '$85,000 – $120,000', mamba: 'HR Ops Manager' },
  { role: 'HR Ops Manager', cost: '$110,000 – $150,000', mamba: 'HR Ops Manager or AI HR Department' },
  { role: 'Junior HRBP', cost: '$100,000 – $140,000', mamba: 'AI HR Department' },
]

// vs. the tools teams stitch together — competitor rows link to /compare/*.
const VS_TOOLS: { name: string; slug: string | null; good: string; gap: string }[] = [
  { name: 'BambooHR', slug: 'bamboohr', good: 'Employee records, onboarding, basic HRIS, reports', gap: 'A system of record. The team still does the work — MambaHR does the work around the data.' },
  { name: 'Gusto', slug: 'gusto', good: 'Payroll, benefits, basic HR for small businesses', gap: 'Payroll-first. MambaHR works around your payroll and prepares clean outputs.' },
  { name: 'Rippling', slug: 'rippling', good: 'Broad workforce platform across HR, IT, finance, payroll', gap: 'Powerful but modular and pricey at scale. MambaHR is execution-first and simpler.' },
  { name: 'Deel', slug: 'deel', good: 'Global hiring, contractors, EOR, international payroll', gap: 'Best for global payment complexity. MambaHR runs your domestic HR function.' },
  { name: 'Workday', slug: 'workday', good: 'Enterprise HCM, large-company HR, complex reporting', gap: 'Heavy, expensive, slow to implement. MambaHR gives growing teams execution without the drag.' },
  { name: 'Spreadsheets, Slack & Docs', slug: null, good: 'Cheap, flexible, easy to start', gap: 'Breaks fast. No audit trail, inconsistent process, missed changes. MambaHR adds structure from day one.' },
]

// Feature matrix — ✓ / ✕ per plan. Order: Starter, Ops, Department, Enterprise.
const MATRIX: { group: string; rows: { feature: string; on: [boolean, boolean, boolean, boolean] }[] }[] = [
  {
    group: 'Foundation',
    rows: [
      { feature: 'Employee records', on: [true, true, true, true] },
      { feature: 'Org chart & team visibility', on: [true, true, true, true] },
      { feature: 'AI HR helpdesk', on: [true, true, true, true] },
      { feature: 'People dashboards', on: [true, true, true, true] },
      { feature: 'Workforce risk signals', on: [true, true, true, true] },
      { feature: 'HR document storage', on: [true, true, true, true] },
      { feature: 'Basic workflows & approvals', on: [true, true, true, true] },
      { feature: 'Basic compliance guidance', on: [true, true, true, true] },
      { feature: 'Payroll-ready exports', on: [true, true, true, true] },
      { feature: 'Slack & Teams access', on: [true, true, true, true] },
    ],
  },
  {
    group: 'HR Ops',
    rows: [
      { feature: 'Onboarding workflows', on: [false, true, true, true] },
      { feature: 'Offboarding workflows', on: [false, true, true, true] },
      { feature: 'Offer & HR document generation', on: [false, true, true, true] },
      { feature: 'Approval routing', on: [false, true, true, true] },
      { feature: 'Manager & team insights', on: [false, true, true, true] },
      { feature: 'Performance workflow support', on: [false, true, true, true] },
      { feature: 'Leave & policy workflows', on: [false, true, true, true] },
      { feature: 'Benefits eligibility & change reports', on: [false, true, true, true] },
      { feature: 'Standard audit trails', on: [false, true, true, true] },
      { feature: 'Implementation support', on: [false, true, true, true] },
    ],
  },
  {
    group: 'HRBP & Compliance',
    rows: [
      { feature: 'Advanced workflow automation', on: [false, false, true, true] },
      { feature: 'RIF & change planning', on: [false, false, true, true] },
      { feature: 'Advanced compliance workflows', on: [false, false, true, true] },
      { feature: 'Advanced audit trails', on: [false, false, true, true] },
      { feature: 'Custom workflows', on: [false, false, true, true] },
      { feature: 'SSO & security review', on: [false, false, true, true] },
      { feature: 'Dedicated implementation', on: [false, false, true, true] },
      { feature: 'Priority support', on: [false, false, true, true] },
    ],
  },
  {
    group: 'Enterprise',
    rows: [
      { feature: 'Custom implementation', on: [false, false, false, true] },
      { feature: 'Advanced security & procurement', on: [false, false, false, true] },
      { feature: 'High-volume workflow support', on: [false, false, false, true] },
      { feature: 'Custom approval logic', on: [false, false, false, true] },
      { feature: 'Custom export & reporting', on: [false, false, false, true] },
      { feature: 'Dedicated success support', on: [false, false, false, true] },
      { feature: 'Enterprise integrations', on: [false, false, false, true] },
    ],
  },
]

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Is MambaHR software or an AI HR department?',
    a: 'Both. MambaHR gives your company the system, workflows, documents, reporting, and AI support to run HR work faster — a tool that does the work alongside your team, not just stores employee data. The human keeps the judgment on sensitive calls.',
  },
  {
    q: 'Does MambaHR replace our HR team?',
    a: 'No. MambaHR is a tool that supports your team and clears the repeatable HR work — onboarding, offboarding, documents, approvals, compliance checks, performance and leave workflows. For complex employee relations, investigations, and sensitive people decisions, you stay in the loop. It lets a lean team operate like a much bigger one.',
  },
  {
    q: 'Can MambaHR delay our first HR hire?',
    a: 'For many startups, yes. MambaHR covers the repeatable operations work that usually forces companies to hire earlier than planned. As you grow, it helps the HR people you do have move faster instead of getting buried in manual work.',
  },
  {
    q: 'Does MambaHR process payroll?',
    a: 'No. MambaHR generates clean, payroll-ready outputs for your existing payroll provider, PEO, or finance team. No rip-and-replace.',
  },
  {
    q: 'Can we keep our current payroll and benefits providers?',
    a: 'Yes — that is the point. MambaHR makes the work around your existing payroll and benefits run cleaner without forcing you to switch systems.',
  },
  {
    q: 'What plan should we choose?',
    a: 'Most growing companies start with HR Ops Manager. Choose HR Starter if you mainly need HR answers, employee visibility, and clean exports. Choose AI HR Department if you also need compliance, performance, workforce-change, and HRBP-level support.',
  },
  {
    q: 'Is pricing monthly or annual?',
    a: 'Plans are priced per employee and billed annually.',
  },
  {
    q: 'Is founding customer pricing available?',
    a: 'Yes — for the first 20 companies. Founding customers receive discounted annual pricing locked for the life of the contract, direct founder onboarding, and priority input into the roadmap.',
  },
]

const serif = 'var(--font-serif), Georgia, serif'

// FAQ structured data — moved here from the home page when the FAQ relocated to /pricing.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}
const faqJsonLdString = JSON.stringify(faqJsonLd)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026')

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLdString }} />
      <MegaNav />
      <main style={{ paddingTop: 64 }}>
        {/* ── HERO ── */}
        <section style={{ background: 'var(--bg-warm)', padding: '104px 24px 72px' }}>
          <div style={{ maxWidth: 880, margin: '0 auto' }}>
            <p className="eyebrow" style={{ marginBottom: 22 }}>PRICING</p>
            <h1 style={{ fontFamily: serif, fontSize: 'clamp(40px, 5.5vw, 64px)', fontWeight: 400, letterSpacing: '-0.035em', color: 'var(--text)', marginBottom: 24, lineHeight: 1.0 }}>
              All the work of a full HR team,<br />
              <span style={{ color: 'var(--gold-dark)' }}>for a fraction of the cost.</span>
            </h1>
            <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 620 }}>
              Priced per employee, billed annually. Built to give lean teams real HR execution — recruiting,
              onboarding, performance, compliance, and payroll-ready exports — without hiring a full People team first.
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}> Founding pricing for the first 20 companies.</strong>
            </p>
          </div>
        </section>

        {/* ── PLAN CARDS ── */}
        <section style={{ background: 'var(--bg)', padding: '64px 24px' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <div className="pricing-plans" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {PLANS.map((p) => (
                <div
                  key={p.name}
                  className="card-lift"
                  style={{
                    position: 'relative',
                    background: 'var(--bg)',
                    border: p.popular ? '1.5px solid var(--gold-dark)' : '1px solid var(--border)',
                    borderRadius: 18,
                    padding: '28px 22px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 18,
                    boxShadow: p.popular ? '0 6px 24px rgba(142,111,64,0.12)' : '0 1px 2px rgba(0,0,0,0.02)',
                  }}
                >
                  {p.popular && (
                    <span style={{ position: 'absolute', top: -10, left: 22, fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', color: 'var(--gold-dark)', background: 'var(--gold-tint)', border: '1px solid var(--gold-light)', borderRadius: 999, padding: '3px 9px' }}>
                      MOST POPULAR
                    </span>
                  )}
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', margin: '0 0 10px', letterSpacing: '-0.01em' }}>{p.name}</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                      <span style={{ fontFamily: serif, fontSize: 38, fontWeight: 400, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1 }}>{p.pepm}</span>
                      {p.pepm !== 'Custom' && <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>/employee/mo</span>}
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--text-faint)', margin: '6px 0 0' }}>{p.minimum}</p>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0, paddingTop: 14, borderTop: '1px solid var(--border-faint)' }}>{p.who}</p>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
                    {p.includes.map((f) => (
                      <li key={f} style={{ fontSize: 12.5, color: 'var(--text)', lineHeight: 1.4, display: 'flex', gap: 8 }}>
                        <span style={{ color: 'var(--gold)', flexShrink: 0, fontWeight: 700 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={BOOK} className={p.popular ? 'btn-gold' : 'btn-secondary'} style={{ justifyContent: 'center', width: '100%', fontSize: 13 }}>
                    {p.cta} →
                  </Link>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-faint)', textAlign: 'center', marginTop: 24 }}>
              Annual minimums and founding rates are confirmed on a 30-minute call.
            </p>
          </div>
        </section>

        {/* ── COMPARE THE COST ── */}
        <section style={{ background: 'var(--bg-warm)', padding: '88px 24px' }}>
          <div style={{ maxWidth: 880, margin: '0 auto' }}>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(30px, 3.6vw, 44px)', fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 14, lineHeight: 1.05 }}>
              Compare the cost.
            </h2>
            <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 36, maxWidth: 620 }}>
              MambaHR gives a lean team real HR execution for a fraction of one full-time hire — so the people you
              do have spend their time on judgment, not paperwork.
            </p>
            <div style={{ border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', background: 'var(--bg)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.4fr', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
                {['Build it in-house', 'Estimated annual cost', 'MambaHR gives you the same firepower'].map((h) => (
                  <div key={h} style={{ padding: '14px 18px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{h}</div>
                ))}
              </div>
              {COST_ROWS.map((r, i) => (
                <div key={r.role} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.4fr', borderTop: i ? '1px solid var(--border-faint)' : 'none' }}>
                  <div style={{ padding: '16px 18px', fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{r.role}</div>
                  <div style={{ padding: '16px 18px', fontSize: 14, color: 'var(--text-muted)' }}>{r.cost}</div>
                  <div style={{ padding: '16px 18px', fontSize: 14, color: 'var(--gold-dark)', fontWeight: 600 }}>{r.mamba}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARE YOUR OPTIONS (vs tools) ── */}
        <section style={{ background: 'var(--bg)', padding: '88px 24px' }}>
          <div style={{ maxWidth: 980, margin: '0 auto' }}>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(30px, 3.6vw, 44px)', fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 14, lineHeight: 1.05 }}>
              Compare your options.
            </h2>
            <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 36, maxWidth: 640 }}>
              Most tools store employee data or run payroll. MambaHR does the work around it — and works with the
              systems you already have.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {VS_TOOLS.map((t) => (
                <div key={t.name} className="vs-row" style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.1fr 1.6fr auto', gap: 18, alignItems: 'center', padding: '18px 22px', border: '1px solid var(--border)', borderRadius: 14, background: 'var(--bg)' }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', margin: 0 }}>{t.name}</p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{t.good}</p>
                  <p style={{ fontSize: 13, color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>{t.gap}</p>
                  {t.slug ? (
                    <Link href={`/compare/${t.slug}`} style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-dark)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                      Full comparison →
                    </Link>
                  ) : (
                    <span />
                  )}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6, marginTop: 28, fontStyle: 'italic' }}>
              Simpler than Rippling, faster than Workday, more execution-focused than BambooHR — and it works around
              your existing payroll instead of replacing it.
            </p>
          </div>
        </section>

        {/* ── FEATURE MATRIX ── */}
        <section style={{ background: 'var(--bg-warm)', padding: '88px 24px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(30px, 3.6vw, 44px)', fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 36, lineHeight: 1.05 }}>
              Compare plans.
            </h2>
            <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 16, background: 'var(--bg)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
                <thead>
                  <tr style={{ background: 'var(--bg-surface)' }}>
                    <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: 12, fontWeight: 700, color: 'var(--text)', position: 'sticky', left: 0, background: 'var(--bg-surface)' }}>Feature</th>
                    {['HR Starter', 'HR Ops Manager', 'AI HR Department', 'Enterprise'].map((h, i) => (
                      <th key={h} style={{ padding: '16px 14px', fontSize: 12, fontWeight: 700, color: i === 1 ? 'var(--gold-dark)' : 'var(--text)', textAlign: 'center', minWidth: 120 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MATRIX.map((g) => (
                    <Fragment key={g.group}>
                      <tr>
                        <td colSpan={5} style={{ padding: '14px 20px 6px', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-faint)', borderTop: '1px solid var(--border)' }}>{g.group}</td>
                      </tr>
                      {g.rows.map((row) => (
                        <tr key={row.feature} style={{ borderTop: '1px solid var(--border-faint)' }}>
                          <td style={{ padding: '12px 20px', fontSize: 13.5, color: 'var(--text)', position: 'sticky', left: 0, background: 'var(--bg)' }}>{row.feature}</td>
                          {row.on.map((on, i) => (
                            <td key={i} style={{ textAlign: 'center', padding: '12px 14px', fontSize: 15, color: on ? 'var(--gold-dark)' : 'var(--border-mid)', fontWeight: on ? 700 : 400 }}>
                              {on ? '✓' : '–'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── EXPORTS EXPLAINER — we do exports, not payroll ── */}
        <section id="exports" style={{ background: 'var(--bg)', padding: '88px 24px', scrollMarginTop: 72 }}>
          <div style={{ maxWidth: 880, margin: '0 auto' }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>WORKS WITH YOUR STACK</p>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 14, lineHeight: 1.1 }}>
              Keep your payroll. We get it ready.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 16 }}>
              MambaHR doesn’t run payroll. It produces clean, accurate change files your existing payroll provider,
              broker, PEO, or finance team can use as-is — so nothing gets keyed in twice and nothing gets missed.
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px 24px' }}>
              {['New hire reports', 'Termination reports', 'Comp change reports', 'Job, manager & location changes', 'Leave & time-away reports', 'Benefits eligibility reports', 'COBRA trigger reports', 'Audit-ready change history'].map((x) => (
                <li key={x} style={{ fontSize: 13.5, color: 'var(--text)', display: 'flex', gap: 8 }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 700 }}>—</span>{x}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── PRICING FAQ (this page only) ── */}
        <section style={{ background: 'var(--bg-warm)', padding: '88px 24px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(30px, 3.6vw, 44px)', fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 36, lineHeight: 1.05 }}>
              Pricing questions.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {FAQ.map((f) => (
                <details key={f.q} style={{ borderTop: '1px solid var(--border)', padding: '18px 0' }}>
                  <summary style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', cursor: 'pointer', listStyle: 'none' }}>{f.q}</summary>
                  <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.65, margin: '12px 0 0' }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <RequestAccessSection />
      <Footer />

      <style>{`
        @media (max-width: 940px) {
          .pricing-plans { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 720px) {
          .vs-row { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
        @media (max-width: 520px) {
          .pricing-plans { grid-template-columns: 1fr !important; }
        }
        details > summary::-webkit-details-marker { display: none; }
      `}</style>
    </>
  )
}
