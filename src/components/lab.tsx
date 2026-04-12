export default function Lab() {
  return (
    <section id="research" style={{ padding: '96px 24px', backgroundColor: 'var(--bg-surface)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--gold)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          The Lab
        </p>
        <h2
          data-animate
          style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 12 }}
        >
          Not a wrapper. Not a chatbot. A research lab.
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-muted)', marginBottom: 56, maxWidth: 520 }}>
          Most HR AI is GPT with a prompt. MambaHR is a domain AI lab — with a proprietary HR engine no one else has built.
        </p>

        {/* Benchmark hero */}
        <div
          data-animate
          style={{
            backgroundColor: 'var(--bg)',
            borderRadius: 12,
            border: '1px solid var(--border-mid)',
            padding: '40px 32px',
            marginBottom: 32,
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 24 }}>
            HR-Bench · 500 HR scenarios · validated by domain experts
          </p>
          <div className="flex items-end justify-center" style={{ gap: 48, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 56, fontWeight: 900, color: 'var(--gold)', letterSpacing: '-0.03em', lineHeight: 1 }}>94.2%</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8, fontWeight: 500 }}>MambaHR</div>
            </div>
            <div>
              <div style={{ fontSize: 56, fontWeight: 900, color: 'var(--text-faint)', letterSpacing: '-0.03em', lineHeight: 1 }}>31%</div>
              <div style={{ fontSize: 13, color: 'var(--text-faint)', marginTop: 8, fontWeight: 500 }}>GPT-4</div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-faint)' }}>
            Accuracy on complex HR decision scenarios
          </p>
        </div>

        {/* Terminal visual — preserved from existing lab.tsx */}
        <div
          data-animate
          style={{
            backgroundColor: '#0A0908',
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
            marginBottom: 32,
          }}
        >
          <div className="flex items-center" style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', gap: 8 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FF5F57' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FEBC2E' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#28C840' }} />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginLeft: 8 }}>agent-runtime.sh</span>
          </div>
          <div style={{ padding: '16px 20px', fontFamily: 'var(--font-mono), monospace', fontSize: 12, lineHeight: 1.8 }}>
            <div><span style={{ color: 'rgba(255,255,255,0.3)' }}>[09:32:11]</span> <span style={{ color: 'var(--gold)' }}>system</span> <span style={{ color: 'rgba(255,255,255,0.5)' }}>Listening for webhooks...</span></div>
            <div><span style={{ color: 'rgba(255,255,255,0.3)' }}>[09:32:15]</span> <span style={{ color: '#D97706' }}>inbound</span> <span style={{ color: 'rgba(255,255,255,0.6)' }}>New leave request received: Sarah Jenkins</span></div>
            <div><span style={{ color: 'rgba(255,255,255,0.3)' }}>[09:32:16]</span> <span style={{ color: 'var(--gold)' }}>policy</span> <span style={{ color: 'var(--green)' }}>✓ Eligible for 14 days PTO — policy verified</span></div>
            <div><span style={{ color: 'rgba(255,255,255,0.3)' }}>[09:32:17]</span> <span style={{ color: 'var(--gold)' }}>verify</span> <span style={{ color: 'var(--green)' }}>✓ Auto-approve threshold met</span></div>
            <div><span style={{ color: 'rgba(255,255,255,0.3)' }}>[09:32:18]</span> <span style={{ color: 'var(--gold)' }}>action</span> <span style={{ color: 'rgba(255,255,255,0.5)' }}>Updating Gusto schedule... done (1.2s)</span></div>
            <div>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>[09:32:19]</span> <span style={{ color: 'var(--green)' }}>complete</span> <span style={{ color: 'var(--green)' }}>Leave approved. Manager and employee notified.</span>
              <span style={{ display: 'inline-block', width: 7, height: 14, backgroundColor: 'var(--gold)', marginLeft: 4, animation: 'blink 1s step-end infinite', verticalAlign: 'middle' }} />
            </div>
          </div>
        </div>

        {/* 3 Research pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 16 }}>
          {[
            { num: '01', title: 'HR Decision Engine', desc: '95K lines of deterministic logic encoding HR policies and regulations. Verified answers, not guesses.' },
            { num: '02', title: 'HR-Bench', desc: '500+ scenarios validated by employment attorneys. Published benchmarks against generic AI.' },
            { num: '03', title: 'Self-Learning', desc: 'When a new law passes, the classifier updates automatically — without forgetting existing knowledge.' },
          ].map((card, i) => (
            <div key={card.num} data-animate style={{ backgroundColor: 'var(--bg)', borderRadius: 12, padding: 24, border: '1px solid var(--border)', transitionDelay: `${i * 80}ms` }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--gold)', fontFamily: 'var(--font-mono), monospace' }}>{card.num}</span>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', margin: '10px 0 6px' }}>{card.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Patents */}
        <p data-animate style={{ textAlign: 'center', marginTop: 40, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
          7 Patents Pending&ensp;·&ensp;Novel HR AI Research&ensp;·&ensp;Domain-Specific Intelligence
        </p>
      </div>
    </section>
  )
}
