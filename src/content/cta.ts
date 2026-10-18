/**
 * The two ways in, defined once so every button on the site says the same thing
 * and goes to the same place.
 *
 * - The self-serve path: sign up in the product, set up the company, pick a plan
 *   and start the free trial. The URL is the product's own signup page
 *   (mamba_hr web/app/signup). It is an external link, so render it with <a>,
 *   not next/link.
 * - The early access path: the /early-access list on this site. It replaced the
 *   demo (2026-10-18); /demo redirects there.
 *
 * Trial length is the product's pricing.TrialDefaultDays (7). Change it here and
 * in the product together.
 */
export const SIGNUP_URL = 'https://app.mambahr.com/signup'
export const TRIAL_LABEL = 'Start free trial'
export const TRIAL_DAYS = 7

// The low-commitment path while self-serve is closed: join the list, get
// invited in a small group at founding customer pricing.
export const EARLY_ACCESS_HREF = '/early-access'
export const EARLY_ACCESS_LABEL = 'Get early access'
