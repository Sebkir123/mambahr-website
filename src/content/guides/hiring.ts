import type { Guide } from './types'

// Hiring guides. Every legal fact below was checked against the official
// source listed in the record's `sources` on 2026-10-02.

export const hiringGuides: Guide[] = [
  // ── 1. First employee ──────────────────────────────────────────────────────
  {
    slug: 'how-to-hire-your-first-employee',
    category: 'Hiring',
    title: 'How to hire your first employee',
    metaTitle: 'How to Hire Your First Employee: Step by Step | MambaHR',
    metaDescription:
      'To hire your first employee, get an EIN, register with your state, set up workers\' comp, collect Forms W-4 and I-9, and report the hire within 20 days.',
    answer:
      "To hire your first employee in the US, get a free Employer Identification Number (EIN) from the IRS, register with your state for payroll taxes and unemployment insurance, set up workers' compensation, and have the new hire complete Form W-4 and Form I-9 (you finish Section 2 of the I-9 within three business days of their first day). Then report the hire to the state where they work within 20 days, or sooner if that state requires it.",
    sections: [
      {
        heading: 'Before the offer: set up as an employer',
        blocks: [
          {
            type: 'p',
            text: 'Most of the work of a first hire happens before the person starts. Do these in order, because later steps ask for numbers you get from earlier ones.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              "Get an EIN. Hiring employees is one of the main reasons the IRS lists for needing one. It is free: the IRS warns that you never have to pay a fee for an EIN, and the online application issues the number right away if it is approved. Your EIN goes on new-hire reports, payroll tax filings and Forms W-2.",
              "Register with your state. Each state runs its own unemployment insurance program, and in most states it is paid for by a tax on employers. Registration triggers differ: in Florida, for example, you become liable once you pay $1,500 or more in wages in a calendar quarter or have an employee on any day in 20 weeks of a year, and you register by the end of the month after that quarter. If your state taxes wages, you also register to withhold state income tax.",
              "Set up workers' compensation. Workers' comp is run state by state, and the rules on who must carry it differ. Texas, for example, lets most private employers choose whether to carry it, but employers without coverage must tell the state. See [workers' compensation requirements](/guides/workers-compensation-requirements).",
              'Confirm the person is an employee, not a contractor. The tests are about control and independence, not the title on the contract. See [contractor or employee](/guides/contractor-vs-employee).',
              'Write down the basics you will put in the offer: pay rate, pay schedule, whether the role is [exempt or non-exempt](/guides/exempt-vs-non-exempt) from overtime, and the start date. If your state requires a pay range in job posts, it belongs in the post too. See [pay ranges in job posts](/guides/pay-transparency-job-posts).',
            ],
          },
        ],
      },
      {
        heading: 'The paperwork on day one',
        blocks: [
          {
            type: 'table',
            caption: 'Federal new-hire forms and their deadlines',
            columns: ['Form', 'Who fills it in', 'Deadline'],
            rows: [
              [
                'Form I-9, Section 1',
                'The employee',
                'No later than the first day of employment. It can be done earlier, once the person has accepted the offer.',
              ],
              [
                'Form I-9, Section 2',
                'You (or someone you authorize) after examining the original documents',
                'Within three business days of the first day of work. If they start Monday, finish by Thursday. If the job lasts less than three business days, finish it on day one.',
              ],
              [
                'Form W-4',
                'The employee',
                "Ask for a signed W-4 when they start work. If you do not get one, withhold federal income tax as if they are single.",
              ],
              [
                'State withholding form',
                'The employee',
                "Some states use their own form. California, for example, uses Form DE 4 for state income tax withholding.",
              ],
            ],
          },
          {
            type: 'p',
            text: 'Collect the employee\'s legal name and Social Security number for Form W-2. The IRS notes that an Individual Taxpayer Identification Number (ITIN) is not a substitute for a Social Security number for employment. For the full I-9 process, including which documents are acceptable, see [Form I-9 and E-Verify](/guides/form-i-9-and-e-verify).',
          },
        ],
      },
      {
        heading: 'Report the hire to your state',
        blocks: [
          {
            type: 'p',
            text: "Federal law requires employers to report new and rehired employees to the state where they work within 20 days of hire, and some states require it sooner. The date of hire is the first day the person performs services for pay. Child support agencies use these reports to find parents who owe support, which is why the rule applies to every employer.",
          },
          {
            type: 'list',
            items: [
              "The seven federal data elements: the employee's name, address, Social Security number and date of hire, and your business name, address and EIN.",
              'Some states ask for more fields, so use your state\'s new-hire reporting website.',
              'If you later have employees in more than one state, you can register with the federal Department of Health and Human Services as a multistate employer and report everyone to one state.',
            ],
          },
          {
            type: 'p',
            text: 'More detail, including how states differ, is in [new-hire reporting](/guides/new-hire-reporting).',
          },
        ],
      },
      {
        heading: 'Put up the required notices',
        blocks: [
          {
            type: 'p',
            text: "Federal law requires certain workplace posters, and which ones apply depends on your size and industry. The Department of Labor's posters page lists, among others, the Fair Labor Standards Act (FLSA) minimum wage poster, the Employee Polygraph Protection Act poster and, for covered employers, the Family and Medical Leave Act (FMLA) poster. Its free elaws Poster Advisor tells you which apply to you. Employers covered by federal anti-discrimination laws also post the Equal Employment Opportunity Commission (EEOC) \"Know Your Rights\" notice.",
          },
          {
            type: 'p',
            text: 'If your first hire works remotely, the EEOC says electronic posting may be the only posting for employees who telework and do not visit your workplace regularly. States have their own posters on top of the federal ones. See [labor law posters](/guides/labor-law-posters).',
          },
        ],
      },
      {
        heading: 'Set up payroll before the first payday',
        blocks: [
          {
            type: 'list',
            items: [
              'Withhold federal income tax from wages, based on the W-4.',
              'Withhold Social Security and Medicare taxes from wages and pay the employer share.',
              'Pay federal unemployment (FUTA) tax from your own funds. Employees do not pay it.',
              'Withhold and pay state taxes where they apply, and pay state unemployment tax.',
              "Pick a pay schedule and check your state's rules on how often employees must be paid.",
            ],
          },
          {
            type: 'p',
            text: 'A step-by-step walkthrough is in [how to run payroll for your first employee](/guides/how-to-run-payroll-for-your-first-employee).',
          },
        ],
      },
      {
        heading: 'Keep the right records',
        blocks: [
          {
            type: 'table',
            caption: 'Federal record retention for a new employee',
            columns: ['Record', 'How long to keep it'],
            rows: [
              [
                'Form I-9',
                'Three years after the date of hire or one year after employment ends, whichever is later. You must be able to produce it within three business days if inspectors ask.',
              ],
              ['Payroll records (FLSA)', 'At least three years.'],
              [
                'Time cards, wage rate tables and work schedules (FLSA)',
                'Two years.',
              ],
              [
                'Applications and other hiring records (EEOC)',
                'One year from when the record was made or the personnel action was taken, whichever is later.',
              ],
            ],
          },
          {
            type: 'p',
            text: 'States often require longer. See [how long to keep employee records](/guides/how-long-to-keep-employee-records). The rest of the first week, from logins to the first-week plan, is in the [new-hire onboarding checklist](/guides/new-hire-onboarding-checklist).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Do I need an EIN before I hire someone?',
        a: 'Yes in practice. The IRS lists hiring employees as a reason to get an EIN, and the federal new-hire report and payroll tax filings ask for it. It is free from the IRS.',
      },
      {
        q: 'Can the Form I-9 be completed before the first day?',
        a: 'Yes. Once the person has accepted the offer, they can complete Section 1 and you can complete Section 2 at any point up to three business days after their start date.',
      },
      {
        q: 'What if my new employee never returns a Form W-4?',
        a: 'The IRS says to withhold federal income tax as if the employee is single until they give you a W-4.',
      },
      {
        q: 'When does the 20-day new-hire reporting clock start?',
        a: 'From the date of hire, which federal guidance defines as the first day the employee performs services for pay. Check your state, because some require the report sooner.',
      },
    ],
    mambahr:
      'When you hire, MambaHR sends the new-hire forms and follows up until they are done, starts the Form I-9, requests logins and a laptop from IT, and sets the first-week plan. The hire also becomes a payroll change, either as a change file for your current payroll provider or sent to Deel-managed payroll (Powered by Deel), and a person approves every payroll run.',
    sources: [
      {
        label: 'IRS: Hiring employees',
        url: 'https://www.irs.gov/businesses/small-businesses-self-employed/hiring-employees',
      },
      {
        label: 'IRS: Get an employer identification number',
        url: 'https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number',
      },
      {
        label: 'IRS: Understanding employment taxes',
        url: 'https://www.irs.gov/businesses/small-businesses-self-employed/understanding-employment-taxes',
      },
      {
        label: 'USCIS: M-274, Completing Section 1 of Form I-9',
        url: 'https://www.uscis.gov/i-9-central/form-i-9-resources/handbook-for-employers-m-274/30-completing-section-1-of-form-i-9',
      },
      {
        label: 'USCIS: M-274, Completing Section 2 of Form I-9',
        url: 'https://www.uscis.gov/i-9-central/form-i-9-resources/handbook-for-employers-m-274/40-completing-section-2-of-form-i-9',
      },
      {
        label: 'USCIS: M-274, Retaining Form I-9',
        url: 'https://www.uscis.gov/i-9-central/form-i-9-resources/handbook-for-employers-m-274/100-retaining-form-i-9',
      },
      {
        label: 'HHS Office of Child Support Services: New hire reporting',
        url: 'https://acf.gov/css/employers/employer-responsibilities/new-hire-reporting',
      },
      {
        label: 'DOL: Workplace posters',
        url: 'https://www.dol.gov/agencies/whd/posters',
      },
      {
        label: 'EEOC: "Know Your Rights" poster',
        url: 'https://www.eeoc.gov/poster',
      },
      {
        label: 'DOL: Fact Sheet #21, Recordkeeping under the FLSA',
        url: 'https://www.dol.gov/agencies/whd/fact-sheets/21-flsa-recordkeeping',
      },
      {
        label: 'DOL: Unemployment insurance fact sheet',
        url: 'https://oui.doleta.gov/unemploy/uifactsheet.asp',
      },
      {
        label: 'Florida Department of Revenue: Reemployment tax',
        url: 'https://floridarevenue.com/taxes/taxesfees/Pages/reemployment.aspx',
      },
      {
        label: "Texas Department of Insurance: Workers' compensation for employers",
        url: 'https://www.tdi.texas.gov/wc/employer/index.html',
      },
      {
        label: 'California EDD: Form DE 4',
        url: 'https://edd.ca.gov/siteassets/files/pdf_pub_ctr/de4.pdf',
      },
      {
        label: 'FTC and EEOC: Background checks, what employers need to know (record retention)',
        url: 'https://www.ftc.gov/business-guidance/resources/background-checks-what-employers-need-know',
      },
    ],
    related: [
      '/guides/new-hire-onboarding-checklist',
      '/guides/form-i-9-and-e-verify',
      '/guides/new-hire-reporting',
      '/guides/how-to-run-payroll-for-your-first-employee',
      '/guides/contractor-vs-employee',
      '/onboarding',
    ],
  },

  // ── 2. Contractor or employee ──────────────────────────────────────────────
  {
    slug: 'contractor-vs-employee',
    category: 'Hiring',
    title: 'Contractor or employee? How to classify a worker',
    metaTitle: 'Contractor or Employee? How to Classify a Worker | MambaHR',
    metaDescription:
      'A worker is an employee when you control how the work is done and they depend on your business. Here are the IRS, Department of Labor and state ABC tests.',
    answer:
      "A worker is usually an employee, not an independent contractor, when you control how the work is done and they depend on your business rather than running their own. The IRS looks at behavioral control, financial control and the type of relationship; the Department of Labor (DOL) looks at the \"economic reality\" of the relationship; and some states, including California, treat a worker as an employee unless all three parts of an \"ABC test\" are met.",
    sections: [
      {
        heading: 'Why the label matters',
        blocks: [
          {
            type: 'p',
            text: 'For an employee, you withhold income tax, withhold and pay Social Security and Medicare taxes, and pay federal unemployment tax. For an independent contractor you generally do none of that. Employees are also covered by federal minimum wage and overtime rules, and by state wage, leave and workers\' compensation laws.',
          },
          {
            type: 'p',
            text: "Calling someone a contractor does not make them one. The IRS says that if you treat an employee as a contractor without a reasonable basis, you can be held liable for the employment taxes on that worker. States add their own penalties. California, for example, sets civil penalties of $5,000 to $15,000 per violation for willful misclassification, and $10,000 to $25,000 per violation where there is a pattern or practice.",
          },
        ],
      },
      {
        heading: 'The IRS test: who controls the work',
        blocks: [
          {
            type: 'p',
            text: 'For federal employment taxes, the IRS uses the common-law rules and groups the evidence into three categories. No single fact decides; you look at the whole relationship.',
          },
          {
            type: 'list',
            items: [
              'Behavioral control: does your company control, or have the right to control, what the worker does and how they do it? Detailed instructions, required methods and training on how you want the work done point toward employee.',
              'Financial control: who controls the business side of the job? Look at how the worker is paid, whether expenses are reimbursed, and who provides tools and supplies.',
              'Type of relationship: is there a written contract, are there employee-type benefits such as insurance or paid time off, will the relationship continue, and is the work a key part of your regular business?',
            ],
          },
        ],
      },
      {
        heading: 'The Department of Labor test: economic reality',
        blocks: [
          {
            type: 'p',
            text: 'For minimum wage and overtime under the Fair Labor Standards Act (FLSA), the question is whether the worker is economically dependent on your business or is in business for themselves. The federal rule is in the middle of a change, so here is where it stands as of October 2026:',
          },
          {
            type: 'list',
            items: [
              'A 2024 DOL rule (29 CFR Part 795, in effect since March 11, 2024) sets out a six-factor test. The DOL\'s rulemaking page still lists it as the rule in effect.',
              'On May 1, 2025, the DOL\'s Wage and Hour Division said in Field Assistance Bulletin 2025-1 that its investigators would stop applying the 2024 rule and would instead use Fact Sheet #13 (July 2008) and Opinion Letter FLSA2019-6. The same bulletin says the 2024 rule remains in effect for private lawsuits.',
              'On February 26, 2026, the DOL proposed a new rule to replace the 2024 rule, covering the FLSA, the Family and Medical Leave Act (FMLA) and the Migrant and Seasonal Agricultural Worker Protection Act. Comments closed on April 28, 2026. Check the DOL rulemaking page for whether a final rule has been issued.',
            ],
          },
          {
            type: 'p',
            text: 'Under every version, the factors overlap. The 2008 fact sheet the DOL now enforces lists: how integral the work is to your business, how permanent the relationship is, the worker\'s investment in facilities and equipment, the nature and degree of your control, the worker\'s opportunity for profit or loss, the initiative and judgment needed to compete in the open market, and how independently the worker\'s business is organized. It also says some facts do not matter, such as where the work is done, the absence of a formal agreement, whether the worker holds a state or local license, and how or when they are paid.',
          },
        ],
      },
      {
        heading: 'State ABC tests',
        blocks: [
          {
            type: 'p',
            text: 'Some states use a stricter test that starts from the assumption that a paid worker is an employee. California\'s version, in Labor Code section 2775 (the law known as AB 5), says a person is an employee unless the hiring business shows all three of these:',
          },
          {
            type: 'list',
            items: [
              'A: the person is free from your control and direction in doing the work, both under the contract and in fact.',
              'B: the person does work outside the usual course of your business.',
              'C: the person is customarily engaged in an independently established trade, occupation or business of the same kind as the work.',
            ],
          },
          {
            type: 'p',
            text: "California's Labor and Workforce Development Agency notes that part C is not met just because you call someone a contractor or make a contractor agreement a condition of the work. The law has exceptions for some occupations and relationships, so check whether one applies before relying on it. New Jersey also applies an ABC test, including under its unemployment, wage and hour, and wage payment laws.",
          },
          {
            type: 'p',
            text: 'The same person can pass the IRS test and fail a state test. Use the strictest test that applies where the person works. See [California](/hr-by-state/california) and [New Jersey](/hr-by-state/new-jersey).',
          },
        ],
      },
      {
        heading: 'Not sure? Get a ruling or fix it',
        blocks: [
          {
            type: 'list',
            items: [
              'Form SS-8: either your business or the worker can ask the IRS to decide the worker\'s status for federal employment taxes. The IRS says a determination usually takes at least six months.',
              'Voluntary Classification Settlement Program: eligible businesses can start treating workers as employees going forward with partial relief from past federal employment taxes, by filing Form 8952.',
              'Reasonable-basis relief: the IRS describes relief for businesses that had a reasonable basis for contractor treatment and filed the required information returns consistently.',
            ],
          },
          {
            type: 'p',
            text: 'If you convert a contractor to an employee, treat it as a new hire: Form I-9, Form W-4, a state new-hire report and payroll setup. See [how to hire your first employee](/guides/how-to-hire-your-first-employee).',
          },
        ],
      },
      {
        heading: 'Warning signs you have an employee',
        blocks: [
          {
            type: 'list',
            items: [
              'You set their hours, review how they do the work, or train them in your methods.',
              'They use your laptop, accounts and tools, and you reimburse their expenses.',
              'The work is ongoing with no end date, and it is the core of what your company sells.',
              'They work only for you and do not market their services to others.',
              'They are paid by the hour or week with no real chance of profit or loss.',
              'They do the same job as people you already treat as employees.',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Does a signed contractor agreement make someone a contractor?',
        a: 'No. The IRS, the DOL and state tests all look at how the relationship works in practice. California says a contractor label set by the business does not by itself satisfy part C of its ABC test.',
      },
      {
        q: 'Can a worker be a contractor for the IRS but an employee under state law?',
        a: 'Yes. The tests are different, and states like California and New Jersey use a stricter ABC test. Follow the strictest test that applies where the person works.',
      },
      {
        q: 'How long does an IRS Form SS-8 determination take?',
        a: 'The IRS says at least six months, so it is not a quick fix for a decision you need to make now.',
      },
    ],
    mambahr:
      'MambaHR answers classification questions with the federal and state law cited, and unclear cases go to a person to decide. When you bring someone on as an employee, it sends the new-hire forms, starts the Form I-9, and turns the hire into a payroll change for a person to approve.',
    sources: [
      {
        label: 'IRS: Independent contractor (self-employed) or employee?',
        url: 'https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee',
      },
      {
        label: 'IRS: About Form SS-8',
        url: 'https://www.irs.gov/forms-pubs/about-form-ss-8',
      },
      {
        label: 'DOL: Employee or independent contractor classification under the FLSA (rulemaking)',
        url: 'https://www.dol.gov/agencies/whd/flsa/misclassification/rulemaking',
      },
      {
        label: 'DOL: Field Assistance Bulletin No. 2025-1',
        url: 'https://www.dol.gov/sites/dolgov/files/WHD/fab/fab2025-1.pdf',
      },
      {
        label: 'DOL: Fact Sheet #13, Employee or independent contractor classification',
        url: 'https://www.dol.gov/agencies/whd/fact-sheets/13-flsa-employment-relationship',
      },
      {
        label: 'California Labor Code section 2775',
        url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=2775',
      },
      {
        label: 'California Labor Code section 226.8',
        url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=226.8',
      },
      {
        label: 'California Labor and Workforce Development Agency: ABC test',
        url: 'https://www.labor.ca.gov/employmentstatus/abctest/',
      },
      {
        label: 'New Jersey Department of Labor: ABC test rule proposal (April 28, 2025)',
        url: 'https://www.nj.gov/labor/lwdhome/press/2025/20250428_ABC.shtml',
      },
    ],
    related: [
      '/guides/how-to-hire-your-first-employee',
      '/guides/exempt-vs-non-exempt',
      '/guides/overtime-rules',
      '/hr-by-state/california',
      '/hr-by-state/new-jersey',
      '/compliance',
    ],
  },

  // ── 3. Pay transparency ────────────────────────────────────────────────────
  {
    slug: 'pay-transparency-job-posts',
    category: 'Hiring',
    title: 'How to write a job post with a pay range (pay transparency laws)',
    metaTitle: 'Pay Transparency Laws: Pay Ranges in Job Posts | MambaHR',
    metaDescription:
      'As of October 2026, 13 states, DC and New York City require a pay range in job posts. See who is covered, what to include, and how to write a compliant range.',
    answer:
      'As of October 2026, employers must include a pay range in job posts in California, Colorado, Hawaii, Illinois, Maine, Maryland, Massachusetts, Minnesota, New Jersey, New York, Vermont, Virginia and Washington, plus the District of Columbia and New York City, with size thresholds that run from one employee to 50. Several of these, including Colorado, Illinois, Maryland, Minnesota, New Jersey and Washington, also require a general description of benefits.',
    sections: [
      {
        heading: 'Where a pay range is required',
        blocks: [
          {
            type: 'table',
            caption: 'Pay range in job post laws in force as of October 2026',
            columns: ['Where', 'Who it covers', 'What the post must include', 'In effect since'],
            rows: [
              [
                'California',
                '15 or more employees, at least one in California',
                'The pay scale: a good-faith estimate of the salary or hourly wage range you reasonably expect to pay on hire',
                'January 1, 2023',
              ],
              [
                'Colorado',
                'Any employer with at least one employee in Colorado',
                'Pay rate or range, a general description of other pay (bonus, commission, tips), a general description of benefits, and how and when to apply',
                'January 1, 2021 (application deadline added January 1, 2024)',
              ],
              [
                'District of Columbia',
                'Any employer with at least one employee in DC',
                'Minimum and maximum projected salary or hourly pay. Healthcare benefits must be disclosed before the first interview',
                'June 30, 2024',
              ],
              [
                'Hawaii',
                '50 or more employees',
                'Hourly rate or salary range that reasonably reflects the actual expected pay. Not required for internal transfers or promotions',
                'January 1, 2024',
              ],
              [
                'Illinois',
                '15 or more employees',
                'Pay scale and benefits, for jobs performed at least partly in Illinois',
                'January 1, 2025',
              ],
              [
                'Maine',
                '10 or more employees',
                'The prospective range of pay. A job paid only on commission must say so instead',
                'July 29, 2026',
              ],
              [
                'Maryland',
                'All employers',
                'Minimum and maximum wage, a general description of benefits, and any other compensation',
                'October 1, 2024',
              ],
              [
                'Massachusetts',
                '25 or more employees with a primary place of work in Massachusetts',
                'Annual salary or hourly wage range you reasonably and in good faith expect to pay',
                'October 29, 2025',
              ],
              [
                'Minnesota',
                '30 or more employees at one or more Minnesota sites',
                'Starting salary range (or a fixed rate) and a general description of all benefits and other compensation',
                'January 1, 2025',
              ],
              [
                'New Jersey',
                '10 or more employees over 20 calendar weeks, doing business or hiring in New Jersey',
                'Hourly wage or salary (or range) and a general description of benefits and other compensation programs',
                'June 1, 2025',
              ],
              [
                'New York State',
                '4 or more employees',
                'Compensation or range (minimum and maximum), the job description if one exists, and a statement if the job is commission-based',
                'September 17, 2023',
              ],
              [
                'New York City',
                '4 or more employees (or 1 or more domestic workers), at least one working in NYC',
                'Good-faith minimum and maximum salary. Benefits are not required',
                'November 1, 2022',
              ],
              [
                'Vermont',
                '5 or more employees',
                'Compensation or range. Commission jobs must say so; tipped jobs must say so and give the base wage or range',
                'July 1, 2025',
              ],
              [
                'Virginia',
                'Any employer doing business in Virginia',
                'The wage, salary or good-faith salary range, in every public and internal posting for a job, promotion or transfer',
                'July 1, 2026',
              ],
              [
                'Washington',
                '15 or more employees',
                'Wage scale or salary range (or the fixed wage), and a general description of all benefits and other compensation',
                'January 1, 2023',
              ],
            ],
          },
          {
            type: 'p',
            text: 'Delaware is next. Its law was signed on September 26, 2025 and takes effect two years after enactment. It will cover employers with 26 or more employees and require the pay or pay range plus a general description of benefits and other compensation. Some cities and counties also have their own rules, so check where the job is located.',
          },
          {
            type: 'p',
            text: 'Even where no range is required in the post, some laws require you to share it when asked. In California, any employer must give an applicant the pay scale on reasonable request and give a current employee the pay scale for their own job. In Massachusetts, covered employers must give the range to an applicant or employee who asks and to an employee offered a promotion or transfer.',
          },
        ],
      },
      {
        heading: 'Remote jobs count too',
        blocks: [
          {
            type: 'p',
            text: 'These laws follow where the work is done, not where your office is. A remote job can bring you into a state you have never been to:',
          },
          {
            type: 'list',
            items: [
              "New York City covers jobs performed in whole or in part in the city, including remotely from the employee's home.",
              "California's Labor Commissioner reads the law to require the range if the position may ever be filled in California, in person or remotely.",
              'Maryland covers jobs performed at least partly in Maryland, but not one where the only Maryland work is something occasional like attending a conference.',
              "Massachusetts covers jobs whose primary place of work is Massachusetts, including remote roles.",
              'Vermont covers remote jobs that will mainly do work for an office or work location in Vermont.',
              'Colorado covers employers with at least one Colorado employee. If you have none at the time you make the hiring decision, the Colorado rule does not apply to that hire.',
            ],
          },
          {
            type: 'p',
            text: 'For a remote role open across the US, the simplest approach is to post a range on every job. If pay varies by location, give the range for each location.',
          },
        ],
      },
      {
        heading: 'How to write a compliant range',
        blocks: [
          {
            type: 'list',
            items: [
              'Give both ends. "$80,000 and up" or "up to $60,000" is not a range in Colorado or New York City. If the pay is fixed, the minimum and maximum can be the same number.',
              'Make it honest. The range should be what you genuinely expect to pay for this job when you post it. Colorado gives the example that one $30,000 to $100,000 range cannot be used for both a janitor and an accountant role.',
              'You can still pay outside it. Colorado and Vermont both say final pay can land outside the posted range, as long as the range was set in good faith. Vermont names reasons such as the applicant\'s qualifications or labor market conditions.',
              'Describe benefits plainly where required. Colorado expects health care, retirement, paid time off and other tax-reportable benefits to be named, without dollar values, and does not accept "etc." or "and more".',
              'Name the other pay. Bonuses, commissions and tips get a general description in Colorado. In Vermont, commission jobs say so, and tipped jobs give the base wage.',
              'Add how and when to apply for Colorado postings, including the expected application deadline.',
            ],
          },
          {
            type: 'p',
            text: 'A simple pattern that meets the strictest versions: "Pay: $95,000 to $120,000 per year, based on experience. Benefits: medical, dental and vision insurance, 401(k) with company match, 15 days of paid time off plus paid sick leave. Apply by November 15."',
          },
        ],
      },
      {
        heading: 'Common mistakes',
        blocks: [
          {
            type: 'list',
            items: [
              'Forgetting job boards and recruiters. In California, if you use a third party to post a job, you must give them the pay scale and they must include it. In Colorado, you are responsible for posts you pay someone else to publish.',
              'Forgetting internal postings. Colorado, New York State, New York City and Virginia cover promotion and transfer postings, not only public ads.',
              'Leaving benefits out in states that require them, or listing them in a way that is too vague.',
              'Posting one national range for a role where pay is set by location.',
              'Using an old posting template after a new state law took effect. Massachusetts and Vermont started in 2025, Maine and Virginia in 2026, and Delaware starts in 2027.',
            ],
          },
        ],
      },
      {
        heading: 'Keep a record of every post',
        blocks: [
          {
            type: 'p',
            text: 'Save a copy of each posting with the range you published and the pay you offered. Maryland requires employers to keep a record of compliance for each position for at least three years after it is filled, or three years from the posting date if it is not filled. Colorado requires records of wages and job descriptions. A clean record is also your best evidence that a range was set in good faith.',
          },
          {
            type: 'p',
            text: 'State-by-state details are on the [state pages](/hr-by-state), including [California](/hr-by-state/california), [Colorado](/hr-by-state/colorado), [New York](/hr-by-state/new-york) and [Washington](/hr-by-state/washington).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Do pay transparency laws apply if my company is based in another state?',
        a: 'Often yes. Most of these laws look at where the job is performed, including remote work, and New York City counts employees outside the city toward its four-employee threshold as long as one works in the city.',
      },
      {
        q: 'Can I pay more than the range I posted?',
        a: 'Yes, if the posted range was your honest expectation when you posted it. Colorado and Vermont both say final pay can fall outside the posted range, as long as the range was set in good faith.',
      },
      {
        q: 'Do I have to list benefits in the job post?',
        a: 'In Colorado, Illinois, Maryland, Minnesota, New Jersey and Washington, yes, as a general description. New York City and Massachusetts require pay only, and DC requires healthcare benefits to be disclosed before the first interview.',
      },
      {
        q: 'Does an internal promotion posting need a range?',
        a: 'In several places, yes. Colorado, New York State, New York City and Virginia cover internal postings. Hawaii does not require a range for internal transfers or promotions.',
      },
    ],
    mambahr:
      'MambaHR writes job posts with the pay range included, publishes them to your careers page, and keeps every application in one pipeline. Offers are drafted inside your pay range for a person to approve, and MambaHR does not use AI to screen, score or rank applicants.',
    sources: [
      {
        label: 'Maine Legislature: Public Law 2026, chapter 771 (LD 54), 26 MRSA 622-A',
        url: 'https://legislature.maine.gov/legis/bills/getPDF.asp?paper=HP0018&item=7&snum=132',
      },
      {
        label: 'Maine Legislature: general effective date of 2026 laws (July 29, 2026)',
        url: 'https://legislature.maine.gov/doc/12558',
      },
      {
        label: 'Code of Virginia section 40.1-28.7:12 (wage range transparency)',
        url: 'https://law.lis.virginia.gov/vacode/title40.1/chapter3/section40.1-28.7:12/',
      },
      {
        label: 'Constitution of Virginia, Article IV, section 13 (laws take effect July 1)',
        url: 'https://law.lis.virginia.gov/constitution/article4/section13/',
      },
      {
        label: 'California Labor Code section 432.3',
        url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=432.3',
      },
      {
        label: 'California Labor Commissioner: Equal Pay Act and pay transparency FAQ',
        url: 'https://www.dir.ca.gov/dlse/California_Equal_Pay_Act.htm',
      },
      {
        label: 'California Legislature: SB 1162 (2022)',
        url: 'https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB1162',
      },
      {
        label: 'Colorado Division of Labor Standards: INFO #9A, Transparency in pay and job opportunities',
        url: 'https://cdle.colorado.gov/sites/cdle/files/info_%239a_transparency_in_pay_and_job_opportunities_the_colorado_epewa_part_2_05.29.2024.pdf',
      },
      {
        label: 'Colorado General Assembly: SB 23-105',
        url: 'https://leg.colorado.gov/bills/sb23-105',
      },
      {
        label: 'D.C. Code section 32-1453.01',
        url: 'https://code.dccouncil.gov/us/dc/council/code/sections/32-1453.01',
      },
      {
        label: 'D.C. Law 25-138 (applicability date)',
        url: 'https://code.dccouncil.gov/us/dc/council/laws/25-138',
      },
      {
        label: 'Hawaii Civil Rights Commission: Act 203 pay transparency FAQs',
        url: 'https://labor.hawaii.gov/hcrc/files/2023/11/Act-203-Pay-Transparency-FAQs.pdf',
      },
      {
        label: 'Illinois Department of Labor: Pay transparency',
        url: 'https://labor.illinois.gov/pay',
      },
      {
        label: 'Maryland Department of Labor: Wage range transparency FAQ',
        url: 'https://labor.maryland.gov/labor/wages/esswagerangefaq.shtml',
      },
      {
        label: 'Massachusetts Attorney General: Pay transparency in Massachusetts',
        url: 'https://www.mass.gov/info-details/pay-transparency-in-massachusetts',
      },
      {
        label: 'Minnesota Statutes section 181.173',
        url: 'https://www.revisor.mn.gov/statutes/cite/181.173',
      },
      {
        label: 'New Jersey Department of Labor: Pay transparency',
        url: 'https://www.nj.gov/labor/myworkrights/wages/pay-transparency',
      },
      {
        label: 'New York State Department of Labor: Pay transparency',
        url: 'https://dol.ny.gov/pay-transparency',
      },
      {
        label: 'New York Labor Law section 194-b',
        url: 'https://www.nysenate.gov/legislation/laws/LAB/194-B',
      },
      {
        label: 'NYC Commission on Human Rights: Salary transparency fact sheet',
        url: 'https://www.nyc.gov/assets/cchr/downloads/pdf/publications/Salary-Transparency-Factsheet.pdf',
      },
      {
        label: 'Vermont Act 155 (2024), 21 V.S.A. section 495o',
        url: 'https://legislature.vermont.gov/Documents/2024/Docs/ACTS/ACT155/ACT155%20As%20Enacted.pdf',
      },
      {
        label: 'Washington RCW 49.58.110',
        url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=49.58.110',
      },
      {
        label: 'Delaware General Assembly: HB 105 session law',
        url: 'https://legis.delaware.gov/SessionLaws/Chapter?id=42391',
      },
    ],
    related: [
      '/guides/hiring-employees-in-another-state',
      '/guides/how-to-hire-your-first-employee',
      '/hr-by-state/california',
      '/hr-by-state/colorado',
      '/hr-by-state/new-york',
      '/hiring',
    ],
  },

  // ── 4. Background checks ───────────────────────────────────────────────────
  {
    slug: 'employee-background-checks',
    category: 'Hiring',
    title: 'How to run a background check on a job candidate legally',
    metaTitle: 'How to Run a Legal Background Check on a Candidate | MambaHR',
    metaDescription:
      'Under the FCRA, give a stand-alone disclosure, get written consent, and send pre-adverse and adverse action notices. Plus EEOC and fair chance rules.',
    answer:
      'To run a background check through a screening company legally, the Fair Credit Reporting Act (FCRA) requires you to give the candidate a stand-alone written disclosure and get their written permission first. If the report may lead you to reject them, you must send a pre-adverse action notice with a copy of the report and "A Summary of Your Rights Under the Fair Credit Reporting Act," give them a chance to respond, and then send an adverse action notice.',
    sections: [
      {
        heading: 'Which rules apply',
        blocks: [
          {
            type: 'p',
            text: 'Two sets of federal rules apply. The FCRA, enforced by the Federal Trade Commission (FTC), applies when you get a report from a company in the business of compiling background information, such as a criminal record or credit report from a screening company. Federal anti-discrimination laws, enforced by the Equal Employment Opportunity Commission (EEOC), apply to any background information you use, however you got it.',
          },
          {
            type: 'p',
            text: 'Many states and cities add their own rules on top, especially about criminal history. Those are covered below.',
          },
        ],
      },
      {
        heading: 'The FCRA process, step by step',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Decide what you check, for which roles, and apply it the same way to everyone in that role.',
              'Give a written disclosure that you may use the report for employment decisions. It must be in a stand-alone format and cannot be part of the job application. Only minor extra information, such as a short description of what a consumer report is, may be added.',
              'Get written permission. It can be on the same document as the disclosure.',
              "Certify to the screening company that you gave the disclosure, got permission, follow the FCRA, and won't misuse the information to discriminate.",
              'Review the report. If you are considering a rejection because of it, stop and send the pre-adverse action notice before you decide.',
              'Send the pre-adverse action notice with a copy of the report and "A Summary of Your Rights Under the Fair Credit Reporting Act." This gives the person a chance to review the report and explain anything negative.',
              'If you still decide not to hire, send the adverse action notice.',
              'Keep the records as long as required, then dispose of the report securely.',
            ],
          },
          {
            type: 'table',
            caption: 'The two FCRA notices',
            columns: ['Notice', 'When', 'What it must include'],
            rows: [
              [
                'Pre-adverse action notice',
                'Before you take the adverse action',
                'A copy of the report you relied on and "A Summary of Your Rights Under the Fair Credit Reporting Act"',
              ],
              [
                'Adverse action notice',
                'After you take the adverse action (orally, in writing or electronically)',
                'That the decision was based on the report; the name, address and phone number of the screening company; that the company did not make the decision and cannot explain it; and the right to dispute the report and get a free copy from the company within 60 days',
              ],
            ],
          },
          {
            type: 'p',
            text: 'The FTC\'s guidance does not set a fixed number of days between the two notices. The point of the first notice is to give the person a real chance to respond, so wait long enough for that. Some states set a minimum, such as California\'s five business days described below. If you ask for an "investigative report" based on interviews about a person\'s character or lifestyle, you must also tell them they can request a description of the nature and scope of the investigation.',
          },
        ],
      },
      {
        heading: 'Criminal records: arrests and convictions',
        blocks: [
          {
            type: 'p',
            text: "The EEOC's 2012 enforcement guidance on arrest and conviction records explains how Title VII of the Civil Rights Act applies:",
          },
          {
            type: 'list',
            items: [
              'An arrest is not proof that someone committed a crime, so an arrest alone should not be the reason for a rejection. You may look at the conduct behind it if it is relevant to the job.',
              'A conviction is usually enough evidence that the conduct happened, though records can be wrong or expunged.',
              'Weigh three factors: the nature and gravity of the offense, the time since the offense or sentence, and the nature of the job.',
              'Give the person a chance to explain (an individualized assessment): the facts around the offense, work history since, rehabilitation and references.',
              'Apply the same standards to everyone. Asking only some candidates about criminal records, based on race or another protected trait, is evidence of discrimination.',
            ],
          },
        ],
      },
      {
        heading: 'Fair chance and ban-the-box laws',
        blocks: [
          {
            type: 'p',
            text: 'Many states and cities limit when and how you can ask about criminal history. Two examples:',
          },
          {
            type: 'list',
            items: [
              "California Fair Chance Act (employers with five or more employees): you cannot ask about criminal history until after a conditional job offer. Before deciding to deny the job because of a conviction, you must do an individualized assessment, send a written preliminary notice with a copy of the report, and give the person at least five business days to respond, plus five more business days if they dispute the report. Then you send a written final decision.",
              'New York City Fair Chance Act: most employers cannot ask about criminal records in job postings, applications or interviews before a job offer. To take adverse action afterward, you must find a direct relationship between the record and the job, or an unreasonable risk, using factors set out in the law, and give the person a copy of your written analysis, a copy of the background check and a chance to respond.',
            ],
          },
          {
            type: 'p',
            text: 'Other states and cities have their own versions. Before ordering a check, confirm the rules where the job is located. See the state pages for [California](/hr-by-state/california) and [New York](/hr-by-state/new-york).',
          },
        ],
      },
      {
        heading: 'Keep records, then dispose of them safely',
        blocks: [
          {
            type: 'p',
            text: 'The EEOC requires employers to keep personnel and hiring records, including applications from people you did not hire, for one year from when the record was made or the action was taken, whichever is later. If someone files a discrimination charge, keep the records until the case is over. After that, the FTC requires secure disposal of background reports, for example by shredding paper and wiping electronic files so they cannot be read.',
          },
        ],
      },
      {
        heading: 'Common mistakes',
        blocks: [
          {
            type: 'list',
            items: [
              'Putting the FCRA disclosure inside the application, or adding unrelated terms such as a liability waiver to it.',
              'Rejecting someone first and sending the report afterward, which skips the pre-adverse step.',
              'Sending the pre-adverse notice without the Summary of Rights.',
              'Running checks only on some candidates for the same role.',
              'Asking about convictions on the application in a place with a fair chance law.',
              'Treating an arrest without a conviction as disqualifying.',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'How long should I wait between the pre-adverse and adverse action notices?',
        a: 'The FTC\'s guidance does not set a number of days, only that the person needs a real chance to review and respond. California requires at least five business days under its Fair Chance Act.',
      },
      {
        q: 'Do I need consent to look someone up online myself?',
        a: 'The FCRA consent and notice rules apply to reports from screening companies. Federal anti-discrimination laws apply to any background information you use, however you found it.',
      },
      {
        q: 'Where do I get the Summary of Rights?',
        a: 'The screening company should give it to you with the report. The Consumer Financial Protection Bureau publishes the model form.',
      },
    ],
    mambahr:
      'MambaHR orders background checks through Checkr from the same hiring pipeline as the job post and the offer, and a person approves the decisions that matter. State rules such as fair chance laws come back with the law cited, unclear cases go to a person, and every change is logged.',
    sources: [
      {
        label: 'FTC and EEOC: Background checks, what employers need to know',
        url: 'https://www.ftc.gov/business-guidance/resources/background-checks-what-employers-need-know',
      },
      {
        label: 'CFPB: FCRA model forms and disclosures (Summary of consumer rights)',
        url: 'https://www.consumerfinance.gov/compliance/compliance-resources/other-applicable-requirements/fair-credit-reporting-act/model-forms-and-disclosures/',
      },
      {
        label: 'EEOC: Enforcement guidance on arrest and conviction records',
        url: 'https://www.eeoc.gov/laws/guidance/enforcement-guidance-consideration-arrest-and-conviction-records-employment-decisions',
      },
      {
        label: 'California Civil Rights Department: Fair Chance Act',
        url: 'https://calcivilrights.ca.gov/fair-chance-act/',
      },
      {
        label: 'NYC Commission on Human Rights: Fair Chance Act in employment',
        url: 'https://www.nyc.gov/site/cchr/media/fair-chance-act-campaign.page',
      },
    ],
    related: [
      '/guides/how-to-hire-your-first-employee',
      '/guides/new-hire-onboarding-checklist',
      '/guides/how-long-to-keep-employee-records',
      '/hr-by-state/california',
      '/hr-by-state/new-york',
      '/hiring',
    ],
  },

  // ── 5. Remote employee in another state ────────────────────────────────────
  {
    slug: 'hiring-employees-in-another-state',
    category: 'Hiring',
    title: 'How to hire a remote employee in another state',
    metaTitle: 'How to Hire a Remote Employee in Another State | MambaHR',
    metaDescription:
      'To hire in another state, register there for unemployment and withholding taxes, cover workers\' comp, report the new hire, and follow that state\'s labor laws.',
    answer:
      "To hire a remote employee in another state, register as an employer in that state for unemployment insurance and, if it taxes wages, state income tax withholding; make sure workers' compensation covers them there; report the hire to that state's new-hire directory within 20 days or its shorter deadline; and follow that state's wage, leave, pay transparency and notice rules. Your business often also has to register with that state's Secretary of State.",
    sections: [
      {
        heading: 'The checklist',
        blocks: [
          {
            type: 'table',
            caption: 'What to set up before a remote employee in a new state starts',
            columns: ['Task', 'Where', 'Notes'],
            rows: [
              [
                'Unemployment insurance registration',
                "The state's unemployment or workforce agency",
                'Each state runs its own program funded mainly by employer taxes, with its own triggers. Florida, for example, makes you liable at $1,500 in quarterly payroll or one employee on any day in 20 weeks.',
              ],
              [
                'State income tax withholding',
                "The state's tax or revenue department",
                'Only if the state taxes wages. Some states have their own withholding form, such as California\'s DE 4.',
              ],
              [
                "Workers' compensation",
                'Your insurer and the state',
                "Rules are set state by state. Confirm your policy covers employees in the new state. In Texas, coverage is optional for most private employers, but employers without it must tell the state.",
              ],
              [
                'New-hire report',
                "The state where the employee works",
                'Within 20 days of hire under federal law, sooner in some states. Or register as a multistate employer and report everyone to one state.',
              ],
              [
                'Business registration (foreign qualification)',
                "The state's Secretary of State",
                'Often required. The Small Business Administration lists having employees working in a state as one sign you are doing business there.',
              ],
              [
                'Notices and posters',
                'Federal and state labor agencies',
                'The EEOC says its notice can be posted electronically for remote workers who do not visit your workplace. Add the new state\'s required notices.',
              ],
            ],
          },
        ],
      },
      {
        heading: 'Whose laws apply',
        blocks: [
          {
            type: 'p',
            text: "Employment laws generally follow where the employee does the work, not where your company is based. When federal and state law both apply, the Department of Labor says the employee gets the higher minimum wage. Plan on following the employee's state for overtime, final pay and leave as well, and check each rule for that state rather than yours.",
          },
          {
            type: 'p',
            text: "Pay transparency laws show how this works for remote jobs. New York City covers jobs done from an employee's home in the city. Maryland covers jobs performed at least partly in Maryland. Massachusetts covers remote roles whose primary place of work is Massachusetts. See [pay ranges in job posts](/guides/pay-transparency-job-posts).",
          },
        ],
      },
      {
        heading: "Pay, leave and notices follow the employee's state",
        blocks: [
          {
            type: 'p',
            text: 'Once someone works in a new state, check these rules for that state before their first day:',
          },
          {
            type: 'list',
            items: [
              'Minimum wage, [overtime](/guides/overtime-rules) and [exempt status](/guides/exempt-vs-non-exempt).',
              '[Paid sick leave](/guides/paid-sick-leave-laws) and [paid family leave](/guides/paid-family-leave-states), including any payroll contributions.',
              'Written notices at hire. California, for example, requires a written notice at hire for most non-exempt employees under Labor Code section 2810.5, covering the pay rate, payday, employer details, the workers\' comp carrier and paid sick leave rights.',
              '[Final pay](/guides/final-paycheck-laws) and [unused PTO payout](/guides/unused-pto-payout) rules, which can differ sharply from your home state.',
              'Required [labor law posters](/guides/labor-law-posters), delivered electronically if the person never visits an office.',
            ],
          },
          {
            type: 'p',
            text: 'The state pages cover these in one place: [California](/hr-by-state/california), [New York](/hr-by-state/new-york), [Texas](/hr-by-state/texas), [Washington](/hr-by-state/washington), [Massachusetts](/hr-by-state/massachusetts), [Colorado](/hr-by-state/colorado), [Illinois](/hr-by-state/illinois), [Florida](/hr-by-state/florida), [New Jersey](/hr-by-state/new-jersey) and [Georgia](/hr-by-state/georgia).',
          },
        ],
      },
      {
        heading: 'Form I-9 for someone you never meet',
        blocks: [
          {
            type: 'p',
            text: 'The Form I-9 deadline is the same for remote hires: Section 1 by the first day, Section 2 within three business days. You or an authorized representative must examine the documents. If you take part in E-Verify and are in good standing, USCIS allows a DHS-authorized alternative procedure to examine documents remotely by live video. If you offer it, apply it consistently, either to everyone at a hiring site or to all remote hires, and never based on citizenship or immigration status. See [Form I-9 and E-Verify](/guides/form-i-9-and-e-verify).',
          },
        ],
      },
      {
        heading: 'Common mistakes',
        blocks: [
          {
            type: 'list',
            items: [
              'Running the first payroll before registering for unemployment insurance and withholding in the new state.',
              "Reporting the new hire to your home state instead of the employee's work state without registering as a multistate employer.",
              "Assuming your workers' comp policy already covers a new state.",
              'Applying your home-state handbook to everyone, for example on PTO payout or sick leave, when the employee\'s state sets a different rule.',
              'Forgetting that an existing employee who moves to a new state brings these same steps with them.',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: "Do I report a remote employee's hire to my state or theirs?",
        a: 'To the state where the employee works. If you have employees in several states, you can register with the federal Department of Health and Human Services as a multistate employer and report all new hires to one of those states.',
      },
      {
        q: 'Does hiring one remote employee mean I have to register my business in that state?',
        a: 'Often, yes. The Small Business Administration lists having employees working in a state as one of the signs that you are doing business there, which usually means foreign qualification with the Secretary of State. Check that state\'s rules.',
      },
      {
        q: 'Which state minimum wage applies to a remote employee?',
        a: 'The one where the employee works. When federal and state rates differ, the Department of Labor says the employee is entitled to the higher rate.',
      },
    ],
    mambahr:
      "MambaHR keeps your employee records, including where each person works, and answers federal and state employment-law questions with the law cited, sending unclear cases to a person. When someone joins from a new state, it sends the new-hire forms, starts the Form I-9, and turns the hire into a payroll change for your payroll provider or for Deel-managed payroll (Powered by Deel).",
    sources: [
      {
        label: 'HHS Office of Child Support Services: New hire reporting',
        url: 'https://acf.gov/css/employers/employer-responsibilities/new-hire-reporting',
      },
      {
        label: 'DOL: Unemployment insurance fact sheet',
        url: 'https://oui.doleta.gov/unemploy/uifactsheet.asp',
      },
      {
        label: 'Florida Department of Revenue: Reemployment tax',
        url: 'https://floridarevenue.com/taxes/taxesfees/Pages/reemployment.aspx',
      },
      {
        label: 'California EDD: Form DE 4',
        url: 'https://edd.ca.gov/siteassets/files/pdf_pub_ctr/de4.pdf',
      },
      {
        label: "Texas Department of Insurance: Workers' compensation for employers",
        url: 'https://www.tdi.texas.gov/wc/employer/index.html',
      },
      {
        label: "DOL: Workers' compensation",
        url: 'https://www.dol.gov/general/topic/workcomp',
      },
      {
        label: 'SBA: Register your business',
        url: 'https://www.sba.gov/business-guide/launch-your-business/register-your-business',
      },
      {
        label: 'DOL: Minimum wage FAQ',
        url: 'https://www.dol.gov/agencies/whd/minimum-wage/faq',
      },
      {
        label: 'California Labor Code section 2810.5',
        url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=2810.5',
      },
      {
        label: 'USCIS: Remote examination of documents',
        url: 'https://www.uscis.gov/i-9-central/remote-examination-of-documents',
      },
      {
        label: 'USCIS: M-274, Completing Section 2 of Form I-9',
        url: 'https://www.uscis.gov/i-9-central/form-i-9-resources/handbook-for-employers-m-274/40-completing-section-2-of-form-i-9',
      },
      {
        label: 'EEOC: "Know Your Rights" poster',
        url: 'https://www.eeoc.gov/poster',
      },
    ],
    related: [
      '/guides/new-hire-reporting',
      '/guides/pay-transparency-job-posts',
      '/guides/paid-sick-leave-laws',
      '/guides/workers-compensation-requirements',
      '/hr-by-state',
      '/onboarding',
    ],
  },
]
