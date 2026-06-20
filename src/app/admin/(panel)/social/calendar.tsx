'use client'

import { useMemo, useState } from 'react'
import styles from './social.module.css'

// A scheduled post (or a recently published one) placed on a calendar day. We
// show scheduled + published so managers can see cadence at a glance and spot
// gaps or pile-ups before they hit publish.
export type CalEvent = {
  id: string
  body: string
  status: 'draft' | 'scheduled' | 'published' | 'failed'
  at: string | null // scheduled_at for scheduled, published_at for published
  account: string
}

const DOW = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function ymd(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function Calendar({ events }: { events: CalEvent[] }) {
  const now = new Date()
  const [cursor, setCursor] = useState({ y: now.getFullYear(), m: now.getMonth() })

  // Bucket events by local day key. Done per-cursor so month switches are cheap.
  const byDay = useMemo(() => {
    const map = new Map<string, CalEvent[]>()
    for (const e of events) {
      if (!e.at) continue
      const key = ymd(new Date(e.at))
      const list = map.get(key)
      if (list) list.push(e)
      else map.set(key, [e])
    }
    return map
  }, [events])

  // Build a Monday-first grid covering the visible month.
  const cells = useMemo(() => {
    const first = new Date(cursor.y, cursor.m, 1)
    const lead = (first.getDay() + 6) % 7 // days before the 1st (Mon=0)
    const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate()
    const out: { date: Date | null }[] = []
    for (let i = 0; i < lead; i++) out.push({ date: null })
    for (let d = 1; d <= daysInMonth; d++) out.push({ date: new Date(cursor.y, cursor.m, d) })
    while (out.length % 7 !== 0) out.push({ date: null })
    return out
  }, [cursor])

  const monthLabel = new Date(cursor.y, cursor.m, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const todayKey = ymd(now)
  const shift = (delta: number) => {
    const m = cursor.m + delta
    setCursor({ y: cursor.y + Math.floor(m / 12), m: ((m % 12) + 12) % 12 })
  }

  return (
    <div className={styles.cal}>
      <div className={styles.calHead}>
        <span className={styles.calMonth}>{monthLabel}</span>
        <div className={styles.calNav}>
          <button type="button" className={styles.calNavBtn} onClick={() => shift(-1)} aria-label="Previous month">‹</button>
          <button type="button" className={styles.calToday} onClick={() => setCursor({ y: now.getFullYear(), m: now.getMonth() })}>Today</button>
          <button type="button" className={styles.calNavBtn} onClick={() => shift(1)} aria-label="Next month">›</button>
        </div>
      </div>
      <div className={styles.calGrid}>
        {DOW.map((d) => (
          <span key={d} className={styles.calDow}>{d}</span>
        ))}
        {cells.map((c, i) => {
          if (!c.date) return <div key={`e${i}`} className={styles.calEmpty} />
          const key = ymd(c.date)
          const dayEvents = byDay.get(key) ?? []
          return (
            <div key={key} className={key === todayKey ? `${styles.calCell} ${styles.calCellToday}` : styles.calCell}>
              <span className={styles.calDate}>{c.date.getDate()}</span>
              <div className={styles.calEvents}>
                {dayEvents.slice(0, 3).map((e) => (
                  <span
                    key={e.id}
                    className={`${styles.calEvent} ${e.status === 'published' ? styles.calEventDone : styles.calEventSched}`}
                    title={`${e.account}: ${e.body.slice(0, 120)}`}
                  >
                    {e.at ? new Date(e.at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : ''} {e.body.slice(0, 24)}
                  </span>
                ))}
                {dayEvents.length > 3 && <span className={styles.calMore}>+{dayEvents.length - 3} more</span>}
              </div>
            </div>
          )
        })}
      </div>
      <div className={styles.calLegend}>
        <span className={styles.calLegendItem}><span className={`${styles.calDotKey} ${styles.calEventSched}`} />Scheduled</span>
        <span className={styles.calLegendItem}><span className={`${styles.calDotKey} ${styles.calEventDone}`} />Published</span>
      </div>
    </div>
  )
}
