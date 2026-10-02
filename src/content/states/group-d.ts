import type { StateGuide } from '../guides/types'

// State pages: Massachusetts and Illinois.
// Every fact below was checked against the official source listed in the
// record's `sources`. Details that could not be confirmed were left out.

export const statesGroupD: StateGuide[] = [
  {
    slug: 'massachusetts',
    name: 'Massachusetts',
    abbr: 'MA',
    metaTitle: 'Massachusetts HR Laws for Small Employers (2026) | MambaHR',
    metaDescription:
      'Massachusetts employers pay fired workers on their last day, owe earned vacation, offer 40 hours of sick time and post pay ranges at 25 or more employees.',
    answer:
      'Massachusetts goes well beyond federal law for small employers: every employer must offer up to 40 hours a year of earned sick time (paid at 11 or more employees), send in Paid Family and Medical Leave (PFML) contributions, and pay a fired employee in full on the day of discharge, earned vacation included. Employers with 25 or more employees in Massachusetts must put a pay range in every job posting.',
    keyFacts: {
      payTransparency:
        'Required at 25 or more employees in Massachusetts since October 29, 2025. The posting must show the annual salary or hourly wage range you reasonably and in good faith expect to pay.',
      newHireReporting:
        'Report every new hire to the Department of Revenue (DOR) within 14 days of the start date. This applies to all employers, whatever their size.',
      paidSickLeave:
        'Employees earn at least 1 hour for every 30 hours worked, up to 40 hours a year. The time must be paid at 11 or more employees and can be unpaid below that.',
      familyLeave:
        'State PFML program: up to 12 weeks of family leave, 20 weeks of medical leave, 26 weeks combined per benefit year. The 2026 contribution is 0.88% of eligible wages (0.46% with fewer than 25 covered individuals).',
      finalPayFired: 'In full on the day of discharge, including earned vacation.',
      finalPayQuit:
        'In full on the next regular payday, or the following Saturday if there is no regular payday.',
      vacationPayout:
        'Required. Vacation promised under an oral or written agreement counts as wages and goes in the final paycheck. Unused earned sick time does not have to be paid out.',
    },
    sections: [
      {
        heading: 'Hiring in Massachusetts',
        blocks: [
          {
            type: 'p',
            text: 'Pay ranges in job posts. Under the Wage Transparency Act (Chapter 141 of the Acts of 2024), an employer with 25 or more employees in Massachusetts must disclose the pay range in the posting for any position, including posts placed for you by a recruiter or job board. The pay range is the annual salary range or hourly wage range you reasonably and in good faith expect to pay for the job at that time. The same employers must give the range to an employee offered a promotion or transfer to a role with different duties, and to an employee or applicant who asks. Retaliating against someone who asks is illegal. See our guide to [pay transparency in job posts](/guides/pay-transparency-job-posts).',
          },
          {
            type: 'p',
            text: 'The Attorney General enforces the law. A first offense gets a warning, a second a fine of up to $500, and a third a fine of up to $1,000. Until October 29, 2027, a covered employer has 2 business days to fix a problem after receiving a notice to cure.',
          },
          {
            type: 'p',
            text: 'Pay data reports. Employers with 100 or more employees in Massachusetts at any time in the prior calendar year that file an EEO-1 report with the federal Equal Employment Opportunity Commission (EEOC) must also file a copy with the Secretary of the Commonwealth by February 1 each year. It is the same report you already send the EEOC.',
          },
          {
            type: 'list',
            items: [
              'Salary history: you may not ask about an applicant\'s wage or salary history until after you make an offer of employment that includes compensation.',
              'Criminal records: you may not ask for criminal record information on your initial written application form, except in very limited cases.',
              'New-hire reporting: report each new hire to DOR within 14 days of the start date, and anyone returning after 30 or more days off the payroll. Independent contractors paid $600 or more in a year are reported too. The penalty is up to $25 for each person not reported. See [new-hire reporting](/guides/new-hire-reporting).',
              'Notices at hire: post the Earned Sick Time notice and either hand each worker a copy or put your sick time policy in the handbook. Display the PFML workplace poster and give employees the written PFML notice for your workforce size. Employers with 6 or more employees give each new hire a written copy of the sexual harassment policy.',
            ],
          },
          {
            type: 'p',
            text: 'Non-competes. The Massachusetts Noncompetition Agreement Act (M.G.L. c. 149, s. 24L) sets strict conditions that matter for tech hiring. Agreements about non-solicitation, confidentiality and invention assignment are not covered by these limits.',
          },
          {
            type: 'table',
            caption: 'Massachusetts non-compete basics',
            columns: ['Rule', 'What the law says'],
            rows: [
              ['Timing at hire', 'In writing, signed by both sides, stating the right to consult a lawyer, and given by the earlier of the formal offer or 10 business days before the start date.'],
              ['Length', 'No more than 12 months after employment ends (up to 2 years only after a breach of fiduciary duty or taking company property).'],
              ['Payment', 'A garden leave clause paying at least 50% of the highest annualized base salary from the last 2 years, or other agreed consideration stated in the agreement.'],
              ['Who is protected', 'Cannot be enforced against non-exempt employees, student interns, anyone 18 or younger, or anyone laid off or fired without cause.'],
            ],
          },
        ],
      },
      {
        heading: 'Leave in Massachusetts',
        blocks: [
          {
            type: 'p',
            text: 'Earned sick time. Most workers earn at least 1 hour of sick time for every 30 hours worked, up to 40 hours a year. Employers with 11 or more employees must pay for it. They can use it for their own illness, injury or medical appointment, for a child, spouse, parent or spouse\'s parent, to deal with domestic violence, and since November 21, 2024, for pregnancy loss or a failed assisted reproduction, adoption or surrogacy. Up to 40 unused hours carry over, but an employee can use no more than 40 hours in a calendar year. You may ask for a doctor\'s note only in limited cases, such as an absence of more than 3 consecutive workdays. A PTO policy can replace sick time if it gives the same benefits and protections or better. See [paid sick leave laws](/guides/paid-sick-leave-laws).',
          },
          {
            type: 'p',
            text: 'Paid Family and Medical Leave. The state program, run by the Department of Family and Medical Leave (DFML), covers most employees. Each benefit year an eligible employee can take up to 20 weeks of paid medical leave, 12 weeks of paid family leave (to bond with a new child or care for a family member), and 26 weeks in total. Employees should give 30 days\' notice when they can. In 2026 the maximum weekly benefit is $1,230.39. Employees may top up the state benefit with accrued PTO, as long as the total does not exceed their average weekly wage.',
          },
          {
            type: 'table',
            caption: 'PFML contributions for 2025 and 2026 (share of eligible wages)',
            columns: ['Covered individuals', 'Total sent to DFML', 'May be withheld from employees', 'Employer must pay'],
            rows: [
              ['25 or more', '0.88%', 'Up to 0.46% (0.18% family plus 0.28% medical)', 'At least 0.42%'],
              ['Fewer than 25', '0.46%', 'All of it', 'Nothing, unless you choose to'],
            ],
          },
          {
            type: 'p',
            text: 'Contributions are capped at the Social Security taxable maximum. Rates are set each year, and from January 1, 2027, Chapter 101 of the Acts of 2026 moves the employer share from the medical leave contribution to the family leave contribution. Check the DFML rate page before your first 2027 payroll. More in [paid family leave states](/guides/paid-family-leave-states).',
          },
          {
            type: 'p',
            text: 'Parental leave. The Massachusetts Parental Leave Act applies to employers with 6 or more employees. After 3 months of full-time work (or a probation period of up to 3 months), an employee can take 8 weeks of leave for the birth or adoption of a child, with 2 weeks\' notice where possible. The leave can be unpaid, and the employee must get the same or a similar job back. Two employees of the same employer share 8 weeks for the same child. The federal [Family and Medical Leave Act (FMLA)](/guides/how-to-handle-an-fmla-request) adds unpaid leave at 50 or more employees.',
          },
        ],
      },
      {
        heading: 'Final pay in Massachusetts',
        blocks: [
          {
            type: 'table',
            caption: 'Final paycheck deadlines under the Wage Act (M.G.L. c. 149, s. 148)',
            columns: ['Situation', 'When final pay is due'],
            rows: [
              ['You end the employment (firing or layoff)', 'In full on the day of discharge'],
              ['The employee quits', 'In full on the next regular payday, or the following Saturday if there is no regular payday'],
              ['Earned, unused vacation', 'Paid with the final wages, on the same deadline'],
              ['Unused earned sick time', 'No payout required'],
            ],
          },
          {
            type: 'p',
            text: 'The most common mistake is waiting for the next payroll run after a termination. In Massachusetts the check is due the same day, so have it ready before the conversation. The Wage Act treats vacation pay promised under an oral or written agreement as wages, and an employee who wins a Wage Act claim gets treble (three times) damages plus legal costs and attorneys\' fees. See [final paycheck laws](/guides/final-paycheck-laws) and [unused PTO payout](/guides/unused-pto-payout).',
          },
          {
            type: 'p',
            text: 'Unemployment notice. Within 30 days of any separation, temporary or permanent, give the employee the Department of Unemployment Assistance pamphlet How to Apply for Unemployment Insurance Benefits (Form 0590A). Hand it over in person and mail it only if you must, and write your Federal Employer Identification Number (FEIN) and mailing address on it. You must also keep the unemployment poster (Form 2553A) up where everyone can see it.',
          },
          {
            type: 'p',
            text: 'Health coverage. Massachusetts has a "mini-COBRA" law (M.G.L. c. 176J, s. 9) for businesses with 2 to 19 employees. See [when you need to offer COBRA](/guides/when-do-you-need-to-offer-cobra).',
          },
        ],
      },
      {
        heading: 'Other things to know',
        blocks: [
          {
            type: 'list',
            items: [
              'Minimum wage: $15.00 an hour since January 1, 2023, with a $6.75 service rate for tipped workers. No further increase is scheduled.',
              'Overtime: one and a half times the regular rate for hours over 40 in a workweek. See [overtime rules](/guides/overtime-rules).',
              'Anti-discrimination: Chapter 151B, enforced by the Massachusetts Commission Against Discrimination (MCAD), covers employers with 6 or more employees. Those employers must have a written sexual harassment policy and give every employee a copy each year.',
              'Workers\' compensation: every employer must carry it, no matter how many employees or how many hours they work. See [workers\' compensation requirements](/guides/workers-compensation-requirements).',
              'Layoffs: check the federal WARN Act before a large reduction in force. See [WARN Act layoffs](/guides/warn-act-layoffs).',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Do I have to pay out unused vacation in Massachusetts?',
        a: 'Yes. Vacation promised under an oral or written agreement counts as wages, so earned vacation goes in the final paycheck on the same deadline as other wages. Unused earned sick time does not have to be paid out.',
      },
      {
        q: 'Does the Massachusetts pay range law apply to a company with fewer than 25 employees?',
        a: 'No. The posting duty, and the duty to give the range on request or with a promotion or transfer, apply to employers with 25 or more employees in Massachusetts. Smaller employers may still choose to post ranges.',
      },
      {
        q: 'Do small employers pay into Massachusetts PFML?',
        a: 'Yes, every employer sends contributions to DFML. With fewer than 25 covered individuals, the 2026 total is 0.46% of eligible wages and all of it can be withheld from employees, so there is no required employer share.',
      },
      {
        q: 'Can a Massachusetts tech company use non-competes?',
        a: 'Yes, within limits. The agreement can last no more than 12 months, needs garden leave pay or other agreed consideration, and cannot be enforced against non-exempt employees or anyone laid off or fired without cause.',
      },
      {
        q: 'When is final pay due if I fire someone in Massachusetts?',
        a: 'On the day of discharge, in full, including earned vacation. An employee who quits is paid on the next regular payday.',
      },
    ],
    mambahr:
      'MambaHR keeps your employee records and hiring pipeline, and posts jobs with pay ranges. At exit it works out final pay under Massachusetts rules, including same-day timing for a discharge and earned vacation, for a person to approve. On leave requests it cites the state PFML program and sends the request to a person to decide how leave combines, and every change is logged.',
    sources: [
      { label: 'Mass. Attorney General: Guidance on the Wage Transparency Act', url: 'https://www.mass.gov/doc/ago-wage-transparency-act-guidance-revised-1152026/download' },
      { label: 'Mass. Legislature: Chapter 141 of the Acts of 2024', url: 'https://malegislature.gov/Laws/SessionLaws/Acts/2024/Chapter141' },
      { label: 'Mass. EOLWD: Workforce Data Reporting FAQs', url: 'https://www.mass.gov/info-details/workforce-data-reporting-faqs' },
      { label: 'Mass. Law Library: Massachusetts law about hiring employees', url: 'https://www.mass.gov/info-details/massachusetts-law-about-hiring-employees' },
      { label: 'Mass. DOR: Learn about the New Hire Reporting Program', url: 'https://www.mass.gov/info-details/learn-about-the-new-hire-reporting-program' },
      { label: 'Mass. Attorney General: Earned Sick Time', url: 'https://www.mass.gov/info-details/earned-sick-time' },
      { label: 'M.G.L. c. 149, s. 148C (earned sick time)', url: 'https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXI/Chapter149/Section148C' },
      { label: 'Mass. DFML: PFML overview and benefits', url: 'https://www.mass.gov/info-details/paid-family-and-medical-leave-pfml-overview-and-benefits' },
      { label: 'Mass. DFML: Employer contribution rates', url: 'https://www.mass.gov/info-details/paid-family-and-medical-leave-employer-contribution-rates-and-calculator' },
      { label: 'Mass. DFML: How PFML weekly benefit amounts are calculated', url: 'https://www.mass.gov/info-details/how-pfml-weekly-benefit-amounts-are-calculated-andor-changed' },
      { label: 'Mass. DFML: PFML workplace poster and notices', url: 'https://www.mass.gov/info-details/pfml-workplace-poster-notices-and-rate-sheets-for-massachusetts-employers' },
      { label: 'M.G.L. c. 149, s. 105D (parental leave)', url: 'https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXI/Chapter149/Section105D' },
      { label: 'M.G.L. c. 149, s. 148 (payment of wages)', url: 'https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXI/Chapter149/Section148' },
      { label: 'Mass. Law Library: Massachusetts law about vacation leave', url: 'https://www.mass.gov/info-details/massachusetts-law-about-vacation-leave' },
      { label: 'Mass. Law Library: Massachusetts law about employment termination', url: 'https://www.mass.gov/info-details/massachusetts-law-about-employment-termination' },
      { label: 'Mass. DUA: Unemployment workplace posters and pamphlets', url: 'https://www.mass.gov/lists/unemployment-workplace-posters-and-pamphlets' },
      { label: 'M.G.L. c. 149, s. 24L (Noncompetition Agreement Act)', url: 'https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXI/Chapter149/Section24L' },
      { label: 'M.G.L. c. 151B, s. 1 (definition of employer)', url: 'https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXI/Chapter151B/Section1' },
      { label: 'M.G.L. c. 151B, s. 3A (sexual harassment policies)', url: 'https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXI/Chapter151B/Section3A' },
      { label: 'Mass. Law Library: Massachusetts law about minimum wage', url: 'https://www.mass.gov/info-details/massachusetts-law-about-minimum-wage' },
      { label: 'Mass. Law Library: Massachusetts law about overtime', url: 'https://www.mass.gov/info-details/massachusetts-law-about-overtime' },
      { label: 'Mass. DIA: Workers\' Compensation Insurance Requirements', url: 'https://www.mass.gov/info-details/workers-compensation-insurance-requirements' },
    ],
    related: [
      '/hr-by-state',
      '/guides/pay-transparency-job-posts',
      '/guides/final-paycheck-laws',
      '/guides/paid-family-leave-states',
      '/guides/unused-pto-payout',
      '/leave',
    ],
  },
  {
    slug: 'illinois',
    name: 'Illinois',
    abbr: 'IL',
    metaTitle: 'Illinois HR Laws for Small Employers (2026) | MambaHR',
    metaDescription:
      'Illinois employers with 15 or more employees post pay and benefits in job ads, give 40 hours of paid leave a year, and pay final wages by the next payday.',
    answer:
      'Illinois requires employers with 15 or more employees to include the pay scale and benefits in job postings, gives most workers up to 40 hours a year of paid leave they can use for any reason, and requires final pay, earned vacation included, by the next regularly scheduled payday. Chicago and Cook County have their own paid leave ordinances.',
    keyFacts: {
      payTransparency:
        'Required at 15 or more employees (counted inside and outside Illinois) for postings made or republished after January 1, 2025. The post must show the pay or pay range plus a general description of benefits.',
      newHireReporting:
        'Report each new hire to the Illinois Department of Employment Security (IDES) within 20 days of the first day on the payroll, online, by fax or by mail.',
      paidSickLeave:
        'Paid Leave for All Workers Act: 1 hour for every 40 worked, up to 40 hours in 12 months, usable for any reason after 90 days. Chicago and Cook County follow their own ordinances instead.',
      familyLeave:
        'No state law requires paid parental leave, according to the Illinois Department of Labor. Eligible employees can take up to 12 weeks of unpaid, job-protected leave under the federal FMLA.',
      finalPayFired:
        'At separation if possible, and no later than the next regularly scheduled payday.',
      finalPayQuit:
        'The same rule: at separation if possible, and no later than the next regularly scheduled payday.',
      vacationPayout:
        'Required. Earned vacation is paid at the final rate of pay, and no policy may make it forfeit at separation. Leave given only under the Paid Leave for All Workers Act does not have to be paid out unless it sits in a vacation or general PTO bank.',
    },
    sections: [
      {
        heading: 'Hiring in Illinois',
        blocks: [
          {
            type: 'p',
            text: 'Pay scale and benefits in job posts. Under the Illinois Equal Pay Act, an employer with 15 or more employees must include the pay scale and benefits in every specific job posting made or republished after January 1, 2025. All employees count toward the 15, whether they work inside or outside Illinois, full-time or part-time. The rule covers jobs done at least partly in Illinois, and jobs done elsewhere that report to a supervisor, office or work site in Illinois. See [pay transparency in job posts](/guides/pay-transparency-job-posts).',
          },
          {
            type: 'list',
            items: [
              'Pay scale means the wage or salary, or the range, plus a general description of benefits and other pay you reasonably expect to offer, such as bonuses, stock options or other incentives.',
              'Benefits include health care, retirement, paid time off, job-protected time off and any other benefit reported for federal tax purposes. You may link to a public web page that lists them.',
              'A recruiter or job board you use can be liable for a post without the information, unless it shows you never gave it the details.',
              'If you post a promotion opportunity outside the company, announce it to current employees within 14 calendar days.',
              'If there was no public posting, give an applicant the pay scale and benefits on request, before any offer or talk about pay.',
              'Keep records of each posting, including what it looked like when it was published.',
            ],
          },
          {
            type: 'table',
            caption: 'Fines for an active job posting without pay scale and benefits',
            columns: ['Offense', 'Maximum fine'],
            rows: [
              ['First', '$500'],
              ['Second', '$2,500'],
              ['Third and later', '$10,000'],
            ],
          },
          {
            type: 'p',
            text: 'You get 14 days to fix a first offense and 7 days to fix a second. Fines for postings that are no longer active are lower.',
          },
          {
            type: 'list',
            items: [
              'Salary history: you may not ask for an applicant\'s wage or salary history, or screen applicants by it. You may discuss their pay expectations.',
              'Criminal history: employers with 15 or more employees may not ask about criminal records until the applicant has been found qualified and invited to interview, or, if there is no interview, until after a conditional offer. Some jobs are exempt.',
              'New-hire reporting: report each new hire to IDES within 20 days of the first day on the payroll. See [new-hire reporting](/guides/new-hire-reporting).',
              'AI in hiring: since January 1, 2026, the Illinois Human Rights Act bars using artificial intelligence in employment decisions in a way that discriminates against protected groups, or using zip codes as a stand-in for them, and requires notice to employees when AI is used for those decisions.',
              'Pay data: private employers with 100 or more employees in Illinois must get an Equal Pay Registration Certificate from the Illinois Department of Labor and renew it every two years ($150 fee).',
            ],
          },
          {
            type: 'p',
            text: 'Non-competes. The Illinois Freedom to Work Act voids a non-compete unless the employee earns more than $75,000 a year, rising to $80,000 on January 1, 2027. A non-solicitation agreement needs earnings above $45,000, rising to $47,500 on January 1, 2027. Either one is void unless you advise the employee in writing to consult a lawyer and give them at least 14 calendar days to review it.',
          },
        ],
      },
      {
        heading: 'Leave in Illinois',
        blocks: [
          {
            type: 'p',
            text: 'Paid Leave for All Workers Act (PLAWA). Employers of every size, outside Chicago and Cook County, must let employees earn at least 1 hour of paid leave for every 40 hours worked, up to 40 hours in a 12-month period. You can frontload the full amount at the start of the year or of employment instead. Employees can start using it after 90 days, for any reason or no reason, and you may not ask why or ask for documentation. Unused leave carries over. Keep records of each employee\'s balance and share it on request, and display the PLAWA notice. Chicago and Cook County employers follow their own paid leave ordinances. See [paid sick leave laws](/guides/paid-sick-leave-laws).',
          },
          {
            type: 'table',
            caption: 'Other Illinois leave rules',
            columns: ['Law', 'Who it covers', 'What it gives'],
            rows: [
              ['Employee Sick Leave Act', 'Employers that offer personal sick leave', 'Employees can use their sick leave for a covered family member\'s illness, injury or appointment on the same terms. You may cap this at what they would earn in 6 months.'],
              ['Family Bereavement Leave Act', 'Employers with at least 50 employees within a 75-mile radius', 'Up to 2 weeks (10 workdays) of unpaid, job-protected bereavement leave.'],
              ['Victims\' Economic Security and Safety Act (VESSA)', 'Varies with employer size', 'Up to 12 weeks of unpaid, job-protected leave for victims of domestic, gender, sexual or other violence.'],
              ['Federal FMLA', '50 or more employees', 'Up to 12 weeks of unpaid, job-protected leave for eligible employees.'],
            ],
          },
          {
            type: 'p',
            text: 'There is no Illinois law requiring paid parental leave. For new parents, the main protection is the federal [Family and Medical Leave Act (FMLA)](/guides/how-to-handle-an-fmla-request), plus any PLAWA or company leave.',
          },
        ],
      },
      {
        heading: 'Final pay in Illinois',
        blocks: [
          {
            type: 'table',
            caption: 'Final pay under the Wage Payment and Collection Act (820 ILCS 115/5)',
            columns: ['Situation', 'When final pay is due'],
            rows: [
              ['You end the employment', 'At separation if possible, and no later than the next regularly scheduled payday'],
              ['The employee quits', 'At separation if possible, and no later than the next regularly scheduled payday'],
              ['Earned, unused vacation', 'Paid at the final rate of pay as part of final compensation'],
              ['PLAWA leave only', 'No payout required, unless it is part of a vacation or general PTO bank'],
            ],
          },
          {
            type: 'p',
            text: 'Final compensation includes wages, earned commissions, earned bonuses and earned vacation. A policy that makes earned vacation forfeit at separation is not allowed, so check your PTO policy wording before you write it. If the employee asks in writing for the final check to be mailed, you must mail it. See [final paycheck laws](/guides/final-paycheck-laws) and [unused PTO payout](/guides/unused-pto-payout).',
          },
          {
            type: 'p',
            text: 'Unemployment notice. When an employee is separated from the payroll for any reason, or laid off for 7 days or more, give them the IDES publication \'What Every Worker Should Know About Unemployment Insurance\'. If you cannot hand it over at work, mail it to their last known address within 5 calendar days of the separation.',
          },
        ],
      },
      {
        heading: 'Other things to know',
        blocks: [
          {
            type: 'list',
            items: [
              'Minimum wage: $15.00 an hour for workers 18 and older since January 1, 2025, and $13.00 for workers under 18 who work fewer than 650 hours a year for you. A tip credit of up to 40% is allowed.',
              'Overtime: one and a half times the regular rate for hours over 40 in a workweek. See [overtime rules](/guides/overtime-rules).',
              'Anti-discrimination: the Illinois Human Rights Act covers employers with one or more employees in Illinois for 20 or more weeks a year, and any employer with one or more employees for claims of disability or pregnancy discrimination or sexual harassment.',
              'Harassment training: every employer with employees in Illinois must give sexual harassment prevention training at least once a year, using the state model program or its own program that meets the same standards.',
              'Illinois WARN Act: covers employers with 75 or more employees (not counting part-time). A mass layoff (25 or more employees making up at least 33% of a site, or 250 or more) or a plant closing (50 or more) needs 60 days\' written notice. See [WARN Act layoffs](/guides/warn-act-layoffs).',
              'Workers\' compensation: required from the first employee, even a part-time one. See [workers\' compensation requirements](/guides/workers-compensation-requirements).',
              'Posters: all employers display Your Rights Under Illinois Employment Laws, the Paid Leave for All Workers Act notice and the VESSA notice, among others. See [labor law posters](/guides/labor-law-posters).',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Does the Illinois Paid Leave for All Workers Act apply in Chicago?',
        a: 'No. Chicago and Cook County passed their own paid leave ordinances before 2024, so employers there follow those instead. Chicago questions go to the City of Chicago Office of Labor Standards, and Cook County questions to the Cook County Commission on Human Rights.',
      },
      {
        q: 'Do I have to pay out unused PTO in Illinois?',
        a: 'Earned vacation must be paid out, and a policy cannot make it forfeit at separation. A use-it-or-lose-it rule during employment is allowed only if employees get a reasonable chance to use the time. Leave given only to meet the Paid Leave for All Workers Act does not have to be paid out, unless it is part of a vacation or general PTO bank.',
      },
      {
        q: 'Does the Illinois pay transparency law cover remote jobs?',
        a: 'It covers jobs done at least partly in Illinois, and jobs done outside Illinois when the employee reports to a supervisor, office or work site in Illinois. The 15-employee count includes employees in every state.',
      },
      {
        q: 'What is the salary threshold for a non-compete in Illinois?',
        a: 'The employee must earn more than $75,000 a year, rising to $80,000 on January 1, 2027. Non-solicitation agreements need more than $45,000, rising to $47,500 on the same date.',
      },
      {
        q: 'Is sexual harassment training required in Illinois?',
        a: 'Yes. Every employer with employees in Illinois must provide it at least once a year, using the state model program or one that meets the same minimum standards.',
      },
    ],
    mambahr:
      'MambaHR posts jobs with the pay scale and benefits in the listing, keeps applications in one pipeline, and drafts offers inside your pay range for a person to approve. It approves time-off requests within your policy, and at exit it works out final pay under Illinois rules, earned vacation included, for a person to approve. Every change is logged.',
    sources: [
      { label: 'Illinois Department of Labor: Vacation FAQ', url: 'https://labor.illinois.gov/faqs/vacation-faq.html' },
      { label: 'Illinois Department of Labor: Equal Pay Act Pay Transparency FAQ', url: 'https://labor.illinois.gov/faqs/equal-pay-act-salary-transparency-faq.html' },
      { label: '820 ILCS 112/10 (Equal Pay Act)', url: 'https://ilga.gov/Documents/legislation/ilcs/documents/082001120K10.htm' },
      { label: 'Illinois Department of Labor: Equal Pay Registration Certificate', url: 'https://labor.illinois.gov/laws-rules/conmed/eprc.html' },
      { label: 'IDES: New Hire Reporting', url: 'https://ides.illinois.gov/employer-resources/taxes-reporting/new-hires.html' },
      { label: '820 ILCS 75/10 and 75/15 (Job Opportunities for Qualified Applicants Act)', url: 'https://ilga.gov/Documents/legislation/ilcs/documents/082000750K15.htm' },
      { label: '820 ILCS 90/10 (Freedom to Work Act)', url: 'https://ilga.gov/Documents/legislation/ilcs/documents/082000900K10.htm' },
      { label: '820 ILCS 90/20 (Freedom to Work Act notice rules)', url: 'https://ilga.gov/Documents/legislation/ilcs/documents/082000900K20.htm' },
      { label: 'Illinois Department of Labor: Paid Leave for All Workers Act FAQ', url: 'https://labor.illinois.gov/faqs/paidleavefaq.html' },
      { label: 'Illinois Department of Labor: Leave Rights General Information', url: 'https://labor.illinois.gov/faqs/leave-rights-general-information.html' },
      { label: '820 ILCS 191/10 (Employee Sick Leave Act)', url: 'https://ilga.gov/Documents/legislation/ilcs/documents/082001910K10.htm' },
      { label: '820 ILCS 115/5 (Wage Payment and Collection Act, final compensation)', url: 'https://ilga.gov/Documents/legislation/ilcs/documents/082001150K5.htm' },
      { label: 'IDES: What Every Worker Should Know About Unemployment Insurance', url: 'https://ides.illinois.gov/unemployment/resources/what-every-worker-should-know-about-unemployment-insurance.html' },
      { label: 'Illinois Department of Labor: Minimum Wage and Overtime FAQ', url: 'https://labor.illinois.gov/faqs/minimum-wage-overtime-faq.html' },
      { label: '775 ILCS 5/2-101 (Human Rights Act, definition of employer)', url: 'https://ilga.gov/Documents/legislation/ilcs/documents/077500050K2-101.htm' },
      { label: '775 ILCS 5/2-102 (Human Rights Act, civil rights violations)', url: 'https://ilga.gov/Documents/legislation/ilcs/documents/077500050K2-102.htm' },
      { label: '775 ILCS 5/2-109 (sexual harassment prevention training)', url: 'https://ilga.gov/Documents/legislation/ilcs/documents/077500050K2-109.htm' },
      { label: '820 ILCS 65/5 and 65/10 (Illinois WARN Act)', url: 'https://ilga.gov/Documents/legislation/ilcs/documents/082000650K5.htm' },
      { label: 'Illinois Workers\' Compensation Commission: Insurance', url: 'https://iwcc.illinois.gov/about/insurance.html' },
      { label: 'Illinois Department of Labor: Required Posters', url: 'https://labor.illinois.gov/employers/posters.html' },
    ],
    related: [
      '/hr-by-state',
      '/guides/pay-transparency-job-posts',
      '/guides/paid-sick-leave-laws',
      '/guides/final-paycheck-laws',
      '/guides/warn-act-layoffs',
      '/hiring',
    ],
  },
]
