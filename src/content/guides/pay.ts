import type { Guide } from './types'

// Pay guides. Every legal fact below was checked against the official source
// listed in the record's `sources` on 2026-10-02.

export const payGuides: Guide[] = [
  // ── 1. Exempt vs non-exempt ───────────────────────────────────────────────
  {
    slug: 'exempt-vs-non-exempt',
    category: 'Pay',
    title: 'Exempt vs non-exempt: how to classify an employee',
    metaTitle: 'Exempt vs Non-Exempt: How to Classify Employees | MambaHR',
    metaDescription:
      'An employee is exempt from federal overtime only if paid a salary of at least $684 a week and their main duties fit an exemption. Here is how to check.',
    answer:
      "Under the federal Fair Labor Standards Act (FLSA), an employee is exempt from overtime only if they are paid a fixed salary of at least $684 a week ($35,568 a year) and their main job duties fit an exemption such as executive, administrative, professional or computer employee. Everyone else is non-exempt and earns overtime, and several states, including California, New York, Washington and Colorado, set a higher salary floor in 2026.",
    sections: [
      {
        heading: 'The three tests every exempt employee must pass',
        blocks: [
          {
            type: 'p',
            text: "Exempt means the employee is not owed overtime. Non-exempt means they are owed time and a half for hours over 40 in a workweek (see [overtime rules](/guides/overtime-rules)). For the standard white-collar exemptions, the Department of Labor (DOL) requires all three of these:",
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Salary basis: the person gets a predetermined, fixed amount each pay period (weekly or less often) that is not cut because of the quality or quantity of their work.',
              'Salary level: that salary is at least $684 a week, which is $35,568 a year for a full-year worker.',
              "Duties: the person's primary duty, meaning their main and most important work, matches one of the exemptions described below.",
            ],
          },
          {
            type: 'p',
            text: 'Job titles and offer letters do not decide this. A "Marketing Manager" who manages nobody and follows set procedures may well be non-exempt. Paying someone a salary does not make them exempt either: a salaried non-exempt employee still has to track hours and get overtime.',
          },
          {
            type: 'p',
            text: 'A few groups follow different rules. Outside sales employees have no salary test, and the salary tests also do not apply to doctors, lawyers and teachers.',
          },
        ],
      },
      {
        heading: 'The federal salary threshold in 2026: $684 a week',
        blocks: [
          {
            type: 'p',
            text: "DOL's current salary level for the executive, administrative and professional exemptions is $684 per week ($35,568 a year). For highly compensated employees, the total annual pay requirement is $107,432, of which at least $684 a week must be paid as salary. These levels come from a 2019 rule that took effect on January 1, 2020.",
          },
          {
            type: 'p',
            text: 'You may have read about higher numbers ($844 a week from July 2024, then $1,128 a week from January 2025). Those came from a 2024 DOL rule that federal courts in Texas vacated in November and December 2024. The appeals were dismissed in May 2026, and DOL published a technical amendment on May 15, 2026 putting the 2019 text back into the regulations. The $684 level is the one DOL enforces.',
          },
        ],
      },
      {
        heading: 'The duties tests, exemption by exemption',
        blocks: [
          {
            type: 'table',
            caption: 'Federal white-collar exemptions (29 CFR Part 541)',
            columns: ['Exemption', 'Primary duty must be', 'Pay test'],
            rows: [
              [
                'Executive',
                'Managing the business or a recognized department. Must regularly direct the work of 2 or more full-time employees (or the equivalent) and have authority to hire or fire, or have their hiring and firing recommendations given particular weight.',
                'Salary of at least $684 a week',
              ],
              [
                'Administrative',
                'Office or non-manual work directly related to the management or general business operations of the employer or its customers, including the exercise of discretion and independent judgment on significant matters.',
                'Salary of at least $684 a week',
              ],
              [
                'Learned professional',
                'Work requiring advanced knowledge in a field of science or learning, usually gained through a prolonged course of specialized study, that is mainly intellectual and calls for consistent judgment.',
                'Salary of at least $684 a week',
              ],
              [
                'Creative professional',
                'Work requiring invention, imagination, originality or talent in a recognized artistic or creative field.',
                'Salary of at least $684 a week',
              ],
              [
                'Computer employee',
                'Working as a systems analyst, programmer, software engineer or similarly skilled worker: systems analysis, or designing, developing, testing or modifying computer systems or programs.',
                'Salary of at least $684 a week, or at least $27.63 an hour',
              ],
              [
                'Outside sales',
                "Making sales or getting orders or contracts, while customarily and regularly working away from the employer's place of business.",
                'No salary test',
              ],
            ],
          },
          {
            type: 'p',
            text: 'The computer employee exemption is the one most tech companies lean on, and it has limits. It does not cover people who make or repair computer hardware, and it does not cover people who simply use computers a lot in their work. Help desk and IT support roles need a careful look at what the person actually does all day.',
          },
        ],
      },
      {
        heading: 'States with a higher salary floor',
        blocks: [
          {
            type: 'p',
            text: 'Federal and state law both apply, so in a state with a higher salary floor the state number is the one you have to meet. These are the 2026 figures published by each state:',
          },
          {
            type: 'table',
            caption: 'State minimum salary for exempt employees, 2026',
            columns: ['State', 'Exempt salary minimum', 'Computer professionals'],
            rows: [
              [
                'California',
                'At least two times the state minimum wage for full-time work. With the 2026 minimum wage of $16.90 an hour, that is $70,304 a year (2 x $16.90 x 2,080 hours).',
                'At least $58.85 an hour, or $10,214.44 a month ($122,573.13 a year), from January 1, 2026',
              ],
              [
                'New York',
                'Executive and administrative employees: $1,275.00 a week in New York City, Nassau, Suffolk and Westchester counties; $1,199.10 a week in the rest of the state, from January 1, 2026',
                'No separate rate listed by the state',
              ],
              [
                'Washington',
                '$1,541.70 a week ($80,168.40 a year) in 2026',
                '$59.96 an hour in 2026 (3.5 times the state minimum wage)',
              ],
              [
                'Colorado',
                '$57,784 a year in salary for executive, administrative and professional employees in 2026',
                'Some computer professionals are exempt under separate rules',
              ],
            ],
          },
          {
            type: 'p',
            text: 'These numbers usually rise every January, so re-check salaried employees near the line each year. Other states can also set their own rules, so check your state labor department when you hire somewhere new (see [hiring employees in another state](/guides/hiring-employees-in-another-state)).',
          },
        ],
      },
      {
        heading: 'Deductions that can cost you the exemption',
        blocks: [
          {
            type: 'p',
            text: 'An exempt employee must get their full salary for any week in which they do any work. DOL allows deductions in a short list of cases, including:',
          },
          {
            type: 'list',
            items: [
              'Full-day absences for personal reasons other than sickness or disability.',
              'Full-day absences for sickness under a bona fide sick leave plan.',
              'Offsets for jury duty or witness pay, or military pay.',
              'Penalties for breaking safety rules of major significance.',
              'Unpaid disciplinary suspensions of one or more full days for workplace conduct violations.',
            ],
          },
          {
            type: 'p',
            text: 'Docking an exempt employee for a partial day, or because work was slow, is the classic mistake. An actual practice of improper deductions can mean losing the exemption for everyone in that job class. Isolated or accidental deductions do not cause that loss if you pay the employee back.',
          },
        ],
      },
      {
        heading: 'How to classify a new role, step by step',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              "Write down the role's real primary duty, not the title. Ask the hiring manager what the person will spend most of their time doing.",
              'Match it against the duties table above. If no exemption fits cleanly, the role is non-exempt.',
              'Check the pay: at least $684 a week federally, and at least the state minimum where the person works.',
              'Confirm you will pay a true fixed salary with no partial-day docking.',
              'Record the classification and the reason on the employee record, and revisit it when duties, pay or the state threshold change.',
            ],
          },
          {
            type: 'p',
            text: 'DOL lists misapplying the executive and administrative exemptions as a typical problem at new businesses, and back overtime adds up fast. When a role is borderline, treat it as non-exempt or get advice before the offer goes out. A similar question comes up with [contractors vs employees](/guides/contractor-vs-employee).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Is the federal exempt salary threshold $1,128 a week?',
        a: 'No. The $1,128 level came from a 2024 DOL rule that federal courts vacated, and DOL restored the 2019 rule text in May 2026. The federal level is $684 a week ($35,568 a year).',
      },
      {
        q: 'Can I pay a non-exempt employee a salary?',
        a: 'Yes. Salary is a pay method, not a classification. A salaried non-exempt employee still needs their hours tracked and must get overtime for hours over 40 in a workweek.',
      },
      {
        q: 'Are software engineers exempt?',
        a: 'Often, under the computer employee exemption, if their primary duty is systems analysis or designing, developing, testing or modifying software, and they earn at least $684 a week in salary or $27.63 an hour. California and Washington set higher pay floors for computer professionals.',
      },
      {
        q: 'What is the highly compensated employee test?',
        a: 'Employees paid at least $107,432 a year in total, including at least $684 a week in salary, can be exempt under a lighter duties test if they customarily perform at least one exempt executive, administrative or professional duty.',
      },
    ],
    mambahr:
      'MambaHR keeps your employee records and answers federal and state employment-law questions with the law cited, including which salary floor applies where someone works. When a role sits close to a salary line or the duties test is unclear, it goes to a person to decide, and every change is logged.',
    sources: [
      {
        label: 'DOL: Earnings thresholds for the EAP exemptions',
        url: 'https://www.dol.gov/agencies/whd/overtime/salary-levels',
      },
      {
        label: 'Federal Register: Implementation of Federal Court Judgments (2026-09839)',
        url: 'https://public-inspection.federalregister.gov/2026-09839.pdf',
      },
      {
        label: 'DOL: Fact Sheet #17A, Exemptions for executive, administrative, professional, computer and outside sales employees',
        url: 'https://www.dol.gov/agencies/whd/fact-sheets/17a-overtime',
      },
      {
        label: 'DOL: Fact Sheet #17E, Computer employees',
        url: 'https://www.dol.gov/agencies/whd/fact-sheets/17e-overtime-computer',
      },
      {
        label: 'DOL: Fact Sheet #17G, Salary basis requirement',
        url: 'https://www.dol.gov/agencies/whd/fact-sheets/17g-overtime-salary',
      },
      {
        label: 'California DIR: Overtime exemptions FAQ',
        url: 'https://www.dir.ca.gov/dlse/faq_overtimeexemptions.htm',
      },
      {
        label: 'California DIR: Minimum wage FAQ',
        url: 'https://www.dir.ca.gov/dlse/faq_minimumwage.htm',
      },
      {
        label: 'California DIR: Computer software employee exemption rate',
        url: 'https://dir.ca.gov/oprl/ComputerSoftware.htm',
      },
      {
        label: 'New York DOL: Minimum wage FAQ',
        url: 'https://dol.ny.gov/minimum-wage-frequently-asked-questions',
      },
      {
        label: 'Washington L&I: 2026 minimum wage and exempt salary',
        url: 'https://www.lni.wa.gov/news-events/article/25-27',
      },
      {
        label: 'Colorado CDLE: 2026 COMPS Order poster',
        url: 'https://cdle.colorado.gov/sites/cdle/files/2026_comps_order_poster_english_%5Baccessible%5D.pdf',
      },
      {
        label: 'DOL: Fact Sheet #27, New businesses under the FLSA',
        url: 'https://www.dol.gov/agencies/whd/fact-sheets/27-flsa-new-businesses',
      },
    ],
    related: [
      '/guides/overtime-rules',
      '/guides/contractor-vs-employee',
      '/guides/pay-transparency-job-posts',
      '/guides/hiring-employees-in-another-state',
      '/hr-by-state/california',
      '/hr-by-state/washington',
    ],
  },

  // ── 2. Running payroll for the first employee ─────────────────────────────
  {
    slug: 'how-to-run-payroll-for-your-first-employee',
    category: 'Pay',
    title: 'How to run payroll for your first employee',
    metaTitle: 'How to Run Payroll for Your First Employee | MambaHR',
    metaDescription:
      'Get an EIN, register with your state, collect a W-4, withhold income tax, 6.2% Social Security and 1.45% Medicare, deposit it, and file Form 941 quarterly.',
    answer:
      "To run payroll for your first employee, get an Employer Identification Number (EIN), register with your state for withholding and unemployment tax, and collect a Form W-4. Then each payday withhold federal income tax plus the employee's 6.2% Social Security and 1.45% Medicare tax, pay the matching employer share, deposit it with the IRS, and file Form 941 every quarter (in 2026, Social Security tax stops at $184,500 of wages).",
    sections: [
      {
        heading: 'Before the first payday',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Get an EIN from the IRS. You need one if you report employment taxes or give tax statements to employees. If you said you would have federal tax obligations when you applied, the IRS pre-enrolls you in EFTPS, the system used to make tax deposits.',
              'Register with your state. Most employers pay both federal and state unemployment tax, so open a state unemployment insurance account with your state workforce agency. If your state has an income tax, register for state withholding as well.',
              'Collect a signed Form W-4 from the employee when they start work. It tells you how much federal income tax to withhold. Employees do not have to fill out a new one every year, only when they want to change it.',
              "Record the employee's name and Social Security number as shown on their card, and complete [Form I-9](/guides/form-i-9-and-e-verify) to confirm they can work in the US.",
              'Report the new hire to your state new hire registry. All 50 states have one (see [new hire reporting](/guides/new-hire-reporting)).',
              'Pick a pay schedule that meets your state law. Some states require paying at least twice a month (California does, with some exceptions), so check before choosing monthly pay.',
              'Set up workers compensation coverage if your state requires it (see [workers compensation requirements](/guides/workers-compensation-requirements)).',
            ],
          },
        ],
      },
      {
        heading: 'What to withhold and pay each payday',
        blocks: [
          {
            type: 'table',
            caption: 'Federal payroll taxes, 2026',
            columns: ['Tax', 'Employee share', 'Employer share', 'Notes'],
            rows: [
              [
                'Federal income tax',
                'Withheld based on Form W-4',
                'None',
                'Use the tables in IRS Publication 15-T (2026).',
              ],
              [
                'Social Security',
                '6.2%',
                '6.2%',
                'Stop once an employee earns $184,500 in 2026.',
              ],
              ['Medicare', '1.45%', '1.45%', 'No wage limit.'],
              [
                'Additional Medicare Tax',
                '0.9% on wages over $200,000 in the year',
                'None',
                'Start withholding in the pay period wages pass $200,000.',
              ],
              [
                'Federal unemployment (FUTA)',
                'None',
                '6.0% of the first $7,000 per employee',
                'A credit of up to 5.4% for state unemployment tax paid on time usually brings this to 0.6%.',
              ],
            ],
          },
          {
            type: 'p',
            text: 'Only the employer pays FUTA; it is never taken out of the paycheck. On top of the federal taxes you will usually have state income tax withholding (in states that have one) and state unemployment tax, whose rate your state sets.',
          },
        ],
      },
      {
        heading: 'When to deposit the taxes',
        blocks: [
          {
            type: 'p',
            text: 'Federal tax deposits have to be made electronically. Your deposit schedule depends on how much tax you reported during a lookback period (for 2026, July 1, 2024 through June 30, 2025).',
          },
          {
            type: 'list',
            items: [
              'Monthly: if you reported $50,000 or less in the lookback period. Deposit taxes on wages paid during a month by the 15th of the following month. A new business is a monthly depositor for its first calendar year.',
              'Semiweekly: if you reported more than $50,000. Taxes on wages paid Wednesday to Friday are due the following Wednesday; wages paid Saturday to Tuesday are due the following Friday.',
              'Next day: if you ever build up $100,000 or more in tax on a single day, deposit it by the next business day, whatever your schedule.',
              'FUTA: deposit quarterly once you owe more than $500, by the last day of the month after the quarter ends.',
            ],
          },
        ],
      },
      {
        heading: 'Your filing calendar',
        blocks: [
          {
            type: 'table',
            caption: 'Federal employment tax filings',
            columns: ['Form', 'What it reports', 'Due'],
            rows: [
              [
                'Form 941',
                'Wages, withheld income tax, and Social Security and Medicare tax for the quarter',
                'April 30, July 31, October 31 and January 31',
              ],
              ['Form 940', 'FUTA tax for the year', 'January 31'],
              [
                'Form W-2 (with Form W-3)',
                "Each employee's wages and withholding for the year",
                'January 31, to the employee and to the Social Security Administration',
              ],
            ],
          },
          {
            type: 'p',
            text: 'If you made every deposit on time, you get 10 extra calendar days to file Forms 941 and 940. A few very small employers file Form 944 once a year instead of Form 941, but only after the IRS tells them in writing that they can.',
          },
        ],
      },
      {
        heading: 'Records to keep',
        blocks: [
          {
            type: 'list',
            items: [
              'All employment tax records: at least 4 years (IRS).',
              'Payroll records under the Fair Labor Standards Act (FLSA): at least 3 years.',
              'Time cards, schedules and wage rate tables: 2 years.',
              "For non-exempt employees, the hours worked each day and week, regular rate, overtime pay, deductions and total pay each period.",
            ],
          },
          {
            type: 'p',
            text: 'States can require longer. See [how long to keep employee records](/guides/how-long-to-keep-employee-records).',
          },
        ],
      },
      {
        heading: 'Choosing a payroll provider',
        blocks: [
          {
            type: 'p',
            text: 'You can run payroll by hand, but most small companies use a provider. Whatever you choose, the IRS is clear that you stay responsible for filing returns and making deposits even when a third party does the work. If the provider misses a deposit, the liability is still yours. Look for a provider that:',
          },
          {
            type: 'list',
            items: [
              'Calculates, deposits and files federal and state payroll taxes for you, including Forms 941, 940 and W-2.',
              'Handles every state where you have employees, including state withholding and unemployment registrations.',
              'Lets you see each deposit and filing so you can confirm it happened.',
              'Supports overtime, final paychecks and state pay frequency rules (see [overtime rules](/guides/overtime-rules) and [final paycheck laws](/guides/final-paycheck-laws)).',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'When is my first Form 941 due?',
        a: 'By the last day of the month after the quarter in which you first paid wages. If you first pay wages in May, the second-quarter Form 941 is due July 31.',
      },
      {
        q: 'Does my employee need a new W-4 every year?',
        a: 'No. A new employee fills out Form W-4 when they start, and only needs a new one if they want to change their withholding.',
      },
      {
        q: 'Do I pay FUTA if I also pay state unemployment tax?',
        a: 'Yes, but paying state unemployment tax on time earns a credit of up to 5.4% against the 6.0% FUTA rate, so most employers pay 0.6% on the first $7,000 of each employee’s wages.',
      },
      {
        q: 'If I use a payroll provider, am I still liable for missed deposits?',
        a: 'Generally yes. The IRS says employers remain responsible for deposits and returns even when they contract with a third party to do them.',
      },
    ],
    mambahr:
      'MambaHR turns every hire, raise, leave and exit into a payroll change, either as a change file for the payroll provider you already use or sent to Deel-managed payroll (Powered by Deel). A person approves every payroll run, and MambaHR does not run payroll itself. Payroll is an add-on on every plan.',
    sources: [
      {
        label: 'IRS: Publication 15 (2026), Employer’s Tax Guide',
        url: 'https://www.irs.gov/publications/p15',
      },
      {
        label: 'IRS: Publication 15-T (2026), Federal Income Tax Withholding Methods',
        url: 'https://www.irs.gov/publications/p15t',
      },
      {
        label: 'IRS: Employment tax due dates',
        url: 'https://www.irs.gov/businesses/small-businesses-self-employed/employment-tax-due-dates',
      },
      {
        label: 'IRS: Depositing and reporting employment taxes',
        url: 'https://www.irs.gov/businesses/small-businesses-self-employed/depositing-and-reporting-employment-taxes',
      },
      {
        label: 'IRS: Topic 759, Form 940 (FUTA)',
        url: 'https://www.irs.gov/taxtopics/tc759',
      },
      {
        label: 'IRS: Hiring employees',
        url: 'https://www.irs.gov/businesses/small-businesses-self-employed/hiring-employees',
      },
      {
        label: 'DOL: State unemployment insurance tax topic',
        url: 'https://oui.doleta.gov/unemploy/uitaxtopic.asp',
      },
      {
        label: 'DOL: State payday requirements',
        url: 'https://www.dol.gov/agencies/whd/state/payday',
      },
      {
        label: 'DOL: Fact Sheet #21, Recordkeeping under the FLSA',
        url: 'https://www.dol.gov/agencies/whd/fact-sheets/21-flsa-recordkeeping',
      },
    ],
    related: [
      '/guides/how-to-hire-your-first-employee',
      '/guides/new-hire-onboarding-checklist',
      '/guides/new-hire-reporting',
      '/guides/exempt-vs-non-exempt',
      '/guides/overtime-rules',
      '/payroll',
    ],
  },

  // ── 3. Overtime rules ─────────────────────────────────────────────────────
  {
    slug: 'overtime-rules',
    category: 'Pay',
    title: 'Overtime rules: when you have to pay time and a half',
    metaTitle: 'Overtime Rules: When You Must Pay Time and a Half | MambaHR',
    metaDescription:
      'Federal law requires 1.5 times the regular rate for non-exempt hours over 40 in a workweek. Some states, like California, add daily overtime. See the rules.',
    answer:
      'Under the federal Fair Labor Standards Act (FLSA), you must pay non-exempt employees at least 1.5 times their regular rate for every hour over 40 in a workweek. Federal law has no daily overtime, but some states do: California pays time and a half after 8 hours in a day and double time after 12, Colorado pays overtime after 12 hours in a day, and Alaska after 8 hours in a day for employers with 4 or more employees.',
    sections: [
      {
        heading: 'The federal rule',
        blocks: [
          {
            type: 'list',
            items: [
              'Who: non-exempt employees. Exempt employees are not owed overtime (see [exempt vs non-exempt](/guides/exempt-vs-non-exempt)).',
              'When: every hour worked over 40 in a workweek.',
              "How much: at least one and a half times the employee's regular rate of pay.",
              'Payday: overtime earned in a workweek must be paid on the regular payday for that pay period.',
              'No waivers: an employee cannot agree to give up overtime, even in writing.',
            ],
          },
          {
            type: 'p',
            text: 'The FLSA does not require extra pay for working on Saturdays, Sundays or holidays as such. Those hours only earn overtime if they push the week past 40, unless your state or your own policy says otherwise.',
          },
        ],
      },
      {
        heading: 'What counts as a workweek',
        blocks: [
          {
            type: 'p',
            text: 'A workweek is a fixed and regularly recurring period of 168 hours: seven consecutive 24-hour periods. It can start on any day and at any hour, but once you set it, it stays put. Each workweek stands alone, and averaging hours over two or more weeks is not allowed.',
          },
          {
            type: 'p',
            text: 'Example: an employee works 45 hours one week and 35 the next. Even on a two-week pay period, they are owed 5 hours of overtime for the first week. The short second week does not cancel it out.',
          },
        ],
      },
      {
        heading: 'The regular rate includes more than the hourly wage',
        blocks: [
          {
            type: 'p',
            text: 'Overtime is based on the regular rate, which is total pay for the workweek (minus a few excluded items) divided by total hours worked that week.',
          },
          {
            type: 'table',
            caption: 'What goes into the regular rate',
            columns: ['Included', 'Excluded'],
            rows: [
              ['Hourly wages and salary for non-exempt staff', 'Discretionary bonuses, where both the decision to pay and the amount are up to you'],
              ['Nondiscretionary bonuses, such as promised performance or attendance bonuses', 'Gifts and special-occasion payments'],
              ['Shift differentials', 'Pay for vacation, holidays, sick leave and other paid time off'],
              ['Commissions', 'Business expense and travel reimbursements'],
            ],
          },
          {
            type: 'p',
            text: 'Example: an employee earns $20 an hour, works 45 hours, and earns a $90 nondiscretionary bonus that week. Straight-time pay is $900 plus $90, or $990. The regular rate is $990 divided by 45 hours, which is $22. They are owed an extra half of $22 ($11) for each of the 5 overtime hours, $55, for a total of $1,045. Leaving the bonus out would underpay overtime.',
          },
        ],
      },
      {
        heading: 'Comp time is not allowed for private employers',
        blocks: [
          {
            type: 'p',
            text: 'Giving time off later instead of paying overtime (compensatory time, or "comp time") is only allowed under special rules for state and local government employers. DOL lists granting comp time in place of overtime pay as a typical violation by new businesses. Colorado says the same in its own rules. A private employer has to pay the overtime in cash.',
          },
        ],
      },
      {
        heading: 'States with daily overtime',
        blocks: [
          {
            type: 'p',
            text: 'Where state law is more generous, it applies on top of the federal 40-hour rule. These states pay overtime based on hours in a day:',
          },
          {
            type: 'table',
            caption: 'Daily overtime rules',
            columns: ['State', 'Time and a half', 'Double time'],
            rows: [
              [
                'California',
                'Over 8 hours (up to 12) in a workday, over 40 in a workweek, and the first 8 hours on the seventh consecutive day of work in a workweek',
                'Over 12 hours in a workday, and over 8 hours on the seventh consecutive day of work in a workweek',
              ],
              [
                'Colorado',
                'Over 40 hours in a workweek, over 12 hours in a workday, or over 12 consecutive hours',
                'None',
              ],
              [
                'Alaska',
                'Over 8 hours in a day or 40 in a workweek, for employers with 4 or more employees',
                'None',
              ],
            ],
          },
          {
            type: 'p',
            text: 'A few other states have their own overtime rules too, so check your state labor department. See the state pages for [California](/hr-by-state/california) and [Colorado](/hr-by-state/colorado).',
          },
        ],
      },
      {
        heading: 'Records and common mistakes',
        blocks: [
          {
            type: 'p',
            text: 'For every non-exempt employee, keep the hours worked each day, total hours each workweek, the regular rate, overtime earnings and total pay each period. Keep payroll records at least 3 years and time cards 2 years. Any timekeeping method is fine as long as it is complete and accurate.',
          },
          {
            type: 'list',
            items: [
              'Treating salaried employees as exempt without checking the duties and salary tests.',
              'Not paying for all hours worked, like setup, cleanup, inventory or paperwork outside the scheduled shift.',
              'Averaging hours across two weeks of a pay period.',
              'Leaving nondiscretionary bonuses or commissions out of the regular rate.',
              'Offering comp time instead of overtime pay.',
            ],
          },
          {
            type: 'p',
            text: 'One tax change to know: for tax years 2025 through 2028, employees can deduct up to $12,500 ($25,000 if married filing jointly) of qualified overtime pay, meaning the "half" in time and a half, on their federal income tax return. Employers report qualified overtime on Form W-2. Overtime is still subject to Social Security, Medicare and FUTA tax.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Do I have to pay overtime for weekend or holiday work?',
        a: 'Not under federal law. The FLSA only requires overtime for hours over 40 in a workweek, so weekend or holiday hours earn overtime only if they push the week past 40, unless state law or your policy says otherwise.',
      },
      {
        q: 'Can an employee agree to skip overtime pay?',
        a: 'No. The FLSA overtime requirement cannot be waived by agreement between the employer and the employee.',
      },
      {
        q: 'Do salaried employees get overtime?',
        a: 'Salaried non-exempt employees do. Only employees who pass the salary basis, salary level and duties tests are exempt.',
      },
      {
        q: 'Can I give comp time instead of overtime?',
        a: 'Not as a private employer. Comp time in place of overtime pay is only allowed under special rules for state and local governments.',
      },
    ],
    mambahr:
      'MambaHR answers federal and state overtime questions with the law cited and sends anything unclear to a person. Every hire, raise, leave and exit becomes a payroll change, sent as a change file to your current provider or to Deel-managed payroll (Powered by Deel), and a person approves every payroll run.',
    sources: [
      {
        label: 'DOL: Fact Sheet #23, Overtime pay requirements of the FLSA',
        url: 'https://www.dol.gov/agencies/whd/fact-sheets/23-flsa-overtime-pay',
      },
      {
        label: 'DOL: Fact Sheet #56A, Regular rate of pay',
        url: 'https://www.dol.gov/agencies/whd/fact-sheets/56a-regular-rate',
      },
      {
        label: 'DOL: Handy Reference Guide to the FLSA',
        url: 'https://www.dol.gov/agencies/whd/compliance-assistance/handy-reference-guide-flsa',
      },
      {
        label: 'DOL: Fact Sheet #27, New businesses under the FLSA',
        url: 'https://www.dol.gov/agencies/whd/fact-sheets/27-flsa-new-businesses',
      },
      {
        label: 'DOL: Fact Sheet #21, Recordkeeping under the FLSA',
        url: 'https://www.dol.gov/agencies/whd/fact-sheets/21-flsa-recordkeeping',
      },
      {
        label: 'California DIR: Overtime FAQ',
        url: 'https://www.dir.ca.gov/dlse/faq_overtime.htm',
      },
      {
        label: 'Colorado CDLE: 2026 COMPS Order poster',
        url: 'https://cdle.colorado.gov/sites/cdle/files/2026_comps_order_poster_english_%5Baccessible%5D.pdf',
      },
      {
        label: 'Alaska DOLWD: Minimum wage standard and overtime hours',
        url: 'https://labor.alaska.gov/lss/whact.htm',
      },
      {
        label: 'IRS: Publication 15 (2026), qualified overtime compensation',
        url: 'https://www.irs.gov/publications/p15',
      },
    ],
    related: [
      '/guides/exempt-vs-non-exempt',
      '/guides/how-to-run-payroll-for-your-first-employee',
      '/guides/how-long-to-keep-employee-records',
      '/hr-by-state/california',
      '/hr-by-state/colorado',
      '/payroll',
    ],
  },

  // ── 4. Final paycheck laws ────────────────────────────────────────────────
  {
    slug: 'final-paycheck-laws',
    category: 'Pay',
    title: "When is an employee's final paycheck due? (final pay laws by state)",
    metaTitle: 'Final Paycheck Laws by State: When Final Pay Is Due | MambaHR',
    metaDescription:
      'No federal law requires immediate final pay; state law sets the deadline. California and Colorado require it at once when you fire someone. See 10 states.',
    answer:
      'There is no federal deadline for a final paycheck: the Fair Labor Standards Act (FLSA) does not require immediate payment, so state law sets the timing. When you end someone’s employment, California and Colorado require payment immediately, Massachusetts on the day of discharge and Texas within 6 calendar days, while New York, New Jersey, Illinois and Washington let you wait until the regular payday.',
    sections: [
      {
        heading: 'Federal law sets no deadline',
        blocks: [
          {
            type: 'p',
            text: 'The Department of Labor (DOL) says employers are not required by federal law to give former employees their final paycheck immediately. Some states do require it. If a former employee has not been paid by the regular payday, they can contact DOL or their state labor department.',
          },
          {
            type: 'p',
            text: 'Most states treat a firing or layoff differently from a resignation, so the first question is always who ended the job, and when.',
          },
        ],
      },
      {
        heading: 'Final pay deadlines in 10 states',
        blocks: [
          {
            type: 'table',
            caption: 'When final wages are due',
            columns: ['State', 'You end the employment', 'The employee quits'],
            rows: [
              [
                'California',
                'Immediately at the time of termination, including accrued vacation',
                'At the time of quitting if they gave at least 72 hours’ notice; within 72 hours if they did not (for employees without a fixed-term contract)',
              ],
              [
                'New York',
                'By the regular payday for the pay period in which employment ended',
                'Same. Mail it if the employee asks.',
              ],
              [
                'Texas',
                'Within 6 calendar days of discharge',
                'On the next regularly scheduled payday after the resignation date',
              ],
              [
                'Washington',
                'On or before the next regularly scheduled payday',
                'On or before the next regularly scheduled payday',
              ],
              [
                'Massachusetts',
                'In full on the day of discharge',
                'On the next regular payday',
              ],
              [
                'Colorado',
                'Immediately. If the payroll unit is not scheduled to be working, within 6 hours of the start of its next regular workday (24 hours if it is off-site)',
                'By the next regular payday',
              ],
              [
                'Illinois',
                'By the next regularly scheduled payday, including earned vacation, bonuses and commissions',
                'By the next regularly scheduled payday',
              ],
              [
                'Florida',
                'DOL lists no state payday rules for Florida, so federal rules apply: pay by the next regular payday',
                'Same as when you end the employment',
              ],
              [
                'New Jersey',
                'By the next regular payday for the pay period, whether the employee quit or was fired',
                'Same as when you end the employment',
              ],
              [
                'Georgia',
                "Georgia's Department of Labor points to the FLSA and sets no separate deadline: pay by the next regular payday",
                'Same as when you end the employment',
              ],
            ],
          },
          {
            type: 'p',
            text: 'More detail is on each state page: [California](/hr-by-state/california), [New York](/hr-by-state/new-york), [Texas](/hr-by-state/texas), [Washington](/hr-by-state/washington), [Massachusetts](/hr-by-state/massachusetts), [Colorado](/hr-by-state/colorado), [Illinois](/hr-by-state/illinois), [Florida](/hr-by-state/florida), [New Jersey](/hr-by-state/new-jersey) and [Georgia](/hr-by-state/georgia).',
          },
        ],
      },
      {
        heading: 'What goes into the final paycheck',
        blocks: [
          {
            type: 'list',
            items: [
              'All regular wages through the last day worked.',
              'Overtime earned in the final workweeks (see [overtime rules](/guides/overtime-rules)).',
              'Earned commissions and nondiscretionary bonuses. Illinois, for example, counts bonuses, vacation pay, wages and commissions as final compensation.',
              'Unused vacation where state law or your written policy requires it. California, Colorado and Massachusetts treat earned vacation as wages (see [unused PTO payout](/guides/unused-pto-payout)).',
              'The usual tax withholding, since final wages are still wages.',
            ],
          },
        ],
      },
      {
        heading: 'Penalties for paying late',
        blocks: [
          {
            type: 'p',
            text: "California is the strictest. An employer who willfully fails to pay final wages on time can owe a waiting time penalty equal to the employee's daily rate of pay for each day the wages stay unpaid, up to 30 calendar days. Other states have their own penalties and wage claim processes.",
          },
          {
            type: 'p',
            text: 'Do not hold a final paycheck until a laptop or badge comes back. Washington, for example, says employers cannot withhold a final paycheck because the employee has not returned keys, uniforms, tools or equipment. Recover property separately.',
          },
        ],
      },
      {
        heading: 'A checklist for the last day',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Confirm whether this is a termination or a resignation, the last day worked, and the state where the employee works.',
              'Look up that state’s deadline and put it on the calendar before the conversation, not after (see [how to fire an employee](/guides/how-to-fire-an-employee)).',
              'Collect final hours, commissions and bonuses owed.',
              'Check whether unused vacation must be paid out.',
              'Arrange an off-cycle payroll run if the deadline falls before your next payday.',
              'Deliver the pay the way state law allows, and keep a record of when it was paid.',
              'Send the remaining exit steps, such as benefits continuation (see [COBRA](/guides/when-do-you-need-to-offer-cobra)) and the [offboarding checklist](/guides/employee-offboarding-checklist).',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Is there a federal law on when a final paycheck is due?',
        a: 'No. Federal law does not require employers to give former employees their final paycheck immediately. The deadline comes from state law.',
      },
      {
        q: 'Can I hold the final paycheck until the employee returns company property?',
        a: 'You should not. Washington says so directly, and in states with immediate or short deadlines, holding pay can trigger penalties. Recover property separately.',
      },
      {
        q: 'Does a layoff count as being fired for final pay purposes?',
        a: 'Generally yes. Colorado and Texas, for example, apply the same deadline to layoffs as to firings.',
      },
      {
        q: 'Does unused vacation go in the final paycheck?',
        a: 'In California, Colorado and Massachusetts, earned vacation is wages and must be included. Elsewhere it depends on state law and your written policy.',
      },
    ],
    mambahr:
      "When someone leaves, MambaHR works out their final pay under that state's rules and sends it to a person to approve, removes their system access, drafts the separation paperwork and prepares the COBRA continuation notices. Terminations always go to a person, and every change is logged.",
    sources: [
      {
        label: 'DOL: Last paycheck',
        url: 'https://www.dol.gov/general/topic/wages/lastpaycheck',
      },
      {
        label: 'California DIR: Paydays, pay periods and final wages FAQ',
        url: 'https://www.dir.ca.gov/dlse/faq_paydays.htm',
      },
      {
        label: 'New York Senate: Labor Law Section 191',
        url: 'https://www.nysenate.gov/legislation/laws/LAB/191',
      },
      {
        label: 'New York DOL: Wages and hours FAQ',
        url: 'https://dol.ny.gov/wages-and-hours-frequently-asked-questions',
      },
      {
        label: 'Texas Workforce Commission: Final pay (Texas Guidebook for Employers)',
        url: 'https://efte.twc.texas.gov/final_pay.html',
      },
      {
        label: 'Washington L&I: Getting paid',
        url: 'https://lni.wa.gov/workers-rights/wages/getting-paid/',
      },
      {
        label: 'Washington Legislature: RCW 49.48.010',
        url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=49.48.010',
      },
      {
        label: 'Mass.gov: Massachusetts law about employment termination',
        url: 'https://www.mass.gov/info-details/massachusetts-law-about-employment-termination',
      },
      {
        label: 'Colorado CDLE: INFO #3A, Timing of wage payments',
        url: 'https://cdle.colorado.gov/sites/cdle/files/info_%233a_timing_of_wage_payments%2C_%26_required_record-keeping_1.9.2026.pdf',
      },
      {
        label: 'Illinois DOL: Wage Payment and Collection Act FAQ',
        url: 'https://labor.illinois.gov/faqs/wage-payment-faq.html',
      },
      {
        label: 'New Jersey DOL: Wage and hour employer FAQ',
        url: 'https://www.nj.gov/labor/wageandhour/support/faqs/wageandhouremployerfaqs.shtml',
      },
      {
        label: 'Georgia DOL: Individuals FAQ, laws and regulations',
        url: 'https://dol.georgia.gov/faqs-individuals/individuals-faqs-laws-and-regulations',
      },
      {
        label: 'DOL: State payday requirements',
        url: 'https://www.dol.gov/agencies/whd/state/payday',
      },
    ],
    related: [
      '/guides/unused-pto-payout',
      '/guides/how-to-fire-an-employee',
      '/guides/employee-offboarding-checklist',
      '/guides/firing-an-employee-in-california',
      '/guides/severance-agreements',
      '/hr-by-state',
    ],
  },

  // ── 5. Unused PTO payout ──────────────────────────────────────────────────
  {
    slug: 'unused-pto-payout',
    category: 'Pay',
    title: 'Do you have to pay out unused PTO when an employee leaves?',
    metaTitle: 'Do You Have to Pay Out Unused PTO at Exit? | MambaHR',
    metaDescription:
      'No federal law requires paying out unused PTO. It depends on state law and your policy: California, Colorado and Massachusetts require earned vacation payout.',
    answer:
      'No federal law requires you to pay out unused vacation or paid time off (PTO) when an employee leaves, so it depends on state law and your written policy. California, Colorado and Massachusetts treat earned vacation as wages that must be paid at exit, Illinois requires payout of earned vacation, New York requires it unless you have a written forfeiture policy, and Texas, Washington and New Jersey leave it to your policy.',
    sections: [
      {
        heading: 'The federal rule: nothing required',
        blocks: [
          {
            type: 'p',
            text: 'The Fair Labor Standards Act (FLSA) does not require vacation, holiday, severance or sick pay at all, so it says nothing about paying out unused time. The answer comes from two places: your state’s wage law, and the promises in your own written policy or offer letters.',
          },
          {
            type: 'p',
            text: 'In states that treat earned vacation as wages, it has to be paid out no matter what your policy says. In states that follow your policy, you owe what you promised, so an unclear policy usually gets read against the employer.',
          },
        ],
      },
      {
        heading: 'State rules for unused vacation',
        blocks: [
          {
            type: 'table',
            caption: 'Payout of earned, unused vacation when employment ends',
            columns: ['State', 'Payout required?', 'What controls'],
            rows: [
              [
                'California',
                'Yes. All earned and unused vacation, at the final rate of pay',
                'State law (Labor Code 227.3). Use-it-or-lose-it is illegal; accrual caps are allowed.',
              ],
              [
                'Colorado',
                'Yes. All earned vacation, whether the employee was fired (with or without cause), resigned (with or without notice) or left for another reason',
                'State law (Colorado Wage Act, Nieto v. Clark’s Market, 2021). Any policy that forfeits earned vacation is void.',
              ],
              [
                'Massachusetts',
                'Yes. Vacation promised in an oral or written agreement is wages',
                'State law (Wage Act). Paid on the last day if fired, the next regular payday if they quit.',
              ],
              [
                'Illinois',
                'Yes. The money value of all earned vacation',
                'State law (Wage Payment and Collection Act). A use-it-or-lose-it policy is allowed if it follows state rules and employees get a reasonable chance to use the time.',
              ],
              [
                'New York',
                'Yes, unless you have a written forfeiture policy that employees were told about',
                'Your written policy. Employers must give employees their vacation policy in writing or post it.',
              ],
              [
                'Texas',
                'Only if a written policy or agreement promises it',
                'Your written policy',
              ],
              [
                'Washington',
                'Not by state law. Vacation is a voluntary benefit',
                'Your policy or agreement',
              ],
              [
                'New Jersey',
                'Not by state law',
                'Your established policy or agreement, applied the same way to everyone',
              ],
            ],
          },
          {
            type: 'p',
            text: "Georgia's Department of Labor notes that neither federal nor state law requires employers to provide vacation, sick or personal leave, so in Georgia your written policy is what employees will hold you to. For each state's full rules, see the [HR by state](/hr-by-state) pages.",
          },
        ],
      },
      {
        heading: "Use-it-or-lose-it policies and caps",
        blocks: [
          {
            type: 'list',
            items: [
              'California: a policy that forfeits vacation not used by a date is illegal. A cap that stops new accrual once a balance is reached (the state gives 200 hours as an example) is allowed.',
              'Colorado: no agreement can forfeit vacation that has already been earned. Employers can still set how much is earned and cap how much builds up.',
              'Illinois: allowed if the policy follows the state regulation and employees have a reasonable opportunity to take the time.',
              'New York: forfeiture works only if it is in a written policy that employees were told about in advance.',
            ],
          },
          {
            type: 'p',
            text: 'In any state, an accrual cap is a cleaner way to limit balances than a forfeiture rule, because employees never lose time they have already earned.',
          },
        ],
      },
      {
        heading: 'PTO banks and sick leave',
        blocks: [
          {
            type: 'p',
            text: 'Sick leave usually does not have to be paid out. California does not require payout of paid sick leave unless your policy provides it. Illinois does not require payout of leave under its Paid Leave for All Workers Act unless that leave sits in a vacation bank or general PTO bank.',
          },
          {
            type: 'p',
            text: 'Combined PTO is where employers get caught. California applies its vacation rules to a PTO program that combines vacation and sick time, so the whole balance must be paid out. Colorado counts any paid leave the employee can use for any purpose as vacation, whatever you call it. If you want sick time treated as sick time, track it separately (see [paid sick leave laws](/guides/paid-sick-leave-laws)).',
          },
        ],
      },
      {
        heading: 'How to write a payout policy that holds up',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Put the policy in writing and give it to every employee. New York requires written notice or posting of your vacation policy.',
              'Say how time is earned, any cap on the balance, and what happens to unused time at separation.',
              'Keep separate buckets for vacation and sick leave if you do not intend to pay out sick time.',
              'Write state exceptions into the policy for every state where you have employees.',
              'Apply the policy the same way to everyone, as New Jersey expects.',
              'Include any payout in the final paycheck on the state’s deadline (see [final paycheck laws](/guides/final-paycheck-laws)).',
            ],
          },
          {
            type: 'p',
            text: 'A handbook is the usual home for this policy (see [do I need an employee handbook](/guides/do-i-need-an-employee-handbook)).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Is PTO the same as vacation for payout rules?',
        a: 'Often, yes. California applies its vacation rules to combined PTO programs, and Colorado treats any paid leave usable for any purpose as vacation, whatever it is called.',
      },
      {
        q: 'Can I refuse to pay out vacation if I fire someone for cause?',
        a: 'Not in Colorado or California, where earned vacation must be paid however the job ended. In states that follow your policy, it depends on what your written policy says.',
      },
      {
        q: 'Do I have to pay out unused sick leave?',
        a: 'Usually not. California and Illinois, for example, do not require payout of sick leave unless your policy provides it or the leave sits in a combined vacation or PTO bank.',
      },
      {
        q: 'When is the vacation payout due?',
        a: 'With the final paycheck, on the state’s final pay deadline. In California, accrued vacation is due with the rest of final wages.',
      },
    ],
    mambahr:
      "When someone leaves, MambaHR works out their final pay under that state's rules and sends it to a person to approve. It answers state-law questions with the law cited, sends unclear cases (like a policy that may not hold up in a given state) to a person, and logs every change.",
    sources: [
      {
        label: 'DOL: Handy Reference Guide to the FLSA',
        url: 'https://www.dol.gov/agencies/whd/compliance-assistance/handy-reference-guide-flsa',
      },
      {
        label: 'California DIR: Vacation FAQ',
        url: 'https://www.dir.ca.gov/dlse/faq_vacation.htm',
      },
      {
        label: 'California DIR: Paid sick leave FAQ',
        url: 'https://www.dir.ca.gov/dlse/paid_sick_leave.htm',
      },
      {
        label: 'Colorado CDLE: INFO #3E, Payment of earned vacation upon separation',
        url: 'https://cdle.colorado.gov/sites/cdle/files/info_%233e_payment_of_earned_vacation_upon_separation_of_employment_05.29.24.pdf',
      },
      {
        label: 'Mass.gov: Massachusetts law about vacation leave',
        url: 'https://www.mass.gov/info-details/massachusetts-law-about-vacation-leave',
      },
      {
        label: 'Illinois DOL: Vacation FAQ',
        url: 'https://labor.illinois.gov/faqs/vacation-faq.html',
      },
      {
        label: 'Illinois DOL: Paid Leave for All Workers Act FAQ',
        url: 'https://labor.illinois.gov/faqs/paidleavefaq.html',
      },
      {
        label: 'New York DOL: Wages and hours FAQ',
        url: 'https://dol.ny.gov/wages-and-hours-frequently-asked-questions',
      },
      {
        label: 'New York Senate: Labor Law Section 195',
        url: 'https://www.nysenate.gov/legislation/laws/LAB/195',
      },
      {
        label: 'Texas Workforce Commission: Accrued leave payouts',
        url: 'https://efte.twc.texas.gov/accrued_leave_payouts.html',
      },
      {
        label: 'Washington L&I: Getting paid',
        url: 'https://lni.wa.gov/workers-rights/wages/getting-paid/',
      },
      {
        label: 'New Jersey DOL: Wage and hour employer FAQ',
        url: 'https://www.nj.gov/labor/wageandhour/support/faqs/wageandhouremployerfaqs.shtml',
      },
      {
        label: 'Georgia DOL: Individuals FAQ, Fair Labor Standards Act',
        url: 'https://dol.georgia.gov/faqs-individuals/individuals-faqs-fair-labor-standards-act',
      },
    ],
    related: [
      '/guides/final-paycheck-laws',
      '/guides/paid-sick-leave-laws',
      '/guides/do-i-need-an-employee-handbook',
      '/guides/employee-offboarding-checklist',
      '/hr-by-state/california',
      '/hr-by-state/colorado',
    ],
  },
]
