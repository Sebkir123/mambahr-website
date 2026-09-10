// Pricing FAQs, shared between the visible FAQ section (page.tsx) and the
// FAQPage structured data (layout.tsx). Keeping one source means the schema
// always mirrors what's on the page (Google's requirement for FAQ rich results).
export const FAQS = [
  {
    q: 'Is MambaHR software or an HR department?',
    a: 'It’s your HR department. There’s a system underneath, records, documents, audit trails, but you’re not buying screens to click. You’re buying the work: onboarding done, changes processed, questions answered, payroll changes ready. You approve the sensitive calls.',
  },
  {
    q: 'Can it do the work of our first HR hire?',
    a: 'For most teams under 250 people, yes, that’s the job it was built for. It does the repeatable work that forces an early HR hire: records, onboarding, offboarding, changes, documents, manager questions. When you do hire HR, they start with a running department instead of a backlog. Their first month goes to people rather than cleanup.',
  },
  {
    q: 'Does it replace a senior HR person?',
    a: 'No. MambaHR does the repeatable work: compliance checks, documents, records, and manager questions. Investigations, sensitive employee matters, and legal judgment stay with a qualified person. The big calls are always yours.',
  },
  {
    q: 'Does it run our payroll?',
    a: 'MambaHR prepares every payroll change. You choose per company: a change file for your current payroll provider, or Deel-managed payroll. On Deel, MambaHR sends the changes and a person approves every run. Benefits administration is not part of MambaHR today. The health-coverage continuation notices (COBRA) at offboarding are.',
  },
  {
    q: 'Why a per-employee price?',
    a: 'Because that is how the work grows. Every employee brings questions, time off, and paperwork. You pay one price per employee, per month, and it rises only when your headcount does. Deel-managed payroll is optional. There are no other modules or add-ons.',
  },
  {
    q: 'What does the minimum mean?',
    a: 'Each plan has a yearly minimum so we can staff every account properly. If your headcount times the per-employee price comes in under it, you pay the minimum. Every quarter we check your average headcount. If you grew, we bill the difference for the months left in the year.',
  },
  {
    q: 'Which plan should we choose?',
    a: 'Most growing companies start with HR Ops Manager. It covers the workload they were about to staff. Choose Starter if you mainly need records, answers, and clean payroll changes. Choose Whole department when compliance, compensation, and layoffs need to run themselves too.',
  },
  {
    q: 'Is founding customer pricing real?',
    a: 'Yes, for our first cohort. Founding customers get discounted annual pricing, onboarding directly with the founders, and priority input into the roadmap.',
  },
]
