'use client'

import { useEffect, useState, useRef } from 'react'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import AnimateOnScroll from '@/components/animate-on-scroll'

const areas = [
  {
    num: '01',
    title: 'Policy Verification',
    desc: 'Deterministic statutory logic that verifies every HR decision against encoded HR policies and regulations. 95K lines of domain rules — not a language model guess, but a verified, auditable answer.',
    tags: ['Statutory Logic', 'Policy Engine', 'Regulation Mapping', 'Audit Trail'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 2l12 5v9c0 7-5 13-12 15C9 29 4 23 4 16V7l12-5z" stroke="var(--gold)" strokeWidth="1.5" fill="none" />
        <path d="M11 16l3.5 3.5L21 13" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'HR Decision Automation',
    desc: 'Autonomous agent architecture that handles complete HR workflows end-to-end — from intake to resolution — without human intervention. Designed for safety-critical people operations.',
    tags: ['Agent Architecture', 'Workflow Orchestration', 'HRIS Integration'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="10" height="10" rx="2" stroke="var(--gold)" strokeWidth="1.5" />
        <rect x="18" y="4" width="10" height="10" rx="2" stroke="var(--gold)" strokeWidth="1.5" />
        <rect x="11" y="18" width="10" height="10" rx="2" stroke="var(--gold)" strokeWidth="1.5" />
        <path d="M14 9h4M9 14v4M23 14v4" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Workforce Intelligence',
    desc: 'Predictive models for attrition risk, compensation gap analysis, and headcount planning. Surfacing insights that HR teams would otherwise discover too late.',
    tags: ['Attrition Modeling', 'Comp Analysis', 'Headcount Forecasting'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 24l7-8 5 4 8-12" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="8" r="3" stroke="var(--gold)" strokeWidth="1.5" />
      </svg>
    ),
  },
]

const patents = [
  'Decision confidence quantification for HR automation',
  'Workforce delta intelligence and anomaly detection',
  'HR decision archaeology and audit trail reconstruction',
  'Multi-jurisdictional policy conflict resolution',
  'Autonomous onboarding workflow orchestration',
  'Real-time policy update propagation without catastrophic forgetting',
  'HR agent confidence calibration with human escalation thresholds',
]

const publications = [
  {
    title: 'HR-Bench: A Benchmark for Evaluating AI Systems on HR Decision-Making',
    authors: 'MambaHR Research',
    date: '2026',
    type: 'Benchmark',
    desc: '500+ HR decision scenarios across federal and state regulations, validated by domain experts.',
    link: '#',
  },
  {
    title: 'Deterministic Statutory Logic for Safety-Critical HR Automation',
    authors: 'MambaHR Research',
    date: '2026',
    type: 'Technical Report',
    desc: 'How we encode 95K lines of HR policy into a verifiable decision engine — and why probabilistic approaches fail in HR.',
    link: '#',
  },
  {
    title: 'Why Generic AI Fails at HR: Lessons from Building HR-Bench',
    authors: 'MambaHR Research',
    date: '2026',
    type: 'Blog Post',
    desc: 'The surprising failure modes we discovered when testing general-purpose language models on HR decisions.',
    link: '#',
  },
]

function BenchmarkBars() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const bars = [
    { label: 'MambaHR', value: 94.2, color: 'var(--gold)' },
    { label: 'GPT-4', value: 31, color: 'var(--text-faint)' },
    { label: 'Claude 3.5', value: 27, color: 'var(--text-faint)' },
    { label: 'Gemini Pro', value: 24, color: 'var(--text-faint)' },
  ]

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {bars.map((bar, i) => (
        <div key={bar.label}>
          <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: bar.color === 'var(--gold)' ? 'var(--text)' : 'var(--text-faint)' }}>
              {bar.label}
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: bar.color, fontFamily: 'var(--font-mono), monospace' }}>
              {bar.value}%
            </span>
          </div>
          <div style={{ height: 8, borderRadius: 4, backgroundColor: 'var(--bg-elevated)', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                borderRadius: 4,
                backgroundColor: bar.color,
                width: visible ? `${bar.value}%` : '0%',
                transition: `width 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.15}s`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function NetworkGraphic() {
  // 5-layer network: HRIS data (3) → Encode (4) → Agent Core (5) → Verify (4) → Action (3)
  // Sparse connections — each node connects to 2-3 in next layer, not all
  const layers = [
    { x: 60,  nodes: [50, 100, 150] },
    { x: 160, nodes: [40, 80, 120, 160] },
    { x: 260, nodes: [30, 65, 100, 135, 170] },
    { x: 360, nodes: [40, 80, 120, 160] },
    { x: 460, nodes: [50, 100, 150] },
  ]

  // Hand-picked sparse connections for a cleaner look
  const connections: [number,number,number,number][] = [
    // Layer 0 → 1
    [60,50, 160,40], [60,50, 160,80],
    [60,100, 160,80], [60,100, 160,120],
    [60,150, 160,120], [60,150, 160,160],
    // Layer 1 → 2
    [160,40, 260,30], [160,40, 260,65],
    [160,80, 260,65], [160,80, 260,100],
    [160,120, 260,100], [160,120, 260,135],
    [160,160, 260,135], [160,160, 260,170],
    // Layer 2 → 3
    [260,30, 360,40], [260,65, 360,40],
    [260,65, 360,80], [260,100, 360,80],
    [260,100, 360,120], [260,135, 360,120],
    [260,135, 360,160], [260,170, 360,160],
    // Layer 3 → 4
    [360,40, 460,50], [360,80, 460,50],
    [360,80, 460,100], [360,120, 460,100],
    [360,120, 460,150], [360,160, 460,150],
  ]

  return (
    <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
      {/* Glow behind the center */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        height: 200,
        background: 'radial-gradient(circle, rgba(176,141,87,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <svg viewBox="0 0 520 200" fill="none" style={{ width: '100%', height: 'auto' }}>
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.03" />
            <stop offset="50%" stopColor="var(--gold)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.03" />
          </linearGradient>
          <radialGradient id="nodeGlow">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connections */}
        {connections.map(([x1,y1,x2,y2], i) => (
          <line key={`c${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#lineGrad)" strokeWidth="0.5">
            <animate attributeName="strokeOpacity" values="0.3;0.8;0.3" dur={`${3 + (i % 4)}s`} begin={`${(i * 0.05) % 2}s`} repeatCount="indefinite" />
          </line>
        ))}

        {/* Data pulses — dots traveling through the network */}
        {[
          { path: 'M60,50 Q110,40 160,40 Q210,30 260,30 Q310,40 360,40 Q410,50 460,50', dur: '4s', delay: '0s' },
          { path: 'M60,100 Q110,90 160,80 Q210,90 260,100 Q310,110 360,120 Q410,110 460,100', dur: '4.5s', delay: '1.2s' },
          { path: 'M60,150 Q110,155 160,160 Q210,165 260,170 Q310,160 360,160 Q410,155 460,150', dur: '5s', delay: '2.4s' },
        ].map((p, i) => (
          <circle key={`pulse${i}`} r="2.5" fill="var(--gold)" filter="url(#softGlow)" opacity="0.9">
            <animateMotion dur={p.dur} begin={p.delay} repeatCount="indefinite" path={p.path} />
          </circle>
        ))}

        {/* Nodes */}
        {layers.map((layer, li) =>
          layer.nodes.map((ny, ni) => {
            const isCenter = li === 2
            const r = isCenter ? 3.5 : li === 0 || li === 4 ? 3 : 2.5
            return (
              <g key={`n${li}-${ni}`}>
                {isCenter && (
                  <circle cx={layer.x} cy={ny} r="8" fill="url(#nodeGlow)" />
                )}
                <circle cx={layer.x} cy={ny} r={r} fill="var(--gold)" filter={isCenter ? 'url(#softGlow)' : undefined}>
                  <animate
                    attributeName="opacity"
                    values={isCenter ? '0.7;1;0.7' : '0.3;0.6;0.3'}
                    dur={`${2.5 + ni * 0.3}s`}
                    begin={`${li * 0.2 + ni * 0.1}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            )
          })
        )}

        {/* Layer labels */}
        {/* Layer labels */}
        <text x={50} y="192" fill="var(--text-faint)" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)" opacity="0.5">
          HRIS data
        </text>
        <text x={150} y="192" fill="var(--text-faint)" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)" opacity="0.4">
          encode
        </text>
        <text x={260} y="192" fill="var(--gold)" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)" opacity="0.6">
          agent core
        </text>
        <text x={370} y="192" fill="var(--text-faint)" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)" opacity="0.4">
          verify
        </text>
        <text x={470} y="192" fill="var(--text-faint)" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)" opacity="0.5">
          action
        </text>
      </svg>
    </div>
  )
}

function TerminalLive() {
  const [step, setStep] = useState(0)
  const lines = [
    { ts: '09:32:11', tag: 'system', tagColor: 'var(--gold)', text: 'HR engine initialized. 95,247 rules loaded.' },
    { ts: '09:32:11', tag: 'bench', tagColor: '#D97706', text: 'Running HR-Bench suite... 500 scenarios queued.' },
    { ts: '09:32:14', tag: 'eval', tagColor: 'var(--gold)', text: 'Category: Leave eligibility [48/48 passed]' },
    { ts: '09:32:16', tag: 'eval', tagColor: 'var(--gold)', text: 'Category: Multi-state conflicts [31/34 passed]' },
    { ts: '09:32:18', tag: 'eval', tagColor: 'var(--gold)', text: 'Category: Accommodation requests [42/42 passed]' },
    { ts: '09:32:22', tag: 'result', tagColor: 'var(--green)', text: 'HR-Bench complete. Score: 94.2% (471/500)' },
    { ts: '09:32:22', tag: 'delta', tagColor: 'var(--green)', text: 'vs GPT-4: +63.2pp | vs Claude: +67.2pp' },
  ]

  useEffect(() => {
    if (step < lines.length) {
      const timer = setTimeout(() => setStep(s => s + 1), 600)
      return () => clearTimeout(timer)
    }
    const reset = setTimeout(() => setStep(0), 4000)
    return () => clearTimeout(reset)
  }, [step, lines.length])

  return (
    <div
      style={{
        backgroundColor: '#0A0908',
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-center" style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', gap: 8 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FF5F57' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FEBC2E' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#28C840' }} />
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginLeft: 8, fontFamily: 'var(--font-mono), monospace' }}>
          hr-bench --run-suite
        </span>
      </div>
      <div style={{ padding: '16px 20px', fontFamily: 'var(--font-mono), monospace', fontSize: 12, lineHeight: 2, minHeight: 220 }}>
        {lines.slice(0, step).map((line, i) => (
          <div
            key={i}
            style={{
              animation: 'hero-fade-up 0.3s ease forwards',
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>[{line.ts}]</span>{' '}
            <span style={{ color: line.tagColor }}>{line.tag}</span>{' '}
            <span style={{ color: line.tag === 'result' || line.tag === 'delta' ? 'var(--green)' : 'rgba(255,255,255,0.5)' }}>
              {line.text}
            </span>
          </div>
        ))}
        {step < lines.length && (
          <span style={{ display: 'inline-block', width: 7, height: 14, backgroundColor: 'var(--gold)', animation: 'blink 1s step-end infinite', verticalAlign: 'middle' }} />
        )}
      </div>
    </div>
  )
}

export default function ResearchPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="bg-grid relative" style={{ paddingTop: 140, paddingBottom: 80, backgroundColor: 'var(--bg)' }}>
          <div
            style={{
              position: 'absolute',
              top: 60,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 500,
              height: 300,
              background: 'radial-gradient(ellipse at center, rgba(176,141,87,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--gold)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              MambaHR Research
            </p>
            <h1
              style={{
                fontSize: 'clamp(36px, 4.5vw, 56px)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 24,
              }}
            >
              We don&apos;t wrap models.<br />
              <span style={{ color: 'var(--gold)' }}>We build them.</span>
            </h1>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.7,
                color: 'var(--text-muted)',
                maxWidth: 560,
                marginBottom: 48,
              }}
            >
              MambaHR Research is a domain AI lab focused on HR decision automation and people operations. We publish benchmarks,
              build proprietary datasets, and file patents — because HR
              deserves more than a ChatGPT wrapper.
            </p>

            {/* Neural network graphic */}
            <NetworkGraphic />

            {/* Stat strip */}
            <div style={{ backgroundColor: 'rgba(17,17,19,0.45)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderRadius: 16, border: '1px solid rgba(176,141,87,0.12)', padding: '40px 24px', maxWidth: 760, margin: '40px auto 0', boxShadow: '0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(176,141,87,0.08)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.3), transparent)' }} />
              <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 24 }}>
                {[
                  { value: '95K', label: 'Lines of code', gold: true },
                  { value: '500+', label: 'Benchmark scenarios', gold: false },
                  { value: '7', label: 'Patents pending', gold: true },
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

        {/* HR-Bench */}
        <section style={{ padding: '80px 24px', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
              <span style={{ padding: '4px 10px', borderRadius: 999, backgroundColor: 'rgba(176,141,87,0.15)', fontSize: 11, fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Featured
              </span>
              <span style={{ fontSize: 13, color: 'var(--text-faint)' }}>Benchmark &middot; 2026</span>
            </div>

            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 16 }}>
              HR-Bench
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 48, maxWidth: 520 }}>
              The first open benchmark for evaluating AI systems on US employment
              decision-making. 500+ scenarios across policies and regulations,
              validated by domain experts.
            </p>

            {/* Animated bar chart */}
            <div
              style={{
                backgroundColor: 'rgba(17,17,19,0.5)',
                backdropFilter: 'blur(20px)',
                borderRadius: 12,
                border: '1px solid rgba(176,141,87,0.1)',
                padding: '32px',
                marginBottom: 24,
                boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.25), transparent)' }} />
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 24 }}>
                Accuracy on complex HR decision scenarios
              </p>
              <BenchmarkBars />
            </div>

            {/* Live terminal */}
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 12, backgroundColor: 'rgba(17,17,19,0.5)', backdropFilter: 'blur(20px)', border: '1px solid rgba(176,141,87,0.1)', boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }}>
              <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.25), transparent)', zIndex: 1 }} />
              <TerminalLive />
            </div>

            <div className="flex flex-wrap" style={{ gap: 16, marginTop: 32 }}>
              <a href="#" style={{ fontSize: 14, fontWeight: 600, color: 'var(--gold)', textDecoration: 'none' }}>
                Read methodology &rarr;
              </a>
              <a href="#" style={{ fontSize: 14, fontWeight: 600, color: 'var(--gold)', textDecoration: 'none' }}>
                Download dataset &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* Research Areas */}
        <section style={{ padding: '80px 24px', backgroundColor: 'var(--bg-light)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-dark)', marginBottom: 48 }}>
              Research areas
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {areas.map((area) => (
                <div
                  key={area.num}
                  data-animate
                  className="card-hover"
                  style={{
                    padding: 32,
                    borderRadius: 12,
                    backgroundColor: 'var(--bg-light-surface)',
                    border: '1px solid var(--border-light)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Gold left accent */}
                  <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 2, borderRadius: 1, backgroundColor: 'var(--gold)', opacity: 0.4 }} />
                  <div className="flex items-start" style={{ gap: 20, paddingLeft: 12 }}>
                    <div style={{ paddingTop: 2 }}>
                      {area.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="flex items-center" style={{ gap: 12, marginBottom: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-dark-faint)', fontFamily: 'var(--font-mono), monospace' }}>
                          {area.num}
                        </span>
                        <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-dark)' }}>
                          {area.title}
                        </h3>
                      </div>
                      <p style={{ fontSize: 15, color: 'var(--text-dark-muted)', lineHeight: 1.6, marginBottom: 16 }}>
                        {area.desc}
                      </p>
                      <div className="flex flex-wrap" style={{ gap: 8 }}>
                        {area.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              padding: '4px 10px',
                              borderRadius: 999,
                              backgroundColor: 'var(--bg-light)',
                              border: '1px solid var(--border-light)',
                              fontSize: 11,
                              fontWeight: 500,
                              color: 'var(--text-dark-faint)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Publications */}
        <section style={{ padding: '80px 24px', backgroundColor: 'var(--bg)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--gold)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Publications
            </p>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 48 }}>
              Our work
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {publications.map((pub) => (
                <a
                  key={pub.title}
                  href={pub.link}
                  className="card-hover"
                  style={{
                    display: 'block',
                    padding: 28,
                    borderRadius: 12,
                    backgroundColor: 'rgba(17,17,19,0.5)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(176,141,87,0.1)',
                    textDecoration: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.25), transparent)' }} />
                  <div className="flex items-center" style={{ gap: 12, marginBottom: 12 }}>
                    <span style={{ padding: '3px 8px', borderRadius: 4, backgroundColor: 'var(--bg-elevated)', fontSize: 11, fontWeight: 500, color: 'var(--text-faint)' }}>
                      {pub.type}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--text-faint)' }}>{pub.date}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-faint)' }}>&middot; {pub.authors}</span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>
                    {pub.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {pub.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Patents */}
        <section style={{ padding: '80px 24px', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 16 }}>
              7 Patents Pending
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 40, maxWidth: 480 }}>
              Novel research in HR AI that doesn&apos;t exist anywhere else.
            </p>

            <div style={{ backgroundColor: 'rgba(17,17,19,0.5)', backdropFilter: 'blur(20px)', borderRadius: 16, border: '1px solid rgba(176,141,87,0.1)', padding: '24px 32px', boxShadow: '0 24px 80px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.25), transparent)' }} />
              {patents.map((patent, i) => (
                <div
                  key={patent}
                  data-animate
                  className="flex items-baseline"
                  style={{
                    gap: 16,
                    padding: '16px 0',
                    borderBottom: i < patents.length - 1 ? '1px solid var(--border)' : 'none',
                    transitionDelay: `${i * 60}ms`,
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--gold)', fontFamily: 'var(--font-mono), monospace', minWidth: 28 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: 15, color: 'var(--text-muted)' }}>
                    {patent}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join the lab */}
        <section className="bg-grid relative" style={{ padding: '96px 24px', backgroundColor: 'var(--bg)', textAlign: 'center' }}>
          <div
            style={{
              position: 'absolute',
              bottom: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 400,
              height: 200,
              background: 'radial-gradient(ellipse at center, rgba(176,141,87,0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ maxWidth: 500, margin: '0 auto', position: 'relative' }}>
            <div style={{ backgroundColor: 'rgba(17,17,19,0.5)', backdropFilter: 'blur(20px)', borderRadius: 16, border: '1px solid rgba(176,141,87,0.1)', padding: '48px 32px', boxShadow: '0 24px 80px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.25), transparent)' }} />
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 16 }}>
                Join the lab.
              </h2>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.6 }}>
                We&apos;re looking for ML engineers, NLP researchers, and HR domain experts who want to build AI that actually works in the real world.
              </p>
              <a
                href="mailto:careers@mambahr.com"
                className="cta-glow"
                style={{
                  display: 'inline-block',
                  padding: '14px 32px',
                  borderRadius: 999,
                  backgroundColor: 'var(--gold)',
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                View open roles
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AnimateOnScroll />
    </>
  )
}
