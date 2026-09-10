// Security review Q&A, shared between the visible list (page.tsx) and the
// FAQPage structured data (layout.tsx) so the schema always mirrors the page.
// Contract references point at the Data Processing Addendum, which is a draft
// available on request; do not describe it as in force.
export const REVIEW = [
  {
    q: 'Where does our data live?',
    a: 'On AWS infrastructure in the United States. It never leaves the country, and US residency is written into our Data Processing Addendum, available on request.',
  },
  {
    q: 'How is it encrypted?',
    a: 'AES-256 at rest, TLS 1.3 in transit, for the database, documents, and every backup.',
  },
  {
    q: 'Who at MambaHR can see it?',
    a: 'Access is role-based and least-privilege on our side too. Production access is restricted, logged, and reviewed.',
  },
  {
    q: 'What about backups and recovery?',
    a: 'Hosted on AWS in the United States with encrypted automated backups and point-in-time recovery.',
  },
  {
    q: 'What if we leave?',
    a: 'Your data is yours. Full export in standard formats whenever you ask, with a 30-day export window after termination, then deletion within 60 days.',
  },
  {
    q: 'Who are your subprocessors?',
    a: 'AWS (including Bedrock) for infrastructure and AI, Google for Gemini where enabled and for calendar access you authorize, WorkOS for sign-on, Temporal Cloud for workflow state, Qdrant for retrieval, Stripe for billing, DocuSign for e-signature, Checkr for background checks, and Tracker I-9 for work authorization. The full list is in our Data Processing Addendum, available on request, and we notify you before it changes.',
  },
  {
    q: 'What happens if there is an incident?',
    a: 'We notify you without undue delay, tell you exactly what was touched, and give you what your own notifications require. That commitment is in our Data Processing Addendum, available on request.',
  },
  {
    q: 'Does any of it train AI?',
    a: 'No. Names, salaries, leave and health information, none of it trains any model, ours or anyone else\u2019s. That is written into our Data Processing Addendum, available on request.',
  },
]
