'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { MambaMark, MambaLockup } from '@/components/mamba-mark'
import { DECK_SLIDE_TITLES, DECK_SLIDE_COUNT } from '@/lib/deck-slides'
import s from './deck.module.css'

const SLIDE_TITLES = DECK_SLIDE_TITLES
const COUNT = DECK_SLIDE_COUNT

export default function Deck({
  token = null,
  slug = '',
  preview = false,
}: {
  token?: string | null
  slug?: string
  // Admin preview, render the deck but record no analytics (no session, no
  // dwell, no heartbeat). Keeps the dashboard clean of internal opens.
  preview?: boolean
}) {
  const scroller = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLElement | null)[]>([])
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showHint, setShowHint] = useState(true)

  // ── analytics ──────────────────────────────────────────────────────────────
  // Best-effort, fire-and-forget telemetry to /api/deck/track: one session row
  // (geo/device enriched server-side), a heartbeat for total time, and a dwell
  // event per slide. Identifies the viewer when a recipient token (?k=) is set.
  const sid = useRef('')
  const startedAt = useRef(0)
  const slideAt = useRef(0)
  const prevSlide = useRef(0)
  const maxSlide = useRef(0)
  // Active (attention) time, distinct from wall-clock duration: only counts
  // while the tab is visible, focused, and not idle. activeAcc is the banked
  // total; activeSince marks the open window (null = currently paused).
  const activeAcc = useRef(0)
  const activeSince = useRef<number | null>(null)
  const activeMs = useCallback(
    () => activeAcc.current + (activeSince.current ? Date.now() - activeSince.current : 0),
    [],
  )

  const sendEvent = useCallback(
    (extra: Record<string, unknown>, beacon = false) => {
      if (preview || !sid.current) return
      const body = JSON.stringify({
        sessionId: sid.current,
        token,
        slug,
        total: COUNT,
        durationMs: Date.now() - startedAt.current,
        activeMs: activeMs(),
        maxSlide: maxSlide.current,
        lastSlide: prevSlide.current,
        referrer: typeof document !== 'undefined' ? document.referrer || null : null,
        ...extra,
      })
      try {
        if (beacon && typeof navigator !== 'undefined' && navigator.sendBeacon) {
          navigator.sendBeacon('/api/deck/track', new Blob([body], { type: 'application/json' }))
        } else {
          fetch('/api/deck/track', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body,
            keepalive: true,
          }).catch(() => {})
        }
      } catch {
        /* analytics is best-effort, never break the deck */
      }
    },
    [token, slug, activeMs, preview],
  )

  // Session lifecycle: open a session on mount, heartbeat duration, flush on leave.
  useEffect(() => {
    sid.current =
      typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now())
    startedAt.current = Date.now()
    slideAt.current = Date.now()
    activeSince.current = Date.now() // tab is visible + focused on mount
    sendEvent({})
    const hb = setInterval(() => sendEvent({}), 15000)
    const flush = () =>
      sendEvent(
        {
          slideIndex: prevSlide.current,
          slideTitle: SLIDE_TITLES[prevSlide.current],
          dwellMs: Date.now() - slideAt.current,
        },
        true,
      )
    const onVis = () => {
      if (document.visibilityState === 'hidden') flush()
    }
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('pagehide', flush)
    return () => {
      clearInterval(hb)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pagehide', flush)
      flush()
    }
  }, [sendEvent])

  // Record dwell on a slide when the viewer moves to another.
  useEffect(() => {
    if (!sid.current || active === prevSlide.current) return
    const now = Date.now()
    const leaving = prevSlide.current
    const dwell = now - slideAt.current
    slideAt.current = now
    prevSlide.current = active
    if (active > maxSlide.current) maxSlide.current = active
    sendEvent({ slideIndex: leaving, slideTitle: SLIDE_TITLES[leaving], dwellMs: dwell })
  }, [active, sendEvent])

  // Active-time accounting: only count time while the tab is visible, focused,
  // and not idle (>60s without input). This keeps "time on deck" meaning
  // attention, not a tab left open, wall-clock duration is tracked separately.
  useEffect(() => {
    const IDLE_MS = 60_000
    let idle: ReturnType<typeof setTimeout> | undefined
    let lastArm = 0
    const pause = () => {
      if (activeSince.current != null) {
        activeAcc.current += Date.now() - activeSince.current
        activeSince.current = null
      }
    }
    const resume = () => {
      if (
        activeSince.current == null &&
        document.visibilityState === 'visible' &&
        document.hasFocus()
      ) {
        activeSince.current = Date.now()
      }
    }
    const armIdle = () => {
      if (idle) clearTimeout(idle)
      idle = setTimeout(pause, IDLE_MS)
    }
    const onActivity = () => {
      resume()
      const now = Date.now()
      if (now - lastArm > 5000) { lastArm = now; armIdle() }
    }
    const onVis = () => {
      if (document.visibilityState === 'hidden') pause()
      else { resume(); armIdle() }
    }
    const onFocus = () => { resume(); armIdle() }
    const acts = ['scroll', 'keydown', 'pointerdown', 'mousemove', 'touchstart'] as const

    armIdle()
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', pause)
    for (const ev of acts) window.addEventListener(ev, onActivity, { passive: true })
    return () => {
      if (idle) clearTimeout(idle)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', pause)
      for (const ev of acts) window.removeEventListener(ev, onActivity)
      pause()
    }
  }, [])

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

  // Keyboard navigation, arrows / space / page keys / home / end.
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
      {preview && (
        <div className={s.previewBadge} aria-hidden="true">
          Admin preview · not tracked
        </div>
      )}

      <div className={s.progress} aria-hidden="true">
        <div className={s.progressFill} style={{ transform: `scaleX(${progress})` }} />
      </div>

      <div className={s.brand} aria-hidden="true">
        <MambaMark size={20} color="var(--gold)" className={s.brandMark} />
        <span className={s.brandWord}>MambaHR</span>
      </div>

      <nav className={s.dots} aria-label="Slides">
        {SLIDE_TITLES.map((title, i) => (
          <button
            key={i}
            className={`${s.dot}${i === active ? ' ' + s.dotActive : ''}`}
            aria-label={`${pad(i)}, ${title}`}
            aria-current={i === active}
            onClick={() => goto(i)}
          />
        ))}
      </nav>

      <div className={s.counter} aria-hidden="true">{pad(active)} / {pad(COUNT - 1)}</div>

      <div className={s.hint} style={{ opacity: showHint ? 1 : 0 }} aria-hidden="true">
        <span className={s.hintKey}>↓</span> to navigate
      </div>

      <main ref={scroller} className={s.deck} tabIndex={-1} aria-label="MambaHR pitch deck">

        {/* 01 · Title */}
        <section ref={setRef(0)} className={`${s.slide} ${s.center}`} aria-label="Title">
          <div className={s.inner}>
            <MambaLockup size={124} className={s.titleLogo} />
            <h1 className={s.wordmark}>Mamba<span className={s.gold}>HR</span></h1>
            <p className={s.titleLead}>The AI HR Department.</p>
            <p className={s.titleSub}>We don&rsquo;t sell software seats.<br />We sell digital headcount.</p>
            <span className={s.pill}>Seed Round, $3M</span>
            <span className={s.scrollCue} aria-hidden="true">↓</span>
          </div>
        </section>

        {/* 02 · The problem */}
        <section ref={setRef(1)} className={s.slide} aria-label="The problem">
          <div className={s.inner}>
            <p className={s.eyebrow}>The problem · the SaaS trap</p>
            <h2 className={s.display}>
              $1 on HR software.<br />
              <span className={s.gold}>$6</span> on the humans who use it.
            </h2>
            <p className={s.lead}>
              Every HRIS is a database that needs expensive humans to operate. The software was
              supposed to save time. It became a dashboard waiting for someone to click it.
            </p>
            <div className={s.ratio}>
              <div className={s.ratioCol}>
                <span className={s.ratioLabel}>SaaS dollar</span>
                <span className={s.ratioFig}>$1</span>
                <span className={s.ratioNote}>HRIS seats</span>
              </div>
              <div className={s.bars}>
                <div className={s.barTrack}><div className={s.barFillSoftware} /></div>
                <div className={s.barTrack}><div className={s.barFillServices} /></div>
              </div>
              <div className={s.ratioCol}>
                <span className={s.ratioLabel}>Services dollar</span>
                <span className={`${s.ratioFig} ${s.gold}`}>$6</span>
                <span className={s.ratioNote}>HR admins clicking the buttons</span>
              </div>
            </div>
            <figure className={s.quote}>
              <p className={s.quoteText}>&ldquo;For every dollar spent on software, six are spent on services.&rdquo;</p>
              <cite className={s.quoteCite}>Julien Bek, Sequoia Capital · March 2026</cite>
            </figure>
          </div>
        </section>

        {/* 03 · Why now */}
        <section ref={setRef(2)} className={s.slide} aria-label="Why now">
          <div className={s.inner}>
            <p className={s.eyebrow}>Why now</p>
            <h2 className={s.display}>The services dollar<br />just became <em>capturable</em>.</h2>
            <p className={s.lead}>
              Frontier models crossed the reliability line. The $6 services dollar is now capturable at software margins.
            </p>
            <div className={s.grid3}>
              <div className={s.statCard}>
                <span className={s.statFig}>2024</span>
                <span className={s.statKicker}>Inflection</span>
                <h3 className={s.cardTitle}>Models got reliable</h3>
                <p className={s.cardBody}>Tool-using frontier models crossed the threshold for production HR workflows.</p>
              </div>
              <div className={s.statCard}>
                <span className={s.statFig}>1.22</span>
                <span className={s.statKicker}>HR per 100</span>
                <h3 className={s.cardTitle}>Labor costs broke HR</h3>
                <p className={s.cardBody}>Every 100 hires forces another admin at $75K+, a tax on growth.</p>
              </div>
              <div className={s.statCard}>
                <span className={s.statFig}>$11B</span>
                <span className={s.statKicker}>Harvey AI</span>
                <h3 className={s.cardTitle}>Capital is hunting outcomes</h3>
                <p className={s.cardBody}>Services-as-software is the fastest-compounding category in venture.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 04 · The paradigm shift */}
        <section ref={setRef(3)} className={`${s.slide} ${s.center}`} aria-label="The paradigm shift">
          <div className={s.inner}>
            <p className={s.eyebrow}>The paradigm shift</p>
            <h2 className={s.display}>Sell outcomes. <em>Not seats.</em></h2>
            <div className={s.compare}>
              <div className={`${s.panel} ${s.panelOld}`}>
                <p className={`${s.colHead} ${s.colOld}`}>The old game · SaaS copilots</p>
                <ul className={s.rowList}>
                  <li><span className={s.cross}>✕</span> Sell software seats</li>
                  <li><span className={s.cross}>✕</span> Margin erodes as AI commoditizes</li>
                  <li><span className={s.cross}>✕</span> Compete with every new model release</li>
                </ul>
              </div>
              <div className={`${s.panel} ${s.panelNew}`}>
                <p className={`${s.colHead} ${s.colNew}`}>The new game · digital headcount</p>
                <ul className={s.rowList}>
                  <li><span className={s.tick}>✓</span> Sell completed work</li>
                  <li><span className={s.tick}>✓</span> 90% software margins on a services TAM</li>
                  <li><span className={s.tick}>✓</span> Every model release improves our margin</li>
                </ul>
              </div>
            </div>
            <figure className={s.quote}>
              <p className={s.quoteText}>&ldquo;If you sell the tool, you&rsquo;re in a race against the model. If you sell the work, every improvement in the model makes your service faster, cheaper, and harder to compete with.&rdquo;</p>
              <cite className={s.quoteCite}>Sequoia Capital · &ldquo;Services: The New Software&rdquo;</cite>
            </figure>
          </div>
        </section>

        {/* 05 · The product */}
        <section ref={setRef(4)} className={s.slide} aria-label="The product">
          <div className={s.inner}>
            <p className={s.eyebrow}>The product</p>
            <h2 className={s.display}>The HRIS that does<br />the <em>actual work</em>.</h2>
            <p className={s.lead}>
              Not a copilot. Not a wrapper. MambaHR is the system of record and the AI department that runs it.
            </p>
            <div className={s.grid4}>
              <div className={s.flowCard}>
                <span className={s.flowKey}>Hire</span>
                <p className={s.cardBody}>Offer letter → BGC → provisioning → record created.</p>
              </div>
              <div className={s.flowCard}>
                <span className={s.flowKey}>Onboard</span>
                <p className={s.cardBody}>Day-zero kit, policy Q&amp;A, I-9, benefits enrollment.</p>
              </div>
              <div className={s.flowCard}>
                <span className={s.flowKey}>Manage</span>
                <p className={s.cardBody}>Leave, comp, reviews, policy, all in one record.</p>
              </div>
              <div className={s.flowCard}>
                <span className={s.flowKey}>Offboard</span>
                <p className={s.cardBody}>Access revoked, COBRA, final pay, record closed.</p>
              </div>
            </div>
            <div className={s.tagRow}>
              <span className={s.tag}>HRIS</span>
              <span className={`${s.tag} ${s.tagGold}`}>Agents</span>
            </div>
          </div>
        </section>

        {/* 06 · How it works */}
        <section ref={setRef(5)} className={`${s.slide} ${s.center}`} aria-label="How it works">
          <div className={s.inner}>
            <p className={s.eyebrow}>How it works</p>
            <h2 className={s.display}>A System of <em>Action.</em></h2>
            <p className={s.lead}>The human approves. MambaHR executes.</p>
            <div className={s.grid3}>
              <div className={s.stepCard}>
                <span className={s.stepIcon} aria-hidden="true">⚡</span>
                <span className={s.cardNum}>01</span>
                <h3 className={s.cardTitle}>Trigger</h3>
                <p className={s.cardBody}>Employee asks in Slack. Manager files a request. System event fires.</p>
                <div className={s.pillRow}><span className={s.miniPill}>Slack</span><span className={s.miniPill}>Teams</span><span className={s.miniPill}>Web app</span></div>
              </div>
              <div className={s.stepCard}>
                <span className={s.stepIcon} aria-hidden="true">◎</span>
                <span className={s.cardNum}>02</span>
                <h3 className={s.cardTitle}>Verify</h3>
                <p className={s.cardBody}>Checks policy, resolves jurisdiction, cites regulation. Every decision auditable.</p>
                <div className={s.pillRow}><span className={s.miniPill}>Policy engine</span><span className={s.miniPill}>Deterministic</span><span className={s.miniPill}>Cited</span></div>
              </div>
              <div className={s.stepCard}>
                <span className={s.stepIcon} aria-hidden="true">→</span>
                <span className={s.cardNum}>03</span>
                <h3 className={s.cardTitle}>Execute</h3>
                <p className={s.cardBody}>Record updated. Access provisioned. Notifications sent. Audit trail logged.</p>
                <div className={s.pillRow}><span className={s.miniPill}>System of record</span><span className={s.miniPill}>Audit log</span><span className={s.miniPill}>Compliance</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* 07 · The moat */}
        <section ref={setRef(6)} className={s.slide} aria-label="The moat">
          <div className={s.inner}>
            <p className={s.eyebrow}>Moat · why incumbents can&rsquo;t follow</p>
            <h2 className={s.display}>Databases can&rsquo;t become<br /><em>autonomous departments.</em></h2>
            <div className={s.compare}>
              <div className={`${s.panel} ${s.panelOld}`}>
                <p className={`${s.colHead} ${s.colOld}`}>Rippling · Gusto · BambooHR · Workday</p>
                <ul className={s.rowList}>
                  <li><span className={s.cross}>✕</span> Revenue = seats. Automating work cannibalizes their own P&amp;L</li>
                  <li><span className={s.cross}>✕</span> Built as databases, can&rsquo;t become autonomous agents</li>
                  <li><span className={s.cross}>✕</span> Compliance is an afterthought, not the architecture</li>
                  <li><span className={s.cross}>✕</span> Priced as SaaS, can&rsquo;t re-price as services</li>
                </ul>
              </div>
              <div className={`${s.panel} ${s.panelNew}`}>
                <p className={`${s.colHead} ${s.colNew}`}>MambaHR · IS the HRIS. Does the work.</p>
                <ul className={s.rowList}>
                  <li><span className={s.tick}>✓</span> System of record + autonomous agents in one platform</li>
                  <li><span className={s.tick}>✓</span> Revenue = outcomes. More automation = more revenue</li>
                  <li><span className={s.tick}>✓</span> Compliance-first architecture, every action cited</li>
                  <li><span className={s.tick}>✓</span> Services TAM at software margins</li>
                </ul>
              </div>
            </div>
            <div className={s.strip}>
              <div className={s.statBlock}><span className={s.statNum}>7</span><span className={s.statLabel}>Patents pending</span></div>
              <div className={s.statBlock}><span className={s.statNum}>50+</span><span className={s.statLabel}>State jurisdictions</span></div>
              <div className={s.statBlock}><span className={s.statNum}>200+</span><span className={s.statLabel}>HR workflows</span></div>
              <div className={s.statBlock}><span className={s.statNum}>∞</span><span className={s.statLabel}>Data flywheel</span></div>
            </div>
          </div>
        </section>

        {/* 08 · Traction */}
        <section ref={setRef(7)} className={s.slide} aria-label="Traction">
          <div className={s.inner}>
            <p className={s.eyebrow}>Traction</p>
            <h2 className={s.display}>Replacing headcount plans,<br />not buying <em>software</em>.</h2>
            <p className={s.lead}>Design partners aren&rsquo;t buying a tool. They&rsquo;re replacing a headcount plan.</p>
            <div className={s.strip}>
              <div className={s.statBlock}><span className={s.statNum}>10</span><span className={s.statLabel}>Design partners · in private beta</span></div>
              <div className={s.statBlock}><span className={s.statNum}>3,200+</span><span className={s.statLabel}>Employees covered · across partners</span></div>
              <div className={s.statBlock}><span className={s.statNum}>5</span><span className={s.statLabel}>Industries · regulated → tech</span></div>
              <div className={s.statBlock}><span className={s.statNum}>50&ndash;500</span><span className={s.statLabel}>Headcount range · per customer</span></div>
            </div>
            <figure className={s.quote}>
              <p className={s.quoteText}>&ldquo;We were about to hire our second HR admin. MambaHR killed that req.&rdquo;</p>
              <cite className={s.quoteCite}>VP People, Series B fintech (220 employees)</cite>
            </figure>
          </div>
        </section>

        {/* 09 · Business model */}
        <section ref={setRef(8)} className={s.slide} aria-label="Business model">
          <div className={s.inner}>
            <p className={s.eyebrow}>Business model · digital headcount</p>
            <h2 className={s.display}>Priced as one HR admin.<br /><em>Working 24/7.</em></h2>
            <p className={s.lead}>Platform fee + per-outcome usage. &gt;90% gross margin.</p>
            <div className={s.priceRow}>
              <div className={`${s.priceCard} ${s.priceMuted}`}>
                <span className={s.priceLabel}>The human equivalent</span>
                <span className={s.priceFig}>$75K&ndash;$95K</span>
                <p className={s.priceNote}>1 HR Generalist, per year (Payscale, 2026)</p>
              </div>
              <div className={`${s.priceCard} ${s.priceHero}`}>
                <span className={s.priceLabel}>MambaHR Growth plan</span>
                <span className={s.priceFig}>$18K</span>
                <p className={s.priceNote}>Handles the workload of 1&ndash;2 admins, 24/7</p>
              </div>
              <div className={`${s.priceCard} ${s.priceMath}`}>
                <span className={s.priceLabel}>Customer math</span>
                <span className={`${s.priceFig} ${s.gold}`}>4&ndash;6×</span>
                <p className={s.priceNote}>Payback in year one. And the agent doesn&rsquo;t quit, go on leave, or need an HRIS seat to work.</p>
              </div>
            </div>
            <div className={s.strip}>
              <div className={s.statBlock}><span className={s.statNum}>4&ndash;6×</span><span className={s.statLabel}>Year-1 payback · vs. the human equivalent</span></div>
              <div className={s.statBlock}><span className={s.statNum}>90%+</span><span className={s.statLabel}>Gross margin · pure software economics</span></div>
              <div className={s.statBlock}><span className={s.statNum}>∞</span><span className={s.statLabel}>NRR upside · every new outcome = expansion</span></div>
            </div>
          </div>
        </section>

        {/* 10 · Market */}
        <section ref={setRef(9)} className={s.slide} aria-label="Market">
          <div className={s.inner}>
            <p className={s.eyebrow}>Market · the real TAM</p>
            <h2 className={s.display}>We&rsquo;re not sized to software.<br />We&rsquo;re sized to <em>labor</em>.</h2>
            <p className={s.lead}>
              Incumbents fight over the $18B software dollar. We&rsquo;re priced against the $315B+ labor bill.
            </p>
            <div className={s.layers}>
              <div className={`${s.layer} ${s.layerStruck}`}>
                <span className={s.layerTier}>Crossed out</span>
                <span className={s.layerFig}>$18B</span>
                <span className={s.layerName}>HR software TAM, the old game incumbents fight over. <em>iMARC Group, 2026</em></span>
              </div>
              <div className={`${s.layer} ${s.layer2}`}>
                <span className={s.layerTier}>SAM</span>
                <span className={s.layerFig}>$42B</span>
                <span className={s.layerName}>HR services &amp; outsourcing, growing to $73B by 2032. <em>Research &amp; Markets, 2026</em></span>
              </div>
              <div className={`${s.layer} ${s.layer3}`}>
                <span className={s.layerTier}>TAM</span>
                <span className={`${s.layerFig} ${s.gold}`}>$315B+</span>
                <span className={s.layerName}>Total US HR labor spend, the real prize when you sell outcomes. <em>BLS OOH + Payscale, 2025</em></span>
              </div>
            </div>
            <div className={s.noteRow}>
              <div className={s.note}><span className={s.noteHead}>Wedge</span> Series A–B (50–500 headcount). Replace the 2nd HR admin req at $18K/yr vs $160K/yr, then expand into onboarding, comp, and workforce intelligence.</div>
              <div className={s.note}><span className={s.noteHead}>Global upside</span> HR labor spend globally clears $1T. EU, UK, and APAC are the same trap, same capture.</div>
            </div>
          </div>
        </section>

        {/* 11 · Team */}
        <section ref={setRef(10)} className={s.slide} aria-label="Team">
          <div className={s.inner}>
            <p className={s.eyebrow}>Team · why us</p>
            <h2 className={s.display}>The rare pairing:<br />HR operator <span className={s.gold}>+</span> regulated-industry engineer.</h2>
            <p className={s.lead}>We&rsquo;ve lived the problem from both sides of the table.</p>
            <div className={s.team}>
              <div className={s.person}>
                <Image className={s.avatar} src="/brian_bell.jpeg" alt="Brian Bell" width={72} height={72} />
                <div>
                  <h3 className={s.personName}>Brian Bell</h3>
                  <p className={s.personRole}>CEO &amp; Co-Founder</p>
                  <p className={s.personBio}>Scaled People Ops through Snowflake&rsquo;s record-breaking $3.4B IPO, the largest software IPO in history. 15+ years leading HR at DocuSign, Asana, and Snowflake. Built and ran the exact function MambaHR now automates.</p>
                </div>
              </div>
              <div className={s.person}>
                <Image className={s.avatar} src="/sebastian_kirsch.jpg" alt="Sebastian Kirsch" width={72} height={72} />
                <div>
                  <h3 className={s.personName}>Sebastian Kirsch</h3>
                  <p className={s.personRole}>CTO &amp; Co-Founder</p>
                  <p className={s.personBio}>AI Founding Engineer. Entrepreneur in Residence at Antler NYC. Previously shipped security-critical systems for a $600B Swiss bank where every action was audited. Built MambaHR&rsquo;s autonomous agent stack from day zero.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 12 · The ask */}
        <section ref={setRef(11)} className={`${s.slide} ${s.center}`} aria-label="The ask">
          <div className={s.inner}>
            <p className={s.eyebrow}>The ask</p>
            <h2 className={s.askFig}>$3M<span className={s.gold}>.</span></h2>
            <p className={s.lead}>
              Seed round. Capture the mid-market before incumbents realize the game changed from SaaS to services.
            </p>
            <div className={s.roadmap}>
              <div className={s.milestone}>
                <span className={s.msWhen}>Month 6</span>
                <h3 className={s.msWhat}>10 paying customers</h3>
                <ul className={s.msList}>
                  <li>$200K ARR run-rate</li>
                  <li>Full onboard→offboard lifecycle live</li>
                  <li>SOC 2 Type I complete</li>
                </ul>
              </div>
              <div className={s.milestone}>
                <span className={s.msWhen}>Month 12</span>
                <h3 className={s.msWhat}>$1M ARR</h3>
                <ul className={s.msList}>
                  <li>50 mid-market customers</li>
                  <li>Land-and-expand proven</li>
                  <li>120%+ net revenue retention</li>
                </ul>
              </div>
              <div className={s.milestone}>
                <span className={s.msWhen}>Month 18</span>
                <h3 className={s.msWhat}>Series A ready</h3>
                <ul className={s.msList}>
                  <li>$3M+ ARR</li>
                  <li>120%+ NRR</li>
                  <li>Category-defining position</li>
                </ul>
              </div>
            </div>
            <p className={s.compEyebrow}>Services-as-software is the fastest-compounding category in venture</p>
            <div className={s.comps}>
              <div className={s.comp}><span className={s.compName}>Harvey</span><span className={s.compVal}>$11B</span><span className={s.compMult}>58× ARR</span><span className={s.compNote}>$190M ARR · Legal AI</span></div>
              <div className={s.comp}><span className={s.compName}>Sierra</span><span className={s.compVal}>$10B</span><span className={s.compMult}>67× ARR</span><span className={s.compNote}>$150M ARR · Support AI</span></div>
              <div className={`${s.comp} ${s.compUs}`}><span className={s.compName}>MambaHR</span><span className={`${s.compVal} ${s.gold}`}>?</span><span className={s.compMult}>HR AI</span><span className={s.compNote}>$315B labor TAM</span></div>
            </div>
            <p className={s.closeLine}>The <em>$6 services dollar</em>,<br />re-priced at software margins.</p>
          </div>
        </section>

      </main>
    </>
  )
}
