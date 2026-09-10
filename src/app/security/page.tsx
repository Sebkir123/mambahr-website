'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, FeatureSplit, StatTrio, QuoteBand, PageCta, Em } from '@/components/v2/page-kit'
import { REVIEW } from './review'

/* ── Hero fragment: dark security log ── */
const LOG = [
  { time: '09:31:08', text: 'Access granted · role: HR admin', tag: 'logged' },
  { time: '09:31:42', text: 'Record changed · comp · by MambaHR', tag: 'rule cited' },
  { time: '09:32:15', text: 'Export requested · approved by B. Bell', tag: 'logged' },
  { time: '09:33:01', text: 'Document viewed · offer · by HR admin', tag: 'logged' },
]

function SecurityLogCard() {
  return (
    <div className="sec agent-edge agent-done">
      <span className="v2-grain" />
      <div className="s-head">
        <span className="s-t">Audit log</span>
        <span className="s-chip"><i />Every action logged</span>
      </div>
      <div className="rows">
        {LOG.map((r) => (
          <div className="row" key={r.time}>
            <span className="time">{r.time}</span>
            <span className="ok" aria-hidden="true" />
            <span className="txt">{r.text}</span>
            <span className="tag">{r.tag}</span>
          </div>
        ))}
      </div>
      <div className="s-foot">
        <span>Kept forever · cannot be edited, not even by us</span>
        <span className="mono">4 of 247 today</span>
      </div>
      <style jsx>{`
        .sec { position: relative; overflow: hidden; background: var(--ink); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 20px 0 0; box-shadow: var(--shadow-float); }
        .s-head { display: flex; align-items: center; justify-content: space-between; padding: 0 22px 16px; }
        .s-t { font-family: var(--font-serif); font-size: 19px; color: #FFF2E6; letter-spacing: -0.01em; }
        .s-chip { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--gold-pale); background: rgba(212, 170, 124, 0.12); border: 1px solid rgba(212, 170, 124, 0.25); border-radius: 999px; padding: 4px 10px; }
        .s-chip i { width: 6px; height: 6px; border-radius: 999px; background: var(--gold-pale); }
        .rows { border-top: 1px solid rgba(255, 255, 255, 0.07); }
        .row { display: flex; align-items: center; gap: 12px; padding: 13px 22px; font-family: var(--font-mono); font-size: 12px; }
        .row + .row { border-top: 1px solid rgba(255, 255, 255, 0.06); }
        .time { color: rgba(255, 242, 230, 0.4); flex: none; }
        .ok { flex: none; width: 14px; height: 14px; border-radius: 999px; background: rgba(46, 160, 94, 0.2); border: 1px solid rgba(110, 200, 140, 0.5); position: relative; }
        .ok::after { content: ''; position: absolute; left: 4.5px; top: 2px; width: 3px; height: 7px; border: solid #8FD6A8; border-width: 0 1.5px 1.5px 0; transform: rotate(45deg); }
        .txt { color: rgba(255, 242, 230, 0.88); flex: 1; min-width: 0; }
        .tag { flex: none; font-size: 12px; color: #AEA2E6; background: rgba(106, 93, 166, 0.22); border-radius: 999px; padding: 3px 9px; }
        .s-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 12px 22px; border-top: 1px solid rgba(255, 255, 255, 0.07); font-size: 12px; color: rgba(255, 242, 230, 0.5); flex-wrap: wrap; }
        .mono { font-family: var(--font-mono); font-size: 12px; color: rgba(255, 242, 230, 0.35); }
        @media (max-width: 520px) { .tag { display: none; } }
      `}</style>
    </div>
  )
}

/* ── Commitments section (page-local, styled like AgentLoop's card) ── */
const COMMITMENTS = [
  { n: '01', label: 'Encrypted in transit and at rest', desc: 'AES-256 encryption at rest, TLS 1.3 in transit. Your records are protected while stored and while moving between systems.', tag: 'Always on' },
  { n: '02', label: 'Access by role, least privilege', desc: 'Each person sees only what their role allows. Managers see their team; employees see their own record.', tag: 'Always on' },
  { n: '03', label: 'Every change logged with who and why', desc: 'Every action, by a person or by MambaHR, is written to a record nobody can edit, with the reason attached.', tag: 'Always on' },
  { n: '04', label: 'Your data stays in the US', desc: 'Stored on AWS in the United States. It never leaves the country.', tag: 'In our DPA' },
  { n: '05', label: 'Never used to train AI', desc: 'Names, salaries, leave and health information, none of it trains any AI model. Not ours, not anyone else’s.', tag: 'In our DPA' },
]

function Commitments() {
  return (
    <section className="cm">
      <div className="wrap">
        <div className="head" data-reveal>
          <p className="eyebrow">Our commitments</p>
          <h2 className="title">How we treat your data</h2>
          <p className="lead">No fine print, no acronyms. The five things that hold for every customer, written into our Data Processing Addendum, available on request.</p>
        </div>
        <div className="card agent-edge agent-done" data-reveal data-delay="1">
          {COMMITMENTS.map((c) => (
            <div className="row" key={c.n}>
              <span className="num">{c.n}</span>
              <span className="mark" aria-hidden="true" />
              <div className="main">
                <div className="lbl">{c.label}</div>
                <div className="desc">{c.desc}</div>
              </div>
              <span className="tag">{c.tag}</span>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .cm { background: var(--bg); padding-block: clamp(88px, 11vw, 144px); }
        .wrap { max-width: var(--page-max); margin: 0 auto; padding: 0 var(--page-pad); }
        .head { margin-bottom: clamp(36px, 4vw, 52px); text-align: center; }
        .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold); margin: 0 0 16px; }
        .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(30px, 3.8vw, 48px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
        .lead { font-size: clamp(16px, 1.9vw, 18px); line-height: 1.6; color: var(--text-muted); margin: 16px auto 0; max-width: 620px; }
        .card { background: var(--bg); border: 1px solid var(--border); border-radius: 18px; padding: 8px 0; box-shadow: var(--shadow-float); max-width: 920px; margin: 0 auto; }
        .row { display: flex; align-items: center; gap: 16px; padding: 16px clamp(18px, 2.4vw, 28px); }
        .row + .row { border-top: 1px solid var(--border-faint); }
        .num { font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); width: 22px; flex: none; }
        .mark { flex: none; width: 18px; height: 18px; border-radius: 999px; background: var(--color-green); position: relative; }
        .mark::after { content: ''; position: absolute; left: 6px; top: 3.5px; width: 4px; height: 8px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .lbl { font-size: 15px; font-weight: 700; color: var(--text); letter-spacing: -0.01em; }
        .desc { font-size: 14px; color: var(--text-muted); margin-top: 2px; line-height: 1.45; }
        .main { flex: 1; min-width: 0; }
        .tag { flex: none; font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--gold); background: var(--gold-tint); border: 1px solid rgba(138, 101, 53, 0.25); border-radius: 999px; padding: 4px 10px; white-space: nowrap; }
        @media (max-width: 640px) { .row { flex-wrap: wrap; } }
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
        <span className="s-sub">Your login, your rules</span>
      </div>
      {[
        { name: 'Okta', d: 'Sign-on + user provisioning', mark: 'O' },
        { name: 'Microsoft Entra', d: 'Sign-on + user provisioning', mark: 'E' },
        { name: 'WorkOS', d: 'Sign-on for everything else', mark: 'W' },
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
        .sso { background: var(--bg); border: 1px solid var(--border); border-radius: 16px; padding: 18px 0 0; box-shadow: var(--shadow-float); }
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
        { img: '/avatars/maya.jpg', t: 'Offer · Maya Chen', m: '$195k · above band 8%', hold: true },
        { img: '/avatars/tom.jpg', t: 'Comp change · Tom Harrison', m: '+12% merit · within band', hold: true },
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
            ? <span className="hold">requires human sign-off</span>
            : <span className="done-c"><i aria-hidden="true" />done</span>}
        </div>
      ))}
      <div className="g-foot">
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />MambaHR · done</span>
        <span className="g-note">Routine work runs; the sensitive calls wait for you</span>
      </div>
      <style jsx>{`
        .gate { background: var(--bg); border: 1px solid var(--border); border-radius: 16px; padding: 18px 0 0; box-shadow: var(--shadow-float); }
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
          <h2 className="title">The questionnaire, <Em>answered.</Em></h2>
          <p className="lead">The questions your IT and legal reviewers will ask, answered before they ask them. Forward this page, or bring them to the demo.</p>
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
          Something we didn&rsquo;t cover? <a href="mailto:hello@mambahr.com">security questions go straight to the founders</a>.
        </p>
      </div>
      <style jsx>{`
        .sr { background: var(--bg-warm); padding: clamp(72px, 9vw, 120px) var(--page-pad); }
        .wrap { max-width: var(--page-max); margin: 0 auto; }
        .head { text-align: center; margin-bottom: clamp(36px, 4.4vw, 56px); }
        .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold); margin: 0 0 16px; }
        .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(30px, 3.8vw, 48px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
        .lead { font-size: clamp(15.5px, 1.8vw, 17.5px); line-height: 1.6; color: var(--text-muted); margin: 16px auto 0; max-width: 620px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(16px, 2vw, 24px); }
        .item { background: var(--bg); border: 1px solid var(--border); border-radius: 16px; padding: clamp(20px, 2.4vw, 28px); box-shadow: var(--shadow-sm); }
        .q { font-size: 16px; font-weight: 700; color: var(--text); margin: 0; letter-spacing: -0.01em; }
        .a { font-size: 14px; line-height: 1.6; color: var(--text-muted); margin: 10px 0 0; }
        .contact { text-align: center; font-size: 14px; color: var(--text-muted); margin: 28px 0 0; }
        :global(.sr .contact a) { color: var(--gold-dark); font-weight: 700; text-decoration: none; }
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
      <CountUp />
      <main id="main">
        <PageHero
          eyebrow="Security"
          title={<>Locked down, <Em>logged.</Em></>}
          lead="Salaries, leave records, health information, the most sensitive data your company holds. Encrypted everywhere, access by role, every change on the record, and never used to train AI. Written into our Data Processing Addendum, available on request."
          photo="/v2-people/sofia.jpg"
          photoChip="MambaHR · done"
          photoCaption="Audit question answered the same morning"
        >
          <SecurityLogCard />
        </PageHero>

        <Commitments />

        <FeatureSplit
          eyebrow="Access"
          title={<>Your logins, <Em>your rules</Em></>}
          lead="Orphaned accounts are how breaches start. Sign-on and user setup run through WorkOS, Okta, or Microsoft Entra, and access follows your org chart. When someone is offboarded, they are locked out the same minute."
          bullets={[
            'Your team signs in with the accounts they already use',
            'Permissions follow each person’s role, automatically',
            'Offboarded means locked out, no orphaned accounts',
          ]}
        >
          <SsoCard />
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="Human oversight"
          title={<>A human on <Em>the big calls</Em></>}
          lead="MambaHR acts within the policy you set. Offers above your pay range, terminations, and big pay changes always stop and wait for a person to sign off. Every time, with the reasoning attached."
          bullets={[
            'You decide which actions need a person',
            'Nothing high-stakes happens without a named approver',
            'Every approval, and every decline, is on the record',
          ]}
        >
          <ApprovalGateCard />
        </FeatureSplit>

        <StatTrio
          stats={[
            { n: 100, suffix: '%', label: 'of changes logged with who and why' },
            { n: 0, label: 'AI training on your data, written into our DPA' },
            { n: 1, label: 'human required on every high-stakes action' },
          ]}
        />

        <SecurityReview />

        <QuoteBand
          quote="I asked the hard questions before we signed, who sees what, where the data lives, what trains their AI. The answers were in the Data Processing Addendum, not a slide deck."
          role="Head of People · Robotics startup, 240 people"
          img="/v2-people/feat.jpg"
        />

        <PageCta
          title={<>Trust, <Em>verifiable.</Em></>}
          sub="Bring your security team to the demo. We like those calls."
        />
      </main>
      <Footer />
    </>
  )
}
