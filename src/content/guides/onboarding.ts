import type { Guide } from './types'

// Onboarding guides. Every legal fact below was checked against the official
// page listed in that record's `sources` on 2026-10-02.

export const onboardingGuides: Guide[] = [
  // ── 1. New employee onboarding checklist ──────────────────────────────────
  {
    slug: 'new-hire-onboarding-checklist',
    category: 'Onboarding',
    title: 'New employee onboarding checklist (the paperwork you need)',
    metaTitle: 'New Employee Onboarding Checklist and Paperwork | MambaHR',
    metaDescription:
      'Every new hire needs a Form I-9, a Form W-4 and a state new-hire report within 20 days. See the full paperwork checklist, deadlines and first-week plan.',
    answer:
      'Every new employee needs a Form I-9 (the employee completes Section 1 by their first day of work, and you complete Section 2 within 3 business days) and a federal Form W-4, and you must report the hire to your state new-hire directory within 20 days of hire, or sooner where your state sets a shorter deadline. Depending on the state and your company size, you may also owe a state withholding form, a written wage notice, a written harassment policy and a COBRA general notice.',
    sections: [
      {
        heading: 'The paperwork checklist, with deadlines',
        blocks: [
          {
            type: 'p',
            text: 'The first four rows apply to almost every employer. The rest depend on where the employee works, how many people you employ and which benefits you offer.',
          },
          {
            type: 'table',
            caption: 'New-hire paperwork and when it is due',
            columns: ['Item', 'Deadline', 'Who it applies to', 'Source'],
            rows: [
              [
                'Form I-9, Section 1 (employee information)',
                'Employee completes and signs it no later than the first day of work. They may do it any time after accepting the job offer.',
                'Every new employee, including US citizens',
                '[USCIS](https://www.uscis.gov/i-9-central/completing-form-i-9/completing-section-1-employee-information-and-attestation)',
              ],
              [
                'Form I-9, Section 2 (you review their documents)',
                'Within 3 business days of the first day of work for pay. A Monday start means Thursday. If the job lasts less than 3 business days, by the first day.',
                'Every new employee',
                '[USCIS](https://www.uscis.gov/i-9-central/completing-form-i-9/completing-section-2-employer-review-and-attestation)',
              ],
              [
                'Federal Form W-4 (tax withholding)',
                'Ask for it when the employee starts, so the first paycheck withholds correctly.',
                'Every new employee',
                '[IRS Publication 15](https://www.irs.gov/publications/p15)',
              ],
              [
                'State new-hire report',
                'Within 20 days of hire under federal law. Some states are stricter, for example Georgia (10 days) and Massachusetts (14 days).',
                'Every new employee, and rehires who were gone 60 days or more',
                '[HHS Office of Child Support Services](https://acf.gov/css/employers/employer-responsibilities/new-hire-reporting)',
              ],
              [
                'State withholding form',
                'At the start, alongside the W-4.',
                "Employees in states with their own form, for example California's DE 4",
                '[California EDD](https://edd.ca.gov/en/payroll_taxes/New_Hire_Reporting/)',
              ],
              [
                'E-Verify case',
                'No later than the third business day after the employee starts work for pay, using the completed Form I-9.',
                'Employers enrolled in E-Verify, including those a state or a federal contract requires to use it',
                '[E-Verify](https://www.e-verify.gov/employers/verification-process)',
              ],
              [
                'California wage notice (Labor Code 2810.5)',
                'At the time of hire.',
                'Nonexempt employees in California',
                '[California Legislature](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=2810.5)',
              ],
              [
                'New York wage notice (Labor Law 195.1)',
                'At the time of hiring, in English and the employee\'s primary language, with a signed and dated acknowledgment you keep for six years.',
                'Employees in New York',
                '[NY Senate](https://www.nysenate.gov/legislation/laws/LAB/195)',
              ],
              [
                'Written sexual harassment prevention policy',
                'At hire in New York. California requires a written prevention policy distributed to employees.',
                'Employees in New York and California, among other states',
                '[NY Senate](https://www.nysenate.gov/legislation/laws/LAB/201-G)',
              ],
              [
                'COBRA general notice',
                'Within the first 90 days of health plan coverage. The plan administrator sends it, often inside the summary plan description.',
                'Group health plans of employers with 20 or more employees',
                '[US Department of Labor](https://www.dol.gov/agencies/ebsa/about-ebsa/our-activities/resource-center/publications/an-employers-guide-to-group-health-continuation-coverage-under-cobra)',
              ],
              [
                'FMLA general notice',
                'In your handbook if you have one, otherwise handed to each new employee at hire.',
                'Employers covered by the Family and Medical Leave Act (FMLA) that have eligible employees',
                '[29 CFR 825.300](https://www.govinfo.gov/content/pkg/CFR-2025-title29-vol3/pdf/CFR-2025-title29-vol3-sec825-300.pdf)',
              ],
            ],
          },
          {
            type: 'p',
            text: 'Details for each item: [Form I-9 and E-Verify](/guides/form-i-9-and-e-verify), [new hire reporting](/guides/new-hire-reporting), [when you need to offer COBRA](/guides/when-do-you-need-to-offer-cobra) and [whether you need a handbook](/guides/do-i-need-an-employee-handbook).',
          },
        ],
      },
      {
        heading: 'Before day one',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Send the offer letter and get it signed. Once the offer is accepted, the new hire can complete Section 1 of the Form I-9.',
              'Send the W-4 and any state withholding form, plus direct deposit and emergency contact forms, so payroll is ready before the first pay date.',
              'Decide who will look at the I-9 documents and where. The review normally happens in person, by you or an authorized representative. If you use E-Verify and are in good standing, you may use the DHS remote examination procedure instead.',
              'Send the state wage notice where one applies (California, New York) and the written harassment policy where one is required.',
              'Order the laptop and any equipment, and request the accounts the person needs (email, chat, the tools for their role), so they work on day one.',
              'Write a simple first-week plan: who they meet, what they read, and one small task they can finish.',
            ],
          },
        ],
      },
      {
        heading: 'Day one',
        blocks: [
          {
            type: 'list',
            items: [
              'Confirm Section 1 of the Form I-9 is complete and signed. It is due today at the latest.',
              'Review the I-9 documents if you can. The employee chooses which acceptable documents to show. You cannot ask for a specific one.',
              'Hand over equipment and check that every login works.',
              'Walk through pay: pay schedule, how hours are recorded if the job is nonexempt, and who to ask about a pay problem.',
              'Share the handbook or core policies and collect the signed acknowledgment.',
              'Introduce the manager and a go-to colleague for questions.',
            ],
          },
        ],
      },
      {
        heading: 'The first week and the first month',
        blocks: [
          {
            type: 'list',
            items: [
              'Day 3 (business days): Section 2 of the Form I-9 is complete. If you use E-Verify, the case is created by the same day.',
              'Within your state deadline: file the new-hire report. Put the date in the calendar on the day of hire: 10 days in Georgia, 14 in Massachusetts, 20 in most other states.',
              'Benefits: enrollment forms out, and if the employee joins a group health plan at an employer with 20 or more employees, the plan administrator sends the COBRA general notice within 90 days of coverage starting.',
              'File everything: keep the Form I-9 for the required retention period, and the New York wage notice acknowledgment for six years.',
              'End of week one: a short check-in with the manager on what is going well and what is missing.',
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
              'Asking for a specific document for the Form I-9, such as a passport. The employee picks from the lists of acceptable documents.',
              'Skipping the Form I-9 for a US citizen or for someone who works remotely. Every employee hired in the US needs one. Independent contractors do not.',
              'Using the federal 20-day window everywhere. Georgia and Massachusetts are shorter, so a report filed on day 18 can already be late.',
              'Forgetting rehires. Someone who was gone for 60 consecutive days or more counts as a new hire for state reporting.',
              'Forgetting that a wage notice has to stay accurate. In California, a change to the notice details must be given to the employee in writing within 7 calendar days, unless it appears on the pay stub or another required document.',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Can a new hire fill out the Form I-9 before their first day?',
        a: 'Yes, Section 1. The employee may complete it any time after accepting the job offer, and no later than the first day of work. Section 2 is due within 3 business days of that first day.',
      },
      {
        q: 'Do I need a Form I-9 for independent contractors?',
        a: 'No. USCIS says you do not complete a Form I-9 for independent contractors or for workers supplied by a staffing agency, which completes it for its own employees. Make sure the person is really a contractor first: see [contractor vs employee](/guides/contractor-vs-employee).',
      },
      {
        q: 'Does a copy of the W-4 count as the new-hire report?',
        a: 'In many states it can. The federal W-4 collects most of the required details, and the IRS notes that many states accept a copy with the employer information added. Check your state, because some ask for extra fields.',
      },
      {
        q: 'Do small employers have to send a COBRA general notice?',
        a: 'Federal COBRA generally applies to group health plans of employers with 20 or more employees. Smaller employers may have state continuation rules instead. See [when you need to offer COBRA](/guides/when-do-you-need-to-offer-cobra).',
      },
    ],
    mambahr:
      'MambaHR sends the new-hire forms and follows up until they come back, starts the Form I-9, requests logins and a laptop from IT, and sets the first-week plan. Requests arrive in Slack or through a web request form, a person approves the decisions that matter, and every change is logged.',
    sources: [
      { label: 'USCIS: Form I-9, Employment Eligibility Verification', url: 'https://www.uscis.gov/i-9' },
      {
        label: 'USCIS: Completing Section 1, Employee Information and Attestation',
        url: 'https://www.uscis.gov/i-9-central/completing-form-i-9/completing-section-1-employee-information-and-attestation',
      },
      {
        label: 'USCIS: Completing Section 2, Employer Review and Attestation',
        url: 'https://www.uscis.gov/i-9-central/completing-form-i-9/completing-section-2-employer-review-and-attestation',
      },
      { label: "IRS: Publication 15, Employer's Tax Guide", url: 'https://www.irs.gov/publications/p15' },
      {
        label: 'HHS Office of Child Support Services: New Hire Reporting',
        url: 'https://acf.gov/css/employers/employer-responsibilities/new-hire-reporting',
      },
      { label: 'E-Verify: Verification Process', url: 'https://www.e-verify.gov/employers/verification-process' },
      {
        label: 'California Labor Code 2810.5',
        url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=2810.5',
      },
      { label: 'New York Labor Law 195', url: 'https://www.nysenate.gov/legislation/laws/LAB/195' },
      { label: 'New York Labor Law 201-G', url: 'https://www.nysenate.gov/legislation/laws/LAB/201-G' },
      {
        label: "DOL: An Employer's Guide to Group Health Continuation Coverage Under COBRA",
        url: 'https://www.dol.gov/agencies/ebsa/about-ebsa/our-activities/resource-center/publications/an-employers-guide-to-group-health-continuation-coverage-under-cobra',
      },
      {
        label: '29 CFR 825.300, FMLA employer notice requirements',
        url: 'https://www.govinfo.gov/content/pkg/CFR-2025-title29-vol3/pdf/CFR-2025-title29-vol3-sec825-300.pdf',
      },
    ],
    related: [
      '/guides/form-i-9-and-e-verify',
      '/guides/new-hire-reporting',
      '/guides/how-to-hire-your-first-employee',
      '/guides/labor-law-posters',
      '/guides/do-i-need-an-employee-handbook',
      '/onboarding',
    ],
  },

  // ── 2. Form I-9 and E-Verify ──────────────────────────────────────────────
  {
    slug: 'form-i-9-and-e-verify',
    category: 'Onboarding',
    title: 'Form I-9 and E-Verify: what employers must do',
    metaTitle: 'Form I-9 and E-Verify Rules for Employers | MambaHR',
    metaDescription:
      'Complete a Form I-9 for every new hire: Section 1 by day one, Section 2 within 3 business days. E-Verify is voluntary federally but required in some states.',
    answer:
      'US employers must complete a Form I-9 for every employee hired after November 6, 1986, citizens included: the employee completes Section 1 by their first day of work, and you examine their documents and complete Section 2 within 3 business days. E-Verify is voluntary for most employers under federal law, but federal contracts with the E-Verify clause and some state laws, such as Florida (private employers with 25 or more employees) and Georgia (more than 10 employees), require it.',
    sections: [
      {
        heading: 'Who needs a Form I-9',
        blocks: [
          {
            type: 'p',
            text: 'Every employee you hire to work in the United States, whether they are a US citizen or not. You keep the form yourself. USCIS says plainly: do not file the Form I-9 with USCIS or with Immigration and Customs Enforcement (ICE).',
          },
          {
            type: 'p',
            text: 'You do not need a Form I-9 for:',
          },
          {
            type: 'list',
            items: [
              'Independent contractors, or workers employed by a contractor or staffing agency (the agency completes the form for its own employees).',
              'People who are not physically working in the US.',
              'Casual domestic workers in a private home on a sporadic, irregular or intermittent basis.',
              'Employees hired on or before November 6, 1986 who have stayed in continuous employment.',
            ],
          },
        ],
      },
      {
        heading: 'Deadlines',
        blocks: [
          {
            type: 'table',
            caption: 'Form I-9 and E-Verify deadlines',
            columns: ['Step', 'Deadline'],
            rows: [
              [
                'Section 1 (employee)',
                'No later than the first day of employment. The employee may complete it any time after accepting the job offer.',
              ],
              [
                'Section 2 (employer)',
                'Within 3 business days of the first day of work for pay. Monday start means Thursday.',
              ],
              ['Jobs shorter than 3 business days', 'Section 2 by the first day of employment.'],
              [
                'E-Verify case (if you use E-Verify)',
                'No later than the third business day after the employee starts work for pay, using the completed Form I-9.',
              ],
              [
                'Reverification (Supplement B)',
                "By the date the employee's work authorization, or the document showing it, expires, whichever is earlier.",
              ],
              [
                'Keeping the form',
                '3 years after the date of hire, or 1 year after employment ends, whichever is later.',
              ],
            ],
          },
        ],
      },
      {
        heading: 'Acceptable documents: Lists A, B and C',
        blocks: [
          {
            type: 'p',
            text: 'The employee shows either one document from List A, or one document from List B plus one from List C. The employee chooses which documents to present. You must accept documents that reasonably appear genuine and relate to the person, and you cannot ask for a specific one. USCIS warns that requiring specific documents can be unlawful discrimination.',
          },
          {
            type: 'table',
            columns: ['List', 'What it proves', 'Common examples'],
            rows: [
              [
                'List A',
                'Identity and permission to work',
                'US passport or passport card; Permanent Resident Card (Form I-551); Employment Authorization Document with photo (Form I-766); foreign passport with Form I-94 showing work authorization',
              ],
              [
                'List B',
                'Identity only',
                "State driver's license or state ID card; government ID card; school ID with photo; US military card; Native American tribal document",
              ],
              [
                'List C',
                'Permission to work only',
                'Unrestricted Social Security card; original or certified US birth certificate; Native American tribal document; certain DHS employment authorization documents',
              ],
            ],
          },
          {
            type: 'p',
            text: 'Receipts for a lost, stolen or damaged document are acceptable. Documents must be originals, with one exception: a certified copy of a birth certificate. See the full list on [USCIS Acceptable Documents](https://www.uscis.gov/i-9-central/form-i-9-acceptable-documents).',
          },
        ],
      },
      {
        heading: 'Remote hires and the alternative procedure',
        blocks: [
          {
            type: 'p',
            text: 'The standard rule is that you, or an authorized representative acting for you, examine the documents in the employee\'s physical presence. For remote hires, many employers ask a trusted person near the employee to act as their authorized representative.',
          },
          {
            type: 'p',
            text: 'Employers enrolled in E-Verify and in good standing at the hiring site can use the DHS-authorized alternative procedure instead:',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Examine copies of the documents (front and back if two-sided) to make sure they reasonably appear genuine and relate to the employee.',
              'Hold a live video call with the employee, with the same documents, to confirm the same thing.',
              'Check the alternative procedure box in Section 2 of the Form I-9.',
              'Keep a clear copy of every document examined, front and back.',
            ],
          },
          {
            type: 'p',
            text: 'If you offer remote examination at a site, you must offer it consistently to all employees there. You may offer it to remote hires only while examining documents in person for onsite and hybrid staff, as long as you do not do so in a discriminatory way.',
          },
        ],
      },
      {
        heading: 'Use the current edition of the form',
        blocks: [
          {
            type: 'p',
            text: 'The current Form I-9 has an edition date of 01/20/25 and an expiration date of 05/31/2027. USCIS also accepts the 08/01/23 edition that shows an expiration date of 05/31/2027. The 08/01/23 edition that shows an expiration date of 07/31/2026 was valid only until that date, and electronic I-9 systems had to move to the 05/31/2027 version by 07/31/2026. All pages of a completed form must come from the same edition. Check the edition date at the bottom of each page.',
          },
        ],
      },
      {
        heading: 'Reverification and retention',
        blocks: [
          {
            type: 'p',
            text: "Reverify (on Supplement B) when an employee's work authorization, or the document that shows it, expires. The employee may present any unexpired List A or List C document; they do not have to show the same type again. Do not reverify US citizens, noncitizen nationals, permanent residents who presented a Permanent Resident Card (Form I-551), or any List B identity document.",
          },
          {
            type: 'p',
            text: "Keep each Form I-9 for 3 years after the date of hire or 1 year after employment ends, whichever is later. In practice: someone who worked for you less than 2 years, keep it 3 years from the hire date; someone who worked longer, keep it 1 year after they leave. Never discard a current employee's form. USCIS recommends keeping I-9s apart from personnel files. See [how long to keep employee records](/guides/how-long-to-keep-employee-records).",
          },
        ],
      },
      {
        heading: 'E-Verify: when it is required',
        blocks: [
          {
            type: 'p',
            text: 'E-Verify is a free online service run by USCIS that checks the information on a Form I-9 against government records. Under federal law it is voluntary for most employers. It is mandatory for employers with federal contracts or subcontracts that contain the Federal Acquisition Regulation (FAR) E-Verify clause, and for employers covered by a state E-Verify law. Two examples:',
          },
          {
            type: 'list',
            items: [
              'Florida: since July 1, 2023, private employers with 25 or more employees must use E-Verify for new employees, verify within 3 business days after the employee starts working for pay, and keep the documents and verification for at least 3 years (Florida Statutes 448.095).',
              'Georgia: private employers with more than 10 employees must register for and use E-Verify, and attest to it when applying for a business license, occupational tax certificate or other document needed to operate (O.C.G.A. 36-60-6). For the count, include every employee company-wide who works at least 35 hours a week.',
            ],
          },
          {
            type: 'p',
            text: 'Other states have their own rules, so check your state before you rely on the federal default. If you use E-Verify, the Form I-9 always comes first, and the employee must give their Social Security number in Section 1 (it is otherwise optional).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Do I send the Form I-9 to the government?',
        a: 'No. USCIS says not to file it with USCIS or ICE. You keep it on file and show it if the government asks to inspect it.',
      },
      {
        q: 'Can I require a new hire to show a passport?',
        a: 'No. The employee chooses which acceptable documents to show from Lists A, B and C, and you must accept documents that reasonably appear genuine. Asking for specific documents can be discrimination.',
      },
      {
        q: 'Do I have to use E-Verify?',
        a: 'Not under federal law, unless you hold a federal contract with the E-Verify clause. Some states require it, for example Florida for private employers with 25 or more employees and Georgia for employers with more than 10.',
      },
      {
        q: 'Can I examine I-9 documents over video?',
        a: 'Only if you participate in E-Verify and are in good standing at that hiring site, and you follow the DHS alternative procedure: review copies, hold a live video call, check the box in Section 2 and keep copies.',
      },
    ],
    mambahr:
      'When a hire is approved, MambaHR starts the Form I-9 and follows up on the new-hire forms until they are done. It answers federal and state employment-law questions with the law cited, and unclear cases go to a person. Every change is logged.',
    sources: [
      { label: 'USCIS: Form I-9, Employment Eligibility Verification', url: 'https://www.uscis.gov/i-9' },
      {
        label: 'USCIS Handbook for Employers M-274, 4.0 Completing Section 2',
        url: 'https://www.uscis.gov/i-9-central/form-i-9-resources/handbook-for-employers-m-274/40-completing-section-2-employer-review-and-verification',
      },
      { label: 'USCIS: Form I-9 Acceptable Documents', url: 'https://www.uscis.gov/i-9-central/form-i-9-acceptable-documents' },
      {
        label: 'USCIS: Remote Examination of Documents (Optional Alternative Procedure)',
        url: 'https://www.uscis.gov/i-9-central/remote-examination-of-documents',
      },
      {
        label: 'USCIS: Completing Supplement B, Reverification and Rehires',
        url: 'https://www.uscis.gov/i-9-central/completing-form-i-9/completing-supplement-b-reverification-and-rehires-formerly-section-3',
      },
      {
        label: 'USCIS Handbook for Employers M-274, 10.0 Retaining Form I-9',
        url: 'https://www.uscis.gov/i-9-central/form-i-9-resources/handbook-for-employers-m-274/100-retaining-form-i-9',
      },
      { label: 'USCIS: Exceptions (who does not need a Form I-9)', url: 'https://www.uscis.gov/i-9-central/completing-form-i-9/exceptions' },
      { label: 'E-Verify: Verification Process', url: 'https://www.e-verify.gov/employers/verification-process' },
      {
        label: 'E-Verify: I am an employer, how do I use E-Verify? (E4)',
        url: 'https://www.e-verify.gov/sites/default/files/everify/guides/E4en.pdf',
      },
      {
        label: 'Florida Statutes 448.095, Employment eligibility',
        url: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0400-0499/0448/Sections/0448.095.html',
      },
      {
        label: 'Georgia Department of Law: Private Employer Affidavit under O.C.G.A. 36-60-6(d)',
        url: 'https://law.georgia.gov/document/publication/private-employer-affidavit-pursuant-ocga-ss-36-60-6d/download',
      },
    ],
    related: [
      '/guides/new-hire-onboarding-checklist',
      '/guides/new-hire-reporting',
      '/guides/how-long-to-keep-employee-records',
      '/hr-by-state/florida',
      '/hr-by-state/georgia',
      '/onboarding',
    ],
  },

  // ── 3. New hire reporting ─────────────────────────────────────────────────
  {
    slug: 'new-hire-reporting',
    category: 'Onboarding',
    title: 'New hire reporting: what to report and when',
    metaTitle: 'New Hire Reporting Requirements and Deadlines | MambaHR',
    metaDescription:
      'Federal law requires employers to report each new or rehired employee to the state within 20 days of hire. Some states are stricter. See deadlines by state.',
    answer:
      'Federal law requires every employer to report each new and rehired employee to the state directory of new hires in the state where they work within 20 days of hire, and some states set a shorter deadline, such as Georgia (10 days) and Massachusetts (14 days). The report has seven required items: the employee\'s name, address, Social Security number and date of hire, and the employer\'s name, address and Federal Employer Identification Number (FEIN).',
    sections: [
      {
        heading: 'What the law requires',
        blocks: [
          {
            type: 'p',
            text: 'New hire reporting comes from the federal welfare reform law, the Personal Responsibility and Work Opportunity Reconciliation Act (PRWORA). Each report goes to a State Directory of New Hires, which passes it to the National Directory of New Hires. Child support agencies match the reports against their cases to find parents who owe support, and states also use them to stop improper unemployment and workers\' compensation payments.',
          },
          {
            type: 'p',
            text: 'Who must report: any employer that would have an employee fill out a Form W-4. Report to the state where the employee works, which may not be the state where your company is registered. Federal law sets 20 days as the outer limit, and a state can require reports sooner.',
          },
        ],
      },
      {
        heading: 'Who counts as a new hire',
        blocks: [
          {
            type: 'list',
            items: [
              'Anyone you have not employed before.',
              'A rehire who was separated from your company for at least 60 consecutive days. Someone back from leave who was never taken off payroll does not need a new report.',
              'The date of hire is the first day the person performs services for pay, not the date they signed the offer.',
              'Independent contractors are not covered by the federal rule, but several states require you to report them too (see the table).',
            ],
          },
        ],
      },
      {
        heading: 'What to report',
        blocks: [
          {
            type: 'p',
            text: 'Federal law requires seven items. Many states ask for more, so check your state form before you file.',
          },
          {
            type: 'list',
            items: [
              'Employee name',
              'Employee home address',
              'Employee Social Security number',
              'Date of hire (first day of work for pay)',
              'Employer name',
              'Employer address (federal guidance also recommends your payroll office address if different)',
              'Federal Employer Identification Number (FEIN)',
            ],
          },
          {
            type: 'p',
            text: 'Use the same FEIN for new-hire reports and quarterly wage reports. If they differ, it can look as if you never reported. New York, for example, also asks whether dependent health insurance is available to the employee and the date they qualify.',
          },
        ],
      },
      {
        heading: 'Deadlines in 10 states',
        blocks: [
          {
            type: 'table',
            caption: 'New hire reporting deadlines and where to report (state agency details as listed by the federal Office of Child Support Services)',
            columns: ['State', 'Deadline', 'Where to report', 'Report independent contractors?'],
            rows: [
              [
                'California',
                'Within 20 calendar days of the start-of-work date',
                '[Employment Development Department (EDD)](https://edd.ca.gov/en/payroll_taxes/New_Hire_Reporting/), online through e-Services for Business, or Form DE 34 by mail or fax',
                'Yes, within 20 days of paying $600 or more, or entering a contract for $600 or more, in a calendar year',
              ],
              [
                'Colorado',
                'Within 20 days of hire',
                'Colorado new hire reporting website (newhire.state.co.us)',
                'Yes',
              ],
              [
                'Florida',
                'Within 20 days of the start date',
                'Florida Department of Revenue',
                'Yes',
              ],
              [
                'Georgia',
                'Within 10 days of hire',
                'Georgia New Hire Reporting Program',
                'No',
              ],
              [
                'Illinois',
                'Within 20 days of hire',
                'Illinois new hire reporting website (newhire.hfs.illinois.gov)',
                'Yes',
              ],
              [
                'Massachusetts',
                'Within 14 days of the effective date of employment or reinstatement',
                'Massachusetts Department of Revenue (DOR)',
                'Yes',
              ],
              [
                'New Jersey',
                'Within 20 days of hire or rehire',
                'New Jersey New Hire Reporting Center',
                'Yes',
              ],
              [
                'New York',
                'Within 20 calendar days of hire or rehire',
                '[NYS Department of Taxation and Finance](https://www.tax.ny.gov/bus/wt/newhire.htm), online, or Form IT-2104 by fax or mail',
                'Yes, for contracts over $2,500',
              ],
              [
                'Texas',
                'Within 20 calendar days of the date the employee starts earning wages',
                'Texas Office of the Attorney General employer portal',
                'Yes',
              ],
              [
                'Washington',
                'Within 20 days of hire',
                'Washington new hire reporting website (newhire.wa.gov)',
                'No',
              ],
            ],
          },
          {
            type: 'p',
            text: 'For every other state, use the [state contacts list](https://acf.gov/css/contact-information/state-new-hire-reporting-contacts-and-program-requirements) from the federal Office of Child Support Services. State-by-state detail for these ten states is on [HR by state](/hr-by-state).',
          },
        ],
      },
      {
        heading: 'Employees in more than one state',
        blocks: [
          {
            type: 'p',
            text: 'If you have employees working in two or more states, you have two choices:',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Report each new hire to the state where they work, following that state\'s deadline and form. This is the default.',
              'Pick one state where you have employees and report everyone there. To do this you must register with the US Department of Health and Human Services (HHS) as a multistate employer, name the state, and submit electronically, no more than twice a month and 12 to 16 days apart.',
            ],
          },
          {
            type: 'p',
            text: 'Hiring your first person in a new state usually means registering for that state\'s payroll taxes as well. See [hiring employees in another state](/guides/hiring-employees-in-another-state).',
          },
        ],
      },
      {
        heading: 'How to file, and what happens if you miss it',
        blocks: [
          {
            type: 'p',
            text: 'States take reports through their new hire websites, and many also accept mail or fax. Many states accept a copy of the employee\'s Form W-4 with the employer details and hire date added. Employers that send reports electronically in batches must send them twice a month, 12 to 16 days apart.',
          },
          {
            type: 'p',
            text: 'Penalties are set by each state. Federal law caps a state penalty at $25 per unreported employee, or $500 if the employer and employee agree not to report. California, for example, may charge $24 per unreported employee, and $490 when the employer and employee agree not to report or to file a false or incomplete report. New York charges $20 per employee not reported.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Do I report an employee I rehired?',
        a: 'Yes, if they were separated from your company for at least 60 consecutive days. If they were never taken off payroll, or came back within 60 days, you do not need a new report.',
      },
      {
        q: 'Do I report independent contractors?',
        a: 'Federal law does not require it, but several states do, including California, New York (contracts over $2,500) and Massachusetts. Check the state where the work is done.',
      },
      {
        q: 'Which state do I report a remote employee to?',
        a: 'The state where the employee works, which for a remote employee is usually where they live and work from. Multistate employers can instead register with HHS and report everyone to one state.',
      },
    ],
    mambahr:
      "MambaHR keeps your employee records, so the details a new-hire report asks for, such as hire date, work state and FEIN, sit in one place. It answers federal and state employment-law questions with the law cited, including which state's reporting deadline applies to a hire, and unclear cases go to a person.",
    sources: [
      {
        label: 'HHS Office of Child Support Services: New Hire Reporting',
        url: 'https://acf.gov/css/employers/employer-responsibilities/new-hire-reporting',
      },
      {
        label: 'HHS Office of Child Support Services: State New Hire Reporting Contacts and Program Requirements',
        url: 'https://acf.gov/css/contact-information/state-new-hire-reporting-contacts-and-program-requirements',
      },
      {
        label: 'HHS Office of Child Support Services: State Contact and Program Information, New Hire Reporting (PDF)',
        url: 'https://ocsp.acf.hhs.gov/irg/irgpdf.pdf?geoType=OGP&groupCode=EMP&addrType=NHR&addrClassType=EMP',
      },
      { label: 'California EDD: New Hire Reporting', url: 'https://edd.ca.gov/en/payroll_taxes/New_Hire_Reporting/' },
      { label: 'New York State Department of Taxation and Finance: New Hire Reporting', url: 'https://www.tax.ny.gov/bus/wt/newhire.htm' },
      { label: "IRS: Publication 15, Employer's Tax Guide", url: 'https://www.irs.gov/publications/p15' },
    ],
    related: [
      '/guides/new-hire-onboarding-checklist',
      '/guides/form-i-9-and-e-verify',
      '/guides/hiring-employees-in-another-state',
      '/guides/how-to-run-payroll-for-your-first-employee',
      '/hr-by-state',
    ],
  },

  // ── 4. Labor law posters ──────────────────────────────────────────────────
  {
    slug: 'labor-law-posters',
    category: 'Onboarding',
    title: 'Which labor law posters are required?',
    metaTitle: 'Which Labor Law Posters Are Required? | MambaHR',
    metaDescription:
      'Most US employers must post federal posters on minimum wage, job safety, polygraph and military leave rights, plus EEO (15+) and FMLA (50+), and state posters.',
    answer:
      'Most private US employers must display federal notices on the minimum wage (FLSA), job safety (OSHA), polygraph testing (EPPA) and military service rights (USERRA); employers with 15 or more employees add the EEOC "Know Your Rights" poster, and employers with 50 or more employees add the FMLA poster. States add their own required posters on top of these, and the official versions are free from the government.',
    sections: [
      {
        heading: 'Federal posters and who must display them',
        blocks: [
          {
            type: 'table',
            columns: ['Poster', 'Who must post it', 'Source'],
            rows: [
              [
                'Employee Rights Under the Fair Labor Standards Act (FLSA): minimum wage',
                'Every employer with employees covered by the FLSA',
                '[DOL posters](https://www.dol.gov/general/topics/posters)',
              ],
              [
                "Job Safety and Health: It's the Law (OSHA)",
                'Private employers in a business affecting commerce. States with their own OSHA-approved plan may have a state version.',
                '[OSHA](https://www.osha.gov/publications/poster)',
              ],
              [
                'Employee Polygraph Protection Act (EPPA)',
                'Private employers engaged in commerce (federal, state and local governments are excluded)',
                '[DOL posters](https://www.dol.gov/general/topics/posters)',
              ],
              [
                'Uniformed Services Employment and Reemployment Rights Act (USERRA)',
                'All employers covered by USERRA must give employees this notice of their rights',
                '[DOL posters](https://www.dol.gov/general/topics/posters)',
              ],
              [
                '"Know Your Rights: Workplace Discrimination is Illegal" (EEOC)',
                'Employers covered by federal anti-discrimination laws: generally 15 or more employees for at least 20 calendar weeks (20 or more for age discrimination)',
                '[EEOC](https://www.eeoc.gov/poster)',
              ],
              [
                'Employee Rights Under the Family and Medical Leave Act (FMLA)',
                'Private employers with 50 or more employees in 20 or more workweeks, plus public agencies and schools. Covered employers must post it even if no employee is eligible yet.',
                '[DOL posters](https://www.dol.gov/general/topics/posters)',
              ],
            ],
          },
          {
            type: 'p',
            text: 'Agricultural employers, federal contractors and some other groups have extra posters. The Department of Labor\'s free [FirstStep Poster Advisor](https://webapps.dol.gov/elaws/posters.htm) asks a few questions and lists the federal posters that apply to you.',
          },
        ],
      },
      {
        heading: 'Where and how to post',
        blocks: [
          {
            type: 'list',
            items: [
              'Put posters in a conspicuous place where employees (and, for the FMLA and EPPA notices, job applicants) can easily see them, such as a break room or near the entrance.',
              'If you have more than one location, each workplace needs its own set.',
              'Print copies are fine. OSHA accepts printed copies at least 8.5 by 14 inches with 10-point type, and you do not need to replace an older version of the OSHA poster.',
              'The penalties vary. The EEOC lists the penalty for not posting its notice as $680, adjusted each year for inflation. Covered employers that fail to post the OSHA poster can be cited.',
            ],
          },
          {
            type: 'p',
            text: 'You never need to buy these. OSHA says its poster is free and tells employers not to pay a third-party vendor for it, and every DOL and EEOC poster can be downloaded and printed at no cost. Letters that look official and demand payment for a poster set are sales offers.',
          },
        ],
      },
      {
        heading: 'Remote and hybrid teams',
        blocks: [
          {
            type: 'p',
            text: 'The Department of Labor\'s Wage and Hour Division explained in [Field Assistance Bulletin 2020-7](https://www.dol.gov/sites/dolgov/files/WHD/legacy/files/fab_2020_7.pdf) when electronic posting counts. For the FLSA poster, posting it online is enough only if all three are true:',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'All of your employees work remotely, with no physical workplace.',
              'All employees normally get information from you electronically.',
              'All employees can open the posting at any time without asking permission.',
            ],
          },
          {
            type: 'p',
            text: 'If some people work on site and others work from home full time, keep the paper posters at the workplace and add the electronic version for remote staff. Either way, tell employees exactly where to find the notices (for example, a pinned link on your intranet). The FMLA rules allow electronic posting when it meets the same visibility standard, and the EEOC encourages covered employers to post its notice on their website in addition to the physical poster.',
          },
        ],
      },
      {
        heading: 'State posters',
        blocks: [
          {
            type: 'p',
            text: 'States add their own: state minimum wage, paid sick leave, workers\' compensation, unemployment insurance and discrimination notices are common. Your state labor department lists them. Two examples:',
          },
          {
            type: 'list',
            items: [
              'California: [Workplace Postings](https://www.dir.ca.gov/wpnodb.html) from the Department of Industrial Relations, which lists each required notice, who must post it and the law behind it.',
              'New York: [Posting Requirements under NYS Labor Law](https://dol.ny.gov/posting-requirements) from the Department of Labor.',
            ],
          },
          {
            type: 'p',
            text: 'Some cities and counties have their own minimum wage or sick leave notices too. For state-by-state rules, start at [HR by state](/hr-by-state).',
          },
        ],
      },
      {
        heading: 'When to check again',
        blocks: [
          {
            type: 'list',
            items: [
              'When you hire your first employee, and when you first hire in a new state.',
              'When you reach 15 employees (EEOC notice) and 50 employees (FMLA notice). See [HR laws by company size](/guides/hr-laws-by-company-size).',
              'Whenever your state or city changes its minimum wage or leave rules, because the posters change with them.',
              'When you move offices or open a new one.',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Do I need labor law posters if everyone works remotely?',
        a: 'Yes, the notices are still required, but you can post them electronically. The Department of Labor accepts electronic FLSA posting when every employee works remotely, normally gets information electronically and can open the posting at any time.',
      },
      {
        q: 'Do I have to buy a poster bundle?',
        a: 'No. Federal posters are free to download from the DOL, OSHA and EEOC, and state labor departments publish theirs for free as well.',
      },
      {
        q: 'Do I need the FMLA poster if I have 20 employees?',
        a: 'Not as a private employer. The FMLA posting duty applies to private employers with 50 or more employees in 20 or more workweeks, plus public agencies and schools.',
      },
    ],
    mambahr:
      'MambaHR answers federal and state employment-law questions with the law cited, such as which notices apply once you hire your first person in a new state, and sends unclear cases to a person. It also does the onboarding admin, from new-hire forms to the first-week plan.',
    sources: [
      { label: 'DOL: Workplace Posters', url: 'https://www.dol.gov/general/topics/posters' },
      { label: 'DOL elaws: FirstStep Poster Advisor', url: 'https://webapps.dol.gov/elaws/posters.htm' },
      { label: "OSHA: Job Safety and Health, It's the Law poster", url: 'https://www.osha.gov/publications/poster' },
      { label: 'EEOC: "Know Your Rights" poster', url: 'https://www.eeoc.gov/poster' },
      { label: 'EEOC: Coverage of business and private employers', url: 'https://www.eeoc.gov/coverage-businessprivate-employers' },
      {
        label: 'DOL Wage and Hour Division: Field Assistance Bulletin 2020-7, electronic posting',
        url: 'https://www.dol.gov/sites/dolgov/files/WHD/legacy/files/fab_2020_7.pdf',
      },
      {
        label: '29 CFR 825.300, FMLA employer notice requirements',
        url: 'https://www.govinfo.gov/content/pkg/CFR-2025-title29-vol3/pdf/CFR-2025-title29-vol3-sec825-300.pdf',
      },
      { label: 'California DIR: Workplace Postings', url: 'https://www.dir.ca.gov/wpnodb.html' },
      { label: 'New York DOL: Posting Requirements', url: 'https://dol.ny.gov/posting-requirements' },
    ],
    related: [
      '/guides/new-hire-onboarding-checklist',
      '/guides/hr-laws-by-company-size',
      '/guides/how-to-hire-your-first-employee',
      '/guides/how-to-handle-an-fmla-request',
      '/hr-by-state',
    ],
  },

  // ── 5. Do I need an employee handbook? ────────────────────────────────────
  {
    slug: 'do-i-need-an-employee-handbook',
    category: 'Onboarding',
    title: 'Do I need an employee handbook?',
    metaTitle: 'Do I Need an Employee Handbook? What the Law Says | MambaHR',
    metaDescription:
      'No federal law requires an employee handbook, but some policies must be given in writing, like the FMLA notice and state harassment policies. What to include.',
    answer:
      'No federal law requires a small business to have an employee handbook, but some laws require specific policies or notices in writing: for example, an FMLA-covered employer must include its FMLA notice in the handbook if it has one, New York requires every employer to give new hires a written sexual harassment prevention policy, and California requires a written harassment, discrimination and retaliation prevention policy. A short handbook is usually the simplest place to keep those and to set expectations on pay, time off and conduct.',
    sections: [
      {
        heading: 'Policies some laws require in writing',
        blocks: [
          {
            type: 'p',
            text: 'Even without a handbook, these duties apply where the law covers you:',
          },
          {
            type: 'table',
            columns: ['Requirement', 'Who it applies to', 'What it says'],
            rows: [
              [
                'FMLA general notice',
                'Employers covered by the Family and Medical Leave Act (FMLA) that have eligible employees',
                'Put the notice in your handbook or other written leave and benefits guidance if you have it. If you do not, give a copy to each new employee at hire. Electronic delivery is allowed. (29 CFR 825.300(a)(3))',
              ],
              [
                'Sexual harassment prevention policy (New York)',
                'Every employer in New York',
                "Adopt the state model policy or one that meets or exceeds it, and give it to employees in writing at hire and at every annual training, in English and the employee's primary language where the state provides a model. (NY Labor Law 201-g)",
              ],
              [
                'Harassment, discrimination and retaliation prevention policy (California)',
                'Employers covered by the California Fair Employment and Housing Act',
                'Develop and distribute a written prevention policy with the elements listed in state regulations, and give employees the Civil Rights Department information sheet on sexual harassment or equivalent information. (Gov. Code 12950; 2 CCR 11023)',
              ],
            ],
          },
          {
            type: 'p',
            text: 'Other states have their own written-policy rules, and a few notices, such as the [California and New York wage notices](/guides/new-hire-onboarding-checklist), must be separate documents rather than handbook pages. The California Civil Rights Department publishes a free [sample policy](https://calcivilrights.ca.gov/2018/07/10/dfeh-issues-sample-equal-employment-opportunity-policy-for-california-employers/).',
          },
        ],
      },
      {
        heading: 'Why a handbook still helps a small team',
        blocks: [
          {
            type: 'list',
            items: [
              'It is one place for the notices and policies the law already requires you to hand out.',
              'Managers apply the same rules to everyone, which matters when a decision is later questioned.',
              'New hires get answers on pay, time off and who to talk to without having to ask.',
              'When you cross a size threshold (15 employees for most federal discrimination laws, 50 for the FMLA), you update one document instead of many emails.',
            ],
          },
        ],
      },
      {
        heading: 'What to put in it',
        blocks: [
          {
            type: 'list',
            items: [
              'Welcome and how to use the handbook: it explains policies, it is not a contract, and the company can change it.',
              'At-will statement, where your state allows it.',
              'Equal employment opportunity and anti-harassment policy, with more than one way to raise a complaint and a promise of no retaliation.',
              'Pay: pay schedule, how hours are tracked for nonexempt employees, overtime approval, and how to report a pay error. See [exempt vs non-exempt](/guides/exempt-vs-non-exempt) and [overtime rules](/guides/overtime-rules).',
              'Time off and leave: vacation or PTO, state paid sick leave, holidays, and family and medical leave. See [paid sick leave laws](/guides/paid-sick-leave-laws) and [paid family leave states](/guides/paid-family-leave-states).',
              'Benefits overview, pointing to the plan documents for detail.',
              'Conduct, attendance and remote work expectations.',
              'Equipment, data security and acceptable use of company systems.',
              'Leaving the company: notice you ask for, return of equipment, and how final pay works. See [final paycheck laws](/guides/final-paycheck-laws).',
            ],
          },
        ],
      },
      {
        heading: 'The at-will statement and the acknowledgment page',
        blocks: [
          {
            type: 'p',
            text: 'Most handbooks say that employment is at will (either side can end it at any time, for any lawful reason) and that nothing in the handbook is a contract. Write it plainly, and avoid promises elsewhere in the handbook that undercut it, such as guaranteeing a fixed set of warnings before anyone can be let go.',
          },
          {
            type: 'p',
            text: 'Montana is the exception to keep in mind: once an employee has finished the employer\'s probationary period, a discharge that is not for good cause can be wrongful under Montana Code 39-2-904. A Montana handbook should not promise at-will employment after probation.',
          },
          {
            type: 'p',
            text: 'Ask each employee to sign an acknowledgment that they received the handbook and will read it, and keep it in their personnel file. Collect a new acknowledgment when you make a material change.',
          },
        ],
      },
      {
        heading: 'Keeping it current',
        blocks: [
          {
            type: 'list',
            items: [
              'Review it at least once a year. Paid leave and minimum wage rules change often.',
              'If you have employees in more than one state, keep a core handbook and add a short state supplement for each state.',
              'Do not copy another company\'s handbook as is. Policies written for a different state or a bigger company can promise benefits you do not offer or miss rules that apply to you.',
              'When you cross 50 employees, add the FMLA notice and an FMLA policy. See [how to handle an FMLA request](/guides/how-to-handle-an-fmla-request).',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Is an employee handbook legally required?',
        a: 'Not under federal law. But some laws require specific written policies or notices, such as New York\'s sexual harassment prevention policy at hire and the FMLA notice for covered employers, and a handbook is the usual place to keep them.',
      },
      {
        q: 'Do employees have to sign the handbook?',
        a: 'A signature is not generally required by law, but a signed acknowledgment shows the employee received the policies. New York does require a signed acknowledgment for its separate wage notice.',
      },
      {
        q: 'Can I use a free template?',
        a: 'Yes, as a starting point. Edit it for your state, your size and the benefits you actually offer, and remove anything that promises more than you intend.',
      },
    ],
    mambahr:
      'MambaHR approves time-off requests within the policy you set, checks federal FMLA eligibility, and answers federal and state employment-law questions with the law cited. Unclear cases go to a person, and every change is logged.',
    sources: [
      {
        label: '29 CFR 825.300, FMLA employer notice requirements',
        url: 'https://www.govinfo.gov/content/pkg/CFR-2025-title29-vol3/pdf/CFR-2025-title29-vol3-sec825-300.pdf',
      },
      { label: 'New York Labor Law 201-G', url: 'https://www.nysenate.gov/legislation/laws/LAB/201-G' },
      { label: 'New York Labor Law 195', url: 'https://www.nysenate.gov/legislation/laws/LAB/195' },
      {
        label: 'California Government Code 12950',
        url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12950',
      },
      {
        label: 'California Civil Rights Department: sample EEO policy for California employers',
        url: 'https://calcivilrights.ca.gov/2018/07/10/dfeh-issues-sample-equal-employment-opportunity-policy-for-california-employers/',
      },
      {
        label: 'Montana Code 39-2-904, Elements of wrongful discharge',
        url: 'https://mca.legmt.gov/bills/mca/title_0390/chapter_0020/part_0090/section_0040/0390-0020-0090-0040.html',
      },
      { label: 'EEOC: Coverage of business and private employers', url: 'https://www.eeoc.gov/coverage-businessprivate-employers' },
    ],
    related: [
      '/guides/new-hire-onboarding-checklist',
      '/guides/how-to-handle-an-fmla-request',
      '/guides/paid-sick-leave-laws',
      '/guides/hr-laws-by-company-size',
      '/hr-by-state/california',
      '/hr-by-state/new-york',
    ],
  },
]
