'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const TOTAL = 12
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

/* ── Animation helpers ── */

function reveal(on: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: on ? 1 : 0,
    transform: on ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity 0.8s ${EASE} ${delay}ms, transform 0.8s ${EASE} ${delay}ms`,
  }
}

function revealScale(on: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: on ? 1 : 0,
    transform: on ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(16px)',
    transition: `opacity 0.9s ${EASE} ${delay}ms, transform 0.9s ${EASE} ${delay}ms`,
  }
}

function glowLine(on: boolean): React.CSSProperties {
  return {
    position: 'absolute' as const,
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    height: 1,
    width: on ? '50%' : '0%',
    background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.4), transparent)',
    transition: `width 1.2s ${EASE} 0.1s`,
  }
}

const slideBase: React.CSSProperties = {
  height: '100vh',
  minHeight: '100dvh',
  scrollSnapAlign: 'start',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  padding: '0 24px',
}

/* ── Particle field (sparse, atmospheric) ── */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const vis = useRef(true)

  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { vis.current = e.isIntersecting }, { threshold: 0 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const r = c.parentElement?.getBoundingClientRect()
      if (!r) return null
      const d = window.devicePixelRatio || 1
      c.width = r.width * d; c.height = r.height * d
      c.style.width = `${r.width}px`; c.style.height = `${r.height}px`
      ctx.scale(d, d)
      return { w: r.width, h: r.height }
    }

    let dims = resize()
    if (!dims) return
    let { w, h } = dims
    const onResize = () => { dims = resize(); if (dims) { w = dims.w; h = dims.h } }
    window.addEventListener('resize', onResize)

    const ps: { x: number; y: number; vx: number; vy: number; r: number; o: number; sp: number; off: number }[] = []
    for (let i = 0; i < 45; i++) {
      ps.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15, r: Math.random() * 1.6 + 0.3, o: Math.random() * 0.3 + 0.04, sp: Math.random() * 0.015 + 0.003, off: Math.random() * Math.PI * 2 })
    }

    let id: number, t = 0
    const draw = () => {
      if (!vis.current) { id = requestAnimationFrame(draw); return }
      t++; ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y, dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 160) { ctx.beginPath(); ctx.moveTo(ps[i].x, ps[i].y); ctx.lineTo(ps[j].x, ps[j].y); ctx.strokeStyle = `rgba(176,141,87,${0.04 * (1 - dist / 160)})`; ctx.lineWidth = 0.5; ctx.stroke() }
        }
      }
      for (const p of ps) {
        const pulse = Math.sin(t * p.sp + p.off) * 0.15 + 0.85
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2); ctx.fillStyle = `rgba(176,141,87,${p.o * pulse})`; ctx.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10
      }
      id = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <div ref={boxRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

/* ── Agent Pulse (sonar visualization) ── */
function AgentPulse() {
  return (
    <div style={{ position: 'relative', width: 220, height: 220 }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid var(--gold)', animation: `sonar 3s ease-out ${i * 0.7}s infinite`, opacity: 0 }} />
      ))}
      {/* Center glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 16, height: 16, borderRadius: '50%', backgroundColor: 'var(--gold)', boxShadow: '0 0 30px rgba(176,141,87,0.6), 0 0 60px rgba(176,141,87,0.2)' }} />
      {/* Orbit labels */}
      {['Leave', 'Onboard', 'Offboard', 'Ops'].map((label, i) => {
        const a = (i * 90 - 45) * (Math.PI / 180)
        return (
          <div key={label} style={{ position: 'absolute', left: 110 + Math.cos(a) * 90, top: 110 + Math.sin(a) * 90, transform: 'translate(-50%,-50%)', padding: '3px 10px', borderRadius: 6, backgroundColor: 'rgba(176,141,87,0.08)', border: '1px solid rgba(176,141,87,0.15)', fontSize: 10, fontWeight: 500, color: 'var(--gold)', fontFamily: 'var(--font-mono), monospace', whiteSpace: 'nowrap' }}>
            {label}
          </div>
        )
      })}
    </div>
  )
}

/* ── Navigation Dots ── */
function NavDots({ active, onNav }: { active: number; onNav: (i: number) => void }) {
  return (
    <div style={{ position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 100, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {Array.from({ length: TOTAL }, (_, i) => (
        <button
          key={i}
          onClick={() => onNav(i)}
          aria-label={`Slide ${i + 1}`}
          style={{
            width: i === active ? 8 : 5,
            height: i === active ? 8 : 5,
            borderRadius: '50%',
            border: 'none',
            backgroundColor: i === active ? 'var(--gold)' : 'rgba(255,255,255,0.15)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            padding: 0,
            boxShadow: i === active ? '0 0 10px rgba(176,141,87,0.5)' : 'none',
          }}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   PITCH DECK
   ═══════════════════════════════════════════════════════════ */

export default function PitchDeck() {
  const [seen, setSeen] = useState<Set<number>>(new Set())
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = Number(entry.target.getAttribute('data-slide'))
          if (entry.isIntersecting) {
            setSeen((prev) => {
              const next = new Set(prev)
              next.add(idx)
              return next
            })
            setActive(idx)
          }
        }
      },
      { threshold: 0.45 }
    )
    refs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault()
        refs.current[Math.min(active + 1, TOTAL - 1)]?.scrollIntoView({ behavior: 'smooth' })
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        refs.current[Math.max(active - 1, 0)]?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [active])

  const nav = (i: number) => refs.current[i]?.scrollIntoView({ behavior: 'smooth' })
  const v = (i: number) => seen.has(i)
  const setRef = (i: number) => (el: HTMLElement | null) => { refs.current[i] = el }

  return (
    <>
      <style>{`
        @keyframes sonar { 0% { transform: scale(0.15); opacity: 0.6; } 100% { transform: scale(1); opacity: 0; } }
        @keyframes breathe { 0%, 100% { transform: scale(1); opacity: 0.9; } 50% { transform: scale(1.04); opacity: 1; } }
        @keyframes scroll-hint { 0%, 100% { opacity: 0.3; transform: translateY(0); } 50% { opacity: 0.8; transform: translateY(8px); } }
        @keyframes bar-fill { from { width: 0; } }
        .deck-scroll { scrollbar-width: none; }
        .deck-scroll::-webkit-scrollbar { display: none; }
        @media (max-width: 768px) {
          .deck-dots { display: none !important; }
          .deck-grid-2 { grid-template-columns: 1fr !important; }
          .deck-grid-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="deck-scroll" style={{ height: '100vh', overflowY: 'auto', scrollSnapType: 'y mandatory', backgroundColor: 'var(--bg)' }}>
        <div className="deck-dots" style={{ position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 100, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <NavDots active={active} onNav={nav} />
        </div>

        {/* ═══ 0 — COVER ═══ */}
        <section ref={setRef(0)} data-slide="0" style={{ ...slideBase, backgroundColor: 'var(--bg)' }}>
          <Particles />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 760 }}>
            <div style={reveal(v(0), 0)}>
              <span style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 999, border: '1px solid rgba(176,141,87,0.2)', fontSize: 10, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace', marginBottom: 48 }}>
                Confidential &middot; Seed 2026
              </span>
            </div>
            <h1 style={{ ...reveal(v(0), 150), fontSize: 'clamp(52px, 7vw, 88px)', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--text)', lineHeight: 1, marginBottom: 20 }}>
              Mamba<span style={{ color: 'var(--gold)' }}>HR</span>
            </h1>
            <p style={{ ...reveal(v(0), 250), fontSize: 'clamp(22px, 2.6vw, 32px)', color: 'var(--text)', maxWidth: 620, margin: '0 auto 14px', lineHeight: 1.2, fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'var(--font-serif), Georgia, serif', fontStyle: 'italic' }}>
              The AI HR Department.
            </p>
            <p style={{ ...reveal(v(0), 380), fontSize: 'clamp(15px, 1.6vw, 17px)', color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto 44px', lineHeight: 1.6, fontWeight: 400 }}>
              We don&apos;t sell software seats.<br />We sell digital headcount.
            </p>
            <div style={reveal(v(0), 520)}>
              <span style={{ display: 'inline-block', padding: '10px 24px', borderRadius: 10, backgroundColor: 'rgba(176,141,87,0.06)', border: '1px solid rgba(176,141,87,0.15)', fontSize: 14, color: 'var(--gold)', fontWeight: 600, letterSpacing: '-0.01em' }}>
                Seed Round &mdash; $3M
              </span>
            </div>
            <div style={{ ...reveal(v(0), 700), position: 'absolute', left: '50%', bottom: -100, transform: 'translateX(-50%)' }}>
              <div style={{ animation: 'scroll-hint 2.5s ease-in-out infinite' }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M5 11l5 5 5-5" stroke="var(--text-faint)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 1 — THE PROBLEM ═══ */}
        <section ref={setRef(1)} data-slide="1" style={{ ...slideBase, backgroundColor: 'var(--bg-surface)' }}>
          <div style={glowLine(v(1))} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 960, width: '100%' }}>
            <p style={{ ...reveal(v(1), 0), fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'var(--font-mono), monospace' }}>
              The Problem &middot; The SaaS Trap
            </p>
            <h2 style={{ ...reveal(v(1), 100), fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.05, marginBottom: 20 }}>
              $1 on HR software.<br />
              <span style={{ color: 'var(--gold)' }}>$6 on the humans who use it.</span>
            </h2>
            <p style={{ ...reveal(v(1), 250), fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 620, marginBottom: 40 }}>
              Every HRIS &mdash; Gusto, Rippling, BambooHR, Workday &mdash; is a database that needs expensive human glue to operate. The software was supposed to save time. It became a dashboard waiting for a human to click it.
            </p>

            {/* The 1:6 bar visual */}
            <div className="deck-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 2.2fr', gap: 32, alignItems: 'center', marginBottom: 32 }}>
              {/* Left: labels */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                <div style={reveal(v(1), 400)}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace', marginBottom: 6 }}>SaaS dollar</div>
                  <div style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1 }}>$1</div>
                  <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 4 }}>HRIS seats</div>
                </div>
                <div style={reveal(v(1), 550)}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace', marginBottom: 6 }}>Services dollar</div>
                  <div style={{ fontSize: 'clamp(40px, 4.5vw, 60px)', fontWeight: 900, color: 'var(--gold)', letterSpacing: '-0.03em', lineHeight: 1 }}>$6</div>
                  <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 4 }}>HR admins clicking the buttons</div>
                </div>
              </div>

              {/* Right: bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, height: 28, borderRadius: 4, backgroundColor: 'var(--border-mid)', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0.35))', width: v(1) ? '14%' : '0%', transition: `width 1.1s ${EASE} 400ms`, position: 'relative' }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2))' }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace', width: 80 }}>SOFTWARE</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, height: 28, borderRadius: 4, backgroundColor: 'rgba(176,141,87,0.1)', overflow: 'hidden', position: 'relative', border: '1px solid rgba(176,141,87,0.2)' }}>
                    <div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(90deg, var(--gold), rgba(176,141,87,0.7))', width: v(1) ? '86%' : '0%', transition: `width 1.4s ${EASE} 600ms`, position: 'relative', boxShadow: '0 0 24px rgba(176,141,87,0.4)' }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15))' }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gold)', fontFamily: 'var(--font-mono), monospace', width: 80 }}>SERVICES</div>
                </div>
                <p style={{ ...reveal(v(1), 900), fontSize: 12, color: 'var(--text-faint)', lineHeight: 1.5, fontStyle: 'italic', marginTop: 4, fontFamily: 'var(--font-serif), Georgia, serif' }}>
                  &ldquo;For every dollar spent on software, six are spent on services.&rdquo;<br />
                  <span style={{ fontStyle: 'normal', color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '0.04em' }}>&mdash; Julien Bek, Sequoia Capital, March 2026</span>
                </p>
              </div>
            </div>

            {/* Bottom: the cost */}
            <div style={{ ...revealScale(v(1), 1000), padding: 20, borderRadius: 12, backgroundColor: 'var(--bg)', border: '1px solid var(--border-mid)', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gold)', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Translation</div>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, flex: 1, minWidth: 280 }}>
                A 200-person startup spends <span style={{ color: 'var(--text)', fontWeight: 600 }}>$24K/yr on an HRIS</span> and <span style={{ color: 'var(--gold)', fontWeight: 600 }}>$150K+/yr on two HR admins</span> to make it work. That $150K is the real market.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ 2 — WHY NOW ═══ */}
        <section ref={setRef(2)} data-slide="2" style={{ ...slideBase, backgroundColor: 'var(--bg)' }}>
          <div style={glowLine(v(2))} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, width: '100%' }}>
            <p style={{ ...reveal(v(2), 0), fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'var(--font-mono), monospace' }}>
              Why Now
            </p>
            <h2 style={{ ...reveal(v(2), 100), fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.1, marginBottom: 16 }}>
              The services dollar<br />just became <span style={{ color: 'var(--gold)' }}>capturable.</span>
            </h2>
            <p style={{ ...reveal(v(2), 200), fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 620, marginBottom: 48 }}>
              For ten years, HR software sold seats. Then frontier models crossed the reliability line. The $6 services dollar is now capturable at software margins &mdash; and it&apos;s 6x bigger than the $1 SaaS dollar the incumbents are fighting over.
            </p>
            <div className="deck-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                {
                  title: 'Models got reliable',
                  num: '2024',
                  label: 'inflection',
                  desc: 'Tool-using, long-context frontier models crossed the threshold where autonomous end-to-end HR workflows became possible. Not demos &mdash; production.',
                },
                {
                  title: 'Labor costs broke HR',
                  num: '1.22',
                  label: 'HR per 100',
                  desc: 'Mid-market HR-to-employee ratio (SHRM 2025). Every 100 new hires forces another HR admin at $75K+ &mdash; a tax on growth no founder wants to pay.',
                },
                {
                  title: 'Capital is hunting outcomes',
                  num: '$11B',
                  label: 'Harvey AI',
                  desc: 'Harvey $11B on $190M ARR. Sierra $10B on $150M. Services-as-software is the fastest-compounding category in venture history.',
                },
              ].map((card, i) => (
                <div key={card.title} style={{ ...revealScale(v(2), 300 + i * 140), padding: 28, borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-mid)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 14 }}>
                    <span style={{ fontSize: 26, fontWeight: 900, color: 'var(--gold)', letterSpacing: '-0.03em', lineHeight: 1 }}>{card.num}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{card.label}</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{card.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 3 — THE PARADIGM SHIFT ═══ */}
        <section ref={setRef(3)} data-slide="3" style={{ ...slideBase, backgroundColor: 'var(--bg-surface)' }}>
          <div style={glowLine(v(3))} />
          <Particles />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 960, width: '100%' }}>
            <p style={{ ...reveal(v(3), 0), fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'var(--font-mono), monospace', textAlign: 'center' }}>
              The Paradigm Shift
            </p>
            <h2 style={{ ...reveal(v(3), 100), fontSize: 'clamp(44px, 6vw, 84px)', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--text)', lineHeight: 1, marginBottom: 12, textAlign: 'center' }}>
              Sell <span style={{ color: 'var(--gold)' }}>outcomes.</span>
            </h2>
            <p style={{ ...reveal(v(3), 250), fontSize: 'clamp(22px, 2.8vw, 32px)', color: 'var(--text-muted)', lineHeight: 1.2, marginBottom: 64, textAlign: 'center', fontFamily: 'var(--font-serif), Georgia, serif', fontStyle: 'italic', fontWeight: 400 }}>
              Not seats.
            </p>

            {/* Old world vs New world */}
            <div className="deck-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 20, alignItems: 'stretch', marginBottom: 40 }}>
              {/* Old */}
              <div style={{ ...revealScale(v(3), 400), padding: 28, borderRadius: 16, backgroundColor: 'rgba(9,9,11,0.6)', border: '1px solid var(--border-mid)', position: 'relative' }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace', marginBottom: 16 }}>The old game</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-faint)', marginBottom: 20, textDecoration: 'line-through', textDecorationColor: 'rgba(176,141,87,0.4)' }}>SaaS copilots</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    'Sell software seats',
                    'Price per user, per month',
                    'Compete with every new model release',
                    'Margin erodes as AI commoditizes',
                  ].map((item) => (
                    <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 10, color: 'var(--text-faint)', marginTop: 4 }}>✕</span>
                      <span style={{ fontSize: 13, color: 'var(--text-faint)', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div style={{ ...reveal(v(3), 600), display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>

              {/* New */}
              <div style={{ ...revealScale(v(3), 550), padding: 28, borderRadius: 16, backgroundColor: 'rgba(176,141,87,0.05)', border: '1px solid rgba(176,141,87,0.3)', position: 'relative', boxShadow: '0 20px 60px rgba(176,141,87,0.08)' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace', marginBottom: 16 }}>The new game</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>Digital headcount</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    'Sell completed work',
                    'Price per outcome delivered',
                    'Every model release improves our margin',
                    '90% software margins on a services TAM',
                  ].map((item) => (
                    <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 10, color: 'var(--gold)', marginTop: 4, fontWeight: 700 }}>✓</span>
                      <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Thesis line */}
            <p style={{ ...reveal(v(3), 800), fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 640, margin: '0 auto', textAlign: 'center', fontStyle: 'italic', fontFamily: 'var(--font-serif), Georgia, serif' }}>
              &ldquo;If you sell the tool, you&apos;re in a race against the model. If you sell the work, every improvement in the model makes your service faster, cheaper, and harder to compete with.&rdquo;
              <span style={{ display: 'block', fontStyle: 'normal', color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '0.04em', marginTop: 8 }}>&mdash; Sequoia Capital, &ldquo;Services: The New Software&rdquo;</span>
            </p>
          </div>
        </section>

        {/* ═══ 4 — THE PRODUCT ═══ */}
        <section ref={setRef(4)} data-slide="4" style={{ ...slideBase, backgroundColor: 'var(--bg)' }}>
          <div style={glowLine(v(4))} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 960, width: '100%' }}>
            <div className="deck-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
              <div>
                <p style={{ ...reveal(v(4), 0), fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'var(--font-mono), monospace' }}>
                  The Product
                </p>
                <h2 style={{ ...reveal(v(4), 100), fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.08, marginBottom: 20 }}>
                  Your HR department.<br /><span style={{ color: 'var(--gold)' }}>As a service.</span>
                </h2>
                <p style={{ ...reveal(v(4), 250), fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 28 }}>
                  Not a tool for your HR department. Not a copilot. MambaHR is an autonomous System of Action that runs people ops end-to-end &mdash; triggered in Slack, executed across Gusto, Greenhouse, Workday, Okta, Carta. You buy the finished work.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Hire', desc: 'offer letter \u2192 BGC \u2192 IT provisioning \u2192 HRIS sync' },
                    { label: 'Onboard', desc: 'day-zero kit, policy Q&A with citations, I-9 tracking' },
                    { label: 'Manage', desc: 'leave approvals, comp adjustments, policy updates' },
                    { label: 'Offboard', desc: 'severance, equity accel, access revocation, COBRA' },
                  ].map((item, i) => (
                    <div key={item.label} style={{ ...reveal(v(4), 400 + i * 90), display: 'flex', alignItems: 'baseline', gap: 10, paddingBottom: 8, borderBottom: i < 3 ? '1px solid var(--border-mid)' : 'none' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--gold)', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.04em', textTransform: 'uppercase', minWidth: 64 }}>{item.label}</span>
                      <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ ...revealScale(v(4), 300), display: 'flex', justifyContent: 'center' }}>
                <AgentPulse />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 5 — HOW IT WORKS ═══ */}
        <section ref={setRef(5)} data-slide="5" style={{ ...slideBase, backgroundColor: 'var(--bg-surface)' }}>
          <div style={glowLine(v(5))} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 960, width: '100%', textAlign: 'center' }}>
            <p style={{ ...reveal(v(5), 0), fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'var(--font-mono), monospace' }}>
              How It Works
            </p>
            <h2 style={{ ...reveal(v(5), 100), fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.1, marginBottom: 16 }}>
              A System of <span style={{ color: 'var(--gold)' }}>Action.</span>
            </h2>
            <p style={{ ...reveal(v(5), 200), fontSize: 15, color: 'var(--text-muted)', marginBottom: 40, maxWidth: 620, margin: '0 auto 40px', lineHeight: 1.6 }}>
              Triggered in the tools your team already uses. Verified against 95K lines of deterministic HR logic. Executed across every system in the stack. <span style={{ color: 'var(--text)', fontWeight: 600 }}>The human approves. MambaHR executes.</span>
            </p>

            <div className="deck-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                {
                  step: '01',
                  title: 'Trigger',
                  desc: <>A hiring manager types &ldquo;Hire Sarah for Senior Eng&rdquo; in Slack. Or HR files a leave request. Or someone resigns.</>,
                  chips: ['Slack', 'Teams', 'Email', 'API'],
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
                },
                {
                  step: '02',
                  title: 'Verify',
                  desc: <>MambaHR maps the request to policy. Resolves jurisdiction, exceptions, eligibility. Every decision auditable.</>,
                  chips: ['Policy graph', 'Patents pending', 'Deterministic'],
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M9 12l2 2 4-4" /><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /></svg>,
                },
                {
                  step: '03',
                  title: 'Execute',
                  desc: <>Offer letters sent. Payroll updated. Access provisioned. Background check triggered. HRIS synced. Done before lunch.</>,
                  chips: ['Gusto', 'Greenhouse', 'Workday', 'Okta', 'Carta', '+ 40 more'],
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>,
                },
              ].map((s, i) => (
                <div key={s.step} style={{ ...revealScale(v(5), 300 + i * 150), padding: 26, borderRadius: 16, backgroundColor: 'var(--bg)', border: '1px solid var(--border-mid)', textAlign: 'left', position: 'relative', overflow: 'hidden', animation: v(5) ? `breathe 4s ease-in-out ${i * 0.5}s infinite` : 'none' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--gold), transparent)', opacity: 0.5 }} />
                  <div style={{ marginBottom: 14 }}>{s.icon}</div>
                  <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--gold)', fontFamily: 'var(--font-mono), monospace', marginBottom: 6 }}>{s.step}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 14 }}>{s.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {s.chips.map((chip) => (
                      <span key={chip} style={{ padding: '3px 8px', borderRadius: 999, backgroundColor: 'rgba(176,141,87,0.06)', border: '1px solid rgba(176,141,87,0.12)', fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.02em' }}>{chip}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Autonomy gradient — who approves what */}
            <div style={{ ...reveal(v(5), 800), marginTop: 24, padding: 18, borderRadius: 14, backgroundColor: 'var(--bg)', border: '1px solid var(--border-mid)', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace' }}>Autonomy gradient &middot; Human in the approval loop, not the work loop</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 9, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.04em' }}>
                  <span style={{ color: 'var(--gold)' }}>&larr; fully autonomous</span>
                  <span style={{ width: 60, height: 2, background: 'linear-gradient(90deg, var(--gold), var(--text-faint))', borderRadius: 1 }} />
                  <span>human-led &rarr;</span>
                </div>
              </div>
              <div className="deck-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[
                  {
                    tier: 'Auto-execute',
                    subtitle: 'Routine, within policy',
                    intensity: 1,
                    items: ['Policy Q&A with citations', 'PTO balance & leave accrual', 'Day-1 onboarding kit', 'Access provisioning'],
                  },
                  {
                    tier: 'Draft \u2192 approve',
                    subtitle: 'Material decisions',
                    intensity: 0.55,
                    items: ['Offer letters & comp', 'Promotions / role changes', 'Leave exceptions', 'Performance review cycles'],
                  },
                  {
                    tier: 'Human-led',
                    subtitle: 'Agent assists, never decides',
                    intensity: 0.15,
                    items: ['Terminations & severance', 'PIPs & disciplinary', 'Investigations', 'Disputes / litigation risk'],
                  },
                ].map((t, i) => (
                  <div key={t.tier} style={{ ...reveal(v(5), 900 + i * 100), padding: 14, borderRadius: 10, backgroundColor: `rgba(176,141,87,${0.02 + t.intensity * 0.06})`, border: `1px solid rgba(176,141,87,${0.08 + t.intensity * 0.22})`, position: 'relative' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 3 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: t.intensity > 0.5 ? 'var(--gold)' : 'var(--text)' }}>{t.tier}</span>
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-faint)', marginBottom: 10, fontStyle: 'italic' }}>{t.subtitle}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {t.items.map((item) => (
                        <div key={item} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                          <span style={{ fontSize: 8, color: 'var(--gold)', opacity: t.intensity, marginTop: 3 }}>●</span>
                          <span style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 6 — DEFENSIBILITY ═══ */}
        <section ref={setRef(6)} data-slide="6" style={{ ...slideBase, backgroundColor: 'var(--bg)' }}>
          <div style={glowLine(v(6))} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 960, width: '100%' }}>
            <div style={{ marginBottom: 40 }}>
              <p style={{ ...reveal(v(6), 0), fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20, fontFamily: 'var(--font-mono), monospace' }}>
                Moat &middot; Why incumbents can&apos;t follow
              </p>
              <h2 style={{ ...reveal(v(6), 100), fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.1 }}>
                Walled gardens can&apos;t<br />become <span style={{ color: 'var(--gold)' }}>agnostic agents.</span>
              </h2>
            </div>

            {/* Incumbents vs MambaHR DNA */}
            <div className="deck-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              {/* Incumbents column */}
              <div style={{ ...revealScale(v(6), 200), padding: 24, borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-mid)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                  {['Rippling', 'Gusto', 'BambooHR', 'Workday'].map((name) => (
                    <span key={name} style={{ fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace', padding: '2px 8px', borderRadius: 999, border: '1px solid var(--border-mid)' }}>{name}</span>
                  ))}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-faint)', marginBottom: 14 }}>SaaS DNA. Walled garden.</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    'Business model requires humans to log into their dashboard',
                    'Revenue = seats. Automating work cannibalizes their P&L',
                    'Will never automate tasks across competitors\u2019 platforms',
                    'Investors priced them as SaaS \u2014 can\u2019t re-price as services',
                  ].map((item) => (
                    <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 10, color: 'var(--text-faint)', marginTop: 4 }}>✕</span>
                      <span style={{ fontSize: 13, color: 'var(--text-faint)', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* MambaHR column */}
              <div style={{ ...revealScale(v(6), 320), padding: 24, borderRadius: 14, backgroundColor: 'rgba(176,141,87,0.05)', border: '1px solid rgba(176,141,87,0.3)', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 60px rgba(176,141,87,0.08)' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 }}>
                  <span style={{ fontSize: 11, color: 'var(--gold)', fontFamily: 'var(--font-mono), monospace', padding: '2px 8px', borderRadius: 999, border: '1px solid rgba(176,141,87,0.3)', backgroundColor: 'rgba(176,141,87,0.08)', fontWeight: 600 }}>MambaHR</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>Services DNA. Agnostic by design.</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    'Sits on top of every HRIS. Sells the work, not the seats',
                    'Revenue = outcomes. More automation = more revenue, not less',
                    'Connects Gusto \u2194 Greenhouse \u2194 Workday \u2014 by design, not exception',
                    'Priced as services + services margins = the alpha',
                  ].map((item) => (
                    <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 10, color: 'var(--gold)', marginTop: 4, fontWeight: 700 }}>✓</span>
                      <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical moat row */}
            <div style={{ ...reveal(v(6), 500), padding: 20, borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-mid)' }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace', marginBottom: 14 }}>And the technical moat compounds</div>
              <div className="deck-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                {[
                  { num: '95K', unit: 'lines', title: 'Decision engine' },
                  { num: '7', unit: 'patents', title: 'IP pending' },
                  { num: 'Q2', unit: '2026', title: 'HR-Bench launch' },
                  { num: '∞', unit: 'data', title: 'Flywheel effect' },
                ].map((m, i) => (
                  <div key={m.title} style={{ ...reveal(v(6), 600 + i * 80), paddingLeft: 12, borderLeft: '2px solid rgba(176,141,87,0.4)' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginBottom: 4 }}>
                      <span style={{ fontSize: 22, fontWeight: 900, color: 'var(--gold)', letterSpacing: '-0.03em', lineHeight: 1 }}>{m.num}</span>
                      <span style={{ fontSize: 10, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>{m.unit}</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{m.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 7 — TRACTION ═══ */}
        <section ref={setRef(7)} data-slide="7" style={{ ...slideBase, backgroundColor: 'var(--bg-surface)' }}>
          <div style={glowLine(v(7))} />
          <Particles />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 960, width: '100%' }}>
            <p style={{ ...reveal(v(7), 0), fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20, fontFamily: 'var(--font-mono), monospace' }}>
              Traction
            </p>
            <h2 style={{ ...reveal(v(7), 100), fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.1, marginBottom: 16 }}>
              The pipeline is already<br />pricing in <span style={{ color: 'var(--gold)' }}>the work.</span>
            </h2>
            <p style={{ ...reveal(v(7), 200), fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 580, marginBottom: 40 }}>
              Design partners aren&apos;t buying a &ldquo;HR AI tool.&rdquo; They&apos;re replacing a headcount plan. That&apos;s a different conversation &mdash; and a different price tag.
            </p>

            <div className="deck-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
              {[
                { value: '10', label: 'Design partners', sub: 'in private beta' },
                { value: '3,200+', label: 'Employees covered', sub: 'across partners' },
                { value: '5', label: 'Industries', sub: 'regulated \u2192 tech' },
                { value: '50\u2013500', label: 'Headcount range', sub: 'per customer' },
              ].map((t, i) => (
                <div key={t.label} style={{ ...revealScale(v(7), 250 + i * 110), padding: '28px 18px', borderRadius: 14, backgroundColor: 'rgba(17,17,19,0.5)', backdropFilter: 'blur(16px)', border: '1px solid rgba(176,141,87,0.1)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.25), transparent)' }} />
                  <div style={{ fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 900, color: 'var(--gold)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 8 }}>{t.value}</div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{t.label}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-faint)' }}>{t.sub}</p>
                </div>
              ))}
            </div>

            <div className="deck-grid-2" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 14 }}>
              <div style={{ ...revealScale(v(7), 650), padding: 20, borderRadius: 12, backgroundColor: 'rgba(17,17,19,0.4)', backdropFilter: 'blur(12px)', border: '1px solid var(--border-mid)' }}>
                <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'var(--font-mono), monospace' }}>Industries validated</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['Healthcare', 'Financial Services', 'Technology', 'Construction', 'Education'].map((ind) => (
                    <span key={ind} style={{ padding: '5px 11px', borderRadius: 999, backgroundColor: 'rgba(176,141,87,0.06)', border: '1px solid rgba(176,141,87,0.1)', fontSize: 11, color: 'var(--text-muted)' }}>{ind}</span>
                  ))}
                </div>
              </div>
              <div style={{ ...revealScale(v(7), 750), padding: 20, borderRadius: 12, backgroundColor: 'rgba(17,17,19,0.4)', backdropFilter: 'blur(12px)', border: '1px solid var(--border-mid)' }}>
                <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'var(--font-mono), monospace' }}>What they say</p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55, fontStyle: 'italic', fontFamily: 'var(--font-serif), Georgia, serif' }}>
                  &ldquo;We were about to hire our second HR admin. MambaHR killed that req.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 8 — BUSINESS MODEL ═══ */}
        <section ref={setRef(8)} data-slide="8" style={{ ...slideBase, backgroundColor: 'var(--bg)' }}>
          <div style={glowLine(v(8))} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 960, width: '100%' }}>
            <p style={{ ...reveal(v(8), 0), fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20, fontFamily: 'var(--font-mono), monospace' }}>
              Business Model &middot; Digital Headcount
            </p>
            <h2 style={{ ...reveal(v(8), 100), fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.1, marginBottom: 16 }}>
              Priced as one HR admin.<br /><span style={{ color: 'var(--gold)' }}>Working 24/7.</span>
            </h2>
            <p style={{ ...reveal(v(8), 200), fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 620, marginBottom: 40 }}>
              Platform fee + per-outcome usage. Customers buy capacity they&apos;d otherwise hire humans for. Every new outcome we automate is pure expansion revenue at &gt;90% gross margin.
            </p>

            {/* ROI comparison bar */}
            <div style={{ ...revealScale(v(8), 300), padding: 24, borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid rgba(176,141,87,0.2)', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.3), transparent)' }} />
              <div className="deck-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace', marginBottom: 8 }}>The human equivalent</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: 'var(--text-faint)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 4, textDecoration: 'line-through', textDecorationColor: 'rgba(176,141,87,0.3)' }}>$75K&ndash;$95K</div>
                  <div style={{ fontSize: 12, color: 'var(--text-faint)' }}>1 HR Generalist, per year <span style={{ opacity: 0.6 }}>(Payscale, 2026)</span></div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace', marginBottom: 8 }}>MambaHR Growth plan</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: 'var(--gold)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 4 }}>$18K</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Handles the workload of 1\u20132 admins, 24/7</div>
                </div>
              </div>
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border-mid)', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--gold)', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Customer math</span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--text)', fontWeight: 600 }}>4&ndash;6x payback</span> in year one. And the agent doesn&apos;t quit, go on leave, or need an HRIS seat to work.
                </span>
              </div>
            </div>

            {/* Pricing Tiers */}
            <div className="deck-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {[
                { name: 'Starter', price: '$500', equiv: '\u00bd HR coordinator', credits: '1,000', overage: '$0.50', highlight: false },
                { name: 'Growth', price: '$1,500', equiv: '1 HR generalist', credits: '5,000', overage: '$0.35', highlight: true },
                { name: 'Scale', price: '$3,500', equiv: 'Full HR function', credits: '15,000', overage: '$0.20', highlight: false },
              ].map((t, i) => (
                <div key={t.name} style={{ ...revealScale(v(8), 500 + i * 120), padding: 22, borderRadius: 14, backgroundColor: t.highlight ? 'rgba(176,141,87,0.06)' : 'var(--bg-surface)', border: t.highlight ? '1px solid rgba(176,141,87,0.3)' : '1px solid var(--border-mid)', position: 'relative', overflow: 'hidden' }}>
                  {t.highlight && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />}
                  <div style={{ fontSize: 10, fontWeight: 600, color: t.highlight ? 'var(--gold)' : 'var(--text-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, fontFamily: 'var(--font-mono), monospace' }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 14, fontStyle: 'italic' }}>{t.equiv}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16 }}>
                    <span style={{ fontSize: 28, fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1 }}>{t.price}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>/mo</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, paddingBottom: 8, borderBottom: '1px solid var(--border-mid)' }}>
                      <span style={{ color: 'var(--text-faint)' }}>Outcomes</span>
                      <span style={{ color: 'var(--text)', fontWeight: 600 }}>{t.credits}/mo</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, paddingBottom: 8, borderBottom: '1px solid var(--border-mid)' }}>
                      <span style={{ color: 'var(--text-faint)' }}>Overage</span>
                      <span style={{ color: 'var(--text)', fontWeight: 600 }}>{t.overage}/unit</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                      <span style={{ color: 'var(--text-faint)' }}>HR seats</span>
                      <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Unlimited</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 9 — MARKET ═══ */}
        <section ref={setRef(9)} data-slide="9" style={{ ...slideBase, backgroundColor: 'var(--bg-surface)' }}>
          <div style={glowLine(v(9))} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 960, width: '100%' }}>
            <p style={{ ...reveal(v(9), 0), fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20, fontFamily: 'var(--font-mono), monospace' }}>
              Market &middot; The Real TAM
            </p>
            <h2 style={{ ...reveal(v(9), 100), fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.1, marginBottom: 16 }}>
              We&apos;re not sized to software.<br /><span style={{ color: 'var(--gold)' }}>We&apos;re sized to labor.</span>
            </h2>
            <p style={{ ...reveal(v(9), 200), fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 620, marginBottom: 40 }}>
              Incumbents fight for a share of the $18B HR software dollar. We&apos;re priced against the $315B+ HR labor bill behind it. Every seat that cannibalizes a software license is a win for Rippling. Every outcome we deliver cannibalizes a human headcount plan.
            </p>

            {/* Layered TAM */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
              {[
                { label: 'CROSSED OUT', value: '$18B', title: 'HR software TAM', desc: '2028 global HR software spend \u2014 the old game, where incumbents lock horns', pct: 14, faded: true, source: 'iMARC Group, 2026' },
                { label: 'SAM', value: '$42B', title: 'HR services & outsourcing', desc: 'Global HR outsourcing market (2026) \u2014 growing to $73B by 2032', pct: 36, faded: false, source: 'Research & Markets, 2026' },
                { label: 'TAM', value: '$315B+', title: 'Total US HR labor spend', desc: '4.2M HR professionals \u00d7 $75K avg \u2014 the real prize when you sell outcomes', pct: 100, faded: false, source: 'BLS OOH + Payscale, 2025' },
              ].map((m, i) => (
                <div key={m.title} style={{ ...reveal(v(9), 250 + i * 150), padding: 20, borderRadius: 14, backgroundColor: m.faded ? 'rgba(9,9,11,0.4)' : 'var(--bg)', border: m.faded ? '1px solid var(--border-mid)' : '1px solid rgba(176,141,87,0.2)', opacity: m.faded ? 0.55 : 1, position: 'relative', overflow: 'hidden' }}>
                  {!m.faded && <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, background: 'linear-gradient(180deg, var(--gold), rgba(176,141,87,0.3))' }} />}
                  <div style={{ paddingLeft: m.faded ? 0 : 10 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8, gap: 16, flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                        <span style={{ fontSize: 10, fontWeight: 600, color: m.faded ? 'var(--text-faint)' : 'var(--gold)', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.06em', minWidth: 100 }}>{m.label}</span>
                        <span style={{ fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 900, color: m.faded ? 'var(--text-faint)' : 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1, textDecoration: m.faded ? 'line-through' : 'none', textDecorationColor: 'rgba(176,141,87,0.4)' }}>{m.value}</span>
                        <span style={{ fontSize: 13, color: m.faded ? 'var(--text-faint)' : 'var(--text)', fontWeight: 600 }}>{m.title}</span>
                      </div>
                      <span style={{ fontSize: 10, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.04em' }}>{m.source}</span>
                    </div>
                    <div style={{ marginBottom: 6, height: 6, borderRadius: 3, backgroundColor: 'var(--border-mid)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: 3, backgroundColor: m.faded ? 'var(--text-faint)' : 'var(--gold)', width: v(9) ? `${m.pct}%` : '0%', transition: `width 1.2s ${EASE} ${400 + i * 200}ms`, opacity: m.faded ? 0.4 : 0.85, boxShadow: m.faded ? 'none' : '0 0 16px rgba(176,141,87,0.3)' }} />
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--text-faint)', lineHeight: 1.5 }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Wedge + global upside */}
            <div className="deck-grid-2" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 14 }}>
              <div style={{ ...reveal(v(9), 900), padding: 18, borderRadius: 12, backgroundColor: 'var(--bg)', border: '1px solid var(--border-mid)' }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace', marginBottom: 8 }}>Wedge</div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                  Start with Series A&ndash;B (50&ndash;500 headcount). Replace the 2nd HR admin req at <span style={{ color: 'var(--text)', fontWeight: 600 }}>$18K/yr vs $160K/yr</span>. Expand into onboarding, comp, and workforce intelligence.
                </p>
              </div>
              <div style={{ ...reveal(v(9), 1000), padding: 18, borderRadius: 12, backgroundColor: 'var(--bg)', border: '1px solid var(--border-mid)' }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace', marginBottom: 8 }}>Global upside</div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                  HR labor spend globally clears <span style={{ color: 'var(--text)', fontWeight: 600 }}>$1T</span>. EU, UK, and APAC are the same trap \u2014 same capture.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 10 — TEAM ═══ */}
        <section ref={setRef(10)} data-slide="10" style={{ ...slideBase, backgroundColor: 'var(--bg)' }}>
          <div style={glowLine(v(10))} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 880, width: '100%' }}>
            <p style={{ ...reveal(v(10), 0), fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20, fontFamily: 'var(--font-mono), monospace' }}>
              Team &middot; Why us
            </p>
            <h2 style={{ ...reveal(v(10), 100), fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.1, marginBottom: 16 }}>
              The rare pairing:<br />HR operator <span style={{ color: 'var(--gold)' }}>+</span> regulated-industry engineer.
            </h2>
            <p style={{ ...reveal(v(10), 200), fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 580, marginBottom: 36 }}>
              You can&apos;t build an autonomous HR agent with ex-consumer-AI engineers alone. You need someone who has lived inside the HRIS, and someone who has shipped decisions into regulated-systems under audit.
            </p>

            <div className="deck-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { name: 'Brian Bell', role: 'CEO & Co-Founder', bio: '15+ years in People Ops at DocuSign, Asana, and Snowflake. Lived every broken HR workflow MambaHR now automates. Scaled HR through one of the largest IPOs in history.', avatar: '/brian_bell.jpeg', linkedin: 'https://www.linkedin.com/in/brianjosephbell/' },
                { name: 'Sebastian Kirsch', role: 'CTO & Co-Founder', bio: 'Founding engineer. Shipped security-critical products for a $600B Swiss bank where every decision was audited. Ex Numbrs, Antler. Knows how to get autonomous agents certified inside regulated enterprises.', avatar: '/sebastian_kirsch.jpg', linkedin: 'https://www.linkedin.com/in/sebastiankirsch-/' },
              ].map((p, i) => (
                <div key={p.name} style={{ ...revealScale(v(10), 300 + i * 150), padding: 28, borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-mid)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--gold), rgba(176,141,87,0.2), transparent)' }} />
                  <Image src={p.avatar} alt={p.name} width={56} height={56} style={{ borderRadius: 14, objectFit: 'cover', border: '1px solid var(--border-mid)', marginBottom: 18 }} />
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{p.name}</h3>
                  <p style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 500, marginBottom: 14 }}>{p.role}</p>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 11 — THE ASK + CLOSE ═══ */}
        <section ref={setRef(11)} data-slide="11" style={{ ...slideBase, backgroundColor: 'var(--bg-surface)' }}>
          <div style={glowLine(v(11))} />
          <Particles />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 880, width: '100%', textAlign: 'center' }}>
            <p style={{ ...reveal(v(11), 0), fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20, fontFamily: 'var(--font-mono), monospace' }}>
              The Ask
            </p>
            <h2 style={{ ...reveal(v(11), 100), fontSize: 'clamp(40px, 5.5vw, 80px)', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--text)', lineHeight: 1, marginBottom: 10 }}>
              $3M<span style={{ color: 'var(--gold)' }}>.</span>
            </h2>
            <p style={{ ...reveal(v(11), 200), fontSize: 17, color: 'var(--text-muted)', marginBottom: 40, lineHeight: 1.5, maxWidth: 560, margin: '0 auto 40px' }}>
              Seed round. Capture the mid-market before incumbents realize the game changed from SaaS to services.
            </p>

            <div className="deck-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, textAlign: 'left', marginBottom: 44 }}>
              {[
                { pct: '50%', title: 'Engineering', items: ['Scale the agent platform', 'Multi-tenant architecture', 'SOC 2 + compliance'] },
                { pct: '30%', title: 'Go-to-Market', items: ['10 design partners \u2192 $1M ARR', 'First AE + customer success', 'Land-and-expand motion'] },
                { pct: '20%', title: 'Moat', items: ['HR-Bench public launch', 'Patent prosecution', 'Domain model training'] },
              ].map((b, i) => (
                <div key={b.title} style={{ ...revealScale(v(11), 300 + i * 120), padding: 24, borderRadius: 16, backgroundColor: 'rgba(17,17,19,0.5)', backdropFilter: 'blur(16px)', border: '1px solid rgba(176,141,87,0.1)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.25), transparent)' }} />
                  <div style={{ fontSize: 26, fontWeight: 900, color: 'var(--gold)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 4 }}>{b.pct}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>{b.title}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {b.items.map((item) => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'var(--gold)', opacity: 0.5, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* The greedy-making comps strip */}
            <div style={{ ...reveal(v(11), 650), padding: 18, borderRadius: 14, backgroundColor: 'rgba(9,9,11,0.5)', border: '1px solid rgba(176,141,87,0.15)', marginBottom: 40, display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace', alignSelf: 'center' }}>Services-as-software comps</div>
              {[
                { name: 'Harvey', val: '$11B', arr: '$190M ARR' },
                { name: 'Sierra', val: '$10B', arr: '$150M ARR' },
                { name: 'Decagon', val: '$650M', arr: '900% YoY' },
              ].map((c) => (
                <div key={c.name} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>{c.name}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{c.val}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-faint)' }}>&middot; {c.arr}</span>
                </div>
              ))}
            </div>

            {/* Close tagline */}
            <div style={reveal(v(11), 800)}>
              <div style={{ width: 48, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', margin: '0 auto 20px', opacity: 0.4 }} />
              <p style={{ fontSize: 'clamp(18px, 2.4vw, 26px)', fontWeight: 500, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 6, lineHeight: 1.3, fontFamily: 'var(--font-serif), Georgia, serif', fontStyle: 'italic' }}>
                The $6 services dollar,<br />re-priced at software margins.
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-faint)', lineHeight: 1.5, marginBottom: 18 }}>
                That&apos;s the company. We&apos;re taking it.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: 'var(--gold)', boxShadow: '0 0 10px rgba(176,141,87,0.5)', animation: 'breathe 3s ease-in-out infinite' }} />
                <span style={{ fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.08em' }}>
                  MAMBAHR &middot; SEED 2026 &middot; investors@mambahr.com
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
