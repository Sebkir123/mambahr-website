// Open roles at MambaHR, shown on /careers. Add a role here to list it; the
// application form offers every listed role plus a general application.
// Keep the copy plain: what the job is, where, and what kind of contract.

export type Role = {
  /** Stable id, used as the form value and in the notification email. */
  id: string
  title: string
  team: string
  /** Where the work happens, e.g. "San Francisco or remote (US)". */
  location: string
  /** e.g. "Full-time". */
  type: string
  /** Two or three sentences on what the person will do. */
  summary: string
}

export const ROLES: Role[] = []

export const GENERAL_APPLICATION = 'General application'
