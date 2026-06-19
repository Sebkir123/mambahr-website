'use client'

import { useCallback, useState } from 'react'
import TurnstileWidget from '@/components/turnstile-widget'

const GUIDE_SLUG = 'rif-playbook'
const GUIDE_TITLE = 'The Defensible Layoff Playbook'

const BULLETS = [
  'State-by-state notice & severance rules',
  'WARN Act thresholds and timing',
  'Defensible selection criteria',
  'Manager, employee, and team scripts',
]

const MORE = [
  { title: 'Multi-State Leave Compliance Checklist', kicker: 'Checklist' },
  { title: 'The First-90-Days Onboarding Kit', kicker: 'Kit' },
]

export default function Resources() {
  const [email, setEmail] = useState('')
  const [token, setToken] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState('')

  const onTurnstile = useCallback((t: string) => setToken(t), [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@') || !token || status === 'loading') return
    setStatus('loading')
    try {
      const res = await fetch('/api/field-guide', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, guide: GUIDE_SLUG, turnstileToken: token }),
      })
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string }
        setErrMsg(d.error ?? 'Something went wrong.')
        setStatus('error')
        return
      }
      setStatus('success')
    } catch {
      setErrMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section className="rs">
      <div className="wrap">
        <div className="head" data-reveal>
          <p className="eyebrow">Field guides</p>
          <h2 className="title">Hard-won HR playbooks. <span className="em">Free.</span></h2>
          <p className="lead">Practical guides for the parts of the job no one warns you about.</p>
        </div>

        <div className="feature" data-reveal data-delay="1">
          <div className="cover-stage">
            <div className="cover">
              <span className="v2-grain" />
              <div className="cover-brand"><span className="m">M</span>MambaHR</div>
              <div className="cover-kicker">Field guide № 01</div>
              <div className="cover-title">The Defensible Layoff Playbook</div>
              <div className="cover-foot">A people leader&rsquo;s field guide</div>
            </div>
          </div>

          <div className="content">
            <h3>The Defensible Layoff Playbook</h3>
            <p className="desc">
              A step-by-step guide for running a reduction in force that holds up in court —
              notice and severance by state, WARN thresholds, selection criteria, and the
              scripts for every conversation.
            </p>
            <ul className="bullets">
              {BULLETS.map((b) => (
                <li key={b}><span className="tick" aria-hidden="true" />{b}</li>
              ))}
            </ul>
            {status === 'success' ? (
              <p className="success" role="status">
                Check your inbox — <strong>{GUIDE_TITLE}</strong> is on its way to {email}.
              </p>
            ) : (
              <>
                <form className="grab" onSubmit={handleSubmit}>
                  <input
                    className="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    aria-label="Work email"
                  />
                  <button className="btn" type="submit" data-track="signup" data-track-label="field-guide" disabled={status === 'loading' || !token}>
                    {status === 'loading' ? 'Sending…' : 'Send me the playbook'}
                  </button>
                </form>
                <TurnstileWidget onSuccess={onTurnstile} theme="light" />
                {status === 'error' ? (
                  <span className="note err">{errMsg}</span>
                ) : (
                  <span className="note">Free · no sales call · unsubscribe anytime</span>
                )}
              </>
            )}
          </div>
        </div>

        <div className="more" data-reveal data-delay="2">
          <span className="more-l">More guides</span>
          {MORE.map((m) => (
            <div key={m.title} className="more-item" aria-disabled="true">
              <span className="mini-cover" aria-hidden="true">
                <span className="mini-m">M</span>
                <span className="mini-k">{m.kicker}</span>
              </span>
              <span className="more-t">{m.title}</span>
              <span className="soon">Coming soon</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .rs { background: var(--bg); padding-block: clamp(96px, 13vw, 168px); }
        .wrap { max-width: var(--page-max); margin: 0 auto; padding: 0 var(--page-pad); }
        .head { max-width: none; margin-bottom: clamp(36px, 4vw, 52px); }
        .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A6535; margin: 0 0 18px; }
        .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(28px, 3.4vw, 44px); line-height: 1.06; letter-spacing: -0.025em; color: var(--text); margin: 0; }
        .em { background: linear-gradient(100deg, #B98A4E, #6A5DA6); -webkit-background-clip: text; background-clip: text; color: transparent; font-style: italic; }
        .lead { font-size: clamp(16px, 1.9vw, 18px); line-height: 1.6; color: var(--text-muted); margin: 18px 0 0; }

        .feature {
          display: grid;
          grid-template-columns: 0.78fr 1.22fr;
          gap: clamp(20px, 3vw, 36px);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: clamp(20px, 2.4vw, 28px);
          box-shadow: var(--shadow-md);
        }
        .cover-stage { perspective: 1200px; display: flex; }
        .cover {
          flex: 1;
          background:
            radial-gradient(80% 50% at 18% 0%, rgba(185, 138, 78, 0.35), transparent 60%),
            radial-gradient(70% 60% at 95% 100%, rgba(106, 93, 166, 0.3), transparent 60%),
            linear-gradient(165deg, #1A1A19, #241B12);
          border-radius: 6px 14px 14px 6px;
          border-left: 4px solid rgba(255, 255, 255, 0.12); /* book spine */
          padding: 26px 24px;
          min-height: 320px;
          display: flex;
          flex-direction: column;
          color: #fff;
          position: relative;
          overflow: hidden;
          transform: rotateY(7deg) rotateZ(-1deg);
          transform-origin: left center;
          box-shadow: 14px 22px 44px rgba(20, 18, 14, 0.28);
          transition: transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .cover-stage:hover .cover { transform: rotateY(2deg) rotateZ(0deg); }
        @media (prefers-reduced-motion: reduce) {
          .cover { transform: none; transition: none; }
          .cover-stage:hover .cover { transform: none; }
        }
        .cover-brand { position: relative; display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 14px; }
        .cover-brand .m { width: 22px; height: 22px; border-radius: 6px; background: #fff; color: #1A1A19; display: flex; align-items: center; justify-content: center; font-family: var(--font-serif); font-size: 14px; }
        .cover-kicker { position: relative; font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255, 255, 255, 0.55); margin-top: auto; }
        .cover-title { position: relative; font-family: var(--font-serif); font-size: 30px; line-height: 1.1; margin-top: 10px; letter-spacing: -0.01em; }
        .cover-foot { position: relative; font-size: 12.5px; color: rgba(255, 255, 255, 0.5); margin-top: 14px; padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, 0.14); }

        .content { display: flex; flex-direction: column; padding: 6px 4px; }
        .content h3 { font-family: var(--font-serif); font-weight: 400; font-size: clamp(24px, 2.6vw, 30px); color: var(--text); margin: 0; letter-spacing: -0.01em; }
        .desc { font-size: 15px; line-height: 1.6; color: var(--text-muted); margin: 14px 0 18px; max-width: 460px; }
        .bullets { list-style: none; padding: 0; margin: 0 0 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 11px 18px; }
        .bullets li { display: flex; align-items: flex-start; gap: 9px; font-size: 13.5px; color: var(--text-muted); line-height: 1.4; }
        .tick { flex: none; width: 16px; height: 16px; margin-top: 1px; border-radius: 999px; background: var(--gold-tint); border: 1px solid var(--gold-light); position: relative; }
        .tick::after { content: ''; position: absolute; left: 5px; top: 3px; width: 3px; height: 6px; border: solid var(--gold-dark); border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .grab { display: flex; gap: 9px; margin-top: auto; flex-wrap: wrap; }
        .email { flex: 1; min-width: 200px; border: 1px solid var(--border-mid); border-radius: 999px; padding: 13px 18px; font-size: 14.5px; color: var(--text); background: var(--bg); outline: none; }
        .email:focus { border-color: var(--gold); }
        .btn { background: #1A1A19; color: #fff; font-weight: 600; font-size: 14.5px; border: none; border-radius: 999px; padding: 13px 24px; cursor: pointer; }
        .note { font-size: 12px; color: var(--text-faint); margin-top: 12px; }
        .note.err { color: #b4392f; }
        .success { font-size: 15px; line-height: 1.6; color: var(--text); margin: 4px 0 0; }
        .success strong { color: var(--gold-dark); }

        .more { display: flex; align-items: center; flex-wrap: wrap; gap: 14px; margin-top: 24px; }
        .more-l { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-faint); }
        .more-item {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 13.5px;
          font-weight: 600;
          color: var(--text-muted);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 8px 16px 8px 8px;
          background: var(--bg);
          box-shadow: var(--shadow-sm);
          opacity: 0.78;
        }
        .soon {
          font-family: var(--font-mono);
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-faint);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 2px 8px;
        }
        .mini-cover {
          width: 38px;
          height: 48px;
          border-radius: 3px 6px 6px 3px;
          border-left: 2px solid rgba(255, 255, 255, 0.18);
          background:
            radial-gradient(90% 60% at 20% 0%, rgba(185, 138, 78, 0.4), transparent 60%),
            linear-gradient(165deg, #1A1A19, #241B12);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 5px 6px;
        }
        .mini-m { font-family: var(--font-serif); font-size: 11px; color: #fff; }
        .mini-k { font-family: var(--font-mono); font-size: 6.5px; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(255, 255, 255, 0.55); }
        .more-t { max-width: 220px; line-height: 1.3; }
        .arr { color: var(--gold-dark); }
        @media (prefers-reduced-motion: reduce) {
          .more-item { transition: none; }
          .more-item:hover { transform: none; }
        }

        @media (max-width: 820px) {
          .feature { grid-template-columns: 1fr; }
          .cover { min-height: 200px; }
          .bullets { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
