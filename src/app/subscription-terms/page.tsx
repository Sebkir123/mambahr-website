import type { Metadata } from 'next'
import LegalPage, { type LegalSection } from '@/components/legal/legal-page'
import DraftNotice from '@/components/legal/draft-notice'

const UPDATED = '13 August 2026'
const description =
  'Online terms for paid MambaHR subscriptions, free trials, and authorized users. Draft published for review; not in force.'

// noindex + absent from sitemap.ts. Note we deliberately do NOT add a
// robots.txt Disallow: a blocked crawler never reads the noindex directive, so
// disallowing would keep the page eligible for indexing by reference.
export const metadata: Metadata = {
  title: 'Customer Subscription Terms | MambaHR',
  description,
  alternates: { canonical: 'https://mambahr.com/subscription-terms' },
  robots: { index: false, follow: false, nocache: true },
}

const sections: LegalSection[] = [
  {
    heading: '1. Orders, authority, and agreement structure',
    body: (
      <>
        <p>
          <strong>1.1 Authority.</strong> The person accepting the Agreement represents that they
          are at least 18 years old and authorized to bind Customer. Customer is responsible for its
          Authorized Users and for all activity under its accounts.
        </p>
        <p>
          <strong>1.2 Orders.</strong> An Order may be an online checkout record, an electronic
          order summary, or a signed Order Form. It identifies the subscribed Services, plan,
          pricing metric, committed minimum, billing cadence, start date, and initial term. If an
          Order conflicts with these Terms, the Order controls only for the specific commercial term
          it addresses. The DPA controls for conflicts about processing Customer Personal Data.
        </p>
        <p>
          <strong>1.3 Definitions.</strong> <strong>Customer Data</strong> means data, content,
          instructions, configurations, documents, and personal information submitted to or accessed
          by the Services for Customer. <strong>Documentation</strong> means MambaHR documentation
          expressly designated as product documentation.{' '}
          <strong>Services</strong> means the MambaHR hosted platform and the features identified in
          an Order. <strong>Third-Party Services</strong> means products or services supplied by a
          party other than MambaHR, including payroll, employer-of-record, contractor-of-record,
          payment, identity, communication, or integration providers.
        </p>
      </>
    ),
  },
  {
    heading: '2. Services and access',
    body: (
      <>
        <p>
          <strong>2.1 Subscription right.</strong> During the applicable term, MambaHR grants
          Customer a limited, non-exclusive, non-transferable right to access and use the Services
          for Customer&rsquo;s internal business operations, subject to the Agreement and the usage
          limits in the Order.
        </p>
        <p>
          <strong>2.2 Administration.</strong> Customer will designate administrators, maintain
          accurate account information, approve appropriate access, and promptly disable access that
          is no longer authorized. MambaHR may rely on actions, approvals, rules, and instructions
          submitted by Customer&rsquo;s administrators and Authorized Users.
        </p>
        <p>
          <strong>2.3 Changes.</strong> MambaHR may improve or modify the Services. MambaHR will not
          materially reduce the core functionality purchased by Customer during a committed term
          without providing a substantially equivalent alternative. New features may be subject to
          additional terms or fees.
        </p>
        <p>
          <strong>2.4 Support and availability.</strong> MambaHR will provide the support included
          in the Order. No service level, response time, implementation deadline, or uptime
          commitment applies unless expressly stated in the Order or a service level addendum.
        </p>
        <p>
          <strong>2.5 Beta features.</strong> Preview, beta, pilot, and early-access features may be
          changed or discontinued at any time. They are provided as-is, may contain errors, and are
          excluded from service levels and warranties unless an Order expressly says otherwise.
        </p>
      </>
    ),
  },
  {
    heading: '3. Customer responsibilities and employment decisions',
    body: (
      <>
        <p>
          <strong>3.1 Lawful data and instructions.</strong> Customer represents that it has all
          rights, notices, consents, and legal bases needed for MambaHR and its subprocessors to
          access and process Customer Data and to follow Customer&rsquo;s instructions. Customer is
          responsible for the accuracy, quality, and legality of Customer Data and for the systems
          from which Customer authorizes data access.
        </p>
        <p>
          <strong>3.2 Customer remains the employer.</strong> Customer, not MambaHR, controls and is
          responsible for its workforce practices and every employment, compensation, promotion,
          hiring, discipline, leave, termination, reduction-in-force, benefits, tax, payroll, or
          compliance decision. MambaHR is not the employer, co-employer, fiduciary, law firm, tax
          advisor, benefits advisor, payroll provider, or insurer unless a separate written
          agreement expressly states otherwise.
        </p>
        <p>
          <strong>3.3 Human review.</strong> Customer will use qualified human review before any
          decision or action that may have a legal or similarly significant effect on an applicant,
          employee, contractor, or other individual. Customer will not configure the Services to
          make a solely automated high-impact employment decision. Customer is responsible for
          required notices, impact assessments, bias audits, accommodations, appeal procedures,
          recordkeeping, and consultations with counsel.
        </p>
        <p>
          <strong>3.4 Compliance information.</strong> Citations, checklists, calculations, policy
          language, jurisdictional guidance, and compliance content are informational tools. Laws
          and facts change. Customer must verify material outputs and obtain qualified legal, tax,
          payroll, or other professional advice when appropriate. Use of the Services does not
          create an attorney-client or professional advisory relationship.
        </p>
        <p>
          <strong>3.5 Regulated data.</strong> Certain Services require regulated personal
          information to function, including government identifiers for Form I-9 and E-Verify and
          financial account details for payroll delivery. Customer will submit that information only
          through the supported product fields designed to receive it, and never through free-text
          fields, notes, messages, uploaded documents, or custom fields.
        </p>
        <p>
          Unless an Order expressly authorizes a supported feature, Customer will not submit
          payment-card data, biometric identifiers, or protected health information subject to
          HIPAA. Customer may submit workforce data about minors only when lawful, necessary, and
          covered by appropriate notices and safeguards.
        </p>
      </>
    ),
  },
  {
    heading: '4. AI and automated features',
    body: (
      <>
        <p>
          <strong>4.1 Inputs and outputs.</strong> The Services may use artificial intelligence,
          machine learning, rules, and automated workflows to analyze Customer Data, generate
          content, recommend actions, or carry out Customer-configured tasks. Inputs and outputs are
          Customer Data as between the parties. Outputs may be inaccurate, incomplete, non-unique,
          or unsuitable for Customer&rsquo;s specific facts.
        </p>
        <p>
          <strong>4.2 Customer use.</strong> Customer is responsible for reviewing outputs, testing
          configurations, monitoring results, and deciding whether to use or act on an output.
          Detail, citations, or confident language do not guarantee accuracy. Customer will not
          represent that an AI-generated output was produced solely by a human when disclosure is
          required by law or reasonably necessary to avoid deception.
        </p>
        <p>
          <strong>4.3 No generalized training.</strong> MambaHR will not use Customer Personal Data,
          prompts containing Customer Personal Data, or identifiable outputs to train or improve a
          model made available to other customers or the public unless Customer expressly agrees in
          writing. MambaHR may use de-identified and aggregated operational data that cannot
          reasonably identify Customer or an individual to secure, operate, measure, and improve the
          Services.
        </p>
        <p>
          <strong>4.4 Provider controls.</strong> MambaHR may use AI providers as subprocessors
          under the DPA. MambaHR will configure those providers, where commercially available, not
          to use Customer Personal Data to train their general-purpose models.
        </p>
      </>
    ),
  },
  {
    heading: '5. Customer Data, privacy, and security',
    body: (
      <>
        <p>
          <strong>5.1 Ownership.</strong> Customer retains all right, title, and interest in
          Customer Data. Customer grants MambaHR a limited right to host, copy, transmit, transform,
          display, and otherwise process Customer Data only as needed to provide, secure, support,
          and improve the Services for Customer, comply with law, and follow Customer&rsquo;s
          documented instructions.
        </p>
        <p>
          <strong>5.2 Data processing.</strong> The <a href="/dpa">DPA</a> is incorporated into the
          Agreement and applies when MambaHR processes Customer Personal Data as a processor or
          service provider. MambaHR acts as a controller or business for account, billing, security,
          marketing, and relationship data it handles for its own purposes as described in the{' '}
          <a href="/privacy">Privacy Policy</a>.
        </p>
        <p>
          <strong>5.3 Security.</strong> MambaHR will maintain commercially reasonable
          administrative, technical, and organizational safeguards appropriate to the nature of
          Customer Data, as further described in the DPA. No system is completely secure, and
          Customer remains responsible for account security, endpoint security, access approvals,
          and secure configuration of integrations.
        </p>
        <p>
          <strong>5.4 Account incidents.</strong> Customer will notify MambaHR promptly of suspected
          unauthorized account access or credential compromise and will cooperate in reasonable
          containment steps. Customer is responsible for activity using valid Customer credentials
          unless caused by MambaHR&rsquo;s breach of the Agreement.
        </p>
        <p>
          <strong>5.5 Export and deletion.</strong> During the subscription and for 30 days after
          termination, Customer may request a standard export of Customer Data, subject to product
          capabilities and payment of undisputed fees. MambaHR will delete Customer Personal Data as
          described in the DPA, except for legal retention, security records, and backups deleted on
          their normal cycle.
        </p>
      </>
    ),
  },
  {
    heading: '6. Third-Party Services and customer-funded obligations',
    body: (
      <>
        <p>
          <strong>6.1 Separate providers.</strong> Third-Party Services are governed by the
          customer&rsquo;s agreement with the applicable provider. MambaHR may facilitate
          configuration, data exchange, or access, but does not control and is not responsible for a
          Third-Party Service, its availability, its legal compliance, or its acts or omissions. A
          Third-Party Service may require Customer to accept additional terms directly with that
          provider.
        </p>
        <p>
          <strong>6.2 Deel and similar workforce services.</strong> If Customer uses Deel or another
          provider for employer-of-record, contractor-of-record, payroll, payment, benefits, or
          related services, Customer must contract with and fund that provider as required by the
          provider agreement. Customer is the primary obligor for wages, taxes, deposits, reserves,
          benefits, expenses, termination costs, provider fees, and other customer-specific amounts.
        </p>
        <p>
          <strong>6.3 No MambaHR financial backstop.</strong> MambaHR does not advance customer
          funds, extend credit, guarantee Customer&rsquo;s obligations, act as a lender or money
          transmitter, or assume employment liabilities merely because MambaHR facilitates a
          workflow or integration. If Customer specifically authorizes MambaHR to collect funds for
          remittance, MambaHR is responsible only for cleared funds actually received and not
          remitted, plus MambaHR&rsquo;s own separately stated fees and obligations caused by
          MambaHR&rsquo;s own breach or misconduct.
        </p>
        <p>
          <strong>6.4 Customer cooperation.</strong> Customer will provide accurate information,
          approvals, and cleared funds by the deadlines required for a Third-Party Service. MambaHR
          may suspend an affected integration or workflow if funds, approvals, or required provider
          agreements are missing.
        </p>
      </>
    ),
  },
  {
    heading: '7. Acceptable use',
    body: (
      <>
        <p>Customer and its Authorized Users will not:</p>
        <ul>
          <li>
            Use the Services unlawfully, deceptively, discriminatorily, or to violate employment,
            labor, privacy, intellectual property, export, sanctions, or other applicable law.
          </li>
          <li>
            Use an output as the sole basis for a high-impact employment decision or bypass a
            required human approval.
          </li>
          <li>
            Access another customer&rsquo;s data, defeat access controls, probe vulnerabilities
            without written authorization, introduce malicious code, or interfere with the Services.
          </li>
          <li>
            Reverse engineer, scrape, copy, benchmark for publication, or use the Services to build
            a competing product, except to the extent a restriction is prohibited by law.
          </li>
          <li>
            Sell, sublicense, share, or provide account access to an unauthorized third party, or
            use the Services for a third party other than an authorized Customer affiliate listed in
            an Order.
          </li>
          <li>
            Submit data Customer lacks the right to process or data prohibited by Section 3.5, or
            use the Services to generate unlawful surveillance, harassment, retaliation, or
            discrimination.
          </li>
          <li>
            Exceed documented usage limits or use automated methods that materially degrade the
            Services.
          </li>
        </ul>
        <p>
          MambaHR may investigate suspected misuse and suspend affected access when reasonably
          necessary to protect people, data, the Services, or MambaHR&rsquo;s legal obligations.
          When practicable, MambaHR will provide notice and limit a suspension to the affected user,
          feature, or data.
        </p>
      </>
    ),
  },
  {
    heading: '8. Fees, billing, and subscription commitments',
    body: (
      <>
        <p>
          <strong>8.1 Committed term.</strong> Each paid Order has an initial subscription term of
          12, 24, or 36 months, as selected in the Order. Except for termination rights expressly
          stated in the Agreement, subscriptions are non-cancelable during the committed term and
          fees are non-refundable.
        </p>
        <p>
          <strong>8.2 Fees and billing.</strong> Customer will pay the fees, minimum commitments,
          and billing cadence shown in the Order. Unless the Order says otherwise, annual fees are
          invoiced in advance and due upon receipt for online purchases or within 15 days for
          invoices. Customer authorizes MambaHR and its payment processor to charge the payment
          method on file for amounts due.
        </p>
        <p>
          <strong>8.3 Employee or usage counts.</strong> If pricing is based on employees, workers,
          accounts, transactions, or usage, MambaHR may measure the applicable count using the
          Services. Fees may increase during a term when Customer exceeds the committed count or
          adds Services. A decrease does not reduce the committed minimum during the current term
          unless the Order says otherwise.
        </p>
        <p>
          <strong>8.4 Taxes and third-party charges.</strong> Fees exclude taxes, levies, duties,
          and Third-Party Service charges. Customer is responsible for customer-specific taxes and
          Third-Party Service amounts, excluding taxes based on MambaHR&rsquo;s net income. Customer
          will provide a valid exemption certificate before invoicing if applicable.
        </p>
        <p>
          <strong>8.5 Late payment.</strong> Undisputed overdue amounts may accrue interest at 1.5
          percent per month or the maximum lawful rate, whichever is lower, plus reasonable
          collection costs. MambaHR may suspend Services after giving at least 10 days&rsquo; notice
          of an undisputed overdue amount. Customer must dispute an invoice in good faith within 30
          days after receipt and timely pay the undisputed portion.
        </p>
        <p>
          <strong>8.6 Promotions.</strong> Trial, free, promotional, and founding-customer pricing
          applies only as stated in the Order and does not reduce customer-funded Third-Party
          Service obligations. Unless the Order says otherwise, discounts expire at the end of the
          stated promotional period and standard pricing applies at renewal.
        </p>
        <p>
          <strong>8.7 Renewal pricing.</strong> MambaHR may change subscription pricing for a
          renewal term by giving at least 60 days&rsquo; notice before renewal. Price changes based
          on increased usage, added Services, taxes, or Third-Party Service costs may take effect
          when the change occurs.
        </p>
      </>
    ),
  },
  {
    heading: '9. Free trials',
    body: (
      <>
        <p>
          <strong>9.1 Trial scope.</strong> A free trial begins and ends on the dates shown in the
          trial Order. No fee is charged and the trial does not convert to a paid subscription
          unless Customer separately selects a paid plan and affirmatively accepts the paid Order,
          including its term and price.
        </p>
        <p>
          <strong>9.2 Trial limitations.</strong> Trial Services are for evaluation. Unless MambaHR
          expressly approves otherwise in writing, Customer will not use a trial to run live
          payroll, send binding employment notices, execute a termination or reduction in force,
          move funds, or take another irreversible or high-impact employment action. Trial Services
          are provided as-is without service levels, support commitments, warranties, or
          data-retention commitments beyond those required by law and the DPA.
        </p>
        <p>
          <strong>9.3 Trial termination and liability.</strong> Either party may end a trial at any
          time. To the maximum extent permitted by law, MambaHR&rsquo;s aggregate liability arising
          from free Services is limited to USD 100.
        </p>
      </>
    ),
  },
  {
    heading: '10. Term, renewal, suspension, and termination',
    body: (
      <>
        <p>
          <strong>10.1 Renewal.</strong> After the initial term, a paid subscription automatically
          renews for successive 12-month terms unless an Order states a different renewal period or
          either party gives notice of non-renewal at least 30 days before the current term ends.
        </p>
        <p>
          <strong>10.2 Termination for breach.</strong> Either party may terminate an affected Order
          if the other party materially breaches the Agreement and does not cure the breach within
          30 days after written notice. For nonpayment, the cure period is 10 days. A party may
          terminate immediately if the other party becomes insolvent, ceases business, or breaches
          law in a way that makes continued performance unlawful.
        </p>
        <p>
          <strong>10.3 MambaHR suspension.</strong> MambaHR may suspend access as permitted by
          Sections 7 and 8 or when continued use poses a material security or legal risk. MambaHR
          will use reasonable efforts to notify Customer and restore access after the cause is
          resolved.
        </p>
        <p>
          <strong>10.4 Effect.</strong> Upon expiration or termination, access ends and outstanding
          amounts become due. If Customer terminates for MambaHR&rsquo;s uncured material breach,
          MambaHR will refund prepaid subscription fees covering the unused period after
          termination. If MambaHR terminates for Customer&rsquo;s uncured breach, remaining
          committed fees become due to the extent permitted by law. Provisions that by their nature
          should survive will survive, including payment, confidentiality, intellectual property,
          indemnity, liability, dispute, and data-return provisions.
        </p>
      </>
    ),
  },
  {
    heading: '11. Confidentiality',
    body: (
      <>
        <p>
          <strong>11.1</strong> <strong>Confidential Information</strong> means nonpublic
          information disclosed by one party that is identified as confidential or should reasonably
          be understood as confidential, including Customer Data, product plans, security
          information, pricing, and business information. It does not include information that the
          recipient can document was lawfully known without restriction, independently developed,
          received lawfully from another source, or made public without breach.
        </p>
        <p>
          <strong>11.2</strong> The recipient will use Confidential Information only to perform or
          exercise rights under the Agreement, protect it with at least reasonable care, and
          disclose it only to personnel, contractors, advisors, and subprocessors who need it and
          are bound by confidentiality obligations. A legally required disclosure is permitted if
          the recipient provides notice when lawful and reasonably assists with protective measures.
        </p>
      </>
    ),
  },
  {
    heading: '12. Intellectual property and feedback',
    body: (
      <>
        <p>
          <strong>12.1</strong> MambaHR owns the Services, Documentation, underlying technology,
          models, workflows, templates, designs, and all improvements, excluding Customer Data. No
          rights are granted except the subscription right expressly stated in the Agreement.
        </p>
        <p>
          <strong>12.2 Feedback.</strong> Customer may provide feedback voluntarily. MambaHR may use
          feedback without restriction or payment, provided MambaHR does not identify Customer or
          disclose Customer Confidential Information without consent.
        </p>
        <p>
          <strong>12.3 Publicity.</strong> MambaHR may not use Customer&rsquo;s name, logo,
          testimonial, or case study publicly without Customer&rsquo;s prior written consent.
        </p>
      </>
    ),
  },
  {
    heading: '13. Limited warranty and disclaimers',
    body: (
      <>
        <p>
          <strong>13.1 Paid-service warranty.</strong> MambaHR warrants that, during a paid term,
          the Services will perform materially in accordance with the Documentation and MambaHR will
          provide any professional services in a professional and workmanlike manner. Customer must
          notify MambaHR of a material nonconformity promptly. MambaHR&rsquo;s obligation is to
          correct or reperform the affected Service. If MambaHR cannot do so within a reasonable
          period, Customer may terminate the affected Order and receive the refund described in
          Section 10.4.
        </p>
        <p>
          <strong>13.2 Disclaimers.</strong> Except for the express warranty above, the Services,
          trials, beta features, AI outputs, compliance content, and Third-Party Services are
          provided as-is and as-available. To the maximum extent permitted by law, MambaHR disclaims
          implied warranties of merchantability, fitness for a particular purpose, title,
          non-infringement, and any warranty arising from course of dealing. MambaHR does not
          warrant uninterrupted or error-free operation, that an output or legal citation is
          complete or current, or that use of the Services will ensure compliance or a particular
          employment outcome.
        </p>
        <p>
          <strong>13.3 Marketing and roadmap.</strong> Demonstrations, marketing statements,
          estimates, illustrations, roadmaps, and descriptions of planned features are not
          warranties or commitments unless expressly included in an Order.
        </p>
      </>
    ),
  },
  {
    heading: '14. Indemnification',
    body: (
      <>
        <p>
          <strong>14.1 MambaHR IP indemnity.</strong> MambaHR will defend Customer against a
          third-party claim that the paid Services, when used as permitted, infringe a United States
          patent, copyright, or trademark, and will pay resulting damages finally awarded or
          settlements approved by MambaHR. MambaHR has no obligation for claims caused by Customer
          Data, Third-Party Services, Customer instructions, unauthorized changes, combinations not
          supplied by MambaHR, continued use after notice, or use outside the Agreement. MambaHR may
          modify or replace the affected Service or terminate it and refund prepaid fees for the
          unused period.
        </p>
        <p>
          <strong>14.2 Customer indemnity.</strong> Customer will defend MambaHR against third-party
          claims arising from Customer Data, Customer&rsquo;s workforce practices or employment
          decisions, Customer&rsquo;s violation of law or third-party rights, Customer&rsquo;s
          instructions or configurations, Customer&rsquo;s use of a Third-Party Service, or
          Customer&rsquo;s breach of Sections 3, 6, or 7. Customer will pay resulting damages
          finally awarded or settlements approved by Customer.
        </p>
        <p>
          <strong>14.3 Process.</strong> The indemnified party must provide prompt notice,
          reasonable cooperation at the indemnifying party&rsquo;s expense, and control of the
          defense and settlement. A settlement may not admit fault by or impose a non-monetary
          obligation on the indemnified party without its consent, not to be unreasonably withheld.
        </p>
      </>
    ),
  },
  {
    heading: '15. Limitation of liability',
    body: (
      <>
        <p>
          <strong>15.1 Excluded damages.</strong> To the maximum extent permitted by law, neither
          party is liable for indirect, incidental, special, exemplary, punitive, or consequential
          damages, or for lost profits, revenue, goodwill, or business opportunity, even if advised
          of the possibility.
        </p>
        <p>
          <strong>15.2 General cap.</strong> Except as stated below, each party&rsquo;s total
          aggregate liability arising from the Agreement will not exceed the subscription fees paid
          or payable to MambaHR under the affected Order during the 12 months before the event
          giving rise to liability.
        </p>
        <p>
          <strong>15.3 Enhanced cap.</strong> MambaHR&rsquo;s aggregate liability for breach of
          confidentiality, the DPA, or its IP indemnity will not exceed two times the amount
          described in Section 15.2.
        </p>
        <p>
          <strong>15.4 Exclusions from caps.</strong> The caps do not limit Customer&rsquo;s payment
          obligations, either party&rsquo;s fraud, gross negligence, or willful misconduct,
          Customer&rsquo;s breach of Section 7 or misuse of MambaHR intellectual property, or
          liabilities that cannot lawfully be limited. The free-trial cap in Section 9.3 applies to
          free Services.
        </p>
        <p>
          <strong>15.5 Allocation of risk.</strong> The fees reflect this allocation of risk. These
          limitations apply across all legal theories and in the aggregate, not per claim.
        </p>
      </>
    ),
  },
  {
    heading: '16. General terms',
    body: (
      <>
        <p>
          <strong>16.1 Changes to online terms.</strong> MambaHR may update online terms to address
          law, security, abuse, or new features. A materially adverse change will not apply to a
          current paid term until renewal unless required by law. MambaHR will provide reasonable
          notice of material changes.
        </p>
        <p>
          <strong>16.2 Assignment.</strong> Neither party may assign the Agreement without the other
          party&rsquo;s consent, except to an affiliate or in connection with a merger,
          reorganization, financing, or sale of substantially all relevant assets, provided the
          assignee assumes the Agreement. Customer may not assign to a direct competitor of MambaHR
          without consent.
        </p>
        <p>
          <strong>16.3 Force majeure.</strong> Neither party is liable for delay caused by events
          beyond its reasonable control, except Customer&rsquo;s payment obligations for Services
          already provided.
        </p>
        <p>
          <strong>16.4 Notices.</strong> Operational notices may be sent through the Services or to
          account contacts. Legal notices must be sent by email to{' '}
          <a href="mailto:hello@mambahr.com">hello@mambahr.com</a> and by nationally recognized
          courier to MambaHR, Inc., 131 Continental Drive, Suite 305, Newark, Delaware 19713, with a
          copy to the other party&rsquo;s legal contact stated in the Order. Notice is effective on
          confirmed delivery.
        </p>
        <p>
          <strong>16.5 Export and sanctions.</strong> Each party will comply with applicable
          export-control and sanctions laws. Customer represents that it and its Authorized Users
          are not prohibited parties and will not use the Services in an embargoed jurisdiction
          contrary to law.
        </p>
        <p>
          <strong>16.6 Governing law and venue.</strong> California law governs the Agreement
          without regard to conflict rules. The state and federal courts located in San Francisco
          County, California have exclusive jurisdiction. Each party waives trial by jury to the
          extent permitted by law. Either party may seek urgent equitable relief in any court with
          jurisdiction to protect data, confidentiality, or intellectual property.
        </p>
        <p>
          <strong>16.7 Entire agreement.</strong> The Agreement is the complete agreement about the
          Services and supersedes prior proposals and discussions. Customer purchase-order terms do
          not apply. Waivers must be in writing. If a provision is unenforceable, it will be
          modified to the minimum extent necessary and the rest remains effective. The parties are
          independent contractors; no partnership, agency, fiduciary, employment, or joint venture
          relationship is created.
        </p>
        <p>
          Questions about these Terms may be sent to{' '}
          <a href="mailto:hello@mambahr.com">hello@mambahr.com</a>.
        </p>
      </>
    ),
  },
]

export default function SubscriptionTermsPage() {
  return (
    <LegalPage
      title="Customer Subscription Terms"
      updated={UPDATED}
      intro={
        <>
          <p>
            Online terms for paid subscriptions, free trials, and authorized users.
          </p>
          <DraftNotice />
          <p>
            These Customer Subscription Terms (Terms) are between MambaHR, Inc., a Delaware
            corporation (MambaHR), and the business or organization identified in an Order
            (Customer). The Terms become binding when an authorized representative accepts an Order
            online, signs an Order Form, or otherwise accesses the Services after being presented
            with these Terms.
          </p>
          <p>
            The Order, these Terms, the MambaHR <a href="/dpa">Data Processing Addendum</a> (DPA),
            and any product-specific addendum expressly incorporated into the Order form the
            Agreement. The MambaHR <a href="/privacy">Privacy Policy</a> explains how MambaHR
            handles personal information for its own business purposes but does not replace the DPA
            for Customer Personal Data.
          </p>
        </>
      }
      sections={sections}
    />
  )
}
