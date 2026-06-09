'use client'

import ScenarioPlayer from './scenario-player'
import type { Scenario } from './types'
import { leaveScenario } from './leave'
import { onboardingScenario } from './onboarding'
import { terminationScenario } from './termination'
import { payrollScenario } from './payroll'
import { compScenario } from './comp'
import { reviewsScenario } from './reviews'

// Plain, outcome-led copy shown above each mockup — the shapes.co move:
// name the result a human feels, not the mechanism.
const COPY: Record<string, { headline: string; blurb: string }> = {
  onboarding: {
    headline: 'Day one, ready before they arrive',
    blurb: 'Offer signed, I-9 filed, laptop ordered, accounts created, buddy assigned — before the new hire logs on.',
  },
  leave: {
    headline: 'Time off that approves itself',
    blurb: 'Requests come in plain language, get checked against the law, and land approved — balance updated, calendar blocked.',
  },
  termination: {
    headline: 'Exits done right, every time',
    blurb: 'Final pay calculated, separation notice drafted to state law, access revoked — nothing missed, everything logged.',
  },
  payroll: {
    headline: 'Clean numbers, ready for payday',
    blurb: 'Every change since the last run, gathered and checked, ready to hand to your payroll provider.',
  },
  comp: {
    headline: 'Raises that stay fair',
    blurb: 'Market data pulled, salary band checked, recent raises flagged — so every pay decision is fair and defensible.',
  },
  reviews: {
    headline: 'Performance reviews that actually get done',
    blurb: 'Cycles launched, drafts written from real evidence, calibration ready — managers just review and sign.',
  },
}

const withCopy = (s: Scenario): Scenario => ({ ...s, ...COPY[s.id] })

export default function ScenariosSection() {
  return (
    <ScenarioPlayer
      scenarios={[
        onboardingScenario,
        reviewsScenario,
        leaveScenario,
        payrollScenario,
        terminationScenario,
        compScenario,
      ].map(withCopy)}
    />
  )
}
