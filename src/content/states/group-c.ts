import type { StateGuide } from '../guides/types'

// State pages, group C: Washington and Colorado.
// Every legal fact below was checked against the official page listed in the
// record's `sources` on 2026-10-02. Figures marked 2026 or 2027 are the ones
// the state agency publishes for that year.

export const statesGroupC: StateGuide[] = [
  // ── Washington ──────────────────────────────────────────────────────────
  {
    slug: 'washington',
    name: 'Washington',
    abbr: 'WA',
    metaTitle: 'Washington HR Laws for Small Employers (2026) | MambaHR',
    metaDescription:
      "Washington's 2026 rules: pay ranges in job posts at 15+ employees, paid sick leave for every hourly worker, 1.13% paid leave premiums, final pay by next payday.",
    answer:
      "Washington requires paid sick leave of 1 hour for every 40 hours worked, state Paid Family and Medical Leave premiums of 1.13% of wages in 2026, and a wage range plus a benefits description in every job posting once you have 15 or more employees. Final pay is due by the next regular payday whether the employee quits or is fired, and an overtime-exempt employee must earn at least $1,541.70 a week in 2026.",
    keyFacts: {
      payTransparency:
        'Employers with 15 or more employees must show the wage scale or salary range and a general description of benefits and other pay in every job posting, including postings placed by a recruiter or job board.',
      newHireReporting:
        "Report new and rehired employees to the Division of Child Support (DCS) within 20 days of the start date.",
      paidSickLeave:
        'At least 1 hour for every 40 hours worked, from the first day, for non-exempt employees. Usable after 90 days, and up to 40 unused hours carry over.',
      familyLeave:
        "State Paid Family and Medical Leave (PFML). The 2026 premium is 1.13% of wages; employees can be charged up to 71.43% of it, and employers with 50 or more employees pay the rest.",
      finalPayFired: 'On or before the next regularly scheduled payday.',
      finalPayQuit: 'On or before the next regularly scheduled payday, the same as a firing.',
      vacationPayout:
        'Not required by state law. Payout follows your written policy or agreement.',
    },
    sections: [
      {
        heading: 'Hiring in Washington',
        blocks: [
          {
            type: 'p',
            text: "Pay ranges in job posts. Once you have 15 or more employees, every posting for a job opening must include the wage scale or salary range (or the fixed wage, if there is only one) and a general description of all the benefits and other compensation the person will get. A posting is any solicitation for a specific open position that lists qualifications, whether you post it yourself or a third party posts it for you. When a current employee is offered a transfer or promotion, you must give the range for the new role if they ask. Applicants can recover $100 to $5,000 per violation. For postings from July 27, 2025 through July 27, 2027, you get a chance to fix a posting: if you correct it within five business days of a written notice (and ask any third-party site to correct it too), no penalty applies. See [pay transparency in job posts](/guides/pay-transparency-job-posts).",
          },
          {
            type: 'p',
            text: 'Criminal history (Fair Chance Act). You cannot ask about or check criminal records until you have decided the applicant is otherwise qualified, and job ads cannot say "no felons" or similar. The 2025 amendments, which apply to employers with 15 or more employees from July 1, 2026 and to smaller employers from January 1, 2027, add more: the check must also wait until you make an offer conditioned on the record, and before rejecting someone because of an adult conviction you need a legitimate business reason, must tell them which record you are relying on, hold the job open for at least two business days so they can explain, and then give a written decision.',
          },
          {
            type: 'list',
            items: [
              'New-hire report: send it to DCS within 20 days of the start date. Rehires count if they were gone for at least 60 consecutive days. Report online through DCS Online (in Secure Access Washington), or by fax, mail or phone. Late reports can cost $25 per employee per month. See [new-hire reporting](/guides/new-hire-reporting).',
              'Paid sick leave notice: give each new employee a one-time written notice (paper or electronic) of their right to paid sick leave, how much they earn, when they can use it, and that retaliation is prohibited. After that, a statement at least monthly of hours earned, used and available. Pay stubs can serve as the monthly statement.',
              'Paid Family and Medical Leave: decide whether to withhold the employee share of the premium from pay. Premiums you do not withhold cannot be collected from the employee in later pay periods.',
              'Workers\' compensation: new hires are covered through your account with the Department of Labor and Industries (L&I), unless you are self-insured (see below).',
            ],
          },
          {
            type: 'p',
            text: "Noncompetes. Through June 29, 2027, a noncompete with an employee is void unless the employee's annualized earnings exceed the yearly threshold ($126,858.83 in 2026; $317,147.09 for independent contractors), the terms were disclosed in writing no later than when the offer was accepted, and, if signed after the start date, the employee received something extra for it. A noncompete longer than 18 months is presumed unreasonable. A 2026 law goes further: from June 30, 2027, every noncompete in Washington is void no matter when it was signed, offering or threatening one becomes a violation, and by October 1, 2027 you must make reasonable efforts to tell current and former employees and contractors whose noncompetes are still running that they are void. Nonsolicitation and confidentiality agreements are not noncompetes under the law.",
          },
        ],
      },
      {
        heading: 'Leave: sick leave and Paid Family and Medical Leave',
        blocks: [
          {
            type: 'p',
            text: "Paid sick leave covers employers of every size. Non-exempt employees earn at least 1 hour for every 40 hours worked, starting on the first day, and can use it after 90 calendar days. Up to 40 unused hours carry over to the next year. Employees who are properly classified as exempt executive, administrative or professional employees, and outside salespeople, are excluded from the sick leave law, which matters for many salaried tech roles. Leave covers the employee's or a family member's illness or preventive care, a health-related closure of the workplace or a child's school, domestic violence leave reasons, and (since July 27, 2025) preparing for or attending an immigration proceeding. You can ask for verification only for absences longer than three workdays. See [paid sick leave laws](/guides/paid-sick-leave-laws).",
          },
          {
            type: 'table',
            caption: 'Washington Paid Family and Medical Leave in 2026',
            columns: ['Item', '2026 rule'],
            rows: [
              ['Premium', '1.13% of gross wages (not tips), up to the Social Security wage cap ($184,500 in 2026)'],
              ['Employee share', 'Up to 71.43% of the premium may be withheld from pay, or you can pay it for them'],
              ['Employer share', 'Paid by employers with 50 or more employees; employers with fewer than 50 do not owe it'],
              ['Benefit', 'Up to 90% of weekly pay, capped at $1,647 a week for 2026'],
              ['Length', 'Up to 12 weeks of family or medical leave, 16 weeks combined, 18 weeks with a pregnancy complication'],
              ['Who qualifies', 'Workers with 820 hours in their qualifying period'],
              ['Your duties', 'Display the poster, file a quarterly report and premiums (even with no payroll), and send the state notice within 5 business days of learning an employee had a qualifying event'],
            ],
          },
          {
            type: 'p',
            text: 'Job protection under PFML is expanding. From January 1, 2026, an employee who has worked for you at least 180 calendar days is entitled to return to the same or an equivalent job if you have 25 or more employees. The threshold drops to 15 employees in 2027 and to 8 employees in 2028. When job protection applies, you must keep their health coverage the same as if they were working (they keep paying their usual share of the premium), and once they have been on leave for 14 days you must tell them in writing when job protection ends and when they are due back. Federal Family and Medical Leave Act (FMLA) leave can count against the PFML job-protected time. See [paid family leave by state](/guides/paid-family-leave-states).',
          },
          {
            type: 'p',
            text: 'Washington also collects WA Cares long-term care premiums through the same quarterly report. Employees pay all of it: 0.58% of wages in 2026, with no wage cap. Employees with an approved exemption must notify you, and you then stop withholding it.',
          },
        ],
      },
      {
        heading: 'Final pay',
        blocks: [
          {
            type: 'p',
            text: 'The statute (RCW 49.48.010) says wages owed to an employee who stops working, whether by discharge or by quitting, are due at the end of the established pay period. L&I tells employers the final paycheck must be paid on or before the next regularly scheduled payday. There is no faster deadline for a firing. You cannot hold back a final check because keys, a laptop or other equipment were not returned, and deductions from final pay follow specific rules. See [final paycheck laws](/guides/final-paycheck-laws).',
          },
          {
            type: 'list',
            items: [
              'Vacation and other paid time off: L&I treats vacation, personal holidays and severance as voluntary benefits. Washington law does not require you to pay out unused vacation; your written policy or agreement decides. See [unused PTO payout](/guides/unused-pto-payout).',
              'Paid sick leave: cashing out the balance at separation is generally not required. If you rehire the person within 12 months, you must restore any balance you did not pay out.',
            ],
          },
        ],
      },
      {
        heading: 'Minimum wage, overtime and exempt salaries',
        blocks: [
          {
            type: 'table',
            caption: 'Washington pay floors set by L&I',
            columns: ['Rule', '2026', '2027 (from January 1)'],
            rows: [
              ['State minimum wage', '$17.13 an hour', '$17.73 an hour'],
              ['Exempt salary, employers with 1 to 50 employees', '$1,541.70 a week ($80,168.40 a year)', '$1,595.70 a week'],
              ['Exempt salary, employers with 51 or more employees', '$1,541.70 a week', '$1,773 a week'],
                          ],
          },
          {
            type: 'p',
            text: "Overtime is 1.5 times the regular rate for hours over 40 in a 7-day workweek, for employers of every size. Washington has no daily overtime rule for most jobs, and employees cannot waive overtime. Being salaried is not enough for an exemption: the employee must also meet the job duties test and the salary floor above. In 2026, exempt computer professionals may instead be paid hourly at no less than $59.96 an hour. L&I's 2027 rules also replace the state's two duties tests with one that is closer to the federal test. Several cities, including Seattle, set a higher minimum wage than the state. See [exempt vs non-exempt](/guides/exempt-vs-non-exempt) and [overtime rules](/guides/overtime-rules).",
          },
        ],
      },
      {
        heading: 'Other things to know',
        blocks: [
          {
            type: 'list',
            items: [
              'Discrimination: the Washington Law Against Discrimination covers employers with 8 or more employees, a lower bar than the federal 15. See [HR laws by company size](/guides/hr-laws-by-company-size).',
              'Layoffs: Washington has its own WARN law (RCW 49.45, effective July 27, 2025). Employers with 50 or more employees in the state, not counting part-time employees, must give 60 days\' written notice to the Employment Security Department (ESD) and affected employees (or their union) before a business closing or a mass layoff affecting 50 or more employees. ESD\'s guidance also asks for notice to the local chief elected official. See [WARN Act layoffs](/guides/warn-act-layoffs).',
              'Workers\' compensation: you must buy coverage through L&I\'s State Fund, or be approved by L&I to self-insure. See [workers\' compensation requirements](/guides/workers-compensation-requirements).',
              'Posters: L&I requires three free posters (Job Safety and Health Law, Your Rights as a Worker, and Notice to Employees about job injuries) plus the federal posters and the PFML poster. For remote employees, mail them a set or email them a link to the posters, and keep a note of what you sent and when. See [labor law posters](/guides/labor-law-posters).',
              'Unemployment information at separation: state law requires you to post ESD\'s unemployment notice and to make that information available to employees when they become unemployed.',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Do I need a salary range in Washington job posts if I have fewer than 15 employees?',
        a: 'No. The posting requirement in RCW 49.58.110 applies to employers with 15 or more employees. Once you reach 15, every posting needs the wage scale or salary range and a general description of benefits.',
      },
      {
        q: 'Do salaried software engineers get Washington paid sick leave?',
        a: 'Only if they are non-exempt. Employees properly classified as exempt executive, administrative or professional employees are excluded from the paid sick leave law, but in 2026 an exempt employee must earn at least $1,541.70 a week and meet the duties test.',
      },
      {
        q: 'Can a Washington employer still use noncompete agreements?',
        a: 'Until June 29, 2027, only for employees earning more than the yearly threshold ($126,858.83 in 2026) and only with proper written disclosure. From June 30, 2027, all noncompetes are void, and employers must try to notify affected current and former workers by October 1, 2027.',
      },
      {
        q: 'Does Washington Paid Family and Medical Leave protect my employee\'s job?',
        a: 'In 2026, yes, if you have 25 or more employees and the employee has worked for you at least 180 days. The employer size drops to 15 in 2027 and 8 in 2028.',
      },
    ],
    mambahr:
      "MambaHR keeps your employee records and hiring pipeline and does the HR admin itself, with a person approving the decisions that matter. Job posts go out with pay ranges, leave requests are checked against federal FMLA eligibility with Washington's Paid Family and Medical Leave program cited for a person to decide how they combine, and at an exit MambaHR removes system access and works out final pay under Washington's rules for a person to approve.",
    sources: [
      { label: 'Washington Legislature: RCW 49.58.110, pay ranges in job postings', url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=49.58.110' },
      { label: 'Washington Legislature: RCW 49.94, Fair Chance Act', url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=49.94&full=true' },
      { label: 'Washington Legislature: RCW 49.62, noncompetition covenants', url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=49.62&full=true' },
      { label: 'Washington Legislature: RCW 26.23.040, new-hire reporting', url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=26.23.040' },
      { label: 'DSHS Division of Child Support: New Hire Reporting', url: 'https://www.dshs.wa.gov/family-food-and-housing-services/child-support/employer-resources/new-hire-reporting' },
      { label: 'L&I: Paid Sick Leave', url: 'https://www.lni.wa.gov/workers-rights/leave/paid-sick-leave/' },
      { label: 'L&I: Paid sick leave minimum requirements', url: 'https://www.lni.wa.gov/workers-rights/leave/paid-sick-leave/paid-sick-leave-minimum-requirements' },
      { label: 'Paid Leave (ESD): Small businesses and premiums', url: 'https://paidleave.wa.gov/small-businesses/' },
      { label: 'Paid Leave (ESD): Employer roles and responsibilities', url: 'https://paidleave.wa.gov/employer-roles-responsibilities/' },
      { label: 'Paid Leave (ESD): How Paid Leave works', url: 'https://paidleave.wa.gov/find-out-how-paid-leave-works/' },
      { label: 'Paid Leave (ESD): Job protection', url: 'https://paidleave.wa.gov/job-protection/' },
      { label: 'Paid Leave (ESD): Employer Wage Reporting and Premiums Toolkit (June 2026)', url: 'https://paidleave.wa.gov/app/uploads/2021/12/Employer-Wage-Reporting-and-Premiums-Toolkit-v25.1-2026.06.26.pdf' },
      { label: 'Washington Legislature: RCW 49.48.010, final wages', url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=49.48.010' },
      { label: 'L&I: Getting paid (final paychecks)', url: 'https://www.lni.wa.gov/workers-rights/wages/getting-paid/' },
      { label: 'L&I: Minimum wage', url: 'https://www.lni.wa.gov/workers-rights/wages/minimum-wage/' },
      { label: "L&I: Washington's minimum wage going up to $17.13 an hour in 2026", url: 'https://lni.wa.gov/news-events/article/25-27/' },
      { label: "L&I: Changes made to Washington's overtime rules", url: 'https://lni.wa.gov/workers-rights/wages/overtime/changes-to-overtime-rules' },
      { label: 'L&I: Overtime and exemptions', url: 'https://www.lni.wa.gov/workers-rights/wages/overtime/index' },
      { label: 'Washington Legislature: RCW 49.60.040, definition of employer', url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=49.60.040' },
      { label: 'Washington Legislature: RCW 49.45, mass layoffs and business closings', url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=49.45&full=true' },
      { label: 'ESD: WARN requirements', url: 'https://esd.wa.gov/employer-requirements/layoffs-and-employee-notifications/warn-requirements' },
      { label: "L&I: Workers' compensation overview", url: 'https://www.lni.wa.gov/agency/_docs/DWWworkerscompensationoverview.pdf' },
      { label: 'L&I: Required workplace posters', url: 'https://lni.wa.gov/forms-publications/required-workplace-posters' },
      { label: 'Washington Legislature: RCW 50.20.140, unemployment notices', url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=50.20.140' },
    ],
    related: [
      '/guides/pay-transparency-job-posts',
      '/guides/paid-family-leave-states',
      '/guides/final-paycheck-laws',
      '/guides/exempt-vs-non-exempt',
      '/guides/warn-act-layoffs',
      '/hr-by-state/colorado',
    ],
  },

  // ── Colorado ────────────────────────────────────────────────────────────
  {
    slug: 'colorado',
    name: 'Colorado',
    abbr: 'CO',
    metaTitle: 'Colorado HR Laws for Small Employers (2026) | MambaHR',
    metaDescription:
      'Colorado rules apply from one employee: pay range and deadline in job posts, 48 hours of paid sick leave, 0.88% FAMLI premiums, and vacation payout at exit.',
    answer:
      "Colorado's main HR rules apply from your first employee: every job posting must show the pay range, a benefits description and an application deadline, everyone earns paid sick leave (1 hour per 30 hours worked, up to 48 hours a year), and FAMLI paid leave premiums are 0.88% of wages in 2026. Fired employees must be paid immediately, and all earned, unused vacation must be paid out when anyone leaves.",
    keyFacts: {
      payTransparency:
        'Every employer with at least one Colorado employee must list the pay or pay range, a general description of benefits, and how and by when to apply in each posting, and must tell current employees about openings.',
      newHireReporting:
        'Report to the Colorado State Directory of New Hires within 20 calendar days of hire, or by the first scheduled payroll after that if it falls later.',
      paidSickLeave:
        'Healthy Families and Workplaces Act (HFWA): 1 hour for every 30 hours worked, up to 48 hours a year, for all employees of every employer.',
      familyLeave:
        'FAMLI: the 2026 premium is 0.88% of wages, split 0.44% employer and 0.44% employee. Employers with 9 or fewer employees send in only the 0.44% employee share. Up to 12 weeks of paid leave.',
      finalPayFired:
        'Immediately. If the payroll office is closed, within 6 hours of the start of its next workday, or 24 hours if payroll is handled off-site.',
      finalPayQuit: 'By the next regular payday.',
      vacationPayout:
        'Required. All earned, unused vacation must be paid at separation, and any policy that forfeits it is void.',
    },
    sections: [
      {
        heading: 'Hiring in Colorado',
        blocks: [
          {
            type: 'p',
            text: "Colorado's Equal Pay for Equal Work Act covers every employer with at least one employee in Colorado. Its transparency rules apply to internal and public postings alike, and to remote jobs that could be done from Colorado, even if the post says Coloradans will not be considered. Postings for jobs done entirely outside the state are excluded. See [pay transparency in job posts](/guides/pay-transparency-job-posts).",
          },
          {
            type: 'table',
            caption: 'What every Colorado job posting must include',
            columns: ['Item', 'What the Division of Labor Standards and Statistics expects'],
            rows: [
              ['Pay', 'The rate or a range you honestly believe you may pay, and whether it is hourly or salary. No open-ended ranges like "$30,000 and up".'],
              ['Benefits', 'A general description of health care, retirement, paid time off and any tax-reportable benefits. Small perks can be left out.'],
              ['How to apply', 'Instructions for applying.'],
              ['Application deadline', 'A good-faith estimate of when applications close. "Open until filled" does not count. You may extend it if you update the post.'],
            ],
          },
          {
            type: 'list',
            items: [
              'Tell current employees about openings: make reasonable efforts to announce each job opportunity to all employees on the same day and before you choose someone. Within 30 days of filling it, tell the people the new hire will work with regularly who got the job and how to express interest in similar roles. Some regular, metric-based promotions are exempt if you disclose them.',
              'No wage history: you cannot ask applicants for their pay history or rely on it to set pay.',
              'Criminal history (Chance to Compete Act): employers of every size cannot ask about criminal history on an initial application or say in a posting that people with records cannot apply. A background check after a conditional offer is allowed. See [employee background checks](/guides/employee-background-checks).',
              'Age: you cannot ask an applicant\'s age or dates of schooling, and must tell applicants they may redact age information from items such as transcripts.',
              'New-hire report: report each new hire, and anyone returning after 60 consecutive days away, to the State Directory of New Hires within 20 calendar days. Colorado Child Support Services also asks you to report independent contractors who give you a Social Security number. See [new-hire reporting](/guides/new-hire-reporting).',
            ],
          },
          {
            type: 'p',
            text: "Noncompetes. Colorado voids most noncompetes. One is allowed only for a worker who earns at least the state's highly compensated threshold ($130,014 a year in 2026) when the agreement is signed and when it is enforced, and only if it protects trade secrets and is no broader than needed. Customer nonsolicitation agreements need pay of at least 60% of that threshold ($78,008.40 in 2026). Even then, the employer must give a separate, signed notice of the noncompete before the candidate accepts the offer (or at least 14 days ahead for a current employee). Presenting a void noncompete can cost $5,000 per worker plus damages. Other exceptions exist, including rules for health care providers.",
          },
        ],
      },
      {
        heading: 'Leave: paid sick leave and FAMLI',
        blocks: [
          {
            type: 'p',
            text: "Paid sick leave under HFWA applies to every employer and nearly every employee, including part-time and temporary staff. Employees earn 1 hour for every 30 hours worked, up to 48 hours a year, starting on day one. Overtime-exempt employees accrue as if they work 40 hours a week, even if they work more. Up to 48 unused hours roll over, but you do not have to allow more than 48 hours of use in a year. Leave covers the employee's or a family member's illness, injury or preventive care, needs related to domestic abuse or sexual assault, a public-health closure of the workplace or a child's school, bereavement, and evacuation or care needs after unexpected events such as power loss. You can ask for documentation only for absences of four or more consecutive days. During a declared public health emergency, employees also get extra paid leave (up to 80 hours for full-time employees); no such emergency is in effect now. See [paid sick leave laws](/guides/paid-sick-leave-laws).",
          },
          {
            type: 'table',
            caption: 'Colorado Family and Medical Leave Insurance (FAMLI) in 2026',
            columns: ['Item', '2026 rule'],
            rows: [
              ['Premium', '0.88% of wages, up to the Social Security wage cap ($184,500 in 2026)'],
              ['10 or more employees (counted nationwide)', 'Send in the full 0.88%; you may deduct up to half (0.44%) from pay'],
              ['9 or fewer employees', 'Send in 0.44% of wages (the employee share); no employer share owed'],
              ['Benefit', '90% of weekly wages up to half the state average weekly wage, 50% above that, capped at $1,448.02 a week (based on the 2026 to 2027 state average wage)'],
              ['Length', 'Up to 12 weeks, plus 4 weeks for pregnancy or childbirth complications, plus up to 12 weeks of neonatal care leave'],
              ['Job protection', 'Employees who have worked for you at least 180 days get their job or an equivalent one back'],
              ['Your duties', 'Register, file wage reports and pay premiums each quarter, update your headcount by February 28, and give employees the Required Program Notice'],
            ],
          },
          {
            type: 'p',
            text: 'You cannot require employees to use accrued vacation or sick leave before or during FAMLI leave, though you and the employee can agree to use it to top up their pay. The federal Family and Medical Leave Act (FMLA) still applies separately if it covers you. See [paid family leave by state](/guides/paid-family-leave-states) and [how to handle an FMLA request](/guides/how-to-handle-an-fmla-request).',
          },
        ],
      },
      {
        heading: 'Final pay and vacation payout',
        blocks: [
          {
            type: 'table',
            caption: 'When final wages are due in Colorado',
            columns: ['Situation', 'Deadline'],
            rows: [
              ['You fire or lay off the employee', 'Immediately'],
              ['Your payroll unit is not open at the time', 'Within 6 hours after the start of its next regular workday'],
              ['Your payroll unit is off-site', 'Within 24 hours after the start of its next regular workday'],
              ['The employee quits', 'By the next regular payday'],
            ],
          },
          {
            type: 'p',
            text: 'When payroll is closed or off-site, the pay can go to the worksite, your local office, or the employee\'s last known mailing address. You may take up to 10 days to check that money or property entrusted to the employee was returned, with written-notice rules for any deduction. If an employee or the Division sends a written demand, you have 14 days to pay before penalties apply. See [final paycheck laws](/guides/final-paycheck-laws).',
          },
          {
            type: 'p',
            text: "Vacation is wages in Colorado. You do not have to offer paid vacation, but once an employee earns it, you must pay all of it at separation, whether they were fired or quit with or without notice. The Colorado Supreme Court (Nieto v. Clark's Market, 2021) held that policies forfeiting earned vacation are void. This covers any paid time off the employee can use for any reason, such as a combined PTO bank. Leave usable only for specific needs, like HFWA sick leave or holidays, is not vacation pay. You may cap how much vacation can build up. See [unused PTO payout](/guides/unused-pto-payout).",
          },
        ],
      },
      {
        heading: 'Minimum wage, overtime and exempt salaries',
        blocks: [
          {
            type: 'table',
            caption: 'Colorado pay floors for 2026 (COMPS and PAY CALC Orders)',
            columns: ['Rule', '2026 amount'],
            rows: [
              ['State minimum wage', '$15.16 an hour ($12.14 for tipped employees)'],
              ['Salary for executive, administrative or professional exemption', '$57,784 a year ($1,111.23 a week)'],
              ['Highly technical computer employees', '$34.85 an hour'],
              ['Highly compensated employee exemption', '$130,014 a year'],
            ],
          },
          {
            type: 'p',
            text: 'Overtime is 1.5 times the regular rate for hours over 40 in a week, over 12 in a day, or over 12 consecutive hours, whichever pays more. You cannot average hours across weeks or give comp time instead. A salary alone does not make someone exempt; the job duties must qualify too. Some cities have a higher minimum wage (Denver\'s is $19.29 in 2026). You must display the current COMPS Order poster, and if you hand out a handbook, include the COMPS Order or poster with it and, if employees sign the handbook, have them sign an acknowledgment of it. See [overtime rules](/guides/overtime-rules).',
          },
        ],
      },
      {
        heading: 'Other things to know',
        blocks: [
          {
            type: 'list',
            items: [
              'Discrimination: the Colorado Anti-Discrimination Act covers any employee working in Colorado, so there is no minimum company size. Complaints must be filed within 300 days. See [HR laws by company size](/guides/hr-laws-by-company-size).',
              'Separation notice: at every separation, including quits, you must give the employee the state\'s Notice of Potential Availability of Unemployment Insurance Benefits, on paper or electronically, with their dates of work, earnings and the reason for separation. See [the offboarding checklist](/guides/employee-offboarding-checklist).',
              'Workers\' compensation: required once you have one employee, part-time or full-time. Buy a policy from a commercial carrier or qualify to self-insure; Pinnacol Assurance must offer coverage to any Colorado employer. Report injuries to your carrier within 10 days. See [workers\' compensation requirements](/guides/workers-compensation-requirements).',
              'Posters and notices: the COMPS Order poster, the Colorado Workplace Public Health Rights Poster (which covers HFWA sick leave and doubles as the required written notice), a notice of regular paydays, the Colorado Civil Rights Division employment notice, and the FAMLI Required Program Notice. For remote employees, send the public health rights poster within their first month. See [labor law posters](/guides/labor-law-posters).',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Do Colorado pay range rules apply to remote jobs?',
        a: 'Yes, if the job could be done from Colorado. A remote posting is covered even if it says Coloradans will not be considered. Only jobs that must be done entirely outside Colorado are excluded.',
      },
      {
        q: 'Can a Colorado job post say "open until filled"?',
        a: 'No. Each posting needs a good-faith estimate of the application deadline. You may extend it later if you update the posting. Roles you hire for continuously, such as to keep up with turnover, have no deadline to list.',
      },
      {
        q: 'Do I have to pay out unused PTO in Colorado?',
        a: 'Yes, if it is vacation or PTO the employee can use for any reason. Earned vacation must be paid at separation no matter why the person left. Leave usable only for sickness or holidays does not have to be paid out.',
      },
      {
        q: 'Do very small Colorado employers pay FAMLI premiums?',
        a: 'Employers with 9 or fewer employees do not owe the employer share, but must still register, file quarterly wage reports and send in the 0.44% employee share, which they may deduct from pay.',
      },
    ],
    mambahr:
      "MambaHR keeps your employee records and hiring pipeline and does the HR admin itself, with a person approving the decisions that matter. Job posts go out with pay ranges, and at an exit MambaHR removes system access, works out final pay (including earned vacation) under Colorado's rules for a person to approve, and drafts the separation paperwork.",
    sources: [
      { label: 'CDLE: Equal Pay for Equal Work Act', url: 'https://cdle.colorado.gov/dlss/labor-laws-by-topic/equal-pay-for-equal-work-act' },
      { label: 'CDLE INFO #9A: Transparency in pay and job opportunities', url: 'https://cdle.colorado.gov/sites/cdle/files/info_%239a_transparency_in_pay_and_job_opportunities_the_colorado_epewa_part_2_05.29.2024.pdf' },
      { label: 'CDLE INFO #9: Required and prohibited information in job postings and hiring', url: 'https://cdle.colorado.gov/sites/cdle/files/info_%239_hiring_%26_screening_laws_summary_4.8.2026.pdf' },
      { label: 'CDLE INFO #9C: Chance to Compete Act', url: 'https://cdle.colorado.gov/sites/cdle/files/info_%239c_chance_to_compete_act_4.8.2026.pdf' },
      { label: 'Colorado Child Support Services: New Hire Reporting', url: 'https://childsupport.colorado.gov/new-hire-reporting' },
      { label: 'Colorado General Assembly: HB22-1317 as signed (noncompetes)', url: 'https://leg.colorado.gov/bill_files/99201/download' },
      { label: 'CDLE INFO #6: Paid leave under HFWA', url: 'https://cdle.colorado.gov/sites/cdle/files/info_%236_hfwa_summary_%26_overview_07.19.23.pdf' },
      { label: 'CDLE INFO #6B: Paid sick leave under HFWA (Feb. 2026)', url: 'https://cdle.colorado.gov/sites/cdle/files/info_%236b_rights_and_obligations_under_hfwa_2.27.2026.pdf' },
      { label: 'FAMLI Division: Employers', url: 'https://famli.colorado.gov/employers' },
      { label: 'FAMLI Division: Premium and benefits calculator', url: 'https://famli.colorado.gov/individuals-and-families/how-famli-works/premium-and-benefits-calculator' },
      { label: 'FAMLI Division: Employer FAQs', url: 'https://famli.colorado.gov/employers/employer-faqs' },
      { label: 'FAMLI Division: Job protection and retaliation', url: 'https://famli.colorado.gov/individuals-and-families/get-help-from-famli/job-protection-and-retaliation' },
      { label: 'FAMLI Division: Toolkit and Required Program Notice', url: 'https://famli.colorado.gov/resources/famli-toolkit' },
      { label: 'CDLE INFO #3A: Timing of wage payments', url: 'https://cdle.colorado.gov/sites/cdle/files/info_%233a_timing_of_wage_payments%2C_%26_required_record-keeping_1.9.2026.pdf' },
      { label: 'CDLE INFO #3E: Payment of earned vacation upon separation', url: 'https://cdle.colorado.gov/sites/cdle/files/info_%233e_payment_of_earned_vacation_upon_separation_of_employment_05.29.24.pdf' },
      { label: 'CDLE INFO #1: 2026 COMPS and PAY CALC Orders', url: 'https://cdle.colorado.gov/sites/cdle/files/info_%231_2026_comps_%26_paycalc_orders_12.18.25.pdf' },
      { label: 'CDLE: 2026 Temporary PAY CALC Order', url: 'https://cdle.colorado.gov/sites/cdle/files/adopted_2026_temporary_pay_calc_order_7_ccr_1103-14_12.12.2025.pdf' },
      { label: 'Colorado Civil Rights Division: Discrimination', url: 'https://ccrd.colorado.gov/discrimination' },
      { label: 'Colorado Civil Rights Division: Anti-discrimination notices', url: 'https://ccrd.colorado.gov/anti-discrimination-notices' },
      { label: 'CDLE: Notice of Potential Availability of Unemployment Insurance Benefits (form)', url: 'https://cdle.colorado.gov/sites/cdle/files/documents/Employer-Separation-Form-22-234-fillable.pdf' },
      { label: "CDLE Division of Workers' Compensation: Employers", url: 'https://cdle.colorado.gov/dwc/employers' },
      { label: 'CDLE: Labor standards posters', url: 'https://cdle.colorado.gov/dlss/labor-laws-rules-resources/posters' },
    ],
    related: [
      '/guides/pay-transparency-job-posts',
      '/guides/unused-pto-payout',
      '/guides/final-paycheck-laws',
      '/guides/paid-family-leave-states',
      '/guides/overtime-rules',
      '/hr-by-state/washington',
    ],
  },
]
