'use client'

import { useEffect, useState } from 'react'

// Compact floating CTA, bottom-right pill instead of a full-width bar.
// Appears once the hero scrolls away, hides again near the final CTA band
// (no point doubling it), and can be dismissed for the session.
export default function StickyCta() {
  const [past, setPast] = useState(false)
  const [nearEnd, setNearEnd] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('.hero')
    const end = document.getElementById('access')
    if (!('IntersectionObserver' in window)) return
    const obs: IntersectionObserver[] = []
    if (hero) {
      const io = new IntersectionObserver((e) => setPast(!e[0].isIntersecting), { threshold: 0 })
      io.observe(hero)
      obs.push(io)
    }
    if (end) {
      const io = new IntersectionObserver((e) => setNearEnd(e[0].isIntersecting), { threshold: 0.1 })
      io.observe(end)
      obs.push(io)
    }
    return () => obs.forEach((o) => o.disconnect())
  }, [])

  const show = past && !nearEnd && !dismissed

  return (
    <div className={`fcta${show ? ' show' : ''}`} aria-hidden={!show} inert={!show}>
      <a href="/demo" className="pill" tabIndex={show ? 0 : -1}>
        <span className="m" aria-hidden="true">M</span>
        Book a demo
      </a>
      <button className="x" type="button" aria-label="Dismiss" tabIndex={show ? 0 : -1} onClick={() => setDismissed(true)}>
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 1.5l7 7m0-7l-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
      </button>

      <style jsx>{`
        .fcta {
          position: fixed;
          right: 22px;
          bottom: 22px;
          z-index: 9000;
          display: flex;
          align-items: center;
          gap: 7px;
          opacity: 0;
          transform: translateY(16px) scale(0.96);
          pointer-events: none;
          transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .fcta.show {
          opacity: 1;
          transform: none;
          pointer-events: auto;
        }
        .pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #1a1a19;
          color: #fff;
          font-weight: 600;
          font-size: 15px;
          padding: 12px 20px 12px 12px;
          border-radius: 999px;
          box-shadow: 0 10px 30px rgba(20, 18, 14, 0.28);
          transition: transform 0.15s ease;
        }
        .pill:hover { transform: translateY(-2px); }
        .m {
          width: 26px;
          height: 26px;
          border-radius: 999px;
          background: linear-gradient(120deg, #d4aa7c, #6a5da6);
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 15px;
        }
        .x {
          width: 26px;
          height: 26px;
          border-radius: 999px;
          border: 1px solid var(--border-mid);
          background: var(--bg);
          color: var(--text-faint);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .x:hover { color: var(--text); }
        @media (prefers-reduced-motion: reduce) {
          .fcta { transition: none; }
          .pill:hover { transform: none; }
        }
      `}</style>
    </div>
  )
}
