// Pricing FAQs, shared between the visible FAQ section (page.tsx) and the
// FAQPage structured data (layout.tsx). Keeping one source means the schema
// always mirrors what's on the page (Google's requirement for FAQ rich results).
export const FAQS = [
  {
    q: 'Does MambaHR replace our HR team?',
    a: 'No. MambaHR does the repeatable admin: records, documents, compliance checks, approvals and the questions managers and employees ask. Your HR team keeps the decisions, the conversations and anything sensitive, like investigations or legal questions.',
  },
  {
    q: 'We don’t have an HR person yet. Is MambaHR enough?',
    a: 'For the admin, yes, up to about 250 employees: records, onboarding, offboarding, changes, documents and manager questions. When you do hire an HR person, they start with everything organized instead of a backlog.',
  },
  {
    q: 'Does it run our payroll?',
    a: 'MambaHR prepares every payroll change. You choose per company: a change file for your current payroll provider, or Deel-managed payroll. On Deel, MambaHR sends the changes and a person approves every run. Benefits administration is not part of MambaHR today; MambaHR does track the COBRA deadlines when someone leaves.',
  },
  {
    q: 'Why a per-employee price?',
    a: 'Because the work grows with your team. Every employee brings questions, time off and paperwork. You pay one price per employee, per month, and it rises only when your team grows. The one add-on is US payroll run through Deel: $10 per employee paid per month, on any plan, with no minimum.',
  },
  {
    q: 'Is there a minimum?',
    a: 'No. You pay for the people you have: your number of employees times your plan\'s price per employee, billed annually. Every quarter we check your average number of employees. If you grew, we bill the difference for the rest of the year.',
  },
  {
    q: 'Which plan should we choose?',
    a: 'Start with HR Starter if you mainly need records, time off, documents and answers. Choose HR Ops Manager if you hire and onboard people every month. Choose Whole department if you also run pay reviews and need compliance research. Payroll through Deel is an add-on on any plan.',
  },
  {
    q: 'What is founding customer pricing?',
    a: 'Discounted annual pricing for our first group of customers, billed annually.',
  },
]
