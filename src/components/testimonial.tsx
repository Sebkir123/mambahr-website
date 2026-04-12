export default function DesignPartnerOffer() {
  const perks = [
    { title: 'Free access during beta', desc: 'No credit card, no contracts. Use MambaHR at full capacity while we\'re in beta.' },
    { title: 'Dedicated onboarding', desc: 'We set everything up for you. Connect your HRIS, configure your policies, go live in days.' },
    { title: 'Direct line to the founders', desc: 'You get a direct channel to the founding team. Your feedback shapes the product.' },
    { title: 'Your team shapes the roadmap', desc: 'Design partners vote on what we build next. You\'re not a user — you\'re a co-builder.' },
  ]

  return (
    <section style={{ padding: '96px 24px', backgroundColor: 'var(--bg-light)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--gold)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Design Partner Program
          </p>
          <h2
            data-animate
            style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-dark)', marginBottom: 12 }}
          >
            What you get.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-dark-muted)', maxWidth: 480, margin: '0 auto' }}>
            We&apos;re not looking for beta testers. We&apos;re looking for partners who want to build the future of HR ops with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 16 }}>
          {perks.map((perk, i) => (
            <div
              key={perk.title}
              data-animate
              className="card-hover"
              style={{
                padding: 28,
                borderRadius: 14,
                backgroundColor: 'var(--bg-light-surface)',
                border: '1px solid var(--border-light)',
                position: 'relative',
                overflow: 'hidden',
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 2, borderRadius: 1, backgroundColor: 'var(--gold)', opacity: 0.4 }} />
              <div style={{ paddingLeft: 12 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-dark)', marginBottom: 6 }}>
                  {perk.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-dark-muted)', lineHeight: 1.6 }}>
                  {perk.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* How it works flow */}
        <div data-animate style={{ marginTop: 48, textAlign: 'center' }}>
          <div className="flex flex-col md:flex-row items-center justify-center" style={{ gap: 0 }}>
            {[
              'Submit your email',
              'We reach out within 48 hours',
              '20-minute call to see if it\'s a fit',
              'Agent goes live within a week',
            ].map((step, i) => (
              <div key={step} className="flex items-center">
                <div className="flex items-center" style={{ gap: 8 }}>
                  <span style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    backgroundColor: 'var(--gold)',
                    color: '#fff',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--text-dark-muted)', whiteSpace: 'nowrap' }}>
                    {step}
                  </span>
                </div>
                {i < 3 && (
                  <span className="hidden md:block" style={{ margin: '0 12px', color: 'var(--border-light)', fontSize: 18 }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
