export type CompetitorData = {
  slug: string
  name: string
  tagline: string
  heroHeadline: string
  heroSub: string
  switchReasons: { title: string; desc: string }[]
  tableRows: { feature: string; mamba: string | boolean; them: string | boolean; note?: string }[]
  bottomLine: string
  /** One-line price anchor rendered under the table, money on the page. */
  costLine: string
}

export const competitors: Record<string, CompetitorData> = {
  rippling: {
    slug: 'rippling',
    name: 'Rippling',
    tagline: 'MambaHR vs Rippling',
    heroHeadline: 'Rippling is the stack.\nMambaHR is the department.',
    heroSub: "Rippling pulled HR, payroll, and IT under one roof, for your HR org to operate. MambaHR is a different shape entirely: an agent department that runs the work itself, end to end, in one product.",
    switchReasons: [
      {
        title: "A platform doesn't shrink the work.",
        desc: "Rippling consolidated tools, not workload. Someone on your team still drafts the offer, files the leave, chases the compliance gap. MambaHR is the layer that resolves the request before it ever lands on a desk.",
      },
      {
        title: 'One product. One bill. No upsell tree.',
        desc: 'HR Cloud, IT Cloud, Finance Cloud, Spend, Rippling prices each module separately, and the per-employee number adds up. MambaHR includes HRIS, hiring, payroll-ready exports, and the full set of specialist agents in a single product.',
      },
      {
        title: 'Live the day you sign.',
        desc: "Rippling deployments typically need a project plan. MambaHR doesn't. Connect Slack, your calendar, your stack, the agent is live the same afternoon, handling requests by tomorrow morning.",
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
    bottomLine: "Rippling is the modern HR stack. MambaHR is the modern HR department, the work, done.",
    costLine: "Most teams pay MambaHR less than their Rippling module tree, and it does the work instead of hosting it. From $14 per employee.",
  },

  gusto: {
    slug: 'gusto',
    name: 'Gusto',
    tagline: 'MambaHR vs Gusto',
    heroHeadline: 'Gusto handles payday.\nMambaHR handles every other day.',
    heroSub: "Gusto is the cleanest payroll on the market for small teams. The other twelve things HR does, leave, hires, onboarding, policy, performance, compliance, still hit your inbox. MambaHR clears the inbox.",
    switchReasons: [
      {
        title: 'Payroll is one job. HR is twelve.',
        desc: "Gusto handles payroll. The rest, leave requests, offer letters, FMLA stacking, onboarding tasks, performance cycles, terminations, still lands on someone's desk. MambaHR resolves them in Slack, in seconds.",
      },
      {
        title: "Knows tax law. Doesn't know employment law.",
        desc: "Gusto nailed payroll tax compliance. It can't tell you whether FMLA stacks with California CFRA for Maya, or whether your NY exempt classifications hold up. MambaHR can, and acts on it.",
      },
      {
        title: 'Gusto plus four more tools. Or just MambaHR.',
        desc: "Most Gusto customers also pay for an ATS, an onboarding platform, a performance tool, and a policy doc somewhere. MambaHR consolidates all of them, one product, one bill.",
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
    bottomLine: 'Gusto is great payroll. MambaHR is everything else, and it gets your payroll ready. One product. One team. One bill.',
    costLine: "Keep Gusto for payday if you love it. MambaHR feeds it the change file and does the other twelve jobs, from $14 per employee.",
  },

  deel: {
    slug: 'deel',
    name: 'Deel',
    tagline: 'MambaHR vs Deel',
    heroHeadline: 'Deel is built for contractors.\nMambaHR is built for your team.',
    heroSub: "Deel cracked global contractor payments and employer-of-record. For the people you actually employ, leave, hires, onboarding, performance, and compliance, MambaHR is the AI HR department, in one product.",
    switchReasons: [
      {
        title: "Contractors aren't employees.",
        desc: "Deel optimized for global contractors and EOR. Your full-time team needs something different, performance cycles, US leave management, multi-state compliance, onboarding that runs without chasing. That's MambaHR.",
      },
      {
        title: "Forms aren't automation.",
        desc: "Deel added HR features as forms and workflows. Someone still has to fill them in. MambaHR's agents resolve requests end-to-end, no dashboard, no ticket, no waiting.",
      },
      {
        title: "Deel doesn't handle the day-to-day.",
        desc: "Even with Deel running, someone still answers the policy questions, runs the offer process, manages the reviews, files the leave. MambaHR is the agent that handles that work, end to end, in Slack.",
      },
    ],
    tableRows: [
      { feature: 'Works inside Slack', mamba: true, them: 'Not included' },
      { feature: 'AI agent resolves HR requests automatically', mamba: true, them: 'Not included' },
      { feature: 'US leave management (FMLA, state laws)', mamba: true, them: 'Basic only' },
      { feature: 'US compliance engine (federal + 50 states)', mamba: true, them: 'Global contractor focus' },
      { feature: 'Global contractor & EOR payments', mamba: 'Not included', them: true },
      { feature: 'Payroll, domestic full-time', mamba: 'Export-ready files', them: true, note: 'MambaHR builds the change file; your provider runs it' },
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
    heroSub: "BambooHR keeps your records clean and your processes documented, useful work. But every action still requires a human to open the system, find the thing, and do the work. MambaHR does the work.",
    switchReasons: [
      {
        title: "A record system isn't a department.",
        desc: "BambooHR stores Maya's record. When she asks about adoption leave, someone still has to open the policy doc, calculate how it stacks, and write back. MambaHR replies in Slack in seconds, with the right answer for her state.",
      },
      {
        title: "Workflows aren't the work.",
        desc: "BambooHR's onboarding flows still need someone to trigger them, monitor them, and chase the laggards. MambaHR runs them top to bottom, no one watching, nothing dropped.",
      },
      {
        title: "Stores compliance. Doesn't reason about it.",
        desc: "BambooHR holds your policies. MambaHR knows when FMLA stacks with CFRA, when pay transparency rules differ across NY and CA, when an exempt role probably isn't, and applies the right rule, automatically.",
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
    heroSub: "Namely brought HRIS, payroll, and benefits into one capable platform. It's still software your HR org operates. MambaHR is the next category, an agent department that handles leave, hiring, compliance, and the long tail of HR requests on its own.",
    switchReasons: [
      {
        title: "A cleaner UI doesn't mean less work.",
        desc: "Namely made the HRIS more usable. The work didn't shrink. Every request still flows to someone's queue. MambaHR is the layer that resolves the request before it gets there.",
      },
      {
        title: 'Workflows that run themselves.',
        desc: "Namely's approval routing, eligibility rules, and configurations need ongoing HR attention. MambaHR is self-tuning, set the policy once, the agent applies it from there.",
      },
      {
        title: 'Multi-state compliance, automatic.',
        desc: "Namely tracks the data. MambaHR reasons about it, FMLA + state PFL stacking, pay transparency across states, classification questions, and resolves them without asking.",
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
    bottomLine: 'Namely is HRIS at its cleanest. MambaHR is the next category, an HR department that does the work.',
    costLine: "No modules, no implementation retainer. MambaHR is $14–$30 per employee with everything included, live in a day.",
  },

  hibob: {
    slug: 'hibob',
    name: 'HiBob',
    tagline: 'MambaHR vs HiBob',
    heroHeadline: 'HiBob made HR look modern.\nMambaHR makes it do the work.',
    heroSub: "HiBob nailed the modern HRIS, clean interface, strong engagement features, employees actually like using it. Underneath, it's still software your HR org operates. MambaHR is the agent that does the work, not a UI that surfaces it.",
    switchReasons: [
      {
        title: "Pretty doesn't mean automated.",
        desc: "HiBob's interface is the best in the category. Doesn't matter, every leave request, policy question, and onboarding step still needs someone to act on it. MambaHR resolves them without anyone opening the app.",
      },
      {
        title: 'Data without action is just data.',
        desc: "HiBob shows you engagement scores, org charts, headcount trends. MambaHR uses that data, auto-approves leave within policy, flags retention risks early, drafts offers within band.",
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
    bottomLine: 'HiBob is a great HRIS for the modern workplace. MambaHR is the next thing after the HRIS, the agent department that runs it.',
    costLine: "HiBob prices like an HRIS. MambaHR prices like the work, not the seat, $14–$30 per employee, all in.",
  },

  adp: {
    slug: 'adp',
    name: 'ADP',
    tagline: 'MambaHR vs ADP',
    heroHeadline: 'ADP is the system of record.\nMambaHR is the system of work.',
    heroSub: "ADP runs payroll, benefits, and HR administration for tens of thousands of companies. It's a comprehensive platform, for HR professionals to operate. MambaHR is a different shape: an agent department that handles the requests, the compliance, and the hiring before anyone opens a ticket.",
    switchReasons: [
      {
        title: 'A platform vs. a department.',
        desc: "ADP gives your HR organization a comprehensive platform to manage. MambaHR gives you the agent department that runs on top, leave, onboarding, compliance, hiring, all happening without supervision.",
      },
      {
        title: "Employees shouldn't need a portal.",
        desc: "ADP routes through HR admins and self-service portals. With MambaHR, employees ask in Slack and get the answer in seconds. No portal, no ticket, no waiting.",
      },
      {
        title: 'AI was the foundation, not the upgrade.',
        desc: "ADP is layering AI features onto established platforms. MambaHR was built around agents, autonomous resolution of HR work is the product, not a sidebar widget.",
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
    bottomLine: 'ADP is the back office of HR. MambaHR is the front line, the agent that talks to your employees, makes the calls, and only routes the judgment ones to you.',
    costLine: "ADP bills like the back office it is. MambaHR is $14–$30 per employee, flat, no modules, no add-ons, no surprise invoices.",
  },

  workday: {
    slug: 'workday',
    name: 'Workday',
    tagline: 'MambaHR vs Workday',
    heroHeadline: 'Workday is software you implement.\nMambaHR is a department you turn on.',
    heroSub: "Workday is the standard enterprise HCM, vast, configurable, operated by a department of admins. MambaHR is a different shape entirely: an agent department that handles the work, deployed the day you sign, with the compliance and audit depth you'd expect at scale.",
    switchReasons: [
      {
        title: 'A platform to run vs. a department that runs.',
        desc: "Workday gives your HR org a configurable platform. MambaHR gives you the work, done, requests resolved, policies applied, judgment calls escalated. No admins required.",
      },
      {
        title: 'Workday is a project. MambaHR is a product.',
        desc: 'Most Workday deployments run several months to over a year, often with a systems integrator. MambaHR is live the day you connect Slack and your existing tools.',
      },
      {
        title: 'AI was the foundation, not the upgrade.',
        desc: "Workday is layering AI features onto a platform launched in 2005. MambaHR was built around agents, the AI doing the work is the product, not a feature added on top.",
      },
    ],
    tableRows: [
      { feature: 'Works inside Slack', mamba: true, them: 'Limited integrations' },
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
    bottomLine: "Workday is the right answer when you need finance, HCM, and global ERP under one configurable platform. MambaHR is the right answer when you want the HR work done, not hosted.",
    costLine: "A Workday implementation can cost more than a decade of MambaHR. We're $14–$30 per employee and live in a day.",
  },

  justworks: {
    slug: 'justworks',
    name: 'Justworks',
    tagline: 'MambaHR vs Justworks',
    heroHeadline: 'Justworks gives you a support queue.\nMambaHR gives you the answer.',
    heroSub: "Justworks is a PEO, you co-employ your team through them and lean on their support reps for the hard questions. MambaHR is the AI HR department: the work gets done in Slack, no co-employment, no shared liability, no waiting on a ticket queue.",
    switchReasons: [
      {
        title: 'No co-employment. Your company, your EIN.',
        desc: "A PEO puts your employees on its own tax ID and shares legal liability for them. MambaHR doesn't touch your employment relationship, you stay the employer of record, and the agent handles the administrative work on top.",
      },
      {
        title: 'Answers in seconds, not a support queue.',
        desc: "Justworks routes the hard questions to a human support team. MambaHR answers in Slack instantly, FMLA stacking, multi-state classification, pay transparency, with a citation, and escalates only the genuine judgment calls.",
      },
      {
        title: 'You keep your benefits broker.',
        desc: "PEOs bundle benefits into the package, so leaving means re-shopping coverage. MambaHR is benefits-agnostic, keep your broker and plans, and let the agent run enrollment, life events, and 401(k) administration.",
      },
    ],
    tableRows: [
      { feature: 'Works inside Slack', mamba: true, them: 'Limited integration' },
      { feature: 'AI agent resolves HR requests end-to-end', mamba: true, them: 'Human support team' },
      { feature: 'Co-employment / shared liability', mamba: 'None, you stay the employer', them: 'PEO co-employment model' },
      { feature: 'Compliance engine (federal + 50 states)', mamba: true, them: 'Support-assisted' },
      { feature: 'Payroll', mamba: 'Export-ready files', them: true, note: 'MambaHR builds the change file; your provider runs it' },
      { feature: 'Benefits', mamba: 'Keep your own broker', them: 'PEO-bundled plans' },
      { feature: 'Hiring and recruiting automation', mamba: true, them: 'Not included' },
      { feature: 'Full onboarding automation', mamba: true, them: 'Checklists only' },
      { feature: 'Human approval on high-risk decisions', mamba: true, them: 'Manual workflows' },
      { feature: 'Typical setup time', mamba: '1 day', them: '2–4 weeks' },
      { feature: 'Audit log on every action', mamba: true, them: 'Partial' },
    ],
    bottomLine: "Justworks is a good PEO if you want bundled benefits and a support team to call. MambaHR is what you turn on when you want the HR work itself done, without handing over your employment relationship.",
    costLine: "PEOs bundle their margin into your benefits. MambaHR is a flat $14–$30 per employee, no co-employment, no markup on coverage.",
  },

  trinet: {
    slug: 'trinet',
    name: 'TriNet',
    tagline: 'MambaHR vs TriNet',
    heroHeadline: 'TriNet is a PEO with a service rep.\nMambaHR is the department itself.',
    heroSub: "TriNet co-employs your team and assigns you industry-tailored benefits and an HR service rep. MambaHR is a different shape entirely, an AI HR department that does the administrative work directly, with no co-employment and no ticket queue.",
    switchReasons: [
      {
        title: 'Keep your EIN and your independence.',
        desc: "TriNet's PEO model puts your people on its tax ID and shares employer liability. MambaHR leaves your employment relationship untouched and runs the admin work on top, no co-employment to unwind later.",
      },
      {
        title: 'The rep model has a queue. The agent does not.',
        desc: "TriNet assigns a service rep for the complex questions. MambaHR answers in Slack the moment the question is asked, leave eligibility, multi-state rules, classification, and only routes the real judgment calls to your human.",
      },
      {
        title: 'No re-pricing your benefits to leave.',
        desc: "Because PEO benefits are bundled, switching off TriNet usually means re-shopping coverage. MambaHR is benefits-agnostic: keep your plans and broker, and let the agent administer enrollment and life events.",
      },
    ],
    tableRows: [
      { feature: 'Works inside Slack', mamba: true, them: 'Not included' },
      { feature: 'AI agent resolves HR requests end-to-end', mamba: true, them: 'Assigned service rep' },
      { feature: 'Co-employment / shared liability', mamba: 'None, you stay the employer', them: 'PEO co-employment model' },
      { feature: 'Compliance engine (federal + 50 states)', mamba: true, them: 'Rep-assisted' },
      { feature: 'Payroll', mamba: 'Export-ready files', them: true, note: 'MambaHR builds the change file; your provider runs it' },
      { feature: 'Benefits', mamba: 'Keep your own broker', them: 'PEO-bundled plans' },
      { feature: 'Hiring and recruiting automation', mamba: true, them: 'Not included' },
      { feature: 'Full onboarding automation', mamba: true, them: 'Rep-assisted' },
      { feature: 'Human approval on high-risk decisions', mamba: true, them: 'Manual workflows' },
      { feature: 'Typical setup time', mamba: '1 day', them: '4–8 weeks' },
      { feature: 'Audit log on every action', mamba: true, them: 'Partial' },
    ],
    bottomLine: "TriNet is a capable PEO if co-employment and bundled benefits suit you. MambaHR is the AI department that does the work, your EIN, your benefits, no shared liability.",
    costLine: "TriNet prices as a percentage of payroll with benefits baked in. MambaHR is flat, $14–$30 per employee, your coverage stays yours.",
  },

  paychex: {
    slug: 'paychex',
    name: 'Paychex',
    tagline: 'MambaHR vs Paychex',
    heroHeadline: 'Paychex runs payroll and sells you services.\nMambaHR does the HR work.',
    heroSub: "Paychex is decades-deep in payroll and add-on HR services, sold module by module with a rep on the phone. MambaHR is the AI HR department, one product that resolves the requests, runs compliance, and gets payroll ready, live the day you sign.",
    switchReasons: [
      {
        title: 'One product, not a menu of add-ons.',
        desc: "Paychex prices HR services, time tracking, and compliance help as separate lines, each with its own fee. MambaHR includes HRIS, hiring, onboarding, compliance, and the full set of specialist agents in a single flat price.",
      },
      {
        title: 'Self-service that actually serves itself.',
        desc: "Paychex Flex routes employees through a portal and HR through a rep. With MambaHR, employees ask in Slack and get the answer in seconds, no portal, no phone tree, no ticket.",
      },
      {
        title: 'Compliance that reasons, not just reports.',
        desc: "Paychex flags payroll-tax issues. MambaHR reasons about employment law, FMLA + state PFL stacking, exempt classification, multi-state pay transparency, and acts on it automatically.",
      },
    ],
    tableRows: [
      { feature: 'Works inside Slack', mamba: true, them: 'Not included' },
      { feature: 'AI agent resolves HR requests end-to-end', mamba: true, them: 'Not included' },
      { feature: 'Compliance engine (federal + 50 states)', mamba: true, them: 'Payroll-tax + add-on services' },
      { feature: 'Payroll', mamba: 'Export-ready files', them: true, note: 'MambaHR builds the change file; your provider runs it' },
      { feature: 'Benefits', mamba: '401(k) + life events', them: true },
      { feature: 'Hiring and recruiting automation', mamba: true, them: 'Add-on module' },
      { feature: 'Full onboarding automation', mamba: true, them: 'Add-on module' },
      { feature: 'Pricing model', mamba: 'One flat per-employee price', them: 'Per-module fees' },
      { feature: 'Human approval on high-risk decisions', mamba: true, them: 'Manual workflows' },
      { feature: 'Typical setup time', mamba: '1 day', them: '2–6 weeks' },
      { feature: 'Audit log on every action', mamba: true, them: 'Partial' },
    ],
    bottomLine: "Paychex is reliable payroll with services bolted on. MambaHR is the HR department that does the work, one product, one bill, and it feeds your payroll.",
    costLine: "Paychex's add-ons stack up fast. MambaHR is one flat number, $14–$30 per employee, everything included.",
  },

  zenefits: {
    slug: 'zenefits',
    name: 'Zenefits',
    tagline: 'MambaHR vs Zenefits',
    heroHeadline: 'Zenefits gave you the dashboard.\nMambaHR does the work behind it.',
    heroSub: "Zenefits (now part of TriNet) packaged HR, benefits, and payroll into one tidy SMB platform. It's still software your team operates click by click. MambaHR is the agent that resolves the request before anyone opens a dashboard.",
    switchReasons: [
      {
        title: 'A dashboard still needs someone to drive it.',
        desc: "Zenefits made HR admin tidier, but every leave request, onboarding step, and policy question still needs a human to log in and act. MambaHR resolves them in Slack without anyone opening the app.",
      },
      {
        title: 'Built for agents, not bolted onto a portal.',
        desc: "Zenefits is a self-service portal with workflows. MambaHR is an autonomous department, the AI doing the work end-to-end is the product, not a feature added to a dashboard.",
      },
      {
        title: 'Compliance reasoning, not just record-keeping.',
        desc: "Zenefits stores your policies and tracks deadlines. MambaHR knows when FMLA stacks with state PFL, when an exempt classification is shaky, when pay transparency rules differ by state, and applies the right rule automatically.",
      },
    ],
    tableRows: [
      { feature: 'Works inside Slack', mamba: true, them: 'Not included' },
      { feature: 'AI agent resolves HR requests end-to-end', mamba: true, them: 'Not included' },
      { feature: 'Compliance engine (federal + 50 states)', mamba: true, them: 'Tracking + alerts' },
      { feature: 'Payroll', mamba: 'Export-ready files', them: 'Add-on', note: 'MambaHR builds the change file; your provider runs it' },
      { feature: 'Benefits administration', mamba: true, them: true },
      { feature: 'Hiring and recruiting automation', mamba: true, them: 'Basic' },
      { feature: 'Full onboarding automation', mamba: true, them: 'Checklists only' },
      { feature: 'Employee self-service', mamba: 'Slack / chat', them: 'Portal only' },
      { feature: 'Human approval on high-risk decisions', mamba: true, them: 'Manual workflows' },
      { feature: 'Typical setup time', mamba: '1 day', them: '1–3 weeks' },
      { feature: 'Audit log on every action', mamba: true, them: 'Partial' },
    ],
    bottomLine: "Zenefits is a clean SMB HR dashboard. MambaHR is the next category, the agent that does the work the dashboard only organizes.",
    costLine: "For roughly what Zenefits charges to organize the work, MambaHR does it. From $14 per employee, everything included.",
  },

  paylocity: {
    slug: 'paylocity',
    name: 'Paylocity',
    tagline: 'MambaHR vs Paylocity',
    heroHeadline: 'Paylocity is an HCM suite to operate.\nMambaHR does the operating.',
    heroSub: "Paylocity is a capable mid-market HCM, payroll, benefits, talent, and workforce management your HR org runs. MambaHR is a different shape: an agent department that handles the requests, the compliance, and the hiring without an admin behind every screen.",
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
        desc: "Paylocity rollouts run weeks with an implementation consultant. MambaHR connects to Slack and your stack and is handling requests the next morning.",
      },
    ],
    tableRows: [
      { feature: 'Works inside Slack', mamba: true, them: 'Limited integration' },
      { feature: 'AI agent resolves HR requests end-to-end', mamba: true, them: 'AI assistant features' },
      { feature: 'Compliance engine (federal + 50 states)', mamba: true, them: true },
      { feature: 'Payroll', mamba: 'Export-ready files', them: true, note: 'MambaHR builds the change file; your provider runs it' },
      { feature: 'Benefits & workforce management', mamba: 'Core HR + 401(k)', them: true },
      { feature: 'Hiring and recruiting automation', mamba: true, them: 'Module included' },
      { feature: 'Designed to be self-managing', mamba: true, them: 'Requires HR ops to operate' },
      { feature: 'Employee self-service', mamba: 'Slack / chat', them: 'App + portal' },
      { feature: 'Typical setup time', mamba: '1 day', them: '4–8 weeks' },
      { feature: 'Human approval on high-risk decisions', mamba: true, them: 'Configurable workflows' },
      { feature: 'Audit log on every action', mamba: true, them: true },
    ],
    bottomLine: "Paylocity is a solid HCM suite for an HR team to run. MambaHR is the department that does the running, live the day you sign.",
    costLine: "Paylocity prices per module with an implementation fee. MambaHR is flat, $14–$30 per employee, live in a day.",
  },

  ukg: {
    slug: 'ukg',
    name: 'UKG',
    tagline: 'MambaHR vs UKG',
    heroHeadline: 'UKG is enterprise workforce software.\nMambaHR is the department you turn on.',
    heroSub: "UKG (Ready and Pro) is deep on workforce management and HCM for large, shift-heavy organizations, powerful, configurable, operated by a team. MambaHR is a different category: an AI HR department deployed the day you sign, with the compliance and audit depth you'd expect at scale.",
    switchReasons: [
      {
        title: 'A platform to implement vs. a department that runs.',
        desc: "UKG gives a large HR and ops team a configurable platform to operate. MambaHR gives you the work done, leave, onboarding, compliance, hiring, without an admin behind every workflow.",
      },
      {
        title: 'Months of implementation, or live tomorrow.',
        desc: "UKG deployments typically run months, often with an integrator. MambaHR is live the day you connect Slack and your existing tools.",
      },
      {
        title: 'AI was the foundation, not a later release.',
        desc: "UKG is layering AI onto mature workforce platforms. MambaHR was built around agents, autonomous resolution of HR work is the product, not a feature added on top.",
      },
    ],
    tableRows: [
      { feature: 'Works inside Slack', mamba: true, them: 'Limited integrations' },
      { feature: 'AI agent resolves HR requests end-to-end', mamba: true, them: 'AI assistant features' },
      { feature: 'Compliance engine (federal + 50 states)', mamba: true, them: true },
      { feature: 'Payroll', mamba: 'Export-ready files', them: true, note: 'MambaHR builds the change file; your provider runs it' },
      { feature: 'Time, attendance & scheduling', mamba: 'Not included', them: true, note: 'UKG strength: shift workforce management' },
      { feature: 'Designed to be self-managing', mamba: true, them: 'Requires HR & ops operators' },
      { feature: 'Hiring and recruiting automation', mamba: true, them: 'Module included' },
      { feature: 'Typical time to first value', mamba: '1 day', them: 'Months' },
      { feature: 'Human approval on high-risk decisions', mamba: true, them: 'Configurable workflows' },
      { feature: 'Audit log on every action', mamba: true, them: true },
    ],
    bottomLine: "UKG is the right answer when you run a large, shift-based workforce that needs deep scheduling. MambaHR is the right answer when you want the HR department itself to run.",
    costLine: "A UKG implementation is a capital project. MambaHR is $14–$30 per employee and live in a day.",
  },

  greenhouse: {
    slug: 'greenhouse',
    name: 'Greenhouse',
    tagline: 'MambaHR vs Greenhouse',
    heroHeadline: 'Greenhouse is an ATS.\nMambaHR hires, then runs the rest.',
    heroSub: "Greenhouse is a strong applicant tracking system, structured interviews, pipelines, reporting. But it stops at the offer. MambaHR screens and schedules candidates and then onboards, pays, and manages the person you hired, the whole lifecycle, in one product.",
    switchReasons: [
      {
        title: 'Recruiting is the first mile, not the journey.',
        desc: "Greenhouse manages the pipeline to the offer. The moment the candidate says yes, you still need onboarding, payroll setup, compliance, and an HRIS. MambaHR does recruiting and everything after it.",
      },
      {
        title: 'AI that screens and schedules, not just tracks.',
        desc: "Greenhouse organizes your funnel; humans still screen résumés and coordinate calendars. MambaHR's agent screens candidates against the role and books interviews automatically.",
      },
      {
        title: 'One system of record, not a handoff.',
        desc: "Greenhouse hands the new hire to a separate HRIS, with the usual data re-entry and dropped fields. MambaHR is the system of record, the candidate becomes an employee with nothing re-keyed.",
      },
    ],
    tableRows: [
      { feature: 'Applicant tracking & structured interviews', mamba: true, them: true },
      { feature: 'AI screens and schedules candidates', mamba: true, them: 'Limited' },
      { feature: 'Works inside Slack', mamba: true, them: 'Notifications only' },
      { feature: 'Full onboarding automation', mamba: true, them: 'Not included' },
      { feature: 'HRIS / system of record', mamba: true, them: 'Not included' },
      { feature: 'Payroll', mamba: 'Export-ready files', them: 'Not included', note: 'MambaHR builds the change file; your provider runs it' },
      { feature: 'Compliance engine (federal + 50 states)', mamba: true, them: 'EEOC reporting only' },
      { feature: 'Leave, performance & the HR long tail', mamba: true, them: 'Not included' },
      { feature: 'Human approval on key decisions', mamba: true, them: 'Manual workflows' },
      { feature: 'Typical setup time', mamba: '1 day', them: '2–4 weeks' },
    ],
    bottomLine: "Greenhouse is a great way to run hiring. MambaHR runs hiring and the entire employee lifecycle after it, one product, no handoff.",
    costLine: "Greenhouse is one tool in the stack. MambaHR replaces the ATS and the HRIS, from $14 per employee, all in.",
  },

  lever: {
    slug: 'lever',
    name: 'Lever',
    tagline: 'MambaHR vs Lever',
    heroHeadline: 'Lever is recruiting software.\nMambaHR is the whole department.',
    heroSub: "Lever pairs an ATS with candidate-relationship tools to help your recruiters source and nurture. It ends at the offer. MambaHR screens and schedules candidates and then onboards, pays, and manages them, the full lifecycle, in one product.",
    switchReasons: [
      {
        title: 'Sourcing is one job. HR is a dozen.',
        desc: "Lever helps recruiters build pipeline and nurture candidates. Once someone is hired, onboarding, payroll, compliance, and day-to-day HR still land elsewhere. MambaHR does recruiting and all of it.",
      },
      {
        title: 'An agent that does the work, not just tracks it.',
        desc: "Lever organizes your funnel and reminds your team. MambaHR's agent actually screens candidates and books interviews, and after the hire, resolves HR requests in Slack end-to-end.",
      },
      {
        title: 'No handoff to a separate HRIS.',
        desc: "Lever passes new hires to another system, with re-keyed data and dropped fields. MambaHR is the system of record, the candidate becomes an employee with nothing lost in transit.",
      },
    ],
    tableRows: [
      { feature: 'Applicant tracking & candidate CRM', mamba: true, them: true },
      { feature: 'AI screens and schedules candidates', mamba: true, them: 'Limited' },
      { feature: 'Works inside Slack', mamba: true, them: 'Notifications only' },
      { feature: 'Full onboarding automation', mamba: true, them: 'Not included' },
      { feature: 'HRIS / system of record', mamba: true, them: 'Not included' },
      { feature: 'Payroll', mamba: 'Export-ready files', them: 'Not included', note: 'MambaHR builds the change file; your provider runs it' },
      { feature: 'Compliance engine (federal + 50 states)', mamba: true, them: 'EEOC reporting only' },
      { feature: 'Leave, performance & the HR long tail', mamba: true, them: 'Not included' },
      { feature: 'Human approval on key decisions', mamba: true, them: 'Manual workflows' },
      { feature: 'Typical setup time', mamba: '1 day', them: '2–4 weeks' },
    ],
    bottomLine: "Lever is recruiting software done well. MambaHR runs recruiting and the entire employee lifecycle after it, one product, no handoff.",
    costLine: "Lever is one line in the stack. MambaHR replaces the ATS and the HRIS, from $14 per employee, all in.",
  },

  remote: {
    slug: 'remote',
    name: 'Remote',
    tagline: 'MambaHR vs Remote',
    heroHeadline: 'Remote pays people across borders.\nMambaHR runs the team you employ.',
    heroSub: "Remote is built for global employer-of-record and contractor payments, paying anyone, anywhere. For the US team you actually employ, leave, hiring, onboarding, performance, and compliance, MambaHR is the AI HR department, in one product.",
    switchReasons: [
      {
        title: "EOR payments aren't an HR department.",
        desc: "Remote optimized for paying people across countries. Your US team still needs performance cycles, FMLA and state leave management, multi-state compliance, and onboarding that runs without chasing. That's MambaHR.",
      },
      {
        title: "Forms and dashboards aren't automation.",
        desc: "Remote added HR features as forms someone still fills in. MambaHR's agents resolve requests end-to-end in Slack, no dashboard, no ticket, no waiting.",
      },
      {
        title: 'The day-to-day still lands somewhere.',
        desc: "Even with Remote running payments, someone answers the policy questions, runs the offer process, manages reviews, and files leave. MambaHR is the agent that handles that work, end to end.",
      },
    ],
    tableRows: [
      { feature: 'Works inside Slack', mamba: true, them: 'Not included' },
      { feature: 'AI agent resolves HR requests end-to-end', mamba: true, them: 'Not included' },
      { feature: 'US leave management (FMLA, state laws)', mamba: true, them: 'Basic only' },
      { feature: 'US compliance engine (federal + 50 states)', mamba: true, them: 'Global EOR focus' },
      { feature: 'Global EOR & contractor payments', mamba: 'Not included', them: true },
      { feature: 'Payroll, domestic full-time', mamba: 'Export-ready files', them: true, note: 'MambaHR builds the change file; your provider runs it' },
      { feature: 'Hiring and recruiting automation', mamba: true, them: 'Not included' },
      { feature: 'Full onboarding automation', mamba: true, them: 'Partial' },
      { feature: 'Performance reviews and PIPs', mamba: true, them: 'Not included' },
      { feature: 'Typical setup time', mamba: '1 day', them: '1–3 weeks' },
      { feature: 'Audit log on every action', mamba: true, them: 'Partial' },
    ],
    bottomLine: "Remote is the way to pay people in other countries. MambaHR is the way to run the people on your US payroll. Different problems, pick the one that's yours.",
    costLine: "Keep Remote for global EOR. For the team on your US payroll, MambaHR runs the whole department from $14 per employee.",
  },

  oyster: {
    slug: 'oyster',
    name: 'Oyster',
    tagline: 'MambaHR vs Oyster',
    heroHeadline: 'Oyster hires across borders.\nMambaHR runs the team at home.',
    heroSub: "Oyster is a global employment platform for hiring and paying people in other countries through EOR. For the US team you actually employ, leave, hiring, onboarding, performance, and compliance, MambaHR is the AI HR department, in one product.",
    switchReasons: [
      {
        title: 'Global EOR is a different job than US HR.',
        desc: "Oyster optimized for compliant hiring across borders. Your US team needs FMLA and state leave reasoning, multi-state compliance, performance cycles, and onboarding that runs without chasing. MambaHR is built for exactly that.",
      },
      {
        title: 'An agent, not another dashboard.',
        desc: "Oyster gives you a platform and workflows to operate. MambaHR's agents resolve requests end-to-end in Slack, the work is done, not just tracked.",
      },
      {
        title: 'Someone still runs the day-to-day.',
        desc: "With Oyster handling international employment, your domestic HR work, policy questions, offers, reviews, leave, still lands on a desk. MambaHR is the agent that clears it.",
      },
    ],
    tableRows: [
      { feature: 'Works inside Slack', mamba: true, them: 'Not included' },
      { feature: 'AI agent resolves HR requests end-to-end', mamba: true, them: 'Not included' },
      { feature: 'US leave management (FMLA, state laws)', mamba: true, them: 'Basic only' },
      { feature: 'US compliance engine (federal + 50 states)', mamba: true, them: 'Global EOR focus' },
      { feature: 'Global EOR & contractor hiring', mamba: 'Not included', them: true },
      { feature: 'Payroll, domestic full-time', mamba: 'Export-ready files', them: true, note: 'MambaHR builds the change file; your provider runs it' },
      { feature: 'Hiring and recruiting automation', mamba: true, them: 'Global hiring only' },
      { feature: 'Full onboarding automation', mamba: true, them: 'Partial' },
      { feature: 'Performance reviews and PIPs', mamba: true, them: 'Not included' },
      { feature: 'Typical setup time', mamba: '1 day', them: '1–3 weeks' },
      { feature: 'Audit log on every action', mamba: true, them: 'Partial' },
    ],
    bottomLine: "Oyster is the way to hire across borders. MambaHR is the way to run the team you employ at home. Different problems, pick the one that's yours.",
    costLine: "Keep Oyster for global hiring. For the team on your US payroll, MambaHR runs the whole department from $14 per employee.",
  },
}
