import type { Guide } from './types'

// Offboarding guides: the offboarding checklist, COBRA, severance agreements
// and WARN notice. Every legal fact below was checked against the official
// page listed in the record's `sources` on 2026-10-02.

export const offboardingGuides: Guide[] = [
  // ── 1. Offboarding checklist ─────────────────────────────────────────────
  {
    slug: 'employee-offboarding-checklist',
    category: 'Offboarding',
    title: 'Employee offboarding checklist',
    metaTitle: 'Employee Offboarding Checklist: Pay, COBRA, Notices | MambaHR',
    metaDescription:
      'An employee offboarding checklist covers final pay by the state deadline, COBRA notices within 30 days, state unemployment notices, access removal and records.',
    answer:
      'When an employee leaves, pay final wages by your state\'s deadline, tell your health plan administrator within 30 days so the COBRA election notice goes out (if COBRA applies), and give any unemployment notice your state requires at separation. Then collect equipment, remove system access the same day, confirm the W-2 address, and keep the personnel file for at least one year after an involuntary termination.',
    sections: [
      {
        heading: 'The checklist at a glance',
        blocks: [
          {
            type: 'table',
            caption: 'What to do, when, and which rule sets it',
            columns: ['Item', 'When', 'Rule or source'],
            rows: [
              [
                'Final paycheck',
                'By your state\'s deadline. Some states require it on the last day.',
                'No federal deadline. The U.S. Department of Labor (DOL) says some states require immediate payment. See [final paycheck laws](/guides/final-paycheck-laws).',
              ],
              [
                'Unused vacation',
                'With the final paycheck, where state law or your policy requires it',
                'Federal law does not require paying for time not worked. State law and your written policy decide. See [unused PTO payout](/guides/unused-pto-payout).',
              ],
              [
                'Benefits end date',
                'Confirm before the last day',
                'Your plan documents and insurer set the date coverage ends. Tell the employee in writing.',
              ],
              [
                'COBRA notice to the plan administrator',
                'Within 30 days after employment ends',
                'Federal COBRA, for employers with 20 or more employees. See [when you need to offer COBRA](/guides/when-do-you-need-to-offer-cobra).',
              ],
              [
                'COBRA election notice to the employee',
                'Within 14 days after the plan administrator gets your notice',
                'The employee then has at least 60 days to elect coverage.',
              ],
              [
                'State unemployment notice',
                'At separation (see the state table below)',
                'California, New York, New Jersey and Illinois each require one.',
              ],
              [
                'Equipment and system access',
                'On or before the last day',
                'Your security policy. Remove email, SSO, payroll and code access the same day.',
              ],
              [
                'Final expense reimbursement',
                'With final pay or on your normal expense schedule',
                'Your expense policy. Ask for open receipts before the last day.',
              ],
              [
                'W-2 address',
                'Confirm before the last day',
                'The W-2 is due by January 31 (February 1, 2027 for 2026 wages). If the employee asks for it, give it within 30 days of the request or of the final wage payment, whichever is later.',
              ],
              [
                'Personnel file',
                'Keep at least 1 year after an involuntary termination',
                'Equal Employment Opportunity Commission (EEOC) rule. Payroll records: 3 years. See [how long to keep employee records](/guides/how-long-to-keep-employee-records).',
              ],
            ],
          },
        ],
      },
      {
        heading: 'Before the last day',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Confirm the facts: last day of work, the reason for the exit (resignation, termination, layoff), and the state where the employee works. Final pay deadlines and separation notices follow the work state. If you are ending the employment, read [how to fire an employee](/guides/how-to-fire-an-employee) first.',
              'Calculate final pay: wages through the last day, any commissions or bonuses already earned, and unused vacation if your state or policy requires payout. Do not hold back wages until equipment is returned unless your state clearly allows it.',
              'Check benefits: ask your insurer or benefits broker when coverage ends (often the last day of the month, but it depends on the plan). Note any life insurance or disability coverage that may have a conversion option.',
              'Decide on severance. If you are offering money in exchange for a release of claims, draft the agreement now. Workers 40 and older must get at least 21 days to consider it. See [severance agreements](/guides/severance-agreements).',
              'If several people are leaving at once, check whether a federal or state layoff notice law applies. See [WARN notice](/guides/warn-act-layoffs).',
              'List every system the person can reach: email, single sign-on, payroll, bank, code repositories, shared drives, customer tools, company cards. Plan who switches each one off and when.',
            ],
          },
        ],
      },
      {
        heading: 'On the last day',
        blocks: [
          {
            type: 'list',
            items: [
              'Hand over the final paycheck if your state requires same-day payment, or tell the employee exactly when and how it will arrive.',
              'Give the state unemployment notice and a written note of when benefits end.',
              'Collect the laptop, badge, keys and company card. For remote employees, send a prepaid return kit and a deadline.',
              'Remove access at the agreed time. Transfer ownership of files, shared accounts and customer threads to a named person.',
              'Hold a short exit conversation if the employee is willing. Ask what worked and what did not. Keep notes factual.',
              'Agree how references will be handled. Many companies confirm only dates of employment and job title, and route every reference request to one person.',
            ],
          },
        ],
      },
      {
        heading: 'State unemployment notices at separation',
        blocks: [
          {
            type: 'p',
            text: 'Many states require you to tell a departing employee how to apply for unemployment insurance, whatever the reason they left. These are the rules for four states with a named form or pamphlet. Check your state\'s workforce agency if you have employees elsewhere.',
          },
          {
            type: 'table',
            caption: 'Unemployment notices, verified on each state agency site',
            columns: ['State', 'What to give', 'When'],
            rows: [
              [
                '[California](/hr-by-state/california)',
                'A written notice of the change in the employment relationship, plus the Employment Development Department (EDD) "For Your Benefit" pamphlet (DE 2320)',
                'Immediately when someone is fired, laid off, takes a leave of absence or changes job status',
              ],
              [
                '[New York](/hr-by-state/new-york)',
                'Record of Employment (Form IA 12.3), completed',
                'To separated employees, so they can apply for benefits',
              ],
              [
                '[New Jersey](/hr-by-state/new-jersey)',
                'Instructions for Claiming Unemployment Benefits (Form BC-10), completed',
                'At the time of separation, permanent or temporary, for any reason',
              ],
              [
                '[Illinois](/hr-by-state/illinois)',
                'The "What Every Worker Should Know About Unemployment Insurance" publication',
                'When a worker is laid off for 7 days or more or leaves the payroll for any reason. If you cannot hand it over, mail it within 5 calendar days of separation.',
              ],
            ],
          },
        ],
      },
      {
        heading: 'After they leave',
        blocks: [
          {
            type: 'list',
            items: [
              'COBRA: if you have 20 or more employees and a group health plan, notify the plan administrator within 30 days of the end of employment. The administrator sends the election notice within 14 days of hearing from you. If you are under 20, check your state\'s continuation law.',
              'Payroll: make sure the employee is removed from the next payroll run, recurring deductions stop, and any final reimbursement is paid.',
              'W-2: keep the address current. You may give the W-2 any time after employment ends, and no later than the January deadline.',
              'Records: keep the personnel file at least one year from the termination date (longer if a discrimination charge is filed), and payroll records for three years.',
              'Update your org chart, open approvals and any workflows that named the person.',
            ],
          },
        ],
      },
      {
        heading: 'Common mistakes',
        blocks: [
          {
            type: 'list',
            items: [
              'Paying final wages on the next regular payday in a state that requires payment on the last day.',
              'Forgetting the state unemployment notice because the employee quit. In New Jersey and Illinois the duty applies whatever the reason for leaving.',
              'Assuming the insurer handles COBRA. The employer still has to tell the plan administrator that employment ended, within 30 days.',
              'Leaving access open for a day or two "to wrap up". Switch it off at the agreed time and give a named colleague what they need.',
              'Using final wages or accrued pay as the payment for signing a release. A release needs something the employee was not already owed.',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Do I have to pay out unused vacation when someone leaves?',
        a: 'Not under federal law, which does not require pay for time not worked. Some states require payout and others let your written policy decide, so check the employee\'s work state. See [unused PTO payout](/guides/unused-pto-payout).',
      },
      {
        q: 'Do I have to send a COBRA notice if the employee quit?',
        a: 'Yes, if COBRA applies to your plan. Any end of employment other than for gross misconduct is a qualifying event, whether the employee quit or was let go.',
      },
      {
        q: 'Can I keep the last paycheck until the laptop comes back?',
        a: 'Treat final wages and equipment as separate issues. Pay final wages by the state deadline and recover equipment through a return kit and a clear deadline. Before deducting anything from final wages, check your state\'s wage law.',
      },
      {
        q: 'How long do I keep a former employee\'s file?',
        a: 'Under EEOC rules, at least one year from the date of an involuntary termination, and payroll records for three years under the Age Discrimination in Employment Act. Other laws set longer periods for some records.',
      },
    ],
    mambahr:
      'When someone leaves, MambaHR removes their system access, works out final pay under the state\'s rules for a person to approve, and prepares the COBRA continuation notices. It drafts the separation paperwork and turns the exit into a payroll change for your provider or Deel-managed payroll (Powered by Deel). Terminations always go to a person, and every step is logged.',
    sources: [
      { label: 'DOL: Last paycheck', url: 'https://www.dol.gov/general/topic/wages/lastpaycheck' },
      { label: 'DOL: Vacation leave', url: 'https://www.dol.gov/general/topic/workhours/vacation_leave' },
      {
        label: 'DOL EBSA: An Employer\'s Guide to Group Health Continuation Coverage Under COBRA',
        url: 'https://www.dol.gov/sites/dolgov/files/ebsa/about-ebsa/our-activities/resource-center/publications/an-employers-guide-to-group-health-continuation-coverage-under-cobra.pdf',
      },
      { label: 'California EDD: Required notices and pamphlets', url: 'https://edd.ca.gov/en/payroll_taxes/Required_Notices_and_Pamphlets/' },
      { label: 'New York DOL: Record of Employment (IA 12.3)', url: 'https://dol.ny.gov/IA12.3-doc' },
      { label: 'New Jersey DOL: Form BC-10', url: 'https://www.nj.gov/labor/forms_pdfs/ui/BC10.pdf' },
      {
        label: 'Illinois IDES: What Every Worker Should Know About Unemployment Insurance',
        url: 'https://ides.illinois.gov/unemployment/resources/what-every-worker-should-know-about-unemployment-insurance.html',
      },
      { label: 'IRS: General Instructions for Forms W-2 and W-3 (2026)', url: 'https://www.irs.gov/instructions/iw2w3' },
      { label: 'EEOC: Recordkeeping requirements', url: 'https://www.eeoc.gov/employers/recordkeeping-requirements' },
    ],
    related: [
      '/guides/final-paycheck-laws',
      '/guides/unused-pto-payout',
      '/guides/when-do-you-need-to-offer-cobra',
      '/guides/how-to-fire-an-employee',
      '/guides/severance-agreements',
      '/guides/how-long-to-keep-employee-records',
    ],
  },

  // ── 2. COBRA ─────────────────────────────────────────────────────────────
  {
    slug: 'when-do-you-need-to-offer-cobra',
    category: 'Offboarding',
    title: 'When do you need to offer COBRA?',
    metaTitle: 'When Do You Need to Offer COBRA? Rules and Deadlines | MambaHR',
    metaDescription:
      'You must offer COBRA if you have a group health plan and had 20+ employees on over half your business days last year. Smaller employers may face state laws.',
    answer:
      'You must offer federal COBRA continuation coverage if your company has a group health plan and had at least 20 employees on more than half of its typical business days in the previous calendar year, counting part-time employees as fractions. Employers under 20 may still have to offer continuation under a state "mini-COBRA" law, such as California\'s (2 to 19 employees, up to 36 months) or New York\'s (fewer than 20 employees, up to 36 months).',
    sections: [
      {
        heading: 'Who has to offer COBRA',
        blocks: [
          {
            type: 'p',
            text: 'The Consolidated Omnibus Budget Reconciliation Act (COBRA) applies to private-sector group health plans of employers that had at least 20 employees on more than 50 percent of their typical business days in the previous calendar year. It also applies to state and local government plans. It does not apply to plans of the federal government or of churches and certain church-related organizations.',
          },
          {
            type: 'p',
            text: 'Count both full-time and part-time employees. Each part-time employee counts as a fraction: hours worked divided by the hours needed to be full time. If full time is 40 hours a week, someone working 20 hours counts as half an employee. Because the test looks at the previous calendar year, a company that passes 20 employees in the spring usually becomes subject to COBRA the following January.',
          },
          {
            type: 'p',
            text: 'A "group health plan" includes medical, hospital, prescription drug, dental and vision coverage, whether insured or self-funded. Plans that provide only life insurance or disability benefits are not covered.',
          },
        ],
      },
      {
        heading: 'What triggers COBRA and for how long',
        blocks: [
          {
            type: 'table',
            caption: 'Qualifying events and maximum coverage periods under federal COBRA',
            columns: ['Qualifying event', 'Who can elect', 'Maximum coverage'],
            rows: [
              [
                'End of employment (for any reason except gross misconduct) or reduction in hours',
                'Employee, spouse, dependent children',
                '18 months',
              ],
              [
                'Disability determined by Social Security, during an 18-month period',
                'Each qualified beneficiary in the family',
                '29 months (an 11-month extension)',
              ],
              [
                'A second qualifying event during the 18 months',
                'Spouse and dependent children',
                '36 months from the original event',
              ],
              [
                'Death of the employee, divorce or legal separation, employee becomes entitled to Medicare, child loses dependent status',
                'Spouse and dependent children',
                '36 months',
              ],
            ],
          },
          {
            type: 'p',
            text: 'A plan may offer longer coverage than the law requires. Coverage can also end early for specific reasons, such as unpaid premiums.',
          },
        ],
      },
      {
        heading: 'The notices and their deadlines',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'General notice: the plan must give each covered employee and spouse a general notice of COBRA rights within the first 90 days of coverage. Many plans do this through the summary plan description.',
              'Employer notice to the plan: when employment ends, hours are cut, the employee dies or becomes entitled to Medicare, the employer must notify the plan administrator within 30 days after the event.',
              'Employee notice to the plan: for divorce, legal separation or a child losing dependent status, the employee or family member notifies the plan. The plan can set a deadline, but it cannot be shorter than 60 days.',
              'Election notice: the plan administrator must send the election notice within 14 days after receiving notice of the qualifying event. The DOL publishes model general and election notices.',
              'Election period: each qualified beneficiary gets at least 60 days to elect, counted from the later of the date the election notice is provided or the date coverage would otherwise end.',
            ],
          },
          {
            type: 'p',
            text: 'If your plan is insured, your insurer or a COBRA administrator often handles the election notice. The 30-day duty to tell the plan that employment ended is still yours.',
          },
        ],
      },
      {
        heading: 'What people pay',
        blocks: [
          {
            type: 'list',
            items: [
              'The premium can be up to 102 percent of the plan\'s cost for a similarly situated active employee (the full cost, both employer and employee shares, plus 2 percent for administration).',
              'During the 11-month disability extension, it can be up to 150 percent.',
              'You cannot require payment at the time of election. The first payment is due no sooner than 45 days after the election, and later payments get at least a 30-day grace period.',
              'You can choose to pay some or all of the premium, for example as part of a severance package.',
            ],
          },
        ],
      },
      {
        heading: 'Under 20 employees: state continuation laws',
        blocks: [
          {
            type: 'p',
            text: 'Many states have their own continuation laws, often called mini-COBRA. Most apply only to insured plans, because states regulate insurance, not self-funded plans. These are the rules confirmed on each state\'s own site:',
          },
          {
            type: 'table',
            caption: 'State continuation coverage, verified on official state sites',
            columns: ['State', 'Who it covers', 'How long', 'Notes'],
            rows: [
              [
                '[California](/hr-by-state/california) (Cal-COBRA)',
                'Employers with 2 to 19 eligible employees on at least 50 percent of working days; insured plans and HMOs, not self-insured plans',
                'Up to 36 months',
                'People who use up 18 months of federal COBRA can extend through Cal-COBRA to a combined 36 months.',
              ],
              [
                '[New York](/hr-by-state/new-york)',
                'Employers with fewer than 20 employees',
                'Up to 36 months',
                'Premium up to 102 percent. The employee requests continuation in writing within 60 days of the later of termination or the notice of rights.',
              ],
              [
                '[New Jersey](/hr-by-state/new-jersey)',
                'Employers with 1 to 50 employees that buy a small group health plan',
                'Same periods as federal COBRA',
                'Premium up to 102 percent. Employers with 20 to 50 employees must follow both COBRA and the state law.',
              ],
              [
                '[Texas](/hr-by-state/texas)',
                'Group plans subject to Texas insurance law, not self-funded plans',
                '9 months if not eligible for COBRA; 6 more months after COBRA ends',
                'The employee must have had coverage for the 3 months before the job ended. Usually not available to someone fired.',
              ],
              [
                '[Florida](/hr-by-state/florida)',
                'Employers with fewer than 20 employees',
                '18 months (29 with a disability)',
                'Premium up to 115 percent. The former employee notifies the insurance carrier within 63 days of the qualifying event.',
              ],
            ],
          },
          {
            type: 'p',
            text: 'Other states, including Illinois, also have continuation laws. Ask your insurer which state law your policy follows and who sends the notices.',
          },
        ],
      },
      {
        heading: 'Common mistakes',
        blocks: [
          {
            type: 'list',
            items: [
              'Counting only full-time staff. Part-time employees count as fractions and can push you over 20.',
              'Missing the 30-day notice to the plan administrator because the employee quit rather than being let go. Both are qualifying events.',
              'Treating "gross misconduct" as an easy exit from COBRA. It is the only reason for ending employment that removes COBRA rights, so have a lawyer review any denial on that basis.',
              'Forgetting dental and vision plans. They are group health plans too.',
              'Assuming a self-funded plan gets state continuation rules. State mini-COBRA laws generally reach insured plans only.',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Do small businesses have to offer health insurance at all?',
        a: 'COBRA only applies if you already offer a group health plan. Whether you have to offer one at all is a separate question, covered in [do small businesses have to offer health insurance](/guides/do-small-businesses-have-to-offer-health-insurance).',
      },
      {
        q: 'Does an employee fired for poor performance get COBRA?',
        a: 'Yes, as a rule. Ending employment for any reason other than gross misconduct is a qualifying event. If you are thinking of denying COBRA for misconduct, get legal advice first.',
      },
      {
        q: 'Who sends the COBRA election notice?',
        a: 'The plan administrator, within 14 days after learning of the qualifying event. That is often your insurer or a COBRA vendor, but the employer must tell them within 30 days that employment ended.',
      },
      {
        q: 'How long does a former employee have to sign up?',
        a: 'At least 60 days from the later of the date the election notice is provided or the date coverage would end.',
      },
    ],
    mambahr:
      'MambaHR keeps your employee records and prepares the COBRA continuation notices at offboarding. Federal and state continuation questions get answers with the law cited, and unclear cases go to a person. Every change is logged.',
    sources: [
      {
        label: 'DOL EBSA: An Employer\'s Guide to Group Health Continuation Coverage Under COBRA',
        url: 'https://www.dol.gov/sites/dolgov/files/ebsa/about-ebsa/our-activities/resource-center/publications/an-employers-guide-to-group-health-continuation-coverage-under-cobra.pdf',
      },
      {
        label: 'California Department of Insurance: Health FAQ (Cal-COBRA)',
        url: 'https://www.insurance.ca.gov/01-consumers/110-health/frequently-asked-questions.cfm',
      },
      {
        label: 'California Health and Safety Code 1366.21',
        url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=HSC&sectionNum=1366.21',
      },
      { label: 'New York DFS: COBRA FAQ', url: 'https://www.dfs.ny.gov/consumers/health_insurance/cobra_faqs' },
      {
        label: 'New Jersey DOBI: Small Employer Health Benefits Program Buyer\'s Guide',
        url: 'https://www.nj.gov/dobi/division_insurance/ihcseh/sehbuyersguide/2019.pdf',
      },
      { label: 'Texas Department of Insurance: Continuing your health coverage', url: 'https://www.tdi.texas.gov/pubs/consumer/cb005.html' },
      {
        label: 'Florida Statutes 627.6692 (Health Insurance Coverage Continuation Act)',
        url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0600-0699%2F0627%2FSections%2F0627.6692.html',
      },
    ],
    related: [
      '/guides/employee-offboarding-checklist',
      '/guides/do-small-businesses-have-to-offer-health-insurance',
      '/guides/severance-agreements',
      '/guides/hr-laws-by-company-size',
      '/hr-by-state/california',
    ],
  },

  // ── 3. Severance ─────────────────────────────────────────────────────────
  {
    slug: 'severance-agreements',
    category: 'Offboarding',
    title: 'Do you have to pay severance? (and how to write a severance agreement)',
    metaTitle: 'Do You Have to Pay Severance? Severance Agreements | MambaHR',
    metaDescription:
      'No federal law requires severance pay. If you offer it for a release, workers 40 and older need 21 days to consider and 7 days to revoke. What to include.',
    answer:
      'No federal law requires a private employer to pay severance; it is a matter of agreement between you and the employee, unless your own policy, a contract or a state law such as New Jersey\'s mass layoff law requires it. If you offer severance in exchange for a release of claims, a worker 40 or older must get at least 21 days to consider it (45 days in a group layoff) and 7 days after signing to revoke.',
    sections: [
      {
        heading: 'When you owe severance',
        blocks: [
          {
            type: 'p',
            text: 'The Fair Labor Standards Act (FLSA) does not require severance pay. The DOL describes severance as a matter of agreement between an employer and an employee. You can still end up owing it:',
          },
          {
            type: 'list',
            items: [
              'Your own promise: an offer letter, employment contract, handbook or written severance policy that says what departing employees get.',
              'New Jersey mass layoffs: employers with 100 or more employees must pay one week of pay for each full year of employment to every employee terminated in a covered layoff or closing, plus four more weeks if they gave less than 90 days\' notice. That severance cannot be waived without approval from the state labor commissioner or a court. See [WARN notice](/guides/warn-act-layoffs).',
              'Federal WARN: severance you owe under a contract or policy does not offset back pay owed for missing a WARN notice. Only voluntary and unconditional payments do.',
            ],
          },
          {
            type: 'p',
            text: 'Many companies offer severance for a different reason: in exchange for a signed release of legal claims, a smoother exit, and goodwill with the team that stays.',
          },
        ],
      },
      {
        heading: 'What a severance agreement usually contains',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'The payment: the amount, whether it is a lump sum or paid over time, and when it is paid (usually after the revocation period ends).',
              'Benefits: whether you will pay some or all of the COBRA premium, and for how long.',
              'The release: the claims the employee gives up, listed clearly. For employees 40 and older, the Age Discrimination in Employment Act (ADEA) must be named.',
              'What is not released: future claims, rights that cannot be waived by law, and the right to file a charge with or take part in an investigation by the EEOC or a state agency.',
              'Return of company property and confirmation that access has ended.',
              'Confidentiality and non-disparagement, written narrowly. State and federal rules limit how far these can go, so have counsel review them.',
              'References: who answers reference requests and what they will say.',
              'Time to consider, the right to revoke, and written advice to consult a lawyer.',
            ],
          },
          {
            type: 'p',
            text: 'The payment must be something the employee was not already owed. Final wages, earned commissions and any vacation payout your state requires are due anyway and do not count. Pay them on time whether or not the agreement is signed. See [final paycheck laws](/guides/final-paycheck-laws).',
          },
        ],
      },
      {
        heading: 'Employees 40 and older: the OWBPA rules',
        blocks: [
          {
            type: 'p',
            text: 'The Older Workers Benefit Protection Act (OWBPA) amended the ADEA to set minimum rules before a worker 40 or older can validly waive age discrimination claims. The EEOC lists them:',
          },
          {
            type: 'list',
            items: [
              'Written in plain language that the average employee can understand.',
              'Refers specifically to rights or claims under the ADEA.',
              'Does not waive rights or claims that arise after the employee signs.',
              'Gives something of value beyond what the employee is already entitled to.',
              'Advises the employee in writing to consult a lawyer before signing.',
              'Gives at least 21 days to consider the agreement. The employee may sign sooner if the choice is knowing and voluntary. The EEOC says material changes to the final offer restart the period.',
              'Gives at least 7 days after signing to revoke. Because the employee can still revoke during those 7 days, schedule the payment after they pass.',
            ],
          },
          {
            type: 'p',
            text: 'For employees under 40, the general test still applies: the release must be knowing and voluntary, and courts look at whether the language was clear, whether there was enough time to review it, and whether the employee could consult a lawyer.',
          },
        ],
      },
      {
        heading: 'Group layoffs: 45 days and the disclosure',
        blocks: [
          {
            type: 'p',
            text: 'When you offer severance for a release to a group or class of employees, as in a layoff, employees 40 and older must get at least 45 days to consider it, and you must give them written information about the program:',
          },
          {
            type: 'list',
            items: [
              'The decisional unit: the group of employees considered (a department, facility or job classification, for example).',
              'Who is eligible for the program and the factors used to choose who is laid off.',
              'Any time limits that apply.',
              'The job titles and ages of everyone selected, and of everyone in the same unit who was not selected. Use individual ages, not age bands.',
            ],
          },
          {
            type: 'p',
            text: 'Planning a layoff? Check [WARN notice rules](/guides/warn-act-layoffs) at the same time, because the timelines overlap.',
          },
        ],
      },
      {
        heading: 'California adds its own rules',
        blocks: [
          {
            type: 'p',
            text: 'Under California Government Code 12964.5, a separation agreement cannot stop the employee from disclosing information about unlawful acts in the workplace. Any confidentiality or non-disparagement clause must include this sentence, in substantially this form: "Nothing in this agreement prevents you from discussing or disclosing information about unlawful acts in the workplace, such as harassment or discrimination or any other conduct that you have reason to believe is unlawful."',
          },
          {
            type: 'p',
            text: 'You must also tell the employee they have the right to consult a lawyer about the agreement and give them at least five business days to do so. The employee can sign sooner if the decision is knowing and voluntary. See [firing an employee in California](/guides/firing-an-employee-in-california).',
          },
        ],
      },
      {
        heading: 'Taxes on severance',
        blocks: [
          {
            type: 'p',
            text: 'The IRS treats severance as wages. It is subject to federal income tax withholding, Social Security and Medicare taxes, and federal unemployment (FUTA) tax, and it goes on the employee\'s W-2. Severance is a supplemental wage, so you can withhold federal income tax at the flat 22 percent rate, or 37 percent on supplemental wages above $1 million in the year. Run it through payroll, not accounts payable.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'How much severance should a small company offer?',
        a: 'There is no legal formula outside specific cases such as New Jersey mass layoffs. Many companies use a set number of weeks of pay per year of service, plus some paid COBRA months. Whatever you choose, apply it consistently.',
      },
      {
        q: 'Can a severance agreement stop someone from filing an EEOC charge?',
        a: 'No. An employee can still file a charge with the EEOC and take part in an EEOC investigation, whatever the agreement says. The EEOC explains that an employee can waive the right to recover money from the employer, but not the right to file.',
      },
      {
        q: 'Can the employee sign before the 21 days are up?',
        a: 'Yes, if the decision is knowing and voluntary. The 7-day revocation period after signing still applies and cannot be shortened.',
      },
      {
        q: 'Is severance taxed differently from salary?',
        a: 'It is still wages, subject to income tax withholding and Social Security and Medicare taxes. Because it is a supplemental wage, you may withhold federal income tax at a flat 22 percent.',
      },
    ],
    mambahr:
      'MambaHR drafts the separation paperwork when someone leaves and answers federal and state questions like these with the law cited, sending unclear cases to a person. Terminations always go to a person, and the severance payment becomes a payroll change for your current provider or Deel-managed payroll (Powered by Deel).',
    sources: [
      { label: 'DOL: Severance pay', url: 'https://www.dol.gov/general/topic/wages/severancepay' },
      {
        label: 'EEOC: Q&A, Understanding Waivers of Discrimination Claims in Employee Severance Agreements',
        url: 'https://www.eeoc.gov/laws/guidance/qa-understanding-waivers-discrimination-claims-employee-severance-agreements',
      },
      {
        label: 'California Government Code 12964.5',
        url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12964.5',
      },
      { label: 'IRS: Publication 15 (2026), Employer\'s Tax Guide', url: 'https://www.irs.gov/publications/p15' },
      { label: 'New Jersey DOL: N.J.S.A. 34:21-1 et seq. (WARN law as amended)', url: 'https://www.nj.gov/labor/assets/PDFs/WARN/NJ_WARN_ACT_2023law.pdf' },
      {
        label: 'DOL ETA: WARN Employer\'s Guide to Advance Notice of Closings and Layoffs',
        url: 'https://www.dol.gov/sites/dolgov/files/ETA/Layoff/pdfs/_EmployerWARN2003.pdf',
      },
    ],
    related: [
      '/guides/how-to-fire-an-employee',
      '/guides/employee-offboarding-checklist',
      '/guides/warn-act-layoffs',
      '/guides/firing-an-employee-in-california',
      '/guides/final-paycheck-laws',
    ],
  },

  // ── 4. WARN ──────────────────────────────────────────────────────────────
  {
    slug: 'warn-act-layoffs',
    category: 'Offboarding',
    title: 'Do you need to give WARN notice before a layoff?',
    metaTitle: 'Do You Need to Give WARN Notice Before a Layoff? | MambaHR',
    metaDescription:
      'Federal WARN requires 60 days\' notice when an employer with 100+ employees closes a site or lays off 50+ workers. Some states, like NY and NJ, require 90 days.',
    answer:
      'Under the federal WARN Act, you must give 60 days\' written notice if you have 100 or more employees (not counting part-time workers) and you close a site affecting 50 or more workers, or lay off 500 or more workers, or 50 to 499 who make up at least 33 percent of the site\'s workforce. Several states go further: New York covers employers with 50 or more full-time employees and requires 90 days, and New Jersey requires 90 days plus mandatory severance.',
    sections: [
      {
        heading: 'Who is covered by federal WARN',
        blocks: [
          {
            type: 'p',
            text: 'The Worker Adjustment and Retraining Notification (WARN) Act covers private for-profit businesses, private nonprofits and quasi-public entities that have either:',
          },
          {
            type: 'list',
            items: [
              '100 or more full-time employees, not counting employees with less than 6 months on the job or those working fewer than 20 hours a week; or',
              '100 or more employees, including part-time, who together work at least 4,000 hours a week.',
            ],
          },
          {
            type: 'p',
            text: 'Most companies with fewer than 100 employees are outside federal WARN. Check the state table below, because some state laws start at 50 or 75 employees. See [HR laws by company size](/guides/hr-laws-by-company-size).',
          },
        ],
      },
      {
        heading: 'What triggers a notice',
        blocks: [
          {
            type: 'table',
            caption: 'Federal WARN triggers (part-time workers are not counted)',
            columns: ['Event', 'Threshold'],
            rows: [
              [
                'Plant closing',
                'A site, or an operating unit within it, shuts down permanently or temporarily, and 50 or more employees lose their jobs within 30 days',
              ],
              ['Mass layoff (large)', '500 or more employees laid off at one site within 30 days'],
              [
                'Mass layoff (smaller)',
                '50 to 499 employees laid off at one site within 30 days, if they are at least 33 percent of the site\'s active workforce',
              ],
              [
                'What counts as a job loss',
                'A termination, a layoff of more than 6 months, or hours cut by 50 percent or more in each month of a 6-month period',
              ],
            ],
          },
          {
            type: 'p',
            text: 'Smaller cuts add up. If separate layoffs within any 90-day period together reach a threshold, you need to give notice unless you can show they had separate and distinct causes. Workers who resign, retire or are fired for cause do not count toward the thresholds.',
          },
        ],
      },
      {
        heading: 'Who gets notice, and what it says',
        blocks: [
          {
            type: 'list',
            items: [
              'Each affected employee, or their union representative if they have one. Part-time workers do not count toward the thresholds, but they are entitled to notice.',
              'The state dislocated worker unit (the state Rapid Response team).',
              'The chief elected official of the local government where the site is.',
            ],
          },
          {
            type: 'p',
            text: 'The notice to employees must be written in plain language and say whether the action is permanent or temporary, the expected date of separation, whether bumping rights exist, and a contact name and phone number. You may give a 14-day window for the separation date. A notice tucked into a pay envelope or given only verbally does not count.',
          },
        ],
      },
      {
        heading: 'Exceptions and penalties',
        blocks: [
          {
            type: 'p',
            text: 'Three exceptions can shorten the 60 days: a faltering company actively seeking capital that would avoid the closing (plant closings only), business circumstances that were not reasonably foreseeable, and natural disasters. Even then, you must give notice as soon as practicable and explain why it is short. WARN does not apply to the closing of a temporary facility or the end of a temporary project when workers knew the job was temporary.',
          },
          {
            type: 'p',
            text: 'An employer that violates WARN owes each affected employee back pay and benefits for each day of the violation, up to 60 days. Failing to notify the local government can add a civil penalty of up to $500 a day, which you can avoid by paying each affected employee within three weeks after the closing or layoff. The law does not recognize pay in lieu of notice, but paying full wages and benefits for the 60 days effectively removes the damages.',
          },
        ],
      },
      {
        heading: 'State WARN laws',
        blocks: [
          {
            type: 'p',
            text: 'State laws apply on top of federal WARN, often with lower thresholds or longer notice. These are the rules checked against each state\'s own sources:',
          },
          {
            type: 'table',
            caption: 'State mini-WARN laws, verified on official state sources',
            columns: ['State', 'Who is covered', 'What triggers it', 'Notice'],
            rows: [
              [
                '[California](/hr-by-state/california)',
                'A covered establishment that employs, or employed in the last 12 months, 75 or more people',
                'A layoff of 50 or more employees in any 30-day period, a relocation of 100 miles or more, or a termination of operations',
                '60 days, to employees, the EDD, the local workforce development board and city and county officials. The notice must include California-specific details such as the local workforce board contact and information about CalFresh.',
              ],
              [
                '[New York](/hr-by-state/new-york)',
                'Private employers with 50 or more full-time employees in New York',
                'A closing affecting 25 or more employees; a layoff of 25 or more full-time employees who are at least 33 percent of the site; or 250 or more full-time employees. Also some relocations and hours cuts.',
                '90 days, to employees, their representatives, the state DOL, local workforce boards and local officials',
              ],
              [
                '[New Jersey](/hr-by-state/new-jersey)',
                'Employers with 100 or more employees (part-time employees count)',
                'A closing, transfer or mass layoff ending the jobs of 50 or more employees at or reporting to the establishment (which can be all New Jersey locations) within 30 days',
                '90 days, plus mandatory severance of one week of pay per full year of employment, and four more weeks if notice was short',
              ],
              [
                '[Illinois](/hr-by-state/illinois)',
                'Employers with 75 or more full-time employees',
                'A plant closing affecting 50 or more employees; a layoff of 25 or more full-time employees who are at least one third of the site, or 250 or more',
                '60 days',
              ],
              [
                '[Washington](/hr-by-state/washington)',
                'Employers with 50 or more employees in Washington, not counting part-time employees',
                'A business closing or mass layoff causing job loss for 50 or more employees within 30 days',
                '60 days, to the Employment Security Department and employees or their union. Back pay up to 60 days plus up to $500 a day in civil penalties.',
              ],
            ],
          },
          {
            type: 'p',
            text: 'Other states have their own notice laws too. If you have employees in several states, check each one with its labor or workforce agency.',
          },
        ],
      },
      {
        heading: 'How to plan a layoff with WARN in mind',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Count employees company-wide and by site, separating full-time from part-time.',
              'List every planned job loss with dates, and look 90 days back and 90 days ahead for other cuts.',
              'Check each state where affected employees work, since state thresholds can be lower and notice longer.',
              'Work backward from the separation date: 60 days for federal WARN, 90 days in New York and New Jersey.',
              'Prepare the employee, state and local notices together, and keep proof of delivery.',
              'Prepare severance agreements with the 45-day review period and disclosures required for employees 40 and older. See [severance agreements](/guides/severance-agreements).',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Can I pay 60 days of wages instead of giving notice?',
        a: 'The federal law does not recognize pay in lieu of notice. But because damages are capped at back pay and benefits for up to 60 days, the DOL says paying full wages and benefits for that period effectively precludes any relief. State laws can differ, such as New Jersey\'s extra four weeks of severance.',
      },
      {
        q: 'Does WARN apply to a company with 60 employees?',
        a: 'Not federal WARN, which starts at 100 employees. But New York\'s law covers employers with 50 or more full-time employees in the state, and Washington\'s covers employers with 50 or more employees in Washington.',
      },
      {
        q: 'Do part-time employees count?',
        a: 'Under federal WARN, part-time employees do not count toward the thresholds, but they must receive notice. New Jersey counts part-time employees.',
      },
      {
        q: 'Does selling the business trigger WARN?',
        a: 'Employees of the seller automatically become employees of the buyer for WARN purposes, so the technical change of employer does not trigger notice. A closing or layoff before or after the sale can.',
      },
    ],
    mambahr:
      'MambaHR plans reductions in force with legal checks, and people make every decision. For each approved exit it drafts the separation paperwork, prepares the COBRA continuation notices and turns the exit into a payroll change. Every change is logged.',
    sources: [
      { label: 'DOL ETA: WARN Act compliance assistance', url: 'https://www.dol.gov/agencies/eta/layoffs/warn' },
      {
        label: 'DOL ETA: WARN Employer\'s Guide to Advance Notice of Closings and Layoffs',
        url: 'https://www.dol.gov/sites/dolgov/files/ETA/Layoff/pdfs/_EmployerWARN2003.pdf',
      },
      {
        label: 'California Labor Code 1400 to 1408 (Cal-WARN)',
        url: 'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=LAB&division=2.&title=&part=4.&chapter=4.&article=',
      },
      { label: 'New York DOL: WARN', url: 'https://dol.ny.gov/worker-adjustment-and-retraining-notification-warn' },
      { label: 'New Jersey DOL: N.J.S.A. 34:21-1 et seq. (WARN law as amended)', url: 'https://www.nj.gov/labor/assets/PDFs/WARN/NJ_WARN_ACT_2023law.pdf' },
      {
        label: 'Business.NJ.gov: Updates to employee rights under New Jersey WARN law',
        url: 'https://business.nj.gov/updates/important-updates-to-employee-rights-under-new-jersey-warn-law',
      },
      { label: 'Illinois DCEO: Notices of layoffs and closures (WARN)', url: 'https://dceo.illinois.gov/workforcedevelopment/warn.html' },
      {
        label: 'Washington Legislature: SB 5525 final bill report (2025)',
        url: 'https://lawfilesext.leg.wa.gov/biennium/2025-26/Htm/Bill%20Reports/House/5525-S.E%20HBA%20LAWS%2025.htm',
      },
    ],
    related: [
      '/guides/severance-agreements',
      '/guides/hr-laws-by-company-size',
      '/guides/employee-offboarding-checklist',
      '/rif',
      '/hr-by-state/new-york',
      '/hr-by-state/new-jersey',
    ],
  },
]
