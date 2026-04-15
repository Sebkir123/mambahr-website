'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import AnimateOnScroll from '@/components/animate-on-scroll'
import { submitInvestorContact } from '@/lib/actions'
import TurnstileWidget from '@/components/turnstile-widget'

/* ── Full-section particle background ── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const isVisible = useRef(true)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { isVisible.current = e.isIntersecting }, { threshold: 0 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.scale(dpr, dpr)
      return { w: rect.width, h: rect.height }
    }

    let dims = resize()
    if (!dims) return
    let { w, h } = dims

    window.addEventListener('resize', () => { dims = resize(); if (dims) { w = dims.w; h = dims.h } })

    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number; ps: number; po: number }[] = []
    for (let i = 0; i < 80; i++) {
      particles.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: Math.random() * 1.8 + 0.4, o: Math.random() * 0.35 + 0.05, ps: Math.random() * 0.02 + 0.005, po: Math.random() * Math.PI * 2 })
    }

    let animId: number, t = 0
    function draw() {
      if (!isVisible.current) { animId = requestAnimationFrame(draw); return }
      t++; ctx!.clearRect(0, 0, w, h)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) { ctx!.beginPath(); ctx!.moveTo(particles[i].x, particles[i].y); ctx!.lineTo(particles[j].x, particles[j].y); ctx!.strokeStyle = `rgba(176,141,87,${0.05 * (1 - dist / 140)})`; ctx!.lineWidth = 0.5; ctx!.stroke() }
        }
      }
      for (const p of particles) {
        const pulse = Math.sin(t * p.ps + p.po) * 0.15 + 0.85
        ctx!.beginPath(); ctx!.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2); ctx!.fillStyle = `rgba(176,141,87,${p.o * pulse})`; ctx!.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10; if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

/* ── Flywheel ── */
function Flywheel() {
  return (
    <div style={{ position: 'relative', width: 200, height: 200, margin: '0 auto' }}>
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="80" fill="none" stroke="var(--border-light)" strokeWidth="1" />
        <circle cx="100" cy="100" r="80" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="6 10" opacity="0.35">
          <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="18s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="100" r="20" fill="var(--bg-light-surface)" stroke="var(--gold)" strokeWidth="1" opacity="0.5" />
        <text x="100" y="103" fill="var(--gold)" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="600" opacity="0.7">MOAT</text>
      </svg>
      {['Data In', 'Agent Runs', 'Verified', 'Learns'].map((s, i) => {
        const a = (i * 90 - 90) * (Math.PI / 180)
        return (
          <div key={s} style={{ position: 'absolute', left: 100 + Math.cos(a) * 80, top: 100 + Math.sin(a) * 80, transform: 'translate(-50%,-50%)', padding: '3px 8px', borderRadius: 4, backgroundColor: 'var(--bg-light-surface)', border: '1px solid var(--border-light)', fontSize: 8, fontWeight: 500, color: 'var(--text-dark-faint)', fontFamily: 'var(--font-mono), monospace', whiteSpace: 'nowrap' }}>
            {s}
          </div>
        )
      })}
    </div>
  )
}

const moats = [
  { num: '01', title: '95K lines of HR domain logic', desc: 'Deterministic HR decision engine. Every answer verified and auditable.' },
  { num: '02', title: 'HR-Bench', desc: 'First open benchmark for AI on HR decisions. 500 scenarios. Launching Q2 2026.' },
  { num: '03', title: '7 patents pending', desc: 'Novel IP in decision automation, workforce intelligence, confidence calibration.' },
  { num: '04', title: 'Domain data flywheel', desc: 'Every decision processed makes models better. Generic AI can\'t replicate this.' },
]

export default function InvestorsPage() {
  const [sent, setSent] = useState(false)
  const [returning, setReturning] = useState(false)
  const [investorError, setInvestorError] = useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  return (
    <>
      <Nav />
      <main>
        {/* ═══ HERO ═══ */}
        <section className="relative" style={{ paddingTop: 140, paddingBottom: 80, backgroundColor: 'var(--bg)', overflow: 'hidden' }}>
          <ParticleField />
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', position: 'relative', textAlign: 'center', zIndex: 1 }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--gold)', marginBottom: 20, letterSpacing: '0.06em', textTransform: 'uppercase' }}>For Investors</p>
            <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text)', maxWidth: 600, margin: '0 auto 20px' }}>
              The AI infrastructure layer <span style={{ color: 'var(--gold)' }}>for HR.</span>
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto 36px' }}>
              An $18B software market where every product is a dashboard. None of them do the work. MambaHR does.
            </p>
            <a href="#contact" className="cta-glow" style={{ display: 'inline-block', padding: '14px 32px', borderRadius: 999, backgroundColor: 'var(--gold)', color: '#fff', fontSize: 15, fontWeight: 600, textDecoration: 'none', marginBottom: 56 }}>
              Get in touch
            </a>

            {/* Stat strip */}
            <div style={{ backgroundColor: 'rgba(17,17,19,0.45)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderRadius: 16, border: '1px solid rgba(176,141,87,0.12)', padding: '40px 24px', maxWidth: 760, margin: '0 auto', boxShadow: '0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(176,141,87,0.08)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.3), transparent)' }} />
              <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 24 }}>
                {[
                  { value: '$18B', label: 'Market by 2028', gold: true },
                  { value: '4.2M', label: 'HR professionals', gold: false },
                  { value: 'Q2 2026', label: 'HR-Bench launch', gold: true },
                  { value: '7', label: 'Patents pending', gold: false },
                ].map((stat, i) => (
                  <div key={stat.value} style={{ textAlign: 'center', padding: '0 16px', position: 'relative' }}>
                    {i > 0 && <div className="hidden md:block" style={{ position: 'absolute', left: -12, top: '10%', bottom: '10%', width: 1, background: 'linear-gradient(to bottom, transparent, rgba(176,141,87,0.2), transparent)' }} />}
                    <div style={{ fontSize: 'clamp(30px, 3.5vw, 40px)', fontWeight: 900, color: stat.gold ? 'var(--gold)' : 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 8 }}>{stat.value}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.03em', textTransform: 'uppercase' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ WHY NOW — premium dark split ═══ */}
        <section style={{ padding: '96px 24px', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--gold)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>The Opportunity</p>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 48, maxWidth: 500 }}>
              Why now?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 48 }}>
              {/* Left — narrative */}
              <div style={{ padding: 32, borderRadius: 16, backgroundColor: 'var(--bg)', border: '1px solid var(--border-mid)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Two shifts collided.</h3>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16 }}>
                  Language models got good enough to understand HR context — but not good enough to get it right alone. And every growing company is drowning in HR admin.
                </p>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  The gap between &ldquo;AI can almost do this&rdquo; and &ldquo;AI can reliably do this&rdquo; is exactly where our proprietary engine sits. That&apos;s the moat.
                </p>
              </div>

              {/* Right — stats with gold accent bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { value: '4.2M', label: 'HR professionals in the US — most still use email and spreadsheets' },
                  { value: '40%', label: 'of HR time spent on admin tasks an agent can handle in seconds' },
                  { value: '3x', label: 'growth in HR AI adoption over the last 12 months' },
                ].map((stat, i) => (
                  <div
                    key={stat.value}
          
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 16,
                      padding: '24px 0',
                      borderBottom: i < 2 ? '1px solid var(--border-mid)' : 'none',
                      transitionDelay: `${i * 100}ms`,
                    }}
                  >
                    <span style={{ fontSize: 32, fontWeight: 900, color: 'var(--gold)', letterSpacing: '-0.03em', lineHeight: 1, minWidth: 72 }}>{stat.value}</span>
                    <span style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5 }}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ WHY WE WIN — light section with visuals ═══ */}
        <section style={{ padding: '96px 24px', backgroundColor: 'var(--bg-light)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--gold)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Defensibility</p>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-dark)', marginBottom: 12 }}>
                Why MambaHR wins.
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text-dark-muted)', maxWidth: 440, margin: '0 auto' }}>
                Not a wrapper. A multi-year technical moat.
              </p>
            </div>

            {/* Moat cards */}
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 16, marginBottom: 32 }}>
              {moats.map((m, i) => (
                <div key={m.num} className="card-hover" style={{ padding: 28, borderRadius: 14, backgroundColor: 'var(--bg-light-surface)', border: '1px solid var(--border-light)', transitionDelay: `${i * 80}ms`, position: 'relative', overflow: 'hidden' }}>
                  {/* Left gold accent */}
                  <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 2, borderRadius: 1, backgroundColor: 'var(--gold)', opacity: 0.4 }} />
                  <div style={{ paddingLeft: 12 }}>
                    <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--gold)', fontFamily: 'var(--font-mono), monospace' }}>{m.num}</span>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-dark)', margin: '10px 0 6px' }}>{m.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--text-dark-muted)', lineHeight: 1.6 }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Benchmark + Flywheel */}
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 16 }}>
              <div className="card-hover" style={{ padding: 28, borderRadius: 14, backgroundColor: 'var(--bg-light-surface)', border: '1px solid var(--border-light)' }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-dark-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 20 }}>7 Patents Pending</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {[
                    'Decision confidence quantification',
                    'Workforce delta intelligence',
                    'HR decision archaeology',
                    'Multi-jurisdictional policy resolution',
                    'Autonomous onboarding orchestration',
                    'Real-time policy update propagation',
                    'Agent confidence calibration',
                  ].map((patent, i) => (
                    <div key={patent} className="flex items-baseline" style={{ gap: 10, padding: '8px 0', borderBottom: i < 6 ? '1px solid var(--border-light)' : 'none' }}>
                      <span style={{ fontSize: 10, fontWeight: 500, color: 'var(--gold)', fontFamily: 'var(--font-mono), monospace', minWidth: 20 }}>{String(i + 1).padStart(2, '0')}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-dark-muted)' }}>{patent}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-hover" style={{ padding: 28, borderRadius: 14, backgroundColor: 'var(--bg-light-surface)', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-dark-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 20, alignSelf: 'stretch' }}>Data Flywheel</p>
                <Flywheel />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TRACTION — dark with premium cards ═══ */}
        <section className="relative" style={{ padding: '96px 24px', backgroundColor: 'var(--bg)', overflow: 'hidden' }}>
          <ParticleField />
          <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--gold)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Traction</p>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 48 }}>
              Early signals.
            </h2>

            {/* Big traction cards */}
            <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 16, marginBottom: 32 }}>
              {[
                { value: '3,200+', label: 'Employees managed', sub: 'across beta partners' },
                { value: '10', label: 'Design partners', sub: 'in private beta' },
                { value: 'Q2 2026', label: 'HR-Bench', sub: 'First open benchmark for HR AI' },
              ].map((t, i) => (
                <div
                  key={t.value}
        
                  style={{
                    padding: '36px 24px',
                    borderRadius: 16,
                    backgroundColor: 'rgba(17,17,19,0.5)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(176,141,87,0.1)',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.25), transparent)' }} />
                  <div style={{ fontSize: 40, fontWeight: 900, color: 'var(--gold)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 8 }}>{t.value}</div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{t.label}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-faint)' }}>{t.sub}</p>
                </div>
              ))}
            </div>

            {/* Industries + sizes */}
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 16 }}>
              <div style={{ padding: 24, borderRadius: 12, backgroundColor: 'rgba(17,17,19,0.4)', backdropFilter: 'blur(12px)', border: '1px solid var(--border-mid)' }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>Industries</p>
                <div className="flex flex-wrap" style={{ gap: 8 }}>
                  {['Healthcare', 'Financial Services', 'Technology', 'Construction', 'Education'].map((ind) => (
                    <span key={ind} style={{ padding: '5px 12px', borderRadius: 999, backgroundColor: 'rgba(176,141,87,0.08)', border: '1px solid rgba(176,141,87,0.12)', fontSize: 12, color: 'var(--text-muted)' }}>{ind}</span>
                  ))}
                </div>
              </div>
              <div style={{ padding: 24, borderRadius: 12, backgroundColor: 'rgba(17,17,19,0.4)', backdropFilter: 'blur(12px)', border: '1px solid var(--border-mid)' }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>Scale</p>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  From 50-person startups to 500+ employee organizations. The agent architecture scales with headcount.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TEAM — light section ═══ */}
        <section style={{ padding: '96px 24px', backgroundColor: 'var(--bg-light)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--gold)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Team</p>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-dark)', marginBottom: 48 }}>
              The people behind MambaHR.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 20 }}>
              {[
                { name: 'Brian Bell', role: 'CEO & Co-Founder', bio: '15+ years in People Ops at DocuSign, Asana, and Snowflake. Scaled HR through one of the largest IPOs in history.', linkedin: 'https://www.linkedin.com/in/brianjosephbell/', avatar: '/brian_bell.jpeg' },
                { name: 'Sebastian Kirsch', role: 'CTO & Co-Founder', bio: 'Founding engineer. Built security-critical products for a $600B Swiss bank. Ex Numbrs, Antler. Deep regulated-industry experience.', linkedin: 'https://www.linkedin.com/in/sebastiankirsch-/', avatar: '/sebastian_kirsch.jpg' },
              ].map((person) => (
                <div key={person.role} className="card-hover" style={{ padding: 32, borderRadius: 14, backgroundColor: 'var(--bg-light-surface)', border: '1px solid var(--border-light)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--gold), rgba(176,141,87,0.2), transparent)' }} />
                  <Image src={person.avatar} alt={person.name} width={56} height={56} style={{ borderRadius: 14, objectFit: 'cover', border: '1px solid var(--border-light)', marginBottom: 20 }} />
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-dark)', marginBottom: 4 }}>{person.name}</h3>
                  <p style={{ fontSize: 13, color: 'var(--gold)', marginBottom: 14, fontWeight: 500 }}>{person.role}</p>
                  <p style={{ fontSize: 14, color: 'var(--text-dark-muted)', lineHeight: 1.6, marginBottom: 16 }}>{person.bio}</p>
                  <a href={person.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-dark-faint)', textDecoration: 'none', borderBottom: '1px solid var(--border-light)' }}>LinkedIn &rarr;</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CONTACT — dark with particles ═══ */}
        <section id="contact" className="relative" style={{ padding: '96px 24px', backgroundColor: 'var(--bg)', overflow: 'hidden' }}>
          <ParticleField />
          <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 12 }}>
              Let&apos;s talk.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 40, lineHeight: 1.6 }}>
              We&apos;re raising our next round. If you invest in AI infrastructure,
              vertical AI, or the future of work — we should connect.
            </p>

            {!sent ? (
              <div style={{ backgroundColor: 'rgba(17,17,19,0.5)', backdropFilter: 'blur(20px)', borderRadius: 16, border: '1px solid rgba(176,141,87,0.1)', padding: 32, boxShadow: '0 24px 80px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.25), transparent)' }} />
                <form
                  onSubmit={async (e) => {
                    e.preventDefault()
                    setInvestorError(null)
                    const d = new FormData(e.currentTarget)
                    if (turnstileToken) d.set('cf-turnstile-response', turnstileToken)
                    const result = await submitInvestorContact(d)
                    if (result.success) {
                      setSent(true)
                      setReturning(!!result.returning)
                    } else {
                      setInvestorError(result.error || 'Something went wrong.')
                    }
                  }}
                  style={{ textAlign: 'left' }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 12, marginBottom: 12 }}>
                    <input name="name" type="text" placeholder="Your name" required style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1px solid var(--border-mid)', backgroundColor: 'rgba(9,9,11,0.6)', fontSize: 15, color: 'var(--text)', outline: 'none' }} />
                    <input name="firm" type="text" placeholder="Firm (optional)" style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1px solid var(--border-mid)', backgroundColor: 'rgba(9,9,11,0.6)', fontSize: 15, color: 'var(--text)', outline: 'none' }} />
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <input name="email" type="email" placeholder="Email" required style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1px solid var(--border-mid)', backgroundColor: 'rgba(9,9,11,0.6)', fontSize: 15, color: 'var(--text)', outline: 'none' }} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <textarea name="message" placeholder="Anything you'd like us to know (optional)" rows={3} style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1px solid var(--border-mid)', backgroundColor: 'rgba(9,9,11,0.6)', fontSize: 15, color: 'var(--text)', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
                  </div>
                  <TurnstileWidget onSuccess={setTurnstileToken} theme="dark" />
                  <button type="submit" className="cta-glow" style={{ width: '100%', padding: '14px', borderRadius: 10, backgroundColor: 'var(--gold)', color: '#fff', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                    Get in Touch
                  </button>
                  {investorError && (
                    <p style={{ marginTop: 12, fontSize: 13, color: '#ef4444', textAlign: 'center' }}>{investorError}</p>
                  )}
                </form>
              </div>
            ) : (
              <div
                style={{
                  padding: '40px 32px',
                  borderRadius: 16,
                  backgroundColor: 'rgba(17,17,19,0.5)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(176,141,87,0.15)',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(176,141,87,0.08)',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: 'hero-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both',
                }}
              >
                {/* Gold top shimmer */}
                <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.4), transparent)' }} />

                {/* Animated checkmark badge */}
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(34,197,94,0.1)',
                  border: '2px solid rgba(34,197,94,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  animation: 'hero-scale-in 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both',
                  position: 'relative',
                }}>
                  <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: '1px solid rgba(34,197,94,0.2)', animation: 'pulse-dot 2.5s ease-in-out infinite' }} />
                  <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
                    <path d="M2 11l8 8L26 3" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <h3 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em', animation: 'hero-fade-up 0.5s cubic-bezier(0.22,1,0.36,1) 0.4s both' }}>
                  {returning ? 'Good to see you again.' : 'Thanks for reaching out.'}
                </h3>

                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 24, animation: 'hero-fade-up 0.5s cubic-bezier(0.22,1,0.36,1) 0.5s both' }}>
                  {returning ? (
                    <>You&apos;ve already reached out — we have your message on file. One of the founders will be in touch soon.</>
                  ) : (
                    <>One of the founders will get back to you within 24 hours.</>
                  )}
                </p>

                {/* Founders signature card */}
                <div style={{
                  padding: 20,
                  borderRadius: 12,
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border)',
                  textAlign: 'left',
                  animation: 'hero-fade-up 0.5s cubic-bezier(0.22,1,0.36,1) 0.6s both',
                }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14, fontFamily: 'var(--font-mono), monospace' }}>
                    You&apos;ll hear from
                  </div>

                  <div className="flex items-center" style={{ gap: 12, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                    <Image src="/brian_bell.jpeg" alt="Brian Bell" width={36} height={36} style={{ borderRadius: 10, objectFit: 'cover', border: '1px solid var(--border-mid)' }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Brian Bell</div>
                      <div style={{ fontSize: 11, color: 'var(--gold)' }}>CEO &amp; Co-Founder</div>
                    </div>
                  </div>

                  <div className="flex items-center" style={{ gap: 12, padding: '8px 0' }}>
                    <Image src="/sebastian_kirsch.jpg" alt="Sebastian Kirsch" width={36} height={36} style={{ borderRadius: 10, objectFit: 'cover', border: '1px solid var(--border-mid)' }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Sebastian Kirsch</div>
                      <div style={{ fontSize: 11, color: 'var(--gold)' }}>CTO &amp; Co-Founder</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <p style={{ marginTop: 24, fontSize: 13, color: 'var(--text-faint)' }}>
              Or email us directly at{' '}
              <a href="mailto:investors@mambahr.com" style={{ color: 'var(--gold)', textDecoration: 'none' }}>investors@mambahr.com</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <AnimateOnScroll />
    </>
  )
}
