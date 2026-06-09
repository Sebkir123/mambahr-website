Status key: ✅ real & working · 🟡 partial (works but a piece is missing/stubbed) · ⚪ shell / not real yet

MambaHR — Complete Feature Inventory

1. Hiring & Recruiting ✅ (strongest area)
   ✅ Job requisitions — full lifecycle (draft → open → hold → fill → close)
   ✅ Candidate database + applications pipeline (applied → screening → interview → offer → hired)
   ✅ Canonical job framework — 3,648 job codes, 20 families, career-path lookup
   ✅ Public careers site per company — job pages, Indeed/LinkedIn XML feeds, robots/sitemap
   ✅ Public apply flow — resume upload + parse, work-authorization, AI-consent, salary (state-law aware)
   ✅ AI candidate screening with NYC LL144 / AEDT bias-audit gate
   ✅ Candidate self-service portal — magic-link login, status, EEO self-ID form, offer accept/decline
   ✅ Offer letters (US at-will + international) + DocuSign e-sign
   ✅ Talent CRM — talent pools, nightly candidate "rediscovery," nurture sequences (email live; LinkedIn/Slack are manual)
   ✅ Employee referrals + bonus lifecycle (tracked → hired → eligible → paid)
   ✅ Job-board distribution — Greenhouse/Lever/Workable real API; LinkedIn/Indeed/Google manual
   ✅ One-time import from Greenhouse & Lever
   ✅ Public LL144/AEDT bias-audit export pages (regulatory transparency)
   🟡 Interview scheduling & scorecards — data layer exists, screens not built

2. Skills & Internal Mobility ✅
   ✅ Employee skills DB + canonical taxonomy + ML skill normalizer
   ✅ Skills matcher + internal-candidate ranker (50% skills / 20% tenure / 20% perf / 10% retention)
   ✅ Internal-candidates pages, auto-triggered when a role opens
   ✅ Skill disputes, advisory-only enforcement, auto-disable in NY/IL/CO, full audit logging
   ✅ Backfill, retention sweep, extraction from reviews

3. Onboarding & Data Import 🟡 (~90% real)
   ✅ 6-step onboarding wizard (setup → roster → payroll → agent → channels → activate)
   ✅ CSV roster import — two-phase, AI column mapping, per-row error tracking
   ✅ HRIS import connectors all real & pull data: Gusto, Rippling, BambooHR, ADP, Namely, Workday (CSV), Merge
   ✅ Org inference (jurisdictions, risk profile, draft policies) + continuous drift detection
   ✅ IdP/SSO provisioning on hire (Okta, Entra/Azure AD, WorkOS SCIM)
   ✅ Background check (Checkr, live), buddy assignment, day-1 schedule, welcome emails
   ✅ Onboarding compliance gate + AI governance gate
   🟡 I-9 / E-Verify — connector fully built (Tracker), not yet wired — the step stops and waits
   🟡 Device provisioning (Jamf/Kandji/Intune) — connectors built, not yet wired
   ⚪ Pie workers-comp connector — port exists, no implementation

4. Offboarding / Termination ✅ (complete)
   ✅ Full workflow: WARN, COBRA, OWBPA, severance + final-paycheck calc (per-state), access deprovisioning, separation agreement + e-sign, device wipe, delegation revocation, legal-hold
   🟡 Final-paycheck result computed but not yet surfaced on the result object; severance can't pull expense data yet

5. Layoffs / RIF ✅ (complete, heavily gated)
   ✅ Scenario planning, 3-role approval, 18-point preflight safety check that hard-blocks, NYC fairness gate, batch legal-hold, redeployment scan, bounded parallel execution, SOC2 evidence packet
   🟡 RIF comms (exec/manager/employee cascade) — flow & approvals real; the actual message send is still a placeholder
   🟡 Skills-overlap scores computed but not yet fed into the preflight checks

6. Transitions / Promotions / PIPs ✅
   ✅ Promotions, lateral moves, comp changes with risk-based approval + fairness gate
   ✅ PIP workflow (state-specific legal review, HIL approval)
   ✅ International termination via EOR (two-admin approval for employees)

7. Leave & Time Off 🟡
   ✅ Leave intake from free text, statute validation, confidence-based routing, doc generation, medical-mention escalation
   ✅ PTO accrual (nightly, per-pay-period), time-off requests, balance tracking
   🟡 Statute validation is federal-only — multi-state conflict resolution not built yet
   🟡 Per-hour-worked accrual stubbed (per-pay-period works)

8. Compliance, Legal & Privacy ✅ (very deep, a few inert pieces)
   ✅ ~500 seeded compliance rules across ~123 jurisdictions; 16 typed evaluators
   ✅ Multi-state AI law: NYC LL144, IL AVIA, CO AI Act, CA ADS (all live)
   ✅ Federal: FMLA, COBRA, OWBPA, WARN, I-9/E-Verify, ADA, NLRA, USERRA, GINA, FCRA, pay transparency
   ✅ Pay equity (real OLS regression, p-values, outliers)
   ✅ Fairness/bias-audit workflow, AI governance attestations + gate
   ✅ Tamper-evident hash-chained audit log + hourly integrity verification + partition maintenance
   ✅ Data retention sweeps (dry-run-by-default), GDPR anonymization
   ✅ DSAR (data access) + right-to-erasure/delete — real, RBAC-gated
   ✅ Compliance posture dashboard, audit-log UI, AI-governance admin UI, data-retention UI
   🟡 NYC LL144 public summary publishing is a stub (report generates; public push missing)
   ⚪ Regulatory auto-ingestion (Federal Register feeds) — schema only; all rules hand-seeded today
   ⚪ Rule-curation UI & calibration feedback loop — schema exists, not built
   ⚪ Compliance overrides — schema + audit chain exist, evaluators don't consult them yet

9. SOC 2 / Security Evidence ✅
   ✅ Drata integration — daily push of HR audit events mapped to SOC2 controls (CC6.1, CC6.2, etc.)
   ✅ Audit webhooks for customer SIEMs

10. Payroll 🟡 (file-export model)
    ✅ Payroll run workflow (mandatory human approval), run history UI, pay schedules, multi-entity, YTD import
    ✅ Live real-time payroll ports: Salsa, Gusto, Rippling (Namely partial — no off-cycle)
    🟡 ADP — direct API inactive (needs partnership); file-drop workflow built but dormant
    ⚪ Check (white-label payroll) — code exists but deliberately dormant (strategy is file-export only)
    ⚪ Employee self-service paycheck/paystub viewing — not built

11. Performance Reviews ✅ (~97% complete)
    ✅ Cycle types: annual, semi-annual, quarterly, probationary, promotion, PIP; focal + anniversary topologies
    ✅ Templates (versioned, competencies, dispute windows, job-framework import)
    ✅ Self / peer / manager / skip-level / HRBP reviews with citation-gating + peer anonymity floor
    ✅ AI draft generation (sync + cost-saving batch path) with citation verification
    ✅ Evidence capture (monthly check-ins + kudos, encrypted), monthly prompt workflow
    ✅ 9-box calibration room + decisions + fairness intelligence
    ✅ Comp recommendations (HIL), e-sign acknowledgement, written rebuttals
    ✅ Disputes/appeals, manager + exec dashboards, SSE live updates
    ✅ Skills extraction from reviews, DSAR access/delete, signed close artifacts (full + redacted PDFs)
    🟡 Edge cases: probationary/PIP auto-fail-on-deadline not built; batch path lacks the strict-retry the sync path has

12. Manager-Coach Tools ✅
    ✅ draft_pip (HIL), prep_conversation (read-only), draft_comp_recommendation (HIL), all team-scoped + advisory

13. AI Agent, Channels & Intent Capture 🟡 (works, but not autonomous)
    ✅ Specialist agents shipped & in use: intake, citation, conflict, escalation, explainer, policy, document
    ⚪ Orchestrator agent NOT wired in prod — no free-text "do all the steps" multi-step planning yet; routing maps intent → one workflow
    🟡 MCP tools: ~45 of ~85 fully real. Stubs/placeholders in finance analytics (headcount cost, comp distribution), RIF legal preflight, some ATS tools
    ✅ Fully real MCP servers: skills, manager-coach, admin (AI governance + doc freshness), workspace, market band, ATS recruiter, most self-service/manager tools
    ✅ Slack — slash commands, modals, interactions, approvals (end-to-end)
    ✅ Teams — parity (approval cards, compose actions, preferences)
    ✅ Email (SES inbound) + bounce handling, public web form
    ✅ Mamba chat UI + Assistant threads (AI SDK v6 streaming)
    ✅ Channels config + routing rules (channel → workflow)
    ✅ HIL approval matrix (L1–L5), step-up auth on sensitive actions
    ✅ Defense-in-depth PII stripping + AI safety prefilter
    ✅ Bedrock multi-tier routing (Nova/Haiku/Sonnet/Opus) + circuit breaker
    🟡 Gemini routing built but off by default (correction to my earlier answer); two-pass "refinement" for high-stakes docs built but has no call sites yet

14. Learning / LMS 🟡
    ✅ Native LMS — courses, assignments, completions, certifications + UI (my-learning / catalog / manage)
    ✅ EverFi, Traliant, Lessonly connectors all real (assign/status/overdue)
    🟡 Mandatory-training policy stored but no auto-assignment on recurrence/role change
    ⚪ No automatic catalog sync from external LMS providers
    🐞 Bug found: an LMS migration uses the wrong skill-proficiency words (beginner/intermediate vs the standard awareness/working/...) — worth fixing

15. People / Org Chart / Headcount / Cases ✅
    ✅ People directory + search
    🟡 Standalone employee profile pages exist (/people/[id]) — this contradicts the product rule "no standalone profile pages." Either the rule changed or these should be removed — worth a decision.
    ✅ Org chart (tree + vacancies), draft canvas editor (reparent/swap), daily snapshot, org inference
    ✅ Headcount analytics (by dept/location, hires/onboarding/offboarding)
    ✅ Case management — investigations, accommodations, ethics/whistleblower, immigration, workers-comp; legal-role gating on privileged types; append-only notes; restricted-sensitivity model

16. Vault / Documents / Templates / E-sign 🟡
    ✅ Document upload → S3 → async Qdrant indexing for RAG; download via signed URL; mark-reviewed (freshness)
    ✅ Template CRUD for offer/separation/NDA/policy (versioned, jurisdiction-scoped) + e-sign signer chains
    ✅ DocuSign OAuth + offer/separation signing activities
    ✅ Document & policy ingestion workflows (PII-redacted before indexing)
    🟡 Web vault stores tags / access-log / versions / legal-hold / classification in the browser only — not persisted to the backend yet
    🟡 Retention metadata shows placeholders; detail-page delete is browser-only (the real delete API exists but isn't called)
    ⚠️ If a company has zero documents or the API hiccups, the vault shows sample/mock documents — should show an empty state instead

17. Engagement ⚪🟡 ("beautiful skeleton")
    ✅ Engagement Map canvas (hotspots, drivers, live updates) — feature-gated, real read path + MCP tool
    ✅ Recognition/kudos, action plans (kanban), settings + rollout gates, methodology page, team drill-down pages
    ✅ Surveys + eNPS (create, activate, collect responses)
    ⚪ Core scoring & ML pipeline is largely stubbed — the "WI" workforce-intelligence pipeline, hotspot scoring, signal rollup, and 6 of 8 intervention actions are referenced but not implemented
    🟡 ML models: eNPS forecaster (Prophet) real; theme clustering present; counterfactual + attrition-cost are Phase-2 stubs
    🟡 Surveys have no automated launch/reminders; recognition "points" unused

18. Global Hiring / EOR / Equity ✅ (95%)
    ✅ Multiplier EOR — hire workflow, contract-sign polling, terminate, invoices, webhooks (HMAC + dedup), ~48 countries; EU/UK/CH blocked (data-transfer law); no US visa sponsorship
    ✅ /global-hire dashboard, native-currency display (no FX by design)
    ✅ Carta equity connector real (create grant, accelerate vesting, termination handling) + equity-grant capture on hire
    ✅ Merge unified-HRIS connector real (read-only import, feature-flagged)
    ✅ CheckrRef (references) + Pie (workers comp) connectors real
    ✅ Integration health monitoring (daily probe of all connectors)
    🟡 Partner "connect" page is manual credential paste, not OAuth (fine for now)

19. Platform: Auth, Settings, Billing, Workflows ✅ (92%)
    ✅ WorkOS auth (SAML SSO + SCIM), step-up auth on sensitive routes
    ✅ 13-role RBAC (incl. time-bounded consultant) + Postgres row-level multi-tenant isolation (165+ tables)
    🟡 OpenFGA fine-grained authz built but inert in prod (legacy mode) — role + RLS are the live layer; validation pending before the flip
    ✅ Today/Triage hub (8 segments, virtualized), Inbox→Today redirect
    ✅ Workspaces (collab rooms, participants, templates) — real-time schema present
    ✅ Outcomes digest (weekly/monthly email) + billing (Stripe usage reporting) + metrics rollup — all real
    ✅ Members/invites, delegation, approval routes + SLA + dispute, autonomy thresholds, feature flags, modules toggle, departments, locations, org profile, security, API keys, Bedrock usage, audit log/webhooks
    ✅ Workflow-builder — real visual canvas (React Flow), node registry, live validation, AI draft, Temporal execution — genuinely functional, not a prototype
    ⚪ Notifications — frontend is an empty shell; backend handlers exist but the repository isn't wired and there's no in-app/push delivery (the email digest is the only real "notification")

20. ML Service (Python) ✅🟡
    ✅ Real trained/pretrained models: intent classifier (DistilBERT, 87%, drift-monitored), BGE reranker, BGE embedder, pay-equity OLS
    🟡 Risk scorer is rule-based heuristic (no ML yet); skill normalizer + resume parser + PII detection are hybrid (rules/LLM fallback)
    ✅ FMLA/WARN statute interpreters, health probes, Prometheus metrics, OTel tracing, bearer-auth + per-org rate limiting
    ⚪ Counterfactual + attrition-cost models, turnover predictor — stubs
    ✅ Infra: 12 AWS CDK stacks (ECS Fargate, RDS Postgres 16, Redis 7, S3 w/ 7-yr object-lock audit buckets, OpenFGA stack, bastion); 105 workflows registered with the Temporal worker
