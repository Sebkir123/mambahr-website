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
        <span className="live"><i />Live</span>
      </div>
      <div className="body">
        <div className="co">
          <span className="logo">Y</span>
          <div>
            <div className="co-n">Your Company</div>
            <div className="co-t">We&rsquo;re hiring across three teams</div>
          </div>
          <span className="mamba-chip working"><span className="mc-i" aria-hidden="true" />MambaHR · screening</span>
        </div>
        {ROLES.map((r) => (
          <div key={r.title} className="job">
            <div className="j-main">
              <div className="j-t">
                {r.title}
                {r.hot && <span className="j-hot">{r.hot}</span>}
              </div>
              <div className="j-m">{r.loc} · {r.pay}</div>
            </div>
            <span className="avs" aria-hidden="true">
              {r.avs.map((a) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={a} src={a} alt="" width={24} height={24} />
              ))}
            </span>
            <span className="j-apply">Apply</span>
          </div>
        ))}
        <div className="foot">Equal-opportunity questions handled at apply, nothing for you to set up.</div>
      </div>
      <style jsx>{`
        .cs { background: var(--bg); border: 1px solid var(--border); border-radius: 16px; box-shadow: var(--shadow-float); overflow: hidden; }
        .bar { display: flex; align-items: center; gap: 12px; height: 42px; padding: 0 14px; background: #F8F6F1; border-bottom: 1px solid var(--border); }
        .dots { display: flex; gap: 6px; }
        .dots b { width: 9px; height: 9px; border-radius: 999px; background: #e3ddd6; }
        .dots b:first-child { background: #f0a59a; }
        .dots b:nth-child(2) { background: #f4ce8e; }
        .dots b:nth-child(3) { background: #a9cfa6; }
        .addr { margin: 0 auto; font-size: 12px; color: var(--text-faint); background: var(--bg); border: 1px solid var(--border); border-radius: 7px; padding: 3px 16px; }
        .live { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-green); }
        .live i { width: 7px; height: 7px; border-radius: 999px; background: var(--color-green); }
        .body { padding: 18px 22px 16px; }
        .co { display: flex; align-items: center; gap: 12px; padding-bottom: 14px; border-bottom: 1px solid var(--border-faint); }
        .co > div { flex: 1; min-width: 0; }
        .logo { width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, var(--gold-mid), var(--violet)); color: #fff; font-family: var(--font-serif); font-size: 19px; display: flex; align-items: center; justify-content: center; }
        .co-n { font-size: 15px; font-weight: 700; color: var(--text); }
        .co-t { font-size: 13px; color: var(--text-muted); margin-top: 1px; }
        .job { display: flex; align-items: center; gap: 12px; padding: 13px 4px; }
        .job + .job { border-top: 1px solid var(--border-faint); }
        .j-main { flex: 1; min-width: 0; }
        .j-t { font-size: 15px; font-weight: 600; color: var(--text); display: flex; align-items: center; gap: 9px; flex-wrap: wrap; }
        .j-hot { font-family: var(--font-mono); font-size: 12px; color: var(--gold); background: var(--gold-tint); border: 1px solid rgba(138, 101, 53, 0.22); border-radius: 999px; padding: 2px 8px; }
        .j-m { font-size: 13px; color: var(--text-muted); margin-top: 3px; }
        .avs { display: flex; flex: none; }
        .avs img { width: 24px; height: 24px; border-radius: 999px; object-fit: cover; border: 2px solid #fff; box-shadow: var(--shadow-sm); margin-left: -7px; background: var(--bg-elevated); }
        .avs img:first-child { margin-left: 0; }
        .j-apply { flex: none; font-size: 13px; font-weight: 600; color: #fff; background: var(--text); border-radius: 999px; padding: 8px 18px; }
        .foot { font-size: 12px; color: var(--text-faint); padding-top: 12px; border-top: 1px solid var(--border-faint); margin-top: 2px; }
        @media (max-width: 640px) { .avs { display: none; } }
      `}</style>
    </div>
  )
}

/* ── Feature visual: application → ranked in the pipeline ── */
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
        <span className="score">Strong match</span>
      </div>
      <div className="why">
        <div className="w-row"><span className="tick" aria-hidden="true" />Led two zero-to-one platform launches</div>
        <div className="w-row"><span className="tick" aria-hidden="true" />Band fit: asks $195k, role tops at $205k</div>
        <div className="w-row"><span className="tick" aria-hidden="true" />References available from prior manager</div>
      </div>
      <div className="foot">
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />MambaHR · ranked &amp; filed</span>
        <span className="f-t">Recommendation only, you make the call</span>
      </div>
      <style jsx>{`
        .if { background: var(--bg); border: 1px solid var(--border); border-radius: 16px; box-shadow: var(--shadow-float); overflow: hidden; }
        .head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 20px; border-bottom: 1px solid var(--border-faint); }
        .t { font-size: 14px; font-weight: 700; color: var(--text); }
        .time { font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); }
        .cand { display: flex; align-items: center; gap: 12px; padding: 16px 20px 12px; }
        .cand img { width: 38px; height: 38px; border-radius: 999px; object-fit: cover; }
        .c-main { flex: 1; min-width: 0; }
        .c-n { font-size: 15px; font-weight: 700; color: var(--text); }
        .c-m { font-size: 13px; color: var(--text-muted); margin-top: 2px; }
        .score { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-green); background: rgba(22, 130, 70, 0.08); border-radius: 999px; padding: 4px 10px; }
        .why { padding: 0 20px 14px; display: flex; flex-direction: column; gap: 8px; }
        .w-row { display: flex; align-items: flex-start; gap: 9px; font-size: 13px; color: var(--text-muted); line-height: 1.45; }
        .tick { flex: none; width: 16px; height: 16px; margin-top: 1px; border-radius: 999px; background: var(--gold-tint); border: 1px solid rgba(138, 101, 53, 0.3); position: relative; }
        .tick::after { content: ''; position: absolute; left: 5px; top: 2.5px; width: 3px; height: 7px; border: solid var(--gold); border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 20px; background: var(--bg-warm); border-top: 1px solid var(--border-faint); }
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
        <div className="f-m">Brand, roles, and pay bands imported</div>
      </div>
      <style jsx>{`
        .bc { position: relative; }
        .ph { display: block; width: 100%; border-radius: 18px; box-shadow: var(--shadow-float); object-fit: cover; aspect-ratio: 4 / 3; }
        .float { position: absolute; right: -14px; bottom: -22px; background: var(--bg); border: 1px solid var(--border); border-radius: 14px; box-shadow: var(--shadow-float); padding: 14px 18px; transform: rotate(1.5deg); }
        .f-t { font-size: 14px; font-weight: 700; color: var(--text); margin-top: 10px; }
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
          lead="A branded careers page on your own address, live in a day. Candidates apply in two minutes, with no account to create. The questions hiring law requires are collected quietly."
          photo="/v2-people/sofia.jpg"
          photoChip="MambaHR · done"
          photoCaption="Careers page live · before lunch"
        >
          <PortalCard />
        </PageHero>

        <AgentLoop
          eyebrow="How it runs"
          title="From job post to applicant"
          lead="From the moment a role opens to the moment a candidate applies. No job-board logins, no copy-pasting resumes, no missing equal-opportunity data."
          steps={[
            { n: '01', label: 'Careers page live', desc: 'Your logo, colors, and domain. It looks like you built it, because your brand did.', who: 'agent', time: 'day 1' },
            { n: '02', label: 'Roles published', desc: 'Open roles go live on your careers page and your job-board feeds, written in your voice with pay ranges shown.', who: 'agent', time: 'same day' },
            { n: '03', label: 'Candidates apply', desc: 'A two-minute apply flow, no account creation, no resume re-typing. Candidates finish it.', who: 'agent', img: '/avatars/priya.jpg' },
            { n: '04', label: 'Hiring-law questions', desc: 'The equal-opportunity questions the law requires are asked once, stored properly, and kept out of screening.', who: 'agent' },
            { n: '05', label: 'Every applicant hears back', desc: 'MambaHR confirms each application, keeps candidates posted, and closes the loop when the role is filled. No black hole under your brand.', who: 'agent', time: 'same day' },
            { n: '06', label: 'You pick who advances', desc: 'MambaHR ranks applicants with reasons. Every advance-or-pass call is yours.', who: 'you', img: '/avatars/tom.jpg' },
          ]}
        />

        <FeatureSplit
          eyebrow="Your brand, your address"
          title={<>Looks like you <Em>built it.</Em></>}
          lead="No more sending candidates to a vendor page with someone else's logo. The careers page lives at jobs.yourcompany.com, with your brand on every pixel. Setup is one DNS record."
          bullets={[
            'Your logo, colors, and domain, set up with one DNS record',
            'Written in your voice, from your existing site',
            'Updates itself: open a role and it appears, close it and it disappears',
          ]}
        >
          <BrandCard />
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="The applicant experience"
          title={<>Two minutes <Em>to apply.</Em></>}
          lead="Candidates apply from their phone in two minutes, with no account and no resume re-typing. Every one of them hears back, so nobody is left waiting under your brand."
          bullets={[
            'No account creation, no re-typing the resume',
            'Pay range shown on every role, the way state law increasingly requires',
            'Every candidate gets an answer, and a shortlist with reasons waits for you',
          ]}
        >
          <InflowCard />
        </FeatureSplit>

        <StatTrio
          stats={[
            { n: 1, suffix: ' day', label: 'from kickoff to your careers page live on your own domain' },
            { n: 2, suffix: ' min', label: 'to apply, no account needed, from a phone' },
            { n: 100, suffix: '%', label: 'of applicants hear back, no black hole under your brand' },
          ]}
        />


        <PageCta title={<>Your careers page, <Em>by tomorrow.</Em></>} sub="A 30-minute demo. Then we put your careers page live with one DNS record." />
      </main>
      <Footer />
    </>
  )
}
