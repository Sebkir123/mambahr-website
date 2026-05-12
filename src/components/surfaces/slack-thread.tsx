'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type Message = {
  name: string
  avatar?: string
  initials: string
  avatarColor?: string
  time: string
  content: string | React.ReactNode
  isMamba?: boolean
}

type SlackThreadProps = {
  channel?: string
  messages: Message[]
  compact?: boolean
}

export default function SlackThread({ channel, messages, compact }: SlackThreadProps) {
  // Animate Mamba replies: hold them back, show typing indicator, then reveal
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<'idle' | 'typing' | 'sent'>('idle')
  const lastMambaIndex = messages.findLastIndex?.((m) => m.isMamba) ??
    messages.map((m, i) => (m.isMamba ? i : -1)).filter((i) => i >= 0).pop() ?? -1

  useEffect(() => {
    if (lastMambaIndex < 0) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && phase === 'idle') {
          // brief pause before typing, then typing dots, then sent message
          const t1 = setTimeout(() => setPhase('typing'), 600)
          const t2 = setTimeout(() => setPhase('sent'), 600 + 1500)
          ;(obs as IntersectionObserver & { _ts?: ReturnType<typeof setTimeout>[] })._ts = [t1, t2]
        }
      },
      { threshold: 0.4 },
    )
    if (ref.current) obs.observe(ref.current)
    return () => {
      const ts = (obs as IntersectionObserver & { _ts?: ReturnType<typeof setTimeout>[] })._ts
      if (ts) ts.forEach(clearTimeout)
      obs.disconnect()
    }
  }, [phase, lastMambaIndex])

  return (
    <div
      ref={ref}
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--border)',
        borderRadius: compact ? 12 : 16,
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Slack chrome header */}
      {channel && (
        <div
          style={{
            background: '#3F0E40',
            padding: compact ? '8px 16px' : '10px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500 }}>#{channel}</span>
        </div>
      )}

      {/* Messages */}
      <div style={{ padding: compact ? '12px 16px' : '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((msg, i) => {
          const isLastMamba = i === lastMambaIndex
          // The last Mamba message is replaced by typing indicator until 'sent'
          if (isLastMamba && phase !== 'sent') {
            if (phase === 'idle') return null // hidden until typing starts
            return (
              <div key={`typing-${i}`} className="live-arrive" style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: compact ? 28 : 36,
                    height: compact ? 28 : 36,
                    borderRadius: 8,
                    background: '#FFFFFF',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    overflow: 'hidden',
                  }}
                >
                  <Image src="/MambaHR_logo.png" alt="Mamba" width={compact ? 22 : 28} height={compact ? 22 : 28} style={{ display: 'block', objectFit: 'contain', borderRadius: 6 }} />
                </div>
                <div style={{ flex: 1, minWidth: 0, paddingTop: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: compact ? 12 : 13, fontWeight: 700, color: '#1C1917' }}>{msg.name}</span>
                    <span style={{ fontSize: 10, fontWeight: 600, background: 'var(--gold-tint)', color: 'var(--gold-dark)', border: '1px solid rgba(176,141,87,0.2)', borderRadius: 3, padding: '1px 5px' }}>APP</span>
                    <span style={{ fontSize: 11, color: '#616061' }}>typing…</span>
                  </div>
                  <div style={{ display: 'inline-flex', gap: 5, alignItems: 'center', padding: '8px 12px', background: 'var(--bg-surface)', borderRadius: 14, border: '1px solid var(--border-faint)' }}>
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              </div>
            )
          }

          return (
            <div
              key={i}
              className={isLastMamba ? 'live-arrive' : undefined}
              style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: compact ? 28 : 36,
                  height: compact ? 28 : 36,
                  borderRadius: 8,
                  background: msg.isMamba ? '#FFFFFF' : (msg.avatarColor || '#E8E0D5'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative',
                  overflow: 'hidden',
                  border: msg.isMamba ? '1px solid var(--border)' : 'none',
                }}
              >
                {msg.isMamba ? (
                  <Image src="/MambaHR_logo.png" alt="Mamba" width={compact ? 22 : 28} height={compact ? 22 : 28} style={{ display: 'block', objectFit: 'contain', borderRadius: 6 }} />
                ) : (
                  <span style={{ fontSize: compact ? 10 : 12, fontWeight: 700, color: '#57534E' }}>{msg.initials}</span>
                )}
                {msg.isMamba && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      right: -2,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#B08D57',
                      border: '1.5px solid white',
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                  <span
                    style={{
                      fontSize: compact ? 12 : 13,
                      fontWeight: 700,
                      color: msg.isMamba ? '#1C1917' : '#1D1C1D',
                    }}
                  >
                    {msg.name}
                  </span>
                  {msg.isMamba && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        background: 'var(--gold-tint)',
                        color: 'var(--gold-dark)',
                        border: '1px solid rgba(176,141,87,0.2)',
                        borderRadius: 3,
                        padding: '1px 5px',
                      }}
                    >
                      APP
                    </span>
                  )}
                  <span style={{ fontSize: 11, color: '#616061' }}>{msg.time}</span>
                </div>
                <div style={{ fontSize: compact ? 12 : 13, color: '#1D1C1D', lineHeight: 1.5 }}>
                  {typeof msg.content === 'string'
                    ? msg.content.split('\n').map((line, j) => (
                        <p key={j} style={{ margin: 0 }}>{line}</p>
                      ))
                    : msg.content}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
