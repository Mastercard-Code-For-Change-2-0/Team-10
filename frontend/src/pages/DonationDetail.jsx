import { useParams } from 'react-router-dom'
import StatusChip from '../components/StatusChip.jsx'

export default function DonationDetail() {
  const { id } = useParams()
  return (
    <main className="section"><div className="container">
      <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>Donation {id}</h1>
      <div className="card" style={{ padding: 12 }}>
        <div className="muted">TODO: fetch details by id, show timeline and actions.</div>
        <div style={{ marginTop: 8 }}>
          <StatusChip status="Pending" />
        </div>
      </div>
    </div></main>
  )
}
