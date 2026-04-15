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

function revealClip(on: boolean, delay = 0): React.CSSProperties {
  return {
    clipPath: on ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
    transition: `clip-path 1s ${EASE} ${delay}ms`,
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

/* ── Flywheel (spinning moat diagram) ── */
function Flywheel({ on }: { on: boolean }) {
  return (
    <div style={{ ...revealScale(on, 400), position: 'relative', width: 180, height: 180, margin: '0 auto' }}>
      <svg width="180" height="180" viewBox="0 0 180 180">
        <circle cx="90" cy="90" r="72" fill="none" stroke="rgba(176,141,87,0.12)" strokeWidth="1" />
        <circle cx="90" cy="90" r="72" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="5 9" opacity="0.35">
          <animateTransform attributeName="transform" type="rotate" from="0 90 90" to="360 90 90" dur="20s" repeatCount="indefinite" />
        </circle>
        <circle cx="90" cy="90" r="18" fill="rgba(176,141,87,0.06)" stroke="var(--gold)" strokeWidth="1" opacity="0.5" />
        <text x="90" y="93" fill="var(--gold)" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="600" opacity="0.7">MOAT</text>
      </svg>
      {['Data In', 'Agent Runs', 'Verified', 'Learns'].map((s, i) => {
        const a = (i * 90 - 90) * (Math.PI / 180)
        return (
          <div key={s} style={{ position: 'absolute', left: 90 + Math.cos(a) * 72, top: 90 + Math.sin(a) * 72, transform: 'translate(-50%,-50%)', padding: '3px 8px', borderRadius: 4, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-mid)', fontSize: 8, fontWeight: 500, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace', whiteSpace: 'nowrap' }}>
            {s}
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
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 700 }}>
            <div style={reveal(v(0), 0)}>
              <span style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 999, border: '1px solid rgba(176,141,87,0.2)', fontSize: 10, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace', marginBottom: 48 }}>
                Confidential
              </span>
            </div>
            <h1 style={{ ...reveal(v(0), 150), fontSize: 'clamp(52px, 7vw, 88px)', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--text)', lineHeight: 1, marginBottom: 24 }}>
              Mamba<span style={{ color: 'var(--gold)' }}>HR</span>
            </h1>
            <p style={{ ...reveal(v(0), 300), fontSize: 'clamp(17px, 2vw, 22px)', color: 'var(--text-muted)', maxWidth: 460, margin: '0 auto 48px', lineHeight: 1.5, fontWeight: 400 }}>
              The autonomous AI agent<br />for people operations.
            </p>
            <div style={reveal(v(0), 450)}>
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
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, width: '100%' }}>
            <p style={{ ...reveal(v(1), 0), fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 32, fontFamily: 'var(--font-mono), monospace' }}>
              The Problem
            </p>
            <h2 style={{ ...reveal(v(1), 100), fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.05, marginBottom: 32 }}>
              4.2 million HR professionals.<br />
              <span style={{ color: 'var(--text-faint)' }}>Still drowning in admin.</span>
            </h2>
            <p style={{ ...reveal(v(1), 250), fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 520, marginBottom: 48 }}>
              Every growing company hits the same wall. HR teams buried in leave requests, onboarding checklists, policy questions. The tools they have are dashboards &mdash; they show the work, but none of them do the work.
            </p>
            <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
              {[
                { num: '40%', desc: 'of HR time spent on tasks an agent could handle in seconds' },
                { num: '$18B', desc: 'HR software market by 2028 — all dashboards, zero automation' },
                { num: '0', desc: 'products that actually do the work end-to-end' },
              ].map((s, i) => (
                <div key={s.num} style={{ ...reveal(v(1), 400 + i * 120), flex: '1 1 140px' }}>
                  <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, color: 'var(--gold)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 8 }}>{s.num}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-faint)', lineHeight: 1.5 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 2 — WHY NOW ═══ */}
        <section ref={setRef(2)} data-slide="2" style={{ ...slideBase, backgroundColor: 'var(--bg)' }}>
          <div style={glowLine(v(2))} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, width: '100%' }}>
            <p style={{ ...reveal(v(2), 0), fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 32, fontFamily: 'var(--font-mono), monospace' }}>
              Why Now
            </p>
            <h2 style={{ ...reveal(v(2), 100), fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.1, marginBottom: 56 }}>
              Two shifts collided.
            </h2>
            <div className="deck-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div style={{ ...revealScale(v(2), 200), padding: 32, borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-mid)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
                <div style={{ fontSize: 48, marginBottom: 16, lineHeight: 1 }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>AI got good enough</h3>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  Language models can finally understand HR context &mdash; policies, exceptions, jurisdictions. But they can&apos;t get it right alone. They hallucinate. They guess. HR can&apos;t afford guessing.
                </p>
              </div>
              <div style={{ ...revealScale(v(2), 350), padding: 32, borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-mid)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
                <div style={{ fontSize: 48, marginBottom: 16, lineHeight: 1 }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>HR is drowning</h3>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  Every company adding 10 employees per month feels it. The leave requests, the onboarding logistics, the &ldquo;quick question&rdquo; that takes 45 minutes. HR teams are the most under-tooled function in the company.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 3 — THE INSIGHT ═══ */}
        <section ref={setRef(3)} data-slide="3" style={{ ...slideBase, backgroundColor: 'var(--bg-surface)' }}>
          <div style={glowLine(v(3))} />
          <Particles />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, textAlign: 'center' }}>
            <p style={{ ...reveal(v(3), 0), fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 40, fontFamily: 'var(--font-mono), monospace' }}>
              The Insight
            </p>
            <h2 style={{ ...reveal(v(3), 150), fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', lineHeight: 1.2, marginBottom: 32 }}>
              AI can <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>almost</em> do HR.
            </h2>
            <div style={{ ...reveal(v(3), 350), width: '100%', maxWidth: 500, margin: '0 auto 40px', position: 'relative' }}>
              <div style={{ height: 2, backgroundColor: 'var(--border-mid)', borderRadius: 1 }} />
              <div style={{ position: 'absolute', top: -4, left: '72%', width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--gold)', boxShadow: '0 0 16px rgba(176,141,87,0.5)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                <span style={{ fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>Generic AI</span>
                <span style={{ fontSize: 11, color: 'var(--gold)', fontFamily: 'var(--font-mono), monospace', fontWeight: 600 }}>The gap</span>
                <span style={{ fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>Reliable</span>
              </div>
            </div>
            <p style={{ ...reveal(v(3), 500), fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.4, marginBottom: 16 }}>
              Almost isn&apos;t good enough.
            </p>
            <p style={{ ...reveal(v(3), 650), fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
              The gap between &ldquo;AI can almost do this&rdquo; and &ldquo;AI can reliably do this&rdquo; is where our proprietary engine sits. That gap is the company.
            </p>
          </div>
        </section>

        {/* ═══ 4 — WHAT MAMBAHR DOES ═══ */}
        <section ref={setRef(4)} data-slide="4" style={{ ...slideBase, backgroundColor: 'var(--bg)' }}>
          <div style={glowLine(v(4))} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, width: '100%' }}>
            <div className="deck-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
              <div>
                <p style={{ ...reveal(v(4), 0), fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 32, fontFamily: 'var(--font-mono), monospace' }}>
                  The Product
                </p>
                <h2 style={{ ...reveal(v(4), 100), fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.1, marginBottom: 24 }}>
                  An AI agent that<br /><span style={{ color: 'var(--gold)' }}>does the work.</span>
                </h2>
                <p style={{ ...reveal(v(4), 250), fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32 }}>
                  Not a chatbot. Not a dashboard. MambaHR is an autonomous agent that handles leave approvals, onboarding workflows, offboarding, and people ops &mdash; end to end. Every decision verified against your policies.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {['Approves leave in seconds, not days', 'Onboards new hires while you sleep', 'Answers policy questions with citations', 'Predicts attrition before it happens'].map((item, i) => (
                    <div key={item} style={{ ...reveal(v(4), 400 + i * 100), display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--gold)', flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{item}</span>
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
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, width: '100%', textAlign: 'center' }}>
            <p style={{ ...reveal(v(5), 0), fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'var(--font-mono), monospace' }}>
              How It Works
            </p>
            <h2 style={{ ...reveal(v(5), 100), fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.1, marginBottom: 16 }}>
              The engine, not just the interface.
            </h2>
            <p style={{ ...reveal(v(5), 200), fontSize: 15, color: 'var(--text-muted)', marginBottom: 56, maxWidth: 480, margin: '0 auto 56px' }}>
              Every action passes through our proprietary HR decision engine. Not an LLM wrapper &mdash; a deterministic verification layer.
            </p>

            <div className="deck-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {[
                { step: '01', title: 'Understand', desc: 'Parse the request. Match to policy. Identify jurisdiction, exceptions, and edge cases.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg> },
                { step: '02', title: 'Verify', desc: 'Cross-reference against 95K lines of deterministic HR logic. No hallucination. No guessing.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M9 12l2 2 4-4" /><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /></svg> },
                { step: '03', title: 'Execute', desc: 'Take action. Send approvals, provision accounts, update systems. Log everything.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg> },
              ].map((s, i) => (
                <div key={s.step} style={{ ...revealScale(v(5), 300 + i * 150), padding: 32, borderRadius: 16, backgroundColor: 'var(--bg)', border: '1px solid var(--border-mid)', textAlign: 'left', position: 'relative', overflow: 'hidden', animation: v(5) ? `breathe 4s ease-in-out ${i * 0.5}s infinite` : 'none' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--gold), transparent)', opacity: 0.5 }} />
                  <div style={{ marginBottom: 16 }}>{s.icon}</div>
                  <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--gold)', fontFamily: 'var(--font-mono), monospace', marginBottom: 8 }}>{s.step}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 6 — DEFENSIBILITY ═══ */}
        <section ref={setRef(6)} data-slide="6" style={{ ...slideBase, backgroundColor: 'var(--bg)' }}>
          <div style={glowLine(v(6))} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, width: '100%' }}>
            <div style={{ marginBottom: 48 }}>
              <p style={{ ...reveal(v(6), 0), fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'var(--font-mono), monospace' }}>
                Defensibility
              </p>
              <h2 style={{ ...reveal(v(6), 100), fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.1 }}>
                Not a wrapper.<br />A multi-year technical moat.
              </h2>
            </div>

            <div className="deck-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              {[
                { num: '95K', unit: 'lines', title: 'Proprietary HR decision engine', desc: 'Deterministic logic. Every answer verified and auditable. Not prompt engineering.' },
                { num: '7', unit: 'patents', title: 'Pending intellectual property', desc: 'Novel IP in decision automation, workforce intelligence, confidence calibration.' },
                { num: '500', unit: 'scenarios', title: 'HR-Bench', desc: 'First open benchmark for AI on HR decisions. Launching Q2 2026. We set the standard.' },
                { num: '∞', unit: 'flywheel', title: 'Domain data compounding', desc: 'Every decision makes the engine smarter. Generic AI can\'t replicate years of domain data.' },
              ].map((m, i) => (
                <div key={m.title} style={{ ...revealScale(v(6), 200 + i * 100), padding: 28, borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-mid)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 2, borderRadius: 1, backgroundColor: 'var(--gold)', opacity: 0.4 }} />
                  <div style={{ paddingLeft: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
                      <span style={{ fontSize: 28, fontWeight: 900, color: 'var(--gold)', letterSpacing: '-0.03em', lineHeight: 1 }}>{m.num}</span>
                      <span style={{ fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>{m.unit}</span>
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>{m.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={revealScale(v(6), 700)}>
              <Flywheel on={v(6)} />
            </div>
          </div>
        </section>

        {/* ═══ 7 — TRACTION ═══ */}
        <section ref={setRef(7)} data-slide="7" style={{ ...slideBase, backgroundColor: 'var(--bg-surface)' }}>
          <div style={glowLine(v(7))} />
          <Particles />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, width: '100%' }}>
            <p style={{ ...reveal(v(7), 0), fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'var(--font-mono), monospace' }}>
              Traction
            </p>
            <h2 style={{ ...reveal(v(7), 100), fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.1, marginBottom: 48 }}>
              Early signals.
            </h2>

            <div className="deck-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
              {[
                { value: '3,200+', label: 'Employees managed', sub: 'across beta partners' },
                { value: '10', label: 'Design partners', sub: 'in private beta' },
                { value: '5', label: 'Industries', sub: 'healthcare to tech' },
              ].map((t, i) => (
                <div key={t.value} style={{ ...revealScale(v(7), 200 + i * 120), padding: '36px 24px', borderRadius: 16, backgroundColor: 'rgba(17,17,19,0.5)', backdropFilter: 'blur(16px)', border: '1px solid rgba(176,141,87,0.1)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.25), transparent)' }} />
                  <div style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 900, color: 'var(--gold)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 10 }}>{t.value}</div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{t.label}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-faint)' }}>{t.sub}</p>
                </div>
              ))}
            </div>

            <div className="deck-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ ...revealScale(v(7), 600), padding: 24, borderRadius: 12, backgroundColor: 'rgba(17,17,19,0.4)', backdropFilter: 'blur(12px)', border: '1px solid var(--border-mid)' }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>Industries</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['Healthcare', 'Financial Services', 'Technology', 'Construction', 'Education'].map((ind) => (
                    <span key={ind} style={{ padding: '5px 12px', borderRadius: 999, backgroundColor: 'rgba(176,141,87,0.06)', border: '1px solid rgba(176,141,87,0.1)', fontSize: 12, color: 'var(--text-muted)' }}>{ind}</span>
                  ))}
                </div>
              </div>
              <div style={{ ...revealScale(v(7), 700), padding: 24, borderRadius: 12, backgroundColor: 'rgba(17,17,19,0.4)', backdropFilter: 'blur(12px)', border: '1px solid var(--border-mid)' }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>Company size</p>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  50 to 500+ employees. The agent architecture scales with headcount &mdash; more employees means more decisions, more data, deeper moat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 8 — BUSINESS MODEL ═══ */}
        <section ref={setRef(8)} data-slide="8" style={{ ...slideBase, backgroundColor: 'var(--bg)' }}>
          <div style={glowLine(v(8))} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, width: '100%' }}>
            <p style={{ ...reveal(v(8), 0), fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'var(--font-mono), monospace' }}>
              Business Model
            </p>
            <h2 style={{ ...reveal(v(8), 100), fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.1, marginBottom: 16 }}>
              Platform fee <span style={{ color: 'var(--gold)' }}>+</span> usage.
            </h2>
            <p style={{ ...reveal(v(8), 200), fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 560, marginBottom: 48 }}>
              Predictable ARR floor. Expansion revenue tied to value delivered. Customers only pay more when the agent does more.
            </p>

            {/* Pricing Tiers */}
            <div className="deck-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
              {[
                { name: 'Starter', price: '$500', credits: '1,000', overage: '$0.50', highlight: false },
                { name: 'Growth', price: '$1,500', credits: '5,000', overage: '$0.35', highlight: true },
                { name: 'Scale', price: '$3,500', credits: '15,000', overage: '$0.20', highlight: false },
              ].map((t, i) => (
                <div key={t.name} style={{ ...revealScale(v(8), 300 + i * 120), padding: 24, borderRadius: 14, backgroundColor: t.highlight ? 'rgba(176,141,87,0.06)' : 'var(--bg-surface)', border: t.highlight ? '1px solid rgba(176,141,87,0.3)' : '1px solid var(--border-mid)', position: 'relative', overflow: 'hidden' }}>
                  {t.highlight && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />}
                  <div style={{ fontSize: 11, fontWeight: 600, color: t.highlight ? 'var(--gold)' : 'var(--text-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'var(--font-mono), monospace' }}>{t.name}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 20 }}>
                    <span style={{ fontSize: 32, fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1 }}>{t.price}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-faint)' }}>/mo</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, paddingBottom: 10, borderBottom: '1px solid var(--border-mid)' }}>
                      <span style={{ color: 'var(--text-faint)' }}>Included</span>
                      <span style={{ color: 'var(--text)', fontWeight: 600 }}>{t.credits} credits</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, paddingBottom: 10, borderBottom: '1px solid var(--border-mid)' }}>
                      <span style={{ color: 'var(--text-faint)' }}>Overage</span>
                      <span style={{ color: 'var(--text)', fontWeight: 600 }}>{t.overage}/credit</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                      <span style={{ color: 'var(--text-faint)' }}>HR team seats</span>
                      <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Unlimited</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Credit costs */}
            <div style={{ ...reveal(v(8), 700), padding: 20, borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-mid)' }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14, fontFamily: 'var(--font-mono), monospace' }}>Credits scale with workflow complexity</p>
              <div className="deck-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 32px' }}>
                {[
                  { action: 'Policy Q&A', credits: '1' },
                  { action: 'Onboarding workflow', credits: '25' },
                  { action: 'Leave approval', credits: '2' },
                  { action: 'Offboarding workflow', credits: '35' },
                  { action: 'Pay transparency report', credits: '30' },
                  { action: 'RIF batch (per employee)', credits: '15' },
                ].map((c) => (
                  <div key={c.action} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '3px 0' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{c.action}</span>
                    <span style={{ color: 'var(--gold)', fontWeight: 600, fontFamily: 'var(--font-mono), monospace' }}>{c.credits}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 9 — MARKET ═══ */}
        <section ref={setRef(9)} data-slide="9" style={{ ...slideBase, backgroundColor: 'var(--bg-surface)' }}>
          <div style={glowLine(v(9))} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, width: '100%' }}>
            <p style={{ ...reveal(v(9), 0), fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'var(--font-mono), monospace' }}>
              Market
            </p>
            <h2 style={{ ...reveal(v(9), 100), fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.1, marginBottom: 56 }}>
              Size the prize.
            </h2>

            {/* TAM / SAM / SOM */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { label: 'TAM', value: '$18B', desc: 'Global HR software market by 2028', pct: 100 },
                { label: 'SAM', value: '$4.2B', desc: 'Mid-market HR automation (50-500 employees)', pct: 55 },
                { label: 'SOM', value: '$420M', desc: 'AI-first HR agent — leave, onboarding, ops', pct: 25 },
              ].map((m, i) => (
                <div key={m.label} style={{ ...reveal(v(9), 200 + i * 150) }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--gold)', fontFamily: 'var(--font-mono), monospace', minWidth: 32 }}>{m.label}</span>
                    <span style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1 }}>{m.value}</span>
                  </div>
                  <div style={{ marginBottom: 6, height: 4, borderRadius: 2, backgroundColor: 'var(--border-mid)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 2, backgroundColor: 'var(--gold)', width: v(9) ? `${m.pct}%` : '0%', transition: `width 1.2s ${EASE} ${400 + i * 200}ms`, opacity: 0.7 }} />
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-faint)' }}>{m.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ ...reveal(v(9), 900), marginTop: 48, padding: 24, borderRadius: 14, backgroundColor: 'var(--bg)', border: '1px solid var(--border-mid)' }}>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                <strong style={{ color: 'var(--text)' }}>Wedge &amp; expand:</strong> Start with leave management (highest-frequency, lowest-risk). Expand into onboarding, offboarding, workforce intelligence. Each module deepens the moat and increases ACV.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ 10 — TEAM ═══ */}
        <section ref={setRef(10)} data-slide="10" style={{ ...slideBase, backgroundColor: 'var(--bg)' }}>
          <div style={glowLine(v(10))} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, width: '100%' }}>
            <p style={{ ...reveal(v(10), 0), fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'var(--font-mono), monospace' }}>
              Team
            </p>
            <h2 style={{ ...reveal(v(10), 100), fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.1, marginBottom: 48 }}>
              The people behind MambaHR.
            </h2>

            <div className="deck-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[
                { name: 'Brian Bell', role: 'CEO & Co-Founder', bio: '15+ years in People Ops at DocuSign, Asana, and Snowflake. Scaled HR through one of the largest IPOs in history.', avatar: '/brian_bell.jpeg', linkedin: 'https://www.linkedin.com/in/brianjosephbell/' },
                { name: 'Sebastian Kirsch', role: 'CTO & Co-Founder', bio: 'Founding engineer. Built security-critical products for a $600B Swiss bank. Ex Numbrs, Antler. Deep regulated-industry experience.', avatar: '/sebastian_kirsch.jpg', linkedin: 'https://www.linkedin.com/in/sebastiankirsch-/' },
              ].map((p, i) => (
                <div key={p.name} style={{ ...revealScale(v(10), 200 + i * 150), padding: 32, borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-mid)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--gold), rgba(176,141,87,0.2), transparent)' }} />
                  <Image src={p.avatar} alt={p.name} width={56} height={56} style={{ borderRadius: 14, objectFit: 'cover', border: '1px solid var(--border-mid)', marginBottom: 20 }} />
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
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, width: '100%', textAlign: 'center' }}>
            <p style={{ ...reveal(v(11), 0), fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'var(--font-mono), monospace' }}>
              The Ask
            </p>
            <h2 style={{ ...reveal(v(11), 100), fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--text)', lineHeight: 1, marginBottom: 12 }}>
              $3M<span style={{ color: 'var(--gold)' }}>.</span>
            </h2>
            <p style={{ ...reveal(v(11), 200), fontSize: 17, color: 'var(--text-muted)', marginBottom: 48, lineHeight: 1.5 }}>
              Seed round to build the defining HR AI company.
            </p>

            <div className="deck-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, textAlign: 'left', marginBottom: 56 }}>
              {[
                { pct: '50%', title: 'Engineering', items: ['Scale the agent platform', 'Multi-tenant architecture', 'Compliance certifications'] },
                { pct: '30%', title: 'Go-to-Market', items: ['10 design partners → 50 paid', 'Sales hire #1', 'Customer success foundation'] },
                { pct: '20%', title: 'Research', items: ['HR-Bench public launch', 'Patent prosecution', 'Domain model training'] },
              ].map((b, i) => (
                <div key={b.title} style={{ ...revealScale(v(11), 300 + i * 120), padding: 28, borderRadius: 16, backgroundColor: 'rgba(17,17,19,0.5)', backdropFilter: 'blur(16px)', border: '1px solid rgba(176,141,87,0.1)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.25), transparent)' }} />
                  <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--gold)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 4 }}>{b.pct}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>{b.title}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {b.items.map((item) => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'var(--gold)', opacity: 0.5, flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.4 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Close tagline */}
            <div style={reveal(v(11), 700)}>
              <div style={{ width: 48, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', margin: '0 auto 24px', opacity: 0.4 }} />
              <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em', marginBottom: 12 }}>
                The future of HR is autonomous.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: 'var(--gold)', boxShadow: '0 0 10px rgba(176,141,87,0.5)', animation: 'breathe 3s ease-in-out infinite' }} />
                <span style={{ fontSize: 12, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.04em' }}>
                  MAMBAHR &middot; SEED 2026
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
