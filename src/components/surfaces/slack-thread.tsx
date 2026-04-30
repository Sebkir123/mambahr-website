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
  return (
    <div
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
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            {/* Avatar */}
            <div
              style={{
                width: compact ? 28 : 36,
                height: compact ? 28 : 36,
                borderRadius: msg.isMamba ? 8 : 6,
                background: msg.isMamba ? '#1C1917' : (msg.avatarColor || '#E8E0D5'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                position: 'relative',
              }}
            >
              {msg.isMamba ? (
                <span style={{ color: 'var(--gold)', fontSize: compact ? 10 : 13 }}>◆</span>
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
        ))}
      </div>
    </div>
  )
}
