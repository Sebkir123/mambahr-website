'use client'

import { useRef } from 'react'
import { MambaMark } from '@/components/mamba-mark'
import s from './ea.module.css'

export type PassCardProps = {
  /** Company name, or null while nothing is known yet (the landing preview). */
  name: string | null
  /** The line under the name: the email domain, or a hint. */
  sub: string
  joined: string
  /** null until the visitor has joined. */
  code: string | null
  /** Show a typing caret after the name (landing preview while focused). */
  typing?: boolean
}

// The founding pass: a glass ticket that tilts toward the pointer and catches
// the light where the pointer is. Still for prefers-reduced-motion.
export function PassCard({ name, sub, joined, code, typing }: PassCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  function onMove(e: React.PointerEvent) {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--ry', `${(x - 0.5) * 10}deg`)
    el.style.setProperty('--rx', `${(0.5 - y) * 8}deg`)
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
  }
  function onLeave() {
    const el = ref.current
    if (!el) return
    for (const p of ['--rx', '--ry', '--mx', '--my']) el.style.removeProperty(p)
  }

  return (
    <div className={s.passWrap} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={ref} className={s.pass} role="img" aria-label={`Founding pass for ${name ?? 'your company'}${code ? `, ${code}` : ''}`}>
        <div className={s.passTop}>
          <span className={s.passBrand}><MambaMark size={18} color="#8a6535" />MambaHR</span>
          <span className={s.passChip}>Founding spot</span>
        </div>
        <p className={name ? s.passName : `${s.passName} ${s.ghost}`}>
          {name ?? 'Your company'}
          {typing && <span className={s.caret} aria-hidden="true" />}
        </p>
        <p className={s.passSub}>{sub}</p>
        <div className={s.perf} />
        <dl className={s.passFoot}>
          <div><dt>Pricing</dt><dd>Founding</dd></div>
          <div><dt>Joined</dt><dd>{joined}</dd></div>
          <div><dt>Pass</dt><dd>{code ?? <span className={s.pending}>Pending</span>}</dd></div>
        </dl>
      </div>
    </div>
  )
}

export const passCode = (referralCode: string) => `EA-${referralCode.slice(0, 6).toUpperCase()}`

export function shortDate(iso: string | Date): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/** The gradient stage behind the pass and the glass fragments. */
export function Stage({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`${s.stage} ${className ?? ''}`}>
      <span className={s.field} aria-hidden="true">
        <i className={`${s.f} ${s.f1}`} />
        <i className={`${s.f} ${s.f2}`} />
        <i className={`${s.f} ${s.f3}`} />
        <i className={s.grain} />
      </span>
      {children}
    </div>
  )
}

export function Sky() {
  return (
    <div className={s.sky} aria-hidden="true">
      <span className={`${s.glow} ${s.g1}`} />
      <span className={`${s.glow} ${s.g2}`} />
      <span className={s.grain} />
    </div>
  )
}
