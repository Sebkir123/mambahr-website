const faqs = [
  { q: 'Do we replace our current HRIS, or run alongside it?', a: 'We replace it. MambaHR is the HRIS — system of record for employees, comp, leaves, performance, everything. We migrate your data from Gusto, Workday, Rippling, BambooHR, Namely, Personio, HiBob, or wherever it lives. Most teams switch over in a single day.' },
  { q: 'How is this different from a Slack bot or HRIS chatbot?', a: 'Slack bots answer questions. MambaHR takes action. The agent reads the thread, checks the policy, files the form, updates records, notifies the manager, and logs the audit trail. It does the work, not the lookup.' },
  { q: 'What happens if the agent gets something wrong?', a: 'Every action carries a status label. High-risk actions (terminations, RIF, separation agreements, comp changes above threshold) are always you. Lower-risk actions (PTO within policy, standard onboarding) are automated with full audit log. You can override anything. When the agent is uncertain, the card routes to you for sign-off.' },
  { q: 'How long does setup take?', a: 'Most teams are running by end of day Friday and live Monday morning. Day 1: we pull your data from your old HRIS and you set policy on one screen. Day 2: the agent goes live. Some teams choose to start with one function (like leave) and add others over the first week — that\'s a trust pace, not a setup limitation.' },
  { q: 'What about compliance? Are we still on the hook?', a: 'Legally, yes — you are always the employer. MambaHR runs on a curated employment-law engine covering federal regulations and all 50 state codes. Every compliance call cites its regulatory source. Edge cases route to human review by default — your CHRO (or external counsel) signs off before anything binding goes out.' },
  { q: 'Who owns the data?', a: 'You do. We are a processor, not a controller. Data can be exported or deleted on request. We never train AI models on your data — contractually guaranteed.' },
]

const faqJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
})

export default function FaqSection() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />
      <section style={{ background: '#FFFFFF', padding: '120px 24px' }}>
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
                marginBottom: 16,
                lineHeight: 1.15,
              }}
            >
              Questions you&apos;re going to ask anyway.
            </h2>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <details
                key={i}
                style={{
                  borderTop: '1px solid var(--border)',
                  borderBottom: i === faqs.length - 1 ? '1px solid var(--border)' : 'none',
                  padding: '20px 4px',
                }}
              >
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

          <p style={{ textAlign: 'center', marginTop: 40, fontSize: 14, color: 'var(--text-muted)' }}>
            Have more questions?{' '}
            <a href="mailto:hello@mambahr.com" style={{ color: 'var(--gold-dark)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              Email the founders directly
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}
