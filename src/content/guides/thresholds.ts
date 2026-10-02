import type { Source, ThresholdsPage } from './types'

// ── Sources (every URL below was opened and read while writing this page) ──

const S = {
  flsa: {
    label: 'DOL: Fact Sheet #14, Coverage Under the FLSA',
    url: 'https://www.dol.gov/agencies/whd/fact-sheets/14-flsa-coverage',
  },
  i9: {
    label: 'USCIS: I-9 Central',
    url: 'https://www.uscis.gov/i-9-central',
  },
  eeocCoverage: {
    label: 'EEOC: Coverage of business and private employers',
    url: 'https://www.eeoc.gov/employers/coverage-businessprivate-employers',
  },
  eeocSmallBiz: {
    label: 'EEOC: Do the federal discrimination laws apply to my business?',
    url: 'https://www.eeoc.gov/employers/small-business/1-do-federal-employment-discrimination-laws-enforced-eeoc-apply-my',
  },
  eeocThreshold: {
    label: 'EEOC Compliance Manual: Section 2, Threshold issues',
    url: 'https://www.eeoc.gov/laws/guidance/section-2-threshold-issues',
  },
  pwfa: {
    label: 'EEOC: What you should know about the Pregnant Workers Fairness Act',
    url: 'https://www.eeoc.gov/wysk/what-you-should-know-about-pregnant-workers-fairness-act',
  },
  userra: {
    label: 'DOL Employment Law Guide: USERRA',
    url: 'https://webapps.dol.gov/elaws/elg/userra.htm',
  },
  irsTaxes: {
    label: 'IRS: Understanding employment taxes',
    url: 'https://www.irs.gov/businesses/small-businesses-self-employed/understanding-employment-taxes',
  },
  pump: {
    label: 'DOL: Fact Sheet #73, Break time for nursing employees under the FLSA',
    url: 'https://www.dol.gov/agencies/whd/fact-sheets/73-flsa-break-time-nursing-mothers',
  },
  eppa: {
    label: 'DOL: Employee Polygraph Protection Act',
    url: 'https://www.dol.gov/agencies/whd/polygraph',
  },
  twcThresholds: {
    label: 'Texas Workforce Commission: Thresholds for coverage under employment-related laws',
    url: 'https://efte.twc.texas.gov/thresholds_for_coverage.html',
  },
  oshaRule: {
    label: 'OSHA: 29 CFR 1904.1, Partial exemption for employers with 10 or fewer employees',
    url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1904/1904.1',
  },
  oshaRecordkeeping: {
    label: 'OSHA: Injury and illness recordkeeping and reporting',
    url: 'https://www.osha.gov/recordkeeping',
  },
  cobraGuide: {
    label: "DOL EBSA: An Employer's Guide to Group Health Continuation Coverage Under COBRA",
    url: 'https://www.dol.gov/sites/dolgov/files/ebsa/about-ebsa/our-activities/resource-center/publications/an-employers-guide-to-group-health-continuation-coverage-under-cobra.pdf',
  },
  fmla: {
    label: 'DOL: Fact Sheet #28, The Family and Medical Leave Act',
    url: 'https://www.dol.gov/agencies/whd/fact-sheets/28-fmla',
  },
  ale: {
    label: 'IRS: Determining if an employer is an applicable large employer',
    url: 'https://www.irs.gov/affordable-care-act/employers/determining-if-an-employer-is-an-applicable-large-employer',
  },
  aleReporting: {
    label: 'IRS: Information reporting by applicable large employers',
    url: 'https://www.irs.gov/affordable-care-act/employers/information-reporting-by-applicable-large-employers',
  },
  eeo1: {
    label: 'EEOC: EEO data collections',
    url: 'https://www.eeoc.gov/data/eeo-data-collections',
  },
  warn: {
    label: "DOL ETA: Employer's Guide to Advance Notice of Closings and Layoffs (WARN)",
    url: 'https://www.dol.gov/sites/dolgov/files/ETA/Layoff/pdfs/_EmployerWARN2003.pdf',
  },

  // California
  caFeha: {
    label: 'California Civil Rights Department: Employment',
    url: 'https://calcivilrights.ca.gov/employment/',
  },
  caCfra: {
    label: 'California Government Code 12945.2 (CFRA)',
    url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12945.2',
  },
  caTraining: {
    label: 'California Government Code 12950.1 (harassment prevention training)',
    url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12950.1',
  },
  caPayScale: {
    label: 'California Labor Code 432.3 (pay scale in job postings)',
    url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=432.3',
  },
  caPayData: {
    label: 'California Civil Rights Department: Pay data reporting',
    url: 'https://calcivilrights.ca.gov/paydatareporting/',
  },
  caWarn: {
    label: 'California EDD: Worker Adjustment and Retraining Notification (WARN)',
    url: 'https://edd.ca.gov/en/jobs_and_training/Layoff_Services_WARN/',
  },

  // New York
  nyHrl: {
    label: 'New York Executive Law 292 (Human Rights Law definitions)',
    url: 'https://www.nysenate.gov/legislation/laws/EXC/292',
  },
  nyPay: {
    label: 'New York State DOL: Pay transparency',
    url: 'https://dol.ny.gov/pay-transparency',
  },
  nySick: {
    label: 'New York State: Paid sick leave',
    url: 'https://www.ny.gov/new-york-paid-sick-leave/new-york-paid-sick-leave',
  },
  nyWarn: {
    label: 'New York Labor Law 860-A (WARN definitions)',
    url: 'https://www.nysenate.gov/legislation/laws/LAB/860-A',
  },

  // New Jersey
  njLad: {
    label: 'New Jersey Law Against Discrimination (N.J.S.A. 10:5-5), Division on Civil Rights',
    url: 'https://www.nj.gov/lps/dcr/downloads/NJ-Law-Against-Discrimination-Most-Updated.pdf',
  },
  njFlaPress: {
    label: 'NJ Department of Labor: Expanded job protections take effect July 17, 2026',
    url: 'https://www.nj.gov/labor/lwdhome/press/2026/20260715_moreprotections.shtml',
  },
  njFlaFaq: {
    label: 'NJ Division on Civil Rights: Family Leave Act FAQ',
    url: 'https://www.njoag.gov/wp-content/uploads/2024/02/New-Jersey-Family-Leave-Act-Frequently-Asked-Questions.pdf',
  },
  njPay: {
    label: 'NJ Department of Labor: Pay transparency',
    url: 'https://www.nj.gov/labor/myworkrights/wages/pay-transparency/',
  },
  njWarn: {
    label: 'NJ WARN Act, N.J.S.A. 34:21-1 et seq. (as amended 2023)',
    url: 'https://www.nj.gov/labor/assets/PDFs/WARN/NJ_WARN_ACT_2023law.pdf',
  },

  // Washington
  waWlad: {
    label: 'Washington State Human Rights Commission: Employment',
    url: 'https://www.hum.wa.gov/employment',
  },
  waPay: {
    label: 'Washington L&I: Equal Pay and Opportunities Act',
    url: 'https://lni.wa.gov/workers-rights/wages/equal-pay-opportunities-act/',
  },
  waWarn: {
    label: 'Washington Legislature: Final bill report, ESSB 5525 (2025)',
    url: 'https://lawfilesext.leg.wa.gov/biennium/2025-26/Htm/Bill%20Reports/Senate/5525-S.E%20SBR%20FBR%2025.htm',
  },

  // Colorado
  coCada: {
    label: 'Colorado Civil Rights Division: Discrimination',
    url: 'https://ccrd.colorado.gov/discrimination',
  },
  coFamli: {
    label: 'Colorado FAMLI: Small business corner',
    url: 'https://famli.colorado.gov/employers/small-business-corner',
  },

  // Illinois
  ilHra: {
    label: 'Illinois Department of Human Rights: Employment rights',
    url: 'https://dhr.illinois.gov/rights/employment-rights.html',
  },
  ilPay: {
    label: 'Illinois Department of Labor: Equal Pay Act salary transparency',
    url: 'https://labor.illinois.gov/laws-rules/conmed/equal-pay-act-salary-transparency.html',
  },
  ilPay101: {
    label: 'Illinois Department of Labor: Equal Pay Act and job postings (January 2025)',
    url: 'https://labor.illinois.gov/content/dam/soi/en/web/idol/laws-rules/conmed/documents/pay-transparency/PayTransparency%20101%20General%20January%202025.pdf',
  },
  ilWarn: {
    label: 'Illinois DCEO: WARN',
    url: 'https://dceo.illinois.gov/workforcedevelopment/warn.html',
  },

  // Florida
  flCivil: {
    label: 'Florida Statutes 760.02 (Florida Civil Rights Act definitions)',
    url: 'https://www.flsenate.gov/Laws/Statutes/2025/760.02',
  },
  flEverify: {
    label: 'Florida Statutes 448.095 (E-Verify)',
    url: 'https://www.flsenate.gov/Laws/Statutes/2025/448.095',
  },
  flWc: {
    label: "Florida Statutes 440.02 (workers' compensation definitions)",
    url: 'https://www.flsenate.gov/Laws/Statutes/2025/440.02',
  },

  // Georgia
  gaWc: {
    label: "Georgia State Board of Workers' Compensation: Insurance FAQs",
    url: 'https://sbwc.georgia.gov/frequently-asked-questions/workers-compensation-insurance-faqs',
  },
  gaFepa: {
    label: 'Georgia Commission on Equal Opportunity: Fair Employment Practices Act notice',
    url: 'https://gceo.georgia.gov/document/publication/gceo-ga-fepa-posterpdf/download',
  },

  // Texas
  txWc: {
    label: "Texas Department of Insurance: Workers' compensation for employers",
    url: 'https://www.tdi.texas.gov/wc/employer/index.html',
  },
} satisfies Record<string, Source>

export const thresholdsPage: ThresholdsPage = {
  title: 'HR laws by company size: what changes as you grow',
  metaTitle: 'HR Laws by Company Size: 1, 15, 20, 50, 100 Employees | MambaHR',
  metaDescription:
    'Federal HR laws switch on at 1, 15, 20, 50 and 100 employees: Title VII and ADA at 15, COBRA at 20, FMLA at 50, WARN at 100. Plus state thresholds.',
  answer:
    'Several federal employment laws apply to most employers from the first employee (minimum wage and overtime, Form I-9, payroll taxes, USERRA), and others start at 15 employees (Title VII, the ADA, the Pregnant Workers Fairness Act), 20 (age discrimination, COBRA), 50 (FMLA, Affordable Care Act employer rules) and 100 (EEO-1 reports, WARN layoff notices). Many states start earlier: California\'s discrimination rules apply at 5 employees, and New York\'s and New Jersey\'s at any size.',

  federal: [
    // ── 1 employee ──
    {
      employees: '1',
      sortKey: 1,
      law: 'Fair Labor Standards Act (FLSA): minimum wage and overtime',
      whatChanges:
        'Federal minimum wage and overtime pay. Covers most employers: every business with at least $500,000 in yearly sales, plus any employer whose employees do interstate work such as interstate calls, mail or transactions.',
      howCounted:
        'No headcount test. Coverage turns on sales volume or on the kind of work each employee does.',
      source: S.flsa,
    },
    {
      employees: '1',
      sortKey: 1,
      law: 'Employment eligibility verification (Form I-9)',
      whatChanges: 'Complete a Form I-9 for every person you hire to work in the United States.',
      howCounted: 'Every employer, from the first hire.',
      source: S.i9,
    },
    {
      employees: '1',
      sortKey: 1,
      law: 'Equal Pay Act (EPA)',
      whatChanges: 'Pay men and women equally for equal work.',
      howCounted: 'No minimum. The EEOC says virtually all employers are covered.',
      source: S.eeocCoverage,
    },
    {
      employees: '1',
      sortKey: 1,
      law: 'Uniformed Services Employment and Reemployment Rights Act (USERRA)',
      whatChanges:
        'Reemployment rights and protection from discrimination for employees who serve in the military.',
      howCounted: 'Virtually all U.S. employers, regardless of size.',
      source: S.userra,
    },
    {
      employees: '1',
      sortKey: 1,
      law: 'Federal payroll taxes (income tax withholding, Social Security and Medicare, FUTA)',
      whatChanges:
        'Withhold federal income tax and the employee share of Social Security and Medicare, pay the employer share, and pay federal unemployment (FUTA) tax from your own funds.',
      howCounted: 'Starts with your first employee on payroll.',
      source: S.irsTaxes,
    },
    {
      employees: '1',
      sortKey: 1,
      law: 'PUMP for Nursing Mothers Act (break time to pump)',
      whatChanges:
        'Reasonable break time and a private place, other than a bathroom, for nursing employees to pump breast milk for up to one year after the birth.',
      howCounted:
        'Applies under the FLSA. An employer with fewer than 50 employees can be excused only if compliance would cause undue hardship.',
      source: S.pump,
    },
    {
      employees: '1',
      sortKey: 1,
      law: 'Employee Polygraph Protection Act (EPPA)',
      whatChanges:
        'No lie detector tests for job applicants or employees, with narrow exceptions (certain security and pharmaceutical businesses, and some workplace theft investigations).',
      howCounted: 'Most private employers, regardless of size.',
      source: S.eppa,
    },

    // ── 4 employees ──
    {
      employees: '4',
      sortKey: 4,
      law: 'Immigration-related anti-discrimination rules (citizenship status and national origin)',
      whatChanges:
        'No discrimination based on citizenship status or national origin under the federal immigration law.',
      howCounted: '4 or more employees.',
      source: S.twcThresholds,
    },

    // ── 11 employees ──
    {
      employees: '11',
      sortKey: 11,
      law: 'OSHA injury and illness records (Occupational Safety and Health Act)',
      whatChanges:
        'Keep OSHA injury and illness records. With 10 or fewer employees at all times during the last calendar year you are partially exempt. Every employer, at any size, must still report a work-related death within 8 hours and an in-patient hospitalization, amputation or loss of an eye within 24 hours.',
      howCounted: "Your company's peak employment during the last calendar year.",
      source: S.oshaRule,
    },

    // ── 15 employees ──
    {
      employees: '15',
      sortKey: 15,
      law: 'Title VII of the Civil Rights Act (discrimination)',
      whatChanges:
        'No discrimination based on race, color, religion, sex (including pregnancy, sexual orientation and transgender status) or national origin.',
      howCounted:
        '15 or more employees for each working day in each of 20 or more calendar weeks in the current or preceding calendar year. Part-time employees count.',
      source: S.eeocThreshold,
    },
    {
      employees: '15',
      sortKey: 15,
      law: 'Americans with Disabilities Act (ADA), Title I',
      whatChanges: 'No discrimination against employees or applicants based on disability.',
      howCounted:
        'Same test as Title VII: 15 or more employees in each of 20 or more calendar weeks, this year or last.',
      source: S.eeocThreshold,
    },
    {
      employees: '15',
      sortKey: 15,
      law: 'Pregnant Workers Fairness Act (PWFA)',
      whatChanges:
        'Reasonable accommodation for known limitations related to pregnancy, childbirth or related medical conditions, unless it causes undue hardship. In effect since June 27, 2023.',
      howCounted: '15 or more employees.',
      source: S.pwfa,
    },
    {
      employees: '15',
      sortKey: 15,
      law: 'Genetic Information Nondiscrimination Act (GINA)',
      whatChanges: 'No discrimination based on genetic information.',
      howCounted: '15 or more employees for at least 20 calendar weeks, this year or last.',
      source: S.eeocCoverage,
    },

    // ── 20 employees ──
    {
      employees: '20',
      sortKey: 20,
      law: 'Age Discrimination in Employment Act (ADEA)',
      whatChanges: 'No discrimination against people age 40 and over.',
      howCounted:
        '20 or more employees for each working day in each of 20 or more calendar weeks in the current or preceding calendar year.',
      source: S.eeocThreshold,
    },
    {
      employees: '20',
      sortKey: 20,
      law: 'COBRA health coverage continuation',
      whatChanges:
        'Your group health plan must offer employees and their families who lose coverage the chance to continue it for a limited time.',
      howCounted:
        'At least 20 employees on more than 50 percent of typical business days in the previous calendar year. Part-time employees count as a fraction of a full-time employee.',
      source: S.cobraGuide,
    },

    // ── 50 employees ──
    {
      employees: '50',
      sortKey: 50,
      law: 'Family and Medical Leave Act (FMLA)',
      whatChanges:
        'Up to 12 workweeks of job-protected leave in a 12-month period (26 for military caregiver leave), with group health coverage kept in place.',
      howCounted:
        '50 or more employees in 20 or more workweeks in the current or previous calendar year. Each employee must also qualify: 12 months of service, 1,250 hours, and 50 employees within 75 miles of their worksite.',
      source: S.fmla,
    },
    {
      employees: '50',
      sortKey: 50,
      law: 'Affordable Care Act (ACA) employer rules',
      whatChanges:
        'You become an applicable large employer (ALE). The employer shared responsibility provisions apply, and you file Forms 1094-C and 1095-C with the IRS each year and give each full-time employee a Form 1095-C.',
      howCounted:
        'An average of 50 or more full-time employees, including full-time equivalents, during the prior year. Full time means 30 hours a week or 130 hours a month.',
      source: S.ale,
    },
    {
      employees: '50',
      sortKey: 50,
      law: 'PUMP Act small-employer exemption ends',
      whatChanges:
        'At 50 or more employees, the undue hardship exemption from the break time and private space rules is no longer available.',
      howCounted: 'All employees count, at every worksite.',
      source: S.pump,
    },

    // ── 100 employees ──
    {
      employees: '100',
      sortKey: 100,
      law: 'EEO-1 Component 1 report',
      whatChanges:
        'File the yearly EEO-1 workforce data report with the EEOC.',
      howCounted:
        'Private employers with 100 or more employees, and federal contractors with 50 or more employees that meet certain criteria.',
      source: S.eeo1,
    },
    {
      employees: '100',
      sortKey: 100,
      law: 'Worker Adjustment and Retraining Notification Act (WARN)',
      whatChanges:
        'Give at least 60 calendar days of written notice before a covered plant closing or mass layoff.',
      howCounted:
        '100 or more full-time employees (not counting those with under 6 months on the job or under 20 hours a week), or 100 or more employees who together work at least 4,000 hours a week.',
      source: S.warn,
    },
  ],

  state: [
    // California
    {
      state: 'California',
      employees: '1 (harassment), 5 (discrimination)',
      law: 'Fair Employment and Housing Act (FEHA)',
      whatChanges:
        'Discrimination rules apply at 5 or more employees, not 15. Harassment is banned in every workplace, even with fewer than 5 employees.',
      source: S.caFeha,
    },
    {
      state: 'California',
      employees: '5',
      law: 'California Family Rights Act (CFRA)',
      whatChanges:
        'Up to 12 workweeks of family and medical leave in a 12-month period, at 5 employees instead of the FMLA\'s 50. Employees qualify after more than 12 months and 1,250 hours.',
      source: S.caCfra,
    },
    {
      state: 'California',
      employees: '5',
      law: 'Sexual harassment prevention training',
      whatChanges:
        'Two hours of training for supervisors and one hour for other employees in California, repeated every two years.',
      source: S.caTraining,
    },
    {
      state: 'California',
      employees: '15',
      law: 'Pay scale in job postings (Labor Code 432.3)',
      whatChanges: 'Include the pay scale for the position in every job posting.',
      source: S.caPayScale,
    },
    {
      state: 'California',
      employees: '75',
      law: 'California WARN Act',
      whatChanges:
        '60 days of notice before a mass layoff, termination or relocation at a covered establishment, which kicks in at 75 employees instead of 100.',
      source: S.caWarn,
    },
    {
      state: 'California',
      employees: '100',
      law: 'Pay data reporting',
      whatChanges:
        'File a yearly pay data report with the Civil Rights Department. Applies at 100 or more payroll employees, or 100 or more workers hired through labor contractors.',
      source: S.caPayData,
    },

    // New York
    {
      state: 'New York',
      employees: '1',
      law: 'New York State Human Rights Law',
      whatChanges: 'The law defines "employer" to include all employers within the state, so there is no minimum headcount.',
      source: S.nyHrl,
    },
    {
      state: 'New York',
      employees: '1',
      law: 'Paid sick leave (4 or fewer employees)',
      whatChanges:
        'Up to 40 hours of sick leave a year. It is unpaid, unless the employer had net income over $1 million in the prior tax year, in which case it is paid.',
      source: S.nySick,
    },
    {
      state: 'New York',
      employees: '4',
      law: 'Pay transparency (Labor Law 194-B)',
      whatChanges: 'Pay ranges in job postings apply to businesses with four or more employees.',
      source: S.nyPay,
    },
    {
      state: 'New York',
      employees: '5',
      law: 'Paid sick leave (5 to 99 employees)',
      whatChanges: 'Up to 40 hours of paid sick leave a year.',
      source: S.nySick,
    },
    {
      state: 'New York',
      employees: '50',
      law: 'New York WARN Act',
      whatChanges:
        'State layoff notice duties apply at 50 employees (not counting part-time), or 50 employees who together work 2,000 hours a week, instead of the federal 100.',
      source: S.nyWarn,
    },
    {
      state: 'New York',
      employees: '100',
      law: 'Paid sick leave (100 or more employees)',
      whatChanges: 'Up to 56 hours of paid sick leave a year.',
      source: S.nySick,
    },

    // New Jersey
    {
      state: 'New Jersey',
      employees: '1',
      law: 'New Jersey Law Against Discrimination (LAD)',
      whatChanges: 'The law defines "employer" to include all persons, with no minimum headcount.',
      source: S.njLad,
    },
    {
      state: 'New Jersey',
      employees: '10',
      law: 'Pay and benefits transparency',
      whatChanges:
        'Pay or a pay range, plus a general description of benefits, in job and transfer postings. Counts 10 or more employees over 20 calendar weeks, inside or outside New Jersey. In effect since June 1, 2025.',
      source: S.njPay,
    },
    {
      state: 'New Jersey',
      employees: '15',
      law: 'New Jersey Family Leave Act (NJFLA)',
      whatChanges:
        'Job-protected family leave at 15 or more employees worldwide (lowered from 30 on July 17, 2026). Employees qualify after 3 months and 250 hours worked.',
      source: S.njFlaFaq,
    },
    {
      state: 'New Jersey',
      employees: '100',
      law: 'New Jersey WARN Act',
      whatChanges:
        'At least 90 days of notice before a covered closing or mass layoff (federal: 60), plus mandatory severance of one week of pay per full year of service, and four more weeks if full notice was not given.',
      source: S.njWarn,
    },

    // Massachusetts
    {
      state: 'Massachusetts',
      employees: '6',
      law: 'Chapter 151B (anti-discrimination)',
      whatChanges:
        'Discrimination rules apply at 6 or more employees, not 15. Covered employers must also have a written sexual harassment policy and give every employee a copy.',
      source: { label: 'M.G.L. c. 151B, s. 1 (definition of employer)', url: 'https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXI/Chapter151B/Section1' },
    },
    {
      state: 'Massachusetts',
      employees: '6',
      law: 'Massachusetts Parental Leave Act',
      whatChanges: '8 weeks of job-protected parental leave for the birth or adoption of a child, after 3 months of full-time work.',
      source: { label: 'M.G.L. c. 149, s. 105D (parental leave)', url: 'https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXI/Chapter149/Section105D' },
    },
    {
      state: 'Massachusetts',
      employees: '11',
      law: 'Earned Sick Time law',
      whatChanges:
        'Every employer must allow up to 40 hours a year of sick time. At 11 or more employees that time must be paid; below 11 it can be unpaid.',
      source: { label: 'Mass. Attorney General: Earned Sick Time', url: 'https://www.mass.gov/info-details/earned-sick-time' },
    },
    {
      state: 'Massachusetts',
      employees: '25',
      law: 'Wage Transparency Act',
      whatChanges:
        'Pay ranges in job postings, and on request or with a promotion or transfer, at 25 or more employees in Massachusetts (since October 29, 2025).',
      source: { label: 'Mass. Legislature: Chapter 141 of the Acts of 2024', url: 'https://malegislature.gov/Laws/SessionLaws/Acts/2024/Chapter141' },
    },
    {
      state: 'Massachusetts',
      employees: '25',
      law: 'Paid Family and Medical Leave (PFML) contributions',
      whatChanges:
        'Employers with 25 or more covered individuals pay the employer share of the PFML contribution. Smaller employers still send in the employee share.',
      source: { label: 'Mass. DFML: Employer contribution rates', url: 'https://www.mass.gov/info-details/paid-family-and-medical-leave-employer-contribution-rates-and-calculator' },
    },
    {
      state: 'Massachusetts',
      employees: '100',
      law: 'Workforce data reporting',
      whatChanges:
        'Employers with 100 or more employees in Massachusetts that file an EEO-1 report must also file a copy with the Secretary of the Commonwealth by February 1.',
      source: { label: 'Mass. EOLWD: Workforce Data Reporting FAQs', url: 'https://www.mass.gov/info-details/workforce-data-reporting-faqs' },
    },

    // Washington
    {
      state: 'Washington',
      employees: '8',
      law: 'Washington Law Against Discrimination (WLAD)',
      whatChanges: 'Discrimination rules apply at 8 or more employees (religious organizations excluded).',
      source: S.waWlad,
    },
    {
      state: 'Washington',
      employees: '15',
      law: 'Equal Pay and Opportunities Act (pay transparency)',
      whatChanges:
        'Job postings must include a wage scale or salary range and a general description of benefits and other compensation.',
      source: S.waPay,
    },
    {
      state: 'Washington',
      employees: '50',
      law: 'Washington state WARN law',
      whatChanges:
        'Since July 27, 2025, employers of 50 or more full-time employees must give 60 days of written notice before a business closing or mass layoff.',
      source: S.waWarn,
    },

    // Colorado
    {
      state: 'Colorado',
      employees: '1',
      law: 'Colorado Anti-Discrimination Act (CADA)',
      whatChanges:
        'Employers in Colorado may not discriminate based on a protected class, which in Colorado includes marital status and age 40 and over. The law sets no minimum headcount.',
      source: S.coCada,
    },
    {
      state: 'Colorado',
      employees: '10',
      law: 'Family and Medical Leave Insurance (FAMLI) employer premium',
      whatChanges:
        'Employers with 10 or more employees pay the employer share of the FAMLI premium. Smaller employers still withhold and send in the employee share every quarter.',
      source: S.coFamli,
    },

    // Illinois
    {
      state: 'Illinois',
      employees: '1',
      law: 'Illinois Human Rights Act',
      whatChanges:
        'Most discrimination claims apply once you have 1 employee in each of 20 or more calendar weeks this year or last. Sexual harassment and pregnancy rules cover every employer.',
      source: S.ilHra,
    },
    {
      state: 'Illinois',
      employees: '15',
      law: 'Equal Pay Act salary transparency',
      whatChanges:
        'Pay scale and benefits in job postings for work done at least partly in Illinois, since January 1, 2025. Employees inside and outside Illinois, part-time and full-time, all count.',
      source: S.ilPay101,
    },
    {
      state: 'Illinois',
      employees: '75',
      law: 'Illinois WARN Act',
      whatChanges:
        '60 days of notice before a plant closing or mass layoff, at 75 or more full-time employees instead of 100.',
      source: S.ilWarn,
    },

    // Florida
    {
      state: 'Florida',
      employees: '4',
      law: "Workers' compensation insurance",
      whatChanges:
        'Coverage is required at 4 or more employees for most private employers. Construction employers need it from 1 employee.',
      source: S.flWc,
    },
    {
      state: 'Florida',
      employees: '15',
      law: 'Florida Civil Rights Act',
      whatChanges:
        'State discrimination rules use the same 15-employee, 20-week test as Title VII, so a Florida employer below 15 is outside both.',
      source: S.flCivil,
    },
    {
      state: 'Florida',
      employees: '25',
      law: 'E-Verify for private employers',
      whatChanges:
        'Since July 1, 2023, private employers with 25 or more employees must run every new hire through E-Verify within 3 business days after employment begins.',
      source: S.flEverify,
    },

    // Georgia
    {
      state: 'Georgia',
      employees: '3',
      law: "Workers' compensation insurance",
      whatChanges:
        'Required once you regularly employ 3 or more people. Regular part-time employees count, and corporate officers and LLC members count even if they opt out of coverage.',
      source: S.gaWc,
    },
    {
      state: 'Georgia',
      employees: '15 (state agencies only)',
      law: 'Georgia Fair Employment Practices Act',
      whatChanges:
        'Covers employment by Georgia state government agencies with 15 or more employees. Private employers are not covered by it, so they follow the federal thresholds.',
      source: S.gaFepa,
    },

    // Texas
    {
      state: 'Texas',
      employees: '1 (harassment), 15 (discrimination)',
      law: 'Texas Labor Code chapter 21',
      whatChanges:
        'State discrimination rules start at 15 employees, matching Title VII, but the sexual harassment rules cover employers with one or more employees.',
      source: S.twcThresholds,
    },
    {
      state: 'Texas',
      employees: 'Optional',
      law: "Workers' compensation insurance",
      whatChanges:
        'Most private employers may choose not to carry it. Employers without coverage must tell the state and report work injuries with more than one day of lost time, illnesses and deaths.',
      source: S.txWc,
    },
  ],

  sections: [
    {
      heading: 'How employees are counted',
      blocks: [
        {
          type: 'p',
          text: 'Each law has its own counting rule, so the same team can be "15 employees" under one law and "12" under another. The most common tests:',
        },
        {
          type: 'table',
          caption: 'Federal counting rules',
          columns: ['Law', 'How the headcount works'],
          rows: [
            [
              'Title VII, ADA, GINA (15) and ADEA (20)',
              'Count everyone on payroll for each working day in 20 or more calendar weeks, this year or last. The weeks do not have to be consecutive. Someone who works only Mondays counts for the whole week. Add temporary or staffing agency workers you also employ.',
            ],
            [
              'FMLA (50)',
              'Employer test: 50 or more employees in 20 or more workweeks this year or last. Eligibility test, per employee: 12 months of service, 1,250 hours in the past 12 months, and 50 employees within 75 miles of their worksite.',
            ],
            [
              'COBRA (20)',
              'Look back at the previous calendar year: 20 or more employees on more than half of typical business days. A part-time employee counts as a fraction (20 hours a week out of 40 counts as one half).',
            ],
            [
              'ACA (50)',
              'Average the prior year. Full-time is 30 hours a week or 130 hours a month. Add part-time hours each month (up to 120 per person), divide by 120 to get full-time equivalents, then average the year.',
            ],
            [
              'WARN (100)',
              'Leave out part-time workers (under 20 hours a week or under 6 months on the job), or use the other test: 100 or more employees working a combined 4,000 hours a week.',
            ],
            [
              'OSHA records (11)',
              'Use your peak employment during the last calendar year.',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Several of these tests look back at the previous calendar year (COBRA, ACA, OSHA records), so check your numbers each January. A spring hiring push can change what applies next year, not just today.',
        },
      ],
    },
    {
      heading: 'State laws often start at a smaller size',
      blocks: [
        {
          type: 'p',
          text: 'Federal thresholds are the floor. In several states the same kind of rule starts much earlier: discrimination rules with as few as 1 employee in New York, New Jersey, Colorado and Illinois, at 5 employees in California and at 8 in Washington. California family leave starts at 5 employees and New Jersey family leave at 15, long before the FMLA at 50. State layoff notice laws start at 50 (New York, Washington) or 75 (California, Illinois).',
        },
        {
          type: 'p',
          text: 'Before you rely on "we are under 15" or "we are under 50", check every state where you have someone working. The state pages cover the details for [California](/hr-by-state/california), [New York](/hr-by-state/new-york), [New Jersey](/hr-by-state/new-jersey), [Washington](/hr-by-state/washington), [Colorado](/hr-by-state/colorado), [Illinois](/hr-by-state/illinois), [Massachusetts](/hr-by-state/massachusetts), [Florida](/hr-by-state/florida), [Georgia](/hr-by-state/georgia) and [Texas](/hr-by-state/texas).',
        },
      ],
    },
    {
      heading: 'Contractors and remote employees',
      blocks: [
        {
          type: 'list',
          items: [
            'Independent contractors do not count toward the federal anti-discrimination thresholds, as long as they really are contractors. If a "contractor" is legally an employee, they count, and the misclassification is its own problem. See [contractor vs. employee](/guides/contractor-vs-employee).',
            'Remote employees count. State laws generally follow the place where the work is done, so one remote hire in a new state can bring that state\'s rules with them. See [hiring employees in another state](/guides/hiring-employees-in-another-state).',
            'Some state laws count your whole company, not just the people in that state. Illinois pay transparency counts employees inside and outside Illinois. New Jersey pay transparency counts employees inside or outside New Jersey, and the New Jersey Family Leave Act counts employees worldwide.',
            'Owners can count too. In Georgia, corporate officers and LLC members count toward the 3-employee workers\' compensation threshold.',
          ],
        },
      ],
    },
    {
      heading: 'What to set up as you cross each line',
      blocks: [
        {
          type: 'list',
          items: [
            'From your first hire: a Form I-9 for each new employee, payroll tax withholding, and minimum wage and overtime tracking. See [how to hire your first employee](/guides/how-to-hire-your-first-employee).',
            '15 employees: federal discrimination and accommodation rules now apply, so it is a good time to write down your anti-harassment policy and how people ask for disability and pregnancy accommodations. An [employee handbook](/guides/do-i-need-an-employee-handbook) is the usual home for both.',
            '20 employees: COBRA notices for anyone who loses health coverage. See [when you need to offer COBRA](/guides/when-do-you-need-to-offer-cobra).',
            '50 employees: an FMLA process and notices (see [how to handle an FMLA request](/guides/how-to-handle-an-fmla-request)), and an ACA plan for offering coverage to full-time employees with yearly 1094-C and 1095-C filings (see [do small businesses have to offer health insurance](/guides/do-small-businesses-have-to-offer-health-insurance)).',
            '100 employees: the yearly EEO-1 report, and WARN planning before any large layoff. See [WARN Act layoffs](/guides/warn-act-layoffs).',
          ],
        },
      ],
    },
  ],

  faq: [
    {
      q: 'At what size do you need to offer FMLA leave?',
      a: 'The federal Family and Medical Leave Act (FMLA) applies once you have 50 or more employees in 20 or more workweeks in the current or previous calendar year. An employee also needs 12 months of service, 1,250 hours in the past year and 50 employees within 75 miles of their worksite. State laws can apply sooner: California at 5 employees and New Jersey at 15.',
    },
    {
      q: 'When do you have to file an EEO-1 report?',
      a: 'Private employers with 100 or more employees file the EEO-1 Component 1 report with the EEOC every year. Federal contractors with 50 or more employees that meet certain criteria file too.',
    },
    {
      q: 'Do part-time employees count toward these thresholds?',
      a: 'Usually yes. For Title VII, the ADA and the ADEA, anyone on payroll counts for the whole week regardless of schedule, COBRA counts part-time employees as a fraction, and the ACA turns part-time hours into full-time equivalents. Federal WARN is the main exception: its 100-employee test leaves out part-time workers.',
    },
    {
      q: 'When does COBRA apply to a small business?',
      a: 'Federal COBRA applies to group health plans of employers that had at least 20 employees on more than half of their typical business days in the previous calendar year. Part-time employees count as a fraction of a full-time employee.',
    },
    {
      q: 'Do independent contractors count as employees for these laws?',
      a: 'No, not if they are correctly classified. The EEOC excludes independent contractors when counting employees, but a worker who is legally an employee counts no matter what the contract says.',
    },
  ],

  mambahr:
    'MambaHR keeps your employee records and answers federal and state employment-law questions with the law cited, so you can ask which of these rules apply to your team right now. It checks federal FMLA eligibility on leave requests, prepares COBRA continuation notices at offboarding, and plans reductions in force with legal checks, while a person makes the decisions that matter.',

  sources: Object.values(S),

  related: [
    '/guides/how-to-handle-an-fmla-request',
    '/guides/when-do-you-need-to-offer-cobra',
    '/guides/warn-act-layoffs',
    '/guides/do-small-businesses-have-to-offer-health-insurance',
    '/guides/contractor-vs-employee',
    '/hr-by-state',
  ],
}
