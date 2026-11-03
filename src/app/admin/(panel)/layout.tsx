import { requireAdmin } from '@/lib/auth'
import AdminNav from './_components/admin-nav'
import styles from './panel.module.css'
import WorkspaceBar from './_components/workspace-bar'

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin()
  return (
    <div className={styles.shell}>
      <AdminNav email={admin.email} />
      <div className={styles.workspace}>
        <WorkspaceBar />
        <main id="main" className={styles.main} tabIndex={-1}>{children}</main>
      </div>
    </div>
  )
}
