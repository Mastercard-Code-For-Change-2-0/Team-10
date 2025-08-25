import { Link } from 'react-router-dom'

export default function DonorDashboard() {
  return (
    <main className="section"><div className="container" style={{ display: 'grid', gap: 16 }}>
      <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>Donor Dashboard</h1>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        <Link to="/donate" className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 800, color: 'var(--brand-primary)' }}>List an Item</div>
          <div className="muted">Quick, guided donation wizard</div>
        </Link>
        <Link to="/me/donations" className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 800, color: 'var(--brand-primary)' }}>My Donations</div>
          <div className="muted">Track approvals and matches</div>
        </Link>
      </div>
      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Recent Activity</div>
        <ul className="muted" style={{ margin: 0, paddingLeft: 18 }}>
          <li>Donation “Laptops (5)” pending moderation</li>
          <li>Match suggested with “Community Learning Center”</li>
        </ul>
      </div>
    </div></main>
  )
}
