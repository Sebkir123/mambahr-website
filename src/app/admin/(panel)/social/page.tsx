import { requireAdmin } from '@/lib/auth'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { linkedinConfigured } from '@/lib/social'
import { env } from '@/lib/env'
import { Composer } from './composer'
import { Calendar, type CalEvent } from './calendar'
import { ConfirmSubmit } from './confirm-submit'
import { publishPost, deletePost, disconnectAccount } from './actions'
import ui from '../admin-ui.module.css'
import styles from './social.module.css'

export const dynamic = 'force-dynamic'

type AccountRow = { id: string; account_name: string; avatar_url: string | null; connected_by: string | null; expires_at: string | null }
type PostRow = {
  id: string
  body: string
  image_url: string | null
  status: 'draft' | 'scheduled' | 'published' | 'failed'
  scheduled_at: string | null
  published_at: string | null
  error: string | null
  created_at: string
  account: { account_name: string } | null
}

function when(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

export default async function SocialPage() {
  const supabase = await createSupabaseServerClient()
  const [, accountsRes, postsRes] = await Promise.all([
    requireAdmin(),
    supabase
      .from('social_accounts')
      .select('id, account_name, avatar_url, connected_by, expires_at')
      .order('created_at', { ascending: true }),
    supabase
      .from('social_posts')
      .select('id, body, image_url, status, scheduled_at, published_at, error, created_at, account:social_accounts(account_name)')
      .order('created_at', { ascending: false })
      .limit(100),
  ])

  const accounts = (accountsRes.data as AccountRow[] | null) ?? []
  const posts = (postsRes.data as unknown as PostRow[] | null) ?? []
  const configured = linkedinConfigured()

  // Calendar shows the cadence: scheduled posts on their target day, published
  // posts on the day they went out.
  const calEvents: CalEvent[] = posts
    .filter((p) => (p.status === 'scheduled' && p.scheduled_at) || (p.status === 'published' && p.published_at))
    .map((p) => ({
      id: p.id,
      body: p.body,
      status: p.status,
      at: p.status === 'scheduled' ? p.scheduled_at : p.published_at,
      account: p.account?.account_name ?? 'Unknown',
    }))

  return (
    <>
      <div className={ui.header}>
        <div>
          <h1 className={ui.h1}>Posts</h1>
          <p className={ui.subtitle}>Compose, schedule, and publish to your connected LinkedIn profiles</p>
        </div>
        {configured ? (
          <a href="/api/social/linkedin/start" className={ui.btnPrimary}>
            + Connect LinkedIn account
          </a>
        ) : (
          <span className={styles.badgeMuted}>LinkedIn not configured</span>
        )}
      </div>

      {!configured && (
        <div className={styles.notice}>
          Add <code>LINKEDIN_CLIENT_ID</code> / <code>LINKEDIN_CLIENT_SECRET</code> (and{' '}
          <code>SOCIAL_TOKEN_KEY</code>) to enable connecting accounts and publishing. Drafting &amp; scheduling
          work without them.
        </div>
      )}

      {/* Connected accounts */}
      <div className={ui.card}>
        <div className={styles.cardHead}>
          <h2 className={styles.cardTitle}>Connected accounts</h2>
          <span className={styles.cardHint}>{accounts.length} connected</span>
        </div>
        {accounts.length === 0 ? (
          <p className={styles.empty}>No accounts yet. Connect a LinkedIn profile to start posting.</p>
        ) : (
          <ul className={styles.accounts}>
            {accounts.map((a) => (
              <li key={a.id} className={styles.account}>
                <span className={styles.avatar} aria-hidden="true">
                  {a.account_name.charAt(0)}
                </span>
                <div className={styles.accountMeta}>
                  <span className={styles.accountName}>{a.account_name}</span>
                  <span className={styles.accountSub}>Connected by {a.connected_by ?? '—'}</span>
                </div>
                <form action={disconnectAccount} className={styles.accountActions}>
                  <input type="hidden" name="id" value={a.id} />
                  <ConfirmSubmit
                    className={styles.disconnect}
                    confirm={`Disconnect ${a.account_name}? You'll need to reconnect it via LinkedIn to post again.`}
                  >
                    Disconnect
                  </ConfirmSubmit>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Composer */}
      <div className={ui.card}>
        <div className={styles.cardHead}>
          <h2 className={styles.cardTitle}>Compose</h2>
        </div>
        <Composer accounts={accounts.map((a) => ({ id: a.id, name: a.account_name }))} aiEnabled={Boolean(env.anthropicKey)} />
      </div>

      {/* Content calendar */}
      <div className={ui.card}>
        <div className={styles.cardHead}>
          <h2 className={styles.cardTitle}>Calendar</h2>
          <span className={styles.cardHint}>{calEvents.filter((e) => e.status === 'scheduled').length} scheduled</span>
        </div>
        <div className={styles.calWrap}>
          <Calendar events={calEvents} />
        </div>
      </div>

      {/* Queue + history */}
      <div className={ui.card}>
        <div className={styles.cardHead}>
          <h2 className={styles.cardTitle}>Queue &amp; history</h2>
          <span className={styles.cardHint}>{posts.length} posts</span>
        </div>
        {posts.length === 0 ? (
          <p className={styles.empty}>Nothing yet — your drafts, scheduled posts, and published history land here.</p>
        ) : (
          <ul className={styles.posts}>
            {posts.map((p) => (
              <li key={p.id} className={styles.post}>
                <div className={styles.postMain}>
                  <span className={`${styles.status} ${styles[`st_${p.status}`]}`}>{p.status}</span>
                  <p className={styles.postBody}>{p.body}</p>
                  {p.image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image_url} alt="" className={styles.postThumb} />
                  )}
                  <span className={styles.postMeta}>
                    {p.account?.account_name ?? 'Unknown'}
                    {p.status === 'scheduled' && ` · scheduled ${when(p.scheduled_at)}`}
                    {p.status === 'published' && ` · published ${when(p.published_at)}`}
                    {p.status === 'failed' && p.error ? ` · ${p.error}` : ''}
                  </span>
                </div>
                <div className={styles.postActions}>
                  {(p.status === 'draft' || p.status === 'scheduled' || p.status === 'failed') && (
                    <form action={publishPost}>
                      <input type="hidden" name="id" value={p.id} />
                      <button type="submit" className={styles.postBtn}>
                        {p.status === 'failed' ? 'Retry' : 'Post now'}
                      </button>
                    </form>
                  )}
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={p.id} />
                    <ConfirmSubmit className={styles.postDelete} confirm="Delete this post record?">
                      Delete
                    </ConfirmSubmit>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
