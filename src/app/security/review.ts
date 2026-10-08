// Security review Q&A, shared between the visible list (page.tsx) and the
// FAQPage structured data (layout.tsx) so the schema always mirrors the page.
// Contract references point at the Data Processing Addendum, which is provided
// with the order form (no public page); do not describe it as in force.
export const REVIEW = [
  {
    q: 'Who hosts our data?',
    a: 'Your records are hosted on AWS. The AI models that do the work run with data retention and training switched off. Every company that processes your data is listed in our Data Processing Addendum, provided with the order form.',
  },
  {
    q: 'How is it encrypted?',
    a: 'AES-256 when stored and TLS 1.2 or higher in transit, for the database, documents, and every backup.',
  },
  {
    q: 'Who at MambaHR can see it?',
    a: 'Only people whose job requires it, with the least access they need. Production access is restricted, logged, and reviewed.',
  },
  {
    q: 'What about backups and recovery?',
    a: 'Encrypted automatic backups on AWS, and the database can be restored to an earlier point in time.',
  },
  {
    q: 'What if we leave?',
    a: 'Your data is yours. Export all of it in standard formats whenever you ask. After you cancel, you have 30 days to export, and then it is deleted within 60 days.',
  },
  {
    q: 'Who are your subprocessors?',
    a: 'AWS for hosting, OpenRouter for AI with zero data retention (OpenRouter sends each request to a model host under its own account: Amazon Bedrock or Google Vertex AI for Anthropic models, Microsoft Azure for OpenAI models), Temporal Cloud to keep multi-step tasks running, WorkOS for sign-in, Cloudflare for DNS and bot protection on public forms, Stripe for billing, and Deel only if you choose Deel-managed payroll. Background checks run on your own Checkr account, and signing is built into MambaHR. The full list is in our Data Processing Addendum, provided with the order form, and we tell you before it changes.',
  },
  {
    q: 'What happens if there is an incident?',
    a: 'We tell you without undue delay, explain exactly what was affected, and give you what you need for your own notices. That commitment is in our Data Processing Addendum, provided with the order form.',
  },
  {
    q: 'Does any of it train AI?',
    a: 'No. Names, salaries, leave, and health information never train any model, ours or anyone else’s. That is written into our Data Processing Addendum, provided with the order form.',
  },
]
