const mocks = [
  { id: 'N1', text: 'Your donation was approved', ts: '2m' },
  { id: 'N2', text: 'New match suggestion available', ts: '10m' },
  { id: 'N3', text: 'Receiver verification pending documents', ts: '1h' },
]

export default function Notifications() {
  return (
    <main className="section"><div className="container" style={{ maxWidth: 720 }}>
      <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>Notifications</h1>
      <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 8 }}>
        {mocks.map(n => (
          <div key={n.id} className="card" style={{ padding: 12, display: 'flex', justifyContent: 'space-between' }}>
            <span>{n.text}</span>
            <span className="muted">{n.ts}</span>
          </div>
        ))}
      </div>
    </div></main>
  )
}
