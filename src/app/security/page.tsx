'use client'

import { useState, useEffect, useRef } from 'react'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import ParticleField from '@/components/particle-field'

/* ── Animated shield with pulse ── */
function AnimatedShield() {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Outer glow rings */}
      <div style={{ position: 'absolute', inset: -20, borderRadius: '50%', border: '1px solid rgba(176,141,87,0.08)', animation: 'pulse-dot 4s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', inset: -40, borderRadius: '50%', border: '1px solid rgba(176,141,87,0.04)', animation: 'pulse-dot 4s ease-in-out 1s infinite' }} />
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <defs>
          <linearGradient id="shieldGrad" x1="40" y1="0" x2="40" y2="80">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d="M40 6l28 10v18c0 16-11 30-28 34C23 64 12 50 12 34V16L40 6z" fill="url(#shieldGrad)" stroke="var(--gold)" strokeWidth="1.5" />
        <path d="M28 40l8 8 16-18" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

/* ── Encryption animation — data flowing through a lock ── */
function EncryptionVisual() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % 4), 1500)
    return () => clearInterval(t)
  }, [])

  const lines = [
    { plain: 'Sarah Chen, SSN: 521-**-****', encrypted: 'a7f2...x9k1', label: 'PII field' },
    { plain: 'Salary: $145,000', encrypted: 'b3e8...m4p2', label: 'Compensation' },
    { plain: 'Health plan: PPO Gold', encrypted: 'c1d4...w7r5', label: 'Benefits' },
  ]

  return (
    <div style={{ padding: 24, borderRadius: 14, backgroundColor: '#fff', border: '1px solid #e7e5e4', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
      <div className="flex items-center" style={{ gap: 8, marginBottom: 20 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="7" width="12" height="8" rx="2" stroke="var(--gold)" strokeWidth="1.2" />
          <path d="M5 7V5a3 3 0 016 0v2" stroke="var(--gold)" strokeWidth="1.2" />
        </svg>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#1a1611' }}>AES-256 Encryption</span>
      </div>
      {lines.map((line, i) => (
        <div key={line.label} style={{ padding: '10px 0', borderBottom: i < 2 ? '1px solid #f5f5f4' : 'none' }}>
          <div style={{ fontSize: 9, fontWeight: 600, color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{line.label}</div>
          <div className="flex items-center" style={{ gap: 10 }}>
            <span style={{ fontSize: 12, color: step > i ? '#a8a29e' : '#1a1611', textDecoration: step > i ? 'line-through' : 'none', transition: 'all 0.5s', fontFamily: 'var(--font-mono), monospace', flex: 1 }}>
              {line.plain}
            </span>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" style={{ opacity: step > i ? 1 : 0.2, transition: 'opacity 0.5s' }}>
              <path d="M1 5h12M10 1l4 4-4 4" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 11, color: step > i ? 'var(--gold)' : '#d6d3d1', fontFamily: 'var(--font-mono), monospace', fontWeight: 500, transition: 'color 0.5s', minWidth: 80, textAlign: 'right' }}>
              {step > i ? line.encrypted : '· · · · · ·'}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Audit log mockup ── */
function AuditLogVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started || count >= 4) return
    const t = setTimeout(() => setCount(c => c + 1), 500)
    return () => clearTimeout(t)
  }, [started, count])

  const entries = [
    { time: '09:32:16', action: 'Verified PTO balance', user: 'Agent', detail: 'Sarah Chen — 14 days remaining' },
    { time: '09:32:17', action: 'Applied policy rule', user: 'Agent', detail: 'Auto-approve threshold met' },
    { time: '09:32:18', action: 'Updated payroll', user: 'Agent', detail: 'Gusto sync completed' },
    { time: '09:32:19', action: 'Sent notification', user: 'Agent', detail: 'Manager + employee notified' },
  ]

  return (
    <div ref={ref} style={{ padding: 24, borderRadius: 14, backgroundColor: '#fff', border: '1px solid #e7e5e4', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
        <div className="flex items-center" style={{ gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="1" width="12" height="14" rx="2" stroke="var(--gold)" strokeWidth="1.2" />
            <path d="M5 5h6M5 8h4M5 11h5" stroke="var(--gold)" strokeWidth="0.8" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#1a1611' }}>Audit Trail</span>
        </div>
        <span style={{ fontSize: 10, color: '#a8a29e', fontFamily: 'var(--font-mono), monospace' }}>Immutable · Exportable</span>
      </div>
      {entries.map((entry, i) => (
        <div key={entry.time} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < 3 ? '1px solid #f5f5f4' : 'none', opacity: i < count ? 1 : 0.15, transform: i < count ? 'translateX(0)' : 'translateX(-4px)', transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)' }}>
          <span style={{ fontSize: 10, color: '#a8a29e', fontFamily: 'var(--font-mono), monospace', minWidth: 56 }}>{entry.time}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#1a1611' }}>{entry.action}</div>
            <div style={{ fontSize: 11, color: '#78716c' }}>{entry.detail}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Access control mockup ── */
function AccessControlVisual() {
  return (
    <div style={{ padding: 24, borderRadius: 14, backgroundColor: '#fff', border: '1px solid #e7e5e4', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
      <div className="flex items-center" style={{ gap: 8, marginBottom: 16 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="5" r="3" stroke="var(--gold)" strokeWidth="1.2" />
          <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#1a1611' }}>Role-Based Access</span>
      </div>
      {[
        { role: 'Admin', access: 'Full access', color: '#dc2626', bg: '#fef2f2' },
        { role: 'HR Manager', access: 'PII + decisions', color: 'var(--gold)', bg: 'rgba(176,141,87,0.08)' },
        { role: 'Read Only', access: 'Reports only', color: '#57534e', bg: '#f5f5f4' },
      ].map((item) => (
        <div key={item.role} className="flex items-center justify-between" style={{ padding: '10px 0', borderBottom: '1px solid #f5f5f4' }}>
          <div className="flex items-center" style={{ gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: item.color }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1611' }}>{item.role}</span>
          </div>
          <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 4, backgroundColor: item.bg, color: item.color }}>{item.access}</span>
        </div>
      ))}
      <div style={{ marginTop: 12, padding: '8px 10px', borderRadius: 6, backgroundColor: '#fafaf7', fontSize: 10, color: '#78716c' }}>
        SSO integration · Every access event logged
      </div>
    </div>
  )
}

const faqItems = [
  { q: 'Does MambaHR train AI models on my data?', a: 'No. Your HR data is never used to train, fine-tune, or improve any AI model. Inputs are processed for your specific request and immediately discarded. This is a contractual guarantee.' },
  { q: 'Where is my data stored?', a: 'All data is stored in SOC 2 certified data centers in the United States with automatic daily backups and point-in-time recovery.' },
  { q: 'How do you handle PII like SSNs and salary data?', a: 'All PII is encrypted at rest (AES-256) and in transit (TLS 1.3). PII fields have additional column-level encryption. Access requires explicit permissions and is logged.' },
  { q: 'Can we delete employee data?', a: 'Yes. Data is purged from primary systems within 30 days and backups within 90 days of your request.' },
  { q: 'How do you connect to our HRIS?', a: 'Via OAuth 2.0 with scopes you explicitly approve. We never store your HRIS credentials. You can revoke access anytime.' },
  { q: 'Can we get your security documentation?', a: 'Yes. We provide a security addendum, DPA, and infrastructure docs to all design partners during onboarding.' },
]

function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div>
      {faqItems.map((item, i) => (
        <div key={item.q} style={{ borderBottom: i < faqItems.length - 1 ? '1px solid #e7e5e4' : 'none' }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#1a1611', paddingRight: 24 }}>{item.q}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)' }}>
              <path d="M5 8l5 5 5-5" stroke="#a8a29e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div style={{ maxHeight: open === i ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.22,1,0.36,1)' }}>
            <p style={{ fontSize: 15, color: '#57534e', lineHeight: 1.7, paddingBottom: 24 }}>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function SecurityPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ═══ HERO ═══ */}
        <section className="relative" style={{ paddingTop: 160, paddingBottom: 100, backgroundColor: 'var(--bg)', overflow: 'hidden' }}>
          <ParticleField />
          <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <AnimatedShield />
            <h1 style={{ fontSize: 'clamp(40px, 5.5vw, 64px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text)', marginTop: 32, marginBottom: 20, maxWidth: 550, margin: '32px auto 20px' }}>
              Your employees&apos; data is safe with us.
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: 460, margin: '0 auto' }}>
              SSNs, salaries, health records, performance reviews — we handle it all with the care it deserves.
            </p>
          </div>
        </section>

        {/* ═══ THE BIG PROMISE ═══ */}
        <section style={{ padding: '80px 24px', backgroundColor: '#fafaf7' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 48, alignItems: 'center' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: '50%', backgroundColor: '#f0fdf4', border: '2px solid #bbf7d0', marginBottom: 20 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#1a1611', marginBottom: 16 }}>
                  We never train on your data.
                </h2>
                <p style={{ fontSize: 16, color: '#57534e', lineHeight: 1.7, marginBottom: 16 }}>
                  Your HR data is processed for your requests and immediately discarded from all AI systems. No training. No fine-tuning. No retention.
                </p>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--gold)' }}>
                  Contractually guaranteed.
                </p>
              </div>
              {/* Live encryption visual */}
              <EncryptionVisual />
            </div>
          </div>
        </section>

        {/* ═══ SECURITY IN ACTION — 3 visual sections ═══ */}
        <section style={{ backgroundColor: '#fafaf7' }}>
          {/* Audit Trail */}
          <div style={{ padding: '80px 24px', borderTop: '1px solid #e7e5e4' }}>
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 items-center" style={{ maxWidth: 900, gap: 56 }}>
              <div style={{ order: 1 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'var(--font-mono), monospace' }}>Audit Trail</p>
                <h3 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#1a1611', marginBottom: 16 }}>
                  Every action logged. Every decision traceable.
                </h3>
                <p style={{ fontSize: 15, color: '#78716c', lineHeight: 1.7 }}>
                  The agent logs every decision it makes — what data it accessed, what policy it applied, and when. If anyone asks &ldquo;why was this approved?&rdquo; — you have the answer in seconds.
                </p>
              </div>
              <div style={{ order: 0 }}>
                <AuditLogVisual />
              </div>
            </div>
          </div>

          {/* Access Control */}
          <div style={{ padding: '80px 24px', borderTop: '1px solid #e7e5e4' }}>
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 items-center" style={{ maxWidth: 900, gap: 56 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'var(--font-mono), monospace' }}>Access Control</p>
                <h3 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#1a1611', marginBottom: 16 }}>
                  The right people see the right data. Nobody else.
                </h3>
                <p style={{ fontSize: 15, color: '#78716c', lineHeight: 1.7 }}>
                  Role-based access with SSO. Your admins control who sees PII, who can approve decisions, and who gets read-only reports. Every access event is logged.
                </p>
              </div>
              <AccessControlVisual />
            </div>
          </div>

          {/* Data types we protect */}
          <div style={{ padding: '80px 24px', borderTop: '1px solid #e7e5e4' }}>
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 items-start" style={{ maxWidth: 900, gap: 56 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'var(--font-mono), monospace' }}>PII Protection</p>
                <h3 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#1a1611', marginBottom: 16 }}>
                  HR data isn&apos;t just names and emails.
                </h3>
                <p style={{ fontSize: 15, color: '#78716c', lineHeight: 1.7 }}>
                  It&apos;s the most sensitive information in your company. We built every layer of our system for this reality.
                </p>
              </div>
              <div style={{ padding: 28, borderRadius: 14, backgroundColor: '#fff', border: '1px solid #e7e5e4', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
                {[
                  { label: 'Social Security Numbers', detail: 'Column-level encryption + access logging' },
                  { label: 'Salary & Compensation', detail: 'Role-gated, encrypted at rest' },
                  { label: 'Health & Benefits', detail: 'HIPAA-informed handling' },
                  { label: 'Performance Reviews', detail: 'Manager-only access controls' },
                  { label: 'Termination Records', detail: 'Immutable audit trail' },
                  { label: 'Immigration Documents', detail: 'Encrypted, retention policies enforced' },
                ].map((item, i) => (
                  <div key={item.label} style={{ padding: '12px 0', borderBottom: i < 5 ? '1px solid #f5f5f4' : 'none' }}>
                    <div className="flex items-center" style={{ gap: 8, marginBottom: 4 }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M7 1l5 2v3c0 3.5-2 5.5-5 6.5C4 11.5 2 9.5 2 6V3l5-2z" fill="rgba(176,141,87,0.1)" stroke="var(--gold)" strokeWidth="0.8" />
                      </svg>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1611' }}>{item.label}</span>
                    </div>
                    <span style={{ fontSize: 12, color: '#78716c', paddingLeft: 22 }}>{item.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section style={{ padding: '96px 24px', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 48 }}>
              Common questions.
            </h2>
            <div style={{ padding: 32, borderRadius: 16, backgroundColor: 'rgba(17,17,19,0.4)', backdropFilter: 'blur(16px)', border: '1px solid rgba(176,141,87,0.1)', boxShadow: '0 16px 64px rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.2), transparent)' }} />
              {faqItems.map((item, i) => (
                <FAQItem key={item.q} item={item} index={i} isLast={i === faqItems.length - 1} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="relative" style={{ padding: '96px 24px', backgroundColor: 'var(--bg)', overflow: 'hidden' }}>
          <ParticleField />
          <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 16 }}>
              Need more detail?
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.6 }}>
              We&apos;ll walk you through our security posture, share our DPA, and answer any questions.
            </p>
            <a href="mailto:security@mambahr.com" className="cta-glow" style={{ display: 'inline-block', padding: '14px 32px', borderRadius: 999, backgroundColor: 'var(--gold)', color: '#fff', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              Talk to us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function FAQItem({ item, index, isLast }: { item: { q: string; a: string }; index: number; isLast: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: !isLast ? '1px solid var(--border)' : 'none' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', paddingRight: 24 }}>{item.q}</span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
          <path d="M4.5 7l4.5 4.5L13.5 7" stroke="var(--text-faint)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div style={{ maxHeight: open ? 250 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.22,1,0.36,1)' }}>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, paddingBottom: 20 }}>{item.a}</p>
      </div>
    </div>
  )
}
