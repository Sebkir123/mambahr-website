import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getDeckAnalytics } from '@/lib/admin-deck'
import { DECK_SLUG } from '@/lib/deck-links'
import { DECK_SLIDE_TITLES as SLIDE_TITLES } from '@/lib/deck-slides'
import { createDeckLink } from './actions'
import { DeckLinks } from './deck-links-client'
import ui from '../admin-ui.module.css'
import styles from './deck.module.css'

export const dynamic = 'force-dynamic'

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
          <p className={ui.subtitle}>
            Per-recipient links + who opened the investor deck ·{' '}
            <code className={styles.deckPath}>/{DECK_SLUG}</code>
          </p>
        </div>
        <a href={`/${DECK_SLUG}`} target="_blank" rel="noopener noreferrer" className={ui.btnPrimary}>
          Preview deck ↗
        </a>
      </div>

      {a.warnings.length > 0 && <div className={styles.notice}>{a.warnings[0]}</div>}

      {a.totals.opens === 0 && (
        <div className={styles.hint}>
          <strong>Nothing tracked yet — and that&rsquo;s expected.</strong> Your own previews
          while signed in here are never counted. Tracking starts when someone opens a{' '}
          <em>recipient link</em> from outside this admin (a real investor, or you in a logged-out /
          incognito window). Create a link below, share it, and opens, attention, and the slide
          funnel will fill in here.
        </div>
      )}

      <div className={styles.totals}>
        <Stat label="Opens" value={a.totals.opens} sub="server-side · beacon-proof" />
        <Stat label="Tracked" value={a.totals.views} sub="sessions with detail" />
        <Stat label="Identified" value={a.totals.identified} sub="via recipient link" />
        <Stat label="Recipients" value={a.totals.recipients} sub="distinct viewers" />
        <Stat label="Forwarded" value={a.totals.forwarded} sub="links opened on 2+ networks" />
        <Stat label="Avg attention" value={dur(a.totals.avgActiveMs)} sub="active time / view" />
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
          <span className={styles.cardHint}>{a.sessions.length} sessions · click a row for the full timeline</span>
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
                  <th>Location · Network</th>
                  <th>Device</th>
                  <th>Attention</th>
                  <th>Reached</th>
                  <th>Engagement</th>
                </tr>
              </thead>
              <tbody>
                {a.sessions.map((sn) => (
                  <tr key={sn.id} className={styles.rowLink}>
                    <td>
                      <Link href={`/admin/deck/session/${sn.id}`} className={styles.rowAnchor}>
                        {sn.recipient ? (
                          <>
                            <strong>{sn.recipient}</strong>
                            {sn.org ? ` · ${sn.org}` : ''}
                          </>
                        ) : (
                          <span className={styles.muted}>Anonymous</span>
                        )}
                      </Link>
                    </td>
                    <td>{when(sn.startedAt)}</td>
                    <td>
                      {sn.location}
                      {sn.org_network && <span className={styles.network}>{sn.org_network}</span>}
                    </td>
                    <td>{[sn.device, sn.browser, sn.os].filter(Boolean).join(' · ') || '—'}</td>
                    <td title={`${dur(sn.durationMs)} on screen`}>{dur(sn.activeMs)}</td>
                    <td>
                      {sn.totalSlides
                        ? `${Math.min(sn.maxSlide + 1, sn.totalSlides)}/${sn.totalSlides}`
                        : sn.maxSlide + 1}
                    </td>
                    <td>
                      <Engagement score={sn.engagement} />
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

function Engagement({ score }: { score: number }) {
  const tier = score >= 70 ? 'high' : score >= 40 ? 'mid' : 'low'
  return (
    <span className={`${styles.score} ${styles[`score_${tier}`]}`} title="Composite engagement (0–100)">
      {score}
    </span>
  )
}
