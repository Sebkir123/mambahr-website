import ui from './admin-ui.module.css'

// Instant skeleton shown the moment you click a nav item — the sidebar (in the
// layout) stays put while the destination's server data loads. Without this,
// navigation appears frozen because every admin page is force-dynamic and runs
// an auth check + queries before its first paint.
const block = (style: React.CSSProperties): React.CSSProperties => ({
  background: 'var(--bg-elevated)',
  borderRadius: 8,
  ...style,
})

export default function AdminLoading() {
  return (
    <>
      <style>{`@keyframes admSk{0%,100%{opacity:1}50%{opacity:.5}}.admSk{animation:admSk 1.4s ease-in-out infinite}`}</style>
      <div className={ui.header}>
        <div>
          <div className="admSk" style={block({ height: 30, width: 170 })} />
          <div className="admSk" style={block({ height: 14, width: 230, marginTop: 12 })} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="admSk"
            style={{
              height: 118,
              borderRadius: 14,
              background: 'var(--bg)',
              border: '1px solid var(--border-faint)',
              boxShadow: 'var(--shadow-sm)',
            }}
          />
        ))}
      </div>
      <div
        className="admSk"
        style={{
          height: 300,
          borderRadius: 14,
          background: 'var(--bg)',
          border: '1px solid var(--border-faint)',
          boxShadow: 'var(--shadow-sm)',
        }}
      />
    </>
  )
}
