import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getSiteAnalytics, fmtDur, type SiteProperty, type Range, type Tz } from '@/lib/site-analytics'
import { SessionsTable } from './sessions-table'
import { SiteControls } from './site-controls'
import ui from '../admin-ui.module.css'
import styles from './site.module.css'

export const dynamic = 'force-dynamic'

type View = 'real' | 'all' | 'bots'

let regionNames: Intl.DisplayNames | null = null
function countryName(cc: string | null): string {
  if (!cc) return 'Unknown'
  try {
    regionNames = regionNames ?? new Intl.DisplayNames(['en'], { type: 'region' })
    return regionNames.of(cc.toUpperCase()) ?? cc
  } catch {
    return cc
  }
}
function flag(cc: string | null): string {
  if (!cc || cc.length !== 2) return '🌐'
  const A = 0x1f1e6
  return String.fromCodePoint(A + (cc.toUpperCase().charCodeAt(0) - 65), A + (cc.toUpperCase().charCodeAt(1) - 65))
}

function Timeline({ data }: { data: { label: string; visits: number; events: number }[] }) {
  const w = 1000
  const h = 200
  const pad = 24
  const max = Math.max(1, ...data.map((d) => d.visits))
  const n = data.length
  const x = (i: number) => pad + (n > 1 ? (i * (w - pad * 2)) / (n - 1) : 0)
  const y = (v: number) => h - pad - (v / max) * (h - pad * 2)
  const line = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d.visits).toFixed(1)}`).join(' ')
  const area = `${line} L${x(n - 1).toFixed(1)},${h - pad} L${x(0).toFixed(1)},${h - pad} Z`
  const labelEvery = Math.ceil(n / 12)
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={styles.chart} preserveAspectRatio="none">
      <defs>
        <linearGradient id="tlFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="var(--border-faint)" />
      <path d={area} fill="url(#tlFill)" />
      <path d={line} fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {data.map((d, i) =>
        i % labelEvery === 0 ? (
          <text key={i} x={x(i)} y={h - 6} textAnchor="middle" className={styles.axis}>{d.label}</text>
        ) : null,
      )}
    </svg>
  )
}

function Heatmap({ grid }: { grid: number[][] }) {
  const max = Math.max(1, ...grid.flat())
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return (
    <div className={styles.heat}>
      <span />
      {Array.from({ length: 24 }, (_, hLabel) => (
        <span key={`h${hLabel}`} className={styles.heatHourLabel}>{hLabel % 3 === 0 ? String(hLabel).padStart(2, '0') : ''}</span>
      ))}
      {grid.map((row, d) => (
        <Row key={d} label={days[d]} row={row} max={max} />
      ))}
    </div>
  )
}
function Row({ label, row, max }: { label: string; row: number[]; max: number }) {
  return (
    <>
      <span className={styles.heatDayLabel}>{label}</span>
      {row.map((v, hh) => (
        <span
          key={hh}
          className={styles.heatCell}
          title={`${label} ${String(hh).padStart(2, '0')}:00 — ${v} visit${v === 1 ? '' : 's'}`}
          style={v > 0 ? { background: `color-mix(in srgb, var(--gold) ${Math.round((v / max) * 100)}%, var(--bg-elevated))` } : undefined}
        />
      ))}
    </>
  )
}

export default async function SiteTrackingPage({
  searchParams,
}: {
  searchParams: Promise<{ property?: string; range?: string; view?: string; tz?: string }>
}) {
  const sp = await searchParams
  const property: SiteProperty = sp.property === 'deck' ? 'deck' : sp.property === 'lp' ? 'lp' : 'website'
  const range: Range = (['1h', '24h', '7d', '30d'] as const).includes(sp.range as Range) ? (sp.range as Range) : '24h'
  const view: View = sp.view === 'all' ? 'all' : sp.view === 'bots' ? 'bots' : 'real'
  const tz: Tz = (['ET', 'CT', 'MT', 'PT'] as const).includes(sp.tz as Tz) ? (sp.tz as Tz) : 'ET'

  const [, a] = await Promise.all([requireAdmin(), getSiteAnalytics(property, range, tz)])
  const t = a.totals

  const shown = a.sessions.filter((s) => (view === 'real' ? !s.isBot : view === 'bots' ? s.isBot : true))

  return (
    <>
      <div className={ui.header}>
        <div>
          <h1 className={ui.h1}>Site Tracking</h1>
          <p className={ui.subtitle}>
            {property === 'deck' ? 'Pitch deck' : 'Website'} · first-party, server-recorded · last {range}
          </p>
        </div>
        {property === 'deck' && (
          <Link href="/admin/deck" className={ui.btnGhost}>Slide-level analytics →</Link>
        )}
      </div>

      <SiteControls property={property} view={view} range={range} tz={tz} totals={{ all: t.all, real: t.real, bots: t.bots }} />

      {a.warnings.length > 0 && <div className={styles.notice}>{a.warnings[0]}</div>}

      <div className={styles.stats}>
        <div className={`${styles.stat} ${styles.statHero}`}>
          <div className={styles.statTop}>
            <span className={styles.statValue}>{t.engagementPct}%</span>
            <span className={styles.statLabel}>Engagement</span>
          </div>
          <span className={styles.statSub}>{t.real} real visitor{t.real === 1 ? '' : 's'} · {t.pageviews} views</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{t.real}</span>
          <span className={styles.statLabel}>Visitors</span>
          <span className={styles.statSub}>of {t.all} sessions</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{fmtDur(t.avgActiveMs)}</span>
          <span className={styles.statLabel}>Avg time</span>
          <span className={styles.statSub}>active / focused</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{t.avgScroll}%</span>
          <span className={styles.statLabel}>Avg scroll</span>
          <span className={styles.statSub}>depth reached</span>
        </div>
      </div>

      {t.bots > 0 && (
        <div className={styles.banner}>
          ⚠ Data quality: {t.botPct}% of sessions were flagged as bots ({t.bots} of {t.all}). The numbers above are for {t.real} real visitors.
        </div>
      )}

      <div className={styles.miniGrid}>
        <div className={styles.mini}>
          <div className={styles.miniLabel}>Scroll distribution</div>
          <div className={styles.distRow}>
            {([['>25%', a.scrollDist.gt25], ['>50%', a.scrollDist.gt50], ['>75%', a.scrollDist.gt75], ['100%', a.scrollDist.full]] as const).map(([k, v]) => (
              <div key={k} className={styles.distCol}><span className={styles.distPct}>{v}%</span><span className={styles.distKey}>{k}</span></div>
            ))}
          </div>
        </div>
        <div className={styles.mini}>
          <div className={styles.miniLabel}>Returning</div>
          <div className={styles.miniBig}>{t.returningPct}%</div>
          <div className={styles.miniSub}>of real visitors came back</div>
        </div>
        <div className={styles.mini}>
          <div className={styles.miniLabel}>Top country</div>
          <div className={styles.miniBig}>{a.topCountry ? `${flag(a.topCountry.name)} ${countryName(a.topCountry.name)}` : '—'}</div>
          <div className={styles.miniSub}>{a.topCountry ? `${a.topCountry.count} visitors (${a.topCountry.pct}%)` : 'no data'}</div>
        </div>
        <div className={styles.mini}>
          <div className={styles.miniLabel}>Top source</div>
          <div className={styles.miniBig} style={{ textTransform: 'capitalize' }}>{a.topSource ? a.topSource.name : '—'}</div>
          <div className={styles.miniSub}>{a.topSource ? `${a.topSource.count} visitors (${a.topSource.pct}%)` : 'no data'}</div>
        </div>
      </div>

      <section className={styles.panel}>
        <div className={styles.panelHead}>
          <h2 className={styles.panelTitle}>Traffic <span className={styles.statSub}>· {tz}</span></h2>
          <div className={styles.legend}>
            <span><span className={styles.legendDot} style={{ background: 'var(--gold)' }} /> Visits {t.real}</span>
            <span><span className={styles.legendDot} style={{ background: 'var(--violet)' }} /> Widget {a.events.widget}</span>
            <span><span className={styles.legendDot} style={{ background: 'var(--color-green)' }} /> Conversations {a.events.conversation}</span>
            <span><span className={styles.legendDot} style={{ background: '#d98a2b' }} /> Signups {a.events.signup}</span>
          </div>
        </div>
        <Timeline data={a.timeline} />
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHead}>
          <h2 className={styles.panelTitle}>Funnel</h2>
          <span className={styles.statSub}>real visitors · % of visits</span>
        </div>
        <div className={styles.funnel}>
          {a.funnel.map((f) => (
            <div key={f.label} className={styles.funnelStep}>
              <div className={styles.funnelBarTrack}>
                <div className={styles.funnelBar} style={{ width: `${f.pct}%` }} />
              </div>
              <div className={styles.funnelMeta}>
                <span className={styles.funnelLabel}>{f.label}</span>
                <span className={styles.funnelVal}>{f.count} · {f.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {a.topPages.length > 0 && (
        <section className={styles.panel}>
          <div className={styles.panelHead}>
            <h2 className={styles.panelTitle}>Top pages</h2>
            <span className={styles.statSub}>real visitors</span>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr><th>Path</th><th>Views</th><th>Avg time</th><th>Avg scroll</th></tr>
              </thead>
              <tbody>
                {a.topPages.map((p) => (
                  <tr key={p.path}>
                    <td>
                      <span className={styles.loc}>{p.path}</span>
                      {p.title && <div className={styles.locSub}>{p.title}</div>}
                    </td>
                    <td className={styles.mono}>{p.views}</td>
                    <td className={styles.mono}>{fmtDur(p.avgDwellMs)}</td>
                    <td className={styles.mono}>{p.avgScroll}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className={styles.panel}>
        <div className={styles.panelHead}>
          <h2 className={styles.panelTitle}>
            {view === 'bots' ? 'Bot sessions' : view === 'all' ? 'All sessions' : 'Visitors'} ({shown.length})
          </h2>
        </div>
        {(a.breakdown.countries.length > 0 || a.breakdown.devices.length > 0 || a.breakdown.sources.length > 0) && (
          <div className={styles.bd}>
            <Chips label="Country" items={a.breakdown.countries.map((c) => ({ label: `${flag(c.key)} ${countryName(c.key)}`, n: c.n }))} />
            <Chips label="Device" items={a.breakdown.devices.map((d) => ({ label: d.key, n: d.n }))} />
            <Chips label="Source" items={a.breakdown.sources.map((s) => ({ label: s.key, n: s.n }))} />
          </div>
        )}
        <SessionsTable sessions={shown} />
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHead}>
          <h2 className={styles.panelTitle}>Weekday × hour</h2>
          <span className={styles.statSub}>When real visitors come ({tz})</span>
        </div>
        <Heatmap grid={a.heatmap} />
      </section>
    </>
  )
}

function Chips({ label, items }: { label: string; items: { label: string; n: number }[] }) {
  if (items.length === 0) return null
  return (
    <div className={styles.bdRow}>
      <span className={styles.bdLabel}>{label}</span>
      {items.map((it, i) => (
        <span key={i} className={styles.bdChip}>
          <span style={{ textTransform: label === 'Source' || label === 'Device' ? 'capitalize' : 'none' }}>{it.label}</span>
          <strong>{it.n}</strong>
        </span>
      ))}
    </div>
  )
}
