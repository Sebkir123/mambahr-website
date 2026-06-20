'use client'

import { type BlogPostAnalytics, formatReadTime, compact } from '@/lib/blog-analytics-types'
import styles from './editor.module.css'

// Read analytics for a single post, rendered in the editor sidebar. All numbers
// are real (non-bot) reads from the first-party site tracker.
export default function PostAnalytics({ a, published }: { a: BlogPostAnalytics; published: boolean }) {
  if (!published && a.views === 0) {
    return (
      <section className={styles.panel}>
        <h3 className={styles.panelTitle}>Reads</h3>
        <p className={styles.analyticsEmpty}>
          No reads yet. Once this post is published and people visit it, reads, readers, and time-on-page
          show up here.
        </p>
      </section>
    )
  }

  const peak = Math.max(1, ...a.series.map((d) => d.views))

  return (
    <section className={styles.panel}>
      <h3 className={styles.panelTitle}>Reads</h3>

      <div className={styles.metricGrid}>
        <Metric label="Reads" value={compact(a.views)} />
        <Metric label="Readers" value={compact(a.readers)} />
        <Metric label="Avg read" value={formatReadTime(a.avgReadMs)} />
        <Metric label="Finished" value={`${a.completionPct}%`} hint="scrolled past 75%" />
      </div>

      {a.series.length > 0 && (
        <div className={styles.sparkBlock}>
          <span className={styles.sparkLabel}>Last 30 days</span>
          <div className={styles.spark}>
            {a.series.map((d) => (
              <span
                key={d.day}
                className={styles.sparkBar}
                style={{ height: `${Math.max(6, Math.round((d.views / peak) * 100))}%` }}
                title={`${new Date(d.day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: ${d.views} read${d.views === 1 ? '' : 's'}`}
              />
            ))}
          </div>
        </div>
      )}

      {a.sources.length > 0 && (
        <div className={styles.sourceBlock}>
          <span className={styles.sparkLabel}>Where readers came from</span>
          <ul className={styles.sourceList}>
            {a.sources.map((s) => (
              <li key={s.source} className={styles.sourceRow}>
                <span className={styles.sourceName}>{s.source}</span>
                <span className={styles.sourceCount}>{compact(s.views)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {a.avgScroll > 0 && (
        <p className={styles.analyticsFoot}>Avg scroll depth {a.avgScroll}%</p>
      )}
    </section>
  )
}

function Metric({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className={styles.metric}>
      <span className={styles.metricValue}>{value}</span>
      <span className={styles.metricLabel}>{label}</span>
      {hint && <span className={styles.metricHint}>{hint}</span>}
    </div>
  )
}
