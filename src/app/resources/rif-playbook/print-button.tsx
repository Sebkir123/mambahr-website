'use client'

import s from './rif-playbook.module.css'

// Save-as-PDF entry point. The @page rules in the stylesheet size each slide to
// a borderless 16:9 page, so the browser's print dialog → "Save as PDF" yields
// the deck. Kept out of print output via .toolbar { display: none }.
export function PrintButton() {
  return (
    <button type="button" className={s.printBtn} onClick={() => window.print()}>
      Download PDF
    </button>
  )
}
