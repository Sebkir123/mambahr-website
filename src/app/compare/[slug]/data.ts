export type CompetitorData = {
  slug: string
  name: string
  tagline: string
  heroHeadline: string
  heroSub: string
  switchReasons: { title: string; desc: string }[]
  tableRows: { feature: string; mamba: string | boolean; them: string | boolean; note?: string }[]
  bottomLine: string
  /** One-line price anchor rendered under the table — money on the page. */
  costLine: string
}

export const competitors: Record<string, CompetitorData> = {
  rippling: {
    slug: 'rippling',
    name: 'Rippling',
    tagline: 'MambaHR vs Rippling',
    heroHeadline: 'Rippling is the stack.\nMambaHR is the department.',
    heroSub: "Rippling pulled HR, payroll, and IT under one roof — for your HR org to operate. MambaHR is a different shape entirely: an agent department that runs the work itself, end to end, in one product.",
    switchReasons: [
      {
        title: "A platform doesn't shrink the work.",
        desc: "Rippling consolidated tools, not workload. Someone on your team still drafts the offer, files the leave, chases the compliance gap. MambaHR is the layer that resolves the request before it ever lands on a desk.",
      },
      {
        title: 'One product. One bill. No upsell tree.',
        desc: 'HR Cloud, IT Cloud, Finance Cloud, Spend — Rippling prices each module separately, and the per-employee number adds up. MambaHR includes HRIS, hiring, payroll-ready exports, and 14 specialist agents in a single product.',
      },
      {
        title: 'Live the day you sign.',
        desc: "Rippling deployments typically need a project plan. MambaHR doesn't. Connect Slack, your calendar, your stack — the agent is live the same afternoon, handling requests by tomorrow morning.",
      },
    ],
    tableRows: [
      { feature: 'Works inside Slack', mamba: true, them: 'Limited integration' },
      { feature: 'AI agent resolves HR requests end-to-end', mamba: true, them: 'Not included' },
      { feature: 'AI screens and schedules candidates', mamba: true, them: 'Not included' },
      { feature: 'Compliance engine (federal + 50 states)', mamba: true, them: 'Rules-based alerts', note: 'Rippling flags issues; MambaHR resolves them' },
      { feature: 'Payroll', mamba: 'Export-ready files', them: true, note: 'MambaHR builds the change file; your provider runs it' },
      { feature: 'Human approval on high-risk decisions', mamba: true, them: 'Manual workflows' },
      { feature: 'IT & device management', mamba: 'Not included', them: true },
      { feature: 'Typical setup time', mamba: '1 day', them: 'Weeks to months' },
      { feature: 'One unified product (no module sprawl)', mamba: true, them: 'Modular pricing' },
      { feature: 'Every action audit-logged', mamba: true, them: true },
    ],
    bottomLine: "Rippling is the modern HR stack. MambaHR is the modern HR department — the work, done.",
    costLine: "Most teams pay MambaHR less than their Rippling module tree — and it does the work instead of hosting it. From $14 per employee.",
  },

  gusto: {
    slug: 'gusto',
    name: 'Gusto',
    tagline: 'MambaHR vs Gusto',
    heroHeadline: 'Gusto handles payday.\nMambaHR handles every other day.',
    heroSub: "Gusto is the cleanest payroll on the market for small teams. The other twelve things HR does — leave, hires, onboarding, policy, performance, compliance — still hit your inbox. MambaHR clears the inbox.",
    switchReasons: [
      {
        title: 'Payroll is one job. HR is twelve.',
        desc: "Gusto handles payroll. The rest — leave requests, offer letters, FMLA stacking, onboarding tasks, performance cycles, terminations — still lands on someone's desk. MambaHR resolves them in Slack, in seconds.",
      },
      {
        title: "Knows tax law. Doesn't know employment law.",
        desc: "Gusto nailed payroll tax compliance. It can't tell you whether FMLA stacks with California CFRA for Maya, or whether your NY exempt classifications hold up. MambaHR can — and acts on it.",
      },
      {
        title: 'Gusto plus four more tools. Or just MambaHR.',
        desc: "Most Gusto customers also pay for an ATS, an onboarding platform, a performance tool, and a policy doc somewhere. MambaHR consolidates all of them — one product, one bill.",
      },
    ],
    tableRows: [
      { feature: 'Works inside Slack', mamba: true, them: 'Not included' },
      { feature: 'AI agent resolves HR requests end-to-end', mamba: true, them: 'Not included' },
      { feature: 'Compliance engine (federal + 50 states)', mamba: true, them: 'Payroll tax compliance only' },
      { feature: 'Payroll', mamba: 'Export-ready files', them: true, note: 'MambaHR builds the change file; your provider runs it' },
      { feature: 'Benefits', mamba: '401(k) + life events', them: true },
      { feature: 'Hiring and recruiting automation', mamba: true, them: 'Basic job posting only' },
      { feature: 'Full onboarding automation', mamba: true, them: 'Checklists only' },
      { feature: 'Performance reviews and PIPs', mamba: true, them: 'Not included' },
      { feature: 'Typical setup time', mamba: '1 day', them: '1–2 weeks' },
      { feature: 'Every decision logged and traceable', mamba: true, them: 'Partial' },
    ],
    bottomLine: 'Gusto is great payroll. MambaHR is everything else — and it gets your payroll ready. One product. One team. One bill.',
    costLine: "Keep Gusto for payday if you love it. MambaHR feeds it the change file and does the other twelve jobs — from $14 per employee.",
  },

  deel: {
    slug: 'deel',
    name: 'Deel',
    tagline: 'MambaHR vs Deel',
    heroHeadline: 'Deel is built for contractors.\nMambaHR is built for your team.',
    heroSub: "Deel cracked global contractor payments and employer-of-record. For the people you actually employ — leave, hires, onboarding, performance, compliance — MambaHR is the AI HR department, in one product.",
    switchReasons: [
      {
        title: "Contractors aren't employees.",
        desc: "Deel optimized for global contractors and EOR. Your full-time team needs something different — performance cycles, US leave management, multi-state compliance, onboarding that runs itself. That's MambaHR.",
      },
      {
        title: "Forms aren't automation.",
        desc: "Deel added HR features as forms and workflows. Someone still has to fill them in. MambaHR's agents resolve requests end-to-end — no dashboard, no ticket, no waiting.",
      },
      {
        title: "Deel doesn't handle the day-to-day.",
        desc: "Even with Deel running, someone still answers the policy questions, runs the offer process, manages the reviews, files the leave. MambaHR is the agent that handles that work — end to end, in Slack.",
      },
    ],
    tableRows: [
      { feature: 'Works inside Slack', mamba: true, them: 'Not included' },
      { feature: 'AI agent resolves HR requests automatically', mamba: true, them: 'Not included' },
      { feature: 'US leave management (FMLA, state laws)', mamba: true, them: 'Basic only' },
      { feature: 'US compliance engine (federal + 50 states)', mamba: true, them: 'Global contractor focus' },
      { feature: 'Global contractor & EOR payments', mamba: 'Not included', them: true },
      { feature: 'Payroll — domestic full-time', mamba: 'Export-ready files', them: true, note: 'MambaHR builds the change file; your provider runs it' },
      { feature: 'Hiring and recruiting automation', mamba: true, them: 'Not included' },
      { feature: 'Full onboarding automation', mamba: true, them: 'Partial' },
      { feature: 'Human approval on key decisions', mamba: true, them: 'Manual workflows' },
      { feature: 'Typical setup time', mamba: '1 day', them: '1–3 weeks' },
      { feature: 'Audit log on every action', mamba: true, them: 'Partial' },
    ],
    bottomLine: "Deel is the way to pay anyone, anywhere. MambaHR is the way to run the people on your payroll. Different problems. Pick the one that's actually yours.",
    costLine: "Keep Deel for global contractors. For the team on your US payroll, MambaHR runs the whole department from $14 per employee.",
  },

  bamboohr: {
    slug: 'bamboohr',
    name: 'BambooHR',
    tagline: 'MambaHR vs BambooHR',
    heroHeadline: 'BambooHR is a database.\nMambaHR is the department.',
    heroSub: "BambooHR keeps your records clean and your processes documented — useful work. But every action still requires a human to open the system, find the thing, and do the work. MambaHR does the work.",
    switchReasons: [
      {
        title: "A record system isn't a department.",
        desc: "BambooHR stores Maya's record. When she asks about adoption leave, someone still has to open the policy doc, calculate how it stacks, and write back. MambaHR replies in Slack in seconds — with the right answer for her state.",
      },
      {
        title: "Workflows aren't the work.",
        desc: "BambooHR's onboarding flows still need someone to trigger them, monitor them, and chase the laggards. MambaHR runs them top to bottom — no one watching, nothing dropped.",
      },
      {
        title: "Stores compliance. Doesn't reason about it.",
        desc: "BambooHR holds your policies. MambaHR knows when FMLA stacks with CFRA, when pay transparency rules differ across NY and CA, when an exempt role probably isn't — and applies the right rule, automatically.",
      },
    ],
    tableRows: [
      { feature: 'Works inside Slack', mamba: true, them: 'Not included' },
      { feature: 'AI resolves HR requests automatically', mamba: true, them: 'Not included' },
      { feature: 'Compliance engine (federal + 50 states)', mamba: true, them: 'Not included' },
      { feature: 'Payroll', mamba: 'Export-ready files', them: true, note: 'MambaHR builds the change file; your provider runs it' },
      { feature: 'Automated hiring workflow', mamba: true, them: 'Basic ATS included' },
      { feature: 'Employee self-service via chat', mamba: true, them: 'Portal only' },
      { feature: 'Performance review system', mamba: true, them: true },
      { feature: 'Typical setup time', mamba: '1 day', them: '2–4 weeks' },
      { feature: 'Scales with you', mamba: true, them: true },
      { feature: 'Audit log on every action', mamba: true, them: 'Partial' },
    ],
    bottomLine: 'BambooHR is where your HR data lives. MambaHR is where the work gets done.',
    costLine: "For roughly what BambooHR charges to store the work, MambaHR does the work. From $14 per employee, everything included.",
  },

  namely: {
    slug: 'namely',
    name: 'Namely',
    tagline: 'MambaHR vs Namely',
    heroHeadline: 'Namely made the HRIS prettier.\nMambaHR makes it unnecessary.',
    heroSub: "Namely brought HRIS, payroll, and benefits into one capable platform. It's still software your HR org operates. MambaHR is the next category — an agent department that handles leave, hiring, compliance, and the long tail of HR requests on its own.",
    switchReasons: [
      {
        title: "A cleaner UI doesn't mean less work.",
        desc: "Namely made the HRIS more usable. The work didn't shrink. Every request still flows to someone's queue. MambaHR is the layer that resolves the request before it gets there.",
      },
      {
        title: 'Workflows that run themselves.',
        desc: "Namely's approval routing, eligibility rules, and configurations need ongoing HR attention. MambaHR is self-tuning — set the policy once, the agent applies it from there.",
      },
      {
        title: 'Multi-state compliance, automatic.',
        desc: "Namely tracks the data. MambaHR reasons about it — FMLA + state PFL stacking, pay transparency across states, classification questions — and resolves them without asking.",
      },
    ],
    tableRows: [
      { feature: 'Works inside Slack', mamba: true, them: 'Not included' },
      { feature: 'AI resolves HR requests automatically', mamba: true, them: 'Not included' },
      { feature: 'Compliance engine (federal + 50 states)', mamba: true, them: 'Not included' },
      { feature: 'Payroll', mamba: 'Export-ready files', them: true, note: 'MambaHR builds the change file; your provider runs it' },
      { feature: 'Benefits', mamba: '401(k) + life events', them: true },
      { feature: 'Hiring and recruiting automation', mamba: true, them: 'Basic ATS' },
      { feature: 'Human approval on key decisions', mamba: true, them: 'Manual workflows' },
      { feature: 'Typical setup time', mamba: '1 day', them: '4–8 weeks' },
      { feature: 'Self-managing once deployed', mamba: true, them: 'Requires HR ops to operate' },
      { feature: 'Audit log on every action', mamba: true, them: 'Partial' },
    ],
    bottomLine: 'Namely is HRIS at its cleanest. MambaHR is the next category — an HR department that runs itself.',
    costLine: "No modules, no implementation retainer — MambaHR is $14–$30 per employee with everything included, live in a day.",
  },

  hibob: {
    slug: 'hibob',
    name: 'HiBob',
    tagline: 'MambaHR vs HiBob',
    heroHeadline: 'HiBob made HR look modern.\nMambaHR makes it run itself.',
    heroSub: "HiBob nailed the modern HRIS — clean interface, strong engagement features, employees actually like using it. Underneath, it's still software your HR org operates. MambaHR is the agent that does the work, not a UI that surfaces it.",
    switchReasons: [
      {
        title: "Pretty doesn't mean automated.",
        desc: "HiBob's interface is the best in the category. Doesn't matter — every leave request, policy question, and onboarding step still needs someone to act on it. MambaHR resolves them without anyone opening the app.",
      },
      {
        title: 'Data without action is just data.',
        desc: "HiBob shows you engagement scores, org charts, headcount trends. MambaHR uses that data — auto-approves leave within policy, flags retention risks early, drafts offers within band.",
      },
      {
        title: 'US compliance, not bolted on.',
        desc: "HiBob is global-first, with US compliance as one of many. MambaHR is US-first, with FMLA, state PFL, multi-state pay transparency, and classification reasoning baked in from day one.",
      },
    ],
    tableRows: [
      { feature: 'Works inside Slack', mamba: true, them: 'Limited integration' },
      { feature: 'AI resolves HR requests automatically', mamba: true, them: 'Not included' },
      { feature: 'US compliance engine (federal + 50 states)', mamba: true, them: 'Not included' },
      { feature: 'Payroll', mamba: 'Export-ready files', them: true, note: 'MambaHR builds the change file; your provider runs it' },
      { feature: 'Employee engagement & surveys', mamba: true, them: true },
      { feature: 'HRIS record storage', mamba: true, them: true },
      { feature: 'Global HR support', mamba: 'US-first', them: true },
      { feature: 'Hiring automation', mamba: true, them: 'Basic' },
      { feature: 'Human approval on key decisions', mamba: true, them: 'Manual workflows' },
      { feature: 'Typical setup time', mamba: '1 day', them: '2–6 weeks' },
      { feature: 'Audit log on every action', mamba: true, them: 'Partial' },
    ],
    bottomLine: 'HiBob is a great HRIS for the modern workplace. MambaHR is the next thing after the HRIS — the agent department that runs it.',
    costLine: "HiBob prices like an HRIS. MambaHR prices like a department you don't have to hire — $14–$30 per employee, all in.",
  },

  adp: {
    slug: 'adp',
    name: 'ADP',
    tagline: 'MambaHR vs ADP',
    heroHeadline: 'ADP is the system of record.\nMambaHR is the system of work.',
    heroSub: "ADP runs payroll, benefits, and HR administration for tens of thousands of companies. It's a comprehensive platform — for HR professionals to operate. MambaHR is a different shape: an agent department that handles the requests, the compliance, and the hiring before anyone opens a ticket.",
    switchReasons: [
      {
        title: 'A platform vs. a department.',
        desc: "ADP gives your HR organization a comprehensive platform to manage. MambaHR gives you the agent department that runs on top — leave, onboarding, compliance, hiring, all happening without supervision.",
      },
      {
        title: "Employees shouldn't need a portal.",
        desc: "ADP routes through HR admins and self-service portals. With MambaHR, employees ask in Slack and get the answer in seconds. No portal, no ticket, no waiting.",
      },
      {
        title: 'AI was the foundation, not the upgrade.',
        desc: "ADP is layering AI features onto established platforms. MambaHR was built around agents — autonomous resolution of HR work is the product, not a sidebar widget.",
      },
    ],
    tableRows: [
      { feature: 'Works inside Slack', mamba: true, them: 'Not included' },
      { feature: 'AI agent resolves HR requests automatically', mamba: true, them: 'Not included' },
      { feature: 'Compliance engine (federal + 50 states)', mamba: true, them: 'Payroll tax compliance' },
      { feature: 'Payroll', mamba: 'Export-ready files', them: true, note: 'MambaHR builds the change file; your provider runs it' },
      { feature: 'Benefits', mamba: '401(k) + life events', them: true },
      { feature: 'Designed to be self-managing', mamba: true, them: 'Requires HR & IT operators' },
      { feature: 'Employee self-service', mamba: 'Slack / chat', them: 'Portal only' },
      { feature: 'Hiring automation', mamba: true, them: 'Available as add-on' },
      { feature: 'Human approval on key decisions', mamba: true, them: 'Manual workflows' },
      { feature: 'Typical setup time', mamba: '1 day', them: '4–12 weeks' },
      { feature: 'Audit log on every action', mamba: true, them: true },
    ],
    bottomLine: 'ADP is the back office of HR. MambaHR is the front line — the agent that talks to your employees, makes the calls, and only routes the judgment ones to you.',
    costLine: "ADP bills like the back office it is. MambaHR is $14–$30 per employee, flat — no modules, no add-ons, no surprise invoices.",
  },

  workday: {
    slug: 'workday',
    name: 'Workday',
    tagline: 'MambaHR vs Workday',
    heroHeadline: 'Workday is software you implement.\nMambaHR is a department you turn on.',
    heroSub: "Workday is the standard enterprise HCM — vast, configurable, operated by a department of admins. MambaHR is a different shape entirely: an agent department that handles the work, deployed the day you sign, with the compliance and audit depth you'd expect at scale.",
    switchReasons: [
      {
        title: 'A platform to run vs. a department that runs.',
        desc: "Workday gives your HR org a configurable platform. MambaHR gives you the work, done — requests resolved, policies applied, judgment calls escalated. No admins required.",
      },
      {
        title: 'Workday is a project. MambaHR is a product.',
        desc: 'Most Workday deployments run several months to over a year, often with a systems integrator. MambaHR is live the day you connect Slack and your existing tools.',
      },
      {
        title: 'AI was the foundation, not the upgrade.',
        desc: "Workday is layering AI features onto a platform launched in 2005. MambaHR was built around agents — the AI doing the work is the product, not a feature added on top.",
      },
    ],
    tableRows: [
      { feature: 'Works inside Slack and Teams', mamba: true, them: 'Limited integrations' },
      { feature: 'AI agent resolves HR requests end-to-end', mamba: true, them: 'AI assistant features' },
      { feature: 'Typical time to first value', mamba: '1 day', them: 'Months' },
      { feature: 'Designed to be self-managing', mamba: true, them: 'Requires HR & IT operators' },
      { feature: 'Compliance engine (federal + 50 states)', mamba: true, them: true },
      { feature: 'Payroll', mamba: 'Export-ready files', them: true, note: 'MambaHR builds the change file; your provider runs it' },
      { feature: 'Human-in-the-loop approval flow', mamba: true, them: 'Configurable workflows' },
      { feature: 'Financial management & ERP', mamba: 'Not included', them: true, note: 'Workday strength: HCM + Finance in one' },
      { feature: 'Multi-country global payroll', mamba: 'US-first', them: true },
      { feature: 'Audit log on every action', mamba: true, them: true },
    ],
    bottomLine: "Workday is the right answer when you need finance, HCM, and global ERP under one configurable platform. MambaHR is the right answer when you want HR to run itself.",
    costLine: "A Workday implementation can cost more than a decade of MambaHR. We're $14–$30 per employee and live in a day.",
  },
}
