export default function Forbidden() {
  return (
    <main className="section"><div className="container" style={{ textAlign: 'center' }}>
      <h1 style={{ color: 'var(--brand-primary)' }}>403</h1>
      <p className="muted">You don’t have permission to access this page.</p>
      <a href="/" className="pill btn-outline">Go home</a>
    </div></main>
  )
}
