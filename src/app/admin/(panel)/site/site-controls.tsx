'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { SiteProperty, Range } from '@/lib/site-analytics-types'
import styles from './site.module.css'

type View = 'real' | 'all' | 'bots'
type Tz = 'ET' | 'CT' | 'MT' | 'PT'

// Switching property/view/range/tz used to be <Link> navigations that scrolled
// to top and flashed (felt like a full reload). These navigate via router.replace
// with scroll:false inside a transition, a soft re-render that keeps scroll
// position and shows the previous data until the new data is ready.
export function SiteControls({
  property,
  view,
  range,
  tz,
  totals,
}: {
  property: SiteProperty
  view: View
  range: Range
  tz: Tz
  totals: { all: number; real: number; bots: number }
}) {
  const router = useRouter()
  const [pending, start] = useTransition()

  const go = (over: Partial<{ property: string; view: string; range: string; tz: string }>) => {
    const m = { property, view, range, tz, ...over }
    start(() => router.replace(`/admin/site?property=${m.property}&view=${m.view}&range=${m.range}&tz=${m.tz}`, { scroll: false }))
  }

  const Seg = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button type="button" className={active ? styles.segActive : styles.segBtn} onClick={onClick}>{children}</button>
  )

  return (
    <div className={styles.controls} style={pending ? { opacity: 0.6 } : undefined}>
      <div className={styles.seg}>
        <Seg active={property === 'website'} onClick={() => go({ property: 'website' })}>Website</Seg>
        <Seg active={property === 'deck'} onClick={() => go({ property: 'deck' })}>Pitch deck</Seg>
      </div>
      <div className={styles.seg}>
        <button type="button" className={view === 'real' ? styles.segReal : styles.segBtn} onClick={() => go({ view: 'real' })}>Real {totals.real}</button>
        <Seg active={view === 'all'} onClick={() => go({ view: 'all' })}>All {totals.all}</Seg>
        <Seg active={view === 'bots'} onClick={() => go({ view: 'bots' })}>Bots {totals.bots}</Seg>
      </div>
      <div className={styles.spacer} />
      <div className={styles.seg}>
        {(['ET', 'CT', 'MT', 'PT'] as Tz[]).map((z) => (
          <Seg key={z} active={tz === z} onClick={() => go({ tz: z })}>{z}</Seg>
        ))}
      </div>
      <div className={styles.seg}>
        {(['1h', '24h', '7d', '30d'] as Range[]).map((r) => (
          <Seg key={r} active={range === r} onClick={() => go({ range: r })}>{r}</Seg>
        ))}
      </div>
    </div>
  )
}
