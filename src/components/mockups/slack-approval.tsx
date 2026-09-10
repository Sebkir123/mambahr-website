import s from './mockups.module.css'
import { Icon } from './icons'

/**
 * The Block Kit approval card MambaHR posts to Slack: header "{subject} ·
 * {kind}", the why line, fact fields, the context line, the reference, and
 * Approve (green) / Decline (red) / Open in MambaHR.
 */
export function SlackApproval({
  channel = 'people-ops',
  subject = 'Jackson Bauer',
  kind = 'Compensation change',
  why = 'Jackson is moving to $165,000, an 11.5% increase that lands above the level 4 band.',
  fields = [
    { label: 'Requested by', value: 'A. Ruiz, 2 days ago' },
    { label: 'Effective', value: 'Nov 1' },
  ],
  context = 'Yours · due today · also on your To do',
  reference = 'TO-1842',
  time = '9:41 AM',
  className,
}: {
  channel?: string
  subject?: string
  kind?: string
  why?: string
  fields?: { label: string; value: string }[]
  context?: string
  reference?: string
  time?: string
  className?: string
}) {
  return (
    <div className={`${s.mk} ${s.slack}${className ? ` ${className}` : ''}`} aria-hidden="true">
      <div className={s.slackTop}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/slack-new-logo.svg" alt="" width={16} height={16} />
        <b>#{channel}</b>
        <span>· Slack</span>
      </div>
      <div className={s.slackMsg}>
        <span className={s.slackAv}>M</span>
        <div className={s.slackBody}>
          <div className={s.slackWho}><b>MambaHR</b><span className={s.slackApp}>APP</span><span className={s.slackTime}>{time}</span></div>
          <div className={s.slackHead}>{subject} · {kind}</div>
          <p className={s.slackWhy}>{why}</p>
          <div className={s.slackFields}>
            {fields.map((f) => (
              <div key={f.label} className={s.slackField}><b>{f.label}</b>{f.value}</div>
            ))}
          </div>
          <div className={s.slackCtx}>{context}<br />{reference}</div>
          <div className={s.slackBtns}>
            <span className={`${s.slackBtn} ${s.ok}`}>Approve</span>
            <span className={`${s.slackBtn} ${s.no}`}>Decline</span>
            <span className={s.slackBtn}>Open in MambaHR<Icon name="external-link" size={13} /></span>
          </div>
        </div>
      </div>
    </div>
  )
}
