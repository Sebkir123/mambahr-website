'use client'

import { useEffect, useRef, useState } from 'react'

type Entry = {
  time: string
  who: string
  msg: string
  intent: string
  routedTo: string
  action: string
  duration: string
  status: 'auto' | 'hil'
}

const entries: Entry[] = [
  { time: '09:14:02', who: 'Maya · #people-ops',  msg: '"I need 3 days off next week"',         intent: 'leave_request', routedTo: 'Time Off agent', action: 'approved · within policy',     duration: '4.2s', status: 'auto' },
  { time: '09:13:47', who: 'Brian · DM',           msg: '"Write the offer for Alex at $175k base"', intent: 'hire_action',   routedTo: 'Hiring agent',   action: 'drafted · awaiting CHRO',      duration: '7.8s', status: 'hil'  },
  { time: '09:13:14', who: 'Sarah · #people-ops', msg: '"How many hires this quarter?"',        intent: 'reports_query', routedTo: 'Reports agent',  action: 'returned · 14 hires Q2',       duration: '1.1s', status: 'auto' },
]

export default function RoutingLog() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && visible === 0) setVisible(1) },
      { threshold: 0.3 },
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [visible])

  useEffect(() => {
    if (visible === 0 || visible >= entries.length) return
    const t = setTimeout(() => setVisible(v => v + 1), 700)
    return () => clearTimeout(t)
  }, [visible])

  return (
    <div ref={ref} style={{ background: '#1C1917', border: '1px solid rgba(176,141,87,0.25)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 12px 40px rgba(28,25,23,0.18)' }}>
      {/* Terminal header */}
      <div style={{ background: 'rgba(255,255,255,0.04)', padding: '12px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }} />
        <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>ACTIVITY · 9:14 AM</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>app.mambahr.com</span>
      </div>

      {/* Log entries — stagger in, latest one shimmers briefly */}
      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 22, fontFamily: 'var(--font-mono), monospace', minHeight: 380 }}>
        {entries.map((e, i) => {
          const show = i < visible
          const isLatest = i === 0
          return (
            <div
              key={i}
              className={show ? 'live-arrive' : undefined}
              style={{
                display: show ? 'flex' : 'none',
                flexDirection: 'column',
                gap: 6,
                animationDelay: show ? `${i * 0.08}s` : undefined,
                position: 'relative',
              }}
            >
              {isLatest && show && visible === 1 && (
                <div className="shimmer" style={{ position: 'absolute', inset: -6, borderRadius: 8, pointerEvents: 'none' }} />
              )}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{e.time}</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{e.who}</span>
              </div>
              <p style={{ fontSize: 13, color: '#FFFFFF', margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', fontStyle: 'italic' }}>
                {e.msg}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, paddingLeft: 10, borderLeft: '2px solid rgba(176,141,87,0.4)', marginTop: 4 }}>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                  <span style={{ color: 'rgba(176,141,87,0.85)' }}>→ INTENT</span>     <span style={{ color: '#FFFFFF' }}>{e.intent}</span>
                </p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                  <span style={{ color: 'rgba(176,141,87,0.85)' }}>→ ROUTED</span>     <span style={{ color: '#FFFFFF' }}>{e.routedTo}</span>
                </p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                  <span style={{ color: 'rgba(176,141,87,0.85)' }}>→ ACTION</span>     <span style={{ color: '#FFFFFF' }}>{e.action}</span>
                  <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 3, background: e.status === 'auto' ? 'rgba(34,197,94,0.15)' : 'rgba(176,141,87,0.18)', color: e.status === 'auto' ? '#22C55E' : 'var(--gold)' }}>
                    {e.status === 'auto' ? 'AUTO' : 'HIL'}
                  </span>
                </p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                  <span style={{ color: 'rgba(176,141,87,0.6)' }}>→ TIME</span>       <span>{e.duration}</span>
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
          <span style={{ color: '#22C55E' }}>●</span>  routing 47 actions/min · 14 specialist agents online
        </p>
      </div>
    </div>
  )
}
