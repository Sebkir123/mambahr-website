export type CompetitorData = {
  slug: string
  name: string
  tagline: string
  heroHeadline: string
  heroSub: string
  /** Meta description, 150 to 160 chars. heroSub is page copy and runs long for a SERP snippet. */
  description: string
  switchReasons: { title: string; desc: string }[]
  tableRows: { feature: string; mamba: string | boolean; them: string | boolean; note?: string }[]
  bottomLine: string
  /** One-line price anchor rendered under the table, money on the page. */
  costLine: string
}

/* Row labels shared across the tables, so every page words a feature the same way. */
const F = {
  slack: 'Employees and managers ask in Slack',
  admin: 'Does the admin work, with you approving what matters',
  law: 'Federal and state employment law answers, with the law cited',
  payroll: 'Payroll',
  hiring: 'Hiring: job posts, applications, interviews, offers',
  onboarding: 'Onboarding tasks done for you',
  setup: 'Time to get started',
  log: 'Every change logged',
  benefits: 'Benefits administration',
  records: 'Employee records',
  everyday: 'Time off, leave and everyday HR requests',
}

const PAYROLL_NOTE = 'MambaHR prepares the changes and you approve each run. Deel-managed payroll: Whole department plan and up.'
const HIRING_NOTE = 'HR Ops Manager plan and up'
const COBRA_NOTE = 'MambaHR does send the health coverage (COBRA) notice when someone leaves.'
const IMPORT_DAY = 'Data imported in a day'

export const competitors: Record<string, CompetitorData> = {
  rippling: {
    slug: 'rippling',
    description: 'Rippling gives your team HR, payroll and IT software to run. MambaHR is HR software that also does the admin for your team, and you approve what matters.',
    name: 'Rippling',
    tagline: 'MambaHR vs Rippling',
    heroHeadline: 'Rippling gives you software to run.\nMambaHR does the admin for you.',
    heroSub: 'Rippling brings HR, payroll and IT into one platform that your team operates. MambaHR keeps your HR records too, and it also does the admin: leave, onboarding, payroll changes and employee questions. You approve what matters.',
    switchReasons: [
      {
        title: 'The admin gets done, not just organized.',
        desc: 'Rippling puts your tools in one place. Someone on your team still files the leave, drafts the paperwork and checks the rules. MambaHR does that work and brings you the decisions that need a person.',
      },
      {
        title: 'One price per employee.',
        desc: 'Rippling prices its HR, IT and finance products separately. MambaHR has one price per employee, per plan, covering employee records, onboarding, leave, compliance answers and payroll changes.',
      },
      {
        title: 'Working the day after your import.',
        desc: 'A Rippling rollout usually needs a project plan. With MambaHR you import your Rippling data, connect Slack, and requests get handled the next day.',
      },
    ],
    tableRows: [
      { feature: F.slack, mamba: true, them: 'Limited integration' },
      { feature: F.admin, mamba: true, them: 'Not included' },
      { feature: F.law, mamba: true, them: 'Rules-based alerts', note: 'Rippling flags issues. MambaHR answers with the law cited and sends unclear cases to you.' },
      { feature: F.payroll, mamba: 'Change file, or Deel-managed', them: true, note: PAYROLL_NOTE },
      { feature: 'IT and device management', mamba: 'Not included', them: true, note: 'MambaHR asks IT for a device. Rippling can manage the device itself.' },
      { feature: F.setup, mamba: IMPORT_DAY, them: 'Weeks to months' },
      { feature: 'One price per employee, per plan', mamba: true, them: 'Priced per product' },
      { feature: F.log, mamba: true, them: true },
    ],
    bottomLine: 'Choose Rippling if you want HR, payroll and IT devices in one platform your team runs. Choose MambaHR if you want the HR admin done for you, with you approving what matters.',
    costLine: 'One price per employee, per plan, from $14. No separate products to add.',
  },

  gusto: {
    slug: 'gusto',
    description: 'Gusto runs payroll well. MambaHR does the rest of the HR admin for your team: leave, onboarding, hiring and compliance answers, plus your payroll changes.',
    name: 'Gusto',
    tagline: 'MambaHR vs Gusto',
    heroHeadline: 'Gusto handles payday.\nMambaHR handles the HR admin around it.',
    heroSub: "Gusto is simple, reliable payroll for small teams. The rest of HR still lands on someone's desk: leave, new hires, onboarding, policy questions. MambaHR does that work, prepares your payroll changes, and brings you the decisions that need a person.",
    switchReasons: [
      {
        title: 'Payroll is one part of HR.',
        desc: 'Gusto runs payroll. Leave requests, offer letters, onboarding tasks and exits still need someone. Ask MambaHR in Slack and it does the work, then asks you to approve anything sensitive.',
      },
      {
        title: 'Employment law answers, with the law cited.',
        desc: "Gusto handles payroll taxes well. MambaHR answers the employment questions around them, like whether Maya qualifies for family leave (FMLA) or what New York's pay transparency rule requires in a job post.",
      },
      {
        title: 'Hiring and onboarding in one place.',
        desc: 'MambaHR posts jobs with the pay range, tracks applications, schedules interviews, orders background checks through Checkr and drafts the offer inside your pay range for your approval. Then onboarding starts.',
      },
    ],
    tableRows: [
      { feature: F.slack, mamba: true, them: 'Not included' },
      { feature: F.admin, mamba: true, them: 'Not included' },
      { feature: F.law, mamba: true, them: 'Payroll tax only' },
      { feature: F.payroll, mamba: 'Change file, or Deel-managed', them: true, note: PAYROLL_NOTE },
      { feature: F.benefits, mamba: 'Not included', them: true, note: COBRA_NOTE },
      { feature: F.hiring, mamba: true, them: 'Basic job posting only', note: HIRING_NOTE },
      { feature: F.onboarding, mamba: true, them: 'Checklists only' },
      { feature: F.setup, mamba: IMPORT_DAY, them: '1 to 2 weeks' },
      { feature: F.log, mamba: true, them: 'Partial' },
    ],
    bottomLine: 'Gusto is good payroll. MambaHR does the other HR admin and gets your payroll changes ready, for Gusto or for Deel-managed payroll.',
    costLine: 'Your Gusto history imports in a day. Keep Gusto and load the change file MambaHR prepares, or use Deel-managed payroll. One price per employee, per plan, from $14.',
  },

  deel: {
    slug: 'deel',
    description: 'Deel runs payroll and employs people abroad for you. MambaHR does the HR admin for your US team and sends the payroll changes to Deel-managed payroll.',
    name: 'Deel',
    tagline: 'MambaHR vs Deel',
    heroHeadline: 'Deel runs payroll and hires abroad.\nMambaHR does your US HR admin and sends Deel the payroll changes.',
    heroSub: 'Deel runs payroll and acts as employer of record, meaning it legally employs people for you in other countries. MambaHR does the HR admin for your US team: leave, hiring, onboarding and compliance answers. It prepares the payroll changes and sends them to Deel-managed payroll, Powered by Deel. You approve what matters.',
    switchReasons: [
      {
        title: 'Deel pays people. Someone still does the HR around it.',
        desc: 'Your US team still asks about leave, needs offers drafted and has to be onboarded. MambaHR does that admin and brings you the decisions that need a person.',
      },
      {
        title: 'US leave and state rules, with the law cited.',
        desc: 'MambaHR checks federal family leave (FMLA) eligibility and cites the rules for each state you employ in. Unclear cases come to you.',
      },
      {
        title: 'Payroll changes go to Deel for you.',
        desc: 'New hires, raises and leavers become payroll changes. MambaHR prepares them, you approve, and they go to Deel-managed payroll.',
      },
    ],
    tableRows: [
      { feature: F.slack, mamba: true, them: 'Not included' },
      { feature: F.admin, mamba: true, them: 'Not included' },
      { feature: 'US leave: federal family leave (FMLA) and state rules', mamba: true, them: 'Basic only' },
      { feature: F.law, mamba: true, them: 'Focus on global employment' },
      { feature: 'Employing and paying people in other countries', mamba: 'Not included', them: true },
      { feature: 'Running payroll', mamba: 'Prepares the changes', them: true, note: 'MambaHR sends the changes to Deel-managed payroll and you approve each run. Powered by Deel.' },
      { feature: F.hiring, mamba: true, them: 'Not included', note: HIRING_NOTE },
      { feature: F.onboarding, mamba: true, them: 'Partial' },
      { feature: F.log, mamba: true, them: 'Partial' },
    ],
    bottomLine: 'Deel pays people, in the US and abroad. MambaHR does the HR admin for your US team and sends the payroll changes to Deel. They work together.',
    costLine: 'Keep Deel for payroll and for people abroad. MambaHR is one price per employee, per plan, from $14. Deel-managed payroll comes with the Whole department plan and up.',
  },

  bamboohr: {
    slug: 'bamboohr',
    description: 'BambooHR keeps clean HR records that your team works in. MambaHR keeps your records too, and also does the admin: leave, onboarding and compliance answers.',
    name: 'BambooHR',
    tagline: 'MambaHR vs BambooHR',
    heroHeadline: 'BambooHR keeps your HR records.\nMambaHR keeps them and does the admin too.',
    heroSub: 'BambooHR is a solid place for employee records and documented processes. Your team still opens it to do each task. MambaHR does those tasks for your team: leave, onboarding, policy questions and payroll changes. You approve what matters.',
    switchReasons: [
      {
        title: 'Records, plus the work that comes with them.',
        desc: 'When Maya asks about adoption leave, someone has to read the policy, check her eligibility and reply. MambaHR answers her in Slack with the policy and the law cited, and files the leave within your policy.',
      },
      {
        title: 'Onboarding that follows up for you.',
        desc: 'BambooHR onboarding lists still need someone to start them and chase them. MambaHR sends the forms, requests logins and a laptop from IT, and follows up until each step is done.',
      },
      {
        title: 'Compliance answers, not just stored policies.',
        desc: 'BambooHR holds your policies. MambaHR checks family leave (FMLA) eligibility and cites the pay transparency rule for each state you hire in. Unclear cases come to you.',
      },
    ],
    tableRows: [
      { feature: F.slack, mamba: true, them: 'Not included' },
      { feature: F.admin, mamba: true, them: 'Not included' },
      { feature: F.law, mamba: true, them: 'Not included' },
      { feature: F.payroll, mamba: 'Change file, or Deel-managed', them: true, note: PAYROLL_NOTE },
      { feature: F.hiring, mamba: true, them: 'Basic hiring tool', note: HIRING_NOTE },
      { feature: 'Performance reviews', mamba: 'Not included', them: true },
      { feature: F.setup, mamba: IMPORT_DAY, them: '2 to 4 weeks' },
      { feature: F.log, mamba: true, them: 'Partial' },
    ],
    bottomLine: 'BambooHR is a good home for HR records. MambaHR keeps your records and also does the admin work for your team.',
    costLine: 'One price per employee, per plan, from $14. Your BambooHR data imports in a day.',
  },

  namely: {
    slug: 'namely',
    description: 'Namely gives your team HR, payroll and benefits software to run. MambaHR also does the HR admin for you: leave, hiring, onboarding and compliance answers.',
    name: 'Namely',
    tagline: 'MambaHR vs Namely',
    heroHeadline: 'Namely gives your team HR software to run.\nMambaHR also does the admin for you.',
    heroSub: 'Namely brings HR records, payroll and benefits into one platform. Your HR team still works through each request in it. MambaHR keeps your records too, and it does the admin: leave, onboarding, policy questions and payroll changes. You approve what matters.',
    switchReasons: [
      {
        title: 'Fewer requests waiting on your team.',
        desc: "In Namely, each request lands in someone's queue. MambaHR handles the routine ones as they arrive and brings you only the ones that need a decision.",
      },
      {
        title: 'Set a policy once.',
        desc: 'Tell MambaHR your approval rules, leave rules and pay ranges. It applies them every time and logs each exception for you to review.',
      },
      {
        title: 'Compliance answers with the law cited.',
        desc: 'MambaHR checks family leave (FMLA) eligibility, pay transparency across states and final pay timing. Clear cases get handled. The rest come to you.',
      },
    ],
    tableRows: [
      { feature: F.slack, mamba: true, them: 'Not included' },
      { feature: F.admin, mamba: true, them: 'Not included' },
      { feature: F.law, mamba: true, them: 'Not included' },
      { feature: F.payroll, mamba: 'Change file, or Deel-managed', them: true, note: PAYROLL_NOTE },
      { feature: F.benefits, mamba: 'Not included', them: true, note: COBRA_NOTE },
      { feature: F.hiring, mamba: true, them: 'Basic hiring tool', note: HIRING_NOTE },
      { feature: F.setup, mamba: IMPORT_DAY, them: '4 to 8 weeks' },
      { feature: F.log, mamba: true, them: 'Partial' },
    ],
    bottomLine: 'Choose Namely if you want HR, payroll and benefits on one platform your team runs. Choose MambaHR if you want the HR admin done, with you approving what matters.',
    costLine: 'One price per employee, per plan, from $14. Your Namely data imports in a day.',
  },

  hibob: {
    slug: 'hibob',
    description: 'HiBob is a modern HR system employees like, run by your HR team. MambaHR also does the HR admin for you: leave, hiring, onboarding and compliance answers.',
    name: 'HiBob',
    tagline: 'MambaHR vs HiBob',
    heroHeadline: 'HiBob gives you a modern HR system to run.\nMambaHR also does the admin for your team.',
    heroSub: 'HiBob has a clean interface and strong engagement features, and employees like using it. Your HR team still acts on each request. MambaHR keeps your records too and does the admin: leave, onboarding, policy questions and payroll changes. You approve what matters.',
    switchReasons: [
      {
        title: 'Requests handled, not just displayed.',
        desc: "HiBob's interface is well liked. Each leave request, policy question and onboarding step still needs someone to act on it. MambaHR handles them in Slack and brings you the ones that need a decision.",
      },
      {
        title: 'Your data, put to work.',
        desc: 'HiBob shows engagement scores, org charts and team trends. MambaHR uses your data to do the work: it approves leave within your policy and drafts offers inside your pay ranges for you to approve.',
      },
      {
        title: 'Built for US rules.',
        desc: 'HiBob is built for global teams, with the US as one of many countries. MambaHR covers the US only: federal family leave (FMLA), pay transparency by state and final pay timing.',
      },
    ],
    tableRows: [
      { feature: F.slack, mamba: true, them: 'Limited integration' },
      { feature: F.admin, mamba: true, them: 'Not included' },
      { feature: F.law, mamba: true, them: 'Not included' },
      { feature: F.payroll, mamba: 'Change file, or Deel-managed', them: true, note: PAYROLL_NOTE },
      { feature: 'Engagement surveys', mamba: 'Not included', them: true },
      { feature: F.records, mamba: true, them: true },
      { feature: 'Teams outside the US', mamba: 'Not included', them: true },
      { feature: F.hiring, mamba: true, them: 'Basic', note: HIRING_NOTE },
      { feature: F.setup, mamba: IMPORT_DAY, them: '2 to 6 weeks' },
      { feature: F.log, mamba: true, them: 'Partial' },
    ],
    bottomLine: 'HiBob is a good HR system for global teams that want engagement tools. MambaHR is for US teams that want the HR admin done, with you approving what matters.',
    costLine: 'One price per employee, per plan, from $14. Your HiBob data imports by CSV in a day.',
  },

  adp: {
    slug: 'adp',
    description: 'ADP gives you payroll, benefits and HR software to run. MambaHR does the everyday HR admin for your team: employee questions, leave, hiring and compliance.',
    name: 'ADP',
    tagline: 'MambaHR vs ADP',
    heroHeadline: 'ADP runs payroll and benefits at scale.\nMambaHR does the everyday HR admin for your team.',
    heroSub: 'ADP handles payroll, benefits and HR administration for companies of every size, on a platform built for HR professionals to operate. MambaHR does the everyday admin for your team: employee questions, leave, onboarding, hiring paperwork and compliance answers. You approve what matters.',
    switchReasons: [
      {
        title: 'Software to run, or admin done for you.',
        desc: 'ADP gives your HR team a broad platform to manage. MambaHR keeps your employee records and does the routine work in them: leave, onboarding and compliance answers. Decisions that need a person come to you.',
      },
      {
        title: 'Employees ask in Slack.',
        desc: 'ADP routes employees through a portal and HR admins. With MambaHR, employees ask in Slack and get an answer with the policy cited. There is no portal to learn.',
      },
      {
        title: 'Working the day after your import.',
        desc: 'ADP setups often take weeks. Import your ADP data into MambaHR in a day, connect Slack, and requests get handled the next day.',
      },
    ],
    tableRows: [
      { feature: F.slack, mamba: true, them: 'Not included' },
      { feature: F.admin, mamba: true, them: 'Not included' },
      { feature: F.law, mamba: true, them: 'Payroll tax compliance' },
      { feature: F.payroll, mamba: 'Change file, or Deel-managed', them: true, note: PAYROLL_NOTE },
      { feature: F.benefits, mamba: 'Not included', them: true, note: COBRA_NOTE },
      { feature: F.hiring, mamba: true, them: 'Available as add-on', note: HIRING_NOTE },
      { feature: F.setup, mamba: IMPORT_DAY, them: '4 to 12 weeks' },
      { feature: F.log, mamba: true, them: true },
    ],
    bottomLine: 'ADP is a dependable back office for payroll and benefits. MambaHR does the day-to-day HR admin with your employees and managers, and brings the judgment calls to you.',
    costLine: 'One price per employee, per plan, from $14. No add-ons to buy.',
  },

  workday: {
    slug: 'workday',
    description: 'Workday is an enterprise suite your admins configure and run. MambaHR does the HR admin for your team, with your data imported in a day and every change logged.',
    name: 'Workday',
    tagline: 'MambaHR vs Workday',
    heroHeadline: 'Workday is a suite your admins configure.\nMambaHR does the HR admin, set up in a day.',
    heroSub: 'Workday is the standard HR suite for large companies: broad, configurable and run by a team of admins. MambaHR keeps your HR records and does the admin for your team. Your data imports in a day, every change is logged, and you approve what matters.',
    switchReasons: [
      {
        title: 'Admin done, not just configured.',
        desc: 'Workday gives your HR team a platform to set up and maintain. MambaHR handles the requests, applies your policies and brings the judgment calls to you.',
      },
      {
        title: 'A day to import, not a long project.',
        desc: 'Workday rollouts can run from several months to over a year, often with an outside consultant. MambaHR imports your Workday data in a day and starts on requests the next day.',
      },
      {
        title: 'Employees ask in Slack.',
        desc: 'Employees and managers ask MambaHR in Slack and get answers with the policy cited. Nobody has to learn a new app to request time off.',
      },
    ],
    tableRows: [
      { feature: F.slack, mamba: true, them: 'Limited integrations' },
      { feature: F.admin, mamba: true, them: 'AI assistant features' },
      { feature: 'Time until requests get handled', mamba: 'The day after import', them: 'Months' },
      { feature: F.law, mamba: true, them: true },
      { feature: F.payroll, mamba: 'Change file, or Deel-managed', them: true, note: PAYROLL_NOTE },
      { feature: 'Finance and accounting (ERP)', mamba: 'Not included', them: true, note: 'Workday strength: HR and finance in one' },
      { feature: 'Payroll in many countries', mamba: 'US only', them: true },
      { feature: F.log, mamba: true, them: true },
    ],
    bottomLine: 'Choose Workday if you need finance, HR and global operations in one configurable platform. Choose MambaHR if you want the HR admin done for your US team, with you approving what matters.',
    costLine: 'One price per employee, per plan, from $14. Your Workday data imports in a day.',
  },

  justworks: {
    slug: 'justworks',
    description: 'Justworks is a PEO that co-employs your team. MambaHR does the HR admin in Slack while your company stays the only employer and keeps its own benefits.',
    name: 'Justworks',
    tagline: 'MambaHR vs Justworks',
    heroHeadline: 'Justworks becomes your co-employer.\nMambaHR does the admin while you stay the employer.',
    heroSub: 'Justworks is a PEO (professional employer organization). It co-employs your staff, bundles benefits and gives you a support team to call. MambaHR does the HR admin for your team without co-employment. You keep your tax ID and your benefits broker, and you approve what matters.',
    switchReasons: [
      {
        title: 'You stay the only employer.',
        desc: 'A PEO co-employs your staff and shares some employer duties. MambaHR does not change who employs your team. It does the admin, and your company stays the employer.',
      },
      {
        title: 'Answers in Slack, with the law cited.',
        desc: 'Justworks sends harder questions to its support team. MambaHR answers in Slack: family leave (FMLA) eligibility, final pay timing and pay transparency, each with the law cited. Judgment calls come to you.',
      },
      {
        title: 'Keep your benefits broker.',
        desc: 'PEOs bundle benefits into the package, so leaving one means shopping for new coverage. MambaHR does not run benefits, so your plans and your broker stay where they are.',
      },
    ],
    tableRows: [
      { feature: F.slack, mamba: true, them: 'Limited integration' },
      { feature: F.admin, mamba: true, them: 'Support team you contact' },
      { feature: 'Co-employment', mamba: 'None, you stay the employer', them: 'Yes, as a PEO' },
      { feature: F.law, mamba: true, them: 'Support-assisted' },
      { feature: F.payroll, mamba: 'Change file, or Deel-managed', them: true, note: PAYROLL_NOTE },
      { feature: 'Benefits', mamba: 'Keep your own broker', them: 'PEO-bundled plans', note: 'A PEO can give a small team access to large-group plans.' },
      { feature: F.hiring, mamba: true, them: 'Not included', note: HIRING_NOTE },
      { feature: F.onboarding, mamba: true, them: 'Checklists only' },
      { feature: F.setup, mamba: IMPORT_DAY, them: '2 to 4 weeks' },
      { feature: F.log, mamba: true, them: 'Partial' },
    ],
    bottomLine: 'Justworks is a good PEO if you want bundled benefits and a support team to call. MambaHR does the HR admin for your team while you keep your employment relationship.',
    costLine: 'One price per employee, per plan, from $14. MambaHR does not touch your benefits, so there is no coverage to re-shop.',
  },

  trinet: {
    slug: 'trinet',
    description: 'TriNet co-employs your team and assigns an HR service rep. MambaHR does the HR admin directly, while you stay the employer and keep your own benefits.',
    name: 'TriNet',
    tagline: 'MambaHR vs TriNet',
    heroHeadline: 'TriNet co-employs your team and assigns a rep.\nMambaHR does the admin, and you stay the employer.',
    heroSub: 'TriNet is a PEO (professional employer organization). It co-employs your staff, bundles benefits and gives you an HR service rep. MambaHR does the HR admin for your team without co-employment. You keep your tax ID and your benefits, and you approve what matters.',
    switchReasons: [
      {
        title: 'Your tax ID, your employees.',
        desc: "TriNet's PEO model co-employs your people and shares some employer duties. MambaHR leaves your employment relationship as it is, so there is no co-employment to unwind later.",
      },
      {
        title: 'Answers without waiting for a rep.',
        desc: 'TriNet assigns a rep for harder questions. MambaHR answers in Slack as soon as the question is asked: leave eligibility, state rules, worker classification. Judgment calls come to you.',
      },
      {
        title: 'Keep your plans.',
        desc: 'PEO benefits are bundled, so leaving TriNet usually means shopping for new coverage. MambaHR does not run benefits, so you keep your plans and your broker.',
      },
    ],
    tableRows: [
      { feature: F.slack, mamba: true, them: 'Not included' },
      { feature: F.admin, mamba: true, them: 'Assigned service rep' },
      { feature: 'Co-employment', mamba: 'None, you stay the employer', them: 'Yes, as a PEO' },
      { feature: F.law, mamba: true, them: 'Rep-assisted' },
      { feature: F.payroll, mamba: 'Change file, or Deel-managed', them: true, note: PAYROLL_NOTE },
      { feature: 'Benefits', mamba: 'Keep your own broker', them: 'PEO-bundled plans', note: 'A PEO can give a small team access to large-group plans.' },
      { feature: F.hiring, mamba: true, them: 'Not included', note: HIRING_NOTE },
      { feature: F.onboarding, mamba: true, them: 'Rep-assisted' },
      { feature: F.setup, mamba: IMPORT_DAY, them: '4 to 8 weeks' },
      { feature: F.log, mamba: true, them: 'Partial' },
    ],
    bottomLine: 'TriNet is a capable PEO if co-employment and bundled benefits suit you. MambaHR does the HR admin while you keep your tax ID, your benefits and your employment relationship.',
    costLine: 'One price per employee, per plan, from $14. Your benefits stay with your broker.',
  },

  paychex: {
    slug: 'paychex',
    description: 'Paychex sells payroll and HR services one at a time, with a rep to call. MambaHR does the HR admin in one product and prepares all your payroll changes.',
    name: 'Paychex',
    tagline: 'MambaHR vs Paychex',
    heroHeadline: 'Paychex runs payroll and sells HR services.\nMambaHR does the HR admin and prepares your payroll changes.',
    heroSub: 'Paychex has decades of payroll experience and sells HR services one by one, with a rep on the phone. MambaHR does the HR admin in one product: employee questions, leave, onboarding and compliance answers. It prepares every payroll change, and you approve what matters.',
    switchReasons: [
      {
        title: 'One product instead of add-ons.',
        desc: 'Paychex sells HR services, time tracking and compliance help as separate items. MambaHR covers employee records, onboarding, leave and compliance answers in one product, with one price per employee, per plan.',
      },
      {
        title: 'Employees ask in Slack.',
        desc: 'Paychex Flex gives employees a portal and HR a service rep. With MambaHR, employees ask in Slack and get an answer with the policy cited. Anything sensitive comes to you.',
      },
      {
        title: 'Employment law answers, not only payroll tax.',
        desc: 'Paychex handles payroll tax well. MambaHR answers employment questions: family leave (FMLA) eligibility, final pay timing and pay transparency by state. It cites the law and sends unclear cases to you.',
      },
    ],
    tableRows: [
      { feature: F.slack, mamba: true, them: 'Not included' },
      { feature: F.admin, mamba: true, them: 'Not included' },
      { feature: F.law, mamba: true, them: 'Payroll tax, plus paid services' },
      { feature: F.payroll, mamba: 'Change file, or Deel-managed', them: true, note: PAYROLL_NOTE },
      { feature: F.benefits, mamba: 'Not included', them: true, note: COBRA_NOTE },
      { feature: F.hiring, mamba: true, them: 'Add-on module', note: HIRING_NOTE },
      { feature: F.onboarding, mamba: true, them: 'Add-on module' },
      { feature: 'Pricing', mamba: 'One price per employee, per plan', them: 'Fee per module' },
      { feature: F.setup, mamba: IMPORT_DAY, them: '2 to 6 weeks' },
      { feature: F.log, mamba: true, them: 'Partial' },
    ],
    bottomLine: 'Paychex is reliable payroll with HR services you add on. MambaHR does the HR admin in one product and prepares the payroll changes for you to approve.',
    costLine: 'Keep Paychex for payroll and load the change file MambaHR prepares. MambaHR is one price per employee, per plan, from $14.',
  },

  zenefits: {
    slug: 'zenefits',
    description: 'Zenefits, now part of TriNet, puts HR, benefits and payroll in one dashboard. MambaHR also does the HR admin for your team, with you approving what matters.',
    name: 'Zenefits',
    tagline: 'MambaHR vs Zenefits',
    heroHeadline: 'Zenefits puts HR in one dashboard.\nMambaHR also does the admin for you.',
    heroSub: 'Zenefits (now part of TriNet) brings HR, benefits and payroll into one tidy platform for small businesses. Your team still clicks through each task. MambaHR keeps your records too and does the admin: leave, onboarding, policy questions and payroll changes. You approve what matters.',
    switchReasons: [
      {
        title: 'Fewer tasks to click through.',
        desc: 'Zenefits made HR admin tidier. Each leave request, onboarding step and policy question still needs someone to log in and act. MambaHR handles them in Slack.',
      },
      {
        title: 'Onboarding that follows up for you.',
        desc: 'Zenefits gives you onboarding checklists. MambaHR works through them: it sends forms for signature, starts the Form I-9, requests logins and follows up until each step is done.',
      },
      {
        title: 'Compliance answers, not just deadlines.',
        desc: 'Zenefits stores policies and tracks deadlines. MambaHR checks family leave (FMLA) eligibility, cites the pay transparency rule for each state, and sends unclear cases to you.',
      },
    ],
    tableRows: [
      { feature: F.slack, mamba: true, them: 'Not included' },
      { feature: F.admin, mamba: true, them: 'Not included' },
      { feature: F.law, mamba: true, them: 'Tracking and alerts' },
      { feature: F.payroll, mamba: 'Change file, or Deel-managed', them: 'Add-on', note: PAYROLL_NOTE },
      { feature: F.benefits, mamba: 'Not included', them: true, note: COBRA_NOTE },
      { feature: F.hiring, mamba: true, them: 'Basic', note: HIRING_NOTE },
      { feature: F.onboarding, mamba: true, them: 'Checklists only' },
      { feature: F.setup, mamba: IMPORT_DAY, them: '1 to 3 weeks' },
      { feature: F.log, mamba: true, them: 'Partial' },
    ],
    bottomLine: 'Zenefits is a clean HR dashboard for small businesses. MambaHR does the admin work the dashboard organizes, and you approve what matters.',
    costLine: 'One price per employee, per plan, from $14. Your Zenefits data imports by CSV in a day.',
  },

  paylocity: {
    slug: 'paylocity',
    description: 'Paylocity is a mid-market HR and payroll suite your team runs. MambaHR does the HR admin for you: employee questions, leave, hiring and compliance answers.',
    name: 'Paylocity',
    tagline: 'MambaHR vs Paylocity',
    heroHeadline: 'Paylocity gives your HR team a suite to run.\nMambaHR also does the admin for you.',
    heroSub: 'Paylocity is a capable mid-market suite for payroll, benefits, talent and time tracking, run by your HR team. MambaHR keeps your HR records and does the admin: employee questions, leave, onboarding, hiring paperwork and compliance answers. You approve what matters.',
    switchReasons: [
      {
        title: 'Fewer modules to set up.',
        desc: 'Paylocity gives your HR team modules to configure and run. MambaHR handles the requests, applies your policies and brings the judgment calls to you.',
      },
      {
        title: 'Employees ask in Slack.',
        desc: 'Paylocity offers self-service through its app and community feed. MambaHR answers in Slack with the policy cited, and only sensitive decisions come to you.',
      },
      {
        title: 'A day to import.',
        desc: 'Paylocity rollouts usually run several weeks with an implementation consultant. MambaHR imports your data by CSV in a day and starts on requests the next day.',
      },
    ],
    tableRows: [
      { feature: F.slack, mamba: true, them: 'Limited integration' },
      { feature: F.admin, mamba: true, them: 'AI assistant features' },
      { feature: F.law, mamba: true, them: true },
      { feature: F.payroll, mamba: 'Change file, or Deel-managed', them: true, note: PAYROLL_NOTE },
      { feature: 'Benefits and time tracking', mamba: 'Not included', them: true },
      { feature: F.hiring, mamba: true, them: 'Module included', note: HIRING_NOTE },
      { feature: F.setup, mamba: IMPORT_DAY, them: '4 to 8 weeks' },
      { feature: F.log, mamba: true, them: true },
    ],
    bottomLine: 'Paylocity is a solid suite for an HR team to run. MambaHR does the admin for your HR team, with your data imported in a day.',
    costLine: 'One price per employee, per plan, from $14.',
  },

  ukg: {
    slug: 'ukg',
    description: 'UKG is deep workforce software for large, shift-based teams. MambaHR does the HR admin for your team, with your data imported in a day and every change logged.',
    name: 'UKG',
    tagline: 'MambaHR vs UKG',
    heroHeadline: 'UKG is built for large, shift-based workforces.\nMambaHR takes the HR admin off your plate.',
    heroSub: 'UKG (Ready and Pro) is deep on scheduling, time tracking and HR for large, shift-heavy organizations, run by a team of admins. MambaHR keeps your HR records and does the admin: leave, onboarding, compliance answers and payroll changes. Your data imports in a day, and you approve what matters.',
    switchReasons: [
      {
        title: 'The work gets done, not just set up.',
        desc: 'UKG gives a large HR and operations team a platform to configure. MambaHR does the leave, onboarding, compliance and hiring admin for your team, and you approve what matters.',
      },
      {
        title: 'A day to import.',
        desc: 'UKG rollouts usually take months, often with an outside partner. MambaHR imports your data by CSV in a day and starts on requests the next day.',
      },
      {
        title: 'Employees ask in Slack.',
        desc: 'Employees and managers ask MambaHR in Slack and get answers with the policy cited. Nobody has to learn a new app.',
      },
    ],
    tableRows: [
      { feature: F.slack, mamba: true, them: 'Limited integrations' },
      { feature: F.admin, mamba: true, them: 'AI assistant features' },
      { feature: F.law, mamba: true, them: true },
      { feature: F.payroll, mamba: 'Change file, or Deel-managed', them: true, note: PAYROLL_NOTE },
      { feature: 'Time, attendance and shift scheduling', mamba: 'Not included', them: true, note: 'UKG strength: shift workforce management' },
      { feature: F.hiring, mamba: true, them: 'Module included', note: HIRING_NOTE },
      { feature: 'Time until requests get handled', mamba: 'The day after import', them: 'Months' },
      { feature: F.log, mamba: true, them: true },
    ],
    bottomLine: 'Choose UKG if you run a large shift-based workforce that needs deep scheduling. Choose MambaHR if you want the HR admin done for your team, with you approving what matters.',
    costLine: 'One price per employee, per plan, from $14. Your data imports in a day.',
  },

  greenhouse: {
    slug: 'greenhouse',
    description: 'Greenhouse is a strong hiring tool that stops at the offer. MambaHR covers hiring, then onboarding, payroll changes and everyday HR admin for your new hire.',
    name: 'Greenhouse',
    tagline: 'MambaHR vs Greenhouse',
    heroHeadline: 'Greenhouse runs your hiring pipeline.\nMambaHR covers hiring and everything after the offer.',
    heroSub: 'Greenhouse is a strong hiring tool, with structured interviews, pipelines and reporting. It stops at the offer. MambaHR posts jobs with pay ranges, tracks applications, schedules interviews and drafts the offer inside your pay range for your approval. Then it onboards your new hire and keeps their record.',
    switchReasons: [
      {
        title: 'Hiring is where the admin starts.',
        desc: 'Greenhouse manages the pipeline up to the offer. Once the candidate says yes, you still need onboarding, payroll setup, compliance checks and an employee record. MambaHR does that too.',
      },
      {
        title: 'The hiring admin, handled.',
        desc: 'MambaHR posts the job with the pay range, collects applications in one pipeline, schedules interviews, orders background checks through Checkr and drafts the offer. Your team reviews every candidate and makes every hiring decision.',
      },
      {
        title: 'No handoff between systems.',
        desc: 'Greenhouse passes new hires to a separate HR system, which can mean typing data in twice. In MambaHR the candidate becomes an employee in the same record.',
      },
    ],
    tableRows: [
      { feature: 'Job posts, applications and interview scheduling', mamba: true, them: true, note: HIRING_NOTE },
      { feature: F.slack, mamba: true, them: 'Notifications only' },
      { feature: F.onboarding, mamba: true, them: 'Separate product' },
      { feature: F.records, mamba: true, them: 'Not included' },
      { feature: F.payroll, mamba: 'Change file, or Deel-managed', them: 'Not included', note: PAYROLL_NOTE },
      { feature: F.law, mamba: true, them: 'Equal opportunity (EEO) reporting only' },
      { feature: F.everyday, mamba: true, them: 'Not included' },
      { feature: F.setup, mamba: IMPORT_DAY, them: '2 to 4 weeks' },
    ],
    bottomLine: 'Greenhouse is a great hiring tool. MambaHR covers hiring and everything after it in one product, so there is no handoff.',
    costLine: 'Hiring comes with the HR Ops Manager plan and up, from $22 per employee, with employee records and onboarding in the same product.',
  },

  lever: {
    slug: 'lever',
    description: 'Lever helps recruiters find and follow up with candidates, and stops at the offer. MambaHR covers hiring, then onboarding and everyday HR admin for your team.',
    name: 'Lever',
    tagline: 'MambaHR vs Lever',
    heroHeadline: 'Lever helps your recruiters find candidates.\nMambaHR takes a hire from job post to first day.',
    heroSub: 'Lever pairs a hiring pipeline with tools to find candidates and keep in touch with them. It ends at the offer. MambaHR posts jobs with pay ranges, tracks applications, schedules interviews and drafts the offer inside your pay range for your approval. Then it onboards your new hire and handles their HR admin.',
    switchReasons: [
      {
        title: 'Hiring is one part of HR.',
        desc: 'Lever helps recruiters build a pipeline. Once someone is hired, onboarding, payroll setup and everyday HR requests land somewhere else. MambaHR handles hiring and the admin after it.',
      },
      {
        title: 'The hiring admin, handled.',
        desc: 'MambaHR posts the job, tracks applications, schedules interviews, orders background checks through Checkr and drafts the offer for your approval. Your team reviews candidates and makes every hiring decision.',
      },
      {
        title: 'No handoff to a separate records system.',
        desc: 'Lever passes new hires to another system, which can mean typing data in twice. In MambaHR the candidate becomes an employee in the same record.',
      },
    ],
    tableRows: [
      { feature: 'Job posts, applications and interview scheduling', mamba: true, them: true, note: HIRING_NOTE },
      { feature: F.slack, mamba: true, them: 'Notifications only' },
      { feature: F.onboarding, mamba: true, them: 'Not included' },
      { feature: F.records, mamba: true, them: 'Not included' },
      { feature: F.payroll, mamba: 'Change file, or Deel-managed', them: 'Not included', note: PAYROLL_NOTE },
      { feature: F.law, mamba: true, them: 'Equal opportunity (EEO) reporting only' },
      { feature: F.everyday, mamba: true, them: 'Not included' },
      { feature: F.setup, mamba: IMPORT_DAY, them: '2 to 4 weeks' },
    ],
    bottomLine: 'Lever is recruiting software done well. MambaHR covers hiring and the HR admin after it in one product, so there is no handoff.',
    costLine: 'Hiring comes with the HR Ops Manager plan and up, from $22 per employee, with employee records and onboarding in the same product.',
  },

  remote: {
    slug: 'remote',
    description: 'Remote employs and pays people in other countries for you. For your US team, MambaHR does the HR admin: leave, hiring, onboarding and compliance answers.',
    name: 'Remote',
    tagline: 'MambaHR vs Remote',
    heroHeadline: 'Remote employs and pays people across borders.\nMambaHR does the HR admin for your US team.',
    heroSub: 'Remote is an employer of record: it legally employs and pays people for you in other countries, and it pays contractors. For the team you employ in the US, MambaHR does the HR admin: leave, hiring, onboarding and compliance answers. You approve what matters.',
    switchReasons: [
      {
        title: 'Paying people abroad is a different job.',
        desc: 'Remote is built to employ and pay people across countries. Your US team needs federal and state leave rules, state compliance and onboarding that follows up for you. MambaHR does that.',
      },
      {
        title: 'Requests handled from Slack.',
        desc: 'Remote gives you HR forms to fill in. With MambaHR, employees ask in Slack and the admin gets done. The decisions that need a person come to you.',
      },
      {
        title: 'The day-to-day for your US team.',
        desc: 'Even with Remote paying people abroad, someone answers policy questions, prepares offers and files leave for your US team. MambaHR does that work.',
      },
    ],
    tableRows: [
      { feature: F.slack, mamba: true, them: 'Not included' },
      { feature: F.admin, mamba: true, them: 'Not included' },
      { feature: 'US leave: federal family leave (FMLA) and state rules', mamba: true, them: 'Basic only' },
      { feature: F.law, mamba: true, them: 'Focus on global employment' },
      { feature: 'Employing and paying people in other countries', mamba: 'Not included', them: true },
      { feature: 'Payroll for US employees', mamba: 'Change file, or Deel-managed', them: true, note: PAYROLL_NOTE },
      { feature: F.hiring, mamba: true, them: 'Not included', note: HIRING_NOTE },
      { feature: F.onboarding, mamba: true, them: 'Partial' },
      { feature: F.setup, mamba: IMPORT_DAY, them: '1 to 3 weeks' },
      { feature: F.log, mamba: true, them: 'Partial' },
    ],
    bottomLine: 'Remote is a good way to employ people in other countries. MambaHR does the HR admin for the team you employ in the US. You can use both.',
    costLine: 'Keep Remote for people abroad. For your US team, MambaHR is one price per employee, per plan, from $14.',
  },

  oyster: {
    slug: 'oyster',
    description: 'Oyster hires and pays people in other countries as employer of record. For your US team, MambaHR does the HR admin: leave, hiring, onboarding and compliance.',
    name: 'Oyster',
    tagline: 'MambaHR vs Oyster',
    heroHeadline: 'Oyster hires and pays people in other countries.\nMambaHR does the HR admin for your team at home.',
    heroSub: 'Oyster is an employer of record: it legally employs people for you in other countries and handles their pay. For the team you employ in the US, MambaHR does the HR admin: leave, hiring, onboarding and compliance answers. You approve what matters.',
    switchReasons: [
      {
        title: 'Hiring abroad is a different job from US HR.',
        desc: 'Oyster is built for hiring across borders. Your US team needs federal and state leave rules, state compliance and onboarding that follows up for you. MambaHR is built for that.',
      },
      {
        title: 'Requests handled, not just tracked.',
        desc: 'Oyster gives you a platform and checklists. With MambaHR, employees ask in Slack and the admin gets done. You approve what matters.',
      },
      {
        title: 'Someone still does the US admin.',
        desc: 'With Oyster handling people abroad, your US policy questions, offers and leave still land on a desk. MambaHR takes them off it.',
      },
    ],
    tableRows: [
      { feature: F.slack, mamba: true, them: 'Not included' },
      { feature: F.admin, mamba: true, them: 'Not included' },
      { feature: 'US leave: federal family leave (FMLA) and state rules', mamba: true, them: 'Basic only' },
      { feature: F.law, mamba: true, them: 'Focus on global employment' },
      { feature: 'Hiring people in other countries', mamba: 'Not included', them: true },
      { feature: 'Payroll for US employees', mamba: 'Change file, or Deel-managed', them: true, note: PAYROLL_NOTE },
      { feature: F.hiring, mamba: true, them: 'Global hiring only', note: HIRING_NOTE },
      { feature: F.onboarding, mamba: true, them: 'Partial' },
      { feature: F.setup, mamba: IMPORT_DAY, them: '1 to 3 weeks' },
      { feature: F.log, mamba: true, them: 'Partial' },
    ],
    bottomLine: 'Oyster is a good way to hire across borders. MambaHR does the HR admin for the team you employ at home. You can use both.',
    costLine: 'Keep Oyster for people abroad. For your US team, MambaHR is one price per employee, per plan, from $14.',
  },
}
