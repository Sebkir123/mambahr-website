'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, QuoteBand, PageCta, Em } from '@/components/v2/page-kit'

/* ── Hero fragment: live pipeline card ── */
const STAGES: { name: string; count: number; state: string; note: string; imgs?: string[] }[] = [
  { name: 'Sourcing', count: 47, state: 'done', note: 'Posted to 9 job boards' },
  { name: 'Screening', count: 12, state: 'done', note: 'Ranked overnight, notes attached', imgs: ['/avatars/tom.jpg', '/avatars/priya.jpg', '/avatars/dave.jpg'] },
  { name: 'Interviews', count: 8, state: 'done', note: 'All panels scheduled, kits sent', imgs: ['/avatars/anna.jpg', '/avatars/marcus.jpg'] },
  { name: 'References', count: 2, state: 'done', note: '4 of 4 calls complete' },
  { name: 'Offer · Maya Chen', count: 1, state: 'you', note: 'Draft ready, awaiting you', imgs: ['/avatars/maya.jpg'] },
]

function PipelineCard() {
  return (
    <div className="pl agent-edge agent-working agent-lg">
      <div className="head">
        <div>
          <div className="role">Senior Engineer</div>
          <div className="meta">NYC hybrid · $180–205k · day 6</div>
        </div>
        <span className="mamba-chip working"><span className="mc-i" aria-hidden="true" />MambaHR · working</span>
      </div>
      <div className="prog" aria-hidden="true">
        <span className="prog-bar"><i /></span>
        <span className="prog-t">4 of 5 stages done · offer drafted day 6</span>
      </div>
      {STAGES.map((s) => (
        <div key={s.name} className={`row${s.state === 'you' ? ' yours' : ''}`}>
          <span className={`mark${s.state === 'you' ? ' gold' : ''}`} aria-hidden="true" />
          <div className="main">
            <div className="top">
              <span className="nm">{s.name}</span>
              <span className="ct">{s.count}</span>
            </div>
            <div className="note">{s.note}</div>
          </div>
          {s.imgs && (
            <span className="avs" aria-hidden="true">
              {s.imgs.map((im) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={im} src={im} alt="" width={24} height={24} />
              ))}
            </span>
          )}
          <span className={`tag${s.state === 'you' ? ' gold' : ''}`}>
            {s.state === 'you' ? 'Awaiting you' : 'Done'}
          </span>
        </div>
      ))}
      <style jsx>{`
        .pl {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: var(--shadow-float);
          padding: 6px 0 8px;
        }
        .head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 16px 20px 14px;
          border-bottom: 1px solid var(--border-faint);
        }
        .role { font-size: 16px; font-weight: 700; color: var(--text); letter-spacing: -0.01em; }
        .meta { font-size: 12.5px; color: var(--text-faint); margin-top: 3px; }
        .prog { display: flex; align-items: center; gap: 12px; padding: 11px 20px; border-bottom: 1px solid var(--border-faint); }
        .prog-bar { flex: 1; height: 5px; border-radius: 999px; background: var(--border-faint); overflow: hidden; }
        .prog-bar i { display: block; height: 100%; width: 80%; border-radius: 999px; background: linear-gradient(90deg, var(--gold-mid), var(--violet)); }
        .prog-t { font-family: var(--font-mono); font-size: 10.5px; color: var(--text-faint); white-space: nowrap; }
        .avs { display: flex; flex: none; }
        .avs img { width: 24px; height: 24px; border-radius: 999px; object-fit: cover; border: 2px solid #fff; box-shadow: var(--shadow-sm); margin-left: -7px; background: var(--bg-elevated); }
        .avs img:first-child { margin-left: 0; }
        .row { display: flex; align-items: center; gap: 13px; padding: 13px 20px; }
        .row + .row { border-top: 1px solid var(--border-faint); }
        .row.yours { background: linear-gradient(90deg, #FFF6EC, rgba(255, 246, 236, 0)); }
        .mark { flex: none; width: 17px; height: 17px; border-radius: 999px; background: var(--color-green); position: relative; }
        .mark::after { content: ''; position: absolute; left: 5.5px; top: 3px; width: 3.5px; height: 7.5px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .mark.gold { background: linear-gradient(135deg, var(--gold-pale), var(--gold)); }
        .main { flex: 1; min-width: 0; }
        .top { display: flex; align-items: baseline; gap: 8px; }
        .nm { font-size: 14px; font-weight: 600; color: var(--text); }
        .ct { font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); }
        .note { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
        .tag {
          flex: none;
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-green);
          background: rgba(22, 130, 70, 0.08);
          border-radius: 999px;
          padding: 3px 9px;
        }
        .tag.gold { color: var(--gold); background: var(--gold-tint); border: 1px solid rgba(138, 101, 53, 0.25); }
      `}</style>
    </div>
  )
}

/* ── Feature visual: hosted careers page fragment ── */
const ROLES = [
  { title: 'Senior Engineer', loc: 'New York · Hybrid', pay: '$180k–$205k', hot: true },
  { title: 'Account Executive', loc: 'Remote · US', pay: '$95k–$120k + comm.' },
  { title: 'People Operations Manager', loc: 'Austin · On-site', pay: '$110k–$135k' },
]

function CareersSite() {
  return (
    <div className="cs">
      <div className="bar">
        <span className="dots"><b /><b /><b /></span>
        <span className="addr">jobs.yourcompany.com</span>
      </div>
      <div className="body">
        <div className="co">
          <span className="logo">Y</span>
          <div>
            <div className="co-n">Your Company</div>
            <div className="co-t">We&rsquo;re hiring across three teams</div>
          </div>
        </div>
        {ROLES.map((r) => (
          <div key={r.title} className="job">
            <div className="j-main">
              <div className="j-t">
                {r.title}
                {r.hot && <span className="j-hot">12 applicants today</span>}
              </div>
              <div className="j-m">{r.loc} · {r.pay}</div>
            </div>
            <span className="j-apply">Apply</span>
          </div>
        ))}
        <div className="foot">Equal-opportunity questions handled at apply, nothing for you to set up.</div>
      </div>
      <style jsx>{`
        .cs {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: var(--shadow-float);
          overflow: hidden;
        }
        .bar {
          display: flex;
          align-items: center;
          gap: 12px;
          height: 40px;
          padding: 0 14px;
          background: #F8F6F1;
          border-bottom: 1px solid var(--border);
        }
        .dots { display: flex; gap: 6px; }
        .dots b { width: 9px; height: 9px; border-radius: 999px; background: #e3ddd6; }
        .dots b:first-child { background: #f0a59a; }
        .dots b:nth-child(2) { background: #f4ce8e; }
        .dots b:nth-child(3) { background: #a9cfa6; }
        .addr {
          margin: 0 auto;
          font-size: 12px;
          color: var(--text-faint);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 7px;
          padding: 3px 16px;
        }
        .body { padding: 20px 22px 18px; }
        .co { display: flex; align-items: center; gap: 12px; padding-bottom: 16px; border-bottom: 1px solid var(--border-faint); }
        .logo {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, var(--gold-mid), var(--violet));
          color: #fff; font-family: var(--font-serif); font-size: 19px;
          display: flex; align-items: center; justify-content: center;
        }
        .co-n { font-size: 15px; font-weight: 700; color: var(--text); }
        .co-t { font-size: 12.5px; color: var(--text-muted); margin-top: 1px; }
        .job { display: flex; align-items: center; gap: 12px; padding: 14px 4px; }
        .job + .job { border-top: 1px solid var(--border-faint); }
        .j-main { flex: 1; min-width: 0; }
        .j-t { font-size: 14.5px; font-weight: 600; color: var(--text); display: flex; align-items: center; gap: 9px; flex-wrap: wrap; }
        .j-hot {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--gold);
          background: var(--gold-tint);
          border: 1px solid rgba(138, 101, 53, 0.22);
          border-radius: 999px;
          padding: 2px 8px;
        }
        .j-m { font-size: 12.5px; color: var(--text-muted); margin-top: 3px; }
        .j-apply {
          flex: none;
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          background: var(--text);
          border-radius: 999px;
          padding: 8px 18px;
        }
        .foot { font-size: 11.5px; color: var(--text-faint); padding-top: 14px; border-top: 1px solid var(--border-faint); margin-top: 2px; }
      `}</style>
    </div>
  )
}

/* ── Feature visual: real photo + floating done card ── */
function HumanCall() {
  return (
    <div className="hc">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ph" src="/v2-people/team2.jpg" alt="A hiring panel meeting a candidate" />
      <div className="float agent-edge agent-done">
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />MambaHR · done</span>
        <div className="f-t">Offer signed · Maya Chen</div>
        <div className="f-m">Senior Engineer · starts June 22</div>
      </div>
      <style jsx>{`
        .hc { position: relative; }
        .ph {
          display: block;
          width: 100%;
          border-radius: 18px;
          box-shadow: var(--shadow-float);
          object-fit: cover;
          aspect-ratio: 4 / 3;
        }
        .float {
          position: absolute;
          right: -14px;
          bottom: -22px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 14px;
          box-shadow: var(--shadow-float);
          padding: 14px 18px;
          transform: rotate(1.5deg);
        }
        .f-t { font-size: 14px; font-weight: 700; color: var(--text); margin-top: 10px; }
        .f-m { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
        @media (max-width: 880px) {
          .float { right: 8px; bottom: -16px; }
        }
      `}</style>
    </div>
  )
}

export default function HiringPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <CountUp />
      <main>
        <PageHero
          eyebrow="Hiring & ATS"
          title={<>Hiring, <Em>handled.</Em></>}
          lead="MambaHR posts the role, screens and ranks every applicant, schedules every interview, checks references, and drafts the offer. You make one decision: who joins."
          proof="Built for lean people teams"
          photo="/v2-people/feat.jpg"
          photoChip="MambaHR · done"
          photoCaption="Maya signed · starts June 22"
        >
          <PipelineCard />
        </PageHero>

        <AgentLoop
          eyebrow="How it runs"
          title="The hiring loop"
          lead="Every step that used to mean chasing calendars and inboxes, handled. The judgment calls stay with you, clearly marked."
          steps={[
            { n: '01', label: 'Req intake', desc: 'Tell MambaHR the role, the team, and the budget, in Slack or the app. The req is ready in minutes.', who: 'agent', time: '4 min' },
            { n: '02', label: 'Posted everywhere', desc: 'The role goes live on your careers page and the major job boards, written in your voice.', who: 'agent', time: 'same day' },
            { n: '03', label: 'Screening & ranking', desc: 'Every applicant read, ranked, and recommended with reasons, you make every advance-or-pass call.', who: 'you', img: '/avatars/tom.jpg' },
            { n: '04', label: 'Scheduling', desc: 'Panels, rooms, and reschedules handled across every calendar. No back-and-forth.', who: 'agent', time: 'instant' },
            { n: '05', label: 'Interview kits & feedback', desc: 'Each interviewer gets a tailored kit; feedback is gathered and summarized the same day.', who: 'agent' },
            { n: '06', label: 'References', desc: 'Calls arranged, notes captured, themes pulled out for you to read in two minutes.', who: 'agent', img: '/avatars/dave.jpg' },
            { n: '07', label: 'Background check', desc: 'Ordered the moment you give the nod, with status tracked to the finish.', who: 'agent' },
            { n: '08', label: 'Offer out the door', desc: 'Offer drafted in band and prepared for e-signature. You approve and the offer goes out.', who: 'you', img: '/avatars/maya.jpg' },
          ]}
        />

        <FeatureSplit
          eyebrow="The job portal"
          title={<>Your job site, <Em>live in a day.</Em></>}
          lead="A branded job board on your own address, no agency, no setup project. Candidates apply, applications land in your pipeline already read, and the questions hiring law requires are collected quietly."
          bullets={[
            'Your logo, your colors, your domain, looks like you built it',
            'Every application lands in the pipeline already read and ranked',
            'Required hiring-law questions asked once, stored properly, never your problem',
          ]}
        >
          <CareersSite />
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="The human part"
          title={<>The final call stays <Em>human.</Em></>}
          lead="Interviews, culture, and who gets the offer stay yours, the part only you can do. MambaHR clears the admin so the people you meet are worth meeting, and the week you save goes into meeting them."
          bullets={[
            'MambaHR recommends; it never advances or rejects anyone on its own',
            'Every shortlist comes with the why, in plain English',
            'The offer waits for your signature, every single time',
          ]}
        >
          <HumanCall />
        </FeatureSplit>

        <StatTrio
          stats={[
            { n: 6, suffix: ' days', label: 'median req-to-offer with MambaHR running the loop' },
            { n: 47, label: 'candidates sourced for one role, screened overnight' },
            { n: 1, label: 'decision that stays yours: who joins' },
          ]}
        />

        <QuoteBand
          quote="The chase is gone. No more calendar Tetris, no more resume piles on a Sunday night. I open the pipeline, read three ranked candidates, and make the call. Hiring finally feels like judgment, not admin."
          role="People Operations Lead · AI startup, 180 people"
          img="/v2-people/marcus.jpg"
          metric="Saved 9 hrs / week"
        />

        <PageCta title={<>Hire faster. <Em>Decide better.</Em></>} />
      </main>
      <Footer />
    </>
  )
}
