import type { Guide } from './types'

// Compliance guides: workers' compensation, record retention, and whether a
// small business has to offer health insurance. Every rule below was checked
// against the official source listed in the record's `sources`.

export const complianceGuides: Guide[] = [
  // ── 1. Workers' compensation ────────────────────────────────────────────────
  {
    slug: 'workers-compensation-requirements',
    category: 'Compliance',
    title: "Do I need workers' compensation insurance?",
    metaTitle: "Do I Need Workers' Comp Insurance? State Rules | MambaHR",
    metaDescription:
      "Almost certainly, once you hire. Workers' comp is state law: CA, NY, WA, MA, CO, IL and NJ require it from employee one. Texas lets most employers opt out.",
    answer:
      "If you have employees, you almost certainly need workers' compensation insurance. It is required by state law, not federal law: California, New York, Washington, Massachusetts, Colorado, Illinois and New Jersey require it from your first employee, Georgia once you regularly employ 3 people, Florida once you have 4 (1 in construction), and Texas is the notable exception, where most private employers can choose not to carry it.",
    sections: [
      {
        heading: 'Workers’ comp is a state program',
        blocks: [
          {
            type: 'p',
            text: "Workers' compensation pays an employee's medical care and part of their lost wages after a work-related injury or illness. In return, the employee generally cannot sue the employer over the injury. There is no single federal workers' comp law for private businesses. The U.S. Department of Labor's [Office of Workers' Compensation Programs](https://www.dol.gov/agencies/owcp/wc) runs programs only for specific groups (federal employees, longshore and harbor workers, coal miners, and nuclear weapons workers) and points everyone else to their state's program.",
          },
          {
            type: 'p',
            text: 'So the real questions are state questions: which state your employees work in, how many people you employ there, and how that state lets you buy coverage. The rules below are for the ten states where most small US tech companies hire.',
          },
        ],
      },
      {
        heading: 'Who must carry coverage, state by state',
        blocks: [
          {
            type: 'table',
            caption: "Workers' compensation requirements in ten states",
            columns: ['State', 'Who must carry it', 'How you get coverage'],
            rows: [
              [
                'California',
                'Every employer with one or more employees, including family members who help in the business.',
                'A licensed insurance company or the State Compensation Insurance Fund (State Fund). Self-insurance is an option with state approval.',
              ],
              [
                'New York',
                'Virtually all employers. Part-time, temporary, seasonal, leased and unpaid workers count, as do family members and volunteers at a for-profit business.',
                'A private insurance carrier, the New York State Insurance Fund (NYSIF), or approved self-insurance.',
              ],
              [
                'Texas',
                'Not required for most private employers.',
                'Buy a policy, or opt out as a "non-subscriber" and meet the state notice and reporting duties (see below).',
              ],
              [
                'Washington',
                'Mandatory for every worker who does not fall under a specific exclusion.',
                'Only through the state fund run by the Department of Labor & Industries (L&I), or certified self-insurance (generally companies with at least $25 million in assets). Private workers’ comp insurance is not allowed.',
              ],
              [
                'Massachusetts',
                'All employers, no matter how many employees or how many hours they work. Domestic workers are covered once they work at least 16 hours a week.',
                'A private insurer, through an agent or broker. If two insurers turn you down, the state assigned risk pool. Self-insurance only for large employers.',
              ],
              [
                'Colorado',
                'Every employer with one or more employees, whether part-time, full-time or family members.',
                'A commercial insurance carrier or self-insurance. Pinnacol Assurance is required to offer coverage to any Colorado employer.',
              ],
              [
                'Illinois',
                'Employers of nearly everyone hired, injured, or whose job is based in Illinois. Coverage starts on the first day of work.',
                'A workers’ comp insurance policy, or permission to self-insure from the Illinois Workers’ Compensation Commission.',
              ],
              [
                'Florida',
                'Non-construction businesses with 4 or more employees, construction businesses with 1 or more, and farms with 6 regular or 12 seasonal workers. Corporate officers and LLC members count toward the total.',
                'A Florida policy from a Florida-approved insurer. Eligible business owners can file for an exemption for themselves.',
              ],
              [
                'New Jersey',
                'Every business where at least one person works for pay. Corporate officers count; partners, LLC members and sole owners do not.',
                'A policy from an insurer authorized in New Jersey, or self-insurance approved by the state.',
              ],
              [
                'Georgia',
                'Businesses that regularly employ 3 or more people, counting regular part-time and seasonal workers.',
                'A private insurance carrier, or self-insurance with state approval (available to large employers).',
              ],
            ],
          },
          {
            type: 'p',
            text: 'Owners are treated differently from state to state. Sole proprietors, partners and LLC members are often not required to cover themselves, and some states let corporate officers opt out. Your employees still have to be covered either way.',
          },
        ],
      },
      {
        heading: 'Texas: what opting out actually involves',
        blocks: [
          {
            type: 'p',
            text: 'Texas is the main state where a private employer can legally go without workers’ comp. Employers that do are called non-subscribers, and opting out is not the same as doing nothing. The Texas Department of Insurance, Division of Workers’ Compensation, lists these duties:',
          },
          {
            type: 'list',
            items: [
              'File a notice of no coverage with the state each year, between February 1 and April 30.',
              'Post a notice of no coverage in the workplace.',
              'Give written notice of no coverage to each new employee.',
              'If you have five or more employees, report work-related injuries and illnesses that cause more than one day of lost time, and deaths. Reports are due within one month and seven days.',
            ],
          },
          {
            type: 'p',
            text: 'Opting out is a business decision with real trade-offs, so talk it through with your insurance broker first. If you have people in Texas and in other states, the other states’ rules still apply to the people who work there.',
          },
        ],
      },
      {
        heading: 'Remote employees and teams in more than one state',
        blocks: [
          {
            type: 'p',
            text: 'Coverage generally follows where the employee is based, not where the company is incorporated. Washington, for example, decides employee by employee and looks at the state each person is based in. If any employee is based in Washington, you need a Washington workers’ comp account, even if your company is somewhere else. New Jersey says out-of-state employers may need New Jersey coverage when work is performed in New Jersey. Florida requires an out-of-state employer to have a Florida policy that lists Florida on it.',
          },
          {
            type: 'list',
            items: [
              'Before a remote hire starts, tell your insurer which state they will work from and confirm the policy covers that state. In Washington, the only route is an L&I account.',
              'When an existing employee moves, treat it like a new-state hire. The old state’s coverage may not follow them.',
              'Short trips into another state are handled differently from being based there. Some states have agreements with each other for temporary work, so check before assuming you need a second policy.',
            ],
          },
          {
            type: 'p',
            text: 'Workers’ comp is one of several registrations a new state brings. The rest are covered in [hiring employees in another state](/guides/hiring-employees-in-another-state).',
          },
        ],
      },
      {
        heading: 'What happens if you are not covered',
        blocks: [
          {
            type: 'p',
            text: 'Going uninsured where coverage is required is expensive even when nobody gets hurt. A few examples from the state agencies:',
          },
          {
            type: 'list',
            items: [
              'California: the Labor Commissioner issues a stop order barring the use of employee labor until you buy coverage, plus a penalty of twice the premium you would have paid or $1,500 per employee, whichever is greater.',
              'New Jersey: failing to insure is a disorderly persons offense (a crime of the fourth degree if willful), with penalties of up to $5,000 for the first ten days and up to $5,000 for each ten days after that. Corporate officers can be personally liable.',
              'Illinois: daily criminal penalties, a civil penalty of $500 for each uninsured day (minimum $10,000), and a possible stop-work order. An injured employee can also sue the employer in civil court.',
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
              'Assuming part-time or family workers do not count. In most of the states above, they do.',
              'Calling someone a contractor to avoid covering them. If the person is really an employee, the coverage duty applies. See [contractor vs. employee](/guides/contractor-vs-employee).',
              'Hiring a remote employee in a new state without adding that state to the policy.',
              'Deducting the premium from pay. Illinois says no part of the premium can be charged to the employee. Washington is unusual: employers may withhold a limited share of certain L&I premiums, capped at the rate on the employer’s rate notice.',
              'Confusing workers’ comp with general liability insurance. Massachusetts points out that they are not the same thing.',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: "Do I need workers' comp for just one part-time employee?",
        a: 'In California, New York, Washington, Massachusetts, Colorado, Illinois and New Jersey, yes. Georgia starts at 3 regular employees, Florida at 4 outside construction, and Texas does not require it for most private employers.',
      },
      {
        q: "Do I need workers' comp for independent contractors?",
        a: 'Generally no, for people who are truly independent contractors. If a worker is actually an employee under state law, though, you need to cover them, and some states (such as Washington) also look at certain contractors.',
      },
      {
        q: "Is workers' compensation a federal requirement?",
        a: 'No. Private-sector workers’ comp is set by each state. The federal Office of Workers’ Compensation Programs covers only federal employees and a few specific groups of workers.',
      },
      {
        q: "Can I buy workers' comp from any insurer?",
        a: 'In most states you can use a private insurer, and many states also have a state fund. Washington is different: coverage must come from the state fund run by L&I unless you are a certified self-insured employer.',
      },
    ],
    mambahr:
      'MambaHR keeps your employee records, including where each person works, and answers federal and state employment-law questions like this one with the law cited. Unclear cases go to a person to decide, and every change is logged.',
    sources: [
      { label: "U.S. DOL: Office of Workers' Compensation Programs, state contacts", url: 'https://www.dol.gov/agencies/owcp/wc' },
      { label: 'California DIR: DWC FAQs for employers', url: 'https://www.dir.ca.gov/dwc/faqs.html' },
      { label: "California DLSE: Do I have to have Workers' Compensation Insurance?", url: 'https://www.dir.ca.gov/dlse/FAQ-Workers%20Compensation.pdf' },
      { label: "New York WCB: Is Workers' Compensation Coverage Required?", url: 'https://www.wcb.ny.gov/content/main/coverage-required-wc.jsp' },
      { label: "New York WCB: Workers' Compensation Insurance", url: 'https://www.wcb.ny.gov/content/main/Employers/workers-compensation-insurance.jsp' },
      { label: 'Texas DWC: Coverage for employers', url: 'https://www.tdi.texas.gov/wc/employer/index.html' },
      { label: 'Texas DWC: Non-covered employers (non-subscribers)', url: 'https://www.tdi.texas.gov/wc/nonsubscriber.html' },
      { label: "Washington L&I: Do I Need a Workers' Comp Account?", url: 'https://lni.wa.gov/insurance/insurance-requirements/do-i-need-a-workers-comp-account/' },
      { label: "Washington L&I: Employers' Guide to Workers' Compensation Insurance", url: 'https://lni.wa.gov/forms-publications/f101-002-000.pdf' },
      { label: 'Washington L&I: Out-of-State Employers and Out-of-State Workers', url: 'https://lni.wa.gov/insurance/insurance-requirements/do-i-need-a-workers-comp-account/out-of-state-employers-and-out-of-state-workers' },
      { label: "Massachusetts DIA: Workers' Compensation Insurance Requirements", url: 'https://www.mass.gov/info-details/workers-compensation-insurance-requirements' },
      { label: "Massachusetts DIA: How and Where to Get Workers' Compensation Insurance", url: 'https://www.mass.gov/info-details/how-and-where-to-get-workers-compensation-insurance' },
      { label: "Colorado CDLE: Division of Workers' Compensation, employers", url: 'https://cdle.colorado.gov/dwc/employers' },
      { label: "Illinois Workers' Compensation Commission: Handbook on Workers' Compensation", url: 'https://iwcc.illinois.gov/content/dam/soi/en/web/iwcc/about/handbook/documents/handbook.pdf' },
      { label: "Florida Division of Workers' Compensation: Coverage requirements", url: 'https://www.myfloridacfo.com/division/wc/employer/coverage-requirements' },
      { label: "New Jersey DOL: Workers' Compensation employer requirements", url: 'https://www.nj.gov/labor/workerscompensation/employer-requirements/' },
      { label: "Georgia SBWC: Workers' Compensation Insurance FAQs", url: 'https://sbwc.georgia.gov/frequently-asked-questions/workers-compensation-insurance-faqs' },
    ],
    related: [
      '/guides/hiring-employees-in-another-state',
      '/guides/contractor-vs-employee',
      '/guides/how-to-hire-your-first-employee',
      '/guides/hr-laws-by-company-size',
      '/hr-by-state/texas',
      '/hr-by-state/washington',
    ],
  },

  // ── 2. Record retention ─────────────────────────────────────────────────────
  {
    slug: 'how-long-to-keep-employee-records',
    category: 'Compliance',
    title: 'How long do you have to keep employee records?',
    metaTitle: 'How Long to Keep Employee Records: Federal Rules | MambaHR',
    metaDescription:
      'Payroll records 3 years, time cards 2, Form I-9 3 years after hire or 1 after exit, employment tax records 4, OSHA logs 5. Federal table plus state rules.',
    answer:
      'Under federal law, keep payroll records for 3 years, time cards and wage-rate records for 2 years, personnel and hiring records for at least 1 year, Form I-9 for 3 years after hire or 1 year after employment ends (whichever is later), employment tax records for at least 4 years, and OSHA injury logs for 5 years. State law can require longer, such as California’s 4-year rule for personnel and applicant records.',
    sections: [
      {
        heading: 'The federal retention table',
        blocks: [
          {
            type: 'p',
            text: 'Each federal law sets its own clock, and they do not all start on the same day. Some run from when the record was made, some from the personnel action, some from termination, and some from a tax filing. This table puts them side by side.',
          },
          {
            type: 'table',
            caption: 'Minimum federal retention periods for employee records',
            columns: ['Record', 'Keep for at least', 'Clock starts', 'Rule'],
            rows: [
              [
                'Payroll records (name, pay rate, hours, wages paid)',
                '3 years',
                'From the record date',
                'Fair Labor Standards Act (FLSA), 29 CFR 516.5',
              ],
              [
                'Time cards, wage rate tables, work schedules, records of additions to or deductions from pay',
                '2 years',
                'From the record date',
                'FLSA, 29 CFR 516.6',
              ],
              [
                'Personnel and employment records: applications, hiring, promotion, demotion, transfer, layoff, termination, pay, accommodation requests',
                '1 year',
                'From the date the record was made or the personnel action, whichever is later',
                'Title VII, ADA and GINA, 29 CFR 1602.14',
              ],
              [
                'Personnel records of an employee you let go',
                '1 year',
                'From the termination date',
                '29 CFR 1602.14',
              ],
              [
                'Age records: payroll showing name, address, date of birth, occupation, pay rate and weekly earnings',
                '3 years',
                'From the record date',
                'Age Discrimination in Employment Act (ADEA), 29 CFR 1627.3',
              ],
              [
                'Age records: job applications, resumes, promotion, layoff, job ads',
                '1 year',
                'From the personnel action',
                'ADEA, 29 CFR 1627.3',
              ],
              [
                'Records of pay differences between men and women (wage rates, job evaluations, merit systems)',
                '2 years',
                'From the record date',
                'Equal Pay Act, per the EEOC',
              ],
              [
                'Family and Medical Leave Act (FMLA) records',
                '3 years',
                'From the record date',
                '29 CFR 825.500',
              ],
              [
                'Form I-9',
                '3 years after hire or 1 year after employment ends',
                'Whichever date is later',
                'USCIS',
              ],
              [
                'Employment tax records (W-4s, wages, deposits, returns)',
                '4 years',
                'After you file the fourth-quarter return for the year',
                'IRS',
              ],
              [
                'OSHA 300 Log, 300A summary, 301 incident reports',
                '5 years',
                'After the end of the calendar year the records cover',
                '29 CFR 1904.33',
              ],
            ],
          },
          {
            type: 'p',
            text: 'Not every law applies to every employer. Title VII, the ADA and GINA cover private employers with 15 or more employees, the ADEA covers those with 20 or more, the FMLA covers those with 50 or more, and the Equal Pay Act covers virtually all employers. See [HR laws by company size](/guides/hr-laws-by-company-size) for the full list.',
          },
        ],
      },
      {
        heading: 'Form I-9: how to work out the date',
        blocks: [
          {
            type: 'p',
            text: 'Keep every current employee’s Form I-9 for as long as they work for you. Once someone leaves, work out two dates and keep the form until the later one:',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Their hire date plus 3 years.',
              'Their last day plus 1 year.',
            ],
          },
          {
            type: 'p',
            text: 'In practice, if the person worked for you less than two years, the 3-years-from-hire date decides it. If they worked more than two years, keep the form for 1 year after they left. Keep the copies of identity documents you made with the form for the same period. More on the form itself is in [Form I-9 and E-Verify](/guides/form-i-9-and-e-verify).',
          },
        ],
      },
      {
        heading: 'If someone files a charge, stop the clock',
        blocks: [
          {
            type: 'p',
            text: 'The periods above are minimums for ordinary times. Once a discrimination charge or lawsuit is filed, the Equal Employment Opportunity Commission (EEOC) rules say you must keep every personnel record relevant to it until the charge or lawsuit is finally resolved. That includes records about the person who complained and about others in similar jobs. Do not let a routine deletion schedule run over records tied to an open dispute.',
          },
        ],
      },
      {
        heading: 'Medical records go in a separate, confidential file',
        blocks: [
          {
            type: 'p',
            text: 'Medical information you collect about employees or applicants under the Americans with Disabilities Act (ADA) has to be kept on separate forms, in separate medical files, and treated as confidential. Supervisors and managers may be told only what they need to know: necessary work restrictions and accommodations. FMLA certifications and medical histories follow the same rule: keep them separate from the regular personnel file.',
          },
        ],
      },
      {
        heading: 'OSHA injury logs and who is exempt',
        blocks: [
          {
            type: 'p',
            text: 'Employers that must keep OSHA injury and illness records have to save the OSHA 300 Log, the 300A annual summary and the 301 incident reports for 5 years after the end of the year they cover, and update the stored logs if a case changes. Many small tech companies are partly exempt:',
          },
          {
            type: 'list',
            items: [
              'If you had 10 or fewer employees at all times during the last calendar year, you do not need to keep these records unless OSHA or the Bureau of Labor Statistics asks you in writing.',
              'Certain low-hazard industries are partly exempt regardless of size. The list includes software publishers, computer systems design, data processing and hosting, and many professional services firms.',
              'Every employer, exempt or not, must report a work-related death to OSHA within 8 hours, and an in-patient hospitalization, amputation or loss of an eye within 24 hours.',
            ],
          },
        ],
      },
      {
        heading: 'State rules can be longer: California as an example',
        blocks: [
          {
            type: 'p',
            text: 'Many states add their own retention rules, and the longer rule wins. California shows how much longer they can be:',
          },
          {
            type: 'list',
            items: [
              'Payroll records showing hours worked each day and wages paid: at least 3 years (Labor Code 1174).',
              'Each employee’s personnel records: at least 3 years after employment ends (Labor Code 1198.5).',
              'Applications, personnel and employment records for employers covered by the Fair Employment and Housing Act: at least 4 years from when the record was created, and personnel files of applicants and terminated employees for 4 years after the employment action (Government Code 12946).',
            ],
          },
          {
            type: 'p',
            text: 'If you have people in several states, the simplest safe approach is one retention schedule that uses the longest period that applies to each type of record. The state pages under [HR by state](/hr-by-state) cover other state rules.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Can I keep employee records longer than the minimum?',
        a: 'Yes. The federal periods are minimums. Many employers keep personnel files for several years after someone leaves so they can answer questions about pay or dates of employment, but anything you keep can also be requested in a dispute, so set a schedule and follow it.',
      },
      {
        q: 'Can employee records be stored electronically?',
        a: 'Generally yes. The FMLA rules, for example, allow records to be kept in electronic or other form as long as they can be viewed and reproduced, and FLSA records may be kept at the workplace or a central records office as long as they are available for inspection.',
      },
      {
        q: 'How long do I keep records for job applicants I did not hire?',
        a: 'Under federal rules, at least 1 year from when the record was made or the hiring decision, whichever is later. California requires 4 years for employers covered by its Fair Employment and Housing Act.',
      },
      {
        q: 'Do I keep a terminated employee’s Form I-9 forever?',
        a: 'No. Keep it until 3 years after the hire date or 1 year after employment ended, whichever is later. After that date the federal retention requirement ends.',
      },
    ],
    mambahr:
      'MambaHR is the HR records system, so hiring records, personnel changes, leave and exits sit in one place, and every change is logged. It starts the Form I-9 at onboarding and answers retention questions with the federal or state rule cited, sending unclear cases to a person.',
    sources: [
      { label: 'DOL: Fact Sheet #21, Recordkeeping Requirements under the FLSA', url: 'https://www.dol.gov/agencies/whd/fact-sheets/21-flsa-recordkeeping' },
      { label: 'EEOC: Recordkeeping Requirements', url: 'https://www.eeoc.gov/employers/recordkeeping-requirements' },
      { label: 'eCFR: 29 CFR 1602.14, Preservation of records made or kept', url: 'https://www.ecfr.gov/current/title-29/section-1602.14' },
      { label: 'eCFR: 29 CFR 1627.3, ADEA records to be kept by employers', url: 'https://www.ecfr.gov/current/title-29/section-1627.3' },
      { label: 'eCFR: 29 CFR 825.500, FMLA recordkeeping requirements', url: 'https://www.ecfr.gov/current/title-29/section-825.500' },
      { label: 'USCIS: Handbook for Employers M-274, Retaining Form I-9', url: 'https://www.uscis.gov/i-9-central/form-i-9-resources/handbook-for-employers-m-274/100-retaining-form-i-9' },
      { label: 'IRS: Employment tax recordkeeping', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/employment-tax-recordkeeping' },
      { label: 'eCFR: 29 CFR 1904.33, OSHA retention and updating', url: 'https://www.ecfr.gov/current/title-29/section-1904.33' },
      { label: 'eCFR: 29 CFR 1904 Subpart B, partial exemptions and exempt industries', url: 'https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1904/subpart-B' },
      { label: 'OSHA: Recordkeeping', url: 'https://www.osha.gov/recordkeeping' },
      { label: 'eCFR: 29 CFR 1630.14, ADA medical examinations and confidentiality', url: 'https://www.ecfr.gov/current/title-29/section-1630.14' },
      { label: 'EEOC: Coverage of business and private employers', url: 'https://www.eeoc.gov/employers/coverage-businessprivate-employers' },
      { label: 'California Labor Code 1174', url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=1174' },
      { label: 'California Labor Code 1198.5', url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=1198.5' },
      { label: 'California Government Code 12946', url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12946' },
    ],
    related: [
      '/guides/form-i-9-and-e-verify',
      '/guides/hr-laws-by-company-size',
      '/guides/employee-offboarding-checklist',
      '/guides/how-to-handle-an-fmla-request',
      '/hr-by-state/california',
    ],
  },

  // ── 3. Health insurance for small businesses ────────────────────────────────
  {
    slug: 'do-small-businesses-have-to-offer-health-insurance',
    category: 'Compliance',
    title: 'Do small businesses have to offer health insurance?',
    metaTitle: 'Do Small Businesses Have to Offer Health Insurance? | MambaHR',
    metaDescription:
      'Not under federal law until you reach 50 full-time employees, counting full-time equivalents. Below that, coverage is optional, with a tax credit and HRAs.',
    answer:
      'No federal law requires a business with fewer than 50 full-time employees (counting full-time equivalents) to offer health insurance. The Affordable Care Act’s employer mandate applies only to applicable large employers, those with 50 or more full-time and full-time-equivalent employees on average in the prior year. A few states add their own rules, such as Hawaii’s Prepaid Health Care Act.',
    sections: [
      {
        heading: 'The 50-employee line: applicable large employers',
        blocks: [
          {
            type: 'p',
            text: 'The Affordable Care Act (ACA) rule that pushes employers to offer coverage is called the employer shared responsibility provision, often shortened to the employer mandate. It applies only to applicable large employers (ALEs). You are an ALE for this year if you had at least 50 full-time employees, including full-time equivalent employees, on average during the prior year. The IRS notes that the vast majority of employers fall below that line.',
          },
          {
            type: 'p',
            text: 'Companies with a common owner, or that are otherwise related under the tax code’s controlled group rules, are generally combined and counted as one employer. A brand-new company becomes an ALE in its first year if it reasonably expects to employ, and actually does employ, an average of at least 50 full-time employees, including equivalents.',
          },
        ],
      },
      {
        heading: 'How to count full-time and full-time equivalent employees',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Count your full-time employees for each month of the prior year. Full-time means an average of at least 30 hours of service a week, or at least 130 hours in the month.',
              'For the same month, add up the hours of everyone who is not full-time, counting no more than 120 hours for any one person.',
              'Divide that total by 120. The result is your full-time equivalent (FTE) count for the month.',
              'Add up the full-time counts for all twelve months, add up the FTE counts for all twelve months, add those two totals together, and divide by 12.',
              'Round a fraction down to the next whole number. If the result is 50 or more, you are an ALE for the current year.',
            ],
          },
          {
            type: 'p',
            text: 'Example: 40 full-time employees plus 12 part-timers who each work 80 hours a month. The part-timers add 960 hours, which divided by 120 is 8 FTEs. That is 48 in total for the month, so if every month looks the same, you are under 50. There is a narrow seasonal worker exception: if you went over 50 for 120 days or fewer, and the extra people in that period were seasonal workers, you are not an ALE.',
          },
        ],
      },
      {
        heading: 'What applicable large employers have to do',
        blocks: [
          {
            type: 'p',
            text: 'An ALE may owe the IRS a payment in two situations:',
          },
          {
            type: 'list',
            items: [
              'It does not offer minimum essential coverage to at least 95% of its full-time employees and their dependents, and at least one full-time employee gets a premium tax credit for Marketplace coverage.',
              'It does offer coverage, but the coverage is not affordable or does not provide minimum value, and a full-time employee gets a premium tax credit.',
            ],
          },
          {
            type: 'p',
            text: 'ALEs also file Forms 1094-C and 1095-C with the IRS each year and give each full-time employee a Form 1095-C describing the coverage offered. For the 2025 calendar year, statements were due to employees by March 2, 2026, and electronic filing with the IRS was due by March 31, 2026. Anyone filing 10 or more information returns must file electronically.',
          },
        ],
      },
      {
        heading: 'Under 50: your options if you want to help with health costs',
        blocks: [
          {
            type: 'p',
            text: 'Offering nothing is legal for a small business, but most competitive hires will ask. These are the main routes:',
          },
          {
            type: 'table',
            caption: 'Ways a small employer can help with health coverage',
            columns: ['Option', 'Who can use it', 'Key points'],
            rows: [
              [
                'Small group plan through the Small Business Health Options Program (SHOP)',
                'Small employers',
                'A traditional group plan. Buying through SHOP is generally the only way to qualify for the Small Business Health Care Tax Credit.',
              ],
              [
                'Small Business Health Care Tax Credit',
                'Fewer than 25 FTEs, average wages under the IRS limit ($67,000 per FTE for 2025 tax years), paying at least 50% of employee-only premiums for SHOP coverage',
                'Worth up to 50% of premiums paid (35% for tax-exempt employers), for two consecutive tax years.',
              ],
              [
                'Qualified Small Employer HRA (QSEHRA)',
                'Employers with fewer than 50 employees that do not offer a group health plan',
                'Reimburses employees tax-free for individual coverage and medical costs, up to $6,450 for self-only and $13,100 for family coverage in 2026.',
              ],
              [
                'CHOICE arrangement (formerly called the Individual Coverage HRA, or ICHRA)',
                'Employers of any size with at least one employee who is not an owner or an owner’s spouse',
                'No annual maximum. Employees must have their own individual coverage, such as a Marketplace plan. You can vary the offer by class of employee (for example full-time versus part-time, or by work location).',
              ],
            ],
          },
          {
            type: 'p',
            text: 'An HRA (health reimbursement arrangement) pays employees back for health costs instead of buying them a group plan. With a CHOICE arrangement, employees must get a written notice when they become eligible, and current employees must get one 90 days before each plan year starts.',
          },
        ],
      },
      {
        heading: 'State rules to know',
        blocks: [
          {
            type: 'list',
            items: [
              'Hawaii: the Prepaid Health Care Act requires employers to provide health coverage to employees who work at least 20 hours a week and earn at least 86.67 times the Hawaii minimum wage in a month. Coverage starts after four consecutive weeks of employment.',
              'Massachusetts: every employer, in state or out of state, with six or more employees in Massachusetts during the past 12 months must file the Health Insurance Responsibility Disclosure (HIRD) form each year, between November 15 and December 15, through MassTaxConnect. The state says the form is not used to impose fines related to the coverage an employer offers, or does not offer.',
            ],
          },
        ],
      },
      {
        heading: 'If you do offer a plan: COBRA and state continuation',
        blocks: [
          {
            type: 'p',
            text: 'Once you have a group health plan, other rules follow it. The federal continuation law, COBRA, applies to group health plans of employers with 20 or more employees in the prior year: departing employees and their families can keep the coverage for a time at their own cost, and you have notices to send. See [when you need to offer COBRA](/guides/when-do-you-need-to-offer-cobra).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Do part-time employees count toward the 50-employee threshold?',
        a: 'Yes, through the full-time equivalent calculation. Their monthly hours (up to 120 per person) are added together and divided by 120, and the result is added to your full-time count.',
      },
      {
        q: 'Is there a penalty for a small business that does not offer health insurance?',
        a: 'Not under federal law if you are not an applicable large employer. The employer shared responsibility payment applies only to employers with 50 or more full-time employees, including equivalents.',
      },
      {
        q: 'Can a small business just pay employees extra to buy their own insurance?',
        a: 'You can raise pay, but a QSEHRA or a CHOICE arrangement is the purpose-built way to reimburse employees for individual coverage, with its own rules on who qualifies, notices and limits.',
      },
      {
        q: 'Do I have to file Form 1095-C if I have fewer than 50 employees?',
        a: 'Forms 1094-C and 1095-C are filed by applicable large employers. If you are below the ALE threshold, you do not file them as an employer.',
      },
    ],
    mambahr:
      'MambaHR keeps your employee records and answers federal and state employment-law questions like this one with the law cited, sending unclear cases to a person. When someone leaves, it prepares the COBRA continuation notices as part of offboarding.',
    sources: [
      { label: 'IRS: Determining if an employer is an applicable large employer', url: 'https://www.irs.gov/affordable-care-act/employers/determining-if-an-employer-is-an-applicable-large-employer' },
      { label: 'IRS: Employer shared responsibility provisions', url: 'https://www.irs.gov/affordable-care-act/employers/employer-shared-responsibility-provisions' },
      { label: 'IRS: Information reporting by applicable large employers', url: 'https://www.irs.gov/affordable-care-act/employers/information-reporting-by-applicable-large-employers' },
      { label: 'IRS: Instructions for Forms 1094-C and 1095-C (2025)', url: 'https://www.irs.gov/instructions/i109495c' },
      { label: 'IRS: Small Business Health Care Tax Credit and the SHOP Marketplace', url: 'https://www.irs.gov/affordable-care-act/employers/small-business-health-care-tax-credit-and-the-shop-marketplace' },
      { label: 'IRS: Instructions for Form 8941 (2025)', url: 'https://www.irs.gov/instructions/i8941' },
      { label: 'IRS: Rev. Proc. 2025-32 (2026 QSEHRA limits)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
      { label: 'HealthCare.gov: Deciding between group coverage and an HRA', url: 'https://www.healthcare.gov/small-businesses/learn-more/hra-guide/' },
      { label: 'HealthCare.gov: CHOICE Arrangements', url: 'https://www.healthcare.gov/small-businesses/learn-more/individual-coverage-hra/' },
      { label: 'Hawaii DLIR: About Prepaid Health Care', url: 'https://labor.hawaii.gov/dcd/home/about-phc/' },
      { label: 'Massachusetts DOR: HIRD FAQs', url: 'https://www.mass.gov/info-details/health-insurance-responsibility-disclosure-hird-faqs' },
      { label: 'DOL: COBRA continuation coverage', url: 'https://www.dol.gov/general/topic/health-plans/cobra' },
    ],
    related: [
      '/guides/when-do-you-need-to-offer-cobra',
      '/guides/hr-laws-by-company-size',
      '/guides/how-to-hire-your-first-employee',
      '/guides/how-to-run-payroll-for-your-first-employee',
      '/hr-by-state/massachusetts',
    ],
  },
]
