import type { Guide } from './types'

// Offboarding guides: firing an employee (federal checklist + CA, NY, TX).
// Every legal fact below was checked against the official page listed in the
// record's `sources` on 2026-10-02.

export const firingGuides: Guide[] = [
  // ── 1. Federal checklist ─────────────────────────────────────────────────
  {
    slug: 'how-to-fire-an-employee',
    category: 'Offboarding',
    title: 'How to fire an employee legally (a checklist)',
    metaTitle: 'How to Fire an Employee Legally: A Checklist | MambaHR',
    metaDescription:
      'To fire an employee legally, rule out illegal reasons, document it, pay final wages by the state deadline, and send COBRA and state separation notices.',
    answer:
      'To fire an employee legally, make sure the reason is not discrimination or retaliation, document it, pay final wages by your state\'s deadline, and send the COBRA notice (20 or more employees with a group health plan) plus any separation notices your state requires. If you offer severance in exchange for a release from a worker who is 40 or older, the agreement must give at least 21 days to consider it and 7 days to revoke after signing.',
    sections: [
      {
        heading: 'Start with the reason: at-will employment and its limits',
        blocks: [
          {
            type: 'p',
            text: 'Federal law does not make you give a reason for ending someone\'s job. The U.S. Department of Labor explains that when a termination is not based on discrimination or another protected status, it is governed only by any contract between you and the employee. In an at-will state such as Texas, either side can end the relationship at any time, for any reason that is not illegal, with or without notice. A written contract, an offer letter that promises a fixed term, or a handbook that promises a process can change that, so read them first.',
          },
          {
            type: 'p',
            text: 'The reason cannot be an illegal one. These are the common federal limits:',
          },
          {
            type: 'list',
            items: [
              'Discrimination: Title VII (race, color, religion, sex, national origin) and the Americans with Disabilities Act (ADA) apply to employers with 15 or more employees. The Age Discrimination in Employment Act (ADEA) protects workers 40 and older at employers with 20 or more employees.',
              '[Retaliation](https://www.eeoc.gov/retaliation): you cannot punish someone for filing or being a witness in a discrimination complaint, reporting harassment, asking for a disability or religious accommodation, or asking about pay to uncover wage discrimination.',
              'Family and Medical Leave Act (FMLA) interference: if you are covered, you cannot interfere with FMLA rights or use a request for or use of FMLA leave as a negative factor in discipline or a termination. See [how to handle an FMLA request](/guides/how-to-handle-an-fmla-request).',
              'State law often reaches further. California\'s anti-discrimination law covers employers with 5 or more employees, New York\'s covers employers of every size, and Texas covers sexual harassment at employers with even one employee.',
            ],
          },
          {
            type: 'p',
            text: 'A good test: if the employee recently complained, took leave, asked for an accommodation, or disclosed a pregnancy or disability, slow down and have a second person review the decision and the timing.',
          },
        ],
      },
      {
        heading: 'Document the decision before the meeting',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Write down the business reason in plain facts: what happened, when, and what the expectation was.',
              'Collect the record: prior warnings, performance reviews, attendance records, and any improvement plan with dates.',
              'Check consistency: have others who did the same thing been treated the same way?',
              'Confirm the employee\'s state of work, because final pay deadlines and notices follow the state where they work.',
              'Calculate final pay, including any vacation your state or policy requires you to pay out, so the check is ready on time.',
              'Decide whether you will offer severance, and if so, have the agreement drafted before the meeting.',
            ],
          },
        ],
      },
      {
        heading: 'Hold a short, respectful meeting',
        blocks: [
          {
            type: 'list',
            items: [
              'Keep it brief and private, with the manager plus one other person (often HR) in the room or on the call.',
              'State the decision clearly in the first minute. Do not debate it. Give the reason in one or two factual sentences.',
              'Explain what happens next: final pay, benefits end date, COBRA, return of property, and how to reach you with questions.',
              'Hand over the documents your state requires on the last day, such as California\'s change-in-relationship notice and EDD pamphlet.',
              'Write a short note of what was said right after the meeting and keep it in the personnel file.',
            ],
          },
        ],
      },
      {
        heading: 'Pay final wages on time',
        blocks: [
          {
            type: 'p',
            text: 'Federal law does not require you to hand over the final paycheck immediately, but many states do, and the deadline is often shorter when you fire someone than when they quit. Three common examples:',
          },
          {
            type: 'table',
            caption: 'Final pay deadline when you end the employment',
            columns: ['State', 'Deadline', 'Unused vacation'],
            rows: [
              ['California', 'Immediately, at the time of termination', 'Must be paid out'],
              ['New York', 'By the regular payday for the pay period in which the job ended', 'Follows your written policy'],
              ['Texas', 'Within 6 calendar days of discharge', 'Only if a written policy or agreement promises it'],
            ],
          },
          {
            type: 'p',
            text: 'See [final paycheck laws](/guides/final-paycheck-laws) and [unused PTO payout](/guides/unused-pto-payout) for other states, and the state guides for [California](/guides/firing-an-employee-in-california), [New York](/guides/firing-an-employee-in-new-york) and [Texas](/guides/firing-an-employee-in-texas).',
          },
        ],
      },
      {
        heading: 'Health coverage and unemployment notices',
        blocks: [
          {
            type: 'list',
            items: [
              'COBRA: if you had 20 or more employees on more than half of your typical business days last year and offer a group health plan, a termination for any reason other than gross misconduct is a qualifying event. You must notify the plan within 30 days, the plan sends the election notice within 14 days of that notice, and the employee has at least 60 days to elect. Coverage after a job loss usually lasts up to 18 months. See [when you need to offer COBRA](/guides/when-do-you-need-to-offer-cobra).',
              'State continuation: smaller employers can still have continuation duties under state law, such as Cal-COBRA in California and state continuation in New York and Texas.',
              'Unemployment notices: some states require a written notice at separation. California requires the EDD For Your Benefit pamphlet (DE 2320) and a written notice of the change in employment. New York requires a Record of Employment (IA 12.3) and a written termination notice within 5 working days.',
            ],
          },
        ],
      },
      {
        heading: 'Remove access and collect company property',
        blocks: [
          {
            type: 'p',
            text: 'Turn off email, single sign-on, payroll and banking access, code repositories and shared drives at the time of the meeting, not after. Arrange the return of laptops, badges and cards with a prepaid shipping label if the person is remote. Do not hold the final paycheck hostage to the return of property: the Texas Workforce Commission, for example, says it is not legal to hold final pay past the deadline because property was not returned. The [employee offboarding checklist](/guides/employee-offboarding-checklist) covers the full list.',
          },
        ],
      },
      {
        heading: 'Severance agreements and releases',
        blocks: [
          {
            type: 'p',
            text: 'Severance is not required by the Fair Labor Standards Act. It is a matter of agreement. If you pay severance in exchange for a release of claims and the employee is 40 or older, the Older Workers Benefit Protection Act (OWBPA) sets the rules for a valid age-claim waiver:',
          },
          {
            type: 'list',
            items: [
              'Written so the employee can understand it, and it must name the Age Discrimination in Employment Act.',
              'It cannot waive claims that arise after signing.',
              'It must give something of value beyond what the employee is already owed (final wages do not count).',
              'It must advise the employee in writing to talk to a lawyer.',
              'At least 21 days to consider it (45 days when two or more people are let go in the same program), and 7 days to revoke after signing. The employee may sign early if the choice is voluntary.',
            ],
          },
          {
            type: 'p',
            text: 'No agreement can stop an employee from filing a charge with the Equal Employment Opportunity Commission (EEOC) or taking part in its investigation. More detail is in [severance agreements](/guides/severance-agreements). For layoffs of many people at once, read [WARN Act layoffs](/guides/warn-act-layoffs).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Do I have to give a reason when I fire someone?',
        a: 'Federal law does not require a stated reason, and at-will employment allows ending the job for any lawful reason. Some states require specific written notices, and a clear, factual reason on file is your best record if the decision is challenged.',
      },
      {
        q: 'Do I have to pay severance?',
        a: 'No federal law requires severance. You owe it only if a contract, offer letter or written policy promises it.',
      },
      {
        q: 'Can I hold the final paycheck until the laptop comes back?',
        a: 'No. Final pay is due by the state deadline whether or not property has been returned. Handle the property separately.',
      },
      {
        q: 'What should I say when a future employer calls for a reference?',
        a: 'Many companies confirm only dates of employment and job title. Pick one approach, write it down, and apply it the same way for everyone.',
      },
    ],
    mambahr:
      'MambaHR does the offboarding admin: it removes system access, works out final pay under the state\'s rules for a person to approve, drafts the separation paperwork, and prepares the COBRA continuation notices. Every termination goes to a person to decide, and every change is logged.',
    sources: [
      { label: 'DOL: Termination', url: 'https://www.dol.gov/general/topic/termination' },
      { label: 'DOL: Last paycheck', url: 'https://www.dol.gov/general/topic/wages/lastpaycheck' },
      { label: 'DOL: Severance pay', url: 'https://www.dol.gov/general/topic/wages/severancepay' },
      { label: 'EEOC: Retaliation', url: 'https://www.eeoc.gov/retaliation' },
      { label: 'EEOC: Small business information (coverage thresholds)', url: 'https://www.eeoc.gov/publications/get-facts-series-small-business-information' },
      { label: 'EEOC: Understanding waivers of discrimination claims in severance agreements', url: 'https://www.eeoc.gov/laws/guidance/qa-understanding-waivers-discrimination-claims-employee-severance-agreements' },
      { label: 'DOL: Fact Sheet #77B, Protection for individuals under the FMLA', url: 'https://www.dol.gov/agencies/whd/fact-sheets/77b-fmla-protections' },
      { label: 'DOL EBSA: An employer\'s guide to group health continuation coverage under COBRA', url: 'https://www.dol.gov/sites/dolgov/files/ebsa/about-ebsa/our-activities/resource-center/publications/an-employers-guide-to-group-health-continuation-coverage-under-cobra.pdf' },
      { label: 'Texas Workforce Commission: Final pay', url: 'https://efte.twc.texas.gov/final_pay.html' },
    ],
    related: [
      '/guides/employee-offboarding-checklist',
      '/guides/final-paycheck-laws',
      '/guides/severance-agreements',
      '/guides/when-do-you-need-to-offer-cobra',
      '/guides/warn-act-layoffs',
      '/guides/hr-laws-by-company-size',
    ],
  },

  // ── 2. California ────────────────────────────────────────────────────────
  {
    slug: 'firing-an-employee-in-california',
    category: 'Offboarding',
    title: 'Firing an employee in California: what the law requires',
    metaTitle: 'Firing an Employee in California: What the Law Requires | MambaHR',
    metaDescription:
      'California requires final pay, including unused vacation, at the moment of firing, plus a written separation notice and the EDD DE 2320 pamphlet.',
    answer:
      'In California, a fired employee must be paid all final wages, including accrued unused vacation, immediately at the time of termination (Labor Code 201), and a willful delay can cost a penalty of one day\'s wages for each day late, up to 30 days (Labor Code 203). You must also give a written notice of the change in the employment relationship and the EDD pamphlet For Your Benefit (DE 2320).',
    sections: [
      {
        heading: 'Final pay is due on the last day',
        blocks: [
          {
            type: 'p',
            text: 'When you discharge an employee, all wages earned and unpaid are due immediately. Plan the termination for a time when the final check (or a same-day direct deposit) is ready. California treats earned vacation as wages: under Labor Code 227.3 all earned and unused vacation must be paid at the employee\'s final rate of pay, and a use-it-or-lose-it policy is not legal. A combined paid time off (PTO) bank follows the same rule.',
          },
          {
            type: 'table',
            caption: 'California final pay deadlines',
            columns: ['How the job ends', 'Deadline', 'Law'],
            rows: [
              ['You fire or lay off the employee', 'Immediately, at the time of termination', 'Labor Code 201'],
              ['Employee quits with at least 72 hours\' notice', 'On the last day of work', 'Labor Code 202'],
              ['Employee quits without 72 hours\' notice', 'Within 72 hours of quitting (by mail if they ask)', 'Labor Code 202'],
            ],
          },
          {
            type: 'p',
            text: 'Paid sick leave is different. Labor Code 246(f) says you do not have to pay out accrued, unused paid sick days at separation, unless your own policy says you will. If you rehire the person within one year, their unused sick days must be reinstated.',
          },
        ],
      },
      {
        heading: 'Waiting time penalties',
        blocks: [
          {
            type: 'p',
            text: 'If an employer willfully fails to pay final wages on time, the employee\'s daily wage keeps running as a penalty for each day the wages stay unpaid, up to 30 calendar days (Labor Code 203). "Willful" does not mean bad intent. The Division of Labor Standards Enforcement explains that it is enough that the employer knew what it was doing and failed to pay. A good faith dispute about whether wages are owed prevents the penalty, but undisputed wages must still be paid on time.',
          },
          {
            type: 'list',
            items: [
              'Common mistake: running the final check on the next regular payroll instead of on the termination date.',
              'Common mistake: leaving accrued vacation out of the final check.',
              'Filing a wage claim with the Labor Commissioner does not stop the penalty from growing. Paying the wages does.',
            ],
          },
        ],
      },
      {
        heading: 'Notices to hand over at separation',
        blocks: [
          {
            type: 'list',
            items: [
              'Notice of change in relationship: California Unemployment Insurance Code section 1089 requires every employer to notify each employee immediately of any change in their relationship with the employer. A firing, layoff or leave of absence counts. The EDD publishes a sample notice that meets the minimum requirements.',
              'For Your Benefit (DE 2320): under the EDD\'s regulations, when you discharge, lay off, or place an employee on a leave of absence, you must give them this pamphlet about unemployment, disability and paid family leave benefits.',
              'Health coverage options: Labor Code 2808 requires you, at termination, to tell the employee about all continuation, disability extension and conversion coverage options under your health coverage. Labor Code 2807 requires you to include the state\'s written description of the Health Insurance Premium Program with the federal COBRA notice.',
            ],
          },
          {
            type: 'p',
            text: 'The current version of section 1089 also allows these materials to be delivered electronically if the employee opts in. Paper in hand at the termination meeting is still the simplest way to show you complied.',
          },
        ],
      },
      {
        heading: 'Health coverage: COBRA and Cal-COBRA',
        blocks: [
          {
            type: 'table',
            caption: 'Which continuation law applies',
            columns: ['Employer size', 'Law', 'What you must do'],
            rows: [
              ['20 or more employees (federal test)', 'Federal COBRA', 'Notify the plan within 30 days; the plan sends the election notice. Usually up to 18 months after a job loss.'],
              ['2 to 19 eligible employees on at least half of working days last year', 'Cal-COBRA', 'Notify your health plan in writing within 30 days of the qualifying event; the plan then sends the enrollment information within 14 days. Up to 36 months of coverage.'],
            ],
          },
          {
            type: 'p',
            text: 'More detail, including who counts as an employee for these tests, is in [when you need to offer COBRA](/guides/when-do-you-need-to-offer-cobra).',
          },
        ],
      },
      {
        heading: 'Discrimination and retaliation rules are broader',
        blocks: [
          {
            type: 'p',
            text: 'California\'s Fair Employment and Housing Act (FEHA) bars discrimination and retaliation by employers with 5 or more employees, far below the federal 15-employee line. Harassment is prohibited at every workplace, even one with fewer than five employees. Protected categories include race, color, ancestry, national origin, religion, age (40 and over), mental and physical disability, sex and gender (including pregnancy, childbirth and breastfeeding), sexual orientation, gender identity and expression, medical condition, genetic information, marital status, military or veteran status, and reproductive health decision-making. Before you fire someone who recently complained, asked for an accommodation or took protected leave, review the timing and the record with a second person.',
          },
        ],
      },
      {
        heading: 'Layoffs: the California WARN Act',
        blocks: [
          {
            type: 'p',
            text: 'California has its own WARN Act. It covers a "covered establishment," meaning a facility that employs, or has employed in the past 12 months, 75 or more people. A mass layoff is 50 or more employees laid off in any 30-day period. Covered employers must give written notice 60 days before a mass layoff, relocation or termination to the affected employees, the EDD, the local workforce development board, and the chief elected official of each affected city and county. From January 1, 2026, the notice must also cover workforce board services, CalFresh food assistance, and a working email and phone number for the employer. See [WARN Act layoffs](/guides/warn-act-layoffs) and the [California HR guide](/hr-by-state/california).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Can I pay a fired employee on the next regular payday in California?',
        a: 'No. Wages for a discharged employee are due immediately at the time of termination. Waiting for the next payroll can trigger waiting time penalties of up to 30 days of wages.',
      },
      {
        q: 'Do I have to pay out unused sick leave in California?',
        a: 'No. Labor Code 246(f) does not require payout of unused paid sick days at separation. Vacation and PTO banks are different and must be paid out.',
      },
      {
        q: 'What if the employee quits instead?',
        a: 'With at least 72 hours\' notice, final pay is due on the last day. Without notice, it is due within 72 hours, and the employee can ask for it by mail.',
      },
    ],
    mambahr:
      'When a California termination is requested, MambaHR works out the final pay, including accrued vacation, for a person to approve before the last day, drafts the separation paperwork, prepares the continuation notices, and removes system access. The termination itself always goes to a person, and every step is logged.',
    sources: [
      { label: 'California DLSE: Paydays, pay periods and final pay FAQ', url: 'https://www.dir.ca.gov/dlse/faq_paydays.htm' },
      { label: 'California DLSE: Waiting time penalty FAQ', url: 'https://www.dir.ca.gov/dlse/faq_waitingtimepenalty.htm' },
      { label: 'California DLSE: Vacation FAQ', url: 'https://www.dir.ca.gov/dlse/faq_vacation.htm' },
      { label: 'Cal. Labor Code 246 (paid sick leave)', url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=246' },
      { label: 'Cal. Unemployment Insurance Code 1089', url: 'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=UIC&division=1.&title=&part=1.&chapter=4.&article=6.' },
      { label: 'EDD: Required notices and pamphlets', url: 'https://edd.ca.gov/en/payroll_taxes/required_notices_and_pamphlets/' },
      { label: 'EDD: Managing Unemployment Insurance Costs (DE 4527)', url: 'https://edd.ca.gov/siteassets/files/pdf_pub_ctr/de4527.pdf' },
      { label: 'Cal. Health and Safety Code 1366.21, 1366.25, 1366.27 (Cal-COBRA)', url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=HSC&sectionNum=1366.25' },
      { label: 'Cal. Labor Code 1400.5 and 1401 (California WARN)', url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=1401' },
      { label: 'California Civil Rights Department: Employment', url: 'https://calcivilrights.ca.gov/employment/' },
      { label: 'DOL EBSA: An employer\'s guide to group health continuation coverage under COBRA', url: 'https://www.dol.gov/sites/dolgov/files/ebsa/about-ebsa/our-activities/resource-center/publications/an-employers-guide-to-group-health-continuation-coverage-under-cobra.pdf' },
      { label: 'EEOC: Small business information (coverage thresholds)', url: 'https://www.eeoc.gov/publications/get-facts-series-small-business-information' },
    ],
    related: [
      '/hr-by-state/california',
      '/guides/how-to-fire-an-employee',
      '/guides/final-paycheck-laws',
      '/guides/unused-pto-payout',
      '/guides/when-do-you-need-to-offer-cobra',
      '/guides/warn-act-layoffs',
    ],
  },

  // ── 3. New York ──────────────────────────────────────────────────────────
  {
    slug: 'firing-an-employee-in-new-york',
    category: 'Offboarding',
    title: 'Firing an employee in New York: what the law requires',
    metaTitle: 'Firing an Employee in New York: Pay, Notices, Forms | MambaHR',
    metaDescription:
      'In New York, final pay is due by the regular payday for the period the job ended, and a written termination notice is due within 5 working days.',
    answer:
      'In New York, a fired employee\'s final wages are due no later than the regular payday for the pay period in which the termination happened (Labor Law 191(3)). Within 5 working days you must give written notice of the exact termination date and the exact date benefits end (Labor Law 195(6)), and you must give a Record of Employment (Form IA 12.3) for unemployment insurance.',
    sections: [
      {
        heading: 'Final pay and unused leave',
        blocks: [
          {
            type: 'p',
            text: 'New York Labor Law 191(3) says that when employment ends, you must pay the wages no later than the regular payday for the pay period during which the termination occurred. The rule is the same whether you fire the employee or they quit. If the employee asks, you must mail the final pay.',
          },
          {
            type: 'list',
            items: [
              'Vacation: New York does not set its own payout rule. Labor Law 198-c requires you to pay benefits such as vacation, holiday and separation pay according to your agreement with employees, and Labor Law 195(5) requires you to give employees your vacation policy in writing or post it. So whether unused vacation is paid at exit depends on what your written policy says. If you do not intend to pay it out, say so plainly in the policy.',
              'Sick leave: New York\'s paid sick leave law (Labor Law 196-b) does not require you to pay out unused sick leave at separation.',
              'Benefits under 198-c, including vacation owed under your policy, must be paid within 30 days after they are due.',
            ],
          },
        ],
      },
      {
        heading: 'Written termination notice within 5 working days',
        blocks: [
          {
            type: 'p',
            text: 'Labor Law 195(6) requires you to notify every terminated employee in writing of two things: the exact date of the termination and the exact date their employee benefits end. The notice must go out no more than five working days after the termination date. Failing to tell someone that their accident or health insurance is being cancelled carries an additional penalty. The New York State Department of Labor publishes guidelines for this letter (LS 46).',
          },
          {
            type: 'list',
            items: [
              'Put the termination date and the benefits end date in the same letter, as exact dates.',
              'Hand it over at the termination meeting when you can, so the 5-day clock is not a risk.',
              'The law does not require you to state the reason for the termination in this notice.',
            ],
          },
        ],
      },
      {
        heading: 'Unemployment: the Record of Employment (IA 12.3)',
        blocks: [
          {
            type: 'p',
            text: 'The Department of Labor requires you to give written notice to any employee who is separated from employment, whatever the reason and whether the separation is temporary or permanent. You give it on the Record of Employment (Form IA 12.3) or a form the Department approves. It must show your business name, your New York State employer registration number, the address where the Department should send the Notice of Potential Charges, and a statement telling the employee to keep the form for an unemployment claim.',
          },
        ],
      },
      {
        heading: 'Health coverage: COBRA and New York continuation',
        blocks: [
          {
            type: 'table',
            caption: 'Which continuation rule applies',
            columns: ['Situation', 'Rule'],
            rows: [
              ['20 or more employees', 'Federal COBRA: notify the plan within 30 days; the plan sends the election notice within 14 days.'],
              ['Fewer than 20 employees, insured plan', 'New York state continuation: up to 36 months, at up to 102% of the group premium. The employee asks in writing within 60 days of the later of the termination date or the notice of the right.'],
              ['COBRA coverage running out, insured plan', 'New York extends continuation so the total can reach 36 months.'],
              ['Self-funded plan', 'State continuation does not apply. Only federal COBRA, if you are covered by it.'],
            ],
          },
          {
            type: 'p',
            text: 'The benefits end date in your 195(6) letter should match what the plan and the COBRA or state continuation notice say. See [when you need to offer COBRA](/guides/when-do-you-need-to-offer-cobra).',
          },
        ],
      },
      {
        heading: 'Discrimination protections cover every employer',
        blocks: [
          {
            type: 'p',
            text: 'The New York State Human Rights Law defines "employer" to include all employers within the state, so even a company with one employee is covered. That is far broader than the federal 15-employee threshold for Title VII and the ADA. Before firing someone who recently complained, asked for an accommodation, or took protected leave, check that the reason and the timing are well documented.',
          },
        ],
      },
      {
        heading: 'Layoffs: the New York WARN Act',
        blocks: [
          {
            type: 'p',
            text: 'New York\'s WARN Act applies to private employers with 50 or more full-time employees in New York State and requires 90 days\' advance notice. It is triggered by a plant closing affecting 25 or more employees, a mass layoff of 25 or more employees who make up at least 33% of the workforce at a site, or of 250 or more employees, as well as certain relocations and reductions in hours. The Department of Labor has also clarified how remote workers count. See [WARN Act layoffs](/guides/warn-act-layoffs) and the [New York HR guide](/hr-by-state/new-york).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Does New York require final pay on the last day?',
        a: 'No. Final wages are due by the regular payday for the pay period in which the job ended, and by mail if the employee asks.',
      },
      {
        q: 'What must the New York termination letter say?',
        a: 'The exact date of termination and the exact date employee benefits end. It must be given in writing within five working days of the termination.',
      },
      {
        q: 'Do I have to pay out unused vacation in New York?',
        a: 'It depends on your written vacation policy. Pay it if your policy or agreement provides for it, and if your policy says unused vacation is forfeited at exit, make sure employees were given that policy in writing.',
      },
    ],
    mambahr:
      'For a New York termination, MambaHR works out final pay under the state\'s rules for a person to approve, drafts the separation paperwork, prepares the COBRA continuation notices, and removes system access. Terminations always go to a person to decide, and every change is logged.',
    sources: [
      { label: 'N.Y. Labor Law 191 (frequency and timing of pay)', url: 'https://www.nysenate.gov/legislation/laws/LAB/191' },
      { label: 'N.Y. Labor Law 195 (notice and record-keeping)', url: 'https://www.nysenate.gov/legislation/laws/LAB/195' },
      { label: 'N.Y. Labor Law 198-c (benefits and wage supplements)', url: 'https://www.nysenate.gov/legislation/laws/LAB/198-C' },
      { label: 'N.Y. Labor Law 196-b (paid sick leave)', url: 'https://www.nysenate.gov/legislation/laws/LAB/196-B' },
      { label: 'NYSDOL: Guidelines, letter of termination (LS 46)', url: 'https://forms.labor.ny.gov/WP/LS46.pdf' },
      { label: 'NYSDOL: How to keep your UI costs down (IA 318), separation notices', url: 'https://dol.ny.gov/how-keep-your-unemployment-insurance-costs-down-ia-31860' },
      { label: 'NYSDOL: Worker Adjustment and Retraining Notification (WARN)', url: 'https://dol.ny.gov/worker-adjustment-and-retraining-notification-warn' },
      { label: 'NY DFS: COBRA frequently asked questions', url: 'https://www.dfs.ny.gov/consumers/health_insurance/cobra_faqs' },
      { label: 'NY DFS: State continuation coverage extension to 36 months', url: 'https://www.dfs.ny.gov/consumers/health_insurance/cobra_coverage_extension_36_Months' },
      { label: 'N.Y. Executive Law 292 (Human Rights Law definitions)', url: 'https://www.nysenate.gov/legislation/laws/EXC/292' },
      { label: 'DOL EBSA: An employer\'s guide to group health continuation coverage under COBRA', url: 'https://www.dol.gov/sites/dolgov/files/ebsa/about-ebsa/our-activities/resource-center/publications/an-employers-guide-to-group-health-continuation-coverage-under-cobra.pdf' },
      { label: 'EEOC: Small business information (coverage thresholds)', url: 'https://www.eeoc.gov/publications/get-facts-series-small-business-information' },
    ],
    related: [
      '/hr-by-state/new-york',
      '/guides/how-to-fire-an-employee',
      '/guides/final-paycheck-laws',
      '/guides/when-do-you-need-to-offer-cobra',
      '/guides/warn-act-layoffs',
      '/guides/employee-offboarding-checklist',
    ],
  },

  // ── 4. Texas ─────────────────────────────────────────────────────────────
  {
    slug: 'firing-an-employee-in-texas',
    category: 'Offboarding',
    title: 'Firing an employee in Texas: what the law requires',
    metaTitle: 'Firing an Employee in Texas: Final Pay and the Rules | MambaHR',
    metaDescription:
      'In Texas, a fired employee gets final pay within 6 calendar days; one who quits is paid next payday. Vacation is owed only if a written policy says so.',
    answer:
      'In Texas, a fired employee must receive final pay within six calendar days of discharge, and an employee who quits is paid on the next regularly scheduled payday (Texas Payday Law). Unused vacation is owed only if a written policy or agreement promises it, and Texas law does not require advance or written notice of a termination.',
    sections: [
      {
        heading: 'Employment at will, and where it stops',
        blocks: [
          {
            type: 'p',
            text: 'Texas follows employment at will. The Texas Workforce Commission (TWC) explains that, without an express agreement to the contrary, either side can end the relationship or change its terms at any time, for any reason, with or without notice. The exceptions are what get employers in trouble:',
          },
          {
            type: 'list',
            items: [
              'Discrimination laws, federal and state (see below).',
              'Retaliation for protected activity, such as filing a workers\' compensation claim, reporting suspected wrongdoing to government authorities, serving on a jury, voting, military service, or union activity.',
              'The public policy exception: you cannot fire someone for refusing to commit an illegal act.',
              'Contracts: a discharge that breaks an express employment agreement is wrongful.',
            ],
          },
        ],
      },
      {
        heading: 'Final pay deadlines under the Texas Payday Law',
        blocks: [
          {
            type: 'table',
            caption: 'Texas final pay deadlines',
            columns: ['How the job ends', 'Final pay is due'],
            rows: [
              ['Laid off, discharged, fired or otherwise involuntarily separated', 'Within 6 calendar days of discharge'],
              ['Quits, retires or resigns', 'On the next regularly scheduled payday after the resignation takes effect'],
            ],
          },
          {
            type: 'p',
            text: 'Six calendar days counts weekends and holidays, so a Friday firing can mean a payment due the following Thursday, before your next payroll runs. TWC is direct about one common mistake: it is not legal to hold a final paycheck past the deadline because company property was not returned, timesheets were not signed, or similar problems. If you want a way to recover the cost of unreturned equipment, set it up in advance with a signed written agreement, not by holding the check.',
          },
        ],
      },
      {
        heading: 'Vacation, sick leave and severance',
        blocks: [
          {
            type: 'p',
            text: 'Texas does not require you to pay out unused leave. Under the Payday Law, a payout of accrued leave is owed only if you promised it in a written policy or agreement, and the wording of that policy controls. When a written policy does promise a payout, the money is part of final pay and is due by the same deadline as the wages. Severance works the same way: it is owed only if a written policy promises it. Payments made in exchange for a release of claims are not severance under the Payday Law.',
          },
          {
            type: 'list',
            items: [
              'Write down what happens to unused vacation at separation, and whether quitting and firing are treated differently.',
              'Apply the policy the same way every time.',
              'If you offer severance for a release from a worker who is 40 or older, follow the federal 21-day and 7-day rules in [severance agreements](/guides/severance-agreements).',
            ],
          },
        ],
      },
      {
        heading: 'Discrimination rules in Texas',
        blocks: [
          {
            type: 'p',
            text: 'Chapter 21 of the Texas Labor Code, the state anti-discrimination law, applies to employers with 15 or more employees for each working day in each of 20 or more calendar weeks. For sexual harassment, the threshold drops to one employee. Federal law also applies: Title VII and the ADA at 15 employees, and the Age Discrimination in Employment Act at 20.',
          },
        ],
      },
      {
        heading: 'Health coverage: COBRA and Texas state continuation',
        blocks: [
          {
            type: 'list',
            items: [
              'Federal COBRA applies if you had 20 or more employees on more than half of your typical business days last year. Notify the plan within 30 days of the termination.',
              'Texas state continuation applies to group plans issued by insurance companies and HMOs regulated by Texas. It does not apply to self-funded plans.',
              'If the employee is not eligible for COBRA, state continuation can last up to 9 months. If they had COBRA, Texas adds up to 6 more months after COBRA ends.',
              'The employee must have been covered for the three months before the job ended. The Texas Department of Insurance notes that state continuation is usually not available to someone who was fired.',
              'The Texas Department of Insurance tells employees that the employer must tell them about continuation of coverage within 30 days from the date the job ended.',
            ],
          },
        ],
      },
      {
        heading: 'Notice, unemployment and layoffs',
        blocks: [
          {
            type: 'p',
            text: 'Texas law does not require advance notice of a termination, and it does not require written notice of a termination or layoff. TWC still recommends a short, clear written notice of separation, because it prevents later disputes about whether the person knew they were let go and what they are owed. Larger layoffs can trigger the federal WARN Act, which applies to employers with 100 or more employees (not counting part-time workers) and requires at least 60 days\' notice; TWC is the state agency that receives WARN notices in Texas. See [WARN Act layoffs](/guides/warn-act-layoffs) and the [Texas HR guide](/hr-by-state/texas).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Is the Texas 6-day deadline business days or calendar days?',
        a: 'Calendar days. TWC says final pay for an involuntary separation is due within six calendar days of discharge.',
      },
      {
        q: 'Do I have to pay out vacation when I fire someone in Texas?',
        a: 'Only if your written policy or agreement promises a payout. If it does, the payout is due with the rest of final pay.',
      },
      {
        q: 'Can I keep the last paycheck until equipment is returned?',
        a: 'No. TWC says holding final pay past the deadline for unreturned property is not legal.',
      },
    ],
    mambahr:
      'For a Texas termination, MambaHR works out the six-day final pay deadline and amount for a person to approve, drafts the separation paperwork, prepares the COBRA continuation notices, and removes system access. A person makes every termination decision, and every change is logged.',
    sources: [
      { label: 'TWC Texas Guidebook for Employers: Final pay', url: 'https://efte.twc.texas.gov/final_pay.html' },
      { label: 'TWC Texas Guidebook for Employers: Accrued leave payouts', url: 'https://efte.twc.texas.gov/accrued_leave_payouts.html' },
      { label: 'TWC Texas Guidebook for Employers: Final pay, severance benefits', url: 'https://efte.twc.texas.gov/final_pay_severance_benefits.html' },
      { label: 'TWC Texas Guidebook for Employers: Wrongful discharge', url: 'https://efte.twc.texas.gov/wrongful_discharge.html' },
      { label: 'TWC Texas Guidebook for Employers: Work separations, general', url: 'https://efte.twc.texas.gov/work_separations_general.html' },
      { label: 'TWC Texas Guidebook for Employers: Thresholds for coverage', url: 'https://efte.twc.texas.gov/thresholds_for_coverage.html' },
      { label: 'TWC Texas Guidebook for Employers: Special problems in work separations (WARN)', url: 'https://efte.twc.texas.gov/special_problems_work_separations.html' },
      { label: 'Texas Department of Insurance: Health care coverage guide', url: 'https://www.tdi.texas.gov/pubs/consumer/cb005.html' },
      { label: 'DOL EBSA: An employer\'s guide to group health continuation coverage under COBRA', url: 'https://www.dol.gov/sites/dolgov/files/ebsa/about-ebsa/our-activities/resource-center/publications/an-employers-guide-to-group-health-continuation-coverage-under-cobra.pdf' },
      { label: 'EEOC: Small business information (coverage thresholds)', url: 'https://www.eeoc.gov/publications/get-facts-series-small-business-information' },
    ],
    related: [
      '/hr-by-state/texas',
      '/guides/how-to-fire-an-employee',
      '/guides/final-paycheck-laws',
      '/guides/unused-pto-payout',
      '/guides/when-do-you-need-to-offer-cobra',
      '/guides/employee-offboarding-checklist',
    ],
  },
]
