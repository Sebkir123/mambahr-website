import type { StateGuide } from '../guides/types'

// State pages, group B: New York, New Jersey, Florida.
// Every rule below was checked against the official source listed in the
// record's `sources` (state statute sites, state labor departments, the state
// new-hire reporting agencies). Figures dated 2026 were confirmed on the
// agency's own 2026 page. Anything that could not be confirmed is left out.

export const statesGroupB: StateGuide[] = [
  // ── New York ───────────────────────────────────────────────────────────────
  {
    slug: 'new-york',
    name: 'New York',
    abbr: 'NY',
    metaTitle: 'New York HR Laws for Small Employers (2026) | MambaHR',
    metaDescription:
      'New York: pay ranges in job posts at 4+ employees, a pay notice at hire, 40 to 56 hours of sick leave, 12 weeks of paid family leave, final pay by next payday.',
    answer:
      'New York adds a lot to federal law, even for very small teams: pay ranges in job posts once you have 4 or more employees, a signed pay notice at hire, up to 40 hours of sick leave a year (56 at 100 or more employees) plus 20 hours of paid prenatal leave, up to 12 weeks of Paid Family Leave, and final pay by the regular payday for the last pay period worked, with a written termination notice within 5 working days.',
    keyFacts: {
      payTransparency:
        'Required at 4 or more employees for jobs performed at least partly in New York or reporting to a New York location. Post the pay or pay range and the job description if one exists. New York City has its own posting law at the same size.',
      newHireReporting:
        'Within 20 calendar days of the hire date, to the NYS Department of Taxation and Finance. Independent contractors with contracts over $2,500 must be reported too.',
      paidSickLeave:
        '1 hour per 30 hours worked. Up to 40 hours a year at 1 to 99 employees (unpaid at 1 to 4 employees unless net income was over $1 million) and 56 paid hours at 100 or more. Plus 20 hours of paid prenatal leave.',
      familyLeave:
        'New York Paid Family Leave: up to 12 weeks of job-protected leave at 67% of average weekly pay, capped at $1,228.53 a week in 2026. Employees fund it through a payroll deduction of 0.432% of wages.',
      finalPayFired:
        'By the regular payday for the pay period in which employment ended. Also give a written notice of the end date and the date benefits stop within 5 working days.',
      finalPayQuit:
        'Same rule: by the regular payday for the pay period in which employment ended. Mail it if the employee asks.',
      vacationPayout:
        'Earned vacation must be paid out unless your written policy told employees in advance that it is forfeited. Unused sick leave does not have to be paid out.',
    },
    sections: [
      {
        heading: 'Hiring in New York',
        blocks: [
          {
            type: 'p',
            text: "**Pay ranges in job posts.** Under Labor Law section 194-b, employers with 4 or more employees must include the pay, or a pay range, in every ad for a job, promotion or transfer that will be performed at least in part in New York, or that reports to a supervisor, office or worksite in New York. The range is the minimum and maximum annual salary or hourly pay you believe in good faith is accurate when you post. Include the job description if one exists. For commission-only roles, say that pay is based on commission. Jobs performed in New York City are also covered by the city's own salary transparency law, which applies at 4 or more employees. More detail: [pay transparency in job posts](/guides/pay-transparency-job-posts).",
          },
          {
            type: 'p',
            text: '**Pay notice at hire.** Labor Law section 195.1 (part of the Wage Theft Prevention Act) requires a written pay notice for every new hire, in English and in the employee\'s primary language when the Department of Labor publishes a template in it (Spanish, Chinese, Haitian Creole, Korean, Polish and Russian). The notice states the pay rate and how it is paid, the overtime rate for non-exempt employees, the regular payday, and your legal name, other business names, address and phone number. Get a signed and dated acknowledgment and keep it for 6 years. If any of that information changes, tell the employee in writing at least 7 calendar days before the change.',
          },
          {
            type: 'table',
            caption: 'New York Department of Labor pay notice forms',
            columns: ['Form', 'Use it for'],
            rows: [
              ['LS 54', 'Hourly employees'],
              ['LS 55', 'Employees with more than one hourly rate'],
              ['LS 56', 'Weekly rate or salary for 40 hours or fewer a week'],
              ['LS 57', 'Salary for varying hours, or day, piece or flat rates'],
              ['LS 59', 'Exempt employees'],
            ],
          },
          {
            type: 'p',
            text: '**Harassment prevention.** Every New York employer must have a written sexual harassment prevention policy and give it to employees at hire and at each training, in English and in the employee\'s primary language when a state template exists. Training must happen every year and must be interactive.',
          },
          {
            type: 'p',
            text: '**New-hire reporting.** Report each new or rehired employee working in New York within 20 calendar days of the hire date, online through the New York New Hire Online Reporting Center or on Form IT-2104. The report includes whether dependent health insurance is available and when the employee qualifies. Independent contractors with contracts over $2,500 are reported too. See [new-hire reporting](/guides/new-hire-reporting).',
          },
          {
            type: 'p',
            text: "**Background checks.** New York's Correction Law Article 23-A lets you turn someone down over a past conviction only when the offense directly relates to the job or hiring them would create an unreasonable risk, after weighing the factors the law lists. In New York City, the Fair Chance Act (4 or more employees) bars criminal history questions until after a conditional offer. To withdraw an offer over a record, you must share what you relied on and a written analysis, then give the applicant at least 5 business days to respond. See [background checks](/guides/employee-background-checks).",
          },
        ],
      },
      {
        heading: 'Leave in New York',
        blocks: [
          {
            type: 'p',
            text: 'New York Paid Sick Leave (Labor Law section 196-b) covers every private employer. Employees earn at least 1 hour for every 30 hours worked, part-time and exempt staff included. Unused leave carries over, but you can cap use at 40 hours a year (fewer than 100 employees) or 56 hours (100 or more). You do not have to pay out unused sick leave when someone leaves.',
          },
          {
            type: 'table',
            caption: 'New York sick leave by employer size',
            columns: ['Employees', 'Hours per calendar year', 'Paid or unpaid'],
            rows: [
              ['1 to 4, net income of $1 million or less', 'Up to 40', 'Unpaid'],
              ['1 to 4, net income over $1 million', 'Up to 40', 'Paid'],
              ['5 to 99', 'Up to 40', 'Paid'],
              ['100 or more', 'Up to 56', 'Paid'],
            ],
          },
          {
            type: 'p',
            text: '**Paid prenatal leave.** Since January 1, 2025, every private employer must give 20 hours of paid prenatal leave per 52-week period, on top of sick leave. There is no waiting period and no accrual: new hires have the full 20 hours. Pay it at the regular rate or the minimum wage, whichever is higher. You cannot require an employee to use sick leave first, and you cannot ask for medical records or details of the appointment.',
          },
          {
            type: 'p',
            text: '**Paid Family Leave.** New York Paid Family Leave gives up to 12 weeks of job-protected, paid leave to bond with a new child, care for a family member with a serious health condition, or help with a family member\'s military deployment. In 2026 it pays 67% of the employee\'s average weekly wage, up to $1,228.53 a week (67% of the state average weekly wage of $1,833.63). Employees pay for it through a deduction of 0.432% of gross wages, up to $411.91 for the year. Full-time employees (20 or more hours a week) qualify after 26 consecutive weeks; part-time employees after 175 days worked. Employers with staff in New York may also need workers\' compensation and disability benefits coverage, alongside Paid Family Leave coverage.',
          },
          {
            type: 'p',
            text: 'Federal Family and Medical Leave Act (FMLA) leave starts at 50 employees and can run at the same time. New York City adds its own rules on top of the state law, including 32 hours of unpaid protected time off. More: [paid sick leave laws](/guides/paid-sick-leave-laws) and [paid family leave by state](/guides/paid-family-leave-states).',
          },
        ],
      },
      {
        heading: 'Final pay and ending employment',
        blocks: [
          {
            type: 'table',
            caption: 'Ending employment in New York',
            columns: ['What', 'Deadline or rule', 'Source'],
            rows: [
              ['Final pay, fired or laid off', 'By the regular payday for the pay period in which employment ended', 'Labor Law 191(3)'],
              ['Final pay, quit', 'Same rule; mail it if the employee asks', 'Labor Law 191(3)'],
              ['Written termination notice', 'Exact end date and date benefits stop, within 5 working days', 'Labor Law 195(6)'],
              ['Record of Employment (IA 12.3)', 'Give to anyone laid off, discharged, who quits, or whose hours drop to 30 or less a week', 'NYS Department of Labor'],
              ['Unused vacation', 'Pay it unless a written forfeiture policy was given to employees', 'NYS Department of Labor'],
            ],
          },
          {
            type: 'p',
            text: 'The written termination notice is easy to miss. It must state the exact date employment ended and the exact date employee benefits are cancelled, and it must go out no later than 5 working days after the end date, whatever the reason for leaving.',
          },
          {
            type: 'p',
            text: 'Health coverage: federal COBRA applies at 20 or more employees. New York also requires employers with fewer than 20 employees to provide the equivalent of COBRA, and state continuation can last up to 36 months at no more than 102% of the cost. See [when you need to offer COBRA](/guides/when-do-you-need-to-offer-cobra) and the step-by-step [firing an employee in New York](/guides/firing-an-employee-in-new-york).',
          },
        ],
      },
      {
        heading: 'Other things to know',
        blocks: [
          {
            type: 'table',
            caption: 'New York pay floors in 2026',
            columns: ['Region', 'Minimum wage', 'Exempt salary (executive and administrative)'],
            rows: [
              ['New York City, Long Island, Westchester', '$17.00 an hour', '$1,275.00 a week'],
              ['Rest of the state', '$16.00 an hour', '$1,199.10 a week'],
            ],
          },
          {
            type: 'p',
            text: 'These rates took effect January 1, 2026. The Department of Labor has announced that the minimum wage will stay the same on January 1, 2027. The state salary floor is well above the federal one, so check it before you classify someone as exempt. See [exempt vs non-exempt](/guides/exempt-vs-non-exempt).',
          },
          {
            type: 'list',
            items: [
              '**Discrimination:** the New York State Human Rights Law covers all employers in the state, whatever their size.',
              '**Layoffs:** the New York WARN Act applies at 50 or more employees, not counting part-time staff. It requires 90 days\' notice before a plant closing affecting 25 or more employees, a mass layoff (25 or more employees who are at least 33% of the site, or 250 or more), or a relocation of 50 miles or more. Large cuts in hours (more than 50% in each month of a 6-month period) can also count as job losses. See [WARN Act layoffs](/guides/warn-act-layoffs).',
              '**Insurance:** most employers with staff in New York need workers\' compensation, disability benefits and Paid Family Leave coverage. See [workers\' compensation requirements](/guides/workers-compensation-requirements).',
              '**Posters and policies:** post the minimum wage poster, and post or hand out your policy on sick leave, vacation, personal leave, holidays and hours. See [labor law posters](/guides/labor-law-posters).',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Does New York sick leave apply to a company with 3 employees?',
        a: 'Yes. Employers with 1 to 4 employees must give up to 40 hours of sick leave a year. It can be unpaid unless the business had net income over $1 million in the prior tax year, in which case it must be paid.',
      },
      {
        q: 'Do remote job posts need a pay range in New York?',
        a: 'If you have 4 or more employees, yes when the job will be performed at least in part in New York, or when the remote worker will report to a supervisor, office or worksite in New York.',
      },
      {
        q: 'When is a final paycheck due in New York?',
        a: 'By the regular payday for the pay period in which employment ended, whether the employee quit or was let go. Mail it if they ask. Separately, give a written notice of the end date and the date benefits stop within 5 working days.',
      },
      {
        q: 'Do I have to pay out unused vacation in New York?',
        a: 'Yes, unless you told employees in writing beforehand that unused vacation is forfeited when they leave. Without that written policy, earned vacation must be paid.',
      },
      {
        q: 'Is New York Paid Family Leave job-protected?',
        a: 'Yes. Paid Family Leave gives up to 12 weeks of job-protected, paid time off once an employee meets the work requirement (26 consecutive weeks full-time, or 175 days part-time).',
      },
    ],
    mambahr:
      'MambaHR keeps your New York employee records and hiring pipeline, posts jobs with pay ranges, and sends the new-hire forms and follows up until they are done. Leave requests are approved within your policy, with federal FMLA eligibility checked and New York\'s paid leave programs cited for a person to decide how they combine. When someone leaves, it works out final pay under New York\'s rules for a person to approve, drafts the separation paperwork and prepares the COBRA continuation notices.',
    sources: [
      { label: 'NYS DOL: Pay Transparency', url: 'https://dol.ny.gov/pay-transparency' },
      { label: 'NY Labor Law section 194-B', url: 'https://www.nysenate.gov/legislation/laws/LAB/194-B' },
      { label: 'NY Labor Law section 195 (pay notice, termination notice)', url: 'https://www.nysenate.gov/legislation/laws/LAB/195' },
      { label: 'NYS DOL: Notice of Pay Rate forms', url: 'https://dol.ny.gov/notice-pay-rate' },
      { label: 'NYS Tax Department: New hire reporting', url: 'https://www.tax.ny.gov/bus/wt/newhire.htm' },
      { label: 'NY Labor Law section 196-B (sick leave)', url: 'https://www.nysenate.gov/legislation/laws/LAB/196-B' },
      { label: 'NY.gov: New York Paid Sick Leave', url: 'https://www.ny.gov/programs/new-york-paid-sick-leave' },
      { label: 'NY.gov: Paid Prenatal Leave', url: 'https://www.ny.gov/programs/new-york-state-paid-prenatal-leave' },
      { label: 'NYS DOL: Overview of New York State Labor Laws (LS 125, 05/26)', url: 'https://forms.labor.ny.gov/WP/LS125.pdf' },
      { label: 'NY Paid Family Leave: 2026 updates', url: 'https://paidfamilyleave.ny.gov/2026' },
      { label: 'NY Paid Family Leave: Eligibility', url: 'https://paidfamilyleave.ny.gov/eligibility' },
      { label: 'NY Labor Law section 191 (final pay)', url: 'https://www.nysenate.gov/legislation/laws/LAB/191' },
      { label: 'NYS DOL: Wages and Hours FAQ (vacation, final pay)', url: 'https://dol.ny.gov/wages-and-hours-frequently-asked-questions' },
      { label: 'NYS DOL: Record of Employment (IA 12.3)', url: 'https://forms.labor.ny.gov/UI/IA12.3.pdf' },
      { label: 'NYS DOL: History of the minimum wage', url: 'https://dol.ny.gov/history-minimum-wage-new-york-state' },
      { label: 'NYS DOL: Minimum Wage FAQ (exempt salary)', url: 'https://dol.ny.gov/minimum-wage-frequently-asked-questions' },
      { label: 'NYS DOL: Minimum wage (January 1, 2027 rates)', url: 'https://dol.ny.gov/minimum-wage-0' },
      { label: 'NY Labor Law section 201-G (harassment policy and training)', url: 'https://www.nysenate.gov/legislation/laws/LAB/201-G' },
      { label: 'NY Labor Law section 860-A (WARN definitions)', url: 'https://www.nysenate.gov/legislation/laws/LAB/860-A' },
      { label: 'NY Labor Law section 860-B (WARN notice)', url: 'https://www.nysenate.gov/legislation/laws/LAB/860-B' },
      { label: 'NY Correction Law section 752', url: 'https://www.nysenate.gov/legislation/laws/COR/752' },
      { label: "NYS Workers' Compensation Board: Employers", url: 'https://www.wcb.ny.gov/content/main/Employers/Employers.jsp' },
      { label: 'NY Executive Law section 292 (Human Rights Law definitions)', url: 'https://www.nysenate.gov/legislation/laws/EXC/292' },
      { label: 'NYS DFS: COBRA FAQ (state continuation)', url: 'https://www.dfs.ny.gov/consumers/health_insurance/cobra_faqs' },
      { label: 'NYC 311: Salary Transparency Law', url: 'https://portal.311.nyc.gov/article/?kanumber=KA-03530' },
      { label: 'NYC Commission on Human Rights: Fair Chance Act', url: 'https://www.nyc.gov/site/cchr/law/fair-chance-act.page' },
      { label: 'NYC DCWP: Paid Safe and Sick Leave Law', url: 'https://www.nyc.gov/site/dca/about/paid-sick-leave-law.page' },
    ],
    related: [
      '/guides/firing-an-employee-in-new-york',
      '/guides/final-paycheck-laws',
      '/guides/paid-sick-leave-laws',
      '/guides/paid-family-leave-states',
      '/guides/warn-act-layoffs',
      '/hr-by-state/new-jersey',
    ],
  },

  // ── New Jersey ─────────────────────────────────────────────────────────────
  {
    slug: 'new-jersey',
    name: 'New Jersey',
    abbr: 'NJ',
    metaTitle: 'New Jersey HR Laws for Small Employers (2026) | MambaHR',
    metaDescription:
      'New Jersey: 40 hours of sick leave at any size, pay ranges and benefits in job posts at 10+ employees, family leave at 15+, final pay by the next payday.',
    answer:
      'New Jersey reaches small employers early: up to 40 hours of earned sick leave a year from the first employee, pay ranges and benefits in job posts at 10 or more employees, job-protected family leave at 15 or more employees (since July 17, 2026), state disability and family leave insurance paying 85% of wages up to $1,119 a week in 2026, and final pay by the regular payday for the pay period in which employment ended.',
    keyFacts: {
      payTransparency:
        'Required since June 1, 2025 at 10 or more employees over 20 calendar weeks, counting staff inside and outside New Jersey. Posts must show the pay or pay range, a general description of benefits, and other compensation such as bonuses or commissions.',
      newHireReporting:
        'Within 20 days of the hire or rehire date, to the New Jersey New Hire Reporting Center.',
      paidSickLeave:
        'All employers, any size: 1 hour per 30 hours worked, up to 40 hours a year. Usable from the 120th day of employment. No payout required at separation.',
      familyLeave:
        'Family Leave Insurance pays 85% of average weekly wages, up to $1,119 a week in 2026, for up to 12 weeks (or 56 separate days). Temporary Disability Insurance covers the employee\'s own illness. Both are funded by payroll deductions and both are job-protected.',
      finalPayFired:
        'By the regular payday for the pay period in which employment ended. Mail it if the employee asks.',
      finalPayQuit:
        'Same rule: by the regular payday for the pay period in which employment ended.',
      vacationPayout:
        'No New Jersey law requires payout. Follow your written policy or agreement: the state does enforce vacation pay you have promised.',
    },
    sections: [
      {
        heading: 'Hiring in New Jersey',
        blocks: [
          {
            type: 'p',
            text: '**Pay and benefits in job posts.** New Jersey\'s pay transparency law (P.L. 2024, chapter 91) took effect June 1, 2025. It covers employers with 10 or more employees over 20 calendar weeks that do business, employ people or take applications in New Jersey. The 10 count includes employees outside New Jersey. Every posting for a new job or transfer must show the hourly wage or salary (or a range with a start and an end point), a general description of benefits, and other compensation programs such as commissions, bonuses or profit sharing. The rule reaches job sites, print ads, newsletters, email and social media. You must also make reasonable efforts to tell current employees in affected departments about promotion opportunities. Penalties are up to $300 for a first violation and $600 for each later one. See [pay transparency in job posts](/guides/pay-transparency-job-posts).',
          },
          {
            type: 'table',
            caption: 'What to give a new hire in New Jersey',
            columns: ['Notice', 'When'],
            rows: [
              ['Rate of pay and regular payday', 'At hire, and before any change'],
              ['Form MW-400 (employer recordkeeping and reporting obligations)', 'At hire'],
              ['Earned sick leave notice of rights', 'At hire'],
              ['Temporary Disability and Family Leave Insurance notice', 'At hire, on request, and when leave is needed'],
            ],
          },
          {
            type: 'p',
            text: '**New-hire reporting.** Report each new or rehired employee within 20 days of the hire date to the New Jersey New Hire Reporting Center, online, by mail or by fax. See [new-hire reporting](/guides/new-hire-reporting).',
          },
          {
            type: 'p',
            text: "**Criminal history questions.** The Opportunity to Compete Act applies to employers with 15 or more employees over 20 calendar weeks. You cannot ask about criminal records, on an application or out loud, until after the first interview. Exceptions exist, for example when a law requires a background check for the role or the applicant volunteers the information. See [background checks](/guides/employee-background-checks).",
          },
        ],
      },
      {
        heading: 'Leave in New Jersey',
        blocks: [
          {
            type: 'p',
            text: "**Earned sick leave.** Every employer, whatever its size, must give full-time, part-time, seasonal and temporary employees 1 hour of sick leave for every 30 hours worked, up to 40 hours per benefit year. You choose a fixed 12-month benefit year, or you can front-load all 40 hours at the start of it and skip the tracking. Employees can carry over up to 40 hours, but you only have to let them use 40 hours a year. New hires can start using leave on the 120th calendar day of employment. Leave covers the employee's or a family member's illness and care, preventive care, domestic or sexual violence, public health closures, and school meetings the school asks a parent to attend. You do not have to pay out unused sick leave at separation, but if you rehire someone within 6 months, you must restore their balance.",
          },
          {
            type: 'table',
            caption: 'New Jersey state leave insurance, 2026',
            columns: ['Program', 'What it covers', 'Length', 'Pay'],
            rows: [
              ['Temporary Disability Insurance (TDI)', "Employee's own illness, injury, surgery recovery or pregnancy", 'Up to 26 weeks', '85% of average weekly wage, up to $1,119 a week'],
              ['Family Leave Insurance (FLI)', 'Bonding with a new child, caring for a seriously ill family member, domestic or sexual violence', 'Up to 12 weeks in a row, or 56 separate days, in 12 months', '85% of average weekly wage, up to $1,119 a week'],
            ],
          },
          {
            type: 'p',
            text: 'In 2026 employees pay 0.19% (TDI) and 0.23% (FLI) of the first $171,100 in wages. Employers pay 0.10% to 0.75% of the first $44,800 per employee for TDI and nothing for FLI. To qualify in 2026, a worker needs 20 weeks earning at least $310 a week, or $15,500 in total in the base year.',
          },
          {
            type: 'p',
            text: '**Job protection got broader on July 17, 2026.** The New Jersey Family Leave Act (NJFLA) now covers employers with 15 or more employees (counted worldwide) for each working day in 20 or more weeks of this or last calendar year, down from 30. Employees qualify after 3 months and 250 hours worked in the past 12 months. They can take up to 12 weeks in 24 months to bond with a new child or care for a family member with a serious health condition, and generally return to the same job. The same change gave job protection to workers on TDI or FLI benefits who are not already covered by the NJFLA or federal FMLA, with no minimum employer size. See [how to handle an FMLA request](/guides/how-to-handle-an-fmla-request) and [paid family leave by state](/guides/paid-family-leave-states).',
          },
        ],
      },
      {
        heading: 'Final pay and ending employment',
        blocks: [
          {
            type: 'table',
            caption: 'Ending employment in New Jersey',
            columns: ['What', 'Deadline or rule', 'Source'],
            rows: [
              ['Final pay, fired or laid off', 'By the regular payday for the pay period in which employment ended', 'N.J.S.A. 34:11-4.3'],
              ['Final pay, quit', 'Same rule; mail it if the employee asks', 'N.J.S.A. 34:11-4.3'],
              ['Form BC-10, Instructions for Claiming Unemployment Benefits', 'Give to every employee separated for 7 days or more', 'NJ Department of Labor'],
              ['Unused vacation', 'Per your written policy or agreement', 'NJ Department of Labor'],
              ['Unused sick leave', 'No payout required', 'Earned Sick Leave Law'],
            ],
          },
          {
            type: 'p',
            text: "**Layoffs.** New Jersey's WARN law (the Millville Dallas Airmotive Plant Job Loss Notification Act) applies to employers with 100 or more employees, with part-time staff counted since the April 10, 2023 changes. When 50 or more employees at or reporting to an establishment lose their jobs within 30 days, through a mass layoff, closing or transfer, you must give at least 90 days' notice and pay severance of 1 week for each full year of service. If you give less than 90 days' notice, each affected employee gets 4 more weeks of pay. See [WARN Act layoffs](/guides/warn-act-layoffs) and [severance agreements](/guides/severance-agreements).",
          },
          {
            type: 'p',
            text: 'Health coverage: federal COBRA starts at 20 employees. New Jersey adds its own continuation right for small group health plans, which reaches employers with 1 to 50 employees, with the same continuation periods as COBRA and a premium of up to 102%. See [when you need to offer COBRA](/guides/when-do-you-need-to-offer-cobra).',
          },
        ],
      },
      {
        heading: 'Other things to know',
        blocks: [
          {
            type: 'list',
            items: [
              '**Minimum wage:** $15.92 an hour for most employers since January 1, 2026. Seasonal, agricultural and tipped workers have different rates.',
              '**Overtime:** time and a half over 40 hours a week. Salaried employees can be exempt only if they meet the federal Fair Labor Standards Act (FLSA) tests for executive, administrative or professional employees. See [overtime rules](/guides/overtime-rules).',
              '**Paydays:** pay at least twice a month on regular paydays set in advance. Executive and supervisory employees may be paid monthly.',
              '**Discrimination:** the New Jersey Law Against Discrimination covers employers of every size.',
              "**Workers' compensation:** required for every New Jersey employer, from the first employee. See [workers' compensation requirements](/guides/workers-compensation-requirements).",
              '**Posters:** display the state wage and hour, wage payment, earned sick leave and gender equity notices. See [labor law posters](/guides/labor-law-posters).',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Does New Jersey earned sick leave apply to a company with 3 employees?',
        a: 'Yes. The law covers employers of all sizes. Employees earn 1 hour for every 30 hours worked, up to 40 hours a year, and can start using it on their 120th day.',
      },
      {
        q: 'Do employees outside New Jersey count toward the 10-employee pay transparency threshold?',
        a: 'Yes. The state counts all employees, inside and outside New Jersey, as long as the employer does business, employs people or takes applications in New Jersey.',
      },
      {
        q: 'Is family leave job-protected at a small New Jersey company?',
        a: 'Since July 17, 2026, the New Jersey Family Leave Act applies at 15 or more employees. Workers on state Temporary Disability or Family Leave Insurance benefits are also job-protected even when neither the state act nor federal FMLA covers them.',
      },
      {
        q: 'Does a New Jersey layoff require severance?',
        a: 'For covered layoffs, yes. Employers with 100 or more employees must pay 1 week of severance per full year of service when 50 or more employees lose their jobs, plus 4 more weeks if they gave less than 90 days\' notice.',
      },
    ],
    mambahr:
      'MambaHR keeps your New Jersey employee records and hiring pipeline, and posts jobs with pay ranges. Leave requests are approved within your policy, with federal FMLA eligibility checked and New Jersey\'s disability and family leave insurance cited for a person to decide how they combine. When someone leaves, it works out final pay under New Jersey\'s rules for a person to approve, and layoffs are planned with legal checks while people make the decisions.',
    sources: [
      { label: 'NJ DOL: Pay transparency (My Work Rights)', url: 'https://www.nj.gov/labor/myworkrights/wages/pay-transparency/' },
      { label: 'NJ DOL: Pay transparency press release, May 2025', url: 'https://www.nj.gov/labor/lwdhome/press/2025/20250530_Salary_Ranges.shtml' },
      { label: 'NJ DOL: Earned sick leave', url: 'https://www.nj.gov/labor/myworkrights/leave-benefits/sick-leave/' },
      { label: 'NJ DOL: Earned Sick Leave FAQs', url: 'https://www.nj.gov/labor/forms_pdfs/lwdhome/Legal/earnedsickleave.pdf' },
      { label: 'NJ DOL: 2026 benefit rates and minimum wage', url: 'https://www.nj.gov/labor/lwdhome/press/2025/20251229_newbenefitrates2026.shtml' },
      { label: 'NJ DOL: Family Leave Insurance', url: 'https://www.nj.gov/labor/myleavebenefits/worker/fli/' },
      { label: 'NJ DOL: Temporary Disability Insurance', url: 'https://www.nj.gov/labor/myleavebenefits/worker/tdi/' },
      { label: 'NJ DOL: TDI and FLI for employers', url: 'https://www.nj.gov/labor/myleavebenefits/employer/' },
      { label: 'NJ Division on Civil Rights: NJFLA FAQs (July 2026)', url: 'https://www.njoag.gov/wp-content/uploads/2024/02/New-Jersey-Family-Leave-Act-Frequently-Asked-Questions.pdf' },
      { label: 'NJ DOL: Job-protected leave expansion, July 2026', url: 'https://www.nj.gov/labor/lwdhome/press/2026/20260715_moreprotections.shtml' },
      { label: 'NJ DOL: Required posters and notices', url: 'https://www.nj.gov/labor/wageandhour/tools-resources/forms-publications/' },
      { label: 'NJ DOL: Wage and hour selected laws (N.J.S.A. 34:11-4.2, 4.3)', url: 'https://www.nj.gov/labor/wageandhour/tools-resources/laws/selectedstatelaborlaws.shtml' },
      { label: 'NJ DOL: Wages (fringe benefits)', url: 'https://www.nj.gov/labor/myworkrights/wages/wages.shtml' },
      { label: 'NJ DOL: Payment of Wages abstract (MW-17)', url: 'https://nj.gov/labor/wageandhour/assets/PDFs/Forms%20and%20Publications/MW-17_17S%20(4-22).pdf' },
      { label: 'NJ DOL: Employer handbook FAQs (Form BC-10)', url: 'https://www.nj.gov/labor/ea/help/employer_handbook/faqs.shtml' },
      { label: 'N.J.S.A. 34:21-1 and 34:21-2 (WARN)', url: 'https://www.nj.gov/labor/assets/PDFs/WARN/NJ_WARN_ACT_2023law.pdf' },
      { label: 'Business.NJ.gov: WARN law updates', url: 'https://business.nj.gov/updates/important-updates-to-employee-rights-under-new-jersey-warn-law' },
      { label: 'Opportunity to Compete Act (N.J.S.A. 34:6B-11 et seq.)', url: 'https://www.nj.gov/corrections/pdf/OTS/FRARA/OtherResources/Opportunity%20to%20Compete%20Law.PDF' },
      { label: 'NJ Law Against Discrimination (N.J.S.A. 10:5-5)', url: 'https://www.njoag.gov/wp-content/uploads/2024/12/LAD-2024.pdf' },
      { label: 'ACF: State new hire reporting contacts', url: 'https://ocsp.acf.hhs.gov/irg/irgpdf.pdf?geoType=OGP&groupCode=EMP&addrType=NHR&addrClassType=EMP' },
      { label: 'NJ DOL: Employer guide to minimum wage and overtime (MW-91)', url: 'https://www.nj.gov/labor/assets/PDFs/CARE/MW-91%20(1-26)%20NJEmployersGuidetoWHLaws.pdf' },
      { label: "NJ DOL: Workers' compensation employer requirements", url: 'https://www.nj.gov/labor/workerscompensation/employer-requirements/' },
      { label: 'NJ DOBI: Small Employer Health Benefits buyer\'s guide', url: 'https://www.nj.gov/dobi/division_insurance/ihcseh/sehbuyersguide/2019.pdf' },
    ],
    related: [
      '/guides/pay-transparency-job-posts',
      '/guides/final-paycheck-laws',
      '/guides/paid-sick-leave-laws',
      '/guides/paid-family-leave-states',
      '/guides/warn-act-layoffs',
      '/hr-by-state/new-york',
    ],
  },

  // ── Florida ────────────────────────────────────────────────────────────────
  {
    slug: 'florida',
    name: 'Florida',
    abbr: 'FL',
    metaTitle: 'Florida HR Laws for Small Employers (2026) | MambaHR',
    metaDescription:
      'Florida adds few rules to federal law: no state sick leave or pay range law. Report new hires in 20 days, E-Verify at 25+ employees, $15.00 minimum wage.',
    answer:
      'Florida adds few rules to federal law: there is no state paid sick leave, no state family leave program, no pay range rule for job posts and no state deadline for final paychecks. The state rules a small tech company does need are new-hire reporting within 20 days, E-Verify for private employers with 25 or more employees, a $15.00 minimum wage since September 30, 2026, workers\' compensation at 4 or more employees, and the Florida Civil Rights Act at 15 or more.',
    keyFacts: {
      payTransparency:
        'No state law requires it. Roles based in states that do require pay ranges follow those states\' rules.',
      newHireReporting:
        'Within 20 days of the hire date, to the Florida Department of Revenue. Independent contractors paid $600 or more a year are reported within 20 days of their start date or first payment.',
      paidSickLeave:
        'No state law. Florida also bars cities and counties from requiring private employers to provide benefits beyond state and federal law.',
      familyLeave:
        'No state program. Federal FMLA (50 or more employees) is the main job-protected leave. Florida adds up to 3 working days of domestic violence leave at 50 or more employees.',
      finalPayFired:
        'No Florida law sets a deadline, and federal law does not require immediate payment. Pay by the next regular payday.',
      finalPayQuit:
        'Same: no state deadline. Pay by the next regular payday.',
      vacationPayout:
        'No Florida law requires payout. Your written policy or agreement controls, so put the rule in writing.',
    },
    sections: [
      {
        heading: 'Hiring in Florida',
        blocks: [
          {
            type: 'p',
            text: '**New-hire reporting.** Every employer, whatever its size, reports new and rehired employees to the Florida Department of Revenue\'s New Hire Reporting Center within 20 days of the hire date, online, by mail or by fax. Independent contractors paid $600 or more in a calendar year are reported within 20 days of their start date or first payment. See [new-hire reporting](/guides/new-hire-reporting).',
          },
          {
            type: 'p',
            text: '**E-Verify.** Under Florida Statutes section 448.095, private employers with 25 or more employees must use E-Verify for every new employee within 3 business days after the employee starts working for pay, and keep a copy of the documents and the verification for at least 3 years. An employer found out of compliance 3 times in 24 months faces a $1,000 fine for each day until it complies, and its state licenses can be suspended. A 2026 bill to extend E-Verify to all private employers (HB 197) died in the Senate, so the 25-employee line still stands. Every employer, at any size, still completes the federal Form I-9. See [Form I-9 and E-Verify](/guides/form-i-9-and-e-verify).',
          },
          {
            type: 'table',
            caption: 'Florida hiring rules by company size',
            columns: ['Employees', 'What applies'],
            rows: [
              ['1 or more', 'New-hire reporting within 20 days; federal Form I-9'],
              ['4 or more (1 or more in construction)', "Workers' compensation coverage"],
              ['15 or more', 'Florida Civil Rights Act'],
              ['25 or more', 'E-Verify for every new hire'],
              ['50 or more', 'Domestic violence leave (and federal FMLA)'],
            ],
          },
          {
            type: 'p',
            text: 'No Florida law requires a pay range in job posts. If you hire remote employees in states that do, such as New York or New Jersey, those postings follow that state\'s rule. For background checks, the federal rules apply; see [background checks](/guides/employee-background-checks) and [hiring employees in another state](/guides/hiring-employees-in-another-state).',
          },
        ],
      },
      {
        heading: 'Leave in Florida',
        blocks: [
          {
            type: 'p',
            text: 'Florida has no state paid sick leave law and no state paid family leave program. A state law also stops cities and counties from requiring private employers to provide wages or benefits beyond what state or federal law requires, so there are no local sick leave mandates either. Any sick leave or paid time off you offer is set by your own policy, so write it down clearly. See [paid sick leave laws](/guides/paid-sick-leave-laws).',
          },
          {
            type: 'p',
            text: "**Domestic violence leave.** Employers with 50 or more employees must give employees with 3 or more months of service up to 3 working days of leave in any 12-month period when the employee or a family member is a victim of domestic or sexual violence. It can be paid or unpaid, at your discretion, and you can require the employee to use available vacation, personal or sick leave first. Retaliation is not allowed.",
          },
          {
            type: 'p',
            text: 'At 50 or more employees, federal Family and Medical Leave Act (FMLA) leave also applies: up to 12 weeks of unpaid, job-protected leave. See [how to handle an FMLA request](/guides/how-to-handle-an-fmla-request) and [maternity leave at a small business](/guides/maternity-leave-small-business).',
          },
        ],
      },
      {
        heading: 'Final pay and ending employment',
        blocks: [
          {
            type: 'table',
            caption: 'Ending employment in Florida',
            columns: ['What', 'Rule'],
            rows: [
              ['Final pay, fired or laid off', 'No state deadline. Pay by the next regular payday.'],
              ['Final pay, quit', 'No state deadline. Pay by the next regular payday.'],
              ['Unused vacation', 'No state payout law. Follow your written policy.'],
              ['Health coverage, fewer than 20 employees', 'State continuation through the insurance carrier, up to 18 months'],
              ['Health coverage, 20 or more employees', 'Federal COBRA'],
            ],
          },
          {
            type: 'p',
            text: 'Florida has no state rule on how often you must pay, or how fast you must pay at the end, and federal law does not require an immediate final paycheck. Paying on the next regular payday keeps things simple and predictable for everyone. See [final paycheck laws](/guides/final-paycheck-laws).',
          },
          {
            type: 'p',
            text: '**Health coverage for small employers.** The Florida Health Insurance Coverage Continuation Act covers insured group health plans of employers with fewer than 20 employees. After a qualifying event such as a job ending, the insurance carrier sends the election notice within 14 days of being told. Coverage can last 18 months (29 with a qualifying disability) at up to 115% of the premium. Tell your carrier promptly when someone leaves. See [when you need to offer COBRA](/guides/when-do-you-need-to-offer-cobra).',
          },
          {
            type: 'p',
            text: 'For larger layoffs, plan around the federal WARN Act, which applies at 100 or more employees. See [WARN Act layoffs](/guides/warn-act-layoffs).',
          },
        ],
      },
      {
        heading: 'Other things to know',
        blocks: [
          {
            type: 'list',
            items: [
              '**Minimum wage:** $15.00 an hour since September 30, 2026, the last step of the 2020 constitutional amendment (it was $14.00 from September 30, 2025). The $15.00 rate runs through December 31, 2027. After that the rate is adjusted for inflation each year, taking effect each January 1.',
              '**Discrimination:** the Florida Civil Rights Act applies at 15 or more employees and bans discrimination based on race, color, religion, sex, pregnancy, national origin, age, handicap or marital status. Federal laws apply at their own thresholds; see [HR laws by company size](/guides/hr-laws-by-company-size).',
              "**Workers' compensation:** required at 4 or more employees, or at 1 or more in construction. See [workers' compensation requirements](/guides/workers-compensation-requirements).",
              '**Posters:** display the Florida minimum wage poster along with the federal posters. See [labor law posters](/guides/labor-law-posters).',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Does Florida require paid sick leave?',
        a: 'No. Florida has no state paid sick leave law, and state law stops cities and counties from creating their own. Any sick leave you offer follows your own written policy.',
      },
      {
        q: 'Do I need E-Verify in Florida with 10 employees?',
        a: 'Not under Florida law: the mandate starts at 25 employees. You still must complete the federal Form I-9 for every new hire.',
      },
      {
        q: 'When is a final paycheck due in Florida?',
        a: 'Florida has no state deadline for final pay, and federal law does not require immediate payment. Pay it by the next regular payday, whether the employee quit or was let go.',
      },
      {
        q: 'What is the Florida minimum wage now?',
        a: '$15.00 an hour since September 30, 2026. It stays at $15.00 through December 31, 2027, then adjusts for inflation each January 1.',
      },
    ],
    mambahr:
      'MambaHR keeps your Florida employee records and hiring pipeline, and onboarding sends the new-hire forms, starts the Form I-9 and follows up until the paperwork is done. Time off is approved within your own policy, since Florida sets no sick leave rules, and federal FMLA eligibility is checked. When someone leaves, it works out final pay for a person to approve and prepares the COBRA continuation notices.',
    sources: [
      { label: 'Florida DOR: New Hire Reporting Form instructions', url: 'https://servicesforemployers.floridarevenue.com/SiteAssets/docs/New_Hire_Reporting_Form_Instructions.pdf' },
      { label: 'ACF: State new hire reporting contacts', url: 'https://ocsp.acf.hhs.gov/irg/irgpdf.pdf?geoType=OGP&groupCode=EMP&addrType=NHR&addrClassType=EMP' },
      { label: 'Fla. Stat. 448.095 (E-Verify)', url: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0400-0499/0448/Sections/0448.095.html' },
      { label: 'Florida Senate: HB 197 (2026)', url: 'https://flsenate.gov/Session/Bill/2026/197' },
      { label: 'Fla. Stat. 218.077 (local benefit mandates preempted)', url: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0200-0299/0218/Sections/0218.077.html' },
      { label: 'Fla. Stat. 741.313 (domestic violence leave)', url: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0741/Sections/0741.313.html' },
      { label: 'Fla. Stat. 627.6692 (state continuation coverage)', url: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0600-0699/0627/Sections/0627.6692.html' },
      { label: 'FloridaCommerce: Florida Minimum Wage', url: 'https://floridajobs.org/florida-minimum-wage' },
      { label: 'Florida Constitution, Article X, Section 24', url: 'https://www.flsenate.gov/Laws/Constitution' },
      { label: 'Fla. Stat. 760.02 and 760.10 (Florida Civil Rights Act)', url: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0760/Sections/0760.10.html' },
      { label: "Fla. Stat. 440.02 (workers' compensation)", url: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0400-0499/0440/Sections/0440.02.html' },
      { label: 'DOL: Last paycheck', url: 'https://www.dol.gov/general/topic/wages/lastpaycheck' },
      { label: 'DOL: State payday requirements', url: 'https://www.dol.gov/agencies/whd/state/payday' },
    ],
    related: [
      '/guides/form-i-9-and-e-verify',
      '/guides/new-hire-reporting',
      '/guides/final-paycheck-laws',
      '/guides/when-do-you-need-to-offer-cobra',
      '/guides/workers-compensation-requirements',
      '/hr-by-state/georgia',
    ],
  },
]
