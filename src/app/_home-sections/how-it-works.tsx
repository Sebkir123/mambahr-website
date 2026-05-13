import TodayCard from '@/components/surfaces/today-card'
import MigrationCard from '@/components/surfaces/migration-card'
import PolicyCard from '@/components/surfaces/policy-card'
import SectionCta from '@/components/section-cta'
import { todayCards } from './hero'

export default function HowItWorksSection() {
  return (
    <section style={{ background: 'var(--bg-cream)', padding: '120px 24px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 80, maxWidth: 760, margin: '0 auto 80px' }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>HOW IT WORKS</p>
          <h2
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              marginBottom: 40,
              lineHeight: 1.1,
            }}
          >
            From kickoff to autopilot, in under a week.
          </h2>

          {/* Numbered stanza — 1 · 1 · 0 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              columnGap: 28,
              rowGap: 18,
              maxWidth: 560,
              margin: '0 auto 32px',
              textAlign: 'left',
            }}
          >
            {[
              { n: '1', label: 'day to switch from any HRIS.' },
              { n: '1', label: 'screen to set your policy.' },
              { n: '0', label: 'callouts after that.' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'contents' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    fontSize: 'clamp(64px, 7vw, 96px)',
                    fontWeight: 400,
                    color: 'var(--gold-dark)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.04em',
                    alignSelf: 'center',
                  }}
                >
                  {row.n}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    fontSize: 'clamp(22px, 2.4vw, 30px)',
                    color: 'var(--text)',
                    lineHeight: 1.3,
                    alignSelf: 'center',
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {row.label}
                </span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.6, fontStyle: 'italic' }}>
            After that, the agent runs your HR department.
          </p>
        </div>

        {/* Step 1: Migrate — left copy, right mockup */}
        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'center', marginBottom: 100 }}>
          <div>
            <p className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.06em', marginBottom: 16 }}>STEP 01 · ~1 DAY</p>
            <h3 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 400, color: 'var(--text)', marginBottom: 16, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Switch from your old HRIS.
            </h3>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20 }}>
              Move off Gusto, Workday, Rippling, BambooHR, Namely, Personio — whatever you have. We pull employees, comp records, org chart, leave balances, performance history, and documents. One click. Zero data loss.
            </p>
            <p style={{ fontSize: 13, color: 'var(--text-faint)', fontStyle: 'italic' }}>
              Most teams switch end-of-day Friday. Live Monday morning.
            </p>
          </div>
          <MigrationCard />
        </div>

        {/* Step 2: Set Policy — right copy, left mockup */}
        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'center', marginBottom: 100 }}>
          <PolicyCard />
          <div>
            <p className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.06em', marginBottom: 16 }}>STEP 02 · ~30 MINUTES</p>
            <h3 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 400, color: 'var(--text)', marginBottom: 16, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Set your policy. One screen.
            </h3>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20 }}>
              Tell the agent your approval thresholds, PTO rules, comp ranges, and human sign-off rules. Toggle what runs automatically and what comes to you. Edit anytime.
            </p>
            <p style={{ fontSize: 13, color: 'var(--text-faint)', fontStyle: 'italic' }}>
              High-risk actions stay with you. The matrix is codified in code, not policy doc.
            </p>
          </div>
        </div>

        {/* Step 3: Run — left copy, right mockup */}
        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <p className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.06em', marginBottom: 16 }}>STEP 03 · ONGOING</p>
            <h3 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 400, color: 'var(--text)', marginBottom: 16, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              The agent runs your HR.
            </h3>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20 }}>
              Employees ask in Slack. Agent answers, files, schedules, and approves what falls within policy. You handle the Today queue — typically 30 minutes a day. Every action audit-logged.
            </p>
            <p style={{ fontSize: 13, color: 'var(--text-faint)', fontStyle: 'italic' }}>
              Your CHRO does judgment. Everything else does itself.
            </p>
          </div>
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 14, padding: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
            <div style={{ background: 'var(--bg-surface)', borderRadius: 8, padding: '8px 12px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#15803D' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>Today queue · 3 items need you</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {todayCards.map((c, i) => <TodayCard key={i} {...c} />)}
            </div>
          </div>
        </div>
        <SectionCta headline="See your migration plan in 30 minutes." />
      </div>
    </section>
  )
}
