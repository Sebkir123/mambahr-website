// FAQ question/answer pairs, kept in a plain (non-'use client') module so both
// the client <Faq> section and the server home page (FAQPage JSON-LD) can import
// the same source of truth. Importing a named export from a 'use client' module
// into a server component turns it into a client reference, not the array.

export const QA = [
  {
    q: 'Do we replace our current HR system, or run alongside it?',
    a: 'We replace it. MambaHR becomes your system of record for people, time off, and compliance, and prepares every payroll change. We import from Gusto, Workday, Rippling, BambooHR, Namely, or ADP, or by CSV, and your data imports in a day.',
  },
  {
    q: 'How fast can we be up and running?',
    a: 'Most teams are live within a day of importing. Day one we import your people data and you set your approval rules in Settings. Your team keeps working in Slack the whole time, and most employees never notice the switch, except that HR got faster.',
  },
  {
    q: 'Is our people data safe?',
    a: 'Yes. Encrypted in transit and at rest, role-based access, and a full audit trail on every change. Your data stays in the US, and we never train AI on it; both are written into our Data Processing Addendum, available on request.',
  },
  {
    q: 'What happens if it gets something wrong?',
    a: 'Sensitive calls (offers above your pay range, terminations, anything high-stakes) always come to you first. Everything else is logged, reversible, and shows the rule it followed. You can override anything, and nothing happens without a trail.',
  },
  {
    q: 'Are we still compliant, and who is liable?',
    a: 'You are always the employer. MambaHR makes that easier, not riskier. Every answer cites the law behind it, federal plus the rules for the states where you employ people. Anything ambiguous routes to a human before it happens.',
  },
  {
    q: 'Who is MambaHR built for?',
    a: 'Lean HR teams at growing companies: two or three humans supporting hundreds of employees, buried in admin. If your HR team spends more time filing than talking to people, this was built for you.',
  },
]
