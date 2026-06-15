'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import s from './deck.module.css'

const SLIDE_TITLES = [
  'Title',
  'The problem',
  'Why now',
  'The paradigm shift',
  'The product',
  'How it works',
  'The moat',
  'Traction',
  'Business model',
  'Market',
  'Team',
  'The ask',
  'Close',
]
const COUNT = SLIDE_TITLES.length

export default function Deck() {
  const scroller = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLElement | null)[]>([])
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showHint, setShowHint] = useState(true)

  const goto = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(COUNT - 1, i))
    slideRefs.current[clamped]?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Track scroll progress + the active slide.
  useEffect(() => {
    const el = scroller.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = el.scrollHeight - el.clientHeight
        setProgress(max > 0 ? el.scrollTop / max : 0)
        // nearest slide to the top edge
        const mid = el.scrollTop + el.clientHeight / 2
        let best = 0
        let bestDist = Infinity
        slideRefs.current.forEach((node, i) => {
          if (!node) return
          const center = node.offsetTop + node.offsetHeight / 2
          const d = Math.abs(center - mid)
          if (d < bestDist) { bestDist = d; best = i }
        })
        setActive(best)
        if (el.scrollTop > 40) setShowHint(false)
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => { el.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  // Keyboard navigation — arrows / space / page keys / home / end.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault(); goto(active + 1); break
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault(); goto(active - 1); break
        case 'Home':
          e.preventDefault(); goto(0); break
        case 'End':
          e.preventDefault(); goto(COUNT - 1); break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, goto])

  const setRef = (i: number) => (n: HTMLElement | null) => { slideRefs.current[i] = n }
  const pad = (n: number) => String(n + 1).padStart(2, '0')

  return (
    <>
      <div className={s.progress} aria-hidden="true">
        <div className={s.progressFill} style={{ transform: `scaleX(${progress})` }} />
      </div>

      <nav className={s.dots} aria-label="Slides">
        {SLIDE_TITLES.map((title, i) => (
          <button
            key={i}
            className={`${s.dot}${i === active ? ' ' + s.dotActive : ''}`}
            aria-label={`${pad(i)} — ${title}`}
            aria-current={i === active}
            onClick={() => goto(i)}
          />
        ))}
      </nav>

      <div className={s.counter} aria-hidden="true">{pad(active)} / {pad(COUNT - 1)}</div>

      <div className={`${s.hint}`} style={{ opacity: showHint ? 1 : 0 }} aria-hidden="true">
        <span className={s.hintKey}>↓</span>
        <span className={s.hintKey}>↑</span>
        to navigate
      </div>

      <main ref={scroller} className={s.deck} tabIndex={-1} aria-label="MambaHR pitch deck">

        {/* 01 · Title */}
        <section ref={setRef(0)} className={`${s.slide} ${s.dark}`} aria-label="Title">
          <div className={s.inner}>
            <div className={s.titleMark}>
              <span className={s.markDot}>M</span>
              <span className={s.markWord}>MambaHR</span>
            </div>
            <p className={s.eyebrow}>Seed 2026</p>
            <h1 className={s.display}>The <span className={s.grad}>AI HR Department</span></h1>
            <p className={s.lead}>We don&rsquo;t sell software seats. We sell digital headcount.</p>
            <div className={s.titleTag}>
              <span className={s.titleRaise}>Seed round · $3M</span>
            </div>
          </div>
        </section>

        {/* 02 · Problem */}
        <section ref={setRef(1)} className={`${s.slide} ${s.warm}`} aria-label="The problem">
          <div className={s.inner}>
            <p className={s.eyebrow}>The problem · the SaaS trap</p>
            <div className={s.bigStatRow}>
              <span className={s.bigStat}>$1</span>
              <span className={`${s.bigStat} ${s.bigStatSep}`}>:</span>
              <span className={`${s.bigStat} ${s.grad}`}>$6</span>
            </div>
            <p className={s.lead} style={{ maxWidth: '34ch' }}>
              For every <strong>$1</strong> a company spends on HR software, <strong>$6</strong> goes to the
              humans operating it. Every HRIS is a database that still needs expensive people to push its buttons.
            </p>
            <figure className={s.quote}>
              <p className={s.quoteText}>&ldquo;For every dollar spent on software, six are spent on services.&rdquo;</p>
              <cite className={s.quoteCite}>Julien Bek · Sequoia Capital</cite>
            </figure>
          </div>
        </section>

        {/* 03 · Why now */}
        <section ref={setRef(2)} className={`${s.slide} ${s.surface}`} aria-label="Why now">
          <div className={s.inner}>
            <p className={s.eyebrow}>Why now</p>
            <h2 className={s.h2}>Three forces converged at once.</h2>
            <div className={s.grid3}>
              <div className={s.card}>
                <span className={s.cardNum}>01</span>
                <h3 className={s.cardTitle}>Models got reliable</h3>
                <p className={s.cardBody}>Frontier models crossed the reliability threshold for production HR work — not demos, real execution.</p>
              </div>
              <div className={s.card}>
                <span className={s.cardNum}>02</span>
                <h3 className={s.cardTitle}>Labor doesn&rsquo;t scale</h3>
                <p className={s.cardBody}>Every ~100 hires forces another HR admin at $75K+. The cost curve is linear and unforgiving.</p>
              </div>
              <div className={s.card}>
                <span className={s.cardNum}>03</span>
                <h3 className={s.cardTitle}>Capital shifted</h3>
                <p className={s.cardBody}>Services-as-software is the fastest-compounding venture category. Harvey alone is valued at $11B.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 04 · Paradigm shift */}
        <section ref={setRef(3)} className={`${s.slide} ${s.dark}`} aria-label="The paradigm shift">
          <div className={s.inner}>
            <p className={s.eyebrow}>The paradigm shift</p>
            <h2 className={s.h2}>From selling tools to selling <span className={s.serifEm}>outcomes</span>.</h2>
            <div className={s.compare}>
              <div className={`${s.panel} ${s.panelOld}`}>
                <p className={`${s.colHead} ${s.colOld}`}>Old game · SaaS copilots</p>
                <ul className={s.rowList}>
                  <li><span className={s.cross}>—</span> Sell software seats</li>
                  <li><span className={s.cross}>—</span> Margin erodes as AI commoditizes</li>
                  <li><span className={s.cross}>—</span> Competes against every model release</li>
                </ul>
              </div>
              <div className={`${s.panel} ${s.panelNew}`}>
                <p className={`${s.colHead} ${s.colNew}`}>New game · digital headcount</p>
                <ul className={s.rowList}>
                  <li><span className={s.tick}>→</span> Sell completed work</li>
                  <li><span className={s.tick}>→</span> ~90% software margins on the services TAM</li>
                  <li><span className={s.tick}>→</span> Every model improvement widens the margin</li>
                </ul>
              </div>
            </div>
            <figure className={s.quote}>
              <p className={s.quoteText}>&ldquo;If you sell the tool, you&rsquo;re in a race against the model. If you sell the outcome, the model works for you.&rdquo;</p>
              <cite className={s.quoteCite}>Sequoia Capital</cite>
            </figure>
          </div>
        </section>

        {/* 05 · Product */}
        <section ref={setRef(4)} className={`${s.slide} ${s.warm}`} aria-label="The product">
          <div className={s.inner}>
            <p className={s.eyebrow}>The product</p>
            <h2 className={s.h2}>The system of record <span className={s.serifEm}>and</span> the department that runs it.</h2>
            <div className={s.grid4}>
              <div className={s.card}>
                <h3 className={s.cardTitle}>Hiring</h3>
                <p className={s.cardBody}>Offer letter → background check → provisioning → record created.</p>
              </div>
              <div className={s.card}>
                <h3 className={s.cardTitle}>Onboarding</h3>
                <p className={s.cardBody}>Day-zero kit, policy Q&amp;A, I-9, benefits enrollment.</p>
              </div>
              <div className={s.card}>
                <h3 className={s.cardTitle}>Management</h3>
                <p className={s.cardBody}>Leave, compensation, performance reviews, policy answers.</p>
              </div>
              <div className={s.card}>
                <h3 className={s.cardTitle}>Offboarding</h3>
                <p className={s.cardBody}>Access revocation, COBRA, final pay, record closure.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 06 · How it works */}
        <section ref={setRef(5)} className={`${s.slide} ${s.surface}`} aria-label="How it works">
          <div className={s.inner}>
            <p className={s.eyebrow}>How it works</p>
            <h2 className={s.h2}>Trigger. Verify. Execute.</h2>
            <div className={s.grid3}>
              <div className={s.card}>
                <span className={s.chip}>1</span>
                <h3 className={s.cardTitle}>Trigger</h3>
                <p className={s.cardBody}>An employee asks in Slack or Teams, or a manager files a request through the form.</p>
              </div>
              <div className={s.card}>
                <span className={s.chip}>2</span>
                <h3 className={s.cardTitle}>Verify</h3>
                <p className={s.cardBody}>Policy checks, jurisdiction resolution, and the exact regulation cited — before anything moves.</p>
              </div>
              <div className={s.card}>
                <span className={s.chip}>3</span>
                <h3 className={s.cardTitle}>Execute</h3>
                <p className={s.cardBody}>Records update, systems provision, stakeholders are notified, every step is audit-logged.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 07 · Moat */}
        <section ref={setRef(6)} className={`${s.slide} ${s.cream}`} aria-label="The moat">
          <div className={s.inner}>
            <p className={s.eyebrow}>The moat · why incumbents can&rsquo;t follow</p>
            <div className={s.compare}>
              <div className={`${s.panel} ${s.panelOld}`}>
                <p className={`${s.colHead} ${s.colOld}`}>Rippling · Gusto · BambooHR · Workday</p>
                <ul className={s.rowList}>
                  <li><span className={s.cross}>—</span> SaaS DNA: a database with a dashboard</li>
                  <li><span className={s.cross}>—</span> Revenue tied to seats, not work done</li>
                  <li><span className={s.cross}>—</span> Compliance bolted on as an afterthought</li>
                  <li><span className={s.cross}>—</span> Can&rsquo;t cannibalize the seat model to become agents</li>
                </ul>
              </div>
              <div className={`${s.panel} ${s.panelNew}`}>
                <p className={`${s.colHead} ${s.colNew}`}>MambaHR</p>
                <ul className={s.rowList}>
                  <li><span className={s.tick}>→</span> System of record and the agents in one platform</li>
                  <li><span className={s.tick}>→</span> Revenue from outcomes, priced as headcount</li>
                  <li><span className={s.tick}>→</span> Compliance-first architecture from day one</li>
                  <li><span className={s.tick}>→</span> The services TAM, captured at software margins</li>
                </ul>
              </div>
            </div>
            <div className={s.strip}>
              <div className={s.statBlock}><span className={s.statNum}>7</span><span className={s.statLabel}>Patents pending</span></div>
              <div className={s.statBlock}><span className={s.statNum}>50+</span><span className={s.statLabel}>State jurisdictions</span></div>
              <div className={s.statBlock}><span className={s.statNum}>200+</span><span className={s.statLabel}>HR workflows</span></div>
            </div>
          </div>
        </section>

        {/* 08 · Traction */}
        <section ref={setRef(7)} className={`${s.slide} ${s.warm}`} aria-label="Traction">
          <div className={s.inner}>
            <p className={s.eyebrow}>Traction</p>
            <h2 className={s.h2}>Live in private beta.</h2>
            <div className={s.strip} style={{ borderTop: 'none', paddingTop: 0, marginTop: 0 }}>
              <div className={s.statBlock}><span className={s.statNum}>10</span><span className={s.statLabel}>Design partners</span></div>
              <div className={s.statBlock}><span className={s.statNum}>3,200+</span><span className={s.statLabel}>Employees covered</span></div>
              <div className={s.statBlock}><span className={s.statNum}>5</span><span className={s.statLabel}>Industries · regulated to tech</span></div>
              <div className={s.statBlock}><span className={s.statNum}>50&ndash;500</span><span className={s.statLabel}>Headcount per customer</span></div>
            </div>
            <figure className={s.quote}>
              <p className={s.quoteText}>&ldquo;We were about to hire our second HR admin. MambaHR killed that req.&rdquo;</p>
              <cite className={s.quoteCite}>Head of People · design partner</cite>
            </figure>
          </div>
        </section>

        {/* 09 · Business model */}
        <section ref={setRef(8)} className={`${s.slide} ${s.surface}`} aria-label="Business model">
          <div className={s.inner}>
            <p className={s.eyebrow}>Business model · digital headcount</p>
            <h2 className={s.h2}>Priced like a hire. Delivered like software.</h2>
            <div className={s.priceRow}>
              <div className={`${s.priceCard} ${s.priceMuted}`}>
                <span className={s.priceLabel}>Human HR generalist</span>
                <span className={s.priceFig}>$75&ndash;95K</span>
                <p className={s.priceNote}>Per year · one person · business hours only.</p>
              </div>
              <div className={`${s.priceCard} ${s.priceHero}`}>
                <span className={s.priceLabel}>MambaHR · Growth</span>
                <span className={s.priceFig}>$18K</span>
                <p className={s.priceNote}>Per year · the workload of 1&ndash;2 admins · 24/7.</p>
              </div>
            </div>
            <div className={s.strip} style={{ marginTop: 0 }}>
              <div className={s.statBlock}><span className={s.statNum}>4&ndash;6&times;</span><span className={s.statLabel}>Year-one payback</span></div>
              <div className={s.statBlock}><span className={s.statNum}>90%+</span><span className={s.statLabel}>Gross margin</span></div>
              <div className={s.statBlock}><span className={s.statNum}>NRR</span><span className={s.statLabel}>Expands with every new outcome</span></div>
            </div>
          </div>
        </section>

        {/* 10 · Market */}
        <section ref={setRef(9)} className={`${s.slide} ${s.cream}`} aria-label="Market">
          <div className={s.inner}>
            <p className={s.eyebrow}>Market · the real TAM</p>
            <h2 className={s.h2}>The incumbents fight over the wrong number.</h2>
            <div className={s.layers}>
              <div className={`${s.layer} ${s.layer1}`}>
                <span className={s.layerFig}>$18B</span>
                <span className={s.layerName}>HR software TAM — the old game the incumbents compete in.</span>
              </div>
              <div className={`${s.layer} ${s.layer2}`}>
                <span className={s.layerFig}>$42B</span>
                <span className={s.layerName}>HR services &amp; outsourcing SAM — growing to $73B by 2032.</span>
              </div>
              <div className={`${s.layer} ${s.layer3}`}>
                <span className={s.layerFig}>$315B+</span>
                <span className={s.layerName}>Total US HR labor spend — the dollar we&rsquo;re actually re-pricing.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 11 · Team */}
        <section ref={setRef(10)} className={`${s.slide} ${s.warm}`} aria-label="Team">
          <div className={s.inner}>
            <p className={s.eyebrow}>Team</p>
            <h2 className={s.h2}>Operator who built the function. Engineer who builds in the hardest rooms.</h2>
            <div className={s.team}>
              <div className={s.person}>
                <Image className={s.avatar} src="/brian_bell.jpeg" alt="Brian Bell" width={104} height={104} />
                <div>
                  <h3 className={s.personName}>Brian Bell</h3>
                  <p className={s.personRole}>CEO &amp; Co-founder</p>
                  <p className={s.personBio}>Scaled People Ops through Snowflake&rsquo;s $3.4B IPO. 15+ years of HR leadership across DocuSign, Asana, and Snowflake.</p>
                </div>
              </div>
              <div className={s.person}>
                <Image className={s.avatar} src="/sebastian_kirsch.jpg" alt="Sebastian Kirsch" width={104} height={104} />
                <div>
                  <h3 className={s.personName}>Sebastian Kirsch</h3>
                  <p className={s.personRole}>CTO &amp; Co-founder</p>
                  <p className={s.personBio}>AI founding engineer and Antler NYC EIR. Built security-critical systems for a Swiss banking institution running $600B.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 12 · The ask */}
        <section ref={setRef(11)} className={`${s.slide} ${s.dark}`} aria-label="The ask">
          <div className={s.inner}>
            <p className={s.eyebrow}>The ask</p>
            <h2 className={s.h2}>Raising <span className={s.grad}>$3M</span> to reach Series A.</h2>
            <div className={s.roadmap}>
              <div className={s.milestone}>
                <span className={s.msWhen}>Month 6</span>
                <p className={s.msWhat}>10 paying customers · $200K ARR · SOC 2 Type I underway.</p>
              </div>
              <div className={s.milestone}>
                <span className={s.msWhen}>Month 12</span>
                <p className={s.msWhat}>$1M ARR · 50 customers · 120%+ net revenue retention.</p>
              </div>
              <div className={s.milestone}>
                <span className={s.msWhen}>Month 18</span>
                <p className={s.msWhat}>Series A ready · $3M+ ARR.</p>
              </div>
            </div>
            <div className={s.strip}>
              <div className={s.statBlock}><span className={s.statNum}>Harvey</span><span className={s.statLabel}>$11B · 58&times; ARR · $190M ARR</span></div>
              <div className={s.statBlock}><span className={s.statNum}>Sierra</span><span className={s.statLabel}>$10B · 67&times; ARR · $150M ARR</span></div>
            </div>
          </div>
        </section>

        {/* 13 · Close */}
        <section ref={setRef(12)} className={`${s.slide} ${s.dark}`} aria-label="Close">
          <div className={s.inner}>
            <div className={s.titleMark}>
              <span className={s.markDot}>M</span>
              <span className={s.markWord}>MambaHR</span>
            </div>
            <p className={s.closeLine}>The <span className={s.grad}>$6 services dollar</span>, re-priced at software margins.</p>
            <div className={s.ctaRow}>
              <a className={s.btnPrimary} href="mailto:hello@mambahr.com">hello@mambahr.com</a>
              <a className={s.btnGhost} href="https://mambahr.com">mambahr.com</a>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
