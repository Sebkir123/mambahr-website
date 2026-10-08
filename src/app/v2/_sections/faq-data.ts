// FAQ question/answer pairs, kept in a plain (non-'use client') module so both
// the client <Faq> section and the server home page (FAQPage JSON-LD) can import
// the same source of truth. Importing a named export from a 'use client' module
// into a server component turns it into a client reference, not the array.

export const QA = [
  {
    q: 'Does MambaHR replace our HR team?',
    a: 'No. MambaHR takes on the admin: forms, approvals, reminders, records and the questions employees ask every week. Your HR team makes the decisions, has the conversations, and approves anything sensitive.',
  },
  {
    q: 'Do we keep our current HR software?',
    a: 'MambaHR becomes the place your employee records, time off and compliance live, and it prepares every payroll change. We bring your data over from Gusto, Workday, Rippling, BambooHR, Namely, ADP or a spreadsheet, in a day.',
  },
  {
    q: 'How fast can we get started?',
    a: 'The day after your import. On day one we import your people data and you set your approval rules. Your team keeps working in Slack the whole time.',
  },
  {
    q: 'Is our people data safe?',
    a: 'Yes. It is encrypted, each person sees only what their role allows, and every change is logged. Your data is never used to train AI, and that is written into our Data Processing Addendum, provided with the order form.',
  },
  {
    q: 'What if it gets something wrong?',
    a: 'Sensitive decisions, like an offer above your pay range or a termination, always come to you first. Everything else is logged, can be undone, and shows the rule it followed. You can change anything.',
  },
  {
    q: 'Who is responsible for compliance?',
    a: 'Your company is always the employer. MambaHR helps you get it right: every answer shows the federal and state rules behind it, and anything unclear goes to a person before anything happens.',
  },
]
