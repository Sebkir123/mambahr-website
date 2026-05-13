import Link from 'next/link'
import AgentPipeline from '@/components/sections/agent-pipeline'
import SectionCta from '@/components/section-cta'

export default function AiWorkforceSection() {
  return (
    <section style={{ background: '#FFFFFF', padding: '120px 24px', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64, maxWidth: 720, margin: '0 auto 32px' }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>THE AI WORKFORCE</p>
          <h2
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              marginBottom: 16,
              lineHeight: 1.05,
            }}
          >
            One agent in charge.<br />Fourteen specialists at work.
          </h2>
          <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Every request enters through Mamba, gets routed to the right specialist, and resolves with a full audit trail. Watch one in flight.
          </p>
        </div>

        <AgentPipeline />

        <p style={{ textAlign: 'center', marginTop: 40, fontSize: 14, color: 'var(--text-muted)' }}>
          All coordinated by a single agent. All gated by your policy.{' '}
          <Link href="/mamba" style={{ color: 'var(--gold-dark)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
            See how they coordinate →
          </Link>
        </p>
        <SectionCta headline="Meet your agents. 30 minutes, no slides." />
      </div>
    </section>
  )
}
