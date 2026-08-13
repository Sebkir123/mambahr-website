import type { Metadata } from 'next'
import LegalPage, { type LegalSection } from '@/components/legal/legal-page'
import DraftNotice from '@/components/legal/draft-notice'

const UPDATED = '13 August 2026'
const description =
  'MambaHR Data Processing Addendum: customer data protection terms, security schedule, international transfers, and subprocessors. Draft published for review; not in force.'

// noindex + absent from sitemap.ts. No robots.txt Disallow on purpose: a
// disallowed crawler never reads the noindex directive.
export const metadata: Metadata = {
  title: 'Data Processing Addendum | MambaHR',
  description,
  alternates: { canonical: 'https://mambahr.com/dpa' },
  robots: { index: false, follow: false, nocache: true },
}

/** Verified 2026-08-13 against the product's own infrastructure: api/go.mod,
 *  infra/ CDK stacks, and the outbound endpoints in api/internal. Every row
 *  below corresponds to a live dependency. Do not add a row that is not wired. */
const SUBPROCESSORS: Array<[string, string, string]> = [
  [
    'Amazon Web Services, Inc.',
    'Cloud infrastructure and AI model services',
    'Primary hosting and processing: managed database, application compute, object storage for documents, cache and queue, key management, secrets, transactional email, logging and metrics, document text extraction, and speech transcription. Also Amazon Bedrock, which serves the Claude models used by AI features. United States regions.',
  ],
  [
    'Temporal Technologies, Inc. (Temporal Cloud)',
    'Durable workflow orchestration',
    'Workflow state and history for long-running HR processes. Workflow payloads are encrypted by MambaHR before transmission, so Temporal Cloud stores ciphertext and does not hold the keys.',
  ],
  [
    'Qdrant Solutions GmbH (Qdrant Cloud)',
    'Vector database',
    'Embeddings and payload metadata supporting retrieval for policy, knowledge, and compliance features.',
  ],
  [
    'WorkOS, Inc.',
    'Enterprise identity, SSO, and directory sync',
    'User identity, authentication, single sign-on, SCIM directory data, and audit log events.',
  ],
  [
    'Google LLC',
    'AI model services',
    'Inputs and outputs for enabled AI features routed to Gemini models.',
  ],
  [
    'Google LLC',
    'Workspace integration',
    'Calendar and Drive data accessed only under scopes Customer authorizes.',
  ],
  [
    'Stripe, Inc.',
    'Payment processing',
    'Billing contact and payment method data used to invoice and collect MambaHR subscription fees. Stripe does not receive workforce data.',
  ],
  [
    'Checkr, Inc.',
    'Background checks',
    'Candidate identifiers including government identifier and date of birth, only where Customer enables screening.',
  ],
  [
    'DocuSign, Inc.',
    'Electronic signature',
    'Documents sent for signature, including offer letters and separation agreements.',
  ],
  [
    'Tracker I-9',
    'Form I-9 and E-Verify',
    'Employment eligibility verification data, including the government identifier required by law for E-Verify, where Customer enables the feature.',
  ],
]

const PROCESSING: Array<[string, string]> = [
  [
    'Subject matter',
    'Processing Customer Personal Data to provide, secure, support, and improve the Services for Customer.',
  ],
  ['Duration', 'For the term of the Agreement and the deletion period described in Section 9.'],
  [
    'Nature and operations',
    'Collection, access, hosting, storage, organization, retrieval, analysis, generation, transmission, integration, workflow automation, logging, support, export, deletion, and de-identification.',
  ],
  [
    'Purposes',
    'HR administration, workforce workflows, hiring and onboarding, employee records, time and leave, performance and development, compensation, compliance support, reporting, communications, approved automation, security, and support, as enabled and instructed by Customer.',
  ],
  [
    'Data subjects',
    'Customer users and representatives; applicants; current and former employees; contractors and contingent workers; managers; dependents and beneficiaries when Customer lawfully submits their data; and other individuals whose data Customer directs MambaHR to process.',
  ],
  [
    'Personal data',
    'Identifiers and contact details; account and device data; job and organizational information; employment dates and status; compensation; performance and development; recruiting; time, attendance, and leave; policies and acknowledgments; communications; documents; workflow and approval history; and Customer-configured fields.',
  ],
  [
    'Regulated data',
    'Where a supported feature and Customer instruction require it: government identifiers (Form I-9, E-Verify, and background checks), financial account details for payroll delivery, date of birth, compensation, protected-characteristic data, and disability or leave information. These are accepted only through the dedicated encrypted fields built for them. Payment-card data, biometric identifiers, and HIPAA-regulated protected health information are not supported and must not be submitted unless separate written terms expressly authorize them.',
  ],
  [
    'Frequency',
    'Continuous or event-driven, depending on Customer use and connected systems.',
  ],
  [
    'Customer instructions',
    'The Agreement, Orders, Customer configurations, Authorized User actions, support requests, and other documented directions.',
  ],
]

const MEASURES = [
  'Access governance based on role, least privilege, unique accounts, and periodic review of privileged access.',
  'Authentication controls, secure session management, and multi-factor authentication for administrative or privileged access where supported.',
  'Encryption of Customer Personal Data in transit and at rest using industry-standard mechanisms, with protected management of credentials, tokens, keys, and secrets. Specially regulated fields are additionally encrypted at the field level under separately managed keys.',
  'Logical tenant separation enforced in the database layer, designed to prevent cross-customer access.',
  'Logging and audit records for material access, administrative actions, and workflow changes, with protection against unauthorized modification.',
  'Secure development and change-management practices, code review, dependency management, and testing proportionate to risk.',
  'Vulnerability identification, prioritization, and remediation processes appropriate to the severity and exposure of a finding.',
  'Malware protection, network and application protections, monitoring, and alerting appropriate to the hosted environment.',
  'Backup, recovery, and continuity measures designed to restore availability and access after an incident, with backups protected from unauthorized access.',
  'Incident-response procedures for identification, containment, investigation, remediation, communication, and lessons learned.',
  'Vendor diligence and written data-protection and confidentiality obligations for subprocessors.',
  'Personnel confidentiality, access termination, security awareness, and disciplinary processes.',
  'Data minimization, retention, export, deletion, and de-identification controls aligned with Customer instructions and legal requirements.',
  'AI-provider configuration and data-minimization measures designed to prevent generalized model training on Customer Personal Data.',
]

const sections: LegalSection[] = [
  {
    heading: '1. Scope and roles',
    body: (
      <>
        <p>
          <strong>1.1</strong> This DPA applies when MambaHR processes Customer Personal Data on
          behalf of Customer. Customer is the controller or business and MambaHR is the processor or
          service provider. If Customer is itself a processor, MambaHR acts as Customer&rsquo;s
          subprocessor.
        </p>
        <p>
          <strong>1.2</strong> <strong>Customer Personal Data</strong> means personal data or
          personal information contained in Customer Data that MambaHR processes on
          Customer&rsquo;s behalf. <strong>Data Protection Law</strong> means applicable privacy and
          data-protection law, including the California Consumer Privacy Act as amended and similar
          United States state privacy laws, and, where applicable to a transfer described in Section
          8, the GDPR, UK GDPR, and Swiss data-protection law.
        </p>
        <p>
          <strong>1.3</strong> MambaHR is a separate controller or business for account, billing,
          relationship, security, and business-operation data it processes for its own purposes
          under the <a href="/privacy">Privacy Policy</a>. This DPA does not apply to that
          independent processing.
        </p>
      </>
    ),
  },
  {
    heading: '2. Customer instructions and obligations',
    body: (
      <>
        <p>
          <strong>2.1</strong> MambaHR will process Customer Personal Data only to provide, secure,
          support, and improve the Services for Customer; follow Customer&rsquo;s documented
          instructions; comply with the Agreement; and comply with law. The Agreement, Customer
          configurations, Authorized User actions, and support requests are Customer&rsquo;s
          documented instructions.
        </p>
        <p>
          <strong>2.2</strong> If MambaHR believes an instruction violates Data Protection Law,
          MambaHR will notify Customer unless law prohibits notice and may suspend the affected
          processing until the parties resolve the issue.
        </p>
        <p>
          <strong>2.3</strong> Customer is responsible for the lawfulness, fairness, transparency,
          accuracy, and scope of its instructions and Customer Personal Data. Customer will provide
          required notices, establish a legal basis, respond to individuals, configure retention and
          access appropriately, and avoid submitting data prohibited by the Agreement.
        </p>
        <p>
          <strong>2.4</strong> Customer is responsible for laws regulating employers, employment
          decisions, workplace monitoring, automated decision systems, biometrics, health data,
          payroll, benefits, and communications. MambaHR does not determine Customer&rsquo;s legal
          basis or whether Customer&rsquo;s use is lawful.
        </p>
      </>
    ),
  },
  {
    heading: '3. Confidentiality and personnel',
    body: (
      <p>
        MambaHR will ensure that personnel authorized to process Customer Personal Data are bound by
        confidentiality obligations and receive access only as needed for their duties. MambaHR is
        responsible for its personnel&rsquo;s compliance with this DPA.
      </p>
    ),
  },
  {
    heading: '4. Security',
    body: (
      <>
        <p>
          MambaHR will maintain the technical and organizational measures in Schedule 2. Those
          measures are designed to provide a level of security appropriate to the risk, taking into
          account the state of the art, implementation cost, processing context, and nature of the
          data. MambaHR may update measures without materially reducing overall protection.
        </p>
        <p>
          Customer is responsible for secure administration of its accounts, endpoints, credentials,
          access approvals, integrations, and configurations. Customer will promptly notify MambaHR
          of suspected compromise involving Customer accounts.
        </p>
      </>
    ),
  },
  {
    heading: '5. Security incidents',
    body: (
      <>
        <p>
          MambaHR will notify Customer without undue delay after confirming a breach of security
          that results in accidental or unlawful destruction, loss, alteration, unauthorized
          disclosure of, or access to Customer Personal Data in MambaHR&rsquo;s control (
          <strong>Security Incident</strong>). Notification is not an admission of fault or
          liability.
        </p>
        <p>
          MambaHR will provide information reasonably available about the nature of the Security
          Incident, affected data and individuals, likely consequences, mitigation, and a contact
          for follow-up. Information may be provided in phases. MambaHR will take reasonable steps
          to contain, investigate, and remediate the Security Incident.
        </p>
        <p>
          Unsuccessful attempts, pings, scans, blocked attacks, and events that do not compromise
          Customer Personal Data are not Security Incidents. Customer is responsible for legally
          required notices to individuals and regulators, except to the extent law assigns that duty
          directly to MambaHR. The parties will coordinate notices when practicable.
        </p>
      </>
    ),
  },
  {
    heading: '6. Assistance',
    body: (
      <>
        <p>
          Considering the nature of processing and information available, MambaHR will reasonably
          assist Customer with data-subject requests, security obligations, breach notifications,
          data-protection impact assessments, and regulator consultations required by Data
          Protection Law. Customer will first use available self-service tools. MambaHR may charge
          reasonable fees for assistance that is unusually burdensome or unrelated to
          MambaHR&rsquo;s breach.
        </p>
        <p>
          MambaHR will not respond directly to a request concerning Customer-controlled data unless
          Customer instructs MambaHR, law requires a response, or the response directs the requester
          to Customer.
        </p>
      </>
    ),
  },
  {
    heading: '7. Subprocessors',
    body: (
      <>
        <p>
          <strong>7.1</strong> Customer gives general authorization for MambaHR to use the
          subprocessors in Schedule 3 and replacement or additional subprocessors needed to provide
          the Services. MambaHR will bind each subprocessor to data-protection obligations that
          provide materially equivalent protection for the processing it performs.
        </p>
        <p>
          <strong>7.2</strong> MambaHR will provide notice of a new subprocessor at least 15 days
          before that subprocessor processes Customer Personal Data when reasonably practicable.
          Customer may object during that period on reasonable data-protection grounds. The parties
          will work in good faith on a commercially reasonable alternative. If no alternative is
          available, either party may terminate only the affected Service, and MambaHR will refund
          prepaid fees for the unused affected period.
        </p>
        <p>
          <strong>7.3</strong> MambaHR remains responsible for a subprocessor&rsquo;s performance of
          its data-protection obligations to the same extent MambaHR would be responsible if it
          performed the processing itself.
        </p>
        <p>
          <strong>7.4</strong> A Third-Party Service that Customer contracts with directly is not
          MambaHR&rsquo;s subprocessor merely because MambaHR enables an integration.
          Customer&rsquo;s direct agreement with that provider governs the provider&rsquo;s
          processing and payment obligations. This includes Deel under the customer-funded model,
          Customer&rsquo;s messaging workspace, Customer&rsquo;s identity provider and device
          management, Customer&rsquo;s benefits providers, and the HRIS or ATS systems Customer
          authorizes MambaHR to import from.
        </p>
      </>
    ),
  },
  {
    heading: '8. International transfers',
    body: (
      <>
        <p>
          <strong>8.1</strong> MambaHR commits to United States storage for Customer Personal Data
          unless an Order states otherwise. MambaHR sells to United States employers, and the
          Services are not offered for the establishment of employment in the European Economic
          Area, the United Kingdom, or Switzerland. The remainder of this Section applies only if
          Customer Personal Data is nonetheless transferred from one of those regions to a country
          not recognized as providing adequate protection.
        </p>
        <p>
          <strong>8.2 EEA transfers.</strong> The controller-to-processor clauses in Module Two of
          the European Commission Standard Contractual Clauses adopted by Implementing Decision (EU)
          2021/914 are incorporated when Customer is a controller. Module Three applies when
          Customer is a processor. Clause 7 applies. Option 2 in Clause 9 applies with the notice
          period in Section 7. The optional language in Clause 11 does not apply. For Clause 17, the
          law of Ireland applies. For Clause 18, the courts of Ireland have jurisdiction. Schedules
          1 through 3 of this DPA complete the relevant annexes.
        </p>
        <p>
          <strong>8.3 UK transfers.</strong> The UK International Data Transfer Addendum issued by
          the UK Information Commissioner, version B1.0, is incorporated and completed using this
          DPA and the applicable Standard Contractual Clauses. If the Addendum conflicts with the
          Agreement, the Addendum controls for the restricted transfer.
        </p>
        <p>
          <strong>8.4 Swiss transfers.</strong> The Standard Contractual Clauses apply with
          references adapted to the Swiss Federal Act on Data Protection, the competent Swiss
          authority, and Swiss data subjects, while preserving GDPR references when both laws apply.
        </p>
        <p>
          <strong>8.5 Supplementary measures.</strong> MambaHR will provide information reasonably
          needed for transfer assessments and will apply the security measures in Schedule 2. If a
          valid successor transfer mechanism becomes available, MambaHR may rely on it after notice.
        </p>
      </>
    ),
  },
  {
    heading: '9. Return and deletion',
    body: (
      <>
        <p>
          During the subscription and for 30 days after termination, Customer may request a standard
          export of Customer Personal Data, subject to product capability and payment of undisputed
          fees. After that period, MambaHR will delete or de-identify Customer Personal Data within
          60 days unless law requires retention. Backups and immutable security records may remain
          until deleted on their normal cycle, protected and not used for other purposes.
        </p>
        <p>
          MambaHR may retain limited evidence of deletion, billing, security, and contractual
          records as an independent controller where lawful. Upon written request, MambaHR will
          confirm completion of deletion required by this Section.
        </p>
      </>
    ),
  },
  {
    heading: '10. Audits and information',
    body: (
      <>
        <p>
          MambaHR will make available information reasonably necessary to demonstrate compliance,
          such as relevant policies, summaries, questionnaires, certifications, or independent
          reports when available. Customer may request this information no more than once annually
          unless a Security Incident or regulator requires more frequent review.
        </p>
        <p>
          If documentation is insufficient and Data Protection Law requires an audit, Customer may
          conduct a remote audit during normal business hours with at least 30 days&rsquo; notice,
          subject to confidentiality and reasonable scope. An on-site audit is permitted only when
          legally required or following a material Security Incident and must avoid disruption and
          exposure of other customers&rsquo; data. Customer pays audit costs unless the audit
          identifies MambaHR&rsquo;s material breach.
        </p>
      </>
    ),
  },
  {
    heading: '11. United States state privacy terms',
    body: (
      <>
        <p>
          To the extent MambaHR processes Personal Information as a service provider, contractor, or
          processor under United States state privacy law, MambaHR will:
        </p>
        <ul>
          <li>
            Process Personal Information only for the business purposes in the Agreement and
            Customer&rsquo;s documented instructions.
          </li>
          <li>
            Not sell Personal Information or share it for cross-context behavioral advertising.
          </li>
          <li>
            Not retain, use, or disclose Personal Information outside the direct business
            relationship with Customer or for an unrelated commercial purpose, except as permitted
            by law.
          </li>
          <li>
            Not combine Personal Information with information received from another customer or
            collected from MambaHR&rsquo;s own interactions with an individual except as permitted
            by law to provide the Services.
          </li>
          <li>
            Provide the same level of privacy protection required of Customer for the processing
            delegated to MambaHR, notify Customer if MambaHR can no longer meet an applicable
            obligation, and allow reasonable steps to stop and remediate unauthorized use.
          </li>
          <li>
            Require subprocessors to comply with applicable service-provider, contractor, or
            processor restrictions.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: '12. AI processing',
    body: (
      <>
        <p>
          Customer instructs MambaHR to process Customer Personal Data through authorized AI
          features to provide the Services. MambaHR will not use Customer Personal Data or
          identifiable inputs or outputs to train or improve a model offered to other customers or
          the public unless Customer expressly authorizes it in writing. MambaHR may process
          de-identified and aggregated operational data that cannot reasonably identify Customer or
          an individual.
        </p>
        <p>
          Customer is responsible for deciding whether an AI feature is appropriate for its purpose,
          completing required impact assessments, and maintaining legally required human oversight.
          MambaHR will provide reasonably available information about its AI subprocessors and
          relevant safeguards.
        </p>
      </>
    ),
  },
  {
    heading: '13. Liability, order of precedence, and term',
    body: (
      <p>
        The liability limitations in the Agreement apply to this DPA. If this DPA conflicts with the
        Agreement about data protection, this DPA controls. The Standard Contractual Clauses control
        for a restricted transfer to the extent they conflict. This DPA lasts as long as MambaHR
        processes Customer Personal Data.
      </p>
    ),
  },
  {
    heading: 'Schedule 1. Processing details',
    body: (
      <div className="scroller">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {PROCESSING.map(([item, desc]) => (
              <tr key={item}>
                <td>
                  <strong>{item}</strong>
                </td>
                <td>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    heading: 'Schedule 2. Technical and organizational measures',
    body: (
      <>
        <p>MambaHR will maintain measures appropriate to the Services, including:</p>
        <ul>
          {MEASURES.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <p>
          MambaHR does not represent that it holds a certification, audit report, or security
          feature unless MambaHR has confirmed that status in writing.
        </p>
      </>
    ),
  },
  {
    heading: 'Schedule 3. Current subprocessors',
    body: (
      <>
        <p>
          MambaHR lists only providers actually used in production. Primary processing location is
          the United States unless Customer agrees otherwise in an Order or product-specific
          addendum.
        </p>
        <div className="scroller">
          <table>
            <thead>
              <tr>
                <th>Subprocessor</th>
                <th>Service</th>
                <th>Data or role</th>
              </tr>
            </thead>
            <tbody>
              {SUBPROCESSORS.map(([name, service, role]) => (
                <tr key={`${name}-${service}`}>
                  <td>{name}</td>
                  <td>{service}</td>
                  <td>{role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
]

export default function DpaPage() {
  return (
    <LegalPage
      title="Data Processing Addendum"
      updated={UPDATED}
      intro={
        <>
          <p>
            Customer data protection terms, security schedule, international transfers, and
            subprocessors.
          </p>
          <DraftNotice />
          <p>
            This Data Processing Addendum (DPA) forms part of the agreement between MambaHR, Inc.
            (MambaHR) and Customer for the Services. It becomes effective when Customer accepts the
            MambaHR <a href="/subscription-terms">Customer Subscription Terms</a> or another
            agreement that incorporates this DPA. Capitalized terms not defined here have the
            meaning in that agreement.
          </p>
        </>
      }
      sections={sections}
    />
  )
}
