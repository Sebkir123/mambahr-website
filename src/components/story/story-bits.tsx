'use client'

/* Small shared pieces of the animated product moments. Their styles live in
   globals.css under "Story kit", because a parent's styled-jsx cannot reach
   into these components. */

/** A line being typed: the first n characters, an @mention as the app's
    mention pill, and a blinking caret while `caret` is on. */
export function Typed({ text, n, mention, caret }: { text: string; n: number; mention?: string; caret?: boolean }) {
  const shown = text.slice(0, n)
  const head = mention && shown.length >= mention.length && shown.startsWith(mention)
  return (
    <>
      {head ? (
        <>
          <span className="story-mention">{mention}</span>
          {shown.slice(mention.length)}
        </>
      ) : (
        shown
      )}
      {caret && <span className="story-caret" aria-hidden="true" />}
    </>
  )
}

/** Plays the moment again. Shown once a story has finished, never under
    reduced motion. Its parent places it. */
export function StoryReplay({ onClick, className }: { onClick: () => void; className?: string }) {
  return (
    <button type="button" className={`story-replay${className ? ` ${className}` : ''}`} onClick={onClick}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
        <path d="M3 3v5h5" />
      </svg>
      Replay
    </button>
  )
}
