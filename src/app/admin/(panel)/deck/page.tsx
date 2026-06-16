import { requireAdmin } from '@/lib/auth'
import { getDeckAnalytics } from '@/lib/admin-deck'
import { DECK_SLUG } from '@/lib/deck-links'
import { createDeckLink } from './actions'
import { DeckLinks } from './deck-links-client'
import ui from '../admin-ui.module.css'
import styles from './deck.module.css'

export const dynamic = 'force-dynamic'

const SLIDE_TITLES = [
  'Title',
  'The problem',
  'Why now',
  'The paradigm shift',
  'The product',
  'How it works',
  'The moat',
  'Traction',
  'Business model',
  'Market',
  'Team',
  'The ask',
]

function dur(ms: number): string {
  const s = Math.round(ms / 1000)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

function when(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className={styles.total}>
      <span className={styles.totalValue}>{value}</span>
      <span className={styles.totalLabel}>{label}</span>
      {sub && <span className={styles.totalSub}>{sub}</span>}
    </div>
  )
}

export default async function DeckAdminPage() {
  await requireAdmin()
  const a = await getDeckAnalytics()

  return (
    <>
      <div className={ui.header}>
        <div>
          <h1 className={ui.h1}>Deck</h1>
          <p className={ui.subtitle}>Per-recipient links + who opened the investor deck</p>
        </div>
      </div>

      {a.warnings.length > 0 && <div className={styles.notice}>{a.warnings[0]}</div>}

      <div className={styles.totals}>
        <Stat label="Views" value={a.totals.views} />
        <Stat label="Identified" value={a.totals.identified} sub="via recipient link" />
        <Stat label="Anonymous" value={a.totals.anonymous} sub="admin preview / no token" />
        <Stat label="Recipients" value={a.totals.recipients} sub="distinct viewers" />
        <Stat label="Avg time" value={dur(a.totals.avgDurationMs)} sub="per view" />
        <Stat label="Completed" value={`${a.totals.completionPct}%`} sub="reached last slide" />
      </div>

      <div className={ui.card}>
        <div className={styles.cardHead}>
          <h2 className={styles.cardTitle}>Recipient links</h2>
          <span className={styles.cardHint}>Each link gates the deck + identifies the viewer</span>
        </div>
        <form action={createDeckLink} className={styles.createForm}>
          <input
            name="recipient_name"
            placeholder="Recipient name (e.g. Jane Doe)"
            className={styles.input}
            required
            maxLength={120}
          />
          <input name="recipient_org" placeholder="Org (optional)" className={styles.input} maxLength={120} />
          <button type="submit" className={styles.createBtn}>
            Create link
          </button>
        </form>
        <DeckLinks links={a.links} slug={DECK_SLUG} />
      </div>

      <div className={ui.card}>
        <div className={styles.cardHead}>
          <h2 className={styles.cardTitle}>Slide funnel</h2>
          <span className={styles.cardHint}>How far viewers get · avg time per slide</span>
        </div>
        <ul className={styles.funnel}>
          {a.funnel.map((f) => (
            <li key={f.index} className={styles.funnelRow}>
              <span className={styles.funnelLabel}>
                {String(f.index + 1).padStart(2, '0')} · {SLIDE_TITLES[f.index] ?? `Slide ${f.index + 1}`}
              </span>
              <span className={styles.funnelBarTrack}>
                <span className={styles.funnelBar} style={{ width: `${f.reachPct}%` }} />
              </span>
              <span className={styles.funnelPct}>{f.reachPct}%</span>
              <span className={styles.funnelDwell}>{dur(f.avgDwellMs)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={ui.card}>
        <div className={styles.cardHead}>
          <h2 className={styles.cardTitle}>Recent views</h2>
          <span className={styles.cardHint}>{a.sessions.length} sessions</span>
        </div>
        {a.sessions.length === 0 ? (
          <p className={styles.empty}>No views yet.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Who</th>
                  <th>When</th>
                  <th>Location</th>
                  <th>Device</th>
                  <th>Time</th>
                  <th>Reached</th>
                </tr>
              </thead>
              <tbody>
                {a.sessions.map((sn) => (
                  <tr key={sn.id}>
                    <td>
                      {sn.recipient ? (
                        <>
                          <strong>{sn.recipient}</strong>
                          {sn.org ? ` · ${sn.org}` : ''}
                        </>
                      ) : (
                        <span className={styles.muted}>Anonymous</span>
                      )}
                    </td>
                    <td>{when(sn.startedAt)}</td>
                    <td>{sn.location}</td>
                    <td>{[sn.device, sn.browser, sn.os].filter(Boolean).join(' · ') || '—'}</td>
                    <td>{dur(sn.durationMs)}</td>
                    <td>
                      {sn.totalSlides
                        ? `${Math.min(sn.maxSlide + 1, sn.totalSlides)}/${sn.totalSlides}`
                        : sn.maxSlide + 1}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
