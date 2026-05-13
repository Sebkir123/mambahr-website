'use client'

import { useState } from 'react'
import SlackThread from '@/components/surfaces/slack-thread'

type Example = {
  key: string
  label: string
  badge: string
  channel: string
  question: string
  questioner: { name: string; initials: string; color: string; time: string }
  answer: React.ReactNode
}

const examples: Example[] = [
  {
    key: 'leave',
    label: 'Leave',
    badge: 'Auto-resolved · 2.4s',
    channel: 'general',
    questioner: { name: 'Emma Russo', initials: 'ER', color: '#D4C4B5', time: '9:02 AM' },
    question: '@mamba I need 3 days off next week — Mon to Wed for a wedding 🎉',
    answer: (
      <div>
        <p style={{ margin: '0 0 10px' }}>Approved — enjoy the wedding! 🎉</p>
        <div style={{ background: 'var(--bg-warm)', borderRadius: 8, padding: '10px 12px', fontSize: 12, lineHeight: 1.7 }}>
          <p style={{ margin: '0 0 3px' }}><strong style={{ color: 'var(--text)' }}>Balance:</strong> <span style={{ color: 'var(--text-muted)' }}>12 → 9 days</span></p>
          <p style={{ margin: '0 0 3px' }}><strong style={{ color: 'var(--text)' }}>Calendar:</strong> <span style={{ color: 'var(--text-muted)' }}>Apr 7–9 blocked</span></p>
          <p style={{ margin: 0 }}><strong style={{ color: 'var(--text)' }}>Manager:</strong> <span style={{ color: 'var(--text-muted)' }}>notified · OOO set</span></p>
        </div>
      </div>
    ),
  },
  {
    key: 'hiring',
    label: 'Hiring',
    badge: 'Needs your approval',
    channel: 'recruiting',
    questioner: { name: 'Brian Bell', initials: 'BB', color: '#B5C4D4', time: '2:12 PM' },
    question: '@mamba write the offer for Maya at $185k base + 0.15% equity, June 1 start',
    answer: (
      <div>
        <p style={{ margin: '0 0 10px' }}>Draft ready — sent for your review before it goes to Maya.</p>
        <div style={{ background: 'var(--bg-warm)', borderRadius: 8, padding: '10px 12px', fontSize: 12, lineHeight: 1.7 }}>
          <p style={{ margin: '0 0 3px' }}><strong style={{ color: 'var(--text)' }}>Offer:</strong> <span style={{ color: 'var(--text-muted)' }}>$185k base · 0.15% equity · June 1</span></p>
          <p style={{ margin: '0 0 3px' }}><strong style={{ color: 'var(--text)' }}>Equity:</strong> <span style={{ color: 'var(--text-muted)' }}>4yr vest · 1yr cliff</span></p>
          <p style={{ margin: 0, color: 'var(--gold-dark)', fontWeight: 500 }}>⚡ 4% above band — flagging for approval</p>
        </div>
      </div>
    ),
  },
  {
    key: 'policy',
    label: 'Policy',
    badge: 'Auto-resolved · 1.1s',
    channel: 'general',
    questioner: { name: 'Liam Torres', initials: 'LT', color: '#C4D4B5', time: '10:45 AM' },
    question: "What's the bereavement policy for an aunt?",
    answer: (
      <div>
        <p style={{ margin: '0 0 10px' }}>Per policy §6.1: 1 paid day for non-immediate family (aunt, uncle, cousin). No documentation required.</p>
        <p style={{ margin: 0, fontSize: 12, color: 'var(--gold-dark)', fontWeight: 500 }}>Want me to submit a request? →</p>
      </div>
    ),
  },
  {
    key: 'headcount',
    label: 'Reports',
    badge: 'Auto-resolved · 0.8s',
    channel: 'people-ops',
    questioner: { name: 'Sarah Kim', initials: 'SK', color: '#D4D4B5', time: '4:00 PM' },
    question: 'How many people have we hired this quarter?',
    answer: (
      <div>
        <p style={{ margin: '0 0 10px' }}>14 hires Q2 (vs 9 in Q1). Net +12.</p>
        <div style={{ background: 'var(--bg-warm)', borderRadius: 8, padding: '10px 12px', fontSize: 12, lineHeight: 1.7 }}>
          <p style={{ margin: '0 0 3px' }}><strong style={{ color: 'var(--text)' }}>Engineering:</strong> <span style={{ color: 'var(--text-muted)' }}>+8</span></p>
          <p style={{ margin: '0 0 3px' }}><strong style={{ color: 'var(--text)' }}>GTM:</strong> <span style={{ color: 'var(--text-muted)' }}>+4</span></p>
          <p style={{ margin: '0 0 3px' }}><strong style={{ color: 'var(--text)' }}>G&A:</strong> <span style={{ color: 'var(--text-muted)' }}>+2</span></p>
          <p style={{ margin: 0 }}><strong style={{ color: 'var(--text)' }}>Attrition:</strong> <span style={{ color: 'var(--text-muted)' }}>2 voluntary</span></p>
        </div>
      </div>
    ),
  },
  {
    key: 'parental',
    label: 'Parental leave',
    badge: 'Auto-resolved · 3.2s',
    channel: 'people-ops',
    questioner: { name: 'Priya Shah', initials: 'PS', color: '#C4B5D4', time: '9:14 AM' },
    question: 'Hey, anyone know how parental leave works for adoption? Adopting in June 🥹',
    answer: (
      <div>
        <p style={{ margin: '0 0 10px' }}>Priya — congratulations! Here&apos;s what applies to you:</p>
        <div style={{ background: 'var(--bg-warm)', borderRadius: 8, padding: '10px 12px', fontSize: 12, lineHeight: 1.7 }}>
          <p style={{ margin: '0 0 3px' }}><strong style={{ color: 'var(--text)' }}>Federal FMLA:</strong> <span style={{ color: 'var(--text-muted)' }}>12 weeks unpaid (adoption covered)</span></p>
          <p style={{ margin: '0 0 3px' }}><strong style={{ color: 'var(--text)' }}>CA CFRA:</strong> <span style={{ color: 'var(--text-muted)' }}>8 weeks — stacks with FMLA</span></p>
          <p style={{ margin: '0 0 3px' }}><strong style={{ color: 'var(--text)' }}>Company top-up:</strong> <span style={{ color: 'var(--text-muted)' }}>8 weeks paid (§4.2)</span></p>
          <p style={{ margin: 0, color: 'var(--gold-dark)', fontWeight: 500 }}>Total: up to 20 weeks. Start the paperwork? →</p>
        </div>
      </div>
    ),
  },
]

export default function MambaExamples() {
  const [active, setActive] = useState(0)
  const ex = examples[active]

  const messages = [
    { name: ex.questioner.name, initials: ex.questioner.initials, avatarColor: ex.questioner.color, time: ex.questioner.time, content: ex.question },
    { name: 'Mamba', initials: 'M', isMamba: true as const, time: ex.questioner.time, content: ex.answer },
  ]

  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      {/* Tab strip */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 28 }}>
        {examples.map((e, i) => (
          <button
            key={e.key}
            type="button"
            onClick={() => setActive(i)}
            style={{
              padding: '9px 18px',
              borderRadius: 999,
              border: active === i ? '1px solid var(--gold)' : '1px solid var(--border)',
              background: active === i ? 'var(--gold-tint)' : 'var(--bg)',
              color: active === i ? 'var(--gold-dark)' : 'var(--text-muted)',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {e.label}
          </button>
        ))}
      </div>

      {/* Single big thread */}
      <div style={{ position: 'relative' }}>
        {/* Status badge floating top-right */}
        <span style={{
          position: 'absolute',
          top: -10,
          right: 16,
          zIndex: 2,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.06em',
          padding: '5px 10px',
          borderRadius: 20,
          background: ex.badge.includes('approval') ? 'var(--text)' : 'var(--color-green)',
          color: 'var(--bg)',
          textTransform: 'uppercase',
        }}>
          {ex.badge}
        </span>
        <SlackThread key={ex.key} channel={ex.channel} messages={messages} />
      </div>
    </div>
  )
}
