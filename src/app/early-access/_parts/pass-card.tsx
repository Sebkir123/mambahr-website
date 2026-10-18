'use client'

import { useRef } from 'react'
import { MambaMark } from '@/components/mamba-mark'
import { qrPath } from '@/lib/qr'
import s from './ea.module.css'

export type PassCardProps = {
  /** Company name, or null while nothing is known yet (the landing preview). */
  name: string | null
  /** The line under the name: the email domain, or a hint. */
  sub: string
  joined: string
  /** null until the visitor has joined. */
  code: string | null
  /** The share link the QR code carries; null before joining. */
  link?: string | null
  /** Show a typing caret after the name (landing preview while focused). */
  typing?: boolean
  /** The ink stamp on the pass page; `land` plays the stamp landing once. */
  stamp?: 'still' | 'land'
  /** The words around the stamp's ring. */
  stampRing?: string
}

// The founding pass: a glass ticket that tilts toward the pointer and catches
// the light where the pointer is. Still for prefers-reduced-motion.
export function PassCard({ name, sub, joined, code, link, typing, stamp, stampRing = 'FOUNDING PRICING' }: PassCardProps) {
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
            <p className={[s.passName, !name && s.ghost, name && name.length > 16 && s.passNameLong].filter(Boolean).join(' ')}>
              {name ?? 'Your company'}
              {typing && <span className={s.caret} aria-hidden="true" />}
            </p>
            <p className={s.passSub}>{sub}</p>
          </div>
          {/* The foil seal before joining; the ink stamp in its place after. */}
          {stamp ? <Stamp land={stamp === 'land'} ring={stampRing} /> : <span className={s.seal} aria-hidden="true"><MambaMark size={20} color="#3d2f52" /></span>}
        </div>
        <div className={s.perf} />
        <div className={s.passFoot}>
          <dl className={s.passFacts}>
            <div><dt>Pricing</dt><dd>Founding</dd></div>
            <div><dt>Joined</dt><dd>{joined}</dd></div>
          </dl>
          <div className={s.passCode}>
            <span className={s.codeCopy}>
              <span className={code ? s.codeText : s.codePending}>{code ?? 'Pass number'}</span>
              <span className={s.codeHint}>{link ? 'Scan to share' : 'Shows when you join'}</span>
            </span>
            <Qr text={link ?? 'https://www.mambahr.com/early-access'} faint={!link} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Qr({ text, faint }: { text: string; faint?: boolean }) {
  const { size, d } = qrPath(text)
  return (
    <span className={faint ? `${s.qr} ${s.qrFaint}` : s.qr} aria-hidden="true">
      <svg viewBox={`0 0 ${size} ${size}`} shapeRendering="crispEdges">
        <path d={d} fill="#1f1b26" />
      </svg>
    </span>
  )
}

// A round ink stamp: "Founding pricing · held", pressed onto the pass corner.
function Stamp({ land, ring }: { land: boolean; ring: string }) {
  return (
    <span className={land ? `${s.stamp} ${s.stampLand}` : s.stamp} aria-hidden="true">
      <svg viewBox="0 0 120 120" width="96" height="96">
        <defs>
          <path id="ea-ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="60" cy="60" r="33" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <text fontSize="10.5" letterSpacing="2.6" fill="currentColor" fontWeight="700">
          <textPath href="#ea-ring">{`${ring} · ${ring} ·`}</textPath>
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
