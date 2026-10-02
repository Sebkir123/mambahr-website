import type { Guide } from './types'

// Leave guides. Every legal fact below was checked against the official source
// listed in the record's `sources` on 2026-10-02. Where a current rule could not
// be confirmed on an official page, it was left out rather than guessed.

export const leaveGuides: Guide[] = [
  // ── 1. FMLA request, step by step ──────────────────────────────────────────
  {
    slug: 'how-to-handle-an-fmla-request',
    category: 'Leave',
    title: 'How to handle an FMLA request, step by step',
    metaTitle: 'How to Handle an FMLA Request, Step by Step | MambaHR',
    metaDescription:
      'Covered employers must answer an FMLA request within 5 business days. The steps, forms and deadlines, from the first request to the return to work.',
    answer:
      'When an employee asks for leave that may qualify under the Family and Medical Leave Act (FMLA), a covered employer (50 or more employees in 20 or more workweeks this year or last) must send an eligibility notice and a rights and responsibilities notice within 5 business days, then a designation notice within 5 business days of having enough information to decide. Eligible employees get up to 12 workweeks of unpaid, job-protected leave in a 12-month period (26 workweeks for military caregiver leave), and their group health coverage continues on the same terms.',
    sections: [
      {
        heading: 'Step 1: Confirm the FMLA covers your company',
        blocks: [
          {
            type: 'p',
            text: 'A private employer is covered if it had 50 or more employees in 20 or more workweeks in the current or the previous calendar year. Public agencies and local educational agencies (schools) are covered too. If you are below that line, the federal FMLA does not apply to you at all.',
          },
          {
            type: 'p',
            text: 'Being under 50 does not always mean no job-protected leave. Some states set much lower thresholds. California, for example, gives job-protected family and medical leave at employers with 5 or more employees. See [which states have paid family and medical leave](/guides/paid-family-leave-states) and [maternity leave for small businesses](/guides/maternity-leave-small-business).',
          },
        ],
      },
      {
        heading: 'Step 2: Recognize the request and check eligibility',
        blocks: [
          {
            type: 'p',
            text: 'Employees do not have to say "FMLA" to be protected. They only have to give you enough information to see that the leave may qualify. Your 5-business-day clock starts when the employee asks or when you learn the leave may be for an FMLA reason. For leave they can plan, employees should give 30 days of notice when that is possible. For unexpected leave, they give notice as soon as possible and practical, usually through your normal call-in process.',
          },
          {
            type: 'p',
            text: 'The six qualifying reasons are:',
          },
          {
            type: 'list',
            items: [
              'The birth of a child and bonding with the child, within 12 months of the birth.',
              'Placement of a child for adoption or foster care, and bonding with that child.',
              "The employee's own serious health condition that makes them unable to do their job, including pregnancy-related incapacity and prenatal care.",
              'Caring for a spouse, child or parent with a serious health condition.',
              "A qualifying exigency caused by a spouse's, child's or parent's military deployment to a foreign country.",
              'Caring for a covered servicemember with a serious injury or illness (military caregiver leave, up to 26 workweeks).',
            ],
          },
          {
            type: 'table',
            caption: 'Employee eligibility (all three must be true)',
            columns: ['Requirement', 'What it means'],
            rows: [
              [
                '12 months with you',
                'The months do not have to be in a row. Time before a break in service of 7 years or more generally does not count, with exceptions such as military service.',
              ],
              ['1,250 hours', 'At least 1,250 hours worked in the 12 months right before the leave starts.'],
              [
                '50 employees within 75 miles',
                'You employ at least 50 people within 75 miles of their worksite. This count is taken when the employee gives notice of the need for leave.',
              ],
            ],
          },
          {
            type: 'p',
            text: 'The 12 months and 1,250 hours are measured as of the date the leave is to start, not the date the employee asks.',
          },
        ],
      },
      {
        heading: 'Step 3: Send the notices on time',
        blocks: [
          {
            type: 'p',
            text: 'The Department of Labor (DOL) publishes optional forms. You can use your own versions if they contain the same information.',
          },
          {
            type: 'table',
            caption: 'FMLA deadlines and forms',
            columns: ['What', 'Who', 'Deadline', 'DOL form'],
            rows: [
              ['General notice (poster plus handbook or new-hire materials)', 'Employer', 'Always posted; given at hire if there is no handbook', 'General notice poster'],
              ['Eligibility notice', 'Employer', 'Within 5 business days of the request, or of learning the leave may qualify', 'WH-381'],
              ['Rights and responsibilities notice', 'Employer', 'With the eligibility notice', 'WH-381'],
              ['Medical certification', 'Employee', 'Within 15 calendar days of your request', 'WH-380-E (own condition), WH-380-F (family member)'],
              ['Fix an incomplete certification', 'Employee', 'Within 7 calendar days of your written notice, in most cases', 'None'],
              ['Designation notice', 'Employer', 'Within 5 business days of having enough information, absent extenuating circumstances', 'WH-382'],
            ],
          },
          {
            type: 'p',
            text: 'The rights and responsibilities notice tells the employee how you count the 12-month period, whether certification is required, how paid leave is used, how they pay their share of health premiums, and their right to return to work. Missing a notice can count as interfering with FMLA rights, and an employer can be liable for lost pay, other losses, liquidated damages and equitable relief.',
          },
        ],
      },
      {
        heading: 'Step 4: Ask for medical certification if you need it',
        blocks: [
          {
            type: 'p',
            text: "You may require certification from a health care provider for leave for the employee's own serious health condition or a family member's. Medical certification does not apply to leave to bond with a new child. For military leave, the DOL forms are WH-384 (qualifying exigency), WH-385 (current servicemember) and WH-385-V (veteran).",
          },
          {
            type: 'list',
            items: [
              'Give the employee 15 calendar days to return it.',
              'If it is incomplete or unclear, say in writing what is missing. The employee then usually has 7 calendar days to fix it.',
              "The employee's direct supervisor may never contact the health care provider. HR or another designated official may, to authenticate or clarify the form.",
              'If you doubt it, you may get a second opinion, and a third if the first two disagree. You pay for them, including reasonable travel costs.',
              'Keep certifications and medical records in a confidential file, separate from the personnel file.',
            ],
          },
        ],
      },
      {
        heading: 'Step 5: Run the leave: pay, health coverage and intermittent time',
        blocks: [
          {
            type: 'list',
            items: [
              'FMLA leave is unpaid. You may let or require employees to use accrued paid leave at the same time. That time still counts as FMLA leave.',
              'Keep group health insurance on the same terms as if they were working. The employee keeps paying their normal share of the premium.',
              'Pick one way to measure the 12-month period (calendar year, a fixed year, forward from first leave, or rolling backward) and use it for everyone. If you never chose one, you must use whichever is most beneficial to the employee.',
              'When medically necessary, leave can be taken in separate blocks or as a reduced schedule. Bonding leave can be taken that way only if you agree.',
              'Count intermittent leave in the smallest unit your payroll uses for other leave, as long as that unit is not more than one hour.',
              'Spouses who both work for you share one combined 12 weeks for bonding leave.',
            ],
          },
        ],
      },
      {
        heading: 'Step 6: Restore the job and keep the records',
        blocks: [
          {
            type: 'p',
            text: 'When leave ends, the employee returns to the same job or an equivalent one: virtually identical pay, benefits and other terms, normally with the same schedule and work location. Give them any unconditional raises, such as cost of living increases, that happened while they were out. You may not retaliate against anyone for using FMLA leave, and FMLA absences cannot count against them in a disciplinary or attendance points system.',
          },
          {
            type: 'p',
            text: 'Keep FMLA records for at least 3 years: payroll and identifying data, the dates and hours of FMLA leave, copies of the notices both sides gave, your benefit and leave policies, premium payments, and any disputes about designating leave. For other records you need to keep, see [how long to keep employee records](/guides/how-long-to-keep-employee-records).',
          },
        ],
      },
      {
        heading: 'Common mistakes',
        blocks: [
          {
            type: 'list',
            items: [
              'Waiting for the employee to use the word "FMLA" before starting the 5-day clock.',
              'Never sending a designation notice, so weeks of leave are never counted against the 12.',
              'Counting heads company-wide for the 75-mile test, or forgetting it entirely for remote and multi-site teams.',
              'Letting a supervisor call the doctor.',
              'Stopping health coverage during the leave, or not telling the employee how to pay their share.',
              'Forgetting state leave that runs alongside the FMLA, such as a state paid leave program.',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Can we require employees to use their PTO during FMLA leave?',
        a: 'Yes. The FMLA lets an employer require (or allow) accrued paid leave to be used at the same time as FMLA leave. The time counts against the 12 weeks either way.',
      },
      {
        q: 'Does the FMLA apply if we have fewer than 50 employees?',
        a: 'No. Private employers are covered only with 50 or more employees in 20 or more workweeks this year or last. State laws can still give job-protected leave at smaller sizes.',
      },
      {
        q: 'Can we count FMLA absences in our attendance points system?',
        a: 'No. Using FMLA leave against an employee in a points system, a promotion decision or discipline is prohibited retaliation.',
      },
      {
        q: 'What happens if we never chose a 12-month period method?',
        a: 'You must use whichever of the four methods is most beneficial to the employee asking for leave.',
      },
    ],
    mambahr:
      'When a leave request comes in through Slack or the web request form, MambaHR checks federal FMLA eligibility against the employee record, approves time off within your policy, and cites any state paid-leave program that also applies, sending it to a person to decide how they combine. The leave then becomes a payroll change for a person to approve, and every step is logged.',
    sources: [
      { label: 'DOL: Fact Sheet #28, The Family and Medical Leave Act', url: 'https://www.dol.gov/agencies/whd/fact-sheets/28-fmla' },
      { label: 'DOL: Fact Sheet #28A, Employee protections under the FMLA', url: 'https://www.dol.gov/agencies/whd/fact-sheets/28a-fmla-employee-protections' },
      { label: 'DOL: Fact Sheet #28D, Employer notification requirements', url: 'https://www.dol.gov/agencies/whd/fact-sheets/28d-fmla-employer%20notification' },
      { label: 'DOL: Fact Sheet #28E, Employee notice requirements', url: 'https://www.dol.gov/agencies/whd/fact-sheets/28e-fmla-employee-notice' },
      { label: 'DOL: Fact Sheet #28F, Qualifying reasons for leave', url: 'https://www.dol.gov/agencies/whd/fact-sheets/28f-fmla-qualifying-reasons' },
      { label: 'DOL: Fact Sheet #28G, Medical certification', url: 'https://www.dol.gov/agencies/whd/fact-sheets/28g-fmla-serious-health-condition' },
      { label: 'DOL: Fact Sheet #28H, The 12-month period', url: 'https://www.dol.gov/agencies/whd/fact-sheets/28h-fmla-12-month-period' },
      { label: 'DOL: Fact Sheet #28I, Calculation of leave', url: 'https://www.dol.gov/agencies/whd/fact-sheets/28i-fmla-leave-calculation' },
      { label: 'DOL: Fact Sheet #28Q, Leave for birth, placement and bonding', url: 'https://www.dol.gov/agencies/whd/fact-sheets/28q-taking-leave-for-birth-placement-child' },
      { label: 'DOL: FMLA forms and posters', url: 'https://www.dol.gov/agencies/whd/fmla/forms' },
      { label: '29 CFR 825.110, Eligible employee', url: 'https://www.law.cornell.edu/cfr/text/29/825.110' },
      { label: '29 CFR 825.500, Recordkeeping requirements', url: 'https://www.law.cornell.edu/cfr/text/29/825.500' },
    ],
    related: [
      '/guides/paid-family-leave-states',
      '/guides/maternity-leave-small-business',
      '/guides/paid-sick-leave-laws',
      '/guides/hr-laws-by-company-size',
      '/leave',
    ],
  },

  // ── 2. Paid sick leave by state ────────────────────────────────────────────
  {
    slug: 'paid-sick-leave-laws',
    category: 'Leave',
    title: 'Which states require paid sick leave?',
    metaTitle: 'Which States Require Paid Sick Leave? (2026) | MambaHR',
    metaDescription:
      'No federal law requires paid sick leave, but many states do, most at 1 hour per 30 hours worked. State-by-state accrual rates, yearly caps and 2025 changes.',
    answer:
      'No federal law requires private employers to provide paid sick leave, but many states do, including Alaska, Arizona, California, Colorado, Connecticut, Illinois, Maine, Maryland, Massachusetts, Minnesota, New Jersey, New Mexico, New York, Oregon, Vermont, Washington and Washington, DC. Most require about 1 hour of leave for every 30 hours worked, most set a yearly limit between 40 and 56 hours, and several exempt or reduce the rules for the smallest employers.',
    sections: [
      {
        heading: 'There is no federal paid sick leave law',
        blocks: [
          {
            type: 'p',
            text: 'The U.S. Department of Labor (DOL) states plainly that there are no federal legal requirements for paid sick leave. The federal rule that does exist is unpaid: the Family and Medical Leave Act (FMLA) gives eligible employees at companies with 50 or more employees up to 12 weeks of unpaid leave for serious health conditions. See [how to handle an FMLA request](/guides/how-to-handle-an-fmla-request).',
          },
          {
            type: 'p',
            text: 'Paid sick leave comes from states and some cities. The rule that applies is generally the one where the employee works, so a remote team can be subject to several laws at once.',
          },
        ],
      },
      {
        heading: 'Ten states at a glance',
        blocks: [
          {
            type: 'table',
            caption: 'Paid sick leave in the ten states covered on our state pages',
            columns: ['State', 'Statewide law?', 'How leave is earned', 'Yearly amount'],
            rows: [
              [
                '[California](/hr-by-state/california)',
                'Yes, all employers',
                '1 hour per 30 hours worked, or a lump sum at the start of the year',
                'Employees must be able to use at least 40 hours or 5 days a year. You may cap the balance at 80 hours or 10 days.',
              ],
              [
                '[New York](/hr-by-state/new-york)',
                'Yes',
                '1 hour per 30 hours worked',
                '40 hours (paid at 5 to 99 employees; unpaid at 4 or fewer if net income is $1 million or less). 56 hours paid at 100 or more. Plus 20 hours of paid prenatal leave since January 1, 2025.',
              ],
              ['[Texas](/hr-by-state/texas)', 'No statewide law', 'Not required', 'Not required'],
              [
                '[Washington](/hr-by-state/washington)',
                'Yes',
                '1 hour per 40 hours worked',
                'No yearly cap on what is earned. Unused balances of 40 hours or less must carry over to the next year.',
              ],
              [
                '[Massachusetts](/hr-by-state/massachusetts)',
                'Yes',
                '1 hour per 30 hours worked',
                'Up to 40 hours. Paid at 11 or more employees; smaller employers must still give the time, unpaid.',
              ],
              ['[Colorado](/hr-by-state/colorado)', 'Yes, all employers', '1 hour per 30 hours worked', 'Up to 48 hours.'],
              [
                '[Illinois](/hr-by-state/illinois)',
                'Yes (Paid Leave for All Workers Act)',
                '1 hour per 40 hours worked, or front-loaded',
                'Up to 40 hours, usable for any reason. Chicago and Cook County employers follow their local ordinances instead.',
              ],
              [
                '[Florida](/hr-by-state/florida)',
                'No statewide law',
                'Not required',
                'Not required. State law also bars cities and counties from requiring benefits that state or federal law does not.',
              ],
              ['[New Jersey](/hr-by-state/new-jersey)', 'Yes, all employers', '1 hour per 30 hours worked', 'Up to 40 hours per benefit year.'],
              ['[Georgia](/hr-by-state/georgia)', 'No statewide law', 'Not required', 'Not required'],
            ],
          },
        ],
      },
      {
        heading: 'Other states with paid sick leave laws',
        blocks: [
          {
            type: 'table',
            columns: ['State', 'Who must provide paid leave', 'Earned and yearly amount'],
            rows: [
              ['Alaska', 'Employers in the state, since July 1, 2025', '1 hour per 30 hours worked'],
              ['Arizona', 'All employers', '1 hour per 30 hours. Up to 40 hours at 15 or more employees, 24 hours below 15.'],
              ['Connecticut', 'Employers with 11 or more employees (expanded January 1, 2026)', '1 hour per 30 hours, up to 40 hours a year. Usable after 120 days.'],
              ['Maine', 'Employers with more than 10 employees', '1 hour per 40 hours, up to 40 hours a year, usable for any reason.'],
              ['Maryland', 'Paid at 15 or more employees; unpaid below 15', '1 hour per 30 hours, up to 40 hours a year.'],
              ['Minnesota', 'Employees expected to work at least 80 hours a year in the state', '1 hour per 30 hours, up to 48 hours a year.'],
              ['New Mexico', 'Employers in the state, since July 1, 2022', '1 hour per 30 hours worked.'],
              ['Oregon', 'Paid at 10 or more employees (6 or more with a Portland location); unpaid below', '1 hour per 30 hours, up to 40 hours a year.'],
              ['Vermont', 'Employers in the state', '1 hour per 52 hours. Employers may cap it at 40 hours a year.'],
              [
                'Washington, DC',
                'All employers, by size',
                '1 to 24 employees: 1 hour per 87, up to 3 days. 25 to 99: 1 per 43, up to 5 days. 100 or more: 1 per 37, up to 7 days.',
              ],
            ],
          },
          {
            type: 'p',
            text: 'Other states have their own paid sick leave laws too, and several changed in 2025 and 2026. This page is not an exhaustive list: if you have people in a state not named here, check that state\'s labor department before assuming nothing applies.',
          },
        ],
      },
      {
        heading: 'Recent changes to know about',
        blocks: [
          {
            type: 'list',
            items: [
              'California raised its minimum to 40 hours or 5 days a year on January 1, 2024.',
              'New York added 20 hours of paid prenatal leave, separate from sick leave, on January 1, 2025.',
              'Alaska\'s voter-approved paid sick leave law took effect July 1, 2025.',
              'Missouri repealed its voter-approved paid sick leave requirement. Employers are no longer required to provide it as of August 28, 2025.',
              'Washington added immigration proceedings as a permitted use on July 27, 2025.',
              'Connecticut extended its law to employers with 11 or more employees on January 1, 2026.',
            ],
          },
        ],
      },
      {
        heading: 'City and county rules',
        blocks: [
          {
            type: 'p',
            text: 'Some cities and counties have their own laws on top of the state. New York City gives most employees up to 40 or 56 hours of paid protected time off a year, plus 32 hours of unpaid protected time off from the start of employment. Illinois\'s statewide law does not apply to employers covered by the Chicago and Cook County ordinances, which have their own rules. When a local and a state rule both apply, the safe approach is to meet whichever is more generous on each point.',
          },
        ],
      },
      {
        heading: 'How to set up a policy that works everywhere you hire',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'List every state and city where you have employees, including remote ones.',
              'For each, note the accrual rate, the yearly cap, whether the leave must be paid at your size, and any waiting period (for example, 90 days in California, Washington, Illinois and Oregon, and 120 days in Connecticut).',
              'Decide between accrual and front-loading. California, Illinois and Oregon allow a lump sum at the start of the year if it meets the minimum.',
              'Check whether your general PTO policy counts toward each state\'s requirement before relying on it.',
              'Track accrued and used hours for every employee. Minnesota, for example, requires balances on pay statements.',
              'Put the policy in your handbook and display the state posters. See [labor law posters](/guides/labor-law-posters).',
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
              'Assuming part-time or temporary staff do not earn sick leave. In states like Colorado and New Jersey they do.',
              'Applying your headquarters state\'s rules to remote employees who live elsewhere.',
              'Asking for a doctor\'s note where the law limits documentation (Connecticut and Illinois, for example).',
              'Missing a size threshold as you grow, such as 11 employees in Massachusetts and Connecticut or 15 in Arizona and Maryland.',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Is there a federal paid sick leave law for private employers?',
        a: 'No. The Department of Labor says there are no federal legal requirements for paid sick leave. Covered employers must give unpaid leave under the FMLA.',
      },
      {
        q: 'Do part-time employees earn paid sick leave?',
        a: 'In the states that address it, generally yes. Colorado and New Jersey, for example, cover full-time, part-time and temporary employees.',
      },
      {
        q: 'Can I give all the sick leave at the start of the year instead of tracking accrual?',
        a: 'Many states allow it. California, Illinois and Oregon, for example, let you front-load at least the yearly minimum instead of tracking hours worked.',
      },
      {
        q: 'Does Texas, Florida or Georgia require paid sick leave?',
        a: 'None of the three has a statewide paid sick leave law. Florida also bars its cities and counties from requiring benefits that state or federal law does not.',
      },
    ],
    mambahr:
      'MambaHR keeps each employee\'s work state on their record, approves sick and time-off requests within your policy, and answers state sick leave questions with the law cited, sending unclear cases to a person. Approved leave becomes a payroll change for a person to approve, and every change is logged.',
    sources: [
      { label: 'DOL: Sick leave', url: 'https://www.dol.gov/general/topic/workhours/sickleave' },
      { label: 'California DIR: Paid sick leave', url: 'https://www.dir.ca.gov/dlse/paid_sick_leave.htm' },
      { label: 'TWC Texas Guidebook for Employers: Vacation and sick leave', url: 'https://efte.twc.texas.gov/vacation_and_sick_leave.html' },
      { label: 'Georgia General Assembly: SB 201 (2017), sick leave for immediate family', url: 'https://www.legis.ga.gov/api/legislation/document/20172018/170794' },
      { label: 'New York State: Paid sick leave', url: 'https://www.ny.gov/programs/new-york-paid-sick-leave' },
      { label: 'New York Labor Law 196-B (sick leave and paid prenatal leave)', url: 'https://www.nysenate.gov/legislation/laws/LAB/196-B' },
      { label: 'Washington L&I: Paid sick leave', url: 'https://lni.wa.gov/workers-rights/leave/paid-sick-leave/' },
      { label: 'Mass.gov: Earned sick time', url: 'https://www.mass.gov/info-details/earned-sick-time' },
      {
        label: 'Colorado CDLE: INFO #6B, Healthy Families and Workplaces Act',
        url: 'https://cdle.colorado.gov/sites/cdle/files/INFO%20%236B%20%20Employer_Employee%20Rights%20and%20Obligations%20Under%20the%20Healthy%20Families%20and%20Workplaces%20Act%205.29.2024%20%5Baccessible%5D.pdf',
      },
      { label: 'Illinois DOL: Paid Leave for All Workers Act FAQ', url: 'https://labor.illinois.gov/faqs/paidleavefaq.html' },
      { label: 'New Jersey DOL: Earned sick leave', url: 'https://www.nj.gov/labor/myworkrights/leave-benefits/sick-leave/' },
      {
        label: 'Florida Statutes 218.077',
        url: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0200-0299/0218/Sections/0218.077.html',
      },
      { label: 'Alaska DOLWD: Ballot Measure 1 FAQ', url: 'https://labor.alaska.gov/lss/documents/Ballot_Measure_1_FAQ.pdf' },
      { label: 'Arizona Revised Statutes 23-372', url: 'https://www.azleg.gov/ars/23/00372.htm' },
      {
        label: 'Connecticut DOL: Paid sick leave notice (effective January 1, 2026)',
        url: 'https://portal.ct.gov/dol/-/media/dol/2022-new-design-system/divisions/wage-and-workplace-standards/psl-poster-effective1-1-2026.pdf?rev=de51237a55ab4d4cb796c277614242d3&hash=79BB910157BFA316EBA763E4775D30EF',
      },
      { label: 'Maine DOL: Earned paid leave', url: 'https://www.maine.gov/labor/labor_laws/earnedpaidleave/' },
      { label: 'Maryland DOL: Healthy Working Families Act FAQ', url: 'https://www.dllr.state.md.us/paidleave/paidleavefaqs.shtml' },
      { label: 'Minnesota DLI: Earned sick and safe time', url: 'https://www.dli.mn.gov/sick-leave' },
      {
        label: 'New Mexico Governor: Healthy Workplaces Act signed',
        url: 'https://www.governor.state.nm.us/2021/04/08/gov-lujan-grisham-signs-healthy-workplaces-act-authorizing-paid-sick-leave-for-new-mexico-workers/',
      },
      { label: 'Oregon BOLI: Sick time', url: 'https://www.oregon.gov/boli/workers/pages/sick-time.aspx' },
      { label: 'Vermont Statutes, 21 V.S.A. 482', url: 'https://legislature.vermont.gov/statutes/section/21/005/00482' },
      {
        label: 'DC DOES: Accrued Sick and Safe Leave fact sheet',
        url: 'https://does.dc.gov/sites/default/files/dc/sites/does/publication/attachments/DOES%20ASSLA%20Fact%20Sheet_0.pdf',
      },
      {
        label: 'Missouri DOLIR: Paid sick time after HB 567',
        url: 'https://labor.mo.gov/faqs/knowledge-base/when-do-employees-stop-earning-paid-sick-time-due-passage-hb-567',
      },
      { label: 'NYC DCWP: Protected time off law', url: 'https://www.nyc.gov/site/dca/about/paid-sick-leave-law.page' },
    ],
    related: [
      '/guides/paid-family-leave-states',
      '/guides/how-to-handle-an-fmla-request',
      '/guides/unused-pto-payout',
      '/guides/hiring-employees-in-another-state',
      '/hr-by-state',
      '/leave',
    ],
  },

  // ── 3. Paid family and medical leave states ────────────────────────────────
  {
    slug: 'paid-family-leave-states',
    category: 'Leave',
    title: 'Which states have paid family and medical leave?',
    metaTitle: 'Which States Have Paid Family and Medical Leave? | MambaHR',
    metaDescription:
      'Twelve states plus DC run paid family and medical leave programs that pay benefits now or will soon. Who pays in, how many weeks, and what changed in 2026.',
    answer:
      'As of October 2026, state paid family and medical leave programs pay benefits in California, New York, New Jersey, Washington, Massachusetts, Connecticut, Oregon, Colorado, Delaware, Minnesota and Maine, plus Washington, DC, and Maryland\'s program is scheduled to start paying benefits on January 1, 2028. They are insurance programs funded by payroll contributions from employees, employers or both, and most replace part of an employee\'s pay for up to 12 weeks a year.',
    sections: [
      {
        heading: 'How these programs work',
        blocks: [
          {
            type: 'p',
            text: 'A state paid family and medical leave program is an insurance fund. Employers send in contributions through payroll each quarter, sometimes deducting part of them from employee pay, and the state (or an approved private plan) pays weekly benefits to employees who are out for a qualifying reason. Typical reasons are bonding with a new child, a serious health condition, caring for a family member, and military family needs.',
          },
          {
            type: 'p',
            text: 'The employer does not pay the benefit itself. Your jobs are to register, withhold and send contributions, post notices, and coordinate the leave with your own policies and the federal Family and Medical Leave Act (FMLA). According to the U.S. Department of Labor, 13 states and Washington, DC, have passed laws creating these programs.',
          },
        ],
      },
      {
        heading: 'State programs at a glance',
        blocks: [
          {
            type: 'table',
            caption: 'State paid family and medical leave programs, as of October 2026',
            columns: ['State', 'Program', 'Who pays in', 'Weeks of paid leave', 'Benefits'],
            rows: [
              ['California', 'Paid Family Leave (PFL)', 'Employees, through State Disability Insurance (SDI) withholding (1.3% in 2026)', 'Up to 8 weeks in 12 months', 'Paying now'],
              ['New York', 'Paid Family Leave', 'Employees, through payroll deductions', 'Up to 12 weeks', 'Paying now'],
              ['New Jersey', 'Family Leave Insurance (FLI)', 'Employees (0.23% of wages up to $171,100 in 2026)', 'Up to 12 weeks in 12 months (or 56 separate days)', 'Paying now'],
              ['Washington', 'Paid Family and Medical Leave', 'Employees; employers with 50 or more employees also pay a share', 'Up to 12 weeks of family or medical leave', 'Paying since 2020'],
              ['Massachusetts', 'Paid Family and Medical Leave (PFML)', 'Employers and employees', 'Up to 20 weeks medical, 12 weeks family, 26 weeks combined per benefit year', 'Paying now'],
              ['Connecticut', 'CT Paid Leave', 'Employees (0.5% of pay)', 'Up to 12 weeks in 12 months, plus 2 for incapacity during pregnancy', 'Paying now'],
              ['Oregon', 'Paid Leave Oregon', 'Employees (60% of 1%); employers with 25 or more employees pay the other 40%', 'Up to 12 weeks, up to 14 in some pregnancy situations', 'Paying now'],
              ['Colorado', 'Paid Family and Medical Leave Insurance (FAMLI)', '0.88% of wages, split 50/50 (employers with 9 or fewer employees send only the employee half)', 'Up to 12 weeks, plus 4 for pregnancy complications and 12 for a newborn in intensive care', 'Paying now'],
              ['Washington, DC', 'DC Paid Family Leave', 'Employers, through a payroll tax', 'From October 1, 2026: 12 weeks parental, 10 medical, 6 family care, 2 prenatal', 'Paying now'],
              ['Delaware', 'Delaware Paid Leave', 'Employers, who may deduct up to half from employees', '12 weeks parental; 6 weeks medical or family care in any 24 months', 'Since January 1, 2026'],
              ['Minnesota', 'Paid Leave', 'Employers pay at least half; employees the rest', 'Up to 12 weeks medical or 12 family, up to 20 combined', 'Since January 1, 2026'],
              ['Maine', 'Paid Family and Medical Leave', '1% of wages; employers may deduct up to half (employers under 15 employees send only that half)', 'Up to 12 weeks per benefit year', 'Since May 1, 2026'],
              ['Maryland', 'Family and Medical Leave Insurance (FAMLI)', 'Not yet collecting', 'Up to 12 weeks', 'Scheduled for January 1, 2028'],
            ],
          },
          {
            type: 'p',
            text: 'This table covers the programs confirmed on official sources for this page; check any other state where you have employees. Hawaii and Puerto Rico have paid temporary disability programs, and New Hampshire, Vermont and Virginia have voluntary private family and medical leave insurance.',
          },
        ],
      },
      {
        heading: 'Programs that started in 2026, and what is next',
        blocks: [
          {
            type: 'list',
            items: [
              'Delaware: contributions began January 1, 2025 and benefits a year later. Employers with 10 to 24 employees are covered for parental leave only; employers with 25 or more for all leave types.',
              'Minnesota: premiums and leave began January 1, 2026. Small employers (30 or fewer employees, with average wages at or below 150% of the state average) pay a reduced rate.',
              'Maine: contributions began in January 2025, and benefits are paid for time out of work on or after May 1, 2026.',
              'Colorado: parents of a newborn in neonatal intensive care can get up to 12 more weeks, and the premium is 0.88% of wages.',
              'Washington, DC: on October 1, 2026, medical leave dropped to 10 weeks and family care leave to 6 weeks. Parental and prenatal leave did not change.',
              'Maryland: benefits are now scheduled to start January 1, 2028, later than first planned.',
              'Massachusetts: the contribution rate will be 0.88% of eligible wages from January 1, 2027.',
            ],
          },
        ],
      },
      {
        heading: 'Paid leave is not always job-protected leave',
        blocks: [
          {
            type: 'p',
            text: 'A state benefit pays the employee. Whether you must hold the job open is a separate question. California\'s Paid Family Leave and New Jersey\'s Family Leave Insurance pay benefits but do not themselves protect the job: job protection comes from other laws, such as the federal FMLA, the California Family Rights Act (CFRA) or the New Jersey Family Leave Act. New York and Maryland describe their programs as job-protected leave.',
          },
          {
            type: 'p',
            text: 'When an employee qualifies for both the FMLA and a state program, the leave often runs at the same time, but the rules for each are separate. Track both. See [how to handle an FMLA request](/guides/how-to-handle-an-fmla-request).',
          },
        ],
      },
      {
        heading: 'What an employer has to do',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Register with each state program where you have employees, as soon as you hire your first person there.',
              'Set up the payroll deduction and the employer share, if any, and file the quarterly wage reports.',
              'Display the required notice and give employees the written notice the state requires.',
              'Decide whether to use the state plan or an approved private plan, where that is allowed (Colorado, Massachusetts and Connecticut allow private plans, for example).',
              'When someone takes leave, confirm the dates with the state program and coordinate any company pay you add on top.',
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
              'Forgetting to register when you hire your first remote employee in a program state.',
              'Deducting more than the employee share the state allows.',
              'Treating a state benefit as a reason to end the job, when another law protects it.',
              'Missing a rule change, such as DC\'s October 2026 cut in medical and family care weeks.',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Do small employers have to take part in state paid leave programs?',
        a: 'Usually yes, but some states lower the employer share for small companies. Colorado employers with 9 or fewer employees, Maine employers under 15 and Oregon employers under 25 do not pay the employer share, but still withhold and send the employee share.',
      },
      {
        q: 'Does the employer pay the weekly benefit?',
        a: 'No. The state fund or an approved private plan pays it. The employer collects and sends contributions and coordinates the leave.',
      },
      {
        q: 'Is state paid family leave the same as FMLA?',
        a: 'No. The FMLA is federal, unpaid and applies at 50 or more employees. State programs pay benefits and can apply at any size, and the two often run at the same time.',
      },
    ],
    mambahr:
      'MambaHR checks federal FMLA eligibility for each leave request, cites the state paid-leave program that applies to the employee, and sends it to a person to decide how the two combine. The approved leave becomes a payroll change for your current payroll provider or for Deel-managed payroll (Powered by Deel), and a person approves every payroll run.',
    sources: [
      { label: 'DOL Women\'s Bureau: Paid leave', url: 'https://www.dol.gov/agencies/wb/featured-paid-leave' },
      { label: 'California EDD: Paid Family Leave', url: 'https://edd.ca.gov/en/disability/paid-family-leave/' },
      { label: 'California EDD: Rates and withholding', url: 'https://edd.ca.gov/en/payroll_taxes/rates_and_withholding/' },
      { label: 'New York Paid Family Leave: Employees', url: 'https://paidfamilyleave.ny.gov/employees' },
      { label: 'New Jersey DOL: Family Leave Insurance', url: 'https://www.nj.gov/labor/myleavebenefits/worker/fli/' },
      { label: 'Washington Paid Family and Medical Leave', url: 'https://paidleave.wa.gov/' },
      { label: 'Washington Paid Family and Medical Leave: Employers', url: 'https://paidleave.wa.gov/employers/' },
      {
        label: 'Mass.gov: PFML overview and benefits',
        url: 'https://www.mass.gov/info-details/paid-family-and-medical-leave-pfml-overview-and-benefits',
      },
      { label: 'CT Paid Leave: How CT Paid Leave works', url: 'https://www.ctpaidleave.org/how-ct-paid-leave-works' },
      { label: 'Paid Leave Oregon', url: 'https://paidleave.oregon.gov/' },
      { label: 'Colorado FAMLI', url: 'https://famli.colorado.gov/' },
      { label: 'Colorado FAMLI: Employers', url: 'https://famli.colorado.gov/employers' },
      { label: 'DC Paid Family Leave', url: 'https://dcpaidfamilyleave.dc.gov/' },
      { label: 'DC Paid Family Leave: 2026 program changes', url: 'https://dcpaidfamilyleave.dc.gov/program-updates/' },
      { label: 'DC Paid Family Leave: Employers', url: 'https://dcpaidfamilyleave.dc.gov/employers/' },
      { label: 'Delaware Code, Title 19, Chapter 37', url: 'https://delcode.delaware.gov/title19/c037/index.html' },
      { label: 'Minnesota Statutes 268B.04', url: 'https://www.revisor.mn.gov/statutes/cite/268B.04' },
      { label: 'Minnesota Statutes 268B.14', url: 'https://www.revisor.mn.gov/statutes/cite/268B.14' },
      { label: 'Minnesota Statutes 268B.085', url: 'https://www.revisor.mn.gov/statutes/cite/268B.085' },
      { label: 'Maine DOL: Paid Family and Medical Leave', url: 'https://www.maine.gov/paidleave/' },
      { label: 'Maine DOL: PFML for employers', url: 'https://www.maine.gov/paidleave/employers' },
      {
        label: 'Maine DOL: Employer\'s guide to PFML contributions',
        url: 'https://www.maine.gov/paidleave/docs/2024/EmployersGuidetoMainePFMLContributions.pdf',
      },
      { label: 'Maryland FAMLI', url: 'https://paidleave.maryland.gov/' },
    ],
    related: [
      '/guides/how-to-handle-an-fmla-request',
      '/guides/maternity-leave-small-business',
      '/guides/paid-sick-leave-laws',
      '/guides/hiring-employees-in-another-state',
      '/hr-by-state',
      '/leave',
    ],
  },

  // ── 4. Maternity leave at small businesses ─────────────────────────────────
  {
    slug: 'maternity-leave-small-business',
    category: 'Leave',
    title: 'Do small businesses have to offer maternity leave?',
    metaTitle: 'Do Small Businesses Have to Offer Maternity Leave? | MambaHR',
    metaDescription:
      'No federal law requires paid maternity leave, and FMLA starts at 50 employees. But pregnancy laws apply at 15, and some states at 5. What each size must do.',
    answer:
      'No federal law requires a private employer to offer paid maternity leave, and the Family and Medical Leave Act (FMLA), which gives 12 weeks of unpaid, job-protected leave, applies only at 50 or more employees. But at 15 or more employees the Pregnant Workers Fairness Act can require leave as a reasonable accommodation for pregnancy and childbirth, and some states go further, such as California, which requires up to four months of pregnancy disability leave at employers with just 5 employees.',
    sections: [
      {
        heading: 'What federal law requires, by company size',
        blocks: [
          {
            type: 'table',
            columns: ['Employees', 'Law', 'What it requires'],
            rows: [
              [
                'Any size (most employers)',
                'PUMP for Nursing Mothers Act, part of the Fair Labor Standards Act',
                'Reasonable break time and a private space that is not a bathroom, shielded from view, to pump breast milk for one year after the birth. Employers with fewer than 50 employees can be exempt only if compliance would cause undue hardship.',
              ],
              [
                '15 or more',
                'Title VII, as amended by the Pregnancy Discrimination Act',
                'No discrimination based on pregnancy, childbirth or related conditions in hiring, pay, assignments, promotions, benefits or firing.',
              ],
              [
                '15 or more',
                'Pregnant Workers Fairness Act (PWFA)',
                'Reasonable accommodations for known limitations related to pregnancy, childbirth or related medical conditions, including leave to recover from childbirth, unless it would cause undue hardship.',
              ],
              [
                '50 or more',
                'Family and Medical Leave Act (FMLA)',
                'Up to 12 weeks of unpaid, job-protected leave for eligible employees, with group health coverage continued.',
              ],
            ],
          },
          {
            type: 'p',
            text: 'None of these laws requires paid leave. FMLA leave is unpaid, and the Department of Labor confirms there is no federal paid sick leave requirement. Pay during maternity leave comes from your own policy, the employee\'s accrued paid time off, or a state program.',
          },
        ],
      },
      {
        heading: 'The law small employers most often miss: the PWFA',
        blocks: [
          {
            type: 'p',
            text: 'The Pregnant Workers Fairness Act took effect on June 27, 2023 and covers private employers with 15 or more employees. It is not only about leave. Accommodations can include flexible schedules, telework, temporary changes to duties, and time off, including leave to recover from childbirth.',
          },
          {
            type: 'list',
            items: [
              'You may not require an employee to take leave if another reasonable accommodation would let them keep working.',
              'You may deny an accommodation only if it would cause undue hardship, meaning significant difficulty or expense.',
              'A company with 15 to 49 employees has no FMLA obligation, but can still owe leave under the PWFA.',
            ],
          },
        ],
      },
      {
        heading: 'State laws can apply at much smaller sizes',
        blocks: [
          {
            type: 'p',
            text: 'Several states require job-protected leave or pay benefits regardless of how small you are. Two examples:',
          },
          {
            type: 'list',
            items: [
              'California, 5 or more employees: Pregnancy Disability Leave gives up to four months per pregnancy while the employee is disabled by pregnancy or childbirth, with no length-of-service requirement. You must continue group health coverage if you normally pay for it, and reinstate the employee. Separately, the California Family Rights Act (CFRA) gives up to 12 weeks of job-protected leave, including to bond with a new child, to employees with more than 12 months of service and 1,250 hours in the past year. An employee can take both. California\'s Paid Family Leave pays partial wages for up to 8 weeks through State Disability Insurance.',
              'New York: Paid Family Leave gives up to 12 weeks of job-protected leave at 67% of the employee\'s average weekly wage (up to a cap), paid for through employee payroll deductions. Since January 1, 2025, every New York employer must also give 20 hours of paid prenatal leave a year.',
            ],
          },
          {
            type: 'p',
            text: 'Other states run paid family leave programs too. See [which states have paid family and medical leave](/guides/paid-family-leave-states) and our [California](/hr-by-state/california) and [New York](/hr-by-state/new-york) pages.',
          },
        ],
      },
      {
        heading: 'What a small company can offer',
        blocks: [
          {
            type: 'p',
            text: 'Even where the law asks for little, a clear written policy helps you keep good people and avoids making it up under pressure. Common choices for small companies:',
          },
          {
            type: 'list',
            items: [
              'A set number of weeks at full or partial pay for any new parent, written so it applies the same way to every parent.',
              'Topping up a state benefit so the employee gets closer to full pay.',
              'Keeping the company share of health insurance going during unpaid leave.',
              'A gradual return: part-time hours or remote days for the first weeks back.',
              'A ready plan for pumping breaks and a private space before the employee returns.',
            ],
          },
        ],
      },
      {
        heading: 'When an employee tells you they are pregnant',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Ask what they need now. If you have 15 or more employees, the PWFA requires reasonable accommodations for known limitations, so start the conversation early.',
              'Check which laws apply: your headcount (5, 15, 50) and the state where they work.',
              'Explain their options in writing: company leave, accrued PTO, any state benefit, and FMLA if you are covered.',
              'Agree on expected dates and how they will keep you posted. Under the FMLA, 30 days of notice is expected for leave that can be planned, when possible.',
              'Plan the payroll changes for the leave and the return, and keep health coverage in place.',
              'Where the FMLA or a state law protects the job, bring them back to the same or an equivalent position, and have break time and a private space ready for pumping.',
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
              'Assuming "under 50 employees" means no obligations. The PWFA and Pregnancy Discrimination Act start at 15, and some state laws at 5.',
              'Putting a pregnant employee on leave they did not ask for when another accommodation would let them keep working.',
              'Using a bathroom as the pumping space.',
              'Offering bonding leave to some parents and not others.',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Do I have to hold a job open if I have fewer than 15 employees?',
        a: 'Federal law does not require it at that size, but some states do. In California, for example, Pregnancy Disability Leave applies at 5 or more employees and includes the right to return.',
      },
      {
        q: 'Do I have to pay employees during maternity leave?',
        a: 'Not under federal law. Some states pay benefits through an insurance program, such as California and New York, so the employee can receive pay without you paying it directly.',
      },
      {
        q: 'Do I need a lactation room?',
        a: 'Most employers must give break time and a private space other than a bathroom for one year after the birth. Employers with fewer than 50 employees can be exempt only if it would cause undue hardship.',
      },
    ],
    mambahr:
      'MambaHR keeps your headcount and each employee\'s work state on file, checks federal FMLA eligibility when leave is requested, and cites the state paid-leave programs that apply, sending them to a person to decide how they combine. The leave and the return become payroll changes for a person to approve, and every change is logged.',
    sources: [
      { label: 'DOL: Pumping breast milk at work', url: 'https://www.dol.gov/agencies/whd/pump-at-work' },
      {
        label: 'DOL: Fact Sheet #73, FLSA protections for employees to pump breast milk at work',
        url: 'https://www.dol.gov/agencies/whd/fact-sheets/73-flsa-break-time-nursing-mothers',
      },
      { label: 'EEOC: Pregnancy discrimination and pregnancy-related conditions', url: 'https://www.eeoc.gov/pregnancy-discrimination' },
      {
        label: 'EEOC: What you should know about the Pregnant Workers Fairness Act',
        url: 'https://www.eeoc.gov/wysk/what-you-should-know-about-pregnant-workers-fairness-act',
      },
      { label: 'DOL: Fact Sheet #28, The Family and Medical Leave Act', url: 'https://www.dol.gov/agencies/whd/fact-sheets/28-fmla' },
      { label: 'DOL: Fact Sheet #28I, Calculation of leave', url: 'https://www.dol.gov/agencies/whd/fact-sheets/28i-fmla-leave-calculation' },
      { label: 'DOL: Fact Sheet #28E, Employee notice requirements', url: 'https://www.dol.gov/agencies/whd/fact-sheets/28e-fmla-employee-notice' },
      { label: 'DOL: Sick leave', url: 'https://www.dol.gov/general/topic/workhours/sickleave' },
      {
        label: 'California CRD: Pregnancy Disability Leave fact sheet',
        url: 'https://calcivilrights.ca.gov/wp-content/uploads/sites/32/2022/12/Pregnancy-Disability-Leave-Fact-Sheet_ENG.pdf',
      },
      {
        label: 'California CRD: Family care and medical leave and pregnancy disability leave',
        url: 'https://calcivilrights.ca.gov/wp-content/uploads/sites/32/2023/01/CFRA-and-Pregnancy-Leave_ENG.pdf',
      },
      { label: 'California EDD: Paid Family Leave', url: 'https://edd.ca.gov/en/disability/paid-family-leave/' },
      { label: 'New York Paid Family Leave: Employees', url: 'https://paidfamilyleave.ny.gov/employees' },
      { label: 'New York Labor Law 196-B (paid prenatal leave)', url: 'https://www.nysenate.gov/legislation/laws/LAB/196-B' },
    ],
    related: [
      '/guides/paid-family-leave-states',
      '/guides/how-to-handle-an-fmla-request',
      '/guides/hr-laws-by-company-size',
      '/guides/do-small-businesses-have-to-offer-health-insurance',
      '/hr-by-state/california',
      '/leave',
    ],
  },
]
