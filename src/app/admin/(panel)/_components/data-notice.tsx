import ui from '../admin-ui.module.css'
export default function DataNotice({ warnings }: { warnings: string[] }) {
  if (!warnings.length) return null
  return <details className={ui.notice}><summary>Some data could not be loaded. Refresh to try again.</summary><ul>{warnings.map((warning, index) => <li key={index}>{warning}</li>)}</ul></details>
}
