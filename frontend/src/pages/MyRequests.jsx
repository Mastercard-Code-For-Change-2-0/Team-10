import { useMemo, useState } from 'react'
import StatusChip from '../components/StatusChip.jsx'
import { MOCK_DONATIONS } from '../utils/mockDonations.js'

const statuses = ['Draft','Pending','Approved','Matched','Fulfilled']

export default function MyRequests() {
  const [status, setStatus] = useState('All')
  const mine = useMemo(() => MOCK_DONATIONS.slice(0,20).map(d => ({ ...d, title: d.title.replace('donation','request'), status: statuses[(d.quantity + d.title.length) % statuses.length] })), [])
  const list = status==='All' ? mine : mine.filter(x => x.status===status)
  return (
    <main className="section"><div className="container">
      <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>My Requests</h1>
      <div className="card" style={{ padding: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
        <select value={status} onChange={(e)=> setStatus(e.target.value)}>
          {['All', ...statuses].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 10, marginTop: 12 }}>
        {list.map(item => (
          <div key={item.id} className="card" style={{ padding: 12, display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 12, alignItems: 'center' }}>
            <img src={item.image} alt={item.title} style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 8 }} />
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>{item.title}</strong>
                <StatusChip status={item.status} />
              </div>
              <div className="muted">{item.category} • Qty {item.quantity}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <a href={`/requests/${item.id}`} className="pill btn-outline">View</a>
              <button className="pill btn-outline">Edit</button>
              <button className="pill">Close</button>
            </div>
          </div>
        ))}
      </div>
    </div></main>
  )
}
