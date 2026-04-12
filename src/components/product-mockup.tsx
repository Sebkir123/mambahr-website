'use client'

import { useEffect, useState, useRef } from 'react'

const sidebarItems = [
  { label: 'Daily Digest', badge: '', active: true, icon: '◉' },
  { label: 'Approvals', badge: '2', active: false, icon: '◎' },
  { label: 'Leave', badge: '', active: false, icon: '◦' },
  { label: 'Onboarding', badge: '1', active: false, icon: '◦' },
  { label: 'People Intel', badge: '', active: false, icon: '◦' },
]

const feedItems = [
  {
    type: 'resolved',
    title: 'PTO request — Sarah Chen',
    detail: 'Checked balance (14 days remaining), no blackout conflict. Auto-approved per company policy. Gusto updated, manager notified.',
    time: '2m ago',
    status: 'Handled',
  },
  {
    type: 'resolved',
    title: 'Onboarding — Taylor Ross starts Monday',
    detail: 'Contract sent for e-sign. Equipment order placed (MacBook Pro, monitor). Google Workspace access provisioned. Buddy assigned: Marcus Lee.',
    time: '14m ago',
    status: 'Handled',
  },
  {
    type: 'approval',
    title: 'Equipment purchase — Mark Liu',
    detail: 'Requesting $1,240 for ergonomic setup. Budget remaining: $3,200. Policy allows up to $1,500 without VP approval.',
    time: '22m ago',
    status: 'Needs you',
  },
  {
    type: 'resolved',
    title: 'Pay transparency report — California',
    detail: 'Q1 report generated. 3 compensation gaps flagged for review. Report saved to /reports/2026-Q1-CA.pdf.',
    time: '1h ago',
    status: 'Handled',
  },
  {
    type: 'approval',
    title: 'Policy update — Remote work amendment',
    detail: 'Detected a conflict with existing handbook section 4.2. Suggested revision attached. Needs your sign-off before publishing.',
    time: '1h ago',
    status: 'Needs you',
  },
]

export default function ProductMockup() {
  const [visibleItems, setVisibleItems] = useState(0)
  const [expanded, setExpanded] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) setStarted(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    if (visibleItems < feedItems.length) {
      const timer = setTimeout(() => setVisibleItems(v => v + 1), 600)
      return () => clearTimeout(timer)
    }
    // After all items shown, expand the first approval
    if (visibleItems === feedItems.length && expanded === -1) {
      const timer = setTimeout(() => setExpanded(2), 800)
      return () => clearTimeout(timer)
    }
  }, [started, visibleItems, expanded])

  const mono = 'var(--font-mono), monospace'

  return (
    <div
      ref={ref}
      className="glow-gold"
      style={{
        backgroundColor: '#0C0C0E',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid rgba(176,141,87,0.1)',
        maxWidth: 900,
        margin: '0 auto',
      }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: '12px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center" style={{ gap: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>MambaHR</span>
          <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--green)', animation: 'pulse-dot 2s ease-in-out infinite' }} />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: mono }}>
            Agent active · 31 tasks handled today
          </span>
        </div>
        <div className="flex items-center" style={{ gap: 8 }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', fontFamily: mono }}>Apr 12, 2026</span>
          <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
            BK
          </div>
        </div>
      </div>

      <div className="flex" style={{ minHeight: 380 }}>
        {/* Sidebar */}
        <div style={{ width: 200, borderRight: '1px solid rgba(255,255,255,0.06)', padding: '16px 8px', flexShrink: 0 }}>
          {sidebarItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between"
              style={{
                padding: '9px 12px',
                borderRadius: 8,
                backgroundColor: item.active ? 'rgba(176,141,87,0.08)' : 'transparent',
                color: item.active ? '#fff' : 'rgba(255,255,255,0.35)',
                marginBottom: 2,
                fontSize: 13,
                fontWeight: item.active ? 600 : 400,
                cursor: 'default',
                transition: 'background-color 0.2s',
              }}
            >
              <div className="flex items-center" style={{ gap: 8 }}>
                <span style={{ fontSize: 8, opacity: 0.5 }}>{item.icon}</span>
                {item.label}
              </div>
              {item.badge && (
                <span style={{
                  backgroundColor: item.badge === '2' ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: 999,
                  fontFamily: mono,
                }}>
                  {item.badge}
                </span>
              )}
            </div>
          ))}

          {/* Stats at bottom of sidebar */}
          <div style={{ marginTop: 32, padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 12, fontFamily: mono }}>
              Today
            </div>
            <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>Handled</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', fontFamily: mono }}>31</span>
            </div>
            <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>Needs you</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)', fontFamily: mono }}>2</span>
            </div>
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>Escalated</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', fontFamily: mono }}>0</span>
            </div>
          </div>
        </div>

        {/* Main feed */}
        <div style={{ flex: 1, padding: '20px 24px', overflow: 'hidden' }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 16, fontFamily: mono }}>
            Activity feed
          </div>

          {feedItems.slice(0, visibleItems).map((item, i) => (
            <div
              key={item.title}
              style={{
                padding: '14px 16px',
                borderRadius: 10,
                backgroundColor: i === expanded ? 'rgba(176,141,87,0.06)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${item.type === 'approval' && i !== expanded ? 'rgba(176,141,87,0.15)' : 'rgba(255,255,255,0.04)'}`,
                marginBottom: 8,
                animation: 'hero-fade-up 0.4s ease forwards',
                transition: 'background-color 0.3s',
              }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: i === expanded ? 10 : 0 }}>
                <div className="flex items-center" style={{ gap: 10 }}>
                  {/* Status dot */}
                  <span style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    backgroundColor: item.type === 'approval' ? 'var(--gold)' : 'var(--green)',
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>
                    {item.title}
                  </span>
                </div>
                <div className="flex items-center" style={{ gap: 10, flexShrink: 0 }}>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 999,
                    backgroundColor: item.type === 'approval' ? 'rgba(176,141,87,0.15)' : 'rgba(34,197,94,0.1)',
                    color: item.type === 'approval' ? 'var(--gold)' : 'var(--green)',
                    fontFamily: mono,
                  }}>
                    {item.status}
                  </span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: mono }}>{item.time}</span>
                </div>
              </div>

              {/* Expanded detail */}
              {i === expanded && (
                <div style={{ animation: 'hero-fade-up 0.3s ease forwards' }}>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 12, paddingLeft: 17 }}>
                    {item.detail}
                  </p>
                  {item.type === 'approval' && (
                    <div className="flex" style={{ gap: 8, paddingLeft: 17 }}>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '5px 16px',
                        borderRadius: 6,
                        backgroundColor: 'var(--green)',
                        color: '#fff',
                        cursor: 'pointer',
                      }}>
                        Approve
                      </span>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '5px 16px',
                        borderRadius: 6,
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        color: 'rgba(255,255,255,0.5)',
                        cursor: 'pointer',
                      }}>
                        Decline
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator when items are still loading */}
          {started && visibleItems < feedItems.length && (
            <div className="flex items-center" style={{ gap: 6, padding: '8px 16px' }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'var(--gold)', animation: 'pulse-dot 1s ease-in-out infinite' }} />
              <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'var(--gold)', animation: 'pulse-dot 1s ease-in-out 0.2s infinite' }} />
              <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'var(--gold)', animation: 'pulse-dot 1s ease-in-out 0.4s infinite' }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginLeft: 4, fontFamily: mono }}>Agent processing...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
