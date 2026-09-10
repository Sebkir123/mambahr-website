'use client'

import { useState } from 'react'
import { LeadForm, type LeadFormFields } from '@/components/lead-form'

const GUIDE_SLUG = 'rif-playbook'
const GUIDE_TITLE = 'The Defensible Layoff Playbook'
const COMPANY_SIZES = ['1–10', '11–50', '51–200', '201–500', '501–1,000', '1,000+']

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

// Published playbooks managed in the admin (Marketing → Resources). Each links to
// its own trackable /resources/<slug> landing page.
export type PlaybookCard = { slug: string; title: string; kicker: string }

export default function Resources({ playbooks = [] }: { playbooks?: PlaybookCard[] }) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [errMsg, setErrMsg] = useState('')

  async function handleSubmit({ name, email, company, companyStage, turnstileToken }: LeadFormFields) {
    setSubmittedEmail(email)
    const res = await fetch('/api/field-guide', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name, email, company, companyStage, guide: GUIDE_SLUG, turnstileToken }),
    })
    if (!res.ok) {
      const d = (await res.json().catch(() => ({}))) as { error?: string }
      setErrMsg(d.error ?? 'Something went wrong.')
      setStatus('error')
      throw new Error('api-error')
    }
    setStatus('success')
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
              A step-by-step guide for running a reduction in force that holds up in court:
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
                Check your inbox. <strong>{GUIDE_TITLE}</strong> is on its way to {submittedEmail}.
              </p>
            ) : (
              <LeadForm
                onSubmit={handleSubmit}
                submitLabel="Send me the playbook"
                stageOptions={COMPANY_SIZES.map((s) => `${s} employees`)}
                stageLabel="Company size"
                error={status === 'error' ? errMsg : undefined}
              />
            )}
          </div>
        </div>

        <div className="more" data-reveal data-delay="2">
          <span className="more-l">More guides</span>
          {playbooks.length > 0
            ? playbooks.map((p) => (
                <a key={p.slug} href={`/resources/${p.slug}`} className="more-item" data-track="cta_click" data-track-label={`resource:${p.slug}`}>
                  <span className="mini-cover" aria-hidden="true">
                    <span className="mini-m">M</span>
                    <span className="mini-k">{p.kicker}</span>
                  </span>
                  <span className="more-t">{p.title}</span>
                  <span className="get">Get it →</span>
                </a>
              ))
            : MORE.map((m) => (
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
        .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #7A5A2E; margin: 0 0 18px; }
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
        .cover-stage { display: flex; animation: coverFloat 7s ease-in-out infinite; }
        @keyframes coverFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }
        .cover {
          flex: 1;
          background: linear-gradient(168deg, #20201E 0%, #1A1A19 46%, #241B12 100%);
          border-radius: 4px 13px 13px 4px;
          border-left: 4px solid rgba(255, 255, 255, 0.14); /* book spine */
          padding: 28px 26px;
          min-height: 340px;
          display: flex;
          flex-direction: column;
          color: #fff;
          position: relative;
          overflow: hidden;
          box-shadow:
            0 26px 56px -18px rgba(20, 18, 14, 0.55),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
          transition: transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.3s ease;
        }
        /* drifting aurora glow inside the cover */
        .cover::before {
          content: '';
          position: absolute;
          inset: -35%;
          z-index: 0;
          background:
            radial-gradient(38% 38% at 28% 22%, rgba(206, 154, 88, 0.55), transparent 62%),
            radial-gradient(44% 44% at 76% 82%, rgba(118, 102, 184, 0.5), transparent 62%);
          animation: coverDrift 17s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes coverDrift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          33% { transform: translate3d(6%, -5%, 0) scale(1.08); }
          66% { transform: translate3d(-5%, 5%, 0) scale(1.04); }
        }
        /* gloss sheen sweeping across */
        .cover::after {
          content: '';
          position: absolute;
          top: -20%;
          left: -75%;
          width: 55%;
          height: 140%;
          z-index: 3;
          background: linear-gradient(100deg, transparent 0%, rgba(255, 255, 255, 0.14) 50%, transparent 100%);
          transform: skewX(-16deg);
          animation: coverSheen 7s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes coverSheen {
          0%, 62%, 100% { left: -75%; }
          80% { left: 130%; }
        }
        .cover :global(.v2-grain) { z-index: 1; }
        .cover-stage:hover .cover { transform: scale(1.025); box-shadow: 0 34px 68px -20px rgba(20, 18, 14, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08); }
        @media (prefers-reduced-motion: reduce) {
          .cover-stage, .cover::before, .cover::after { animation: none; }
          .cover { transition: none; }
          .cover-stage:hover .cover { transform: none; }
        }
        .cover-brand { position: relative; z-index: 2; display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 14px; }
        .cover-brand .m { width: 22px; height: 22px; border-radius: 6px; background: #fff; color: #1A1A19; display: flex; align-items: center; justify-content: center; font-family: var(--font-serif); font-size: 14px; }
        .cover-kicker { position: relative; z-index: 2; font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255, 255, 255, 0.55); margin-top: auto; }
        .cover-title { position: relative; z-index: 2; font-family: var(--font-serif); font-size: 30px; line-height: 1.1; margin-top: 10px; letter-spacing: -0.01em; }
        .cover-foot { position: relative; z-index: 2; font-size: 13px; color: rgba(255, 255, 255, 0.5); margin-top: 14px; padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, 0.14); }

        .content { display: flex; flex-direction: column; padding: 6px 4px; }
        .content h3 { font-family: var(--font-serif); font-weight: 400; font-size: clamp(24px, 2.6vw, 30px); color: var(--text); margin: 0; letter-spacing: -0.01em; }
        .desc { font-size: 15px; line-height: 1.6; color: var(--text-muted); margin: 14px 0 18px; max-width: 460px; }
        .bullets { list-style: none; padding: 0; margin: 0 0 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 11px 18px; }
        .bullets li { display: flex; align-items: flex-start; gap: 9px; font-size: 14px; color: var(--text-muted); line-height: 1.4; }
        .tick { flex: none; width: 16px; height: 16px; margin-top: 1px; border-radius: 999px; background: var(--gold-tint); border: 1px solid var(--gold-light); position: relative; }
        .tick::after { content: ''; position: absolute; left: 5px; top: 3px; width: 3px; height: 6px; border: solid var(--gold-dark); border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .success { font-size: 15px; line-height: 1.6; color: var(--text); margin: 4px 0 0; }
        .success strong { color: var(--gold-dark); }

        .more { display: flex; align-items: center; flex-wrap: wrap; gap: 14px; margin-top: 24px; }
        .more-l { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-faint); }
        .more-item {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
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
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-faint);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 2px 8px;
        }
        a.more-item {
          opacity: 1;
          text-decoration: none;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        a.more-item:hover { transform: translateY(-2px); box-shadow: var(--shadow-md, 0 12px 24px -12px rgba(0,0,0,0.18)); }
        .get { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.04em; color: var(--gold-dark); white-space: nowrap; }
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
          padding: 4px 5px;
          overflow: hidden;
        }
        .mini-m { font-family: var(--font-serif); font-size: 12px; color: #fff; }
        .mini-k { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.02em; color: rgba(255, 255, 255, 0.55); white-space: nowrap; overflow: hidden; }
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
