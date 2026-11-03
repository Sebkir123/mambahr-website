# Admin interaction regression checks

The production issue was reproduced in native Chrome: open the mobile navigation
at 392px, then turn off device emulation to widen the viewport. The drawer became
CSS-hidden while its native dialog remained modal, leaving the visible panel inert.
The page-search Enter path also reopened its dialog after navigation.

The correction closes native dialogs on route changes/unmount and closes the
mobile drawer whenever desktop navigation takes over. An open drawer remains
visible until native close releases modality. Search consumes Enter before
closing and navigating, preventing the restored trigger from reopening it.

## Verified

- Before the fix: the resize sequence left no page controls in Chrome's
  accessibility tree despite the panel still being visible.
- After the fix, in the isolated sample preview: open/close menu, widen the
  viewport, and verify Blog/New post remain accessible; keyboard page search
  navigates to Resources with no remaining search dialog.
- Browser interaction checks: theme toggle; Blog status filter; resource copy,
  new-form/cancel and search; analytics bot/all, timezone and range controls,
  pagination and session expansion; sample-preview writes were intentionally blocked.
- Failed session-detail loads now finish with an explicit retry instruction
  rather than an endless Loading label. Session ID copy reports its result.
- Twelve workflow tests cover the real server actions with external-service
  stubs plus native-dialog lifecycle and the actual page-search key handler.
- Production build, TypeScript, changed-source ESLint and diff checks pass.

Production records were not edited, published or deleted during the interaction
checks. Sample-preview authentication, database fixtures and its HTTP asset
header adjustment remain outside the source checkout and deployment.

Relationships were subsequently removed from the panel in favor of Attio. Their
routes/actions and retired feature tests are deleted. A content-overview regression
verifies only posts/resources are read directly and no CRM dependency returns.

Additional native Chrome checks exercised the real publishing server-action flow
against a separate ephemeral in-memory database: create a draft, edit title/body,
autosave, publish, unpublish, enter a future date, schedule, cancel that schedule,
and delete the temporary sample post back to the Blog list. Cancel schedule now
returns the post to Draft and clears both the stored timestamp and editor field.
The fixture database, mocked auth/client/service and preview proxy changes are
outside the production source tree and were not committed or deployed.
