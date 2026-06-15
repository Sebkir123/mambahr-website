import { requireAdmin } from '@/lib/auth'
import AdminNav from './_components/admin-nav'
import styles from './panel.module.css'

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin()
  return (
    <div className={styles.shell}>
      <AdminNav email={admin.email} />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
