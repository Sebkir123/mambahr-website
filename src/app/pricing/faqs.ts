// Pricing FAQs, shared between the visible FAQ section (page.tsx) and the
// FAQPage structured data (layout.tsx). Keeping one source means the schema
// always mirrors what's on the page (Google's requirement for FAQ rich results).
export const FAQS = [
  {
    q: 'Is MambaHR software or an HR department?',
    a: 'It’s your HR department. There’s a system underneath, records, documents, audit trails, but you’re not buying screens to click. You’re buying the work: onboarding done, changes processed, questions answered, exports ready. You approve the big calls.',
  },
  {
    q: 'Can it do the work of our first HR hire?',
    a: 'For most teams under 250 people, yes, that’s the job it was built for. It does the repeatable work that forces an early HR hire: records, onboarding, offboarding, changes, documents, manager questions. When you do hire HR, they start with a running department instead of a backlog, and they spend their first month on people rather than cleanup.',
  },
  {
    q: 'Does it replace a human HRBP?',
    a: 'No, and we won’t pretend otherwise. MambaHR runs the repeatable HRBP-level work: compliance checks, documentation, records, manager support. Investigations, sensitive employee relations, and legal judgment stay with qualified humans. The big calls are always yours.',
  },
  {
    q: 'Does it run our payroll?',
    a: 'MambaHR prepares every payroll change. You choose per company: a change file for your current payroll provider, or Deel-managed payroll where MambaHR sends the changes to Deel and a person approves every run. Benefits administration is not part of MambaHR today; COBRA notices at offboarding are.',
  },
  {
    q: 'Why a per-employee price?',
    a: 'Because that’s how the work scales. Every employee brings questions, time off, and paperwork. Every plan is one simple per-employee price, and your price grows only as your team grows. Deel-managed payroll is optional; there are no other modules or add-ons.',
  },
  {
    q: 'What does the minimum mean?',
    a: 'Each plan has an annual minimum so we can put real depth behind every account. If the per-employee math comes in under it, the minimum applies. Most teams clear it quickly as they grow. Headcount is reviewed quarterly against your average, so if your team grows mid-year, the difference is billed for the remaining months.',
  },
  {
    q: 'Which plan should we choose?',
    a: 'Most growing companies start with HR Ops Manager, it covers the workload they were about to staff. Choose Starter if you mainly need records, answers, and clean exports. Choose AI HR Department when compliance, compensation, and workforce changes need to run themselves too.',
  },
  {
    q: 'Is founding customer pricing real?',
    a: 'Yes, for our first cohort. Founding customers get discounted annual pricing, onboarding directly with the founders, and priority input into the roadmap.',
  },
]
