'use client'

import ScenarioPlayer from './scenario-player'
import { leaveScenario } from './leave'
import { onboardingScenario } from './onboarding'
import { terminationScenario } from './termination'
import { complianceQaScenario } from './compliance-qa'
import { payrollScenario } from './payroll'
import { compScenario } from './comp'
import { reviewsScenario } from './reviews'
import { stateCoverageScenario } from './state-coverage'

export default function ScenariosSection() {
  return (
    <ScenarioPlayer
      scenarios={[
        leaveScenario,
        onboardingScenario,
        terminationScenario,
        complianceQaScenario,
        payrollScenario,
        compScenario,
        reviewsScenario,
        stateCoverageScenario,
      ]}
    />
  )
}
