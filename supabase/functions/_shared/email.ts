// Shared branded email template — Warm Editorial Premium design system.
//
// One renderer for every transactional email the landing site sends (demo
// requests, waitlist, Founder's Circle, lead magnets) so they're visually
// consistent with mambahr.com: oat background, warm-white card, gold→violet
// accent, serif headline (Georgia stands in for Fraunces — web fonts are
// unreliable in mail clients), dark pill CTA.
//
// Email-safe by construction: 600px table layout, all styles inline, no fl/grid,
// bulletproof button, gradient with a solid fallback colour underneath.

export interface EmailButton {
  label: string
  url: string
}

export interface EmailPanel {
  /** Small uppercase label above the panel body, e.g. "What happens next". */
  label?: string
  /** Inner HTML (already escaped by the caller). */
  html: string
}

export interface EmailOptions {
  /** Hidden preview text shown in the inbox list. */
  preheader: string
  /** Small gold eyebrow/badge above the heading, e.g. "Demo request". */
  eyebrow?: string
  heading: string
  /** Body paragraphs as HTML (caller escapes any interpolated values). */
  bodyHtml: string
  /** Optional warm callout box (next steps, referral link, etc). */
  panel?: EmailPanel
  button?: EmailButton
}

// Brand tokens mirrored from globals.css (light mode).
const C = {
  bg: '#F4F2EC',
  card: '#FEFDFA',
  border: '#E7E3DA',
  borderFaint: '#EFEBE2',
  ink: '#1A1A19',
  muted: '#57534E',
  faint: '#A8A29E',
  gold: '#8A6535',
  goldTint: '#F2ECE0',
  warm: '#FBF7EE',
  serif: "Georgia, 'Times New Roman', serif",
  sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
}

export function renderEmail(o: EmailOptions): string {
  const year = 2026

  const eyebrow = o.eyebrow
    ? `<table cellpadding="0" cellspacing="0" role="presentation" style="margin:0 0 18px;"><tr><td style="background:${C.goldTint};border-radius:999px;padding:5px 13px;">
         <span style="font-family:${C.sans};font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${C.gold};">${o.eyebrow}</span>
       </td></tr></table>`
    : ''

  const panel = o.panel
    ? `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 0 28px;background:${C.warm};border:1px solid ${C.borderFaint};border-radius:12px;">
         <tr><td style="padding:18px 20px;">
           ${o.panel.label ? `<p style="margin:0 0 6px;font-family:${C.sans};font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${C.gold};">${o.panel.label}</p>` : ''}
           <div style="font-family:${C.sans};font-size:14px;line-height:1.6;color:${C.muted};">${o.panel.html}</div>
         </td></tr>
       </table>`
    : ''

  const button = o.button
    ? `<table cellpadding="0" cellspacing="0" role="presentation" style="margin:4px 0 0;"><tr>
         <td align="center" bgcolor="${C.ink}" style="border-radius:999px;">
           <a href="${o.button.url}" style="display:inline-block;font-family:${C.sans};font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;padding:14px 30px;border-radius:999px;">${o.button.label}</a>
         </td>
       </tr></table>`
    : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
</head>
<body style="margin:0;padding:0;background:${C.bg};font-family:${C.sans};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${o.preheader}</div>
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${C.bg};padding:40px 20px;">
  <tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:540px;">
      <tr><td style="padding:0 0 28px;text-align:center;">
        <span style="font-family:${C.serif};font-size:23px;color:${C.ink};letter-spacing:-0.01em;">MambaHR</span>
      </td></tr>
      <tr><td style="background:${C.card};border:1px solid ${C.border};border-radius:16px;overflow:hidden;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr><td style="height:3px;background:${C.gold};background:linear-gradient(90deg,#B98A4E,#6A5DA6);font-size:0;line-height:0;">&nbsp;</td></tr>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr><td style="padding:38px 36px;">
            ${eyebrow}
            <h1 style="margin:0 0 14px;font-family:${C.serif};font-size:27px;font-weight:400;line-height:1.18;letter-spacing:-0.02em;color:${C.ink};">${o.heading}</h1>
            <div style="font-family:${C.sans};font-size:15px;line-height:1.7;color:${C.muted};">${o.bodyHtml}</div>
            <div style="height:26px;line-height:26px;">&nbsp;</div>
            ${panel}
            ${button}
          </td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:26px 0;text-align:center;">
        <p style="margin:0;font-family:${C.sans};font-size:12px;color:${C.faint};">
          &copy; ${year} MambaHR &middot; <a href="https://mambahr.com" style="color:${C.gold};text-decoration:none;">mambahr.com</a>
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
