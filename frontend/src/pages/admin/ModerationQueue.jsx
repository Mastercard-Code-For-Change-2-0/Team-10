export default function ModerationQueue() {
  return (
    <main className="section"><div className="container">
      <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>Moderation Queue</h1>
      <p className="muted">Flagged text and images awaiting review.</p>
      <div className="card" style={{ padding: 12 }}>
        <div className="muted">TODO: Table of items with flags, severity, actions (approve/reject).</div>
      </div>
    </div></main>
  )
}
