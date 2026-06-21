import s from './rif-playbook.module.css'

// Real one-click download of the pre-rendered deck PDF (no print dialog). The
// static asset in /public/playbooks is generated from this very page's print
// stylesheet, so it stays pixel-identical to the on-screen slides. The
// `download` attribute forces a file save instead of opening inline.
export function DownloadButton() {
  return (
    <a
      className={s.printBtn}
      href="/playbooks/rif-playbook.pdf"
      download="The-Ultimate-RIF-Playbook.pdf"
    >
      Download PDF
    </a>
  )
}
