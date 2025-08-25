import { useParams } from 'react-router-dom'
import StatusChip from '../components/StatusChip.jsx'

export default function RequestDetail() {
  const { id } = useParams()
  return (
    <main className="section"><div className="container">
      <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>Request {id}</h1>
      <div className="card" style={{ padding: 16, display: 'grid', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="muted">ID: {id}</div>
          <StatusChip status="Pending" />
        </div>
        <div style={{ display: 'grid', gap: 10 }}>
          <strong>Timeline</strong>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
            {['Submitted','Under moderation','Approved','Matched','Fulfilled'].map((s, i) => (
              <li key={s} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 10, height: 10, borderRadius: 99, background: i<2? '#10B981' : '#9CA3AF' }} />
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="pill btn-outline">Edit</button>
          <button className="pill btn-outline">Close</button>
        </div>
      </div>
    </div></main>
  )
}
