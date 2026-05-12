import Link from 'next/link'

type Props = {
  headline: string
  buttonLabel?: string
  href?: string
}

export default function SectionCta({ headline, buttonLabel = 'Book a demo →', href = '/demo' }: Props) {
  return (
    <div
      style={{
        marginTop: 64,
        padding: '28px 32px',
        background: 'var(--bg-warm)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        flexWrap: 'wrap',
        maxWidth: 920,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-serif), Georgia, serif',
          fontSize: 'clamp(18px, 1.8vw, 22px)',
          color: 'var(--text)',
          letterSpacing: '-0.01em',
          margin: 0,
          flex: 1,
          minWidth: 220,
        }}
      >
        {headline}
      </p>
      <Link href={href} className="btn-gold" style={{ flexShrink: 0 }}>
        {buttonLabel}
      </Link>
    </div>
  )
}
