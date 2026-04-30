'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'

/* ── Encryption mockup — data flowing through a lock ── */
function EncryptionVisual() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % 4), 1500)
    return () => clearInterval(t)
  }, [])

  const lines = [
    { plain: 'employee.ssn', encrypted: 'a7f2…x9k1', label: 'PII field' },
    { plain: 'employee.salary', encrypted: 'b3e8…m4p2', label: 'Compensation' },
    { plain: 'employee.benefits', encrypted: 'c1d4…w7r5', label: 'Benefits' },
  ]

  return (
    <div style={{ padding: 24, borderRadius: 14, background: '#FFFFFF', border: '1px solid var(--border)', boxShadow: '0 8px 32px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="7" width="12" height="8" rx="2" stroke="var(--gold)" strokeWidth="1.2" />
          <path d="M5 7V5a3 3 0 016 0v2" stroke="var(--gold)" strokeWidth="1.2" />
        </svg>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>AES-256 at rest · TLS 1.3 in transit</span>
      </div>
      {lines.map((line, i) => (
        <div key={line.label} style={{ padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--border-faint)' : 'none' }}>
          <p style={{ fontSize: 9, fontWeight: 600, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>{line.label}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12, color: step > i ? 'var(--text-faint)' : 'var(--text)', textDecoration: step > i ? 'line-through' : 'none', transition: 'all 0.5s', fontFamily: 'var(--font-mono), monospace', flex: 1 }}>
              {line.plain}
            </span>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" style={{ opacity: step > i ? 1 : 0.2, transition: 'opacity 0.5s' }}>
              <path d="M1 5h12M10 1l4 4-4 4" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 11, color: step > i ? 'var(--gold-dark)' : 'var(--border-mid)', fontFamily: 'var(--font-mono), monospace', fontWeight: 500, transition: 'color 0.5s', minWidth: 80, textAlign: 'right' }}>
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
    { time: '09:32:16', action: 'Verified PTO balance',     detail: 'within company policy ✓' },
    { time: '09:32:17', action: 'Applied policy rule',       detail: 'auto-approve threshold met' },
    { time: '09:32:18', action: 'Updated payroll',           detail: 'next-cycle adjustment scheduled' },
    { time: '09:32:19', action: 'Sent notification',         detail: 'manager + employee notified' },
  ]

  return (
    <div ref={ref} style={{ padding: 24, borderRadius: 14, background: '#FFFFFF', border: '1px solid var(--border)', boxShadow: '0 8px 32px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="1" width="12" height="14" rx="2" stroke="var(--gold)" strokeWidth="1.2" />
            <path d="M5 5h6M5 8h4M5 11h5" stroke="var(--gold)" strokeWidth="0.8" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>Audit trail</span>
        </div>
        <span style={{ fontSize: 10, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>Immutable · Exportable</span>
      </div>
      {entries.map((entry, i) => (
        <div key={entry.time} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < 3 ? '1px solid var(--border-faint)' : 'none', opacity: i < count ? 1 : 0.15, transform: i < count ? 'translateX(0)' : 'translateX(-4px)', transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)' }}>
          <span style={{ fontSize: 10, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace', minWidth: 56 }}>{entry.time}</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)', margin: 0 }}>{entry.action}</p>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '2px 0 0' }}>{entry.detail}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Access control mockup ── */
function AccessControlVisual() {
  const roles = [
    { role: 'Admin',      access: 'Full access',     dot: '#B91C1C', bg: '#FEF2F2', fg: '#B91C1C' },
    { role: 'CHRO',       access: 'PII + decisions', dot: 'var(--gold)', bg: 'var(--gold-tint)', fg: 'var(--gold-dark)' },
    { role: 'Manager',    access: 'Team data only',  dot: '#1D4ED8', bg: '#EFF6FF', fg: '#1D4ED8' },
    { role: 'Read only',  access: 'Reports only',    dot: 'var(--text-muted)', bg: 'var(--bg-surface)', fg: 'var(--text-muted)' },
  ]
  return (
    <div style={{ padding: 24, borderRadius: 14, background: '#FFFFFF', border: '1px solid var(--border)', boxShadow: '0 8px 32px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="5" r="3" stroke="var(--gold)" strokeWidth="1.2" />
          <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>Role-based access · 8 default roles</span>
      </div>
      {roles.map((item, i) => (
        <div key={item.role} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < roles.length - 1 ? '1px solid var(--border-faint)' : 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.dot }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{item.role}</span>
          </div>
          <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 4, background: item.bg, color: item.fg }}>{item.access}</span>
        </div>
      ))}
      <div style={{ marginTop: 14, padding: '10px 12px', borderRadius: 8, background: 'var(--bg-warm)', fontSize: 11, color: 'var(--text-muted)' }}>
        SSO via Okta / Microsoft Entra / Google · SCIM provisioning · every access logged
      </div>
    </div>
  )
}

const faqItems = [
  { q: 'How does MambaHR define customer data?', a: 'Customer data is any information your organization shares with or through MambaHR — employee records, compensation data, policies, documents, conversations with the agent, and the results of its work. All of it is yours, always.' },
  { q: 'How does MambaHR keep our data private and secure?', a: 'Your data is encrypted in storage (AES-256) and in transit (TLS 1.3), isolated to your organization, and protected by role-based access controls. Every agent action is logged in an immutable audit trail. Nothing executes without the policy thresholds you define.' },
  { q: 'Where is our data hosted?', a: 'MambaHR runs on enterprise-grade cloud infrastructure in the United States, with regional isolation, redundancy, and industry-standard protections built into every layer. Custom data residency available on Enterprise plans.' },
  { q: 'How do you respect access controls for our data?', a: 'Access is governed by your identity provider (Okta, Microsoft Entra, Google) and the roles you define. MambaHR enforces least-privilege access — the agent, your team, and our systems only see what is required for a given task. All access is recorded.' },
  { q: 'Do you train AI models on our data?', a: "No. Your workforce data is never used to train AI models — ours or anyone else's. MambaHR uses AI to execute your workflows, not to learn from your data. Bedrock prompt logging is disabled at the AWS account level — we cannot see your prompts." },
  { q: 'Can we export our data?', a: 'Yes. Your data is yours. Full export available on demand, including all records, audit log, documents, and configuration. We are a processor — never a controller — under GDPR.' },
  { q: 'What is the SOC 2 status?', a: 'SOC 2 Type II audit underway. ISO 27001 in parallel. GDPR DPIA available for EU customers. HIPAA segregation finalized for FMLA-medical scope. Talk to us for our security questionnaire response.' },
]

const dataTypes = [
  { label: 'Social Security Numbers',  detail: 'Column-level encryption + access logging' },
  { label: 'Salary & Compensation',     detail: 'Role-gated, encrypted at rest' },
  { label: 'Health & Benefits',         detail: 'HIPAA-informed handling, segregated scope' },
  { label: 'Performance Reviews',       detail: 'Manager-only access controls' },
  { label: 'Termination Records',       detail: 'Immutable audit trail · legal hold' },
  { label: 'Immigration Documents',     detail: 'Encrypted · retention policies enforced' },
]

export default function SecurityPage() {
  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64 }}>

        {/* ── HERO ── */}
        <section style={{ background: 'var(--bg-warm)', padding: '110px 24px 80px' }}>
          <div className="hero-split" style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 64, alignItems: 'center' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 20 }}>SECURITY & TRUST</p>
              <h1
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(40px, 5vw, 68px)',
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  color: 'var(--text)',
                  marginBottom: 24,
                  lineHeight: 1.0,
                }}
              >
                Your employees&apos; data,<br /><span style={{ color: 'var(--gold-dark)' }}>handled with care.</span>
              </h1>
              <p style={{ fontSize: 19, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 36, maxWidth: 480 }}>
                SSNs, salaries, health records, performance reviews. We hold the most sensitive information in your company — and we built every layer of MambaHR for that reality.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {[
                  'AES-256 encryption at rest · TLS 1.3 in transit',
                  'Role-based access · SSO + SCIM · 8 default roles',
                  'Immutable audit log · every action recorded',
                  'Zero training on your data — contractually guaranteed',
                ].map((line) => (
                  <div key={line} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                      <circle cx="9" cy="9" r="9" fill="var(--gold-tint)" />
                      <path d="M5 9l3 3 5-6" stroke="var(--gold-dark)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{line}</span>
                  </div>
                ))}
              </div>
              <a href="mailto:security@mambahr.com" className="btn-gold" style={{ display: 'inline-flex' }}>
                Talk to security →
              </a>
            </div>

            {/* Right: encryption visual */}
            <div className="hero-today-panel">
              <EncryptionVisual />
            </div>
          </div>
        </section>

        {/* ── TRAINING POLICY ── */}
        <section style={{ background: '#FFFFFF', padding: '120px 24px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>THE BIG PROMISE</p>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(36px, 4.5vw, 60px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 24,
                lineHeight: 1.05,
              }}
            >
              We never train on your data.
            </h2>
            <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 640, margin: '0 auto 16px' }}>
              Your HR data is processed for your requests and immediately discarded from all AI systems. No training. No fine-tuning. No retention. Bedrock prompt logging is disabled at the AWS account level — we cannot see your prompts.
            </p>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--gold-dark)' }}>
              Contractually guaranteed.
            </p>
          </div>
        </section>

        {/* ── AUDIT TRAIL ── */}
        <section style={{ background: 'var(--bg-warm)', padding: '120px 24px' }}>
          <div className="mobile-stack" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 16 }}>AUDIT TRAIL</p>
              <h3
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: 20,
                  lineHeight: 1.1,
                }}
              >
                Every action logged.<br />Every decision traceable.
              </h3>
              <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                The agent logs every decision it makes — what data it accessed, what policy it applied, when. If anyone asks &ldquo;why was this approved?&rdquo; you have the answer in seconds. Mirrored hourly to immutable storage with object lock for SOC 2 evidence.
              </p>
            </div>
            <AuditLogVisual />
          </div>
        </section>

        {/* ── ACCESS CONTROL ── */}
        <section style={{ background: '#FFFFFF', padding: '120px 24px' }}>
          <div className="mobile-stack" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'center' }}>
            <AccessControlVisual />
            <div>
              <p className="eyebrow" style={{ marginBottom: 16 }}>ACCESS CONTROL</p>
              <h3
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: 20,
                  lineHeight: 1.1,
                }}
              >
                The right people see<br />the right data. Nobody else.
              </h3>
              <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Role-based access with SSO via Okta, Microsoft Entra, or Google. Your admins control who sees PII, who can approve decisions, and who gets read-only reports. Every access event is logged. SCIM provisioning included.
              </p>
            </div>
          </div>
        </section>

        {/* ── PII DATA TYPES ── */}
        <section style={{ background: 'var(--bg-cream)', padding: '120px 24px' }}>
          <div className="mobile-stack" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'flex-start' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 16 }}>PII PROTECTION</p>
              <h3
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: 20,
                  lineHeight: 1.1,
                }}
              >
                HR data isn&apos;t just<br />names and emails.
              </h3>
              <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                It is the most sensitive information in your company. PII (SSNs, DOBs, bank accounts, medical) <em>never enters the LLM context</em> — the agent works with identifiers and references, then server-side logic hydrates the actual data.
              </p>
            </div>
            <div style={{ background: '#FFFFFF', borderRadius: 16, padding: '8px 28px', border: '1px solid var(--border)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
              {dataTypes.map((item, i) => (
                <div key={item.label} style={{ padding: '18px 0', borderBottom: i < dataTypes.length - 1 ? '1px solid var(--border-faint)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M8 1l6 2v4c0 4.5-2.5 7-6 8.5-3.5-1.5-6-4-6-8.5V3l6-2z" fill="rgba(176,141,87,0.1)" stroke="var(--gold)" strokeWidth="1" />
                    </svg>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', margin: 0 }}>{item.label}</p>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0, paddingLeft: 26 }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPLIANCE BADGES ── */}
        <section style={{ background: '#FFFFFF', padding: '100px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>COMPLIANCE & POSTURE</p>
              <h3
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  lineHeight: 1.1,
                }}
              >
                Audited, certified, regulated.
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              {[
                { name: 'SOC 2 Type II',   status: 'In progress',   detail: 'Audit start month 7' },
                { name: 'ISO 27001',       status: 'In progress',   detail: 'Pursued in parallel' },
                { name: 'GDPR',            status: 'Compliant',     detail: 'DPA + DPIA available' },
                { name: 'HIPAA',           status: 'Segregated',    detail: 'For FMLA-medical scope' },
                { name: 'CCPA / CPRA',     status: 'Compliant',     detail: 'Per general PII policy' },
                { name: 'NY SHIELD',       status: 'Compliant',     detail: 'Per general PII policy' },
              ].map((cert) => (
                <div key={cert.name} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 18px' }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', margin: '0 0 4px' }}>{cert.name}</p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold-dark)', margin: '0 0 8px', letterSpacing: '0.02em' }}>{cert.status}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{cert.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ background: 'var(--bg-warm)', padding: '120px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>FAQ</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  lineHeight: 1.1,
                }}
              >
                The questions every CISO asks.
              </h2>
            </div>
            <div>
              {faqItems.map((faq, i) => (
                <details key={i} style={{ borderTop: '1px solid var(--border)', borderBottom: i === faqItems.length - 1 ? '1px solid var(--border)' : 'none', padding: '20px 4px' }}>
                  <summary
                    style={{
                      fontSize: 17,
                      fontWeight: 600,
                      color: 'var(--text)',
                      cursor: 'pointer',
                      listStyle: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 16,
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ flexShrink: 0, color: 'var(--gold)', fontSize: 22, lineHeight: 1, fontWeight: 300 }}>+</span>
                  </summary>
                  <p style={{ marginTop: 16, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, paddingRight: 32 }}>
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: '#1C1917', padding: '100px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <p className="eyebrow" style={{ color: 'rgba(176,141,87,0.9)', marginBottom: 20 }}>NEED MORE DETAIL?</p>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                marginBottom: 16,
                lineHeight: 1.1,
              }}
            >
              Talk to security.
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', marginBottom: 36, lineHeight: 1.6 }}>
              We&apos;ll walk you through our posture, share our DPA, complete your security questionnaire, and answer anything else.
            </p>
            <a href="mailto:security@mambahr.com" className="btn-gold" style={{ display: 'inline-flex', fontSize: 15, padding: '14px 32px' }}>
              security@mambahr.com →
            </a>
            <p style={{ marginTop: 24, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
              Or read the{' '}
              <Link href="/about" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                full story
              </Link>
              {' '}behind MambaHR.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
