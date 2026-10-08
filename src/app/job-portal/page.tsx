'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, PageCta, Em } from '@/components/v2/page-kit'

/* ── Hero fragment: the hosted careers site, live ── */
const ROLES = [
  { title: 'Senior Engineer', loc: 'New York · Hybrid', pay: '$180k–$205k', hot: '12 applicants today', avs: ['/avatars/tom.jpg', '/avatars/priya.jpg', '/avatars/dave.jpg'] },
  { title: 'Account Executive', loc: 'Remote · US', pay: '$95k–$120k + comm.', avs: ['/avatars/anna.jpg', '/avatars/marcus.jpg'] },
  { title: 'People Operations Manager', loc: 'Austin · On-site', pay: '$110k–$135k', avs: ['/avatars/violet.jpg'] },
]

function PortalCard() {
  return (
    <div className="cs agent-edge agent-working agent-lg">
      <div className="bar">
        <span className="dots"><b /><b /><b /></span>
        <span className="addr">jobs.yourcompany.com</span>
        <span className="ui-badge success">Live</span>
      </div>
      <div className="body">
        <div className="co">
          <span className="logo" aria-hidden="true">Y</span>
          <div>
            <div className="co-n">Your Company</div>
            <div className="co-t">We&rsquo;re hiring across three teams</div>
          </div>
          <div className="co-chip"><span className="mamba-chip working"><span className="mc-i" aria-hidden="true" />MambaHR · collecting applications</span></div>
        </div>
        {ROLES.map((r) => (
          <div key={r.title} className="job">
            <div className="j-main">
              <div className="j-t">
                {r.title}
                {r.hot && <span className="ui-badge info">{r.hot}</span>}
              </div>
              <div className="j-m">{r.loc} · {r.pay}</div>
            </div>
            <span className="avs" aria-hidden="true">
              {r.avs.map((a) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={a} src={a} alt="" width={24} height={24} />
              ))}
            </span>
            <span className="ui-btn primary sm j-apply">Apply</span>
          </div>
        ))}
        <div className="foot">Equal-opportunity questions asked at apply. Nothing for you to set up.</div>
      </div>
      <style jsx>{`
        .cs { background: var(--bg-card); border-radius: var(--radius-lg); box-shadow: var(--shadow-float); overflow: hidden; }
        .bar { display: flex; align-items: center; gap: 12px; height: 42px; padding: 0 14px; background: var(--bg-surface); border-bottom: 1px solid var(--border); }
        .dots { display: flex; gap: 6px; }
        .dots b { width: 9px; height: 9px; border-radius: 999px; background: #e3ddd6; }
        .dots b:first-child { background: #f0a59a; }
        .dots b:nth-child(2) { background: #f4ce8e; }
        .dots b:nth-child(3) { background: #a9cfa6; }
        .addr { margin: 0 auto; font-size: 12px; color: var(--text-faint); background: var(--bg-card); box-shadow: inset 0 0 0 1px var(--border); border-radius: var(--radius-full); padding: 3px 16px; }
        .body { padding: 18px 22px 16px; }
        .co { display: flex; align-items: center; gap: 12px; padding-bottom: 14px; border-bottom: 1px solid var(--border-faint); }
        .co > div:not(.co-chip) { flex: 1; min-width: 0; }
        .co-chip { flex: none; }
        .logo { flex: none; width: 36px; height: 36px; border-radius: var(--radius-full); background: var(--bg-cream); color: var(--text); font-family: var(--font-serif); font-size: 19px; display: flex; align-items: center; justify-content: center; }
        .co-n { font-size: 15px; font-weight: 600; color: var(--text); }
        .co-t { font-size: 13px; color: var(--text-muted); margin-top: 1px; }
        .job { display: flex; align-items: center; gap: 12px; padding: 13px 4px; }
        .job + .job { border-top: 1px solid var(--border-faint); }
        .j-main { flex: 1; min-width: 0; }
        .j-t { font-size: 15px; font-weight: 600; color: var(--text); display: flex; align-items: center; gap: 9px; flex-wrap: wrap; }
        .j-m { font-size: 13px; color: var(--text-muted); margin-top: 3px; }
        .avs { display: flex; flex: none; }
        .avs img { width: 24px; height: 24px; border-radius: var(--radius-full); object-fit: cover; border: 2px solid #fff; box-shadow: var(--shadow-xs); margin-left: -7px; background: var(--bg-elevated); }
        .avs img:first-child { margin-left: 0; }
        .j-apply { flex: none; }
        .foot { font-size: 12px; color: var(--text-faint); padding-top: 12px; border-top: 1px solid var(--border-faint); margin-top: 2px; }
        @media (max-width: 640px) { .avs { display: none; } .co { flex-wrap: wrap; } .co-chip { flex: 0 0 100%; } }
      `}</style>
    </div>
  )
}

/* ── Feature visual: application → filed in the pipeline ── */
function InflowCard() {
  return (
    <div className="if agent-edge agent-done">
      <div className="head">
        <span className="t">New application · Senior Engineer</span>
        <span className="time">2 min ago</span>
      </div>
      <div className="cand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/avatars/priya.jpg" alt="" width={38} height={38} />
        <div className="c-main">
          <div className="c-n">Jordan Lee</div>
          <div className="c-m">Staff Engineer · 9 yrs · NYC</div>
        </div>
        <span className="ui-badge info">New</span>
      </div>
      <div className="why">
        <div className="w-row"><span className="tick" aria-hidden="true" />Resume and answers attached</div>
        <div className="w-row"><span className="tick" aria-hidden="true" />Asks $195k · the role pays up to $205k</div>
        <div className="w-row"><span className="tick" aria-hidden="true" />Confirmation sent to Jordan</div>
      </div>
      <div className="foot">
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />MambaHR · filed</span>
        <span className="f-t">Waiting for your team to review</span>
      </div>
      <style jsx>{`
        .if { background: var(--bg-card); border-radius: var(--radius-lg); box-shadow: var(--shadow-float); overflow: hidden; }
        .head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 20px; border-bottom: 1px solid var(--border-faint); }
        .t { font-size: 14px; font-weight: 600; color: var(--text); }
        .time { font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); }
        .cand { display: flex; align-items: center; gap: 12px; padding: 16px 20px 12px; }
        .cand img { width: 38px; height: 38px; border-radius: var(--radius-full); object-fit: cover; }
        .c-main { flex: 1; min-width: 0; }
        .c-n { font-size: 15px; font-weight: 600; color: var(--text); }
        .c-m { font-size: 13px; color: var(--text-muted); margin-top: 2px; }
        .why { padding: 0 20px 14px; display: flex; flex-direction: column; gap: 8px; }
        .w-row { display: flex; align-items: flex-start; gap: 9px; font-size: 13px; color: var(--text-muted); line-height: 1.45; }
        .tick { flex: none; width: 16px; height: 16px; margin-top: 1px; border-radius: var(--radius-full); background: var(--green-tint); position: relative; }
        .tick::after { content: ''; position: absolute; left: 5px; top: 2.5px; width: 3px; height: 7px; border: solid var(--green); border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 20px; background: var(--bg-surface); border-top: 1px solid var(--border-faint); }
        .f-t { font-size: 12px; color: var(--text-faint); }
      `}</style>
    </div>
  )
}

/* ── Feature visual: brand controls ── */
function BrandCard() {
  return (
    <div className="bc">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ph" src="/v2-people/team.jpg" alt="A team reviewing their new careers page" />
      <div className="float agent-edge agent-done">
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />MambaHR · done</span>
        <div className="f-t">jobs.yourcompany.com · live</div>
        <div className="f-m">Brand, roles, and pay ranges imported</div>
      </div>
      <style jsx>{`
        .bc { position: relative; }
        .ph { display: block; width: 100%; border-radius: var(--radius-lg); box-shadow: var(--shadow-float); object-fit: cover; aspect-ratio: 4 / 3; }
        .float { position: absolute; right: -14px; bottom: -22px; background: var(--bg-card); border-radius: var(--radius-lg); box-shadow: var(--shadow-float); padding: 14px 20px; transform: rotate(1.5deg); }
        .f-t { font-size: 14px; font-weight: 600; color: var(--text); margin-top: 10px; }
        .f-m { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
        @media (max-width: 880px) { .float { right: 8px; bottom: -16px; } }
      `}</style>
    </div>
  )
}

export default function JobPortalPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <CountUp />
      <main id="main">
        <PageHero
          eyebrow="The careers page"
          title={<>Your jobs, <Em>live.</Em></>}
          lead="A careers page with your brand, on your own web address, live in a day. Candidates apply in two minutes without creating an account. The equal-opportunity questions the law requires are asked for you."
          photo="/v2-people/sofia.jpg"
          photoChip="MambaHR · done"
          photoCaption="Careers page live · before lunch"
        >
          <PortalCard />
        </PageHero>

        <AgentLoop
          eyebrow="How it works"
          title="From job post to applicant"
          lead="No job-board logins, no copying resumes between tools, no missing equal-opportunity data."
          steps={[
            { n: '01', label: 'Careers page live', desc: 'Your logo, colors, and web address. Candidates see your brand, not ours.', who: 'agent', time: 'day 1' },
            { n: '02', label: 'Roles published', desc: 'Open roles go live on your careers page and job boards, with pay ranges shown.', who: 'agent', time: 'same day' },
            { n: '03', label: 'Candidates apply', desc: 'A two-minute form. No account to create, no retyping the resume.', who: 'agent', img: '/avatars/priya.jpg' },
            { n: '04', label: 'Equal-opportunity questions', desc: 'Asked once and stored apart from the application your team reviews.', who: 'agent' },
            { n: '05', label: 'Every applicant hears back', desc: 'MambaHR confirms each application, keeps candidates updated, and tells them when the role is filled.', who: 'agent', time: 'same day' },
            { n: '06', label: 'You pick who advances', desc: 'Your hiring team reviews every application and decides who moves forward.', who: 'you', img: '/avatars/tom.jpg' },
          ]}
        />

        <FeatureSplit
          eyebrow="Your brand, your address"
          title={<>Looks like you <Em>built it.</Em></>}
          lead="Candidates stay with your brand, not a vendor page with someone else's logo. The careers page lives at jobs.yourcompany.com. Setup is one small change to your domain settings."
          bullets={[
            'Your logo, colors, and web address',
            'Written in your voice, based on your current website',
            'Open a role and it appears. Close it and it disappears.',
          ]}
        >
          <BrandCard />
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="For applicants"
          title={<>Two minutes <Em>to apply.</Em></>}
          lead="Candidates apply from their phone, with no account and no retyping. Every one of them hears back."
          bullets={[
            'No account to create, no retyping the resume',
            'Pay range shown on every role, as more states now require',
            'Every application waits in one pipeline for your team to review',
          ]}
        >
          <InflowCard />
        </FeatureSplit>

        <StatTrio
          stats={[
            { n: 1, suffix: ' day', label: 'to put your careers page live on your own web address' },
            { n: 2, suffix: ' min', label: 'to apply from a phone, no account needed' },
            { n: 100, suffix: '%', label: 'of applicants get a reply' },
          ]}
        />


        <PageCta title={<>Your careers page, <Em>by tomorrow.</Em></>} sub="A 30-minute demo. Then we set up your careers page on your own web address." />
      </main>
      <Footer />
    </>
  )
}
