# MambaHR — Replacing the HR Department: Master Plan

**Date:** 2026-04-26
**Status:** Strategic plan — execution roadmap
**Owner:** Sebastian Kirsch (CTO), Brian Bell (CEO)
**Time horizon:** ~10 months to first full-scope customer
**Supersedes:** All prior agent-strategy docs in IA portions

---

## 0. Vision

Replace the entire HR department with autonomous agents. **One human stays in the loop:** the Chief People Officer (or equivalent), whose role compresses to **judgment calls and approvals**, not work. The agents execute every operational HR function. Every action is governed, auditable, reversible where possible, and HIL-gated where not.

This document is the full plan: what HR actually does, what the agent zoo looks like, the security model, the HIL gating policy, the compliance posture, and the phased execution to ship it without burning a customer.

---

## 1. The HR Department We're Replacing — Full Function Inventory

If we're going to replace HR, we have to be honest about what HR does. This is the full surface area. Each function maps to a sub-agent in section 4.

### 1.1 Recruiting & Hiring

- Req intake from hiring managers (Slack/form/email)
- JD generation + market-comp benchmarking
- ATS posting (Greenhouse, Lever, LinkedIn, Indeed)
- Resume screening + ranking
- Interview scheduling (multi-calendar, time-zone aware)
- Interview kit + scorecards
- Reference checks
- Background checks (Checkr)
- Offer generation + negotiation modeling
- Counter-offer / equity / signing-bonus calculus
- Pre-boarding (signed offer → day one)

### 1.2 Onboarding

- Offer acceptance flow + e-sign (DocuSign)
- I-9 + right-to-work verification
- W-4 (federal + state), direct deposit
- Equipment provisioning (Apple Business, Hofy, etc.)
- Access provisioning (Okta SSO + downstream apps via SCIM)
- Buddy assignment + intro
- Day 1 orientation + handbook acknowledgment
- 30/60/90-day check-ins
- Required training (anti-harassment, security, compliance)
- New-hire announcement

### 1.3 Employee Lifecycle Changes

- Personal info (name, address, gender, pronouns, marital status)
- Job changes (transfers, promotions, demotions, lateral)
- Manager / org restructure
- Cost center / department / location
- Comp changes (merit, market, promotion, equity grants)
- Title changes
- Visa / immigration support (status changes, transfer)
- Remote / hybrid / on-site classification

### 1.4 Compensation & Benefits

- Comp band design + maintenance
- Annual comp review cycle (planning, calibration, distribution)
- Pay equity audits (gender, race, tenure)
- Bonus calculations (performance, retention, signing)
- Equity refresh + new-grant cycles
- Benefits enrollment (open enrollment + life events)
- Marriage / baby / divorce / dependent changes
- 401k contribution + match administration
- Stock option exercise + vest tracking + tax windows
- COBRA notifications + administration
- HSA / FSA enrollment

### 1.5 Time Off & Leave

- PTO requests / approvals (policy-aware)
- Sick leave (state-specific accrual)
- FMLA / CFRA eligibility + tracking + intermittent leave
- Parental leave (federal + state + company top-up)
- Bereavement (relation-based)
- Military leave (USERRA)
- Sabbaticals
- Jury duty / civic
- Short-term disability + long-term disability
- Workers' comp claims

### 1.6 Performance Management

- Goal-setting cycles (OKRs, MBOs)
- Continuous feedback / 1:1 documentation
- Annual / quarterly review cycles
- Calibration sessions
- Promotion decisions
- PIPs (performance improvement plans) — drafting, tracking, exit
- Coaching plans
- Recognition (peer + manager)

### 1.7 Learning & Development

- Training catalog management
- Required compliance training assignment + tracking
- Skills gap analysis
- Career pathing
- Tuition reimbursement requests + approval
- Conference / external learning approval

### 1.8 Employee Relations & Investigations

- Workplace investigations (harassment, discrimination, misconduct)
- Grievances + appeals
- Workplace conflicts / mediation
- Anonymous reporting (ethics hotline triage)
- Whistleblower protections
- Accommodation requests (ADA, religious)
- Disciplinary actions (verbal, written, final warning)

### 1.9 Compliance & Legal

- EEO-1 reporting
- OFCCP (federal contractor) requirements + AAP
- Multi-state employment law tracking
- International (GDPR, EU, UK, India, etc.)
- Wage & hour (FLSA) classification
- Employment law update monitoring
- Audit support (DOL, EEOC, state)
- Document retention + destruction policy
- Workplace posting requirements (per-state)
- I-9 reverification (work-auth expiration)

### 1.10 Offboarding

- Resignation processing
- Voluntary termination
- Involuntary termination (with cause / performance)
- RIF / layoff planning + execution (WARN, severance, releases)
- Final paychecks (state-specific timing rules)
- COBRA election notice
- Equipment recovery
- Access revocation (Okta + downstream + GitHub + Slack)
- Exit interview administration
- Separation agreement drafting + e-sign
- Non-compete / non-solicit enforcement letter
- Reference policy enforcement
- Final tax documents (W-2 timing, 1099 if applicable)
- Alumni network handoff (if applicable)

### 1.11 Data & Reporting

- Headcount + headcount changes (weekly/monthly/quarterly)
- Turnover analysis (regrettable vs non, by department, by tenure)
- Diversity dashboards
- Compensation analytics + benchmarking
- Workforce planning + scenario modeling
- Board reports
- Investor / due-diligence data rooms
- Regulatory reports (EEO-1, OSHA, ACA, state-specific)

### 1.12 Culture & Engagement

- Engagement surveys (annual + pulse)
- eNPS tracking
- Recognition programs (spot bonuses, awards)
- Internal comms (announcements, FAQs)
- Town hall logistics
- Anniversary / birthday recognition

### 1.13 HR Operations & Admin

- Vendor management (HRIS, ATS, benefits broker, payroll)
- HRIS data quality (audit, dedup, normalize)
- System integrations + sync monitoring
- Process documentation
- Manager enablement (playbooks, scripts)
- Policy authoring + revision
- Employee handbook maintenance

**That's ~120 distinct workflows across 13 functions.** Replacing this is the entirety of MambaHR.

---

## 2. The "One Human In The Loop" Model

The single human (CHRO / VP People / People Ops Lead) does **judgment, not work**. Specifically:

| The human does                                                                                      | The agent does                                                                      |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Approves HIL-gated actions (terminations, large comp changes, RIF execution, separation agreements) | Drafts everything, runs compliance checks, models outcomes, executes after approval |
| Sets policy (comp bands, leave policy, promotion criteria, PIP triggers)                            | Operates inside policy, flags edge cases, surfaces drift                            |
| Handles ER investigations _outcomes_ (interviews are agent-supported but findings are human)        | Triages reports, gathers evidence, schedules interviews, drafts findings            |
| Strategic decisions (org design, workforce plan, M&A integration)                                   | Models scenarios, surfaces risks, prepares decision packets                         |
| Crisis management (PR-sensitive incidents)                                                          | Surfaces, packages, drafts comms — escalates immediately                            |
| Final sign-off on hires (depending on level)                                                        | Runs the entire pipeline up to the offer                                            |

**Daily time:** 30–60 minutes triaging + approving the queue. Compare to a full HR team's hours.

**Critical UX principle:** every HIL ask must be **decision-ready** — a one-screen Decision Card with rationale, options, evidence, and one-click approve/decline. No "go investigate" — the agent has already investigated.

---

## 3. Multi-Agent Architecture

### 3.1 Topology

```
              Slack · Teams · Email · Web form · Rail
                         (intent capture)
                              │
                              ▼
              ┌─────────────────────────────────┐
              │   Orchestrator Agent (Sonnet)   │
              │   - intent classification        │
              │   - routing                      │
              │   - HIL escalation               │
              │   - cross-domain reasoning       │
              │   - context handoff              │
              └─────────────┬───────────────────┘
                            │  MCP (mTLS, JWT, RBAC)
   ┌─────────┬─────────┬────┼─────┬─────────┬─────────┐
   ▼         ▼         ▼    ▼     ▼         ▼         ▼
 Hiring  Onboarding Lifecycle Comp Leave  Performance  ER
  agent   agent     agent    &Ben  agent   agent      agent
 (Haiku) (Haiku)   (Haiku)  (Sonnet)(Haiku)(Sonnet)  (Sonnet)

   ┌─────────┬─────────┬─────────┬─────────┬─────────┐
   ▼         ▼         ▼         ▼         ▼         ▼
  L&D     Compliance Offboard  Reports  Culture    Ops
  agent   agent      agent     agent    agent      agent
 (Haiku)  (Sonnet)  (Sonnet)  (Haiku)  (Haiku)   (Haiku)

  + Heavy Reasoning (Opus 4.7) — invoked by any agent for:
    - RIF planning, pay equity, comp band design
    - Multi-state employment law edge cases
    - ER investigation finding synthesis
    - Severance / Monte Carlo modeling

  + Utility (Nova Lite / Micro) — invoked everywhere:
    - Title generation, classification, summarization
    - Document formatting, palette intent
```

### 3.2 Why this shape

- **One orchestrator** keeps conversation context coherent and prevents N×N agent-to-agent confusion. It's the "switchboard."
- **Domain sub-agents** are scoped, evaluable, and can be optimized per task (Haiku for high-volume scoped work; Sonnet for nuanced; Opus for high-stakes).
- **MCP between them** = standard protocol, swappable runtime, future-proof against AI SDK / AgentCore / direct decisions.
- **Heavy reasoning + utility models** are not their own agents — they're invoked by domain agents for the right shape of work.

### 3.3 Per-Agent Specs (selected highlights)

#### Hiring Agent

- **Tools:** `query_ats`, `screen_resume`, `schedule_interview`, `request_reference`, `start_bgcheck`, `generate_offer`, `model_counteroffer`
- **Connectors:** Greenhouse, Lever, LinkedIn, Indeed, Checkr, DocuSign, Google Calendar
- **HIL gates:** Offer above band, counter-offer, hire decision (depending on level)
- **Compliance:** OFCCP if federal contractor, EEO data collection, state-specific salary disclosure (CO, NY, WA, CA)

#### Onboarding Agent (existing — to extend)

- **Tools:** `generate_offer_letter`, `send_for_signature`, `provision_equipment`, `provision_access`, `assign_buddy`, `schedule_orientation`, `enroll_benefits`, `assign_training`
- **Connectors:** Gusto/Workday/Rippling, Okta, DocuSign, Hofy, Lattice
- **HIL gates:** Equipment cost > $X, atypical access requests, missing I-9 docs after grace period
- **Compliance:** I-9 timing (3 business days), state new-hire reporting, EEO data, training completion

#### Lifecycle Agent

- **Tools:** `update_employee_record`, `process_transfer`, `process_promotion`, `process_comp_change`, `update_org_chart`, `submit_visa_action`
- **Connectors:** HRIS (all), Carta (equity), immigration vendor
- **HIL gates:** Comp change > X% or $Y, manager change spanning > 2 levels, demotion, location change crossing tax jurisdictions
- **Compliance:** Visa/I-9 reverification, multi-state withholding, equity grant board approval (if required)

#### Comp & Benefits Agent (Sonnet)

- **Tools:** `query_comp_bands`, `recommend_comp`, `run_pay_equity`, `model_equity_refresh`, `process_open_enrollment`, `process_life_event`, `track_vest`, `cobra_notification`
- **Connectors:** HRIS, Carta, benefits broker (Sequoia/JustWorks), 401k provider
- **HIL gates:** Total comp change > threshold, equity grant > board-approved pool slice, off-cycle promotion outside calibration
- **Compliance:** Pay transparency (CO/NY/WA/CA), equal pay laws, ERISA, ACA, COBRA timing
- **Heavy reasoning:** Pay equity OLS, comp band redesign, market refresh — delegate to Opus

#### Leave Agent (existing — to extend)

- **Tools:** `check_pto_balance`, `check_fmla_eligibility`, `submit_leave`, `track_intermittent`, `coordinate_disability`, `wc_claim_intake`
- **Connectors:** HRIS, leave admin (Tilt, AbsenceSoft), state DI systems
- **HIL gates:** FMLA/CFRA edge cases, intermittent leave > X% of schedule, military leave duration, accommodation overlap
- **Compliance:** FMLA, CFRA, state PFML (CA, NY, NJ, MA, CT, WA, OR, RI, CO, ME, MN, DE, MD), USERRA, ADA, pregnancy/lactation accommodation

#### Performance Agent (Sonnet)

- **Tools:** `start_review_cycle`, `generate_review_draft`, `synthesize_360`, `draft_pip`, `track_pip`, `recommend_promotion`
- **Connectors:** Lattice, CultureAmp, Workday Talent, Slack
- **HIL gates:** PIP initiation, PIP exit decision (success vs termination), promotion to leadership, performance-based termination
- **Compliance:** EEO disparate impact analysis on promotions/PIPs, documentation standards for litigation defense

#### Employee Relations Agent (Sonnet)

- **Tools:** `triage_complaint`, `gather_evidence`, `schedule_interview`, `draft_findings`, `recommend_action`, `coordinate_legal`
- **Connectors:** Anonymous reporting (Vault/AllVoices), legal counsel handoff, Slack DMs (with chain-of-custody)
- **HIL gates:** **ALL findings** — agent prepares; human decides
- **Compliance:** Title VII, ADA, age, religion, harassment investigation standards, attorney-client privilege handling, retaliation prevention
- **Heavy reasoning:** Legal-grade synthesis — delegate to Opus

#### L&D Agent (Haiku)

- **Tools:** `assign_training`, `track_completion`, `recommend_path`, `tuition_reimbursement`, `approve_conference`
- **Connectors:** Lessonly, Coursera, Udemy, internal LMS
- **HIL gates:** Tuition reimbursement > $X, sabbatical-class learning leave, vendor change

#### Compliance Agent (Sonnet) — already exists

- **Tools:** `query_compliance`, `run_audit`, `generate_eeo1`, `track_law_updates`, `posting_check`
- **Connectors:** Compliance v2 engine (existing), state DOL APIs, EEOC, regulatory feeds
- **HIL gates:** Filings, classification disputes, multi-state edge cases
- **Heavy reasoning:** Edge-case interpretation — delegate to Opus

#### Offboarding Agent (Sonnet) — already exists in part

- **Tools:** `process_resignation`, `terminate_employment`, `plan_rif`, `calculate_severance`, `generate_separation_agreement`, `revoke_access`, `coordinate_final_pay`
- **Connectors:** HRIS (all), Okta + downstream, payroll, e-sign, equipment recovery vendor
- **HIL gates:** **ALL involuntary terminations**, severance offers, separation agreements, RIF execution (WARN compliance, group disparate impact)
- **Compliance:** WARN Act + mini-WARN (CA, NY, IL, NJ, etc.), final pay timing per state, COBRA, OWBPA (age 40+ releases), unemployment notices, equity treatment

#### Reports Agent (Haiku)

- **Tools:** `generate_headcount`, `turnover_analysis`, `dei_dashboard`, `comp_analytics`, `board_pack`, `eeo1_filing`, `osha_300`
- **Connectors:** HRIS read-only, BI warehouse
- **HIL gates:** Filing submissions, board pack final
- **Compliance:** EEO-1, OSHA 300, ACA 1095, ERISA Form 5500

#### Culture Agent (Haiku)

- **Tools:** `launch_survey`, `summarize_survey`, `recognize`, `draft_announcement`, `schedule_townhall`
- **Connectors:** CultureAmp, Lattice, Slack, recognition platforms
- **HIL gates:** Survey content, public announcements
- **Compliance:** Anonymous response handling, no retaliation

#### Ops Agent (Haiku)

- **Tools:** `audit_hris_data`, `monitor_sync`, `update_policy`, `revise_handbook`, `vendor_renewal`
- **Connectors:** All HRIS, vendor APIs
- **HIL gates:** Policy changes, vendor changes, handbook edits

### 3.4 Agent Communication Patterns

- **Sync invocation:** Orchestrator → sub-agent → response. For interactive chat.
- **Async workflow:** Orchestrator hands off to a Temporal workflow that spans days/weeks (e.g., onboarding takes 30 days). Sub-agent acts as a step in that workflow.
- **Cross-agent context:** Shared agent memory (Phase 3) so the Onboarding agent knows the Hiring agent's interview notes; Performance knows Compensation's last raise.
- **Escalation:** Sub-agent → orchestrator → human, with full reasoning trace.

---

## 4. Model Strategy (Final)

| Tier                              | Model                       | Use cases                                                                                     | Bedrock cost (per M tok) |
| --------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------- | ------------------------ |
| Heavy reasoning                   | **Opus 4.7**                | RIF planning, pay equity, ER findings synthesis, comp band design, multi-state law edge cases | $15 / $75                |
| Orchestrator + nuanced sub-agents | **Sonnet 4.6 / 4.7**        | Main rail agent, Comp&Ben, Performance, ER, Compliance, Offboarding                           | $3 / $15                 |
| Scoped sub-agents                 | **Haiku 4.5**               | Hiring, Onboarding, Lifecycle, Leave, L&D, Reports, Culture, Ops                              | $1 / $5                  |
| Utility                           | **Nova Lite**               | Title gen, classification, summarization, document formatting                                 | $0.06 / $0.24            |
| Sub-second                        | **Nova Micro**              | Cmd+K palette intent, search ranking                                                          | $0.035 / $0.14           |
| Vision                            | **Sonnet** (vision-enabled) | PDF parsing, screenshot verification                                                          | $3 / $15                 |

**Plus Bedrock prompt caching** on system prompts + tool definitions — biggest single cost lever.

**No Gemini, no GPT for now.** Multi-cloud trust boundary not worth the savings while Bedrock has the depth we need. Re-evaluate annually.

---

## 5. Security Architecture

### 5.1 The Non-Negotiables (the 12 Controls)

(Recap — full detail in section 5.4)

1. mTLS between agent runtime and MCP gateway
2. Signed JWT per request (`org_id`, `user_id`, `scopes`, `exp`, `nonce`)
3. `org_id` enforced server-side from JWT — never from agent input
4. Per-tool scope checks (RBAC) — agent inherits invoking-user permissions
5. Strict input schemas (Zod) — no broad-surface tools
6. Output sanitization + provenance tags (`<untrusted-content origin="gusto">…</untrusted-content>`)
7. PII-by-reference policy — agent sees `employee_id`, never raw SSN/DOB
8. HIL approval gates for destructive operations (codified by CUQ + risk class)
9. Per-tenant rate limits at the gateway
10. Immutable audit log → S3 with KMS + Object Lock (SOC2 evidence)
11. Secrets isolation — connector creds in Secrets Manager, never in agent context
12. Threat-modeled excessive agency — agent never holds tools whose damage exceeds tolerable risk

### 5.2 Defense-in-Depth Layers

```
[User invokes via Slack/Email/Rail]
       │  WorkOS auth — SSO/SAML/SCIM
       ▼
[Edge — Next.js / API Gateway]
       │  Rate limit by org_id + user_id
       │  Input validation
       ▼
[Orchestrator Agent (Sonnet)]
       │  Sees user message + sanitized tool outputs only
       │  Cannot see secrets, never sees raw PII
       ▼
[MCP Gateway (AgentCore Gateway or self-hosted)]
       │  mTLS termination
       │  JWT signature + scope validation
       │  PII-redaction pass on outputs
       │  Provenance tag wrap
       │  Immutable audit log
       │  Per-tool rate limit per tenant
       ▼
[MCP Server (per-domain — Leave / Onboarding / etc.)]
       │  Re-validates JWT (defense in depth)
       │  RBAC: scope ⊇ tool requirement
       │  Schema-validates inputs (Zod / Go validator)
       │  Tags untrusted external data
       ▼
[Domain Logic (Go)]
       │  Business rules
       │  HIL gate evaluation (CUQ + risk class)
       │  If gated → enqueue, return "needs_approval"
       │  If autonomous → execute
       ▼
[Connectors (Gusto / Workday / etc.)]
       │  Secrets in AWS Secrets Manager
       │  Per-customer credential isolation
       │  Outbound mTLS / OAuth where supported
```

### 5.3 The Threat Model (STRIDE × OWASP LLM Top 10)

We write a versioned threat model document (`docs/security/threat-model.md`). This is not optional. Every engineer touching agent code reads it.

| Threat                           | OWASP LLM | Mitigation in our stack                                                            |
| -------------------------------- | --------- | ---------------------------------------------------------------------------------- |
| Prompt injection via tool output | LLM01     | Provenance tags, output sanitization, instructions vs data separation              |
| Insecure output handling         | LLM02     | Sanitize before display + before re-feed to LLM                                    |
| Training data poisoning          | LLM03     | We don't fine-tune on customer data without DPA + segregation                      |
| Model DoS                        | LLM04     | Per-tenant rate limit, max tool calls per turn, max tokens per turn                |
| Supply-chain                     | LLM05     | Pinned model versions, MCP server attestation, dep audit                           |
| Sensitive info disclosure        | LLM06     | PII-by-reference, output redaction, secrets isolation                              |
| Insecure plugin                  | LLM07     | RBAC scope per tool, schema validation, no broad tools                             |
| Excessive agency                 | LLM08     | HIL gates, capability constraints, never give agent power exceeding tolerable risk |
| Overreliance                     | LLM09     | CUQ shown to user, human review of borderline calls, undo where possible           |
| Model theft                      | LLM10     | Bedrock-managed, no model artifacts in our control                                 |

### 5.4 Audit Log Schema

Every tool call writes one immutable record:

```
tool_call_audit (
  id              uuid PRIMARY KEY,
  org_id          uuid NOT NULL,
  user_id         uuid NOT NULL,           -- invoking user
  agent_id        text NOT NULL,           -- "orchestrator" or sub-agent name
  thread_id       uuid,
  tool_name       text NOT NULL,
  scope           text NOT NULL,           -- which RBAC scope was used
  input_hash      text NOT NULL,           -- SHA-256 of input
  input_redacted  jsonb,                   -- input with PII redacted
  output_hash     text NOT NULL,           -- SHA-256 of output
  output_redacted jsonb,                   -- output with PII redacted (sample only for large)
  decision        text,                    -- "auto" / "hil_pending" / "hil_approved" / "hil_declined" / "failed"
  decided_by      uuid,                    -- user_id of HIL approver (if applicable)
  cuq             numeric(3,2),            -- agent's confidence
  duration_ms     int,
  cost_usd        numeric(10,6),
  invoked_at      timestamptz NOT NULL,
  decided_at      timestamptz,
  trace_id        text                     -- OTel correlation
);

-- Indexes: (org_id, invoked_at desc), (thread_id), (decided_by, decided_at)
-- Mirror to S3 hourly with KMS + Object Lock (compliance retention)
```

### 5.5 PII Data-Flow Policy

**Rule:** raw PII (SSN, DOB, full address, bank, medical) **never enters LLM context**. Period.

How:

- HRIS connectors fetch full records → store in Postgres with column-level encryption
- MCP servers return **identifier + non-PII attributes only** to agent (e.g., `{employee_id, name, department, role}`)
- When agent needs to **generate** a document with PII (offer letter with SSN), the MCP `generate_document` tool takes the template + identifier and **server-side hydrates** PII into the final doc, returning only the doc reference
- Logs redact PII via a deny-list (SSN regex, DOB ISO regex, etc.) + allow-list (only fields tagged non-PII appear)
- Bedrock invocation logs disabled at AWS account level (no model-side prompt logging)

**Edge cases:**

- ER investigations need names → use names, but flag context as "PII-class:investigation" → audit log scoped to legal-counsel role only
- Compliance queries with FMLA/medical → categorize as PHI → segregated trust boundary, BAA with AWS for HIPAA scope

### 5.6 RBAC Scope Model

8 roles (existing): `executive`, `legal`, `finance`, `hr_admin`, `manager`, `employee`, `admin`, `viewer`

Each tool declares required scopes. Agent gets the **invoking user's scopes** in JWT. MCP server enforces.

Example tool scope mappings:
| Tool | Required scopes |
|---|---|
| `query_compliance` | `read:compliance` |
| `process_leave` (read) | `read:leave:self` OR `read:leave:reports` (manager) OR `read:leave:org` (hr) |
| `process_leave` (approve) | `approve:leave:reports` OR `approve:leave:org` |
| `terminate_employee` | `write:lifecycle:org` AND HIL gate |
| `run_pay_equity` | `read:comp:org` AND `read:comp:sensitive` |
| `generate_separation_agreement` | `write:offboarding:org` AND HIL gate AND legal counsel notice |

### 5.7 HIL Gating Policy (Codified)

Every action gets two scores:

- **Risk class** (precomputed per tool/action type):
  - L1 — read-only, no PII (e.g., headcount summary)
  - L2 — write-low-reversibility-low-impact (e.g., book a meeting, send a Slack ping)
  - L3 — write with reversibility (e.g., update an org chart, schedule training)
  - L4 — write with limited reversibility (e.g., send signed offer, change comp)
  - L5 — irreversible high-impact (e.g., terminate, RIF execute, release sign)
- **CUQ** (Confidence-Updated Quality, 0.00–1.00) — agent self-reports per call, calibrated against HR-Bench

Gating matrix:
| Risk × CUQ | L1 | L2 | L3 | L4 | L5 |
|---|---|---|---|---|---|
| CUQ ≥ 0.90 | Auto | Auto | Auto + notify | Async approve | **Always-human** |
| CUQ 0.75–0.90 | Auto | Auto + notify | Async approve | Sync approve | **Always-human** |
| CUQ 0.50–0.75 | Auto | Async approve | Sync approve | Sync approve | **Always-human** |
| CUQ < 0.50 | Async approve | Sync approve | Sync approve | Sync approve | **Always-human** |

**Always-human (no CUQ override possible):**

- All involuntary terminations
- All RIF executions
- All separation agreements signed
- All hire decisions above L5 (director+)
- All ER investigation findings
- All policy changes
- All comp changes > $20k base or > 1% of company comp pool
- All equity grants > board-approved per-grant cap
- All public statements from "the company"

This matrix is **codified in code** — not policy doc. Tool definitions declare risk class. Agent reports CUQ. Gating evaluator decides. Auditors verify.

### 5.8 Adversarial Test Suite (HR-Bench-Sec)

Extension of HR-Bench focused on:

- Prompt injection attempts via tool outputs (e.g., a "candidate resume" containing `IGNORE PREVIOUS INSTRUCTIONS`)
- Cross-tenant requests (User A's session asking about Org B's employees)
- Privilege escalation attempts (manager trying to terminate via prompt manipulation)
- PII exfiltration attempts (asking agent to "include all SSNs in the report")
- Output-channel exfiltration (agent told to email the data to attacker.com)
- Tool combination attacks (read-only tool output triggering destructive tool)

Run on every model + prompt change. Block deploy on any regression.

### 5.9 SOC2 / GDPR / HIPAA Posture

- **SOC2 Type II** — target audit start month 7, report month 10. Uses immutable audit logs as primary evidence.
- **ISO 27001** — pursued in parallel for international customers.
- **GDPR Article 22** — automated decision-making with significant effect must allow human review. Our HIL gates satisfy this for L4+ actions. DPIA written before EU customer onboarding.
- **HIPAA** — trigger only when handling PHI (FMLA medical certifications, disability claims, accommodation requests). Segregated AWS account + BAA + minimum necessary access. Most agent tools never touch PHI.
- **State PII laws** — CCPA/CPRA, NY SHIELD, etc. — covered by general PII policy.
- **Employment law** — agent operates _inside_ law via Compliance Agent. Policy edge cases escalated to legal counsel HIL.

---

## 6. Phased Execution Plan

**Total timeline:** ~10 months from today (2026-04-26) to first full-scope production customer.

### Phase 0 — Security Foundation (4 weeks: weeks 1–4)

**Goal:** every artifact required to safely ship the first MCP server.

- [ ] Write `docs/security/threat-model.md` — STRIDE × OWASP LLM
- [ ] Write `docs/security/tool-risk-classification.md` — every existing + planned tool tagged L1–L5
- [ ] Write `docs/security/pii-data-flow.md` — every PII-touching path with redaction points
- [ ] Implement audit log schema + S3 Object Lock writer
- [ ] Implement PII-redaction middleware (Go) — deny-list + allow-list
- [ ] Implement RBAC scope model in Go (per-tool registration)
- [ ] Implement CUQ + risk class → HIL gate evaluator
- [ ] Wire Bedrock prompt caching on existing `/api/agent` route
- [ ] Cost monitoring dashboard (per-org Bedrock spend by model + by tool)

**Exit criteria:** every existing tool has a risk classification; existing agent runs prompt-cached; audit log writing for every tool call.

### Phase 1 — MCP Foundation (4 weeks: weeks 5–8)

**Goal:** internal MCP gateway live, three existing sub-agents wrapped.

- [ ] MCP gateway (self-hosted on ECS Fargate, or pilot AgentCore Gateway in shadow mode)
  - mTLS, JWT validation, rate limiting, audit, PII redaction wrapper
- [ ] Wrap Leave agent as MCP server (`mcp-leave-server`)
- [ ] Wrap Onboarding agent as MCP server (`mcp-onboarding-server`)
- [ ] Wrap Compliance agent as MCP server (`mcp-compliance-server`)
- [ ] Update orchestrator (`/api/agent`) to route via MCP instead of inline tools
- [ ] Wire HIL approval flow end-to-end — gate → queue → notify → approve/decline → resume
- [ ] Adversarial test suite (HR-Bench-Sec) v0
- [ ] Three-tier model routing (orchestrator/utility/heavy)

**Exit criteria:** existing Leave/Onboarding/Compliance flows run through MCP; HIL approvals work; all audit logs present.

### Phase 2 — Identity + Memory Pilot (4 weeks: weeks 9–12)

**Goal:** AgentCore decisions made with data, not vibes.

- [ ] Pilot AgentCore Identity for one outbound OAuth flow (Gusto)
  - Compare time-to-implement, ongoing maintenance vs DIY
- [ ] Pilot AgentCore Memory for last-N decisions context
  - Measure: agent quality with memory vs without (HR-Bench)
- [ ] Decision document: adopt / reject / wait — with cost + risk numbers

### Phase 3 — Agent Expansion (12 weeks: weeks 13–24)

**Goal:** every HR function covered by an agent.

Sub-phases (3 weeks each, 4 agents per sub-phase):

**3a (weeks 13–15):** Hiring + Lifecycle + Comp&Ben + Performance
**3b (weeks 16–18):** L&D + ER + Offboarding + Reports
**3c (weeks 19–21):** Culture + Ops + Heavy Reasoning agent + Vision agent
**3d (weeks 22–24):** Cross-agent integration tests, end-to-end workflows, agent-to-agent context sharing via shared memory

Per agent: design (3 days) → MCP server scaffold (3 days) → tools (5 days) → HIL gating (2 days) → eval against HR-Bench (2 days).

### Phase 4 — Verification & E2E (4 weeks: weeks 25–28)

- [ ] AgentCore Browser for E2E verification ("did the Gusto change persist?")
- [ ] AgentCore Code Interpreter for ad-hoc analysis (pay equity OLS, severance Monte Carlo)
- [ ] Integration test suite per workflow (40+ end-to-end scenarios)
- [ ] Chaos testing (connector failures, partial state, retries)
- [ ] Performance: per-turn latency p95 < 3s for orchestrator, < 8s for tool calls

### Phase 5 — Compliance & Audit (8 weeks: weeks 29–36)

- [ ] SOC2 Type II audit kickoff (drata or vanta)
- [ ] Penetration test (third party — NCC Group / Bishop Fox)
- [ ] GDPR DPIA + DPAs prepared
- [ ] HIPAA segregation finalized for FMLA-medical scope
- [ ] Bug bounty program launched (HackerOne private)
- [ ] Customer-facing security trust center page

### Phase 6 — Production Hardening (8 weeks: weeks 37–44)

- [ ] Multi-tenant runtime isolation review (ECS Fargate task per high-tier customer, OR AgentCore Runtime if mature)
- [ ] Backup/DR runbook + game-day exercise
- [ ] Incident response runbook + tabletop
- [ ] Customer onboarding playbook (time to first value < 30 days)
- [ ] Disaster recovery: RTO 4h, RPO 15min for audit log
- [ ] First full-scope production customer launch

---

## 7. Success Criteria — How We Know It's Working

### 7.1 Technical Metrics

- **Agent decision rate:** ≥ 80% of incoming HR intents resolved without human touch
- **HIL approval queue depth:** ≤ 25 items at any moment for an org of 1000 employees
- **HIL average latency:** < 1 hour for sync-approve items, < 24h for async-approve
- **CUQ calibration error:** < 0.10 on HR-Bench (i.e., when agent says CUQ 0.85, the actual quality is 0.75–0.95)
- **Tool call success rate:** > 99.5%
- **Audit log integrity:** 100% (zero gaps, zero unauthorized access)
- **Adversarial test pass rate:** 100% on HR-Bench-Sec — block deploy on regression

### 7.2 Business Metrics (per customer)

- **HR FTE replaced:** ≥ 3 per 1000 employees (the standard ratio is 1:100; we target 1:333+)
- **HR ops cost reduction:** ≥ 60% in year 1 vs prior internal HR + tools
- **Time to value:** first onboarding completed < 14 days from contract sign
- **NPS from the one-human-in-the-loop:** ≥ 50

### 7.3 Trust Metrics

- **SOC2 Type II:** clean opinion month 10
- **Zero PII breaches**
- **Zero wrongful terminations** attributable to agent error
- **Zero cross-tenant data leakage**
- **Compliance violations:** zero findings in customer audits attributable to agent decisions

---

## 8. Risks & Mitigations

| Risk                                                                              | Likelihood | Impact       | Mitigation                                                                                               |
| --------------------------------------------------------------------------------- | ---------- | ------------ | -------------------------------------------------------------------------------------------------------- |
| Prompt injection in resume / leave note / Slack message → agent does wrong action | High       | Critical     | Output sanitization, provenance tags, HIL gates on L4+, adversarial test suite                           |
| Cross-tenant data leak via agent                                                  | Low        | Catastrophic | org_id from JWT only, defense-in-depth at gateway + server, dedicated test suite                         |
| Model regression after upgrade (Sonnet 4.6 → 4.7) breaks tool calling             | Medium     | High         | HR-Bench eval on every model swap, A/B + feature flag, instant rollback                                  |
| AgentCore preview-state breaks production                                         | Medium     | High         | No production critical path on AgentCore until GA; pilot in shadow mode                                  |
| Bedrock cost overrun                                                              | Medium     | High         | Per-org cost monitoring + alerts, model-routing layer, prompt caching, batch where possible              |
| Wrongful termination / discrimination claim attributed to agent                   | Low        | Catastrophic | All terminations are always-human, EEO disparate impact analysis on PIPs/promotions, full audit trail    |
| Connector outage breaks workflow mid-flight                                       | High       | Medium       | Temporal workflows with retry + compensating actions, graceful degradation messaging                     |
| HIL queue backs up → SLA breach                                                   | Medium     | Medium       | CUQ tuning, escalation paths, on-call rotation for the one human                                         |
| Model hallucination of compliance regulation                                      | Medium     | High         | Compliance Agent pulls from regulatory feed, never generates regs from training data, citations required |
| Vendor lock-in to AWS deepens to point of risk                                    | Low        | Medium       | Abstract MCP layer is portable; Bedrock model swaps possible; AgentCore adoption gated                   |
| Customer demands non-AWS deployment                                               | Medium     | Medium       | MCP architecture is cloud-portable; only AgentCore-specific pieces would need replacement                |

---

## 9. What Could Make This Fail

Honest list — these are the failure modes worth losing sleep over:

1. **Excessive agency on day one.** Shipping high-risk tools without HIL gates = first wrongful action = company-ending lawsuit. **Mitigation:** Phase 0 risk classification is gate to ANY tool ship. Reviewed by Sebastian + Brian + outside counsel.

2. **Trust collapse from one bad headline.** "AI fired me." The ONE incident kills the category. **Mitigation:** Always-human gate on terminations is non-negotiable. Marketing never overpromises autonomy beyond what gates allow.

3. **Compliance edge case the agent gets wrong, customer gets fined.** **Mitigation:** Compliance Agent pulls from authoritative feed (not LLM training); cites every regulation; flags low confidence; HIL gates on filings.

4. **Security boundary collapse via novel prompt injection.** **Mitigation:** Adversarial test suite on every release; bug bounty after Phase 5; assume the agent CAN be compromised, design accordingly.

5. **Model upgrade breaks tool calling silently.** **Mitigation:** HR-Bench gates every model change; feature flag + A/B + canary; instant rollback.

6. **Customer's existing HRIS data is so dirty the agent can't operate.** **Mitigation:** Phase 1 of customer onboarding is data audit + remediation; agent has dedicated Ops sub-agent for HRIS data quality.

7. **The "one human" can't keep up with the queue.** **Mitigation:** CUQ tuning, batch approvals UI, escalation paths to backup approvers, eventually multi-approver routing.

8. **AgentCore changes API mid-build, we lose weeks.** **Mitigation:** AgentCore is layered, not foundational. Worst case: revert to self-hosted MCP gateway; rest of the stack unchanged.

---

## 10. Decision Log

Decisions baked into this plan that future versions should challenge:

1. **Use AI SDK v6 for orchestration, AgentCore selectively for capabilities.** Not pure AgentCore.
2. **MCP is the universal tool protocol.** All sub-agents are MCP servers, regardless of where they run.
3. **Bedrock-only for models.** No GCP Gemini, no OpenAI. Re-evaluate annually.
4. **Three-tier model routing** (heavy/standard/utility) with prompt caching.
5. **8-role RBAC, JWT-bound, server-enforced.**
6. **PII-by-reference policy.** Raw PII never in LLM context. Period.
7. **HIL gating matrix codified in code, not policy.** Auditor-verifiable.
8. **Always-human on terminations, RIF execution, separation agreements, comp changes above threshold, ER findings, hire decisions above level threshold.**
9. **SOC2 Type II in month 10, ISO 27001 in parallel.**
10. **One orchestrator + 13 domain sub-agents + heavy reasoning + utility.** Topology fixed for v1.

---

## 11. Open Questions to Resolve in Phase 0

1. AgentCore Gateway vs self-hosted MCP gateway — pilot decides
2. AgentCore Memory vs self-hosted (Postgres + Qdrant) — pilot decides
3. AgentCore Identity vs self-hosted OAuth — pilot decides
4. Per-tenant ECS Fargate task vs shared (with strict isolation) — based on first 3 customers' security requirements
5. Bedrock prompt caching: shared across orgs OR per-org? (Affects cost & blast radius.)
6. CUQ calibration methodology — supervised against HR-Bench labels, or held-out human review sample?
7. Heavy Reasoning Agent: invoked synchronously (slow) or async with handoff (UX complexity)?
8. Cross-agent shared memory schema — what's shared, what's siloed?

---

## 12. Next Action

**This week:** start Phase 0.

1. Today: I write the threat model + tool risk classification (Sebastian reviews end of week).
2. This week: Bedrock prompt caching on existing route + cost dashboard.
3. Next week: audit log schema + S3 Object Lock writer.
4. Week 3: PII redaction middleware.
5. Week 4: HIL gate evaluator + tied to existing tools.

By end of week 4 we have the security floor. Then MCP gateway in week 5. Then we're shipping the agent zoo.

**This is the path to one human, not zero.** The human is what makes it trustworthy. Everything else is the agent.
