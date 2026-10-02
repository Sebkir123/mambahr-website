// Content for /how-it-works, kept in a plain module so the page and its
// structured data (layout.tsx) read the same words. Every step here was checked
// against the product before it was written; do not add a step the product
// does not do. Copy rules: plain words, no em dashes, no invented customers or
// numbers. The people in the examples are illustrations, not customers.

export type Who = 'mamba' | 'person'

export type Step = { title: string; body: string; who: Who }

export type Walk = {
  id: string
  /** Short label for the jump links. */
  short: string
  eyebrow: string
  title: string
  summary: string
  /** Name of the HowTo in the structured data. */
  howToName: string
  request: {
    name: string
    avatar: string
    where: string
    time: string
    /** Text after the @MambaHR mention. Null when the request comes through the web form. */
    text: string
    viaForm?: boolean
  }
  steps: Step[]
  why: string
  done: string
  more: { label: string; href: string }
}

export const FLOW: { title: string; body: string; who: Who }[] = [
  {
    title: 'A request comes in',
    body: 'Someone writes to MambaHR in Slack, in a channel or a direct message, or fills in your company’s web request form. Some work starts by itself: a signed offer starts onboarding, and an approved raise starts a payroll change.',
    who: 'mamba',
  },
  {
    title: 'MambaHR does the work',
    body: 'It reads the employee record, checks your policy and the law for the state the person works in, and then does the admin: drafts the documents, sends the forms, requests the accounts and updates the record.',
    who: 'mamba',
  },
  {
    title: 'A person approves what matters',
    body: 'Decisions about someone’s job, pay or protected leave come to a person first, with the facts and the rule laid out. They wait on that person’s To do list in MambaHR, and arrive in Slack too.',
    who: 'person',
  },
  {
    title: 'You see what was done',
    body: 'MambaHR replies where the request came from: what changed, which rule applied, and anything still waiting on someone. Every step is saved with the record, so you can look it up later.',
    who: 'mamba',
  },
]

export const WALKS: Walk[] = [
  {
    id: 'new-hire',
    short: 'A new hire',
    eyebrow: 'Walk-through 1 · A new hire',
    title: 'From “we want to hire Maya” to her first day.',
    summary:
      'A hiring manager asks for an offer. MambaHR prepares it against the pay range, a person approves it, and once it is signed the paperwork, accounts, laptop and payroll change all start without anyone chasing them.',
    howToName: 'How MambaHR onboards a new hire',
    request: {
      name: 'Priya Nair',
      avatar: '/avatars/priya.jpg',
      where: '#hiring · Slack',
      time: '9:01 AM',
      text: 'we’d like to hire Maya Chen as Senior Engineer at $165,000, starting November 3.',
    },
    steps: [
      { who: 'mamba', title: 'Prepares the offer', body: 'Pulls the role, its pay range and the start date, and lines up the offer letter from your template. If the salary is outside the range, it says so, and the offer needs a more senior approver.' },
      { who: 'person', title: 'A person approves the offer', body: 'The offer waits for the approver your rules name, usually the hiring manager or HR. Nothing goes to Maya until they approve it.' },
      { who: 'mamba', title: 'Sends it for signature and files it', body: 'Maya signs online. The signed offer is filed with her documents, where you can find it later.' },
      { who: 'mamba', title: 'Starts the new-hire paperwork', body: 'Creates Maya’s employee record, sends her the new-hire forms and starts the Form I-9. The E-Verify check runs once her I-9 is complete. If you run background checks, it orders one through Checkr, where Maya gives her consent.' },
      { who: 'mamba', title: 'Requests her accounts and laptop', body: 'Sets up her accounts in your single sign-on directory, such as Okta, and in Slack, and sends a laptop request to your IT team.' },
      { who: 'mamba', title: 'Plans the first day', body: 'Builds her first-day schedule and assigns an onboarding buddy from her team.' },
      { who: 'mamba', title: 'Adds her to payroll', body: 'Her salary and start date go into the next payroll change, so she is paid from her first pay period.' },
    ],
    why:
      'An offer is a promise about someone’s job and pay, so a person signs off on it. Everything after the signature is paperwork that follows from it.',
    done:
      'Priya gets a reply in the Slack thread: offer signed, forms sent, Form I-9 started, accounts and laptop requested, payroll updated. Her request card shows each step as done or waiting, and on whom.',
    more: { label: 'More about onboarding', href: '/onboarding' },
  },
  {
    id: 'leave',
    short: 'A leave request',
    eyebrow: 'Walk-through 2 · A leave request',
    title: 'A day off, and twelve weeks of parental leave.',
    summary:
      'A day off is checked against the balance and your policy, so the manager approves it with one tap. Leave that the law protects, like parental or medical leave, is checked against federal and state rules and goes to a person to decide.',
    howToName: 'How MambaHR handles a leave request',
    request: {
      name: 'Leo Schulz',
      avatar: '/avatars/dave.jpg',
      where: 'Direct message · Slack',
      time: '8:47 AM',
      text: 'I’d like 12 weeks of parental leave from November 3. Our baby is due at the end of October.',
    },
    steps: [
      { who: 'mamba', title: 'Reads the request', body: 'Picks up the dates, the kind of leave and who is asking, from the message itself. Leo does not fill in a form.' },
      { who: 'mamba', title: 'Checks the balance and your policy', body: 'Days available, notice rules and who else on the team is out. A short day off that fits goes to the manager with the checks done. You can let MambaHR approve those on its own in your settings.' },
      { who: 'mamba', title: 'Checks family leave eligibility', body: 'For parental or medical leave, MambaHR checks whether Leo is eligible for federal family and medical leave (FMLA), from his time with you and the hours he has worked. It cites the law, and any state leave program that applies.' },
      { who: 'person', title: 'A person decides', body: 'The request comes to HR with the balance, the policy and the law laid out. How federal and state leave run together is a person’s decision.' },
      { who: 'mamba', title: 'Updates the record and payroll', body: 'Records the leave, updates his balance and drafts the approval letter. Any unpaid weeks are reflected in payroll for those pay periods.' },
      { who: 'mamba', title: 'Keeps the medical details private', body: 'Leo’s manager sees the dates he is away. The reason and any medical details stay with the people who need them.' },
    ],
    why:
      'Protected leave is where a mistake costs someone their job protection or their pay, and the details are personal. So a person decides, with the research already done.',
    done:
      'Leo gets a reply with the decision, his dates and what is left of his balance. His record and payroll are updated as soon as the leave is approved.',
    more: { label: 'More about time off and leave', href: '/leave' },
  },
  {
    id: 'leaving',
    short: 'Someone leaving',
    eyebrow: 'Walk-through 3 · Someone leaving',
    title: 'A resignation, with nothing forgotten.',
    summary:
      'A manager says someone is leaving. MambaHR works out the final pay under that state’s rules, prepares the paperwork and lines up the access removal, and nothing happens until a person approves it.',
    howToName: 'How MambaHR handles an employee leaving',
    request: {
      name: 'Anna Ruiz',
      avatar: '/avatars/anna.jpg',
      where: '#people-ops · Slack',
      time: '4:12 PM',
      text: 'Marcus Webb resigned today. His last day is Friday the 14th.',
    },
    steps: [
      { who: 'mamba', title: 'Prepares the exit', body: 'Records the resignation and the last day as a draft, and lines up every step for Marcus’s role and state.' },
      { who: 'mamba', title: 'Works out the final pay', body: 'Applies the final-pay deadline for the state Marcus works in, and pays out unused vacation where that state requires it.' },
      { who: 'mamba', title: 'Drafts the paperwork', body: 'If you offer severance, drafts the separation agreement. For someone 40 or older, it carries the waiver wording and the review periods federal age-discrimination law requires: 21 days to consider and 7 days to change his mind.' },
      { who: 'person', title: 'A person approves the exit', body: 'HR approves the exit, the final pay and any agreement. Nothing is sent and no access is removed before that, for a resignation as much as a termination.' },
      { who: 'mamba', title: 'Removes access', body: 'Once the exit is approved, removes Marcus from your single sign-on directory and Slack, and can wipe his laptop remotely through your device management tool.' },
      { who: 'mamba', title: 'Sends the health coverage notice', body: 'Prepares the COBRA continuation coverage notice. If it cannot be sent, it lands on your To do with the deadline.' },
      { who: 'mamba', title: 'Closes the record', body: 'Sends the final payroll change, files the signed documents with his record, and marks him as gone with his last day.' },
    ],
    why:
      'Ending someone’s job touches their pay and their health coverage, and final-pay deadlines are set by state law. A person approves every exit, and a termination is always a person’s decision.',
    done:
      'Anna sees the exit in one place: the final pay date, the documents signed and filed, access removed and the COBRA notice sent. Marcus’s record shows that he has left, and when.',
    more: { label: 'More about offboarding', href: '/onboarding' },
  },
  {
    id: 'payroll',
    short: 'A payroll change',
    eyebrow: 'Walk-through 4 · A payroll change',
    title: 'A raise, from request to payday.',
    summary:
      'A manager asks for a raise. MambaHR checks it against the pay range, a person approves it, and the change goes into the next pay run, as a file for your current payroll provider or through Deel.',
    howToName: 'How MambaHR prepares a payroll change',
    request: {
      name: 'Tom Hale',
      avatar: '/avatars/tom.jpg',
      where: '#people-ops · Slack',
      time: '11:20 AM',
      text: 'can we move Jackson Bauer to $165,000 from November 1?',
    },
    steps: [
      { who: 'mamba', title: 'Checks the raise against the pay range', body: 'Compares the new salary with the pay range for Jackson’s level, so whoever decides can see where it lands before they do.' },
      { who: 'person', title: 'A person approves the raise', body: 'The request goes to the person who approves pay at your company, usually HR or finance. Nothing changes until they approve it.' },
      { who: 'mamba', title: 'Updates the record', body: 'Jackson’s record shows the new salary and the date it starts, with who approved it.' },
      { who: 'mamba', title: 'Adds it to the payroll changes', body: 'The raise joins every other change for that pay period, like new hires and people leaving.' },
      { who: 'person', title: 'A person approves the pay run', body: 'Load the change file into your current payroll provider, or approve the run in Deel (Powered by Deel). Nobody is paid on a run a person has not approved.' },
    ],
    why:
      'Pay decisions affect fairness across the team and every pay run moves real money, so the raise and the run are both a person’s call.',
    done:
      'Tom gets a reply when the raise is approved. On payday Jackson is paid the new amount, and the change shows in that period’s change report.',
    more: { label: 'More about payroll', href: '/payroll' },
  },
]

export const DECIDE = {
  always: {
    title: 'Always a person',
    sub: 'MambaHR prepares these and lays out the facts. A person decides.',
    items: [
      'Every offer, before it goes out',
      'Raises above the pay range, and any pay cut',
      'Every exit, including resignations',
      'Terminations, layoffs and separation agreements',
      'Protected leave, like FMLA, and how it combines with state leave',
      'Every pay run',
    ],
  },
  yours: {
    title: 'Your rules',
    sub: 'You choose who approves what, once, in Settings. You can change it any time.',
    items: [
      'Who approves offers, pay and exits',
      'Pay ranges for each role and level',
      'Your time off and leave policies',
      'Whether short time off that fits the policy is approved on its own',
    ],
  },
  mamba: {
    title: 'MambaHR finishes on its own',
    sub: 'Routine admin inside your rules, logged with the rule it followed.',
    items: [
      'Checking every request against the policy and the law',
      'Answers to policy questions, with the source',
      'New-hire forms, reminders and follow-ups',
      'Account and laptop requests',
      'Filing documents and updating records',
      'Building the payroll change file',
    ],
  },
  why:
    'The line is simple: if a decision changes someone’s job, pay or legal protection, a person makes it. If it is paperwork that follows from a decision, MambaHR does it. When MambaHR is not sure which side something falls on, it asks a person.',
}

export const START: { title: string; body: string }[] = [
  { title: 'Sign up', body: 'Create your account at app.mambahr.com with your work email.' },
  { title: 'Set up your company', body: 'Your company name and the state where most of your people work. The rest can wait.' },
  { title: 'Bring in your people', body: 'Connect Gusto, BambooHR, Rippling, Workday, ADP or Namely, upload a spreadsheet, add people by hand, or skip it for now. Hiring data can come over from Greenhouse or Lever.' },
  { title: 'Connect Slack', body: 'So your team can send requests where they already work. You can also skip this and use the web request form.' },
  { title: 'Pick a plan', body: 'Every plan starts with a 7-day free trial. You add a card, and nothing is charged until the trial ends.' },
  { title: 'Invite your team', body: 'Add the people who approve things: HR, managers, finance.' },
]

export const FAQS: { q: string; a: string }[] = [
  {
    q: 'How do requests reach MambaHR?',
    a: 'Through Slack, as a message in a channel or a direct message, and through your company’s web request form. Some work also starts by itself, like onboarding when an offer is signed.',
  },
  {
    q: 'Which steps does MambaHR never take on its own?',
    a: 'Offers, raises above the pay range, every exit, layoffs, separation agreements, decisions about protected leave, and pay runs. MambaHR prepares them and a person decides.',
  },
  {
    q: 'Do our employees need to learn a new tool?',
    a: 'No. They ask in Slack or use the web request form. Approvers can act from Slack or from their To do list in MambaHR.',
  },
  {
    q: 'Does MambaHR run payroll?',
    a: 'MambaHR prepares every payroll change. Each company chooses either a change file for its current payroll provider or US payroll run through Deel (Powered by Deel), an add-on on any plan at $10 per employee paid per month. A person approves every run.',
  },
  {
    q: 'What does MambaHR do when it is not sure?',
    a: 'It does not guess. Unclear cases go to a person with the facts, the policy and the law laid out.',
  },
  {
    q: 'Can we start without a demo?',
    a: 'Yes. Sign up, set up your company, bring in your people and start a 7-day free trial on your own. If you would rather see it first, book a 30-minute demo.',
  },
]
