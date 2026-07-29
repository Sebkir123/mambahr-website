// ── Category / intent landing pages ────────────────────────────────────────
// Dedicated SEO+AEO pages for the high-intent queries buyers actually type into
// Google and ask ChatGPT/Perplexity ("AI HR software", "best HRIS for
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

export const categories: Record<string, CategoryData> = {
  'ai-hr-software': {
    slug: 'ai-hr-software',
    metaTitle: 'AI HR Software: The Autonomous HR Department | MambaHR',
    metaDescription:
      'AI HR software that does the work, not just dashboards it. MambaHR is the autonomous AI HR department: it resolves leave, hiring, onboarding, and compliance requests in Slack, with one human approving the delicate calls. Live in a day, from $14/employee.',
    h1: 'AI HR software that does the work, not just tracks it',
    eyebrow: 'AI HR software',
    hero: { lead: 'AI HR software that', em: 'does the work.', tail: '' },
    heroSub:
      "Most 'AI HR' is a chatbot bolted onto a dashboard. MambaHR is the autonomous HR department: it resolves the request end to end in Slack, runs the compliance check, drafts the document, and routes only the judgment calls to your human.",
    answer: {
      question: 'What is AI HR software?',
      answer:
        'AI HR software uses artificial intelligence to handle human-resources work, including answering employee questions, processing leave, screening candidates, and checking compliance. MambaHR goes further than a chatbot: it is an autonomous AI HR department that completes the administrative work itself, with one human approving high-risk decisions.',
    },
    reasons: [
      {
        title: "It resolves requests, it doesn’t just surface them.",
        desc: "Legacy HR software gives a human a queue to work through. MambaHR’s agent reads the request in Slack, pulls the context, applies the policy, drafts the document, and closes it, end to end, in seconds.",
      },
      {
        title: 'Compliance that reasons across 50 states.',
        desc: 'It knows when FMLA stacks with state paid leave, when an exempt classification is shaky, when pay-transparency rules differ by state, and acts on the right rule automatically, with a citation.',
      },
      {
        title: 'One human in the loop, not a back office.',
        desc: 'High-certainty actions auto-complete. Borderline cases (a termination, an accommodation, a comp call) queue for your sign-off. You stay on policy; the agent handles the mechanics.',
      },
    ],
    checklist: {
      eyebrow: 'How to evaluate it',
      title: 'What real AI HR software should do',
      lead: 'Most tools claim “AI.” Hold them to the list that actually shrinks the work.',
      items: [
        { t: 'Resolve end to end', d: 'Not “suggest a draft” but actually file the leave, send the offer, update the record.' },
        { t: 'Reason about employment law', d: 'Federal + 50-state compliance applied automatically, not a static policy library.' },
        { t: 'Keep a human on the risky calls', d: 'Auto-complete the safe work; escalate terminations, accommodations, and comp.' },
        { t: 'Audit every action', d: 'A traceable log of what the agent did and why, defensible if challenged.' },
        { t: 'Be the system of record', d: 'Own the employee database, ATS, and onboarding. Not a layer that re-keys data.' },
        { t: 'Go live in a day', d: 'Connect Slack and your stack; handling requests by the next morning, no implementation project.' },
      ],
    },
    stats: [
      { n: 90, suffix: '%', label: 'of routine HR requests resolved without a human touching them' },
      { n: 1, suffix: ' day', label: 'from signing to the agent handling live requests' },
      { n: 50, label: 'states of employment-law coverage, applied automatically' },
    ],
    faq: [
      {
        q: 'Is AI HR software safe for sensitive employee data?',
        a: 'Yes. MambaHR encrypts data in transit and at rest, keeps a full audit trail of every action, stores data in the US, and never trains models on your data. High-risk decisions always route to a human for approval.',
      },
      {
        q: 'Does AI HR software replace my HR team?',
        a: 'No. It takes over the administrative work: the leave filing, onboarding tasks, policy answers, and compliance checks. Your people stay in the loop on the delicate calls, and most teams move them off clicking buttons and onto the higher-judgment work they were hired for.',
      },
      {
        q: 'How is MambaHR different from an HR chatbot or copilot?',
        a: "A chatbot answers questions; a copilot drafts text for a human to action. MambaHR completes the work itself: it files the leave, provisions the accounts, sends the offer, and only asks a human for the genuine judgment calls.",
      },
      {
        q: 'What does AI HR software cost?',
        a: 'MambaHR is a flat $14–$30 per employee per month with everything included: HRIS, hiring, onboarding, compliance, and the agent. No modules, no implementation fee, no per-seat HR-admin licenses.',
      },
    ],
    cta: { title: 'See AI HR software that', em: 'actually works.', sub: 'A live demo on your own scenarios in 30 minutes. Live the next morning.' },
    related: COMPARE_RELATED,
  },

  'best-hris-for-startups': {
    slug: 'best-hris-for-startups',
    metaTitle: 'Best HRIS for Startups (2026) | MambaHR',
    metaDescription:
      'The best HRIS for startups in 2026 does the HR work, not just stores it. MambaHR is the AI HR department for lean teams: hiring, onboarding, leave, payroll-ready exports, and 50-state compliance, live in a day, from $14/employee. Run HR like you have a team of ten.',
    h1: 'The best HRIS for startups does the work, not just stores it',
    eyebrow: 'Best HRIS for startups · 2026',
    hero: { lead: 'The best HRIS for startups', em: 'before you hire HR.', tail: '' },
    heroSub:
      "Most startup HRIS picks are a database your founders still operate. MambaHR is the AI HR department: it runs hiring, onboarding, leave, and compliance for you, so a 20-person team gets enterprise-grade HR without the first HR hire.",
    answer: {
      question: 'What is the best HRIS for startups?',
      answer:
        'For startups, the best HRIS is one that does the HR work, not just stores records. MambaHR is the AI HR department built for lean teams: it handles hiring, onboarding, leave, payroll-ready exports, and 50-state compliance autonomously in Slack, with one founder or ops lead approving the delicate calls. It is live in a day from $14 per employee.',
    },
    reasons: [
      {
        title: "You don’t have an HR person, so it does the HR.",
        desc: "Startups run HR off a founder or office manager’s spare hours. MambaHR is the department itself: requests get resolved in Slack without anyone learning a new admin tool.",
      },
      {
        title: "Compliance you can’t afford to get wrong.",
        desc: 'One bad classification or missed state leave rule is real money for a small team. MambaHR applies federal + 50-state law automatically, with a citation, before it becomes a problem.',
      },
      {
        title: 'Priced and deployed for a startup.',
        desc: "No implementation project, no module tree, no setup fee. Connect Slack and your stack; it’s handling requests the next morning, from $14 per employee with a $9k annual minimum.",
      },
    ],
    checklist: {
      eyebrow: 'How to choose',
      title: 'What a startup HRIS actually needs',
      lead: "Skip the enterprise checklist. These are the things that matter when you’re 10–200 people.",
      items: [
        { t: 'Runs before you have HR', d: "The system does the admin work, so HR isn’t a role you have to staff before you’re ready." },
        { t: '50-state compliance built in', d: 'Remote team across state lines? Leave, pay transparency, and classification handled.' },
        { t: 'Hiring + onboarding included', d: 'ATS, offers, and onboarding in the same product, no second tool, no handoff.' },
        { t: 'Payroll-ready', d: "Generates the change file in your provider’s format; you upload, payday runs." },
        { t: 'Live in a day', d: 'No implementation consultant. Import your data, connect Slack, go.' },
        { t: 'Scales past Series A', d: 'The same system carries you from 20 to 2,000, no painful re-platform later.' },
      ],
    },
    stats: [
      { n: 14, prefix: '$', label: 'per employee to start, no implementation fee, $9k annual minimum' },
      { n: 1, suffix: ' day', label: 'from signing to a working HR department' },
      { n: 0, label: 'admin backlog waiting for someone to get to it' },
    ],
    faq: [
      {
        q: 'Do startups even need an HRIS?',
        a: "Once you’re past ~10 employees, especially across state lines, yes. You need a system of record, compliant onboarding, leave tracking, and payroll data. MambaHR gives a startup all of that plus the HR work done, without hiring an HR person to run it.",
      },
      {
        q: "What’s the difference between an HRIS and MambaHR?",
        a: 'A traditional HRIS (BambooHR, Gusto, Rippling) stores your data and gives your team tools to operate. MambaHR is the system of record and the department that operates it: the agent resolves requests, runs compliance, and gets payroll ready autonomously.',
      },
      {
        q: 'Is it affordable for an early-stage startup?',
        a: "Yes, it’s a flat $14–$30 per employee per month, everything included, with no implementation fee. Plans carry an annual minimum starting at $9k. For most startups that’s less than the fully-loaded cost of the part-time admin work it takes over.",
      },
      {
        q: 'Can it grow with us?',
        a: "It’s built for the full company lifecycle: the same product runs HR from 20 people through enterprise scale, with the compliance and audit depth larger teams require. No re-platforming as you grow.",
      },
    ],
    cta: { title: 'Run HR like you have', em: 'a team of ten.', sub: "A live demo on your team’s scenarios in 30 minutes. Live the next morning." },
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
      'HR software for small business that does the work instead of adding another dashboard. MambaHR is the AI HR department: hiring, onboarding, leave, payroll-ready exports, and 50-state compliance, run for you in Slack. Live in a day, from $14/employee.',
    h1: 'HR software for small business that does the work for you',
    eyebrow: 'HR software for small business',
    hero: { lead: 'HR software that runs', em: 'the HR for you.', tail: '' },
    heroSub:
      "Small businesses don’t have an HR department, they have someone doing HR on the side. MambaHR is that department: it handles hiring, onboarding, leave, and 50-state compliance in Slack, so your team gets the time back.",
    answer: {
      question: 'What is the best HR software for a small business?',
      answer:
        'The best HR software for a small business does the HR work rather than adding another system to manage. MambaHR is an AI HR department that handles hiring, onboarding, leave, payroll-ready exports, and 50-state compliance autonomously in Slack, with one owner or office manager approving the sensitive decisions. It is live in a day from $14 per employee.',
    },
    reasons: [
      {
        title: 'Hands the HR work back to the agent.',
        desc: 'In a small business, HR lands on whoever has time, usually the owner or office manager. MambaHR takes the leave requests, onboarding, and policy questions off their plate entirely.',
      },
      {
        title: 'Compliance without a consultant.',
        desc: 'Small teams get tripped up by overtime rules, state leave, and classification. MambaHR applies federal + 50-state law automatically, so you stay compliant without paying for outside help.',
      },
      {
        title: 'No IT project, no big bill.',
        desc: "Connect Slack and your existing tools. It’s working the next morning. Flat per-employee pricing, everything included, no implementation fee.",
      },
    ],
    checklist: {
      eyebrow: 'How to evaluate it',
      title: 'What small-business HR software should cover',
      lead: 'You wear a lot of hats. The right tool takes the HR hat off entirely.',
      items: [
        { t: 'Does the work, not the dashboard', d: "Resolves requests for you. You’re not learning a new admin system to click through." },
        { t: 'Hiring to onboarding in one place', d: 'Post the role, send the offer, run onboarding, without stitching tools together.' },
        { t: 'Compliance handled automatically', d: 'Overtime, leave, classification, pay transparency, applied for your states.' },
        { t: 'Payroll-ready files', d: "Generates the change file for your payroll provider; you upload and run payday." },
        { t: 'A human on the sensitive calls', d: 'Terminations, accommodations, and pay decisions still come to you to approve.' },
        { t: 'Affordable and fast to start', d: 'Flat per-employee pricing, live in a day, no implementation consultant.' },
      ],
    },
    stats: [
      { n: 6, prefix: '$', suffix: ':1', label: 'spent on HR admin for every $1 of HR software. MambaHR captures it' },
      { n: 1, suffix: ' day', label: 'to go live, no IT project required' },
      { n: 50, label: 'states of compliance, applied automatically' },
    ],
    faq: [
      {
        q: 'What HR software is best for a small business?',
        a: 'The best fit is software that removes the HR work rather than adding admin. MambaHR is an AI HR department that runs hiring, onboarding, leave, and compliance for you in Slack, ideal for small businesses without a dedicated HR person.',
      },
      {
        q: 'How much does small-business HR software cost?',
        a: "MambaHR is a flat $14–$30 per employee per month with everything included: HRIS, hiring, onboarding, compliance, and the agent. There’s no implementation fee, and plans carry an annual minimum starting at $9k.",
      },
      {
        q: 'Do I still need a payroll provider?',
        a: "Yes, keep the payroll provider you like. MambaHR builds the per-cycle change file in your provider’s format and you upload it. It handles everything around payroll: records, changes, onboarding, and compliance.",
      },
      {
        q: 'Is it hard to set up for a small team?',
        a: "No. There’s no implementation project. You import your existing data, connect Slack and your tools, and the agent is handling requests the next morning, typically live within a day.",
      },
    ],
    cta: { title: 'Give your team', em: 'the HR hours back.', sub: 'A live demo on your own scenarios in 30 minutes. Live the next morning.' },
    related: [
      { label: 'MambaHR vs Gusto', href: '/compare/gusto' },
      { label: 'MambaHR vs BambooHR', href: '/compare/bamboohr' },
      { label: 'MambaHR vs Paychex', href: '/compare/paychex' },
      { label: 'MambaHR vs Justworks', href: '/compare/justworks' },
    ],
  },
}
