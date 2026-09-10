// ── Category / intent landing pages ────────────────────────────────────────
// Dedicated SEO+AEO pages for the high-intent queries buyers actually type into
// Google and ask answer engines ("AI HR software", "best HRIS for
// startups", "HR software for small business"). Each record drives a full page
// (CategoryView) plus FAQPage + WebPage + Breadcrumb JSON-LD, so answer engines
// can lift the direct answer and Q&A verbatim. Content is hardcoded, on-brand,
// and never describes MambaHR as a "copilot" or "assistant".

export type CategoryData = {
  slug: string
  metaTitle: string
  metaDescription: string
  h1: string
  eyebrow: string
  hero: { lead: string; em: string; tail?: string }
  heroSub: string
  answer: { question: string; answer: string }
  reasons: { title: string; desc: string }[]
  checklist: { eyebrow: string; title: string; lead: string; items: { t: string; d: string }[] }
  stats: { n: number; prefix?: string; suffix?: string; label: string }[]
  faq: { q: string; a: string }[]
  cta: { title: string; em: string; sub: string }
  related?: { label: string; href: string }[]
}

const COMPARE_RELATED = [
  { label: 'MambaHR vs Rippling', href: '/compare/rippling' },
  { label: 'MambaHR vs Gusto', href: '/compare/gusto' },
  { label: 'MambaHR vs BambooHR', href: '/compare/bamboohr' },
  { label: 'MambaHR vs Workday', href: '/compare/workday' },
]

export function categoryJsonLd(data: CategoryData) {
  const url = `https://mambahr.com/${data.slug}`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: data.metaTitle,
      description: data.metaDescription,
      url,
      isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://mambahr.com' },
      about: { '@type': 'SoftwareApplication', name: 'MambaHR', applicationCategory: 'BusinessApplication', url: 'https://mambahr.com' },
      publisher: {
        '@type': 'Organization',
        name: 'MambaHR',
        url: 'https://mambahr.com',
        logo: { '@type': 'ImageObject', url: 'https://mambahr.com/MambaHR_logo.png' },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mambahr.com' },
        { '@type': 'ListItem', position: 2, name: data.h1, item: url },
      ],
    },
  ]
}

// The "best HRIS" title carries the year. It is derived at build time (the page
// is statically prerendered), so a deploy never ships a stale year.
const CURRENT_YEAR = new Date().getFullYear()

export const categories: Record<string, CategoryData> = {
  'ai-hr-software': {
    slug: 'ai-hr-software',
    metaTitle: 'AI HR Software That Does the Work | MambaHR',
    metaDescription:
      'AI HR software that does the work, not just dashboards it. MambaHR resolves leave, hiring, onboarding and compliance requests asked in Slack, from $14 per employee.',
    h1: 'AI HR software that does the work, not just tracks it',
    eyebrow: 'AI HR software',
    hero: { lead: 'AI HR software that', em: 'does the work.', tail: '' },
    heroSub:
      "Most 'AI HR' is a chatbot bolted onto a dashboard. MambaHR is the AI HR department. It takes the request in Slack, checks the law, drafts the document, and does the work. Only the judgment calls come to you.",
    answer: {
      question: 'What is AI HR software?',
      answer:
        'AI HR software uses artificial intelligence to handle human-resources work, including answering employee questions, processing leave, screening candidates, and checking compliance. MambaHR goes further than a chatbot: it is an AI HR department that completes the administrative work itself, with one person approving high-risk decisions.',
    },
    reasons: [
      {
        title: "It does the request, it doesn’t just show it to you.",
        desc: "Legacy HR software gives a person a queue to work through. MambaHR reads the request in Slack, pulls the context, applies the policy, drafts the document, and closes it, in seconds.",
      },
      {
        title: 'Compliance that reasons, with a citation.',
        desc: 'It checks federal family leave (FMLA) eligibility, cites the pay-transparency rule for each state you employ in, and checks the overtime-exemption test for a role. The ambiguous calls go to a person.',
      },
      {
        title: 'You approve the big calls. It does the rest.',
        desc: 'Routine work gets done and logged. A termination, a comp call, or a raise above your range waits for your sign-off. You set the policy; MambaHR does the work.',
      },
    ],
    checklist: {
      eyebrow: 'How to evaluate it',
      title: 'What real AI HR software should do',
      lead: 'Most tools claim “AI.” Hold them to the list that shrinks the work.',
      items: [
        { t: 'Do the whole job', d: 'Not “suggest a draft” but file the leave, send the offer, update the record.' },
        { t: 'Reason about employment law', d: 'Federal law plus the rules for your states, applied with a citation, not a static policy library.' },
        { t: 'Keep a person on the risky calls', d: 'Do the safe work; send terminations and pay decisions to a person.' },
        { t: 'Audit every action', d: 'A traceable log of what MambaHR did and why, defensible if challenged.' },
        { t: 'Be the system of record', d: 'Own the employee records, the applicant tracking system, and onboarding. Not a layer that re-keys data.' },
        { t: 'Import in a day', d: 'Import your data, connect Slack; most teams are live within a day of importing, no implementation project.' },
      ],
    },
    stats: [
      { n: 100, suffix: '%', label: 'of within-policy requests resolved without a human touching them; everything else queued for you' },
      { n: 1, suffix: ' day', label: 'to import your data' },
      { n: 100, suffix: '%', label: 'of compliance answers cite the law they relied on' },
    ],
    faq: [
      {
        q: 'Is AI HR software safe for sensitive employee data?',
        a: 'Yes. MambaHR encrypts data in transit and at rest and keeps a full audit trail of every action. Your data stays in the US, and it never trains any model. High-risk decisions always go to a person for approval.',
      },
      {
        q: 'Does AI HR software replace my HR team?',
        a: 'No. It takes over the administrative work: the leave filing, onboarding tasks, policy answers, and compliance checks. Your people stay on the delicate calls. Most teams move them off clicking buttons and onto the judgment work they were hired for.',
      },
      {
        q: 'How is MambaHR different from an HR chatbot or copilot?',
        a: "A chatbot answers questions; a copilot drafts text for a human to action. MambaHR completes the work itself: it files the leave, provisions the accounts, sends the offer, and only asks a human for the genuine judgment calls.",
      },
      {
        q: 'What does AI HR software cost?',
        a: 'MambaHR is a flat $14–$30 per employee per month with everything included: employee records, hiring, onboarding, compliance, and the work itself. No modules, no implementation fee, no per-seat HR-admin licenses.',
      },
    ],
    cta: { title: 'See AI HR software that', em: 'does the work.', sub: 'A live demo on your own scenarios in 30 minutes. Then we import your data and switch you over.' },
    related: COMPARE_RELATED,
  },

  'best-hris-for-startups': {
    slug: 'best-hris-for-startups',
    metaTitle: `Best HRIS for Startups (${CURRENT_YEAR}) | MambaHR`,
    metaDescription:
      'The best HRIS for startups does the HR work, not just stores it. MambaHR runs hiring, onboarding, leave, payroll changes and compliance for lean teams, from $14.',
    h1: 'The best HRIS for startups does the work, not just stores it',
    eyebrow: `Best HRIS for startups · ${CURRENT_YEAR}`,
    hero: { lead: 'The best HRIS for startups', em: 'before you hire HR.', tail: '' },
    heroSub:
      "Most startup HRIS (HR records system) picks are a database your founders still operate. MambaHR is the AI HR department. It runs hiring, onboarding, leave, and compliance for you, so a 50-person team gets real HR without the first HR hire.",
    answer: {
      question: 'What is the best HRIS for startups?',
      answer:
        'For startups, the best HRIS is one that does the HR work, not just stores records. MambaHR is the AI HR department built for lean teams. It handles hiring, onboarding, leave, payroll changes, and compliance, with the statute cited, from requests asked in Slack. One founder or ops lead approves the delicate calls. Your data imports in a day, from $14 per employee.',
    },
    reasons: [
      {
        title: "You don’t have an HR person, so it does the HR.",
        desc: "Startups run HR off a founder or office manager’s spare hours. MambaHR is the department itself: requests get resolved in Slack without anyone learning a new admin tool.",
      },
      {
        title: "Compliance you can’t afford to get wrong.",
        desc: 'One bad classification or missed state leave rule is real money for a small team. MambaHR applies federal law plus the rules for your states, with a citation, before it becomes a problem.',
      },
      {
        title: 'Priced and deployed for a startup.',
        desc: "No implementation project, no module tree, no setup fee. Import your data and connect Slack; most teams are live within a day of importing, from $14 per employee with a $9k annual minimum.",
      },
    ],
    checklist: {
      eyebrow: 'How to choose',
      title: 'What a startup HRIS needs',
      lead: "Skip the enterprise checklist. These are the things that matter when you’re 50–200 people.",
      items: [
        { t: 'Runs before you have HR', d: "The system does the admin work, so HR isn’t a role you have to staff before you’re ready." },
        { t: 'State compliance built in', d: 'Remote team across state lines? Pay transparency and final-pay rules cited for each state; federal family leave (FMLA) today, state leave combining coming.' },
        { t: 'Hiring + onboarding included', d: 'Applicant tracking, offers, and onboarding in the same product, no second tool, no handoff.' },
        { t: 'Payroll changes', d: "Generates the change file in your provider’s format, or runs managed payroll on Deel. A person approves every run." },
        { t: 'Imports in a day', d: 'No implementation consultant. Import your data, connect Slack, go.' },
        { t: 'Scales past Series A', d: 'The same system carries you from 50 to 2,000, no painful re-platform later.' },
      ],
    },
    stats: [
      { n: 14, prefix: '$', label: 'per employee to start, no implementation fee, $9k annual minimum' },
      { n: 1, suffix: ' day', label: 'to import your data into a working HR department' },
      { n: 0, label: 'admin backlog waiting for someone to get to it' },
    ],
    faq: [
      {
        q: 'Do startups even need an HRIS?',
        a: "Once you’re past about 50 employees, especially across state lines, yes. You need a system of record, compliant onboarding, leave tracking, and payroll data. MambaHR gives a startup all of that plus the HR work done, without hiring an HR person to run it.",
      },
      {
        q: "What’s the difference between an HRIS and MambaHR?",
        a: 'A traditional HRIS (BambooHR, Gusto, Rippling) stores your data and gives your team tools to operate. MambaHR is the system of record and the department that operates it: it resolves requests, runs compliance, and prepares every payroll change.',
      },
      {
        q: 'Is it affordable for an early-stage startup?',
        a: "Yes, it’s a flat $14–$30 per employee per month, everything included, with no implementation fee. Plans carry an annual minimum starting at $9k. For most startups that’s less than the fully-loaded cost of the part-time admin work it takes over.",
      },
      {
        q: 'Can it grow with us?',
        a: "It’s built for the full company lifecycle. The same product runs HR from about 50 people through enterprise scale, with the compliance and audit depth larger teams require. No re-platforming as you grow.",
      },
    ],
    cta: { title: 'HR that', em: 'runs itself.', sub: "A live demo on your team’s scenarios in 30 minutes. Then we import your data and switch you over." },
    related: [
      { label: 'MambaHR vs Gusto', href: '/compare/gusto' },
      { label: 'MambaHR vs Rippling', href: '/compare/rippling' },
      { label: 'MambaHR vs BambooHR', href: '/compare/bamboohr' },
      { label: 'MambaHR vs Justworks', href: '/compare/justworks' },
    ],
  },

  'hr-software-small-business': {
    slug: 'hr-software-small-business',
    metaTitle: 'HR Software for Small Business | MambaHR',
    metaDescription:
      'HR software for small business that does the work, not another dashboard. MambaHR runs hiring, onboarding, leave and compliance from requests in Slack, from $14.',
    h1: 'HR software for small business that does the work for you',
    eyebrow: 'HR software for small business',
    hero: { lead: 'HR software that runs', em: 'the HR for you.', tail: '' },
    heroSub:
      "Small businesses don’t have an HR department, they have someone doing HR on the side. MambaHR is that department: it handles hiring, onboarding, leave, and compliance from requests asked in Slack, so your team gets the time back.",
    answer: {
      question: 'What is the best HR software for a small business?',
      answer:
        'The best HR software for a small business does the HR work rather than adding another system to manage. MambaHR is an AI HR department. It handles hiring, onboarding, leave, payroll changes, and compliance, with the statute cited, from requests asked in Slack. One owner or office manager approves the sensitive decisions. Your data imports in a day, from $14 per employee.',
    },
    reasons: [
      {
        title: 'Takes the HR work off your desk.',
        desc: 'In a small business, HR lands on whoever has time, usually the owner or office manager. MambaHR takes the leave requests, onboarding, and policy questions off their plate entirely.',
      },
      {
        title: 'Compliance without a consultant.',
        desc: 'Small teams get tripped up by overtime rules, state leave, and classification. MambaHR applies federal law plus the rules for your states, with a citation, so you know the rule without paying for outside help.',
      },
      {
        title: 'No IT project, no big bill.',
        desc: "Import your data and connect Slack. Most teams are live within a day of importing. Flat per-employee pricing, everything included, no implementation fee.",
      },
    ],
    checklist: {
      eyebrow: 'How to evaluate it',
      title: 'What small-business HR software should cover',
      lead: 'You wear a lot of hats. The right tool takes the HR hat off entirely.',
      items: [
        { t: 'Does the work, not the dashboard', d: "Resolves requests for you. You’re not learning a new admin system to click through." },
        { t: 'Hiring to onboarding in one place', d: 'Post the role, send the offer, run onboarding, without stitching tools together.' },
        { t: 'Compliance with a citation', d: 'Overtime, family leave (FMLA), pay transparency, and final-pay rules cited for your states.' },
        { t: 'Payroll change files', d: "Generates the change file for your payroll provider, or runs managed payroll on Deel. A person approves every run." },
        { t: 'A human on the sensitive calls', d: 'Terminations and pay decisions still come to you to approve.' },
        { t: 'Affordable and fast to start', d: 'Flat per-employee pricing, your data imported in a day, no implementation consultant.' },
      ],
    },
    stats: [
      { n: 6, prefix: '$', suffix: ':1', label: 'spent on HR admin for every $1 of HR software. MambaHR captures it' },
      { n: 1, suffix: ' day', label: 'to import your data, no IT project required' },
      { n: 100, suffix: '%', label: 'of compliance answers cite the law they relied on' },
    ],
    faq: [
      {
        q: 'What HR software is best for a small business?',
        a: 'The best fit is software that removes the HR work rather than adding admin. MambaHR is an AI HR department that runs hiring, onboarding, leave, and compliance for you from requests asked in Slack. It fits small businesses without a dedicated HR person.',
      },
      {
        q: 'How much does small-business HR software cost?',
        a: "MambaHR is a flat $14–$30 per employee per month with everything included: employee records, hiring, onboarding, compliance, and the work itself. There’s no implementation fee, and plans carry an annual minimum starting at $9k.",
      },
      {
        q: 'Do I still need a payroll provider?',
        a: "You can. MambaHR prepares every payroll change. You choose between a change file for the provider you already use and Deel-managed payroll. On Deel, MambaHR sends the changes and a person approves every run.",
      },
      {
        q: 'Is it hard to set up for a small team?',
        a: "No. There’s no implementation project. You import your existing data, connect Slack, and most teams are live within a day of importing.",
      },
    ],
    cta: { title: 'Give your team', em: 'the HR hours back.', sub: 'A live demo on your own scenarios in 30 minutes. Then we import your data and switch you over.' },
    related: [
      { label: 'MambaHR vs Gusto', href: '/compare/gusto' },
      { label: 'MambaHR vs BambooHR', href: '/compare/bamboohr' },
      { label: 'MambaHR vs Paychex', href: '/compare/paychex' },
      { label: 'MambaHR vs Justworks', href: '/compare/justworks' },
    ],
  },
}
