# Admin workspace

The panel uses the MambaHR product design library: semantic light/dark tokens
vendored from `mamba_hr/web/app/globals.css`, the product button primitive, Geist
and Fraunces, and the official `/brand/mamba-mark-light.svg` silhouette. The token
file records its source checksum. Tokens are scoped to the admin; public pages
keep their existing theme. To refresh the library, copy semantic tokens and their
variable dependencies from the product source, preserving the scoped selectors.

## Pages

- Overview: consistent blog reads, incoming leads, relationship summaries,
  follow-ups, and actionable counts for overdue next steps, missing owners,
  missing next steps, and drafts.
- Website analytics: existing first-party visitor, source, engagement and session
  reporting, with time-range/timezone controls and paginated session rows.
- Customers and investors: relationship summaries and pipeline entry points.
- Pipelines: search, drag/drop, and a keyboard/touch stage selector. Failed moves
  roll back and report an error. Realtime refreshes are filtered and debounced.
- All contacts: combined filters, sorting, pagination, attention filters, and a
  matching CSV export. Contact detail prioritizes next steps, notes, tasks and
  activity, with the full form available through Edit details.
- Incoming leads: source/search filters, pagination and matching CSV export.
- Blog: status filters, search, sorting and pagination; mobile article cards.
- Editor: writing surface, publishing controls, metadata and optional search/share
  settings, revision history on demand, save retry and unsaved-close warning.
- Resources and field guides: search/manage content and share links; resource
  editor identity is reset when changing rows.
- Search health: existing on-page completeness checks, ordered by attention.
- Login/callback: safe return-path validation, specific expired/missing verifier
  feedback and clear instructions to use the requesting browser.

Brand/design, pitch-deck management and LinkedIn publishing are removed from the
panel. LinkedIn OAuth/drafting/publishing routes and the social cron are removed.
Stored records and public deck URLs/tracking are retained. Existing public social
links, email copy and referral attribution are outside this panel removal.

## Behavior and performance

- `admin-data` cache tags allow explicit refresh and invalidate on relevant writes.
  Existing bounded 20–30 second service-side caches remain admin-gated.
- Lead, contact and post list reads fetch bounded pages instead of trusting an
  oversized PostgREST limit. Safety limits and read failures are visible. Exports
  reject incomplete results instead of silently returning a partial CSV.
- Contact version matching is part of the database UPDATE, preventing silent
  overwrites when another editor saves first.
- Publish/schedule wait for a successful save. Publishing requires title/content;
  schedules must be future timestamps. Missing/deleted posts report failure.
- Autosaves are serialized, identical payloads are skipped, and opening an editor
  does not write. Revision snapshots are limited to one per minute, retaining the
  existing revision cap. Cropping and revision history load on demand. HTML
  sanitization stays on the server and is absent from the editor's client module.
- Removed cover/share images are left for the existing aged-object sweep, so a
  failed content save cannot break the image used by the current published post.
- Analytics scripts do not load inside admin pages.

No database migration is required. No production records are changed by this
patch. Production latency and a real email sign-in round trip must be evaluated
in the deployed environment; local checks do not establish those results.

## Validation

`npm test` runs workflow regressions using Node's test runner (Node 22.18+). Server
action tests stub external services, so they never send mail or change live data.
Run `npm run build`, `npx tsc --noEmit --incremental false`, and ESLint on touched
source. Run `npx next typegen` first if deleted routes left a stale route manifest.

Visual and route checks use a separate, uncommitted local copy with sample data,
a mocked authenticated admin and writes blocked. Never deploy those fixtures or
copy their authentication/proxy files into the real source. Check both themes,
desktop and mobile navigation, blog filtering/editor, contact details and resource
editing. Verify removed routes return 404.

## Useful next additions

- Explicit publisher, CRM and administrator roles instead of a single company
  email-domain gate, paired with a searchable admin audit trail.
- A shareable draft preview and an optional review/approval step before publishing.
- Follow-up reminders and response-time reporting once owners/due dates are used
  consistently; avoid sending automated outreach without an explicit workflow.
