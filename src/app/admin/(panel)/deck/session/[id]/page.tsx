import Link from 'next/link'
import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { getDeckSession } from '@/lib/admin-deck'
import ui from '../../../admin-ui.module.css'
import styles from '../../deck.module.css'

export const dynamic = 'force-dynamic'

function dur(ms: number): string {
  const s = Math.round(ms / 1000)
  if (s < 60) return `${s}s`
  return `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`
}

function when(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default async function DeckSessionPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params
  const s = await getDeckSession(id)
  if (!s) notFound()

  const maxDwell = Math.max(1, ...s.timeline.map((t) => t.dwellMs))
  const tier = s.engagement >= 70 ? 'high' : s.engagement >= 40 ? 'mid' : 'low'

  return (
    <>
      <div className={ui.header}>
        <div>
          <Link href="/admin/deck" className={styles.backLink}>
            ← Deck analytics
          </Link>
          <h1 className={ui.h1}>{s.recipient ?? 'Anonymous viewer'}</h1>
          <p className={ui.subtitle}>
            {[s.org, when(s.startedAt)].filter(Boolean).join(' · ')}
          </p>
        </div>
        <span className={`${styles.scoreLg} ${styles[`score_${tier}`]}`} title="Composite engagement (0–100)">
          {s.engagement}
        </span>
      </div>

      <div className={styles.totals}>
        <Stat label="Attention" value={dur(s.activeMs)} sub="active / focused time" />
        <Stat label="On screen" value={dur(s.durationMs)} sub="wall-clock" />
        <Stat
          label="Reached"
          value={s.totalSlides ? `${Math.min(s.maxSlide + 1, s.totalSlides)}/${s.totalSlides}` : s.maxSlide + 1}
          sub="furthest slide"
        />
        <Stat label="Exited on" value={`#${s.lastSlide + 1}`} sub="last slide seen" />
        <Stat label="Revisits" value={s.revisits} sub="slides re-opened" />
      </div>

      <div className={ui.card}>
        <div className={styles.cardHead}>
          <h2 className={styles.cardTitle}>Context</h2>
        </div>
        <dl className={styles.meta}>
          <div><dt>Location</dt><dd>{s.location}</dd></div>
          <div><dt>Network</dt><dd>{s.org_network ?? '—'}</dd></div>
          <div><dt>Device</dt><dd>{[s.device, s.browser, s.os].filter(Boolean).join(' · ') || '—'}</dd></div>
          <div><dt>Referrer</dt><dd>{s.referrer ?? 'Direct'}</dd></div>
          {s.mostRevisited && (
            <div>
              <dt>Most re-opened</dt>
              <dd>
                {s.mostRevisited.title ?? `Slide ${s.mostRevisited.index + 1}`} · {s.mostRevisited.visits}×
              </dd>
            </div>
          )}
        </dl>
      </div>

      <div className={ui.card}>
        <div className={styles.cardHead}>
          <h2 className={styles.cardTitle}>Timeline</h2>
          <span className={styles.cardHint}>Every slide visit, in order · bar = time on that visit</span>
        </div>
        {s.timeline.length === 0 ? (
          <p className={styles.empty}>
            Opened, but no slide-level telemetry was recorded (tracking blocked, or they left immediately).
          </p>
        ) : (
          <ol className={styles.timeline}>
            {s.timeline.map((t, i) => (
              <li key={i} className={styles.timelineRow}>
                <span className={styles.timelineIdx}>{String(t.index + 1).padStart(2, '0')}</span>
                <span className={styles.timelineTitle}>{t.title ?? `Slide ${t.index + 1}`}</span>
                <span className={styles.timelineBarTrack}>
                  <span
                    className={styles.timelineBar}
                    style={{ width: `${Math.round((t.dwellMs / maxDwell) * 100)}%` }}
                  />
                </span>
                <span className={styles.timelineDwell}>{dur(t.dwellMs)}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  )
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
