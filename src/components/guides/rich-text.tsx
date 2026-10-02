import Link from 'next/link'
import type { ReactNode } from 'react'
import type { Block } from '@/content/guides/types'
import s from './guide.module.css'

const TOKEN = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g

/** Renders a content string, turning `**bold**` into <strong> and
 *  `[label](href)` into links. Internal paths use next/link; external links
 *  open in a new tab. */
export function RichText({ text }: { text: string }) {
  const out: ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(TOKEN)) {
    const at = m.index ?? 0
    if (at > last) out.push(text.slice(last, at))
    const [, bold, label, href] = m
    if (bold !== undefined) {
      out.push(<strong key={at}>{bold}</strong>)
    } else if (href.startsWith('/')) {
      out.push(
        <Link key={at} href={href} prefetch={false}>
          {label}
        </Link>,
      )
    } else {
      out.push(
        <a key={at} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>,
      )
    }
    last = at + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return <>{out}</>
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === 'p') {
          return (
            <p key={i}>
              <RichText text={b.text} />
            </p>
          )
        }
        if (b.type === 'list') {
          const items = b.items.map((it, j) => (
            <li key={j}>
              <RichText text={it} />
            </li>
          ))
          return b.ordered ? <ol key={i}>{items}</ol> : <ul key={i}>{items}</ul>
        }
        return (
          <div key={i} className={s.tableWrap} role="region" aria-label={b.caption ?? 'Table'} tabIndex={0}>
            <table className={s.table}>
              {b.caption && <caption>{b.caption}</caption>}
              <thead>
                <tr>
                  {b.columns.map((c) => (
                    <th key={c} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) =>
                      c === 0 ? (
                        <th key={c} scope="row">
                          <RichText text={cell} />
                        </th>
                      ) : (
                        <td key={c}>
                          <RichText text={cell} />
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      })}
    </>
  )
}

export function slugify(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
