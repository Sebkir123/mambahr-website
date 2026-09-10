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

export const competitors: Record<string, CompetitorData> = {
  rippling: {
    slug: 'rippling',
    description: 'Rippling is the stack your HR org operates. MambaHR is the AI HR department that runs hiring, leave, onboarding and compliance itself, in one place.',
    name: 'Rippling',
    tagline: 'MambaHR vs Rippling',
    heroHeadline: 'Rippling is the stack.\nMambaHR is the department.',
    heroSub: "Rippling pulled HR, payroll, and IT under one roof, for your HR org to operate. MambaHR is a different shape entirely: a department that does the work itself, in one product.",
    switchReasons: [
      {
        title: "A platform doesn't shrink the work.",
        desc: "Rippling consolidated tools, not workload. Someone on your team still drafts the offer, files the leave, chases the compliance gap. MambaHR resolves the request before it ever lands on a desk.",
      },
      {
        title: 'One product. One bill. No upsell tree.',
        desc: 'HR Cloud, IT Cloud, Finance Cloud, Spend, Rippling prices each module separately, and the per-employee number adds up. MambaHR includes employee records, hiring, payroll changes, and every HR function in a single product.',
      },
      {
        title: 'Live within a day of importing.',
        desc: "Rippling deployments typically need a project plan. MambaHR doesn't. Import your people data, connect Slack, and MambaHR is handling requests the next day.",
      },
    ],
    tableRows: [
      { feature: 'Requests taken in Slack', mamba: true, them: 'Limited integration' },
      { feature: 'Does the HR request, start to finish', mamba: true, them: 'Not included' },
      { feature: 'AI screens and ranks candidates (advisory)', mamba: true, them: 'Not included' },
      { feature: 'Employment law, federal plus your states, statute cited', mamba: true, them: 'Rules-based alerts', note: 'Rippling flags issues; MambaHR resolves them' },
      { feature: 'Payroll', mamba: 'Change file, or Deel-managed', them: true, note: 'MambaHR prepares every change; a person approves every run' },
      { feature: 'Human approval on high-risk decisions', mamba: true, them: 'Manual process' },
      { feature: 'IT & device management', mamba: 'Not included', them: true },
      { feature: 'Typical setup time', mamba: '1 day to import', them: 'Weeks to months' },
      { feature: 'One unified product (no module sprawl)', mamba: true, them: 'Modular pricing' },
      { feature: 'Every action audit-logged', mamba: true, them: true },
    ],
    bottomLine: "Rippling is the modern HR stack. MambaHR is the modern HR department, the work, done.",
    costLine: "Most teams pay MambaHR less than their Rippling module tree, and it does the work instead of hosting it. From $14 per employee.",
  },

  gusto: {
    slug: 'gusto',
    description: 'Gusto is clean payroll for small teams. The rest of HR, leave, hires, onboarding, policy and compliance, still hits your inbox. MambaHR clears that inbox.',
    name: 'Gusto',
    tagline: 'MambaHR vs Gusto',
    heroHeadline: 'Gusto handles payday.\nMambaHR handles every other day.',
    heroSub: "Gusto is the cleanest payroll on the market for small teams. The other twelve things HR does, leave, hires, onboarding, policy, compliance, still hit your inbox. MambaHR clears the inbox.",
    switchReasons: [
      {
        title: 'Payroll is one job. HR is twelve.',
        desc: "Gusto handles payroll. The rest, leave requests, offer letters, leave eligibility, onboarding tasks, terminations, still lands on someone's desk. Ask MambaHR in Slack and the work is done in seconds.",
      },
      {
        title: "Knows tax law. Doesn't know employment law.",
        desc: "Gusto nailed payroll tax compliance. It can't tell you whether Maya qualifies for federal family leave (FMLA), or what New York's pay transparency rule requires. MambaHR can, with the statute cited.",
      },
      {
        title: 'Gusto plus four more tools. Or just MambaHR.',
        desc: "Most Gusto customers also pay for an ATS, an onboarding platform, a document tool, and a policy doc somewhere. MambaHR consolidates all of them, one product, one bill.",
      },
    ],
    tableRows: [
      { feature: 'Requests taken in Slack', mamba: true, them: 'Not included' },
      { feature: 'Does the HR request, start to finish', mamba: true, them: 'Not included' },
      { feature: 'Employment law, federal plus your states, statute cited', mamba: true, them: 'Payroll tax compliance only' },
      { feature: 'Payroll', mamba: 'Change file, or Deel-managed', them: true, note: 'MambaHR prepares every change; a person approves every run' },
      { feature: 'Benefits administration', mamba: 'Only the health-coverage continuation (COBRA) notice at exit', them: true },
      { feature: 'Hiring and recruiting automation', mamba: true, them: 'Basic job posting only' },
      { feature: 'Full onboarding automation', mamba: true, them: 'Checklists only' },
      { feature: 'Typical setup time', mamba: '1 day to import', them: '1–2 weeks' },
      { feature: 'Every decision logged and traceable', mamba: true, them: 'Partial' },
    ],
    bottomLine: 'Gusto is great payroll. MambaHR is everything else, and it gets your payroll ready. One product. One team. One bill.',
    costLine: "Your Gusto history imports in a day. MambaHR feeds the change file to whichever payroll provider you keep, or runs managed payroll on Deel. It does the other twelve jobs, from $14 per employee.",
  },

  deel: {
    slug: 'deel',
    description: 'Deel cracked global contractor pay and employer of record (EOR). For the people you employ in the US, MambaHR is the AI HR department: leave, hiring, onboarding and compliance.',
    name: 'Deel',
    tagline: 'MambaHR vs Deel',
    heroHeadline: 'Deel is global payroll and employer of record.\nMambaHR is the HR department.',
    heroSub: "Deel is a global payroll and employer-of-record (EOR) vendor. For the US team you employ, MambaHR is the AI HR department: leave, hires, onboarding, and compliance in one product. It uses Deel to run payroll.",
    switchReasons: [
      {
        title: "Contractors aren't employees.",
        desc: "Deel optimized for global contractors and EOR. Your full-time team needs something different, US leave management, multi-state compliance, onboarding that runs without chasing. That's MambaHR.",
      },
      {
        title: "Forms aren't automation.",
        desc: "Deel added HR features as forms and checklists. Someone still has to fill them in. MambaHR does the request, start to finish, no dashboard, no ticket, no waiting.",
      },
      {
        title: "Deel doesn't handle the day-to-day.",
        desc: "Even with Deel running payroll, someone still answers the policy questions, runs the offer process, files the leave. MambaHR does that work and sends the payroll changes to Deel for you.",
      },
    ],
    tableRows: [
      { feature: 'Requests taken in Slack', mamba: true, them: 'Not included' },
      { feature: 'Does the HR request, start to finish', mamba: true, them: 'Not included' },
      { feature: 'US leave (federal family leave under FMLA, plus state laws)', mamba: true, them: 'Basic only' },
      { feature: 'US employment law, federal plus your states, statute cited', mamba: true, them: 'Global contractor focus' },
      { feature: 'Global contractor & EOR payments', mamba: 'Not included', them: true },
      { feature: 'Payroll, domestic full-time', mamba: 'Deel-managed, or a change file', them: true, note: 'MambaHR sends the changes to Deel; a person approves every run' },
      { feature: 'Hiring and recruiting automation', mamba: true, them: 'Not included' },
      { feature: 'Full onboarding automation', mamba: true, them: 'Partial' },
      { feature: 'Human approval on key decisions', mamba: true, them: 'Manual process' },
      { feature: 'Typical setup time', mamba: '1 day to import', them: '1–3 weeks' },
      { feature: 'Audit log on every action', mamba: true, them: 'Partial' },
    ],
    bottomLine: "Deel is the way to pay anyone, anywhere. MambaHR is the way to run the people on your US payroll, and it can run that payroll on Deel. Different problems, and they fit together.",
    costLine: "Keep Deel for global contractors and EOR. For the team on your US payroll, MambaHR runs the whole department from $14 per employee, with Deel-managed payroll as an option.",
  },

  bamboohr: {
    slug: 'bamboohr',
    description: 'BambooHR keeps records clean, but every action still needs a human to open the system and do the work. MambaHR is the AI HR department that does the work.',
    name: 'BambooHR',
    tagline: 'MambaHR vs BambooHR',
    heroHeadline: 'BambooHR is a database.\nMambaHR is the department.',
    heroSub: "BambooHR keeps your records clean and your processes documented, useful work. But every action still requires a human to open the system, find the thing, and do the work. MambaHR does the work.",
    switchReasons: [
      {
        title: "A record system isn't a department.",
        desc: "BambooHR stores Maya's record. When she asks about adoption leave, someone still has to open the policy doc, check eligibility, and write back. MambaHR replies in Slack in seconds, with the statute attached.",
      },
      {
        title: "A checklist isn't the work.",
        desc: "BambooHR's onboarding flows still need someone to trigger them, monitor them, and chase the laggards. MambaHR runs them top to bottom, no one watching, nothing dropped.",
      },
      {
        title: "Stores compliance. Doesn't reason about it.",
        desc: "BambooHR holds your policies. MambaHR checks family leave (FMLA) eligibility and cites the pay transparency rule for each state you hire in. It sends the ambiguous calls to a person.",
      },
    ],
    tableRows: [
      { feature: 'Requests taken in Slack', mamba: true, them: 'Not included' },
      { feature: 'Does the HR request, start to finish', mamba: true, them: 'Not included' },
      { feature: 'Employment law, federal plus your states, statute cited', mamba: true, them: 'Not included' },
      { feature: 'Payroll', mamba: 'Change file, or Deel-managed', them: true, note: 'MambaHR prepares every change; a person approves every run' },
      { feature: 'Hiring, run for you', mamba: true, them: 'Basic ATS included' },
      { feature: 'Employee self-service via chat', mamba: true, them: 'Portal only' },
      { feature: 'Performance review system', mamba: 'Not included', them: true },
      { feature: 'Typical setup time', mamba: '1 day to import', them: '2–4 weeks' },
      { feature: 'Scales with you', mamba: true, them: true },
      { feature: 'Audit log on every action', mamba: true, them: 'Partial' },
    ],
    bottomLine: 'BambooHR is where your HR data lives. MambaHR is where the work gets done.',
    costLine: "For roughly what BambooHR charges to store the work, MambaHR does the work. From $14 per employee, everything included.",
  },

  namely: {
    slug: 'namely',
    description: 'Namely bundles HR records, payroll and benefits into software your HR org operates. MambaHR is a department that handles leave, hiring and compliance itself.',
    name: 'Namely',
    tagline: 'MambaHR vs Namely',
    heroHeadline: 'Namely made the HRIS prettier.\nMambaHR makes it unnecessary.',
    heroSub: "Namely brought HR records (HRIS), payroll, and benefits into one capable platform. It's still software your HR org operates. MambaHR is the next category: a department that handles leave, hiring, compliance, and the everyday HR requests on its own.",
    switchReasons: [
      {
        title: "A cleaner UI doesn't mean less work.",
        desc: "Namely made the HRIS more usable. The work didn't shrink. Every request still flows to someone's queue. MambaHR resolves the request before it gets there.",
      },
      {
        title: 'Rules that apply themselves.',
        desc: "Namely's approval routing, eligibility rules, and configurations need ongoing HR attention. Set the policy once; MambaHR applies it and logs every exception.",
      },
      {
        title: 'Compliance that reasons, with a citation.',
        desc: "Namely tracks the data. MambaHR reasons about it: family leave (FMLA) eligibility, pay transparency across states, final-pay timing. It resolves the clear ones and sends the rest to a person.",
      },
    ],
    tableRows: [
      { feature: 'Requests taken in Slack', mamba: true, them: 'Not included' },
      { feature: 'Does the HR request, start to finish', mamba: true, them: 'Not included' },
      { feature: 'Employment law, federal plus your states, statute cited', mamba: true, them: 'Not included' },
      { feature: 'Payroll', mamba: 'Change file, or Deel-managed', them: true, note: 'MambaHR prepares every change; a person approves every run' },
      { feature: 'Benefits administration', mamba: 'Only the health-coverage continuation (COBRA) notice at exit', them: true },
      { feature: 'Hiring and recruiting automation', mamba: true, them: 'Basic ATS' },
      { feature: 'Human approval on key decisions', mamba: true, them: 'Manual process' },
      { feature: 'Typical setup time', mamba: '1 day to import', them: '4–8 weeks' },
      { feature: 'Self-managing once deployed', mamba: true, them: 'Requires HR ops to operate' },
      { feature: 'Audit log on every action', mamba: true, them: 'Partial' },
    ],
    bottomLine: 'Namely is the HR records system at its cleanest. MambaHR is the next category, an HR department that does the work.',
    costLine: "No modules, no implementation retainer. MambaHR is $14–$30 per employee with everything included.",
  },

  hibob: {
    slug: 'hibob',
    description: 'HiBob is a modern HR system employees like, still operated by your HR org. MambaHR does the HR work itself: leave, hiring, onboarding and compliance.',
    name: 'HiBob',
    tagline: 'MambaHR vs HiBob',
    heroHeadline: 'HiBob made HR look modern.\nMambaHR makes it do the work.',
    heroSub: "HiBob nailed the modern HR records system (HRIS): clean interface, strong engagement features, employees like using it. Underneath, it's still software your HR org operates. MambaHR does the work, instead of showing it on a screen.",
    switchReasons: [
      {
        title: "Pretty doesn't mean automated.",
        desc: "HiBob's interface is the best in the category. Doesn't matter, every leave request, policy question, and onboarding step still needs someone to act on it. MambaHR resolves them without anyone opening the app.",
      },
      {
        title: 'Data without action is just data.',
        desc: "HiBob shows you engagement scores, org charts, headcount trends. MambaHR uses that data, auto-approves leave within policy, drafts offers within band, prices raises against your ranges.",
      },
      {
        title: 'US compliance, not bolted on.',
        desc: "HiBob is global-first, with US compliance as one of many. MambaHR is US-first, with federal family leave (FMLA), multi-state pay transparency, and final-pay timing baked in from day one.",
      },
    ],
    tableRows: [
      { feature: 'Requests taken in Slack', mamba: true, them: 'Limited integration' },
      { feature: 'Does the HR request, start to finish', mamba: true, them: 'Not included' },
      { feature: 'US employment law, federal plus your states, statute cited', mamba: true, them: 'Not included' },
      { feature: 'Payroll', mamba: 'Change file, or Deel-managed', them: true, note: 'MambaHR prepares every change; a person approves every run' },
      { feature: 'Employee engagement & surveys', mamba: 'Not included', them: true },
      { feature: 'Employee record storage', mamba: true, them: true },
      { feature: 'Global HR support', mamba: 'US-first', them: true },
      { feature: 'Hiring automation', mamba: true, them: 'Basic' },
      { feature: 'Human approval on key decisions', mamba: true, them: 'Manual process' },
      { feature: 'Typical setup time', mamba: '1 day to import', them: '2–6 weeks' },
      { feature: 'Audit log on every action', mamba: true, them: 'Partial' },
    ],
    bottomLine: 'HiBob is a great HR system for the modern workplace. MambaHR is the next thing after it: the department that does the work.',
    costLine: "HiBob prices like a records system. MambaHR prices like the work, not the seat, $14–$30 per employee, all in.",
  },

  adp: {
    slug: 'adp',
    description: 'ADP is a comprehensive platform built for HR professionals to operate. MambaHR is the AI HR department that handles requests, compliance and hiring itself.',
    name: 'ADP',
    tagline: 'MambaHR vs ADP',
    heroHeadline: 'ADP is the system of record.\nMambaHR is the system of work.',
    heroSub: "ADP runs payroll, benefits, and HR administration for tens of thousands of companies. It's a comprehensive platform, for HR professionals to operate. MambaHR is a different shape: a department that does the requests, the compliance, and the hiring before anyone opens a ticket.",
    switchReasons: [
      {
        title: 'A platform vs. a department.',
        desc: "ADP gives your HR organization a comprehensive platform to manage. MambaHR is the department and the record in one. Leave, onboarding, compliance, and hiring all happen with a person on the calls that matter.",
      },
      {
        title: "Employees shouldn't need a portal.",
        desc: "ADP routes through HR admins and self-service portals. With MambaHR, employees ask in Slack and get the answer in seconds. No portal, no ticket, no waiting.",
      },
      {
        title: 'AI was the foundation, not the upgrade.',
        desc: "ADP is layering AI features onto established platforms. MambaHR was built to do the HR work itself. That is the product, not a sidebar widget.",
      },
    ],
    tableRows: [
      { feature: 'Requests taken in Slack', mamba: true, them: 'Not included' },
      { feature: 'Does the HR request, start to finish', mamba: true, them: 'Not included' },
      { feature: 'Employment law, federal plus your states, statute cited', mamba: true, them: 'Payroll tax compliance' },
      { feature: 'Payroll', mamba: 'Change file, or Deel-managed', them: true, note: 'MambaHR prepares every change; a person approves every run' },
      { feature: 'Benefits administration', mamba: 'Only the health-coverage continuation (COBRA) notice at exit', them: true },
      { feature: 'Designed to be self-managing', mamba: true, them: 'Requires HR & IT operators' },
      { feature: 'Employee self-service', mamba: 'Slack / chat', them: 'Portal only' },
      { feature: 'Hiring automation', mamba: true, them: 'Available as add-on' },
      { feature: 'Human approval on key decisions', mamba: true, them: 'Manual process' },
      { feature: 'Typical setup time', mamba: '1 day to import', them: '4–12 weeks' },
      { feature: 'Audit log on every action', mamba: true, them: true },
    ],
    bottomLine: 'ADP is the back office of HR. MambaHR is the front line: it talks to your employees, does the work, and sends only the judgment calls to you.',
    costLine: "ADP bills like the back office it is. MambaHR is $14–$30 per employee, flat, no modules, no add-ons, no surprise invoices.",
  },

  workday: {
    slug: 'workday',
    description: 'Workday is the enterprise HR suite run by a department of admins. MambaHR is a department that does the HR work, live the day you sign, with audit depth.',
    name: 'Workday',
    tagline: 'MambaHR vs Workday',
    heroHeadline: 'Workday is software you implement.\nMambaHR is a department you turn on.',
    heroSub: "Workday is the standard enterprise HR suite (HCM): vast, configurable, operated by a department of admins. MambaHR is a different shape entirely: a department that does the work. Your data imports in a day, with the compliance and audit depth you would expect at scale.",
    switchReasons: [
      {
        title: 'A platform to run vs. a department that runs.',
        desc: "Workday gives your HR org a configurable platform. MambaHR gives you the work, done, requests resolved, policies applied, judgment calls escalated. No admins required.",
      },
      {
        title: 'Workday is a project. MambaHR is a product.',
        desc: 'Most Workday deployments run several months to over a year, often with a systems integrator. MambaHR imports your data in a day and is handling requests the next.',
      },
      {
        title: 'AI was the foundation, not the upgrade.',
        desc: "Workday is layering AI features onto a platform launched in 2005. MambaHR was built to do the work itself. That is the product, not a feature added on top.",
      },
    ],
    tableRows: [
      { feature: 'Requests taken in Slack', mamba: true, them: 'Limited integrations' },
      { feature: 'Does the HR request, start to finish', mamba: true, them: 'AI assistant features' },
      { feature: 'Time until it is doing the work', mamba: '1 day to import', them: 'Months' },
      { feature: 'Designed to be self-managing', mamba: true, them: 'Requires HR & IT operators' },
      { feature: 'Employment law, federal plus your states, statute cited', mamba: true, them: true },
      { feature: 'Payroll', mamba: 'Change file, or Deel-managed', them: true, note: 'MambaHR prepares every change; a person approves every run' },
      { feature: 'Human sign-off on high-risk decisions', mamba: true, them: 'Configurable, run by your admins' },
      { feature: 'Financial management (ERP)', mamba: 'Not included', them: true, note: 'Workday strength: HR and finance in one' },
      { feature: 'Multi-country global payroll', mamba: 'US-first', them: true },
      { feature: 'Audit log on every action', mamba: true, them: true },
    ],
    bottomLine: "Workday is the right answer when you need finance, HR, and global operations under one configurable platform. MambaHR is the right answer when you want the HR work done, not hosted.",
    costLine: "A Workday implementation can cost more than a decade of MambaHR. We're $14–$30 per employee, with your data imported in a day.",
  },

  justworks: {
    slug: 'justworks',
    description: 'Justworks is a co-employer (PEO) plus support reps. MambaHR is the AI HR department that does the work in Slack, with no co-employment and no ticket queue.',
    name: 'Justworks',
    tagline: 'MambaHR vs Justworks',
    heroHeadline: 'Justworks gives you a support queue.\nMambaHR gives you the answer.',
    heroSub: "Justworks is a PEO: it puts your staff on its own tax ID, and you lean on its support reps for the hard questions. MambaHR is the AI HR department: the work gets done in Slack, no co-employment, no shared liability, no waiting on a ticket queue.",
    switchReasons: [
      {
        title: 'No co-employment. Your company, your own tax ID.',
        desc: "A PEO puts your employees on its own tax ID and shares legal liability for them. MambaHR doesn't touch your employment relationship, you stay the employer of record, and MambaHR handles the administrative work.",
      },
      {
        title: 'Answers in seconds, not a support queue.',
        desc: "Justworks routes the hard questions to a human support team. MambaHR answers in Slack instantly, with a citation: family leave (FMLA) eligibility, final-pay timing, pay transparency. Only the genuine judgment calls come to you.",
      },
      {
        title: 'You keep your benefits broker.',
        desc: "PEOs bundle benefits into the package, so leaving means re-shopping coverage. MambaHR does not administer benefits, so your broker and your plans stay exactly where they are.",
      },
    ],
    tableRows: [
      { feature: 'Requests taken in Slack', mamba: true, them: 'Limited integration' },
      { feature: 'Does the HR request, start to finish', mamba: true, them: 'Human support team' },
      { feature: 'Co-employment / shared liability', mamba: 'None, you stay the employer', them: 'PEO co-employment model' },
      { feature: 'Employment law, federal plus your states, statute cited', mamba: true, them: 'Support-assisted' },
      { feature: 'Payroll', mamba: 'Change file, or Deel-managed', them: true, note: 'MambaHR prepares every change; a person approves every run' },
      { feature: 'Benefits', mamba: 'Keep your own broker', them: 'PEO-bundled plans' },
      { feature: 'Hiring and recruiting automation', mamba: true, them: 'Not included' },
      { feature: 'Full onboarding automation', mamba: true, them: 'Checklists only' },
      { feature: 'Human approval on high-risk decisions', mamba: true, them: 'Manual process' },
      { feature: 'Typical setup time', mamba: '1 day to import', them: '2–4 weeks' },
      { feature: 'Audit log on every action', mamba: true, them: 'Partial' },
    ],
    bottomLine: "Justworks is a good PEO if you want bundled benefits and a support team to call. MambaHR is what you turn on when you want the HR work itself done, without handing over your employment relationship.",
    costLine: "PEOs bundle their margin into your benefits. MambaHR is a flat $14–$30 per employee, no co-employment, no markup on coverage.",
  },

  trinet: {
    slug: 'trinet',
    description: 'TriNet co-employs your team and assigns an HR service rep. MambaHR is the AI HR department that does the administrative work directly, with no co-employment.',
    name: 'TriNet',
    tagline: 'MambaHR vs TriNet',
    heroHeadline: 'TriNet is a co-employer with a service rep.\nMambaHR is the department itself.',
    heroSub: "TriNet is a PEO: it puts your staff on its own tax ID and assigns you bundled benefits and an HR service rep. MambaHR is a different shape entirely: the AI HR department that does the administrative work directly, with no co-employment and no ticket queue.",
    switchReasons: [
      {
        title: 'Keep your own tax ID and your independence.',
        desc: "TriNet's PEO model puts your people on its tax ID and shares employer liability. MambaHR leaves your employment relationship untouched and runs the admin work, no co-employment to unwind later.",
      },
      {
        title: 'The rep model has a queue. MambaHR does not.',
        desc: "TriNet assigns a service rep for the complex questions. MambaHR answers in Slack the moment the question is asked: leave eligibility, multi-state rules, classification. Only the real judgment calls come to you.",
      },
      {
        title: 'No re-pricing your benefits to leave.',
        desc: "Because PEO benefits are bundled, switching off TriNet usually means re-shopping coverage. MambaHR does not administer benefits: keep your plans and broker, and they keep running them.",
      },
    ],
    tableRows: [
      { feature: 'Requests taken in Slack', mamba: true, them: 'Not included' },
      { feature: 'Does the HR request, start to finish', mamba: true, them: 'Assigned service rep' },
      { feature: 'Co-employment / shared liability', mamba: 'None, you stay the employer', them: 'PEO co-employment model' },
      { feature: 'Employment law, federal plus your states, statute cited', mamba: true, them: 'Rep-assisted' },
      { feature: 'Payroll', mamba: 'Change file, or Deel-managed', them: true, note: 'MambaHR prepares every change; a person approves every run' },
      { feature: 'Benefits', mamba: 'Keep your own broker', them: 'PEO-bundled plans' },
      { feature: 'Hiring and recruiting automation', mamba: true, them: 'Not included' },
      { feature: 'Full onboarding automation', mamba: true, them: 'Rep-assisted' },
      { feature: 'Human approval on high-risk decisions', mamba: true, them: 'Manual process' },
      { feature: 'Typical setup time', mamba: '1 day to import', them: '4–8 weeks' },
      { feature: 'Audit log on every action', mamba: true, them: 'Partial' },
    ],
    bottomLine: "TriNet is a capable PEO if co-employment and bundled benefits suit you. MambaHR is the AI department that does the work: your tax ID, your benefits, no shared liability.",
    costLine: "TriNet prices as a percentage of payroll with benefits baked in. MambaHR is flat, $14–$30 per employee, your coverage stays yours.",
  },

  paychex: {
    slug: 'paychex',
    description: 'Paychex sells payroll and HR services module by module, with a rep on the phone. MambaHR is one product that resolves requests, runs compliance and preps pay.',
    name: 'Paychex',
    tagline: 'MambaHR vs Paychex',
    heroHeadline: 'Paychex runs payroll and sells you services.\nMambaHR does the HR work.',
    heroSub: "Paychex is decades-deep in payroll and add-on HR services, sold module by module with a rep on the phone. MambaHR is the AI HR department: one product that resolves the requests, runs compliance, and prepares every payroll change. Your data imports in a day.",
    switchReasons: [
      {
        title: 'One product, not a menu of add-ons.',
        desc: "Paychex prices HR services, time tracking, and compliance help as separate lines, each with its own fee. MambaHR includes employee records, hiring, onboarding, compliance, and every HR function in a single flat price.",
      },
      {
        title: 'Self-service that serves itself.',
        desc: "Paychex Flex routes employees through a portal and HR through a rep. With MambaHR, employees ask in Slack and get the answer in seconds, no portal, no phone tree, no ticket.",
      },
      {
        title: 'Compliance that reasons, not just reports.',
        desc: "Paychex flags payroll-tax issues. MambaHR reasons about employment law: family leave (FMLA) eligibility, final-pay timing, multi-state pay transparency. It cites the statute and sends the ambiguous calls to a person.",
      },
    ],
    tableRows: [
      { feature: 'Requests taken in Slack', mamba: true, them: 'Not included' },
      { feature: 'Does the HR request, start to finish', mamba: true, them: 'Not included' },
      { feature: 'Employment law, federal plus your states, statute cited', mamba: true, them: 'Payroll-tax + add-on services' },
      { feature: 'Payroll', mamba: 'Change file, or Deel-managed', them: true, note: 'MambaHR prepares every change; a person approves every run' },
      { feature: 'Benefits administration', mamba: 'Only the health-coverage continuation (COBRA) notice at exit', them: true },
      { feature: 'Hiring and recruiting automation', mamba: true, them: 'Add-on module' },
      { feature: 'Full onboarding automation', mamba: true, them: 'Add-on module' },
      { feature: 'Pricing model', mamba: 'One flat per-employee price', them: 'Per-module fees' },
      { feature: 'Human approval on high-risk decisions', mamba: true, them: 'Manual process' },
      { feature: 'Typical setup time', mamba: '1 day to import', them: '2–6 weeks' },
      { feature: 'Audit log on every action', mamba: true, them: 'Partial' },
    ],
    bottomLine: "Paychex is reliable payroll with services bolted on. MambaHR is the HR department that does the work, one product, one bill, and it feeds your payroll.",
    costLine: "Paychex's add-ons stack up fast. MambaHR is one flat number, $14–$30 per employee, everything included.",
  },

  zenefits: {
    slug: 'zenefits',
    description: 'Zenefits (now part of TriNet) packaged HR, benefits and payroll into software your team clicks through. MambaHR resolves the request before a dashboard opens.',
    name: 'Zenefits',
    tagline: 'MambaHR vs Zenefits',
    heroHeadline: 'Zenefits gave you the dashboard.\nMambaHR does the work behind it.',
    heroSub: "Zenefits (now part of TriNet) packaged HR, benefits, and payroll into one tidy small-business platform. It's still software your team operates click by click. MambaHR resolves the request before anyone opens a dashboard.",
    switchReasons: [
      {
        title: 'A dashboard still needs someone to drive it.',
        desc: "Zenefits made HR admin tidier, but every leave request, onboarding step, and policy question still needs a human to log in and act. MambaHR resolves them in Slack without anyone opening the app.",
      },
      {
        title: 'Built to do the work, not bolted onto a portal.',
        desc: "Zenefits is a self-service portal with checklists. MambaHR is a department that does the work itself. That is the product, not a feature added to a dashboard.",
      },
      {
        title: 'Compliance reasoning, not just record-keeping.',
        desc: "Zenefits stores your policies and tracks deadlines. MambaHR checks family leave (FMLA) eligibility, cites the pay transparency rule for each state, and sends the ambiguous calls to a person.",
      },
    ],
    tableRows: [
      { feature: 'Requests taken in Slack', mamba: true, them: 'Not included' },
      { feature: 'Does the HR request, start to finish', mamba: true, them: 'Not included' },
      { feature: 'Employment law, federal plus your states, statute cited', mamba: true, them: 'Tracking + alerts' },
      { feature: 'Payroll', mamba: 'Change file, or Deel-managed', them: 'Add-on', note: 'MambaHR prepares every change; a person approves every run' },
      { feature: 'Benefits administration', mamba: 'Only the health-coverage continuation (COBRA) notice at exit', them: true },
      { feature: 'Hiring and recruiting automation', mamba: true, them: 'Basic' },
      { feature: 'Full onboarding automation', mamba: true, them: 'Checklists only' },
      { feature: 'Employee self-service', mamba: 'Slack / chat', them: 'Portal only' },
      { feature: 'Human approval on high-risk decisions', mamba: true, them: 'Manual process' },
      { feature: 'Typical setup time', mamba: '1 day to import', them: '1–3 weeks' },
      { feature: 'Audit log on every action', mamba: true, them: 'Partial' },
    ],
    bottomLine: "Zenefits is a clean small-business HR dashboard. MambaHR is the next category: it does the work the dashboard only organizes.",
    costLine: "For roughly what Zenefits charges to organize the work, MambaHR does it. From $14 per employee, everything included.",
  },

  paylocity: {
    slug: 'paylocity',
    description: 'Paylocity is a mid-market HR suite your HR org runs screen by screen. MambaHR is a department that handles requests, compliance and hiring without an admin.',
    name: 'Paylocity',
    tagline: 'MambaHR vs Paylocity',
    heroHeadline: 'Paylocity is a suite to operate.\nMambaHR does the operating.',
    heroSub: "Paylocity is a capable mid-market HR suite (HCM): payroll, benefits, talent, and workforce management your HR org runs. MambaHR is a different shape: a department that does the requests, the compliance, and the hiring without an admin behind every screen.",
    switchReasons: [
      {
        title: 'A suite to configure vs. a department that runs.',
        desc: "Paylocity gives your HR team modules to configure and operate. MambaHR gives you the work done, requests resolved, policies applied, judgment calls escalated, no module administration required.",
      },
      {
        title: 'Employees ask in Slack, not a portal.',
        desc: "Paylocity routes self-service through its app and community feed. MambaHR answers in Slack instantly, with a citation, and only the delicate decisions reach your human.",
      },
      {
        title: 'Live in a day, not an implementation cycle.',
        desc: "Paylocity rollouts run weeks with an implementation consultant. MambaHR imports your data in a day and is handling requests the next.",
      },
    ],
    tableRows: [
      { feature: 'Requests taken in Slack', mamba: true, them: 'Limited integration' },
      { feature: 'Does the HR request, start to finish', mamba: true, them: 'AI assistant features' },
      { feature: 'Employment law, federal plus your states, statute cited', mamba: true, them: true },
      { feature: 'Payroll', mamba: 'Change file, or Deel-managed', them: true, note: 'MambaHR prepares every change; a person approves every run' },
      { feature: 'Benefits & workforce management', mamba: 'Not included', them: true },
      { feature: 'Hiring and recruiting automation', mamba: true, them: 'Module included' },
      { feature: 'Designed to be self-managing', mamba: true, them: 'Requires HR ops to operate' },
      { feature: 'Employee self-service', mamba: 'Slack / chat', them: 'App + portal' },
      { feature: 'Typical setup time', mamba: '1 day to import', them: '4–8 weeks' },
      { feature: 'Human approval on high-risk decisions', mamba: true, them: 'Configurable, run by your admins' },
      { feature: 'Audit log on every action', mamba: true, them: true },
    ],
    bottomLine: "Paylocity is a solid HR suite for an HR team to run. MambaHR is the department that does the running, with your data imported in a day.",
    costLine: "Paylocity prices per module with an implementation fee. MambaHR is flat, $14–$30 per employee.",
  },

  ukg: {
    slug: 'ukg',
    description: 'UKG is deep workforce management for large shift-heavy teams, run by a team. MambaHR is the AI HR department, live the day you sign, with audit depth built in.',
    name: 'UKG',
    tagline: 'MambaHR vs UKG',
    heroHeadline: 'UKG is enterprise workforce software.\nMambaHR is the department you turn on.',
    heroSub: "UKG (Ready and Pro) is deep on workforce management and HR (HCM) for large, shift-heavy organizations: powerful, configurable, operated by a team. MambaHR is a different category: the AI HR department. Your data imports in a day, with the compliance and audit depth you would expect at scale.",
    switchReasons: [
      {
        title: 'A platform to implement vs. a department that runs.',
        desc: "UKG gives a large HR and ops team a configurable platform to operate. MambaHR gives you the work done, leave, onboarding, compliance, hiring, without an admin behind every screen.",
      },
      {
        title: 'Months of implementation, or live tomorrow.',
        desc: "UKG deployments typically run months, often with an integrator. MambaHR imports your data in a day and is handling requests the next.",
      },
      {
        title: 'AI was the foundation, not a later release.',
        desc: "UKG is layering AI onto mature workforce platforms. MambaHR was built to do the HR work itself. That is the product, not a feature added on top.",
      },
    ],
    tableRows: [
      { feature: 'Requests taken in Slack', mamba: true, them: 'Limited integrations' },
      { feature: 'Does the HR request, start to finish', mamba: true, them: 'AI assistant features' },
      { feature: 'Employment law, federal plus your states, statute cited', mamba: true, them: true },
      { feature: 'Payroll', mamba: 'Change file, or Deel-managed', them: true, note: 'MambaHR prepares every change; a person approves every run' },
      { feature: 'Time, attendance & scheduling', mamba: 'Not included', them: true, note: 'UKG strength: shift workforce management' },
      { feature: 'Designed to be self-managing', mamba: true, them: 'Requires HR & ops operators' },
      { feature: 'Hiring and recruiting automation', mamba: true, them: 'Module included' },
      { feature: 'Time until it is doing the work', mamba: '1 day to import', them: 'Months' },
      { feature: 'Human approval on high-risk decisions', mamba: true, them: 'Configurable, run by your admins' },
      { feature: 'Audit log on every action', mamba: true, them: true },
    ],
    bottomLine: "UKG is the right answer when you run a large, shift-based workforce that needs deep scheduling. MambaHR is the right answer when you want the HR department itself to run.",
    costLine: "A UKG implementation is a capital project. MambaHR is $14–$30 per employee, with your data imported in a day.",
  },

  greenhouse: {
    slug: 'greenhouse',
    description: 'Greenhouse is a strong applicant tracking system that stops at the offer. MambaHR screens candidates, then onboards, pays and manages the person you hired.',
    name: 'Greenhouse',
    tagline: 'MambaHR vs Greenhouse',
    heroHeadline: 'Greenhouse is an applicant tracking system.\nMambaHR hires, then runs the rest.',
    heroSub: "Greenhouse is a strong applicant tracking system (ATS): structured interviews, pipelines, reporting. But it stops at the offer. MambaHR screens and ranks candidates and drafts the offer. Then it onboards, pays, and manages the person you hired, in one product.",
    switchReasons: [
      {
        title: 'Recruiting is the first mile, not the journey.',
        desc: "Greenhouse manages the pipeline to the offer. The moment the candidate says yes, you still need onboarding, payroll setup, compliance, and an employee record. MambaHR does recruiting and everything after it.",
      },
      {
        title: 'AI that screens and ranks, not just tracks.',
        desc: "Greenhouse organizes your funnel; humans still screen résumés. MambaHR screens and ranks candidates against the role, advisory only, and drafts the offer in band. Interview scheduling is coming.",
      },
      {
        title: 'One system of record, not a handoff.',
        desc: "Greenhouse hands the new hire to a separate records system, with the usual data re-entry and dropped fields. MambaHR is the system of record, the candidate becomes an employee with nothing re-keyed.",
      },
    ],
    tableRows: [
      { feature: 'Applicant tracking & structured interviews', mamba: true, them: true },
      { feature: 'AI screens and ranks candidates (advisory)', mamba: true, them: 'Limited' },
      { feature: 'Requests taken in Slack', mamba: true, them: 'Notifications only' },
      { feature: 'Full onboarding automation', mamba: true, them: 'Not included' },
      { feature: 'Employee records (the system of record)', mamba: true, them: 'Not included' },
      { feature: 'Payroll', mamba: 'Change file, or Deel-managed', them: 'Not included', note: 'MambaHR prepares every change; a person approves every run' },
      { feature: 'Employment law, federal plus your states, statute cited', mamba: true, them: 'EEOC reporting only' },
      { feature: 'Leave, compensation & the everyday HR work', mamba: true, them: 'Not included' },
      { feature: 'Human approval on key decisions', mamba: true, them: 'Manual process' },
      { feature: 'Typical setup time', mamba: '1 day to import', them: '2–4 weeks' },
    ],
    bottomLine: "Greenhouse is a great way to run hiring. MambaHR runs hiring and the entire employee lifecycle after it, one product, no handoff.",
    costLine: "Greenhouse is one tool in the stack. MambaHR replaces the ATS and the records system, from $14 per employee, all in.",
  },

  lever: {
    slug: 'lever',
    description: 'Lever pairs applicant tracking with candidate-relationship tools and ends at the offer. MambaHR screens candidates, then onboards, pays and manages the hire.',
    name: 'Lever',
    tagline: 'MambaHR vs Lever',
    heroHeadline: 'Lever is recruiting software.\nMambaHR is the whole department.',
    heroSub: "Lever pairs an applicant tracking system (ATS) with candidate-relationship tools to help your recruiters source and nurture. It ends at the offer. MambaHR screens and ranks candidates and drafts the offer. Then it onboards, pays, and manages them, in one product.",
    switchReasons: [
      {
        title: 'Sourcing is one job. HR is a dozen.',
        desc: "Lever helps recruiters build pipeline and nurture candidates. Once someone is hired, onboarding, payroll, compliance, and day-to-day HR still land elsewhere. MambaHR does recruiting and all of it.",
      },
      {
        title: 'It does the work, not just tracks it.',
        desc: "Lever organizes your funnel and reminds your team. MambaHR screens and ranks candidates, advisory only, and drafts the offer inside your pay range. After the hire, it does the HR requests too. Interview scheduling is coming.",
      },
      {
        title: 'No handoff to a separate records system.',
        desc: "Lever passes new hires to another system, with re-keyed data and dropped fields. MambaHR is the system of record, the candidate becomes an employee with nothing lost in transit.",
      },
    ],
    tableRows: [
      { feature: 'Applicant tracking & candidate CRM', mamba: true, them: true },
      { feature: 'AI screens and ranks candidates (advisory)', mamba: true, them: 'Limited' },
      { feature: 'Requests taken in Slack', mamba: true, them: 'Notifications only' },
      { feature: 'Full onboarding automation', mamba: true, them: 'Not included' },
      { feature: 'Employee records (the system of record)', mamba: true, them: 'Not included' },
      { feature: 'Payroll', mamba: 'Change file, or Deel-managed', them: 'Not included', note: 'MambaHR prepares every change; a person approves every run' },
      { feature: 'Employment law, federal plus your states, statute cited', mamba: true, them: 'EEOC reporting only' },
      { feature: 'Leave, compensation & the everyday HR work', mamba: true, them: 'Not included' },
      { feature: 'Human approval on key decisions', mamba: true, them: 'Manual process' },
      { feature: 'Typical setup time', mamba: '1 day to import', them: '2–4 weeks' },
    ],
    bottomLine: "Lever is recruiting software done well. MambaHR runs recruiting and the entire employee lifecycle after it, one product, no handoff.",
    costLine: "Lever is one line in the stack. MambaHR replaces the ATS and the records system, from $14 per employee, all in.",
  },

  remote: {
    slug: 'remote',
    description: 'Remote is built for global employer-of-record and contractor pay. For the US team you employ, MambaHR is the AI HR department: leave, hiring, onboarding, compliance.',
    name: 'Remote',
    tagline: 'MambaHR vs Remote',
    heroHeadline: 'Remote pays people across borders.\nMambaHR runs the team you employ.',
    heroSub: "Remote is built for global employer-of-record (EOR) and contractor payments, paying anyone, anywhere. For the US team you employ, leave, hiring, onboarding, and compliance, MambaHR is the AI HR department, in one product.",
    switchReasons: [
      {
        title: "EOR payments aren't an HR department.",
        desc: "Remote optimized for paying people across countries. Your US team still needs federal family leave (FMLA) and state leave, multi-state compliance, and onboarding that runs without chasing. That's MambaHR.",
      },
      {
        title: "Forms and dashboards aren't automation.",
        desc: "Remote added HR features as forms someone still fills in. MambaHR does the request, start to finish, from Slack, no dashboard, no ticket, no waiting.",
      },
      {
        title: 'The day-to-day still lands somewhere.',
        desc: "Even with Remote running payments, someone answers the policy questions, runs the offer process, and files leave. MambaHR handles that work.",
      },
    ],
    tableRows: [
      { feature: 'Requests taken in Slack', mamba: true, them: 'Not included' },
      { feature: 'Does the HR request, start to finish', mamba: true, them: 'Not included' },
      { feature: 'US leave (federal family leave under FMLA, plus state laws)', mamba: true, them: 'Basic only' },
      { feature: 'US employment law, federal plus your states, statute cited', mamba: true, them: 'Global EOR focus' },
      { feature: 'Global EOR & contractor payments', mamba: 'Not included', them: true },
      { feature: 'Payroll, domestic full-time', mamba: 'Change file, or Deel-managed', them: true, note: 'MambaHR prepares every change; a person approves every run' },
      { feature: 'Hiring and recruiting automation', mamba: true, them: 'Not included' },
      { feature: 'Full onboarding automation', mamba: true, them: 'Partial' },
      { feature: 'Typical setup time', mamba: '1 day to import', them: '1–3 weeks' },
      { feature: 'Audit log on every action', mamba: true, them: 'Partial' },
    ],
    bottomLine: "Remote is the way to pay people in other countries. MambaHR is the way to run the people on your US payroll. Different problems, pick the one that's yours.",
    costLine: "Keep Remote for global EOR. For the team on your US payroll, MambaHR runs the whole department from $14 per employee.",
  },

  oyster: {
    slug: 'oyster',
    description: 'Oyster hires and pays people abroad as employer of record. For the US team you employ, MambaHR is the AI HR department: leave, hiring, onboarding and compliance.',
    name: 'Oyster',
    tagline: 'MambaHR vs Oyster',
    heroHeadline: 'Oyster hires across borders.\nMambaHR runs the team at home.',
    heroSub: "Oyster is a global employment platform for hiring and paying people in other countries as employer of record (EOR). For the US team you employ, leave, hiring, onboarding, and compliance, MambaHR is the AI HR department, in one product.",
    switchReasons: [
      {
        title: 'Global EOR is a different job than US HR.',
        desc: "Oyster optimized for compliant hiring across borders. Your US team needs federal family leave (FMLA) and state leave reasoning, multi-state compliance, and onboarding that runs without chasing. MambaHR is built for exactly that.",
      },
      {
        title: 'Work done, not another dashboard.',
        desc: "Oyster gives you a platform and checklists to operate. MambaHR does the request, start to finish, from Slack. The work is done, not just tracked.",
      },
      {
        title: 'Someone still runs the day-to-day.',
        desc: "With Oyster handling international employment, your domestic HR work, policy questions, offers, leave, still lands on a desk. MambaHR clears it.",
      },
    ],
    tableRows: [
      { feature: 'Requests taken in Slack', mamba: true, them: 'Not included' },
      { feature: 'Does the HR request, start to finish', mamba: true, them: 'Not included' },
      { feature: 'US leave (federal family leave under FMLA, plus state laws)', mamba: true, them: 'Basic only' },
      { feature: 'US employment law, federal plus your states, statute cited', mamba: true, them: 'Global EOR focus' },
      { feature: 'Global EOR & contractor hiring', mamba: 'Not included', them: true },
      { feature: 'Payroll, domestic full-time', mamba: 'Change file, or Deel-managed', them: true, note: 'MambaHR prepares every change; a person approves every run' },
      { feature: 'Hiring and recruiting automation', mamba: true, them: 'Global hiring only' },
      { feature: 'Full onboarding automation', mamba: true, them: 'Partial' },
      { feature: 'Typical setup time', mamba: '1 day to import', them: '1–3 weeks' },
      { feature: 'Audit log on every action', mamba: true, them: 'Partial' },
    ],
    bottomLine: "Oyster is the way to hire across borders. MambaHR is the way to run the team you employ at home. Different problems, pick the one that's yours.",
    costLine: "Keep Oyster for global hiring. For the team on your US payroll, MambaHR runs the whole department from $14 per employee.",
  },
}
