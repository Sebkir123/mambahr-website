# Admin workspace

The panel uses the MambaHR product design library: semantic light/dark tokens
vendored from `mamba_hr/web/app/globals.css`, the product button primitive, Geist
and Fraunces, and the official `/brand/mamba-mark-light.svg` silhouette. The token
file records its source checksum. Tokens are scoped to the admin; public pages
keep their existing theme. To refresh the library, copy semantic tokens and their
variable dependencies from the product source, preserving the scoped selectors.

## Pages

- Overview: website visits, consistent blog reads, published content, a publishing
  queue, recent updates and drafts to continue. Summary cards link to their pages.
- Website analytics: first-party traffic, sources, engagement, session details,
  time range and timezone controls, and pagination.
- Blog: status/search filters, sorting and pagination; mobile article cards.
- Editor: writing surface, publishing controls, optional search/share settings,
  revision history on demand, save retry and unsaved-close warning.
- Resources and field guides: manage content, files and trackable distribution links.
- Search health: on-page completeness checks and links to the relevant editor.
- Login/callback: safe return paths and specific expired/missing verifier feedback.

Relationships are managed in Attio. Customers, Investors, All contacts, Incoming
leads, CRM pipelines/tasks/exports, their routes/actions/libraries, and dashboard
relationship metrics are removed. Existing database records and public signup,
demo, partner and resource intake remain intact. This patch does not add an Attio
sync. Brand/design, pitch-deck management and LinkedIn publishing are also removed;
existing public deck URLs and stored records remain.

## Behavior and performance

- `admin-data` cache tags allow explicit refresh and invalidate on relevant writes.
  Existing bounded 20–30 second service-side caches remain admin-gated.
- Content list reads fetch bounded pages instead of trusting an oversized
  PostgREST limit. Safety limits and read failures are visible. The overview reads
  posts/resources/website analytics only, with no CRM queries.
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
desktop and mobile navigation, blog filtering/editor, and resource editing. Verify removed routes return 404.

## Useful next additions

- Explicit editor, publisher and administrator roles with a searchable audit trail.
- An optional review step before publishing; private saved previews are implemented.
- Content conversion reporting tied to the existing website/resource tracker.

The native dialog lifecycle closes on route changes/unmount and closes the mobile
menu at desktop widths. An open drawer cannot be hidden while retaining modality.
Keyboard page search consumes Enter before navigating. See
`ADMIN_INTERACTION_CHECKS.md` for the reproduced failure and browser checks.

## Editorial workflow improvements

- Preview saves the current article first, then opens `/admin/blog/[id]/preview`
  behind the existing admin gate. It renders sanitized saved HTML with the public
  article styles, is noindexed, and carries no public sharing token. Failed saves
  keep the editor open. The Back links retain the filtered Blog destination.
- Blog, Resources, Field guides and Search health keep bounded search, filter,
  sorting and pagination in the URL using Next's native history integration.
  Filtering does not fetch the full server page again on every keystroke.
- Resource Close/Cancel/New/switch and internal link navigation prompt inline
  before discarding unsaved edits. Reload/window close invokes the browser's
  unsaved-change guard. Fields are disabled during save/upload; failed saves
  retain the form. SPA browser Back/Forward is not intercepted by this guard.
- Resource publish/unpublish/delete and field-guide revoke provide pending and
  result feedback. Writes verify the affected row. A missing PDF blocks publish.
  Deletion removes the row first and keeps PDFs referenced by another resource;
  storage cleanup failures are reported. Resource editing preserves library order.
- Resource tables scroll horizontally on small screens. Search-health checks can
  be filtered by missing description, missing cover, or noindex; completeness is
  explicitly distinguished from measured search indexing/rankings.
- Geist Mono uses its variable face, avoiding the upstream static per-weight
  Google-font URL parsing failure without changing the typeface.

This pass was verified with 23 workflow tests, changed-source ESLint, TypeScript,
production build, and isolated rendered-route checks. The computer-use native
pipe/browser host was unavailable, so these additions have not received a fresh
interactive Chrome pass. Earlier native checks above apply to earlier changes.
No production content, links or files were modified for verification.
