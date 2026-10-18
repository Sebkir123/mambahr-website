'use client'

import type { ReactNode } from 'react'
import { JoinForm, useJoinForm } from '@/app/early-access/_parts/join-form'
import s from './join-section.module.css'

// The early access form on an ad landing page, so a visitor from an ad joins
// without leaving the page: the Dusk stage, the founding price, three short
// answers, and the same form as /early-access. The hero's button links to #join.
export function JoinSection({ form, title, answers }: {
  /** The page in Google Analytics' generate_lead event, e.g. "ad_hourly". */
  form: string
  title: ReactNode
  answers: { q: string; a: string }[]
}) {
  const f = useJoinForm({ refCode: null, form })
  return (
    <section className={s.wrap} id="join">
      <div className={s.panel}>
        <span className={s.field} aria-hidden="true"><i className={s.f1} /><i className={s.f2} /><i className={s.f3} /></span>
        <div className={s.copy}>
          <p className={s.eyebrow}>Early access</p>
          <h2 className={s.title}>{title}</h2>
          <p className={s.price}>Founding pricing is held for your company: from $14 per employee a month.</p>
          <dl className={s.answers}>
            {answers.map((x) => (
              <div key={x.q} className={s.answer}>
                <dt className={s.q}>{x.q}</dt>
                <dd className={s.a}>{x.a}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={s.card}>
          <p className={s.cardT}>Get early access</p>
          <JoinForm f={f} />
        </div>
      </div>
    </section>
  )
}
