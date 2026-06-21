import type { Metadata } from 'next'
import { Fragment } from 'react'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import { MambaMark } from '@/components/mamba-mark'
import { getAdminUser } from '@/lib/auth'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { clientIp, geoFromHeaders, hashIp, parseUA } from '@/lib/deck-tracking'
import { DownloadButton } from './download-button'
import s from './rif-playbook.module.css'

// Gated lead magnet: reached only via a per-recipient ?k= token emailed after
// the form capture. Never indexed, never in the sitemap.
export const metadata: Metadata = {
  title: 'The Ultimate RIF Playbook — MambaHR',
  description: 'A people leader’s field guide to running a defensible reduction in force.',
  robots: { index: false, follow: false, noarchive: true, googleBot: { index: false, follow: false } },
}

export const dynamic = 'force-dynamic'

const GUIDE_SLUG = 'rif-playbook'
const FOOTER = 'The Ultimate RIF Playbook'

// Validate the field-guide token → its lead, or null. Only this guide's tokens.
async function resolveGuide(token: string | undefined) {
  if (!token) return null
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.rpc('resolve_field_guide', { p_token: token })
  if (error || !data) return null
  const row = Array.isArray(data) ? data[0] : data
  return row?.guide === GUIDE_SLUG ? row : null
}

// Server-side open log — fires before any client JS, enriched with firm/ASN.
// Raw IP is never stored (salted hash + resolved org only).
async function logView(token: string, h: Awaited<ReturnType<typeof headers>>) {
  try {
    const ua = h.get('user-agent') || ''
    const { device, browser, browserVersion, os, osVersion } = parseUA(ua)
    const geo = geoFromHeaders(h)
    const ip = clientIp(h)
    const supabase = await createSupabaseServerClient()
    await supabase.rpc('log_field_guide_view', {
      p_token: token,
      p_ip: ip || null,
      p_payload: {
        ...geo,
        ipHash: ip ? hashIp(ip) : null,
        ua: ua.slice(0, 400),
        device,
        browser,
        browserVersion,
        os,
        osVersion,
        referrer: h.get('referer')?.slice(0, 500) ?? null,
      },
    })
  } catch {
    /* analytics must never break the gate */
  }
}

function Chrome({ page }: { page: number }) {
  return (
    <>
      {page > 1 && (
        <span className={s.watermark}>
          <MambaMark size={26} color="var(--text)" title="MambaHR" />
        </span>
      )}
      <div className={s.footerWedge} />
      <div className={s.footerBar}>
        <span className={s.footerLabel}>
          {FOOTER} · {String(page).padStart(2, '0')}
        </span>
      </div>
    </>
  )
}

function Rail({ children, photo }: { children: React.ReactNode; photo?: string }) {
  return (
    <aside
      className={photo ? `${s.rail} ${s.railPhoto}` : s.rail}
      style={photo ? { backgroundImage: `url(${photo})` } : undefined}
    >
      <div className={s.railInner}>
        <span className={s.railQuoteMark}>&ldquo;</span>
        <p className={s.railQuote}>{children}</p>
      </div>
      <span className={s.railMark}>
        <MambaMark size={40} color="var(--bg)" />
      </span>
    </aside>
  )
}

export default async function RifPlaybookPage({
  searchParams,
}: {
  searchParams: Promise<{ k?: string }>
}) {
  const { k } = await searchParams
  const lead = await resolveGuide(k)
  // Valid token → a real recipient. Otherwise allow a signed-in admin to
  // preview; everyone else 404s (unguessable + gated, not just obscure).
  if (!lead) {
    const admin = await getAdminUser()
    if (!admin) notFound()
  } else {
    await logView(k as string, await headers())
  }

  return (
    <div className={s.deck}>
      <div className={s.toolbar}>
        <span className={s.toolbarTitle}>The Ultimate RIF Playbook</span>
        <DownloadButton />
      </div>

      {/* 1 — COVER */}
      <section className={s.slide}>
        <div className={s.cover}>
          <div className={s.coverText}>
            <div className={s.logo}>
              <MambaMark size={34} color="var(--gold)" title="MambaHR" />
              <span className={s.logoWord}>MambaHR</span>
            </div>
            <div className={s.coverMain}>
              <div className={s.coverKicker}>The Ultimate</div>
              <h1 className={s.coverTitle}>
                RIF<span className={s.accent}>Playbook</span>
              </h1>
              <div className={s.coverRule} />
              <p className={s.coverSub}>
                How to run layoffs the right way — legally, humanely, and efficiently.
              </p>
            </div>
            <div className={s.coverPowered}>Powered by MambaHR</div>
          </div>
          <div className={s.coverPhoto} style={{ backgroundImage: 'url(/v2-people/team.jpg)' }} />
        </div>
      </section>

      {/* 2 — WHY THIS PLAYBOOK EXISTS */}
      <section className={s.slide}>
        <div className={s.content}>
          <div className={s.body}>
            <div className={s.head} style={{ padding: 0 }}>
              <h2 className={s.title}>
                Why this <span className={s.accent}>playbook exists</span>
              </h2>
            </div>
            <p className={s.p} style={{ marginTop: '2cqw' }}>
              Let&rsquo;s be real — <strong>layoffs are brutal</strong>. No one wants to do them, and when
              they&rsquo;re done wrong the damage isn&rsquo;t just legal — it&rsquo;s personal. Yet most teams still
              run RIFs on spreadsheets that go out of sync, manager inputs buried in Slack, last-minute legal
              redlines, and no audit trail for why decisions were made.
            </p>
            <div className={s.leadLabel}>Here&rsquo;s what you&rsquo;ll take away</div>
            <ul className={s.takeaways}>
              <li className={s.takeaway}>A compliance-first process that removes guesswork</li>
              <li className={s.takeaway}>Structured rationale + scoring frameworks to reduce bias</li>
              <li className={s.takeaway}>Templates for role selection, manager messaging, and documentation</li>
              <li className={s.takeaway}>Legal-ready agreement language and post-RIF checklists</li>
            </ul>
          </div>
          <Rail photo="/v2-people/team2.jpg">
            Built by HR and legal leaders — so you only need to run this process <em>once</em>.
          </Rail>
        </div>
        <Chrome page={2} />
      </section>

      {/* 3 — WORKFLOW */}
      <section className={s.slide}>
        <div className={s.content}>
          <div className={s.body}>
            <h2 className={s.title}>
              Our proven <span className={s.accent}>RIF workflow</span>
            </h2>
            <p className={s.sub}>Seven steps, one system of record — start to finish.</p>
            <div className={s.flow}>
              {['Define scope', 'Legal sync', 'Manager input', 'Selection', 'Agreements', 'Comms', 'Offboarding'].map(
                (step, i) => (
                  <div key={step} className={s.step}>
                    <span className={s.stepNum}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={s.stepLabel}>{step}</span>
                  </div>
                ),
              )}
            </div>
          </div>
          <Rail>
            This entire workflow runs <em>inside MambaHR</em>.
          </Rail>
        </div>
        <Chrome page={3} />
      </section>

      {/* 4 — LEGALLY REQUIRED */}
      <section className={s.slide}>
        <div className={s.content}>
          <div className={s.body}>
            <h2 className={s.title}>
              What you&rsquo;re <span className={s.accent}>legally required to do</span>
            </h2>
            <p className={s.sub}>The federal floor for any reduction in force.</p>
            <div className={s.checklist}>
              {['WARN Act', 'OWBPA (age 40+)', 'ADEA', 'Final pay', 'COBRA', 'Return of property'].map((c) => (
                <div key={c} className={s.checkItem}>
                  <span className={s.checkbox} />
                  {c}
                </div>
              ))}
            </div>
          </div>
          <Rail>
            MambaHR includes these clauses in <em>every agreement</em>.
          </Rail>
        </div>
        <Chrome page={4} />
      </section>

      {/* 5 — RATIONALE TYPES */}
      <section className={s.slide}>
        <div className={s.content}>
          <div className={s.body}>
            <h2 className={s.title}>
              Rationale types <span className={s.accent}>you can use</span>
            </h2>
            <p className={s.sub}>Document the business rationale for each impacted role — clearly and consistently.</p>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Rationale</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Skill mismatch', 'Role now requires SaaS analytics expertise'],
                  ['Span / layer', 'Middle layer removed to flatten the org'],
                  ['Redundancy', 'Overlap after a recent acquisition'],
                  ['Performance', 'Documented underperformance over 2 quarters'],
                  ['Salary', '20%+ above peer group'],
                  ['Tenure', 'Least tenured in a comparable function'],
                  ['Location', 'In-office requirement, role is remote-only'],
                  ['Business shift', 'Work is now outsourced'],
                ].map(([r, e]) => (
                  <tr key={r}>
                    <td>{r}</td>
                    <td>{e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Rail>
            MambaHR is built with frameworks aligned to <em>legal best practices</em>.
          </Rail>
        </div>
        <Chrome page={5} />
      </section>

      {/* 6 — SELECTION SCORING */}
      <section className={s.slide}>
        <div className={s.content}>
          <div className={s.body}>
            <h2 className={s.title}>
              Score selection <span className={s.accent}>without bias</span>
            </h2>
            <p className={s.sub}>Managers rate each role on the same scale — MambaHR averages the score.</p>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>KPI rating (1–5)</th>
                  <th>Soft skills (1–5)</th>
                  <th>Selection score (avg)</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className={s.tableEmpty}>
                    <td />
                    <td />
                    <td />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Rail>
            Managers input rationale &amp; ratings — MambaHR <em>guides selection</em> with ease.
          </Rail>
        </div>
        <Chrome page={6} />
      </section>

      {/* 7 — COMPENSATION RISK */}
      <section className={s.slide}>
        <div className={s.content}>
          <div className={s.body}>
            <h2 className={s.title}>
              Identify <span className={s.accent}>compensation risk</span>
            </h2>
            <p className={s.sub}>Review pay across similar roles to surface high-cost outliers.</p>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Name</th>
                  <th>Salary</th>
                  <th>Top 10% (Y/N)</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className={s.tableEmpty}>
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Rail>
            Compare salaries to spot outliers across roles — instantly, <em>with MambaHR</em>.
          </Rail>
        </div>
        <Chrome page={7} />
      </section>

      {/* 8 — MODEL IMPACT */}
      <section className={s.slide}>
        <div className={s.content}>
          <div className={s.body}>
            <h2 className={s.title}>
              Model every <span className={s.accent}>decision&rsquo;s impact</span>
            </h2>
            <p className={s.sub}>See the downstream effect before you commit.</p>
            <div className={s.tiles}>
              {[
                { t: 'Payroll reduction', d: 'M12 5v13M6 12l6 6 6-6' },
                { t: 'WARN triggers', d: 'M12 4l9 16H3zM12 10v4M12 17h.01' },
                { t: 'Impact analysis', d: 'M4 19V5M4 19h16M8 16l3.5-4 3 2.5L20 8' },
                { t: 'OWBPA tracking', d: 'M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6zM9 12l2 2 4-4' },
              ].map((tile) => (
                <div key={tile.t} className={s.tile}>
                  <span className={s.tileIcon}>
                    <svg width="48%" height="48%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={tile.d} />
                    </svg>
                  </span>
                  <span className={s.tileLabel}>{tile.t}</span>
                </div>
              ))}
            </div>
          </div>
          <Rail photo="/v2-people/feat.jpg">
            Real-time dashboards power confident, <em>data-backed decisions</em>.
          </Rail>
        </div>
        <Chrome page={8} />
      </section>

      {/* 9 — SEVERANCE CLAUSES */}
      <section className={s.slide}>
        <div className={s.content}>
          <div className={s.body}>
            <h2 className={s.title}>
              Key clauses in a <span className={s.accent}>compliant severance agreement</span>
            </h2>
            <p className={s.sub}>Every defensible agreement carries these.</p>
            <div className={s.clauses}>
              {['Severance', 'Expenses', 'Confidentiality', 'Return of property', 'COBRA', 'OWBPA'].map((c) => (
                <span key={c} className={s.clauseChip}>
                  {c}
                </span>
              ))}
            </div>
          </div>
          <Rail>
            MambaHR agreements include every clause shown here, <em>by default</em>.
          </Rail>
        </div>
        <Chrome page={9} />
      </section>

      {/* 10 — MESSAGING TEMPLATES */}
      <section className={s.slide}>
        <div className={s.content}>
          <div className={s.body}>
            <h2 className={s.title}>
              Messaging templates <span className={s.accent}>for every conversation</span>
            </h2>
            <p className={s.sub}>What to say — and what to avoid — at each step.</p>
            <div className={s.matrix}>
              <div />
              <div className={s.matrixHead}>Do</div>
              <div className={s.matrixHead}>Don&rsquo;t</div>
              {['Audience', 'Goal', 'Examples'].map((row) => (
                <Fragment key={row}>
                  <div className={s.matrixRowLabel}>{row}</div>
                  <div className={s.matrixCell} />
                  <div className={s.matrixCell} />
                </Fragment>
              ))}
            </div>
          </div>
          <Rail>
            Pre-written templates guide <em>every RIF conversation</em>.
          </Rail>
        </div>
        <Chrome page={10} />
      </section>

      {/* 11 — FINAL STEPS */}
      <section className={s.slide}>
        <div className={s.content}>
          <div className={s.body}>
            <h2 className={s.title}>
              Final steps for a <span className={s.accent}>compliant RIF</span>
            </h2>
            <p className={s.sub}>The items HR must confirm — MambaHR tracks them automatically.</p>
            <div className={s.checklist}>
              {[
                'Final pay',
                'Signed agreements',
                'COBRA',
                'OWBPA',
                'State-specific requirements',
                'HRIS + payroll updates',
              ].map((c) => (
                <div key={c} className={s.checkItem}>
                  <span className={s.checkbox} />
                  {c}
                </div>
              ))}
            </div>
          </div>
          <Rail photo="/v2-people/team2.jpg">
            Our dashboard tracks all of this <em>automatically</em>.
          </Rail>
        </div>
        <Chrome page={11} />
      </section>

      {/* 12 — BEFORE / AFTER */}
      <section className={s.slide}>
        <div className={s.head}>
          <h2 className={s.title}>
            From manual chaos <span className={s.accent}>to structured clarity</span>
          </h2>
        </div>
        <div className={s.beforeAfter}>
          <div className={`${s.baCol} ${s.baBefore}`}>
            <h3 className={s.baTitle}>Before MambaHR</h3>
            <p className={s.baTag}>Chaos — emails, word of mouth, last-minute legal</p>
            <ul className={s.baList}>
              <li className={s.baItem}>Manager inputs sent over Slack, often incomplete</li>
              <li className={s.baItem}>Spreadsheets passed between HR, Legal, and Finance</li>
              <li className={s.baItem}>Legal reviewing documents the night before</li>
              <li className={s.baItem}>No audit trail or consistency in rationale or pay</li>
              <li className={s.baItem}>HR left chasing answers and updates manually</li>
            </ul>
          </div>
          <div className={`${s.baCol} ${s.baAfter}`}>
            <h3 className={s.baTitle}>After MambaHR</h3>
            <p className={s.baTag}>Structure — clear options, generated PDFs, tracking</p>
            <ul className={s.baList}>
              <li className={s.baItem}>Managers select rationale and input ratings in one place</li>
              <li className={s.baItem}>Department sheets sync to a centralized dashboard</li>
              <li className={s.baItem}>Agreements + OWBPA disclosures generated automatically</li>
              <li className={s.baItem}>Salary, tenure, and impact tracked in real time</li>
              <li className={s.baItem}>Everything documented, stored, and audit-ready</li>
            </ul>
          </div>
        </div>
        <Chrome page={12} />
      </section>

      {/* 13 — CTA */}
      <section className={s.slide}>
        <div className={s.cta}>
          <div className={s.ctaText}>
            <div className={s.logo}>
              <MambaMark size={30} color="var(--gold)" title="MambaHR" />
              <span className={s.logoWord}>MambaHR</span>
            </div>
            <h2 className={s.ctaLede} style={{ marginTop: '3cqw' }}>
              Ready to lead with <span style={{ color: 'var(--gold)' }}>clarity and confidence</span>?
            </h2>
            <p className={s.p}>
              MambaHR runs a compliant, defensible, people-first layoff — without spreadsheets, scattered
              inputs, or last-minute legal panic. From structured manager rationale to OWBPA-ready severance
              agreements, it automates every step and shows the business impact in real time.
            </p>
            <p className={s.p}>
              Teams using MambaHR have cut RIF prep time by up to <strong>70%</strong>, closed documentation
              gaps, and delivered a more thoughtful experience for everyone involved.
            </p>
            <a className={s.ctaBtn} href="https://mambahr.com">
              Get started at mambahr.com →
            </a>
          </div>
          <div className={s.ctaPhoto} style={{ backgroundImage: 'url(/v2-people/team.jpg)' }} />
        </div>
        <Chrome page={13} />
      </section>
    </div>
  )
}
