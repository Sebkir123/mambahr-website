'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import { FeatureSplit, PageCta, Em } from '@/components/v2/page-kit'
import { REVIEW } from './review'

/* ── Hero: the four commitments as glass cards on the luminous stage ── */
const COMMITMENTS = [
  {
    title: 'Encrypted',
    text: 'AES-256 when stored, and TLS 1.2 or higher when it moves.',
    icon: <path d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z" />,
  },
  {
    title: 'Access by role',
    text: 'Each person sees only what their role allows.',
    icon: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" /></>,
  },
  {
    title: 'Every change logged',
    text: 'Who did what, when and why, in a log no one can edit.',
    icon: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 9h6M9 13h6M9 17h3" /></>,
  },
  {
    title: 'Never used to train AI',
    text: 'Your people data never trains any AI model.',
    icon: <><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></>,
  },
]

function SecurityHero() {
  return (
    <section className="sh">
      <div className="top">
        <p className="eyebrow" data-reveal="eager">Security</p>
        <h1 className="title" data-reveal="eager">Your people data, <Em>kept safe.</Em></h1>
        <p className="lead" data-reveal="eager">
          Salaries, leave records and health information are the most sensitive data your company
          holds. This is how MambaHR protects it.
        </p>
      </div>
      <div className="stage" data-reveal>
        <span className="field" aria-hidden="true"><i className="f1" /><i className="f2" /><i className="f3" /></span>
        <ul className="cards">
          {COMMITMENTS.map((c) => (
            <li key={c.title} className="glass">
              <span className="ico">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{c.icon}</svg>
              </span>
              <p className="c-t">{c.title}</p>
              <p className="c-x">{c.text}</p>
            </li>
          ))}
        </ul>
        <p className="dpa">These commitments are in our Data Processing Addendum, available on request.</p>
      </div>
      <style jsx>{`
        .sh { background: var(--bg); padding: clamp(128px, 13vw, 168px) var(--page-pad) clamp(40px, 5vw, 64px); }
        .top { max-width: 900px; margin: 0 auto; text-align: center; }
        .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; color: var(--gold-dark); margin: 0 0 20px; }
        .title {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(42px, 6vw, 84px);
          line-height: 0.98;
          letter-spacing: -0.045em;
          color: var(--text);
          margin: 0;
          text-wrap: balance;
        }
        .lead { font-size: clamp(17px, 1.9vw, 20px); line-height: 1.6; color: var(--text-muted); max-width: 52ch; margin: 24px auto 0; text-wrap: pretty; }
        .stage {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          max-width: 1320px;
          margin: clamp(48px, 6vw, 72px) auto 0;
          border-radius: 32px;
          padding: clamp(24px, 4.4vw, 56px);
          background: var(--stage-field);
        }
        .field { position: absolute; inset: 0; z-index: -1; }
        .field i { position: absolute; border-radius: 50%; filter: blur(70px); }
        .f1 { width: 60%; height: 90%; left: -10%; top: -40%; background: radial-gradient(circle, var(--stage-glow-1), transparent 70%); }
        .f2 { width: 55%; height: 90%; right: -12%; bottom: -40%; background: radial-gradient(circle, var(--stage-glow-2), transparent 70%); }
        .f3 { width: 50%; height: 60%; left: 25%; top: 20%; background: radial-gradient(circle, var(--stage-glow-4), transparent 70%); }
        .cards { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: clamp(12px, 1.6vw, 18px); }
        .glass {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: clamp(18px, 2vw, 24px);
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.66);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          backdrop-filter: blur(18px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.85);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 24px 48px -24px rgba(60, 40, 90, 0.4);
        }
        .ico { width: 40px; height: 40px; border-radius: 12px; display: grid; place-items: center; background: #fff; color: #5a4f8f; border: 1px solid rgba(26, 26, 25, 0.06); margin-bottom: 6px; }
        .c-t { margin: 0; font-family: var(--font-serif); font-size: clamp(20px, 1.8vw, 23px); letter-spacing: -0.02em; color: var(--text); }
        .c-x { margin: 0; font-size: 15px; line-height: 1.55; color: #45413b; }
        .dpa { margin: clamp(18px, 2.4vw, 28px) 0 0; text-align: center; font-size: 14px; color: #4a4540; }
        @media (max-width: 1000px) { .cards { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 560px) { .cards { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}

/* ── SSO fragment ── */
function SsoCard() {
  return (
    <div className="sso agent-edge agent-done">
      <div className="s-head">
        <span className="s-t">Single sign-on</span>
        <span className="s-sub">Use the login you already have</span>
      </div>
      {[
        { name: 'Okta', d: 'Sign-in and account setup', mark: 'O' },
        { name: 'Microsoft Entra', d: 'Sign-in and account setup', mark: 'E' },
        { name: 'WorkOS', d: 'Sign-in for other providers', mark: 'W' },
      ].map((p) => (
        <div className="row" key={p.name}>
          <span className="mark">{p.mark}</span>
          <div className="main">
            <div className="nm">{p.name}</div>
            <div className="dd">{p.d}</div>
          </div>
          <span className="chip"><i />connected</span>
        </div>
      ))}
      <div className="s-foot">
        <span className="mono">Offboarded at 4:02 PM → locked out at 4:02 PM</span>
      </div>
      <style jsx>{`
        .sso { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 18px 0 0; box-shadow: var(--shadow-float); }
        .s-head { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; padding: 0 20px 14px; flex-wrap: wrap; }
        .s-t { font-family: var(--font-serif); font-size: 19px; color: var(--text); }
        .s-sub { font-size: 12px; color: var(--text-faint); }
        .row { display: flex; align-items: center; gap: 13px; padding: 13px 20px; border-top: 1px solid var(--border-faint); }
        .mark { flex: none; width: 34px; height: 34px; border-radius: 10px; background: var(--gold-tint); color: var(--gold-dark); font-family: var(--font-serif); font-size: 16px; display: flex; align-items: center; justify-content: center; }
        .main { flex: 1; min-width: 0; }
        .nm { font-size: 14px; font-weight: 700; color: var(--text); }
        .dd { font-size: 12px; color: var(--text-muted); margin-top: 1px; }
        .chip { display: inline-flex; align-items: center; gap: 5px; font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-green); background: rgba(34, 160, 94, 0.09); border-radius: 999px; padding: 4px 10px; }
        .chip i { width: 6px; height: 6px; border-radius: 999px; background: var(--color-green); }
        .s-foot { padding: 12px 20px; border-top: 1px solid var(--border-faint); background: var(--bg-warm); border-radius: 0 0 16px 16px; }
        .mono { font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); }
      `}</style>
    </div>
  )
}

/* ── Approval gate fragment ── */
function ApprovalGateCard() {
  return (
    <div className="gate agent-edge agent-done">
      <div className="g-head">
        <span className="g-t">High-stakes actions</span>
        <span className="g-sub">MambaHR stops. A person decides.</span>
      </div>
      {[
        { img: '/avatars/maya.jpg', t: 'Offer · Maya Chen', m: '$195k · 8% above range', hold: true },
        { img: '/avatars/tom.jpg', t: 'Pay change · Tom Harrison', m: '+12% merit · within range', hold: true },
        { img: '/avatars/priya.jpg', t: 'Address update · Jordan Lee', m: 'Filed automatically · logged', hold: false },
      ].map((r) => (
        <div className="row" key={r.t}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={r.img} alt="" width={30} height={30} />
          <div className="main">
            <div className="t">{r.t}</div>
            <div className="m">{r.m}</div>
          </div>
          {r.hold
            ? <span className="hold">needs your sign-off</span>
            : <span className="done-c"><i aria-hidden="true" />done</span>}
        </div>
      ))}
      <div className="g-foot">
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />MambaHR · done</span>
        <span className="g-note">Routine work gets done. Sensitive calls wait for you.</span>
      </div>
      <style jsx>{`
        .gate { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 18px 0 0; box-shadow: var(--shadow-float); }
        .g-head { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; padding: 0 20px 14px; flex-wrap: wrap; }
        .g-t { font-family: var(--font-serif); font-size: 19px; color: var(--text); }
        .g-sub { font-size: 12px; color: var(--text-faint); }
        .row { display: flex; align-items: center; gap: 12px; padding: 12px 20px; border-top: 1px solid var(--border-faint); }
        .row img { width: 30px; height: 30px; border-radius: 999px; object-fit: cover; flex: none; }
        .main { flex: 1; min-width: 0; }
        .t { font-size: 14px; font-weight: 700; color: var(--text); }
        .m { font-size: 12px; color: var(--text-muted); margin-top: 1px; }
        .hold { flex: none; font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--gold); background: var(--gold-tint); border: 1px solid rgba(138, 101, 53, 0.3); border-radius: 999px; padding: 4px 10px; white-space: nowrap; }
        .done-c { flex: none; display: inline-flex; align-items: center; gap: 5px; font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-green); background: rgba(34, 160, 94, 0.09); border-radius: 999px; padding: 4px 10px; }
        .done-c i { width: 6px; height: 6px; border-radius: 999px; background: var(--color-green); }
        .g-foot { display: flex; align-items: center; gap: 10px; padding: 13px 20px; border-top: 1px solid var(--border-faint); flex-wrap: wrap; }
        .g-note { font-size: 12px; color: var(--text-muted); }
        @media (max-width: 460px) { .hold { display: none; } }
      `}</style>
    </div>
  )
}

/* ── The security questionnaire, answered on the page ── */
function SecurityReview() {
  return (
    <section className="sr">
      <div className="wrap">
        <div className="head" data-reveal>
          <p className="eyebrow">For your security review</p>
          <h2 className="title">Answers for your <Em>security review.</Em></h2>
          <p className="lead">The questions IT and legal teams ask, answered. Forward this page, or bring them to the demo.</p>
        </div>
        <div className="grid">
          {REVIEW.map((r, i) => (
            <div key={r.q} className="item" data-reveal data-delay={String(Math.min((i % 4) + 1, 4))}>
              <h3 className="q">{r.q}</h3>
              <p className="a">{r.a}</p>
            </div>
          ))}
        </div>
        <p className="contact" data-reveal>
          Something we didn&rsquo;t cover? <a href="mailto:hello@mambahr.com">hello@mambahr.com</a>.
        </p>
      </div>
      <style jsx>{`
        .sr { background: var(--bg); padding: clamp(64px, 8vw, 104px) var(--page-pad); }
        .wrap { max-width: 1180px; margin: 0 auto; }
        .head { margin-bottom: clamp(28px, 3.4vw, 44px); }
        .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; color: var(--gold-dark); margin: 0 0 16px; }
        .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(30px, 3.8vw, 48px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
        .lead { font-size: clamp(16px, 1.8vw, 18px); line-height: 1.6; color: var(--text-muted); margin: 16px 0 0; max-width: 60ch; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; column-gap: clamp(28px, 4vw, 56px); border-top: 1px solid var(--border-faint); }
        .item { padding: 22px 0; border-bottom: 1px solid var(--border-faint); }
        .q { font-family: var(--font-serif); font-size: 20px; font-weight: 400; color: var(--text); margin: 0; letter-spacing: -0.01em; }
        .a { font-size: 15px; line-height: 1.6; color: var(--text-muted); margin: 8px 0 0; }
        .contact { font-size: 15px; color: var(--text-muted); margin: 24px 0 0; }
        :global(.sr .contact a) { color: var(--text); font-weight: 600; text-decoration: underline; text-decoration-color: var(--border-mid); text-underline-offset: 3px; }
        :global(.sr .contact a:hover) { text-decoration: underline; }
        @media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}

export default function SecurityPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <main id="main">
        <SecurityHero />

        <FeatureSplit
          eyebrow="Access"
          title={<>Your logins, <Em>your rules</Em></>}
          lead="Accounts left open after someone leaves are a common way in for attackers. Sign-in and account setup run through WorkOS, Okta, or Microsoft Entra, and access follows your org chart. When someone leaves, they are locked out the same minute."
          bullets={[
            'Your team signs in with the accounts they already use',
            'Permissions follow each person’s role automatically',
            'When someone leaves, their access ends. No forgotten accounts.',
          ]}
        >
          <SsoCard />
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="You stay in charge"
          title={<>A person on <Em>the big calls</Em></>}
          lead="MambaHR works within the policy you set. Offers above your pay range, terminations, and big pay changes always wait for a person to sign off, with the reasons attached."
          bullets={[
            'You decide which actions need a person',
            'Nothing high-stakes happens without a named approver',
            'Every approval and every decline is logged',
          ]}
        >
          <ApprovalGateCard />
        </FeatureSplit>
        <SecurityReview />

        <PageCta
          title={<>Encrypted, logged, <Em>never used to train AI.</Em></>}
          sub="A 30-minute demo. Bring your security team."
        />
      </main>
      <Footer />
    </>
  )
}
