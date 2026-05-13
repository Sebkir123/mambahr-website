import type { Scenario } from './types'
import { btnPrimary, btnSecondary } from './_helpers'

const TOTAL_EMPLOYEES = 247
const RECON_START = 1200
const RECON_DURATION = 4500
const ANOMALY_AT = 6200
const RESOLVED_AT = 9500
const FOOTER_AT = 10400

export const payrollScenario: Scenario = {
  id: 'payroll',
  label: 'Payroll Friday',
  durationMs: 12000,
  render: (elapsedMs) => {
    const reconProgress = Math.max(0, Math.min(1, (elapsedMs - RECON_START) / RECON_DURATION))
    const processed = Math.floor(reconProgress * TOTAL_EMPLOYEES)
    const reconDone = elapsedMs >= RECON_START + RECON_DURATION
    const anomalyVisible = elapsedMs >= ANOMALY_AT
    const anomalyResolved = elapsedMs >= RESOLVED_AT
    const footerVisible = elapsedMs >= FOOTER_AT

    return (
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text)' }}>
        {/* Banner */}
        <div
          style={{
            background: 'var(--bg-warm)',
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--gold-dark)',
            borderRadius: 8,
            padding: '10px 14px',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: 'var(--gold-dark)', fontWeight: 700 }}>
            9:00 AM
          </span>
          <span style={{ color: 'var(--text-faint)' }}>·</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Payroll Friday</span>
        </div>

        {/* Agent header */}
        {elapsedMs >= 600 && (
          <div style={{ marginBottom: 10, fontSize: 11, color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--gold-dark)' }}>payroll.agent</strong> running reconciliation…
          </div>
        )}

        {/* Reconciliation panel */}
        {elapsedMs >= 600 && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: 16,
              maxWidth: 540,
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              marginBottom: 14,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: 'var(--text)' }}>Processing employees</span>
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, fontWeight: 700, color: reconDone ? '#15803D' : 'var(--gold-dark)' }}>
                {processed} / {TOTAL_EMPLOYEES}
              </span>
            </div>
            <div
              style={{
                height: 6,
                background: 'rgba(0,0,0,0.06)',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${reconProgress * 100}%`,
                  height: '100%',
                  background: reconDone ? '#15803D' : 'var(--gold-dark)',
                  transition: 'width 0.1s linear',
                }}
              />
            </div>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.7, marginTop: 12 }}>
              <div>
                <span style={{ color: reconProgress > 0.25 ? '#15803D' : 'var(--text-faint)' }}>{reconProgress > 0.25 ? '✓ ' : '· '}</span>
                hours pulled from time tracker
              </div>
              <div>
                <span style={{ color: reconProgress > 0.55 ? '#15803D' : 'var(--text-faint)' }}>{reconProgress > 0.55 ? '✓ ' : '· '}</span>
                tax withholdings cross-checked (4 states)
              </div>
              <div>
                <span style={{ color: reconProgress > 0.85 ? '#15803D' : 'var(--text-faint)' }}>{reconProgress > 0.85 ? '✓ ' : '· '}</span>
                benefit deductions applied
              </div>
              <div>
                <span style={{ color: reconDone ? '#B45309' : 'var(--text-faint)' }}>{reconDone ? '⚠ ' : '· '}</span>
                anomaly detection: {reconDone ? '1 flagged' : 'running…'}
              </div>
            </div>
          </div>
        )}

        {/* Anomaly card */}
        {anomalyVisible && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #FCD9B6',
              borderRadius: 12,
              padding: 14,
              maxWidth: 540,
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              animation: 'mamba-card-in 0.4s ease-out',
              marginBottom: 14,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ background: '#FFF7ED', color: '#C2410C', padding: '2px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>
                Needs your sign-off
              </span>
              <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>1 anomaly</span>
            </div>
            <p style={{ margin: '0 0 10px 0', fontSize: 13, lineHeight: 1.5 }}>
              <strong>Tom R.</strong> — overtime exceeds last month by <strong style={{ color: '#B45309' }}>38%</strong> (62 hrs vs 45 hrs avg)
            </p>
            {!anomalyResolved ? (
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={btnPrimary}>Approve</button>
                <button style={btnSecondary}>Investigate</button>
              </div>
            ) : (
              <p style={{ fontSize: 12, color: '#15803D', fontWeight: 600, margin: 0 }}>
                ✓ Approved — overtime cleared by project lead (verified shipping push)
              </p>
            )}
          </div>
        )}

        {/* Footer */}
        {footerVisible && (
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, fontStyle: 'italic' }}>
            Payroll filed. ACH initiated. Done in 4 minutes.
          </p>
        )}
      </div>
    )
  },
}
