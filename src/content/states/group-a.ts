import type { StateGuide } from '../guides/types'

// State pages, group A: California, Texas, Georgia.
// Every fact below was checked against the official source listed in the
// record's `sources` on 2026-10-02. If a rule could not be confirmed on an
// official page, it was left out.

const california: StateGuide = {
  slug: 'california',
  name: 'California',
  abbr: 'CA',
  metaTitle: 'California HR Laws for Small Employers (2026) | MambaHR',
  metaDescription:
    'California HR rules for small employers in 2026: $16.90 minimum wage, 40 hours of paid sick leave, pay ranges in job posts at 15 employees, same-day final pay.',
  answer:
    'California is stricter than federal law for small employers: the 2026 statewide minimum wage is $16.90 an hour, overtime starts after 8 hours in a day, employees get at least 40 hours or 5 days of paid sick leave a year, job posts need a pay scale once you have 15 employees, and a fired employee must be paid in full on the last day. Many California rules, including job-protected family leave, harassment training and fair chance hiring, start at just 5 employees.',
  keyFacts: {
    payTransparency:
      'Employers with 15 or more employees must put a good faith pay scale in every job posting. Any employer must give an applicant the pay scale on reasonable request, and a current employee the pay scale for their own job on request.',
    newHireReporting:
      'Report each new or rehired employee to the Employment Development Department (EDD) within 20 calendar days of their first day of work, on Form DE 34 or through e-Services for Business.',
    paidSickLeave:
      'Employees earn at least 1 hour for every 30 hours worked. You may limit use to 40 hours or 5 days a year and cap the balance at 80 hours or 10 days.',
    familyLeave:
      'Paid Family Leave (PFL) pays up to 8 weeks of benefits through EDD at about 70 to 90 percent of wages. Job protection comes from the California Family Rights Act (CFRA), which covers employers with 5 or more employees.',
    finalPayFired:
      'All wages, including accrued vacation, are due immediately at the time of termination. Late final pay can cost a day of wages for each day it is late, up to 30 days.',
    finalPayQuit:
      'Due within 72 hours of quitting. If the employee gave at least 72 hours of notice, pay is due on their last day.',
    vacationPayout:
      'Earned, unused vacation must be paid out at the final rate of pay. Use-it-or-lose-it policies are illegal, but a reasonable cap on accrual is allowed.',
  },
  sections: [
    {
      heading: 'Hiring in California',
      blocks: [
        {
          type: 'p',
          text: 'Pay transparency. Under Labor Code 432.3, an employer with 15 or more employees must include the pay scale in any job posting, and must give it to any third party that posts the job for you. The pay scale is a good faith estimate of the salary or hourly range you reasonably expect to pay when you hire. Every employer, whatever its size, must give an applicant the pay scale on reasonable request and give a current employee the pay scale for their own position on request. See [pay transparency in job posts](/guides/pay-transparency-job-posts) for how to write a compliant range.',
        },
        {
          type: 'p',
          text: 'Salary history. You may not ask an applicant, yourself or through a recruiter, about their past pay and benefits, and you may not rely on salary history to decide whether to hire someone or what to offer. You must also keep each employee\'s job title and wage rate history for the length of their employment plus three years.',
        },
        {
          type: 'p',
          text: 'Criminal history. The Fair Chance Act applies to employers with 5 or more employees. You cannot ask about conviction history until after a conditional job offer. If you then plan to withdraw the offer because of a conviction, you must do an individual assessment of the offense, the time since it happened and the job, send a written preliminary notice, and give the applicant at least 5 business days to respond before sending a final written decision. Background reports themselves also follow federal rules, covered in [employee background checks](/guides/employee-background-checks).',
        },
        {
          type: 'table',
          caption: 'California hiring and onboarding checklist',
          columns: ['Requirement', 'Who it applies to', 'When'],
          rows: [
            ['Pay scale in job posts', '15 or more employees', 'Every posting'],
            ['Wage notice (Labor Code 2810.5): pay rate, payday, employer details, workers\' comp carrier, sick leave rights', 'Non-exempt employees', 'At hire; changes within 7 calendar days'],
            ['New-hire report to EDD (Form DE 34 or e-Services)', 'All employers', 'Within 20 calendar days of the first day of work'],
            ['Sexual harassment prevention training', '5 or more employees', 'Within 6 months of hire or promotion to supervisor, then every 2 years'],
            ['Annual workplace rights notice', 'All employers', 'By February 1 each year'],
            ['Workers\' compensation insurance', 'All employers, even with 1 employee', 'As soon as you have an employee'],
          ],
        },
        {
          type: 'p',
          text: 'New-hire reporting. Report every new hire and every rehire to EDD within 20 calendar days of the first day they work for pay. Someone counts as a rehire if they were separated from you for at least 60 consecutive days. The penalty is $24 per unreported employee, or $490 if the failure is intentional. The general process is in [new-hire reporting](/guides/new-hire-reporting).',
        },
        {
          type: 'p',
          text: 'Notices and training. Non-exempt employees get a written wage notice at hire in their language. EDD also lists brochures employers must hand out when needed: Disability Insurance (DE 2515), Paid Family Leave (DE 2511) and For Your Benefit (DE 2320). Employers with 5 or more employees must give supervisors at least 2 hours and other employees at least 1 hour of interactive harassment prevention training. Since 2026, every employer must also give employees a workplace rights notice by February 1 each year (the Labor Commissioner publishes a template) and let them name an emergency contact.',
        },
      ],
    },
    {
      heading: 'Pay, overtime and exempt salaries',
      blocks: [
        {
          type: 'p',
          text: 'The statewide minimum wage is $16.90 an hour from January 1, 2026. Some cities and industries set higher rates, and the higher rate wins. Overtime is daily as well as weekly: non-exempt employees earn 1.5 times their regular rate after 8 hours in a workday or 40 hours in a workweek, and double time after 12 hours in a day. On the seventh consecutive day of work in a workweek, the first 8 hours are paid at 1.5 times and anything beyond 8 at double time.',
        },
        {
          type: 'table',
          caption: 'California exempt pay floors for 2026',
          columns: ['Exemption', '2026 minimum', 'Notes'],
          rows: [
            ['Executive, administrative, professional', '$70,304 a year', 'Twice the state minimum wage for full-time work, plus the duties tests'],
            ['Computer software employees (Labor Code 515.5)', '$58.85 an hour, $10,214.44 a month or $122,573.13 a year', 'Adjusted each year; duties test applies and job titles do not decide it'],
          ],
        },
        {
          type: 'p',
          text: 'A common mistake at tech startups is paying an engineer a salary above the federal threshold but below the California floor and treating them as exempt. In California the state floor controls. See [exempt vs non-exempt](/guides/exempt-vs-non-exempt) and [overtime rules](/guides/overtime-rules).',
        },
      ],
    },
    {
      heading: 'Leave in California',
      blocks: [
        {
          type: 'p',
          text: 'Paid sick leave. Employees who work for you in California for at least 30 days in a year are covered. They earn at least 1 hour for every 30 hours worked. You may limit use to 40 hours or 5 days a year (the minimum rose from 24 hours or 3 days on January 1, 2024) and cap total accrual at 80 hours or 10 days. Instead of accrual you can front-load the full amount; for a new hire, 24 hours or 3 days must be available by the 120th day and 40 hours or 5 days by the 200th day. Unused sick leave does not have to be paid out at exit unless your policy says so, but it must be restored if you rehire the person within 12 months.',
        },
        {
          type: 'table',
          caption: 'California leave laws and when they start',
          columns: ['Law', 'Employer size', 'What employees get'],
          rows: [
            ['Paid sick leave', '1 or more', 'At least 40 hours or 5 days of use a year'],
            ['California Family Rights Act (CFRA)', '5 or more', 'Up to 12 weeks of unpaid, job-protected leave after 12 months and 1,250 hours of work'],
            ['Pregnancy Disability Leave', '5 or more', 'Up to 4 months for disability from pregnancy or childbirth, separate from CFRA'],
            ['Bereavement leave', '5 or more', 'Up to 5 days within 3 months of a family member\'s death, after 30 days of employment'],
            ['Paid Family Leave (EDD benefit)', 'State insurance program', 'Up to 8 weeks of partial wage replacement in a 12-month period'],
          ],
        },
        {
          type: 'p',
          text: 'Paid Family Leave is a wage replacement benefit paid by EDD, at about 70 to 90 percent of wages depending on income. Job protection comes from CFRA, which reaches far smaller employers than the federal Family and Medical Leave Act (FMLA). Bereavement leave can be unpaid if you have no paid policy, but employees may use accrued vacation or sick leave. Compare states in [paid family leave states](/guides/paid-family-leave-states) and [paid sick leave laws](/guides/paid-sick-leave-laws).',
        },
      ],
    },
    {
      heading: 'Final pay in California',
      blocks: [
        {
          type: 'table',
          caption: 'California final pay deadlines',
          columns: ['Situation', 'Deadline'],
          rows: [
            ['You fire or lay off the employee', 'Immediately, at the time of termination'],
            ['Employee quits with at least 72 hours of notice', 'On their last day'],
            ['Employee quits without 72 hours of notice', 'Within 72 hours; mailing it at their request counts as paying on the mailing date'],
          ],
        },
        {
          type: 'p',
          text: 'Final pay includes all earned and unused vacation or PTO, paid at the final rate. If you willfully pay late, the employee can claim waiting time penalties of one day of wages for each day the pay is late, up to 30 calendar days. Plan the paycheck before the termination meeting, not after. Step-by-step help is in [firing an employee in California](/guides/firing-an-employee-in-california) and [final paycheck laws](/guides/final-paycheck-laws).',
        },
        {
          type: 'p',
          text: 'When you fire someone, lay them off or put them on leave, you must give them written notice of the change right away. EDD publishes a sample "Notice to Employee as to Change in Relationship". The notice is not required when an employee quits.',
        },
      ],
    },
    {
      heading: 'Other things to know',
      blocks: [
        {
          type: 'list',
          items: [
            'Discrimination: the Fair Employment and Housing Act (FEHA) covers employers with 5 or more employees. Harassment is prohibited in every workplace, even with fewer than 5.',
            'Pay data reports: private employers with 100 or more employees file an annual pay data report with the Civil Rights Department. Reports for 2025 were due May 13, 2026.',
            'Layoffs: the California WARN Act covers an establishment with 75 or more employees in the past 12 months. A layoff of 50 or more within 30 days, a closure or a relocation of at least 100 miles needs 60 days of written notice to employees, EDD, the local workforce board and local officials. See [WARN Act layoffs](/guides/warn-act-layoffs).',
            'Health coverage: Cal-COBRA covers employers with 2 to 19 eligible employees on an insured plan and allows up to 36 months of continuation. See [when do you need to offer COBRA](/guides/when-do-you-need-to-offer-cobra).',
            'Workers\' compensation: required even if you have only one employee.',
            'Posters: the Department of Industrial Relations keeps the list of required workplace postings, including minimum wage, workers\' compensation and whistleblower notices. See [labor law posters](/guides/labor-law-posters).',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: 'Do California employers with fewer than 15 employees have to share pay ranges?',
      a: 'Not in job posts. But every employer must give an applicant the pay scale on reasonable request and a current employee the pay scale for their own job on request.',
    },
    {
      q: 'How much paid sick leave must a California employer give in 2026?',
      a: 'Employees accrue at least 1 hour per 30 hours worked, and you must allow at least 40 hours or 5 days of use a year. You may cap the total balance at 80 hours or 10 days.',
    },
    {
      q: 'When is a final paycheck due in California after a firing?',
      a: 'Immediately, at the time of termination, including accrued vacation. Willful delays can cost a day of wages per day late, up to 30 days.',
    },
    {
      q: 'What is the minimum salary for an exempt employee in California in 2026?',
      a: 'At least $70,304 a year for the executive, administrative and professional exemptions. Computer software employees need at least $58.85 an hour or $122,573.13 a year.',
    },
  ],
  mambahr:
    'MambaHR keeps your California employee records and hiring pipeline and does the admin itself: job posts go out with the pay range, sick leave requests are approved within your policy, and final pay is worked out under California\'s same-day and 72-hour rules for a person to approve. Every hire, raise, leave and exit becomes a payroll change for your current provider or for Deel-managed payroll (Powered by Deel). Terminations and unclear cases always go to a person, and every change is logged.',
  sources: [
    { label: 'California Labor Code 432.3 (pay scale and salary history)', url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=432.3' },
    { label: 'California Labor Code 2810.5 (wage notice at hire)', url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=2810.5' },
    { label: 'California Government Code 12952 (Fair Chance Act)', url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12952' },
    { label: 'California Government Code 12950.1 (harassment training)', url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12950.1' },
    { label: 'California Government Code 12945.7 (bereavement leave)', url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12945.7' },
    { label: 'DIR: Paid sick leave FAQ', url: 'https://www.dir.ca.gov/dlse/paid_sick_leave.htm' },
    { label: 'DIR: Minimum wage FAQ', url: 'https://www.dir.ca.gov/dlse/faq_minimumwage.htm' },
    { label: 'DIR: 2026 minimum wage and exempt salary announcement', url: 'https://www.dir.ca.gov/DIRNews/2025/2025-118.html' },
    { label: 'DIR: Computer software employee exemption rates', url: 'https://dir.ca.gov/oprl/ComputerSoftware.htm' },
    { label: 'DIR: Overtime FAQ', url: 'https://www.dir.ca.gov/dlse/faq_overtime.htm' },
    { label: 'DIR: Final pay FAQ', url: 'https://www.dir.ca.gov/dlse/faq_paydays.htm' },
    { label: 'DIR: Vacation FAQ', url: 'https://www.dir.ca.gov/dlse/faq_vacation.htm' },
    { label: 'DIR: Annual workplace rights notice', url: 'https://www.dir.ca.gov/DIRNews/2026/2026-14.html' },
    { label: 'DIR: Workplace postings', url: 'https://www.dir.ca.gov/wpnodb.html' },
    { label: 'DIR: Workers\' compensation for employers', url: 'https://www.dir.ca.gov/dwc/Employer.htm' },
    { label: 'EDD: New hire reporting', url: 'https://edd.ca.gov/en/payroll_taxes/new_hire_reporting/' },
    { label: 'EDD: Required notices and pamphlets', url: 'https://edd.ca.gov/en/payroll_taxes/required_notices_and_pamphlets/' },
    { label: 'EDD: Paid Family Leave benefit amounts', url: 'https://edd.ca.gov/en/disability/Calculating_PFL_Benefit_Payment_Amounts/' },
    { label: 'EDD: Layoff services and WARN', url: 'https://edd.ca.gov/en/jobs_and_training/Layoff_Services_WARN/' },
    { label: 'Civil Rights Department: Family, medical and pregnancy leave', url: 'https://calcivilrights.ca.gov/family-medical-pregnancy-leave/' },
    { label: 'Civil Rights Department: Employment', url: 'https://calcivilrights.ca.gov/employment/' },
    { label: 'Civil Rights Department: Pay data reporting', url: 'https://calcivilrights.ca.gov/paydatareporting/' },
    { label: 'California Health and Safety Code 1366.21 (Cal-COBRA employers)', url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=HSC&sectionNum=1366.21' },
    { label: 'California Health and Safety Code 1366.27 (Cal-COBRA duration)', url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=HSC&sectionNum=1366.27' },
  ],
  related: [
    '/guides/firing-an-employee-in-california',
    '/guides/final-paycheck-laws',
    '/guides/paid-sick-leave-laws',
    '/guides/pay-transparency-job-posts',
    '/guides/exempt-vs-non-exempt',
    '/hr-by-state',
  ],
}

const texas: StateGuide = {
  slug: 'texas',
  name: 'Texas',
  abbr: 'TX',
  metaTitle: 'Texas HR Laws for Small Employers (2026) | MambaHR',
  metaDescription:
    'Texas rules for small employers: final pay by day 6 after firing, $7.25 minimum wage, no state sick leave law, optional workers\' comp, 20-day new-hire reports.',
  answer:
    'Texas mostly follows federal law: the minimum wage is the federal $7.25 an hour, there is no state paid sick leave or pay transparency law, and workers\' compensation insurance is optional for most private employers. The rules that are specific to Texas are final pay by the sixth day after a firing (next regular payday after a quit), new-hire reports within 20 days that include independent contractors, and written notices about workers\' comp coverage and unemployment benefits.',
  keyFacts: {
    payTransparency: 'No Texas law requires pay ranges in job posts.',
    newHireReporting:
      'Report new hires and rehires to the Attorney General\'s Child Support Division within 20 calendar days of the day they start earning wages. Texas law also makes independent contractors reportable.',
    paidSickLeave:
      'No Texas law requires paid or unpaid sick leave. If your written policy promises it, the Texas Payday Law enforces that promise.',
    familyLeave:
      'Texas has no state paid family or medical leave program. Leave rights come from federal law, such as the Family and Medical Leave Act (FMLA), if you are covered.',
    finalPayFired: 'Pay in full no later than the sixth calendar day after the discharge.',
    finalPayQuit: 'Pay in full no later than the next regularly scheduled payday.',
    vacationPayout:
      'Owed only if your written policy or agreement promises it. No Texas law requires paying out unused vacation.',
  },
  sections: [
    {
      heading: 'Hiring in Texas',
      blocks: [
        {
          type: 'p',
          text: 'Texas has no pay transparency law, so pay ranges in job posts are your choice. If you hire remote employees in other states, their state\'s posting rules can still apply; see [hiring employees in another state](/guides/hiring-employees-in-another-state).',
        },
        {
          type: 'p',
          text: 'New-hire reporting. Report every new hire and rehire within 20 calendar days from the date they start earning wages. The Child Support Division of the Office of the Attorney General runs the program and takes reports through its online employer portal. A good rule of thumb from the Attorney General: if the person fills out a Form W-4, report them. Texas goes further than most states, because the Family Code\'s definition of a reportable employee includes independent contractors as defined by the IRS. The civil penalty is up to $25 for each employee not reported, or up to $500 when the employer and employee agree not to report. More in [new-hire reporting](/guides/new-hire-reporting).',
        },
        {
          type: 'table',
          caption: 'Texas onboarding checklist',
          columns: ['Requirement', 'Source', 'When'],
          rows: [
            ['New-hire report, including independent contractors', 'Texas Family Code chapter 234', 'Within 20 calendar days of starting work'],
            ['Tell the new employee whether you carry workers\' comp insurance', 'Texas Labor Code 406.005', 'At the time of hire'],
            ['Post notices showing your paydays', 'Texas Labor Code 61.012', 'Keep posted in the workplace'],
            ['Form I-9; E-Verify is optional for private employers', 'Federal law; Texas Workforce Commission (TWC) guidance', 'At hire'],
          ],
        },
        {
          type: 'p',
          text: 'E-Verify. The Texas Workforce Commission describes E-Verify as an optional program for private employers. Form I-9 is still required for every hire; see [Form I-9 and E-Verify](/guides/form-i-9-and-e-verify). Background checks follow the federal rules in [employee background checks](/guides/employee-background-checks).',
        },
      ],
    },
    {
      heading: 'Pay and paydays',
      blocks: [
        {
          type: 'p',
          text: 'The Texas Minimum Wage Act adopts the federal minimum wage by reference, so the rate is $7.25 an hour. Overtime follows the federal Fair Labor Standards Act (FLSA); see [overtime rules](/guides/overtime-rules).',
        },
        {
          type: 'p',
          text: 'The Texas Payday Law sets how often you pay. Employees who are exempt from FLSA overtime must be paid at least once a month. Everyone else must be paid at least twice a month, with pay periods as equal in length as possible. If you never designate paydays, the law treats the 1st and the 15th of each month as your paydays. You must post notices of your paydays in a place employees can see them. If an employee misses a payday, for example because they were out, pay them on another regular business day when they ask.',
        },
        {
          type: 'p',
          text: 'Direct deposit and pay cards. If you switch to direct deposit, the Payday Law requires written notice to each affected employee at least 60 days before the first deposit. If you pay through payroll cards, you must give notice, a list of all card fees and a form to opt out, either 60 days before the first transfer or, for later hires, by their first day of work. An employee who opts out must get another form of payment no later than the first payday after the 30th day following the request.',
        },
      ],
    },
    {
      heading: 'Leave in Texas',
      blocks: [
        {
          type: 'p',
          text: 'No Texas or federal law requires a private employer to provide paid vacation or paid sick leave. Unpaid leave can still be required in some cases, for example as a reasonable accommodation for a disability or pregnancy, and federal FMLA applies if you are covered. See [how to handle an FMLA request](/guides/how-to-handle-an-fmla-request).',
        },
        {
          type: 'p',
          text: 'What Texas does enforce is your own written policy. Vacation, holiday, sick, parental and severance pay owed under a written agreement or policy count as wages under the Payday Law. So write down how leave accrues, whether there is a cap, and what happens to unused leave at exit. If the policy is silent about payout, TWC will not enforce a payout.',
        },
      ],
    },
    {
      heading: 'Final pay in Texas',
      blocks: [
        {
          type: 'table',
          caption: 'Texas final pay deadlines (Texas Labor Code 61.014)',
          columns: ['Situation', 'Deadline'],
          rows: [
            ['Discharge, including a layoff', 'No later than the sixth calendar day after the discharge'],
            ['Employee quits or retires', 'No later than the next regularly scheduled payday'],
            ['Commissions and bonuses', 'As set by the written agreement, paid in a timely manner'],
            ['Unused vacation or PTO', 'Only if your written policy or agreement promises it'],
          ],
        },
        {
          type: 'p',
          text: 'Severance is owed only if a written policy or agreement promises it. An employee who is not paid can file a wage claim with TWC within 180 days of the date the wages were due. If TWC finds the employer acted in bad faith, it can add a penalty of up to the amount of the wages or $1,000, whichever is less.',
        },
        {
          type: 'p',
          text: 'Texas does not require a termination letter, though a short written notice of the separation date helps avoid later disputes. You must give every departing employee notice of their right to file an unemployment claim; TWC\'s required unemployment poster includes a sample. See [firing an employee in Texas](/guides/firing-an-employee-in-texas) and [final paycheck laws](/guides/final-paycheck-laws).',
        },
      ],
    },
    {
      heading: 'Other things to know',
      blocks: [
        {
          type: 'list',
          items: [
            'Workers\' compensation is optional for most private employers. If you choose not to carry it (a "nonsubscriber"), you must tell the Texas Division of Workers\' Compensation in writing, tell each new employee at hire, post a notice at work, and report injuries with more than one day of lost time, work-related illnesses and deaths. If you start or cancel coverage, tell employees within 15 days. See [workers\' compensation requirements](/guides/workers-compensation-requirements).',
            'Discrimination: Texas Labor Code chapter 21 covers employers with 15 or more employees. Its sexual harassment rules apply to employers with 1 or more employee.',
            'Layoffs: Texas law does not require written notice of a termination or layoff. The federal WARN Act can apply to employers with 100 or more employees, and TWC is the state agency that receives WARN notices. See [WARN Act layoffs](/guides/warn-act-layoffs).',
            'Health coverage: on insured group plans, Texas continuation law lets an employee who is not eligible for federal COBRA keep coverage for up to 9 months, and an employee who used federal COBRA continue for 6 more months. The employee must have been covered for 3 consecutive months and must ask in writing within 60 days.',
            'Unemployment tax: a for-profit employer becomes liable once it pays $1,500 in wages in a calendar quarter or has an employee in 20 different weeks of a year.',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: 'How long do I have to give a fired employee their final paycheck in Texas?',
      a: 'Until the sixth calendar day after the discharge. An employee who quits must be paid by the next regularly scheduled payday.',
    },
    {
      q: 'Do Texas employers have to pay out unused vacation?',
      a: 'Only if your written policy or agreement says so. Texas law does not require a payout, but it enforces whatever your written policy promises.',
    },
    {
      q: 'Is workers\' comp required in Texas?',
      a: 'Not for most private employers. If you opt out, you must notify the state and your employees, post a notice, and report serious injuries.',
    },
    {
      q: 'Do I report independent contractors as new hires in Texas?',
      a: 'Yes. The Texas Family Code includes independent contractors as defined by the IRS in its definition of reportable employees, alongside regular new hires and rehires.',
    },
  ],
  mambahr:
    'MambaHR keeps your Texas employee records and hiring pipeline and does the admin itself: new-hire paperwork is sent and followed up, time off is approved within your written policy, and final pay is worked out under the Payday Law deadlines for a person to approve. Every hire, raise, leave and exit becomes a payroll change for your current provider or for Deel-managed payroll (Powered by Deel). Terminations always go to a person, and every change is logged.',
  sources: [
    { label: 'Texas Labor Code chapter 61 (Payday Law)', url: 'https://statutes.capitol.texas.gov/Docs/LA/htm/LA.61.htm' },
    { label: 'Texas Labor Code chapter 62 (minimum wage)', url: 'https://statutes.capitol.texas.gov/Docs/LA/htm/LA.62.htm' },
    { label: 'Texas Labor Code chapter 21 (employment discrimination)', url: 'https://statutes.capitol.texas.gov/Docs/LA/htm/LA.21.htm' },
    { label: 'Texas Labor Code chapter 406 (workers\' compensation coverage)', url: 'https://statutes.capitol.texas.gov/Docs/LA/htm/LA.406.htm' },
    { label: 'Texas Family Code chapter 234 (new hire directory)', url: 'https://statutes.capitol.texas.gov/Docs/FA/htm/FA.234.htm' },
    { label: 'Texas Insurance Code chapter 1251 (continuation of group coverage)', url: 'https://statutes.capitol.texas.gov/Docs/IN/htm/IN.1251.htm' },
    { label: 'Texas Attorney General: New hire reporting', url: 'https://texasattorneygeneral.gov/child-support/employers/new-hire-reporting' },
    { label: 'TDI: Workers\' compensation for employers', url: 'https://www.tdi.texas.gov/wc/employer/index.html' },
    { label: 'TWC: Final pay and severance', url: 'https://efte.twc.texas.gov/final_pay_severance_benefits.html' },
    { label: 'TWC: Vacation and sick leave', url: 'https://efte.twc.texas.gov/vacation_and_sick_leave.html' },
    { label: 'TWC: Exit interviews and notice of discharge', url: 'https://efte.twc.texas.gov/exit_interviews_notice_of_discharge.html' },
    { label: 'TWC: Work separations', url: 'https://efte.twc.texas.gov/work_separations_general.html' },
    { label: 'TWC: Special problems in work separations (WARN)', url: 'https://efte.twc.texas.gov/special_problems_work_separations.html' },
    { label: 'TWC: Thresholds for coverage under employment laws', url: 'https://efte.twc.texas.gov/thresholds_for_coverage.html' },
    { label: 'TWC: I-9 procedures', url: 'https://efte.twc.texas.gov/i_9_procedures.html' },
    { label: 'DOL: State minimum wage laws', url: 'https://www.dol.gov/agencies/whd/minimum-wage/state' },
  ],
  related: [
    '/guides/firing-an-employee-in-texas',
    '/guides/final-paycheck-laws',
    '/guides/workers-compensation-requirements',
    '/guides/new-hire-reporting',
    '/guides/unused-pto-payout',
    '/hr-by-state',
  ],
}

const georgia: StateGuide = {
  slug: 'georgia',
  name: 'Georgia',
  abbr: 'GA',
  metaTitle: 'Georgia HR Laws for Small Employers (2026) | MambaHR',
  metaDescription:
    'Georgia rules for small employers: a DOL-800 Separation Notice at each exit, E-Verify above 10 employees, workers\' comp at 3, no sick leave or final pay law.',
  answer:
    'Georgia adds few rules on top of federal law for small employers: it has no state paid sick leave law, no pay transparency law and no final paycheck deadline for private employers. What Georgia does require is a Separation Notice (Form DOL-800) for every employee who leaves, E-Verify for private employers with more than 10 employees, workers\' compensation insurance once you regularly employ 3 or more people, and new-hire reports for every hire and rehire.',
  keyFacts: {
    payTransparency: 'No Georgia law requires pay ranges in job posts.',
    newHireReporting:
      'Report every new hire and rehire to the Georgia New Hire Reporting Program within 10 days of the hire date, under O.C.G.A. 19-11-9.2. No employer is exempt.',
    paidSickLeave:
      'No Georgia law requires paid sick leave. Employers with 25 or more employees that do offer sick leave must let employees who work 30 or more hours a week use up to 5 days a year of it to care for immediate family.',
    familyLeave:
      'Georgia has no state paid family or medical leave program for private employers. Leave rights come from federal law, such as the Family and Medical Leave Act (FMLA), if you are covered.',
    finalPayFired:
      'No Georgia statute sets a final paycheck deadline for private employers. Paying on the next regular payday is the safe default.',
    finalPayQuit:
      'No Georgia statute sets a deadline. Pay on the next regular payday, and give the employee a Separation Notice (DOL-800) on their last day.',
    vacationPayout:
      'No Georgia statute requires paying out unused vacation. Your written policy or agreement controls.',
  },
  sections: [
    {
      heading: 'Hiring in Georgia',
      blocks: [
        {
          type: 'p',
          text: 'Georgia has no pay transparency law, so pay ranges in job posts are your choice unless you hire in a state that requires them. Background checks follow the federal rules in [employee background checks](/guides/employee-background-checks).',
        },
        {
          type: 'p',
          text: 'E-Verify. Under O.C.G.A. 36-60-6, a private employer with more than 10 employees must register with and use E-Verify. You prove it when you apply for or renew a city or county business license or occupational tax certificate, by signing an affidavit with your E-Verify user number. Employers with 10 or fewer employees sign the same affidavit stating they are exempt. Count employees as of January 1, company-wide in every location, including only those who work at least 35 hours a week. See [Form I-9 and E-Verify](/guides/form-i-9-and-e-verify).',
        },
        {
          type: 'p',
          text: 'New-hire reporting. Georgia law (O.C.G.A. 19-11-9.2) and federal law require every Georgia employer to report all new hires, including rehires, to the Georgia New Hire Reporting Program. No employer is exempt. Report within 10 days of the hire date, which is sooner than the 20-day federal baseline; the general process is in [new-hire reporting](/guides/new-hire-reporting).',
        },
        {
          type: 'table',
          caption: 'Georgia onboarding checklist',
          columns: ['Requirement', 'Who it applies to', 'When'],
          rows: [
            ['New-hire report', 'All employers', 'Within 10 days of the hire date'],
            ['E-Verify, plus the affidavit with your business license', 'Private employers with more than 10 full-time employees', 'For each new hire; affidavit at license application or renewal'],
            ['Unemployment tax account (Form DOL-1A)', 'Employers with workers in Georgia', 'Right after your first Georgia payroll'],
            ['Workers\' compensation insurance and posted panel of physicians', '3 or more regular employees, including part-time', 'Once you regularly employ 3 or more people'],
          ],
        },
        {
          type: 'p',
          text: 'Unemployment tax. You generally owe Georgia unemployment tax once you pay $1,500 in a calendar quarter or have at least one worker in 20 different weeks of a year. Register with the Georgia Department of Labor (GDOL) on Form DOL-1A right after your first Georgia payroll. New employers pay a 2.70 percent rate on the first $9,500 of each employee\'s wages. Since GDOL\'s 2026 rule update, if a new hire has not yet given you a Social Security number, you can file the quarterly wage report on time with a placeholder number and correct it, generally within 30 days of getting the real number.',
        },
      ],
    },
    {
      heading: 'Pay in Georgia',
      blocks: [
        {
          type: 'p',
          text: 'Georgia\'s own minimum wage is $5.15 an hour and applies only to employers of 6 or more employees who are not covered by the federal Fair Labor Standards Act (FLSA). Employers covered by the FLSA, which includes most businesses, must pay the federal minimum of $7.25 an hour. For overtime and exempt status, see [overtime rules](/guides/overtime-rules) and [exempt vs non-exempt](/guides/exempt-vs-non-exempt).',
        },
      ],
    },
    {
      heading: 'Leave in Georgia',
      blocks: [
        {
          type: 'p',
          text: 'Georgia does not require employers to offer paid sick leave or vacation. It does have one rule about sick leave you already offer, often called the kin care law (O.C.G.A. 34-1-10).',
        },
        {
          type: 'list',
          items: [
            'It applies to employers with 25 or more employees, and to employees who work at least 30 hours a week.',
            'If you provide sick leave, employees may use up to 5 days of earned sick leave per calendar year to care for an immediate family member: a child, spouse, grandchild, grandparent, parent, or a dependent listed on their latest tax return.',
            'Employees can only use leave they have already earned, and they must follow your sick leave policy.',
            'It does not apply to employers that offer an employee stock ownership plan (ESOP).',
            'The law originally had an expiration date. Georgia repealed that sunset in 2023, so the rule is permanent.',
          ],
        },
        {
          type: 'p',
          text: 'Job-protected leave in Georgia comes from federal law. See [how to handle an FMLA request](/guides/how-to-handle-an-fmla-request) and [paid sick leave laws](/guides/paid-sick-leave-laws) for how Georgia compares with other states.',
        },
      ],
    },
    {
      heading: 'Final pay and separations in Georgia',
      blocks: [
        {
          type: 'p',
          text: 'Georgia has no statute that sets a deadline for a private employer\'s final paycheck, whether you end the job or the employee quits. Federal law does not require immediate payment either. Paying everything owed on the next regular payday is the safe default. Unused vacation is owed only if your written policy or agreement promises it. See [final paycheck laws](/guides/final-paycheck-laws) and [unused PTO payout](/guides/unused-pto-payout).',
        },
        {
          type: 'p',
          text: 'The rule Georgia employers most often miss is the Separation Notice. Under O.C.G.A. 34-8-190(c), you must complete Form DOL-800 for every worker who leaves, no matter the reason, including quits. Give it to the employee on their last day of work. If they are not available, make sure they receive it within three days. GDOL now encourages electronic delivery, though a signed paper copy still works.',
        },
        {
          type: 'table',
          caption: 'What goes on the DOL-800 Separation Notice',
          columns: ['Item', 'What to enter'],
          rows: [
            ['Reason for separation', 'Check "lack of work", or explain the circumstances fully and clearly'],
            ['Payments beyond the last day', 'Severance, pay in lieu of notice, bonuses and similar, with amounts and dates. Do not include vacation pay or earned wages'],
            ['Earnings', 'Whether the employee earned at least $9,490 with you, and their average weekly wage'],
            ['Employer details', 'Your GDOL account number, mailing address and a signature'],
          ],
        },
        {
          type: 'p',
          text: 'Keep a copy, because you can attach it if GDOL later asks about the separation. For a group layoff, GDOL uses a separate mass separation notice (DOL-402) instead of individual DOL-800 forms. For the full offboarding sequence, see the [employee offboarding checklist](/guides/employee-offboarding-checklist) and [how to fire an employee](/guides/how-to-fire-an-employee).',
        },
      ],
    },
    {
      heading: 'Other things to know',
      blocks: [
        {
          type: 'list',
          items: [
            'Workers\' compensation: required once you regularly employ 3 or more people, counting regular part-time employees. In a corporation or LLC, officers or members count toward the 3. See [workers\' compensation requirements](/guides/workers-compensation-requirements).',
            'Panel of physicians: covered employers must post information identifying medical providers, for example a panel of at least six doctors. Employees who wait more than 30 days to report a work injury may lose benefits, so tell them to report right away.',
            'Posters: GDOL\'s 2026 rule update keeps physical posters at traditional worksites and allows electronic options, or giving the information directly to employees, for remote and hybrid teams where permitted. See [labor law posters](/guides/labor-law-posters).',
            'Layoffs: plan larger reductions with the federal rules in [WARN Act layoffs](/guides/warn-act-layoffs), and use GDOL\'s mass separation notice for group separations.',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: 'Is there a final paycheck deadline in Georgia?',
      a: 'No Georgia statute sets one for private employers, whether the employee is fired or quits. Paying on the next regular payday is the safe default.',
    },
    {
      q: 'Do I have to give a Separation Notice when an employee quits in Georgia?',
      a: 'Yes. Georgia requires a completed Separation Notice (DOL-800) for every worker who leaves, whatever the reason, delivered on the last day or within three days if they are not available.',
    },
    {
      q: 'Do Georgia employers have to use E-Verify?',
      a: 'Private employers with more than 10 employees (counted company-wide, 35 or more hours a week, as of January 1) must use E-Verify and attest to it when they apply for or renew a business license.',
    },
    {
      q: 'Does Georgia require paid sick leave?',
      a: 'No. But employers with 25 or more employees that offer sick leave must let employees who work 30 or more hours a week use up to 5 days a year of earned sick leave to care for immediate family.',
    },
    {
      q: 'When do I need workers\' comp in Georgia?',
      a: 'Once you regularly employ 3 or more people, including regular part-time employees and, for corporations and LLCs, officers or members.',
    },
  ],
  mambahr:
    'MambaHR keeps your Georgia employee records and hiring pipeline and does the admin itself: onboarding forms go out and get followed up, the Form I-9 is started, and at offboarding it removes access, works out final pay for a person to approve and drafts the separation paperwork. Every hire, raise, leave and exit becomes a payroll change for your current provider or for Deel-managed payroll (Powered by Deel). Terminations always go to a person, and every change is logged.',
  sources: [
    { label: 'GDOL: Employer FAQs, laws and regulations (new hire reporting)', url: 'https://dol.georgia.gov/faqs-employers/employers-faqs-laws-and-regulations' },
    { label: 'HHS Office of Child Support Services: State new hire reporting contacts and deadlines', url: 'https://ocsp.acf.hhs.gov/irg/irgpdf.pdf?geoType=OGP&groupCode=EMP&addrType=NHR&addrClassType=EMP' },
    { label: 'GDOL: Employer FAQs, unemployment insurance', url: 'https://dol.georgia.gov/faqs-employers/employers-faqs-unemployment-insurance' },
    { label: 'GDOL: Updated rules for employers (August 2026)', url: 'https://dol.georgia.gov/blog-post/2026-08-12/employers-updated-rules-simplify-doing-business-gdol' },
    { label: 'GDOL: Separation Notice, Form DOL-800', url: 'https://dol.georgia.gov/document/separation-notices/separation-notice-individual-dol-800/download' },
    { label: 'Georgia Attorney General: Private employer E-Verify affidavit (O.C.G.A. 36-60-6(d))', url: 'https://law.georgia.gov/document/publication/private-employer-affidavit-pursuant-ocga-ss-36-60-6d/download' },
    { label: 'Georgia General Assembly: SB 201 (2017), sick leave for immediate family', url: 'https://www.legis.ga.gov/api/legislation/document/20172018/170794' },
    { label: 'Georgia General Assembly: SB 61 (2023), repeal of the sunset', url: 'https://www.legis.ga.gov/api/legislation/document/20232024/215469' },
    { label: 'Georgia House Budget and Research Office: 2023 session report', url: 'https://www.legis.ga.gov/api/document/docs/default-source/house-budget-and-research-office-document-library/session-reports/2023-end-of-session-report-by-committee-with-vetoes.pdf?sfvrsn=e535a11_2' },
    { label: 'State Board of Workers\' Compensation: Insurance FAQs', url: 'https://sbwc.georgia.gov/frequently-asked-questions/workers-compensation-insurance-faqs' },
    { label: 'State Board of Workers\' Compensation: Law FAQs', url: 'https://sbwc.georgia.gov/frequently-asked-questions/workers-compensation-law-faqs' },
    { label: 'DOL: State minimum wage laws', url: 'https://www.dol.gov/agencies/whd/minimum-wage/state' },
    { label: 'DOL: Last paycheck', url: 'https://www.dol.gov/general/topic/wages/lastpaycheck' },
  ],
  related: [
    '/guides/final-paycheck-laws',
    '/guides/form-i-9-and-e-verify',
    '/guides/new-hire-reporting',
    '/guides/workers-compensation-requirements',
    '/guides/paid-sick-leave-laws',
    '/hr-by-state',
  ],
}

export const statesGroupA: StateGuide[] = [california, texas, georgia]
