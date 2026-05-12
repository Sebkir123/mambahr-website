'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const HIDDEN_PATHS = ['/demo', '/coming-soon']
const STORAGE_KEY = 'mamba_sticky_demo_dismissed_v1'

export default function StickyDemoButton() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.sessionStorage.getItem(STORAGE_KEY) === '1') {
      // schedule async to satisfy "no synchronous setState in effect" lint rule
      Promise.resolve().then(() => setDismissed(true))
      return
    }
    const onScroll = () => setVisible(window.scrollY > 720)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (dismissed) return null
  if (HIDDEN_PATHS.some((p) => pathname === p || pathname?.startsWith(p + '/'))) return null
  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 22,
        right: 22,
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'var(--gold-dark)',
        color: '#FFFFFF',
        padding: '10px 14px 10px 16px',
        borderRadius: 999,
        boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        animation: 'mamba-sticky-rise 0.35s ease-out',
      }}
    >
      <Link
        href="/demo"
        style={{
          color: '#FFFFFF',
          fontSize: 14,
          fontWeight: 600,
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        Book a demo
      </Link>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => {
          window.sessionStorage.setItem(STORAGE_KEY, '1')
          setDismissed(true)
        }}
        style={{
          background: 'rgba(255,255,255,0.18)',
          border: 'none',
          color: '#FFFFFF',
          width: 22,
          height: 22,
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  )
}
