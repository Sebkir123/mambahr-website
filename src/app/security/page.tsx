'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'

/* ── Encryption visual — always encrypted, with a scanning verifier ── */
function DataShieldVisual() {
  const [scan, setScan] = useState(-1)
  useEffect(() => {
    const t = setInterval(() => setScan(s => (s + 1) % 6), 900)
    return () => clearInterval(t)
  }, [])

  const rows = [
    { label: 'Social Security', cipher: 'a7f2 b9k1 d4x9 e6m3' },
    { label: 'Annual salary', cipher: 'b3e8 m4p2 c1n6 r9q4' },
    { label: 'Medical info', cipher: 'c1d4 w7r5 e2f8 t6v3' },
  ]

  return (
    <div style={{ position: 'relative', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.08)' }}>
      {/* Header */}
      <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 1l7 2.3v4.7c0 5-2.8 7.8-7 9.5C4.8 15.8 2 13 2 8V3.3L9 1z" fill="rgba(176,141,87,0.18)" stroke="var(--gold)" strokeWidth="1.4" />
          <path d="M6 9l2.2 2.2L12 7" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Maya Chen · employee record</p>
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 20, background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E', animation: 'gold-ring-pulse 2s ease-out infinite' }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#15803D', letterSpacing: '0.04em' }}>SECURE</span>
        </span>
      </div>

      {/* Rows — always encrypted, scanner highlights one at a time */}
      {rows.map((row, i) => {
        const isScanning = scan === i
        return (
          <div key={row.label} style={{
            position: 'relative',
            padding: '18px 22px',
            borderBottom: i < rows.length - 1 ? '1px solid var(--border-faint)' : 'none',
            background: isScanning ? 'rgba(176,141,87,0.04)' : 'transparent',
            transition: 'background 0.6s ease',
          }}>
            {isScanning && (
              <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: 'var(--gold)' }} />
            )}

            <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px' }}>{row.label}</p>

            <span style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 14,
              color: isScanning ? 'var(--gold-dark)' : 'var(--text-muted)',
              letterSpacing: '0.06em',
              transition: 'color 0.5s',
            }}>{row.cipher}</span>
          </div>
        )
      })}

      {/* Footer */}
      <div style={{ padding: '12px 22px', background: 'var(--gold-tint)', borderTop: '1px solid rgba(176,141,87,0.2)' }}>
        <p style={{ fontSize: 11, color: 'var(--gold-dark)', fontWeight: 600, margin: 0, textAlign: 'center', letterSpacing: '0.02em' }}>
          AES-256 · zero plaintext · ever
        </p>
      </div>
    </div>
  )
}

/* ── Audit log — always-visible entries with new entry pulsing in ── */
function AuditLogVisual() {
  const [highlight, setHighlight] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setHighlight(h => (h + 1) % 4), 2200)
    return () => clearInterval(t)
  }, [])

  const entries = [
    { time: '09:32:16', action: 'Leave request received', detail: 'from Maya Chen via Slack', actor: 'mamba.agent', ref: 'evt_4f81a2' },
    { time: '09:32:16', action: 'Policy checked', detail: '12 days remaining · within threshold', actor: 'compliance.engine', ref: 'evt_4f81a3' },
    { time: '09:32:17', action: 'Leave approved', detail: 'auto-resolved', actor: 'time-off.agent', ref: 'evt_4f81a4' },
    { time: '09:32:18', action: 'Calendar + payroll updated', detail: 'manager notified · OOO set', actor: 'mamba.agent', ref: 'evt_4f81a5' },
  ]

  return (
    <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}>
      {/* Header */}
      <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="12" height="12" rx="2" stroke="var(--gold)" strokeWidth="1.3" />
            <path d="M5 5h6M5 8h4M5 11h5" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>Audit log · Maya Chen</span>
        </div>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', animation: 'gold-ring-pulse 2s ease-out infinite' }} />
          <span style={{ fontSize: 10, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>live · tamper-proof</span>
        </span>
      </div>

      {/* Entries — all visible, current one highlighted */}
      {entries.map((entry, i) => {
        const isHighlight = highlight === i
        return (
          <div key={entry.ref} style={{
            display: 'grid',
            gridTemplateColumns: '60px 1fr 22px',
            gap: 14,
            padding: '14px 20px',
            borderBottom: i < entries.length - 1 ? '1px solid var(--border-faint)' : 'none',
            background: isHighlight ? 'rgba(34,197,94,0.06)' : 'transparent',
            transition: 'background 0.6s ease',
            position: 'relative',
          }}>
            {/* Left timestamp */}
            <div style={{ paddingTop: 2 }}>
              <p style={{ fontSize: 10, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace', margin: 0 }}>{entry.time}</p>
              <p style={{ fontSize: 9, color: isHighlight ? '#15803D' : 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace', margin: '2px 0 0', transition: 'color 0.4s' }}>{entry.ref}</p>
            </div>

            {/* Middle content */}
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', margin: 0 }}>{entry.action}</p>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '3px 0 0' }}>{entry.detail}</p>
              <p style={{ fontSize: 10, color: 'var(--text-faint)', margin: '4px 0 0', fontFamily: 'var(--font-mono), monospace' }}>actor: {entry.actor}</p>
            </div>

            {/* Right check */}
            <div style={{ paddingTop: 2 }}>
              <span style={{
                display: 'flex',
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: '#F0FDF4',
                border: '1px solid #BBF7D0',
                alignItems: 'center',
                justifyContent: 'center',
                transform: isHighlight ? 'scale(1.15)' : 'scale(1)',
                transition: 'transform 0.4s',
              }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4.5" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </div>

            {/* Highlight bar on the left when active */}
            {isHighlight && (
              <span style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 2,
                background: '#22C55E',
              }} />
            )}
          </div>
        )
      })}

      {/* Footer */}
      <div style={{ padding: '12px 20px', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-faint)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>
          Cryptographically signed · exportable · immutable
        </p>
        <span style={{ fontSize: 10, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>4 of 247 today</span>
      </div>
    </div>
  )
}

/* ── Access control — auto-cycling visual showing what each role sees ── */
function AccessControlVisual() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % 4), 3200)
    return () => clearInterval(t)
  }, [])

  type FieldVis = 'visible' | 'masked' | 'hidden'
  type Role = {
    role: string
    badge: string
    bg: string
    fg: string
    dot: string
    fields: { label: string; value: string; vis: FieldVis }[]
  }

  const roles: Role[] = [
    {
      role: 'You (Admin)', badge: 'Full access', bg: 'var(--gold-tint)', fg: 'var(--gold-dark)', dot: 'var(--gold)',
      fields: [
        { label: 'Name', value: 'Maya Chen', vis: 'visible' },
        { label: 'Salary', value: '$124,000', vis: 'visible' },
        { label: 'SSN', value: '123-45-6789', vis: 'visible' },
        { label: 'Performance', value: 'Exceeds (4.5/5)', vis: 'visible' },
      ],
    },
    {
      role: 'HR Manager', badge: 'PII + approvals', bg: '#EFF6FF', fg: '#1D4ED8', dot: '#3B82F6',
      fields: [
        { label: 'Name', value: 'Maya Chen', vis: 'visible' },
        { label: 'Salary', value: '$124,000', vis: 'visible' },
        { label: 'SSN', value: '••• •• 6789', vis: 'masked' },
        { label: 'Performance', value: 'Exceeds (4.5/5)', vis: 'visible' },
      ],
    },
    {
      role: "Maya's Manager", badge: 'Direct report', bg: '#F5F3FF', fg: '#6D28D9', dot: '#8B5CF6',
      fields: [
        { label: 'Name', value: 'Maya Chen', vis: 'visible' },
        { label: 'Salary', value: 'Within band', vis: 'masked' },
        { label: 'SSN', value: 'Restricted', vis: 'hidden' },
        { label: 'Performance', value: 'Exceeds (4.5/5)', vis: 'visible' },
      ],
    },
    {
      role: 'Coworker', badge: 'Public profile only', bg: 'var(--bg-surface)', fg: 'var(--text-muted)', dot: 'var(--text-muted)',
      fields: [
        { label: 'Name', value: 'Maya Chen', vis: 'visible' },
        { label: 'Salary', value: 'Restricted', vis: 'hidden' },
        { label: 'SSN', value: 'Restricted', vis: 'hidden' },
        { label: 'Performance', value: 'Restricted', vis: 'hidden' },
      ],
    },
  ]

  const r = roles[active]

  return (
    <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}>
      {/* Header */}
      <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="6" cy="5" r="3" stroke="var(--gold)" strokeWidth="1.3" />
          <path d="M2 14c0-2.5 1.8-4 4-4s4 1.5 4 4" stroke="var(--gold)" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="11.5" cy="6" r="2.2" stroke="var(--gold)" strokeWidth="1.3" />
          <path d="M9.5 14c.3-1.5 1.3-2.5 3-2.5s2.7 1 3 2.5" stroke="var(--gold)" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>Same record. Different views.</span>
      </div>

      {/* Role tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderBottom: '1px solid var(--border-faint)' }}>
        {roles.map((role, i) => (
          <button
            key={role.role}
            type="button"
            onClick={() => setActive(i)}
            style={{
              padding: '10px 8px',
              border: 'none',
              borderBottom: active === i ? `2px solid ${role.dot}` : '2px solid transparent',
              background: active === i ? 'rgba(0,0,0,0.02)' : 'transparent',
              cursor: 'pointer',
              fontSize: 11,
              fontWeight: active === i ? 700 : 500,
              color: active === i ? 'var(--text)' : 'var(--text-muted)',
              transition: 'all 0.25s',
            }}
          >
            {role.role.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Active role view */}
      <div style={{ padding: '18px 20px' }}>
        {/* Role label */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: r.dot }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>Viewing as: {r.role}</span>
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: r.bg, color: r.fg, letterSpacing: '0.04em' }}>
            {r.badge.toUpperCase()}
          </span>
        </div>

        {/* Field rows */}
        <div style={{ background: 'var(--bg-surface)', borderRadius: 10, padding: '4px 14px' }}>
          {r.fields.map((f, i) => (
            <div key={f.label} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '11px 0',
              borderBottom: i < r.fields.length - 1 ? '1px solid var(--border-faint)' : 'none',
            }}>
              <span style={{ fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{f.label}</span>
              <span style={{
                fontSize: 12,
                fontWeight: 600,
                color: f.vis === 'visible' ? 'var(--text)' : f.vis === 'masked' ? 'var(--text-muted)' : 'var(--text-faint)',
                fontFamily: 'var(--font-mono), monospace',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                transition: 'color 0.4s',
              }}>
                {f.vis === 'hidden' && (
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <rect x="2" y="4.5" width="7" height="5" rx="1" stroke="var(--text-faint)" strokeWidth="1" />
                    <path d="M3.5 4.5v-1a2 2 0 014 0v1" stroke="var(--text-faint)" strokeWidth="1" />
                  </svg>
                )}
                {f.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '12px 20px', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-faint)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5" stroke="var(--text-muted)" strokeWidth="1" />
          <path d="M6 4v3M6 8.5v.1" stroke="var(--text-muted)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>
          Connects to Google, Okta, or Microsoft · access changes auto-sync
        </p>
      </div>
    </div>
  )
}

const faqItems = [
  {
    q: 'Can you see our employee data?',
    a: "No. Your data is yours. We process it to run your workflows — that's it. No one at MambaHR browses your records, and nothing is shared with third parties.",
  },
  {
    q: 'Do you train AI on our data?',
    a: "Never. Your HR data does not train any AI model — ours or any vendor's. The agent uses AI to run your work, not to learn from your people's information. This is contractual, in plain language.",
  },
  {
    q: 'How is our data encrypted?',
    a: 'AES-256 at rest, TLS 1.3 in transit, AES-256 on backups. Encryption keys are managed in enterprise-grade key management — never accessible to humans.',
  },
  {
    q: 'Where is our data stored?',
    a: 'United States only. Enterprise-grade cloud infrastructure, US-based regions for primary storage and backups.',
  },
  {
    q: 'Who at MambaHR can access our data?',
    a: 'Production access is restricted to a small on-call rotation, protected by hardware keys and fully audit-logged. The agent operates with the least privilege required for each action. Browsing customer records is never routine.',
  },
  {
    q: 'How do you handle a security incident?',
    a: 'Detect, contain, notify. Customer notification within 24 hours for any incident affecting data confidentiality. Full post-incident report — timeline, root cause, remediation — within 7 days.',
  },
  {
    q: 'How do you handle HIPAA-protected data?',
    a: "Health-related leave and benefits data is segregated and handled with HIPAA-informed controls — access scoping, encryption, audit logging. We're not a covered entity, but our controls meet the bar your covered-entity programs require from a business associate.",
  },
]

const guarantees = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 2l11 3.5v7c0 8-4.5 12.5-11 15C7.5 24.5 3 20 3 12.5V5.5L14 2z" fill="rgba(176,141,87,0.12)" stroke="var(--gold)" strokeWidth="1.4" />
        <path d="M9 14l4 4 6-7" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Your data stays yours',
    desc: 'We process it. We never own it. Full export or deletion on demand, no questions asked.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="12" width="20" height="14" rx="3" stroke="var(--gold)" strokeWidth="1.4" />
        <path d="M9 12V9a5 5 0 0110 0v3" stroke="var(--gold)" strokeWidth="1.4" />
        <circle cx="14" cy="19" r="2" fill="var(--gold)" />
      </svg>
    ),
    title: 'No training on your people',
    desc: "Your team's names, salaries, and performance reviews never train an AI model. Ever. It's in the contract.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="var(--gold)" strokeWidth="1.4" />
        <path d="M9 14l4 4 7-7" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Everything is logged',
    desc: 'Every decision the agent makes is recorded. Who triggered it, what policy applied, what changed.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="11" cy="9" r="4" stroke="var(--gold)" strokeWidth="1.4" />
        <path d="M4 24c0-4.4 3.1-8 7-8s7 3.6 7 8" stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M19 13l4 4m0 0l-4 4m4-4h-7" stroke="var(--gold)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Right person sees the right thing',
    desc: 'Role-based access enforced at every layer. Managers see their team. Employees see their own record.',
  },
]

export default function SecurityPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64 }}>

        {/* ── HERO ── */}
        <section style={{ background: 'var(--bg-warm)', padding: '110px 24px 80px' }}>
          <div className="hero-split" style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20, padding: '5px 12px 5px 8px', background: 'var(--gold-tint)', border: '1px solid rgba(176,141,87,0.2)', borderRadius: 999 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold-dark)' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold-dark)', letterSpacing: '0.08em' }}>SECURITY · TRUST</span>
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(36px, 4vw, 56px)',
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  color: 'var(--text)',
                  marginBottom: 24,
                  lineHeight: 1.05,
                }}
              >
                Your employees&apos; data,<br /><span style={{ color: 'var(--gold-dark)' }}>handled with care.</span>
              </h1>
              <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 32, maxWidth: 480 }}>
                SSNs, salaries, health records, performance reviews — we hold the most sensitive information in your company. Every layer of MambaHR was built for that reality.
              </p>

              {/* Pillar grid — replaces the bullet list */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 32, maxWidth: 480 }}>
                {[
                  {
                    title: 'Encrypted',
                    desc: 'Bank-grade · in transit and at rest',
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="3" y="7" width="10" height="7" rx="1.4" stroke="var(--gold-dark)" strokeWidth="1.3" />
                        <path d="M5 7V5a3 3 0 016 0v2" stroke="var(--gold-dark)" strokeWidth="1.3" />
                      </svg>
                    ),
                  },
                  {
                    title: 'Role-scoped',
                    desc: 'Your team sees only what they should',
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="6" cy="5" r="2.5" stroke="var(--gold-dark)" strokeWidth="1.3" />
                        <path d="M2 13c0-2.5 1.8-4 4-4s4 1.5 4 4" stroke="var(--gold-dark)" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                    ),
                  },
                  {
                    title: 'Audit-logged',
                    desc: 'Every agent decision · tamper-proof',
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="var(--gold-dark)" strokeWidth="1.3" />
                        <path d="M5 5h6M5 8h4M5 11h5" stroke="var(--gold-dark)" strokeWidth="1" strokeLinecap="round" />
                      </svg>
                    ),
                  },
                  {
                    title: 'Never trained on',
                    desc: 'Contractually guaranteed · zero',
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6.5" stroke="var(--gold-dark)" strokeWidth="1.3" />
                        <path d="M3.5 12.5L12.5 3.5" stroke="var(--gold-dark)" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                    ),
                  },
                ].map((p) => (
                  <div key={p.title} style={{ background: 'var(--bg)', border: '1px solid var(--border-faint)', borderRadius: 12, padding: '14px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      {p.icon}
                      <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', margin: 0 }}>{p.title}</p>
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{p.desc}</p>
                  </div>
                ))}
              </div>

              <a href="mailto:security@mambahr.com" className="btn-gold" style={{ display: 'inline-flex' }}>
                Talk to us about security →
              </a>
            </div>

            <div className="hero-today-panel">
              <DataShieldVisual />
            </div>
          </div>
        </section>

        {/* ── FOUR GUARANTEES ── */}
        <section style={{ background: 'var(--bg)', padding: '96px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56, maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>HOW WE PROTECT YOU</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(28px, 3.4vw, 44px)',
                  fontWeight: 400,
                  letterSpacing: '-0.025em',
                  color: 'var(--text)',
                  marginBottom: 16,
                  lineHeight: 1.1,
                }}
              >
                Four things we<br />never compromise on.
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                The promises that don&apos;t shift, no matter the customer or contract.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              {guarantees.map((g) => (
                <div
                  key={g.title}
                  style={{
                    padding: '30px 26px',
                    background: 'var(--bg-warm)',
                    borderRadius: 16,
                    border: '1px solid var(--border)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'var(--gold-tint)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 22,
                  }}>
                    {g.icon}
                  </div>
                  <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>{g.title}</p>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AUDIT TRAIL ── */}
        <section style={{ background: 'var(--bg-warm)', padding: '96px 24px' }}>
          <div className="mobile-stack" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'center' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 16 }}>FULL TRANSPARENCY</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(24px, 2.8vw, 36px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: 16,
                  lineHeight: 1.15,
                }}
              >
                The agent does nothing you can&apos;t see.
              </h2>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.75, margin: 0 }}>
                Every decision is logged — who triggered it, what policy applied, what changed. If someone asks &ldquo;why was that approved?&rdquo; you have the answer in seconds.
              </p>
            </div>
            <AuditLogVisual />
          </div>
        </section>

        {/* ── ACCESS CONTROL ── */}
        <section style={{ background: 'var(--bg)', padding: '96px 24px' }}>
          <div className="mobile-stack" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'center' }}>
            <AccessControlVisual />
            <div>
              <p className="eyebrow" style={{ marginBottom: 16 }}>ACCESS CONTROL</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(24px, 2.8vw, 36px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: 16,
                  lineHeight: 1.15,
                }}
              >
                Nobody sees more than they should.
              </h2>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.75, margin: 0 }}>
                Connect your existing Google, Okta, or Microsoft login. Permissions follow each person&apos;s role automatically — and disappear the moment they leave.
              </p>
            </div>
          </div>
        </section>

        {/* ── SPECIFICATIONS ── editorial spec sheet, not card grid ── */}
        <section style={{ background: 'var(--bg-cream)', padding: '96px 24px' }}>
          <div style={{ maxWidth: 820, margin: '0 auto' }}>
            <div style={{ marginBottom: 56, maxWidth: 600 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>THE SPECIFICS</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(28px, 3.4vw, 44px)',
                  fontWeight: 400,
                  letterSpacing: '-0.025em',
                  color: 'var(--text)',
                  lineHeight: 1.1,
                  marginBottom: 16,
                }}
              >
                The exact specs<br />your CISO will ask for.
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Built for the US market. Real practices, not aspirational checkboxes.
              </p>
            </div>

            {/* Spec groups — editorial typography, no cards */}
            {[
              {
                group: 'Encryption',
                rows: [
                  { k: 'At rest',     v: 'AES-256' },
                  { k: 'In transit',  v: 'TLS 1.3' },
                  { k: 'Backups',     v: 'AES-256, encrypted' },
                  { k: 'Key management', v: 'Enterprise KMS · never human-accessible' },
                ],
              },
              {
                group: 'Access',
                rows: [
                  { k: 'Authentication', v: 'SSO via Google, Okta, or Microsoft' },
                  { k: 'Permissions',    v: 'Role-based, auto-synced from your IdP' },
                  { k: 'Provisioning',   v: 'Access expires the moment someone leaves' },
                  { k: 'Audit log',      v: 'Every action recorded · cryptographically signed · immutable' },
                ],
              },
              {
                group: 'Data',
                rows: [
                  { k: 'Residency',      v: 'United States' },
                  { k: 'AI training',    v: 'Never used to train any model · contractual' },
                  { k: 'Export',         v: 'Full export on demand · standard formats' },
                  { k: 'Retention',      v: 'Per US legal requirements · you decide when to delete' },
                ],
              },
              {
                group: 'Sensitive scopes',
                rows: [
                  { k: 'Health data',         v: 'HIPAA-informed controls · segregated storage · scoped access' },
                  { k: 'California residents', v: 'CCPA/CPRA — request, correct, delete anytime' },
                  { k: 'Background data',     v: 'FCRA-compliant flows · separate pipelines from operational HR data' },
                ],
              },
            ].map((section, sectionIdx) => (
              <div key={section.group} style={{ marginBottom: sectionIdx === 3 ? 0 : 40 }}>
                <p
                  className="mono"
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'var(--gold-dark)',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    marginBottom: 14,
                  }}
                >
                  {section.group}
                </p>
                <div>
                  {section.rows.map((row, i) => (
                    <div
                      key={row.k}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(160px, 220px) 1fr',
                        gap: 32,
                        padding: '14px 0',
                        borderTop: i === 0 ? '1px solid var(--border)' : 'none',
                        borderBottom: '1px solid var(--border)',
                        alignItems: 'baseline',
                      }}
                    >
                      <span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500 }}>{row.k}</span>
                      <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{row.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ background: 'var(--bg)', padding: '96px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p className="eyebrow" style={{ marginBottom: 14 }}>QUESTIONS</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(24px, 2.8vw, 36px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  lineHeight: 1.15,
                }}
              >
                Things people ask before they trust us.
              </h2>
            </div>
            <div>
              {faqItems.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    borderTop: '1px solid var(--border)',
                    borderBottom: i === faqItems.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: '100%',
                      padding: '22px 4px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 16,
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{faq.q}</span>
                    <span style={{
                      flexShrink: 0,
                      width: 24, height: 24,
                      borderRadius: '50%',
                      background: openFaq === i ? 'var(--text)' : 'var(--bg-surface)',
                      color: openFaq === i ? 'var(--bg)' : 'var(--text-muted)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18, lineHeight: 1, fontWeight: 300,
                      transition: 'all 0.2s',
                    }}>{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && (
                    <p style={{ margin: '0 0 24px 0', padding: '0 32px 0 0', fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.75 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: 'var(--bg-warm)', padding: '80px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 480, margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(24px, 2.8vw, 36px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 14,
                lineHeight: 1.15,
              }}
            >
              Still have questions?
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', marginBottom: 28, lineHeight: 1.6 }}>
              Email us, send your security questionnaire, or get on a call. No slides, no spin.
            </p>
            <a href="mailto:security@mambahr.com" className="btn-gold" style={{ display: 'inline-flex' }}>
              security@mambahr.com →
            </a>
          </div>
        </section>

        <RequestAccessSection />
      </main>
      <Footer />
    </>
  )
}
