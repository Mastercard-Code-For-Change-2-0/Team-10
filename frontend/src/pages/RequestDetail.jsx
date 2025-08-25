import { useParams } from 'react-router-dom'
import StatusChip from '../components/StatusChip.jsx'

export default function RequestDetail() {
  const { id } = useParams()
  return (
    <main className="section"><div className="container">
      <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>Request {id}</h1>
      <div className="card" style={{ padding: 12 }}>
        <div className="muted">TODO: fetch details by id, show timeline and actions.</div>
        <div style={{ marginTop: 8 }}>
          <StatusChip status="Approved" />
        </div>
      </div>
    </div></main>
  )
}
