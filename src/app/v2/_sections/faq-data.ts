// FAQ question/answer pairs — kept in a plain (non-'use client') module so both
// the client <Faq> section and the server home page (FAQPage JSON-LD) can import
// the same source of truth. Importing a named export from a 'use client' module
// into a server component turns it into a client reference, not the array.

export const QA = [
  {
    q: 'Do we replace our current HRIS, or run alongside it?',
    a: 'We replace it — MambaHR becomes your system of record for people, pay, time off, and compliance. We pull everything from Gusto, Workday, Rippling, BambooHR, Namely, or ADP, and most teams are fully moved in a single day. Nothing left behind.',
  },
  {
    q: 'How fast can we be up and running?',
    a: 'Live the next morning — a day of setup, not months of rollout. Day one we import your people data and you set your approval rules on one screen. Your team keeps working in Slack and Teams the whole time — most employees never notice the switch, except that HR got faster.',
  },
  {
    q: 'Is our people data safe?',
    a: 'Yes. Encrypted in transit and at rest, role-based access, and a full audit trail on every change. Your data stays in the US, and we never train AI on it — that one is in your contract.',
  },
  {
    q: 'What happens if it gets something wrong?',
    a: 'The sensitive calls — offers above band, terminations, anything high-stakes — always come to you first. Everything else is logged, reversible, and shows the rule it followed. You can override anything, and nothing happens without a trail.',
  },
  {
    q: 'Are we still compliant, and who is liable?',
    a: 'You are always the employer — and MambaHR makes that easier, not riskier. Every answer cites the law behind it, federal and all 50 states, kept current. Anything ambiguous routes to a human before it happens.',
  },
  {
    q: 'Who is MambaHR built for?',
    a: 'Lean people teams at growing companies — two or three humans supporting hundreds of employees, buried in admin. If your HR team spends more time filing than talking to people, this was built for you.',
  },
]
