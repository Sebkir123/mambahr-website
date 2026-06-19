'use client'

import { useState } from 'react'
import styles from './site.module.css'

type Point = { label: string; visits: number; widget: number; conversation: number; signup: number }
const SERIES = [
  { key: 'visits', label: 'Visits', color: 'var(--gold)' },
  { key: 'widget', label: 'Widget', color: 'var(--violet)' },
  { key: 'conversation', label: 'Conversations', color: 'var(--color-green)' },
  { key: 'signup', label: 'Signups', color: '#d98a2b' },
] as const

// Interactive multi-series traffic chart: gridlines + y-axis, a visits area/line
// plus thin event lines, a legend with totals, and a hover guide + tooltip.
export function TrafficChart({ data, tz }: { data: Point[]; tz: string }) {
  const [hover, setHover] = useState<number | null>(null)
  const w = 1000
  const h = 240
  const padL = 30
  const padR = 12
  const padT = 14
  const padB = 26
  const n = data.length
  const max = Math.max(1, ...data.flatMap((d) => [d.visits, d.widget, d.conversation, d.signup]))
  // Nice-ish y ticks (4 steps).
  const step = Math.max(1, Math.ceil(max / 4))
  const top = step * 4
  const x = (i: number) => padL + (n > 1 ? (i * (w - padL - padR)) / (n - 1) : 0)
  const y = (v: number) => padT + (1 - v / top) * (h - padT - padB)
  const path = (key: keyof Point) =>
    data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d[key] as number).toFixed(1)}`).join(' ')
  const labelEvery = Math.ceil(n / 12)
  const totals = SERIES.map((s) => ({ ...s, total: data.reduce((acc, d) => acc + (d[s.key] as number), 0) }))

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - r.left) / r.width
    setHover(Math.max(0, Math.min(n - 1, Math.round(ratio * (n - 1)))))
  }

  return (
    <div className={styles.chartLegendWrap}>
      <div className={styles.legend}>
        {totals.map((s) => (
          <span key={s.key}>
            <span className={styles.legendDot} style={{ background: s.color }} /> {s.label} {s.total}
          </span>
        ))}
      </div>
      <div className={styles.chartBox} onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        <svg viewBox={`0 0 ${w} ${h}`} className={styles.chart} preserveAspectRatio="none">
          <defs>
            <linearGradient id="tlFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* gridlines + y labels */}
          {[0, 1, 2, 3, 4].map((t) => {
            const v = step * t
            return (
              <g key={t}>
                <line x1={padL} y1={y(v)} x2={w - padR} y2={y(v)} stroke="var(--border-faint)" strokeDasharray={t === 0 ? '0' : '3 4'} />
                <text x={padL - 6} y={y(v) + 3} textAnchor="end" className={styles.axis}>{v}</text>
              </g>
            )
          })}
          {/* x labels */}
          {data.map((d, i) => (i % labelEvery === 0 ? <text key={i} x={x(i)} y={h - 8} textAnchor="middle" className={styles.axis}>{d.label}</text> : null))}
          {/* visits area + line */}
          <path d={`${path('visits')} L${x(n - 1)},${y(0)} L${x(0)},${y(0)} Z`} fill="url(#tlFill)" />
          <path d={path('visits')} fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          {/* event lines (thin) */}
          {(['widget', 'conversation', 'signup'] as const).map((k) => {
            const s = SERIES.find((x) => x.key === k)!
            if (totals.find((t) => t.key === k)!.total === 0) return null
            return <path key={k} d={path(k)} fill="none" stroke={s.color} strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" />
          })}
          {/* hover guide */}
          {hover != null && (
            <>
              <line x1={x(hover)} y1={padT} x2={x(hover)} y2={h - padB} stroke="var(--border-mid)" />
              <circle cx={x(hover)} cy={y(data[hover].visits)} r="4" fill="var(--gold)" stroke="var(--bg)" strokeWidth="2" />
            </>
          )}
        </svg>
        {hover != null && (
          <div
            className={styles.tooltip}
            style={{ left: `${(hover / Math.max(1, n - 1)) * 100}%`, transform: `translateX(${hover > n / 2 ? '-105%' : '5%'})` }}
          >
            <div className={styles.tooltipHead}>{data[hover].label} · {tz}</div>
            {SERIES.map((s) => (
              <div key={s.key} className={styles.tooltipRow}>
                <span className={styles.legendDot} style={{ background: s.color }} />
                <span className={styles.tooltipLabel}>{s.label}</span>
                <span className={styles.tooltipVal}>{data[hover][s.key] as number}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
