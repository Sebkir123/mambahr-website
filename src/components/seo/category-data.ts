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
  const url = `https://www.mambahr.com/${data.slug}`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: data.metaTitle,
      description: data.metaDescription,
      url,
      isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://www.mambahr.com' },
      about: { '@type': 'SoftwareApplication', name: 'MambaHR', applicationCategory: 'BusinessApplication', url: 'https://www.mambahr.com' },
      publisher: {
        '@type': 'Organization',
        name: 'MambaHR',
        url: 'https://www.mambahr.com',
        logo: { '@type': 'ImageObject', url: 'https://www.mambahr.com/MambaHR_logo.png' },
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
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mambahr.com' },
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
    metaTitle: 'AI HR Software That Does the Admin | MambaHR',
    metaDescription:
      'AI HR software that does the admin. MambaHR handles leave, onboarding, payroll changes and compliance answers from Slack, and you approve what matters.',
    h1: 'AI HR software that does the admin, not just tracks it',
    eyebrow: 'AI HR software',
    hero: { lead: 'AI HR software that', em: 'does the admin for you.', tail: '' },
    heroSub:
      'MambaHR takes HR requests in Slack, checks your policy and the law, drafts the paperwork and does the admin. Your team makes the judgment calls and approves what matters.',
    answer: {
      question: 'What is AI HR software?',
      answer:
        'AI HR software uses AI to help with human resources work, such as answering employee questions, handling leave requests and checking compliance. MambaHR goes beyond answering questions: it does the admin itself, like filing leave and preparing payroll changes, and a person approves the sensitive decisions.',
    },
    reasons: [
      {
        title: 'It does the request, not just shows it to you.',
        desc: 'Older HR software gives your team a queue to work through. MambaHR reads the request in Slack, pulls the context, applies your policy and drafts the document. If it needs a decision, it comes to you.',
      },
      {
        title: 'Compliance answers with the law cited.',
        desc: 'It checks federal family leave (FMLA) eligibility, cites the pay transparency rule for each state you employ in, and checks whether a role qualifies for overtime. Unclear cases go to a person.',
      },
      {
        title: 'You approve the big calls.',
        desc: 'Routine work gets done and logged. A termination, a pay decision or a raise above your range waits for your approval. You set the policy, and MambaHR follows it.',
      },
    ],
    checklist: {
      eyebrow: 'How to evaluate it',
      title: 'What AI HR software should do',
      lead: 'Hold any tool that says “AI” to this list.',
      items: [
        { t: 'Do the whole task', d: 'Not just suggest a draft, but file the leave, prepare the offer for approval and update the record.' },
        { t: 'Know employment law', d: 'Federal law plus the rules for your states, applied with the law cited, not a static policy library.' },
        { t: 'Keep a person on the risky calls', d: 'Terminations, layoffs and pay decisions go to a person to approve.' },
        { t: 'Log every change', d: 'A record of what was done and why, ready if anyone asks.' },
        { t: 'Keep your records in one place', d: 'Employee records, hiring and onboarding in one product, so nothing is typed in twice.' },
        { t: 'Import in a day', d: 'Import your data, connect Slack, and requests get handled the next day.' },
      ],
    },
    stats: [
      { n: 1, suffix: ' day', label: 'to import your data' },
      { n: 100, suffix: '%', label: 'of compliance answers cite the law they rely on' },
      { n: 0, label: 'terminations, layoffs or out-of-range pay changes made without your approval' },
    ],
    faq: [
      {
        q: 'Is AI HR software safe for sensitive employee data?',
        a: 'MambaHR encrypts data in transit (TLS 1.2 or higher) and at rest (AES-256), limits access by role and logs every change. Your data is never used to train AI. Sensitive decisions always go to a person.',
      },
      {
        q: 'Does AI HR software replace my HR team?',
        a: 'No. It takes the admin off your team’s plate: leave paperwork, onboarding tasks, policy answers and compliance checks. Your team keeps the work that needs a person: employees, hiring decisions, hard conversations and judgment calls.',
      },
      {
        q: 'How is MambaHR different from an HR chatbot?',
        a: 'A chatbot answers questions. MambaHR also does the admin: it files the leave, requests the new hire’s logins and drafts the offer for your approval. You make the judgment calls.',
      },
      {
        q: 'What does AI HR software cost?',
        a: 'MambaHR has one price per employee, per plan, from $14 per employee per month, billed annually. Plans differ: hiring starts with HR Ops Manager, and Deel-managed payroll with Whole department.',
      },
    ],
    cta: { title: 'See AI HR software that', em: 'does the admin.', sub: 'Start a free trial and set it up yourself, or book a 30-minute demo run on your own HR scenarios.' },
    related: COMPARE_RELATED,
  },

  'best-hris-for-startups': {
    slug: 'best-hris-for-startups',
    metaTitle: `Best HRIS for Startups (${CURRENT_YEAR}) | MambaHR`,
    metaDescription:
      'The best HRIS for startups keeps your records and does the admin. MambaHR handles onboarding, leave, payroll changes and compliance, from $14 per employee.',
    h1: 'The best HRIS for startups keeps your records and does the admin',
    eyebrow: `Best HRIS for startups · ${CURRENT_YEAR}`,
    hero: { lead: 'HR support that grows', em: 'with your startup.', tail: '' },
    heroSub:
      'At a startup, HR admin often lands on a founder, an office manager or your first HR person. MambaHR keeps your employee records and does the admin: onboarding, leave, payroll changes and compliance answers. You approve what matters.',
    answer: {
      question: 'What is the best HRIS for startups?',
      answer:
        'For a startup, the best HRIS (HR records system) keeps your employee records and also does the admin that comes with them. MambaHR handles onboarding, time off and leave, payroll changes, and compliance answers with the law cited, from requests in Slack. A founder or ops lead approves the sensitive decisions. Your data imports in a day, and plans start at $14 per employee per month.',
    },
    reasons: [
      {
        title: 'Admin off the plate of whoever does HR.',
        desc: 'At a startup, HR often runs on a founder’s or office manager’s spare hours. MambaHR handles the requests in Slack, so nobody has to learn a new admin tool.',
      },
      {
        title: 'Compliance you can’t afford to get wrong.',
        desc: 'One misclassified role or missed state leave rule costs real money at a small company. MambaHR applies federal law plus the rules for your states, with the law cited, and sends unclear cases to you.',
      },
      {
        title: 'Priced and set up for a startup.',
        desc: 'No long setup project. Import your data and connect Slack, and requests get handled the next day. Plans start at $14 per employee, with no yearly minimum.',
      },
    ],
    checklist: {
      eyebrow: 'How to choose',
      title: 'What a startup HR system needs',
      lead: 'Skip the enterprise checklist. These matter from your first hire to your 250th.',
      items: [
        { t: 'Takes the admin off your plate', d: 'Whoever handles HR today gets the routine work done for them, from forms to follow-ups.' },
        { t: 'State rules built in', d: 'Team across state lines? Pay transparency and final pay rules are cited for each state. Federal family leave (FMLA) is checked, and state leave rules are cited for you to decide.' },
        { t: 'Hiring and onboarding in one place', d: 'Job posts, applications, interviews, offers and onboarding in the same product. Hiring comes with the HR Ops Manager plan and up.' },
        { t: 'Payroll changes', d: 'A change file in your payroll provider’s format, or changes sent to Deel-managed payroll. You approve every run.' },
        { t: 'Imports in a day', d: 'Import your data, connect Slack, and start.' },
        { t: 'Grows with you', d: 'The same product covers you from 50 employees to 400 and beyond, so there is no switch later.' },
      ],
    },
    stats: [
      { n: 14, prefix: '$', label: 'per employee per month to start, billed annually' },
      { n: 1, suffix: ' day', label: 'to import your data' },
      { n: 100, suffix: '%', label: 'of compliance answers cite the law they rely on' },
    ],
    faq: [
      {
        q: 'Do startups even need an HRIS?',
        a: 'From your first hire, yes. The day someone joins, you need their records, onboarding paperwork that meets your state\'s rules, time off tracking and payroll data in one place, and it gets harder with every hire and every new state. MambaHR gives you that and does the admin that comes with it.',
      },
      {
        q: 'What’s the difference between an HRIS and MambaHR?',
        a: 'A traditional HRIS (BambooHR, Gusto, Rippling) stores your data and gives your team tools to work in. MambaHR stores your data too, and it also does the admin: it handles requests, checks the rules and prepares payroll changes. You approve what matters.',
      },
      {
        q: 'Is it affordable for an early-stage startup?',
        a: 'MambaHR has one price per employee, per plan, starting at $14 per employee per month, billed annually, with no yearly minimum.',
      },
      {
        q: 'Can it grow with us?',
        a: 'Yes. The same product runs HR from about 50 people into the hundreds. Larger plans add hiring, compensation cycles and layoff planning with legal checks, so you do not have to switch systems as you grow.',
      },
    ],
    cta: { title: 'HR that', em: 'runs itself.', sub: 'Start a free trial and set it up yourself, or book a 30-minute demo run on your own HR scenarios.' },
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
      'HR software for small business that does the admin. MambaHR handles onboarding, leave, payroll changes and compliance in Slack, from $14 per employee.',
    h1: 'HR software for small business that does the admin for you',
    eyebrow: 'HR software for small business',
    hero: { lead: 'HR software that takes', em: 'the admin off your plate.', tail: '' },
    heroSub:
      'In a small business, HR often lands on someone who has another job too. MambaHR does the admin for them: onboarding, leave, policy questions, payroll changes and compliance answers, all from requests in Slack. They approve what matters and get their time back.',
    answer: {
      question: 'What is the best HR software for a small business?',
      answer:
        'The best HR software for a small business does the admin instead of adding another system to manage. MambaHR handles onboarding, time off and leave, payroll changes, and compliance answers with the law cited, from requests in Slack. An owner or office manager approves the sensitive decisions. Your data imports in a day, and plans start at $14 per employee per month.',
    },
    reasons: [
      {
        title: 'Takes the HR admin off your desk.',
        desc: 'In a small business, HR lands on whoever has time, often the owner or office manager. MambaHR handles the leave requests, onboarding and policy questions for them.',
      },
      {
        title: 'Compliance without a consultant.',
        desc: 'Small teams get tripped up by overtime rules, state leave and worker classification. MambaHR applies federal law plus the rules for your states, with the law cited, and sends unclear cases to you.',
      },
      {
        title: 'No IT project.',
        desc: 'Import your data and connect Slack. Requests get handled the next day. One price per employee, per plan.',
      },
    ],
    checklist: {
      eyebrow: 'How to evaluate it',
      title: 'What small-business HR software should cover',
      lead: 'What to require before you buy.',
      items: [
        { t: 'Does the admin, not another dashboard', d: 'It handles requests for you, so you are not learning a new admin system.' },
        { t: 'Hiring to onboarding in one place', d: 'Post the job, track applicants, send the offer for your approval and run onboarding. Hiring comes with the HR Ops Manager plan and up.' },
        { t: 'Compliance with the law cited', d: 'Overtime, family leave (FMLA), pay transparency and final pay rules, cited for your states.' },
        { t: 'Payroll change files', d: 'A change file for your payroll provider, or changes sent to Deel-managed payroll. You approve every run.' },
        { t: 'A person on the sensitive calls', d: 'Terminations and pay decisions come to you to approve.' },
        { t: 'Quick to start', d: 'One price per employee, per plan, and your data imported in a day.' },
      ],
    },
    stats: [
      { n: 14, prefix: '$', label: 'per employee per month to start, billed annually' },
      { n: 1, suffix: ' day', label: 'to import your data, with no IT project' },
      { n: 100, suffix: '%', label: 'of compliance answers cite the law they rely on' },
    ],
    faq: [
      {
        q: 'What HR software is best for a small business?',
        a: 'Look for software that takes admin off your plate rather than adding more. MambaHR handles onboarding, leave, payroll changes and compliance answers from requests in Slack. It suits small businesses where HR is one of someone’s jobs.',
      },
      {
        q: 'How much does small-business HR software cost?',
        a: 'MambaHR has one price per employee, per plan, from $14 per employee per month, billed annually, with no yearly minimum.',
      },
      {
        q: 'Do I still need a payroll provider?',
        a: 'Yes. MambaHR prepares the payroll changes but does not run payroll. It creates a change file for the provider you use now, or sends the changes to Deel-managed payroll, where a person approves every run.',
      },
      {
        q: 'Is it hard to set up for a small team?',
        a: 'No. There is no setup project. You import your data, connect Slack, and requests get handled the next day.',
      },
    ],
    cta: { title: 'Give your team', em: 'its time back.', sub: 'Start a free trial and set it up yourself, or book a 30-minute demo run on your own HR scenarios.' },
    related: [
      { label: 'MambaHR vs Gusto', href: '/compare/gusto' },
      { label: 'MambaHR vs BambooHR', href: '/compare/bamboohr' },
      { label: 'MambaHR vs Paychex', href: '/compare/paychex' },
      { label: 'MambaHR vs Justworks', href: '/compare/justworks' },
    ],
  },
}
