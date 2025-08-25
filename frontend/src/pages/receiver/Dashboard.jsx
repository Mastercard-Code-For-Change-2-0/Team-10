import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

export default function ReceiverDashboard() {
  return (
    <main className="section"><div className="container" style={{ display: 'grid', gap: 16 }}>
      <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>Receiver Dashboard</h1>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        <Link to="/request" className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 800, color: 'var(--brand-primary)' }}>Post a Requirement</div>
          <div className="muted">Quick, guided submission</div>
        </Link>
        <Link to="/browse" className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 800, color: 'var(--brand-primary)' }}>Browse Donations</div>
          <div className="muted">Search, filters, sort, pagination</div>
        </Link>
        <Link to="/me/requests" className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 800, color: 'var(--brand-primary)' }}>My Requests</div>
          <div className="muted">Track approvals and matches</div>
        </Link>
      </div>
      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Recent Activity</div>
        <ul className="muted" style={{ margin: 0, paddingLeft: 18 }}>
          <li>2 matches suggested for “School Furniture”</li>
          <li>Verification approved for “Sunrise NGO”</li>
        </ul>
      </div>
    </div></main>
  )
}
