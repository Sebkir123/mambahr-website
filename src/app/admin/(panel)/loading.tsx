import styles from './loading.module.css'
export default function AdminLoading() {
  return <div role="status" aria-label="Loading workspace" className={styles.loading}><div className={styles.heading} /><div className={styles.subtitle} /><div className={styles.stats}>{[0,1,2,3].map((item) => <div key={item} className={styles.stat}><span /><strong /><span /></div>)}</div><div className={styles.panel}>{[0,1,2,3,4].map((item) => <div key={item} className={styles.row} />)}</div><span className={styles.srOnly}>Loading workspace data…</span></div>
}
