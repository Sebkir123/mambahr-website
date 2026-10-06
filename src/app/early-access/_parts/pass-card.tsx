'use client'

import { useRef } from 'react'
import { MambaMark } from '@/components/mamba-mark'
import { barcodeBars } from '@/content/early-access'
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
  /** The ink stamp on the pass page; `land` plays the stamp landing once. */
  stamp?: 'still' | 'land'
}

// The founding pass: a glass ticket that tilts toward the pointer and catches
// the light where the pointer is. Still for prefers-reduced-motion.
export function PassCard({ name, sub, joined, code, typing, stamp }: PassCardProps) {
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
        <div className={s.passBody}>
          <div className={s.passWho}>
            <p className={name ? s.passName : `${s.passName} ${s.ghost}`}>
              {name ?? 'Your company'}
              {typing && <span className={s.caret} aria-hidden="true" />}
            </p>
            <p className={s.passSub}>{sub}</p>
          </div>
          {/* The foil seal before joining; the ink stamp in its place after. */}
          {stamp ? <Stamp land={stamp === 'land'} /> : <span className={s.seal} aria-hidden="true"><MambaMark size={20} color="#3d2f52" /></span>}
        </div>
        <div className={s.perf} />
        <div className={s.passFoot}>
          <dl className={s.passFacts}>
            <div><dt>Pricing</dt><dd>Founding</dd></div>
            <div><dt>Joined</dt><dd>{joined}</dd></div>
          </dl>
          <div className={s.passCode}>
            <Barcode seed={code ?? 'ea000000'} faint={!code} />
            <span className={code ? s.codeText : s.codePending}>{code ?? 'Your pass number'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Barcode({ seed, faint }: { seed: string; faint?: boolean }) {
  return (
    <span className={faint ? `${s.barcode} ${s.barFaint}` : s.barcode} aria-hidden="true">
      {barcodeBars(seed).map((b, i) => (
        <i key={i} style={{ width: b.w * 1.5, marginRight: b.gap * 1.5 }} />
      ))}
    </span>
  )
}

// A round ink stamp: "Founding pricing · held", pressed onto the pass corner.
function Stamp({ land }: { land: boolean }) {
  return (
    <span className={land ? `${s.stamp} ${s.stampLand}` : s.stamp} aria-hidden="true">
      <svg viewBox="0 0 120 120" width="96" height="96">
        <defs>
          <path id="ea-ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="60" cy="60" r="33" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <text fontSize="10.5" letterSpacing="2.6" fill="currentColor" fontWeight="700">
          <textPath href="#ea-ring">FOUNDING PRICING · FOUNDING PRICING ·</textPath>
        </text>
        <text x="60" y="66" textAnchor="middle" fontSize="19" fill="currentColor" fontFamily="var(--font-serif)" fontStyle="italic">Held</text>
      </svg>
    </span>
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
